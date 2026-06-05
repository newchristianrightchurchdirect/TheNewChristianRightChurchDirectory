"""Scrape lyrics from hymnary.org for hymns still missing them across multiple
hymnals. Skips Baptist (no known hymnary code — handled separately) and TH1990
(already done).

Polite rate: 0.8s/req. Resumable via per-hymnal cache dirs."""
import json, os, re, time, urllib.request, urllib.error
from html import unescape

BASE = r'C:\Users\Dustina\Websites\church-directory'

# (json_filename, hymnary_code, cache_subdir)
TARGETS = [
    ('trinity_hymnal_1961.json', 'TH1961', 'th1961'),
    ('sacred_harp_1991.json',    'SH1991', 'sh1991'),
    ('hymns_of_grace.json',      'HoG2015', 'hog2015'),
    ('cantus_christi.json',      None,     'cc'),  # CC not on hymnary — skip
]

UA = 'Mozilla/5.0 (NXR-Hymnal lyrics scraper; contact: gecko215059@gmail.com)'
text_re = re.compile(r'<div id="text">(.*?)</div>', re.S)
p_re = re.compile(r'<p[^>]*>(.*?)</p>', re.S)
tag_re = re.compile(r'<[^>]+>')

def fetch(url, retries=3):
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': UA})
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.read().decode('utf-8', errors='replace'), r.status
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return None, 404
            if attempt == retries - 1:
                return None, e.code
            time.sleep(2 ** attempt)
        except Exception as e:
            if attempt == retries - 1:
                return None, str(e)
            time.sleep(2 ** attempt)

def parse_verses(html):
    m = text_re.search(html)
    if not m: return []
    block = m.group(1)
    verses = []
    for p in p_re.findall(block):
        s = re.sub(r'<br\s*/?>', '\n', p)
        s = tag_re.sub('', s).strip()
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

for fname, code, cache_sub in TARGETS:
    print(f'\n{"="*70}')
    print(f'{fname}  (code={code})')
    print("="*70)
    path = os.path.join(BASE, 'public', 'hymnal-data', fname)
    d = json.load(open(path, encoding='utf-8'))
    hymns = d['hymns']
    missing = [h for h in hymns if not h.get('verses')]
    print(f'Missing lyrics: {len(missing)}/{len(hymns)}')
    if not code:
        print('  (no hymnary code — skipped)')
        continue

    cache_dir = os.path.join(r'C:\tmp', f'hymnary-{cache_sub}-cache')
    os.makedirs(cache_dir, exist_ok=True)

    filled = not_found = errors = 0
    t0 = time.time()

    for i, h in enumerate(missing):
        n = str(h.get('number', ''))
        base = re.match(r'(\d+)', n)
        if not base: continue
        url_num = base.group(1)
        cache = os.path.join(cache_dir, f'{n}.html')
        if os.path.exists(cache) and os.path.getsize(cache) > 1000:
            html = open(cache, encoding='utf-8').read()
            status = 200
        else:
            url = f'https://hymnary.org/hymn/{code}/{url_num}'
            html, status = fetch(url)
            if html:
                with open(cache, 'w', encoding='utf-8') as f:
                    f.write(html)
            time.sleep(0.8)
        if status == 404 or not html:
            not_found += 1
            continue
        verses = parse_verses(html)
        if not verses:
            errors += 1
            continue
        h['verses'] = verses
        filled += 1
        if filled % 25 == 0:
            elapsed = time.time() - t0
            rate = (filled + not_found + errors) / elapsed if elapsed else 0
            print(f'  [{i+1}/{len(missing)}] filled={filled} 404={not_found} err={errors} rate={rate:.1f}/s', flush=True)
            with open(path, 'w', encoding='utf-8') as f:
                json.dump(d, f, ensure_ascii=False, indent=2)

    with open(path, 'w', encoding='utf-8') as f:
        json.dump(d, f, ensure_ascii=False, indent=2)
    has = sum(1 for h in hymns if h.get('verses'))
    print(f'  done: filled={filled} 404={not_found} err={errors}')
    print(f'  coverage now: {has}/{len(hymns)} ({100*has/len(hymns):.1f}%)')
