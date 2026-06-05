"""Apply PsH1934 lyrics to Baptist Psalter hymns 731-774 using the mapping."""
import json, os, re
from html import unescape

BASE = r'C:\Users\Dustina\Websites\church-directory'
B_JSON = BASE + r'\public\hymnal-data\trinity_hymnal_baptist.json'
MAP = BASE + r'\scripts\baptist-to-psh1934-final.json'
CACHE = r'C:\tmp\hymnary-psh1934-cache'

TEXT_DIV_RE = re.compile(r'<div id="text">(.*?)</div>', re.S)
P_RE = re.compile(r'<p[^>]*>(.*?)</p>', re.S)
TAG_RE = re.compile(r'<[^>]+>')

def parse_verses(html):
    m = TEXT_DIV_RE.search(html)
    if not m: return []
    verses = []
    for p in P_RE.findall(m.group(1)):
        s = re.sub(r'<br\s*/?>', '\n', p)
        s = TAG_RE.sub('', s).strip()
        s = unescape(s)
        if not s: continue
        is_chorus = False
        num = ''
        m1 = re.match(r'^(Refrain|Chorus)[:\s]*\n?', s, re.I)
        if m1:
            is_chorus = True
            s = s[m1.end():].strip()
        else:
            m2 = re.match(r'^(\d+)[\.\s]+', s)
            if m2:
                num = m2.group(1)
                s = s[m2.end():].strip()
        verses.append({'number': num, 'isChorus': str(is_chorus), 'text': s})
    return verses

mapping = json.load(open(MAP, encoding='utf-8'))
b = json.load(open(B_JSON, encoding='utf-8'))

# Index baptist hymns by number
b_by = {str(h['number']): h for h in b['hymns']}

filled = 0
no_lyrics = 0
no_match = 0
for n_str, d in mapping.items():
    psh_num = d.get('psh_num')
    if not psh_num:
        no_match += 1
        continue
    h = b_by.get(n_str)
    if not h:
        print(f'  Baptist hymn {n_str} not found in JSON')
        continue
    if h.get('verses'):
        continue  # already has lyrics

    cache = os.path.join(CACHE, f'{psh_num}.html')
    if not os.path.exists(cache):
        print(f'  Baptist {n_str}: PsH1934 #{psh_num} HTML not cached')
        no_lyrics += 1
        continue
    html = open(cache, encoding='utf-8').read()
    verses = parse_verses(html)
    if not verses:
        no_lyrics += 1
        continue
    h['verses'] = verses
    filled += 1

with open(B_JSON, 'w', encoding='utf-8') as f:
    json.dump(b, f, ensure_ascii=False, indent=2)

print(f'Filled: {filled}')
print(f'No lyrics: {no_lyrics}')
print(f'No PsH1934 match: {no_match}')
total_has = sum(1 for h in b['hymns'] if h.get('verses'))
print(f'\nBaptist lyrics coverage: {total_has}/{len(b["hymns"])} ({100*total_has/len(b["hymns"]):.1f}%)')
