"""Fetch the full PsH1934 table of contents from hymnary.org.
Pages: 1-100, 101-200, 201-300, 301-400, 401-468."""
import re, time, urllib.request, json
from html import unescape

UA = 'Mozilla/5.0 (NXR-Hymnal lyrics scraper; contact: gecko215059@gmail.com)'
OUT = r'C:\Users\Dustina\Websites\church-directory\scripts\psh1934-toc.json'

def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode('utf-8', errors='replace')

# Each TOC row: link to /hymn/PsH1934/N with title in text
toc = {}
for page in range(0, 5):
    url = f'https://hymnary.org/hymnal/PsH1934?page={page}'
    html = fetch(url)
    # Match anchor tags
    for m in re.finditer(r"<a[^>]+href=['\"]/hymn/PsH1934/(\d+(?:[ab])?)['\"][^>]*>([^<]+)</a>", html):
        n, title = m.group(1), unescape(m.group(2)).strip()
        if n not in toc or len(title) > len(toc[n]):
            toc[n] = title
    print(f'page {page}: total so far={len(toc)}')
    time.sleep(0.5)

with open(OUT, 'w', encoding='utf-8') as f:
    json.dump(toc, f, ensure_ascii=False, indent=2)

print(f'\nWrote {len(toc)} hymn titles')
# print last 5
for n in sorted(toc.keys(), key=lambda x: int(re.match(r'(\d+)', x).group(1)))[-5:]:
    print(f'  {n}: {toc[n]}')
