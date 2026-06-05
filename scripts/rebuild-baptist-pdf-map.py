"""Rebuild the Baptist hymn->page map from PDF (3) `trinity hymnal (3).pdf`.

Hymns 1-774 occupy pages 23-690 in the source PDF. Pages 1-22 are front matter,
691+ is the London Baptist Confession + indexes.

Header formats observed:
  "THE DIVINE PERFECTIONS 1"           # title section, hymn # at end
  "97 THE COVENANT OF GRACE"           # hymn # leading
  "773"                                 # hymn # alone on first line
  "774 Cause me to hear..."             # hymn # at start of first line
  "Every Day Will I Bless Thee 703"    # hymn title then #

Strategy: scan first 3 lines of each hymn-range page. Extract all 1-3-digit
plausible-hymn candidates (1-774). Filter out meter markers ("8. 7. 8. 7.",
"C.M."), years (1500-2100), psalm-reference numbers. Walk pages monotonically
picking the smallest candidate >= next_expected (allowing skip of ~5 hymns max
per page-gap).
"""
import re, json, pypdf

SRC = r'C:\Users\Dustina\Downloads\trinity hymnal (3).pdf'
OUT = r'C:\Users\Dustina\Websites\church-directory\data\pdf-maps\baptist.json'

HYMN_PAGE_START = 23
HYMN_PAGE_END = 691  # inclusive, last hymn page
MAX_HYMN = 774

# Things that look like numbers but are NOT hymn numbers
METER_RE = re.compile(r'\b\d+\s*\.\s*\d+\s*\.\s*\d+\s*\.\s*\d+')  # 8. 7. 8. 7.
METER2_RE = re.compile(r'\b\d+\s*\.\s*\d+\s*\.\s*\d+\b')          # 6. 8. 4
METER3_RE = re.compile(r'\b[CSL]\.\s*M\.\s*D?\.?')                 # C.M., S.M., L.M.D.
PSALM_REF_RE = re.compile(r'Psalm[s]?\s*\d+', re.I)
SCRIPTURE_REF_RE = re.compile(r'\b(Matt(?:hew)?|Mark|Luke|John|Acts|Rom|Cor|Gal|Eph|Phil|Col|Thess|Tim|Tit|Phlm|Heb|Jas|Pet|Rev|Gen|Exod|Lev|Num|Deut|Josh|Judg|Ruth|Sam|Kings|Chr|Ezra|Neh|Esth|Job|Ps|Prov|Eccl|Song|Isa|Jer|Lam|Ezek|Dan|Hos|Joel|Amos|Obad|Jonah|Mic|Nah|Hab|Zeph|Hag|Zech|Mal)\.?\s*\d+', re.I)
DATE_RE = re.compile(r'\b(1[5-9]\d\d|20\d\d)\b')  # years 1500-2099

def hymn_candidates(text):
    """Return list of plausible hymn numbers from the page header.

    Hymn numbers in this hymnal always appear as a standalone 1-3 digit token
    at either the START or END of line 1 (or line 2 for some title-first
    formats). Examples:
        "1 THE DIVINE PERFECTIONS"        -> 1 leading
        "THE DIVINE PERFECTIONS 1"        -> 1 trailing
        "773"                              -> alone on line
        "Every Day Will I Bless Thee 703" -> 703 trailing
        "(FIRST TUNE) 758"                 -> 758 trailing
        "(FIRST TUNE)"+next line "758"    -> alone

    Reject numbers in the middle (e.g., "Psalm 100:4") and ignore anything
    that doesn't sit at a word boundary at start/end of the line.
    """
    if not text: return []
    lines = [l.strip() for l in text.splitlines() if l.strip()][:3]
    cands = []
    for ln in lines:
        # Standalone number on its own line
        m = re.match(r'^(\d{1,3})\s*\)?\s*$', ln)
        if m:
            n = int(m.group(1))
            if 1 <= n <= MAX_HYMN: cands.append(n); continue
        # Leading number: "N TITLE..." or "N (FIRST TUNE)..."
        m = re.match(r'^(\d{1,3})\s+[A-Z(]', ln)
        if m:
            n = int(m.group(1))
            if 1 <= n <= MAX_HYMN: cands.append(n)
        # Trailing number: "TITLE N" or "TITLE N)" or "(FIRST TUNE) N"
        m = re.search(r'(?:[A-Za-z\)])\s+(\d{1,3})\s*\)?\s*$', ln)
        if m:
            n = int(m.group(1))
            if 1 <= n <= MAX_HYMN: cands.append(n)
    return cands

