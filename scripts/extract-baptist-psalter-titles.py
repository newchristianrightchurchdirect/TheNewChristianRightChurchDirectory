"""For Baptist Psalters 731-774, extract the scripture reference + first stanza
incipit from the PDF header. Output JSON for downstream matching."""
import json, os, re, pypdf

DIR = r'C:\Users\Dustina\Websites\church-directory\public\hymnal-media\baptist-sheet'
OUT = r'C:\Users\Dustina\Websites\church-directory\scripts\baptist-psalter-incipits.json'

def extract_meta(text):
    """Return {psalm: 'NN', scripture_first: 'first line', tune: 'XXX', meter: 'C.M.'}."""
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    psalm = ''
    scripture = ''
    tune = ''
    meter = ''
    for ln in lines[:15]:
        m = re.search(r'From\s+PSALM\s+(\d+(?::\d+(?:-\d+)?)?)', ln, re.I)
        if m and not psalm: psalm = m.group(1)
        m = re.search(r'Psalm\s+(\d+):\s*\d', ln)
        if m and not psalm: psalm = m.group(1)
        m = re.search(r'\b([A-Z][A-Z\s]{4,}(?:\s+\([A-Z\s]+\))?)\s+([CSL]\.M\.\s*D?\.?|L\.M\.|\d+\.\d+(?:\.\d+)?(?:\.\d+)?)\b', ln)
        if m and not tune:
            tune = m.group(1).strip()
            meter = m.group(2).strip()
    return {'psalm': psalm, 'tune': tune, 'meter': meter}

out = {}
for n in range(731, 775):
    path = os.path.join(DIR, f'{n:03d}.pdf')
    if not os.path.exists(path):
        out[str(n)] = {'error': 'missing'}
        continue
    try:
        r = pypdf.PdfReader(path)
        t = ''
        for pg in range(min(2, len(r.pages))):
            t += '\n' + (r.pages[pg].extract_text() or '')
        meta = extract_meta(t)
        # raw header sample
        sample = '\n'.join([l for l in t.splitlines() if l.strip()][:5])
        meta['raw_header'] = sample
        out[str(n)] = meta
    except Exception as e:
        out[str(n)] = {'error': str(e)}

with open(OUT, 'w', encoding='utf-8') as f:
    json.dump(out, f, ensure_ascii=False, indent=2)

# Print summary
for n in range(731, 775):
    d = out[str(n)]
    if 'error' in d:
        print(f'{n}: ERROR {d["error"]}')
    else:
        print(f'{n}: psalm={d.get("psalm","")!r}  tune={d.get("tune","")!r}  meter={d.get("meter","")!r}')
