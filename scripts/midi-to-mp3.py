"""Render .mid hymn audio to .mp3 with FluidSynth + LAME.

Browsers cannot play MIDI in <audio>, so every audioUrl pointing at a .mid
was silently dead (all 748 TH1961 hymns, ~44 Cantus Christi entries).
Converts each <dir>/<stem>.mid to <stem>.mp3 (96 kbps) unless the mp3
already exists and is newer.

Usage: python scripts/midi-to-mp3.py <dir> [dir ...]
"""

import os, subprocess, sys, wave
from concurrent.futures import ProcessPoolExecutor, as_completed
import lameenc

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FS = os.path.join(ROOT, ".tools", "fluidsynth", "fluidsynth-v2.5.4-win10-x64-cpp11", "bin", "fluidsynth.exe")
SF = os.path.join(ROOT, ".tools", "GeneralUser.sf2")
WORKERS = 8


def convert(mid):
    mp3 = mid[:-4] + ".mp3"
    tmp = os.path.join(ROOT, ".tmp-renders", f"m2m_{os.getpid()}.wav")
    r = subprocess.run([FS, "-ni", "-F", tmp, "-r", "44100", SF, mid],
                       capture_output=True, text=True)
    if r.returncode != 0:
        return mid, r.stderr[:200]
    w = wave.open(tmp)
    frames = w.readframes(w.getnframes())
    ch = w.getnchannels()
    w.close()
    enc = lameenc.Encoder()
    enc.set_bit_rate(96)
    enc.set_in_sample_rate(44100)
    enc.set_channels(ch)
    enc.set_quality(2)
    data = enc.encode(frames) + enc.flush()
    with open(mp3, "wb") as f:
        f.write(data)
    return mid, None


def main():
    todo = []
    for d in sys.argv[1:]:
        for f in sorted(os.listdir(d)):
            if not f.lower().endswith(".mid"):
                continue
            mid = os.path.join(d, f)
            mp3 = mid[:-4] + ".mp3"
            if not (os.path.exists(mp3) and os.path.getmtime(mp3) >= os.path.getmtime(mid)):
                todo.append(mid)
    print(f"{len(todo)} MIDIs to convert", flush=True)
    done = fail = 0
    with ProcessPoolExecutor(max_workers=WORKERS) as ex:
        futs = [ex.submit(convert, m) for m in todo]
        for fu in as_completed(futs):
            mid, err = fu.result()
            if err:
                fail += 1
                print(f"  FAIL {os.path.basename(mid)}: {err}", flush=True)
            else:
                done += 1
            if (done + fail) % 50 == 0:
                print(f"  {done + fail}/{len(todo)}", flush=True)
    print(f"converted {done}, failed {fail}", flush=True)


if __name__ == "__main__":
    main()
