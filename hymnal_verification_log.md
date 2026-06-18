# Hymnal media verification log

Tracks which sheet-music and audio files have been **directly verified** (file opened
and content confirmed), vs inferred-correct. Started 2026-06-18.

"Verified sheet" = image opened, printed hymn matches the entry, hymn is complete
(header + ending), title/first-line matches the data.
"Verified audio" = content cannot be confirmed (no playback here); audio entries get a
**validity** check only (file exists, non-zero, valid audio header) — never content.

---

## Already verified (by eye), prior to this sample — ~57 sheets

**THB (54):** 1,2,3,4,6,7,13,14,15,18,19,20,21,22,23,24,26,29,30,33,34,38,39,40,84,100,
154,179,180,200,217,218,251,271,272,273,389,423,424,425,427,431,450,536,537,538,549,
600,601,602,649,757,761,763
(front re-extraction, the 4 span-scramble regions, multi-tune sample, complex/false-positive checks)

**TH1961 (3):** 710, 711, 712 (re-cropped earlier in the project)

**Audio verified by ear:** 0 (cannot play audio in this environment)

---

## This sample — 32 sheets, 4 per hymnal across the range (about to verify)

| Hymnal | Sampled hymns |
|---|---|
| BoPW | 16D, 55B, 96C, 122B |
| Cantus Christi | 84, 256-257, 453, S31 |
| Hymns of Grace | 22, 103, 202, 281 |
| Sacred Harp | 53, 173, 337, 480 |
| Trinity 1961 | 58, 247, 433, 626 |
| Trinity 1990 | 60, 253, 446, 639 |
| Trinity Baptist | 82, 281, 476, 671 (chosen from *un*-verified THB sheets) |
| Trinity Psalter | 33, 127A, 293, 477 |

**Audio validity sample** (same hymns where they have audio) — header/size check, documented below.

### Results — sheets (2026-06-18): 32/32 correct

| Hymnal | Result |
|---|---|
| BoPW | 16D, 55B, 96C, 122B — all ✓ (number+title match, complete) |
| Cantus Christi | 84, 256-257, 453, S31 — all ✓ |
| Hymns of Grace | 281 ✓ (lyrics); 103, 202 ✓ (tune-only, tune correctly pairs); **22 tune-only, pairing not independently confirmable** |
| Sacred Harp | 53, 173, 337, 480 — all ✓ (printed page numbers match). Note: #337 sheet is correct but its **lyrics data is garbled OCR** (known SH limitation) |
| Trinity 1961 | 58, 247, 433, 626 — all ✓ |
| Trinity 1990 | 60, 253, 446, 639 — all ✓ |
| Trinity Baptist | 82, 281, 476, 671 — all ✓ (671's printed title is the refrain "Thy Word Have I Hid"; verse 1 = data title "Thy Word is a lamp to my feet") |
| Trinity Psalter | 33, 127A, 293, 477 — all ✓ |

Caveats: HoG sheets are **tune-only (music, no lyrics)** so only the tune name is checkable;
SH #337 flags the known garbled-lyrics-data issue (the sheet image is fine).

### Results — audio validity (2026-06-18): 32/32 valid files, 0 content-confirmed

All 32 sampled audio files exist, are non-zero, and have a valid audio header
(mp3 except CC #453 which is m4a), sizes 0.2–5.7 MB. **Content (is it the right
recording of the right hymn) was NOT confirmed — no playback available here.**

---

## Running tally of directly-verified sheets
- Pre-sample (THB + TH1961): ~57
- This sample (4 each × 8 hymnals): 32
- **Total directly verified by eye: ~89 sheets** of 4,574
- Audio content-verified: still **0** (32 validity-checked)
