"""
Build NXR Hymnal: a single master PDF combining all 8 hymnals' lyrics + sheet music.
Output: public/hymnal-media/nxr-hymnal.pdf

Per hymn: one or two lyrics pages, immediately followed by the per-hymn sheet
music PDF (if it exists locally). External sheet music URLs are skipped.
"""
import json
import os
import sys
import fitz  # PyMuPDF
from urllib.parse import unquote

BASE = r'C:/Users/Dustina/Websites/church-directory'
PUBLIC = os.path.join(BASE, 'public')
OUT = os.path.join(PUBLIC, 'hymnal-media', 'nxr-hymnal.pdf')

HYMNALS = [
    ('trinity_psalter_hymnal.json',  'Trinity Psalter Hymnal',          'TPH', 2018, 'I'),
    ('trinity_hymnal_1961.json',     'Trinity Hymnal',                  'TH',  1961, 'II'),
    ('trinity_hymnal_1990.json',     'Trinity Hymnal (Revised)',        'TH2', 1990, 'III'),
    ('trinity_hymnal_baptist.json',  'Trinity Hymnal (Baptist Edition)','THB', 1995, 'IV'),
    ('book_of_psalms_for_worship.json','The Book of Psalms for Worship','BPW', 2009, 'V'),
    ('cantus_christi.json',          'Cantus Christi',                  'CC',  2002, 'VI'),
    ('hymns_of_grace.json',          'Hymns of Grace',                  'HoG', 2015, 'VII'),
    ('sacred_harp_1991.json',        'The Sacred Harp',                 'SH',  1991, 'VIII'),
]

PAGE_W, PAGE_H = 612, 792  # US Letter
MARGIN = 54

# Resolve a sheetMusicUrl like /hymnal-media/th-sheet/123.pdf to a real path.
def resolve_sheet(url):
    if not url or not url.startswith('/'):
        return None
    rel = unquote(url.lstrip('/'))
    p = os.path.join(PUBLIC, rel.replace('/', os.sep))
    return p if os.path.exists(p) and os.path.getsize(p) > 1000 else None


def add_text_page(doc, lines, font_size=11, leading=14, title=None, subtitle=None,
                  is_section=False):
    page = doc.new_page(width=PAGE_W, height=PAGE_H)
    y = MARGIN
    if title:
        ts = 24 if is_section else 16
        page.insert_text((MARGIN, y + ts), title, fontsize=ts,
                         fontname='Times-Bold')
        y += ts + 6
    if subtitle:
        page.insert_text((MARGIN, y + 11), subtitle, fontsize=11,
                         fontname='Times-Italic', color=(0.35, 0.27, 0.13))
        y += 11 + 8
    if title or subtitle:
        page.draw_line((MARGIN, y), (PAGE_W - MARGIN, y),
                       color=(0.73, 0.60, 0.35), width=0.7)
        y += 16
    for ln in lines:
        if y > PAGE_H - MARGIN - leading:
            page = doc.new_page(width=PAGE_W, height=PAGE_H)
            y = MARGIN
        page.insert_text((MARGIN, y + font_size), ln, fontsize=font_size,
                         fontname='Times-Roman')
        y += leading
    return page


def wrap(text, width=80):
    out = []
    for paragraph in (text or '').split('\n'):
        if not paragraph.strip():
            out.append('')
            continue
        words = paragraph.split()
        line = ''
        for w in words:
            if len(line) + len(w) + 1 > width:
                out.append(line)
                line = w
            else:
                line = (line + ' ' + w).strip()
        if line:
            out.append(line)
    return out


def hymn_lyrics_lines(h):
    lines = []
    verses = h.get('verses') or []
    for v in verses:
        is_chorus = v.get('isChorus')
        num = v.get('number')
        text = v.get('text') or ''
        label = 'Chorus' if is_chorus else (f'{num}.' if num is not None else '')
        if label:
            lines.append(label)
        for ln in wrap(text, 78):
            lines.append(('   ' if not is_chorus else '     ') + ln)
        lines.append('')
    return lines


