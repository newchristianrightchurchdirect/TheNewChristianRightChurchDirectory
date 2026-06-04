"""Strip Git-Bash MSYS2 path corruption ('C:/Program Files/Git/' prefix) from
all sheetMusicUrl and audioUrl fields across the hymnal-data JSON files."""
import json, os, re, glob

ROOT = r'C:\Users\Dustina\Websites\church-directory'
DATA = os.path.join(ROOT, 'public', 'hymnal-data')
MEDIA = os.path.join(ROOT, 'public', 'hymnal-media')

# Cache: dir name -> set of filenames present on disk
disk_cache: dict[str, set[str]] = {}
def disk_has(rel_path: str) -> bool:
    parts = rel_path.lstrip('/').split('/')
    if len(parts) < 2 or parts[0] != 'hymnal-media':
        return True  # leave non-hymnal-media URLs alone
    subdir = parts[1]
    fname = parts[-1]
    full = os.path.join(MEDIA, *parts[1:-1])
    if subdir not in disk_cache:
        try:
            disk_cache[subdir] = set(os.listdir(full))
        except FileNotFoundError:
            disk_cache[subdir] = set()
    return fname in disk_cache[subdir]

corrupt_re = re.compile(r'^C:/Program Files/Git(/hymnal-media/.*)$')

total_fixed = total_cleared = 0
for path in sorted(glob.glob(os.path.join(DATA, '*.json'))):
    name = os.path.basename(path)
    try:
        d = json.load(open(path, encoding='utf-8'))
    except Exception as e:
        print(f'  SKIP {name}: {e}')
        continue
    if not isinstance(d, dict) or 'hymns' not in d:
        continue
    fixed = cleared = 0
    for h in d['hymns']:
        for field in ('sheetMusicUrl', 'audioUrl'):
            u = h.get(field)
            if not u: continue
            m = corrupt_re.match(u)
            if not m: continue
            rel = m.group(1)
            if disk_has(rel):
                h[field] = rel
                fixed += 1
            else:
                h[field] = None
                cleared += 1
    if fixed or cleared:
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(d, f, ensure_ascii=False, indent=2)
        print(f'  {name}: fixed={fixed} cleared={cleared}')
        total_fixed += fixed
        total_cleared += cleared

print(f'\nTotal: fixed={total_fixed} cleared={total_cleared}')
