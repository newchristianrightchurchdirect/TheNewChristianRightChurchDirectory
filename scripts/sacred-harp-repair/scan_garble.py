import json,re,collections,sys
B='C:/Users/Dustina/Websites/church-directory/public/hymnal-data/'
F=['book_of_psalms_for_worship','cantus_christi','hymns_of_grace','sacred_harp_1991','trinity_hymnal_1961','trinity_hymnal_1990','trinity_hymnal_baptist','trinity_psalter_hymnal']
W=re.compile(r"[A-Za-z]+(?:['\u2019][A-Za-z]+)*")
def norm(t): return t.lower().replace('\u2019',"'")
vocab=collections.Counter()
def walk(o):
    if isinstance(o,str): vocab.update(norm(t) for t in W.findall(o))
    elif isinstance(o,dict): [walk(v) for v in o.values()]
    elif isinstance(o,list): [walk(v) for v in o]
for b in ['bible_kjv','bible_esv','bible_nkjv','bible_lsb']: walk(json.load(open(B+b+'.json',encoding='utf-8')))
H={f:json.load(open(B+f+'.json',encoding='utf-8')) for f in F}
for f in F:
    for h in H[f]['hymns']:
        for v in h.get('verses') or []: vocab.update(norm(t) for t in W.findall(v.get('text') or ''))
def ok(t):
    n=norm(t)
    if vocab[n]>=3: return True
    # elisions: heav'n, ev'ry, o'er
    if "'" in n and all(vocab[p]>=2 or len(p)<=2 for p in n.split("'")): return True
    return False
res={}
for f in F:
    rows=[]
    for h in H[f]['hymns']:
        vs=h.get('verses') or []
        if not vs: continue
        txt='\n'.join(v.get('text') or '' for v in vs)
        toks=W.findall(txt)
        if not toks: continue
        bad=[t for t in toks if not ok(t)]
        camel=[t for t in toks if re.search(r'[a-z][A-Z]',t)]
        digit_lines=len(re.findall(r'(?m)^\s*\d+[\s.]|\s\d+\s',txt))
        heading=bool(re.search(r'(?mi)^(from |psalm \d|words:|music:|tune:|text:)',txt))
        score=len(bad)/len(toks)+0.05*len(camel)+0.03*digit_lines+(0.1 if heading else 0)
        if score>=0.04 or camel or heading:
            rows.append(dict(n=h['number'],t=h['title'][:45],score=round(score,3),bad=bad[:8],camel=camel[:4],dl=digit_lines,hd=heading))
    rows.sort(key=lambda r:-r['score'])
    res[f]=rows
    print(f'{f:26} flagged {len(rows):3}  (score>=0.15: {sum(r["score"]>=0.15 for r in rows)})')
json.dump(res,open(sys.argv[1],'w',encoding='utf-8'),ensure_ascii=False,indent=0)
