"""
Mirror remaining external URLs for cantus_christi.json:
- 1 christkirk audio
- 3 christkirk sheet PDFs
- 53 hymnary.org audio MP3s

YouTube URLs are left as-is (cannot be mirrored).
"""
import json, os, re, urllib.request, urllib.parse, time, ssl

BASE = r'C:/Users/Dustina/Websites/church-directory/public'
JSON_PATH = os.path.join(BASE, 'hymnal-data/cantus_christi.json')
AUDIO_DIR = os.path.join(BASE, 'hymnal-media/cc-audio')
SHEET_DIR = os.path.join(BASE, 'hymnal-media/cc-sheet')

os.makedirs(AUDIO_DIR, exist_ok=True)
os.makedirs(SHEET_DIR, exist_ok=True)

def safe_slug(s):
    s = re.sub(r'[^a-zA-Z0-9._-]+', '-', s).strip('-')
    return s[:80] or 'untitled'

def fetch(url, dst):
    if os.path.exists(dst) and os.path.getsize(dst) > 1000:
        return 'cached'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    ctx = ssl.create_default_context()
    try:
        with urllib.request.urlopen(req, timeout=60, context=ctx) as r:
            with open(dst, 'wb') as f:
                f.write(r.read())
        return 'ok'
    except Exception as e:
        return f'fail: {e}'

with open(JSON_PATH, encoding='utf-8') as f:
    data = json.load(f)
hymns = data.get('hymns') or data.get('items') or []

results = {'audio_done': 0, 'audio_fail': 0, 'sheet_done': 0, 'sheet_fail': 0, 'skipped_yt': 0}
fails = []

for h in hymns:
    num = h.get('number') or ''
    title = h.get('title') or ''
    a = h.get('audioUrl') or ''
    s = h.get('sheetMusicUrl') or ''

    if a.startswith('http'):
        if 'youtu' in a:
            results['skipped_yt'] += 1
        elif 'hymnary' in a or 'christkirk' in a:
            ext = '.mp3'
            fname = f'ext-{safe_slug(str(num))}-{safe_slug(title)}{ext}'
            dst = os.path.join(AUDIO_DIR, fname)
            r = fetch(a, dst)
            if r in ('ok', 'cached'):
                h['audioUrl'] = f'/hymnal-media/cc-audio/{fname}'
                results['audio_done'] += 1
                print(f'AUDIO {num:>6}: {r}')
            else:
                results['audio_fail'] += 1
                fails.append((num, 'audio', a, r))
                print(f'AUDIO {num:>6}: {r}')

    if s.startswith('http') and 'christkirk' in s:
        ext = '.pdf'
        fname = f'ext-{safe_slug(str(num))}-{safe_slug(title)}{ext}'
        dst = os.path.join(SHEET_DIR, fname)
        # christkirk pages are HTML wrappers — we'd need to scrape PDF links.
        # Mark as a fail to inspect manually.
        r = fetch(s, dst)
        if r in ('ok', 'cached') and os.path.exists(dst) and os.path.getsize(dst) > 5000:
            # Could be HTML — check first bytes
            with open(dst, 'rb') as fd:
                head = fd.read(8)
            if head.startswith(b'%PDF'):
                h['sheetMusicUrl'] = f'/hymnal-media/cc-sheet/{fname}'
                results['sheet_done'] += 1
                print(f'SHEET {num:>6}: pdf ok')
            else:
                results['sheet_fail'] += 1
                fails.append((num, 'sheet', s, 'not-a-pdf (html landing page)'))
                print(f'SHEET {num:>6}: html landing, not PDF')
                os.remove(dst)
        else:
            results['sheet_fail'] += 1
            fails.append((num, 'sheet', s, r))
            print(f'SHEET {num:>6}: {r}')

with open(JSON_PATH, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print()
print('=== Summary ===')
print(results)
if fails:
    print()
    print('=== Failures ===')
    for fl in fails[:20]:
        print(' -', fl)
