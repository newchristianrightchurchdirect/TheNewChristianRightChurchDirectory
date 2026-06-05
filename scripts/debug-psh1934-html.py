"""Look at the actual HTML structure of the PsH1934 hymnal page."""
import urllib.request
UA = 'Mozilla/5.0 (NXR-Hymnal lyrics scraper; contact: gecko215059@gmail.com)'
req = urllib.request.Request('https://hymnary.org/hymnal/PsH1934', headers={'User-Agent': UA})
with urllib.request.urlopen(req, timeout=30) as r:
    html = r.read().decode('utf-8', errors='replace')
# look for hymn entry pattern - check for "hymn/PsH1934" appearance
import re
hits = re.findall(r'PsH1934[^\s"<>]*', html)
print(f'PsH1934 mentions: {len(hits)}')
for h in hits[:20]:
    print(f'  {h}')
print()
# Dump section around first hymn 67
idx = html.find('Be Thou my Helper')
if idx > 0:
    print('CONTEXT around "Be Thou my Helper":')
    print(html[max(0,idx-300):idx+300])
