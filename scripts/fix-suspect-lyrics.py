"""Repair hymns whose lyrics don't appear on their sheet music.

For each OCR-sweep suspect (score < 0.2 in .tmp-renders/ocr-verify.jsonl):
  1. OCR its first sheet page (cached in .tmp-renders/suspect-pagetext.json).
  2. If the page yields < 250 letters, mark unverifiable and leave it alone.
  3. Score the first verse of EVERY hymn in all books against the page text;
     if the best candidate scores >= 0.4 it is the text actually printed
     there — adopt its verses (keeping the entry's own title/number).
  4. If the best candidate is the same book within +/-3 numbers, that is a
     page-map error, not a lyric error — log for manual review, do not swap.
  5. No candidate -> blank the verses so the entry opens on sheet music.

Usage: python scripts/fix-suspect-lyrics.py [--apply]
"""

import json, os, re, sys, unicodedata
from concurrent.futures import ProcessPoolExecutor, as_completed

BOOKS = {"th1961": "trinity_hymnal_1961.json", "th1990": "trinity_hymnal_1990.json",
         "baptist": "trinity_hymnal_baptist.json", "cc": "cantus_christi.json",
         "sh": "sacred_harp_1991.json", "tph": "trinity_psalter_hymnal.json",
         "bpw": "book_of_psalms_for_worship.json"}
CACHE = ".tmp-renders/suspect-pagetext.json"
_ocr = None


def squash(t):
    t = unicodedata.normalize("NFKD", t or "").encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z]", "", t)


def gram_score(lyric_squashed, page, n=5):
    grams = {lyric_squashed[i:i + n] for i in range(0, max(1, len(lyric_squashed) - n), 2)}
    if not grams:
        return 0.0
    return sum(1 for g in grams if g in page) / len(grams)


def ocr_page(job):
    global _ocr
    if _ocr is None:
        from rapidocr_onnxruntime import RapidOCR
        _ocr = RapidOCR()
    key, img = job
    try:
        res, _ = _ocr(img)
        return key, squash(" ".join(r[1] for r in (res or [])))
    except Exception:
        return key, ""


def numval(n):
    m = re.match(r"(\d+)", str(n))
    return int(m.group(1)) if m else None


def main():
    apply = "--apply" in sys.argv
    rows = [json.loads(l) for l in open(".tmp-renders/ocr-verify.jsonl", encoding="utf-8")]
    seen = {}
    for r in rows:
        seen[(r["book"], r["number"])] = r["score"]
    suspects = {(b, n) for (b, n), s in seen.items() if s < 0.2}

    data = {b: json.load(open(f"public/hymnal-data/{f}", encoding="utf-8")) for b, f in BOOKS.items()}

    # candidate pool: first 300 chars of verse 1 of every hymn
    pool = []
    for b, d in data.items():
        for h in d["hymns"]:
            vs = h.get("verses") or []
            if not vs:
                continue
            s = squash((vs[0].get("text") or "")[:300])
            if len(s) >= 30:
                pool.append((b, str(h["number"]), s, h))

    cache = json.load(open(CACHE, encoding="utf-8")) if os.path.exists(CACHE) else {}
    jobs = []
    for b, d in data.items():
        for h in d["hymns"]:
            key = f"{b}|{h['number']}"
            if (b, str(h["number"])) not in suspects or key in cache:
                continue
            url = h.get("sheetMusicUrl") or ""
            img = "public" + (url[:-4] + ".1.jpg" if url.endswith(".pdf") else url)
            if os.path.exists(img):
                jobs.append((key, img))
    if jobs:
        with ProcessPoolExecutor(max_workers=6) as ex:
            futs = [ex.submit(ocr_page, j) for j in jobs]
            for fu in as_completed(futs):
                k, t = fu.result()
                cache[k] = t
        json.dump(cache, open(CACHE, "w", encoding="utf-8"))

    swaps = blanks = unver = mapflags = 0
    for b, d in data.items():
        changed = False
        for h in d["hymns"]:
            key = f"{b}|{h['number']}"
            if (b, str(h["number"])) not in suspects:
                continue
            page = cache.get(key, "")
            if len(page) < 250:
                unver += 1
                continue
            best = (0.0, None)
            for cb, cn, cs, ch in pool:
                sc = gram_score(cs, page)
                if sc > best[0]:
                    best = (sc, (cb, cn, ch))
            sc, hit = best
            if hit and sc >= 0.4:
                cb, cn, ch = hit
                same = cb == b and numval(cn) is not None and numval(h["number"]) is not None \
                       and cn != str(h["number"]) and abs(numval(cn) - numval(h["number"])) <= 3
                if same:
                    mapflags += 1
                    print(f"MAP? {b} #{h['number']}: page shows {cb}:{cn} ({sc:.2f}) — review, not swapped")
                    continue
                if cb == b and cn == str(h["number"]):
                    continue  # somehow fine
                print(f"SWAP {b} #{h['number']} '{(h.get('title') or '')[:30]}' <- {cb}:{cn} ({sc:.2f})")
                if apply:
                    h["verses"] = ch["verses"]
                    changed = True
                swaps += 1
            else:
                print(f"BLANK {b} #{h['number']} '{(h.get('title') or '')[:35]}' (best {sc:.2f})")
                if apply:
                    h["verses"] = []
                    changed = True
                blanks += 1
        if apply and changed:
            with open(f"public/hymnal-data/{BOOKS[b]}", "w", encoding="utf-8") as fh:
                json.dump(d, fh, ensure_ascii=False, separators=(",", ":"))
    print(f"\nswaps {swaps}, blanks {blanks}, unverifiable {unver}, map-flags {mapflags}"
          f" ({'APPLIED' if apply else 'dry-run'})")


if __name__ == "__main__":
    main()
