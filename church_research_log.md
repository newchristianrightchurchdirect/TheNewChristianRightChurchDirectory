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
- 2026-06-25: scans batch #794-806 (GA PCA). All covenantal defaults; pastors filled (Miller, Myers, McClellan, Brown, Hembree, Balzer, Danner, Park, Garmany, Donovan). #801 Grace Islands pulpit vacant (Waller deposed). researched=1014.
- 2026-06-25: scans batch #808-824 (GA PCA). All covenantal defaults; pastors filled (Jacobs, Turner, Parsons, Gilbert, Johnston, May, Hawley, Bankson, King, Agan, Garland, Hendley). researched=1026.
- 2026-06-25: scans batch #825-840 (GA PCA incl Korean). CORRECTION #830 Liberty=Vanguard Presbytery not PCA; #837 wrong Canadian website fixed (newcitydtl.org). Pastors filled (Hong, Palombo, Vosseller, Lira, Morgan, Johnson, Maves, Stevenson). researched=1038.
- 2026-06-25: scans batch #841-855 (GA PCA). #847 Perimeter Church (megachurch; Norris/founding Randy Pope). All covenantal defaults; pastors filled (Albano, Weldon, A.Johnson, Cho, J.Martin, Norris, Shaw, Stakely, Horne). researched=1050.
- 2026-06-25: scans batch #856-872 (GA PCA incl Korean). All covenantal defaults; pastors filled (Causey, Bryant, Stancil, Youngblood, B.Pierce, W.Park, Smit, Saye). researched=1062.
- 2026-06-25: scans batch #873-891 (GA PCA finish + IOWA begins #890-891). All covenantal defaults; pastors filled (Leibovich, Bailey, Barton, McCarthy, Rienstra, McGinnis, Messner, Johanson, Wolfe). researched=1074.
- 2026-06-25: scans batch #893-907 (IOWA finish + ID + ILLINOIS begin). STANDOUT #893 Harvest/Sacha Walicord (anti-woke voice -> anti_crt/CN sympathetic). Rest covenantal defaults; pastors filled (Muzio, Janssen, Bankston, Stadtlander, Chaney, Herche, Jooho, A.Lee, Eppstein, Casoria). researched=1086.
- 2026-06-25: scans batch #908-920 (IL PCA). CORRECTION #917 Grace Church Lansing left PCA (2023)->non-denom. Pastors filled (Smart, Sandifer, Baker, Revlett, Bennett, Gerber, Cho, Jones, Coverstone, Rogers). researched=1098.
- 2026-06-25: scans batch #921-924 (IL PCA). CROSSED 1100. Pastors filled (M.Brown, Keithley, J.Park).
- 2026-06-25: scans batch #925-938 (IL PCA). #932 Naperville/Dane Ortlund (noted 2026 retaliation ruling). All covenantal defaults; pastors filled (Collins, Lewis, Ryan, Vroom, Ortlund, Kruger, Edburg, Henninger). researched=1113.
- 2026-06-25: scans batch #940-953 (IL finish + INDIANA begin). All covenantal defaults; pastors filled (B.Park, Nielson, J.Park, Ziegler, Dietmeier, S.Park, R.Cho, S.Jones, J.Jones, Hawkins). #941 renamed Christ Presby Roselle. researched=1125.
- 2026-06-25: scans batch #954-965 (INDIANA PCA). All covenantal defaults; pastors filled (Thomson, S.Dean, P.Cho, Davelaar, P.Wallace, R.Williams, OBannon, Straight, C.Anderson, Brice). researched=1137.
- 2026-06-25: scans batch #966-977 (IN finish + KANSAS + KENTUCKY begin). CORRECTION #967 Trinity Brownsburg left PCA (2023)->non-denom. Pastors filled (VanEck, Holroyd, Moreland, Rackley, Franks, Hough, Baxter, Thiele, Beatty). researched=1149.
- 2026-06-25: scans batch #978-989 (KENTUCKY PCA). All covenantal defaults; pastors filled (Birkett, Lawrence, Bowen, Howard/Games, Veazey, Hershberger, Terrell, S.Kim, F.Games, Randle, Gardner). researched=1161.
- 2026-06-25: scans batch #990-1003 (KY finish + LOUISIANA). CORRECTION #993 DeRidder=Vanguard Presbytery; #994 Faith/Clinton pulpit vacant (Pyles deposed); #999 John Knox renamed Covenant Reformed. Pastors filled (Hickey, Silva, Davies, Gorski, Q.Hill, Stevens, Wojohn, Cannata). researched=1173.
- 2026-06-25: scans batch #1004-1018 (LA finish + MASSACHUSETTS/CTK Boston network). #1012 CTK JP-Roxbury CLOSED (hidden); #1018 CTK Somerville renamed Seven Hills Presby; #1008 Trinity Slidell flagged (possible Vanguard). Pastors filled (Tircuit, Watkins, Gorski, B.Bernard, Azevedo, D.Rogers, B.Barnes, T.Drake). researched~1185.
- 2026-06-25: scans batch #1019-1032 (MA finish + MARYLAND begin). #1019 Citylife (Stephen Um defrocked 2024-transition). Pastors filled (Popovich, Albee, LaValley, Allebach, Oliveira, R.Collins, B.March). researched=1197.
- 2026-06-25: scans batch #1033-1044 (MARYLAND PCA). All covenantal defaults; pastors filled (Khandjian/Chapelgate, M.Roberts, Tchilinguirian, Donohue, J.Song, T.Hare, Nilsson, M.Samuel, Wikner, LoPiccolo). researched=1209.
- 2026-06-25: scans batch #1045-1057 (MARYLAND PCA). All covenantal defaults; pastors filled (C.Garriott, Capper, Armstrong, VanBemmel, J.Waller, Guyer, J.Straight, Sillaman, Knaebel, Broadwater). researched=1221.
- 2026-06-25: scans batch #1060-1072 (MARYLAND PCA) + FIX #830 (mis-attributed Aaron Lira -> he pastors Liberty Owings Mills #1064, not Liberty Sylvania GA/Vanguard). #1071 New Song/Sandtown (Mark Gornik). Pastors filled (R.Good, Massey, Boswell, Weltin, A.Lira, St.Clair, Maguire, L.Wilson, Wenger). researched=1233.
- 2026-06-25: scans batch #1073-1086 (MARYLAND PCA - finishing MD). All covenantal defaults; pastors filled (Estrada, S.A.Fix, D.Lewis, Waddell, Crutchley, D.Smith, S.Shaw, H.Kim, Ganas, Wenger II). researched=1245.
- 2026-06-25: scans batch #1087-1099 (MD finish + MAINE + MICHIGAN begin). #1087 Valley merged->Roland Run Presby; CORRECTION #1094 Christ Covenant Midland left PCA->OPC. Pastors filled (S.Bridges, Sean, Almquist, VanderMaas, Gonzales, Klett, McDermand, D.Graham, Hwang). researched=1257.
- 2026-06-25: scans batch #1100-1111 (MICHIGAN finish + MINNESOTA begin). #1106 URC East Lansing (Helopoulos; Kevin DeYoung former/PCA GA Moderator 2025). All covenantal defaults; pastors filled (Chesebro, Bratt, Korljan, C.Byrd, Saunders, Mascow, Helopoulos, Pemberton, Moseman, Brendsel, Marvel, N.Lee). researched=1269.
- 2026-06-25: scans batch #1112-1124 (MN finish + MISSOURI). #1115 Christ Our King/Tim LeCroy (racial-reconciliation wing -> sj mixed). All else covenantal defaults; pastors filled (C.Harper, Barlett, Bakerink, J.Lee, Wiersema, J.Green, Lyu, K.Kim, Madi, McLaughlin). researched=1281.
- 2026-06-25: scans batch #1125-1138 (MISSOURI/St.Louis PCA). #1129 Memorial left PCA 2022 (Greg Johnson/Revoice -> side_b); #1131 New City Fellowship (racial-reconciliation -> sj mixed); #1135 Providence/Jeff Meyers = FEDERAL VISION (FV affirm/theonomy symp/postmill); #1138 South City (sj mixed, presbytery inquiry). researched=1293.
- 2026-06-25: scans batch #1139-1150 (MO finish + MISSISSIPPI begin). All covenantal defaults; pastors filled (D.Stain, C.Polski, R.St.John, Mabbott, B.Davis, J.Dawson). CROSSED 1300.
- 2026-06-25: USER EXCLUSION update. DELETED #1129 Memorial Presbyterian (Side B/Revoice, Greg Johnson, left PCA 2022) + #1115 Christ Our King (Tim LeCroy, National Partnership/racial-reconciliation progressive wing - non-fit). NEW STANDING RULE: Side B/Revoice churches -> hard delete (not just mark side_b); progressive-wing/National-Partnership churches -> delete as non-fit. KEPT #1121 First Korean St Louis (standard conservative Korean PCA - fits). FLAGGED for user: #1131 New City Fellowship + #1138 South City (sj=mixed) - confirm before deleting. total=4054, researched=1299.
- 2026-06-25: per user confirm, DELETED #1131 New City Fellowship + #1138 South City Church (St Louis progressive socialJustice=mixed non-fits, same rationale as #1115 LeCroy). total=4052, researched=1297.
- 2026-06-25: non-fit sweep of full DB (stance fields + denomination + note keywords). DELETED #37 Word of Life/Brian Zahnd (progressive post-evangelical, sj=affirming, anti-CN/anti-Zionism). Sweep otherwise CLEAN: false-positive keyword hits #109 Eastside Baptist (Paul Thompson abolitionist) + #3797 First RPC Durham (Rosaria Butterfield, anti-Side-B) are strong FITS. Flagged borderline #3310 Warm Springs (EPC - permits women ordination) for review. total=4051.
- 2026-06-25: #3310 Warm Springs (EPC) review RESOLVED -> KEEP. Postmillennial, male pastor (Marty Fields), no egalitarian/affirming signal; EPC women-ordination is local-option and unused here -> fits. Non-fit sweep complete: only #37 (Zahnd) was a true non-fit. DB now clean of side_b/affirming/egalitarian/mainline/progressive non-fits.
- 2026-06-25: scans batch #1151-1168 (MISSISSIPPI PCA). All covenantal defaults; pastors filled (McLeod, Plunk, Winebrenner, Almy, R.Dean, T.Shields, Hammett, Starnes, Frierson, Arkema). researched=1308.
- 2026-06-25: scans batch #1171-1184 (MISSISSIPPI First Presbyterian cluster). #1177 FPC Jackson = flagship PCA (D.Strain/Ligon Duncan, ~3100) - strong fit; #1179 Crystal Springs pulpit vacant (Willett deposed/convicted 2025); #1176 Lexington pastor unconfirmed (Devenish is at Kosciusko #1180). All covenantal defaults. researched=1320.
- 2026-06-25: scans batch #1186-1200 (MISSISSIPPI PCA - FPC/Grace cluster). All covenantal defaults; pastors filled (Chase, C.Marks, Coburn, R.Collins, Accardy, J.Wheat III, Brandon). researched=1332.
- 2026-06-25: scans batch #1204-1220 (MISSISSIPPI PCA). All covenantal defaults; pastors filled (H.S.Won, Larroux, R.Owens, B.Bradford, R.Rhea, Suber, C.Jones, L.Jones Jr.). researched=1344.
- 2026-06-25: scans batch #1223-1250 (MISSISSIPPI PCA). All covenantal defaults; pastors filled (Josh, Kiple, Codling, Cangelosi, J.McLeod, Ribelin, Salinas, Kayser, Driggers, McGowan, Bullock). #1243 Redeemer Jackson (Elbert McGowan, multiethnic but mainstream-conservative) KEPT as fit. researched=1356.
- 2026-06-25: scans batch #1251-1266 (MISSISSIPPI finish + MONTANA begin). All covenantal defaults; pastors filled (Windham, Reiber, D.Irving, A.Britton, A.Scott, L.Pierson, J.Charette). researched=1368.
- 2026-06-25: scans batch #1267-1280 (MONTANA finish + NORTH CAROLINA begin). CORRECTION #1271 Antioch Goldsboro now ARP (not PCA). #1277 Christ Central Charlotte + #1278 Durham (multiethnic, mainstream-conservative) KEPT. All covenantal defaults; pastors filled (L.Wolfe, B.Clark, Strebeck, N.Wilks, T.Myles, D.Mason, Troutman, J.Miller). researched=1380.
- 2026-06-25: scans batch #1281-1292 (NORTH CAROLINA PCA). #1282 Christ Covenant Matthews = Kevin DeYoung (flagship). CORRECTION #1292 Countryside Cameron = Vanguard Presbytery (not PCA). All covenantal defaults; pastors filled (B.Peters, DeYoung, Gabe, D.Osborne, C.Barrett, Mumpower, A.Silman, D.Kinney). researched=1392.
- 2026-06-25: scans batch #1293-1308 (NORTH CAROLINA PCA). All covenantal defaults; pastors filled (S.Mirich, S.McCann, C.Berry, McQuitty, M.Thompson, C.Starnes, Gillikin). researched=1404.
- 2026-06-25: scans batch #1309-1323 (NORTH CAROLINA PCA - Grace cluster). All covenantal defaults; pastors filled (J.Krestar, B.Drake, McCullough, J.Inman, E.Oldham, Lafferty, Sofield). researched=1416.
- 2026-06-25: scans batch #1324-1335 (NORTH CAROLINA PCA). All covenantal defaults; pastors filled (Svendsen, Colvard, Schubert, Petterson, Deneen, Womack, Hope Community multi-site, McAulay). researched=1428.
- 2026-06-25: scans batch #1336-1351 (NORTH CAROLINA PCA). CORRECTION #1336 Landis Marion now OPC. All covenantal defaults; pastors filled (Serafini, T.Cox, Troutman, Sayour, L.Williams, Byers, Hong, G.Purdy, Darville, B.Brown). researched=1440.
- 2026-06-25: scans batch #1352-1365 (NORTH CAROLINA PCA). CORRECTION #1353 Providence Fayetteville (Andy Webb) PCA->ARP 2020. All covenantal defaults; pastors filled (D.Hina, M.Weathers, Hansen, D.Seale, Pfeiffer, K.Skogen, J.Black, D.King). researched=1452.
- 2026-06-25: scans batch #1366-1381 (NORTH CAROLINA finish + NEBRASKA begin). All covenantal defaults; pastors filled (B.Barcley, Burrell+Pak, H.Webb, J.Hutchinson, Olshefski, M.Whipple, G.Thompson, A.Raynor, E.Tonjes). researched=1464.
- 2026-06-25: scans batch #1382-1393 (NEBRASKA finish + NEW HAMPSHIRE begin). All covenantal defaults; pastors filled (B.Loos, Eberspacher, T.Bowen, J.Gerber, M.Odum, S.Kerns, I.Hard, J.Wakefield, J.Taylor). researched=1476.
- 2026-06-25: scans batch #1394-1408 (NH finish + NEW JERSEY begin). #1405 Fairfield/Fairton = founded 1680, oldest existing PCA congregation. All covenantal defaults; pastors filled (A.Wilson, D.Chi, T.Harr, Bernardes, Sterling, B.Orner, Friederichsen, Skeele, C.OBrien, S.Lee). researched=1488.
- 2026-06-25: scans batch #1410-1424 (NEW JERSEY PCA). #1421 New City Fellowship AC (racial-reconciliation network, same brand as deleted #1131) -> sj mixed, FLAGGED for user. #1424 Princeton Meadow MERGED into Liquid Church (non-denom) 2021 -> hidden. All else covenantal defaults. CROSSED 1500.
- 2026-06-25: per user, DELETED #1421 New City Fellowship of Atlantic City (racial-reconciliation network non-fit) + #1424 Princeton Meadow (merged into Liquid Church non-denom). total=4049, researched=1498.
- 2026-06-25: scans batch #1425-1436 (NJ finish + NEW MEXICO begin). STANDOUT #1429 Bryce Avenue/Zachary Garris (Masculine Christianity/New Christendom Press/American Reformer) -> CN affirm/patriarchal/postmill/anti_crt. #1431 Crossroads renamed City Presbyterian. CORRECTION #1435 Providence ABQ = Bible Presbyterian Church (BPC), not PCA -> premill/zionist. researched=1510.
- 2026-06-25: scans batch #1437-1450 (NM finish + NEVADA + NEW YORK begin). All covenantal defaults; pastors filled (D.Smith, T.Posey, Spanjer, Reinmuth, Kytka, D.Wells, D.Wong). researched=1522.
- 2026-06-25: scans batch #1451-1466 (NEW YORK PCA). #1452 Duanesburg (organized 1795), #1457 FPC Schenectady (1760), #1466 Monsey (1824) - historic. CORRECTION #1458 Unionville = BPC (Doug Douma/Gordon Clark biographer). FLAG #1453 Emmanuel NYC (PCA vs PCUSA - verify). researched=1534.
- 2026-06-25: scans batch #1467-1482 (NY finish + OHIO begin). #1475 Redeemer NYC = Keller flagship (kept). FLAG #1468 New Life Ithaca = Tim LeCroy (same figure as deleted #1115) -> sj mixed, review_nonfit. All else covenantal defaults. researched=1546.
- 2026-06-25: scans batch #1483-1495 (OHIO PCA). STANDOUT #1483 Christ the Word/David Bayly (Warhorn Media/BaylyBlog; patriarchy/anti-woke) -> patriarchal/anti_crt/CN-sympathetic. #1495 New City Hilliard DISSOLVED 2023 -> hidden. All else covenantal defaults. researched=1558.
- 2026-06-25: scans batch #1496-1508 (OHIO finish + OKLAHOMA begin). #1505 Christ Presby Tulsa (Jeremy Fair deposed 2023; Jason Bobo interim). FLAG #1508 City Pres OKC/Doug Serven (Heal Us Emmanuel; progressive wing) -> sj mixed, review_nonfit. All else covenantal defaults. researched=1570.
- 2026-06-25: scans batch #1509-1521 (OKLAHOMA finish + OREGON begin). All covenantal defaults; pastors filled (Rodriguez, Van Hooser, Philliber, R.Jones, S.Murphy, B.Altman, E.Costa, Awtry, G.Joines). researched=1582.
- 2026-06-25: scans batch #1522-1535 (OREGON finish + PENNSYLVANIA begin). All covenantal defaults; pastors filled (A.Parker, Bechtel, A.Morris, B.Buck, J.Won, C.Hooper, J.Macha, Hollenbach, A.Gomez, A.Garber). #1525 Intown flagged verify_stance (BaylyBlog criticism). researched=1594.
- 2026-06-25: scans batch #1536-1542 (PENNSYLVANIA PCA). All covenantal defaults; pastors filled (M.Purdy, T.Stein, J.K.Choi, J.Coyer, M.Herzer, E.Huber). CROSSED 1600.
- 2026-06-25: per user, DELETED #1468 New Life Ithaca (Tim LeCroy, progressive wing) + #1508 City Pres OKC (Doug Serven, racial-reconciliation) + #1453 Emmanuel NYC (PCUSA/mainline). total=4046, researched=1598.
- 2026-06-25: scans batch #1544-1555 (PENNSYLVANIA PCA - Philly/Pittsburgh metro). All covenantal defaults; pastors filled (R.Egli, Koerber, B.Haines, J.Price, Muhlfeld, S.Huber, J.Leonard, Goneau, Quillen). researched=1610.
- 2026-06-25: scans batch #1556-1568 (PENNSYLVANIA PCA). CORRECTIONS: #1556 location AL->Darlington PA; #1560 Malvern pastor (was conflated w/ Quarryville #1563). #1565 FRPC Pittsburgh (est. 1800); #1566 Everhard (Reformed YouTuber). All covenantal defaults. researched=1622.
- 2026-06-26: scans batch #1569-1580 (PENNSYLVANIA PCA). #1573 Greene Valley (founded 1775). FLAG #1569 Grace&Peace Pittsburgh (PCA vs EPC verify). All covenantal defaults; pastors filled (Travis, Freed, Derreth, Massey, Kertland, D.Miller, S.Wilson, S.Brown, Pesnell). researched=1634.
- 2026-06-26: scans batch #1581-1593 (PENNSYLVANIA PCA - Philly/Pittsburgh). #1592 Middlesex (est. 1799). All covenantal defaults; pastors filled (D.Kwon, C.Kennedy, A.Armel, D.Stone, S.Huber, S.Crosby, D.Henderson, M.Benfer, K.Bowen, J.Leist). researched=1646.
- 2026-06-26: scans batch #1595-1606 (PENNSYLVANIA PCA). FLAG #1595 New City Fellowship Lancaster (Nabors racial-reconciliation network; 3rd one, prior 2 deleted) -> sj mixed, review_nonfit. All else covenantal defaults; pastors filled (B.Hartman, J.Howard, Julien, R.Lutz, M.Fisher, E.Swanson, J.Nelson, D.Kiehl, J.Orlando). researched=1658.
- 2026-06-26: scans batch #1607-1618 (PENNSYLVANIA PCA - Philly/Pittsburgh/Korean+Chinese). #1615 Providence Pittsburgh (1st PCA church N of Mason-Dixon, 1975). All covenantal defaults; pastors filled (Y.Hu, S.H.Lee, Holmlund, D.White, Kenyon, Pesci, Falconer, De Bruin, V.Wood, Fodale, Cottone). researched=1670.
- 2026-06-26: scans batch #1619-1631 (PENNSYLVANIA PCA). #1625 Rock of Israel (Messianic but covenantal/CHAIM -> zionist no); #1630 St. Stephen (est. 1732; Tim Witmer). All covenantal defaults; pastors filled (D.Dunn, S.Gale, Kieffer, Crofutt, D.Yoo, D.Skinner, F.Klett, S.Fleming, P.Rowan, R.Marshall, DiNardo, K.H.Yeon). researched=1682.
- 2026-06-26: scans batch #1632-1643 (PENNSYLVANIA PCA). #1633 Tenth Presbyterian = flagship (Boice heritage; J.Gibson incoming 2026). All covenantal defaults; pastors filled (T.Stephens, D.Schrock, J.Hayward, J.Havener, S.Nolan, M.Miller, M.Howard, D.Ledford, C.Walker, Le Duc). researched=1694.
- 2026-06-26: scans batch #1644-1652 (RHODE ISLAND finish + SOUTH CAROLINA begin). #1650 Bethel/Clover (1764, oldest in York Co); #1651 Blue Ridge/Greer = Dr. Renton Rathbun (BJU Center for Biblical Worldview, anti-woke) -> sj anti_crt. All else covenantal defaults. CROSSED 1700.
- 2026-06-26: scans batch #1654-1669 (SOUTH CAROLINA PCA). #1658 Christ Church Mt Pleasant/Jon Payne (Gospel Reformation Network) -> sj anti_crt; #1661 Church Creek/Nick Batzig (Ligonier). All else covenantal defaults; pastors filled (S.Dinkins, P.Sanders, M.Dixon, Batzig, Davenport, Gentino, A.Newell, D.Preston). researched=1713.
- 2026-06-26: scans batch #1670-1681 (SOUTH CAROLINA PCA). #1675 Fairview/Fountain Inn (founded 1786, National Register). All covenantal defaults; pastors filled (D.Story, D.Cohee, A.Shields, E.Mullis, J.Gallo, J.Irwin, McCallister, M.Martin, D.Hall). researched=1725.
- 2026-06-26: scans batch #1683-1694 (SOUTH CAROLINA PCA). #1694 Hilton Head Presby now operates as Christ Redeemer Presbyterian (renamed). #1683 First Scots Beaufort PCA (vs PCUSA First Scots Charleston). All covenantal defaults; pastors filled. researched=1737.
- 2026-06-26: scans batch #1695-1708 (SOUTH CAROLINA PCA). #1707 Mitchell Road (1000+ communicants, Calvary). #1708 Mt Calvary has Spanish-lang Monte Calvario. All covenantal defaults; pastors filled where confirmed (J.Anderson, J.Stephenson, R.Hughes, M.Coplin, J.O.Butler, J.Johnson, J.Webb, J.Hope, J.Schley). researched=1749.
- 2026-06-26: scans batch #1712-1726 (SOUTH CAROLINA PCA). #1720 Oakbrook->Oak Community Church (renamed 2022). #1719 Northeast Columbia ~900 mem. #1726 Redeemer Charleston (historic downtown). All covenantal defaults; pastors filled where confirmed. researched=1761.
- 2026-06-26: scans batch #1727-1739 (SOUTH CAROLINA). #1729 Reedy River CORRECTED PCA->Bible Presbyterian (BPC), Conestee. #1736 Sandol = Korean PCA (Living Stone, kept). #1739 Second Presby Greenville = Dr. Richard D. Phillips (ACE chairman, Reformed Expository Commentary; standout). #1728 Reedy Creek had Dr. Douglas Kelly 1994-2023. researched=1773.
- 2026-06-26: scans batch #1740-1754 (SOUTH CAROLINA). #1744 Trinity Spartanburg CORRECTED PCA->Evangel Presbytery (left PCA 2019; Dionne/Bayly orbit -> patriarchal+anti_woke). #1751 Watershed=Kevin Thumpston (resolves #1704). All else PCA covenantal defaults. researched=1785.
- 2026-06-26: scans batch #1755-1768 (SC tail + SOUTH DAKOTA + TN start). SD all PCA Siouxlands. #1768 Bridwell Heights/Patrick Hines (apologist; denom flagged PCA vs Christ Reformed Presbyterian). #1765 All Saints Brentwood (Nashville Presby plant). researched=1797.
- 2026-06-26: scans batch #1770-1781 (TENNESSEE PCA, Nashville/Franklin/Knoxville belt). #1774 Christ Pres Nashville: Sauls(2023)->Paul Goebel(2026). #1771 Christ Community Franklin: founded by Scotty Smith, now David Cassidy. #1778 Cornerstone/Nate Shurden (reformation21/ACE). #1779 Covenant Nashville (Covenant School). All covenantal defaults. researched=1809.
- 2026-06-26: scans batch #1782-1794 (TENNESSEE). #1785 Eastern Heights Bristol CORRECTED PCA->Vanguard Presbytery (founding member). #1791 First Pres Chattanooga = Gabriel Fluhrer (ex-Ligonier). #1788 Evergreen/Wes White (confessional). All else PCA covenantal defaults. researched=1821.
- 2026-06-26: scans batch #1795-1807 (TENNESSEE). #1806 IPC Memphis = Dr. Sean M. Lucas (RTS church historian, standout). #1801 Grace Reformed Greeneville flagged BPC vs PCA. #1807 Korean Sarang Knoxville (split over sexuality, conservative side). Donnelly/Step Morgan Grace disambiguated. researched=1833.
- 2026-06-26: scans batch #1808-1822 (TENNESSEE). #1815 New City Fellowship Chattanooga = Nabors racial-reconciliation NETWORK FLAGSHIP -> FLAGGED review_nonfit for user deletion decision (mother church of deleted #1131/#1421 + flagged #1595). #1808 Lookout Mountain Presby (Brian Salter). #1819 Red Bank=Jason Hood (NT scholar). researched=1845.
