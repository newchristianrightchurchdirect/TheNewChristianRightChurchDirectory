"""Build hymn-number -> PDF-page map for a Trinity Hymnal PDF.

Inputs: a PDF (with embedded OCR text), a hymn-titles JSON, an anchor page (where hymn 1
starts), and the max hymn number. Outputs a JSON map {hymn_num: start_page (1-based)}.

Strategy (refined after first pass picked stanza-marker integers over real titles):
  - Strict forward walk: hymn N must start on a page >= cursor (where cursor is last hymn's
    start). Don't skip backwards.
  - Title is the primary signal. For each hymn N with significant title words, search up to
    5 pages ahead for the first page scoring >= 0.5 word-recall. Title content is much more
    OCR-resilient than isolated digits (which collide with stanza markers, scripture
    references, dates, and OCR junk).
  - Number is a tiebreaker only: among pages with >= 0.5 title match, prefer one that also
    has the hymn number as an isolated integer in the page header (first 200 chars).
  - Fallback: if no page in the window matches the title, assume the hymn shares a page
    with the previous one (common in TH 1961/Baptist where 2 short hymns share a spread).
"""

import json, re, sys
from pypdf import PdfReader

STOP = set('a an the of to and or in for on at by with from is be do you we us our my his her '
           'it me their no not all so as that this thee thou ye o oh god lord'.split())

def norm_text(s: str) -> str:
    return re.sub(r'[^a-z0-9 ]+', ' ', s.lower())

def significant_words(title: str) -> list[str]:
    # Decode HTML entities like &#039; in the JSON titles.
    t = title.replace('&#039;', "'").replace('&amp;', '&').replace('&quot;', '"')
    toks = [w for w in norm_text(t).split() if w and w not in STOP]
    sig = [w for w in toks if len(w) >= 4]
    # Fall back to admitting 3-letter words for very short titles, so 1-distinctive-word
    # titles like "One Day He's Coming" don't collapse to a single ambiguous token.
    if len(sig) < 2:
        sig = [w for w in toks if len(w) >= 3]
    return sig

def find_isolated_int_header(text: str, target: int) -> bool:
    """True if target appears as isolated integer in the first 200 chars (page header)."""
    header = text[:200]
    return bool(re.search(rf'(?<![\d.]){target}(?![\d.])', header))

def title_score(text_norm: str, sig_words: list[str]) -> float:
    if not sig_words: return 0.0
    return sum(1 for w in sig_words if w in text_norm) / len(sig_words)

def build_map(pdf_path, titles_by_num, anchor_page, max_hymn, last_music_page):
    r = PdfReader(pdf_path)
    raw_pages = {}
    for i in range(anchor_page - 1, last_music_page):
        raw_pages[i + 1] = r.pages[i].extract_text() or ''

    # Strip recurring section headers (e.g. "JESUS CHRIST: HIS SECOND COMING AND JUDGMENT")
    # that repeat on every page in a section and pollute title-word matching.
    line_freq = {}
    for t in raw_pages.values():
        for line in t.split('\n')[:4]:
            line = line.strip()
            if len(line) >= 5:
                line_freq[line] = line_freq.get(line, 0) + 1
    noise = {ln for ln, c in line_freq.items() if c >= 4}

    page_text = {}
    for p, t in raw_pages.items():
        cleaned = '\n'.join(ln for ln in t.split('\n') if ln.strip() not in noise)
        page_text[p] = (t, norm_text(cleaned))  # keep raw t for header-number check

    mapping = {1: anchor_page}
    cursor = anchor_page

    for n in range(2, max_hymn + 1):
        title = titles_by_num.get(str(n), '')
        sig = significant_words(title)
        threshold = 0.5 if len(sig) >= 3 else 0.7  # tighter for short titles
        best = None  # (combined_score, page)
        for p in range(cursor, min(cursor + 6, last_music_page + 1)):
            t, tn = page_text.get(p, ('', ''))
            if not t: continue
            ts = title_score(tn, sig)
            if ts < threshold and not sig:  # no title to match — number-only fallback
                if find_isolated_int_header(t, n):
                    best = (1.0, p); break
                continue
            if ts >= threshold:
                num_bonus = 0.5 if find_isolated_int_header(t, n) else 0.0
                # Strongly prefer earliest match; only beat earlier if substantially better
                if best is None or (ts + num_bonus) > best[0] + 0.3:
                    best = (ts + num_bonus, p)
                    # If both title AND number match, lock in immediately
                    if num_bonus > 0: break
        if best:
            mapping[n] = best[1]
            cursor = best[1]
        else:
            # OCR couldn't match the title. Most TH pages hold one hymn, so advance by 1.
            # (For TH 1961/Baptist the occasional 2-hymns-per-page case still gets matched
            # via title when OCR is clean.)
            mapping[n] = min(mapping[n - 1] + 1, last_music_page)
            cursor = mapping[n]
    return mapping

def main():
    pdf_path = sys.argv[1]
    json_path = sys.argv[2]
    anchor_page = int(sys.argv[3])
    max_hymn = int(sys.argv[4])
    last_music_page = int(sys.argv[5])
    out_path = sys.argv[6]

    with open(json_path, encoding='utf-8') as f:
        data = json.load(f)
    titles_by_num = {str(h['number']): h.get('title', '') for h in data['hymns']}

    print(f'Mapping {max_hymn} hymns in {pdf_path} from anchor p{anchor_page}...', flush=True)
    mapping = build_map(pdf_path, titles_by_num, anchor_page, max_hymn, last_music_page)
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(mapping, f, indent=2)
    samples = [1, 2, 3, 4, 5, 6, 8, 10, 50, 100, 250, 500, max_hymn]
    for s in samples:
        if s <= max_hymn:
            print(f'  hymn {s}: p{mapping[s]} (title: {titles_by_num.get(str(s),"?")[:60]})')
    shared, jumps = 0, []
    for n in range(2, max_hymn + 1):
        delta = mapping[n] - mapping[n - 1]
        if delta == 0: shared += 1
        elif delta > 3: jumps.append((n, delta))
    print(f'Pages shared with previous hymn: {shared}/{max_hymn}')
    print(f'Suspicious jumps (>3 pages): {len(jumps)}')
    for n, d in jumps[:10]:
        print(f'  hymn {n}: jumped {d} pages')

if __name__ == '__main__':
    main()
