"""Mirror CC hymns with hymnary.org audio URLs to local /hymnal-media/cc-audio/."""
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
print(f'Targets: {len(targets)}')

ua = {'User-Agent': 'Mozilla/5.0'}
def safe_name(s):
    return ''.join(c if c.isalnum() or c in '-_.' else '_' for c in str(s))

fetched, failed, skipped = 0, 0, 0
for h in targets:
    n = str(h.get('number',''))
    url = h['audioUrl']
    # Pick filename from URL last segment, or use number
    stem = f'cc_{safe_name(n)}'
    # Detect intended extension from URL if present
    p = urllib.parse.urlparse(url)
    path_lower = p.path.lower()
    if '.mp3' in path_lower: ext = '.mp3'
    elif '.mid' in path_lower: ext = '.mid'
    elif '.wav' in path_lower: ext = '.wav'
    else: ext = ''
    out_path_unk = os.path.join(OUT_DIR, stem + (ext or '.bin'))
    if os.path.exists(out_path_unk) and os.path.getsize(out_path_unk) > 1000:
        skipped += 1
        h['audioUrl'] = f'/hymnal-media/cc-audio/{os.path.basename(out_path_unk)}'
        continue
    try:
        req = urllib.request.Request(url, headers=ua)
        with urllib.request.urlopen(req, timeout=30) as resp:
            ct = resp.headers.get('Content-Type','').lower()
            data = resp.read()
        # Figure out extension from content-type if unknown
        if not ext:
            if 'audio/mpeg' in ct or 'mp3' in ct: ext = '.mp3'
            elif 'audio/midi' in ct or 'mid' in ct: ext = '.mid'
            elif 'audio/wav' in ct or 'wav' in ct: ext = '.wav'
            else: ext = '.bin'
        out_path = os.path.join(OUT_DIR, stem + ext)
        with open(out_path, 'wb') as f:
            f.write(data)
        h['audioUrl'] = f'/hymnal-media/cc-audio/{os.path.basename(out_path)}'
        fetched += 1
        if fetched % 25 == 0:
            print(f'  ... {fetched} fetched')
    except Exception as e:
        failed += 1
        print(f'  #{n} FAIL: {e}')
    time.sleep(0.15)

with open(cc_path, 'w', encoding='utf-8') as f:
    json.dump(cc, f, ensure_ascii=False, indent=2)
print(f'\nFetched: {fetched}, skipped (already cached): {skipped}, failed: {failed}')
print(f'CC JSON updated with local URLs.')
