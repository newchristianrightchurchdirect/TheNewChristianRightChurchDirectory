"""Pre-render per-hymn sheet PDFs to JPEG page images.

The Trinity/Sacred Harp/Cantus Christi sheets are JPEG2000 scans; pdf.js has
to decode JPX in software, which hangs or OOMs mobile browsers on any page.
Rendering once here lets the app serve plain <img> pages.

For every <name>.pdf in the sheet dirs, writes <name>.1.jpg, <name>.2.jpg ...
(one per page, max width TARGET_W). Skips PDFs whose .1.jpg is already newer
than the PDF.

Usage: python scripts/render-sheet-images.py [dir ...]
"""

import io, os, sys
import fitz
from PIL import Image

TARGET_W = 1300
QUALITY = 72
DIRS = sys.argv[1:] or [
    "public/hymnal-media/th-sheet",
    "public/hymnal-media/th2-sheet",
    "public/hymnal-media/baptist-sheet",
    "public/hymnal-media/cc-sheet",
    "public/hymnal-media/sh-sheet",
]


def render(pdf_path):
    stem = pdf_path[:-4]
    first = f"{stem}.1.jpg"
    if os.path.exists(first) and os.path.getmtime(first) >= os.path.getmtime(pdf_path):
        return 0
    doc = fitz.open(pdf_path)
    n = 0
    for i, page in enumerate(doc):
        scale = min(TARGET_W / page.rect.width, 4.0)
        pix = page.get_pixmap(matrix=fitz.Matrix(scale, scale), colorspace=fitz.csRGB)
        img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        img.save(f"{stem}.{i + 1}.jpg", "JPEG", quality=QUALITY, optimize=True)
        n += 1
    doc.close()
    # remove stale higher-numbered pages from a previous render
    i = n + 1
    while os.path.exists(f"{stem}.{i}.jpg"):
        os.remove(f"{stem}.{i}.jpg")
        i += 1
    return n


def main():
    total_pages = total_pdfs = 0
    for d in DIRS:
        pages = pdfs = 0
        for f in sorted(os.listdir(d)):
            if not f.endswith(".pdf"):
                continue
            try:
                k = render(os.path.join(d, f))
            except Exception as e:
                print(f"  FAIL {d}/{f}: {e}")
                continue
            if k:
                pdfs += 1
                pages += k
        size = sum(os.path.getsize(os.path.join(d, f)) for f in os.listdir(d) if f.endswith(".jpg"))
        print(f"{d}: rendered {pdfs} PDFs / {pages} pages; jpg total {size / 1e6:.0f} MB", flush=True)
        total_pages += pages
        total_pdfs += pdfs
    print(f"done: {total_pdfs} PDFs, {total_pages} pages")


if __name__ == "__main__":
    main()
