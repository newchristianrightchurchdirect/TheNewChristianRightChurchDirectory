"""Verify hymnary.org PsH1934 provides clean lyrics for the 1912 Psalter."""
import re, urllib.request
from html import unescape

UA = 'Mozilla/5.0 (NXR-Hymnal lyrics scraper; contact: gecko215059@gmail.com)'
text_re = re.compile(r'<div id="text">(.*?)</div>', re.S)
p_re = re.compile(r'<p[^>]*>(.*?)</p>', re.S)
tag_re = re.compile(r'<[^>]+>')

def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode('utf-8', errors='replace')

html = fetch('https://hymnary.org/hymn/PsH1934/67')
m = text_re.search(html)
if not m:
    print('NO <div id="text"> found')
else:
    block = m.group(1)
    for i, p in enumerate(p_re.findall(block)):
        s = re.sub(r'<br\s*/?>', '\n', p)
        s = tag_re.sub('', s).strip()
        s = unescape(s)
        if not s: continue
        print(f'--- VERSE {i+1} ---')
        print(s)
