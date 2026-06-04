"""Scrape hymnary.org HoG2015/<n> for hymns 322-444 to fill metadata gap.

Hymnary's hymn page only exposes title, first-line, and sometimes author.
We can't get full lyric text from these pages; we just fill the index.
Also wires in the 97 already-extracted MP3s for that range as local audioUrl.
"""

import json, os, re, shutil, sys, time, urllib.request

UA = "NXR-Hymnal-Index-Fill/1.0 (one-time)"
JSON_PATH = r"C:\Users\Dustina\Websites\church-directory\public\hymnal-data\hymns_of_grace.json"
EXT_DIR = r"C:\Users\Dustina\AppData\Local\Temp\hog-extract"
DEST_DIR = r"C:\Users\Dustina\Websites\church-directory\public\hymnal-media\hog-audio"

def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")

def parse(n, html):
    out = {"number": str(n)}
    m = re.search(r"<title>Hymns of Grace\s*\d+\.\s*([^<|]+?)\s*\|", html)
    if m: out["title"] = m.group(1).strip()
    # Plain-text extraction of structured fields
    t = re.sub(r"<script[^>]*>.*?</script>", "", html, flags=re.S)
    t = re.sub(r"<style[^>]*>.*?</style>", "", t, flags=re.S)
    t = re.sub(r"<[^>]+>", "\n", t)
    lines = [l.strip() for l in t.split("\n") if l.strip()]
    for i, l in enumerate(lines):
        if l == "First Line:" and i + 1 < len(lines):
            out["firstLine"] = lines[i + 1]
        elif l == "Author:" and i + 1 < len(lines):
            out["author"] = lines[i + 1]
        elif l == "Translator:" and i + 1 < len(lines):
            out["translator"] = lines[i + 1]
        elif l == "Title:" and i + 1 < len(lines) and not out.get("title"):
            out["title"] = lines[i + 1]
    return out

def main():
    with open(JSON_PATH, encoding="utf-8") as f:
        doc = json.load(f)
    existing_nums = {str(h["number"]) for h in doc["hymns"]}
    # Build mp3 num -> filename
    mp3_by_num = {}
    for f in os.listdir(EXT_DIR):
        if not f.lower().endswith(".mp3"): continue
        m = re.match(r"^\s*(\d+)\b", f)
        if m: mp3_by_num.setdefault(m.group(1), f)  # keep first; dup handled

    new_hymns = []
    failed = []
    for n in range(322, 445):
        if str(n) in existing_nums:
            continue
        url = f"https://hymnary.org/hymn/HoG2015/{n}"
        try:
            html = fetch(url)
            entry = parse(n, html)
        except Exception as e:
            failed.append((n, str(e)))
            continue
        # Wire local audio if we have it
        if str(n) in mp3_by_num:
            src = os.path.join(EXT_DIR, mp3_by_num[str(n)])
            dst = os.path.join(DEST_DIR, f"hog_{n}.mp3")
            if not os.path.exists(dst):
                shutil.copyfile(src, dst)
            entry["audioUrl"] = f"/hymnal-media/hog-audio/hog_{n}.mp3"
        # Stub verses since hymnary doesn't expose lyrics
        entry.setdefault("title", f"Hymn {n}")
        entry["verses"] = []
        new_hymns.append(entry)
        if n % 10 == 0:
            print(f"  ...{n}/444  added={len(new_hymns)}  failed={len(failed)}", flush=True)
        time.sleep(0.3)

    doc["hymns"].extend(new_hymns)
    doc["hymns"].sort(key=lambda h: int(h["number"]) if str(h["number"]).isdigit() else 999999)
    with open(JSON_PATH, "w", encoding="utf-8", newline="\n") as f:
        json.dump(doc, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print(f"\nadded: {len(new_hymns)}, failed: {len(failed)}")
    if failed:
        for n, e in failed[:10]: print(f"  fail {n}: {e}")
    with_audio = sum(1 for h in new_hymns if h.get("audioUrl"))
    print(f"new entries with local audio: {with_audio}")

if __name__ == "__main__":
    main()
