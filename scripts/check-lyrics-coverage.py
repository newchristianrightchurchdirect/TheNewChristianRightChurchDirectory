"""Report current lyrics coverage for each hymnal JSON."""
import json, os, glob

BASE = r'C:\Users\Dustina\Websites\church-directory\public\hymnal-data'

for path in sorted(glob.glob(os.path.join(BASE, '*.json'))):
    name = os.path.basename(path)
    try:
        d = json.load(open(path, encoding='utf-8'))
    except Exception as e:
        print(f'{name}: ERROR {e}')
        continue
    hymns = d.get('hymns', [])
    if not hymns:
        continue
    have = sum(1 for h in hymns if h.get('verses'))
    miss = [h.get('number') for h in hymns if not h.get('verses')]
    pct = 100 * have / len(hymns) if hymns else 0
    print(f'{name}: {have}/{len(hymns)} ({pct:.1f}%)  missing={len(miss)}')
    if 0 < len(miss) <= 30:
        print(f'  missing nums: {miss}')
    elif len(miss) > 0:
        print(f'  missing nums (first 20): {miss[:20]}...')
