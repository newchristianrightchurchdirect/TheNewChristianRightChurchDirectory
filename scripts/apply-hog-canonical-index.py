"""Bring public/hymnal-data/hymns_of_grace.json in line with the book's own indexes.

Source of truth: data/hymns-of-grace-canonical-index.py (transcribed from photos of the printed
Hymns of Grace indexes, pp. 503-524, supplied by Dustin 2026-11-26).

  hymns    -> title = the book's title; the old title (a first line) is kept in firstLine; key added
  readings -> title = the scripture reference; scriptureReference set; old title kept in firstLine
  445      -> added (2 Peter 1:3-11 reading), absent from our data; no text yet

Numbering is NOT changed: the audit found every number already matched the book.
usage: python scripts/apply-hog-canonical-index.py [--dry]
"""
import json, os, sys, time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, 'public', 'hymnal-data', 'hymns_of_grace.json')
ns = {}
exec(open(os.path.join(ROOT, 'data', 'hymns-of-grace-canonical-index.py'), encoding='utf-8').read(), ns)
TITLES, READINGS, KEYS = ns['TITLES'], ns['READINGS'], ns['KEYS']
assert not ns['KEY_CONFLICTS']

d = json.load(open(DATA, encoding='utf-8'))
by = {h['number']: h for h in d['hymns']}
changes = 0
for n, title in TITLES.items():
    h = by[str(n)]
    if not h.get('firstLine'):
        h['firstLine'] = h['title']
    if h['title'] != title or h.get('key') != KEYS[n]:
        h['title'], h['key'] = title, KEYS[n]
        changes += 1
for n, ref in READINGS.items():
    h = by.get(str(n))
    if h is None:
        h = {'number': str(n), 'title': ref, 'scriptureReference': ref, 'verses': [],
             'notes': 'Scripture reading. Text not yet transcribed.'}
        d['hymns'].append(h)
        by[str(n)] = h
        changes += 1
        print(f'added #{n} {ref}')
        continue
    if not h.get('firstLine'):
        h['firstLine'] = h['title']
    if h['title'] != ref or h.get('scriptureReference') != ref:
        h['title'], h['scriptureReference'] = ref, ref
        changes += 1
d['hymns'].sort(key=lambda h: int(h['number']))
print(f'{changes} entries changed; {len(d["hymns"])} total')
if '--dry' in sys.argv:
    sys.exit(0)
open(f'{DATA}.bak-canon-{int(time.time())}', 'wb').write(open(DATA, 'rb').read())
tmp = DATA + '.tmp'
json.dump(d, open(tmp, 'w', encoding='utf-8', newline='\n'), ensure_ascii=False, separators=(',', ':'))
json.load(open(tmp, encoding='utf-8'))
os.replace(tmp, DATA)
