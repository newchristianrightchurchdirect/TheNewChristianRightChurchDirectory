"""Render the located verse-page for each missing TH1990 hymn (or fall back
to own PDF pg0 if not located) as a PNG for visual inspection."""
import json, os, fitz

BASE = r'C:\Users\Dustina\Websites\church-directory'
PDF_DIR = os.path.join(BASE, 'public', 'hymnal-media', 'th2-sheet')
MAP_PATH = os.path.join(BASE, 'scripts', 'th1990-verse-pages.json')
OUT_DIR = r'C:\tmp\th1990-verse-renders'
os.makedirs(OUT_DIR, exist_ok=True)

mapping = json.load(open(MAP_PATH, encoding='utf-8'))

for n_str, info in mapping.items():
    n = int(n_str)
    found = info.get('found')
    if found:
        src_n = found['pdf']
        src_pi = found['page']
    else:
        # Fall back: render own pg0
        src_n = n
        src_pi = 0

    pdf_path = os.path.join(PDF_DIR, f'{src_n:03d}.pdf')
    if not os.path.exists(pdf_path):
        print(f'  #{n}: no PDF at {pdf_path}')
        continue
    doc = fitz.open(pdf_path)
    if src_pi >= len(doc):
        print(f'  #{n}: page {src_pi} out of range')
        continue
    pix = doc[src_pi].get_pixmap(dpi=300)
    out_path = os.path.join(OUT_DIR, f'{n:03d}.png')
    pix.save(out_path)
    print(f'  #{n}: {src_n:03d}.pdf pg{src_pi} -> {out_path}')

print(f'\nRendered to {OUT_DIR}')
