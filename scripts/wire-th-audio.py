"""Wire local TH MIDI audioUrls into trinity_hymnal_1961.json.

Mapping rule for OPC MIDI filenames:
  pure  <N>          -> Th1_<N:03>.mid
  <N>a               -> Th1_<N:03>.mid       (primary tune)
  <N>b               -> Th1_<N:03>s.mid      (2nd tune)
  <N>c               -> Th1_<N:03>t.mid      (3rd tune)
  <N>d               -> Th1_<N:03>f.mid      (4th tune)

Run with --mp3 to instead point at the locally-extracted Th2 MP3 set
(naming pattern derived after extracting Th2_MP3.zip).
"""

import json, os, re, sys

ROOT = r"C:\Users\Dustina\Websites\church-directory"
JSON_PATH = os.path.join(ROOT, "public", "hymnal-data", "trinity_hymnal_1961.json")
MIDI_DIR_REL = "/hymnal-media/th-audio"
MIDI_DIR_ABS = os.path.join(ROOT, "public", "hymnal-media", "th-audio")

VARIANT_SUFFIX = {"a": "", "b": "s", "c": "t", "d": "f"}

def midi_name_for(number: str) -> str | None:
    m = re.match(r"^(\d+)([a-d]?)$", str(number))
    if not m:
        return None
    n, sfx = int(m.group(1)), m.group(2)
    return f"Th1_{n:03d}{VARIANT_SUFFIX.get(sfx, '')}.mid"

def main():
    with open(JSON_PATH, encoding="utf-8") as f:
        doc = json.load(f)
    hymns = doc["hymns"]
    set_count = 0
    skipped = []
    for h in hymns:
        num = h.get("number")
        fname = midi_name_for(num)
        if not fname:
            skipped.append((num, "non-mappable number"))
            continue
        local = os.path.join(MIDI_DIR_ABS, fname)
        if not os.path.exists(local):
            skipped.append((num, f"missing {fname}"))
            continue
        h["audioUrl"] = f"{MIDI_DIR_REL}/{fname}"
        set_count += 1

    with open(JSON_PATH, "w", encoding="utf-8", newline="\n") as f:
        json.dump(doc, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"set audioUrl on {set_count}/{len(hymns)} hymns")
    print(f"skipped: {len(skipped)}")
    for n, why in skipped[:15]:
        print(f"  {n}: {why}")

if __name__ == "__main__":
    main()
