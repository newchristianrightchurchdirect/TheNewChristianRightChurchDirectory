# Pick up here — church research, as of 2026-08-05 (late)

Written at the end of a long session so the next one can start cold. **Read
`church_research_log.md` from the 2026-07-31 entries onward for the full story**; this file is just
the state and the next action.

## Where the directory stands

**4,281 churches.** Of those:

| culturalEngagement | n | meaning |
|---|---|---|
| `transformationalist` | **96** | **qualifies** — meets the standard |
| `single_issue` | 134 | examined; acts publicly on one question, does not qualify |
| `limited_mission` | 16 | examined; published mission is ecclesial, does not qualify |
| `quietist` | 28 | examined; treats political engagement as outside the church's calling |
| `unknown` | 4,007 | not researched closely enough to classify |

Plus ~41 rows held under `duplicate_of` flags.

**The qualifying queue is CLOSED — every one of the 93 now carries individual research.** That is
new as of this session and had never been true before.

## The standard — never shortcut it

Four sources, **all of them, every time**, and load it *before* searching:

1. the church's own site
2. the **church's** socials
3. the **pastor's** own output — socials, podcast, sermons, books, conference appearances
4. the **pastor's name searched against each of the six markers**

**Never conclude from the website alone.** The rule is *if the pastor pushes it, the church counts*.

The six ranking markers: **abolition · postmillennialism · theonomy · Christian nationalism ·
anti-Zionism · patriarchy.** Cultural engagement is the *qualifier*; the markers are the *ranking*.
**Transformationalist requires action across public questions — one marker is never enough** (rule
set 2026-07-31). One marker, acted on publicly, is `single_issue`.

## THE NEXT ACTION

**The demoted cohort — it is 161 rows, not 122. 36 DONE, 125 TO GO.**

```
culturalEngagement = 'unknown' AND sourceUrls LIKE '%postmillennialworldview%'
```
minus the researched ones (use the negation-guarded `done()` below). `prisma/_demoted.ts` prints
them already bucketed by how much there is to work with:

| bucket | n | notes |
|---|---|---|
| pastor + website | **0 left** | all cleared |
| website only | ~13 left | do these next — enough to apply the standard |
| pastor only / neither | ~112 | many will need the Wayback Machine or Facebook |

**They were demoted for lack of evidence, not researched and found wanting**, and the first read
produced a major promotion: **#3274 Chalcedon Presbyterian, Cumming GA** — the founding congregation
of the RPCUS, which **required its elders to hold both theonomy and postmillennialism**. Expect more.

**The single most useful thing learned about this cohort:** #31 Phoenix Reformed Baptist was listed
because **James White** is postmillennial — but his eldership there ended in **2018**. The source
directory **indexed the man, not the congregation, and the man had already left.** Assume that
failure mode on every remaining row: find out whether the listed pastor is still there *before*
crediting the church with his doctrine.

