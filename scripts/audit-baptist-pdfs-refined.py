"""Refined audit of Baptist per-hymn PDFs.

For each hymn N, check whether N appears as a hymn-number anchor on EITHER
page 1 OR page 2 of the split PDF. This eliminates false positives from
continuation pages (where page 1 is the back-half of hymn N-1 and page 2
starts hymn N).

Uses the same strict patterns as rebuild-baptist-pdf-map.py.
"""
import os, re, pypdf

DIR = r'C:\Users\Dustina\Websites\church-directory\public\hymnal-media\baptist-sheet'

MAX_HYMN = 774

def hymn_anchors(text):
    """Return list of plausible hymn numbers from the first 3 lines."""
    if not text: return []
    lines = [l.strip() for l in text.splitlines() if l.strip()][:3]
    cands = []
    for ln in lines:
        m = re.match(r'^(\d{1,3})\s*\)?\s*$', ln)
        if m:
            n = int(m.group(1))
            if 1 <= n <= MAX_HYMN: cands.append(n); continue
        m = re.match(r'^(\d{1,3})\s+[A-Z(]', ln)
        if m:
            n = int(m.group(1))
            if 1 <= n <= MAX_HYMN: cands.append(n)
        m = re.search(r'(?:[A-Za-z\)])\s+(\d{1,3})\s*\)?\s*$', ln)
        if m:
            n = int(m.group(1))
            if 1 <= n <= MAX_HYMN: cands.append(n)
    return cands

correct = 0
adjacent = 0   # found N-1 or N+1 only (off by one in source numbering OCR)
mismatch = 0   # found a clearly-wrong number
unverified = 0 # no anchors detected on either page
mismatch_list = []

for n in range(1, MAX_HYMN + 1):
    path = os.path.join(DIR, f'{n:03d}.pdf')
    if not os.path.exists(path):
        mismatch_list.append((n, 'MISSING'))
        mismatch += 1
        continue
    try:
        r = pypdf.PdfReader(path)
        anchors = []
        for pg in range(min(2, len(r.pages))):
            t = r.pages[pg].extract_text() or ''
            anchors.extend(hymn_anchors(t))
    except Exception as e:
        mismatch_list.append((n, f'ERROR: {e}'))
        mismatch += 1
        continue

    if not anchors:
        unverified += 1
        continue
    if n in anchors:
        correct += 1
    elif (n - 1) in anchors or (n + 1) in anchors:
        adjacent += 1
        mismatch_list.append((n, f'adjacent: anchors={anchors[:5]}'))
    else:
        mismatch += 1
        mismatch_list.append((n, f'WRONG: anchors={anchors[:5]}'))

print(f'Total hymns: {MAX_HYMN}')
print(f'  Correct (N found on page 1 or 2):  {correct}')
print(f'  Adjacent (N-1 or N+1 found):       {adjacent}')
print(f'  Clear mismatch:                    {mismatch}')
print(f'  Unverified (no anchors detectable): {unverified}')
print()
print(f'Clear mismatches (first 30):')
clear = [x for x in mismatch_list if 'WRONG' in x[1] or 'MISSING' in x[1] or 'ERROR' in x[1]]
for n, why in clear[:30]:
    print(f'  #{n}: {why}')
print(f'\nTotal clear mismatches: {len(clear)}')

# Print all clear mismatches
print('\nAll clear-mismatch hymn numbers:')
print(sorted([n for n, _ in clear]))
