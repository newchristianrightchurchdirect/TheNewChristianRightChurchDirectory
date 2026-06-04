"""Split a hymnal PDF into per-hymn PDFs using a hymn->page map.

For each hymn, extract pages [page_n, page_(n+1)-1] (or just page_n if next hymn
shares the same page). Output: <out_dir>/<NNN>.pdf for each hymn.

Usage:
  python scripts/split-hymnal-pdf.py <pdf> <map.json> <out_dir> [--max-extra=1]

--max-extra: extra pages to include past the start page for long hymns. Defaults
to 1 (so most 2-page hymns get the full hymn). Hymns whose next hymn starts >2
pages later still get capped at start_page + 1 + max_extra.
"""

import json, sys, os
from pypdf import PdfReader, PdfWriter

def main():
    pdf_path = sys.argv[1]
    map_path = sys.argv[2]
    out_dir = sys.argv[3]
    max_extra = 1
    for a in sys.argv[4:]:
        if a.startswith('--max-extra='):
            max_extra = int(a.split('=', 1)[1])

    with open(map_path, encoding='utf-8') as f:
        mapping = {int(k): v for k, v in json.load(f).items()}

    os.makedirs(out_dir, exist_ok=True)
    r = PdfReader(pdf_path)
    total_pdf_pages = len(r.pages)
    nums = sorted(mapping.keys())
    max_n = nums[-1]

    written = 0
    multi_page = 0
    for n in nums:
        start = mapping[n]
        # Determine end page: just before next hymn's start, or start + max_extra
        if n < max_n:
            nxt = mapping[n + 1]
            end = nxt - 1 if nxt > start else start
        else:
            end = min(start + max_extra, total_pdf_pages)
        # Cap pages included
        end = min(end, start + max_extra, total_pdf_pages)

        w = PdfWriter()
        for p in range(start, end + 1):
            if 1 <= p <= total_pdf_pages:
                w.add_page(r.pages[p - 1])
        if len(w.pages) == 0:
            continue
        if len(w.pages) > 1:
            multi_page += 1
        out_path = os.path.join(out_dir, f'{n:03d}.pdf')
        with open(out_path, 'wb') as f:
            w.write(f)
        written += 1
        if written % 100 == 0:
            print(f'  wrote {written}/{len(nums)}', flush=True)

    print(f'\nDone. Wrote {written} per-hymn PDFs to {out_dir}')
    print(f'  Multi-page hymns: {multi_page}')
    # Sample file sizes
    sample = sorted(os.listdir(out_dir))[:5]
    for s in sample:
        p = os.path.join(out_dir, s)
        sz = os.path.getsize(p)
        print(f'  {s}: {sz/1024:.1f} KB')
    total_size = sum(os.path.getsize(os.path.join(out_dir, f)) for f in os.listdir(out_dir))
    print(f'  Total dir size: {total_size / (1024*1024):.1f} MB')

if __name__ == '__main__':
    main()