def build():
    doc = fitz.open()

    # Cover
    cover = doc.new_page(width=PAGE_W, height=PAGE_H)
    cy = 240
    cover.insert_text((MARGIN, cy), 'THE', fontsize=22, fontname='Times-Roman',
                      color=(0.35, 0.27, 0.13))
    cy += 50
    cover.insert_text((MARGIN, cy), 'NXR HYMNAL', fontsize=56,
                      fontname='Times-Bold')
    cy += 28
    cover.draw_line((MARGIN, cy), (PAGE_W - MARGIN, cy),
                    color=(0.73, 0.60, 0.35), width=1.2)
    cy += 38
    cover.insert_text((MARGIN, cy), 'A Compendium of Eight Volumes',
                      fontsize=16, fontname='Times-Italic',
                      color=(0.35, 0.27, 0.13))
    cy += 34
    cover.insert_text((MARGIN, cy),
                      'Lyrics and Sheet Music for the Sabbath Assembly',
                      fontsize=12, fontname='Times-Roman')
    cover.insert_text((MARGIN, PAGE_H - 96),
                      'Compiled for The New Christian Right \u00B7 MMXXVI',
                      fontsize=10, fontname='Times-Italic',
                      color=(0.35, 0.27, 0.13))

    # Table of volumes
    toc_lines = []
    for fname, title, short, year, roman in HYMNALS:
        toc_lines.append(f'{roman}.  {title} ({short}, {year})')
    add_text_page(doc, toc_lines, font_size=13, leading=22,
                  title='Table of Volumes',
                  subtitle='In the order they appear in this compendium')

    total_hymns = 0
    total_sheets = 0
    missing_lyrics = 0
    missing_sheet = 0

    for fname, title, short, year, roman in HYMNALS:
        jpath = os.path.join(PUBLIC, 'hymnal-data', fname)
        if not os.path.exists(jpath):
            print(f'!! missing data file: {fname}')
            continue
        with open(jpath, encoding='utf-8') as f:
            data = json.load(f)
        hymns = data.get('hymns') or data.get('items') or []
        print(f'\n=== {short} ({year}) {title}: {len(hymns)} hymns ===')

        # Section divider page
        add_text_page(
            doc, [], is_section=True,
            title=f'Volume {roman}',
            subtitle=f'{title}  \u00B7  {year}',
        )

        for h in hymns:
            total_hymns += 1
            num = h.get('number') or ''
            htitle = h.get('title') or ''
            tune = h.get('tune') or ''
            meter = h.get('meter') or ''
            author = h.get('author') or ''
            composer = h.get('composer') or ''
            scrip = h.get('scriptureReference') or ''

            head_lines = []
            sub_bits = []
            if tune: sub_bits.append(f'Tune: {tune}')
            if meter: sub_bits.append(f'Meter: {meter}')
            if author: sub_bits.append(f'Words: {author}')
            if composer: sub_bits.append(f'Music: {composer}')
            if scrip: sub_bits.append(f'Scripture: {scrip}')
            subtitle = '  \u00B7  '.join(sub_bits) if sub_bits else None

            verses = h.get('verses') or []
            if verses:
                lyrics = hymn_lyrics_lines(h)
            else:
                missing_lyrics += 1
                lyrics = ['[Lyrics not available in source data.]']

            page_title = f'{short} {num}. {htitle}' if num else f'{short}  {htitle}'
            add_text_page(doc, lyrics, font_size=11, leading=14,
                          title=page_title, subtitle=subtitle)

            sheet = resolve_sheet(h.get('sheetMusicUrl'))
            if sheet:
                try:
                    ext = os.path.splitext(sheet)[1].lower()
                    if ext == '.pdf':
                        src = fitz.open(sheet)
                        doc.insert_pdf(src)
                        src.close()
                    elif ext in ('.png', '.jpg', '.jpeg'):
                        img_page = doc.new_page(width=PAGE_W, height=PAGE_H)
                        rect = fitz.Rect(MARGIN, MARGIN, PAGE_W - MARGIN, PAGE_H - MARGIN)
                        img_page.insert_image(rect, filename=sheet, keep_proportion=True)
                    else:
                        raise ValueError(f'unsupported ext {ext}')
                    total_sheets += 1
                except Exception as e:
                    print(f'  ! sheet insert failed #{num}: {e}')
                    missing_sheet += 1
            else:
                missing_sheet += 1

            if total_hymns % 250 == 0:
                print(f'  ... {total_hymns} hymns processed, doc has {doc.page_count} pages')

    # Colophon
    add_text_page(
        doc,
        wrap(
            'The NXR Hymnal is a digital compendium drawn together from eight '
            'historic and contemporary volumes for the use of confessing Reformed '
            'and Evangelical congregations. Each hymn is presented with its lyrics '
            'and, where available, the accompanying sheet music. Sheet music PDFs '
            'are drawn from openly licensed or mirrored sources within The New '
            'Christian Right archive.', 80,
        ) + ['',
             f'Total hymns: {total_hymns}',
             f'Hymns with sheet music: {total_sheets}',
             f'Hymns missing lyrics in source: {missing_lyrics}',
             f'Hymns without local sheet music: {missing_sheet}',
        ],
        font_size=11, leading=14,
        title='Colophon',
        subtitle='Notes on the making of this volume',
    )

    print(f'\nSaving {doc.page_count} pages to {OUT} ...')
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    doc.save(OUT, garbage=4, deflate=True)
    size_mb = os.path.getsize(OUT) / (1024 * 1024)
    print(f'Done. {size_mb:.1f} MB, {doc.page_count} pages.')
    print(f'  hymns={total_hymns} sheets={total_sheets} missing_lyrics={missing_lyrics}')


if __name__ == '__main__':
    build()
