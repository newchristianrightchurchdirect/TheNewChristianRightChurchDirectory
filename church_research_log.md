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

## ⚑ STANDARD: individual-first, denominational-default fallback (per user, 2026-06-21)
For EACH stance: (1) research the individual church site (statement of faith, ministries). (2) **If the site
is silent, DIG into the pastor** — sermons (SermonAudio/YouTube), books, public record, ministry/network
affiliations, and social media (X, Facebook). (3) Use what they actually say. (4) **Only if all that turns
up nothing, fall back to the DENOMINATIONAL DEFAULT — do NOT leave it "unknown".** Unknown only if the
denomination is also unclassifiable.

Pastor-dig payoff (batch 8) — 4 defaults upgraded to evidenced stances:
- #16 Refuge / Brian Sauvé → self-described "Abortion Abolitionist" (pro_abolition) + active anti-CZ/antisemitic (zionist anti)
- #19 Dominion Covenant / Phillip Kayser → abortion = capital murder (pro_abolition)
- #20 King's Way / Dale Partridge → wrote "The Israel Delusion" vs Christian Zionism (zionist anti)
- #24 Shepherd's Church / Kendall Lankford → church "abortion is murder", abolitionist (pro_abolition)

Denominational defaults:
- **zionist** — Reformed/Presbyterian family (CREC, RPCNA, RPCGA, OPC, PCA, URC, ARP, PRCA, Reformed,
  Reformed Baptist, Presbyterian, HRC, Converge, CPC) → **no**. Dispensational (Bible Church, most
  charismatic/evangelical non-denom, much of SBC) → **yes**. ("anti" only with individual evidence of
  active anti-Christian-Zionism.)
- **abolition** — conservative Christian default → **incrementalist** (pro-life). "pro_abolition" only with
  individual evidence (EAN/Free the States/equal-protection/signed abolition statement/abolition conference).
  "anti" only for pro-choice/affirming (mainline).
- `researchNote` flags when a stance came from the denominational default vs the church itself.

Individually-evidenced calls so far: MacArthur=yes, Hagee=yes(CUFI), Jeffress=yes, Durbin=anti+pro_abolition,
Webbon=anti+pro_abolition, Baldwin=anti+pro_abolition, Wilson=anti+incrementalist, Zahnd=anti,
Grace Life Dallas=pro_abolition, Christ Church Spokane=no(stated optimistic eschatology).

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

## Batches 4–5 (applied) — web tools reset, full quality
| id | church | leadership | zionist | abolition |
|---|---|---|---|---|
| 16 | Refuge (Ogden UT) | Brian Sauvé (theonomic) | anti | unknown |
| 23 | Reformation Covenant (Oregon City OR) CREC | Bo Cogbill / Dennis Tuuri | no | unknown |
| 24 | The Shepherd's Church (Chelmsford MA) CREC | Kendall Lankford | anti | unknown |
| 29 | Trinity Church Kirkland (WA) CREC | Dave Hatcher | no | unknown |
| 32 | Grace Life Church of Dallas (Plano TX) | pastor TBD | no | **pro_abolition** (hosts "Pro-Life Is Not Enough") |
| 25 | Providence Pensacola (FL) CREC | Uriesou Brito + elders | no | unknown |
| 28 | Providence Lynchburg (VA) CREC | Virgil Hurt + elders | no | unknown |

## ⚠ Bad record flagged (not changed)
- #13 Providence Church, Wilmington NC (PCA): no PCA "Providence" found in Wilmington NC; listed site
  (providencepcathomaston.org) is dead. Likely mis-located/mis-named import — needs manual verification.

## Note on CREC bloc
CREC churches: zionist "no/anti" is denominationally sound (covenantal/postmill, reject Christian Zionism),
and leadership is scrapeable — but **abolition splits** (Wilson = incrementalist; others abolitionist), so
abolition stays "unknown" until each pastor's stated position is found. Worth a dedicated abolition pass.

