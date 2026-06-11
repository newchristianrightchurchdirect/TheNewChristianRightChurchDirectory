"""OCR-verify that each hymn's lyrics appear on its sheet music image.

For every hymn with verses and a local sheet image, OCR page 1 (and page 2
when inconclusive) with RapidOCR, squash everything to bare letters, and
score what fraction of the first verse's 5-grams appear in the page text.
Calibration: correct pages score 0.5-0.85, wrong pages under 0.1.

Appends results to .tmp-renders/ocr-verify.jsonl (resumable; skips hymns
already present). Run repeatedly until it reports nothing left.

Usage: python scripts/ocr-verify-lyrics.py [book ...]
"""

import json, os, re, sys, unicodedata
from concurrent.futures import ProcessPoolExecutor, as_completed

REPORT = ".tmp-renders/ocr-verify.jsonl"
WORKERS = 6
BOOKS = {
    "th1961":  ("trinity_hymnal_1961.json", None),
    "th1990":  ("trinity_hymnal_1990.json", None),
    "baptist": ("trinity_hymnal_baptist.json", None),
    "cc":      ("cantus_christi.json", None),
    "sh":      ("sacred_harp_1991.json", None),
    "tph":     ("trinity_psalter_hymnal.json", None),
    "bpw":     ("book_of_psalms_for_worship.json", None),
}

_ocr = None


def squash(t):
    t = unicodedata.normalize("NFKD", t or "").encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z]", "", t)


def gram_score(lyric, page, n=5):
    s = squash(lyric)
    grams = {s[i:i + n] for i in range(0, max(1, len(s) - n), 2)}
    if not grams:
        return 0.0
    return sum(1 for g in grams if g in page) / len(grams)


def sheet_images(url):
    if not url or not url.startswith("/hymnal-media/"):
        return []
    p = "public" + url
    if url.endswith(".pdf"):
        stem = p[:-4]
        return [f"{stem}.{i}.jpg" for i in (1, 2) if os.path.exists(f"{stem}.{i}.jpg")]
    if re.search(r"\.(png|jpe?g)$", url, re.I) and os.path.exists(p):
        return [p]
    return []


def check(job):
    global _ocr
    if _ocr is None:
        from rapidocr_onnxruntime import RapidOCR
        _ocr = RapidOCR()
    book, number, lyric, images = job
    best = 0.0
    for img in images:
        try:
            res, _ = _ocr(img)
        except Exception:
            continue
        page = squash(" ".join(r[1] for r in (res or [])))
        best = max(best, gram_score(lyric, page))
        if best >= 0.35:
            break
    return {"book": book, "number": number, "score": round(best, 3)}


def main():
    wanted = sys.argv[1:] or list(BOOKS)
    done = set()
    if os.path.exists(REPORT):
        for line in open(REPORT, encoding="utf-8"):
            try:
                r = json.loads(line)
                done.add((r["book"], r["number"]))
            except Exception:
                pass

    jobs = []
    for b in wanted:
        f, _ = BOOKS[b]
        d = json.load(open(f"public/hymnal-data/{f}", encoding="utf-8"))
        for h in d["hymns"]:
            vs = h.get("verses") or []
            if not vs or (b, str(h["number"])) in done:
                continue
            imgs = sheet_images(h.get("sheetMusicUrl"))
            if not imgs:
                continue
            lyric = (vs[0].get("text") or "")[:400]
            if len(squash(lyric)) < 30:
                continue
            jobs.append((b, str(h["number"]), lyric, imgs))

    print(f"{len(jobs)} hymns to verify (resume: {len(done)} done)", flush=True)
    if not jobs:
        return
    out = open(REPORT, "a", encoding="utf-8")
    n = 0
    with ProcessPoolExecutor(max_workers=WORKERS) as ex:
        futs = [ex.submit(check, j) for j in jobs]
        for fu in as_completed(futs):
            r = fu.result()
            out.write(json.dumps(r) + "\n")
            out.flush()
            n += 1
            if n % 100 == 0:
                print(f"  {n}/{len(jobs)}", flush=True)
    print(f"wrote {n} results", flush=True)


if __name__ == "__main__":
    main()
