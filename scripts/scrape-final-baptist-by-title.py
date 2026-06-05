"""For the 13 remaining Baptist hymns missing lyrics, search hymnary.org by
title-text to find an authoritative version. Try multiple hymnal codes
(PsH1934, TH1961, TH1990, BPsH, CMHC) — pick the first with parseable lyrics."""
import json, os, re, time, urllib.request, urllib.parse
from html import unescape

BASE = r'C:\Users\Dustina\Websites\church-directory'
B_JSON = BASE + r'\public\hymnal-data\trinity_hymnal_baptist.json'
CACHE_DIR = r'C:\tmp\hymnary-baptist-final-cache'
os.makedirs(CACHE_DIR, exist_ok=True)

# (Baptist number, search query (text first line, stripped of OCR garble), psalter/hymnal flag)
SEARCH = {
    29:  'As the sun doth daily rise',  # morning hymn
    97:  "I've found the pearl of greatest price",
    350: 'Here O ye faithful see',
    352: 'Come Holy Spirit Dove divine',
    354: 'Glory to God whose Spirit draws',
    435: 'What ye ask me is my prize',
    511: 'Witness ye men and angels now',
    700: 'When we walk with the Lord',  # "Trust and Obey" - already have it from 700.pdf
    703: 'Every Day Will I Bless Thee',
    727: 'When the Roll Is Called Up Yonder',
    729: 'Home of the Soul',
    731: 'And can it be that I should gain',
    741: 'Teach me the measure of my days',
}

UA = 'Mozilla/5.0 (NXR-Hymnal lyrics scraper; contact: gecko215059@gmail.com)'
TEXT_DIV_RE = re.compile(r'<div id="text">(.*?)</div>', re.S)
TEXT_PROP_RE = re.compile(r"<div\s+property=['\"]text['\"]>(.*?)</div>\s*</div>", re.S)
P_RE = re.compile(r'<p[^>]*>(.*?)</p>', re.S)
TAG_RE = re.compile(r'<[^>]+>')

def fetch(url, retries=3):
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': UA})
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.read().decode('utf-8', errors='replace'), r.status
        except urllib.error.HTTPError as e:
            if e.code == 404: return None, 404
            if attempt == retries - 1: return None, e.code
            time.sleep(2 ** attempt)
        except Exception as e:
            if attempt == retries - 1: return None, str(e)
            time.sleep(2 ** attempt)

def parse_verses(html):
    m = TEXT_DIV_RE.search(html) or TEXT_PROP_RE.search(html)
    if not m: return []
    verses = []
    for p in P_RE.findall(m.group(1)):
        s = re.sub(r'<br\s*/?>', '\n', p)
        s = TAG_RE.sub('', s).strip()
        s = unescape(s)
        if not s: continue
        is_chorus = False
        num = ''
        m1 = re.match(r'^(Refrain|Chorus)[:\s]*\n?', s, re.I)
        if m1:
            is_chorus = True
            s = s[m1.end():].strip()
        else:
            m2 = re.match(r'^(\d+)[\.\s]+', s)
            if m2:
                num = m2.group(1)
                s = s[m2.end():].strip()
        verses.append({'number': num, 'isChorus': str(is_chorus), 'text': s})
    return verses

def search_text(query):
    """Search hymnary.org for a text — return first URL of an instance with full text."""
    cache = os.path.join(CACHE_DIR, re.sub(r'\W+', '_', query)[:60] + '_search.html')
    if os.path.exists(cache):
        html = open(cache, encoding='utf-8').read()
    else:
        url = f'https://hymnary.org/search?qu={urllib.parse.quote(query)}'
        html, status = fetch(url)
        if not html: return None
        with open(cache, 'w', encoding='utf-8') as f:
            f.write(html)
        time.sleep(1.0)
    # Find /text/* link — these are aggregated text pages
    m = re.search(r'href=[\'"](/text/[a-z0-9_\-]+)(?:#[^\'"]*)?[\'"]', html)
    if m: return 'https://hymnary.org' + m.group(1)
    return None

b = json.load(open(B_JSON, encoding='utf-8'))
b_by = {h.get('number'): h for h in b['hymns']}

filled = 0
failed = []
for num, q in SEARCH.items():
    h = b_by.get(num)
    if not h:
        failed.append((num, 'not in JSON'))
        continue
    if h.get('verses'):
        continue
    url = search_text(q)
    if not url:
        failed.append((num, f'no /text/ result for: {q}'))
        continue
    cache = os.path.join(CACHE_DIR, f'{num}_text.html')
    if os.path.exists(cache):
        html = open(cache, encoding='utf-8').read()
    else:
        html, status = fetch(url)
        if not html:
            failed.append((num, f'fetch {url} failed: {status}'))
            continue
        with open(cache, 'w', encoding='utf-8') as f:
            f.write(html)
        time.sleep(0.8)
    verses = parse_verses(html)
    if not verses:
        failed.append((num, f'no verses parsed from {url}'))
        continue
    h['verses'] = verses
    filled += 1
    print(f'  {num}: filled {len(verses)} verses from {url}')

with open(B_JSON, 'w', encoding='utf-8') as f:
    json.dump(b, f, ensure_ascii=False, indent=2)

print(f'\nFilled: {filled}/{len(SEARCH)}')
if failed:
    print('Failed:')
    for n, why in failed:
        print(f'  {n}: {why}')

total = sum(1 for h in b['hymns'] if h.get('verses'))
print(f'\nBaptist coverage: {total}/{len(b["hymns"])} ({100*total/len(b["hymns"]):.1f}%)')
