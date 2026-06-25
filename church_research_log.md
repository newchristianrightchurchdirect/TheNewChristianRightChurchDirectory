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
- 2026-06-23: resolved all 63 shared_website_review (6 by domain-match, 11 by knowledge, 13 via web owner-lookup) -> kept owner URL, nulled wrong shares; #3759 hidden as dup of #3600. stanceBasis backfilled 193 (now only unknown-stance rows null). 
- 2026-06-23: repaired corrupted records (name/city/state) & pinned denoms: #3329 Resurrection Presbyterian San Diego(state SD->CA), #4024 Emmanuel RBC Georgetown, #4025 Heritage Baptist Mansfield, #3626 Grace URC Torrance, #3668 Christ Reformed DC, #3688/#3698 Greer SC, #3600/#3759 Everson WA(ARP), #427 Korean PCA, #400/#467 PCA. 4 left unresolvable: #520(denom), #3549/#4026/#4027(name/city).
- 2026-06-23: flag-cleanup complete. #300 resolved PCA. FINAL flags: website_removed=100 (real URLs come w/ research), duplicate_of=22 (hidden), in_transition=14 (not broken), closed=4 (hidden), corrected=4/denom_corrected=1 (audit), corrupted=3 (#3549/#4026/#4027 unresolvable), denom_ambiguous=1 (#520). All fixable flags resolved. Remaining big task: leadership backfill (~199 researched rows missing pastor).
- 2026-06-23: resumed scans in FULL-CAPTURE+VERIFY mode (denomination/website/leadership/contact verified per church, all columns filled). Batch #4-360 (no-website early gaps). researched=716. Verified/corrected: #4 SBC (not RB), #14 Redeemer=Mason OH PCA (was wrongly Alpharetta GA/SBC; corrected), #8 IFB zionist yes. Closed: #144 Triune Grace (hidden). Speece yoked parish (#338/#347/#355). Cursor: next no-website not_researched.
- 2026-06-23: full-capture batch #363-452 (AL rural + CA Korean PCA). researched=731. Refined Korean->PCA(Korean); #406 flagged denom_ambiguous (woman lay pastor=PCUSA signal vs PCA listing); #370 Cureton yoked. Cursor ~#455+.
- 2026-06-23: abolitionist cross-check (FAA/SBC-abolition-resolution/Free the States lists). Upgraded #2470 Ekklesia Muskogee (Brett Baggett) + #3910 Providence Reformed Des Moines (Jody Lucero) to pro_abolition. Other named abolitionist churches (Geyer Springs, FBC Edmond/Buffalo, High Point Mayfield) not in DB. Prominent abolitionist churches in DB now all pro_abolition. Going forward: scan queries include abortion/abolition/Israel (mode #1).

## Evidenced pro_abolition churches (N=18, as of 2026-06-23)
- #3 Apologia Church (Mesa AZ) — Jeff Durbin / End Abortion Now
- #16 Refuge Church (Ogden UT) — Brian Sauvé
- #17 Covenant Bible Church (Georgetown TX) — Joel Webbon
- #19 Dominion Covenant Church (Omaha NE) — Phillip Kayser
- #24 The Shepherd's Church (Chelmsford MA) — Kendall Lankford
- #32 Grace Life Church of Dallas (Plano TX) — Phil George
- #36 Liberty Fellowship (Kalispell MT) — Chuck Baldwin
- #66 Sovereign King Church (Jeffersonville IN) — Joseph Spurgeon
- #109 Eastside Baptist Church (Twin Falls ID) — Paul Thompson
- #123 Cross Point Baptist Church (Caney KS) — Josh Eaton
- #212 Bethel Baptist Church (Owasso OK) — Bill Ascol
- #214 Christ Reformed Baptist Church (Edmond OK)
- #216 Grace Reformed Baptist Church of Elgin (Elgin OK) — Dusty Deevers
- #251 Apologia Church Utah (South Jordan UT) — Jeff Durbin network
- #279 Parish Presbyterian Church (Franklin TN) — George Grant
- #2470 Ekklesia Muskogee (Muskogee OK) — Brett Baggett  *(added via cross-check 2026-06-23)*
- #3771 Syracuse Reformed Presbyterian Church (Syracuse NY)
- #3910 Providence Reformed Church (Des Moines IA) — Jody Lucero  *(added via cross-check 2026-06-23)*

