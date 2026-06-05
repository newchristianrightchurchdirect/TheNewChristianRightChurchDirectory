"""Fill HoG missing entries by copying verses from matching titles in other
hymnals (PD-era texts that appear in HoG2015 unchanged)."""
import json, os, re
from difflib import SequenceMatcher

BASE = r'C:\Users\Dustina\Websites\church-directory'
DATA = os.path.join(BASE, 'public', 'hymnal-data')

def norm(s):
    s = re.sub(r'[^a-z0-9 ]', '', (s or '').lower())
    return re.sub(r'\s+', ' ', s).strip()

def first_line(h):
    if not h.get('verses'): return ''
    for v in h['verses']:
        if v.get('isChorus') == 'True': continue
        t = (v.get('text') or '').strip().split('\n')[0]
        return norm(t)
    return ''

hog_path = os.path.join(DATA, 'hymns_of_grace.json')
hog = json.load(open(hog_path, encoding='utf-8'))
missing = [h for h in hog['hymns'] if not h.get('verses')]

by_title = {}
by_firstline = {}
for fname in ['trinity_hymnal_1961.json', 'trinity_hymnal_1990.json',
              'sacred_harp_1991.json', 'cantus_christi.json',
              'trinity_hymnal_baptist.json', 'book_of_psalms_for_worship.json',
              'trinity_psalter_hymnal.json']:
    d = json.load(open(os.path.join(DATA, fname), encoding='utf-8'))
    for h in d['hymns']:
        if not h.get('verses'): continue
        t = norm(h.get('title'))
        if t and t not in by_title:
            by_title[t] = (fname, h)
        fl = first_line(h)
        if fl and fl not in by_firstline:
            by_firstline[fl] = (fname, h)

filled = 0
for h in missing:
    t = norm(h.get('title'))
    src = None
    if t in by_title:
        src = by_title[t]
    elif t in by_firstline:
        src = by_firstline[t]
    else:
        short = ' '.join(t.split()[:5])
        for ot, s in by_title.items():
            if ot.startswith(short) or short.startswith(ot[:30]):
                if SequenceMatcher(None, t, ot).ratio() > 0.95:
                    src = s; break
    if src:
        fname, src_h = src
        h['verses'] = src_h['verses']
        filled += 1

with open(hog_path, 'w', encoding='utf-8') as f:
    json.dump(hog, f, ensure_ascii=False, indent=2)

total = len(hog['hymns'])
have = sum(1 for h in hog['hymns'] if h.get('verses'))
print(f'Filled {filled} from other hymnals')
print(f'HoG coverage now: {have}/{total} ({100*have/total:.1f}%)')