**Work the theonomy church directory alongside it** (new, filed in the deep-dive queue). Its listing
criterion is this project's qualifying definition verbatim, and one of its 26 churches — Reformed
Heritage, Los Gatos (#3258) — is sitting in this very cohort.

**Two more search targets found in the cohort itself:**

1. **`"All of Christ, for all of Life, for all of <city>"`** — this exact tagline appears on Trinity
   Presbyterian Waukesha (CREC) *and* on First Presbyterian Battle Ground WA. It is doing the same
   work "every square inch" does. Search it as a marker in its own right.
2. **"family-integrated"** — three of eighteen rows in one batch used it, plus a fourth. That is
   **NCFIC / Church and Family Life** vocabulary, already a lead with six independent appearances.
   The postmillennial directory and the NCFIC network overlap heavily; work them together.

**3 rows promoted so far** — Chalcedon Presbyterian (#3274), Community Presbyterian Louisville
(#979), Christ the King Norman (#1507). Roughly a 1-in-12 hit rate, so expect **~10 more qualifiers**
in the remaining 125. That is worth the work.

## Read this before writing any queue query

**The query that defines the queue was hiding rows for two sessions.** `prisma/_q.ts` treated a row
as researched if its note matched `individually verified` — and three rows say **"Israel stance *not*
individually verified"**. The sentence admitting the row was unresearched is what marked it done.

**Strip negated forms before testing:**

```ts
const done = (n: string | null) => {
  const cleaned = (n || '').replace(/\bnot\s+(individually verified|researched)/gi, '')
  return /FULL standard applied|individually verified|read individually|full review to standard/i.test(cleaned)
}
```

These notes are prose that states what was *not* done. A naive substring test reads those admissions
backwards. **Never trust a queue count you have not sanity-checked against a second query.**

## Standing cautions, all learned the hard way

- **A website that was never read is not a source, it is a guess with a URL on it.** Three of twenty
  rows this session pointed at churches in *other states* — Keota OK → Grand Prairie TX, Shelby OH →
  Shelby NC, Jacksonville NC → Jacksonville FL (`jax` is the Florida abbreviation). Open every URL
  and confirm the city before trusting anything downstream of it.
- **A pastor field is a claim with a date on it.** Four more stale-leadership findings this session,
  the freshest **six weeks old** (Geyer Springs, June 2026). A directory-wide `leadership` sweep is
  still queued and is now clearly overdue.
- **An unreachable site is a fact about the fetch, not the church** — retry `www`, http/https, the
  Wayback Machine (blocked from this session; try it), Facebook and sermon archives. But when DNS
  fails repeatedly on every hostname, *that* is a finding too (Christ Church Lakeland).
- **Denominational and nominal inference are not research.** CREC membership does not qualify a
  church. Check what a body actually binds: the **RCUS Synod formally disclaims Reconstructionism and
  theonomy**, which killed a postmill claim this session.
- **Record negative results explicitly** — what was checked, what remains unread.
- **Watch the order of your queue.** The handoff note into this session predicted confirmations
  because earlier batches had been sorted documented-first. Sorting thinnest-first reversed the
  pattern completely. A sample from the easy end of a list says nothing about the list.

## Open questions for Dustin

1. **The two education rows are the thinnest qualifiers left.** Reformation Covenant (Oregon City)
   and Holy Trinity (Concord NC) keep `transformationalist` **solely** on your 7-31 ruling that
   education is movement-building. Their sermon archives and podcast have now been read in full and
   contain *nothing* on any marker or public question. If that ruling is ever revisited, start here.
2. **Grace Fellowship Davenport** was moved to `single_issue` despite 54 clinic-side abortion sermons
   and a resident abolitionist evangelist, because it acts on one question only. That is the standard
   applied strictly to its hardest case — worth a look if you'd draw the line elsewhere.
3. **RESOLVED 2026-08-05 — the Grace Fellowship Davenport allegations are KEPT.** You asked for them
   dropped if unfounded; they are not. The principal accuser is **named** (Kevin Jandt, former
   nine-year member, excommunicated 2018), corroborated by other named former members, and a named
   ministry issued a **dated, signed withdrawal of support in 2016**. Only one of the four sources is
   anonymous, and my note had generalised from it — that error is corrected in the record. They
   remain **allegations, not adjudicated**: no lawsuit, charge or denominational proceeding exists,
   and the church is independent with no presbytery to rule. Still surfaced nowhere in the UI.

## Live leads, highest yield first

All detailed in `data/research-leads-DEEP-DIVE-QUEUE.md`:

1. **Conference speaker rosters** — the best source found. *Love Your Pre-born Neighbor* and
   *Abolition NOW!* have each already produced results.
2. **Church and Family Life / NCFIC** — six independent appearances. Structural, not coincidence.
3. **The Kuyperian Commentary contributor network** — Brito founded it, McIntosh writes for it; it is
   turning into a map of its own.
4. **The public library as a marker** — three instances (Orange City, Twin Falls, Chelmsford).
5. `zionistStance = 'no'` sits on **~3,967 rows** as an unexamined bulk default and is demonstrably
   wrong for premillennial bodies. Largest single block of unearned assertion in the directory. Note
   several rows now say so in their own text ("Reformed-leaning/covenantal default").
6. RCUS / URCNA signatory density · CREC Knox Presbytery · Citylight Family · NorthRidge multi-site ·
   Midwest Slavic churches · Nebraska Gospel Network · the Warrenton Declaration text · Friedensburg
   Biblical Institute lecture list.

## Housekeeping

- Push as **newchristianrightchurchdirect** (`gh auth switch -u newchristianrightchurchdirect`).
- **Never** run `prisma migrate` — raw `ALTER TABLE` via `$executeRawUnsafe` only.
- Every stance change goes through `updateStances()` in `lib/stance-audit.ts`, which requires an
  actor and a note. This session wrote 21 audited stance changes across 23 rows; all are reversible
  from the `StanceChange` trail.
- `npm run build` before assuming a component change is safe.
- Batch scripts live at `prisma/_apply-batch*.ts` (gitignored scratch); they take `--dry`.
- Web search cap is **5000** per session (`~/.claude/settings.json`).
