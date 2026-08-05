# Pick up here — church research, as of 2026-08-05

Written at the end of a long session so the next one can start cold. **Read
`church_research_log.md` from the 2026-07-31 entries onward for the full story**; this file is just
the state and the next action.

## Where the directory stands

**4,281 churches.** Of those:

| culturalEngagement | n | meaning |
|---|---|---|
| `transformationalist` | ~108 | **qualifies** — meets the standard |
| `single_issue` | 123 | examined; acts publicly on one question, does not qualify |
| `limited_mission` | ~16 | examined; published mission is ecclesial, does not qualify |
| `quietist` | 28 | examined; treats political engagement as outside the church's calling |
| `unknown` | ~4,005 | not researched closely enough to classify |

Plus ~41 rows held under `duplicate_of` flags.

## The standard — never shortcut it

Four sources, **all of them, every time**, and load it *before* searching:

1. the church's own site
2. the **church's** socials
3. the **pastor's** own output — socials, podcast, sermons, books, conference appearances
4. the **pastor's name searched against each of the six markers**

**Never conclude from the website alone.** The rule is *if the pastor pushes it, the church counts*.
Site-only reading produced **two false negatives in fourteen** on 2026-08-05 (Grace Life Dallas,
Woodlawn Baptist) — a wrong dismissal leaves no trace in the record, so it is the error to fear.

The six ranking markers: **abolition · postmillennialism · theonomy · Christian nationalism ·
anti-Zionism · patriarchy.** Cultural engagement is the *qualifier*; the markers are the *ranking*.

## THE NEXT ACTION

**1. Finish the qualifying list — 20 rows left of 92.**

Find them:
```
culturalEngagement = 'transformationalist'
AND researchNote NOT LIKE '%FULL standard applied%'
```
72 are done. The pattern so far, without exception: **a named pastor with public output confirms —
usually on something stronger than the record showed. No pastor and no output means nothing to
confirm.** Not one row has been demoted on contrary evidence; the failures are all absence.

**2. Then the 122 demoted rows.** These sit at `unknown` after being stripped out of the qualifying
list as unevidenced bulk imports — mostly the two postmillennial-directory cohorts. **They were
demoted for lack of evidence, not researched and found wanting.** Christ Church Denver was in exactly
that state and turned out to be one of the plainest qualifiers on file once someone read it. Expect
more.

## Standing cautions, all learned the hard way

- **An unreachable site is a fact about the fetch, not the church.** Christ Church Denver was written
  off as unreadable; the URL needed a `www`. Retry with network-idle waits, http/https variants, the
  Wayback Machine, Facebook and sermon archives before recording anything. Use
  `scratchpad/fetch2.py`, which does all of that.
- **A pastor field is a claim with a date on it.** Three stale-leadership findings on 2026-08-05 —
  one pastor departed in 2021, one elder **deceased in 2025**, one pastor who had moved to another
  state — plus seven of eight wrong in the postmillennial directory. A directory-wide `leadership`
  sweep is queued.
- **Denominational and nominal inference are not research.** CREC membership does not qualify a
  church — nine CREC congregations were moved to `limited_mission` on that basis. *Christendom*
  Reformed Baptist makes no claim on Christendom.
- **Check what a denomination actually binds before defaulting anything.** The EFCA struck
  "premillennial" in 2019; the Global Methodist Church, EPC, Evangelical Covenant and Converge all
  ordain women or leave it local; one church is co-pastored by a husband and wife.
- **Record negative results explicitly** — what was checked, what remains unread — so a row is not
  re-researched from scratch and a `verify_stance` flag reads as deliberate.

## Live leads, highest yield first

All detailed in `data/research-leads-DEEP-DIVE-QUEUE.md`:

1. **Conference speaker rosters** — the best source found. *Love Your Pre-born Neighbor* and
   *Abolition NOW!* have each already produced results. A man who travels to speak has committed
   publicly.
2. **Church and Family Life / NCFIC** — six independent appearances. Structural, not coincidence.
3. **The public library as a marker** — three instances (Orange City, Twin Falls, Chelmsford). The
   Chelmsford case differs: an attempt to *occupy* the institution, not protest its content.
4. `zionistStance = 'no'` sits on **~3,967 rows** as an unexamined bulk default and is demonstrably
   wrong for premillennial bodies. Largest single block of unearned assertion in the directory.
5. RCUS / URCNA signatory density · CREC Knox Presbytery · Citylight Family · NorthRidge multi-site ·
   Midwest Slavic churches · Nebraska Gospel Network · the Warrenton Declaration text · Friedensburg
   Biblical Institute lecture list.

## Housekeeping

- Push as **newchristianrightchurchdirect** (`gh auth switch -u newchristianrightchurchdirect`).
- **Never** run `prisma migrate` — raw `ALTER TABLE` via `$executeRawUnsafe` only.
- Every stance change goes through `updateStances()` in `lib/stance-audit.ts`, which requires an
  actor and a note.
- `npm run build` before assuming a component change is safe.
- Web search cap is now **5000** per session (`~/.claude/settings.json`); today's session hit the old
  default of 200 partway through the qualifying pass.
