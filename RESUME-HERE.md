# Pick up here — church research, as of 2026-08-06 (late)

Written at the end of a long session so the next one can start cold. **Read
`church_research_log.md` from the 2026-07-31 entries onward for the full story**; this file is just
the state and the next action.

## Where the directory stands

**4,854 churches.** Of those:

| culturalEngagement | n | meaning |
|---|---|---|
| `transformationalist` | **106** | **qualifies** — meets the standard |
| `single_issue` | 459 | examined; acts publicly on one question, does not qualify |
| `limited_mission` | 16 | examined; published mission is ecclesial, does not qualify |
| `quietist` | 28 | examined; treats political engagement as outside the church's calling |
| `unknown` | 4,245 | not researched closely enough to classify |

Plus ~44 rows held under `duplicate_of` flags. The jump in `unknown` is deliberate: 2026-08-06 added
**~260 candidate rows** from denominational and network rosters, all `not_researched` with no stance.

## What 2026-08-06 established (read this before searching for new churches)

**Rosters beat searches.** Every promotion that day came from taking an organisation's own membership
list and laying it against the directory — not from searching for churches.

**Two qualifiers were already here, sitting unresearched with EMPTY PASTOR FIELDS:**

- **#4021 Reformation Church of Elizabeth CO** — **Kevin Swanson**: founder of Generations, host of
  Generations Radio, 1994 Taxpayers/Constitution Party candidate for **Governor of Colorado**.
- **#1768 Bridwell Heights, Kingsport TN** — **Patrick Hines**, whose podcast episode is literally
  titled *"Why I am Postmillennial"*. Was recorded **PCA**; it is CRPC.

> **A row with an empty leadership field is not a researched negative — it is an unopened door.**
> Neither church's own website would have surfaced either man. The pastor's name was the key, and it
> came from a denominational roster.

**The RPCUS no longer exists, and eleven rows did not know it.** It **dissolved in 2020** into
**Vanguard Presbytery**; in **May 2022** the ex-RPCUS churches left Vanguard to form the **Christ
Reformed Presbyterian Church (CRPC)**. An RPCUS label is at best six years stale. This also caught a
guess of mine on #3312 that read *"very likely now Vanguard"* — the half I guessed was the wrong half.

**Rosters taken whole and now CLOSED:** RP-Hanover (18) · RPCGA (8) · **CPC (12)** · **CRPC (4)** ·
**Vanguard (21)** · **NCFIC / Church & Family Life (405 US)**. WPCUS is one congregation and
disputed. **RCUS (47) is the only sizeable body left untaken, and is low value — its Synod formally
disclaims Reconstructionism and theonomy.**

**When a directory renders client-side, find its API.** NCFIC's church finder yields nothing to a
fetcher; `https://api.churchandfamilylife.com/churches?limit=2000` returns everything, public and
unauthenticated. **But 1,148 of its 1,608 records are abandoned signups** — rows named "My Church"
with no address. Filter on `status: "open"`. Never assume a public API's rows are all real.

**BOTH QUEUES ARE CLOSED.** Every one of the 100 qualifying rows carries individual research, and so
does every one of the **187 rows ever sourced to postmillennialworldview.com**, in every
classification. Neither had ever been true before 2026-08-05, when 184 rows were researched and 364
audited stance changes were written.

## SCOPE — what belongs in this directory at all (Dustin's ruling, 2026-08-06)

The directory covers **CONSERVATIVE** churches. That test is a floor, not the six markers:

> **Conservative = at minimum COMPLEMENTARIAN and NOT LGBT-AFFIRMING.**
> **Liberal = ordains women, or is gay-affirming, or the like. Out of scope. So is Roman Catholic.**

**Non-Reformed Baptist and Bible churches are in scope too**, on the same floor.

