import re, html
with open(r'C:/temp/chicago.html', encoding='utf-8', errors='replace') as f:
    raw = f.read()
txt = re.sub(r'<script.*?</script>', '', raw, flags=re.S | re.I)
txt = re.sub(r'<style.*?</style>', '', txt, flags=re.S | re.I)
m = re.search(r'preface', txt, re.I)
print('Preface starts at:', m.start() if m else 'NOT FOUND')
# Print from preface to "Short Statement"
start = m.start()
end_m = re.search(r'short statement', txt[start+10:], re.I)
end = start + 10 + end_m.start() if end_m else start + 8000
chunk = txt[start:end]
chunk = re.sub(r'<[^>]+>', ' ', chunk)
chunk = html.unescape(chunk)
chunk = re.sub(r'[ \t]+', ' ', chunk)
chunk = re.sub(r'\n\s*\n+', '\n\n', chunk)
print('---')
print(chunk[:8000])
