"""Match Baptist Psalters (731-774) to PsH1934 entries.

Strategy: for each Baptist Psalter, get the psalm number from incipits.json.
Filter PsH1934 TOC to entries whose title contains a substring from Baptist
incipit, OR scan all PsH1934 entries with that scripture reference.

Since the PsH1934 TOC doesn't include scripture refs, we'll match by
first-line text fragments extracted from the Baptist PDF raw header.

Output: baptist-to-psh1934-map.json mapping Baptist number -> PsH1934 number(s)
to try.
"""
import json, re

BASE = r'C:\Users\Dustina\Websites\church-directory\scripts'
INCIPITS = BASE + r'\baptist-psalter-incipits.json'
TOC = BASE + r'\psh1934-toc.json'
OUT = BASE + r'\baptist-to-psh1934-map.json'

def sigwords(s):
    """Significant words (4+ letters, lowercased)."""
    return set(w for w in re.sub(r'[^a-z ]+', ' ', s.lower()).split() if len(w) > 3)

inc = json.load(open(INCIPITS, encoding='utf-8'))
toc = json.load(open(TOC, encoding='utf-8'))

# Extract candidate first-line snippets from Baptist raw_header
# The structure typically has:
#   scripture preview (line with Psalm N:X)
#   tune name + meter line
#   author lines
#   then garbled music notation
# We want to find any phrase that might match a PsH1934 first-line.
mapping = {}
for n_str, d in inc.items():
    if 'error' in d: continue
    raw = d.get('raw_header', '')
    # Pick the "title" — typically PsH1934 titles are 4-12 words.
    # Look for plausible all-caps/title-case phrases.
    bw = sigwords(raw)
    psalm = d.get('psalm', '').split(':')[0]  # base psalm number only

    # Score every PsH1934 entry
    scores = []
    for pn, ptitle in toc.items():
        tw = sigwords(ptitle)
        overlap = bw & tw
        if len(overlap) >= 2:
            scores.append((len(overlap), int(re.match(r'(\d+)', pn).group(1)), pn, ptitle))
    scores.sort(reverse=True)

    mapping[n_str] = {
        'psalm': psalm,
        'top_candidates': [
            {'psh_num': pn, 'psh_title': pt, 'overlap': sc}
            for sc, _, pn, pt in scores[:5]
        ]
    }

with open(OUT, 'w', encoding='utf-8') as f:
    json.dump(mapping, f, ensure_ascii=False, indent=2)

print(f'Wrote mapping for {len(mapping)} Baptist Psalters')
print()
# Show summary
for n in sorted(mapping.keys(), key=int):
    d = mapping[n]
    top = d['top_candidates'][:1]
    if top:
        c = top[0]
        print(f'  Baptist {n} (Psalm {d["psalm"]}): PsH1934 #{c["psh_num"]} "{c["psh_title"]}" (overlap={c["overlap"]})')
    else:
        print(f'  Baptist {n} (Psalm {d["psalm"]}): NO MATCH')