## ⚠️ KNOWN GAP — REVISIT WHEN WE HAVE MORE DATA
We almost certainly MISSED some abolitionist (and Christian-Zionist) churches that are currently sitting at the denominational default:
- ~686 stances are `denominational_default`; the ~400 PCA/Presbyterian-belt rows researched BEFORE "mode #1" were not each dug for an abortion/Israel signal — a long-tail outlier (e.g., a smaller End Abortion Now-affiliated PCA church) could be defaulted to incrementalist/no.
- The EAN "find a church" dashboard (1000+ trained churches) is NOT public, so we couldn't cross-check the full list — only the prominent named churches (FAA leadership, SBC abolition-resolution co-authors).
REVISIT LATER with more data: (a) re-touch the already-defaulted PCA rows with abortion/abolition/Israel queries, and/or (b) cross-check against a fuller EAN / equal-protection / Free the States signatory roster when obtainable.

## Added 4 SBC abolitionist churches as NEW records (2026-06-23)
SBC 'On Abolishing Abortion' (2021) resolution co-authors not previously in the DB — created with pro_abolition (evidenced), recordFlag=added_via_crosscheck:
- #4031 First Baptist Church of Edmond (Edmond OK) — Blake Gideon
- #4032 First Baptist Church of Buffalo (Buffalo MO) — Dave Van Bebber  [street address unverified]
- #4033 Geyer Springs First Baptist Church (Little Rock AR) — Dave Hughey
- #4034 High Point Baptist Church (Mayfield KY) — Darrick Holloman
pro_abolition now 22. NOTE: these 4 lack lat/long (not geocoded) -> won't appear on map until geocoded. 3 of the 9 resolution co-authors remain unnamed (add later if identified).

## Added remaining 3 co-authors + geocoded all 7 (2026-06-23)
All 9 SBC 'On Abolishing Abortion' (2021) co-authors now in DB. Added:
- #4035 By the Word Baptist Church (formerly FBC Briar) (Azle TX) — Jon Speed
- #4036 Harmony Baptist Church (Frankfort IN) — Derin Stidd
- #4037 First Baptist Church of Mena (Mena AR) — Russell Threet
Also fixed #4032 Buffalo address -> 1006 W Main St. Geocoded #4031-4037 via Nominatim (4 street-level, 3 city-level fallback) -> lat/long 100% again, all map-ready. pro_abolition=25. (Ascol #212 + Baggett #2470 were already in DB.)

