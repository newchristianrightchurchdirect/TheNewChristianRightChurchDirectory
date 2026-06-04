"""Split Sacred Harp 1991 PDF into per-hymn PDFs and wire local sheetMusicUrls.

Sacred Harp uses page numbers AS hymn numbers (so hymn 26 is on printed page 26).
This PDF: PDF page = printed page + 4 (Hymn 26 SAMARIA confirmed at PDF p30).

a/b variants share the same printed page (two arrangements on one page); both
point at the same per-hymn PDF.
"""
import json, re, os, sys
from pypdf import PdfReader, PdfWriter

BASE = r'C:\Users\Dustina\Websites\church-directory'
PDF = r'C:\Users\Dustina\Downloads\The Sacred harp _ the best collection of sacred songs.pdf'
JSON_PATH = BASE + r'\public\hymnal-data\sacred_harp_1991.json'
OUT_DIR = BASE + r'\public\hymnal-media\sh-sheet'
URL_PREFIX = '/hymnal-media/sh-sheet/'

OFFSET = 4  # PDF page = printed page + 4

def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    reader = PdfReader(PDF)
    n_pages = len(reader.pages)

    with open(JSON_PATH, encoding='utf-8') as f:
        data = json.load(f)

    # Collect distinct base page numbers
    base_nums = set()
    for h in data['hymns']:
        m = re.match(r'(\d+)', str(h['number']))
        if m:
            base_nums.add(int(m.group(1)))

    print(f'Distinct base hymn numbers: {len(base_nums)}')
    print(f'Range: {min(base_nums)} - {max(base_nums)}')

    # Write per-hymn PDFs - one PDF per base number
    written = skipped = 0
    for n in sorted(base_nums):
        pdf_page = n + OFFSET  # 1-based
        if pdf_page > n_pages or pdf_page < 1:
            skipped += 1
            continue
        writer = PdfWriter()
        writer.add_page(reader.pages[pdf_page - 1])
        out_path = os.path.join(OUT_DIR, f'{n:03d}.pdf')
        with open(out_path, 'wb') as f:
            writer.write(f)
        written += 1
        if written % 100 == 0:
            print(f'  wrote {written}/{len(base_nums)}')

    print(f'\nWrote {written} per-hymn PDFs; skipped {skipped}')

    # Wire URLs into JSON. ALL hymns get local URL (replacing hymnary fallback).
    updated = unchanged = 0
    have = {int(f.split('.')[0]) for f in os.listdir(OUT_DIR) if f.endswith('.pdf')}
    for h in data['hymns']:
        m = re.match(r'(\d+)', str(h['number']))
        if not m: continue
        n = int(m.group(1))
        if n in have:
            new_url = f'{URL_PREFIX}{n:03d}.pdf'
            if h.get('sheetMusicUrl') != new_url:
                h['sheetMusicUrl'] = new_url
                updated += 1
            else:
                unchanged += 1

    with open(JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f'\nJSON updated: {updated} URLs changed, {unchanged} already correct')
    have_sheet = sum(1 for h in data['hymns'] if h.get('sheetMusicUrl'))
    print(f'Sheet music coverage: {have_sheet}/{len(data["hymns"])} ({100*have_sheet/len(data["hymns"]):.1f}%)')

if __name__ == '__main__':
    main()
