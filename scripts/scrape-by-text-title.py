"""Generic scraper: for each hymn missing lyrics, search hymnary.org by title
and extract from /text/ aggregator pages (which embed lyrics under
<div property="text">)."""
import json, os, re, time, urllib.request, urllib.parse, urllib.error
from html import unescape

BASE = r'C:\Users\Dustina\Websites\church-directory'

TARGETS = [
    ('trinity_hymnal_1961.json',  'th1961-by-title'),
    ('sacred_harp_1991.json',     'sh1991-by-title'),
    ('cantus_christi.json',       'cc-by-title'),
    ('trinity_hymnal_1990.json',  'th1990-by-title'),
]

UA = 'Mozilla/5.0 (NXR-Hymnal lyrics scraper; contact: gecko215059@gmail.com)'
TEXT_DIV_RE = re.compile(r'<div id="text">(.*?)</div>', re.S)
TEXT_PROP_RE = re.compile(r"<div\s+property=['\"]text['\"]>(.*?)</div>\s*</div>", re.S)
P_RE = re.compile(r'<p[^>]*>(.*?)</p>', re.S)
TAG_RE = re.compile(r'<[^>]+>')
TEXT_LINK_RE = re.compile(r'href=[\'"](/text/[a-z0-9_\-]+)(?:#[^\'"]*)?[\'"]')

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

def clean_query(title):
    """Strip common OCR garble and make a good search query."""
    # Remove non-alpha-num except spaces
    q = re.sub(r"[^A-Za-z' \-]", ' ', title)
    q = re.sub(r'\s+', ' ', q).strip()
    return q[:60]

def search_text_url(q, cache_dir):
    """Search hymnary for a text and return URL of first /text/ result."""
    cache_key = re.sub(r'\W+', '_', q)[:80]
    cache = os.path.join(cache_dir, cache_key + '_search.html')
    if os.path.exists(cache) and os.path.getsize(cache) > 1000:
        html = open(cache, encoding='utf-8').read()
    else:
        url = f'https://hymnary.org/search?qu={urllib.parse.quote(q)}'
        html, status = fetch(url)
        if not html: return None
        with open(cache, 'w', encoding='utf-8') as f:
            f.write(html)
        time.sleep(0.7)
    m = TEXT_LINK_RE.search(html)
    if m: return 'https://hymnary.org' + m.group(1)
    return None

def fetch_text_page(url, cache_dir, key):
    cache = os.path.join(cache_dir, f'{key}_text.html')
    if os.path.exists(cache) and os.path.getsize(cache) > 1000:
        return open(cache, encoding='utf-8').read()
    html, status = fetch(url)
    if not html: return None
    with open(cache, 'w', encoding='utf-8') as f:
        f.write(html)
    time.sleep(0.7)
    return html

def first_words_match(verses, query_words):
    """Sanity check: does the title text appear ANYWHERE in the lyrics?
    Many hymns are titled by refrain phrase, not by first line."""
    if not verses: return False
    all_text = ' '.join(v.get('text', '') for v in verses).lower()
    matches = sum(1 for w in query_words if w in all_text)
    return matches >= max(1, len(query_words) // 2)

for fname, cache_sub in TARGETS:
    cache_dir = os.path.join(r'C:\tmp', f'hymnary-{cache_sub}-cache')
    os.makedirs(cache_dir, exist_ok=True)

    path = os.path.join(BASE, 'public', 'hymnal-data', fname)
    d = json.load(open(path, encoding='utf-8'))
    hymns = d['hymns']
    missing = [h for h in hymns if not h.get('verses')]
    print(f'\n{"="*60}\n{fname}: {len(missing)} missing\n{"="*60}')

    filled = 0
    failed = []
    for h in missing:
        n = h.get('number')
        title = h.get('title', '')
        if not title or len(title) < 4:
            failed.append((n, 'title too short'))
            continue
        q = clean_query(title)
        url = search_text_url(q, cache_dir)
        if not url:
            failed.append((n, f'no /text/ hit: {q!r}'))
            continue
        html = fetch_text_page(url, cache_dir, str(n))
        if not html:
            failed.append((n, f'fetch failed: {url}'))
            continue
        verses = parse_verses(html)
        if not verses:
            failed.append((n, f'no verses: {url}'))
            continue
        # Sanity check title overlap
        title_words = set(w for w in re.sub(r'[^a-z ]+', ' ', title.lower()).split() if len(w) > 3)
        if title_words and not first_words_match(verses, title_words):
            failed.append((n, f'verse 1 mismatches title; url={url}'))
            continue
        h['verses'] = verses
        filled += 1
        if filled % 20 == 0:
            print(f'  filled {filled}/{len(missing)}', flush=True)
            with open(path, 'w', encoding='utf-8') as f:
                json.dump(d, f, ensure_ascii=False, indent=2)

    with open(path, 'w', encoding='utf-8') as f:
        json.dump(d, f, ensure_ascii=False, indent=2)
    total = sum(1 for h in hymns if h.get('verses'))
    print(f'  Filled {filled}/{len(missing)}; failed {len(failed)}')
    print(f'  Coverage: {total}/{len(hymns)} ({100*total/len(hymns):.1f}%)')
    if failed[:5]:
        print(f'  First failures:')
        for n, why in failed[:5]:
            print(f'    {n}: {why}')
