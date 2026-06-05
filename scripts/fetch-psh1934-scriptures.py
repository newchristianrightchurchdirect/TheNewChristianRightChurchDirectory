"""For each PsH1934 hymn, fetch and extract scripture reference + first line.
Cache HTML per-hymn so this is resumable."""
import json, os, re, time, urllib.request
from html import unescape

BASE = r'C:\Users\Dustina\Websites\church-directory\scripts'
TOC = BASE + r'\psh1934-toc.json'
OUT = BASE + r'\psh1934-scriptures.json'
CACHE = r'C:\tmp\hymnary-psh1934-cache'
os.makedirs(CACHE, exist_ok=True)

UA = 'Mozilla/5.0 (NXR-Hymnal lyrics scraper; contact: gecko215059@gmail.com)'

def fetch(url, retries=3):
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': UA})
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.read().decode('utf-8', errors='replace'), r.status
        except Exception as e:
            if attempt == retries - 1:
                return None, str(e)
            time.sleep(2 ** attempt)

toc = json.load(open(TOC, encoding='utf-8'))
existing = {}
if os.path.exists(OUT):
    existing = json.load(open(OUT, encoding='utf-8'))

# Scripture extraction patterns: hymnary.org shows scripture in a header label
SCR_RE = re.compile(r'Scripture\s*Re(?:fs|ferences)?:?\s*</[^>]+>\s*<[^>]*>([^<]+)', re.I)
SCR_LINK_RE = re.compile(r'<a[^>]+href="/scripture/[^"]+"[^>]*>([^<]+)</a>')

for n in sorted(toc.keys(), key=lambda x: int(re.match(r'(\d+)', x).group(1))):
    if n in existing and existing[n].get('scripture'):
        continue
    cache_file = os.path.join(CACHE, f'{n}.html')
    if os.path.exists(cache_file) and os.path.getsize(cache_file) > 1000:
        html = open(cache_file, encoding='utf-8').read()
    else:
        html, status = fetch(f'https://hymnary.org/hymn/PsH1934/{n}')
        if not html:
            existing[n] = {'error': str(status)}
            continue
        with open(cache_file, 'w', encoding='utf-8') as f:
            f.write(html)
        time.sleep(0.6)
    # Extract scripture
    scrs = []
    for m in SCR_LINK_RE.finditer(html):
        s = m.group(1).strip()
        if re.match(r'^(Psalm|Ps\.?)', s, re.I):
            scrs.append(s)
    # Extract first line of text
    first_line = ''
    m = re.search(r'<div id="text">(.*?)</div>', html, re.S)
    if m:
        block = m.group(1)
        m2 = re.search(r'<p[^>]*>(.*?)</p>', block, re.S)
        if m2:
            t = re.sub(r'<br\s*/?>', '\n', m2.group(1))
            t = re.sub(r'<[^>]+>', '', t)
            t = unescape(t).strip()
            # First non-empty line, strip leading "1 " or "1." prefix
            for ln in t.splitlines():
                ln = ln.strip()
                if ln:
                    first_line = re.sub(r'^\d+[\.\s]+', '', ln)
                    break
    existing[n] = {'scripture': scrs, 'first_line': first_line, 'title': toc[n]}

    if int(re.match(r'(\d+)', n).group(1)) % 30 == 0:
        print(f'  reached {n}: {len(existing)} done', flush=True)
        with open(OUT, 'w', encoding='utf-8') as f:
            json.dump(existing, f, ensure_ascii=False, indent=2)

with open(OUT, 'w', encoding='utf-8') as f:
    json.dump(existing, f, ensure_ascii=False, indent=2)
print(f'Done. {len(existing)} entries')
