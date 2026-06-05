"""Precise Baptist Psalter -> PsH1934 matching using:
  1. Filter PsH1934 entries to those with matching Psalm scripture ref
  2. Among those, pick the one whose first_line shares the most words with
     the Baptist PDF's extracted OCR text.
"""
import json, os, re
from html import unescape

BASE = r'C:\Users\Dustina\Websites\church-directory'
SCR = BASE + r'\scripts\psh1934-scriptures.json'
INC = BASE + r'\scripts\baptist-psalter-incipits.json'
OUT = BASE + r'\scripts\baptist-to-psh1934-final.json'

def sigwords(s):
    return set(w for w in re.sub(r'[^a-z ]+', ' ', s.lower()).split() if len(w) > 3)

psh = json.load(open(SCR, encoding='utf-8'))
inc = json.load(open(INC, encoding='utf-8'))

# Build psalm -> [PsH1934 num] index
by_psalm = {}
for n, d in psh.items():
    for ps in d.get('psalms', []):
        by_psalm.setdefault(ps, []).append(n)

print(f'Psalms covered in PsH1934: {len(by_psalm)}')

final = {}
unmatched = []
for n_str, d in sorted(inc.items(), key=lambda x: int(x[0])):
    if 'error' in d: continue
    psalm = d.get('psalm', '').split(':')[0]
    raw = d.get('raw_header', '')
    bw = sigwords(raw)

    candidates = by_psalm.get(psalm, [])

    # No psalm-match: skip (731/732 might be regular hymns)
    if not candidates:
        unmatched.append((n_str, psalm))
        final[n_str] = {'psalm': psalm, 'psh_num': None, 'reason': 'no PsH1934 with this psalm'}
        continue

    # Score by first-line overlap
    scored = []
    for pn in candidates:
        fl = psh[pn].get('first_line', '')
        tw = sigwords(fl)
        if tw:
            overlap = len(bw & tw) / max(1, len(tw))
        else:
            overlap = 0
        scored.append((overlap, len(bw & tw), pn, fl))
    scored.sort(reverse=True)

    if scored and (scored[0][1] >= 2 or len(scored) == 1):
        final[n_str] = {
            'psalm': psalm,
            'psh_num': scored[0][2],
            'first_line': scored[0][3],
            'overlap_count': scored[0][1],
            'overlap_ratio': round(scored[0][0], 3),
            'confidence': 'high' if scored[0][1] >= 2 else 'low-single-candidate',
            'all_psalm_candidates': [(pn, psh[pn].get('first_line','')[:50]) for _, _, pn, _ in scored],
        }
    else:
        # Multiple candidates but no good overlap — pick first (lowest PsH num)
        if scored:
            best = min(scored, key=lambda x: int(re.match(r'(\d+)', x[2]).group(1)))
            final[n_str] = {
                'psalm': psalm,
                'psh_num': best[2],
                'first_line': best[3],
                'overlap_count': best[1],
                'confidence': 'low-multi-candidate-first-pick',
                'all_psalm_candidates': [(pn, psh[pn].get('first_line','')[:50]) for _, _, pn, _ in scored],
            }
        else:
            final[n_str] = {
                'psalm': psalm,
                'psh_num': None,
                'reason': 'no PsH1934 with this psalm',
            }
            unmatched.append((n_str, psalm))

with open(OUT, 'w', encoding='utf-8') as f:
    json.dump(final, f, ensure_ascii=False, indent=2)

matched = sum(1 for d in final.values() if d.get('psh_num'))
print(f'\nMatched: {matched}/{len(final)}')
print(f'\nUnmatched ({len(unmatched)}):')
for n, ps in unmatched:
    cands = final[n].get('all_psalm_candidates', [])
    print(f'  Baptist {n} Psalm {ps}: candidates={cands}')

print('\nMatches:')
for n in sorted(final.keys(), key=int):
    d = final[n]
    if d.get('psh_num'):
        print(f'  Baptist {n} (Psalm {d["psalm"]}) -> PsH1934 #{d["psh_num"]} "{d.get("first_line","")[:50]}"  overlap={d.get("overlap_count")}')
