"""Download chosen SH MP3 per page to public/hymnal-media/sh-audio/NNN[ab].mp3
and wire local URLs into sacred_harp_1991.json.

Resumable: skips files that already exist with non-zero size."""
import json, os, sys, time, urllib.request, urllib.error

PICK = r'C:\tmp\sh-best-audio.json'
SH_JSON = r'C:\Users\Dustina\Websites\church-directory\public\hymnal-data\sacred_harp_1991.json'
OUT_DIR = r'C:\Users\Dustina\Websites\church-directory\public\hymnal-media\sh-audio'
URL_PREFIX = '/hymnal-media/sh-audio/'

os.makedirs(OUT_DIR, exist_ok=True)
d = json.load(open(PICK, encoding='utf-8'))
best = d['best']
total = len(best)

# Resume support: skip if file already exists and is non-zero
def out_path(key):
    return os.path.join(OUT_DIR, f'{key}.mp3')

UA = 'Mozilla/5.0 (NXR-Hymnal mirror)'
done = skipped = failed = 0
fail_list = []
t0 = time.time()

for i, (key, url) in enumerate(sorted(best.items(), key=lambda kv: kv[0]), 1):
    op = out_path(key)
    if os.path.exists(op) and os.path.getsize(op) > 1000:
        skipped += 1
        continue
    try:
        req = urllib.request.Request(url, headers={'User-Agent': UA})
        with urllib.request.urlopen(req, timeout=60) as r:
            data = r.read()
        if len(data) < 1000:
            failed += 1
            fail_list.append((key, url, f'tiny: {len(data)} bytes'))
            continue
        with open(op, 'wb') as f:
            f.write(data)
        done += 1
        if done % 25 == 0 or i == total:
            elapsed = time.time() - t0
            rate = done / elapsed if elapsed else 0
            eta = (total - i) / rate if rate else 0
            print(f'  [{i}/{total}] done={done} skip={skipped} fail={failed}  '
                  f'rate={rate:.1f}/s  eta={eta/60:.1f}min', flush=True)
    except Exception as e:
        failed += 1
        fail_list.append((key, url, str(e)[:120]))
        print(f'  FAIL p{key}: {e}', flush=True)

print(f'\nFinished: downloaded={done}  skipped={skipped}  failed={failed}')
if fail_list:
    print('\nFailures:')
    for k, u, e in fail_list[:30]:
        print(f'  p{k}: {e}\n    {u}')

# Wire URLs into JSON for everything we have on disk
sh = json.load(open(SH_JSON, encoding='utf-8'))
have = set()
for f in os.listdir(OUT_DIR):
    if f.endswith('.mp3') and os.path.getsize(os.path.join(OUT_DIR, f)) > 1000:
        have.add(f[:-4])  # strip .mp3

updated = unchanged = cleared = kept_external = 0
for h in sh['hymns']:
    k = str(h['number'])
    if k in have:
        new = f'{URL_PREFIX}{k}.mp3'
        if h.get('audioUrl') != new:
            h['audioUrl'] = new
            updated += 1
        else:
            unchanged += 1
    else:
        # No local mirror — clear the old (likely incorrect) audioUrl
        if h.get('audioUrl'):
            h['audioUrl'] = None
            cleared += 1

with open(SH_JSON, 'w', encoding='utf-8') as f:
    json.dump(sh, f, ensure_ascii=False, indent=2)

audio_count = sum(1 for h in sh['hymns'] if h.get('audioUrl'))
print(f'\nJSON updated: {updated} URLs changed, {unchanged} already correct, '
      f'{cleared} cleared (no local mirror)')
print(f'Audio coverage now: {audio_count}/{len(sh["hymns"])} '
      f'({100*audio_count/len(sh["hymns"]):.1f}%)')