def main():
    r = pypdf.PdfReader(SRC)
    total = len(r.pages)
    print(f'Source: {SRC} ({total} pages)')
    print(f'Scanning hymn pages {HYMN_PAGE_START}..{HYMN_PAGE_END}')

    page_cands = {}
    for pdf_page in range(HYMN_PAGE_START, min(HYMN_PAGE_END, total) + 1):
        t = r.pages[pdf_page - 1].extract_text() or ''
        cands = hymn_candidates(t)
        if cands:
            page_cands[pdf_page] = cands

    # Walk pages, assign each hymn to its first page.
    # Strategy: tight jump window. Typical hymn-to-hymn jump is 1, occasionally
    # 2-3 (when OCR missed a page). Anything more is almost certainly an OCR
    # mis-read (e.g., "21" rendered as "71"). Tolerate larger jumps only when
    # several pages have gone by without any anchor (likely heavily garbled OCR).
    hymn_to_page = {}
    prev = 0
    prev_page = 0
    for page in sorted(page_cands.keys()):
        cs = sorted(set(page_cands[page]))
        # Allowed jump grows with the page-gap since last anchor (proxy for how
        # many hymns we might have skipped). 1 page-gap => +3, 5 => +7, etc.
        page_gap = page - prev_page
        max_jump = max(3, page_gap + 2)
        chosen = None
        for c in cs:
            if c > prev and c <= prev + max_jump:
                chosen = c; break
        if chosen is None:
            continue
        if chosen not in hymn_to_page:
            hymn_to_page[chosen] = page
            prev = chosen
            prev_page = page

    found = sorted(hymn_to_page.keys())
    print(f'Distinct hymns found: {len(found)} (range {found[0]}..{found[-1]})')
    gaps = [n for n in range(1, found[-1] + 1) if n not in hymn_to_page]
    print(f'Missing within range: {len(gaps)}')
    if gaps[:10]: print(f'  first missing: {gaps[:10]}')

    # Linearly interpolate missing hymns between OCR-anchored pairs.
    # For each pair (hymn_a -> page_x, hymn_b -> page_y) with b > a+1, distribute
    # hymns a+1..b-1 across pages x..y proportionally. If (b-a) == (y-x), each
    # gets its own page; if smaller, some share with predecessor.
    anchors = sorted(hymn_to_page.keys())
    # Anchor hymn 1 at HYMN_PAGE_START if not found
    if 1 not in hymn_to_page:
        hymn_to_page[1] = HYMN_PAGE_START
        anchors = sorted(hymn_to_page.keys())
    # Anchor hymn MAX at last hymn page (we expect 774 to be near the end)
    if MAX_HYMN not in hymn_to_page:
        hymn_to_page[MAX_HYMN] = HYMN_PAGE_END - 1
        anchors = sorted(hymn_to_page.keys())

    filled = 0
    for i in range(len(anchors) - 1):
        a = anchors[i]
        b = anchors[i + 1]
        if b == a + 1: continue
        x = hymn_to_page[a]
        y = hymn_to_page[b]
        span_hymns = b - a   # hymns between (exclusive of a, inclusive of b)
        span_pages = y - x
        for k in range(1, b - a):
            n = a + k
            # Map proportionally
            pg = x + round(k * span_pages / span_hymns)
            # Ensure monotonic (>= prev hymn's page)
            prev_pg = hymn_to_page[n - 1]
            if pg < prev_pg: pg = prev_pg
            hymn_to_page[n] = pg
            filled += 1
    print(f'Interpolated missing: {filled}')

    # Sanity check: print samples
    print('\nSamples:')
    for n in [1, 2, 10, 50, 100, 200, 300, 400, 500, 573, 574, 600, 650, 700, 730, 740, 750, 760, 770, 773, 774]:
        print(f'  {n}: page {hymn_to_page.get(n)}')

    out = {str(k): hymn_to_page[k] for k in sorted(hymn_to_page.keys())}
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump(out, f, indent=2)
    print(f'\nWrote {len(out)} entries to {OUT}')

if __name__ == '__main__':
    main()
