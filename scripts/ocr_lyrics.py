"""Render a PDF page, OCR via Windows.Media.Ocr, reconstruct stanza rows
from word-level bboxes.

Sheet-music typography has each stanza in a horizontal row of lyrics under the
staff. OCR returns line-objects but they're often per-column. We rebuild by
clustering WORDS by Y-band, then sorting by X within each band, then chaining
bands that belong to the same stanza using leading "N." markers.
"""
import sys, os, json, subprocess, re, tempfile, fitz

PS_SCRIPT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ocr-png-json.ps1')

def render_page(pdf_path, page_index, dpi=400):
    d = fitz.open(pdf_path)
    pg = d[page_index]
    pix = pg.get_pixmap(dpi=dpi)
    tmp = tempfile.NamedTemporaryFile(suffix='.png', delete=False)
    tmp.close()
    pix.save(tmp.name)
    return tmp.name

def ocr_words(png_path):
    """Returns list of dicts: {text, x, y, w, h}. One per word."""
    r = subprocess.run(
        ['powershell.exe', '-NoProfile', '-ExecutionPolicy', 'Bypass',
         '-File', PS_SCRIPT, '-Path', png_path],
        capture_output=True, text=True, encoding='utf-8', errors='replace')
    if r.returncode != 0:
        raise RuntimeError(f'OCR failed: {r.stderr}')
    data = json.loads(r.stdout)
    words = []
    for line in data:
        for w in line.get('words', []):
            words.append(w)
    return words

def cluster_by_y(words, tol_factor=0.6):
    """Group words into Y-bands. Each band = a single visual line of text."""
    if not words: return []
    # Use median height as tolerance basis
    heights = sorted(w['h'] for w in words)
    med_h = heights[len(heights)//2]
    tol = max(8, int(med_h * tol_factor))
    # Sort by Y center
    items = sorted(words, key=lambda w: w['y'] + w['h']/2)
    bands = []
    cur = [items[0]]
    cur_y = items[0]['y'] + items[0]['h']/2
    for w in items[1:]:
        wy = w['y'] + w['h']/2
        if abs(wy - cur_y) <= tol:
            cur.append(w)
            cur_y = sum(x['y'] + x['h']/2 for x in cur) / len(cur)  # running avg
        else:
            bands.append(cur)
            cur = [w]
            cur_y = wy
    bands.append(cur)
    # Sort each band left-to-right
    return [sorted(b, key=lambda w: w['x']) for b in bands]

def band_to_text(band):
    return ' '.join(w['text'] for w in band)

VERSE_START_RE = re.compile(r'^(\d+)\.?\s+')

def assemble_stanzas(bands):
    """Walk bands top-to-bottom. A band that starts with 'N.' or 'N ' begins
    or continues stanza N. Bands without a number marker continue the LAST
    seen stanza (sheet music wraps stanzas across multiple staves)."""
    stanzas = {}  # n -> list of band texts
    order = []
    current = None
    for band in bands:
        text = band_to_text(band)
        # Detect leading number(s) in the band
        # Often multiple stanzas align: e.g. row may read "1 Lord 2 When 3 And 4 When"
        # In that case we split — but only when consecutive small numbers appear
        # at expected X-positions. Simpler heuristic for now: split by "<digit>."
        # or by "<digit><space><Capital>" boundaries.
        # First pass: if the band contains multiple "N " markers, it's a
        # multi-stanza row.
        markers = list(re.finditer(r'(?:^|\s)(\d)\.?\s+(?=[A-Z])', text))
        if len(markers) >= 2:
            for i, m in enumerate(markers):
                n = int(m.group(1))
                start = m.end()
                end = markers[i+1].start() if i+1 < len(markers) else len(text)
                seg = text[start:end].strip()
                if n not in stanzas:
                    stanzas[n] = []
                    order.append(n)
                stanzas[n].append(seg)
            current = None  # don't continue this band into next
        elif markers:
            m = markers[0]
            n = int(m.group(1))
            seg = text[m.end():].strip()
            # If there was content BEFORE the marker, append to current
            pre = text[:m.start()].strip()
            if pre and current is not None:
                stanzas[current].append(pre)
            if n not in stanzas:
                stanzas[n] = []
                order.append(n)
            stanzas[n].append(seg)
            current = n
        else:
            if current is not None:
                stanzas[current].append(text)
            # else: skip orphan band (likely header/footer)
    return [(n, ' '.join(stanzas[n])) for n in sorted(order)]

def extract_lyrics(pdf_path, page_index, dpi=400):
    png = render_page(pdf_path, page_index, dpi=dpi)
    try:
        words = ocr_words(png)
    finally:
        try: os.unlink(png)
        except: pass
    if not words:
        return []
    bands = cluster_by_y(words)
    return assemble_stanzas(bands)

if __name__ == '__main__':
    pdf = sys.argv[1]
    page = int(sys.argv[2]) if len(sys.argv) > 2 else 0
    stanzas = extract_lyrics(pdf, page)
    for n, text in stanzas:
        print(f'--- stanza {n} ---')
        print(text)
