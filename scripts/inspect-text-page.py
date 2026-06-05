import urllib.request, re
req = urllib.request.Request('https://hymnary.org/text/and_can_it_be_that_i_should_gain', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, timeout=30).read().decode('utf-8', 'replace')
for tag in ['div id="text"', '<pre', 'class="text"', 'class="hymn']:
    idx = html.find(tag)
    if idx > 0: print(f'Found {tag!r} at idx {idx}')
idx = html.find('Died He')
if idx > 0:
    print('--- Lyrics ctx ---')
    print(html[max(0,idx-200):idx+800])