**This directory also documents its own COVERAGE.** Part of its claim is that it has looked across the
conservative Reformed landscape in America — not only at the churches that turned out to be
interesting. A denomination's full roster is what makes that claim checkable, so whole rosters of
qualifying-on-the-floor bodies are imported **unverified**, flagged `denominational_coverage`:
`researchStatus` stays `not_researched`, `stanceBasis` is null, no stance is set, no marker is claimed.

**A count of coverage rows is not evidence of anything.** A regional concentration of them is a fact
about which denominations publish rosters, not about a region.

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

**Closed queues:** the qualifying list (103, all researched), the postmillennial-directory cohort
(186, all researched), the theonomy church directory (26 of 26), and the Norman Statement roster.

**1. THE EQUAL-PROTECTION STATE PETITIONS ARE DONE — 4 of 10 states published a roster.**

| State | Roster | Result |
|---|---|---|
| Ohio (HB 370) | **170 pastors** | **133 churches** |
| Kentucky (HB 523) | **128 pastors** | **100 churches** |
| Indiana | **80 pastors** | **60 churches** |
| Missouri | 6 | 4 churches |
| Texas · Georgia · South Carolina · Idaho · North Dakota · Oklahoma · Alabama · NC · Kansas | none published | see the log |

**The rule that emerged: these groups publish petitions to be SIGNED, not lists of who signed.** Four
in ten publish a roster; when one does it is worth a hundred churches, and when it does not, digging
on the org's homepage never helps. **Look for a page dedicated to the specific BILL** — that is the
only place a roster has ever lived.

**Worth one more try later:** South Carolina's **Calvary Presbytery (PCA)** unanimously petitioned
lawmakers on 7 Feb 2026 on behalf of **45 churches** and recommended individual Sessions petition
their own districts. The presbytery act names nobody and was NOT treated as 45 signatures — but if
any Session did petition, those would be per-church acts worth finding.

**1b. THEONOMIC DENOMINATION ROSTERS — DONE except RCUS.** See the section above. Membership never
qualifies a church — these are candidate lists, and every row added from one is `not_researched`.

**Open conflict, now three-way:** Hanover lists a "Birmingham Reformed Presbyterian Church" in Hoover
AL; #4123 is recorded RPCNA/Presbytery of the Alleghenies from the RPCNA's own records; and Vanguard
lists **Christ The Reconciler Presbyterian (Dr. Al Baker)** in the same suburb — a *third, different*
body, now #4661. Do not mistake the three for one. Flagged `denom_ambiguous`, deliberately unresolved.

**#4341 WPCUS, deliberately not resolved:** a search claims the denomination "disbanded ~10 years
ago", but the congregation's own current material still self-describes as WPCUS. **The church's own
word outweighs an undated secondary claim.** Recorded as a conflict rather than decided either way.

**2. THE COUNTY-VS-CITY SWEEP IS DONE.** 161 rows carried a county in the `city` field across 26
states. **77 repaired** from their own zip (applied only where the zip's state matched the row's).
**84 remain flagged `city_is_county`** — no zip, no street address, nothing to recover from. Eleven
more rows held outright garbage in the city field (pastor names, service times, a confession name);
five fixed, six flagged `location_conflict`. Two new flags added to the vocabulary.

**Still open from it: 83 `city_is_county` rows need cities from outside the record — and this is now
a KNOWN SOURCE OF DUPLICATES, not just untidiness.** On 2026-08-06 a county value caused both failure
modes inside a single run: a loose "County = wildcard" rule matched **Grace Bible Fellowship (Kern
County) to Grace Bible Church (San Diego)**, 200 miles apart; tightening the rule to require a
corroborating zip or host then **split Heritage Church Centerville from its own "Hickman County" row
and created a duplicate** (Centerville is the county seat). Both directions, same cause.

> **A county in a city field breaks matching in both directions. Loose rules produce false merges,
> strict rules produce false splits. The only real fix is to repair the city.**

Same failure mode from a different cause: **#3672 had a PASTOR'S NAME in its city field** ("Danny
Hyde"). It was found only because an external listing matched by website host and reported the real
city. **A bad city value never looks like an error in a query — it silently drops the row out of every
city-based match.**

