"""Apply sh_fixes.py to public/hymnal-data/sacred_harp_1991.json.

Replaces title, firstLine and verses ONLY for the hymns in FIX; every other field (tune, author,
meter, key, composer, media URLs) is left as it was. Writes a timestamped .bak first, re-reads the
result to check it parses, and prints what changed.  usage: python apply_fixes.py [--dry]
"""
import json, os, sys, time
HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, '..', '..', 'public', 'hymnal-data', 'sacred_harp_1991.json')
ns = {}
exec(open(os.path.join(HERE, 'sh_fixes.py'), encoding='utf-8').read(), ns)
FIX = ns['FIX']
d = json.load(open(DATA, encoding='utf-8'))
by = {h['number']: h for h in d['hymns']}
missing = [n for n in FIX if n not in by]
if missing:
    sys.exit(f'numbers not in data: {missing}')
changed = 0
for n, f in FIX.items():
    h = by[n]
    verses = [{'number': i + 1, 'isChorus': v['isChorus'], 'text': v['text']} for i, v in enumerate(f['verses'])]
    if h.get('verses') == verses and h.get('title') == f['title']:
        continue
    print(f"#{n}: {h['title'][:50]!r} -> {f['title']!r}  ({len(h.get('verses') or [])} -> {len(verses)} verses)")
    h['title'], h['firstLine'], h['verses'] = f['title'], f['firstLine'], verses
    h['lyricsSource'] = 'transcribed from the printed sheet (2026-11)'
    changed += 1
print(f'{changed} hymns changed of {len(FIX)} in FIX')
if '--dry' in sys.argv or not changed:
    sys.exit(0)
bak = f'{DATA}.bak-shrepair-{int(time.time())}'
open(bak, 'wb').write(open(DATA, 'rb').read())
tmp = DATA + '.tmp'
json.dump(d, open(tmp, 'w', encoding='utf-8', newline='\n'), ensure_ascii=False, separators=(',', ':'))
json.load(open(tmp, encoding='utf-8'))
os.replace(tmp, DATA)
print('backup:', os.path.basename(bak))
