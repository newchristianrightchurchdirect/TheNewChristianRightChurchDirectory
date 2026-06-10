"""Rebuild cantus_christi.json from the christkirk.com music library.

The old catalog merged songs that share pages ("stacked"), attached wrong
page numbers, and zero-padded some numbers. christkirk.com/music-library is
authoritative for Cantus Christi: each <article class="wovax-mm-item"> is one
song with its page reference, sheet PDF, and (often) an mp3.

Build: one entry per library item.
  - number   = christkirk page ("100-103", "91 a-b"); duplicates on one page
               get a/b/c suffixes; items without a page keep the old number.
  - verses   = carried over from the old entry matched by normalized title.
  - sheet    = local mirror of the christkirk PDF (downloaded if absent).
  - audio    = local mirror of the christkirk mp3 if any, else the old local
               audio, else the old external URL.

Usage: python scripts/rebuild-cantus-christi.py [--download]
"""

import html, json, os, re, sys, unicodedata
from urllib.parse import unquote
from urllib.request import Request, urlopen

ITEMS = ".tmp-renders/christkirk-items.json"
DATA = "public/hymnal-data/cantus_christi.json"
SHEET_DIR = "public/hymnal-media/cc-sheet"
AUDIO_DIR = "public/hymnal-media/cc-audio"


def norm(t):
    t = unicodedata.normalize("NFKD", t or "").encode("ascii", "ignore").decode()
    t = re.sub(r"\(.*?\)", "", t.lower())
    return re.sub(r"[^a-z0-9]+", "", t)


def clean_number(p):
    if not p:
        return None
    p = html.unescape(p).strip()
    p = re.sub(r"\s*-\s*", "-", p)
    p = re.sub(r"^0+(\d)", r"\1", p)
    if p.lower() == "handout":
        return "Handout"
    return p


def basename(url):
    return unquote(url.split("/")[-1].split("?")[0])


def download(url, dest):
    req = Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(req, timeout=60) as r, open(dest, "wb") as f:
        f.write(r.read())


def main():
    do_dl = "--download" in sys.argv
    items = json.load(open(ITEMS, encoding="utf-8"))
    data = json.load(open(DATA, encoding="utf-8"))
    old = data["hymns"]

    oldby = {}
    for h in old:
        oldby.setdefault(norm(h["title"]), []).append(h)

    used_old = set()
    out = []
    dl_count = 0
    for it in items:
        title = html.unescape(it["title"] or "").strip()
        key = norm(title)
        cands = oldby.get(key, [])
        # prefer an unused candidate that has verses
        cands = sorted(cands, key=lambda h: (id(h) in used_old, not h.get("verses")))
        match = cands[0] if cands else None
        if match is not None:
            used_old.add(id(match))

        number = clean_number(it["page"]) or (clean_number(str(match["number"])) if match else None)
        if not number:
            continue

        sheet_url = it["sheet"]
        sheet_local = None
        if sheet_url:
            fn = basename(sheet_url)
            path = os.path.join(SHEET_DIR, fn)
            if not os.path.exists(path):
                if do_dl:
                    try:
                        download(sheet_url, path)
                        dl_count += 1
                    except Exception as e:
                        print(f"  sheet dl failed {fn}: {e}")
            if os.path.exists(path):
                sheet_local = f"/hymnal-media/cc-sheet/{fn}"
        if not sheet_local and match:
            sheet_local = match.get("sheetMusicUrl")

        audio_local = None
        if it["mp3"]:
            fn = basename(it["mp3"])
            path = os.path.join(AUDIO_DIR, fn)
            if not os.path.exists(path):
                if do_dl:
                    try:
                        download(it["mp3"], path)
                        dl_count += 1
                    except Exception as e:
                        print(f"  mp3 dl failed {fn}: {e}")
            if os.path.exists(path):
                audio_local = f"/hymnal-media/cc-audio/{fn}"
        if not audio_local and match:
            audio_local = match.get("audioUrl")

        out.append({
            "number": number,
            "title": title,
            "sheetMusicUrl": sheet_local,
            "audioUrl": audio_local,
            "verses": (match.get("verses") if match else None) or [],
            "_order": it.get("_idx", 0),
        })

    # suffix duplicate numbers a/b/c in catalog order
    byno = {}
    for h in out:
        byno.setdefault(h["number"], []).append(h)
    for no, hs in byno.items():
        if len(hs) > 1:
            for i, h in enumerate(hs):
                h["number"] = f"{no}{chr(97 + i)}"

    # sort by first numeric chunk; non-numeric entries at the end by title
    def sortkey(h):
        m = re.match(r"(\d+)", h["number"])
        return (0, int(m.group(1)), h["number"]) if m else (1, 0, h["title"])
    out.sort(key=sortkey)
    for h in out:
        h.pop("_order", None)

    dropped = [h["title"] for h in old if id(h) not in used_old]
    print(f"rebuilt {len(out)} entries from {len(items)} library items "
          f"(old {len(old)}, unused old entries: {len(dropped)})")
    for t in dropped[:10]:
        print("  unused old:", t)
    if do_dl:
        print(f"downloaded {dl_count} files")
    no_verses = sum(1 for h in out if not h["verses"])
    print(f"entries without lyrics: {no_verses}")

    data["hymns"] = out
    with open(DATA, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))
    print("wrote", DATA)


if __name__ == "__main__":
    main()
