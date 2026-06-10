import re, html
with open(r'C:/temp/dort.html', encoding='utf-8') as f:
    raw = f.read()
txt = re.sub(r'<script.*?</script>', '', raw, flags=re.S | re.I)
txt = re.sub(r'<style.*?</style>', '', txt, flags=re.S | re.I)
hits = [m.start() for m in re.finditer(r'conclusion', txt, re.I)]
print('conclusion hits:', hits[:20])
last = hits[-1]
chunk = txt[last:last + 30000]
chunk = re.sub(r'<[^>]+>', ' ', chunk)
chunk = html.unescape(chunk)
chunk = re.sub(r'[ \t]+', ' ', chunk)
chunk = re.sub(r'\n\s*\n+', '\n\n', chunk)
print('---')
print(chunk[:10000])
