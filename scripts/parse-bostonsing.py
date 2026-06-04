"""Parse BostonSing /index/ HTML — group MP3 download URLs by SH page number.

The page is structured with anchor links `?p=NNN` (and NNNb/NNNt for variants)
followed by table cells containing MP3 download links. Strategy: split the HTML
on page anchors and harvest .mp3 hrefs in each chunk."""
import re, json, os

HTML = r'C:\tmp\bsindex.html'
OUT = r'C:\tmp\sh-bostonsing-map.json'

html = open(HTML, encoding='utf-8').read()
# Split on the page anchor — the captured group becomes the key for the FOLLOWING chunk.
parts = re.split(r'fasola\.org/indexes/1991/\?p=(\d+[bt]?)', html)
print(f'chunks: {len(parts)}  pages found: {(len(parts)-1)//2}')

mp3_re = re.compile(r'href="(https?://[^"]*?\.mp3[^"]*)"', re.I)

mapping = {}  # page_key -> list of mp3 urls
# parts[0] = preamble, then [page, content, page, content, ...]
for i in range(1, len(parts) - 1, 2):
    page = parts[i]
    chunk = parts[i + 1]
    # chunk includes everything until next anchor. We want MP3s associated with THIS page.
    # But each row has its anchor at the START and mp3s after, so this is correct.
    mp3s = mp3_re.findall(chunk)
    if page not in mapping:
        mapping[page] = []
    for m in mp3s:
        if m not in mapping[page]:
            mapping[page].append(m)

# Stats
pages_with_audio = sum(1 for k, v in mapping.items() if v)
total_mp3s = sum(len(v) for v in mapping.values())
print(f'Pages with at least one MP3: {pages_with_audio}/{len(mapping)}')
print(f'Total distinct MP3 URLs: {total_mp3s}')
print()
print('Sample (first 5 pages):')
for k in sorted(mapping.keys(), key=lambda x: (int(re.match(r"\d+", x).group()), x))[:5]:
    print(f'  p{k}: {len(mapping[k])} mp3(s)')
    for u in mapping[k][:2]:
        print(f'    - {u}')

# Distribution
no_audio = [k for k, v in mapping.items() if not v]
print(f'\nPages with NO MP3: {len(no_audio)}')
if no_audio:
    print(f'  examples: {sorted(no_audio, key=lambda x: (int(re.match(chr(92)+"d+", x).group()), x))[:10]}')

with open(OUT, 'w', encoding='utf-8') as f:
    json.dump(mapping, f, indent=2)
print(f'\nWrote {OUT}')
