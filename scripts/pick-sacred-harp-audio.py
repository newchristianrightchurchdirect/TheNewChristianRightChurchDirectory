"""Choose the best MP3 URL per SH page from BostonSing mapping.

Pilgrim Production URLs (pilgrimproduction.org/sacredharp/.../music/NNN.mp3) are all
dead (404) — site reorganized. Restrict to bostonsing.org / bostonsing.com hosts.

Preference order within those:
1. URL whose filename matches `NNN+TuneName.mp3` (canonical recording, no date/convention).
2. bostonsing.org (curated, smaller re-encodes) over bostonsing.com (older, larger).
3. Shortest filename otherwise (least extra metadata).

SH JSON suffix 'a' = page top, 'b' = page bottom.
BostonSing uses 't' = top, 'b' = bottom — translate.
"""
import json, re
from urllib.parse import unquote

BS_MAP = r'C:\tmp\sh-bostonsing-map.json'
SH_JSON = r'C:\Users\Dustina\Websites\church-directory\public\hymnal-data\sacred_harp_1991.json'
OUT = r'C:\tmp\sh-best-audio.json'

bs = json.load(open(BS_MAP, encoding='utf-8'))
sh = json.load(open(SH_JSON, encoding='utf-8'))

def sh_to_bs_key(n: str) -> str:
    m = re.match(r'(\d+)([ab]?)$', n)
    if not m: return n
    num, suf = m.group(1), m.group(2)
    if suf == 'a': return f'{int(num)}t'
    if suf == 'b': return f'{int(num)}b'
    return str(int(num))

def is_bostonsing(u: str) -> bool:
    return 'bostonsing.org' in u or 'bostonsing.com' in u

def score_url(u: str, page_num: int) -> tuple:
    name = u.rsplit('/', 1)[-1].split('?')[0]
    name_dec = unquote(name)
    pad = f'{page_num:03d}'
    is_canonical = bool(re.match(rf'^{pad}[a-z]?\s*[A-Z]', name_dec))
    is_long_title = len(name_dec) > 40
    is_org = 'bostonsing.org' in u
    return (
        0 if is_canonical else 1,
        0 if is_org else 1,
        0 if not is_long_title else 1,
        len(name_dec),
    )

best = {}
no_match = []
for h in sh['hymns']:
    sh_key = str(h['number'])
    bs_key = sh_to_bs_key(sh_key)
    urls = [u for u in bs.get(bs_key, []) if is_bostonsing(u)]
    if not urls:
        no_match.append(sh_key)
        continue
    m = re.match(r'(\d+)', sh_key)
    page_num = int(m.group(1)) if m else 0
    urls_sorted = sorted(urls, key=lambda u: score_url(u, page_num))
    best[sh_key] = urls_sorted[0]

print(f'Mapped {len(best)}/{len(sh["hymns"])} hymns to a usable MP3')
print(f'No match: {len(no_match)}')
if no_match:
    print(f'  pages with no usable URL: {no_match}')

# Domain distribution
from collections import Counter
domains = Counter()
for u in best.values():
    d = re.match(r'https?://([^/]+)', u).group(1)
    domains[d] += 1
print('\nSource domain distribution:')
for d, c in domains.most_common():
    print(f'  {c:4d}  {d}')

with open(OUT, 'w', encoding='utf-8') as f:
    json.dump({'best': best, 'no_match': no_match}, f, indent=2)
print(f'\nWrote {OUT}')
