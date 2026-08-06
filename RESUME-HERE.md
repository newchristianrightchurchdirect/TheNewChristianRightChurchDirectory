# Pick up here — church research, as of 2026-08-05 (late)

Written at the end of a long session so the next one can start cold. **Read
`church_research_log.md` from the 2026-07-31 entries onward for the full story**; this file is just
the state and the next action.

## Where the directory stands

**4,288 churches.** Of those:

| culturalEngagement | n | meaning |
|---|---|---|
| `transformationalist` | **103** | **qualifies** — meets the standard |
| `single_issue` | 137 | examined; acts publicly on one question, does not qualify |
| `limited_mission` | 16 | examined; published mission is ecclesial, does not qualify |
| `quietist` | 28 | examined; treats political engagement as outside the church's calling |
| `unknown` | 4,004 | not researched closely enough to classify |

Plus ~41 rows held under `duplicate_of` flags.

**BOTH QUEUES ARE CLOSED.** Every one of the 100 qualifying rows carries individual research, and so
does every one of the **187 rows ever sourced to postmillennialworldview.com**, in every
classification. Neither had ever been true before 2026-08-05, when 184 rows were researched and 364
audited stance changes were written.

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

**Three queues are now closed:** the qualifying list (103 rows, all individually researched), the
postmillennial-directory cohort (186 rows, all researched), and **the theonomy church directory
(26 of 26, worked 2026-08-05)**.

Work the deep-dive queue. In order:

1. **The NORMAN STATEMENT'S TWELVE ORGANISATIONS.** The statement itself is now fully mined — but
   each org it names is its own roster: End Abortion Ohio, End Abortion Alabama, Abolish Abortion
   NC / Missouri / Oklahoma, End Abortion Nebraska, Abortion is Murder Kansas, Liberty Rising
   Institute, Rescue Those, **Forge Theological Seminary** (a seminary — an education node),
   Cruciform Ministries. Full table in the queue file. **End Abortion Ohio pairs directly with #2.**
2. **171 Ohio clergymen signed against Issue 1** (2023 abortion amendment). Surfaced beside #4186
   Sovereign Christ Church, Mansfield. **Get the signatory list** — it settles that row and is an
   Ohio cohort source on its own.
3. **"From Norman to the State GOP"** — Oklahoma Watch / KGOU investigation, 8 May 2026, on the
   abolitionist movement capturing Oklahoma's Republican Party. Investigative journalism names people
   and churches that no church website will.
4. **The Future of Christendom Conference** roster (hosted by #4193, now a qualifier), and
   **Whitefield Theological Seminary** — now **eight** rows deep.

**Two unresolved names, both traps:** the Norman Statement lists **Nathaniel Morrison — Grace
Reformed Baptist Church, NORMAN OK**, which cannot be confirmed to exist (searches return only
Deevers's ELGIN church, and the abolitionist-orgs list carries the same mislabel). And **Rick
Prettyman — Christ Community Church** from the Love Your Pre-born Neighbor roster: the only man
located pastors in Lake Charles, LOUISIANA. Do not record either until the right church is identified.

**Three unfinished rows still worth returning to first** — each a strong candidate left short by one
unread source: **#3304 Christ Reformed Presbyterian, Paris TN** (697 sermons unread), **#4218
Evangelical Reformed Church, Tacoma** (solideogloria.org unread), **#4162 Christ Church of Acadiana**
(the congregation's own classical academy).

**Also queued and overdue: a directory-wide `leadership` sweep.** See the cautions below.

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

- **A website that was never read is not a source, it is a guess with a URL on it.** **Eleven wrong
  websites** were found on 2026-08-05, several pointing at churches in *other states* — Keota OK →
  Grand Prairie TX, Shelby OH → Shelby NC, Jacksonville NC → Jacksonville FL (`jax` is the Florida
  abbreviation), Wytheville VA → Carnegie PA. Open every URL and confirm the city before trusting
  anything downstream of it. And **`website_removed` should be retested, not trusted** — a dead
  domain is often a changed one (#3259 Mentone).
- **A pastor field is a claim with a date on it, and the sweep is overdue.** 2026-08-05 alone turned
  up **three deceased pastors** (Talbot 2022, West 2023, Strawbridge 2022), pastors who had left in
  2018 and 2019 and were still credited, one who **retired in 2018**, one who **left the pastorate in
  June 2026**, and one who **was received into the Catholic Church in 2025** — all carried as current.
  **The postmillennial directory indexes the PASTOR, not the congregation, so its listings outlive the
  men they rest on.** Assume that failure mode on any pastor-derived source.
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
