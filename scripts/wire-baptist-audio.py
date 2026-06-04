"""Copy audioUrl from TH1961 hymns to Baptist hymns where titles align.

Baptist hymns 1-730 mostly match TH1961 hymn-for-hymn; the Baptist edition added
42 Psalters (numbered ~731-774). Where Baptist's OCR-noisy title shares a
significant word with TH1961's clean title, we treat them as the same hymn and
copy audioUrl. Otherwise we leave it blank (the renumbering for psalters may
have shifted some hymns).
"""
import json, re

BASE = r'C:\Users\Dustina\Websites\church-directory'
BAPTIST = BASE + r'\public\hymnal-data\trinity_hymnal_baptist.json'
TH1961 = BASE + r'\public\hymnal-data\trinity_hymnal_1961.json'

def base_num(h):
    m = re.match(r'(\d+)', str(h['number']))
    return int(m.group(1)) if m else None

def sigwords(t):
    return set(w for w in re.sub('[^a-z ]+', ' ', t.lower()).split() if len(w) > 3)

def is_ocr_garbage(t: str) -> bool:
    """A title looks like OCR garbage if any word contains telltale OCR runs."""
    # Strong signals: 5+ consecutive consonants, words longer than 14 chars,
    # or punctuation glued mid-word.
    if re.search(r'[bcdfghjklmnpqrstvwxz]{5,}', t.lower()): return True
    if re.search(r'\b\w{15,}\b', t): return True
    if re.search(r'[a-zA-Z][^\w\s\'-][a-zA-Z]', t): return True  # mid-word punct
    if re.search(r'[a-zA-Z]\d', t): return True  # digit glued to letter
    # Excessive ALL-CAPS runs (OCR often misreads music notation as caps)
    if re.search(r'[A-Z]{5,}', t): return True
    return False

with open(BAPTIST, encoding='utf-8') as f:
    b = json.load(f)
with open(TH1961, encoding='utf-8') as f:
    t = json.load(f)

t_by_num = {}
for h in t['hymns']:
    n = base_num(h)
    if n is not None and n not in t_by_num:
        t_by_num[n] = h

wired = mismatch = not_in_th = no_audio = 0
mismatches = []
for h in b['hymns']:
    n = base_num(h)
    if n is None: continue
    th = t_by_num.get(n)
    if not th:
        not_in_th += 1
        continue
    th_audio = th.get('audioUrl')
    if not th_audio:
        no_audio += 1
        continue
    bt = h.get('title', '')
    tt = th.get('title', '')
    if sigwords(bt) & sigwords(tt) or is_ocr_garbage(bt):
        # Title aligns OR Baptist title is OCR noise (assume same hymn)
        h['audioUrl'] = th_audio
        wired += 1
    else:
        mismatch += 1
        mismatches.append((n, bt[:50], tt[:50]))

with open(BAPTIST, 'w', encoding='utf-8') as f:
    json.dump(b, f, ensure_ascii=False, indent=2)

print(f'Baptist hymns total: {len(b["hymns"])}')
print(f'  audioUrl wired from TH1961: {wired}')
print(f'  Title mismatch (skipped): {mismatch}')
print(f'  Not in TH1961 (likely new psalter): {not_in_th}')
print(f'  TH1961 had no audio: {no_audio}')
print()
print(f'Mismatched (NOT wired):')
for n, bt, tt in mismatches[:20]:
    print(f'  #{n}: B={bt!r}  vs  TH={tt!r}')
