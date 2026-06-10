"""
Fill 1 verified HoG2015 lyrics gap from TPH cross-match.
Other 77 missing entries are modern CCLI-licensed material with no overlap
in the 7 confessional hymnals and hymnary.org blocked by BunnyShield.
"""
import json, shutil, time
base = r'C:/Users/Dustina/Websites/church-directory/public/hymnal-data'

with open(f'{base}/trinity_psalter_hymnal.json', encoding='utf-8') as f:
    tph = json.load(f)
with open(f'{base}/hymns_of_grace.json', encoding='utf-8') as f:
    hog = json.load(f)

tph_517 = None
for h in (tph.get('hymns') or []):
    if str(h.get('number')) == '517':
        tph_517 = h
        break

if not tph_517 or not tph_517.get('verses'):
    print('Source missing; aborting')
    raise SystemExit(1)

shutil.copy(f'{base}/hymns_of_grace.json',
            f'{base}/hymns_of_grace.json.bak-{int(time.time())}')

filled = 0
for h in (hog.get('hymns') or []):
    if str(h.get('number')) == '356' and not h.get('verses'):
        h['verses'] = tph_517['verses']
        filled += 1
        print(f"  HoG #356 <- TPH #517 ({len(h['verses'])} verses)")
        break

with open(f'{base}/hymns_of_grace.json', 'w', encoding='utf-8') as f:
    json.dump(hog, f, indent=2, ensure_ascii=False)
print(f'\nFilled {filled} HoG entry from TPH.')
