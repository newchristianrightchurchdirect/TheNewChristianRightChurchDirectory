"""Strip the bogus 'C:/Program Files/Git/' prefix from TH1961 sheetMusicUrls.

Git Bash's MSYS2 path translation poisoned the JSON when an earlier script
was invoked with bash absolute paths — every URL became
'C:/Program Files/Git/hymnal-media/th-sheet/NNN.pdf' instead of
'/hymnal-media/th-sheet/NNN.pdf'.

Also clear URLs that don't have a backing PDF on disk."""
import json, os, re

JSON = r'C:\Users\Dustina\Websites\church-directory\public\hymnal-data\trinity_hymnal_1961.json'
SHEET_DIR = r'C:\Users\Dustina\Websites\church-directory\public\hymnal-media\th-sheet'

d = json.load(open(JSON, encoding='utf-8'))

# Which PDFs exist on disk?
on_disk = set()
for f in os.listdir(SHEET_DIR):
    if f.lower().endswith('.pdf') and os.path.getsize(os.path.join(SHEET_DIR, f)) > 1000:
        on_disk.add(f)

print(f'PDFs on disk: {len(on_disk)}')

fixed = cleared = unchanged = 0
for h in d['hymns']:
    u = h.get('sheetMusicUrl')
    if not u: continue
    # Match the corrupted pattern, capture the relative part
    m = re.match(r'C:/Program Files/Git(/hymnal-media/.*)$', u)
    if m:
        rel = m.group(1)
        # Verify the backing PDF exists
        fname = rel.rsplit('/', 1)[-1]
        if fname in on_disk:
            h['sheetMusicUrl'] = rel
            fixed += 1
        else:
            h['sheetMusicUrl'] = None
            cleared += 1
    else:
        unchanged += 1

with open(JSON, 'w', encoding='utf-8') as f:
    json.dump(d, f, ensure_ascii=False, indent=2)

print(f'Fixed: {fixed}  Cleared (no PDF): {cleared}  Unchanged: {unchanged}')
sheet = sum(1 for h in d['hymns'] if h.get('sheetMusicUrl'))
print(f'Sheet coverage: {sheet}/{len(d["hymns"])} ({100*sheet/len(d["hymns"]):.1f}%)')
