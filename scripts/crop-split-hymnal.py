"""Crop-aware re-split of hymnal PDFs for hymns that share pages.

Problem: the simple page-range splitter gives wrong results when a hymn starts
mid-page: the hymn above bleeds into its PDF, its own continuation on the next
page is dropped, and the next hymn inherits its tail.

This script finds each hymn's exact start Y on its start page (1-based map) and
rewrites the per-hymn PDFs with cropboxes so each file contains exactly its own
music. Only hymns whose output would differ from the plain splitter are written.

Anchor signals, in order of strength:
  1. A standalone span equal to the hymn number at a page margin (the big
     printed number).
  2. A tune/meter line at the right margin (e.g. "8.5.8.5.8.4.8." or "L. M.")
     and/or a "PSALM n" heading at the left margin; the number line sits ~20pt
     above these.
  3. A large-font short span at a margin (mis-OCRed number, e.g. '39' -> 'a2').

Scanned pages carry a GlyphLessFont OCR overlay, so digits are unreliable;
signals are grouped by Y proximity and groups are assigned in order to the
hymns the map says start on that page.

Usage:
  python scripts/crop-split-hymnal.py <pdf> <map.json> <out_dir> [--report] [--max-extra=2]
"""

import json, os, re, sys
import fitz

METER_RE = re.compile(r'^\d{1,2}([.,:]\d{1,2})+[.,]?$')    # 8.5.8.5.8. / 8.6. (OCR may comma)
LETTER_METER_RE = re.compile(r'^[A-Z]\.?$|^([A-Z]\.){2,3}$')  # L. M. / C.M.D.
YEAR_RE = re.compile(r'^1[5-9]\d\d([-–]\d{2,4})?[.,;]?$')  # 1777 / 1836-1896
PAD = 10          # points above an anchor to place the crop boundary
HEADER_GAP = 20   # meter/psalm line sits this far below the number line
GROUP_TOL = 60    # anchors within this Y range belong to one hymn header
MIN_SEP = 110     # two hymn headers on one page are at least this far apart


def page_spans(page):
    out = []
    for block in page.get_text("dict")["blocks"]:
        if block["type"] != 0:
            continue
        for line in block["lines"]:
            for span in line["spans"]:
                txt = span["text"].strip()
                if txt:
                    out.append((span["bbox"], txt, span["size"]))
    return out


def find_anchors(page, expected):
    """Return sorted candidate header Y positions for the hymns in `expected`."""
    W = page.rect.width
    spans = page_spans(page)
    expected_strs = {str(n) for n in expected}

    raw = []  # (y, strength, label)
    # group spans into lines by rounded y for meter-line detection
    lines = {}
    for (x0, y0, x1, y1), txt, size in spans:
        lines.setdefault(round(y0 / 4), []).append((x0, x1, y0, txt, size))

        at_left = x0 < 0.24 * W
        at_right = x1 > 0.74 * W
        if txt in expected_strs and size >= 7 and (at_left or at_right):
            raw.append((y0, 3, f"num:{txt}"))
        elif txt.upper().rstrip('S') == 'PSALM' and at_left and size >= 6:
            raw.append((y0 - HEADER_GAP, 2, "psalm"))
        elif YEAR_RE.match(txt) and size <= 8:
            # author/composer credit line; appears only in hymn headers
            raw.append((y0 - 24, 2, f"year:{txt}"))
        elif size >= 9.5 and len(txt) <= 4 and (at_left or at_right):
            raw.append((y0, 1, f"big:{txt}"))

    for _, toks in lines.items():
        right = [t for t in toks if t[0] >= 0.55 * W]
        if not right:
            continue
        meters = [t for t in right if METER_RE.match(t[3])]
        letters = [t for t in right if LETTER_METER_RE.match(t[3])]
        if meters or len(letters) >= 2:
            y = min(t[2] for t in (meters + letters))
            raw.append((y - HEADER_GAP, 2, "meter"))

    raw.sort()
    # cluster by Y proximity; a group's y = strongest anchor's y (ties: topmost)
    groups = []
    for y, strength, label in raw:
        if groups and y - groups[-1][-1][0] <= GROUP_TOL:
            groups[-1].append((y, strength, label))
        else:
            groups.append([(y, strength, label)])
    out = []
    for g in groups:
        best = max(s for _, s, _ in g)
        y_strong = min(y for y, s, _ in g if s == best)
        y_min = min(y for y, s, _ in g)
        # a big-font span just above the meter line is the (mis-OCRed) number
        y = y_min if y_strong - y_min <= 22 else y_strong
        out.append((y, best, [lbl for _, _, lbl in g]))
    return out


