"""Inject sheetMusicUrl into each hymn entry, pointing at the per-hymn PDF."""
import json, os, sys

def main():
    json_path = sys.argv[1]
    url_prefix = sys.argv[2]  # e.g. /hymnal-media/th2-sheet/
    pdf_dir = sys.argv[3]     # e.g. public/hymnal-media/th2-sheet/

    with open(json_path, encoding='utf-8') as f:
        data = json.load(f)

    have = {f.split('.')[0] for f in os.listdir(pdf_dir) if f.endswith('.pdf')}
    updated = 0
    missing = 0
    import re
    for h in data['hymns']:
        m = re.match(r'(\d+)', str(h['number']))
        if not m: continue
        n = int(m.group(1))
        key = f'{n:03d}'
        if key in have:
            h['sheetMusicUrl'] = f'{url_prefix}{key}.pdf'
            updated += 1
        else:
            missing += 1

    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'{json_path}: updated {updated}, missing {missing}')

if __name__ == '__main__':
    main()
