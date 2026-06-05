"""For each TH1990 hymn missing lyrics, find which PDF + page contains the
verses page (the one with header "N TitleName"). Saves a map.
"""
import json, os, re, fitz

BASE = r'C:\Users\Dustina\Websites\church-directory'
PDF_DIR = os.path.join(BASE, 'public', 'hymnal-media', 'th2-sheet')
JSON_PATH = os.path.join(BASE, 'public', 'hymnal-data', 'trinity_hymnal_1990.json')
OUT = os.path.join(BASE, 'scripts', 'th1990-verse-pages.json')

d = json.load(open(JSON_PATH, encoding='utf-8'))
missing = [h for h in d['hymns'] if not h.get('verses')]

# Cache embedded-text per PDF (slow without)
text_cache = {}
def page_text(n, page_index):
    key = (n, page_index)
    if key in text_cache: return text_cache[key]
    pdf = os.path.join(PDF_DIR, f'{n:03d}.pdf')
    if not os.path.exists(pdf):
        text_cache[key] = None
        return None
    doc = fitz.open(pdf)
    if page_index >= len(doc):
        text_cache[key] = None
        return None
    t = doc[page_index].get_text()
    text_cache[key] = t
    return t

def page_count(n):
    pdf = os.path.join(PDF_DIR, f'{n:03d}.pdf')
    if not os.path.exists(pdf): return 0
    return len(fitz.open(pdf))

def looks_like_verse_page(text, target_n, title_words):
    """Does this page look like it contains verses for hymn target_n?"""
    if not text: return False
    # Header pattern: number then title on early lines
    lines = [l.strip() for l in text.splitlines() if l.strip()][:6]
    head = ' '.join(lines).lower()
    if str(target_n) in head:
        # Title overlap
        head_words = set(re.sub(r'[^a-z ]+', ' ', head).split())
        if any(w in head_words for w in title_words):
            return True
    return False

mapping = {}
for h in missing:
    n = int(h['number'])
    title = h.get('title', '')
    tw = set(w for w in re.sub(r'[^a-z ]+', ' ', title.lower()).split() if len(w) > 3)
    if not tw:
        mapping[n] = {'title': title, 'found': None, 'reason': 'no title words'}
        continue
    # Try candidates: own PDF page 0, then prev PDF last page, then own PDF pg1, then next PDF pg0
    candidates = []
    pc_own = page_count(n)
    for pi in range(pc_own):
        candidates.append((n, pi))
    pc_prev = page_count(n - 1)
    if pc_prev:
        candidates.append((n - 1, pc_prev - 1))
    pc_next = page_count(n + 1)
    if pc_next:
        candidates.append((n + 1, 0))

    found = None
    for cn, cpi in candidates:
        t = page_text(cn, cpi)
        if looks_like_verse_page(t, n, tw):
            found = {'pdf': cn, 'page': cpi}
            break

    mapping[n] = {'title': title, 'found': found}
    if found:
        print(f'  #{n} "{title[:40]}" -> {cn:03d}.pdf pg{cpi}')
    else:
        print(f'  #{n} "{title[:40]}" -> NOT FOUND')

with open(OUT, 'w', encoding='utf-8') as f:
    json.dump(mapping, f, ensure_ascii=False, indent=2)

found_count = sum(1 for v in mapping.values() if v.get('found'))
print(f'\nFound {found_count}/{len(mapping)} verse pages')
