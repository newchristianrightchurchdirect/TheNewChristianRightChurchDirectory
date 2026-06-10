"""Rebuild a hymn->page map by detecting hymn-number headers in the PDF.

The Baptist-edition map was built by OCR title matching, which systematically
assigned the second hymn of a shared page to the NEXT page (where its lyrics
spill over). This rebuilds the map from the headers themselves:

  1. Detect header anchor groups ("slots") on every page with
     crop-split-hymnal.find_anchors; a slot pinned by an exact number span
     carries that value.
  2. Keep the longest strictly-increasing chain of pinned values (LIS) —
     OCR misreads fall out of the chain.
  3. Chained hymns get their detected page. For hymns between two chain pins:
     if the slot count between the pins equals the hymn count, assign 1:1 in
     order; otherwise keep the old map value clamped to the pin bounds.
  4. Enforce monotonic page order.

Usage:
  python scripts/rebuild-hymnal-map.py <pdf> <map.json> [--write]

Without --write it prints the diff summary only.
"""

import bisect, importlib.util, json, sys
import fitz

spec = importlib.util.spec_from_file_location("css", "scripts/crop-split-hymnal.py")
css = importlib.util.module_from_spec(spec)
spec.loader.exec_module(css)


def main():
    pdf_path, map_path = sys.argv[1], sys.argv[2]
    write = "--write" in sys.argv

    old = {int(k): v for k, v in json.load(open(map_path, encoding="utf-8")).items()}
    doc = fitz.open(pdf_path)
    lo, hi = min(old.values()) - 1, max(old.values()) - 1
    allnums = set(range(1, max(old) + 1))

    slots = []  # (pidx, y, strength, value-or-None)
    for pidx in range(lo, hi + 1):
        page = doc[pidx]
        H = page.rect.height
        for y, s, labels in css.find_anchors(page, allnums):
            if y >= H - 110 or s < 2:
                continue
            nums = [int(l[4:]) for l in labels if l.startswith("num:")]
            slots.append((pidx, y, s, nums[0] if nums else None))

    # LIS over pinned values, slots already ordered by (page, y)
    pins = [(i, s[3]) for i, s in enumerate(slots) if s[3] is not None]
    tails, tidx, parent = [], [], {}
    for i, v in pins:
        j = bisect.bisect_left(tails, v)
        if j == len(tails):
            tails.append(v); tidx.append(i)
        else:
            tails[j] = v; tidx[j] = i
        parent[i] = tidx[j - 1] if j > 0 else None
    chain = []
    cur = tidx[-1] if tidx else None
    while cur is not None:
        chain.append(cur)
        cur = parent[cur]
    chain.reverse()
    pinned = {slots[i][3]: i for i in chain}  # hymn -> slot idx
    print(f"slots {len(slots)}, chain-pinned {len(pinned)}/{len(old)} hymns")

    new = {}
    hymns = sorted(old)
    top_thresh = 130
    for n in hymns:
        if n in pinned:
            new[n] = slots[pinned[n]][0] + 1

    # fill gaps between pins
    pin_list = [(n, pinned[n]) for n in sorted(pinned)]
    for a in range(len(pin_list) + 1):
        n_lo, s_lo = pin_list[a - 1] if a > 0 else (hymns[0] - 1, -1)
        n_hi, s_hi = pin_list[a] if a < len(pin_list) else (hymns[-1] + 1, len(slots))
        gap_hymns = [n for n in hymns if n_lo < n < n_hi]
        if not gap_hymns:
            continue
        gap_slots = list(range(s_lo + 1, s_hi))
        if len(gap_slots) == len(gap_hymns):
            for n, si in zip(gap_hymns, gap_slots):
                new[n] = slots[si][0] + 1
        else:
            # clamp old values to what the surrounding pins allow
            lb = slots[s_lo][0] + 1 if s_lo >= 0 else min(old.values())
            if s_hi < len(slots):
                ub = slots[s_hi][0] + (0 if slots[s_hi][1] < top_thresh else 1)
            else:
                ub = max(old.values())
            for n in gap_hymns:
                new[n] = min(max(old[n], lb), max(ub, lb))

    # monotonic guard
    prev = 0
    for n in hymns:
        if new[n] < prev:
            new[n] = prev
        prev = new[n]

    diffs = [(n, old[n], new[n]) for n in hymns if old[n] != new[n]]
    print(f"changed entries: {len(diffs)}")
    for n, o, w in diffs[:50]:
        print(f"  hymn {n}: {o} -> {w}")
    if len(diffs) > 50:
        print(f"  ... and {len(diffs) - 50} more")

    if write:
        with open(map_path, "w", encoding="utf-8") as f:
            json.dump({str(n): new[n] for n in hymns}, f, indent=0)
        print(f"wrote {map_path}")


if __name__ == "__main__":
    main()
