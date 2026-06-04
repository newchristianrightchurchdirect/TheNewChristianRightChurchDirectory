"""Mirror christkirk.com MP3 + PDF assets for the Cantus Christi hymnal.

Reads cantus_christi.json, downloads every audioUrl pointing at christkirk
into public/hymnal-media/cc-audio/, and every sheetMusicUrl PDF into
public/hymnal-media/cc-sheet/. Rewrites JSON to local paths in-place.
Polite: full browser UA, 0.4s jittered sleep, no concurrency.
"""

import json, os, random, re, sys, time, urllib.request, urllib.parse

ROOT = r"C:\Users\Dustina\Websites\church-directory"
JSON_PATH = os.path.join(ROOT, "public", "hymnal-data", "cantus_christi.json")
AUDIO_DIR = os.path.join(ROOT, "public", "hymnal-media", "cc-audio")
SHEET_DIR = os.path.join(ROOT, "public", "hymnal-media", "cc-sheet")

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
HEADERS = {
    "User-Agent": UA,
    "Accept": "*/*",
    "Accept-Language": "en-US,en;q=0.9",
}

def slugify_filename(url: str) -> str:
    # keep christkirk's filename verbatim; just strip query/fragment
    path = urllib.parse.urlparse(url).path
    return os.path.basename(path)

def fetch(url: str, dest: str) -> tuple[bool, str]:
    if os.path.exists(dest) and os.path.getsize(dest) > 0:
        return True, "exists"
    req = urllib.request.Request(url.replace("http://", "https://"), headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            data = r.read()
        if not data:
            return False, "empty"
        tmp = dest + ".part"
        with open(tmp, "wb") as f:
            f.write(data)
        os.replace(tmp, dest)
        return True, f"{len(data)//1024}KB"
    except Exception as e:
        return False, str(e)[:120]

def main() -> int:
    mode = sys.argv[1] if len(sys.argv) > 1 else "both"  # audio|sheet|both
    with open(JSON_PATH, encoding="utf-8") as f:
        doc = json.load(f)

    os.makedirs(AUDIO_DIR, exist_ok=True)
    os.makedirs(SHEET_DIR, exist_ok=True)

    audio_targets = []
    sheet_targets = []
    for h in doc["hymns"]:
        au = h.get("audioUrl") or ""
        sh = h.get("sheetMusicUrl") or ""
        if "christkirk.com" in au and au.lower().endswith(".mp3"):
            audio_targets.append(h)
        if "christkirk.com" in sh and sh.lower().endswith(".pdf"):
            sheet_targets.append(h)

    print(f"audio targets: {len(audio_targets)}, sheet targets: {len(sheet_targets)}")

    def pull(targets, dest_dir, web_prefix, url_field):
        ok = 0
        skip = 0
        fail = []
        for i, h in enumerate(targets, 1):
            url = h[url_field]
            fname = slugify_filename(url)
            dest = os.path.join(dest_dir, fname)
            success, info = fetch(url, dest)
            if success:
                ok += 1
                if info == "exists":
                    skip += 1
                h[url_field] = f"{web_prefix}/{fname}"
            else:
                fail.append((h.get("number"), url, info))
            if i % 10 == 0 or i == len(targets):
                print(f"  [{url_field}] {i}/{len(targets)} ok={ok} (skip={skip}) fail={len(fail)}", flush=True)
            if info != "exists":
                time.sleep(0.4 + random.random() * 0.3)
        return ok, fail

    if mode in ("audio", "both"):
        a_ok, a_fail = pull(audio_targets, AUDIO_DIR, "/hymnal-media/cc-audio", "audioUrl")
        print(f"\naudio: {a_ok} ok, {len(a_fail)} failed")
        for n, u, e in a_fail[:5]:
            print(f"  fail {n}: {e} -> {u}")
    if mode in ("sheet", "both"):
        s_ok, s_fail = pull(sheet_targets, SHEET_DIR, "/hymnal-media/cc-sheet", "sheetMusicUrl")
        print(f"\nsheet: {s_ok} ok, {len(s_fail)} failed")
        for n, u, e in s_fail[:5]:
            print(f"  fail {n}: {e} -> {u}")

    with open(JSON_PATH, "w", encoding="utf-8", newline="\n") as f:
        json.dump(doc, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print("\nwrote", JSON_PATH)
    return 0

if __name__ == "__main__":
    sys.exit(main())
