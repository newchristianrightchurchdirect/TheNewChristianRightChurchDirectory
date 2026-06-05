"""Full audit of all hymnal JSONs — coverage by field, URL health, lyrics shape.

For each hymnal:
  - total hymns
  - sheetMusicUrl: count, local vs external split, broken-local count
  - audioUrl: same
  - lyrics presence and avg verse count
  - tune, meter, author, composer presence
  - sample bad entries
"""
import json, os, re
from collections import Counter

ROOT = r'C:\Users\Dustina\Websites\church-directory'
DATA = os.path.join(ROOT, 'public', 'hymnal-data')
PUBLIC = os.path.join(ROOT, 'public')

def url_kind(u):
    if not u: return 'none'
    if u.startswith('/'): return 'local'
    if u.startswith('http'): return 'remote'
    if re.match(r'^[A-Za-z]:[\\/]', u): return 'BROKEN_path'
    return 'other'

def local_exists(u):
    if not u or not u.startswith('/'): return None
    p = os.path.join(PUBLIC, u.lstrip('/').replace('/', os.sep))
    return os.path.exists(p) and os.path.getsize(p) > 100

def lyrics_shape(h):
    """Return ('none' | 'string' | 'verses_N' | 'other', length-info)"""
    for key in ('lyrics', 'verses', 'stanzas', 'text'):
        v = h.get(key)
        if v is None: continue
        if isinstance(v, str) and v.strip():
            return ('string', len(v))
        if isinstance(v, list) and v:
            # list of strings or list of objects?
            kinds = set(type(x).__name__ for x in v)
            return (f'list[{",".join(sorted(kinds))}]', len(v))
        if isinstance(v, dict):
            return ('dict', len(v))
    return ('none', 0)

# Skip Bible & confession files for hymnal-shape audit
HYMNAL_FILES = [
    'sacred_harp_1991.json',
    'trinity_hymnal_1961.json',
    'trinity_hymnal_1990.json',
    'trinity_hymnal_baptist.json',
    'trinity_psalter_hymnal.json',
    'cantus_christi.json',
    'hymns_of_grace.json',
    'book_of_psalms_for_worship.json',
]

print('=' * 90)
print(f'{"HYMNAL":<32s} {"#":>5s}  {"sheet":>12s}  {"audio":>12s}  {"lyrics":>10s}')
print('=' * 90)

grand = Counter()
broken_log = []

for fname in HYMNAL_FILES:
    path = os.path.join(DATA, fname)
    if not os.path.exists(path):
        print(f'{fname:<32s} MISSING FILE')
        continue
    d = json.load(open(path, encoding='utf-8'))
    hymns = d.get('hymns', [])
    n = len(hymns)
    grand['hymns'] += n

    sheet_kinds = Counter()
    audio_kinds = Counter()
    sheet_broken_local = 0
    audio_broken_local = 0
    lyrics_kinds = Counter()
    field_presence = Counter()
    verse_counts = []

    for h in hymns:
        sk = url_kind(h.get('sheetMusicUrl'))
        ak = url_kind(h.get('audioUrl'))
        sheet_kinds[sk] += 1
        audio_kinds[ak] += 1
        if sk == 'local' and not local_exists(h['sheetMusicUrl']):
            sheet_broken_local += 1
            if len(broken_log) < 30:
                broken_log.append((fname, h.get('number'), 'sheet', h['sheetMusicUrl']))
        if ak == 'local' and not local_exists(h['audioUrl']):
            audio_broken_local += 1
            if len(broken_log) < 30:
                broken_log.append((fname, h.get('number'), 'audio', h['audioUrl']))
        kind, sz = lyrics_shape(h)
        lyrics_kinds[kind] += 1
        if kind.startswith('list'):
            verse_counts.append(sz)
        for f in ('tune', 'meter', 'author', 'composer', 'tuneSource', 'topic', 'scripture'):
            if h.get(f): field_presence[f] += 1

    has_sheet = n - sheet_kinds.get('none', 0)
    has_audio = n - audio_kinds.get('none', 0)
    has_lyrics = n - lyrics_kinds.get('none', 0)

    print(f'{fname:<32s} {n:>5d}  {has_sheet:>4d} ({100*has_sheet/n:>4.0f}%)  '
          f'{has_audio:>4d} ({100*has_audio/n:>4.0f}%)  {has_lyrics:>4d} ({100*has_lyrics/n:>3.0f}%)')

    # Per-hymnal detail
    print(f'    sheet kinds: {dict(sheet_kinds)}  broken_local: {sheet_broken_local}')
    print(f'    audio kinds: {dict(audio_kinds)}  broken_local: {audio_broken_local}')
    print(f'    lyrics kinds: {dict(lyrics_kinds)}')
    if verse_counts:
        import statistics
        print(f'    verses per hymn: mean={statistics.mean(verse_counts):.1f}  '
              f'median={statistics.median(verse_counts):.0f}  '
              f'min={min(verse_counts)}  max={max(verse_counts)}')
    print(f'    field presence: ' + ', '.join(f'{k}={v}' for k,v in field_presence.most_common()))
    print()

if broken_log:
    print('\n!!! BROKEN local URLs (file not on disk) — first 30:')
    for fn, num, kind, u in broken_log:
        print(f'  {fn}  #{num}  [{kind}]  {u}')

# Quick lyrics SANITY: peek 2 hymns from each hymnal
print('\n' + '=' * 90)
print('LYRICS SAMPLE — first hymn of each hymnal:')
print('=' * 90)
for fname in HYMNAL_FILES:
    path = os.path.join(DATA, fname)
    if not os.path.exists(path): continue
    d = json.load(open(path, encoding='utf-8'))
    h0 = d['hymns'][0] if d.get('hymns') else None
    if not h0: continue
    print(f'\n--- {fname} #{h0.get("number")} "{h0.get("title","")[:50]}" ---')
    for key in ('lyrics', 'verses', 'stanzas', 'text'):
        v = h0.get(key)
        if v is None: continue
        if isinstance(v, str):
            print(f'  {key} (str, {len(v)} chars): {v[:200]!r}')
        elif isinstance(v, list):
            print(f'  {key} (list[{len(v)}]):')
            for i, x in enumerate(v[:2]):
                if isinstance(x, str):
                    print(f'    [{i}] (str, {len(x)}c): {x[:150]!r}')
                elif isinstance(x, dict):
                    print(f'    [{i}] (dict, keys={list(x.keys())}):')
                    for k, vv in list(x.items())[:5]:
                        sv = str(vv)
                        print(f'        {k}: {sv[:100]!r}')
                else:
                    print(f'    [{i}] {type(x).__name__}: {str(x)[:80]}')
        break
