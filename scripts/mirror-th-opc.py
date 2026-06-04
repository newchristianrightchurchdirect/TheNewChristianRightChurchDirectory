"""Mirror Trinity Hymnal MIDI + (later) MP3 assets from OPC via Wayback Machine.

opc.org/books/TH/ is unreachable from this network (TCP timeout to
142.214.208.194). web.archive.org reaches the same content on a working egress.

Modes:
  midi  - pull 730 primary Th1_NNN.mid + 34 extras into th-audio/
  index - print the extras list (for the variant-mapping step)
"""

import json, os, random, re, sys, time, urllib.request

ROOT = r"C:\Users\Dustina\Websites\church-directory"
AUDIO_DIR = os.path.join(ROOT, "public", "hymnal-media", "th-audio")
JSON_PATH = os.path.join(ROOT, "public", "hymnal-data", "trinity_hymnal_1961.json")
MIDI_LIST = r"C:\Users\Dustina\AppData\Local\Temp\opc-th-midi-files.json"

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
HEADERS = {"User-Agent": UA, "Accept": "*/*"}

# Wayback id_ format preserves original bytes (no rewrite). Use a stable old
# capture stamp for the parent dir; per-file we let archive.org find any capture.
WAYBACK_TPL = "https://web.archive.org/web/2020id_/https://www.opc.org/books/TH/MIDI/{name}"

def fetch(url: str, dest: str) -> tuple[bool, str]:
    if os.path.exists(dest) and os.path.getsize(dest) > 0:
        return True, "exists"
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            data = r.read()
        if not data:
            return False, "empty"
        tmp = dest + ".part"
        with open(tmp, "wb") as f:
            f.write(data)
        os.replace(tmp, dest)
        return True, f"{len(data)}B"
    except Exception as e:
        return False, str(e)[:160]

def mode_midi():
    with open(MIDI_LIST) as f:
        names = json.load(f)
    os.makedirs(AUDIO_DIR, exist_ok=True)
    print(f"target MIDIs: {len(names)}")
    ok = 0
    fail = []
    skip = 0
    for i, name in enumerate(names, 1):
        url = WAYBACK_TPL.format(name=name)
        dest = os.path.join(AUDIO_DIR, name)
        success, info = fetch(url, dest)
        if success:
            ok += 1
            if info == "exists":
                skip += 1
            else:
                time.sleep(0.25 + random.random() * 0.2)
        else:
            fail.append((name, info))
        if i % 25 == 0 or i == len(names):
            print(f"  {i}/{len(names)} ok={ok} (skip={skip}) fail={len(fail)}", flush=True)
    print(f"\ndone: {ok} ok, {len(fail)} failed")
    for n, e in fail[:10]:
        print(f"  fail {n}: {e}")

def mode_index():
    with open(MIDI_LIST) as f:
        names = json.load(f)
    extras = [n for n in names if not re.match(r"^Th1_\d{3}\.mid$", n, re.I)]
    print(f"extras ({len(extras)}):")
    for n in extras:
        print(" ", n)

if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else "midi"
    if mode == "midi":
        mode_midi()
    elif mode == "index":
        mode_index()
    else:
        sys.exit("unknown mode")
