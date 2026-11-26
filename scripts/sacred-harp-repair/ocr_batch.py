import json,os,sys,re
from rapidocr_onnxruntime import RapidOCR
eng=RapidOCR()
WEB='C:/Users/Dustina/Websites/church-directory/public'
fl=json.load(open('flags2.json',encoding='utf-8'))['sacred_harp_1991']
H={h['number']:h for h in json.load(open(WEB+'/hymnal-data/sacred_harp_1991.json',encoding='utf-8'))['hymns']}
todo=[x['n'] for x in fl if x['score']>=0.15]
os.makedirs('ocr',exist_ok=True)
json.dump(todo,open('sh_todo.json','w'))
for n in todo:
    out=f'ocr/{n}.txt'
    if os.path.exists(out): continue
    url=H[n].get('sheetMusicUrl') or ''
    jpg=WEB+url[:-4]+'.1.jpg' if url.endswith('.pdf') else None
    if not jpg or not os.path.exists(jpg):
        open(out,'w').write('NO_JPG '+url); continue
    res,_=eng(jpg)
    items=[(sum(p[1] for p in b)/4,min(p[0] for p in b),t) for b,t,c in (res or [])]
    items.sort()
    rows=[];cur=[];y0=None
    for y,x,t in items:
        if y0 is None or abs(y-y0)<=7: cur.append((x,t)); y0=y if y0 is None else y0
        else: rows.append((y0,cur)); cur=[(x,t)]; y0=y
    if cur: rows.append((y0,cur))
    with open(out,'w',encoding='utf-8') as f:
        f.write(f"# {n} {H[n]['title'][:60]} | {url}\n")
        for y,c in rows: f.write(f"{int(y):4d} | "+'  '.join(t for x,t in sorted(c))+'\n')
print('done',len(todo))
