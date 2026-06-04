"""For each Baptist hymn missing audio (OCR-mismatched in earlier pass),
extract text from its per-hymn PDF and check overlap with TH1961's same-number
title. If it matches, wire the TH1961 audio."""
import json, re, os
from pypdf import PdfReader

BASE = r'C:\Users\Dustina\Websites\church-directory'
BAPTIST_JSON = BASE + r'\public\hymnal-data\trinity_hymnal_baptist.json'
TH1961_JSON = BASE + r'\public\hymnal-data\trinity_hymnal_1961.json'
SHEET_DIR = BASE + r'\public\hymnal-media\baptist-sheet'

def base_num(h):
    m = re.match(r'(\d+)', str(h['number']))
    return int(m.group(1)) if m else None

def sigwords(t):
    return set(w for w in re.sub('[^a-z ]+', ' ', t.lower()).split() if len(w) > 3)

with open(BAPTIST_JSON, encoding='utf-8') as f:
    b = json.load(f)
with open(TH1961_JSON, encoding='utf-8') as f:
    t = json.load(f)
t_by_num = {}
for h in t['hymns']:
    n = base_num(h)
    if n is not None and n not in t_by_num:
        t_by_num[n] = h

# Find Baptist hymns missing audioUrl that DO have a same-number TH1961
candidates = []
for h in b['hymns']:
    n = base_num(h)
    if n is None: continue
    if h.get('audioUrl'): continue
    th = t_by_num.get(n)
    if not th: continue
    if not th.get('audioUrl'): continue
    candidates.append((n, h, th))

print(f'Candidates to re-check: {len(candidates)}')
print()

fixed = []
still_no_match = []
for n, bap, th in candidates:
    pdf_path = os.path.join(SHEET_DIR, f'{n:03d}.pdf')
    if not os.path.exists(pdf_path):
        still_no_match.append((n, 'no PDF', bap.get('title', ''), th.get('title', '')))
        continue
    r = PdfReader(pdf_path)
    txt = ''
    for page in r.pages:
        txt += (page.extract_text() or '') + ' '
    pdf_words = sigwords(txt)
    th_words = sigwords(th.get('title', ''))
    overlap = pdf_words & th_words
    # Require at least 2 significant TH words to appear in the PDF text, or
    # 1 if the TH title only has 1 significant word.
    needed = min(2, len(th_words)) if th_words else 0
    if needed and len(overlap) >= needed:
        bap['audioUrl'] = th['audioUrl']
        fixed.append((n, th.get('title', ''), sorted(overlap)))
    else:
        still_no_match.append((n, 'no overlap', bap.get('title', ''), th.get('title', '')))

with open(BAPTIST_JSON, 'w', encoding='utf-8') as f:
    json.dump(b, f, ensure_ascii=False, indent=2)

print(f'Fixed: {len(fixed)}')
for n, title, ov in fixed:
    print(f'  #{n}: TH title={title[:50]!r}, PDF overlap={ov[:5]}')
print()
print(f'Still no match: {len(still_no_match)} (likely genuinely different hymns)')
for n, why, bt, tt in still_no_match:
    print(f'  #{n} ({why}): B={bt[:40]!r}  TH={tt[:40]!r}')
print()
audio = sum(1 for h in b['hymns'] if h.get('audioUrl'))
print(f'Total Baptist audio coverage now: {audio}/{len(b["hymns"])} ({100*audio/len(b["hymns"]):.1f}%)')
