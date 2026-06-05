"""Extract lyrics from a sheet-music PDF (raster-scan with OCR text layer).

Sheet music is typeset by stanza-row: all verse-1-line-A...verse-N-line-A appear
first (with leading "1./2./N." numbers), then verse-1-line-B...verse-N-line-B, etc.
We detect the first numbered block (=> stanza count N), then take subsequent
un-numbered lines in groups of N, joining group[i] across rows to form verse i.

Then strip syllable-separators (` - `, ` _ `) and collapse spaces.

Quality varies: clean PDFs produce readable text; heavy-OCR-error PDFs leave gaps.
Caller should review.
"""
import re, sys, pdfplumber

NUM_RE = re.compile(r'^\s*(\d+)\.\s*(.*)$')
META_RE = re.compile(
    r'^\s*(C\.M\.|S\.M\.|L\.M\.|\d+\.\d+|copyright|used by permission|'
    r'all rights reserved|music copyright|the psalter|©|words[:\s])',
    re.I
)
HEADER_NUM_RE = re.compile(r'^\s*\d{1,4}\s*$')  # bare hymn number alone on line

def clean_line(s):
    # Drop syllable-separator hyphens/underscores that musical typesetting injects:
    #   "mor - ning" -> "morning",  "Thy _ kind - ness_" -> "Thykindness"
    # Apply BEFORE collapsing spaces so adjacent letters fuse correctly.
    s = re.sub(r'\s*[-_]\s*', '', s)
    s = re.sub(r'\s+', ' ', s).strip()
    return s

def extract_text(pdf_path):
    out = []
    with pdfplumber.open(pdf_path) as pdf:
        for p in pdf.pages:
            t = p.extract_text(x_tolerance=2, y_tolerance=2) or ''
            out.append(t)
    return '\n'.join(out)

def parse_lyrics(raw):
    """Return list of verse strings, or [] if cannot parse."""
    lines = [l.rstrip() for l in raw.splitlines() if l.strip()]
    # Strip obvious header/meta lines
    body = []
    for ln in lines:
        if META_RE.search(ln): continue
        if HEADER_NUM_RE.match(ln): continue
        body.append(ln)
    # Find first contiguous run of numbered lines
    start = None
    for i, ln in enumerate(body):
        if NUM_RE.match(ln):
            start = i; break
    if start is None: return []
    numbered = []
    i = start
    expected = 1
    while i < len(body):
        m = NUM_RE.match(body[i])
        if not m: break
        n = int(m.group(1))
        if n != expected: break
        numbered.append(m.group(2))
        expected += 1
        i += 1
    stanza_count = len(numbered)
    if stanza_count < 2: return []
    # Now take un-numbered lines in groups of stanza_count
    groups = [numbered]
    cur = []
    while i < len(body):
        ln = body[i]
        if NUM_RE.match(ln): break  # another numbered block — bail
        cur.append(ln)
        i += 1
        if len(cur) == stanza_count:
            groups.append(cur)
            cur = []
    # Drop trailing partial group (orphan trailing meta line)
    # Assemble each verse from group[*][k]
    verses = []
    for k in range(stanza_count):
        parts = []
        for g in groups:
            if k < len(g):
                parts.append(clean_line(g[k]))
        full = ' '.join(p for p in parts if p)
        verses.append(full)
    return verses

if __name__ == '__main__':
    paths = sys.argv[1:]
    if not paths:
        # default: sample a few baptist + th2 PDFs
        import os
        BASE = r'C:\Users\Dustina\Websites\church-directory\public\hymnal-media'
        paths = [
            os.path.join(BASE, 'baptist-sheet', '731.pdf'),
            os.path.join(BASE, 'baptist-sheet', '740.pdf'),
            os.path.join(BASE, 'baptist-sheet', '755.pdf'),
            os.path.join(BASE, 'th2-sheet', '024.pdf'),
            os.path.join(BASE, 'th2-sheet', '040.pdf'),
            os.path.join(BASE, 'th2-sheet', '107.pdf'),
        ]
    for p in paths:
        print('='*70)
        print(p)
        print('='*70)
        try:
            raw = extract_text(p)
        except Exception as e:
            print(f'  ERROR: {e}')
            continue
        verses = parse_lyrics(raw)
        if not verses:
            print('  (no parse)')
            print('  RAW:')
            for ln in raw.splitlines()[:20]:
                print(f'    | {ln}')
            continue
        for i, v in enumerate(verses, 1):
            print(f'  Verse {i}: {v}')