**The scope question is SETTLED — Dustin's ruling is US-only**, and the two foreign rows (#3325 Landstuhl,
GERMANY, a genuine PCA congregation serving the Kaiserslautern military community; #3656, which had
nothing behind it but a Grande Prairie, ALBERTA address) are held `review_nonfit`. A directory-wide
foreign-indicator scan found **no others** — but note 27 of its 29 hits were FALSE POSITIVES:
"Netherlands Reformed" is a US denomination, Ontario CA and Peru NE are American towns, and "Mexico
Rd" / "Canada Cross Road" / "Alberta Drive" are streets. **A place name inside a church's name or
address means nothing.** Do not re-run that scan and start deleting.

**2b. RE-TEST DEAD WEBSITES — a church domain had been sold to a gambling operator.**
`sovereigngracebaptistchurchsa.com` (#3708) now serves an online gambling site from Vietnam; the URL
was deleted from the row. All ten rows flagged `website_removed` that still carried a URL were
checked; the other nine are clean. **But three `website_removed` flags were simply WRONG** — two
domains are live, and a third (#3690) is a Nuxt app that renders client-side and only *looks* empty
to a fetcher. **Any row whose note says "empty body" should be re-tested in a browser.** A
`website_removed` flag is a claim like any other and has to be retested.

**3. The 171-clergy Issue 1 letter is a dead end so far** and is worth less than it looked: a broad
pro-life coalition across 23 Ohio counties, framed on parental rights, delivered 18 Oct 2023 by
Dave Rentzel (Shelby Life Church), Kevin Evans (Ganges Liberty Lifesong) and Bobby Edwards (Jesus is
Alive Holiness). **The full signatory list is not published anywhere reachable.** Note it did NOT
settle #4186 Sovereign Christ Church — Clint Zeigler is not on the H.B. 370 petition either.

**4. Then:** the Oklahoma Watch / KGOU investigation *"From Norman to the State GOP"* (8 May 2026);
the Future of Christendom Conference roster (#4193); and **Whitefield Theological Seminary**, now
eight rows deep.

**Three unfinished rows still worth an hour each:** #3304 Christ Reformed Presbyterian, Paris TN (697
sermons unread) · #4218 Evangelical Reformed, Tacoma (solideogloria.org unread) · #4162 Christ Church
of Acadiana (its own classical academy).

**Two traps recorded:** Nathaniel Morrison's "Grace Reformed Baptist Church, NORMAN OK" cannot be
confirmed to exist, and Rick Prettyman's "Christ Community Church" resolves to Lake Charles,
LOUISIANA. Do not record either until the right church is identified.

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
- **Never match churches on website host without excluding platform domains.** **48 rows in this
  directory record `facebook.com` as their website** and 20 record `sermonaudio.com`. A host match
  across those pairs *any* church with *any* other — one dry run matched Lindsey Chapel Baptist
  (Eufaula) to four unrelated Oklahoma churches. Keep host matching, though: with platforms excluded
  it is the **only** thing that reliably finds renames, and it caught three of them on 2026-08-06.
- **Absence from a roster is much weaker evidence than presence on one.** Six rows claim a body that
  does not list them (three Vanguard, three a dissolved RPCUS). All were **flagged, not blanked** —
  the congregation may have left, the roster may be partial, or the original entry may be wrong, and
  nothing distinguishes those from outside. This project has already been burned treating a silent
  source as a negative finding.
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
2. ~~Church and Family Life / NCFIC~~ — **DONE 2026-08-06**, taken whole: 405 US churches, 168
   matched, 237 added, all `not_researched`. **Family integration is recorded in `theologicalNotes`
   (the Editor's Note), as Dustin asked** — no age-segregated children's church or youth group. It
   **correlates** with household patriarchy but is **not evidence of it**, so no `genderStance` was
   set from it. These 237 rows are now the largest untouched research pool in the directory, and they
   arrive with pastor names and websites attached — unusually good raw material.
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
