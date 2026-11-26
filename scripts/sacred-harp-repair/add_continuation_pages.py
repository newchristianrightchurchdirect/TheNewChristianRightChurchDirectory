"""Put Sacred Harp songs' continuation pages back into their sheet PDFs.

split-sacred-harp.py gave every song number exactly one printed page. Songs that run onto
pages carrying no number of their own ("<TUNE>. Continued." / "Concluded.") lost those
pages entirely: 57 pages across 37 songs (e.g. ROSE OF SHARON 254 -> 255-259). Every
orphan page was OCR-checked on 2026-11-26 and its heading names the song before it.

For each owning song this rewrites public/hymnal-media/sh-sheet/<nnn>.pdf from the source
book with the continuation pages appended (old single-page PDF kept as .pdf.bak-1page),
then run scripts/render-sheet-images.py public/hymnal-media/sh-sheet to make the
<nnn>.2.jpg, .3.jpg ... images, and upload with
node scripts/upload-hymnal-media-to-r2.mjs --only=sh-sheet/

Pages that continue onto ANOTHER numbered song's page (e.g. 358 -> 359) are not touched:
that page is already served as the next song's sheet.

usage: python add_continuation_pages.py [--dry]
"""
import json, os, re, shutil, sys
from pypdf import PdfReader, PdfWriter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, '..', '..')
SRC = r'C:\Users\Dustina\NXR Hymnal\Source PDFs\The Sacred harp _ the best collection of sacred songs.pdf'
DATA = os.path.join(ROOT, 'public', 'hymnal-data', 'sacred_harp_1991.json')
OUT = os.path.join(ROOT, 'public', 'hymnal-media', 'sh-sheet')
BACKUP = r'C:\Users\Dustina\NXR Hymnal\sh-sheet-1page-backup'
OFFSET = 4  # PDF page (1-based) = printed page + 4

d = json.load(open(DATA, encoding='utf-8'))
base = sorted({int(re.match(r'\d+', h['number']).group()) for h in d['hymns'] if re.match(r'\d+', h['number'])})
orphans = [p for p in range(base[0], base[-1] + 1) if p not in base]
owner = {}
for p in orphans:
    owner.setdefault(max(b for b in base if b < p), []).append(p)

# which file each owning song uses (they are zero-padded below 100, e.g. 066.pdf)
file_for = {}
for h in d['hymns']:
    m = re.match(r'\d+', h['number'])
    u = h.get('sheetMusicUrl') or ''
    if m and u.endswith('.pdf'):
        file_for.setdefault(int(m.group()), os.path.basename(u))

dry = '--dry' in sys.argv
reader = PdfReader(SRC)
for b, extra in sorted(owner.items()):
    name = file_for.get(b) or f'{b:03d}.pdf'
    path = os.path.join(OUT, name)
    pages = [b] + extra
    print(f'{name}: printed pages {pages}')
    if dry:
        continue
    # backups live OUTSIDE public/ so the R2 uploader never ships them
    os.makedirs(BACKUP, exist_ok=True)
    if os.path.exists(path) and not os.path.exists(os.path.join(BACKUP, name)):
        shutil.copy2(path, os.path.join(BACKUP, name))
    w = PdfWriter()
    for p in pages:
        w.add_page(reader.pages[p + OFFSET - 1])
    tmp = path + '.tmp'
    with open(tmp, 'wb') as f:
        w.write(f)
    assert len(PdfReader(tmp).pages) == len(pages)
    os.replace(tmp, path)
print(f'{len(owner)} songs, {len(orphans)} continuation pages')