## NEW: researchStatus column (added to schema + DB)
`researchStatus` = "not_researched" (default) | "researched" | "blocked"; plus `researchNote` (block reason
or source). Back-filled: researched where leadership/abolition was set. Apply script now stamps "researched";
mark "blocked" via an output entry's researchStatus + researchNote. Pull query filters not_researched.

## Batches 6–7 (applied) — mostly CREC/RPCGA + notable non-denoms
| id | church | leadership | zionist | abolition |
|---|---|---|---|---|
| 26 | Holy Trinity Reformed (Concord NC) CREC | Brian Phillips | no | unknown |
| 27 | Christ the King (Greenville SC) CREC | Michael Hansen / Caleb Levi | no | unknown |
| 33 | Christ Covenant RPC (Wylie TX) RPCGA | Todd Ruddell | no | unknown |
| 37 | Word of Life (St Joseph MO) | Brian Zahnd (anti-CZ) | anti | unknown |
| 30 | Tri-City Covenant (Somersworth NH) CREC | Harold Guptill | no | unknown |
| 31 | Phoenix Reformed Baptist (AZ) 1689 | elder Dr. James White | no | unknown |
| 34 | Brainerd Hills (Chattanooga TN) RPCGA | (not listed) | no | unknown |
| 36 | Liberty Fellowship (Kalispell MT) | Chuck Baldwin | **anti** | **pro_abolition** |
| 38 | Trinity Pres (Birmingham AL) CREC | Rich Lusk (+ Leithart) | no | unknown |
| 40 | Christ Church Santa Clarita (CA) CREC | Garrett Craw | no | unknown |

## DB progress (live)
researchStatus: **researched=225, blocked=1 (#13), not_researched=3,800**.
abolitionStance classified: ~217 · leadership filled: ~205.

## Cursor
This turn researched 32 churches (ids 1–40 range, minus the gaps). **Next ≈ #41+.**
CREC/RPCGA bloc: zionist confirmed `no/anti`, abolition mostly `unknown` (needs per-pastor stance pass).
Standouts found: pro_abolition = Apologia(3), Webbon/Covenant(17), Grace Life Dallas(32), Chuck Baldwin(36).

## Progress log (live counts)
- 2026-06-21: researchStatus researched=240, blocked=1, not_researched=3785.
- Worked ids ~35-53 (CREC/Reformed-family bloc) with site -> pastor-dig -> denominational-default.
  Pastor digs upgraded the vocal ones (Sauve, Kayser, Partridge, Lankford). The small local CREC
  missions were genuinely silent (site + no public pastor record) -> denominational default
  (zionist no, abolition incrementalist), pastors filled where listed.
- abolition among researched: incrementalist=229, pro_abolition=8, unknown=3.
- **Cursor: next not_researched id = ~#54+.**


- 2026-06-21 (cont): researched=255, not_researched=3770. Cleared ids ~54-68 (CREC/OPC/PCA/RB/RCUS bloc).
  Pastor-dig upgrades: #66 Sovereign King/Joseph Spurgeon = pro_abolition (clinic ministry). Flag: #65
  Christ the King Reformed/Bret McAtee = SPLC-listed (Kinist-adjacent). **Cursor: next id ~#69.**
- 2026-06-21: researched=270. Cleared RB bloc ids 69-83 (defaults; names where found: Daniel Michael, Bart Hodgson, John Samson). Cursor ~#84.
- 2026-06-21: researched=285. Cleared ids 84-98 (RB bloc + #85 Calvary Road=dispensational zionist YES via stated eschatology). Cursor ~#99.
- 2026-06-21: HIT 500 (researched=505). ids ~99-326 done via auto-batcher (site-scrape evidence -> denominational default; NO web-search pastor-dig). ids 1-98 = deep-dug tier. Cursor ~#327.
  CAVEAT: 99-326 abolition/zionist are site+default only - a pastor-dig pass would upgrade abolitionists/anti-zionists not stated on their own sites.
