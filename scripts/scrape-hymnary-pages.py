"""Scrape printed page numbers for a hymnal from hymnary.org.

For each hymn, hymnary lists a "Page Scan" link as /hymn/<NS>/page/<N> where
<N> is the printed page number. Some hymns share a page with a neighbor and
have no scan link; those are inferred by interpolation.

Output: data/pdf-maps/<slug>.json -> {hymn_num: pdf_page (1-based)}
where pdf_page = printed_page + anchor_offset (anchor_offset = pdf_p_of_hymn_1 - printed_page_of_hymn_1).
"""

import json, re, sys, time, urllib.request

UA = {'User-Agent': 'Mozilla/5.0 (NXR-Hymnal page-scraper)'}

def fetch(url):
    req = urllib.request.Request(url, headers=UA)
    return urllib.request.urlopen(req, timeout=30).read().decode('utf-8', errors='replace')

def scrape_index_page(namespace, page_idx):
    """Return list of (hymn_num, page_num_or_None) preserving row order."""
    html = fetch(f'https://hymnary.org/hymnal/{namespace}?page={page_idx}')
    rows = re.findall(r'<tr[^>]*>.*?</tr>', html, re.DOTALL)
    out = []
    seen = set()
    for row in rows:
        hymns = re.findall(rf'/hymn/{namespace}/(\d+)(?:#|")', row)
        if not hymns: continue
        h = int(hymns[0])
        if h in seen: continue
        seen.add(h)
        pages = re.findall(rf'/hymn/{namespace}/page/(\d+)', row)
        p = int(pages[0]) if pages else None
        out.append((h, p))
    return out

def scrape_all(namespace, max_hymn):
    pairs = {}
    page_idx = 0
    while True:
        rows = scrape_index_page(namespace, page_idx)
        if not rows: break
        max_in_page = max(h for h, _ in rows)
        for h, p in rows:
            pairs[h] = p
        print(f'  page={page_idx}: hymns {min(h for h,_ in rows)}-{max_in_page}, {sum(1 for _,p in rows if p)} with scan')
        if max_in_page >= max_hymn: break
        page_idx += 1
        time.sleep(0.5)
    return pairs

def interpolate(pairs, max_hymn):
    """Fill in missing pages by proportional distribution between known anchors."""
    filled = {}
    last_known_h, last_known_p = None, None
    for h in range(1, max_hymn + 1):
        if pairs.get(h):
            filled[h] = pairs[h]
            last_known_h, last_known_p = h, pairs[h]

    # Now fill gaps by proportional placement
    for h in range(1, max_hymn + 1):
        if h in filled: continue
        # Find prev and next known
        prev_h, prev_p = None, None
        for k in range(h - 1, 0, -1):
            if pairs.get(k):
                prev_h, prev_p = k, pairs[k]
                break
        next_h, next_p = None, None
        for k in range(h + 1, max_hymn + 1):
            if pairs.get(k):
                next_h, next_p = k, pairs[k]
                break
        if prev_p is None and next_p is not None:
            filled[h] = next_p
        elif prev_p is not None and next_p is None:
            filled[h] = prev_p
        elif prev_p is not None and next_p is not None:
            # Proportional placement: (h-prev_h)/(next_h-prev_h) * (next_p-prev_p)
            pos = (h - prev_h) / (next_h - prev_h)
            filled[h] = prev_p + round(pos * (next_p - prev_p))
        else:
            filled[h] = 1
    return filled

def main():
    namespace = sys.argv[1]       # e.g. TH1990, TH, BTH1995
    max_hymn = int(sys.argv[2])
    anchor_offset = int(sys.argv[3])  # PDF page of hymn 1 - printed page of hymn 1
    out_path = sys.argv[4]

    print(f'Scraping hymnary.org/hymnal/{namespace} ({max_hymn} hymns)...')
    pairs = scrape_all(namespace, max_hymn)
    print(f'\nGot {sum(1 for h in pairs if pairs[h])} hymns with explicit page')
    print(f'Missing: {sum(1 for h in range(1, max_hymn+1) if not pairs.get(h))}')

    filled = interpolate(pairs, max_hymn)
    # Convert to PDF pages: pdf_page = printed_page + anchor_offset
    mapping = {str(h): filled[h] + anchor_offset for h in range(1, max_hymn + 1)}

    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(mapping, f, indent=2)

    # Spot-check
    samples = [1, 2, 3, 5, 10, 20, 50, 100, 327, 500, max_hymn]
    print('\nSpot-check:')
    for s in samples:
        if s <= max_hymn:
            print(f'  hymn {s}: printed p{filled[s]} -> PDF p{mapping[str(s)]}')
    shared = sum(1 for h in range(2, max_hymn+1) if mapping[str(h)] == mapping[str(h-1)])
    print(f'\nShared-page pairs: {shared}/{max_hymn}')

if __name__ == '__main__':
    main()
