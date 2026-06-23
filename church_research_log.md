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
- 2026-06-21: FULL-DEEP MODE restored. Reset 220 shallow (site+default) churches -> not_researched. Deep-dug #99-108 with pastor web-search (pastors found: Atmore, Rayburn, Slate, Hall, Rendall, Joel; all defaulted after dig - no public abolition/anti-Zionist stance). researched=295, not_researched=3730. Cursor ~#109.
  REALITY: deep dig = ~1-2 web searches/church, rate-limited -> ~10-20 deep churches per turn. 3730 left = many sessions. Resumable by cursor.
- 2026-06-21: deep-dug #109-118. researched=305. Caught #109 Eastside/Paul Thompson = pro_abolition (sanctuary-city-for-preborn). zionist no=290/anti=7/yes=5; abolition incr=292/pro_abolition=10. leadership=234. Cursor ~#119. Leads to chase later: OK abolitionist pastor running for state senate; Jody Lucero/Providence Reformed Des Moines (equal-protection signatory).
- 2026-06-22: deep-dug #119-176 (with WebSearch). researched=361. Finds: #123 Cross Point/Josh Eaton=pro_abolition; #160 Cornerstone Carthage=zionist yes (Grace Advance); #164 Audubon/Marcellino=yes; #171 Grace Gospel Fellowship=yes (dispensational denom); #165 Basileia=no (postmill). FIXED #156/#157 id-mismatch. Cursor ~#177.
- 2026-06-22: HIT 400 (researched=401) at full deep standard. Deep-dug #119-217 this session (pastor web-search each). New finds: pro_abolition=#123 Eaton, #212 Ascol, #214 Christ RB Edmond, #216 Deevers; zionist yes=#160 (Grace Advance), #164 Marcellino, #171 Grace Gospel Fellowship, #191 (Master's Sem), #209 (GARBC). Tally: zionist no=380/yes=11/anti=7; abolition incr=384/pro_abolition=14. leadership=298. Cursor ~#218.
- 2026-06-22: deep-dug #218-248. researched=431. All defaults this stretch (no new pro_abolition/zionist-yes except #231 Quidnessett IFB=yes). Many RB pastors filled. Cursor ~#249.
- 2026-06-22: deep-dug #249-278. researched=461. Finds: #251 Apologia Church Utah=anti/pro_abolition (Durbin/EAN plant); zionist yes=#250 Roy Bible, #275 Laramie Faith/Tom Lund (TMS). Cursor ~#279.
- 2026-06-22: deep-dug #279-290 (PCA/OPC bloc). researched=471. #279 Parish Presby/George Grant=pro_abolition (outlaw-abortion advocacy). WebSearch limit hit (resets 1pm ET); paused at #289/#291/#294+ rather than default w/o pastor-dig. Cursor ~#289.
- 2026-06-22: HIT 500 (researched=501) at full deep standard. Deep-dug #289-322 (PCA/OPC/Presbyterian bloc, mostly AL). Tally: zionist no=476/yes=14/anti=8; abolition incr=482/pro_abolition=16. leadership=372. Cursor ~#313/#318/#323+.
- 2026-06-22: deep-dug #323-353 (Alabama PCA/Presbyterian bloc). researched=531. All PCA covenantal defaults (zionist no/abolition incr); pastors filled where reliably named. Cursor ~#347/#354+.
- 2026-06-22: deep-dug #354-390 (AL PCA bloc cont). researched=561. All PCA covenantal defaults; pastors mostly filled. Cursor ~#355/#360/#363/#378/#380/#383/#391+.
- 2026-06-22: deep-dug #391-407 (end AL bloc + start AR). researched=576. All PCA/covenantal defaults. Cursor ~#398/#406/#408+.
- 2026-06-22: deep-dug #408-422 (AR + AZ PCA bloc). researched=591. All PCA defaults. #408=dup of #407. Cursor ~#423+.
- 2026-06-22: deep-dug #423-443 (AZ/CA PCA bloc). researched=606. All PCA/covenantal defaults. Cursor ~#430/#432/#435/#439/#444+.
- 2026-06-22: deep-dug #444-461 (CA PCA bloc). researched=621. All PCA/covenantal defaults. Cursor ~#451/#452/#456/#462+.
- 2026-06-22: deep-dug #462-479 (CA PCA/Korean PCA bloc). researched=636. All PCA/covenantal defaults. Cursor ~#469/#473/#474/#480+.
- 2026-06-22: deep-dug #482-499 (CA Korean-PCA + New Life Mission network). researched=651. All PCA defaults. Cursor ~#480/#481/#485/#486/#488/#500+.
- 2026-06-22: deep-dug #500-516 (CA PCA bloc). researched=666. All PCA/OPC defaults. Cursor ~#504/#509/#517+.
- 2026-06-22: deep-dug #517-533 (CA PCA/Korean-PCA). researched=681. All PCA defaults. Cursor ~#523/#532/#534+.
- 2026-06-22: HIT 700 (researched=701). Deep-dug through #553 (CA/CO PCA + Korean-PCA belt). Tally: zionist no=676/yes=14/anti=8/unknown=3; abolition incr=682/pro_abolition=16/unknown=3. leadership=502/701. Cursor ~#554+. WebSearch held the whole run (no limit hit).

