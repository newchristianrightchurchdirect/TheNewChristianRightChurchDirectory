"""Tally sheetMusicUrl patterns in TH1961 JSON to find the corruption."""
import json
from collections import Counter

JSON = r'C:\Users\Dustina\Websites\church-directory\public\hymnal-data\trinity_hymnal_1961.json'
d = json.load(open(JSON, encoding='utf-8'))

patterns = Counter()
samples = {}
for h in d['hymns']:
    u = h.get('sheetMusicUrl')
    if not u:
        kind = 'none'
    elif u.startswith('C:/') or u.startswith('C:\\'):
        kind = 'C_path'
    elif u.startswith('/'):
        kind = 'slash_local'
    elif u.startswith('http'):
        kind = 'http_remote'
    else:
        kind = 'other'
    patterns[kind] += 1
    samples.setdefault(kind, []).append((h['number'], u))

print('Counts:')
for k, v in patterns.most_common():
    print(f'  {v:5d}  {k}')
print()
print('Samples:')
for k, lst in samples.items():
    print(f'\n{k} (showing 3):')
    for n, u in lst[:3]:
        print(f'  #{n}: {u}')
