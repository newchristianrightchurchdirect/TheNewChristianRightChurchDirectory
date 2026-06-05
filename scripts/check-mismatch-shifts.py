"""For each clear-mismatch hymn, check if +1, +2 page shift would resolve it.
The mismatches are typically pairs (8,9), (20,21) etc. where two hymns got
mapped to the same source page — the second one should likely be +1 page."""
import json, re, pypdf

MISMATCHES = [8, 9, 20, 21, 91, 92, 126, 162, 163, 215, 216, 321, 532, 533, 541, 552, 723, 754, 756]
SRC = r'C:\Users\Dustina\Downloads\trinity hymnal (3).pdf'
MAP = r'C:\Users\Dustina\Websites\church-directory\data\pdf-maps\baptist.json'

def hymn_anchors(text):
    if not text: return []
    lines = [l.strip() for l in text.splitlines() if l.strip()][:3]
    cands = []
    for ln in lines:
        m = re.match(r'^(\d{1,3})\s*\)?\s*$', ln)
        if m:
            n = int(m.group(1))
            if 1 <= n <= 774: cands.append(n); continue
        m = re.match(r'^(\d{1,3})\s+[A-Z(]', ln)
        if m:
            n = int(m.group(1))
            if 1 <= n <= 774: cands.append(n)
        m = re.search(r'(?:[A-Za-z\)])\s+(\d{1,3})\s*\)?\s*$', ln)
        if m:
            n = int(m.group(1))
            if 1 <= n <= 774: cands.append(n)
    return cands

m = json.load(open(MAP))
r = pypdf.PdfReader(SRC)

fixes = {}
for n in MISMATCHES:
    cur = m[str(n)]
    print(f'\nHymn {n}: currently page {cur}')
    for shift in [0, 1, 2]:
        p = cur + shift
        if p > len(r.pages): break
        t = r.pages[p - 1].extract_text() or ''
        anchors = hymn_anchors(t)
        first = ' | '.join([l for l in t.splitlines() if l.strip()][:2])[:100]
        marker = ''
        if n in anchors:
            marker = '  <-- MATCH'
            if shift > 0 and n not in fixes:
                fixes[n] = p
        elif (n-1) in anchors or (n+1) in anchors:
            marker = '  (adj)'
        print(f'  +{shift} (page {p}): anchors={anchors[:3]} | {first}{marker}')

print(f'\n\nProposed fixes ({len(fixes)}):')
for n, p in sorted(fixes.items()):
    print(f'  hymn {n}: {m[str(n)]} -> {p}')
