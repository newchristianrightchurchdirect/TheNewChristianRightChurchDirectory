"""Scrape lyrics from hymnary.org/hymn/TH1990/N for all 742 TH1990 hymns.

Lyrics structure: <div id="text"><p>1 line1<br />line2<br /></p><p>2 ...</p>...

Polite rate: 0.8s/req. Resumable via cache file."""
import json, os, re, time, urllib.request, urllib.error
from html import unescape

JSON_PATH = r'C:\Users\Dustina\Websites\church-directory\public\hymnal-data\trinity_hymnal_1990.json'
CACHE_DIR = r'C:\tmp\hymnary-th1990-cache'
os.makedirs(CACHE_DIR, exist_ok=True)

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
    """Return list of {number, isChorus, text}."""
    m = text_re.search(html)
    if not m:
        return []
    block = m.group(1)
    verses = []
    for p in p_re.findall(block):
        # Convert <br /> to newlines, drop other tags, unescape
        s = re.sub(r'<br\s*/?>', '\n', p)
        s = tag_re.sub('', s).strip()
        s = unescape(s)
        if not s:
            continue
        # Detect verse number prefix or "Refrain"/"Chorus"
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

# Load JSON
data = json.load(open(JSON_PATH, encoding='utf-8'))
hymns = data['hymns']
print(f'TH1990: {len(hymns)} hymns')

filled = skipped = not_found = errors = 0
fail_log = []
t0 = time.time()

for i, h in enumerate(hymns):
    n = str(h.get('number', ''))
    if h.get('verses') and len(h['verses']) > 0:
        skipped += 1
        continue
    # Strip a/b suffix for hymnary URL — hymnary uses base num
    base = re.match(r'(\d+)', n)
    if not base:
        continue
    url_num = base.group(1)
    cache = os.path.join(CACHE_DIR, f'{n}.html')
    if os.path.exists(cache) and os.path.getsize(cache) > 1000:
        html = open(cache, encoding='utf-8').read()
        status = 200
    else:
        url = f'https://hymnary.org/hymn/TH1990/{url_num}'
        html, status = fetch(url)
        if html:
            with open(cache, 'w', encoding='utf-8') as f:
                f.write(html)
        time.sleep(0.8)
    if status == 404 or not html:
        not_found += 1
        fail_log.append((n, status))
        continue
    verses = parse_verses(html)
    if not verses:
        errors += 1
        fail_log.append((n, 'no verses parsed'))
        continue
    h['verses'] = verses
    filled += 1
    if filled % 25 == 0:
        elapsed = time.time() - t0
        rate = (filled + not_found + errors) / elapsed if elapsed else 0
        remaining = len(hymns) - (i + 1)
        eta = remaining / rate if rate else 0
        print(f'  [{i+1}/{len(hymns)}] filled={filled} 404={not_found} err={errors} '
              f'rate={rate:.1f}/s eta={eta/60:.1f}min', flush=True)
        # Periodic save in case of crash
        with open(JSON_PATH, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

# Final save
with open(JSON_PATH, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f'\nDone. filled={filled} skipped={skipped} 404={not_found} errors={errors}')
if fail_log[:20]:
    print('First failures:')
    for n, s in fail_log[:20]:
        print(f'  #{n}: {s}')

total_with = sum(1 for h in hymns if h.get('verses'))
print(f'TH1990 lyrics coverage: {total_with}/{len(hymns)} ({100*total_with/len(hymns):.1f}%)')
