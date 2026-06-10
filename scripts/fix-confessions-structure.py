"""Round 1 confession fixes:
   - Reorder: Apostles' Creed first, then Nicene/Athanasian/Chalcedonian, then Five Solas/TULIP.
   - Delete Danvers Statement.
   - Parse Episcopalian Catechism dumped text into proper groups+entries.
   - Backup written to confessions.json.bak-{ts}.
"""
import json, os, re, time, shutil

BASE = r'C:\Users\Dustina\Websites\church-directory'
PATH = os.path.join(BASE, 'public', 'hymnal-data', 'confessions.json')

shutil.copy2(PATH, PATH + f'.bak-{int(time.time())}')

c = json.load(open(PATH, encoding='utf-8'))
docs = c['documents']

# --- 1. Reorder: move Apostles' Creed first, Five Solas/TULIP after the four early creeds.
title_of = lambda d: d.get('title','')
def find_idx(needle):
    for i,d in enumerate(docs):
        t = title_of(d).lower()
        if needle.lower() in t: return i
    return -1

# Pull out the docs we want to reorder
i_apostles = find_idx("apostles")
i_nicene   = find_idx("nicene creed")
i_athan    = find_idx("athanasian")
i_chalc    = find_idx("chalcedonian")
i_solas    = find_idx("five solas")
i_tulip    = find_idx("tulip")

picks = [i_apostles, i_nicene, i_athan, i_chalc, i_solas, i_tulip]
print('Indices to move (apostles, nicene, athan, chalc, solas, tulip):', picks)
assert all(i >= 0 for i in picks), 'Missing one of the early creeds'

picked = [docs[i] for i in picks]
remaining = [d for i,d in enumerate(docs) if i not in picks]
docs = picked + remaining
print('After reorder, first 8:')
for i,d in enumerate(docs[:8]):
    print(f'  {i}  {title_of(d)}')

# --- 2. Delete Danvers Statement
before = len(docs)
docs = [d for d in docs if 'danvers' not in title_of(d).lower()]
print(f'Removed Danvers: {before} -> {len(docs)} docs')

# --- 3. Re-parse Episcopalian Catechism
episc_idx = next(i for i,d in enumerate(docs) if 'episcopalian catechism' in title_of(d).lower())
episc = docs[episc_idx]
big = episc['groups'][0]['entries'][0]['answer']

# Section headings (each on its own line, not starting with Q. or A.)
SECTION_HEADINGS = [
    'God the Father','The Old Covenant','The Ten Commandments','Sin and Redemption',
    'God the Son','The New Covenant','The Creeds','The Holy Spirit','The Holy Scriptures',
    'The Church','The Ministry','Prayer and Worship','The Sacraments','Holy Baptism',
    'The Holy Eucharist','Other Sacramental Rites','The Christian Hope',
]
lines = big.split('\n')

# Walk lines, accumulating Q/A pairs into the current section
groups = []
cur_title = 'Human Nature'   # opening section (first 6 Q&As preceded by no heading)
cur_entries = []
i = 0
def push_group():
    if cur_entries:
        groups.append({'number': str(len(groups)+1), 'title': cur_title, 'entries': cur_entries[:]})

pending_q = None
pending_a = None

def flush_pair():
    global pending_q, pending_a
    if pending_q is not None:
        cur_entries.append({
            'id': f'episc-{len(groups)+1}-{len(cur_entries)+1}',
            'label': str(len(cur_entries)+1),
            'question': pending_q.strip(),
            'answer': (pending_a or '').strip(),
            'proofs': [],
        })
    pending_q, pending_a = None, None

mode = None  # 'q' or 'a'
while i < len(lines):
    raw = lines[i]
    line = raw.strip()
    i += 1
    if not line:
        continue
    if line in SECTION_HEADINGS:
        flush_pair()
        push_group()
        cur_title = line
        cur_entries = []
        mode = None
        continue
    if line.startswith('Q.'):
        flush_pair()
        pending_q = line[2:].strip()
        pending_a = None
        mode = 'q'
        continue
    if line.startswith('A.'):
        pending_a = line[2:].strip()
        mode = 'a'
        continue
    # Continuation line for whichever mode is open
    if mode == 'q' and pending_q is not None:
        pending_q += ' ' + line
    elif mode == 'a' and pending_a is not None:
        pending_a += '\n' + line

flush_pair()
push_group()

episc['groups'] = groups
print(f'Episcopalian Catechism re-parsed: {len(groups)} groups, {sum(len(g["entries"]) for g in groups)} total Q&As')
for g in groups:
    print(f'  - {g["title"]}: {len(g["entries"])} entries')

# Save
c['documents'] = docs
with open(PATH, 'w', encoding='utf-8') as f:
    json.dump(c, f, ensure_ascii=False, indent=2)
print(f'\nWrote {PATH}')
print(f'Final doc count: {len(docs)}')
