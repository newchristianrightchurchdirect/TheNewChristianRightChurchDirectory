"""Fill HoG2015 Scripture responsive readings from local ESV JSON."""
import json, os

BASE = r'C:\Users\Dustina\Websites\church-directory'
DATA = os.path.join(BASE, 'public', 'hymnal-data')
CLASS = os.path.join(BASE, '.tmp-renders', 'hog-classification.json')

esv = json.load(open(os.path.join(DATA, 'bible_esv.json'), encoding='utf-8'))
hog_path = os.path.join(DATA, 'hymns_of_grace.json')
hog = json.load(open(hog_path, encoding='utf-8'))
by_n = {str(h['number']): h for h in hog['hymns']}

# Index ESV by lowercase book name
books = {b['name'].lower(): b for b in esv['books']}

def get_passage(book_name, chapter, vs, ve):
    b = books.get((book_name or '').lower())
    if not b: return None
    # Chapter array is 0-indexed by chapter num-1; verify
    chapters = b['chapters']
    ch = next((c for c in chapters if c.get('number') == chapter), None)
    if not ch: return None
    verses = [v for v in ch['verses'] if vs <= v.get('number', 0) <= ve]
    if not verses: return None
    return [(v['number'], v['text']) for v in verses]

classified = json.load(open(CLASS, encoding='utf-8'))
results = classified['results']

filled = 0
skipped = []
for entry in results:
    if entry.get('type') != 'scripture': continue
    n = str(entry['number'])
    if n not in by_n:
        skipped.append((n, 'not in HoG'))
        continue
    h = by_n[n]
    if h.get('verses'):
        continue  # already filled by cross-match
    passage = get_passage(entry['book'], entry['chapter'], entry['verse_start'], entry['verse_end'])
    if not passage:
        skipped.append((n, f"no passage for {entry.get('ref')}"))
        continue
    # Build a single "verse" entry with the passage text (responsive reading = block of prose)
    text = '\n'.join(f"{vn}. {t}" for vn, t in passage)
    h['verses'] = [{
        'number': '',
        'isChorus': 'False',
        'text': text,
    }]
    filled += 1

with open(hog_path, 'w', encoding='utf-8') as f:
    json.dump(hog, f, ensure_ascii=False, indent=2)

total = len(hog['hymns'])
have = sum(1 for h in hog['hymns'] if h.get('verses'))
print(f'Filled {filled} Scripture readings')
if skipped:
    print(f'Skipped {len(skipped)}:')
    for n, why in skipped: print(f'  #{n}: {why}')
print(f'HoG coverage now: {have}/{total} ({100*have/total:.1f}%)')
