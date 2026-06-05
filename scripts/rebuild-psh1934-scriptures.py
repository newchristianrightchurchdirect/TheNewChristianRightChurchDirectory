"""Re-extract psalm number from cached PsH1934 HTML using the popover-header
pattern."""
import json, os, re
from html import unescape

BASE = r'C:\Users\Dustina\Websites\church-directory\scripts'
OUT = BASE + r'\psh1934-scriptures.json'
CACHE = r'C:\tmp\hymnary-psh1934-cache'

PSALM_RE = re.compile(r'popover-header">(?:Psalm|Ps\.?)\s*(\d+)', re.I)

# also extract first line
TEXT_DIV_RE = re.compile(r'<div id="text">(.*?)</div>', re.S)
P_RE = re.compile(r'<p[^>]*>(.*?)</p>', re.S)
TAG_RE = re.compile(r'<[^>]+>')

out = {}
files = sorted(os.listdir(CACHE), key=lambda x: int(re.match(r'(\d+)', x).group(1)))
for fn in files:
    n = fn.replace('.html', '')
    html = open(os.path.join(CACHE, fn), encoding='utf-8').read()
    # All psalm mentions in popovers
    psalms = sorted(set(PSALM_RE.findall(html)), key=int)
    # First line
    first_line = ''
    m = TEXT_DIV_RE.search(html)
    if m:
        m2 = P_RE.search(m.group(1))
        if m2:
            t = re.sub(r'<br\s*/?>', '\n', m2.group(1))
            t = TAG_RE.sub('', t)
            t = unescape(t).strip()
            for ln in t.splitlines():
                ln = ln.strip()
                if ln:
                    first_line = re.sub(r'^\d+[\.\s]+', '', ln)
                    break
    out[n] = {'psalms': psalms, 'first_line': first_line}

with open(OUT, 'w', encoding='utf-8') as f:
    json.dump(out, f, ensure_ascii=False, indent=2)

with_psalm = sum(1 for d in out.values() if d['psalms'])
print(f'Total: {len(out)}, with psalm ref: {with_psalm}')
# Show some samples
for k in ['1', '20', '67', '100', '300', '400']:
    if k in out: print(f'  {k}: psalms={out[k]["psalms"]} first={out[k]["first_line"][:50]!r}')
