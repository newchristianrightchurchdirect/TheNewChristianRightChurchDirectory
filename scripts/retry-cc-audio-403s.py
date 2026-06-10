"""Retry the CC hymnary audio fetches that 403'd, with Referer + better UA."""
import json, os, urllib.request, urllib.parse, time

BASE = r'C:\Users\Dustina\Websites\church-directory'
DATA = os.path.join(BASE, 'public', 'hymnal-data')
OUT_DIR = os.path.join(BASE, 'public', 'hymnal-media', 'cc-audio')
os.makedirs(OUT_DIR, exist_ok=True)

cc_path = os.path.join(DATA, 'cantus_christi.json')
cc = json.load(open(cc_path, encoding='utf-8'))
targets = [h for h in cc['hymns']
           if (h.get('audioUrl','') or '').startswith('http')
           and 'hymnary' in h.get('audioUrl','')]
print(f'Remaining hymnary-linked: {len(targets)}')

def safe_name(s):
    return ''.join(c if c.isalnum() or c in '-_.' else '_' for c in str(s))

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
    'Accept': 'audio/mpeg,audio/midi,audio/*;q=0.9,*/*;q=0.8',
    'Referer': 'https://hymnary.org/',
}

fetched, failed = 0, 0
for h in targets:
    n = str(h.get('number',''))
    url = h['audioUrl']
    stem = f'cc_{safe_name(n)}'
    p = urllib.parse.urlparse(url)
    path_lower = p.path.lower()
    if '.mp3' in path_lower: ext = '.mp3'
    elif '.mid' in path_lower: ext = '.mid'
    elif '.wav' in path_lower: ext = '.wav'
    else: ext = ''
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=30) as resp:
            ct = resp.headers.get('Content-Type','').lower()
            data = resp.read()
        if not ext:
            if 'mpeg' in ct or 'mp3' in ct: ext = '.mp3'
            elif 'midi' in ct or 'mid' in ct: ext = '.mid'
            elif 'wav' in ct: ext = '.wav'
            else: ext = '.bin'
        out_path = os.path.join(OUT_DIR, stem + ext)
        with open(out_path, 'wb') as f:
            f.write(data)
        h['audioUrl'] = f'/hymnal-media/cc-audio/{os.path.basename(out_path)}'
        fetched += 1
    except Exception as e:
        failed += 1
        print(f'  #{n} FAIL: {e}')
    time.sleep(0.2)

with open(cc_path, 'w', encoding='utf-8') as f:
    json.dump(cc, f, ensure_ascii=False, indent=2)
print(f'\nFetched: {fetched}, still failed: {failed}')
