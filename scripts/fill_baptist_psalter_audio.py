"""
Fill Baptist Psalter 731-774 audio from TPH/BPW where titles match exactly.
4 matches identified; remaining 27 need OCR title cleanup or hymnary scrape
(which is blocked by BunnyShield CDN).
"""
import json, re, shutil, time
base = r'C:/Users/Dustina/Websites/church-directory/public/hymnal-data'
shutil.copy(f'{base}/trinity_hymnal_baptist.json',
            f'{base}/trinity_hymnal_baptist.json.bak-{int(time.time())}')

with open(f'{base}/trinity_hymnal_baptist.json', encoding='utf-8') as f:
    bapt = json.load(f)
with open(f'{base}/trinity_psalter_hymnal.json', encoding='utf-8') as f:
    tph = json.load(f)
with open(f'{base}/book_of_psalms_for_worship.json', encoding='utf-8') as f:
    bpw = json.load(f)

def hymns(d):
    return d.get('hymns') or d.get('items') or []

def norm(t):
    if not t: return ''
    t = re.sub(r'[^a-z0-9 ]', '', t.lower())
    t = re.sub(r'\b(the|a|an|o|of|for|to|my|i|in|on|with)\b', '', t)
    t = re.sub(r'\s+', ' ', t).strip()
    return t[:30]

def map_titles(d):
    m = {}
    for h in hymns(d):
        t = norm(h.get('title'))
        a = h.get('audioUrl')
        if t and a:
            m.setdefault(t, []).append((h.get('number'), a))
    return m

tph_map = map_titles(tph)
bpw_map = map_titles(bpw)

def num_int(n):
    s = str(n or '0')
    m = re.match(r'(\d+)', s)
    return int(m.group(1)) if m else 0

filled = 0
for h in hymns(bapt):
    if 731 <= num_int(h.get('number')) <= 774 and not h.get('audioUrl'):
        t = norm(h.get('title'))
        if not t: continue
        cand = tph_map.get(t) or bpw_map.get(t)
        if cand:
            h['audioUrl'] = cand[0][1]
            filled += 1
            print(f"  #{h['number']}: {h.get('title','')[:40]} -> {cand[0][1]}")

with open(f'{base}/trinity_hymnal_baptist.json', 'w', encoding='utf-8') as f:
    json.dump(bapt, f, indent=2, ensure_ascii=False)
print(f'\nFilled {filled}/31 Baptist Psalter audio links.')
