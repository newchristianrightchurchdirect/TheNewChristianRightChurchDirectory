"""Parallel mirror of TH MIDIs from Wayback. Replaces single-threaded scraper."""
import json, os, sys, time, urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed

ROOT = r"C:\Users\Dustina\Websites\church-directory"
AUDIO_DIR = os.path.join(ROOT, "public", "hymnal-media", "th-audio")
MIDI_LIST = r"C:\Users\Dustina\AppData\Local\Temp\opc-th-midi-files.json"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
WAYBACK_TPL = "https://web.archive.org/web/2020id_/https://www.opc.org/books/TH/MIDI/{name}"
WORKERS = 6

def fetch(name: str) -> tuple[str, bool, str]:
    dest = os.path.join(AUDIO_DIR, name)
    if os.path.exists(dest) and os.path.getsize(dest) > 0:
        return (name, True, "exists")
    url = WAYBACK_TPL.format(name=name)
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            data = r.read()
        if not data:
            return (name, False, "empty")
        tmp = dest + ".part"
        with open(tmp, "wb") as f:
            f.write(data)
        os.replace(tmp, dest)
        return (name, True, f"{len(data)}B")
    except Exception as e:
        return (name, False, str(e)[:160])

def main():
    with open(MIDI_LIST) as f:
        names = json.load(f)
    os.makedirs(AUDIO_DIR, exist_ok=True)
    print(f"target: {len(names)} files, workers={WORKERS}")
    start = time.time()
    ok = 0
    skip = 0
    fail = []
    with ThreadPoolExecutor(max_workers=WORKERS) as ex:
        futs = [ex.submit(fetch, n) for n in names]
        for i, fut in enumerate(as_completed(futs), 1):
            name, success, info = fut.result()
            if success:
                ok += 1
                if info == "exists":
                    skip += 1
            else:
                fail.append((name, info))
            if i % 25 == 0 or i == len(names):
                elapsed = time.time() - start
                rate = i / max(elapsed, 0.1)
                eta = (len(names) - i) / max(rate, 0.01)
                print(f"  {i}/{len(names)} ok={ok} (skip={skip}) fail={len(fail)} rate={rate:.1f}/s eta={eta:.0f}s", flush=True)
    print(f"\ndone in {time.time()-start:.0f}s: {ok} ok, {len(fail)} failed")
    for n, e in fail[:10]:
        print(f"  fail {n}: {e}")

if __name__ == "__main__":
    main()
