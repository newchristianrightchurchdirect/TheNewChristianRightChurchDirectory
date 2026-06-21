# Individual church research — progress log

Tracks per-church *individual* research (verify pastor/leadership from real sources,
confirm zionist stance, classify abolition stance, accurate description).
Started resuming 2026-06-21.

## Baseline (from live Neon DB)
- 4,026 churches total.
- **abolitionStance classified: 193** (192 incrementalist + 1 pro_abolition) — these are the
  only churches that were *individually* researched (the June-2 batch). **3,833 still "unknown".**
- Research depth: 2,709 Tier-3 (pastor named), 1,193 still boilerplate (787 of them Reformed Baptist).
- Zionist stance: set for almost all, but **mostly ASSUMED from denomination, not source-confirmed.**

## ⚠ Data-quality finding
The pre-existing AI-generated notes contain **fabrications** that must be corrected during research:
- #1 Grace Community Church (MacArthur's church) listed a fake "Pastor Donald H. Ward".
- #6 Cornerstone San Antonio (John Hagee/CUFI) listed a fake "Pastor Christopher P. Vogel" AND a
  wrong website (cornerstoneplano.org — a different church).
- #12 Community Bible Church (San Antonio) has a wrong website (cbcvallejo.org — Vallejo, CA).
So "individual research" = correct + verify, not just fill blanks.

## Standard per church
- leadership: real pastor(s)/elders from the church site or reliable source
- zionistStance: yes / no / anti / unknown — confirmed from a statement or strong public record
- abolitionStance: pro_abolition (abolition-movement aligned) / incrementalist (mainstream pro-life,
  not abolitionist) / anti / unknown
- theologicalNotes + description: accurate, sourced

## Done — session 2026-06-21 (12 churches, APPLIED to live DB)
Batch 1 → resumed-batch-1-output.json (applied via prisma/apply-resumed-batch-1.ts)
Batch 2 → resumed-batch-2-output.json (applied via prisma/apply-research-batch.ts)

| id | church | fix / note | zionist | abolition |
|---|---|---|---|---|
| 1 | Grace Community (Sun Valley CA) | fake pastor → MacArthur/interim | yes | incrementalist |
| 2 | Founders Baptist (Spring TX) | pastor = Richard Caldwell | no | incrementalist |
| 3 | Apologia (Mesa AZ) | **pro_abolition** (End Abortion Now) | anti | pro_abolition |
| 6 | Cornerstone (San Antonio TX) | fixed website + fake pastor → Hagee | yes | incrementalist |
| 7 | McLean Bible (Vienna VA) | leadership = Platt + Kelsey | unknown | incrementalist |
| 10 | Capitol Hill Baptist (DC) | confirmed Mark Dever | unknown | incrementalist |
| 11 | First Baptist Dallas (TX) | pastor = Jeffress | yes | incrementalist |
| 12 | Community Bible (San Antonio TX) | fixed website → communitybible.com; zionist downgraded (was assumed) | unknown | incrementalist |
| 17 | Covenant Bible (Georgetown TX) | Joel Webbon; signed CN statement to abolish abortion | anti | **pro_abolition** |
| 18 | Christ Church (Moscow ID) | Doug Wilson — self-described "smashmouth incrementalist", anti-abolition-movement | anti | incrementalist |
| 19 | Dominion Covenant (Omaha NE) | Phillip Kayser (theonomist) — abolition not source-confirmed | anti | unknown |
| 20 | King's Way Reformed (Prescott AZ) | Dale Partridge — abolition not confirmed | anti | unknown |

**Key lesson:** abolition stance is NOT inferable from theology — Webbon (postmill) = pro_abolition,
Wilson (postmill) = incrementalist. Confirm from a stated position; else leave "unknown".

## Batch 3 (applied) — scraped via Node (WebFetch/WebSearch hit session limit, resets 2:30pm ET)
| id | church | note | zionist | abolition |
|---|---|---|---|---|
| 9 | Trinity Bible (Dallas TX) | elders Condy/Ng/+; prior "amillennial" claim contradicted by site → downgraded | unknown | unknown |
| 15 | Bethlehem Baptist (Minneapolis MN) | Piper-era historic premil; current pastor TBD | no | incrementalist |
| 22 | Christ Church Spokane (WA) | Pastor Kenton Spratt; covenantal/postmill (CREC-style) | no | unknown |

## ⚠ Tooling note
WebFetch/WebSearch hit a session rate limit (resets 2:30pm America/New_York). Node-`fetch` scraping is the
fallback — works for static sites (leadership, fabrication fixes) but returns nothing for JS-rendered sites
(Squarespace/Wix) and can't always reach the eschatology/abortion sections ⇒ more "unknown" until clean tools return.

## Deferred — needs clean WebFetch/WebSearch
- #13 Providence PCA (Wilmington NC): listed site providencepcathomaston.org is dead/wrong — find correct site + pastor.
- #16 Refuge Church (Ogden UT): JS-rendered (Squarespace) — leadership/beliefs not scrapeable.
- #15 Bethlehem: confirm current (post-Piper) lead pastor.
- Upgrade the "unknown" zionist/abolition on #9, #19, #20, #22 once sources are reachable.

## Cursor
Researched ids: 1,2,3,6,7,9,10,11,12,15,17,18,19,20,22 (15 total). Deferred: 13,16. **Next un-researched id ≈ 23+.**
~3,818 churches still unclassified. Resume at full quality when WebFetch resets; static-site scraping can continue meanwhile.