## recordFlag column (2026-06-22)
Added structured `recordFlag` column to Church (semicolon-separated tags): duplicate_of:<id> | closed | in_transition | denom_corrected | denom_ambiguous | corrected. Backfilled 31 researched rows:
- corrected (4): #1 Grace Community (MacArthur, was fake pastor), #6 Cornerstone SA (Hagee, was fabricated), #12 Community Bible SA (wrong website), #156 Grace Baptist (id-mismatch fix)
- duplicate_of (3): #408->407, #518->516, #522->482
- closed (4): #189, #371, #437, #492
- in_transition (14): #344,#401,#417,#748 + URC/RPCNA vacant-pulpit bloc (#3776,#3784,#3789,#3800,#3802,#3820,#3822,#3889,#3929,#3936)
- denom_ambiguous (6): #300,#371,#400,#427,#467,#520
- denom_corrected (1): #447 (PCA->OPC)
Query: SELECT * FROM "Church" WHERE "recordFlag" IS NOT NULL. apply-research-batch.ts now writes recordFlag for future research.

## Website / duplicate cleanup (2026-06-22)
Scanned all rows sharing a website host (168 rows on shared hosts). Actions:
- **69 websites NULLed** (provably garbage: foreign-TLD/forum/blog/resource/denominational placeholders e.g. gracechurchrotorua.co.nz x20, puritanboard threads x16, reformation.edu x10, jerseycitygrace.org, *.org.nz/.au, abuse-blog URLs). recordFlag += website_removed. Removed values listed below (recoverable).
- **21 duplicate_of** total (added 18: e.g. #3989->76 GBC Conway, #3737->392 Urban Hope, #3316->374 Redeemer Shoals, #3752->2249 First OPC SF, #3596->3497 Coddle Creek, #3658->3937, #3668->3935).
- **63 shared_website_review**: different real churches sharing one real church domain (owner unverified) - FLAGGED not nulled, for human/targeted-research resolution.
- **15 corrupted**: name/city fields holding garbage (addresses, phone numbers, names, PO boxes).
Query: SELECT id,name,recordFlag FROM "Church" WHERE recordFlag IS NOT NULL.

### NULLed website audit (id / name / removed-url)
```
#2210	Grace	https://www.gracechurchrotorua.co.nz
#2240	Grace	https://www.gracechurchrotorua.co.nz
#3720	Grace Bible Fellowship	https://www.gbf.org.au/index.php/about/about-the-church/what-we-believe
#1294	Covenant Presbyterian Church	http://covenantchurch.org.nz
#3785	Reformed Presbyterian Church	http://reformedpresbyterian.org/)
#3814	Reformed Presbyterian Church	http://reformedpresbyterian.org/)
#3860	Grace Reformed Church	https://jerseycitygrace.org
#3863	True Dutch Reformed Church	https://www.puritanboard.com/threads/question-regarding-netherlands-reformed-churches-heritage-reformed-churches.61328
#3864	Netherland Reformed Congregation	https://www.puritanboard.com/threads/question-regarding-netherlands-reformed-churches-heritage-reformed-churches.61328
#3865	Ebenezer Netherland Reformed	https://www.puritanboard.com/threads/question-regarding-netherlands-reformed-churches-heritage-reformed-churches.61328
#3866	First Netherlands Reformed Congregation	https://www.puritanboard.com/threads/question-regarding-netherlands-reformed-churches-heritage-reformed-churches.61328
#3874	Netherlands Reformed Congregation	https://www.puritanboard.com/threads/question-regarding-netherlands-reformed-churches-heritage-reformed-churches.61328
#3875	Netherlands Reformed Church	https://www.puritanboard.com/threads/question-regarding-netherlands-reformed-churches-heritage-reformed-churches.61328
#3876	Netherlands Reformed Congregation	https://www.puritanboard.com/threads/question-regarding-netherlands-reformed-churches-heritage-reformed-churches.61328
#4024	Georgetown	https://thouarttheman.org/2018/04/24/arbca-pastors-middle-sexual-abuse-cover
#4025	Mansfield	https://thouarttheman.org/2018/04/24/arbca-pastors-middle-sexual-abuse-cover
#4026	Glenside	https://thewartburgwatch.com/2023/06/09/westminster-theological-seminary-ignores-abuse-and-gives-steve-estes-an-honorary-doctorate-for-what-exactly-never-forget
#4027	Elverson	https://thewartburgwatch.com/2023/06/09/westminster-theological-seminary-ignores-abuse-and-gives-steve-estes-an-honorary-doctorate-for-what-exactly-never-forget
#3862	Grace Reformed Church	https://jerseycitygrace.org
#371	Providence Presbyterian Church	http://files.puritanboard.com/confessions.htm
#2343	Grace	https://www.gracechurchrotorua.co.nz
#2346	Grace	https://www.gracechurchrotorua.co.nz
#2373	Trinity Presbyterian Church	https://www.capnz.org
#2190	Grace	https://www.gracechurchrotorua.co.nz
#2151	Grace Reformed Church	https://jerseycitygrace.org
#3956	Unity Associate Reformed Presbyterian Church	https://veritaspresbytery.com/our-beginning
#3871	Netherlands Reformed Congregation	https://www.puritanboard.com/threads/question-regarding-netherlands-reformed-churches-heritage-reformed-churches.61328
#324	First Presbyterian Church	https://www.reformation.edu
#307	Covenant Presbyterian Church	http://covenantchurch.org.nz
#334	First Presbyterian Church	https://www.reformation.edu
#851	Providence Presbyterian Church	http://files.puritanboard.com/confessions.htm
#3444	Troy ARP Church	https://veritaspresbytery.com/our-beginning
#2246	Grace	https://www.gracechurchrotorua.co.nz
#3870	Netherlands Reformed Congregation	https://www.puritanboard.com/threads/question-regarding-netherlands-reformed-churches-heritage-reformed-churches.61328
#3549	First Presbyterian Church	https://www.reformation.edu
#3818	Reformed Presbyterian Church	http://reformedpresbyterian.org/)
#3868	Netherlands Reformed Congregation	https://www.puritanboard.com/threads/question-regarding-netherlands-reformed-churches-heritage-reformed-churches.61328
#3872	Netherlands Reformed Congregations	https://www.puritanboard.com/threads/question-regarding-netherlands-reformed-churches-heritage-reformed-churches.61328
#3867	Netherlands Reformed Church	https://www.puritanboard.com/threads/question-regarding-netherlands-reformed-churches-heritage-reformed-churches.61328
#2176	Grace	https://www.gracechurchrotorua.co.nz
#2205	Grace	https://www.gracechurchrotorua.co.nz
#2370	Grace	https://www.gracechurchrotorua.co.nz
#3329	Resurrection SD	https://Robert Novak
#1682	First Presbyterian Church	https://www.reformation.edu
#1747	Trinity Presbyterian Church	https://www.capnz.org
#939	Reformed Presbyterian Church	http://reformedpresbyterian.org/)
#328	First Presbyterian Church	https://www.reformation.edu
#792	First Presbyterian Church	https://www.reformation.edu
#3740	Resurrection SD	https://Robert Novak
#1960	Covenant Presbyterian Church	http://covenantchurch.org.nz
#3291	Grace Bible Fellowship	https://www.gbf.org.au/index.php/about/about-the-church/what-we-believe
#3626	Grace Reformed Church	https://jerseycitygrace.org
#1170	First Presbyterian Church	https://www.reformation.edu
#1178	First Presbyterian Church	https://www.reformation.edu
#1182	First Presbyterian Church	https://www.reformation.edu
#1185	First Presbyterian Church	https://www.reformation.edu
#3873	Netherlands Reformed Congregation	https://www.puritanboard.com/threads/question-regarding-netherlands-reformed-churches-heritage-reformed-churches.61328
#3869	Netherlands Reformed Church	https://www.puritanboard.com/threads/question-regarding-netherlands-reformed-churches-heritage-reformed-churches.61328
#2146	Grace	https://www.gracechurchrotorua.co.nz
#2165	Grace	https://www.gracechurchrotorua.co.nz
#2189	Grace	https://www.gracechurchrotorua.co.nz
#2200	Grace	https://www.gracechurchrotorua.co.nz
#2213	Grace	https://www.gracechurchrotorua.co.nz
#2226	Grace	https://www.gracechurchrotorua.co.nz
#2244	Grace	https://www.gracechurchrotorua.co.nz
#2286	Grace	https://www.gracechurchrotorua.co.nz
#2288	Grace	https://www.gracechurchrotorua.co.nz
#2306	Grace	https://www.gracechurchrotorua.co.nz
#2323	Grace	https://www.gracechurchrotorua.co.nz
```

## Enrichment columns + denomination reconciliation (2026-06-22)
Added columns: stanceBasis (evidenced|denominational_default|mixed), sourceUrls (provenance), lastResearchedAt. apply-research-batch.ts now also collects denomination, phone, email, zip, address, sourceUrls, stanceBasis and stamps lastResearchedAt.
Backfill (701 researched): lastResearchedAt=100%; stanceBasis: default=463/evidenced=23/mixed=18/null=197; sourceUrls=62 (from local batch JSONs).
denomination reconciled from research notes: 108 net corrections (e.g. URC->URCNA x40, PCA->PCA(Korean) x26, mislabeled Reformed Baptist->SBC/Bible Church/Independent Baptist, #171->Grace Gospel Fellowship, #232/#228->ABCUSA, #447/#510->OPC, #307->ARP). Reverted 5 false matches from "formerly/ex-" wording: #38/#48->CREC, #7->Non-Denominational, #500->PCA, #10->SBC.
Still pre-existing-from-import (not yet backfilled for existing rows; now wired for ongoing research): phone 86%, email 71%, zip 66%. lat/long 100% (map-ready).
- 2026-06-22: hid 25 records (approved=false): 21 duplicate_of + 4 closed. Public listing should also filter recordFlag NOT LIKE duplicate_of%/closed% for robustness.
