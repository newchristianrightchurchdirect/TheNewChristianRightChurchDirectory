"""Render verse pages for missing SH/CC/Baptist hymns."""
import json, os, fitz

BASE = r'C:\Users\Dustina\Websites\church-directory'
DATA = os.path.join(BASE, 'public', 'hymnal-data')
OUT = r'C:\tmp\other-verse-renders'
os.makedirs(OUT, exist_ok=True)

for fname, sub in [
    ('sacred_harp_1991.json', 'sh'),
    ('cantus_christi.json', 'cc'),
    ('trinity_hymnal_baptist.json', 'baptist'),
]:
    d = json.load(open(os.path.join(DATA, fname), encoding='utf-8'))
    missing = [h for h in d['hymns'] if not h.get('verses')]
    for h in missing:
        n = h['number']
        url = h.get('sheetMusicUrl', '')
        if not url.startswith('/hymnal-media/'):
            print(f'  {sub}#{n}: not local — {url}')
            continue
        local = os.path.join(BASE, 'public', url.lstrip('/').replace('/', os.sep))
        if not os.path.exists(local):
            print(f'  {sub}#{n}: PDF missing at {local}')
            continue
        doc = fitz.open(local)
        # Render all pages (small hymns are 1 page; larger are 2-3)
        for pi, pg in enumerate(doc):
            pix = pg.get_pixmap(dpi=300)
            stem = f'{sub}_{n}_pg{pi}.png'
            pix.save(os.path.join(OUT, stem))
        print(f'  {sub}#{n}: {len(doc)} pg(s) -> {sub}_{n}_*.png')

print(f'\nRendered to {OUT}')
