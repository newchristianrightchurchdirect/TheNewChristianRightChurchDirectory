"""Copy lyrics from TH1961 to Baptist where the hymn is the same.

Strategy: match by base hymn number AND title-word overlap. If the same number
in TH1961 has the same hymn (verified by >=2 significant title words overlapping,
or by being in the hand-curated OCR-mismatch override list), copy verses across.

Hymns NOT to copy (Baptist genuinely different): 29, 97, 350, 352, 354, 511
(per earlier baptist-audio-overrides.py analysis).
Baptist Psalters 731-774 are new — no TH1961 equivalent.
"""
import json, re

BASE = r'C:\Users\Dustina\Websites\church-directory'
B_JSON = BASE + r'\public\hymnal-data\trinity_hymnal_baptist.json'
T_JSON = BASE + r'\public\hymnal-data\trinity_hymnal_1961.json'

# Same-number hymns known to be DIFFERENT (skip copy)
DIFFERENT = {29, 97, 350, 352, 354, 511}

# Same-number hymns known to be SAME despite OCR title mismatch (force copy)
FORCE_SAME = {
    308, 452, 477, 638, 715, 719, 636, 684, 687, 698, 718, 726, 673,
    # OCR-garbled in Baptist but visibly same hymn as TH1961 (manual review of mismatch log)
    17, 43, 151, 208, 286, 307, 315, 401, 427, 438, 510, 534, 583, 628,
    # Slight title wording diffs that are still the same hymn
    355,
    # Second-pass OCR mismatches that are clearly the same hymn
    653, 674,
}

def base_num(h):
    m = re.match(r'(\d+)', str(h['number']))
    return int(m.group(1)) if m else None

def sigwords(t):
    return set(w for w in re.sub('[^a-z ]+', ' ', (t or '').lower()).split() if len(w) > 3)

with open(B_JSON, encoding='utf-8') as f:
    b = json.load(f)
with open(T_JSON, encoding='utf-8') as f:
    t = json.load(f)

t_by_num = {}
for h in t['hymns']:
    n = base_num(h)
    if n is not None and n not in t_by_num:
        t_by_num[n] = h

copied = skipped_diff = skipped_no_match = skipped_no_th_verses = skipped_already_have = 0
title_mismatches = []
for h in b['hymns']:
    if h.get('verses'):
        skipped_already_have += 1
        continue
    n = base_num(h)
    if n is None: continue
    if n in DIFFERENT:
        skipped_diff += 1
        continue
    th = t_by_num.get(n)
    if not th:
        skipped_no_match += 1
        continue
    # Title overlap check — unless in FORCE_SAME
    if n not in FORCE_SAME:
        bw = sigwords(h.get('title', ''))
        tw = sigwords(th.get('title', ''))
        overlap = bw & tw
        if len(overlap) < 2 and len(tw) >= 2:
            title_mismatches.append((n, h.get('title', '')[:40], th.get('title', '')[:40]))
            continue
    verses = th.get('verses')
    if not verses:
        skipped_no_th_verses += 1
        continue
    # Copy verses, plus tune/meter/author/composer if missing
    h['verses'] = verses
    for f in ('tune', 'meter', 'author', 'composer'):
        if not h.get(f) and th.get(f):
            h[f] = th[f]
    copied += 1

with open(B_JSON, 'w', encoding='utf-8') as f:
    json.dump(b, f, ensure_ascii=False, indent=2)

print(f'Copied verses to {copied} Baptist hymns')
print(f'  already had verses: {skipped_already_have}')
print(f'  skipped (TH1961 different): {skipped_diff}')
print(f'  skipped (no TH1961 same number): {skipped_no_match}')
print(f'  skipped (TH1961 had no verses): {skipped_no_th_verses}')
print(f'  skipped (title mismatch, ambiguous): {len(title_mismatches)}')
print()
if title_mismatches[:15]:
    print('Title mismatches (first 15) — manual review may be needed:')
    for n, bt, tt in title_mismatches[:15]:
        print(f'  #{n}: B={bt!r}  TH={tt!r}')

# Coverage
have = sum(1 for h in b['hymns'] if h.get('verses'))
print(f'\nBaptist lyrics coverage: {have}/{len(b["hymns"])} ({100*have/len(b["hymns"]):.1f}%)')
