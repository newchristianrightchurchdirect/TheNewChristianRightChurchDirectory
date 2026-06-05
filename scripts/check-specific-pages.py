import pypdf
SRC = r'C:\Users\Dustina\Downloads\trinity hymnal (3).pdf'
r = pypdf.PdfReader(SRC)
for p in [199, 200, 201, 202, 658, 659, 660, 661]:
    t = r.pages[p-1].extract_text() or ''
    first = ' | '.join([l for l in t.splitlines() if l.strip()][:3])[:160]
    print(f'page {p}: {first}')
