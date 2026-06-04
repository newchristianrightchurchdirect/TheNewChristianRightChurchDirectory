"""Scrape hymnary.org TH1990 (Trinity Hymnal Revised, 1990) hymns 1-742.

Builds public/hymnal-data/trinity_hymnal_1990.json from scratch, then wires
local audioUrl to the 759 Th2_*.mp3 files already extracted to th-mp3/.

Hymnary's hymn page exposes Text/Author/Tune/Composer headers but not full
lyrics — we'll fill metadata only; verses left empty for later.
"""

import json, os, re, sys, time, urllib.request

UA = "NXR-Hymnal-Index-Fill/1.0 (one-time research)"
ROOT = r"C:\Users\Dustina\Websites\church-directory"
JSON_PATH = os.path.join(ROOT, "public", "hymnal-data", "trinity_hymnal_1990.json")
MP3_DIR_ABS = os.path.join(ROOT, "public", "hymnal-media", "th-mp3")
MP3_DIR_REL = "/hymnal-media/th-mp3"
MAX_N = 742

def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")

def parse(n: int, html: str) -> dict:
    out = {"number": str(n)}
    t = re.sub(r"<script.*?</script>", "", html, flags=re.S)
    t = re.sub(r"<style.*?</style>", "", t, flags=re.S)
    t = re.sub(r"<[^>]+>", "\n", t)
    lines = [l.strip() for l in t.split("\n") if l.strip()]
    for i, l in enumerate(lines):
        if l == "Text:" and i + 1 < len(lines):
            out["title"] = lines[i + 1].strip()
        elif l == "Author:" and i + 1 < len(lines):
            out["author"] = lines[i + 1]
        elif l == "Translator:" and i + 1 < len(lines):
            out["translator"] = lines[i + 1]
        elif l == "Composer:" and i + 1 < len(lines):
            out["composer"] = lines[i + 1]
        elif l == "Tune:" and i + 1 < len(lines):
            out["tune"] = lines[i + 1]
        elif l == "First Line:" and i + 1 < len(lines):
            out["firstLine"] = lines[i + 1]
    return out

def audio_for(n: int) -> str | None:
    """Find local Th2 MP3 for hymn number n."""
    for cand in (f"Th2_{n:03d}.mp3",):
        if os.path.exists(os.path.join(MP3_DIR_ABS, cand)):
            return f"{MP3_DIR_REL}/{cand}"
    return None

def main():
    # Start with an empty hymnal shell. Reuse same structure as the others.
    doc = {
        "hymnal": {
            "id": "TH1990",
            "name": "Trinity Hymnal (Revised)",
            "abbreviation": "TH",
            "description": "Trinity Hymnal, 1990 revised edition. Published by Great Commission Publications. Metadata sourced from hymnary.org; audio sourced from OPC.org via web.archive.org.",
            "year": 1990,
            "publisher": "Great Commission Publications",
        },
        "hymns": [],
    }
    # Resume support: if file exists, pick up where we left off
    existing = {}
    if os.path.exists(JSON_PATH):
        with open(JSON_PATH, encoding="utf-8") as f:
            prev = json.load(f)
        existing = {str(h["number"]): h for h in prev.get("hymns", [])}
        doc["hymns"] = prev["hymns"]
        print(f"resuming with {len(existing)} existing entries")

    new = 0
    failed = []
    for n in range(1, MAX_N + 1):
        key = str(n)
        if key in existing and existing[key].get("title"):
            continue
        url = f"https://hymnary.org/hymn/TH1990/{n}"
        try:
            html = fetch(url)
            entry = parse(n, html)
        except Exception as e:
            failed.append((n, str(e)[:120]))
            time.sleep(1.0)
            continue
        audio = audio_for(n)
        if audio:
            entry["audioUrl"] = audio
        entry.setdefault("title", f"Hymn {n}")
        entry["verses"] = []
        if key in existing:
            # Update in place
            for i, h in enumerate(doc["hymns"]):
                if str(h["number"]) == key:
                    doc["hymns"][i] = entry
                    break
        else:
            doc["hymns"].append(entry)
        new += 1
        if n % 25 == 0 or n == MAX_N:
            print(f"  {n}/{MAX_N}  new={new}  fail={len(failed)}", flush=True)
            # Persist progress every 25 hymns so a crash isn't catastrophic
            doc["hymns"].sort(key=lambda h: int(h["number"]) if str(h["number"]).isdigit() else 999999)
            with open(JSON_PATH, "w", encoding="utf-8", newline="\n") as f:
                json.dump(doc, f, indent=2, ensure_ascii=False)
                f.write("\n")
        time.sleep(0.4)

    # Final sort + write
    doc["hymns"].sort(key=lambda h: int(h["number"]) if str(h["number"]).isdigit() else 999999)
    with open(JSON_PATH, "w", encoding="utf-8", newline="\n") as f:
        json.dump(doc, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"\nadded/updated: {new}, failed: {len(failed)}")
    for n, e in failed[:10]:
        print(f"  fail {n}: {e}")
    with_audio = sum(1 for h in doc["hymns"] if h.get("audioUrl"))
    print(f"entries with local audio: {with_audio}/{len(doc['hymns'])}")

if __name__ == "__main__":
    main()