## Geocoded 34 of 35 previously-blank churches + city fixes (2026-06-23)
Fixed bad city strings AND geocoded (Nominatim). Typo fixes: San Deigo->San Diego(#503), Indianaplis->Indianapolis(#952), St. Robere->St. Robert(#1113), Senaca->Seneca(#1539), Tyalors->Taylors(#3677). Stripped parentheticals on ~20 RPCNA/OPC plant cities. Corrupted-field fixes: #3352->Corona, #3359->Cornerstone Presbyterian (OPC)/Duncanville, #3715->Minneapolis, #3721->Potter Valley. German military chapels #3323 Stuttgart / #3325 Landstuhl geocoded to Germany (state still mislabeled 'AL'). #3321 Kailua corrected from Big-Island to Oahu. ONLY #3691 (Presbyterian Reformed Church of NC) left blank — record has no city (was service times); needs research. lat/long now 4032/4033.
- 2026-06-23: chased #3691 -> Presbyterian Reformed Church of NC is in KING, NC (PRC denomination, Scottish-Reformation exclusive-psalmody; planted Tim Worrell 1998). Fixed city, researched (PRC covenantal -> no/incrementalist), geocoded. MAP COVERAGE NOW 100% (4033/4033).
- 2026-06-24: scans mode #1 batch (#456/#554/#555). #456 Gateway Presby SF = Korean PCA (Pastor Sang Sun Kim); nulled erroneous @opc.org email (belonged to Gateway OPC St. Louis). #555 Village Seven=Mark Bates, #554 Trinity Montrose=Cristian Garcia. WebSearch session limit hit -> paused (not defaulting un-dug Korean missions #469-532); resume after 3am ET reset.
- 2026-06-24: mode #1 cluster #456-532 (CA Korean-PCA, 12 new + #456 update). Confirmed pastors: #485 Andrew Jung, #488 Tae Seog Yang, #523 Jonathan Kyung Han, #532 Nam Cho; addresses verified #474/#523. #456 Gateway Presby flagged denom_ambiguous (Presbytery of San Fernando=PCUSA conflicts with PCA label) + no public email exists (prior @opc.org was erroneous). researched=756.

## POLICY: PCUSA churches excluded (2026-06-24)
User directive: PCUSA (mainline) churches do NOT belong in this directory. When a church is determined PCUSA, DELETE the record completely (hard delete). Removed: #456 Gateway Presbyterian (San Fernando, was mislabeled PCA - actually Presbytery of San Fernando/PCUSA) and #406 First Presbyterian Clarendon AR (PCUSA archives + woman lay pastor). Total churches: 4033 -> 4031. Going forward: never add PCUSA; watch generic "First Presbyterian"/"[City] Presbyterian" records mislabeled PCA.

## PCUSA sweep result (2026-06-24): CLEAN
Verified 11 generic "First Presbyterian" PCA-labeled records across diverse geography (Schenectady NY, Bad Axe MI, Hinckley MN, Weaverville NC, North Port FL, Sandersville GA, Hazlehurst MS, Woodville MS, Dillon SC, +). ALL confirmed PCA (several are famous mainline-exit congregations). Conclusion: directory is PCA-sourced; the 2 deleted PCUSA (#406,#456) were isolated, not systemic. Did NOT exhaustively verify all ~200 Presbyterian records - low contamination rate makes that low-yield; each gets denomination-verified during normal mode-#1 scans where PCUSA-delete policy is active. (Note: #644 North Port renamed "Word of Life Church of North Port" 3/2025 - update when researched.)

## Added 5 NXR stance fields (2026-06-24)
New tracked columns: christianNationalism (affirm/sympathetic/critical), eschatology (postmill/amill/premill/dispensational), theonomy (theonomic/sympathetic/non_theonomic), federalVision (affirm/sympathetic/critical - CREC/Moscow alignment), socialJusticeStance (anti_crt/mixed/affirming - Dallas-Statement/anti-woke). apply-research-batch.ts updated to write them. Backfilled 709/754 researched from notes+orbit defaults: eschatology amill 647/postmill 36/disp 26/unk 45; theonomy non_theonomic 651/sympathetic 27/theonomic 6; FV critical 655/sympathetic 26/affirm 1. CN (affirm 1, rest unknown) and socialJustice (all unknown) intentionally NOT defaulted - they vary within denominations; populate from evidence going forward (mode #1 now assesses all 7 stances).

## Added Side-B/sexuality + gender stance fields + EGALITARIAN-EXCLUSION policy (2026-06-24)
New columns: sexualityStance (traditional/side_b/affirming - Side B/Revoice axis) + genderStance (patriarchal/complementarian/egalitarian). POLICY (user directive): NO egalitarian churches in directory - determine egalitarian => DELETE (parallels PCUSA rule). Backfilled researched: genderStance complementarian 740/patriarchal 1/unknown 13; sexualityStance traditional 740/unknown 14 (confessional set is uniformly complementarian+traditional by confession). Egalitarian sweep: confessional denoms cannot ordain women (no egalitarian present); only ABCUSA can - 2 churches (#232 Newport RI, #228 Wellsboro PA) inconclusive (male pastors, no egalitarian evidence) -> flagged egalitarian_review, NOT deleted. PCUSA (egalitarian) already removed. Mode #1 now assesses 9 stances.

## ABCUSA verified + side_a exclusion (2026-06-24)
#232 United Baptist Newport RI + #228 First Baptist Wellsboro PA verified: conservative ABCUSA, male pastors, NOT in AWAB (affirming-Baptist directory), no egalitarian evidence -> KEPT (complementarian/traditional), egalitarian_review flag cleared. POLICY EXTENDED: side_a / LGBTQ-affirming (same-sex-marriage-affirming) churches also DELETED, same as egalitarian + PCUSA. No side_a churches present in DB (conservative-denomination set; mainline PCUSA already removed; the 2 ABCUSA are not AWAB-affirming).
- 2026-06-24: WEBSITE-FIRST scans begin (2506 not_researched w/ website). Batch #556-567 (CT/CO PCA, full 9-stance + leadership). All covenantal defaults except #566 Presbyterian Church of Manchester = C.R. Wiley EVIDENCED postmill + patriarchal (Man of the House / Theology Pugcast). Pastors filled: Morgan, Gray, Rossi, Preston Graham, Hutchinson, Caires, Dan Hong, Will Snyder, DJ Kim/Heo, Joseph Fisher. Data fixes: #563 website->gracechurchstamford.org. Flags: #557 (Yelp says closed, site active->kept), #567 (may be closed->verify). researched=766.
- 2026-06-24: STANDOUT-FIGURE rule added (note prominent pastors/members + their podcast/personal/ministry URLs in notes+sourceUrls). Enriched #566 C.R. Wiley (crwiley.com, Theology Pugcast, Patheos PaterFamilias). Batch #568-579 (DC/DE PCA, full 9-stance). Pastors filled: Hoburg, Reap/Dekker, Cinaglia, Sica, Hernandez, Knapp, Chad Barber, Koslowsky, Chuck Betters, Joshua Suh, Glenn Evans, Howard. Data fixes: #576 renamed Glasgow Reformed -> "Reach Church" (2017); #579 website -> manorpresbyterian.com. researched=778.

## DEFERRED: revisit default-backfill after main bulk (2026-06-24)
The 7 new stance fields on the early ~778 researched are mostly DENOMINATIONAL DEFAULTS (inference), not per-church evidence (eschatology amill/theonomy non_theonomic/FV critical/complementarian/traditional defaulted for confessional-P&R; CN+anti-woke left blank). Reliable for confessional belt, miss rate on "based" churches. AFTER the ~3,250 main bulk is done -> COME BACK and re-verify defaulted fields with evidence across the whole early set. (Targeted V2 pass on based/CREC/RB/abolitionist subset done first, below.)
- 2026-06-24: V2 batch B - CREC cluster. Applied documented CREC network posture (CN=sympathetic, genderStance=patriarchal [corrected from complementarian default], anti-woke=anti_crt) to all researched CREC churches w/ basis note; postmill+theonomy-sympathetic already set. Leadership: #41 Craig Thighe, #49 Grant Van Brimmer. #48 confirmed CREC (ex-PCA Three Rivers). #51 Lankford-uncertainty flagged.
- 2026-06-24: V2 batch C - abolitionists. #216 Deevers CN=affirm+theonomic+anti-woke (OK senator); #212 Ascol anti-woke (Founders chairman); #109 Thompson CN-sympathetic+anti-woke (Const. Party); #2470 Baggett patriarchal+CN-sympathetic+anti-woke (Shepherd School). #123 Eaton & #214 Edmond left honest-unknown (no firm CN/anti-woke evidence).
- 2026-06-24: V2 batch D - dispensational-Zionist standouts. Leadership filled #85 Waldrip/#191 Sherman/#209 Sam Brown/#231 Jim&Jonathan Sole; #171 confirmed mid-Acts hyper-disp. #275 CORRECTED: family-integrated Reformed Baptist (covenantal) -> zionist no/amill (was wrongly yes/dispensational). CN/anti-woke left unknown for all (no public evidence - separatist fundamentalists).
- 2026-06-24: V2 batch E - SBC abolitionists. #4035 Jon Speed STANDOUT (Babies Are Murdered Here docs); #4036 Derin Stidd anti-woke+STANDOUT (OSA Asst Natl Director); #4033 Hughey -> Lead Pastor (corrected). #4031 Gideon/#4034 Holloman/#4037 Threet left honest-unknown (no firm CN/anti-woke evidence).
- 2026-06-24: V2 batch F - postmill/theonomic misc. #105 Mark Hall/CN-sympathetic; #35 Todd Ruddell/RPCGA postmill-theonomic CN-sympathetic; #46 CORRECTED URCNA->CREC (+CREC posture); #160 Ryan Joki TMS/Grace-Advance anti-woke. #37 FLAGGED offprofile_review: pastor Brian Zahnd is a PROGRESSIVE anti-Christian-nationalism critic - off-profile for NXR directory, user review for removal (CN=critical, socialJustice=affirming).
- 2026-06-24: V2 COMPLETE (batch G). #155 Mark Snider (dispensational confirmed); #164 Audubon CORRECTED Reformed (zionist no/amill, Marcellino); #250 Roy Bible CORRECTED FIRE/Reformed (no/amill). V2 total ~60 standout/based churches evidence-verified. Net V2 catches: CN affirm=5/sympathetic=~33; multiple zionist+eschatology corrections (#275/#164/#250 Reformed not dispensational; #46 CREC not URCNA); #37 Brian Zahnd flagged off-profile. Main bulk forward scans resume next (~2480 website churches).
- 2026-06-24: Enriched #17 Webbon (Right Response Ministries/Theology Applied) + #16 Sauvé (King's Hall podcast, briansauve.com, MUSICIAN - Psalm settings/hymns/sea shanties, album "Even Dragons Shall Him Praise"). Created notable_figures.md - ~55 loudest/most-active NXR/Reformed voices (Wilson, Webbon, Durbin, White, Sauvé, Conn, Wiley, Deevers, Sumpter, Rigney, Wolfe, Isker, Torba, Boot, Foster, Baucham, Tom/Bill Ascol, T.R. Hunter, etc.), cross-referenced to directory ids where their church is present. Did not pad to 100 (prioritized real prominence).
- 2026-06-24: Hid #37 Word of Life (Brian Zahnd, off-profile). Added notable-figure churches: enriched #2543 Grace Baptist Cape Coral (Tom Ascol/Founders, anti-woke) + #3240 Mercy Seat Milwaukee (Matthew Trewhella - lesser magistrates/Missionaries to the Preborn, CN affirm + pro_abolition); created #4038 King's Cross Moscow (Toby Sumpter/CREC, CN affirm) + #4039 East River Batavia OH (Michael Foster/patriarchy, CN affirm). Both geocoded (map 100%, 4033 churches). Added Rusty Thomas (OSA, no settled church) + Matthew Trewhella to notable_figures.md.
- 2026-06-24: Systematic org-leadership sweep for loud voices. KEY: #3241 American Reformation Church (West Melbourne FL) enriched - home of Rusty Thomas (OSA founder/pastor) + Jason Storms (current OSA Natl Director); pro_abolition/CN-sympathetic/anti-woke (corrected earlier "Rusty Thomas no church" error). Added to notable_figures.md (~67 now): Cal Zastrow + Keith Mason (Personhood USA), Jason Storms, Flip Benham, Nate Fischer + Josh Abbotoy (New Founding/American Reformer), Marcus Pittman + Luke Pierson (Apologia/Loor); expanded T. Russell Hunter. Itinerant/media figures noted as no-church.
- 2026-06-24: Tracked N/A figures to their churches. ALL identifiable ones were ALREADY in DB (enriched): #64 Whitleyville Reformation (Andrew Isker, CN affirm/postmill/patriarchal; +Josh Abbotoy via RidgeRunner; noted antisemitism controversy), #3797 First RPC Durham (Rosaria Butterfield/Kent Butterfield, traditional sexuality), #76 Grace Bible Church Conway (Owen Strachan/anti-woke; flagged #3989 as duplicate_of:76, hidden). Marcus Pittman->Apologia #3. UNIDENTIFIABLE (member of unnamed congregation -> not added): Nate Fischer, William Wolfe, Bradley Pierce, Stephen Wolfe, Aaron Renn, Andrew Torba; itinerant org-leaders (Hunter, Zastrow, Mason, Benham) have no settled church. Canadian (Coates/Stephens/Boot) skipped per US focus.
- 2026-06-24: Adding AR-list (Abolitionists Rising) abolitionist churches. Batch 1: +4 new (#4040 Woodlawn Baptist Baton Rouge, #4041 Pleasant Hill Bible Bedford PA, #4042 Heritage Church Tulsa [Ekklesia plant/Brandon Scalf], #4043 Cross & Crown Warrenton VA [CREC/Ron Kronz]) all pro_abolition + geocoded; enriched 2 existing (#2758 North Athens, #3301 St Johns Reformed/Kenitzer CN-affirm). ~24 AR churches remain.
- 2026-06-24: AR churches batch 2: Missio Dei Glassboro NJ (Gruber), Christ Reformed Fellowship Garner NC, Redeemer South Hills West Mifflin PA (Griffo), Fellowship Church Lubbock (Barbee), Broadview Baptist Lubbock, Faith Baptist Longview (Webber) - all pro_abolition + geocoded.
- 2026-06-24: AR churches batch 3: +5 new (Hope Fellowship Gatesville NC, Morning Star Keota OK, FBC Beggs OK [Chris Gore], Christ Church Christiansburg VA [CREC/Anthony Mathenia], Harvest Mission Aubrey TX) + enriched #3294 Christ Reformed Fellowship & #2477 Faith Baptist Longview. All pro_abolition + geocoded.
- 2026-06-24: AR churches batch 4: enriched #252 Christ Church Christiansburg(CREC/Mathenia) + #2656 Harvest Mission; +new Vision Community Marsing ID, New Hope Baptist Seneca KS(Curtis Knapp-controversial), Oak Grove Paducah KY(Clay Hall), Wellspring Roseburg OR(in_transition-2024 apology), Pole Creek Candler NC. FCCF Erie PA HELD (paleo-orthodox/possible egalitarian-verify). All pro_abolition+geocoded.
- 2026-06-24: AR churches batch 5 (final church batch): +9 (FBC North Pole AK, Faith Community Bainbridge GA[Ryan Wade], Grace Fellowship Davenport IA, Calvary Chapel St Paul MN[Chikeles-dispensational+abolitionist], Trinity Baptist Oktaha OK, Dillingham Bible Fellowship AK, Abundant Life Humboldt IA[Sam Jones], Shelby Maranatha OH[dispensational], Redemption Jacksonville NC[verify]). SKIPPED/unfindable: Sola Gratia RB NV, Grace Christian Bible KS, Little Miami OH, Ekklesia Grants Pass OR, Hilltop FWB/Hope Shawnee OK (FB-only/no site), Freedom Road Ministries NC (ministry), FCCF PA (paleo-orthodox-hold), Pastor Street Church VA (=Kronz). AR church-add ~complete.
- 2026-06-24: Part 2 (org heads) - researched ~12 state abolition-org heads. Added 4 identifiable new ones to notable_figures.md (Norman Patterson/AA-CT, James Baird/Proverbs 24, Joe Goodson/Concerned Christian Citizens, Preston Andrews/SPUR) as "state/local org leaders" - all churchless activists. Rest are already-listed (Baggett/Hunter/Ascols/Pierce/Trewhella/Thomas/Storms/Deevers) or unidentifiable local activists. CONCLUSION: prominent org heads already on list; state-chapter heads mostly churchless/local.
- 2026-06-24: Part 2 COMPLETE (all ~40 AR orgs swept across 6 batches). Added org-head churches: #4063 Immanuel Baptist Pikeville KY (Wesley Russell/AA-KY), #4064 Patriot Church Knoxville TN (Ken Peters/TCAPP, CN affirm); corrected #4043 Cross & Crown -> real pastor Jason Garwood (Reconstructionist/VA Center for Public Theology, CN affirm+theonomic). Added to notable_figures.md: Garwood, Peters, Joseph Silk, Patrick Johnston (notable) + state-org leaders (Weisser/Russell/Ridge/Gorsett/Parten/Beigel/Groover/Cowperthwaite/Carey). pro_abolition=60, total 4058, map 100- 2026-06-24: Part 2 COMPLETE (all ~40 AR orgs swept, 6 batches). Org-head churches added: #4063 Immanuel Baptist Pikeville KY (Wesley Russell/AA-KY pres), #4064 Patriot Church Knoxville TN (Ken Peters/TCAPP, CN affirm). Corrected #4043 Cross & Crown -> real pastor Jason Garwood (Reconstructionist, VA Center for Public Theology, leads AA-Virginia; CN affirm + theonomic). notable_figures.md +Garwood/Peters/Joseph Silk/Patrick Johnston (notable) + state-org leaders (Weisser, Russell, Ridge, Gorsett, Parten, Beigel, Groover, Cowperthwaite, Carey). pro_abolition=60, total=4058, map 100%. Already-listed heads: Stidd(AA-IN), Trewhella(AA-WI), Baggett/Hunter/Ascols/Pierce/Thomas/Storms/Deevers.
- 2026-06-24: Closed figure-church gaps. Filled based-church stances from documented orbits: #16 Refuge (CN affirm/patriarchal/anti-woke), #19 Dominion Covenant/Kayser (CN affirm/patriarchal/FV-critical), #20 Kings Way/Partridge (CN affirm/theonomic/patriarchal), #3 Apologia Mesa (matched #251: CN sympathetic/anti_crt). #76 Grace Bible Conway pastor=Jeff Johnson (GBTS/Free Grace Press founder - added to figures). Websites: #4035 bytheword.org, #3797 firstrpcdurham.org, #4064 patriotchurch.us. #4063 Immanuel Pikeville full addr (5469 N Mayo Trail)+site+SBC, re-geocoded. REMAINING: 3 city-only addrs (#4039 East River, #4043 Cross&Crown[meets at pub], #4064 Patriot[Lenoir City, unpublished]); honest-unknown stances left blank (Speed CN/esch, Patriot zionist, Baldwin esch).
- 2026-06-24: resumed main website-first scans. Batch #580-592 (DE/FL PCA). Corrections: #580 New Covenant Lewes LEFT PCA->non-denom Reformed; #581 Redemption Red Lion = Anabaptist(LMC) not PCA (CN critical, flagged); #589 Chattahoochee dead geocities site nulled; #582 Stone's Throw renamed The Town; #588 Centerpoint Ocala rebranded Redeemer. Pastors filled (Dekker, Gibson, Betters, Dolby, Womack, Sutter, Douglas, DeBardeleben, Hayes, Charlie). researched=828.
- 2026-06-24: scans batch #593-604 (FL PCA, all covenantal defaults; pastors filled Hayse/Bartuska/Caswell/Kelso/Puckett/Brewer/Wallace/Paugh/Aitcheson/Wilcox). researched=840.
- 2026-06-24: scans batch #605-617 (FL PCA). STANDOUT #611 Coral Ridge (D.J. Kennedy legacy; Pacienza/AFPI -> CN sympathetic+anti_crt). CORRECTION #614 Cornerstone Destin left PCA (Dewey Roberts anti-FV). Website fixes #612/#613. Pastors filled. researched=852.
- 2026-06-24: scans batch #618-629 (FL PCA Covenant cluster). DELETED #626 Crossbridge Miami (egalitarian - left PCA to ordain women, per no-egalitarian rule; 0 reports). 11 PCA covenantal defaults applied (McWilliams, Klemm, Tipton, Greenwald, Boland, Barton, etc.). researched=863, total=4057.
- 2026-06-24: scans batch #630-646 (FL PCA incl. Hispanic/Korean/Brazilian PCA). All covenantal defaults; pastors filled (Salabarria, Emerick, Claassen, LaGuardia, Wise, Beam, etc.). Notes: #644 renamed Word of Life; #639 rebranding GraceLife. researched=875.
- 2026-06-25: scans batch #648-659 (FL PCA Grace/Good News cluster). All covenantal defaults; pastors filled (Sturgis, Rauls, Bradsher, Bergman, Pickett, McManigal, van Blerk, Stewart, Turner). #649=WGV campus of #648. researched=887.
- 2026-06-25: scans batch #660-677 (FL PCA). DELETED #667 Key Biscayne Presbyterian (egalitarian - Felipe Assis/Crossbridge left PCA over women ordination, EPC-bound; 0 reports). STANDOUT note: #672 Marco has Matt Papa (Getty Music) artist-in-residence; #611-tier none. 15 PCA defaults applied. CROSSED 900.
- 2026-06-25: scans batch #678-690 (FL PCA incl Korean/Chinese). All covenantal defaults; pastors filled (Burguet, Bopp, Kandt/NewCity Orlando, Cecil, Godwin, Cosner, Kim, Campbell, Groff, Chen). researched=914.
- 2026-06-25: scans batch #691-704 (FL PCA incl Korean + 5 Redeemer churches). All covenantal defaults; pastors filled (J.Kim, Hinson, Colclasure, Leon, Funyak, Cooper, Gunter, Martin, Swartz). researched=926.
- 2026-06-25: scans batch #706-718 (FL PCA). All covenantal defaults; pastors filled (Winfree, Mashburn, Hendrikse, Camera, Calderazzo, Jacobson, Cortese/Seven Rivers, Light). #716 renamed Christ Central. researched=938.
- 2026-06-25: scans batch #719-730 (FL PCA). STANDOUT-size #719 Spanish River (Cassidy; SRCP planting hub). CORRECTION #727 The Avenue = Acts 29 not PCA. Pastors filled (Cassidy, Owen, Campo, Harding, Turner, Fritz, Rice, Eusey). researched=950.
- 2026-06-25: scans batch #731-742 (FL PCA, 6 Westminster churches). All covenantal defaults; pastors filled (Gilmartin, Jeffares, Spinnenweber, Broadhurst, Holland, Hornick, Craft, Colravy, Evans, Labby). #742 Willow Creek noted Tullian Tchividjian role. researched=962.
- 2026-06-25: scans batch #746-759 (GEORGIA PCA begins). All covenantal defaults; pastors filled (Henegar, Bradley, Bruce, Myers, Russell, Thompson, Louis, Daniell, Hendrick). researched=974.
- 2026-06-25: scans batch #760-772 (GA PCA Atlanta-metro). All covenantal defaults; pastors filled (Barham, Adair, Lester, Wood, Archer, Moreland, Entrekin, Armstrong, Boland). researched=986.
- 2026-06-25: scans batch #773-788 (GA PCA). All covenantal defaults; pastors filled (Gleason, Miller, Bellino, Bryan, Jarrett, Lambert, Good, Hector, Martin, Parker). researched=998.
- 2026-06-25: scans batch #789-793 (GA First Presby). #789 Gabe Fluhrer (Reformed author); #791 First Pres Augusta (historic 1804, Woodrow Wilson boyhood church). All covenantal defaults. CROSSED 1000.
