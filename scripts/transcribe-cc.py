"""Best-effort transcription of blanked Cantus Christi songs from sheet images.

Layout assumption (CC psalter engravings): stanza first-lines appear as a
block of rows numbered 1..V between staves; each later block of exactly V
rows holds the next line of every stanza in the same order. Rows are OCRed
with RapidOCR, grouped by Y, paired by index, de-hyphenated.

Entries whose blocks don't align get confidence "low" and only the numbered
first-line block. Writes drafts to .tmp-renders/cc-transcripts.json; apply
with --apply (only touches entries whose verses are currently empty).
"""

import json, os, re, sys, unicodedata

CRED_RE = re.compile(r"music:|text:|psalter|arr\.|harm\.|\d{4}|^\d[\s.]*\d", re.I)
MARK_RE = re.compile(r"^\s*(\d{1,2})[.,]\s*")


def clean_line(t):
    t = unicodedata.normalize("NFKC", t)
    t = re.sub(r"\s*-\s*", "", t)                    # de-hyphenate syllables
    t = re.sub(r"(?<=[a-z])(?=[A-Z])", " ", t)       # rejoin "isHis" -> "is His"
    # OCR digit/letter confusion at line start: 0 -> O, 1/11 -> I
    t = re.sub(r"^\s*0(?=\s|h\b)", "O", t)
    t = re.sub(r"^\s*11?(?=\s)", "I", t)
    t = re.sub(r"\b(\d{1,2})(?=[A-Z])", "", t)       # inline psalm verse nums
    t = re.sub(r"\s+", " ", t).strip()
    return t


def squash(t):
    t = unicodedata.normalize("NFKD", t or "").encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z]", "", t)


def rows_from_image(ocr, img):
    res, _ = ocr(img)
    rows = {}
    for box, txt, conf in (res or []):
        yc = sum(p[1] for p in box) / 4
        xl = min(p[0] for p in box)
        for ry in list(rows):
            if abs(ry - yc) < 12:
                rows[ry].append((xl, txt))
                break
        else:
            rows[yc] = [(xl, txt)]
    out = []
    for ry in sorted(rows):
        toks = sorted(rows[ry])
        out.append(" ".join(t for _, t in toks))
    return out


def transcribe(ocr, images):
    lines = []
    for img in images:
        lines += rows_from_image(ocr, img)
    # find the numbered first-line block
    marks = [(i, int(MARK_RE.match(l).group(1))) for i, l in enumerate(lines) if MARK_RE.match(l)]
    seq = []
    for i, v in marks:
        if not seq or (v == seq[-1][1] + 1 and i == seq[-1][0] + 1):
            seq.append((i, v))
        elif v == 1:
            seq = [(i, 1)]
    if not seq or seq[0][1] != 1:
        return None, "no-stanza-block"
    V = len(seq)
    start = seq[0][0]
    verses = [[clean_line(MARK_RE.sub("", lines[i]))] for i, _ in seq]

    # subsequent continuation blocks: consecutive non-credit rows, grouped V at a time
    rest = [l for l in lines[start + V:] if len(l) > 12 and not CRED_RE.search(l[:60]) or MARK_RE.match(l)]
    rest = [l for l in rest if not MARK_RE.match(l)]
    conf = "ok" if len(rest) % V == 0 and rest else ("low" if rest else "first-lines-only")
    for b in range(len(rest) // V):
        for k in range(V):
            verses[k].append(clean_line(rest[b * V + k]))
    return [{"number": str(k + 1), "isChorus": False, "text": "\n".join(v)} for k, v in enumerate(verses)], conf


def main():
    apply = "--apply" in sys.argv
    from rapidocr_onnxruntime import RapidOCR
    ocr = RapidOCR()
    f = "public/hymnal-data/cantus_christi.json"
    d = json.load(open(f, encoding="utf-8"))
    redo = set()
    if "--redo" in sys.argv:
        prev = json.load(open(".tmp-renders/cc-transcripts.json", encoding="utf-8"))
        redo = {n for n, v in prev.items() if v.get("verses")}
    drafts = {}
    for h in d["hymns"]:
        if not h.get("sheetMusicUrl"):
            continue
        if h.get("verses") and h["number"] not in redo:
            continue
        stem = "public" + h["sheetMusicUrl"][:-4]
        imgs = [f"{stem}.{i}.jpg" for i in (1, 2, 3, 4) if os.path.exists(f"{stem}.{i}.jpg")]
        if not imgs:
            drafts[h["number"]] = {"conf": "no-image", "verses": None}
            continue
        try:
            verses, conf = transcribe(ocr, imgs)
        except Exception as e:
            verses, conf = None, f"error:{e}"
        # the title is the authoritative first line in CC: anchor verse 1 to it
        if verses:
            title = re.sub(r"\s*\(.*?\)\s*$", "", h.get("title") or "").strip()
            lines = verses[0]["text"].split("\n")
            ts, ls = squash(title), squash(lines[0])
            import difflib
            if ts and difflib.SequenceMatcher(None, ts, ls[:len(ts) + 6]).ratio() >= 0.5:
                tail = ""
                if len(ls) > len(ts) + 8:
                    # keep OCR words beyond the title's span
                    words = lines[0].split()
                    acc = ""
                    for i, w in enumerate(words):
                        acc += squash(w)
                        if len(acc) >= len(ts):
                            tail = " " + " ".join(words[i + 1:]) if i + 1 < len(words) else ""
                            break
                lines[0] = title.rstrip(".,;") + ("," if not title.rstrip().endswith((",", ";", "!", "?", ":")) else "") + tail
                verses[0]["text"] = "\n".join(lines)
        drafts[h["number"]] = {"conf": conf, "verses": verses}
        print(f"{h['number']:9} {conf:16} {(verses[0]['text'][:60] if verses else '')!r}", flush=True)
        if apply and verses:
            h["verses"] = verses
    json.dump(drafts, open(".tmp-renders/cc-transcripts.json", "w", encoding="utf-8"), ensure_ascii=False)
    if apply:
        with open(f, "w", encoding="utf-8") as fh:
            json.dump(d, fh, ensure_ascii=False, separators=(",", ":"))
        print("applied")


if __name__ == "__main__":
    main()