def detect_starts(doc, mapping, top_frac=0.12):
    """For each hymn return (page_idx, y_start). y_start 0 == top of page."""
    nums = sorted(mapping)
    by_page = {}
    for n in nums:
        by_page.setdefault(mapping[n] - 1, []).append(n)

    starts = {}
    unresolved = []
    for pidx, hymns in sorted(by_page.items()):
        page = doc[pidx]
        H = page.rect.height
        # anchors above this are top-of-page starts: a genuine mid-page hymn
        # needs >=130pt of the previous hymn above it
        top_y = max(top_frac * H, 130.0)
        # a hymn never starts in the bottom sliver of a page; such anchors are
        # footer credit lines or OCR noise
        groups = [g for g in find_anchors(page, hymns) if g[0] < H - 110]

        if len(hymns) == 1:
            n = hymns[0]
            # prefer an exact-number group anywhere; else strongest group that
            # isn't running-head noise
            strong = [g for g in groups if g[1] >= 2]
            num_groups = [g for g in groups if any(l == f"num:{n}" for l in g[2])]
            pick = num_groups[0] if num_groups else (strong[0] if strong else None)
            if pick is None:
                starts[n] = (pidx, 0.0)
                unresolved.append((n, pidx, "no-anchor->top"))
            else:
                y = pick[0]
                starts[n] = (pidx, 0.0 if y < top_y else max(y - PAD, 0.0))
        else:
            # weak (strength-1) groups are OCR noise; never assign them directly
            strong = [g for g in groups if g[1] >= 2]
            cands = strong
            if len(cands) == len(hymns):
                for n, g in zip(hymns, cands):
                    y = g[0]
                    starts[n] = (pidx, 0.0 if y < top_y else max(y - PAD, 0.0))
            elif len(cands) > len(hymns):
                # keep strongest groups, but never two within MIN_SEP of
                # each other (those are fragments of one header)
                chosen = []
                for g in sorted(cands, key=lambda g: -g[1]):
                    if all(abs(g[0] - c[0]) >= MIN_SEP for c in chosen):
                        chosen.append(g)
                    if len(chosen) == len(hymns):
                        break
                chosen.sort(key=lambda g: g[0])
                if len(chosen) == len(hymns):
                    for n, g in zip(hymns, chosen):
                        y = g[0]
                        starts[n] = (pidx, 0.0 if y < top_y else max(y - PAD, 0.0))
                else:
                    for i, n in enumerate(hymns):
                        starts[n] = (pidx, 0.0)
                unresolved.append((hymns, pidx, f"extra-anchors:{len(cands)}"))
            else:
                # not enough anchors: first hymn gets the top, rest unresolved
                for i, n in enumerate(hymns):
                    starts[n] = (pidx, 0.0)
                    if i > 0:
                        unresolved.append((n, pidx, f"missing-anchor ({len(cands)}/{len(hymns)})"))
    return starts, unresolved


def main():
    pdf_path, map_path, out_dir = sys.argv[1], sys.argv[2], sys.argv[3]
    report_only = "--report" in sys.argv
    force_all = "--all" in sys.argv
    max_extra = 1
    for a in sys.argv[4:]:
        if a.startswith("--max-extra="):
            max_extra = int(a.split("=", 1)[1])

    mapping = {int(k): v for k, v in json.load(open(map_path, encoding="utf-8")).items()}
    doc = fitz.open(pdf_path)
    nums = sorted(mapping)

    starts, unresolved = detect_starts(doc, mapping)

    mid = sum(1 for n in nums if starts[n][1] > 0)
    print(f"{len(nums)} hymns; mid-page starts: {mid}; unresolved: {len(unresolved)}")
    for u in unresolved[:40]:
        print(f"  unresolved: {u}")
    if report_only:
        return

    os.makedirs(out_dir, exist_ok=True)
    written = 0
    for i, n in enumerate(nums):
        pidx, y0 = starts[n]
        page_h = doc[pidx].rect.height

        if i + 1 < len(nums):
            np_idx, ny = starts[nums[i + 1]]
        else:
            np_idx, ny = min(pidx + 1, len(doc) - 1) + 1, 0.0

        # pages this hymn occupies
        if ny > 0:
            last = np_idx          # shares its last page with the next hymn
        else:
            last = np_idx - 1      # next hymn owns its whole page
        last = max(min(last, pidx + max_extra), pidx)
        if last > len(doc) - 1:
            last = len(doc) - 1

        # old splitter's page set, to skip unaffected hymns
        old_first = pidx
        old_last = max(min((np_idx - 1) if np_idx > pidx else pidx, pidx + 1), pidx)
        pages_changed = (pidx, last) != (old_first, old_last)
        crop_top = y0 > 0
        crop_bottom = ny > 0 and last == np_idx
        if not (pages_changed or crop_top or crop_bottom or force_all):
            continue

        out = fitz.open()
        out.insert_pdf(doc, from_page=pidx, to_page=last)
        MIN_WIN = 110  # any real hymn block is taller than this
        if last == pidx:
            # single page: apply top and/or bottom in one cropbox
            pg = out[0]
            r = pg.rect
            top = r.y0 + y0 if crop_top else r.y0
            bot = r.y0 + ny if crop_bottom else r.y1
            if bot - top >= MIN_WIN:
                pg.set_cropbox(fitz.Rect(r.x0, top, r.x1, bot))
            elif crop_top or crop_bottom:
                print(f"  WARN sliver {n:03d}: window {bot - top:.0f}pt on page {pidx}, left uncropped")
        else:
            if crop_top:
                pg = out[0]
                r = pg.rect
                if r.y1 - (r.y0 + y0) >= MIN_WIN:
                    pg.set_cropbox(fitz.Rect(r.x0, r.y0 + y0, r.x1, r.y1))
                else:
                    print(f"  WARN sliver {n:03d}: top window {r.y1 - r.y0 - y0:.0f}pt, left uncropped")
            if crop_bottom:
                pg = out[-1]
                r = pg.rect
                if ny >= MIN_WIN:
                    pg.set_cropbox(fitz.Rect(r.x0, r.y0, r.x1, r.y0 + ny))
                else:
                    print(f"  WARN sliver {n:03d}: bottom window {ny:.0f}pt, left uncropped")
        out.save(os.path.join(out_dir, f"{n:03d}.pdf"), garbage=3, deflate=True)
        out.close()
        written += 1
        if written % 50 == 0:
            print(f"  wrote {written}", flush=True)

    print(f"Done. Rewrote {written} per-hymn PDFs in {out_dir}")


if __name__ == "__main__":
    main()
