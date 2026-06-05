"""Merge transcribed lyrics from .tmp-renders/transcribed-*.json into the
hymnal JSONs."""
import json, os, glob

BASE = r'C:\Users\Dustina\Websites\church-directory'
DATA = os.path.join(BASE, 'public', 'hymnal-data')
TMP = os.path.join(BASE, '.tmp-renders')

# Pull all batch files
batch_files = sorted(glob.glob(os.path.join(TMP, 'transcribed-*.json')))
print(f'Batch files: {len(batch_files)}')

# Build pile: {hymnal_key: {number: [verses]}}
pile = {}
def add(hymnal_key, num, verses):
    pile.setdefault(hymnal_key, {})[str(num)] = verses

for bf in batch_files:
    print(f'  {os.path.basename(bf)}')
    data = json.load(open(bf, encoding='utf-8'))
    name = os.path.basename(bf)
    if name.startswith('transcribed-th1990'):
        for num, verses in data.items():
            if num.startswith('_'): continue
            add('trinity_hymnal_1990', num, verses)
    elif name == 'transcribed-mixed.json':
        for hymnal_key, by_num in data.items():
            if hymnal_key.startswith('_'): continue
            if hymnal_key == 'TH1990':
                target = 'trinity_hymnal_1990'
            elif hymnal_key == 'SH1991':
                target = 'sacred_harp_1991'
            else:
                target = hymnal_key
            for num, verses in by_num.items():
                add(target, num, verses)

# Apply to each hymnal JSON
total_applied = 0
for hymnal_key, by_num in pile.items():
    path = os.path.join(DATA, f'{hymnal_key}.json')
    if not os.path.exists(path):
        print(f'!! No JSON at {path}')
        continue
    d = json.load(open(path, encoding='utf-8'))
    applied = 0
    skipped = []
    for h in d['hymns']:
        n = str(h.get('number', ''))
        if n in by_num:
            if h.get('verses'):
                skipped.append(n)
                continue
            h['verses'] = by_num[n]
            applied += 1
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(d, f, ensure_ascii=False, indent=2)
    total_applied += applied
    print(f'{hymnal_key}: applied {applied}; skipped (already had) {len(skipped)}')
    unapplied = set(by_num) - {str(h.get('number')) for h in d['hymns']}
    if unapplied:
        print(f'  not found in JSON: {sorted(unapplied)}')

print(f'\nTotal applied: {total_applied}')

# Coverage report
print('\n=== Coverage ===')
for fname in ['trinity_hymnal_1990.json', 'sacred_harp_1991.json', 'cantus_christi.json',
              'trinity_hymnal_baptist.json']:
    d = json.load(open(os.path.join(DATA, fname), encoding='utf-8'))
    total = sum(1 for h in d['hymns'] if h.get('verses'))
    n = len(d['hymns'])
    print(f'  {fname}: {total}/{n} ({100*total/n:.1f}%)')
