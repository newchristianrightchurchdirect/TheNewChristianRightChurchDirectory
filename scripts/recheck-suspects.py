"""Re-OCR the lyric-mismatch suspects, recording page text volume so
OCR-failures (unreadable pages) are not mistaken for wrong lyrics."""
import json, os, re, unicodedata
from concurrent.futures import ProcessPoolExecutor, as_completed

BOOKS = {"th1961": "trinity_hymnal_1961.json", "th1990": "trinity_hymnal_1990.json",
         "baptist": "trinity_hymnal_baptist.json", "cc": "cantus_christi.json",
         "sh": "sacred_harp_1991.json", "tph": "trinity_psalter_hymnal.json",
         "bpw": "book_of_psalms_for_worship.json"}

_ocr = None


def squash(t):
    t = unicodedata.normalize("NFKD", t or "").encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z]", "", t)


def textlen(job):
    global _ocr
    if _ocr is None:
        from rapidocr_onnxruntime import RapidOCR
        _ocr = RapidOCR()
    b, n, img = job
    try:
        res, _ = _ocr(img)
        t = squash(" ".join(r[1] for r in (res or [])))
    except Exception:
        t = ""
    return b, n, len(t)


def main():
    rows = [json.loads(l) for l in open(".tmp-renders/ocr-verify.jsonl", encoding="utf-8")]
    seen = {}
    for r in rows:
        seen[(r["book"], r["number"])] = r["score"]
    suspects = {(b, n) for (b, n), s in seen.items() if s < 0.2}

    jobs = []
    for b, fn in BOOKS.items():
        d = json.load(open(f"public/hymnal-data/{fn}", encoding="utf-8"))
        for h in d["hymns"]:
            if (b, str(h["number"])) not in suspects:
                continue
            url = h.get("sheetMusicUrl") or ""
            img = "public" + (url[:-4] + ".1.jpg" if url.endswith(".pdf") else url)
            if os.path.exists(img):
                jobs.append((b, str(h["number"]), img))

    out = {}
    with ProcessPoolExecutor(max_workers=6) as ex:
        futs = [ex.submit(textlen, j) for j in jobs]
        for fu in as_completed(futs):
            b, n, L = fu.result()
            out[f"{b}|{n}"] = L
    json.dump(out, open(".tmp-renders/suspect-textlen.json", "w"))
    fails = sum(1 for v in out.values() if v < 250)
    print(f"checked {len(out)}: ocr-fail {fails}, real-candidates {len(out) - fails}")


if __name__ == "__main__":
    main()
