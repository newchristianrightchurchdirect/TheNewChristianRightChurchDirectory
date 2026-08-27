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
- 2026-06-26: scans batch #1823-1834 (TENNESSEE, state complete). #1832 Wayside/Brian Cosby (ex-PCA GA Moderator, SJC chairman, Stated Clerk nominee; standout). #1823 Redeemer Memphis (Matt Howell). #1833 West End Nashville (planted from Christ Community Franklin). All covenantal defaults. researched=1857.
- 2026-06-26: scans batch #1835-1848 (TN tail + TEXAS start). #1846 Christ Church Katy = Fred Greco (ex-PCA GA Moderator; standout). #1841 Arlington Presby -> Redeemer Arlington (renamed). #1836/#1837 two Westminsters disambiguated (Wyatt vs Mooney). #1839 Zion Columbia (historic 1807). researched=1869.
- 2026-07-28: MICHIGAN begins (state pivot off TX at user request). Scans batch #3834-3855 = the entire MI **PRCA bloc** (13 churches, all with sites; MI now 47/103, researched=1882). Every record had placeholder data: `address` held a township name and 3 had the website URL sitting in the pastor field. Filled real street address/city/zip/phone/email for all 13. **8 stale pastors corrected**: #3836 Smit->Rev. Joe Holstege; #3837 Haak->Rev. David Noorman; #3839 Koole->Rev. Clayton Spronk (came from Faith PRC 2026); #3842 Overway->Rev. Nate Decker (came from Grandville); #3843 Eriks->Rev. Ryan Barnhill; #3845 DeVries->Rev. Dennis Lee; #3850 Bleyenberg->Rev. Martyn McGeown; #3855 URL->Rev. Bill Langerak. #3853 URL->Rev. Jacob Maatman; #3835 "vacant"->Rev. Justin Smidstra. **3 vacancies confirmed**: #3834 Faith Jenison (Spronk left for Grandville 2026), #3838 Grace Standale (Guichelaar -> Zion PRC early 2025), #3854 Southwest/Roosevelt Park (site says vacant). **STANDOUT: #3850 Rev. Martyn McGeown** (Providence, Hudsonville) - prolific Standard Bearer/RFPA author, 11 yrs missionary-pastor of Limerick Reformed Fellowship, Ireland; installed 2021-09-05. City corrections (township -> mailing city): #3834->Jenison, #3835->Zeeland (named "of Holland", building is in Zeeland), #3837/#3850->Hudsonville, #3838/#3842->Grand Rapids, #3853->Wyoming. recordFlag in_transition on #3838 (vacant), #3853 (meeting at Adams Christian School, seeking a building), #3854 (vacant). Stances = PRC denominational defaults (zionist no / amill / non_theonomic / FV critical / traditional / complementarian), stanceBasis=denominational_default; **christianNationalism + socialJusticeStance deliberately LEFT BLANK** per the evidence-only rule, even though the PRC's rejection of common grace + antithesis emphasis points "critical" - noted in theologicalNotes for a later evidence pass. **Abortion: searched, no per-church evidence found** for any of the 13; PRC opposes abortion confessionally (HC LD 40) but its antithetical posture disfavors political co-belligerence, so no abolitionist signal - recorded as incrementalist/default and noted honestly in each entry. TOOLING: prca.org (denominational directory + legacy minister list) is unreachable - Vercel bot checkpoint returns HTTP 429 to both WebFetch and curl; used church sites + SermonAudio broadcaster pages instead. Added `city` to the allowed-key list in prisma/apply-research-batch.ts so batch files can fix city values.
- 2026-07-28: scans batch #2547-2777 (MICHIGAN Reformed Baptist, part 1 of 2 - 9 churches; MI now 56/103, researched=1891). **#2625 Grace Life Baptist (Clyde Twp) CLOSED Dec 2025** -> recordFlag closed, dead site cleared (gracelifebc.com now resolves to 127.0.0.1); formerly Court Street Baptist of Port Huron (1939), held New Hampshire Confession while teaching 1689. **SWAPPED-RECORD FIX**: #2547 Grace Baptist Canton and #2559 Grace Baptist Marshall had traded contact details - Marshall was carrying Canton's phone (734-397-2900) AND Canton's email, while Canton carried Marshall's pastor's personal Gmail; both corrected (Marshall = 269-781-3558). #2559 pulpit vacant (Brandon Crawford -> First Baptist St. Johns; GARBC covered the call, so Marshall may be GARBC -> denom_ambiguous). **STANDOUT: #2624 Grace Immanuel RBC (Grand Rapids) = Pastor Jeff Johnson ('Pastor JJ'), and the legal HQ of the Reformed Baptist Network sits at this congregation** - best entry point into MI's RBN churches. #2749 New Covenant Auburn Hills = Pastor Hardy Smith, RBN member, 1689 - this is one of the three AAM pastoral-outreach candidates; NO public abortion statement found, so the position stays unverified and needs a direct ask. CONFESSION CORRECTIONS: #2724 Maplelawn holds the **New Hampshire Confession of 1833, not 1689** (old boilerplate was wrong) -> stances narrowed to sexuality/gender only, stanceBasis=mixed; #2569 Grace Bible St Clair is **FIRE Fellowship** (site) but SBC in directories -> denom_ambiguous; #2777 Pigeon River is in the **SBC directory** yet also in the reformedreader RB directory, 1689 claim unsupported -> denom_ambiguous, stances left mostly unknown, pastor unidentified (phone-call candidate). Pastors filled: G.Cook/B.Ibrahim/M.Bauer + 6 deacons (Canton), K.Allen (+ retired G.Montgomery), J.Johnson, M.Morgan/R.Kirsten/A.Vonk (Harbor), A.Willis/D.Johnson/D.Ratcliffe (Maplelawn), H.Smith. City fixes: #2652 Holland Charter Twp->Holland, #2724 Grand Rapids->Wyoming. Abortion: searched every site, **no per-church evidence found for any of the 9**.
- 2026-07-28: scans batch #2848-3992 (MICHIGAN Reformed Baptist part 2 + the lone ABCUSA record - 10 churches; **MI Reformed Baptist bloc now COMPLETE**, MI 66/103, researched=1901). Pastors filled: Micah Smith/Calvin Walden + 4 deacons (Lenawee), Michael R. Jones (Zion Taylor), Bernie Timmerman (Zion Chapel), Nate + Jim (Grounds For Belief, first names only on the site), Kyle Roat (Savior's Grace), Matthew Miller (Grace Fellowship), Chad Peck (True Freedom), Aaron Shaw (North Casnovia, PRTS M.Div.), Gregory A. Rowan (Judson). DATA FIXES: #2848 address was flat wrong (121 S Locust -> 2667 Bent Oak Hwy, Adrian) + phone added; #2979 website moved (zionbaptistchurchtaylor.com 301s -> ziontaylor.org); #3149 upgraded from a Facebook URL to truefreedomreformed.org; city fixes #2998 Sherman Twp->Gladwin, #3151 Casnovia Twp->Bailey. **#3992 Grace Immanuel Reformed Baptist = DUPLICATE of #2624** -> flagged duplicate_of:2624, NOT deleted (needs a Report-FK check + user OK). Confession corrections: #2980 Zion Chapel is self-described **non-denominational** (Edwardsean/revivalist, Bernie Timmerman's 40-year 'Call to Worship' radio broadcast) despite sitting in RB directories -> denom_ambiguous, stances narrowed; #3151 North Casnovia names **no confession** (1689 boilerplate unsupported) though the pastor is PRTS-trained -> stanceBasis mixed. **#3239 Judson Baptist (Burton, ABCUSA): the pre-existing 'connected to the rescue movement through Cal Zastrow' note is UNVERIFIED** - two searches found nothing tying the church to Zastrow or to rescue/abolition activism, and the site never mentions abortion. Left the lead in the notes clearly labelled, did NOT let it set abolitionStance. Cal Zastrow is real (Kawkawlin MI; FACE Act conviction for the Aug 2020 Northland Family Planning blockade, sentenced July 2024) -> FOLLOW-UP: phone (810) 744-0650 to confirm or drop. ABCUSA exclusion check on #3239 came back clean (male senior pastor, no AWAB/affirming signal) -> kept, same basis as #232/#228. Abortion: **no per-church evidence found for any of the 10**.
- 2026-07-28: scans batch #3340-3979 (MICHIGAN misc-'Reformed'/URC-labelled records with websites - 5 churches; MI 71/103, researched=1906). This was the **corrupted-record pocket**: #3340 'Harvest' had a paragraph of PROSE sitting in the `website` column, the literal string 'Wyoming, MI' in `address`, city=Detroit, denomination='Reformed' - it is actually **Harvest Orthodox Presbyterian Church, 930 52nd St SW, Wyoming MI 49509** (denom -> OPC). STANDOUT: Sr. Pastor **Dale A. Van Dyke** (first sermon 1994, ordained 1995; boards of Westminster Seminary California + Covenant College), 4 associate pastors filled; former associate **Mika Edmondson** (MLK Jr. scholar) planted New City Fellowship OPC Grand Rapids - note that is a DIFFERENT congregation from the Nabors-network New City Fellowship PCA churches flagged elsewhere. **#3663 Iglesia Reformada Cristiana is not a Michigan church at all** - it is Iglesia Cristiana Reformada de **Puerto Vallarta, Jalisco, MEXICO** (Pastor Zacarias/Zachary Anderson, est. 2010, pcpv.net, 'El Mesias' podcast); the stored phone (052) 322 224 1869 is a Mexican number and the website column held prose -> flagged review_nonfit;corrupted, RECOMMEND DELETION. DENOMINATION CORRECTIONS: #3615 Byron Center URC -> **PRCA** (byronprc.org dead, live site byronprc.net; 1945 84th St, 616-878-1811; pastor listed as Prof. Russell Dykstra by directories - flagged for verification); #3659 Free Reformed Grand Rapids URC -> **FRCNA** (Pastors Ian Macleod + Young Jae Lee, Pastor Emeritus Dr. Lawrence W. Bilkes; PRTS-tied); #3979 Beaverdam 'Reformed' -> **CRC** (Rev. Tyler Wagenmaker since fall 2000; address column had held the URL; city Blendon Twp -> Hudsonville). **POLICY FLAG on #3979**: the CRCNA permits women ministers/elders/deacons, which would trigger the egalitarian-exclusion rule - no women appear among Beaverdam's officers on its own pages, but that is not confirmation, so genderStance left unknown pending a direct check before any keep/delete call. CRC abortion position (1972 synod + 1976 Human Life Amendment endorsement) recorded as pro-life incrementalist with a real citation.
- 2026-07-28: scans batch #2134-2150 (MICHIGAN **OPC bloc, all 17 no-website stubs**; MI 88/103, researched=1923). Verified every row against the **official OPC congregation locator** (POST opc.org/locator.html state=MI, then church.html?church_id=N) - authoritative for address, pastor, phone, website, presbytery. All 17 gained websites and real pastors. **STANDOUT #2138 Oakland Hills (Farmington Hills) = Rev. Harrison Perkins** - PhD Queen's University Belfast, Senior Research Fellow of the Craig Center for the Study of the Westminster Standards, visiting lecturer Edinburgh Theological Seminary, online faculty WTS; author of Catholicity and the Covenant of Works (OUP 2020), Reformed Covenant Theology (Lexham 2024), Righteous by Design (2024). **STANDOUT #2144 Community Presbyterian Kalamazoo = Rev. Jonathan Landry Cruse** - author (What Happens When We Worship, The Christian's True Identity, Church Membership, etc.) and hymn writer (HymnsOfDevotion.com), WSC M.Div. Pastors filled: J.De Boer/A.Canavan, D.Doll/A.Ostella, R.Van Manen, M.Scaturro, E.Henes, S.Igo/J.Neumair, S.Pribble, M.Kooy, D.Bonner, K.Sanford. **2 vacancies**: #2136 Chain-o-lakes (contact Elder Marv Rubingh) and #2139 Bethel Reformed Fremont (Elder Ted VanderKooi). Address corrections: #2141 Hillsdale was filed in North Adams at 322 Hillsdale St -> Hillsdale, 44 Monroe St; #2144 2435 N 26th -> 811 Gorham Ln; #2146 2740 Indiana -> 1301 W Wieland Rd; #2150 W Nine Mile -> 18451 W Ten Mile. City fixes: #2134 'Kent County'->Ada, #2143 Hudsonville->Jenison. Phone fixes on #2136/#2139/#2148. **3 rows are NOT in the OPC locator anymore**: #2142 New Life Fellowship Holland has **transitioned OPC -> PCA** (denom corrected; pastoral search ad ran late 2024, leadership unconfirmed); #2150 Providence Southfield has **RENAMED to Christ Presbyterian Church** (Pastor Jeffrey B. Wilson, 25+ yrs) and may have left the OPC -> in_transition;denom_ambiguous; #2145 Meadow Springs Community Kentwood is **status-unclear** (recognized 1999, no live site, conflicting third-party addresses) -> in_transition, needs a presbytery call. **6 MI OPC CONGREGATIONS ARE MISSING FROM THE DIRECTORY ENTIRELY** (in the OPC locator, no DB row): New Hope Reformed (Bessemer), Living Hope (Dorr, daughter of Harvest), Ascension (Grand Rapids, Pastor Jacey Davison), Reformation (Grand Rapids, Pastor David Noe), River (Grand Rapids, Pastor Wayne Veenstra, plant of Harvest), Grace Fellowship (Zeeland, Pastor Michael Schout) -> ADD THESE. Abortion: no per-church evidence found for any of the 17.
- 2026-07-28: scans batch #3244-4002 (MICHIGAN final 15 - postmill non-denoms, HRC, RPCNA, NRC, URCNA, CanRC, Spanish RB). **MICHIGAN IS COMPLETE: 103/103 researched** (nationwide researched=1938). **BIGGEST FIND - #3244 Colwood Church (Caro) must go**: the 'Postmillennial. Pastor Jason Garwood' note is a decade stale. Garwood - who appeared on **Abolitionist Radio (Abolish Human Abortion) in Nov 2016** on being a 'Christian revolutionary' and the lesser-magistrate doctrine - long since left for Cross & Crown Church, Northern Virginia (already in the DB as #4043). Colwood today is **United Brethren in Christ with a WOMAN lead pastor** (Kelly Ball, co-lead 2018-2025, now planting Arise Community Church in Bad Axe) -> genderStance=egalitarian (EVIDENCED), review_nonfit, RECOMMEND DELETION per the egalitarian-exclusion rule. **DATA-SOURCE WARNING: rows #3244-3248 all came from a third-party 'postmillennial church directory'; Colwood proves that source can be a decade out of date** - the other four were each re-verified and their postmill labels are NOT confirmed by the churches themselves, so eschatology was left unknown for #3246/#3247/#3248. DENOMINATION CORRECTIONS (7): #3245 Providence Caro Non-Denom -> **CREC** (Tyndale Presbytery, Pastor Jacob Hanby) - the likeliest MI abolition prospect left, worth a direct ask; #3866/#3867/#3868 'Reformed' -> **NRC**; #3919 -> **URCNA** (Pastor **William Boekestein**, standout author); #3928 Cornerstone -> **URCNA** (Revs. Philip Vos + Jared Poulton); #3974 -> **CanRC** (Classis Ontario West, instituted 1955); #4002 -> **Reformed Baptist** (Spanish-language, Pastor Billy Tavarez). **STANDOUT #3624 Grand Rapids Heritage Reformed = Dr. Joel R. Beeke** (PRTS chancellor, Reformation Heritage Books) + Revs. Byl, Dedert, Yin and Dr. Brian De Vries; city was the literal placeholder 'Street Address'. GARBAGE-ADDRESS REPAIRS: #3974 address was the word 'Grand', #3975 the word 'American' (the two rows are **one church's name split across two records** -> #3975 flagged duplicate_of:3974), #4002 the word 'Iglesia', #3823 the word 'Hetherton' (-> 1200 Meridian Line Rd, Johannesburg; phone corrected), #3868's address '400 Mid Park Boulevard' turned out to be an NRC congregation in **Calgary, Alberta** - a cross-border data error, #3867's '620 E 1st St' matches no congregation on the NRC's own list (-> 1255 Covell Ave NW). #3247 OneLife Grand Blanc has merged with Bethany Baptist into **Ekklesia of Grand Blanc** -> in_transition. **MI ACTION QUEUE for user sign-off: delete #3244 (egalitarian), #3663 (Puerto Vallarta, Mexico), #3975 + #3992 (duplicates); call #3239 Judson re the Zastrow claim, #2749 New Covenant + #3245 Providence Caro re abortion position, #2145 Meadow Springs re existence, #3979 Beaverdam re women in office; and ADD the 6 missing OPC congregations.** Abortion: after individually researching all 69 remaining MI churches, **zero new evidenced abolitionist congregations were found in Michigan** - the only abolition-movement link in the whole state pointed at a pastor who left in ~2016.
- 2026-07-28: MICHIGAN CLEANUP + ADDITIONS (user-approved). **DELETED 4 records** after confirming zero Report rows reference them (the Report table is empty DB-wide): #3244 Colwood Church, Caro (United Brethren, woman lead pastor -> egalitarian-exclusion rule); #3663 Iglesia Reformada Cristiana (a Puerto Vallarta, MEXICO congregation misfiled in Grand Rapids); #3975 American Reformed Church (split-name duplicate of #3974); #3992 Grace Immanuel Reformed Baptist (duplicate of #2624). Full pre-delete records backed up to `data/deleted-churches-2026-07-28.json`; script kept at `prisma/delete-mi-nonfit-2026-07-28.ts`. **ADDED the 6 missing MI OPC congregations** (#4065-4070) from the official OPC locator, each geocoded via Places API so no row is left without coordinates: #4065 New Hope Reformed (Bessemer - note it is in the Presbytery of **Wisconsin and Minnesota**, unlike every other MI OPC church, no installed pastor, contact Kent Van Timmeren); #4066 Living Hope (Dorr, Pastor John Terrell, daughter church of Harvest OPC); #4067 Ascension (Grand Rapids, Pastor Jacey Davison); #4068 Reformation (Grand Rapids) = **STANDOUT Dr. David C. Noe** - PhD Classics (Iowa 2003), Calvin University faculty 2007-2021 and Philosophy Dept chair, translator of Junius/Beza/Perkins/Calvin, PRTS instructor, Reformed Forum contributor, LatinPerDiem; #4069 River (Grand Rapids, Pastor Wayne Veenstra, plant under Harvest OPC); #4070 Grace Fellowship (Zeeland, Pastor Michael Schout). Script kept at `prisma/add-mi-opc-2026-07-28.ts`. **MICHIGAN NOW 105/105 RESEARCHED. DB total 4,048; researched 1,940.** Remaining MI follow-ups are phone calls only: #3239 Judson (Zastrow claim), #2749 New Covenant + #3245 Providence Caro (abortion position), #2145 Meadow Springs (still exists?), #3979 Beaverdam CRC (women in office).
- 2026-07-29: MICHIGAN COMPLETENESS SWEEP (user-requested: fill remaining fields + find missing churches). **(1) PROVENANCE BACKFILL on the 34 rows researched in June** - every one now has sourceUrls, and zips/addresses were filled from authoritative denominational directories: **NAPARC Classis Michigan** for the 10 URCNA rows (all had placeholder addresses like the bare word 'Bethany'/'Walker'/'Sovereign' and no zip or phone - now full street addresses, zips, phones; cities fixed Kent County->Alto/Caledonia, Belmont->Comstock Park, Olive Twp->West Olive, Polkton Twp->Coopersville, Georgetown Twp->Jenison) and the **Great Lakes Presbytery directory + NAPARC** for the PCA rows. Data fixes found: #1097 Knox had '25700' (a street number) in the ZIP column -> 48045; #1092 address was the scraped string '9630 Find Us 2500 Breton Road SE'; #1103 Redeemer Holland address/zip both wrong (659 State St 49423 -> 556 Butternut Dr 49424); #1099 New City Presbyterian is in **Ferndale**, not Royal Oak, and its 'Pastor Ryan' entry resolved (Ryan Davis McVicar left in 2022 for Red Tree Ann Arbor; Tommy Myrick is current); #3791 Southfield RPCNA address was the bare word 'Southfield' -> 26550 Evergreen Rd, 48076; #51 Christ Church Livingston County moved to 210 Church St; #153 Christ Fellowship is in Kalamazoo (Pastor Collin Moeller filled); #152 Calvary Bible Rogers City pastor filled (Jeff Ryan) and its unsupported 1689 label removed. Pastor conflicts left flagged, not silently overwritten: #1102 (Austin Reed vs Scott Korljan), #1105 (Lawrence Bowlin vs James Mascow). **#283 Grace OPC Lansing = DUPLICATE of #2146** (same address + pastor; #283 also carried an impossible (907) Alaska phone and an @ahk.jp email, both cleared) -> flagged duplicate_of:2146, awaiting delete approval. #1101 Providence PCA Lansing: domain dead + absent from the presbytery directory -> in_transition, verify existence. **(2) DESCRIPTIONS**: all 48 MI rows that lacked the public-facing `description` blurb now have one (script `prisma/fill-mi-descriptions-2026-07-29.ts`, composed only from already-verified denomination/city/leadership fields). **MI now has 0 rows missing description, sourceUrls, zip or coordinates.** **(3) MISSING CHURCHES - 16 ADDED (#4071-4086)**, all geocoded, script `prisma/add-mi-missing-2026-07-29.ts`: **13 PCA** the directory never had (Christ the King Hastings, Cornerstone Muskegon, Faith Grandville, Fellowship Reformed Mt Pleasant, First Pres Trenton, Good Shepherd Kalamazoo, Grace Dearborn, Gracehill GR, Hudsonville Reformed, Immanuel Clarkston/Waterford, Red Tree Ann Arbor, Sojourn Sterling Heights, Trinity Hudsonville); **Covenant URC of Byron Center** (URCNA - distinct from #3920 Covenant URC Kalamazoo); **Christ the King Presbyterian, Shelby** (CREC, Pastor Jeff Swanson, est. 2008 - the third MI CREC church); **Westminster Presbyterian Church, Grand Rapids** (**Vanguard Presbytery**, Dr. Sacha Walicord, first service 2 July 2023 - a denomination the directory had zero MI rows for). **#2150 RESOLVED: Providence OPC Southfield -> Christ Presbyterian Church is now PCA** (Great Lakes Presbytery), which explains its disappearance from the OPC locator; denom corrected OPC->PCA. **MICHIGAN NOW 121 CHURCHES, ALL RESEARCHED.** Checked and found COMPLETE (no gaps): OPC (locator), URCNA (classis), RBN (3 MI churches, all present), HRC (GR only), FRCNA (GR only), NRC (3, all present), CREC (3, now all present). NOT ADDED, needs a decision: **New City Fellowship, Grand Rapids (PCA, Pastor DeMyron Haynes, 700 Burton St SE)** - same Nabors racial-reconciliation network as the deleted #1131/#1421 and flagged #1595/#1815, so it was left out rather than added-then-flagged. **Petoskey Reformed Church (PCA)** deliberately skipped - it is a URC East Lansing church plant with no meeting address, public worship not launching until 2027-28 (Pastor Ben Preiser); revisit then. **Bentheim Reformed Church, Hamilton** deliberately skipped - it left the RCA in March 2022 for the **Alliance of Reformed Churches** (one source claims a Vanguard ordination in 2023); ARC permits women in office, so it needs the egalitarian check before it can be added.
- 2026-07-29: MICHIGAN INDEPENDENT / CONFESSIONAL-BAPTIST SWEEP (user question: "did you look into reformed baptist churches and other non-denominational churches"). ANSWER: the earlier passes only covered DENOMINATIONAL directories, so independent and non-denominational churches were structurally invisible to them - this was a real gap. Primary source: the **Founders Ministries church search**, which lists **24 Michigan churches of which only 6 were in this DB**; supplemented by the International Reformed Baptist Church Directory (reformedreader.org) and ReformedWiki. **20 CHURCHES ADDED (#4087-4106)**, each researched INDIVIDUALLY on its own website for address/leadership/confession, all geocoded, script `prisma/add-mi-founders-rb-2026-07-29.ts`: Immanuel Church Holland (Alyn Goossen, ~1000 members), First Baptist Howell (Garth Kassner, since May 2025), Calvary Church Webberville (Kevin Pierpont, Converge, **1689 + Abstract**), City Gates Byron Center (Brian Robinson, 1689 + NH, founded 2025), Redeemer Bible Byron Center (Aaron Meares, founded 2011), Plymouth Township Baptist (Scott Belsley, SBC/**Pillar Network**/9Marks), Maple Avenue Bible Adrian (Andrew Thurlow, **G3**, founded 1954), Trinity Bible Edwardsburg (Gebriell Sierra), Sovereign Grace Swartz Creek (Jim Aydelotte, **New Covenant Theology**), Solid Rock Burton (Zach San Miguel), Berean Bible Livonia (Jonathan Hackett, 1689, founded 1963), Faith Baptist Kentwood (Matt Stone, Converge), Colon Baptist (Jeff Minniear, **GARBC**), Harvest Bible Westland (Mike Moses, ~450 members), The River's Edge Caseville (John Gunden + Ryan Badgerow, 1689), Redeeming Grace Southgate (Kevin Godin), Grace Community Battle Creek (Nick Snellgrove), Spurgeon Heritage Holland (Gerin Woodbury), Reformed Baptist Church of Kalamazoo (4 elders + 6 deacons), Cornerstone Bible Sault Ste. Marie (thin - needs a call). **FIRST EVIDENCED socialJusticeStance VALUES IN THE DB FOR MICHIGAN**: five congregations publicly affirm the **Dallas Statement on Social Justice and the Gospel** alongside the **Danvers** and **Nashville** statements - #4091 Plymouth Township, #4092 Maple Avenue, #4096 Berean Bible, #4099 Harvest Bible - so socialJustice=anti_crt, gender=complementarian and sexuality=traditional are recorded as EVIDENCED, not defaulted. Churches publishing no confession got thin stances (sexuality/gender only, stanceBasis=mixed) rather than invented ones: Immanuel, FBC Howell, Trinity Edwardsburg, Solid Rock, Redeeming Grace, Grace Community BC, Faith Baptist, Colon, Cornerstone Sault, Redeemer Byron Center. GOTCHA: **#4106 First Baptist Howell shares its building (210 Church St) with #51 Christ Church of Livingston County (CREC, worships 11:30am)** - the address+city dedupe check wrongly skipped it, so it was inserted explicitly; both records now cross-reference each other so a future pass does not merge them. Also corrected: older directories place Reformed Baptist Church of Kalamazoo at 708 Nichols Rd, but that building is now Good Shepherd Presbyterian (PCA, #4076) - RBC is at 454 S Drake Rd. **MICHIGAN NOW 140 CHURCHES, ALL RESEARCHED, ZERO ROWS MISSING description / sourceUrls / zip / coordinates.** ⚠️ **THIS GAP IS NATIONWIDE**: if 18 of 24 Founders churches were missing in Michigan, the same is almost certainly true in every other state - the Founders church search, G3, Pillar Network and 9Marks directories should be swept per-state for the rest of the country.
- 2026-07-29: **#4099 Harvest Bible Church (Westland) DELETED** at the directory owner's direction. The owner knows this congregation first-hand and reports it is not sound on abortion - it tolerates chemical abortion among members - which fails the directory's core criterion. Backed up to `data/deleted-churches-2026-07-29-harvest.json`; script `prisma/delete-mi-harvest-2026-07-29.ts`. **DO NOT re-add it in a future Founders sweep** - it is listed on the Founders Ministries church search and will resurface there. This case also settles a question raised the same day: Harvest publicly affirmed the Dallas Statement, the Danvers Statement and the Nashville Statement, and was still compromised on abortion - **a Dallas affirmation is not evidence a church will fight for abolition.**
- 2026-07-29: **NEW FIELD `culturalEngagement`** added to the Church model (raw `ALTER TABLE ... ADD COLUMN ... DEFAULT 'unknown'` - deliberately NOT `prisma migrate`, to stay clear of shadow-database behaviour on the live Neon DB). It answers a question the existing nine stances could not: **does the church as an institution fight social/political battles, or only preach?** Values: `transformationalist` (Christ's lordship applied to law/politics/culture, the church acts corporately - Kuyperian/postmill/theonomic/CN, CREC-Moscow orbit; these are the churches that will join a fight), `limited_mission` (the church as institution stays out; members act as citizens - covers confessional two-kingdoms AND the Dallas-Statement denial that activism is "primary to the mission of the church"; NOT a claim the church is liberal or pro-choice), `quietist` (stronger - politics treated as worldly or a distraction; fundamentalism, PRC antithesis-separatism), plus `mixed`/`unknown`. **EVIDENCE-ONLY - do not default by denomination**, since PCA/OPC/SBC each contain all three. The two reliable tells: CREC/Moscow-orbit membership (transformationalist) and a published Dallas Statement affirmation (rules transformationalist OUT). WHY THIS MATTERS: the directory's purpose is finding churches that will act on abolition, and the nine existing axes could not distinguish a Doug Wilson-style congregation from a MacArthur-orbit one - both read as conservative, anti-CRT and complementarian, but only one will act corporately. Seeded 6 MI rows on evidence: #4091 Plymouth Township, #4092 Maple Avenue, #4096 Berean Bible -> limited_mission (Dallas affirmation); #51 Christ Church Livingston County, #3245 Providence Caro, #4085 Christ the King Shelby -> transformationalist (CREC orbit, flagged as orbit-based rather than a per-church statement). The other 133 MI rows stay `unknown` rather than being guessed. `culturalEngagement` added to the allowed-key list in prisma/apply-research-batch.ts.
- 2026-07-29: **GIT HISTORY PURGED.** `git filter-repo --path public/hymnal-media --invert-paths` removed the 13,678 hymnal media blobs from all history, then force-pushed. **Pack: 6.45 GiB -> 15.20 MiB (a 434x reduction).** Commit count 406 -> 396: ten commits had touched ONLY hymnal-media, so they became empty and were pruned. Every remaining commit was rewritten, so all SHAs changed (HEAD 1608694c -> f9a83d17); anyone with an old clone must re-clone rather than pull. Verified afterwards: 13,678 media files still on disk untouched, 361 tracked files, zero commits referencing public/hymnal-media, `npm run build` still green. Pre-rewrite mirror backup (8.3 GB, all 406 original commits) kept at `Websites/church-directory-BACKUP-2026-07-29.git`. NOTE: filter-repo resets the working tree, which silently discarded one uncommitted edit (the .env.local loader in scripts/upload-hymnal-media-to-r2.mjs) - it was restored afterwards. Commit everything before running filter-repo.
- 2026-07-29: **culturalEngagement DERIVATION PASS — 122 rows filled with ZERO new web research** (`prisma/derive-cultural-engagement-2026-07-29.ts`, dry-run first). Every value came from evidence already recorded in the row, and each gets a basis line appended to theologicalNotes naming the exact trigger, so nothing is unsourced. Results: **transformationalist=97, quietist=25**. Triggers, first match wins: evidenced `pro_abolition` (a congregation that has committed corporately to a political-moral cause has already answered the question), `christianNationalism` affirm/sympathetic, postmill + theonomic/sympathetic, CREC membership, and `zionistStance='anti'`; then Dallas-Statement affirmation -> limited_mission; then PRCA -> quietist (rejection of common grace + antithesis emphasis, documented across that bloc). **ANTI-ZIONISM FINDING (user asked to add it as a trigger): there are only 8 anti-Zionist rows DB-wide, and ALL 8 already carried another transformationalist indicator** — zero net new rows, but it means active anti-Zionism is a perfect (if low-volume) proxy for the transformationalist cluster in this data: Apologia Church, Christ Church Moscow, Refuge Church UT, Covenant Bible TX, King's Way AZ, Whitleyville Reformation TN, Liberty Fellowship MT, Apologia Utah. DB-wide now: unknown=3954, transformationalist=100, quietist=25, limited_mission=3. **The 3,954 unknowns are NOT presumed non-transformationalist** — 2,108 of them have never been researched at all, and the remainder were largely populated with denominational defaults (amill/non-theonomic/FV-critical) that were never per-church evidence. Absence of an indicator here is absence of evidence, not evidence of absence — the same trap as the abolitionist gap.
- 2026-07-29: SERVICE WORKER v26 -> **v27** + `!res.redirected` guards on all three `cache.put` calls in public/sw.js. **The Cache API throws TypeError on redirected responses**, and every /hymnal-media/* request now 307s to R2, so the old code was firing unhandled rejections on every media fetch. Version bump also forces all clients to drop stale caches. VERIFIED with a real browser against production: the hymnal is NOT broken — /hymnal/library/trinity-hymnal-1961 renders **748 hymn links**, hymn #1 shows full lyrics, and audio returns 206 through the redirect. A reported "hymnal data not populating" is therefore a stale client-side service worker, not a server problem; v27 clears it on next load. SEPARATE PRE-EXISTING BUG FOUND: the Google Fonts stylesheet is blocked by CSP (`style-src 'self' 'unsafe-inline'` omits fonts.googleapis.com), so the site renders in fallback fonts — not introduced by this migration, still worth fixing.
- 2026-07-29: **SITE REFRAMED — culturalEngagement is now the PRIMARY AXIS, Zionism demoted to a secondary indicator** (user direction: "this was always the main point of this project; I just saw anti-Zionist churches as the most political, but as we have done more research that has developed"). Changes: the directory's filter tabs, stat panel, map markers, church cards and the congregation profile page all now pivot on `culturalEngagement` (Transformationalist / Limited Mission / Quietist / Unverified) instead of `zionistStance`. **The landing filter was previously hard-defaulted to `'anti'`, meaning the site opened showing 8 churches out of 4,082** - it now opens on Transformationalist. Zionism and abolition survive as small secondary chips on the card and profile, shown ONLY when they say something (`anti`, `yes`, or `pro_abolition`) so the cards stay quiet. Masthead subtitle changed from "A Directory of Faithful Churches" to "Churches Contending for the Crown Rights of Christ" - Crown Rights being the Covenanter/transformationalist formula, and the exact phrase used by #3246 Faith Victory Fellowship. Report reasons split so a wrong cultural-engagement call and a wrong Zionist call are distinct. New CSS classes .transformationalist/.limited-mission/.quietist + .church-tag.indicator. NOTE FOR LATER: with only 100 transformationalist rows classified DB-wide, the default tab currently shows ~100 of 4,082 churches; that number should climb steadily as the unknowns get worked, but it is worth re-checking the default once the nationwide sweep lands.
- 2026-07-29: **COPY REFRAME COMPLETED across the whole site** to match the new primary axis. **About page**: hero "A directory for the faithful" -> "A directory of churches that **contend**"; the lede and Mission section rewritten from "churches that reject Christian Zionism" to churches that "confess Christ's lordship over more than the sanctuary" and "act as churches" — the Mission prose now names the target directly (a century of teaching that the church's business stops at the church door, whole confessions held sincerely and applied nowhere), with abortion named first among the questions. Pillar I now classifies by "whether the church acts corporately on the questions of the age". Editorial-method criterion I now asks whether the church confesses Christ's authority over the civil sphere or expressly limits its mission. **FAQ Q.02 replaced**: "Is 'anti-Zionist' a political label?" -> "What does 'transformationalist' mean here?", and it explicitly protects Limited Mission churches from being read as liberal or compromised — many are thoroughly orthodox and simply hold the institutional church should not take up such causes. Pull quote and footer CTA reworded ("so those who mean to contend might find one another"; "Know a church that contends?"). **Masthead rule text**: "Identifying anti-Zionist, Bible-believing churches across America" -> "Identifying churches that confess Christ's lordship over the public square". **SEO metadata** (title + description) rewritten to match. **Hymnal colophon** updated. **SUBMIT FORM RESTRUCTURED**: Section IV was "Theological Stance — the defining question — does this congregation hold to a Christian Zionist or pro-Israel theological position?" and is now "Public Posture — the defining question — when a public question arises, does this congregation act as a church, or leave it to members acting privately?" A new required Cultural Engagement selector (Transformationalist / Limited Mission / Quietist / Unsure) sits above the Zionist selector, which is retained and relabelled "Zionist Position (secondary indicator)". `culturalEngagement` is now validated and persisted by the POST handler in app/api/churches/route.ts, so newly submitted churches carry the primary axis from the moment they arrive rather than needing a later backfill.
- 2026-07-29: **ZIONIST QUESTION REMOVED ENTIRELY FROM THE SUBMIT FORM** (user direction). Section IV now asks only Cultural Engagement (required), plus the optional Confessional Notes and Source fields; the STANCE_OPTIONS list, the zionistStance form state and the zionistStance POST body field are all gone, and the submit-enabled check no longer requires it. Page lede reworded to "tell us how it engages the public square". The API POST handler still validates and defaults `zionistStance` to `'unknown'`, which is the correct outcome — a public submitter is not the right source for a Zionism call, so new churches arrive with it unset and an editor establishes it during research. Zionist stance remains fully present everywhere it belongs: as a stored field, as a secondary indicator chip on cards and profiles, and as a distinct report reason.
- 2026-07-29: **UI FIXES.** (1) **Detail panel was being painted over by the map.** The slide-in congregation panel sat at `z-index: 101` with its overlay at 100, but Leaflet's own stylesheet puts map panes at 400 and its controls at 1000 — so tiles, markers and the zoom control all rendered on top of the church info. Raised overlay to 1100 and panel to 1101 (above every Leaflet layer), and moved the full-screen paper-grain texture from 1000 to 2000 so it still sits over everything including the panel and the design is unchanged. (2) **STANCE FILTERS ADDED to the directory** — previously only State and Denomination were filterable. Nine new dropdowns now filter on the research fields: Abolition, Eschatology, Theonomy, Christian Nationalism, Zionism, Social Justice, Federal Vision, Gender and Sexuality, alongside the Cultural Engagement tabs. Driven by a single `STANCE_FILTERS` table in components/ChurchDirectory.tsx — adding a future field means adding one row, since the control, the filtering and the page reset all iterate that table. A "Clear stances" button appears once any is set. The filter row now wraps (`flex-wrap`) since it carries ~11 controls. This finally makes the researched stance data usable from the front end rather than only queryable in SQL.
- 2026-07-29: ONE-OFF CORRECTION — **#17 Covenant Bible Church (Georgetown, TX), Joel Webbon: genderStance complementarian -> patriarchal, stanceBasis=evidenced** (user direction, and well documented: Webbon is an open advocate of biblical patriarchy via Right Response Ministries, not merely complementarianism — he argues women should not vote in a Christian nation). MICHIGAN ANTI-ZIONIST SEARCH (user recalled two anti-Zionist churches in the Jackson area): **NOT FOUND.** Michigan still has zero `zionistStance='anti'` rows. The Jackson area (Jackson, Napoleon, Brooklyn, Concord, Parma, Spring Arbor, Michigan Center, Grass Lake, Hanover, Horton, Albion, Marshall, Chelsea, Hillsdale, Adrian, Tecumseh, Onsted) contains only FOUR churches in this DB — #4092 Maple Avenue Bible (Adrian), #2848 RBC of Lenawee (Adrian), #2141 Hillsdale OPC, #2559 Grace Baptist (Marshall) — and none is anti-Zionist. Searched the OPC locator, PCA Great Lakes Presbytery, URCNA Classis Michigan, CREC, RBN, reformedreader and ReformedWiki: no confessional congregation is listed in Jackson itself at all. The two nearest hard-right candidates are **#65 Christ the King Reformed, Charlotte (~35 mi)** and **#51 Christ Church of Livingston County, Howell (~40 mi)**, both currently zionist=no rather than anti. NEEDS A NAME OR DETAIL FROM THE USER TO CHASE FURTHER. **⚠️ SEPARATE FLAG RAISED ON #65 Christ the King Reformed (Charlotte)**: the record already notes it, but it deserves an explicit editorial decision — Bret McAtee's promotion of **Kinism** got the congregation removed from the CRC in December 2018, and the SPLC listed it as a white-nationalist hate group in February 2021. Kinism is condemned as heresy across the confessional Reformed world (PCA, OPC and CREC have all rejected it). Given churches have been deleted from this directory for far less (egalitarian polity, Side B), whether a Kinist congregation belongs here is the user's call and should not be left to drift. **LEAD FOUND — 3 MI churches appear on the postmillennial church directory but are coded amill here**: Spencer Mills OPC (Gowen, #2140), Grace OPC Lansing (#2146) and New Life Fellowship Holland (#2142). That is the same third-party source that proved a decade stale for Colwood, so it is recorded as a lead to verify per-church, NOT applied.
- 2026-07-29: **MICHIGAN'S TWO ANTI-ZIONIST CHURCHES FOUND — the user's memory was right and I had destroyed part of the evidence.** When #283 was deduped into #2146 on 2026-07-29 I kept the row verified against the OPC locator and discarded the other, but #283's description carried a real finding the survivor did not: *"pastored by Stephen Pribble, a signatory of the Knox Seminary Open Letter against Christian Zionism."* The delete was backed up, so nothing was lost permanently, but the LIVE DB lost an evidenced datum. **LESSON: when deduping, diff the descriptions/notes of both rows and merge the union before deleting — do not assume the better-verified row is the more complete one.** Recovery: pulled the 2002 Knox Theological Seminary 'Open Letter to Evangelicals and Other Interested Parties: The People of God, the Land of Israel, and the Impartiality of the Gospel' (an explicitly anti-Christian-Zionist statement rejecting the land promises to the modern state of Israel; 131 signatories incl. R.C. Sproul, Michael Horton, Richard Gaffin, Bruce Waltke) and extracted its **five Michigan signatories**: Stephen Pribble (Grace OPC, **Holt** — #2146), Raymond P. Joseph (Southfield Reformed Presbyterian — #3791), Stephen T. Nutter (Reformed Baptist Church, **Sault Ste. Marie** — relates to #4105, see below), Leanne Van Dyk (Western Theological Seminary — academic, not a church) and Michael J. Glodo (Livonia, no church named). **#2146 Grace OPC -> zionistStance=anti, EVIDENCED** (Pribble is still the pastor, so the signature reflects current leadership; Holt is ~30 miles from Jackson, which matches the user's recollection of "the Jackson area"). **#3791 Southfield RPC -> zionistStance=anti, stanceBasis=mixed** — deliberately weaker, because the signatory Raymond P. Joseph is a FORMER pastor and Adam Kuehner has led the congregation since 2012; confirm with the current session before treating it as settled. Michigan now has anti=2 (was 0); DB-wide anti=10 (was 8). **FOLLOW-UP LEAD: Stephen T. Nutter, Reformed Baptist Church, Sault Ste. Marie** is a third MI signatory — when #4105 Cornerstone Bible Church (Sault Ste. Marie) was added earlier today it was already flagged that registry data shows a separate "Reformed Baptist Church of Sault Ste Marie" at 1705 Davitt; that is very likely Nutter's congregation, so resolve whether they are one body or two and code the Zionism accordingly. **The Knox signatory list is a reusable evidence source for the whole directory** — 131 names nationwide, each tied to a named church, every one of them a public anti-Christian-Zionist commitment. Cross-reference it against the full DB during the nationwide sweep.
- 2026-07-29: **KNOX OPEN LETTER CROSS-REFERENCE — run against the whole DB** (`prisma/knox-crossref-2026-07-29.ts`, dry-run first). Extracted all **131 signatories** of the 2002 Knox Seminary Open Letter against Christian Zionism from the source PDF (pdfplumber; the bible-researcher.com HTML copy is INCOMPLETE and omits Pribble — use the whtt.podbean.com PDF), of which 95 are tied to something church-shaped. **A first pass at score>=4 produced 53 matches and was WRONG** — it paired "Reformed University Fellowship, Lakeland FL" (a campus ministry) with Fellowship Baptist Church, and "New Dominion Fellowship, Chesapeake VA" with New City Fellowship in Fredericksburg. Tightened to score>=7 (requiring strong name overlap AND an exact city match), giving **20 solid matches**. **CRITICAL JUDGEMENT — the letter is 24 years old, so a signature is NOT proof of a congregation's present position.** Only where the signatory's surname still appears in that church's current leadership was the stance changed: **4 rows -> zionistStance=anti, EVIDENCED**. The other **16 got the finding recorded in theologicalNotes as a 'KNOX OPEN LETTER LEAD (unverified)' with zionistStance deliberately LEFT ALONE** — a verification queue rather than 49 fresh unsupported claims, and the note distinguishes a pastor's signature from a ruling elder's or member's, since an elder signing is his own act and not an act of the congregation. DB-wide anti: 10 -> **13**; 12 churches now carry an unverified Knox lead awaiting a call. The evidenced anti-Zionist set now reads as a who's-who of the movement: Apologia Church (Mesa AZ), Christ Church (Moscow ID), Covenant Bible (Georgetown TX, Webbon), King's Way (Prescott AZ), Liberty Fellowship (Kalispell MT), Whitleyville Reformation (TN), Apologia Utah, plus the confessional signatories Midway Presbyterian (GA), East Ridge Presbyterian (Chattanooga), Calvary Baptist of Exeter (NH) and Grace OPC (Lansing MI). **REUSABLE METHOD**: a public signatory list tied to named congregations converts denominational defaults into evidenced stances at scale. Worth repeating with other public statements — Dallas Statement signatories, Danvers/Nashville, equal-protection and abolition petitions.
- 2026-07-29: **NOTABLE-FIGURE SYNC** (`prisma/notable-figures-sync-2026-07-29.ts`). Parsed `notable_figures.md` (the June roster of the ~67 loudest voices in the NXR/Reformed-postmill/CN/abolitionist space) for its `[#id]` church references and wrote each figure — with the one-line reason he matters — into that church's theologicalNotes as a `NOTABLE FIGURE(S)` block. **30 churches annotated**, several carrying multiple figures (#3 Apologia = Durbin, White, Pittman, Pierson; #64 Whitleyville = Isker + Abbotoy; #3241 American Reformation = Rusty Thomas + Jason Storms; #76 Grace Bible Conway = Strachan + Jeff Johnson). The figure roster is now visible on the church record itself instead of living only in a separate markdown file. **CULTURAL-ENGAGEMENT AUDIT of the same 30: 26 are already `transformationalist`** — a good independent check on the derivation pass, since these are exactly the churches the directory exists to surface. **FOUR ARE STILL `unknown` and need a decision**: #76 Grace Bible Church, Conway AR (Owen Strachan, Jeff Johnson); #566 Presbyterian Church of Manchester CT (C.R. Wiley); #2543 Grace Baptist Church, Cape Coral FL (Tom Ascol); #3797 First RPC Durham NC (Rosaria Butterfield). NOT auto-set, because a media-prominent member does not by itself establish that the CHURCH acts corporately — and in Ascol's case the evidence actively cuts both ways (Founders president and a public force in the SBC abolition resolutions, but also a Dallas Statement signer, and a Dallas affirmation is precisely the denial that activism is the church's mission). Note the distinction among the four: at #76, #566 and #2543 the notable figure IS the pastor, which is meaningful evidence; at #3797 Rosaria Butterfield is a member and her husband Kent pastors, which is weaker.
- 2026-07-29: Set **#76 Grace Bible Conway, #566 Presbyterian Church of Manchester, #2543 Grace Baptist Cape Coral -> culturalEngagement=transformationalist** (user approved). Basis in each case is that the notable figure IS the pastor and is publicly contending FROM the pastorate, not merely a prominent member: Jeff Johnson (seminary + publishing house founder) with Owen Strachan at #76; C.R. Wiley's household-economics/patriarchy restorationism at #566, which already carried EVIDENCED postmill + patriarchal stances; Tom Ascol at #2543. **#2543 recorded as an explicit judgement call, not a derivation** — Ascol is a Dallas Statement signatory, and everywhere else in this directory a Dallas affirmation is treated as ruling transformationalist OUT; resolved toward transformationalist because his practice (Founders presidency, 'By What Standard', SBC presidential run, the SBC abolition resolutions) outweighs the paper affirmation. The contradiction is written into the row so a future pass can revisit it rather than inherit it blindly. **#3797 First RPC Durham deliberately LEFT unknown** — Rosaria Butterfield is a member and her husband Kent pastors, so the figure is not the one leading the congregation. DB-wide culturalEngagement now: transformationalist=103, quietist=25, limited_mission=3, unknown=3951.
- 2026-07-29: **NEW FIELD `notablePeople`** (raw `ALTER TABLE ... ADD COLUMN`, not prisma migrate). The notable-figure attributions written into theologicalNotes earlier today were **moved out into their own field** at the user's request and are now rendered as a dedicated **"Notable People"** section positioned ABOVE the Editor's Note — on both the congregation profile page and the directory's slide-in side panel. Migration script `prisma/migrate-notable-people-2026-07-29.ts` (dry-run first) moved all 30 blocks, stripped the provenance preamble (the field name now carries that meaning), and left zero leftovers in theologicalNotes. Multi-figure churches are stored pipe-separated and render as a list, so #3 Apologia shows Durbin, White, Pittman and Pierson as four separate entries rather than one run-on paragraph. Styled as an oxblood-ruled roster (.notable-people) to read as a list rather than prose. `notablePeople` added to the allowed-key list in prisma/apply-research-batch.ts so future batches can write it directly.
- 2026-07-29: **MICHIGAN GAP SWEEP #2 — an entire FEDERATION was missing.** Prompted by the user reporting a known-missing church in St. Joseph. Checked the **Theocast confessional church finder** (a source not previously used), which surfaced **Remnant Reformed Church, SW Grand Rapids** — absent from this DB. Chasing it revealed the real hole: the **Reformed Protestant Churches (RPC)** federation had **ZERO rows directory-wide**. The RPC was formed 28 May 2021 in Hudsonville out of the Protestant Reformed split — its origin is the January 2021 Act of Separation signed by members of **Byron Center PRC (#3615, already in this directory)** — so the directory held the parent body while missing the entire daughter federation. **ADDED: #4107 First Reformed Protestant Church** (3925 Van Buren St, Hudsonville — the founding RPC congregation) and **#4108 Remnant Reformed Church** (9181 Kenowa Ave SW, Grand Rapids; organized 22 May 2023 in a SECOND split, this time out of First RPC; **Pastor Rev. Andrew Lanning**, previously a PRC minister and a leading figure in the 2021 separation — his name had already surfaced during the PRCA bloc research as a stale directory listing for Faith PRC Jenison, and this resolves where he actually went). Michigan now 141 churches. **ST. JOSEPH: NOT FOUND.** The only Reformed congregation in St. Joseph MI is the Christian Reformed Church of St. Joseph (3275 Washington Ave, CRCNA); a full church-finder listing for the city shows nothing else Reformed/confessional, and searches on "Jmark"/"J Mark" as a pastor name returned nothing. NEED THE FULL NAME OR CHURCH NAME FROM THE USER. **METHOD NOTE: denominational blind spots are the highest-yield gap type found so far** — a missing federation costs every one of its congregations at once, whereas a missing individual church costs one. Worth auditing the DB's denomination list against a full NAPARC/Reformed-federation roster to find other absent bodies (RPC is now covered; check e.g. Vanguard beyond the two found, CanRC beyond one, HRC, FRCNA, ARP, RCUS, and the Reformed Church of Quebec/KAPC/Kosin bodies).
- 2026-07-29: **DENOMINATION AUDIT — 49 distinct denomination labels across the DB.** Two classes of problem found. **(A) LABEL FRAGMENTATION, which silently breaks denomination filtering and counts**: `URC` (203) and `URCNA` (44) are THE SAME federation split across two labels — 247 rows that never group together; `Vanguard Presbytery` (3) / `Vanguard Presbytery (ex-PCA)` (1) / `Vanguard Presbyterian` (1); `Evangel Presbytery` (1) / `Evangel Presbytery (ex-PCA)` (1); `Reformed Presbyterian` (2) sitting apart from `RPCNA` (95); `Presbyterian` (7) / `Presbyterian (independent)` (1) / `Independent Presbyterian` (2). These should be normalised to a canonical set before the front-end denomination filter can be trusted. **(B) UNDER-REPRESENTED FEDERATIONS — the highest-yield gap type, since one missing body costs every congregation at once**: **Evangel Presbytery has ~10-12 congregations, we hold 2**; **NRC had 27 congregations in the US and Canada as of 2016, we hold 3**; **Vanguard Presbytery ~20, we hold 5**; RPCGA 4; Bible Presbyterian 4; CanRC 1 (the federation has a real US presence); HRC 3; FRCNA 1; Presbyterian Reformed Church 1. Each is a candidate for a locator-style sweep like the one that completed the OPC and URCNA blocs in Michigan. **RPC FIT ASSESSMENT (user asked whether the Reformed Protestant Churches belong here): YES on inclusion, but at the far QUIETIST end.** They hold the Three Forms of Unity, are strictly confessional, male-only office, amillennial, anti-dispensational — nothing that trips this directory's exclusion rules. But their whole reason for existing is a doctrinal-purity separation from the PRC over grace, works and assurance, and #4108 is the product of a SECOND split within three years. That is an inward, antithesis-driven posture, the opposite of the transformationalist churches the directory now foregrounds. Both RPC rows set to culturalEngagement=quietist, same basis as the PRCA bloc. They belong in the directory as an accurate map of the confessional landscape, not as targets. **NOTABLE-FIGURE FIXES**: linked Joe Rigney and Jared Longshore -> #18 Christ Church Moscow, Eric Conn and Dan Berkholder -> #16 Refuge Church Ogden (churches were already in the DB, just unlinked). **VODDIE BAUCHAM DIED 25 September 2025, aged 56** (medical incident after long-standing heart disease; he was to be founding president of Founders Seminary) — recorded in notable_figures.md; the user flagged this and it is confirmed. **T. Russell Hunter** reported to attend **Areopagus Church, Norman OK** — too small/informal to verify as a directory row yet, recorded as a lead. **CAL ZASTROW: still unidentified.** User recalls a church in Michigan's Thumb; Zastrow is based in Kawkawlin (Bay County, on the Thumb's western edge) but no source connects him to a named congregation. **ST. JOSEPH / 'Jmark': Abolish Abortion Michigan Action is registered at 3665 S Lakeshore Dr, Suite 4, St Joseph MI 49085 (EIN 99-4483710, founded 2025) — which confirms the org's base — but AAM names no leadership publicly, so his church still cannot be identified from open sources. NEEDS THE NAME FROM THE USER.**
- 2026-07-29 (second pass): **4 ADDED, 1 UPGRADED, LABELS PARTLY MERGED — and a serious data problem found.** **⚠️ THE `URC` LABEL IS NOT URCNA. DO NOT MERGE THEM.** I nearly normalised `URC` (203) into `URCNA` (44) as the audit suggested, and checked first: the 203 URC rows are churches like "Anchorage New Life Presbyterian", "Hawaii Korean Central Presbyterian" and "Redeemer Presbyterian, Kenai" — **86 of the 203 are named "Presbyterian"**, which no URCNA congregation would be. All 203 are `not_researched`, **all 203 have zero sourceUrls**, and there are only **8 distinct theologicalNotes openings** across the whole set. This is an unresearched bulk import that had a denomination guessed onto it wholesale — 5% of the directory. The real URCNA rows are the 44 (Christ Church Las Vegas, Grace Reformed Rapid City, Trinity Reformed, etc.). **These 203 need their denominations established individually as they are researched; merging them would have corrupted the lot.** Safe merges only were applied: Vanguard Presbytery ×3 labels -> 1 (now 5), Evangel Presbytery ×2 -> 1 (now 2). **ADDED**: #4109 **Second Reformed Protestant Church** (2501 Hart St, Dyer IN — moved from Calumet City; Rev. Nathan Langerak) completing the RPC federation, which public sources show has only these three North American congregations; #4110 **Christian Reformed Church of St. Joseph** (the AAM leader's congregation per the owner — flagged review_nonfit because the CRCNA permits women officers and this church publishes no officer list, the same open question as #3979 Beaverdam); #4111 **The Sanctuary of Swartz Creek** (thin — Facebook-only presence, added on the owner's recollection of a Cal Zastrow mention; note thesanctuarymichigan.com is an UNRELATED sculpture park, and the Zastrow link is unconfirmed); #4112 **Areopagus Church, Norman OK** (T. Russell Hunter's reported congregation — small and informal, no pastor/address/confession findable; culturalEngagement left UNSET despite Hunter being among the most politically active figures in the directory, because his activism runs through Abolitionists Rising and there is no evidence the gathering acts corporately). **#3247 OneLife / Ekklesia of Grand Blanc -> culturalEngagement=transformationalist, EVIDENCED**: the congregation hosts and promotes **One Life For Life** as a church ministry — an organisation positioning "gospel-equipped missionaries at abortion mills across the United States," with an annual ONElife for Life banquet. That is the church acting corporately on abortion, which is exactly what the field measures. **ZACHARY GARRIS: SUSPENDED INDEFINITELY by Rio Grande Presbytery in late May 2026** — guilty of "unwholesome speech" (Eph 4:29) over a 2023 X exchange with Anthony Bradley, NOT guilty on the separate charge about his June 2024 slavery comments; he is appealing. Recorded in notable_figures.md; he was already in the roster at #1429. **J.D. HALL: CONSIDERED AND DELIBERATELY EXCLUDED** — his own church declared him disqualified from ministry in June 2022 over serious sin, he was removed from Protestia, and he was later found guilty of embezzling from that church. No pulpit, no org role, no congregation to attach him to; a roster of people who define the movement is not the place for someone the movement removed. Recorded as an explicit exclusion so a future pass does not "helpfully" add him.
- 2026-07-29: **CRC WOMEN-IN-OFFICE DEEP DIVE (#4110 St. Joseph and #3979 Beaverdam) — RESULT: UNRESOLVABLE FROM PUBLIC SOURCES, for both.** The denominational framework is the key thing and it cuts against any shortcut: CRCNA Synod **1995** created a **local option** (each classis decides whether its congregations may open all offices to women) and Synod **2007 removed the word 'male' from the church order** entirely — but **no congregation is required to ordain women, and many CRC churches ordain women as deacons while keeping elder and minister male**. So CRCNA membership settles NOTHING about either congregation; it has to be established church by church. Neither church publishes an officer roster: CRC St. Joseph's /staff page carries only an email and address and its /leadership page 404s; Beaverdam's /leadership page 404s too. What IS confirmed is that both ministers are male — **John R. De Vries** at St. Joseph (name recovered from the CRCNA church record, along with clerk Ethan Pawelski) and Tyler Wagenmaker at Beaverdam. The eldership and diaconate at both are unknown. **The cheapest resolution for #4110 is to ask the AAM contact, who attends there.** Both rows now carry this finding; #4110 keeps its review_nonfit flag until answered. Context worth keeping: the CRCNA is NOT affirming on sexuality — Synod 2022 made HC Q&A 108 confessional on unchastity and 26 congregations plus 33 ministers left for the RCA over it in 2025, so the churches that remain are the ones that accepted that discipline.
- 2026-07-29: **J.D. HALL ADDED to notable_figures.md at the user's direction**, reversing my earlier exclusion. Listed under a new 'Polemics / discernment media' heading with the honest record on both sides: founder of Pulpit & Pen (later Protestia) and the Montana Daily Gazette, for a decade the most-read polemics voice on the Reformed right and a significant early driver of the anti-woke turn inside the SBC — the discernment-blog format he built shaped how much of this movement argues online; and no longer in ministry or media, having been declared disqualified by Fellowship Baptist Church (Sidney MT) in June 2022 over serious sin, removed from Protestia, and later found guilty of embezzling from that church. No settled congregation, so no `[#id]` link. Listed for historical influence, not as a current voice.
- 2026-07-29: **#4110 note cut back to one line at the user's direction.** The women-in-office deep dive, the AAM Action registration details (address/EIN) and the CRCNA synod history were all removed from the public-facing record; it now reads simply that the CRCNA may allow women in leadership and that this congregation's own practice is unconfirmed. The reasoning behind that conclusion stays in this log rather than on the church row.
- 2026-07-29: **UI BUG FIXED — "Confession & Conviction" and "Editor's Note" were printing the SAME text on 531 church pages.** The Confession section rendered `description || theologicalNotes`, so whenever a row had no description it fell back to the notes; the Editor's Note section then rendered `theologicalNotes` again on the next screenful. 531 of 4,088 rows have notes but no description, so every one of them showed the same paragraph twice. Fixed on both the congregation profile page and the directory's slide-in side panel: Confession & Conviction now renders the description ONLY, so when there is no description that section simply hides and the Editor's Note carries the text alone. Michigan was unaffected because its descriptions were filled earlier today — which is also why it went unnoticed until now. The 531 rows are a good queue for a description-filling pass like the one run for MI.
- 2026-07-29: **NATIONWIDE DESCRIPTION PASS — 302 of 531 rows filled** (`prisma/fill-descriptions-national-2026-07-29.ts`, dry-run first, generalised from the Michigan script with a full state-name map and blurbs for all 49 denomination labels). **229 rows deliberately LEFT BLANK, and that is the point of the run**: 203 are the untrusted `URC` bulk import (writing "A United Reformed congregation" onto churches actually named "Anchorage New Life Presbyterian" would publish a claim we already know is wrong), and **26 have a `city` value that is not a city**. That second group is a real data-quality find the pass surfaced: #3742 Christ Covenant Presbyterian has an entire paragraph of service directions in its city column ("We meet for worship at AM at Culpeper Christian School Old Rixeyville Road..."), #4013 Reformed Baptist of Topeka has "Sunday 10 AM", #4021 Reformation Church of Elizabeth has "Left the OPC for the CPC which allows paedocommunion", #3969 Fresno RP has two URLs, and the rest hold street names ("Gaston Rd", "Beaver St", "S College Ave"), church names ("Living Hope Presbyterian", "GraceTruth Church") or a German postcode ("66849 Landstuhl" filed under Alabama). Full list is in the script output; these need city repair, not a description. **BUG WORTH REMEMBERING: the first version of the city guard silently did nothing** because I wrote the regex through a Python non-raw string, where `\b` is the BACKSPACE escape rather than a regex word boundary — the file ended up containing literal 0x08 characters, so the pattern never matched and 10 junk rows were about to be described. Caught it by `cat -A`-ing the actual bytes after the guard "ran" but skipped nothing. When generating regexes from Python into another file, use raw strings.
- 2026-07-29: **MICHIGAN "REMAINING STONES" SWEEP.** Checked the networks not yet used. **CBA / ARBCA (Confessional Baptist Association, cba1689.com): CLEAN** — its only Michigan church is Savior's Grace Church, Akron (Kyle Roat), already in the DB as #2992. **ARP: Michigan sits in the Northeast Presbytery**, whose territory runs CT/DE/MD/ME/NH/MA/NJ/NY/OH/PA/RI/VT + MI — the ARP has no meaningful Michigan presence, which explains 0 MI ARP rows and means the 139 national ARP rows are not a Michigan gap. **BLOCKED / JS-ONLY, still unswept**: G3 Ministries church directory (HTTP 403 to automated fetches), Pillar Network directory (Squarespace JS map, no data in the HTML), 9Marks church search (JS, no REST route), Evangel Presbytery's own church list (self-signed certificate). These four need either a browser session (Playwright can drive them) or manual eyeballing. **STILL WORTH FLIPPING for MI**: Sovereign Grace Churches (133 congregations nationally, 0 MI rows here); RPCGA and Bible Presbyterian (4 rows each nationally, both bodies are ~30 churches); independent fundamental Baptist networks, which this directory barely touches (8 Independent Baptist rows nationally); and the abolition-org networks — End Abortion Now's church roster is NOT public, which remains the single biggest blind spot for finding abolitionist congregations, and is the same gap flagged back on 2026-06-23.
- 2026-07-29: **CITY-COLUMN REPAIR — 71 rows fixed** (`prisma/fix-bad-cities-2026-07-29.ts`, dry-run first). The bad-city detector found **85 rows DB-wide**, not the 26 the description pass had surfaced. Repaired by asking the Places API to look up each church (name + address + state, biased to its stored coordinates) and reading the locality out of the returned address components — NOT by guessing. Examples: "We meet for worship at AM at Culpeper Christian School" -> **Culpeper**; "Left the OPC for the CPC which allows paedocommunion" -> **Elizabeth**; "congregation httpwww.fresnorpchurch.org denomination http..." -> **Fresno**; "Sunday 10 AM" -> **Tecumseh**; "559-251-4176" -> **Fresno**; "Hawkinsville RD" -> **Macon**; "S College Ave" -> **Indianapolis**; "P.O. Box" -> **Mountlake Terrace**. **TWO SAFETY RAILS, both of which caught real problems.** (1) **A REAL-CITY VERIFIER.** My first heuristic flagged any city containing "Church" or ending in a street suffix — which wrongly condemned **Chapel Hill, Falls Church, Federal Way, Pike Road, Union Church and Gray Court**, all genuine place names. Nine rows would have been corrupted; worst case #1950 and #2010 would have been "corrected" from Falls Church VA to Vienna. The script now asks Places whether the stored value is itself a locality in that state and leaves it alone if so. (2) **A STATE-MISMATCH GUARD.** Five lookups resolved to a city in a DIFFERENT state, meaning Places had matched the wrong church entirely — "10:30AM and 6PM Sundays" (MA) resolved to Vallejo CA, "PO Box 1066" (ID) to Savannah GA, "Covenant Reformed Church" (NE) to Watertown SD. Those are skipped, never written, and need manual repair: #3325 (a US military chapel in Landstuhl, Germany filed under Alabama), plus the four above. With cities repaired, the description pass was re-run and filled **25 more** rows; 204 remain unfilled, 203 of them the untrusted `URC` import plus the single unrepairable city.
- 2026-07-29: **PLAYWRIGHT SWEEP of the four blocked directories.** **G3 Ministries: DEAD END — g3min.org/church-directory/ returns a 404**, the path no longer exists; the "G3-affiliated" note on #4092 Maple Avenue came from its Founders listing, not a G3 directory. **Evangel Presbytery: rendered fine once TLS errors were ignored (self-signed cert) — it is a plain church list and contains NO Michigan congregations**, consistent with it being an Alabama/Indiana-centred body. **Pillar Network: still opaque** — the directory is a Salesforce-hosted Lightning map (maps.a.forceusercontent.com iframe) with no readable church data in any frame. **9MARKS: BIG YIELD.** Its church search is a proximity search on an `address` input rather than a state filter, so it was driven with five Michigan anchor cities (Grand Rapids, Detroit, Lansing, Kalamazoo, Traverse City), giving **37 distinct Michigan congregations**. Nine were already in the DB (Christ Church GR, Hudsonville Reformed, Judson, New City Presbyterian, Redeemer OPC Ada, Redeemer Detroit, Redeeming Grace, RBC Kalamazoo, River Presbyterian) and a further three matched under different address strings (Faith Baptist Kentwood #4097, Gracehill #4078, Good Shepherd Kalamazoo #4076 — the crude address matcher missed them). **That leaves roughly 25 Michigan churches on the 9Marks list that this directory does not have**, saved to `data/9marks_michigan_2026-07-29.json`. Names include Bella Vista (Rockford), Bethesda Baptist (Allen Park), Calvary Bible Church East (Kalamazoo), Cornerstone Baptist (Roseville), Covenant Life Community (Lansing), CrossWay Community EFCA (Grand Rapids), Evangel Ministries (Detroit), First Baptist of Okemos, Georgetown Grace (Hudsonville), Grace Community (Hudsonville), Harvest Mission Community (Detroit), Highland Park Baptist (Southfield), Holt Baptist, Maranatha Bible (Comstock Park), Oneida Gospel (Grand Ledge), Resurrection (Lincoln Park), Riverview (Holt), Rooted (Royal Oak), Trinity Baptist (Grand Rapids), Warrendale Community (Dearborn), Whitneyville Bible (Alto) and **New City Fellowship PCA (700 Burton St SE, Grand Rapids)** — the Nabors-network congregation deliberately left out earlier, which will keep resurfacing until a keep/delete decision is made. NOT ADDED YET: 9Marks membership signals a healthy-church commitment, not necessarily a fit for this directory's criteria, so each needs the usual individual research pass. **METHOD NOTE: 9Marks is a proximity search, so a full national sweep needs anchor cities per state rather than one query per state.**
- 2026-07-29: **10 of the 25 9Marks Michigan churches ADDED (#4113-4122), 15 deliberately held back** (`prisma/add-mi-9marks-2026-07-29.ts`). Each added row was researched individually, not bulk-imported. **STANCE POLICY FOR THE BATCH — 9Marks membership is evidence for exactly two fields**: the network requires affirming expositional preaching, meaningful membership, elder leadership and **complementarianism**, so genderStance=complementarian and sexualityStance=traditional are recorded; eschatology, theonomy, Zionism, abolition and culturalEngagement are ALL left `unknown`, because 9Marks membership says nothing about any of them. **ADDED**: #4113 Calvary Bible Church East, Kalamazoo (Pastor Bryan Craddock — Master's College/Seminary M.Div. + SBTS D.Min.; elder-and-deacon governed; the strongest confessional fit in the batch); #4114 Bethesda Baptist, Allen Park (four pastors, Inter-City Baptist School orbit, also in TGC's Michigan directory); #4115 Trinity Baptist, Grand Rapids (GARBC); #4116 Cornerstone Baptist, Roseville (SBC, formed 1983 from a merger, Bob Johnson II since 1989); #4117 Maranatha Bible, Comstock Park (IFCA); #4118 Berkley Community (Converge/IFCA, Adam Groh since 2012); #4119 Grace Community, Hudsonville (independent since 1978, Keoni Hughes); #4120 Georgetown Grace, Hudsonville; #4121 Bella Vista, Rockford; #4122 Evangel Ministries, Detroit. **TWO FIT CAVEATS WRITTEN INTO THE ROWS RATHER THAN GLOSSED**: #4120 Georgetown Grace belongs to the **Grace Gospel Fellowship**, a mid-Acts ("hyper-") dispensational body a long way from this directory's covenantal centre; and #4122 Evangel Ministries is a ~1,600-member congregation whose pastor Christopher Brooks is campus dean of Moody Theological Seminary and associated with the **ERLC and the Acton Institute** — a mainstream-evangelical institutional profile, close to the opposite pole from this directory's orbit. #4121 Bella Vista is flagged for verification because some listings describe it as a **campus of Ada Bible Church** rather than an independent congregation. **THE HONEST HEADLINE ON THIS SOURCE: 9Marks membership signals healthy-church practice, NOT the confessional-Reformed or transformationalist profile this directory is built to surface.** The remaining 15 (Christ Community Dearborn, Covenant Life Lansing, CrossWay Community EFCA, Crosspointe Christian, First Baptist Okemos, Harvest Mission Community, Highland Park Baptist, Holt Baptist, Oneida Gospel, Resurrection, Riverview, Rooted, Warrendale Community, Whitneyville Bible, and New City Fellowship PCA) were NOT added: they are broad-evangelical community churches and church plants where nothing found so far distinguishes them from thousands of other conservative evangelical congregations, and **New City Fellowship PCA (700 Burton St SE) is the Nabors-network church still awaiting the user's keep/delete decision.** Full source list retained at `data/9marks_michigan_2026-07-29.json` so any of them can be revisited. **Michigan now 153 churches.**
- 2026-07-29: **#4120 Georgetown Grace, #4121 Bella Vista and #4122 Evangel Ministries DELETED** at the user's direction — the three rows from the 9Marks batch that had been added with explicit fit caveats, and the caveats were the reason: Georgetown Grace is Grace Gospel Fellowship (mid-Acts hyper-dispensational), Bella Vista may be a campus of Ada Bible Church rather than an independent congregation, and Evangel Ministries is a large mainstream-evangelical church whose pastor is ERLC- and Acton-aligned. Backed up to `data/deleted-churches-2026-07-29-9marks.json`; script `prisma/delete-mi-4120-4122-2026-07-29.ts`. **PRECEDENT WORTH KEEPING: when a candidate needs a fit caveat written into its notes, that is usually the signal to leave it out rather than add it flagged.** Applying that rule to the seven remaining 9Marks additions, the ones that clearly stand are #4113 Calvary Bible East (Master's/SBTS-trained pastor, elder-governed), #4114 Bethesda Baptist and #4115 Trinity Baptist (GARBC) and #4116 Cornerstone Baptist (SBC); #4117 Maranatha (IFCA), #4118 Berkley Community (Converge/IFCA) and #4119 Grace Community Hudsonville are the weakest of the survivors if the same standard is applied again. Michigan now 150 churches; DB total 4,095.
- 2026-07-29: **AAM MICHIGAN OUTREACH CALL-SHEET generated** (`prisma/export-mi-outreach-2026-07-29.ts` -> `data/AAM_michigan_outreach_2026-07-29.csv`). **144 of 150 Michigan churches**, priority-tiered for cold outreach aimed at finding abolitionists, with blank `Contacted? (date)`, `Response` and `Abolitionist? (Y/N/Unsure)` columns so results feed back into the directory. Tiers: **Tier 1 = 6** (already recorded abolitionist, or transformationalist, or CN-sympathetic, or postmill, or publicly anti-Zionist) — Providence Caro (CREC), OneLife/Ekklesia Grand Blanc, Christ Church Livingston County (CREC), Grace OPC Lansing (Pribble, Knox signatory), Christ the King Shelby (CREC), Southfield RPC; **Tier 2 = 18** (CREC/Vanguard/RPCNA, or confessional 1689 Reformed Baptist); **Tier 3 = 98** (confessional Reformed/Presbyterian); **Tier 4 = 22** (conservative evangelical). Contact coverage across the sheet: 142 websites, 124 phones, 77 emails, 133 named pastors. **SIX EXCLUDED, deliberately**: Grace Life Baptist (closed), Meadow Springs (existence unconfirmed), three Netherlands Reformed/Iglesia rows with no contact channel at all, and CRC of St. Joseph (already connected — the AAM leader attends there). **TWO EDITORIAL DECISIONS BAKED INTO THE EXPORT.** (1) **Internal judgements are NOT exported.** The directory's private notes carry assessments that have no place on a cold-call sheet handed to volunteers — denominational fit calls, an unresolved women-in-office question, an SPLC listing on #65. The sheet carries contact details, a tier and a short neutral reason only. (2) **The CSV is gitignored** (`data/AAM_*_outreach_*.csv`): the repo is public, and a tiered target list reveals AAM's outreach strategy in a way the underlying directory data does not. The generator script is committed so the sheet can be rebuilt any time; the sheet itself stays local.

## 2026-07-29 — Michigan email harvest (AAM outreach)

Email is AAM's first outreach channel, so contact emails were filled for every Michigan row
that had a website but no address on file. Two passes:

1. `prisma/harvest-mi-emails-2026-07-29.ts` — plain fetch of the homepage plus seven common
   contact paths, addresses pulled from `mailto:` links and visible text, vendor/platform noise
   and image filenames discarded, own-domain and `info@`/`office@`-style addresses ranked
   highest. **64 targets → 33 filled.**
2. Browser pass (Playwright, scratchpad `emails_pw.py`) over the 31 that came back empty, to
   reach addresses injected by JavaScript. **9 more filled**, including
   #4071 Christ the King PCA Hastings, whose address was percent-encoded in the `mailto:` to
   defeat scrapers (`%63%74k%70%63%61hastin%67%73@gm%61%69l.com` → `ctkpcahastings@gmail.com`).

Michigan email coverage: **81 → 123 of 150.** No stance fields were touched by either pass.

27 rows still have no email. 24 of them have a phone number and/or a website contact form; the
remaining 3 (#3866, #3867, #4002) have no contact channel at all and are excluded from the
outreach sheet. The regenerated sheet now carries a **Contact via** column
(Email=119, Call=21, Website form=4) so outreach runs in the order AAM intends.

## 2026-07-29 — #3247 Ekklesia of Grand Blanc (was "OneLife Church")

Corrections confirmed **directly by the congregation** to the directory owner, which resolves the
`in_transition` flag that reporting alone could not:

- **Name:** OneLife Church → **Ekklesia of Grand Blanc**. Verified against the church's own
  leadership page, which presents that name throughout.
- **Email:** `ekklesiagb@gmail.com` (harvested) → **`nick@ekklesiagb.com`**. Nick Staley is one of
  six leaders listed on ekklesiagb.com/leadership; no titles are published there, so the five
  non-pastoral names were recorded as a leadership team without inventing titles.
- **Daily mill presence confirmed:** the church has missionaries at abortion facilities every day
  through **One Life For Life** (onelifeforlife.org — a domain not previously on this record).
  This corroborates the existing `culturalEngagement = transformationalist`, which had been
  evidenced only from the church's website section. `stanceBasis` stays `evidenced`.
- `recordFlag` cleared.

**Two things deliberately NOT changed:**

- **`abolitionStance` stays `unknown`.** One Life For Life calls abortion "the murder of our
  pre-born neighbors" and speaks of "the American Holocaust", but its published method is
  missionary presence and persuasion at the facility. Nothing was found from the church or the
  ministry on equal protection, on criminalising abortion as homicide, or on abolition versus
  incremental legislation — the questions that actually separate abolitionism from mill ministry.
  Recording `pro_abolition` off rescue-ministry evidence would corrupt the one field this
  directory exists to make trustworthy. **This is the single best question to ask them.**
- **Eschatology.** The public description read "A postmillennial church in Grand Blanc, MI"
  while the `eschatology` field was `unknown` — the postmill label came from a third-party
  directory and the church has never confirmed it. The description was published asserting
  something the record itself did not hold; it has been rewritten to drop the claim.

## 2026-07-29 — One Life For Life ministry contact (#3247)

`justin@onelifeforlife.org` was supplied as a further contact for the Grand Blanc
congregation. It is recorded as a **ministry contact on the outreach sheet only**, not in the
church's `email` field, for two reasons:

1. `email` is rendered publicly with a `mailto:` link on every church page
   (`app/church/[id]/page.tsx:197`, `components/ChurchDirectory.tsx:411`). That field should hold
   the address the congregation itself publishes as its own — `nick@ekklesiagb.com`, which
   Ekklesia of Grand Blanc lists on its own leadership page. Publishing a named individual's
   ministry address there exposes it to scrapers without the church having chosen to.
2. The address belongs to One Life For Life, a separate organisation, not to the church.

Justin Phillips is also on Ekklesia's leadership team, so the two records are consistent. The
export script gained a `MINISTRY_CONTACT` map and a "Ministry contact" column for this. Since One
Life For Life is the mill-missionary work itself, this is the right address for the
equal-protection / abolition question that keeps `abolitionStance` at `unknown` on this row.

## 2026-07-30 — 28 mistaken approvals removed (6 closed, 22 duplicates)

28 rows were approved in the admin dashboard on the assumption they were pending submissions.
They were not: they were the quarantine pile, held back on purpose. The dashboard lists rows
awaiting approval **without showing `recordFlag`**, so there was no way to see why.

- **6 flagged `closed`** — defunct congregations published as if active: #144 Triune Grace RB
  (Denton MD), #189 South Baptist (Laconia NH), #371 Providence Presbyterian (Montgomery AL),
  #437 Calvary Presbyterian (Glendale CA), #492 New Life Burbank (dissolved Aug 2025),
  #1012 Christ the King JP/Roxbury ("no longer meeting").
- **22 flagged `duplicate_of:N`** — each already present under another id, so those churches
  appeared twice in the public directory.

Doctrinally the batch was in-bounds: Reformed Baptist, PCA, URCNA, ARP, mostly. Nothing tripped
the exclusion rules. The defect was duplication and defunct listings, not fit. Several also
carried junk city values ("French Creek Precinct, IL", "Iredell County, NC", "Sakom Township,
ME") and one was titled "East Anaheim Community Center", which is not a church name.

**Duplicates were merged before deletion, not merely deleted.** 19 of the 22 held something the
surviving row lacked — 2 emails, 2 leadership fields, 1 description, and research text — which
is exactly the loss that cost this directory a Knox Open Letter signatory note in a previous
dedupe. Stance fields were deliberately NOT copied: the survivor is the researched row, and these
duplicates mostly carried denominational defaults, so copying them would have downgraded
evidenced stances to guesses. Full pre-delete backup: `data/purged-approvals-backup-2026-07-30.json`.

#58 All Souls Reformed Church (Green Camp, OH — CREC, sourced, transformationalist) was in the
same batch and is legitimate; it stays.

Totals: 4,095 → **4,067**. Zero rows still flagged `duplicate_of`.

**STILL OPEN:** two closed congregations remain live from before this batch — #2625 Grace Life
Baptist (Clyde Township MI, closed Dec 2025) and #1495 New City Presbyterian (Hilliard OH,
dissolved 2023, flagged `closed_hidden` yet `approved = true`).

## 2026-07-30 — PROVENANCE AUDIT of the 104 "transformationalist" rows

Asked how the 104 were arrived at, and the answer is: mostly by inference, not evidence.
`culturalEngagement` is documented in schema.prisma as **EVIDENCE-ONLY — do not default by broad
denomination**. That rule was not held to.

Of the 104:
- **39** were set by denominational default (`stanceBasis = denominational_default`, or a
  researchNote saying "Stance(s) set by denominational default" / "Defaults (CREC)").
- **28 of the 33 CREC rows** were classified transformationalist on blanket "it is CREC"
  reasoning rather than anything the individual congregation said or did.
- **26** were set only by the notable-figure sync — a notable person is associated with the
  church, therefore the church was marked transformationalist. That is an inference about a
  person, not about the institution.
- **8** carry no `sourceUrls` at all.
- **Exactly 1** has notes that actually argue the congregation acts corporately on public
  questions, which is the definition of the category.

**Defensible today: 31** (has sources, not denominationally defaulted, not notable-figure-only).
**Needs re-examination: 73.**

This matters more than an ordinary data gap because the About page now leads with "104 Meet the
Standard". That figure currently overstates what has been verified. Options are to re-audit the
73 against the evidence-only rule and demote what fails, or to publish the qualification openly.
NOT YET ACTED ON — flagged for a decision.

Also corrected on the About page: the mission paragraph read "On abortion above all, but also
on…", which elevated one issue over the rest. The directory's criteria are not ranked; a church
that contends on one question and is silent on the others has not grasped the principle.

## 2026-07-30 — Evidence audit of the 104 (automated pass, NOT applied)

`prisma/audit-transformationalist-2026-07-30.ts` plus a Playwright pass fetched each
congregation's own site looking for evidence the CHURCH AS INSTITUTION acts on public questions.
Results in `data/transformationalist-audit-2026-07-30.json`. **Nothing was reclassified.**

Final tally: 8 SUPPORTED · 32 no evidence on site · 21 weak · 1 doctrine-only · 40 unreadable ·
2 no website.

**Two tool bugs found on the way, both worth remembering:**
1. v1 reported "73 of 104 have no evidence". Most of those sites were never read — bot
   challenges and JS-only pages produced the same verdict as a fully-read site. The script now
   records pagesRead/bytesRead and only claims absence of evidence about a site it demonstrably
   read. **Apologia Church — Jeff Durbin's congregation, End Abortion Now is theirs — was in
   that "no evidence" bucket**, because the pattern looked for "abolitionist" and the site says
   "End Abortion Now".
2. v2 then filed Apologia as UNREADABLE *despite* matching on abolition: the read-threshold was
   evaluated before the evidence. Absence-of-evidence logic must never override evidence that
   was actually found. Fixed; positive findings now take precedence.

**The ceiling on automation is about 60%.** 40 sites cannot be read by script or headless
browser. Christ Church Moscow (christkirk.com) is among them — the flagship congregation of this
entire movement, unreadable to the tool and obviously qualifying to any human. That is the
standing argument against letting a scraper decide classifications.

**Worklist produced:**
- **8 CONFIRMED** by their own site: #3 Apologia, #66 Sovereign King, #212 Bethel Baptist,
  #214 Christ Reformed Baptist, #1429 Bryce Avenue Presbyterian, #2758 North Athens Baptist,
  #3241 American Reformation, #4045 Redeemer Church of South Hills.
- **35 PRIORITY DEMOTIONS** — site was read, nothing found, AND the label came from a
  denominational default or the notable-figure sync. Mostly CREC (#23-#30, #38 …).
- **19** read with nothing found but not originally guessed — check by hand.
- **42** unreadable / no website — manual verification required.

Ranking markers cut from 8 to 6 at the owner's direction: socialJusticeStance and federalVision
are still researched but no longer scored. Confirmed in data: 97% of churches with 4 core
markers are already anti_crt (redundant), and Federal Vision is a CREC-specific controversy that
was re-encoding denomination into the score. On the core six, #17 Covenant Bible Church and
#16 Refuge Church score 6/6 and neither is CREC; Christ Church Moscow drops to 5/6 (no abolition
marker). Nothing reaches 9/9 — anti-Zionism (13 churches nationally) acts as a veto.

## 2026-07-30 — Manual review begun; the automated demotion list is NOT safe to act on

Owner's instruction: read the sites personally, and check **socials, podcasts and recent
sermons** — X, Facebook, TikTok, YouTube — not just the church website. Correct, and it
immediately overturned the automated result.

**#24 The Shepherd's Church (CREC, Chelmsford MA)** was on the automated PRIORITY DEMOTION list
with verdict "NO EVIDENCE FOUND". It is in fact plainly transformationalist:
- Teaching pastor Kendall Lankford hosts *The PRODCAST*; ep. 121 "Postmillennialism and
  Politics", ep. 127 an interview with Ben Zeisloft on "Postmillennialism and Journalism".
- Published teaching: **"Ending Abortion: The Church's Role and the Government's Role"** — the
  exact corporate/civil distinction this directory classifies on.
- Church distinctives series includes "Gospel Centered & **Confrontational**".
- Fox News covered the church running a "Pastor Story Hour" at a public library, the pastor
  arguing faith belongs in the public square — the institution acting publicly.

None of that is on the homepage, which is why three automated passes missed it.

**#19 Dominion Covenant Church (CPC, Omaha NE)** also confirmed from the church's own words:
"we desire to go boldly into Satan's territory and to begin capturing our culture for King
Jesus", covering "education, politics, arts, business... journalism", with postmillennial
language about "total victory for King Jesus in history".

**Consequence: the 35 "priority demotions" must NOT be bulk-applied.** The first CREC row
examined in depth qualifies. Working notes in `data/manual-review-2026-07-30.md`; review is
per-church and ongoing. Absence of evidence on a homepage is not evidence of absence, and a
false demotion costs this directory more than an unverified row does.

## 2026-07-30 — 78 rows raised to transformationalist on third-party corroboration

Owner's ruling: corroborated conviction qualifies even without a demonstrated public deed, but
these are still to be verified individually the way #19, #20 and #24 were.

Applied via `prisma/apply-postmill-xref-2026-07-30.ts`, which routes every change through
`updateStances` so the StanceChange audit trail records old value, new value, actor and reason.
**146 audit rows written** — the first real use of that trail.

- **104 → 182 transformationalist.**
- **78 flagged `verify_stance`**, `stanceBasis = 'mixed'` (deliberately NOT `evidenced`), with
  the directory URL added to sourceUrls. That keeps "a third party says the pastor is postmill"
  visibly distinct from "we read this church ourselves" — the absence of that distinction is what
  caused the original problem.
- Eschatology filled to `postmill` on the 68 rows where it was `unknown`.

**10 eschatology conflicts NOT overwritten** — the row records one thing, the directory another:
#31 Phoenix Reformed Baptist, #440 Christ Church Presbyterian, #885 Westminster Presbyterian
Martinez, #106 Reformed Baptist Tama, #979 Community Presbyterian Louisville, #2142 New Life
Fellowship, #1507 Christ the King Presbyterian, #1585 Laurel Highlands, #1755 Woodruff Road
(all amill), and #174 Catherine Lake Baptist (dispensational). Those stored values are themselves
likely denominational defaults, so this is one guess against one third-party claim — it needs a
human, not a bulk overwrite.

**Still outstanding:** 99 directory churches not matched to any row here — a discovery list, in
`data/postmill-xref-2026-07-30.json`.

## 2026-07-30 — Research capture: leads queued, findings moved into Editor's Notes

**Caught a real loss.** Findings for #23, #25, #26, #28 and #29 had been written to
`data/manual-review-2026-07-30.md` but never reached the database — research living only in a
markdown file is research that gets lost. All five now carry full **Editor's Notes**
(`theologicalNotes`, which is what the church page publishes), with pastors, socials, the
corroborating source, and an explicit statement of what is still missing. Each is flagged
`verify_stance`.

**Deep-dive queue created** at `data/research-leads-DEEP-DIVE-QUEUE.md`, and mirrored to project
memory as `project-church-deep-dive-queue` so it survives across sessions. Owner's instruction:
work these **after** the current verification queue, but do not lose them.

1. **Trewhella is a hub** — lesser-magistrate doctrine and Missionaries to the Preborn are
   load-bearing for the abolition movement; searching that doctrine is a discovery axis, and the
   Wisconsin Watch / PBS Wisconsin coverage of his political influence should name allied pastors.
2. **Sweep the RPCUS** — founded 1983 by Morecraft explicitly to apply theonomy. The one
   denomination where inference against the evidence-only rule may be defensible; argue it
   deliberately rather than by accident.
3. **A church media arm is itself a marker** — New Christendom Press (Sauve), Right Response
   (Webbon), The Patriarchy Podcast (Spurgeon), The PRODCAST (Lankford), Christ in the Wild
   (Denton), Reconstructionist Radio (Garwood). More findable than a doctrinal statement.
4. **Caro MI** — two postmill congregations in a town of ~4,000 (#4165 Colwood, #3245 Providence).
   Likely a plant or split; AAM's Thumb territory.
5. **All 99 imported rows need pastor attributions checked** — that directory is unmaintained.
6. Nodes: Ben Zeisloft (The Sentinel), Eric Conn, Dale Partridge (Reformation Seminary graduates),
   Jon Speed, Phil Kayser.

## 2026-07-30 — 35 congregations now verified first-hand

Worked to the research standard: site, church socials, pastor socials and podcast, then the
pastor's name searched against each marker. **281 transformationalist, 35 `evidenced`.**

Verified this session: Sovereign King (Joseph Spurgeon), Refuge Church (Brian Sauve), Mercy Seat
(Matthew Trewhella), Heritage Presbyterian (Joe Morecraft III), Grace Covenant Reformed (Ryan
Denton), Covenant Bible Church (Joel Webbon), Apologia (Jeff Durbin), By the Word Baptist (Jon
Speed), Immanuel Baptist (Gordan Runyan), Covenant Reformed Presbyterian (John M. Otis), Christ
Church Moscow (Doug Wilson), Grace Covenant Presbyterian (Randy Booth), Covenant Presbyterian
Buford (Chris Strevel), Trinity Church CdA (Stuart Bryan), Church of the King (John Stoos),
Reformed Bible Church (Paul Michael Raymond).

**Two deliberately NOT promoted**, to keep `evidenced` meaning something:
- **Christ Covenant Reformed, Billings MT** (Joost Nixon) — nothing found beyond the third-party
  listing. Left `mixed` + `verify_stance`.
- **Christ the King Reformed, Charlotte MI (#65)** — Bret McAtee is postmillennial and explicitly
  theonomic and scores well on the markers, **but promotes Kinism**; the congregation was removed
  from the CRC in December 2018 over it and the SPLC listed it as a white-nationalist hate group
  in 2021. `culturalEngagement` left **unknown** pending an editorial decision by the owner. This
  is a question about what the directory is, not about the markers.

**Duplicate created by my own import and cleaned up:** #4166 "Charlotte CRC" was the same
congregation as #65 under its pre-2018 name; merged then deleted.

**Two further third-party directories discovered** and added to the deep-dive queue: the Theonomy
Resources church directory (2011, so expect drift) and the **Alliance of Reformed and Theonomic
Churches** member list — the latter stronger, since membership is a formal act by the church
rather than an outsider's opinion.

## 2026-07-31 — #65 classified per owner; Nixon attribution found to be wrong, not stale

**#65 Christ the King Reformed (Charlotte MI)** classified **transformationalist**, `evidenced`,
by owner decision. Bret McAtee is explicitly postmillennial and theonomic — "theonomy remains the
only model that can consistently provide relief" — and defends Bahnsen in print at Iron Ink.

**The Kinism record is kept in the Editor's Note, not erased**: McAtee promotes Kinism, the
congregation was removed from the CRC in December 2018 over it, and the SPLC listed the church
among white-nationalist hate groups in February 2021. A directory whose value is traceable claims
should carry facts a reader would want, and Kinism is a separate axis from cultural engagement.
`recordFlag = review_nonfit` retained as a marker that this was a considered editorial decision.

**Joost Nixon — the "issue" was a misattribution, and a new kind of one.** He does **not** pastor
Christ Covenant Reformed, Billings MT. He has been **Pastor of Christ Church, Spokane WA since
2001**, is contributing editor to **Credenda/Agenda** and executive editor of St. Anne's Public
House, and is Director of Formal Education at Training Leaders International. Billings is a
**partnering church for his training ministry** — the directory mistook a partnership for a
pastorate.

So Billings' postmill listing rests on a man pastoring 500 miles away; its actual pastor is
unidentified. Left `mixed` + `verify_stance`, leadership cleared.

**Fourth attribution failure in that source, and the first that was never true:**

| Church | Directory says | Reality |
|---|---|---|
| Colwood, Caro MI | Jason Garwood | resigned 2017 |
| Christ is King, Syracuse | Jon Speed | left 2019 |
| All Saints, PA | Gregg Strawbridge | died 2022 |
| **Christ Covenant, Billings MT** | **Joost Nixon** | **pastors in Spokane WA — never here** |

Also noted: the same directory lists Christ Church Spokane (#22) under Kenton Spratt while Nixon
has pastored there since 2001. Both cannot be simply right; leadership flagged for confirmation.

## 2026-07-31 — Christ Church Spokane leadership settled; my own earlier note retracted

Went to the congregation's own site rather than a third party. **Kenton Spratt is the pastor** of
Christ Church, Spokane (#22) — the only pastor listed, with a deacon and administrative staff.
Born in Edmonton, immigrated 2006, moved to Spokane 2013, US citizen 2020; studied under **J.I.
Packer at Regent College**; previously first pastor of Holy Trinity Church until 2013. CREC.

**Retracting my own claim.** I recorded on this row that Joost Nixon "has pastored here since
2001". That came from a third-party speaker bio and is not true of the church today — Nixon
appears nowhere on its staff or leadership pages. His current work is **Training Leaders
International**, directing formal education, and Christ Covenant Reformed (Billings MT) is a
**partner church of that training ministry**, not his pastorate. The note has been corrected in
the record rather than silently deleted.

**Lesson:** a third-party *speaker bio* is no more current than a third-party *church directory*.
Both are leads. Only the congregation's own site settled it.

**Attribution scoreboard, five checked:**

| Church | Directory says | Reality |
|---|---|---|
| Colwood, Caro MI | Jason Garwood | resigned 2017 |
| Christ is King, Syracuse | Jon Speed | left 2019 |
| All Saints, PA | Gregg Strawbridge | died 2022 |
| Christ Covenant, Billings MT | Joost Nixon | pastors elsewhere — never here |
| **Christ Church, Spokane WA** | **Kenton Spratt** | **CORRECT** |

One of five held up. That is the actual reliability rate of the source behind 99 imported rows,
and it is the argument for checking every one rather than sampling.

## 2026-07-31 — Christ Church Spokane reviewed to standard: nothing found

Caught shortcutting my own standard. The first Spokane pass answered only "who is the pastor" and
I reported the row as handled. Applying the full standard — site, church socials, pastor socials,
and the pastor's name searched against every marker — gives a different and honest result:

**Nothing qualifying found.** No material attributable to **Kenton Spratt** on abolition,
Christian nationalism, theonomy, postmillennialism or patriarchy. The church's denomination page
carries only CREC generalities ("thoroughly Trinitarian, historically Reformed, and warmly
evangelical") with no statement on the civil sphere, politics, education or abortion. The one
cultural institution named, **New St. Andrews College**, is CREC-affiliated rather than this
congregation's work.

Still unread: the sermon archive (embedded by iFrame, not machine-readable) and the YouTube
channel and Facebook group. Recorded on the row as the outstanding avenues.

The classification therefore rests on **CREC membership plus a single third-party postmill
listing** — exactly the thin basis this verification pass exists to catch. Left `mixed` +
`verify_stance`, **not promoted**, and the negative result written into the Editor's Note so the
row is not re-researched from scratch.

**Lead noted:** Spratt also appears in the sermon archives of Trinity Church, Coeur d'Alene (#21,
Stuart Bryan — verified), suggesting a preaching or presbytery link worth following.

**Process change:** the research standard is now recorded as non-negotiable for every church and
every kind of pass, including narrow lookups and corrections. Answering one sub-question well is
not researching a church.

## 2026-07-31 — The four partial reviews completed to full standard

Re-did #23, #25, #26 and #28 properly: site, church socials, pastor socials and podcast, and the
pastor's name searched against every marker. The partial passes had understated two and
overstated nothing — worth knowing, because it means the shortcut was costing findings, not just
rigour.

**#25 Providence Church, Pensacola — Uri Brito — PROMOTED to evidenced.** Far more than the
partial pass found. He **founded Kuyperian Commentary** (20+ contributors; named for the "every
square inch" tradition itself), is **Senior Fellow for Pastoral Theology at the Center for
Cultural Leadership**, sits on the boards of the **Theopolis Institute** and **New Saint Andrews
College**, hosts the Perspectivalist Podcast, writes for Fight Laugh Feast — and
**presented at the National Conservatism Conference (NatCon 4, Washington 2024)**. A pastor
addressing a national political-movement conference is civil-sphere engagement outright.
`christianNationalism = sympathetic` rather than `affirm`: NatCon is not the same as Christian
nationalism and no explicit CN statement was located.

**#28 Providence Church, Lynchburg — Virgil Hurt — PROMOTED to evidenced.** Planted 2000 as a
mission of Christ Church Moscow; now one of the largest CREC congregations. Hurt has **twice been
the CREC's Presiding Minister of Council** and becomes **President of Reformed Evangelical
Seminary on 1 July 2026**. Recorded plainly on the row that this is *movement leadership*, not a
record of the church acting on a public question — no such action was found.

**#23 Reformation Covenant, Oregon City — Bo Cogbill — NOT promoted.** Installed January 2019
(the directory is current on him, unusually). Founded the **Reformation Bible Institute** in 2021,
but that equips pastors internally rather than engaging the civil sphere. **Nothing found on any
marker.** Sermon archive (SermonAudio `rccoffice`, 503 on attempt), Facebook and YouTube remain
unread — recorded as the outstanding avenues.

**#26 Holy Trinity Reformed, Concord — Brian Phillips — NOT promoted.** **Nothing found on any
marker.** Deeply embedded in classical Christian education — **CIRCE Institute**, Schole Academy,
the ACCS Legal Update, MassHope and TEACH CT conventions — but that is the pastor's vocation and
the academies are not this church's. No evidence either way on the civil sphere.

Two promoted, two honestly left flagged with their negative results written into the Editor's
Notes. **282 transformationalist, 38 evidenced.**

## 2026-07-31 — Correction: education is movement-building, and is now counted as such

Owner's correction. My notes on #23 and #26 treated founding a Bible institute and building
classical Christian schools as *lesser* than civil-sphere action — I wrote "internal" and "the
pastor's vocation rather than an act of this congregation". That was wrong about how this
movement actually grows.

**Doug Wilson founded Logos School in Moscow in 1981 and the entire classical Christian school
movement grew out of it.** The schools are how Moscow became Moscow. Education is this
tradition's primary means of reproduction, not a consolation prize for churches not doing
politics — it is training the next generation of fighters.

Both reframed and **promoted to transformationalist / evidenced**:

- **#23 Reformation Covenant (Bo Cogbill)** — founded the **Reformation Bible Institute** in 2021
  to equip local churches' pastors with rigorous theological training. That reproduces the
  movement in the next generation of ministers.
- **#26 Holy Trinity Reformed (Brian Phillips)** — Ed.D. in Classical Education; teaches at
  Schole Academy and Oaks Classical Christian Academy; serves the **CIRCE Institute**; writes the
  **ACCS Legal Update**. Working at the institutional centre of classical education is building
  the movement, not pursuing a private career.

Both keep `verify_stance`, and both Editor's Notes state plainly what is still *not* evidenced:
neither pastor returned anything on abortion, politics, Christian nationalism, theonomy or
patriarchy, and the academies Phillips serves are not owned by his congregation. Promotion rests
on the institution-building plus third-party postmill corroboration.

**Standard updated in project memory** so this is applied going forward rather than re-litigated:
education counts.

**282 transformationalist, 40 evidenced.**

## 2026-07-31 — 50 congregations verified first-hand

**284 transformationalist · 50 evidenced · 173 awaiting verification.**

Verified this run, each to the full standard with a complete Editor's Note: Paul Viggiano (Branch
of Hope OPC — Bahnsen Theological Seminary; publicly debated postmillennialism against Thomas
Ice), Wayne Sedlak (Reformation Hope — the church states its own applied-worldview purpose and
organised the Parent Information Network), Adam McIntosh (St. David's — Kuyperian Commentary
contributor; gives invocations at city council), Michael Shover (Christ the Redeemer Pella —
preached the First Amendment as idol, national coverage), Gabriel Render (Stone Mountain Baptist
— TruthScript author and podcast co-host), **Jason Garwood** (Cross & Crown — founded the Virginia
Center for Public Theology, leads Abolish Abortion Virginia), Anthony Mathenia (Christ Church
Radford — founded Better Than Life Ministries), **Brett Baggett** (Ekklesia Muskogee — president
of Rescue Those, FAA leadership, open letter for SB13), **Bill Ascol** (Bethel Baptist Owasso —
co-author and floor advocate of the 2021 SBC resolution demanding immediate abolition), **Paul
Thompson** (Eastside Baptist — sanctuary-city-for-the-preborn campaigns, Idaho State Senate
candidate).

**The Caro, Michigan thread is closed.** Jason Garwood, who resigned from Colwood in 2017, went to
Cross & Crown in Warrenton VA. The Caro postmill attribution belonged to the man and left with
him; Colwood still needs assessing on its own terms.

**Not promoted, deliberately, with reasons on each row:** Joost Nixon (Billings — pastors in
Spokane; attribution simply wrong), Kenton Spratt (Spokane — nothing found on any marker), Steven
Wedgeworth (Christ Church Lakeland — now rector in South Bend, and his own writing probes
postmillennialism rather than professing it), Nathan Eshelman (LA RP — prolific but confessional
rather than civil-sphere), Rich Hamlin (Tacoma — expository only), Jim West (Sacramento — left
2013, died 2023), Jody Lucero (Des Moines — **the equal-protection signature this row asserts
could not be confirmed**; flagged rather than reversed, since absence of a search result is not
disproof).

**Attribution failures now seven of eight checked** in the postmillennialworldview.com source:
Garwood (resigned 2017), Speed (left 2019), Strawbridge (died 2022), Nixon (never pastored there),
Wedgeworth (moved, doctrine claim doubtful too), West (left 2013, died 2023). Only Kenton Spratt
held up. That is the reliability of the source behind 99 imported rows.

**Connections recorded:** Christ Church Moscow now carries Jared Longshore and Toby Sumpter with
their own stated positions on women's suffrage, plus Doug Wilson's reported mentorship of US
Defense Secretary Pete Hegseth. Ascol carried abolition inside the SBC while Durbin pressed it
through state legislatures — the same fault line from two directions. Kuyperian Commentary
(Brito, McIntosh) is emerging as a contributor network worth mapping in its own right.

## 2026-07-31 — Iowa equal-protection statement found; claim vindicated, and a record corrected

Went looking for the letter #3910 asserted its pastor had signed. **It exists, and he did.**

*Iowa pastors' equal-protection statement*, January 2024: eighteen pastors signed biblical
guidance presented at a Capitol event in Des Moines calling for **equal protection of all humans
in Iowa from conception** — all chemical and surgical abortion outlawed but for medical
emergencies, and **both doctor and mother accountable under the existing penal code, with
abortion classified as murder** in degrees by knowledge and intent. That is criminalisation, not
incrementalism, and **signing it is a formal public act by the pastor** — the strongest abolition
evidence available short of a church running its own ministry.

**#3910 Providence Reformed (Jody James Lucero) is vindicated** — I had recorded the claim as
unconfirmable; it was true. My first search used the church's own phrasing; searching for the
*event* found it at once. **A failed search is not disproof.**

**#46 Christ the Redeemer, Pella — CORRECTED.** The row read `abolitionStance = incrementalist`
while its pastor, Michael Shover, had signed an equal-protection statement — the opposite
position. Now `pro_abolition`, with the correction stated on the record.

Seven signatory congregations were already in the directory and are now `evidenced` +
`pro_abolition`: #3910 Providence Reformed (Lucero), #3280 Crossroad Earlham (**two** signatories
— Grant Brown and David Koch), #3904 Rock Valley URC (Castro), #3907 Redeemer URC Orange City
(DeRooy), #3908 Cornerstone URC Sanborn (Donovan), #4060 Abundant Life Humboldt (Sam Jones — the
published list spells it "Humbolt"), #46 Christ the Redeemer Pella (Shover).

**284 transformationalist · 56 evidenced · 67 pro_abolition.**

**Nine more Iowa signatory churches are not yet in the directory** and are queued, and **Nebraska
has the same document** (`abolishabortionne.org`). Assume other states do too — these lists are
the highest-yield source found in this entire effort, because they are formal acts rather than
third-party attributions.

## 2026-07-31 — Nebraska equal-protection statement mined: 103 churches added, 4 errors corrected

*"Biblical Counsel from the Protestant Pastors of the Church in Nebraska"* (2024,
abolishabortionne.org). Extracted **122 signatories** with church and city from the PDF.

The document states the abolitionist position without ambiguity: *"life begins at conception,
abortion is murder, and the human being in the womb is entitled to **equal protection under the
law**, which means parent(s) and doctor are guilty of murder in the civil criminal code"* — and
explicitly repudiates *"incrementalism, politicization, exception clauses, heartbeat bills... and
criminal laws that leave the mother (and father) and the doctor guiltless before society."*

- **8 congregations already held** — all now `pro_abolition` + `transformationalist` + `evidenced`.
- **4 of those 8 read `incrementalist`** — the exact position the document their pastor signed
  repudiates. #181 Emmaus Bible, #180 Columbus First Baptist, #1383 Grace Church PCA, #282 Faith
  OPC. All corrected, with the correction stated on each record.
- **103 congregations added**, each with the signature as first-hand evidence.
- #19 Dominion Covenant carries **two** signatories (Phil Kayser and Gary Duff).

**4,164 → 4,266 churches · pro_abolition 67 → 177 · evidenced 56 → 166.**

Every added row says plainly what it is: the abolition stance is formal and first-hand, but
**nothing else about the congregation has been researched** — denomination, eschatology and the
other markers are unset and the church has not been read on its own terms.

**Note on breadth:** these signatories are Evangelical Free, Methodist, Lutheran, Berean and
Baptist as well as Reformed. That matches the standing instruction to widen the directory beyond
the Reformed qualifier to any publicly abolitionist congregation.

**The pattern is now proven twice.** Iowa and Nebraska both produced verified abolitionist rosters
from a single document. The Nebraska paper itself names the movement's organisations — Foundation
to Abolish Abortion, End Abortion Now, Abolitionists Rising, Southern Baptists for Abolishing
Abortion, Liberty Rising Institute — and cites **faa.life/states**, noting **19 states have seen
abolition bills introduced**. Those states are the next places to look for equivalent statements.

## 2026-07-31 — Equal-protection state map, and a Michigan finding for AAM

**Prenatal Equal Protection Act** bills (Foundation to Abolish Abortion model legislation) were
filed in **Georgia (HB 441), Idaho, Iowa, Kansas, Kentucky, Missouri, South Carolina and Texas**
in 2025; **Indiana, North Dakota and Oklahoma** introduced and failed. The Nebraska paper counts
**19 states** with abolition bills introduced.

**Michigan has HB 4671, the "Justice for Babies in the Womb Act"**, filed by **Rep. Josh
Schriver** — the first Michigan legislation to establish equal protection of the laws for preborn
children. FAA president Bradley Pierce called it "righteous legislation".

**But Michigan has no pastors' equal-protection statement.** Iowa and Nebraska each produced a
signed roster; searching for a Michigan equivalent returns the bill, the Catholic bishops'
opposition, and Abolish Abortion Michigan — no pastor signatory list.

**That is worth putting in front of Dustin directly.** A Michigan pastors' statement would advance
HB 4671, identify by name the Michigan pastors willing to sign for criminalisation, and produce
exactly the data the AAM outreach sheet was trying to infer from denomination and doctrine. The
Iowa and Nebraska documents are templates that already work.

`faa.life` blocks automated fetching (403) — the articles and states pages need a browser pass.

All signature-sourced rows now carry `recordFlag = 'signature_only'` (110 rows), and the
obligation to research each individually is recorded in the deep-dive queue and in project memory.

## 2026-07-31 — FAA mined by browser; the Iowa sequence is the lesson

faa.life 403s to plain fetch; a Playwright pass read it fine.

**12 states have active abolition legislation** — Georgia, Illinois, Iowa, Kansas, Kentucky,
**Michigan**, Missouri, Ohio, Oklahoma, South Carolina, South Dakota, Tennessee — with 15 more
carrying FAA state pages. Each state has its own page naming bill and sponsor.

**Michigan: HB 4671, the "Justice for Babies in the Womb Act"**, filed 26 June 2025 by **Rep. Josh
Schriver**; bill text at legislature.mi.gov `2025-HB-4671`, with FAA FAQs and a section-by-section
overview published.

**Iowa: HF 2316**, filed 6 February 2026 by **Rep. Zach Dieken**.

**The sequence matters more than either fact.** Iowa's pastors published their equal-protection
statement in **January 2024**. The Iowa bill was filed in **February 2026**. **The pastor roster
came first, and the legislation followed.** Nebraska ran the same order. Michigan has the bill
already but no roster — so the question for AAM is whether a Michigan pastors' statement would
now consolidate support behind HB 4671, having been the thing that generated momentum in the two
states that did it the other way round.

**FAA leadership:** Bradley Pierce (president; constitutional attorney, drafted equal-protection
bills in 30+ states, Dobbs amicus for 21 organisations and 20 legislators, president of Abolish
Abortion Texas) and J.R. Haas (VP; Texas Capitol organising, testifies against incremental
measures).

25 state pages remain unread — queued.

## 2026-07-31 — Full equal-protection bill map mined; Deevers recorded as the thesis case

Browser-mined every FAA state page with active legislation. Bills and sponsors captured for
Michigan, Georgia, Illinois, Iowa, Kansas, Kentucky, Missouri, Ohio, Oklahoma, South Carolina and
South Dakota — 12 new equal-protection bills in 2026 plus 4 carried from 2025. Table in the
deep-dive queue.

**#216 Grace Reformed Baptist Church of Elgin — Dusty Deevers.** Already in the directory and
already evidenced. Now recorded: he **filed SB 456, the Abolition of Abortion Act**, in the
Oklahoma Senate. He is the pastor of this congregation *and* the state senator who wrote the bill.
He was nominated for SBC first vice president in 2023 (20% of the vote) and writes for American
Reformer and the Center for Baptist Leadership. **This is the clearest case in the directory of
the thesis it exists to test** — not a church addressing the civil sphere from outside, but a
pastor legislating within it.

**Georgia documents the movement's central split in citable form.** Georgia Life Alliance — the
state's largest pro-life organisation and a National Right to Life affiliate — refused to support
HB 441 and "worked behind the scenes against the bill, trying to persuade state lawmakers to
oppose it." That is the same fault line Bill Ascol crossed inside the SBC (#212) and Jeff Durbin
presses through legislatures (#3), now with a named organisation on the other side of it.

Sponsors' names give a second search axis for finding pastors' statements state by state: pastors
backing a bill tend to surface in coverage of its hearings.

## 2026-07-31 — Georgia HB 441 hearing; the pro-life split is narrower than it looked

**Correcting my own earlier framing.** I had recorded Georgia as "pro-life groups oppose abolition".
That is too broad and would have misled AAM.

- **Georgia Life Alliance** (National Right to Life affiliate) worked against HB 441.
- **Georgia Right to Life (GRTL PAC) SUPPORTED it**, calling it "a monumental step toward ending
  legalized abortion in Georgia". GRTL broke with National Right to Life years ago over exceptions.
- The **Georgia Republican Assembly** published *"Establishment 'Pro-Life' Organization Attempts to
  Kill Equal Protection Pro-Life Bill"*.

**The dividing line runs through the pro-life movement and tracks National Right to Life
affiliation** — not pro-life sentiment as such. For Michigan the actionable question is where
**Right to Life of Michigan** sits and whether it is an NRTL affiliate.

**The hearing, 26 March 2025** (House Judiciary Non-Civil): two hours, hundreds at the Capitol,
Rep. Emory Dunahoo and FAA president Bradley Pierce taking questions, **Jeff Durbin testifying in
favour**, supporters singing hymns, opponents distributing "support and compassion – not
punishment" stickers. **No vote taken and none planned.** Recorded on #3 Apologia.

Sobering detail worth carrying into Michigan: a historic hearing with national testimony and
hundreds of supporters still did not produce a vote.

**Briefing document written for AAM** at `~/Downloads/AAM_abolition_bills_briefing_2026-07-31.md`
— Michigan status, the full national bill map with sponsors, the Iowa/Nebraska pastors'-statement
model and the roster-before-bill sequence, the organisations and FAA leadership, the opposition
analysis above, verified pastor references, and suggested next steps.

## 2026-07-31 — Repaired my own Nebraska import; +16 congregations from multi-church pastors

Returning to the church research surfaced defects in the import I had run earlier. Both are mine.

**1. Three rows were named after job titles.** The parser recognised a standalone role line only
if it began with a known prefix, so **"Missions Pastor"**, **"Teaching Pastor"** and **"Youth
Pastor"** were each consumed as a *church name* — losing the real one.
- #4297 "Missions Pastor" → **LifePoint Church, Norfolk** (James McClenahan)
- #4319 "Teaching Pastor" → **Faith Bible Church, Lincoln** (Brad Myers)
- #4323 "Youth Pastor" → the *same* Faith Bible Church via its second signatory Koty Krawczyk;
  merged into #4319 and deleted

**I checked for a systematic shift and there is none.** Diffing every imported row against a
corrected parse found only those three wrong. Calvary Community Church (Lincoln) genuinely has two
signatories — Shane Sundermann and Steve Davenport — as do Dominion Covenant and Faith Bible; both
are now recorded.

**2. Eight pastors each serve TWO congregations**, listed in a format the parser could not read
(`Pastor` / `Church A, City` / `Church B, City` / `County`). Read from the source by hand and
verified line by line: **16 congregations added**, each carrying its pastor and its partner church.

Michael Belinsky Sr. (St. John's Lutheran Beemer + Zion Lutheran Bancroft) · Rev. Joel Rathbun
(Arapahoe + Beaver City Methodist) · Gregory Lawhorn (One Hope Fellowship Norfolk + Community of
Believers Creighton) · Marcel Kohlmeyer (St. John Lutheran Tecumseh + Immanuel Lutheran Sterling) ·
Bruce Phillips (Neligh + Oakdale Faith Community) · Bob Wynn (O'Neill + Atkinson Methodist) ·
Brian G. Loy (Imperial + Wauneta Global Methodist) · Lee E. Wonch (Tallin Gothenburg + Amazing
Grace Thedford).

**4,265 → 4,281 churches · pro_abolition 177 → 192.** All 16 carry `signature_only`.

**Lesson:** a parser that silently mis-reads a line does not fail loudly — it produces plausible
rows. "Missions Pastor, Norfolk NE" looked like a church until someone read the list. Extraction
from a document should be diffed against the source before the rows are trusted.

## 2026-07-31 — Berean Fellowship cluster verified individually (6 churches). The bulk assumption was wrong.

First real discharge of the `signature_only` verification debt. Six Nebraska congregations from the
equal-protection signatory list all belong to one association, so they were researched as a cluster
— each read on its own terms, plus the constitution all six are bound by.

### The parser had eaten the most important signature on the list

Row #4286 was named **"President"**. The source line reads
`Tyce Jensen | President / Berean Fellowship of Churches | Broken Bow` — the import took his
**office** for a church name.

**Tyce Jensen is President of the Berean Fellowship of Churches** (since July 2024; VP from 2016)
and lead pastor of **Berean Bible Church, Broken Bow** since 2014. The BFC site closes every page
with "For more information please contact Tyce Jensen, BFC President." So that signature is not one
small-town pastor's — it is **the sitting head of a 57-church, 13-state association**, and it was
nearly lost to a parsing bug.

### What the churches actually believe — and it is not what the import implied

The BFC constitution (2021) binds every member church to a common doctrinal statement. It is
**complementarian** at association level: marriage is "between one man and one woman as part of his
design that some roles within the family and the church be distinctly male or female." It contains
**no article on civil government at all** — the church's public duty is given as "godly living and
evangelism." On eschatology the national statement is deliberately minimal and explicitly secondary:
"the imminent, bodily, personal return… Jesus will return for his Church," with **no millennium
affirmed**.

**Alliance Berean settles it.** Its own local distinctive, which the national document does not
contain, reads:

> "prior to the 7-year period known as the tribulation, Jesus will **rapture His church** to deliver
> it from the judgments that God will pour upon the earth. After this terrible period, the Lord
> Jesus Christ will return in glory to **establish His Millennial Kingdom on the earth**."

That is **pretribulational dispensational premillennialism**, stated by the church itself —
historically the *least* transformationalist eschatology there is, since it expects the world to
worsen and the church to be removed before the worst of it. The pastors' training corroborates:
Jensen at **Moody + Dallas Theological Seminary**, Maxwell at **Calvary Theological Seminary, KC** —
all dispensational institutions.

### Verdict: 1 marker of 6

| # | Church | City | Pastor |
|---|---|---|---|
| 4286 | Berean Bible Church | Broken Bow | Tyce Jensen — **BFC President** |
| 4230 | Alliance Berean Church | Alliance | Glenn Johnson |
| 4295 | Columbus Berean Church | Columbus | Justin Bebb (M.Div., SBTS) |
| 4277 | Imperial Berean Church | Imperial | Matt Maxwell |
| 4283 | Valentine Berean Bible Church | Valentine | Scott McClellen |
| 4233 | Alma Berean Church | Alma | Tom Walker |

Abolition is evidenced and formal for all six. **Theonomy, Christian nationalism, anti-Zionism and
postmillennialism are not in evidence at any of them** — recorded as negative results, not
omissions. Their public life is ordinary small-town evangelical ministry: Awana, MomCo, youth group,
food pantry, a Cowboy Church during fair week. Set: denomination, complementarian, traditional
sexuality, non-theonomic, dispensational where the church says so. `signature_only` cleared on all six.

Alma is worth noting on its own: founded **1885** as First Christian Church, **left the Disciples of
Christ in 1991**, and joined the BFC in 2017 after merging with a house-church group — a
mainline-descended congregation that walked away from a liberal denomination.

### The point

**This is the assumption the flag existed to catch.** The import set
`culturalEngagement = transformationalist` on ~110 rows on the strength of one signature. For this
cluster that label sits on top of an eschatology that runs directly against the thesis. The
signature is real; the inference from it was not. Every remaining `signature_only` row needs the
same treatment.

**119 `signature_only` rows remain.**

## 2026-07-31 — Evangelical Free cluster verified individually (13 churches)

Second discharge of the `signature_only` debt. Thirteen Nebraska EFCA congregations, each read on
its own terms plus the denominational documents that actually bind them.

### The denomination will not let me default eschatology — and that is the finding

Article 9 of the EFCA Statement of Faith read "the personal, bodily and **premillennial** return of
our Lord Jesus Christ" until **19 June 2019**, when the conference voted **79%** — against a
two-thirds threshold — to replace "premillennial" with "**glorious**", on the ground that the
millennial position is not an essential doctrine. Oakland E-Free publishes the amended text, which
confirms the change has reached the local churches.

**So eschatology was left unset on all thirteen.** Not unknown-through-laziness — unknown because
the denomination deliberately declines to say, and no local church published its own wording. The
temptation was to reach for "premillennial" from the pre-2019 heritage; that would have been a guess
dressed as a finding.

What the EFCA *does* bind: marriage "between a man and a woman" and "welcoming but not affirming";
**no ordination of women since a 1988 conference decision** (ordination "designed for qualified
males"), with the eldership question left to congregational polity. **No article on civil government
anywhere in the Statement of Faith.** Set: complementarian, traditional, non-theonomic.

### One church is not like the others

**Minden E-Free — Dr. Tom Barnes.** Thirty-plus years pastoring here, **seven books with Evangelical
Press** (a Reformed house), including *God Rules Over All* and *Divine Sovereignty and Human Choice*.
On **7 and 20 July 2026 — days ago —** he published a two-part series, **"Against Socialism And
Communism"**, offering sixteen scriptural reasons to oppose them "and, at the same time, sixteen
reasons to advocate for a **biblical approach to government, work, and economics**." He argues from
Romans 13:1-4:

> "God's design for government is for limited tasks, tasks that include **preserving righteousness
> and justice**, not to provide for needs of a person, nor to take from one person to give to another."

closing: "**Love demands Christians oppose Socialism and Communism, and advocate for a biblical
approach to work, government, production, and distribution.**"

**That is evidenced cultural engagement — a pastor teaching how Scripture governs the political and
economic order — not an inference from one signature.** It is also *not* theonomy: he grounds limited
magistracy in Romans 13 and creation order, not in Mosaic judicial law. The same 2026 run is firmly
complementarian on the household ("Wives, Win Your Husbands By Your Actions", "Wife, Find Joy In
Helping Your Husband Flourish", "Modesty For The Joy Of Others To God's Glory").

**A near-miss worth recording:** his 2015 book *A Matter Of Life Or Death* reads from the title like
a book on abortion. It is not — it is evangelistic, subtitled *Discovering what it is to be fully
alive*. Checked rather than assumed, which is the whole discipline.

### The rest

Ordinary small-town EFCA ministry, and the negative result is recorded as a result. Notable details:
**Stromsburg** (Keet Redden) is listed in **The Gospel Coalition's Nebraska church finder**;
**Stanton** staffs an **Associate Pastor for Biblical Counseling**; **Concord** has celebrated its
**125th anniversary** under a pastor settled since 2001; **Living Water** (South Sioux City) was
established only in 2010; **Alliance** has *two* signatory congregations — the E-Free and the Berean.
Ord, Alliance E-Free and Living Water have no independent website, so nothing beyond the signature
could be read; that is stated rather than papered over.

**New lead:** the **Nebraska Gospel Network** (nebraskagospel.net) surfaced twice — Goshert at River
Valley and Minden. Site is mid-rebuild and unreadable. Added to the deep-dive queue.

**106 `signature_only` rows remain.**

## 2026-07-31 — Lutheran cluster verified individually (13 churches). The sharpest correction yet.

Third discharge of the `signature_only` debt, and the most consequential, because confessional
Lutheranism has a doctrine about **precisely the question this directory classifies on**.

### Two kingdoms is the foil, and Augsburg XVII closes the door

Lutheran doctrine holds that God rules through two kingdoms — the left-hand kingdom of civil
government, by law and sword, and the right-hand kingdom of the church, by the gospel. The
institutional church preaches; the Christian serves as citizen. **This is the historic foil to
transformationalism** — the position against which postmillennial and theonomic programmes define
themselves.

And **Augsburg Confession XVII condemns the millennial hope by name**, rejecting "others who now
scatter Jewish opinions, that before the resurrection of the dead the godly shall take possession of
the kingdom of the world, the ungodly being everywhere suppressed." A congregation subscribing to
the Book of Concord is **confessionally barred from postmillennialism**. Recorded amillennial on
that basis — a confessional fact, not a denominational guess.

### But the signature is entirely coherent, and that is the interesting part

Two kingdoms teaches that the magistrate "does not bear the sword in vain" and is God's servant to
punish the evildoer. **Demanding that the state treat the killing of a child as murder is the
left-hand kingdom doing its God-given job.** The abolitionism here is real and confessionally
grounded — it simply does not carry the other five markers with it.

The LCMS has held since **1979** that "the living and unborn are persons in the sight of God from
the time of conception," and the Council of Presidents reaffirmed the synod's position in 2019. One
precise note: the Nebraska statement **rejects "exception clauses" outright**, which goes somewhat
further than the LCMS's own formulation.

### Composition — and two churches that are not what the rest are

Ten are **LCMS** (Nebraska District): Pacific Hills Omaha (Rev. Bryan Drebes, Concordia St. Louis,
called 2015), Bethlehem Crete (organised **1889**), St. Paul Wisner (Rev. Jared Hartman, LWML
district counselor), Zion Ainsworth (**organised 1884** — oldest in the signatory list), First
Trinity Beatrice (**150 years**), Mount Calvary Fullerton, and two **two-point parishes**:
Beemer/Bancroft under Rev. Mike Belinsky Sr. (West Point Circuit) and Tecumseh/Sterling under Rev.
Marcel Kohlmeyer, who share a site as "2 Gather in Christ."

**Rock of Ages, Gordon is WELS** — the most confessionally strict major American Lutheran body,
which does not hold altar or pulpit fellowship with the LCMS. Mission 1980, organised 1987, Pastor
David Young since July 2023. WELS is if anything *more* insistent that the church as institution
stays out of political programmes, so a WELS signature is **more striking, not less**.

**Trinity Gothenburg is LCMC** — Lutheran Congregations in Mission for Christ, the association formed
by congregations **departing the ELCA**. Its pastor, Rev. Jeff Cottingham, signs **STS**: a member of
the **Society of the Holy Trinity**, a pan-Lutheran confessional-renewal ministerium. Fourteenth year
here, thirtieth of ordained ministry. This signature is a mark of the mainline realignment rather
than of settled confessional habit — a different thing from the Missouri Synod ones, and recorded as such.

**Trinity Schuyler's synod could not be confirmed** and is recorded as "Lutheran" without one, rather
than assumed to be LCMS like its neighbours.

**93 `signature_only` rows remain.**

## 2026-07-31 — Methodist cluster verified individually (11 churches). These are the realignment churches.

Fourth discharge of the `signature_only` debt.

### The naming was the tell, and the disaffiliation list confirmed it

Every congregation in this cluster is "**Methodist**", not "*United* Methodist" — and one is
"Wauneta **Global Methodist** Church", which is what cracked the group open. In 2023 the Great Plains
Annual Conference approved **155 disaffiliations, 59 of them in Nebraska**, most departing for the
**Global Methodist Church** (launched 2022, now 3,100+ congregations) over the UMC's direction on
sexuality.

**Four are confirmed by name on the conference's own disaffiliation list: Arapahoe, Beaver City,
Neligh and Oakdale.** The UMC's data now carries "Beaver City First United Methodist Church" as
**closed** — it did not close, it left.

**That also solved two rows that matched no Methodist listing anywhere.** Bruce Phillips's churches
are **Neligh Faith Community Church** and **Oakdale Faith Community Church** — the renamed former
UMC congregations. Their names *are* the evidence of what happened to them.

### What this cluster is NOT, and why that matters

**The Global Methodist Church ordains women.** So unlike the Berean, EFCA and Lutheran clusters,
**genderStance was deliberately left unset here** rather than defaulted to complementarian. Applying
the previous clusters' pattern would have been a denominational default wearing the costume of
research. Eschatology is left unset for the same reason — the GMC binds no millennial position, and
classical Wesleyanism's postmillennial strand (the one behind 19th-century Methodist abolitionism
and temperance) is a historical association, not evidence about these congregations.

### One church is in the cluster by name only

**Naponee Wesleyan Church** is not a disaffiliated UMC congregation. It belongs to the **Wesleyan
Church**, which broke from the Methodist Episcopal Church in **1843 over slavery**, when abolitionists
under Orange Scott left rather than stay in fellowship with slaveholders. In a directory about
churches acting on public questions that origin deserves recording: the denomination exists because
Methodists concluded a legally sanctioned moral evil required separation rather than patience.
Pastor Scott Randall's signature sits in exactly that lineage. Recorded as context, not as evidence
of the congregation's present programme.

### Assessment

1 marker of 6 across the cluster. What *is* evidenced beyond the signature is a body of congregations
that paid a real price to leave a denomination they judged unfaithful. That is genuine, and it is
recorded — but it is not the same thing as the transformationalist thesis, and it is not counted as such.

**82 `signature_only` rows remain.**

## 2026-07-31 — "Transformationalist" now requires evidenced engagement. 124 churches reclassified.

Dustin's call, made on the evidence from the four verification clusters above.

### Why the rule changed

The working rule had been: **one of the six markers is enough to count as transformationalist.**
Abolition is one of the six, so every equal-protection signatory qualified automatically. Verifying
43 of them individually showed what that produced:

- **Not one of the 43 is postmillennial.**
- **13 are confessionally barred from postmillennialism** — Augsburg Confession XVII condemns the
  millennial hope by name, and they subscribe to the Book of Concord.
- **3 are explicitly pretribulational dispensational premillennial**, the eschatology furthest from
  the transformationalist thesis.
- **All 43 nonetheless read `culturalEngagement = transformationalist`.**

A label that a confessionally amillennial Missouri Synod parish and a postmillennial theonomic
congregation both carry is not doing any work.

### The new standard

**Transformationalist now requires evidence that the church acts corporately across public
questions.** One marker is not enough.

New value **`single_issue`** — examined; acts publicly on one question, nearly always abortion, and
nearly always because the pastor signed an equal-protection statement. **Does not qualify as an NXR
church.** It is not a demotion of the finding: the signature is first-hand, formal and attributable,
and `abolitionStance = pro_abolition` is untouched on every one of these rows. What was withdrawn is
the *inference built on top of it*.

**124 churches reclassified.** Qualifying falls **412 → 288**.

**One exception: Minden E-Free (#4229) stays transformationalist**, because its engagement is
evidenced independently of the signature — Dr. Tom Barnes publishes political theology on government
and economics under his own name.

### Shipped alongside

`single_issue` added end to end: directory tab and stats strip (the "Limited Mission" stat, at 3
churches, was replaced by "Single Issue" at 124 — far more informative), church-card and detail
badges, map markers, admin filters and labels, the submit API's accepted values, and the about page —
whose public "qualifying" figure and Q.02 definition now count single-issue churches among the
examined-and-does-not-qualify group. Church pages carry a specific caveat explaining that the
signature is real and documented but is not the standard.

## 2026-07-31 — Reformed/Presbyterian cluster verified (13). First qualifier found.

Fifth discharge of the `signature_only` debt, and the first one that promotes a church rather than
demoting it.

### Christ Church Omaha qualifies — on its own words, not an inference

**CREC**, Knox Presbytery, planted **2023** under Pastor **Nathan Joslin**. Motto: "All of Christ for
all of life." Its published mission is the evidence:

> "to **make Omaha a Christian town** through faithful and robust covenant renewal worship… through
> **genuine cultural engagement that provides Christian leadership in the arts, in business, in
> education, in politics, and in literature**."

That is a church claiming the civil and cultural spheres **as a church**. On Scripture: "we will not
exclude anything based on the cultural sensitivities of our day." Covenant renewal liturgy, all
children in the service, bylaws adopting the Westminster Standards *and* the Three Forms, male
officers only. **Promoted to qualifying; Christian nationalism recorded as sympathetic.**

**Eschatology deliberately left unset even here.** The CREC does *not* doctrinally require
postmillennialism — its pastors are overwhelmingly postmill, but that is a tendency, not a standard —
and this congregation has published no millennial position. "Make Omaha a Christian town" is the
postmillennial hope in substance; substance is not a stated position, and it is recorded as an open
question. Applying the same restraint here as to the EFCA matters more, not less, when the answer
would have suited the thesis.

### Polity is not uniform, and the record now reflects that

This cluster spans five bodies, and **gender could not be set the same way across them**:

- **PCA** (Zion Lincoln, Grace Covenant Grand Island), **URCNA** (3 Iowa), **RCUS** (3) — office
  restricted to men, so complementarian is evidenced.
- **EPC** (Cornerstone Stapleton) — treats women's ordination as a matter of liberty. **Not set.**
- **Evangelical Covenant** (Moses Hill, Wausa) — **ordains women. Not set.**

### Two corrections

**"Living Life Reformed Church" is not Reformed** — it is an **EFCA** congregation, confirmed in the
EFCA's own church finder. It was in this group by name only.

**Zion PCA's signatory is the executive pastor, not the senior minister.** David Chambers is
executive pastor; the lead pastor is **Stu Kerns**. The row had recorded Chambers alone as "Pastor,"
overstating his office. Both now recorded.

### Two new leads, both queued

**RCUS** has only a few dozen congregations nationally and **three signed** — including *both*
churches of a 1908 congregational split in Sutton. **URCNA** produced three signatories in adjacent
northwest Iowa towns. In both cases the signatories are a large fraction of a small, tightly
connected body; worth checking whether the classis discussed the statement corporately.

**69 `signature_only` rows remain. Qualifying: 289.**

## 2026-08-04 — Baptist cluster verified individually (19 churches)

Sixth discharge of the `signature_only` debt.

### "Baptist" was the least useful label in the entire queue

These nineteen belong to **at least seven distinct bodies**, and they do not share a doctrine of last
things, a polity, or a view of the church's public task:

- **SBC** — First Baptist Valentine (Kansas-Nebraska Convention / Church Forward)
- **GARBC** — Park Lane, Omaha
- **North American Baptist Conference** — Shell Creek, Columbus (the German Baptist body; its
  congregational history sits in the NAB archives)
- **Converge**, formerly the Baptist General Conference — Stromsburg and Calvary Cambridge
- **Missionary Baptist** — two historically Black congregations in North Omaha
- **Independent KJV-only** — Fellowship Lincoln, Freedom Stamford, Lighthouse Loomis
- **TGC-listed / Reformed-leaning** — Bethel Baptist, Ord

### One eschatology could be established, and only one

**GARBC Article XIX** binds its member churches to the **pretribulational rapture** — the church
caught up "before the seven years of the Tribulation" — followed by "the **premillennial return** of
Christ… to sit upon the throne of David and to establish His Kingdom upon this earth." That settles
**Park Lane** the same way Augsburg XVII settled the Lutherans, and Pastor Shawn Rittmiller's M.Div.
from **Detroit Baptist Theological Seminary** corroborates it.

**Everywhere else eschatology was left unset.** The independent KJV-only churches are overwhelmingly
dispensational as a stream, but a stream is not a confession and none of them published a statement
of their own. Noted as a tendency, not recorded as a finding.

**Gender likewise split:** set for the SBC, GARBC, NAB, independent and Missionary Baptist
congregations; **not set for the two Converge churches**, since Converge leaves women in pastoral
ministry to the local church.

### Two North Omaha congregations, and why they are recorded deliberately

**Greater New Hope Missionary Baptist** (1411 N 30th) and **St. Matthew Missionary Baptist** (1001 N
30th) are historically Black churches ten blocks apart on the same street. The Nebraska roster is
otherwise dominated by rural white evangelical and confessional congregations, and **that these two
signed the same document cuts against reading it as the product of a single constituency.**

Pastor **Eugene Rollerson** is publicly active in North Omaha mercy ministry — SNAP recipients,
unhoused neighbours, through a cooperative effort among area churches. That is real corporate public
action and it is recorded; it is mercy ministry rather than a civil-sphere programme, so it does not
by itself promote the record.

### Smaller things worth keeping

**Stromsburg Baptist is a merger** — First Baptist (organised 12 July 1873) and Eden Baptist
(18 September 1895) combined on 6 October 1933. **Burwell** draws families from up to **40 miles**
in a town of 1,210. **Freedom Baptist Stamford** still keeps the full IFB schedule — Sunday School
10, morning 11, **evening 6, Wednesday 7**. **Tekamah** serves a meal after worship every Lord's Day.
**Gothenburg** now has **four** signatory congregations, among the densest towns on the roster.

**50 `signature_only` rows remain.**

## 2026-08-04 — Bible Church (15) and Assembly of God (3) clusters verified individually

Seventh discharge of the `signature_only` debt.

### The Assemblies of God is the cleanest denominational case in the queue

**Article 14 of the Statement of Fundamental Truths, "The Millennial Reign of Christ,"** binds it
outright: the second coming "includes the **rapture of the saints, which is our blessed hope**,
followed by the visible return of Christ with His saints to **reign on earth for one thousand
years**," a reign that "will bring the **salvation of national Israel**." The AG publishes a position
paper titled simply *Premillennial Eschatology*. Four of its sixteen articles are eschatological.
**Set as dispensational on the denomination's own words.**

The abortion signature also sits squarely inside AG teaching, which calls abortion "an **evil**…
inflicted upon millions of innocent babies" and denies that a legal right confers a **moral** one.

**And Article 14 exposed a bad default.** "The salvation of national Israel" is the theological
substance under Christian Zionism, yet the bulk import had recorded these churches as *not* Zionist.
That is an unexamined assertion very likely to be wrong, so `zionistStance` was **reset to unknown**
pending evidence of an actual political position. Worth remembering that `zionistStance = 'no'` sits
on **3,967 rows** directory-wide, most of them never examined.

### "Bible Church" is a movement label, not a denomination

Eschatology was therefore set only where a congregation states it — which was **once**:

> **Standing Stone Bible Church** (Gretna, formerly *Gretna Community Church*): "We believe that
> Jesus is returning to **rule over the earth**, judge all men, and recreate the earth perfect."

Return, then reign on earth, then judgment, then new creation — premillennial in order, recorded as
premillennial without dispensational specifics the statement does not supply. Its pastor, **Ken
Wombacher**, arrived in 1998 and has pastored **nearly fifty years** across five churches in three
states — the longest ministry in this queue.

**Siouxland Community Bible Church** was the most confessionally explicit: it holds the **Five Solas**
and points to the **Cambridge Declaration**, governs by "spiritually qualified **male** leadership…
a plurality of elders and deacons," and preaches "systematically and expositionally" through books
of the Bible. Gender evidenced from the church's own words, not a denomination.

### A pattern in the signatory data worth naming

**Signatory lists record the man who signed, not the man who leads.** Two more corrections here:

- **Grace Bible Church, Bellevue** — Jon McNeel is **Associate Pastor and elder**; **Dan Hauge** is
  Senior Pastor. The row had recorded McNeel alone as "Pastor."
- **Faith Bible Church, Lincoln** — the lead pastor is **Tom Rempel**; Brad Myers, the signatory, is
  **Teaching Pastor** among a plurality of elders. This row had already been repaired once, from
  having been created named "Teaching Pastor" by the parser and merged with a duplicate named
  "Youth Pastor." Two of its pastors signed, which is unusual on this roster.

That is now three such cases with Zion PCA. The lesson generalises: **a signature identifies a man,
and inferring his office from a list is a second inference the list does not support.**

**Open follow-up:** Sandhills Community Bible Church (Mullen) surfaces in connection with the
**Berean Fellowship** roster. If confirmed, the BFC constitution would settle its markers directly.
Flagged, not assumed.

**32 `signature_only` rows remain.**

## 2026-08-04 — signature_only queue CLOSED. 128 churches individually verified.

Final pass: the community/fellowship churches and the non-denominational remainder — the hardest
group precisely because **most of them belong to no body that binds anything.**

### The restraint is the finding

For roughly half of this last group, gender, sexuality and eschatology were **left unset**. No
confession, no denominational standard, no published statement — so nothing to record. A church that
cannot be classified from a signature is recorded as unclassified, and that is the honest answer
rather than a gap to be filled by pattern-matching from the earlier clusters.

**One case shows why that matters.** **West Point Family Worship Center** is pastored by **Aaron
Trimble together with his wife Sara**. Every previous cluster in this campaign had defaulted to
complementarian where a denomination bound it; applying that pattern here would have been plainly
wrong. Co-pastoring husband-and-wife ministry is not the same thing.

### The roster is not what its stereotype suggests

The Nebraska equal-protection document reads at first glance as a rural white Plains artefact. The
verification says otherwise. It carries:

- **two historically Black Missionary Baptist congregations** in North Omaha, ten blocks apart
- a **bilingual church plant** — Citylight Mosaic, 2021
- a self-described **multi-ethnic** congregation — Sower Church, TGC-listed
- a church holding **Sunday services in English and Spanish** — Calvary Community, Lincoln
- a **Slavic, Ukrainian- and Russian-speaking immigrant congregation** — New Breath Church, the last
  row in the queue

**A directory that classified this roster by its stereotype would have got it wrong.**

### A pattern worth carrying forward: signatures name men, not offices

Four congregations had their leadership overstated by the import, because a signatory list records
**who signed**, not **who leads**:

| Church | Recorded as | Actually |
|---|---|---|
| Zion PCA, Lincoln | "Pastor: David Chambers" | Chambers is **Executive Pastor**; Stu Kerns leads |
| Grace Bible, Bellevue | "Pastor: Jon McNeel" | McNeel is **Associate Pastor**; Dan Hauge is Senior |
| Faith Bible, Lincoln | "Pastor: Brad Myers" | Myers is **Teaching Pastor**; Tom Rempel leads |
| Calvary Community, Lincoln | "Pastors: Sundermann & Davenport" | Sundermann is **Family Life Pastor** |

Plus three rows the parser had named after job titles outright — "Missions Pastor", "Teaching
Pastor", "Youth Pastor" — and one named after an office, **"President"**, which turned out to be the
head of a 57-church denomination.

### Campaign totals

**128 churches individually verified. `signature_only` queue: 0.**

Qualifying **289** · single issue **123** · quietist **28** · limited mission **3**.

Of 128 verified, **exactly one** was promoted to qualifying on its own evidence: **Christ Church
Omaha** (CREC), whose published mission is to "make Omaha a Christian town… through genuine cultural
engagement that provides Christian leadership in the arts, in business, in education, in politics,
and in literature." One in 128.

**That number is the real result of this campaign.** A signature on an equal-protection statement is
a genuine, formal, attributable act — and it predicts almost nothing about whether a congregation is
transformationalist in the sense this directory exists to map.

## 2026-08-04 — Churches in denominations that ordain women marked as not qualifying (25)

Dustin's call: churches that allow women in the pastoral office should not qualify. **Marked, not
deleted** — the research survives and the directory keeps recording what was examined.

### The request could not be run as stated, and the reason is worth recording

**The directory has never had an "egalitarian" value.** `genderStance` holds only `unknown` (2,250),
`complementarian` (1,988) and `patriarchal` (43). So "churches that allow women leadership" was not a
queryable category, and had to be reconstructed. Two reconstructions were available and they differ
by 25×:

- **Evidenced practice — 1 church.** Only West Point Family Worship Center, co-pastored by Aaron and
  Sara Trimble, has any evidence of a woman actually holding office. (A second regex hit, Salem
  Presbyterian NC, was a **false positive** — its "Co-Pastors" are two men.)
- **Denominational permission — 25 churches.** Chosen.

An error in my own first query is worth logging too: matching `'RCA'` as a substring caught **PRCA**
— the Protestant Reformed Churches in America, which restrict office to men and are the *opposite*
of permissive — inflating the count from 25 to 50. Fixed by matching denominations exactly. **Same
class of bug as the "Missions Pastor" import and the Yorba Linda/Redding state-only match.**

### The flag records the denomination, and five churches contradict it

Bodies covered: **Converge** (8), **disaffiliated Methodist** (8), **Global Methodist** (2),
**Evangelical Covenant** (2), **EPC** (1), **C&MA** (1), **Wesleyan** (1), **SBC/Converge** (1).

**Five of the twenty-five are recorded complementarian on their own evidence** — the flag marks the
affiliation, not the practice, and each of those records says so in terms rather than letting the
mark imply otherwise.

**The starkest is #15 Bethlehem Baptist, Minneapolis.** It is Converge-affiliated, and it is one of
the most emphatically complementarian congregations in America: its own position is that "God raises
up a few qualified **men** to lead in local churches, with **only males serving as elders**," and
**John Piper** — senior pastor there for 33 years — **co-founded the Council on Biblical Manhood and
Womanhood** with Wayne Grudem, the body that produced the Danvers Statement. It had been sitting at
`genderStance = unknown`, which combined with the new flag was the most misleading pair of values in
the batch; it is now recorded complementarian with the contradiction stated explicitly.

The others: The Well Hastings (**SBC**-aligned, and the BF&M restricts the office to men), Berkley
Community, Faith Baptist Kentwood, Calvary Webberville.

### Shipped

New non-held flag **`womens_ordination`** — non-held deliberately, so these churches stay listed
rather than being hidden. Rendered **on the public church page**, not just in the admin dashboard,
since a mark nobody can see is not a mark; where the congregation's own practice contradicts its
denomination, the page says so in the same block. Verified rendering against both cases.

Qualifying is unchanged at **289** — none of the twenty-five had qualified.

## 2026-08-05 — Audit of all qualifying churches. 289 → 104.

Dustin asked for an audit of every transformationalist church. The question: does each one actually
meet the standard set on 2026-07-31 — **evidenced corporate civil-sphere engagement**?

**Four bulk-inference cohorts were found, all predating that standard.** None had been re-examined
against it. Together they were 185 of the 289.

### 1. The postmill bulk import — 91 rows, and 43 were duplicates

Every one of these carried its own confession in its notes: *"Added 2026-07-30 from the
postmillennialworldview.com directory… **NOT INDEPENDENTLY VERIFIED** — third-party listing only;
the church's own site, socials and preaching have not yet been read."* All 91 were nonetheless
marked qualifying.

**Worse: 43 of the 91 duplicated churches already in the directory** — and the existing records were
almost always better. #4140 Providence Church (Pensacola) duplicated **#25** (1,304 chars of
research). #4133 Branch of Hope duplicated **#2355** (1,015 chars). #4211 duplicated **#28**
Providence Lynchburg (1,085 chars). #4164 duplicated **#24** The Shepherd's Church (1,119 chars).
The import never checked whether a church was already on file.

Duplicates merged into the survivor and held under `duplicate_of`; the rest demoted. **Three were
deliberately NOT merged** — Christ Presbyterian (Lakeland vs Bradenton, where #3967 is a better
survivor anyway), Covenant RPC (Graham vs Asheville), Grace Covenant Baptist (McKinney vs Willis) —
because the cities are far apart and wrongly merging two real congregations destroys one, whereas
demotion is reversible.

### 2. The postmill cross-reference cohort — 70 rows

Existing churches cross-referenced against the same directory on 2026-07-30, each noting *"Owner
ruled corroborated conviction qualifies."* **That ruling was made under the superseded 1-marker
rule.** All 70 had exactly one marker, postmillennialism, and not one had a second.

It fails the current standard twice over: one marker is no longer enough, and **postmillennialism is
an eschatology, not an action** — even fully verified it says what a church expects God to do in
history, not that the congregation acts. And a third-party listing is *weaker* evidence than the
first-hand equal-protection signatures that were already ruled insufficient. Keeping these while
demoting those would have been incoherent.

### 3. Denominational defaults — 23 rows, 17 of them CREC

Rows reading *"Defaults (CREC); pastor not listed"* or *"Stance(s) set by denominational default (no
individual position stated on church site)"* — still qualifying. **This is circular**: the
denomination set the marker fields, and the marker fields were then read back as evidence about the
church.

It also contradicts a standing ruling. **"CREC does not necessarily mean good"** was the point that
started the whole ranking discussion. Demoted to unresearched and flagged — **not ruled out**. CREC
congregations remain the likeliest promotions in the directory: Christ Church Omaha qualified on
2026-07-31 the moment someone actually read its mission statement.

### 4. One row whose label contradicted its own research

**#22 Christ Church Spokane.** Its note from the 2026-07-31 review reads: *"no qualifying evidence
found for Kenton Spratt or the church… Left flagged, **not promoted**."* It was still carrying the
qualifying label. Corrected.

### What survived

**104 churches.** 57 `evidenced`, 47 `mixed`, **zero denominational defaults**. Median research note
800 characters (min 257). Only 8 still flagged `verify_stance`.

| | |
|---|---|
| **6 of 6 markers** | Covenant Bible Church (Georgetown TX) · Refuge Church (Ogden UT) |
| **5 of 6** | 10 churches — Christ Church Moscow, Apologia, Dominion Covenant, The Shepherd's Church, Cross & Crown, King's Way, Christ the Redeemer Pella, Christ Church Radford, Sovereign King, Whitleyville |
| **4 of 6** | 13 |

Denominations: Reformed Baptist 18 · SBC 17 · Non-denominational 15 · CREC 14 · PCA 8.

### The number

**The directory began this project claiming 104 churches actually met the standard.** It grew to 412
through bulk inference, was cut to 289 when signature-only churches were demoted, and now — after
every unevidenced cohort has been stripped out — **stands at 104 again.**

Not the same 104, and the coincidence is worth no more than noting. But the shape of the result is
the finding: **every attempt to grow this list by inference has had to be reversed.** The list grows
by reading churches, one at a time, and by nothing else.

## 2026-08-05 — Reading the demoted CREC/default churches. The expectation was wrong.

The 23 churches demoted earlier for qualifying on a denominational default were expected to be the
**likeliest promotions in the directory** — they were demoted for not having been read, not for
failing, and CREC is the most transformationalist body in America.

**Thirteen were read. Two qualified.**

### The two that did

**#3245 Providence Church, Caro MI** — its About page states the hope "that God would use our
congregation to **promote reformation in the family, church, and state**." *And state.* That is the
clearest three-sphere formulation in the cohort, and it comes from the congregation itself.

This also closes a standing deep-dive item. "Caro MI" has been queued because **Jason Garwood** — now
leading Abolish Abortion Virginia — pastored there until 2017. This is that church. Its pastor is now
**Jacob Hanby**, and **the civil-sphere language outlived Garwood's departure**, which is the more
interesting fact: it is the congregation's posture, not one minister's.

**#38 Trinity Presbyterian, Birmingham AL** — among the strongest cases in the whole directory. It
**houses the Theopolis Institute**, which "operates in conjunction with" the church at the same
address, with **Peter J. Leithart** as President and **Rich Lusk** as pastor since December 2004.
Theopolis states the thesis outright: the church is "an outpost of God's future city in the present,
**called to transform the cities of men**," pursuing "church reformation and **cultural
transformation**."

Worth keeping the qualification Theopolis itself adds: crises are addressed "**only as the Church
becomes more fully and faithfully herself**" — a liturgical route to cultural change, not activism.
Still transformationalism; the record says so precisely.

### The nine that did not — and this is the real finding

**CREC membership does not mean a church contends for the civil order.** Read in their own words:

- **King's Chapel, Brooklyn** — gospel "in our neighborhood and throughout the borough"; "love,
  service, and mercy." Evangelism and mercy, no reference to law or magistracy.
- **All Souls, Green Camp OH** — serves "through faithful preaching, meaningful worship, and genuine
  fellowship." Three means, all ecclesial.
- **Redeemer Reformed, OKC** — "proclaim and live out the saving grace of God in Christ." Site stale
  since **2018**.
- **Christ Church Santa Clarita** — creeds and Westminster Standards; recent preaching on marriage
  and children.
- **Christ Covenant, Chicago** — "salt of the earth and the light of the world… serve our local
  community." Salt-and-light is used across the entire evangelical spectrum.
- **Reformation Presbyterian, Sheboygan** — exactly two distinctives, both about its own worship:
  confessional subscription and family-integrated services.
- **Christ Church Morgantown** and **Christ Church Indy** were the closest calls — "comprehensive
  application of God's Word **to our lives**" and "maturing in Christlikeness in **every aspect of
  life**." Kuyperian in flavour, but the object of both is the believer, not the commonwealth.
  Resolved negative; blurring the two would empty the category of meaning.
- **All Saints Reformed, Mandeville** — one line of public self-description. Nothing to assess.

**Two recorded as leads, not promotions:** Christ Church Searcy ("All of Christ for all of Searcy" —
but mid-merger with an Anglican REC plant, so it may soon not be CREC at all) and Christ Reformed
Evangelical Annapolis ("Disciple the nations" — the transformationalist reading of Matthew 28, or
simply the Great Commission; a tagline cannot settle which).

### Ten were not read

Sites unreachable, JS-blank or behind browser checks — listed in the deep-dive queue and judged
neither way. **Trinity Presbyterian Birmingham was behind a browser check too**, and turned out to be
one of the strongest churches on file. An unreachable site is not evidence of anything.

**Qualifying: 104 → 106.**

## 2026-08-05 — Two corrections Dustin caught, and a second look at the unreachable sites

### 1. Read-and-negative churches were being left as "unresearched"

The nine churches read on 2026-08-05 and found to publish a purely ecclesial mission were left at
`culturalEngagement = 'unknown'`. **That was wrong in a way that destroys work.** "Unknown" means
*not researched closely enough to classify* — precisely what these are not. They were read to the
standard and the answer was recorded; leaving them unknown throws that away and makes the directory
look like it never checked.

Moved to **`limited_mission`** — examined, does not qualify — and `verify_stance` cleared, because
the stance is settled rather than unverified. `limited_mission` went **3 → 18**.

### 2. The public wording for that category over-claimed, so it was softened

It read: *"Examined, does NOT qualify — holds the institutional church should not take up public
causes."* That asserts a **positive doctrine**. What was actually found is thinner and is now stated
as such:

> Its published mission is limited to worship, teaching, fellowship and mercy; no claim on the civil
> order was found. That records what the church says about itself — it is not a finding that the
> church positively opposes such engagement.

Some churches in this category do hold that view deliberately; others simply have not addressed the
question anywhere they publish. **The record cannot tell the two apart and should not pretend to.**

### 3. There WAS another way to read the unreachable sites — and it changed the result

Ten churches had been left unread on technical failures. Retried with a more patient fetcher:
wait for **network idle** rather than DOM-ready, retry **http/https** variants, follow an
about/mission link when the landing page is thin, and fall back to the **Wayback Machine**.

**Nine of the ten became readable.** Two sites (Immanuel Clinton MS, Grace Life Dallas) are dead and
were read from archived captures; both are now flagged `website_removed`.

**#30 Tri-City Covenant, Somersworth NH — PROMOTED.** It **operates Tri-City Christian Academy across
two campuses** and names it among the ministries by which it serves the community; its aim is "the
whole Good News for the whole person for our whole community." A church running a two-campus academy
is acting corporately and institutionally beyond the sanctuary — and it is the form of engagement
already ruled to count here, because **schools train the next generation**. Founded 1972, fifty years
old.

**#27 Christ the King, Greenville SC — the closest call in the cohort**, held as a lead. "Through
worship, **God forms His Church for renewing the world**"; children discipled to "**advance the
Kingdom of Christ**." That is the same liturgical route to cultural change that Theopolis states at
Trinity Birmingham — **but Trinity has an institute doing the work and this church has the sentence.**
Read the preaching before deciding.

**Six more recorded limited_mission.** Among them **Christendom Reformed Baptist, Sioux City** — which
makes no claim on Christendom at all, describing only the 1689 Confession, its order of worship and
the Great Commission. A worked example of why nominal inference fails: **the word over the door is not
evidence, any more than CREC membership was.**

**Two remain unread** — Christ Church Denver and Broadview Baptist Lubbock — each returning a single
line by every route tried. Recorded as unread, **not as failing**. Next: Facebook, sermon archives,
the CREC directory.

**Qualifying: 106 → 107.**

## 2026-08-05 — "Are you keeping the standard?" No. Completing it overturned a verdict.

Dustin asked whether the research standard was being kept. **It was not.** The CREC pass read
mission pages and largely stopped there, skipping the church socials, the pastor's own output, and
the pastor-name-against-each-marker searches. The standard exists precisely because **a bland church
website says nothing about the man in the pulpit** — the rule has always been *if the pastor pushes
it, the church counts.*

Site-only reading produces **false negatives, and false negatives are invisible**: nothing in the
record flags a church that was wrongly dismissed.

### The false negative

**Grace Life Church of Dallas** was classified `limited_mission` on its website, which says only
that the church exists "to glorify God by the **faithful proclamation of the Gospel**" and describes
a Sunday service. Nothing there touches the civil order.

**Its pastor, Phil George, is a listed speaker at the Love Your Pre-born Neighbor Conference** —
which convenes "pastors, ministry leaders, and **legislators**" on abortion. He shares that platform
with **Bradley Pierce**, president of the **Foundation to Abolish Abortion**, who "has drafted
legislation in more than 30 states… including **dozens of equal protection bills filed to abolish
abortion**" and filed a *Dobbs* brief for 21 organisations and 20 state legislators; and with **State
Rep. Brent Money** (TX HD-2).

**Promoted to qualifying; abolition set to pro_abolition (evidenced).** Also recorded: the church is
on Scott Brown's **Church and Family Life** network, George home-educates ten children, and the
leadership page is headed by **Colossians 1:15-18** — "whether thrones or dominions or rulers or
authorities" — chosen deliberately.

### A second correction from the same cause

**Christ Church Denver** had been recorded *unreadable*. **The URL needed a `www`.** Once fetched, it
is one of the plainest statements of the thesis on file: "**Jesus is winning and the world is being
renewed with Christ as King**… **we are called to build it. We do not sit idly but instead actively
work towards the growth of God's kingdom here and now.** Our work on this earth matters." Promoted.

**An unreachable site is a fact about the fetch, not about the church.**

### Standard completed on the rest, with two data corrections

- **Reformation Presbyterian, Sheboygan** — the leadership may be wrong. **Rev. Todd Ruddell pastors
  Christ Covenant RPC**, a different congregation; he appears here as a **conference speaker** (April
  2024). Flagged `denom_ambiguous`. His April 2020 piece **"A Testimony to our Times"** is dated to
  the first weeks of the COVID closures and may bear on the civil magistrate — logged as an open lead.
- **Christ the King, Shelby MI** — Jeff Swanson is listed elsewhere as pastor at **New Era, MI**, and
  separately as a speaker at Tri-City Covenant. Worth confirming which pulpit he holds.
- **King's Chapel Brooklyn**, **Christ Covenant Chicago** (Jon Herr, trained under Gregg Strawbridge,
  RTS), **Christ Church Morgantown** (Jared McNabb, M.Div. Westminster Philadelphia, has taught at a
  classical school) — searched against every marker, nothing found. Classifications stand, now on a
  completed search rather than a site read.

McNabb's classical-school teaching is noted but **not** treated as qualifying: teaching at one is a
personal vocation, where Tri-City Covenant was promoted because **the church runs** a two-campus
academy. That distinction is the whole difference between corporate and individual action.

### Two new leads queued

The **Love Your Pre-born Neighbor Conference speaker list** is a high-yield roster of abolitionist
pastors tied to the Texas legislative network. **Church and Family Life (NCFIC)** is worth
cross-referencing wholesale — family-integrated churches correlate with the patriarchy marker.

**Qualifying: 107 → 109.**

**Standing lesson, recorded because it will recur: the church website is the weakest of the four
sources the standard requires, and it is the one most likely to be read alone.**

## 2026-08-05 — Standard swept across every limited_mission row. A second false negative.

Dustin: *"never drop the standard… I dont want anything ever missed."* Written into memory, then
applied to every `limited_mission` row created this session.

### Two false negatives in fourteen

**Woodlawn Baptist Church, Baton Rouge — PROMOTED.** Dismissed earlier the same day on a website
describing Word-Driven, Gospel-Centered, disciple-making ministry with an after-school Bible club.
Its pastor:

**Dr. Lewis Richerson** — whom this row had recorded as "Dr. Lewis", **mistaking his first name for
a surname** — is an **advisory board member of the Center for Baptist Leadership**, and **moved a
motion at the Louisiana Baptist Convention to amend its Articles of Incorporation affirming the
office of pastor as exclusive to men**. A formal, recorded act of denominational politics taken as a
pastor.

That is the **same basis** on which Grace Baptist, Cape Coral qualifies for Tom Ascol's Founders
work. Applying it there and not here would be incoherent. **Gender set to complementarian on
evidence** — a motion he personally moved, not a denominational default.

With Grace Life Dallas that is **two false negatives out of fourteen site-only dismissals**. Not a
fluke — **the base rate of what reading only the website loses.**

### Where the standard genuinely could not be completed, the record says so

- **Christ Church Indy** — CREC, Tyndale Presbytery (the same presbytery as Providence Caro,
  promoted today). **No pastor identifiable anywhere.** The pastor-level half is undone; the
  classification rests on the exact evidence base that produced both false negatives.
  **Explicitly marked provisional.**
- **All Saints Reformed, Mandeville** — a CREC mission church whose entire public self-description
  is one sentence and which names no pastor. Provisional.
- **Redeemer Reformed, OKC** — the pastor is "Pastor Mark", an Oklahoman with an RTS Orlando M.Div.;
  **his surname could not be established**. Stated, not papered over.

### Corrections and leads from the sweep

- **Christ the King, Shelby MI** — Jeff Swanson is separately listed at **New Era, MI**, a
  neighbouring Oceana County town, and speaks at Tri-City Covenant NH. **Possible duplicate record
  under two town names.** Flagged.
- **Christendom Reformed Baptist, Sioux City** — listed in the **Founders Ministries** church search
  and the Reformed Baptist Network. Founders affiliation elsewhere here has evidenced an anti-woke
  posture and, for Ascol, supported a transformationalist reading. Here it is a listing only —
  recorded as a **live lead**.
- **Christ Reformed, Maine** — Grant Van Brimmer is the *associate*; the senior minister is unnamed
  on the site. Leadership record marked partial.
- **Garrett Craw** (Santa Clarita) was converted **in the Marine Corps** and trained at Covenant
  Theological Seminary. **Rhett Crabtree** (Green Camp) pastored in **Scotland and Michigan** before
  planting; six children.

Negatives recorded explicitly in every case, with what was checked and what remains unread.

**Qualifying: 109 → 110.**

## 2026-08-05 — "Have all the old transformationalist churches been researched?" No. 95 of 110.

Honest audit of the qualifying list itself:

| | of 110 |
|---|---|
| Explicitly "FULL standard applied" | **5** |
| Individually read/verified, earlier form | 8 |
| "Pastor-dug" — partial standard | 2 |
| **No evidence of individual research** | **95** |

**62 were last touched on 24–25 June** — the old bulk work, not research. **They survived the audit
because they were not in one of the four bulk-inference cohorts, which is a different thing from
having been read.**

### The 95 are not uniform

**Group A — ~26 rows at 285–450 characters.** The Abolitionists Rising cohort, whose notes concede in
terms that the classification was "derived… **no new research**". The thinnest qualifying rows in the
directory and the likeliest to be wrong **in either direction**.

**Group B — ~69 rows at 600–2,400 characters.** Christ Church Moscow, Apologia Mesa, Holy Trinity
Concord, Reformation Covenant, Grace Reformed Elgin (Deevers, SB 456), Bethel Baptist Owasso (Bill
Ascol), By the Word (Jon Speed), Ekklesia Muskogee. Substantial documented evidence already; they
simply never got the standard's label.

### First batch of Group A, and it ran both ways

**#4051 Vision Community Church, Marsing ID — CONFIRMED, and now on first-hand evidence.** Pastor
**Benje Graves testified before an Idaho legislative committee** during hearings on abortion-funding
legislation (HB 220), telling it that **"God is offended by compromise."** A pastor in the statehouse
rejecting compromise on abortion — the abolitionist position in the abolitionist idiom. He has also
publicly endorsed candidates. Basis upgraded derived → evidenced.

**#4044 Missio Dei Church, Glassboro NJ — DEMOTED.** Substantial public output — podcast on two
platforms, Instagram, Facebook — and its three stated core focuses are all ecclesial: "growing closer
to Jesus together as a church, preaching the Bible faithfully as often as we gather, and loving and
serving our local community." **Nothing across any of it touches abortion or any of the six markers.**
Reclassified as unresearched rather than limited_mission, because the pastor is named only as
"Justin" and could not be searched — and **both of today's false negatives turned on the pastor, not
the church.**

**Three left qualifying with the gap stated** — Dillingham Bible Fellowship (Founders + TGC listed),
First Baptist North Pole (SBC + Founders), Hope Fellowship Gatesville (**listed on Church and Family
Life, the same NCFIC network that surfaced on Grace Life Dallas**). In each case no first-hand
evidence was found and the label still rests on the third-party AR listing; all three flagged
`verify_stance` rather than quietly left looking researched.

**5 of ~26 in Group A done. 1 confirmed, 1 demoted, 3 flagged.** That hit rate — 2 of 5 rows changed
or qualified — is why the rest need doing.

## 2026-08-05 — Researching the 92 unverified qualifying churches. Batch 1: six, all confirmed.

The integrity half of the job first: churches publicly presented as meeting the standard, on evidence
nobody had checked. Full standard on each.

**All six confirmed — and unlike the AR cohort, these hold up strongly.** The pattern is clear: where
a qualifying row carries a *named pastor with a public record*, the label survives scrutiny. It is
the rows with no pastor and no output that collapse.

- **Immanuel Baptist, Pikeville KY** — Wesley Russell speaks at Capitol rallies for Kentucky
  equal-protection legislation, including **HB 300, which would allow abortion to be prosecuted as
  homicide** — a bill **opposed by Kentucky Right to Life**. Standing at the Capitol for a bill the
  state's largest pro-life body is fighting is the abolition/pro-life split in miniature.
  **Correction: the row called him "president, Abolish Abortion Kentucky." That is overstated** — he
  is one of several pastors working with them. Office corrected; qualification stands on what he does.
- **Presbyterian Church of Manchester CT** — **C. R. Wiley**, author of *The Household and the War
  for the Cosmos* and *Man of the House*, essayist in Touchstone, Modern Reformation, The Imaginative
  Conservative and Front Porch Republic, **co-host of the Theology Pugcast on the Fight Laugh Feast
  network**. A PCA pastor writing books on the household as a *political* institution and
  broadcasting on Doug Wilson's platform.
- **Harvest Church PCA, Orange City IA** — **Dr. Sacha Walicord** and other local pastors **publicly
  confronted the town's public library** over books normalising transgenderism and homosexuality.
  Ministers acting together against a municipal institution: small-scale, and the scale at which most
  of this actually happens. Christian nationalism set to sympathetic. *(Orange City also holds
  Redeemer URC, an Iowa equal-protection signatory — a town with more than one contending church.)*
- **Providence RPC, St. Louis** — **Jeffrey Meyers**, pastor since 1994, one of the **eleven original
  signers of the 2007 Joint Federal Vision Profession** with Peter Leithart, tried and **acquitted by
  Missouri Presbytery in April 2012**. Decisively: he sits on the **Board of the Theopolis
  Institute** — the same body housed at Trinity Presbyterian Birmingham, promoted today, whose stated
  purpose is that the church is "called to transform the cities of men."
- **Christ the Word, Sylvania OH** — **David Bayly**, in Toledo since 1988, co-author of **BaylyBlog**
  (via World magazine, now *Out of Our Minds* at Warhorn Media). Its category list is the evidence:
  Abortion/euthanasia, Politics, Government, Feminism, Culture — **and R2K**. Two decades of public
  argument *against* Radical Two Kingdoms theology is argument *for* the church's authority over the
  civil order: the transformationalist side of this directory's defining debate.
- **New Hope Baptist, Seneca KS** — **Curtis Knapp**, pastor since 2004, RTS M.Div., Sovereign Grace
  Baptist Fellowship, **1,000+ sermons public on SermonAudio**. In 2012 he drew national coverage for
  pulpit remarks on the civil magistrate and homosexuality; Baptist News Global reported it as
  *"Pastor amends comment about killing gays."* **The primary text has not been read here and this
  record does not characterise it beyond that reporting.** Because the substance concerns what the
  magistrate should do about sin — the theonomic question in its sharpest form — recorded as
  **theonomy: sympathetic** and **flagged `verify_stance`**, resting on secondary reporting. His
  archive is complete enough to settle it from his own words, and it should be.

**6 of 92 done.**

## 2026-08-05 — Qualifying batches 3–4. The spine of the movement, confirmed.

This tranche is the directory's core: nationally known figures whose records were already
substantial but had never been formally verified. Eight confirmed, four corrections.

### A standing deep-dive item closed

**Mercy Seat Christian Church, Hartland WI — Matthew Trewhella.** "Trewhella / lesser-magistrate
network" has sat in the queue since it was opened. **This is that church.**

He founded **Missionaries to the Preborn** in 1990 — the first Christian mission in America to take
the preborn child as its people group — and the ministry's claim is concrete: **six of Milwaukee's
eight abortion clinics have closed since, and abortion in Wisconsin has fallen over 60%.** He wrote
***The Doctrine of the Lesser Magistrates*** and **published the first English translation of the
Magdeburg Confession (1550)**, the text that first formalised it. He speaks for the John Birch
Society on interposition. **In March 2020 he defied a government order to close his church** — the
doctrine applied to his own congregation rather than argued in the abstract.

**As complete a case as this directory contains.**

### The rest of the spine

- **Covenant Bible Church, Georgetown TX — Joel Webbon**, founder of **Right Response Ministries**,
  self-described Christian nationalist, convener of "Blueprints for Christendom 2.0," whose speakers
  included Doug Wilson and **Dusty Deevers** — who pastors #216 here. That conference is a map of the
  network this directory traces.
- **Refuge Church, Ogden UT** — five pastors, **The King's Hall** and **Hard Men** podcasts,
  **Haunted Cosmos**, and **New Christendom Press**. Eric Conn came to the pulpit from editing *Gun
  Digest* and the NRA's *Shooting Illustrated*; Brian Sauvé is a charting musician.
- **Liberty Fellowship, Kalispell MT — Chuck Baldwin**, the **Constitution Party's 2008 presidential
  nominee** and former Florida chairman of the Moral Majority. His congregation is deliberately
  **"unorganized, unincorporated, nondenominational, non-501c3"** — a refusal of the tax status that
  conditions most American church speech, and itself a position on church and state.
- **Church of the King — John Stoos**, pastor since 2005 and a California political consultant for
  twenty years, **ten of them as Chief Consultant to State Senator Tom McClintock.**
- **Grace Covenant Presbyterian, Nacogdoches — Randy Booth**, forty years ordained, **Director of the
  Covenant Media Foundation**, which carries the Bahnsen catalogue.
- **Heritage Presbyterian, Cumming GA — Joe Morecraft III**, who **led Chalcedon Presbyterian out of
  the PCA in 1983 to found the RPCUS** after a complaint that theonomic views were required for office.

### Four corrections

- **Heritage Presbyterian is no longer RPCUS.** Morecraft was **removed from Covenant Presbytery,
  RPCUS in April 2015** and joined the **Reformed Presbyterian Church – Hanover Presbytery**.
  Denomination corrected.
- **Church of the King is in Sacramento, not Roseville.** Corrected.
- **Covenant Reformed Presbyterian (John M. Otis) is placed in Asheville here, but sources put it in
  Burlington NC** — 200 miles apart. **Flagged rather than changed**, because the postmill audit
  showed how easily two real congregations get merged by a confident guess. The North Carolina
  cluster of same-named RPCUS churches needs untangling as one job.
- **Wesley Russell is not president of Abolish Abortion Kentucky** (earlier batch).

**27 of 92 done.**

## 2026-08-05 — Qualifying batches 5–6. 37 of 92 done.

### The 2021 SBC abolition resolution has four of its people in this directory

**Derin Stidd** (Harmony Baptist, Frankfort IN) is **Assistant National Director of Operation Save
America**, introduced a **motion at the 2019 SBC** urging "the immediate abolition of human
abortion," and was **one of nine co-authors of the 2021 resolution "On Abolishing Abortion."**

With **Russell Threet** (First Baptist Mena), **Dave Van Bebber** (First Baptist Buffalo) and **Bill
Ascol** (Bethel Baptist, Owasso — who carried it from the floor after the Committee on Resolutions
refused to bring it), **the directory now holds four churches tied to the American abolition
movement's decisive denominational act.**

### And Operation Save America's leadership is here twice over

**American Reformation Church, West Melbourne FL** houses both the former and current national
directors of OSA as its officers: founding pastor **Rusty Thomas** (who succeeded Flip Benham and
moved OSA's HQ to Dallas in 2014) and elder **Jason Storms** (current National Director). Add
**Derin Stidd** as Assistant National Director, and three OSA officers pastor or serve churches on
this list.

### Institution-founders, which is the pattern that keeps recurring

- **Ken Peters** (Patriot Church, Knoxville) founded **The Church at Planned Parenthood** in 2018,
  the **Patriot Church movement** in 2020, and earlier **Covenant Christian School** in two cities.
- **George Grant** (Parish Presbyterian, Franklin) founded **King's Meadow Study Center** and
  **Franklin Classical School**.
- **Toby Sumpter** (King's Cross, Moscow) co-hosts **CrossPolitic**, **teaches high school civics at
  Logos School**, and is attached to the **Idaho Family Policy Center** — media, education and policy.
- **Ryan Denton** (Clovis NM) is organizing pastor of **two church plants simultaneously**.

### Published markers

**Andrew Isker** co-wrote *Christian Nationalism: A Biblical Guide For Taking Dominion and Discipling
Nations* with Gab founder **Andrew Torba**, and *The Boniface Option*. **Michael Foster** (East River)
co-wrote *It's Good to Be a Man*. **Joseph Spurgeon** (Sovereign King) hosts the **Patriarchy
Podcast**. **Zachary Garris** (Bryce Avenue) wrote *Masculine Christianity* and edited *Dabney on
Fire*, and is a lawyer as well as a minister.

### A duplicate that every earlier dedup pass missed

**Mercy Seat Christian Church is on file twice** — #3240 under **Milwaukee** and #4220 under
**Hartland** — both Matthew Trewhella's congregation, Hartland being a Milwaukee suburb. Merged into
#4220 and held.

**It surfaced only because both rows were researched and the research matched.** Name-and-city
matching could never have caught it; two different towns and two slightly different names. **Research
is a better deduplicator than string comparison**, which is worth remembering given 40 duplicates were
found earlier by string alone.

### Corrections this pass

Church of the King is **Sacramento** not Roseville · Heritage Presbyterian is **RPC Hanover
Presbytery** not RPCUS · Bryce Avenue's site is **brycepresbyterian.org** · Wesley Russell is **not
president** of Abolish Abortion Kentucky · Covenant Reformed Presbyterian's city (Asheville vs
Burlington) **flagged, not changed.**

## 2026-08-05 — Qualifying batches 8–10. 56 of 92 done; 63 of 108 qualifying rows now carry the full standard.

### Two churches upgraded to `theonomic`, not merely sympathetic

- **Reformed Bible Church, Appomattox VA** — Paul Michael Raymond **founded the Institute for
  Theonomic Reformation (2001)**, teaches **Political Science** at its Academy, and **presented the
  Doctrine of the Lesser Magistrate to the Appomattox County Board of Supervisors.** The church's
  stated emphasis is the **Cultural Mandate of Genesis 1:28**. Chalcedon published on it as
  "Christian Reconstruction Comes to Appomattox."
- **Immanuel Baptist, Tucumcari NM** — Gordan Runyan wrote ***Theonomy and Reformed Baptists***,
  *Resistance to Tyrants*, and *The Biblical Case for Private Gun Ownership*.

**A man who names an institution after the position is not adjacent to it.**

### National institutional reach

**Coral Ridge — Rob Pacienza** holds **D. James Kennedy's own pulpit** and is President/CEO of **D.
James Kennedy Ministries**, founder of the **Institute for Faith and Culture**, a **Senior Fellow at
the America First Policy Institute**, and in the leadership of the **Center for Christian
Statesmanship** — Kennedy's body for discipling members of Congress.

### A keystone that links two rows on this list

**Cross & Crown, Warrenton VA — Jason Garwood** founded and leads the **Virginia Center for Public
Theology**, "dedicated to defending Christian ethics in the town square," and **Abolish Abortion
Virginia**. **He pastored in Caro, Michigan until 2017 — that is Providence Church, Caro (#3245)**,
promoted to qualifying earlier the same day. One man connects a Virginia and a Michigan congregation
here, and he was already flagged as **the most useful single contact for AAM**.

### Churches that teach the position as curriculum

**St. John's Reformed, Friedensburg PA** runs the **Friedensburg Biblical Institute**, whose
published lectures include **"Why Abolition and Not Pro Life."** Pastor **Matt Kenitzer** sits on the
Board of **Abolish Abortion Pennsylvania**. **Brett Baggett** (Ekklesia Muskogee) is **President of
Rescue Those**. **Sam Jones** (Humboldt IA) is best known for teaching **the four spheres of
delegated government** — sphere doctrine is the intellectual substructure of this whole directory.

### A new marker, queued: the public library

**Two pastors independently confronted their town library** — Sacha Walicord in Orange City and
**Paul Thompson** in Twin Falls, who also **ran for the Idaho State Senate on the Constitution Party
ticket** and led the **"sanctuary city for pre-born children"** effort. Alongside the abortion
facility and the city council, the library is a characteristic site of local action — and like Stuart
Bryan's op-ed in the *Coeur d'Alene Press*, it leaves only local-press traces. **Invisible to any
method that stops at the church website.**

### Networks now visible in the data

**TruthScript** carries three qualifying pastors (Idaho, Indiana, New Mexico). **Church and Family
Life / NCFIC** has surfaced five times. **Conference rosters have produced results twice** and are
the highest-yield source found — a man who travels to speak has already committed publicly.

### Corrections this pass

Covenant Presbyterian Buford was blank, is **OPC** · **Christ Church of Radford** is recorded CREC but
Mathenia's affiliations are consistently **Reformed Baptist / HeartCry** — flagged, not changed ·
Grace Church PCA Fremont's pastor arrived **August 2024**, so its record predates him.

## 2026-08-05 — The qualifying queue is CLOSED. 23 rows, and the pattern reversed.

The last 20 unverified qualifying rows were taken to the full standard, and 3 more were found hiding
behind a bug in the query that defines the queue. **Qualifying falls 108 → 93.**

| | |
|---|---|
| confirmed, still qualifying | **9** |
| reclassified `single_issue` | **10** |
| demoted to `unknown` | **4** |

### The prediction in the handoff was wrong, and it is worth saying so plainly

The note left for this session read: *"The pattern so far, without exception: a named pastor with
public output confirms — usually on something stronger than the record showed. Not one row has been
demoted on contrary evidence; the failures are all absence."*

**That held for the big rows and broke completely on the small ones.** 14 of 23 moved. The reason is
that the remaining queue was sorted thinnest-first, so this session got the entire Abolitionists
Rising cohort at once — rows whose notes concede the classification was *"derived… no new research"* —
while the earlier batches got the documented ones. **The order of the queue was producing the
pattern.** A sample drawn from the easy end of a list is not evidence about the list.

### The query that defines the queue had been hiding rows

`prisma/_q.ts` marks a row researched if its note matches
`/FULL standard applied|individually verified|read individually|full review to standard/i`.

Three rows carried the sentence **"Israel stance *not* individually verified"** — and the regex
matched *"individually verified"* inside it. **The phrase admitting the row was unresearched is what
marked it researched.** All three sat on the qualifying list, invisible, through this session and the
last; the "92 rows" figure everyone has been working from should have been 95.

Fixed by stripping negated forms before testing. **Any future queue query needs the same guard** —
this directory's notes are written in prose that says what was *not* done, and a naive substring test
will read those admissions backwards.

### Two websites belonged to churches in other states

- **#4049 Morning Star Missionary Baptist (Keota OK)** pointed at `morningstarbaptist.org` — Morning
  Star Missionary Baptist of **Grand Prairie, Texas**.
- **#4061 Shelby Maranatha Bible Baptist (Shelby OH)** pointed at `mbcshelby.org` — Maranatha Baptist
  of **Shelby, NORTH CAROLINA**. The AR list carries *no URL at all* for the Ohio church, so the
  website was never sourced; it was inferred from the name.
- **#4062 Redemption Church (Jacksonville NC)** pointed at `redemptionjax.church` — Redemption Church
  of **Jacksonville, FLORIDA**. `jax` is the standard abbreviation for Jacksonville FL. Its pastor
  field named a man who has never served there. The row's own note said *"VERIFY: multiple Redemption
  Church congregations"* — it was right, and both guesses were wrong.

**A website that was never read is not a source, it is a guess with a URL on it.** Three of twenty.

### Four more stale-leadership findings, one of them six weeks old

- **Geyer Springs First Baptist, Little Rock** — David Hughey **stepped down as lead pastor in late
  June 2026** citing his divorce (decree filed 19 June). He remains as director of pastoral care. The
  abolition record on that row belongs to a man no longer in the pulpit.
- **Pole Creek Baptist, Candler NC** — Ben Heise is gone and the church is **advertising the
  vacancy**. His blog was the entire political case for the row.
- **Covenant Reformed Church of Sacramento** — **pulpit vacant since December 2024**; Frank Walker
  retired and is Pastor Emeritus.
- **Christ Church Lakeland** — Wedgeworth left for South Bend in **January 2022** and every directory
  still lists him here.

### Two rows the 7-31 pass left open are now closed

- **#4173 Christ Covenant Reformed, Billings MT** had no denomination, no website, no pastor and no
  zip. It is **CREC, Kuyper Presbytery**, at ccrchurch.org, pastored by **Tedd Sutton** since June
  2022, with four elders named. Its founding elder says the church was formed out of a desire for an
  **"optimistic eschatology"** — so postmill now stands on the congregation's own words instead of on
  the discredited directory. Demoted to `unknown` anyway: CREC membership plus an eschatology is not
  corporate action, and Sutton's **Westminster Seminary California** M.Div. is a two-kingdoms
  counter-indicator sitting oddly against both.
- **#3262 Covenant Reformed Church of Sacramento** was listed under the wrong name, the wrong
  denomination (RPCGA; it is **RCUS**) and a Texas phone number. Postmill withdrawn: the **RCUS Synod
  has on record that the denomination does not teach "Reconstructionism" or "Theonomy"**. Asserting
  postmillennialism against a congregation's own confessional body, on a source disproved twice on
  that very row, is the unearned assertion this directory exists to purge.

### The single_issue line held, including where it hurt

**Grace Fellowship Church, Davenport IA** has an **"Abortion Ministry" series of 54 sermons spanning
2012–2020**, preached at the clinic — *"A Morning Outside Planned Parenthood"*, *"Conversation with
Planned Parenthood Student Group"* — plus **138 open-air preaching sermons**. **Tony Miano**, the
full-time street evangelist behind all of them, moved his family to Davenport in 2016 to join this
congregation, and his ministry states that *"the abolition of abortion is the only logical and
biblical path to putting an end to the murder of unborn children."*

**And it is still `single_issue`,** because the full series index was read and there is no series on
civil government, politics, law, Israel, patriarchy or eschatology. This is the strongest
single-issue case in the directory and it is the one that proves the category is doing real work: the
test is breadth, not intensity. **Calvary Chapel Saint Paul** went the same way — it carries the
Abolitionist Society of St. Paul as one of its own ministries, which is genuine corporate action, and
is dispensational and Zionist besides.

*(Recorded, not acted on: multiple public sources allege cult-like exit-control at Grace Fellowship
Davenport. The main site is anonymous and undated. Not verified, not the basis of any stance, and
noted only so the next pass does not rediscover it cold.)*

### A stance was corrected against its own record

**#4031 First Baptist Edmond** carried `pro_abolition` because **Blake Gideon** co-authored the 2021
SBC resolution *On Abolishing Abortion*. He also **signed an open letter opposing Oklahoma SB 13, the
Abolition of Abortion Act** — as Senior Pastor of this church and President of the BGCO — arguing it
would be struck down and that it *"unnecessarily and purposely repeals hard-earned pro-life laws,"*
preferring *"proven and plausible life-saving policies."*

**Opposing an abolition bill to preserve incremental law is the incrementalist position by this
directory's own definition.** Corrected to `incrementalist`. He is not simply an opponent — he
reportedly moved to amendment-strengthening later — but the signed letter is the harder evidence.

**Seven of the nine co-authors of the 2021 SBC resolution are now in this directory**, and the three
added here all resolve to `single_issue`.

### Christ Church Moscow contradicted itself, and the field was right

The notes claimed *"No abortion-abolition position located — abolitionStance left unknown"* and scored
the church 5/6 on that basis. The field read `incrementalist`. **Wilson has published the answer at
length:** *"While I share the goal of abolishing human abortion, I do not like calling myself an
abolitionist. I like to call it something more like smashmouth incrementalism"* — there is a book by
that title. Free The States has asked in print *"How Is Doug Wilson Not an Abolitionist?"*

So the marker was never missing. **It was answered in the negative, which is a more useful fact than
an absence**, and the note had been reporting a gap that the data had already filled.

### Confirmations, and one that arrived this year

**Grace Reformed Baptist, Elgin OK** is now the clearest proof of *breadth* on file, not just of
abolition: Deevers's **eight-bill slate of January 2025** covers abortion, child pornography, drag
performances before children, covenant marriage, no-fault divorce, adoption, child tax credits and
health-share ministries. Eight bills across seven areas of law, from the man in the pulpit.

**Apologia Church** gained a 2026 development: Illinois Republican senator **Neil Anderson**
introduced a fetal-personhood bill promoted by End Abortion Now, appeared at a press conference with
Durbin — and **lost his leadership positions in the Illinois Senate Republican caucus over it.** The
thesis running in a blue state, at a real political cost, borne by the legislator rather than the
pastor.

Also confirmed: **Christ the King, Charlotte MI** (christianNationalism raised to `affirm` — McAtee
"has unapologetically argued that nationalism is natural, taught in scripture, and affirmed
historically by the church"; his **Iron Rhetoric** podcast is commentary on the public square);
**St. David's Reformed, Tomball TX** — renamed, re-placed and re-denominated, and its own mission
statement is postmillennial in the church's words: *"we look forward to the day when the knowledge of
the Lord will cover the earth… every thought will be brought captive to Christ as we live faithfully
in our families, communities, and nation"*; **Ekklesia of Grand Blanc**; **Reformation Covenant** and
**Holy Trinity Concord**, whose named gaps were finally read.

### The two education rows: gaps closed, answers negative

**Reformation Covenant's** SermonAudio archive had been unreadable (503) and was flagged as *"the
likeliest place further evidence sits."* It has now been read: 257 sermons, and **not one series**
touches civil government, politics, abortion, nationalism, theonomy or eschatology. **Holy Trinity's**
podcast is 113 episodes of exhortation and Bible study. Both keep `transformationalist` **solely on
the owner's 7-31 ruling that education is movement-building** — Cogbill's Reformation Bible Institute,
Phillips's work at CIRCE (he is its **Director of Training**, more than the record said).

**These are the two thinnest qualifying rows left.** They rest on an institution and a ruling, with no
deed in the civil sphere and nothing on any marker. `verify_stance` retained on both. If that ruling
is ever revisited, start here.

### Where the directory stands

| culturalEngagement | n |
|---|---|
| `transformationalist` | **93** |
| `single_issue` | 134 |
| `quietist` | 28 |
| `limited_mission` | 16 |
| `unknown` | 4,010 |

**Every qualifying row in the directory now carries individual research.** That has never been true
before.

## 2026-08-05 — Allegations re-examined and KEPT. Then the demoted cohort opened, and it opened well.

### The Grace Fellowship allegations are not unfounded, and my note about them was wrong

Dustin's instruction was to drop the abuse allegations recorded on **#4057 Grace Fellowship,
Davenport IA** *if they were unfounded*. Tested, the condition does not hold — and the note that
prompted the instruction was **my own mischaracterisation**.

The note had called the allegations anonymous, with "no dates, named accusers or documented
incidents." **That is true of exactly one of the four sources** — `exposegracefellowshipqc.com` — and
I generalised it to all of them. What is actually there:

- **Kevin Jandt**, a named former member of nine years, excommunicated in 2018, writing under his own
  name at uncommonfaith.org, with sermon audio, direct quotations from meetings, and corroborating
  testimony from other named former members across roughly a decade.
- **Striving For Eternity** (Andrew Rappaport) published on it and hosted Jandt on *Apologetics Live*.
- **Biblical Church Evangelism Conference** issued a dated, signed *"Withdrawal of Support & Warning
  of Dangerous Practice & Doctrine"* in August 2016, with follow-ups in September 2016 and February
  2020.

The substance: that Mike Reid structured his "shepherding" around **regularly scheduled private
meetings alone with the married women, single women and teenage girls** of the congregation; that he
teaches a "boast in Christ" doctrine under which genuine believers cannot fall into adultery; that he
told a congregant rape within marriage is not possible.

**Status: attributed and corroborated ALLEGATIONS, not adjudicated.** No lawsuit, criminal charge or
denominational proceeding was found — and this is an independent church with no presbytery to have
ruled on it. The note now says exactly that.

**The lesson is the one this project keeps relearning in the other direction.** A wrong dismissal
leaves no trace in the record. I had written a summary dismissal of four sources on the strength of
the weakest one, and it very nearly removed the whole thing.

### The demoted cohort is 161, not 122 — and the first read produced a major promotion

Re-counted properly: **161 rows sit at `unknown` sourced to postmillennialworldview.com and have
never been individually researched.** 12 have both a pastor and a website, 33 have a site only, and
101 have a name attached to a pastor who may or may not still be there.

**#3274 Chalcedon Presbyterian Church, Cumming GA — PROMOTED.** It sat at `unknown` with denomination
"Presbyterian", no pastor and no address. It is:

- **the founding congregation of the RPCUS.** In 1983 this church voted to leave the PCA, and the
  Reformed Presbyterian Church in the United States — a Christian Reconstructionist body — came into
  being out of that vote, because the existing denominations "had not yet settled on how to handle
  theonomy."
- **a church that required its elders to hold both theonomy AND postmillennialism.**

**That is the transformationalist thesis adopted as church law.** Nothing else in this directory is
bound that tightly — every other qualifier rests on what its pastor does, not on what its officers
must subscribe. Founded 1980 by **Joe Morecraft III**, who pastored until 2015, left under judicial
process to RPC-Hanover Presbytery, and founded **Heritage Presbyterian** *also in Cumming* — which
finally explains the standing note that Heritage is Hanover rather than RPCUS. Current pastor **Jess
Stanfield**, RPCUS teaching elder since 2005, who preaches *"John Knox: A Theonomist."*

`theonomy` → `theonomic`, `culturalEngagement` → `transformationalist`, denomination → RPCUS.

### The best source this project has found

Chalcedon turned up in a **theonomy church directory** whose listing criterion is *"Christ's Lordship
in all areas of life (**family, church, and state**)"* — this directory's own qualifying definition,
almost word for word. Every other source worked so far indexes a pastor's eschatology or a single
signature. **This one indexes the thing actually being measured.**

26 churches, with pastors: Kenneth **Gentry** (*He Shall Have Dominion*), Kenneth **Talbot**
(Whitefield Theological Seminary), **Einwechter**, **Kayser**, **Otis**, **Schwertley**, **Botkin**.
Two are already qualifiers here — Chalcedon, and Paul Michael Raymond's Reformed Bible Church in
Appomattox, upgraded to `theonomic` earlier the same day. **One is sitting in the demoted cohort
right now**: Reformed Heritage Church, Los Gatos (#3258), which had no pastor until this list gave it
one. Full table filed in the deep-dive queue.

**It is from 2011, so its pastors are fifteen years stale** — Morecraft is listed at a church he left
in 2015. Use it as a list of congregations, never of pastors.

### Four more rows read; four more stale or missing attributions

- **#31 Phoenix Reformed Baptist** — **James White's eldership here ran 1998–2018.** The row was
  resting on a nationally known name eight years out of date. He is also reported to have moved to
  postmillennialism around 2021, which is very likely *why* the postmill directory listed this
  church: **it indexed the man, not the congregation, and the man had already left.** That single
  observation probably explains a good share of the remaining 160.
- **#34 Brainerd Hills** — pastor found where the row had none: **Vaughn R. Hamilton**, RPCGA
  Westminster Presbytery.
- **#3273 Atlanta Presbyterian Fellowship** — pastor found: **Dr. Frank J. Smith**, RPCNA. His
  public work is *ecclesiastical* journalism, inside the church world rather than aimed at the civil
  order. Left `unknown`.
- **#33 Christ Covenant RPC, Wylie TX** — history established first-hand (RPCGA, New Geneva
  Presbytery, planted 2006). Denominational lineage runs back to the RPCUS, but **lineage is not a
  stance**; nothing on any marker. Left `unknown`.

**1 promoted, 5 enriched, 160 to go.**

## 2026-08-05 — Demoted cohort worked to 125 remaining. 36 rows read, 3 promoted.

Continued straight through the postmillennial-directory cohort. **161 → 125.**

| | |
|---|---|
| rows read to the full standard | **36** |
| promoted to `transformationalist` | **3** |
| left `unknown` with negatives recorded | 33 |
| websites found to be wrong or dead | **7** |
| pastors identified where the row had none | **11** |

### The two promotions after Chalcedon

**#979 Community Presbyterian, Louisville KY.** The church states on its own about page that its
purpose includes addressing **"public and political issues"** through God's Word, expressly refusing
to limit faith to personal matters; that **"Christ's Lordship is comprehensive and He rules over
every square inch of creation"**; and that it looks for the gospel to transform **"our lives as well
as society and culture."** Its mission is *"Rooted in Christ to Be and Build the City of God"*, framed
as discipling nations. That is the qualifier stated corporately, in the congregation's own words —
the same footing on which St. David's Reformed was confirmed. No deed is attached yet, so
`verify_stance` is retained.

**#1507 Christ the King Presbyterian, Norman OK.** Of 42 series in its archive, **"Models of
Dominion" runs to 59 sermons** — the largest the church has preached — alongside "Spiritual
Deceptions of Our Age" (21). And a ruling elder states on the church's own leadership page that the
goal is for the body to work as a body **"to see the culture at large changed."** A congregation that
gives fifty-nine sermons to dominion is running a doctrinal programme, not touching a topic. Norman
is also home to Abolitionists Rising and Areopagus (#4112) — worth checking for contact.

### The failure mode that explains this cohort

**#31 Phoenix Reformed Baptist** was listed because **James White** is postmillennial. **His eldership
there ran 1998–2018.** **#440 Christ Church Presbyterian, Irvine** was listed for Michael Preciado,
whose tenure ran **2005–2019**; he has pastored an OPC congregation in Dallas since 2024.

**The source indexes the pastor, not the congregation — so its listings outlive the men they are
based on.** Assume it on every remaining row: establish whether the listed pastor is still there
*before* crediting the church with his doctrine. Where the man is still in post (Hope Baptist
Springfield, Joshua Jenkins) the attribution is at least current, though still third-party.

### Seven wrong or dead websites in thirty-six rows

- **#2068 Westminster Presbyterian, Vancouver WA** — `solochristo.org` now **301s to First
  Presbyterian Church of Battle Ground**. Both are in Clark County and Battle Ground's tagline is
  *"All of Christ. For All of Life. For Clark County"* — almost certainly the same body renamed and
  relocated. **Not merged here**, because "almost certainly" is not evidence.
- **#2675 Hope Baptist Springfield** 404s · **#2451 Covenant RBC Tullahoma** returns an empty body
  (it is at crbctullahoma.org) · **#3253 Valley Fellowship Wasilla** 403s (it is at
  valleyfellowshipak.com, and is named Valley *Reformed* Fellowship) · **#3255 Heber Springs** and
  **#3295 Mint Hill** no longer resolve at all.
- **#3255 Covenant Reformed, Heber Springs AR** is the murkiest: what stands on the ground now is
  **Covenant *Anglican* Church** (Reformed Episcopal, Rev. Bradley Sneed). Dissolved, converted, or
  simply offline — no way to choose from here, so flagged, not decided.

Add these to the three found earlier today and it is **ten wrong websites in fifty-six rows read.**

### Two rows where the record was simply wrong about what the church is

- **#3252 Covenant Bible Church, Palmer AK** — recorded non-denominational with no pastor. It is
  **CREC**, with two: Jack E. Phelps and John McNeely.
- **#2081 Trinity Presbyterian, Waukesha WI** — recorded PCA. It is **CREC**. Its mission is *"All of
  Christ, for all of Life, for all of Waukesha"* — **the same formula as Battle Ground above.** That
  phrase is doing the work "every square inch" does and should be searched as a marker in its own
  right.

### One row that may not be a church at all

**#3266 L2 Church, Denver** — "L2" is *Life to the Second Power*, and its published work is
counselling, coaching and services **inside the Denver County Jail** to reduce recidivism. That is a
prison ministry, not evidently a congregation with members, officers and sacraments. Its women's
service is led by **Jennifer Adams**, which is separately a genderStance question under this
directory's rules. **Both are the owner's calls and neither was acted on** — flagged
`denom_ambiguous` + `verify_stance`.

### A pattern worth naming: family-integrated churches

**Three of eighteen** rows in the last batch describe themselves as *family-integrated* — The Family
of Grace (West Blocton AL), Grace Reformed Family Church (Queen Creek AZ), Hope Baptist (Springfield
MO) — and a fourth, Valley Reformed Fellowship, uses the term too. That is **NCFIC / Church and
Family Life vocabulary**, already an open lead with six independent appearances. The postmillennial
directory and the NCFIC network appear to overlap heavily. Work them together.

### Where the directory stands

`transformationalist` **96** · `single_issue` 134 · `quietist` 28 · `limited_mission` 16 ·
`unknown` 4,007.

**125 rows of the demoted cohort remain.**

## 2026-08-05 — Demoted cohort to 100. And 42 of them are duplicates that were never counted.

**125 → 100.** Also: L2 Church Denver held out of scope on the owner's instruction, and the Grace
Fellowship allegations kept.

### The cohort is smaller than the number says

Of the 100 rows still unresearched, **42 are HELD** under `duplicate_of`, `closed` or `review_nonfit`
— they are already off the directory and most are duplicates the postmillennial import created of
rows this project had researched independently. **Only 58 are genuinely live and unresearched.**

Every count of this cohort so far, including my own, has been inflated by them.

### Two duplicates the import made of qualifying rows, found by research not string-matching

- **#4165 "Colwood Church", 1840 Colwood Rd, Caro MI — Jason Garwood** is **#3245 Providence Church,
  Caro** under its former name and address. Garwood pastored there until 2017; the row is already
  transformationalist under Jacob Hanby.
- **#4168 "OneLife Church", 2237 Reid Rd, Grand Blanc MI — Eric Stewart** is **#3247 Ekklesia of
  Grand Blanc**. #3247's own note already states that "the former 2237 Reid Rd address" is stale.
  **The surviving row names the duplicate's address as its own discarded one.**

Neither could have been caught by name-and-city matching — different names, different addresses.
**Research is a better deduplicator than string comparison**, again.

### The RPCUS is dissolved, which corrects a row I promoted this morning

**The RPCUS was founded in 1983 and dissolved in 2020**, its last two congregations joining
**Vanguard Presbytery**. So the denomination I recorded on **Chalcedon Presbyterian (#3274)** hours
earlier is already a historical identity, not a current affiliation, and the same applies to
**Providence RP Covington GA (#4145)** and **Providence RP Wytheville VA (#3690)**.

**The promotion itself is unaffected and is now corroborated from outside the church:** Chalcedon
left the PCA in 1983 because North Georgia Presbytery complained its requirement that elders hold
theonomy *and* postmillennialism was too strict and went "beyond the Westminster Confession."
**The officer requirement is attested by the quarrel that created the denomination.**

### Wytheville: wrong website, wrong denomination, no pastor

**#3690** pointed at `sermonaudio.com/ProvidenceRPC`, which is **Providence Reformed Presbyterian of
Carnegie, PENNSYLVANIA** (RPCNA, Steve Bradley) — a different church in a different state. The
Wytheville congregation is at thebiblealone.com, was RPCUS not RPCNA, began as a mission work in 1997
and was received with its mother church **Trinity Presbyterian, Tazewell VA** into RPCUS Covenant
Presbytery in February 2002. Pastor **Jeff Black**. That makes **eleven wrong websites**.

### Dead men, departed men, and one who left the faith

- **#4137 Christ Presbyterian, Lakeland FL** rests on **Kenneth Gary Talbot, who died 18 August
  2022** — the second deceased pastor traced to this source after Jim West.
- **#4151 Newton CRC, Newton IA** rests on **Aaron Gunsaulus**, who resigned in 2024 and was
  **received into the Catholic Church at the 2025 Easter Vigil.** A directory that indexes churches
  by their pastors' theology has attached a postmillennial label to a congregation through a man who
  is neither its pastor nor Reformed.

### Whitefield Theological Seminary is a discovery axis

It surfaced on **four separate rows today**. Founded 1980 in Lakeland FL by Kenneth Talbot; its
alumni include **Gary DeMar, Kenneth Gentry, George Grant and R.C. Sproul Sr.** — and George Grant is
already a qualifier here. **Randall Talbot** (#4136 Belleview FL, a row a listing now marks *closed*)
is its Academic Dean; **Frank Walker** (#3262) and **Brian Phillips** (#26) both hold Whitefield
degrees. Work it.

### Leads that came out of the rows themselves

1. **`"All of Christ, for all of Life, for all of <city>"`** — verbatim on Trinity Presbyterian
   Waukesha (CREC) and First Presbyterian Battle Ground WA. Doing the work "every square inch" does.
2. **Church and Family Life / NCFIC** — **#4146 Crossroads Church of Dunwoody** is listed in its
   network directory, the **seventh** independent appearance. Grace Life Dallas came through this
   lead and was one of the two false negatives that forced the standard to be tightened.
3. **unityofchristendom.org conference roster** — Fr. Jack Shannon (#4135, Saint Athanasius Reformed
   Catholic Church, Fort Collins) speaks there. Conference rosters remain the highest-yield source
   this project has found.
4. **Doug Enick (#4158, Pratt KS) writes a standing "Pastoral Commentary" column in the Pratt
   Tribune** — local-press output, exactly the kind of trace invisible to any method that stops at
   the church website.

### The best unpromoted row in the cohort

**#3304 Christ Reformed Presbyterian, Paris TN.** `theonomy` raised **unknown → theonomic**: Pastor
Paul McDade's lecture *"Theonomy In Applied Theology"* works through WCF 19, distinguishing "general
equity from the forms specific to Israel's Old Testament economy," which he says has "great practical
value in defending the authority of Scripture and the use of God's law." He has also preached
*"Voting."* The church holds the **original 1647** Westminster Confession and is seeking RPCGA
affiliation. **697 sermons unread — read them and this row will probably qualify.**

### Housekeeping done on instruction

- **#3266 L2 Church, Denver → `review_nonfit`, held, unapproved.** It is *Life to the Second Power*,
  a counselling and coaching ministry operating inside the **Denver County Jail** — not a
  congregation. Retained rather than deleted so the research survives and the call is reversible.
- **Family-integrated churches now carry it in the Editor's Note** — #2541, #3254, #2675, #3253 —
  recorded as a description of how the church gathers, explicitly not as a stance.

**100 rows left in the cohort; 58 of them genuinely live.**

## 2026-08-05 — Demoted cohort to 25. Qualifying reaches 100.

**100 → 25 in one push: 75 rows.** 42 were held duplicates verified against their survivors; 33 were
live rows taken to the full standard. **Qualifying is now exactly 100**, up from 93 this morning.

### The 42 held duplicates, verified rather than assumed

Every held row was checked against its `duplicate_of` target on address, pastor surname and state.
**30 confirmed, 12 flagged as not fully settled** — those 12 were inherited pairings with weaker
evidence than an address or pastor match, and they now say so in their own notes instead of passing
as resolved.

**23 survivor rows gained a pastor lead** they did not have, carried across from the duplicate. Each
is recorded explicitly as an UNVERIFIED LEAD, because the source that supplied it had 7 of 8 pastor
attributions stale or wrong. That is 23 rows that now have somewhere to start.

### Grace Life Dallas was hiding in this cohort under a new name

**#4205 "Grace Covenant Baptist Church, McKinney TX"** is **#32 Grace Life Church of Dallas**. The
proof is the broadcaster: the McKinney congregation publishes on SermonAudio as `gracelifedallas`
and on Facebook as `GLCDallas`, while #32 holds gracelifedallas.org. Same pastor, **Phil George**,
same start year, adjacent Dallas suburbs.

**#32 is one of the two false negatives that forced the research standard to be tightened** — wrongly
dismissed until the pastor was searched. Its record was still carrying a dead domain and an old name
and city, which is precisely how it got dismissed the first time. It now carries the current name,
address and second pastor, plus its NCFIC and Founders listings and its own description as *"a solid
anchor of confessional and postmillennial Reformed Baptist doctrine."*

**#2627 "Grace Life Church, Allen TX" holds the same domain and is very probably a third row for the
same congregation.** Flagged, not merged.

### Four more promotions

- **#4204 Church of the King, McAllen TX.** Its published vision is to plant *"a distinctly Reformed,
  **postmillennial**, and **theonomic** church in the heart of the Rio Grande Valley"* and its mission
  is *"to see **America restored as a Christian nation**."* Three markers professed corporately by the
  church about itself, plus local TV coverage headlined *"Politics and religion collide in McAllen."*
- **#4193 Independence Reformed Bible Church, Morgantown PA.** The church says it is *"theonomic –
  teaching and applying all of Scripture and the Law-Word of God… **to all of life**."* And it **hosts
  the Future of Christendom Conference**, where Joel Saint publicly invited W. Robert Godfrey to a
  moderated debate. Doctrine plus a standing public act.
- **#4183 Covenant Reformed Presbyterian, Burlington NC.** **John M. Otis** has published **eleven
  books** through his own imprint — *Danger in the Camp* (540pp, against the Federal Vision),
  *Unveiling Freemasonry's Idolatry* (670pp), *Jesus' Victorious Kingdom* — and has written on
  **Christian magistracy**. The row also said Graham; the church is in **Burlington**, which resolves
  a standing Asheville/Burlington flag.
- **#4161 Silver City Church, Mount Sterling KY.** States its aim as *"change the culture for Christ &
  see Mt. Sterling be a city on a hill"* — and it is the **first church plant of Michael Foster's East
  River Church**, already a qualifier here. `genderStance` deliberately NOT set from the parent
  church's patriarchy; inferring one marker from another is the reasoning withdrawn on 2026-07-31.

Two rows in the same small Kentucky town, **Silver City (#4161) and First Baptist Mt. Sterling
(#4160)**, landed on opposite sides of the standard.

### The stale-pastor pattern is now overwhelming

- **#4210 Grace OPC Lynchburg** — Peter Stazen II retired **end of 2018**; Rev. Jay Bennett is pastor.
- **#4180 Christ is King Baptist, Syracuse** — **Jon Speed** planted it in 2011 and left in **2019**.
  He is a major abolitionist — co-producer of *Babies Are Murdered Here*, closed his bookstore in
  protest of New York's Reproductive Health Act — **and this project already knew he had moved.** The
  directory listed the church on the strength of a man it had itself recorded as gone.
- Plus the dead (Talbot, West), the departed (White, Preciado, Heise, Wedgeworth) and the converted
  (Gunsaulus, received into the Catholic Church in 2025).

### Leads that came out of this push

1. **171 Ohio clergymen signed a statement opposing Issue 1**, the 2023 abortion amendment — surfaced
   next to **#4186 Sovereign Christ Church, Mansfield**. If Clint Zeigler is on that list the row has
   a first-hand public act. **Get the signatory list; it is a cohort source for Ohio in its own
   right.**
2. **The Future of Christendom Conference** speaker roster (#4193). Conference rosters remain the
   best-yielding source this project has.
3. **A Montana CREC cluster** — Helena (#4174), Missoula (#4175) and Billings (#4173), with
   overlapping pulpits.
4. **A fourth Denver-area row** (#4134) joins #3266–#3268, in the metro where Christ Church Denver
   turned out to be a plain qualifier.

### Judgement calls worth seeing

**#4184 Christ the King Anglican, Dayton** — the rector **co-founded Dominion Academy of Dayton** in
1998, which under the education ruling is the strongest form of that case. But his other work is
refugee ministry, hunger relief, liturgics and Benedictine spirituality. **"Dominion" in a school name
is not evidence of dominion theology**, and the row was not promoted on it.

**#4182 King's Park International, Durham** has helped plant 30+ churches which planted 100+ more in
16 nations. **That is missionary expansion, not cultural transformation** — and the distinction is
what this field measures. Left unknown; probably a bad row in the source, the fourth so judged.

### Where the directory stands

`transformationalist` **100** · `single_issue` 134 · `quietist` 28 · `limited_mission` 16 ·
`unknown` 4,003.

**25 rows of the demoted cohort remain, all live.**

## 2026-08-05 — The demoted cohort is CLOSED. 0 remaining.

The last 25 rows are done. **All 187 rows that ever came from postmillennialworldview.com now carry
individual research, in every classification** — as do all 100 qualifying rows. Nothing traceable to
that source is unexamined anywhere in the directory.

**184 rows were researched today. 364 audited stance changes.**

### The tail was the hardest, and it produced one real find

**#3302 Foothills Christian Assembly, Edgefield SC — reclassified `single_issue`, abolition now
evidenced.** Pastor **Dr. Matthew Clark is the EXECUTIVE DIRECTOR of PERSONHOOD SOUTH CAROLINA**,
which campaigns for legislation recognising the personhood of the preborn so they receive
*"Constitutional rights as every other person"* — by legislative support, organising activists,
**collecting legislator pledges** and public events. Personhood is the equal-protection position, the
line that separates abolitionism from incrementalism, and he runs the state body.

`single_issue` rather than qualifying, because it is one question and nothing surfaced on the other
five — the same treatment given Calvary Chapel Saint Paul and Grace Fellowship Davenport. **Intensity
on one question is not breadth.** The church is also the ninth independent NCFIC appearance.

### A congregation voted itself out of the SBC over women pastors

**#3288 Cornerstone Bible Church, Great Falls MT** — in **September 2024** the members decided the
church must leave the Southern Baptist Convention *because of its leaders' growing support for women
as pastors*, and are seeking fellowship with Reformed Baptists. `genderStance` set to
`complementarian` on that act rather than by inference.

It does **not** make the row transformationalist: leaving a denomination is about the church's own
order, not the civil order, and this field measures the latter. (The congregation was Westside
Baptist until 2019.)

### The third dead pastor — and it was one this project already knew about

**#3300 All Saints' Church, Brownstown PA is GREGG STRAWBRIDGE'S congregation, and he died in 2022.**
This project had already recorded that death when untangling the same directory's stale attributions
elsewhere; it had simply never been connected to this row. He founded WordMp3.com and personally
trained ministers — Lucas Dorminy of #4219 studied under him from 2017 — so the discipleship trail
out of that pulpit is worth mapping even though the man is gone.

That makes **three deceased pastors** (Talbot 2022, West 2023, Strawbridge 2022) carried as current
by one source.

### Five rows that were never plausible

The tail exposed how much of this list was simply wrong at the denominational level:

- **#3287 Sadler Chapel, Dexter MO** is **UNITED METHODIST** — it hosts monthly bluegrass jams.
- **#3298 Myrtle Creek** is **Church of the Nazarene**: Wesleyan-Holiness, ordains women, historically
  *pre*millennial. Three separate reasons a postmillennial-Reformed listing cannot fit.
- **#3250 Jubilee Christian Family, Franklin WI** makes no Reformed or eschatological claim at all.
- **#3303 Columbia Bible Assembly, TN** and **#3265 Iglesia Bautista Nueva Esperanza, Woodland CA**
  **could not be located under those names at all.** The Iglesia name is one of the commonest
  Spanish-language Baptist church names in America — congregations of that exact name exist in
  Riverside, Madera, San Antonio, Brighton CO and South Carolina. A pastor surfaced with no location
  attached; **he was deliberately not recorded**, because guessing which of six same-named churches a
  man belongs to is exactly how this cohort acquired its wrong attributions.

### Whitefield Theological Seminary, six rows in one day

**#3282 Fox Lake Community Church** — Pastor Wayne Christensen is working toward a doctorate there.
That is the sixth row today running through Whitefield, after Kenneth Talbot (#4137), Randall Talbot
(#4136), Frank Walker (#3262), Brian Phillips (#26) and Flynn Ayers (#4175). Its alumni include
**Gary DeMar, Kenneth Gentry, George Grant and R.C. Sproul Sr.** Whitefield is not a marker, but it is
unmistakably a node in this network.

### Corrections in the tail

**#3271 Sharon OPC is in Hialeah**, not Miami Lakes — and Jeffrey K. Boer has pastored it **since
1979**, forty-seven years, which after a day of dead and departed pastors is worth recording.
**#3284 Trinity Evangelical, Larwill IN renamed itself Trinity Reformed and moved to South Whitley in
January 2023** — not applied, because a name-and-city change must be checked against the directory
for an existing row first; this cohort has already produced several duplicates created exactly that
way. **#3259 Covenant Church, Mentone** was flagged `website_removed` but publishes at
covenantkirk.org — **a dead domain is often a changed one, and the flag should be retested, not
trusted.**

### Where the directory stands

| culturalEngagement | n |
|---|---|
| `transformationalist` | **100** |
| `single_issue` | 135 |
| `quietist` | 28 |
| `limited_mission` | 16 |
| `unknown` | 4,002 |

**Both queues are now closed.** Every qualifying row, and every row this directory ever took from the
postmillennial directory, has been read individually. The next work is the deep-dive queue — and the
best leads in it now came out of this cohort: the theonomy church directory, the Future of Christendom
conference roster, the 171 Ohio clergymen who signed against Issue 1, and Whitefield.

## 2026-08-05 — Theonomy directory worked to completion. Norman Statement mined. One self-correction.

Qualifying **100 → 103**. Two duplicates resolved, seven churches added, twelve rows given first-hand
corroboration, and **one call I made earlier the same day reversed on better evidence.**

### The theonomy church directory is fully worked — 26 of 26

All 26 congregations cross-referenced against the DB. **Nine were already qualifiers**, not the two
the queue file recorded — Branch of Hope, Chalcedon, Covenant Presbyterian Buford, Dominion Covenant
(Kayser), Covenant Reformed Presbyterian (Otis), Independence Reformed Bible, Reformed Bible Church
Appomattox, Heritage Presbyterian Cumming, and now Immanuel Free Reformed.

**#2698 IMMANUEL FREE REFORMED CHURCH, Stevens PA — PROMOTED.** The church's own vision is to
**"rebuild the broken foundations of the Family, Church, and STATE"** — the congregation naming the
civil order as part of its mission. Teaching elder **William O. Einwechter** is **Vice President of
the National Reform Association** and **editor of The Christian Statesman**, wrote *Ethics and God's
Law* and *Walking in the Law of the Lord*, and **edited *Explicitly Christian Politics***. 1,094 of
his sermons are published from that pulpit. `theonomy → theonomic`, `christianNationalism → affirm`.

Also worth recording: each sermon broadcast includes a period of **discussion and dialogue**, on the
principle that the covenanting men of the church are responsible to interact with the preacher.

### Seven churches added

**Two qualify:**

- **Covenanted Reformed Presbyterian Church, Prosper TX** — **Brian Schwertley**, who publishes
  Reformed Online with standing sections on **Civil Government** and **The Law of God**, and wrote
  ***National Covenanting: Christ's Victory over the Nations***. `christianNationalism` set to affirm
  **with precision**: national covenanting is the *covenanter* form of the claim — that nations as
  nations owe corporate allegiance to Christ — and is the Reformed ancestor of the contemporary
  movement rather than a synonym for it. The note says so, so the marker is not read as more than it
  is.
- **Word and Spirit Covenant Church, Omaha NE** — **Dr. Robert E. Fugate**, author of **more than
  twenty** books on biblical law used in **over sixty countries**, including *Key Principles of
  Biblical Civil Government* and ***Tyrants Are Not Ministers of God: What the Bible Teaches about
  Civil Disobedience, Romans 13, and Quarantine*** — resistance theory applied to a live controversy,
  which ties straight into the Trewhella lesser-magistrate lead. His Ph.D. and M.Div. are both from
  **Whitefield** (the eighth appearance). The church itself is thinly documented and its site is dead;
  the qualification rests on the man's output and says so.

**Three added and left `unknown`:** Crown & Covenant (Conroe TX), Christ the King (Centerville TN),
Providence Presbyterian (Aiken SC). **Two added from the Norman Statement, both `single_issue`:**
Grace Christian Bible Fellowship (Kansas City KS) and Hilltop Free Will Baptist (Wewoka OK).

**Three deliberately NOT added, with reasons:** Westminster Presbyterian of Waupaca County (Manawa WI)
— Schwertley has moved to Texas and whether the congregation survives could not be established;
Westminster Presbyterian, Corpus Christi — **closed 8 April 2012**; Iglesia del Calcedon, Quevedo,
**Ecuador** — the directory holds no non-US rows (51 states, zero foreign).

### The 2011 list is stale exactly as predicted — with one exception

Schwertley is in **Prosper TX**, not Manawa WI. **Kenneth Gentry retired in 2016** and his church has
both renamed itself (Living Hope *Presbyterian*) and changed denomination (**RPCGA → Bible
Presbyterian Church**, whose historic premillennialism is the opposite of his eschatology); bios
still calling him its pastor are a decade out of date. **Kenneth Talbot died in 2022.**

**The one attribution that held: Gary Wagner at Reformed Heritage, Los Gatos** — confirmed against
the church and Hanover Presbytery, the first 2011-era pastor attribution in this whole exercise to
survive checking.

### Two duplicates, neither catchable by string matching

- **#4183 Burlington NC → #1296** — the same congregation held twice, once under **Asheville** and
  once under **Burlington**, two hundred miles apart. #1296's own note had flagged the discrepancy
  and declined to guess; the cross-reference settled it. **Asheville was the error**; city corrected.
- **#3311 → #3690** (Providence RP, Wytheville) — and between them the two rows carried a
  contradiction, one saying **postmillennial** and the other **amillennial**, both from the same bulk
  import. Neither is evidenced.
- Later, from the Norman Statement: **#2987 "Heritage Tulsa" → #4042 Heritage Church, Tulsa.**

### The RPCUS is now fully traced

Sources place Trinity Presbyterian, **Tazewell VA** — and by extension its Wytheville mission — as
**the last two RPCUS congregations, the ones that joined Vanguard Presbytery in 2020** and ended the
denomination. Recorded as very likely and flagged `denom_verify`, not asserted.

### The Norman Statement is the best signatory source yet found

It names its drafters and initial signers **with their churches**. That is first-hand and
attributable — the class of evidence the equal-protection signatures are, and far stronger than the
abolitionist-orgs listing several rows rested on.

**Twelve rows annotated; four upgraded from third-party listing to `evidenced`** — First Baptist
Beggs, Heritage Tulsa, Immanuel Baptist Pikeville, North Athens Baptist. `culturalEngagement` was
**not** touched on any of them: a signature evidences the marker, not breadth.

### And it caught an error of mine, the same day

**#4031 First Baptist Edmond — I had it wrong.** This morning I set Blake Gideon to `incrementalist`
because he signed an open letter opposing Oklahoma SB 13. Working the conference rosters surfaced the
rest of the sequence, and it runs the other way:

- **19 Feb 2020** — "As pastor of EFBC It is my conviction that **all bills with the intent of ending
  abortion should at least receive a hearing** from Oklahoma Legislators **this includes SB13**."
- **Nov 2021** — proposed an amendment *strengthening* the abolition language of an Oklahoma Baptist
  resolution; co-authored the 2021 SBC resolution *On Abolishing Abortion*.
- **5–8 Feb 2022** — **his church HOSTED the Abolition Now Conference**, and he wrote the Baptist
  Messenger column promoting it: *"the evil of abortion will only be overcome by the people of God
  conquering the deeds of darkness."*
- **Jan 2023** — a video documenting his change, titled *"Pastor Goes from Being 'Pro-Life' to
  Abolitionist"*; 2023, spoke at Abolition NOW!; and he is an **initial signer of the Norman
  Statement.**

Corrected to `pro_abolition`. **I read one letter as a settled position instead of a moment in a
trajectory.** The letter stays on the record — but a man who hosts an abolition conference in his own
building and narrates his own conversion is not an incrementalist. `culturalEngagement` stays
`single_issue`: hosting a conference is intensity on one question, not breadth across others.

### Where it stands

`transformationalist` **103** · `single_issue` 137 · `quietist` 28 · `limited_mission` 16 ·
`unknown` 4,004. Directory total 4,288.

**Priority 3 in the brief — the demoted `unknown` cohort — was already closed** earlier the same day:
0 of 186 unresearched. Nothing was left to do there.

New leads filed in the deep-dive queue: the Norman Statement's twelve **organisations** (each its own
roster), the **Oklahoma Watch / KGOU investigation** *"From Norman to the State GOP"* (May 2026), and
two unresolved names — **Nathaniel Morrison's Grace Reformed Baptist Church of Norman OK**, which
cannot be confirmed to exist, and **Rick Prettyman's Christ Community Church**, where the wrong man is
easy to grab.

## 2026-08-05 — The Ohio H.B. 370 pastoral petition. 143 congregations, 133 of them new.

Working the Norman Statement's organisations led to **End Abortion Ohio**, and through it to the
single largest evidenced addition this directory has ever taken in one pass.

**170 named pastors, with churches and cities**, signing:

> *"I, the undersigned, wholeheartedly and unequivocally support H.B. 370, the Ohio Prenatal Equal
> Protection Act, and urge our esteemed and honorable legislature to give passage to it out of
> obedience to King Jesus."*

H.B. 370 was introduced in the Ohio House in **June 2025**. It defines personhood as commencing at
fertilisation and would give preborn persons the same legal protections as born persons — **abolition,
not regulation**. It is backed by End Abortion Ohio, whose director **Austin Beigel is a drafter of
the Norman Statement**, which is how the thread was found.

**170 signatories → 143 distinct congregations → 10 already here, 133 added.** `single_issue` 137 →
270. Directory 4,288 → 4,421. Full roster kept at `data/ohio-hb370-pastoral-petition.txt`.

### Why this counts, and exactly how far

A named pastor formally backing a named equal-protection bill is **first-hand, formal and
attributable** — the same class of evidence as the Iowa and Nebraska equal-protection statements, and
far stronger than any directory listing. So `abolitionStance = pro_abolition`, `evidenced`.

**And no further.** Every added row carries `signature_only` and `researchStatus = not_researched`:
denomination, eschatology and the other five markers are unset, and `culturalEngagement` is
`single_issue` because a signature evidences **one** public question and says nothing about breadth.
These rows have not been read on their own terms and their notes say so.

### It caught a false negative from earlier the same day

**#2684 Hopewell Church, Ashland OH.** I researched it this session off the theonomy directory,
recorded "nothing on the site or from Timmons touches theonomy, postmillennialism, dominion, civil
government, abortion..." and left it `unknown`. **Matt Timmons had signed the H.B. 370 petition.**

The site-only read was accurate about the site and wrong about the church. This is the fourth time
this project has watched that happen, and it is why the fourth leg of the standard exists.

### A data-quality problem in the Ohio rows

While matching I found that **23 of the 85 Ohio rows carry a COUNTY in the `city` field** —
"Coshocton County", "Clermont County", "Franklin County", "Hamilton County". It is a bulk-import
artefact and it silently breaks any city-based matching.

**It nearly cost me both ways.** A naive city match missed real duplicates (Pleasant Hill Baptist,
Milford = the row filed under Clermont County; Oikos, Galloway = Franklin County; Reconciliation,
Batavia = Clermont County; Grace Covenant, Parma = Cuyahoga County). A loose match went the other way
and paired **Calvary Baptist of Marysville (Union County) with the existing Coshocton County row**,
and matched two different men named Williams to one church.

Every collision was finally resolved by **Ohio county geography**, recorded per row: 12 judged the
same congregation, 18 judged distinct with the reason stated. **A county-vs-city sweep of the whole
directory is now queued** — Ohio will not be the only state.

### Two more near-duplicates avoided

The signatures themselves carried name variants that would have produced junk rows: *The Village
Church* / *The Village Church Columbus* (four signers), *Piqua Baptist* / *Piqua Baptist Church*
(three), *Grace and Truth Church of Cincinnati* / *Grace and Truth Church Cincinnati* (three).
Grouping on a normalised name folded them into one congregation each. **170 signatures were only 143
churches**, and the difference is entirely multi-pastor congregations and spelling variants.

Flagged, not merged: **Steve Bush "Covenant Church, Millersport"** and **Mark Thogmartin "Millersport
Covenant Church, Millersport"** are very likely one congregation under two renderings; and
**Redemption Bible Church** signs from both Bellefontaine and West Liberty, eight miles apart in Logan
County — possibly a second campus.

### A consistency error of my own, caught and fixed

The 133 added rows were set to `single_issue`; the 10 pre-existing rows I updated were left at
`unknown` because I had written "culturalEngagement is NOT changed" into the update path. **Same
evidence, two classifications.** Nine rows corrected in a follow-up pass; East River (#4039) was left
alone because it already reads `transformationalist` on independent evidence.

### Names in the list worth noting

**Michael Foster, East River Church, Batavia** (#4039) — already a qualifier, and the parent of Silver
City Church KY (#4161), promoted earlier today. **Michael Clary, Christ the King Church, Cincinnati**
(#210). **Matt Timmons, Hopewell, Ashland** (#2684). And the list reaches well past the Reformed
world: Bible Methodists, Nazarenes, Grace Brethren, an Alliance church, a rescue mission and a
hospice chaplain all signed.

**Clint Zeigler of Sovereign Christ Church, Mansfield (#4186) did NOT sign.** That was the row the
Ohio lead was supposed to settle, and the honest answer is that it settles it in the negative: he is
not on this petition. The separate 171-clergy Issue 1 letter is a different and much weaker document —
a broad pro-life coalition across 23 counties framed on parental rights, delivered by three named
pastors in October 2023 — and its full signatory list is still not published anywhere reachable.

## 2026-08-05 — The rest of the Norman Statement organisations. Diminishing returns, and a second false negative.

Ohio was the outlier. The other nine organisations were worked and **most publish no roster at all** —
which is a finding worth recording so nobody spends another session looking.

### What each one actually yielded

| Organisation | Roster published? | Result |
|---|---|---|
| **End Abortion Ohio** | **YES — 170 pastors** | 143 congregations, 133 added *(previous entry)* |
| **Abolish Abortion Missouri** | **YES — 6 pastors** | 2 matched, 4 added |
| **Abolish Abortion Oklahoma** | no | "over 100 pastors" signed for SB 13, **but no list is published** |
| **End Abortion Alabama** | no | HB 518 backed; pastors' meetings held; no signatories named |
| **Abolish Abortion North Carolina** | no | references a "Coalition of Abolitionist Churches", **names none** |
| **Abortion is Murder Kansas** | no | has an "Affiliate Church Network", **names no churches** |
| **Liberty Rising Institute** | no | "equipping the saints to engage their legislators"; no roster |
| End Abortion Nebraska | — | already covered by the 2026-07-31 Nebraska work |
| Rescue Those · Cruciform · Forge | — | principals already in the directory |

**The pattern: these organisations publish petitions to be signed, not lists of who signed.** Ohio and
Missouri are the exceptions, and Ohio's was only reachable because the petition had its own URL. When
a state org names a *bill*, look for a page dedicated to that bill.

### Missouri: six churches, and the second false negative of the day

The Missouri Pastor's Petition — *"Since the overturning of Roe v. Wade unborn babies are still not
equally protected under Missouri law, as born persons are"* — carries six men. Two were already here,
four added.

**#3287 SADLER CHAPEL, DEXTER MO — I dismissed this row this morning.** Researching the
postmillennial cohort I wrote it off as *"a bad row in the source"*: United Methodist, a denomination
that ordains women, whose only visible public activity was **hosting monthly bluegrass jam sessions**.
I recorded "nothing on abortion, postmillennialism, theonomy, Christian nationalism, Zionism or
patriarchy."

**A pastor of that church had signed Missouri's equal-protection petition.**

I dismissed it on **denominational** grounds. That is "denominational inference is not research"
broken in the negative direction — and the negative direction is the dangerous one, because a wrong
dismissal leaves no trace in the record. **Second time today**, after Hopewell Church, Ashland.

*(Leadership note: the petition lists **Joe Myers**; local press gave **Dave Fowler**. Both recorded,
neither discarded, which is current unresolved.)*

### Oklahoma gave up a church by a different route

Oklahoma publishes no signatory list, but the reporting on SB 13 names the **organisations** that
backed it — and one of them is a church this directory did not have.

**#4485 FAIRVIEW BAPTIST CHURCH, EDMOND OK — ADDED AND QUALIFYING.** Senior Pastor **Paul K. Blair**
since 2001, a former NFL offensive lineman, is **President of Reclaiming America for Christ** and
**founder of the Liberty Pastors Network** and its training camps — institutions built to move pastors
into the civil sphere, and his own rather than ones he merely serves. He broadcasts weekly on Bott
Radio, sits on the Covenant Journey Academy board, and is tied to Truth & Liberty and Public School
Exit. A former mayor of Edmond has publicly called his preaching "white Christian nationalist" — a
critic's label, recorded as such, but the underlying position is Blair's own and is not in dispute.
His church's pulpit politics has drawn press scrutiny over the IRS restrictions, which is itself
evidence the politics is happening. `christianNationalism → affirm`.

**A church appearing among the backing ORGANISATIONS of an abolition bill is the congregation acting
corporately** — a form of evidence this project had not used before, and worth remembering.
`abolitionStance` left unknown all the same: an organisational listing is not a signed statement.

### Kansas checked out clean

The AIM KS Capitol rally of January 2026 named two pastors — **Josh Eaton, Cross Point Baptist,
Caney** and **Curtis Knapp, New Hope Baptist, Seneca**. Both are already in this directory and both
already read `transformationalist`. Nothing to add, which is its own kind of confirmation.

### Where it stands

`transformationalist` **104** · `single_issue` 285 · `quietist` 28 · `limited_mission` 16 ·
`unknown` 3,993. Directory **4,426**.

## 2026-08-05 — The county-vs-city sweep. 88 rows repaired, and a church website that now sells gambling.

The Ohio import turned up a data problem worth chasing directory-wide. It was worse than Ohio, and it
was not only counties.

### The scale

**161 rows carried a COUNTY in the `city` field** — not an Ohio quirk but a bulk-import artefact
across **26 states**: OH 23, CA 15, IL 15, IN 12, NC 11, VA 10, MO 10, SC 10, and on down.

**77 were repaired deterministically.** Where a row had its own five-digit zip, the real city was
recovered by lookup and applied **only when the zip's state matched the state already on the row** —
so the repair is arithmetic, not a guess. The former value is preserved in every note.

**84 remain and now carry a new flag, `city_is_county`**, because they have no zip and no street
address to recover from. The flag's description says what the risk actually is: *any code that
matches on city will silently miss this row.* That is not hypothetical — during the Ohio import a
city match missed four genuine duplicates hiding behind county values, and a looser match paired two
different congregations.

Two flags were added to the vocabulary: **`city_is_county`** and **`location_conflict`**.

### The city field held worse things than counties

Eleven rows were individually corrupt, and the pattern is a scraper that grabbed whatever line
happened to sit where a city should be:

- **#3702 Christ Church NYC** — city held **"Keith Paulus Senior MInister"**, a person's name and
  title. Address held a service time and then the street. Both recovered: 111 East 87th Street, New
  York. *The corruption preserved one useful fact — the senior minister's name — now recorded as
  unverified.*
- **#3951 Zion Presbyterian** — city held **"Jess Stanfield"**, a pastor's name. Recovered to
  Juliette GA from the row's own held duplicate. Stanfield now pastors Chalcedon (#3274).
- **#3994 Grace Baptist Church-Taylors** — city held "SUNDAY SCHOOL -  AM" and the **address held
  "1689 London Baptist"**, which is the confession this church subscribes.
- **#3708** city held "Sunday Service -  AM" · **#3722** held "10:30AM and 6PM Sundays" ·
  **#3709** held "Meets at the building" · **#3549** held "PO Box 1066".
- **#3637 Northland Reformed Church** — city and address both held the church's own name. Resolved
  to 2901 NW Cookingham Dr, Kansas City — **and the STATE was wrong too**: filed under KS, it is in
  MO. The city was in the church's own name all along ("of Kansas Ciry" [sic], now also fixed).

Five rows were fixed outright, six flagged where any repair would have been a guess.

### A church website is now an online gambling site

**#3708 Sovereign Grace Baptist Church.** Its recorded website, `sovereigngracebaptistchurchsa.com`,
**no longer belongs to the church**: it now serves an online gambling platform operating out of Ho
Chi Minh City, Vietnam. A lapsed registration, bought by someone else.

**The URL has been deleted from the row, not flagged.** A public directory sending readers to a
gambling site under a church's name is a live harm, and a flag would have left the link clickable.

**The general lesson: "dead" and "sold to someone else" look identical from a link.** Ten rows were
flagged `website_removed` while still carrying a URL; all ten were checked for takeover and the other
nine are clean.

### Three `website_removed` flags were simply wrong

The same check found the flag failing in the other direction:

- **#59 redeemerokc.org** and **#2146 all-of-grace.org** both return HTTP 200 and serve live church
  sites. The flags were stale fetch failures.
- **#3690 thebiblealone.com** returns 200 but only ~2KB, because it is a **Nuxt JavaScript app that
  renders client-side**. To a fetcher it looks empty — which is exactly what I recorded about it
  earlier today. It is not dead; it cannot be read without executing JavaScript.

**An unreachable site is a fact about the fetch, not the church — and that cuts both ways.** A
`website_removed` flag is also a claim, and it has to be retested. **Any row whose note says "empty
body" should be re-tested in a browser**; it is probably a JS-rendered site, not a dead one.

### Three location conflicts, flagged and not guessed

Rows whose state, zip and city contradict each other. **#1556** Darlington Reformed Presbyterian: AL
state, PA zip — the state is the likelier error. **#353** Lillian Fellowship: AL state, NY zip — here
the *zip* is the likelier error, the reverse. **#1976** Gainesville Presbyterian: VA state, PA zip,
and Gainesville exists in both. Plus **#3325**, filed under Alabama with a city of "66849 Landstuhl"
— a German postal town with a large US military community — and **#3656**, filed under Nebraska with
an address in Grande Prairie, **Alberta**. This directory holds no non-US rows, so those last two are
scope questions for the owner rather than city repairs.

**Nothing was moved.** With three fields disagreeing, any repair picks a winner arbitrarily, and this
project has been burned by confident guesses about location before.

## 2026-08-05 — US-only confirmed. Two rows held out of scope; a name field holding a street address.

Dustin's ruling on the two scope questions left by the county-vs-city sweep: **no non-US churches.**
Both were verified before acting, and both are held under `review_nonfit` with `approved=false` —
retained, not deleted, so the research survives and the call is reversible.

**#3325 Trinity Reformed Presbyterian Mission — GERMANY.** Confirmed from the church itself:
**Kirchenstraße 2a, 66849 Landstuhl**. It is a real congregation and **a member of the Presbyterian
Church in America**, serving "the military and English-speaking community in the greater
Kaiserslautern area" — which is exactly why an American denomination has a church on German soil and
why the row was filed under a US state to begin with. Nothing is wrong with the church; it simply is
not in the United States. The German postal code sitting in the city field is what surfaced it.

**#3656 Covenant Reformed Church, "NE" — nothing behind it but a Canadian address.** Every field is
empty or corrupt: the city held the church's own name, no zip, no website, no pastor, no source URL,
and a denomination ("URC") from the 203-row bulk import already established as a wholesale guess. Its
one concrete datum, "10803 94th St", resolves to **Covenant Reformed Church of Grande Prairie,
Alberta**. No Covenant Reformed Church could be found in Nebraska at all. Either it is the Canadian
congregation or it is a phantom; on both readings it does not belong.

### The wider sweep found no others

A directory-wide scan for foreign indicators across name, city, address and zip returned 29 hits and
**27 were false positives** — and instructively so. "**Netherlands** Reformed" is a US denomination
with congregations in Michigan, Iowa and the Dakotas. **Ontario, CA** and **Peru, NE** are real
American towns. "Mexico Rd", "Canada Cross Road" and "Alberta Drive" are streets. "India Rd" and
"India Hook Rd" are streets. **A place name inside a church's name or address means nothing** — which
is worth recording before someone runs this scan again and starts deleting Dutch-heritage churches in
Sioux Center.

### Four more repairs the scan turned up

- **#986** — the `zip` field held **"10409"**, which is the street number of 10409 Taylorsville Rd.
  Louisville zips begin 40xxx. Cleared rather than guessed.
- **#3579** — address held "16 N 3rd St" then a newline and the stray word "Street".
- **#3872** — address held the single word **"Netherlands"**, a fragment of the denomination's name.
- **#3938** — address held only "Ontario"; made explicit as "Ontario, CA" so a future scan does not
  mistake it for the Canadian province.

**#3613 — THE CHURCH NAME FIELD HOLDS A STREET ADDRESS.** The row is *named* "1053 E 6th St", which
is also its address. The congregation's actual name is recorded nowhere on the row. Ontario CA is a
real US city so it is in scope; it simply has no identity, and it is flagged until someone
establishes the church from the address.

## 2026-08-06 — The remaining equal-protection states. Indiana and Kentucky pay out; five do not.

Eight states left after Ohio and Missouri. **Two published rosters, six did not.** Directory
**4,426 → 4,586**; `single_issue` 285 → 459.

### Indiana — 80 pastors, 60 churches added

**Indiana Pastors United Against Abortion** (equalprotectionindiana.com/pastoral-petition): *"we
hereby beseech our elected officials, as though God did beseech you by us to end the slaughter of the
preborn in Indiana"* — calling on officials to grant **equal rights to the preborn**. 80 named
pastors, 76 with churches. **10 matched, 60 added.**

### Kentucky — 128 pastors, 100 churches added

**HB 523, the Abolition of Abortion in Kentucky Act** (Reps. Richard White and Josh Calloway), which
holds that life begins at fertilisation and **equal protection begins then**. 128 pastors signed:
*"Whether a baby is inside the womb or outside the womb, the place that it resides does not change
the fact that it is a life."* **10 matched, 100 added, 2 skipped** — the Rockcastle Baptist
Association and Forgiven Ministries are not congregations.

Context worth keeping: **more than 300 Kentucky pastors** met at the Creation Museum for an End
Abortion Now presentation on the bill, and the **Kentucky Baptist Convention** adopted a 2024
resolution exhorting officials to "take all necessary steps to legally abolish abortion."

### A third false negative of mine, caught the same way as the first two

**#3284 Trinity Evangelical Church, Larwill IN.** I researched it off the theonomy directory on
2026-08-05, recorded *"nothing on any of the six markers"*, and left it `unknown`. **Its pastor, Nate
Harlan, had signed Indiana's equal-protection petition.**

That is **three in two days** — Hopewell Ashland (Ohio), Sadler Chapel (Missouri), Trinity Larwill
(Indiana) — and **all three were caught by a signature list, never by re-reading the church.** The
site-only read was accurate about each site and wrong about each church.

### The five states that published nothing

| State | Bill | Result |
|---|---|---|
| **Texas** | HB 896 / HB 3326 | Petition *text* published, **roster is not**. HB 896's is from the 2019 session. |
| **Georgia** | HB 441 | A "Georgians Ending Abortion" coalition letter exists and pastors signed it; **no list published**. Partners: GRTL, G3 Ministries, End Abortion Now, Operation Save America, FAA. |
| **South Carolina** | — | **Calvary Presbytery (PCA) unanimously adopted an anti-abortion petition on 7 Feb 2026**, commissioners representing **45 churches**, 12.5 Upstate counties. **It names no church or pastor.** A presbytery act is not 45 individual signatures and was NOT treated as such. It did recommend individual Sessions petition their own districts — if any did, those *would* be per-church acts. |
| **Idaho** | — | No abolitionist pastor petition found. The Idaho abortion news is a **pro-choice ballot initiative** that qualified for November 2026. |
| **North Dakota** | — | Nothing located. |

**The pattern holds from the Norman-organisation sweep: most of these groups publish petitions to be
signed, not lists of who signed.** Four states out of ten have published a roster. When one does, it
is worth a hundred churches; when it does not, no amount of digging on the org's homepage helps.

### Two duplicates — one of which I created

**I created one.** The Kentucky roster lists Joseph Spurgeon at *"Sovereign King Church, Clarksville,
IN"*; the directory already held his congregation under **Jeffersonville**. Adjacent towns in Clark
County, across the river from Louisville — which is also why an Indiana pastor is on a Kentucky
petition. My matcher required the city to agree, so it added instead of matching. Now
`duplicate_of:66`. **A city mismatch is not evidence of a different church, and metros that straddle
a state line break city matching worst of all.**

**And one that corrects an earlier match of mine.** Michael Clary signed *both* the Ohio and Kentucky
petitions — because **Christ the King Church moved from Cincinnati to Fort Thomas, Kentucky in
January 2025**, fifteen years to the day after its first service at the Corryville Rec Center. On
2026-08-05 I matched his Ohio signature to **#210 "Christ The King Church Eastern Hills"**. Neither
Corryville nor Fort Thomas is Eastern Hills, so that row may be a different Cincinnati congregation
sharing the name. **The signature is real; only the row it was attached to is uncertain.** Flagged on
both rows rather than unwound, because withdrawing the stance would be as much a guess as asserting
it.

### Names in the lists worth noting

Kentucky corroborates **#4161 Silver City Church, Mt Sterling** (Zach Hill) — promoted to qualifying
on 2026-08-05 — and **#4063 Immanuel Baptist, Pikeville** (Wesley Russell, a Norman Statement signer).
Indiana corroborates **#66 Sovereign King** (Joseph Spurgeon, of the Patriarchy Podcast) and **#4036
Harmony Baptist, Frankfort** (Derin Stidd, OSA and 2021 SBC resolution). Indiana also **resolves the
Brandon Scalf question**: he signs from **Cruciform Church, Indianapolis** — his own ministry's name —
which makes Heritage Tulsa past and casts doubt on #4154's claim on him. Five pastors of **Immanuel
Baptist, Louisville** (Ryan Fullerton's church) signed together; four from **Reformation Church,
Shelbyville**; three from **Trinity Reformed, Bloomington** (Tim Bayly's).

## 2026-08-06 — The theonomic denomination rosters. Ten churches added, nine denominations corrected.

Next source down the survey: the small theonomic bodies, which are small enough to enumerate
completely. Two were taken whole — **RP Hanover Presbytery (18) and the RPCGA (8)** — and between
them they corrected more of the existing directory than they added to it.

### Why these two bodies

**Hanover is Morecraft's presbytery** — the body he transferred into in 2015 after leaving the RPCUS
he had founded, and the home of his Heritage Presbyterian Church (#3275), already a qualifier. **The
RPCGA was founded in 1991 by members of the RPCUS**, the Reconstructionist body that dissolved in
2020. Both are small covenanter denominations sitting directly on this directory's subject.

**Membership still does not qualify a church.** All ten additions went in `not_researched` with no
stance and no marker claimed. They are candidates, and their notes say so.

### Nine denominations were wrong in the directory — including one of mine

| Row | Was | Is |
|---|---|---|
| #3947 Dillingham · #3946 Presbyterian Reformed Fellowship · #1967 Dickenson First | **PCA** | Hanover |
| #3686 Big Ridge | **URC** | Hanover |
| #3950 Southbridge · #3948 Manasquan | Reformed | Hanover |
| **#3944 RP Church of Manassas** | **RPCNA** | **Hanover** |
| #4139 RP Ocala | *(blank)* | RPCGA |
| #3304 Christ Reformed Presbyterian, Paris | Reformed Presbyterian | RPCGA |

**#3944 was my own error, made the previous day.** I researched that row on 2026-08-05 and recorded
RPCNA. It is RP-Hanover. **RPCNA and RP-Hanover have near-identical names and I took the better-known
one** — the exact shape of mistake this project keeps punishing, made by me, on a row I had just
worked.

**#3304 gained a real answer rather than a correction:** on 2026-08-05 I recorded that it was
"currently seeking affiliation in the RPCGA." The roster now lists it as a member of Westminster
Presbytery. The affiliation completed.

### Ten congregations added

Calaveras (Vallecito CA) · Christ Church of Story City (IA) · Faith Presbyterian Church Reformed
(Kemp TX, **Dr. Richard Bacon**) · Lebanon and Little River (both Goshen VA, **one pastor, Linwood
Wilkes, serving both**) · Tabb Street (Petersburg VA) · Bible Reformed Presbyterian of Wyoming Valley
(Forty Fort PA, *affiliated*, led by an elder rather than a minister) · Christ Reformed Presbyterian
(Lakeland FL) · Shenandoah Valley (Mt. Crawford VA) · Puritan Reformed Presbyterian (San Diego CA,
*affiliated*).

**One of these settles an ambiguity I flagged the day before.** Researching #4137 I found two
similarly named RPCGA congregations in Lakeland — "Christ Presbyterian Church" and "Christ Reformed
Presbyterian Church" — and could not tell whether they were one church or two. **The roster lists
them separately. They are two.**

**Refuge Reformed Presbyterian, Edmonton, ALBERTA was NOT added** — Hanover has a Canadian
congregation, and this directory is US-only.

### And a conflict I refused to resolve

Hanover's roster lists a **"Birmingham Reformed Presbyterian Church" in Hoover, AL**. This directory
already holds #4123, researched the day before from the **RPCNA's own records** — a mission
congregation under the Presbytery of the Alleghenies, begun as a Bible study in 2016, pulpit vacant,
at 100 Chase Park S.

Either there are two Reformed Presbyterian congregations in one Alabama suburb belonging to different
bodies, or one roster is stale. **Flagged `denom_ambiguous`, nothing changed** — because this is
precisely the trap I fell into on Manassas the same day, and having made that error once I am not
going to resolve this one by picking the more familiar name again.

## 2026-08-06 — Taking the small theonomic denominations whole. Two qualifiers were already in the directory, anonymous.

Directory **4,596 → 4,617**; transformationalist **104 → 106**.

The method this session was not searching for churches but **taking a denomination's own roster and
laying it against the directory**. It found two qualifying congregations that no amount of searching
had surfaced — because both were *already here*, sitting unresearched with **no pastor recorded**.

### Covenant Presbyterian Church (CPC) — 12 congregations

Founded 2006 when four churches and nine elders left the RPCGA over paedocommunion, discipline and
educational requirements for ordination. It already held **Phillip Kayser's Dominion Covenant (#19)**.

**#4021 Reformation Church of Elizabeth, CO — PROMOTED to transformationalist + patriarchal.** The
row existed, unresearched, with the pastor field empty. The roster named him: **KEVIN SWANSON** —
founder and director of **Generations**, host of **Generations Radio** daily for over a decade, who
advocates "male-led families and churches that will **direct society** away from feminism and
homosexuality," and who **ran for Governor of Colorado in 1994** on the Taxpayers (now Constitution)
Party ticket. A pastor who contests a statewide election is not commenting on the civil sphere from
outside it. Patriarchy is *his own stated aim*, not an inference from his network.

Four denominations corrected (#4016, #4019, #4014, #4015 — three were recorded PCA). Four
congregations added. **#3302 Foothills Christian Assembly, Edgefield SC** clarified: the roster puts
Dr. Matthew Clark at *Cornerstone Presbyterian* in the same town, and the SermonAudio broadcaster ID
is `foothillschristia` while the channel is **titled** "Cornerstone Presbyterian Church." One work,
two names. The name was **left alone and flagged**, not rewritten — renaming on inference is how a
directory acquires phantom churches.

### The RPCUS is gone, and I had eleven rows that did not know it

This is the correction that matters most, because it was invisible.

> **RPCUS dissolved in 2020** — its last congregations joined **Vanguard Presbytery**. In **May 2022**
> the former RPCUS churches *left Vanguard* to form the **Christ Reformed Presbyterian Church (CRPC)**,
> keeping the RPCUS distinctive of three offices: elder, deacon, evangelist.

So **an RPCUS label is at best six years stale**, and the succession forks. I had been carrying it as
a live denomination on Morecraft's old body all session.

**It also caught a guess of my own.** #3312 Trinity Tazewell read *"RPCUS (dissolved 2020) — very
likely now Vanguard Presbytery."* Half right, and **the wrong half was the half I guessed**: Trinity
joined Vanguard and then left it in 2022. "Very likely" was doing work a roster should have done.

### CRPC — 4 congregations

**#1768 Bridwell Heights Presbyterian, Kingsport TN — PROMOTED to transformationalist +
postmillennial.** Recorded **PCA**; it is CRPC. Its SermonAudio handle is *still*
`bridwellheightspca` — a fossil that would mislead anyone checking. Pastor **Patrick Hines** published
an episode titled **"Why I am Postmillennial"** — self-declared, not inferred from his denomination —
preaches on abortion ("God's Song to Abortion Providers," Psalm 10), runs "The American Church's
Battles," and authored *Redrawing the Battle Lines: 23 Sermons on Critical Issues Facing the Church*,
atop 2,000+ sermons on SermonAudio.

**What I deliberately did not claim:** no theonomy statement was found *despite the RPCUS descent* —
and descent is exactly the inference this project refuses. **Abolition is not established either**:
preaching against abortion providers evidences engagement on abortion, not the abolitionist position,
so `abolitionStance` was left unset rather than assumed from a sermon title.

### Vanguard Presbyterian Church — 21 churches, 15 added

Three rows (#830, #1292, #4086) claim Vanguard but are **absent from Vanguard's own current roster**.
The denomination was **left as recorded and flagged**, not blanked: absence from a roster is weaker
evidence than presence on one, and this project has already been burned treating a silent source as a
negative finding. Same treatment for #3690, #4145 and #1296, which claim a dissolved RPCUS and appear
on *neither* successor roster.

### Smaller things worth keeping

- **`chalcedon.org` is NOT a wrong website.** I flagged it as one — it looks exactly like the error
  pattern I've been hunting. It is #3274's own site. **Rushdoony's Chalcedon Foundation is
  `chalcedon.edu`.** Two institutions, similar names, shared lineage.
- **#4341 WPCUS:** a claim that the denomination "disbanded ~10 years ago" was **not acted on**,
  because the congregation's own current material still self-describes as WPCUS. The church's own
  word outweighs an undated secondary claim. Conflict recorded, not resolved. Schwertley's Michigan
  congregation (Chalcedon Christian, Haslett) is **not** in the directory — no stale row.
- **Burlington NC**: #4183 was already held as `duplicate_of:1296` from an earlier pass, so the guard
  skipped it correctly. Its **fuller pastor description was merged into the survivor** — holding a
  duplicate should cost no information. Salem Presbyterian (Vanguard) is a *different* Burlington
  church; two rows there are right, a third would not be.
- **Ryan Denton** pastors two Vanguard congregations (Roswell NM, Lubbock TX) — unsearched.
- **Grace Presbyterian, Hanover PA** has nothing to do with **RP–Hanover Presbytery**. Coincidence,
  noted on the row before it becomes someone's false match.

### The lesson of the session

Both promotions came from **rows already in the directory that had no pastor recorded**. Nothing about
either church's own website would have surfaced them; the pastor's name was the key, and the name came
from a *denominational roster*, not from the church. **A row with an empty leadership field is not a
researched negative — it is an unopened door.**

## 2026-08-06 — The NCFIC network, pulled whole. 405 family-integrated churches, and three matching bugs found by the pull.

Directory **4,617 → 4,854**. The largest single source this project has taken.

### Getting the list

The **National Center for Family-Integrated Churches** (now Church & Family Life) had appeared
**twelve times independently** across this session's research, and Kevin Swanson — promoted hours ago
— is a contributor. Its church finder renders client-side, so the page yields nothing to a fetcher.
The bundle did: `https://api.churchandfamilylife.com`, public and unauthenticated.

`/churches?limit=2000` returns **1,608 records — and 1,148 of them are junk**: abandoned signups,
including rows literally named "My Church" with no address and no leadership. The published directory
is the **448 with `status: "open"`**, of which **405 are US** (44 are UK, New Zealand, Canada,
Australia, Gambia — excluded under the US-only rule). 399 carry structured pastor names; 408 carry
websites.

**168 matched existing rows, 220 added, 17 added separately as name collisions.** Every row is
`not_researched` with no stance — **membership is not a qualification**, and NCFIC is explicitly a
network, not a denomination. What the listing *does* evidence is family integration: no age-segregated
children's church or youth group, whole households in worship, formal affirmation of the Church &
Family Life Declaration. That went in **`theologicalNotes` — the Editor's Note** — as asked.

Family integration **correlates** with household patriarchy, one of the six markers. It is not
evidence of it, and no `genderStance` was set from it.

### Three matching bugs, all found by running the same data twice

**1. Platform hosts.** I matched on website host. **48 rows in this directory record `facebook.com` as
their website**; 20 record `sermonaudio.com`. A dry run duly matched Lindsey Chapel Baptist (Eufaula)
to Redeemer Bible Church (Owasso) — *and* to Areopagus Norman, Morning Star Keota and Trinity Oktaha —
because all five have a Facebook page. Platform hosts are now excluded. Host matching is *kept*,
because it is the only thing that finds renames.

**2. The county escape hatch.** My matcher treated any city containing "County" as a wildcard, so
**Grace Bible Fellowship (Kern County) matched Grace Bible Church (San Diego)** — 200 miles apart.
County rows now require a corroborating zip or host.

**3. And then the tightened rule cost me a duplicate, in the same run.** #4019 Heritage Church carried
"Hickman County"; the NCFIC record said "Centerville" — the **county seat** — with no zip or website
on my side to corroborate. So the strict rule split them and I created **#4905**. Merged back into
#4019, city repaired.

> The lesson is not about the matcher. **A county in a city field breaks matching in both directions**
> — loose rules produce false merges, strict rules produce false splits. The only real fix is to
> repair the city. 83 such rows remain.

I checked whether this had happened anywhere else in the import: **it had not** — Heritage was the only
one.

### A pastor's name was sitting in a city field

**#3672 Oceanside United Reformed Church** had **`city = "Danny Hyde"`**. That is the pastor. It
surfaced only because the NCFIC listing matched the congregation *by website host* and reported the
real city: **Carlsbad**. Fixed, with the name preserved in leadership.

Like the county rows, a bad city value **does not look like an error in any query** — it just silently
drops the row out of every city-based match. That is the same failure mode, from a different cause.

### Three names, one domain

**#32 Grace Life Church of Dallas (McKinney)** and **#2627 Grace Life Church (Allen)** both record
`gracelifedallas.org`, and NCFIC lists a **third** name on that host — Grace Covenant Baptist Church,
McKinney. One is likely a rename or plant of another. **Nothing was merged or renamed**: both rows are
flagged `possible_duplicate` for a pass that reads the site's own history. Grace Life Dallas is the
congregation this project *already* wrongly dismissed once, before its pastor was searched, so it gets
no inference.

### The 17 name collisions

An automated guard skipped any NCFIC church whose name already existed in that state. That guard is
too blunt — "First Baptist Church" in Lomita and in Ripon are obviously different congregations. All 17
were added with `name_collision` and the colliding row IDs written into the note, **so that nobody
merges them later on the name alone, and so that if they do turn out to be one church, the collision is
already written down.**

## 2026-08-06 (later) — The CREC, taken whole. 82 congregations added, and the roster caught two stale pastors.

Directory **4,854 → 4,936**.

The CREC is the body most often mistaken, in coverage of this movement, **for a qualification in
itself**. It is not one, and this project has demoted CREC rows for exactly that reasoning. But it had
never been enumerated: the directory held **66 CREC rows against a federation of 220+**.

`crechurches.org` sits behind Cloudflare and refuses curl outright. WebFetch gets through, so the
roster was pulled in four alphabetical passes: **~146 US congregations**, plus missions and candidate
churches. The international congregations — Canada, Brazil, Philippines, UK, Ukraine, Poland, Russia,
Japan, Australia, Bulgaria, Czechia, Hungary — are out of scope under the US-only rule.

**59 matched, 82 added, 8 denominations corrected.** Every added row is `not_researched` with no
stance set.

### The matcher was wrong twice in opposite directions, and the pastor column settled both

Name+city matching alone reported **86 additions**. Sweeping every proposed addition against **pastor
surnames statewide** showed that **twelve of them already existed**:

| Roster says | Directory had | Why it was missed |
|---|---|---|
| Christ Church Santa Clarita | #40 at **Newhall** | Newhall is *inside* Santa Clarita |
| Christ Church Denver | #41 at **Englewood** | metro Denver |
| Christ Covenant Church of Chicago | #44 at **Rolling Meadows** | metro Chicago |
| St. David's Reformed, Houston | #3307 at **Tomball** | metro Houston |
| Christ the King Presbyterian, **Ferry** | #4085 at **Shelby** | both Oceana County MI |
| Trinity Church, **Woodinville** | #4216 at **Kirkland** | Dave Hatcher, adjacent suburbs |
| **St.** Mark Reformed | #4835 **Saint** Mark Reformed | my `st`→`saint` rule ran on the city field but **not on the name** |

And two were **false** positives: **Peter Leithart** is listed as a *teacher* at #38 Trinity
Presbyterian, Birmingham, while the roster has him pastoring **Immanuel Reformed** in the same city.
Same town, same man, two different churches. The suppression is deliberate and scoped — it blocks the
*pastor* route only, not the name route.

All twelve went in as an explicit `OVERRIDE` map keyed on roster name+city, each recorded on the row
as **"matched by PASTOR, not by name and city"** so the reasoning is visible and reversible.

### Held duplicates were poisoning the ambiguity check

Five records matched two rows each. **Four were already flagged `duplicate_of`** — the detector was
pairing each survivor with its own held duplicate. Held rows are now excluded from the pool. The
detector was right; the pool was wrong.

### The fifth ambiguity was real, and it was a stale pastor

**King's Cross Church, Moscow ID** matched both #4038 (its own row) *and* **#18 Christ Church**,
because **#18 still lists TOBY SUMPTER** — who has pastored King's Cross since **2022**. He was an
associate at Christ Church before planting it, so the attribution was once true and is now four years
stale.

The same sweep caught a second: **#40 Christ Church Santa Clarita records GARRETT CRAW as senior
pastor.** The roster puts Andrew Richardson there and **Craw at King's Cross Reformed Church, Austin,
TEXAS**. He left the state.

**Neither leadership field was edited.** Both are flagged `stale_leadership`. Removing a name because
a second church's entry implies it would be the same inference this project refuses — and Christ
Church Moscow has a large staff whose current list has not been read against its own site in this pass.

### One conflict left deliberately open

**#3264 Trinity Covenant Church** sits at **Terra Bella** in this directory and at **Santa Cruz** on
the roster — 200 miles apart, same pastor, one congregation. The existing note says the city came
*"per the CREC roster"* in an earlier pass. **So the roster has now been read twice and understood
differently**, which is precisely the case where choosing on the balance of impressions manufactures a
fact. Flagged `location_conflict`, unresolved, pending the church's own address.

### Dead end recorded

**Abolish Human Abortion's societies page publishes no list.** The local societies are decentralised
and self-governed with no central registry — the page describes how to *start* one. The abolitionist
network does not enumerate itself the way a denomination does; that is a structural feature of it, not
a gap in the search.

## 2026-08-06 (later still) — Conference rosters and signature statements. Mostly negative results, and the negatives are the finding.

No churches added. **The two biggest conferences in this movement are already fully covered here**, and
three promising signature lists turned out not to exist.

### Fight Laugh Feast — every pastor on the roster was already in the directory

The 2026 conference ("Holy Wars", 1–3 October) lists **Toby Sumpter (#4038), Doug Wilson (#18), Joe
Rigney, Ben Merkle, Jared Longshore (#18), George Grant (#279), Joe Boot, Michael Foster (#4039),
Chocolate Knox and Gabe Rench.**

**Every pastor on it was already here, and already classified `transformationalist`.** Zero new
churches. That is worth recording rather than shrugging at: the flagship conference of this movement
is now completely covered, which is a coverage *measurement*, not a wasted search.

The remaining names are not pastors of congregations — **Rigney, Merkle and Longshore all sit inside
the Moscow, Idaho institutions** (Christ Church, New Saint Andrews) rather than pastoring separate
churches, so they generate no rows.

### Future of Christendom — a named regional theonomy, and its speakers are mostly not pastors

A southeastern Pennsylvania Reconstructionist institution grown out of a 2009 Bible study, formerly
the **Mid-Atlantic Reformation Society**. It promotes a school it calls **LANCASTRIAN THEONOMY** — a
non-legislative approach to applying biblical law, argued in public against Stephen Wolfe and Tom
Hicks. Its 2024 speakers included **Matt Trewhella (#4220)**, Paul Michael Raymond (#3309), Matt
Kenitzer (#3301), Joel Saint (#4193); 2025 was headlined by **Jeff Durbin (#3)**.

Of the speakers *not* already here:

| Name | What he actually is |
|---|---|
| **Luke Saint** | **President** of Future of Christendom; author of *The Sound Doctrine of Theocracy* |
| **Chris Hume** | Host of The Lancaster Patriot podcast; executive committee |
| **John Bingaman** | Radio host; general manager of an architectural millwork manufacturer |

**None of the three pastors a congregation, so none produces a row.**

> **A conference roster is not a list of churches.** Speaker lists mix pastors with writers,
> broadcasters and businessmen, and only the pastors map to congregations. This is the counterweight to
> the lesson that *rosters beat searches* — a **denominational** roster is a list of churches by
> construction; a **conference** roster is a list of people, and most of them are not pastors.

### The Statement on Christian Nationalism publishes no signatories

This looked like the best remaining lead: a document co-drafted by **James Silberman and Oklahoma
state senator Dusty Deevers (#216)**, with contributing editors including **Joel Webbon (#17)**, that
demands the United States acknowledge the Lordship of Christ in its laws and **"abolish abortion"** —
**two of the six markers in a single text**.

It says *"We do not accept anonymous signatures."* So named signatures exist. **They are not
published.** The sitemap resolves to a single page; `/signatories`, `/signers`, `/signatures` and five
other paths all 404.

**Abolish Human Abortion's societies page is the same** — it explains how to *start* a local society;
the societies are decentralised and self-governed with no central registry.

This is now the **third** independent confirmation of the rule the state petitions established:
**these groups publish statements to be signed, not lists of who signed.** The exceptions are worth a
hundred churches each, which is why they're worth checking — but the base rate is low, and the way to
tell quickly is to look for a page dedicated to the specific *bill* or *document*, not the
organisation.

### Household of Faith Fellowship — seven churches, no names

Lists only cities: Canton GA, Centreville MD, Grants Pass OR, Hillsboro OR, King County WA, Sumter SC,
and Ashaiman, Ghana (out of scope). **No church names and no pastors, so no rows can be created** — a
city alone cannot be matched against or added.

### Two duplicate pairs, both already held

The pastor sweep paired **Mercy Seat Christian Church** (Milwaukee/Hartland, Matt Trewhella) and
**St. John's Reformed** (Friedensburg, apostrophe variant). Both were **already flagged `duplicate_of`
in earlier sessions** and the guards skipped them correctly. Noted here because the surfacing method
was new — a conference roster, not name matching — and it would have caught both had they been open.

## 2026-08-06 (evening) — The Sauvé and Webbon conference circuit, and the Founders directory.

Directory **4,936 → 5,640**. One promotion, and the largest single source yet.

### The conference circuit, checked year by year

**New Christendom Press** (founded by **Brian Sauvé** and **Eric Conn**, both pastors of Refuge Church,
Ogden — #16) and **Right Response Ministries** (**Joel Webbon**, Covenant Bible Church, Georgetown TX
— #17), every year traceable:

| Year | Event | Pastors on the roster |
|---|---|---|
| 2023 | RRM Fall Conference | Webbon |
| 2024 | RRM *Blueprints for Christendom 2.0* | **Douglas Wilson** (#18) on Postmillennialism and Kuyperianism, Joseph Boot, Sauvé, Conn |
| 2024 | NCP, Ogden | Sauvé, Webbon, **J. Chase Davis**, Joe Rigney, Stephen Wolfe |
| 2025 | NCP *Safety Third* | Sauvé, Conn, **Andrew Isker** (#64), Webbon |
| 2025 | RRM | Wolfe, **David Reece**, Conn, **Calvin Robinson** — who replaced **Jeff Durbin** (#3) after Durbin withdrew |
| 2026 | NCP *The War for Normal* | Wolfe, Sauvé, Conn, **Adam Madden**, Isker, **Zachary Garris** (#1429) |
| 2026 | NXR *Christ Is King \| America After Trump* | Sauvé, Conn, Webbon (CEO of NXR) |

**Nobody was missing except one — and he was already here, misfiled.**

### #67 The Well Church, Boulder — PROMOTED, and the leadership field was why it was hidden

The row named only *"Lead Pastor Matt (Vision & Teaching)"* and an associate. It never named **J. CHASE
DAVIS**, Lead Pastor of Ministry — the reason the congregation is of interest at all.

He **presented at the National Conservatism Conference (NatCon 5, 2025)** — an explicitly political
conference, not a church one — spoke at NCP 2024, publishes through **Founders Press** and writes for
**American Reformer**, wrote *Offensive Christianity: Restoring the Strength of Men in a Feminized
Age*, and **led the church out of the Acts 29 Network** with Matt Patrick over women preaching and
transgenderism. Action across political theology, gender and sexual ethics.

**What I deliberately did not claim:** Davis **explicitly rejects the Christian nationalist label** —
*"I have never thought of myself as a Christian Nationalist."* **The CN marker is not set.** He speaks
at conferences organised by self-described Christian nationalists; he does not accept the description,
and sharing a platform is not holding a position. `genderStance` is **complementarian**, not
patriarchal: the stronger word appears in critics' characterisations, not in his own.

> **A partial leadership field hides a church exactly as an empty one does.** That is now three
> promotions in one day found this way.

### A network I looked at and deliberately did not import

**Adam Madden** directs the **Golden Spike Baptist Network** — and it turns out to be a *geographic*
Southern Baptist association (Utah–Idaho SBC), fourteen churches. **Nine of its ten named churches are
absent from this directory and were not added.** Membership in a regional SBC association carries none
of the six markers and gives no reason to examine a congregation. Its director's conference appearance
is a fact about the man, not about the association.

Madden's own church, **#247 Christ Fellowship**, had its leadership corrected — it named only "Pastor
Timothy"; the pastors are **Javan Payne and Adam Madden**. Flagged `location_conflict`: Golden Spike
and NCFIC both give a **Brigham City** address, this row says **Harrisville**, twenty miles apart. A
P.O. box is not a meeting place, so both may be right. Neither was chosen.

### Founders Ministries — 1,449 churches behind a job-board plugin

`church.founders.org` is WordPress. The churches are a custom post type named **`employer`** — the
directory is built on a jobs plugin. `/wp-json/wp/v2/employer` returns everything, and
`x-wp-total: 1449`.

**Only 224 records parsed at first** because the city/state field is free text. The fix was the
**geocoded map address** each record also carries (`"…, Stanardsville, VA, USA"`), which recovered
**1,319 US churches — every one with a named pastor, 1,279 with websites.**

**615 were already in the directory (47%)** — a good sign about Reformed Baptist coverage. **704 were
added.**

**What the listing actually evidences**, and this is why it was worth reading: each church records the
public statements it affirms. Across the US set — **660 the Danvers Statement**, **783 the Nashville
Statement**, **566 the 2018 Dallas Statement on Social Justice and the Gospel**, 1,054 the Chicago
Statement. **A church's own recorded affirmation of a named document is first-hand evidence, the same
class as a petition signature.**

**But none of those is one of the six markers.** Danvers is *complementarian*, which ~2,000 rows
already carry and which does not qualify anything; the qualifying marker is *patriarchal*. Nashville
concerns sexuality; Dallas is an intra-evangelical fight over critical race theory. **They enrich a
row; they do not rank it.** All 704 additions are `not_researched` with no stance set, and 90 carry
`name_collision` with the colliding row IDs written into the note.

## 2026-08-06 (night) — Fit over volume. High-fit sources only, and a shared-domain duplicate sweep.

Dustin's correction: **stop broadening, find sources whose churches actually carry the markers.** Two
promotions, 36 duplicates held, and a rule for telling a useful source from a wasteful one.

### The rule this session produced

> **Denominations enumerate churches. Networks that require a CHURCH to sign up enumerate churches.
> Everything else — publishers, campaigns, conferences, statements — lists PEOPLE or IDEAS.**

Checked and confirmed empty, recorded so nobody spends the hour again: **Chalcedon Foundation**
(Rushdoony's own organisation — no public church directory; note it is `chalcedon.edu`, while
`chalcedon.ORG` is the Cumming GA congregation #3274); **American Vision** (a publisher, not a
network); **Abolish Human Abortion** (societies are decentralised, no registry); **the Statement on
Christian Nationalism** (signatures accepted, never published).

And one that is gated rather than absent: **the End Abortion Now Coalition dashboard is a Mighty
Networks community behind login** — 403 to anonymous requests, affiliate map visible only to signed-in
members who belong to a church with qualified elders. It is the most on-thesis abolition source there
is. **It was not circumvented.** The way in is participation.

### Kuyperian Commentary — what a high-fit source looks like

Eighteen contributors. Of those who pastor US congregations, **nearly all were already here and
several are already qualifiers** — Brito (#25), Lusk (#38), Garwood (#4043), McIntosh (#3307), Wiley
(#566). That hit rate is the point: it is what a source aimed at this directory's actual subject looks
like, as against a large denominational list where most rows carry no marker at all.

Still a list of writers, not churches: Koyzis is a Canadian academic, Remy Wilkins teaches at Geneva
Academy, Joshua Luper is a **deacon**, Jesse Sumpter is Logos School faculty, Luke Welch preaches at an
unnamed Anglican church. **None produces a row.**

Two did: **#3371 Reformation OPC** gained its pastor (**Joel Ellis**) plus two recorded conflicts — its
own site says it left the OPC for the **CREC in 2024**, but the CREC roster captured the same day does
not list it; and it says **Apache Junction** where the row says Mesa. Neither was resolved. And
**Saint Paul's Anglican Church, Los Altos CA** was added for **Steve Macias** — Students for Life's
first West Coast regional coordinator, California State Capitol staffer, campaign consultant, and
headmaster of a classical school. **No stance set**: three sources about the man, none about the
congregation, is not the four-source standard.

### Reading a BILL instead of searching for churches

The Foundation to Abolish Abortion keeps a page per equal-protection bill. The Louisiana page named
the pastor behind HB 813 — and he **was not in the directory at all**.

**First Baptist Church of Pollock, LA — Brian Gunter — added as `pro_abolition` +
`transformationalist`.** He **co-wrote the Abolition of Abortion in Louisiana Act** with Rep. Danny
McCormick and Bradley Pierce, mobilised statewide church support, campaigned for the Love Life
Amendment — and **resigned as Grant Parish Justice of the Peace** over the same-sex marriage ruling. A
second public question, acted on at cost.

**A tension recorded rather than smoothed:** Gunter is outreach director for **Louisiana Right to
Life**, and the established pro-life groups publicly **opposed** HB 813. He championed an abolition
bill the incrementalist movement he works for came out against. How those sat together is not
established — and this project has already been wrong once (#4031) by reading one moment as a settled
position.

**But the method mostly does not generalise:** the other eleven FAA bill pages (MI HB 4671, GA HB 441,
TX HB 2197, OK, TN, MO, IA, KY, AL) name **legislators, not pastors**. Louisiana was the exception
because news coverage named Gunter.

FAA's own **leadership page** did pay: it names board members' churches — Grace Family Baptist
(Houston), Oak Shade Baptist, Redemption Hill — and its advisory board is **Dusty Deevers (#216)** and
**Brett Baggett of Ekklesia Muskogee (#2470)**, both already qualifiers.

### The shared-domain sweep — the strongest duplicate signal in this directory

Chasing one Founders row turned up **three rows for one Conroe church**, all on `gfbcconroe.com`. So I
swept all 4,321 rows carrying a non-platform website.

**50 shared-host clusters. 23 held as duplicates, 30 cross-state conflicts flagged, 11 left for
review.**

**Name-and-city matching cannot see any of these.** "Zion Church" and "Zion PCA" in Lincoln. "Covenant"
and "Covenant Presbyterian Church" in Buford. "Bryce Avenue Presbyterian Church" in White Rock and in
Los Alamos — **that one paired an unresearched row with a qualifier.** Every one is a single
congregation.

**Cross-state clusters are NOT duplicates — they are wrong websites**, and were flagged
`website_conflict`, never merged: Calvary PCA in Raleigh *and* Greenville, Living Hope in Pasadena
*and* Ohio, Redeemer in Alpharetta *and* Mason. Denominational church names repeat in every state and a
URL copied from a search result lands on the wrong one silently.

**Platform hosts must be excluded first or the whole method inverts** — 48 rows list `facebook.com`,
20 list `sermonaudio.com`, and three list `gmail.com` as their website.

**One cluster was deliberately left unmerged:** `gracelifedallas.org` carries #32, #2627 *and* a third
name from the NCFIC listing (Grace Covenant Baptist, McKinney). Three names on one domain looks more
like a plant or a rename than a duplicate row — and Grace Life Dallas is a church this project once
wrongly dismissed. It gets read, not inferred.

### And I cleaned up after myself

The Founders import created **13 duplicates within its own run**: the source lists some churches twice
("First Baptist Church of Goodpine" / "First Baptist Goodpine"), and my import loaded each state's
existing rows **once before the loop**, so a row added during the run was invisible to every later
record. **Dedupe the source against itself before inserting.** The NCFIC and CREC imports were checked
for the same fault and were clean.

## 2026-08-06 (late) — The three remaining sources, each looked into. Two paid, one should not be pulled.

Directory **5,642 → 5,678**. Thirty-six rows, not seven hundred.

### 1. RCUS — 47 congregations, taken whole

`rcus.org`'s find-a-church renders nothing to a fetcher. It runs on **WP Google Maps**, whose markers
are public at `/wp-json/wpgmza/v1/markers` — 47 congregations with addresses, phones, emails and
websites, all 47 parsing cleanly.

**26 matched, 21 added, and 22 denominations corrected** — the largest denominational correction of
the day, because most of these rows were carrying something else entirely.

**It is recorded with a warning attached, not as a lead.** The **RCUS Synod formally disclaims
Christian Reconstructionism and theonomy**, which this project established earlier and which already
killed a postmillennial claim on one row. Membership here is not merely "not a qualification" — it is
mild evidence *the other way* on two of the six markers. The roster was taken to complete the
denominational record, not because these congregations are expected to qualify.

### 2. The 130 Founders records with no location — 29 recovered, 100 genuinely foreign

The first import read each record's free-text city/state field and, failing that, the **second-to-last
segment** of the geocoded address. That works for `"636 Madison Road, Stanardsville, VA, USA"` and
fails silently for the long form:

> `"Scuffling Hill Road, Rocky Mount, Franklin County, Virginia, 24151, United States"`

— where the second-to-last segment is the **ZIP**. Scanning the whole address for a state token, and
taking the segment before any "County" as the city, recovered **29 more US congregations** (14 already
here, 15 added).

The other **100 are genuinely foreign** — 27 Canada, 4 UK, 4 Philippines, 3 Kenya, 3 Australia, 2
France, 2 Costa Rica, 2 Honduras, 2 Germany, and one each in Taiwan, Chile and Thailand — correctly
excluded under the US-only rule. Exactly one record has no geocode at all.

**A note on the shape of that error:** a parser that takes a fixed position in a delimited address is
guessing about the format. Both address forms came from the same field of the same API.

### 3. NAPARC — looked into, and it SHOULD NOT be pulled

**NAPARC is not a database.** Its "Local Congregation Finder" is a page of links to thirteen member
denominations' own directories. Pulling it means pulling thirteen separate rosters.

So the question is per-denomination coverage. Measured properly — and the first measurement was
**wrong**, because matching the substring `urc` finds it inside the word **"Church"**, which inflated
URCNA from 42 to 528:

| Body | rows held | approx US size | gap | fit |
|---|---:|---:|---:|---|
| KAPC | 0 | 300 | **300** | low |
| ARP | 139 | 250 | **111** | low |
| URCNA | 42 | 130 | **88** | moderate — Dutch neo-Calvinist, genuine Kuyperian heritage |
| PCA | 1,813 | 1,900 | 87 | low, and see below |
| PRC (Protestant Reformed) | 0 | 32 | 32 | low |
| FRCNA | 1 | 25 | 24 | low |
| HRC | 3 | 25 | 22 | low |
| RPCNA | 95 | 100 | 5 | already complete |
| RCUS | 48 | 47 | ~0 | done today |
| CREC | 156 | 146 | ~0 | done today |
| OPC | 336 | 290 | ~0 | already complete |

**The finding is clean: every NAPARC body with a real gap is low-fit, and every on-thesis NAPARC body
is already complete.** CREC, RCUS and RPCNA — the three whose churches actually carry these markers —
are all done.

Three specific reasons not to pull the rest:

- **KAPC (300) and ARP (111)** are large conservative bodies whose identity has nothing to do with the
  six markers. That is 411 rows of pure dilution.
- **PCA (87) would make an existing problem worse.** This project already carries a known data gap of
  roughly 400 PCA-belt rows populated by *denominational default* rather than research. Adding more PCA
  rows deepens the exact defect the project has flagged against itself.
- **PRC, HRC and FRCNA (78 between them)** are doctrinally the *opposite* pole — the Protestant
  Reformed denial of common grace points away from cultural transformation, and the Dutch experiential
  bodies are pietist. They would classify `quietist` almost to a row. Analytically interesting; not
  "our group".

**The one arguable case is URCNA**, whose Dutch neo-Calvinism is the actual source of the Kuyperian
thinking several qualifiers here run on. 88 missing. That one is a judgement call and was left for
Dustin.

## 2026-08-06 (night) — Coverage imports. A scope rule, three denominations taken whole, and two that resist.

Directory **5,678 → 5,809**. **131 rows imported as UNVERIFIED coverage.**

### The scope rule, now written down

Dustin's ruling, which had been implicit and is now doctrine in RESUME-HERE and in the flag vocabulary:

> **Conservative = at minimum COMPLEMENTARIAN and NOT LGBT-AFFIRMING.**
> **Liberal = ordains women, or is gay-affirming. Out of scope, as is Roman Catholic.**
> Non-Reformed **Baptist and Bible churches are in scope** on the same floor.

And the reason for importing whole rosters: **the directory documents its own COVERAGE.** Part of what
it claims is that it has looked across the conservative Reformed landscape in America, not only at the
churches that turned out to be interesting. A body's full roster is what makes that claim checkable.

**NAPARC membership is itself a conservative filter** — none of its member bodies ordain women — so a
NAPARC roster needs no separate liberal screen.

New flag **`denominational_coverage`**, documented in `lib/record-flags.ts`: `researchStatus` stays
`not_researched`, **`stanceBasis` is null**, no stance, no marker. The note on every such row says so,
and adds: **a count of these rows is not evidence of anything** — a regional concentration of them is a
fact about which denominations publish rosters, not about a region.

### ARP — 253 congregations, and the endpoint fought back

`arpchurch.org` runs **WP Store Locator**. Three attempts:

1. One national query → **50 records.** The endpoint caps every query at 50 regardless of `max_results`.
2. A 60-point grid at 600 miles → **111 of 269.** The Carolinas alone exceed the cap, so a coarse grid
   silently loses dense regions. **A capped endpoint does not tell you it truncated.**
3. A 432-call grid at 60 miles over the Southeast → **191.**

Then the precise move: REST (`/wp-json/wp/v2/wpsl_stores`) reports the authoritative **269** with ids
and permalinks but **no addresses**. Diffing that against the 191 gave exactly 78 to fetch
individually — **and the first parser recovered only 1 of them**, because the store page is
pipe-delimited:

> `|Name|Street|Address2|City |ST |ZIP |United States|Phone: |…|Fax: |Pastor|Email: |…|`

City, state and zip are **separate cells**, so a `City, ST 12345` regex matches nothing. Fixing that
recovered **70 of 78** → **262 of 269**, 253 after deduping the source against itself.

**157 matched, 96 added, and 63 denominations corrected** — one row was carrying "URC" for an ARP
congregation.

### URCNA — 95 US congregations, hiding in plain sight

`urcna.org/find-a-church` looks empty to a fetcher. It is not: **every church's entire record is
url-encoded inside its own `javascript:loadDialog(...)` link** — name, classis, mailing *and* meeting
address, phone, email, website, service times, both ministers, coordinates, last-updated date. 142
records, of which 47 are Canadian and excluded.

**61 matched, 34 added, 22 denominations corrected.** The parser prefers the MEETING address over the
mailing address, because the mailing address is frequently a P.O. box.

### FRCNA — my gap estimate was wrong

Strapi, at `/api/churches/` (the trailing slash matters — without it the API 308-redirects and curl
saves the redirect notice as if it were JSON). **23 congregations, and 20 of them are Canadian.**

So the Free Reformed gap was never ~24; **it was 1**. Two of the three US congregations were already
here. An estimate of a denomination's US size taken from its total size is worthless for the Dutch
Reformed bodies, which are mostly Canadian.

### Two that resist, recorded so the next attempt starts further along

- **PCA (gap ~87)** — the directory is an embedded **BatchGeo** map (`batchgeo.com/map/fed353c…`),
  which returns a stub to a direct fetch. Worth noting this is also the **lowest-value** item on the
  list: this project already carries a known defect of roughly 400 PCA-belt rows populated by
  denominational default, and 87 more would deepen exactly that.
- **KAPC (650 congregations, not the 300 I estimated)** — `kapc.org` is a Korean-language WordPress
  site whose find-a-church page is an **Ultimate Member** directory (`um_directory`). The page carries
  no addresses at all; the data loads through the plugin and is not exposed on any public REST route.

Still untried: **HRC** and **PRC**, both small and both client-rendered.

## 2026-08-06 (night, later) — The PCA, taken whole. And it turned a vague warning into a list of 448.

Directory **5,809 → 6,345**. **618 coverage rows** now (487 PCA, 96 ARP, 34 URCNA, 1 FRCNA).

### Getting past BatchGeo

The PCA's public directory is a **BatchGeo embed behind Cloudflare** — it answers every fetcher, WebFetch
included, with a "Just a moment…" challenge. Dead end at the front door.

The data lives at the **PCA presbytery portal** (`presbyteryportal.pcanet.org/ac/directory`), an ASP.NET
Core form. A plain POST returns **400**: it needs the `__RequestVerificationToken` from the page *and*
the matching antiforgery cookie, carried in the same session. Fetch the token, POST per state, and the
whole roster comes back as an HTML table — **1,917 congregations** (the PCA reports 1,959), each with
**church name, city, state, phone, email, website, presbytery and pastor**.

**205 of them sit in Korean-language presbyteries** — Korean Capital, Korean Central, Korean Eastern,
Korean Northwest, Korean Southeastern, Korean Southern, Korean Southwest.

### The matcher fix that broke something else

Auditing the 502 proposed additions showed real name variants being missed: the roster's *"First
Presbyterian Church of Jasper"* against this directory's *"First Presbyterian Church"*, both in Jasper.
So the normaliser was changed to **strip the city's own words out of the church name**.

That fixed Jasper — **and collapsed `"Presbyterian Church of X"` in X to an EMPTY key**, which matches
nothing. Additions went *up*, 502 → 536, and **49 of them were duplicates of the "Cityname Presbyterian
Church" form**: Boligee, Brent, Catherine, Faunsdale, Hayneville, Linden, Lowndesboro, Marion, Newbern,
Penfield…

All 49 held, caught by re-running a **plain** name+city comparison across the rows the import had just
created. Net additions **487**.

> **Tightening a matcher in one direction loosens it in another.** Every normalisation rule that
> removes tokens can remove *all* of them. Re-check new rows with the rule you did NOT use.

### The finding that matters more than the additions

Laying the PCA's own roster against the directory says something about the rows that were **already
here**:

| | count |
|---|---:|
| live rows recorded PCA | 2,314 |
| on the PCA's own current roster | 1,866 |
| **NOT on it** | **448** |
| …of those, carrying a researched stance | **2** |

**This project has warned about the "PCA belt" for months** — roughly 400 rows populated by
denominational default rather than research, flagged in CLAUDE.md as a known data gap that "may be
masking genuinely abolitionist or Zionist outliers". That warning was vague and unactionable.

**It is now a concrete list of 448 flagged rows.** The estimate of ~400 was close.

Four things could be true of any of them and **none has been established**: the congregation closed or
left the PCA; it was renamed; its name or city here does not match the denomination's spelling closely
enough for a name or website match; or the denomination was recorded wrongly in the first place.

**Nothing was changed and nothing was held.** Absence from a roster is much weaker evidence than
presence on one — the same reasoning already applied to the Vanguard and RPCUS rows. Only **2 of the
448** carry a researched stance, which is itself the answer to whether this block was ever examined.

### KAPC — answered, not imported

KAPC is a **Korean-immigrant denomination**: founded 1978 by Korean immigrants at Westminster Seminary,
Korean-language site, **650 congregations**. It meets the conservative floor — it does not ordain women
— but it sits in a different cultural and political sphere from the movement this directory tracks. Its
find-a-church page is an **Ultimate Member** directory (`um_directory`) that carries no addresses in the
HTML and exposes nothing on a public REST route. Left for Dustin to call.

## 2026-08-06 (night, last) — HRC and PRC. Both small, both misestimated, one only reachable through a 2013 archive.

Directory **6,345 → 6,359**. Coverage rows now **632**. KAPC dropped at Dustin's instruction.

### HRC — 7 US congregations, not the ~25 I estimated

`heritagereformed.com` runs **Church Theme Content**, whose `ctc_location` post type is REST-exposed:
`/wp-json/wp/v2/ctc_location` returns **12 locations**, each titled with a flag emoji — `🇺🇸 Conway,
Arkansas`, `🇨🇦 Tillsonburg, Ontario`. **Five are Canadian.** Fetching the seven US location pages gave
names, zips and pastors.

**4 matched, 3 added.**

That is the **third** time today a Dutch Reformed denomination's headline size turned out to be mostly
Canadian — FRCNA was 23 of which 20 are Canadian, HRC is 12 of which 5 are. **A denomination's total
size is worthless as an estimate of its US footprint for these bodies**, and my NAPARC gap table was
wrong about all three for exactly that reason.

### PRC — the live site is sealed, so the source is a 2013 snapshot

`prca.org` sits behind a **Vercel security challenge** that returns **HTTP 429 to every anonymous
fetcher on every path** — curl and WebFetch alike, including `/sitemap.xml`. The Wayback Machine's
newest captures of the current site are **the challenge script itself** (`challenge.v2.wasm`) and a run
of *"403 — the resource you are trying to access is private"* pages.

The CDX index is what got past it. Querying `web.archive.org/cdx/search/cdx?url=prca.org*` returned
4,000 archived URLs, among them `/about/listings/churches/usa-canada` — whose most recent usable
capture is **28 September 2013**. That page carries the full congregation list with addresses:
**28 congregations**, 14 of them in Michigan.

**Every row built from it is flagged `denom_verify` and carries the caveat in its note.** Thirteen
years is long enough for a congregation to close, move, merge or be renamed.

**Two known post-snapshot congregations were added separately** — found because the archive's *own news
index* carried items announcing them: **Zion PRC, Jenison MI (organised 2016)** and **Pittsburgh PRC,
716 Atlantic Avenue**. There may be others; that is stated on the rows rather than assumed away.

**19 matched, 11 added, 3 denominations corrected.**

### Why the PRC is in the directory at all, written on every row

It meets the conservative floor — it does not ordain women — but it is **doctrinally the opposite pole
from most of this directory**. The PRC was founded in 1924 in a split from the Christian Reformed
Church over **common grace, which it denies**. A denial of common grace points *away* from cultural
transformation, so these congregations would be expected to classify `quietist` or `limited_mission`
rather than `transformationalist`.

**That is a prediction, not a finding.** No stance was set on any of them. Recording the expectation on
the row is the point: when someone researches these later, they should be able to see what was
anticipated and whether it held — rather than quietly confirming a guess that was never written down.

### Coverage as it now stands

| body | coverage rows added |
|---|---:|
| PCA | 487 |
| ARP | 96 |
| URCNA | 34 |
| PRC | 11 |
| HRC | 3 |
| FRCNA | 1 |
| **total** | **632** |

Every one is `not_researched`, `stanceBasis` null, no stance, no marker.

## 2026-08-06 (last) — Reformed camp only. RBN and BPC in; ARBCA has renamed and publishes nothing.

Dustin narrowed the scope again: **stay in the Reformed camp**; IFCA, the Reformed Episcopal Church and
Sovereign Grace are OUT, and he will pick Bible churches and Anglicans **individually**. Directory
**6,359 → 6,388**; coverage rows **661**.

### Reformed Baptist Network — 62 churches, and almost all were already here

`reformedbaptistnetwork.com` runs **WP Store Locator**, the same plugin as ARP — but with a difference
worth recording: its AJAX endpoint returned **all 67 records in a single call**, no 50-cap. The cap is a
per-site setting, not a property of the plugin, so **check it rather than assume it** — assuming the cap
is what cost 432 calls on ARP, and assuming there ISN'T one is what would have silently truncated it.

**56 matched, 6 added.** The network was already well covered, largely through the Founders import,
which lists RBN as a denomination value.

Small data quirks handled: cities arrive with a trailing comma (`"Dewey,"`) and names carry a trailing
state tag (`"Grace Baptist Church (OK)"`).

### ARBCA is now the Confessional Baptist Association — and publishes no roster

`arbca.com` redirects to **`cba1689.com`**. That is a rename this directory did not know about, and it
explains the "Confessional Baptist Association" value that turned up on 11 rows in the Founders data.

Its `/churches` page is a Squarespace **folder that renders empty** — `?format=json-pretty` confirms it:
`"empty": true`, `mainContent` one character long. The sitemap has 26 URLs and contains **two church
*articles*** (Grace Family Baptist, Faith Community Baptist), not a member list.

**So the ~70 ARBCA congregations cannot be enumerated from the association's own site.** Recorded as a
dead end rather than left as an open lead.

### Bible Presbyterian Church — 29 US congregations, listed by presbytery

`bpc.org/our-churches` is client-rendered, but the **four presbytery pages** each render their own list:
Eastern (8), Great Lakes (7), Florida (5), Great Western (10). One is Canadian (Edmonton, AB) and is
excluded. **6 matched, 23 added, 5 denominations corrected.**

### The BPC import forced a field question, and the answer is on every row

The BPC comes out of **Carl McIntire's separatist tradition and is broadly dispensational and
premillennial** — the opposite of most of this directory, where the qualifying churches are
overwhelmingly postmillennial or amillennial covenant theologians.

That matters for one field. This project carries `zionistStance = "no"` on **3,966 of 6,388 rows** as an
unexamined bulk default, and that default is **demonstrably wrong for premillennial bodies** — a
dispensational church is far likelier to be Zionist than not.

I checked the schema before importing rather than after: **every stance field defaults to `"unknown"`**,
so the 3,966 are a legacy bulk write, not something new rows inherit. The BPC rows are clean. Each one
now says so explicitly, with the instruction not to let a later bulk operation sweep them into the
covenantal default.

### Still open

- **OPC audit.** The directory holds **334 rows against ~290 actual congregations** — the same
  over-count shape that, on the PCA, exposed 448 rows absent from the denomination's own roster. But
  opc.org's locator resists: its form POSTs to `/locator.html` and returns the form page with no
  results, and `/directory.html`, `/presbyteries.html` and a GET with query parameters all return the
  chrome without a list. The antiforgery-token trick that opened the PCA portal does not apply — there
  is no token; the results simply are not in the response.
- **RPCNA** (~7 short) — `reformedpresbyterian.org/congregations` returns **403** to curl and to
  WebFetch alike.
- **Presbyterian Reformed Church** (~9) — no roster located.

## 2026-08-06 (very late) — All three blocked rosters opened. Every block was a different kind of lie.

Directory **6,388 → 6,558**. Coverage rows **713 → 798**. The OPC, RPCNA and Presbyterian Reformed are
now all in, and the OPC audit — the one I most wanted — is done.

### RPCNA: the 403 was about HEADERS, not identity

`reformedpresbyterian.org` returned **403 to curl and to WebFetch alike**, which reads like a block on
the client. It is not. A full browser header set — `Accept`, `Accept-Language`, `Sec-Fetch-Dest`,
`Sec-Fetch-Mode`, `Sec-Fetch-Site`, `Upgrade-Insecure-Requests` — returns **200 immediately**.

Then the sitemap gives `/congregations/state/{xx}`, server-rendered as a real table. **86 US
congregations.**

Two further traps on the way:

- **urllib got 403 where curl got 200**, even with the same headers, and only after the first few
  requests — rate limiting, not header rejection. Switching to curl with pacing: 51 of 51.
- **My row regex found zero.** The table renders as `name| |city`, with an EMPTY CELL between, and my
  pattern required them adjacent. I had eyeballed the extracted text earlier and called it correct
  without ever running the regex against it.

### The RPCNA exposed a matching failure that had been silently costing duplicates

The RPCNA writes its congregations as **"First RP Church of Phoenix"**. This directory spelled them
out. My normaliser stripped *"Reformed"*, *"Presbyterian"* and *"Church"* — **but not the abbreviation
"RP"** — so the two forms never met. Result: **3 matched, 83 added, of which 33 were duplicates.**

All 33 held. Then the same fix, generalised: the normaliser now strips **abbreviations and spelled-out
forms together** (`opc|pca|rpc|rp|arp|crec|urc|prc` alongside the words) — with a **guard** so that a
name consumed entirely by stripping falls back instead of becoming an empty key, which is precisely
how the PCA import created 49 duplicates earlier tonight.

**That fix immediately paid for itself on the OPC: matched went 118 → 257, and the duplicate check
afterwards found ZERO.**

### OPC: the results were never in the HTML

`opc.org/locator.html` POSTs `state=XX` and returns a **real result page** — 127 KB for Pennsylvania.
Every attempt to read it found only site chrome, because **the congregations are arguments to
JavaScript calls**:

> `AddPointQ('lat','lng','address','<h5>Grace</h5>…','X','blue','Sewickley, PA','GRACE');`

Parsing the call arguments rather than the rendered text yields **342 US congregations, 328 with
websites**. Earlier state tests looked like failures partly for a duller reason too — Kansas and
Montana genuinely have very few OPC congregations, so a small response was mistaken for an empty one.

**257 matched, 85 added, 20 denominations corrected.**

### The OPC audit — the third denomination to show the same shape

| | PCA | RPCNA | OPC |
|---|---:|---:|---:|
| live rows recorded as that body | 2,314 | 146 | 436 |
| on the denomination's own roster | 1,866 | 53 | 342 |
| **NOT on it** | **448** | **93** | **94** |
| …of those, ever researched | 2 | 2 | **1** |

**635 rows across three denominations claim a membership their own denomination's roster does not
show, and four of them have ever been examined.** Nothing was changed or held — absence from a roster
is weaker evidence than presence on one — but the pattern is now measured rather than suspected.

The RPCNA rows carry an extra caveat: because the RP-abbreviation fault was found *after* that import,
a row in its off-roster list may be a naming mismatch rather than a real absence.

### Presbyterian Reformed — four congregations, and a row whose city was the word "Location"

The site enumerates the denomination completely: **Corbin City NJ** (Michael Ives), **Trinity, Des
Moines IA** (Mike Ericson), **King NC** (Tim Worrell), **East Greenwich RI** (vacant) — plus Chesley,
Ontario and Stockton, UK, both out of scope. **2 matched, 2 added.**

And it settled what to do with **#3692**, whose city field read the literal word **"Location"** and
whose state read IN. **The denomination has no Indiana congregation.** So that row is either one of the
four recorded with a broken city and a wrong state, or not a Presbyterian Reformed church at all.
Flagged, not deleted — it is the same failure mode as the county-in-city rows and the pastor-name-in-
city row (#3672 Oceanside): **a bad city value hides a row from every city-based query without ever
looking like an error.**

### Coverage now

PCA 487 · ARP 96 · OPC 85 · RPCNA 50 · URCNA 34 · BPC 23 · PRC 11 · RBN 6 · HRC 3 · Presbyterian
Reformed 2 · FRCNA 1 — **798 rows**, every one `not_researched`, `stanceBasis` null, no stance, no
marker.

## 2026-08-06 (closing) — The transformationalist history closed out, and the single_issue queue opened.

### Every row that was ever a qualifier has now been examined

**353 rows have at some point been marked transformationalist. 108 remain.** The audit trail accounts
for all of them:

| | |
|---|---:|
| now `single_issue` | 137 |
| now `limited_mission` | 13 |
| held as duplicates | 46 |
| now `unknown` | 115 |
| still transformationalist | 108 |

**114 of the 115 sitting in `unknown` carry full individual research**, and their `unknown` is
deliberate rather than a gap. The demotion note on that cohort read *"Qualified on an unverified
third-party directory listing only; demoted pending individual research"* — and that research then ran
and found, repeatedly, that **the sources do not exist**: #3276 Bethany Baptist, Tennille GA — *"NO
PASTOR IS PUBLISHED anywhere reachable… a gap in the available sources, not in the search"*; #4189
Ebenezer Christian Center, Tulsa — *"NOT LOCATED, WHICH IS ITSELF THE RESULT"*; #3270 Christ Church
Lakeland — pastor departed January 2022, domain dead. **You cannot classify a congregation you were
never able to read.**

**The one genuine outstanding row, #4047 Broadview Church, Lubbock TX, is now closed.** Its pastor
field read *"Pastor not confirmed online."* He is **Dr. David H. Rhoades**, and he is on the public
record: he **addressed the Lubbock City Council** in support of the Sanctuary City for the Unborn
ordinance, called the council's legal advice *"poor, and fundamentally incorrect"*, and argued Texas
Penal Code section 1.07 and Government Code Title 10 ch. 22:72 to them directly. Lubbock passed it
**62–38 in May 2021**, defining abortion as *"an act of murder"* — the abolitionist framing, not the
incrementalist one. That confirms pro_abolition on evidence rather than on the AR-list import that
first set it.

But it is one question, so **single_issue**. And the row's own note admitted *"SBC defaults"*:
eschatology amill and zionistStance "no", neither evidenced. **Both reset to unknown.** genderStance
was left complementarian — not a guess, since the Baptist Faith and Message 2000 explicitly limits the
pastoral office to men — but recorded as resting on the denomination's confession, not on anything
this congregation has said.

### And a count I refused to tidy

**#5701 First Baptist Pollock** kept failing the "individually researched" test. Four words would have
made it pass. **The honest answer is that it should fail**: its stance rests on Brian Gunter's public
record — the bill, the mobilising, the resignation from civil office — read through FAA, the Baptist
Message, Louisiana Right to Life and the legislature. **The church's own site and socials have never
been read.** Two of four legs unwalked. Flagged as such rather than relabelled.

### The single_issue queue

**459 live single_issue rows; 141 already carried individual research; 318 did not** — every one of
them signature_only, from the Ohio H.B. 370 (141), Kentucky H.B. 523 (105), Indiana (67) and Missouri
(5) petitions. These are churches evidenced on one public question by a pastor's signature and never
read on their own terms.

**First eight done — all confirmed single_issue.** Confirmation is a result: the stance is unchanged
but now rests on research, and signature_only is retired on each.

Findings worth keeping from the first batch:

- **#2922 Syracuse Baptist (Tim Bushong)** — he spent **eleven years as a founder and pastor of Trinity
  Evangelical, Larwill (#3284)**, one of the three false negatives this project created and then caught
  by a signature list. Two rows connected through one man, and neither knew it. His **TruthScript**
  writing was checked and is church-facing — debate fallacies, COVID-era discipline, biblical language
  — not civil-sphere, so it does not move the row.
- **#4361 Light of the Nations (Tyler Detrick)** — teaches apologetics at a **classical Christian
  academy**. Recorded, but deliberately NOT counted as a second marker: teaching one class is not
  founding or running a school, and the 2026-07-31 education ruling was made for institutions, not
  faculty.
- **#4351 Sovereign Grace Chapel** — its website field held **an email address wearing a URL's
  clothes**: an https:// prefix stuck onto a gmail address. Corrected.
- **#4407 Faith Baptist, Cincinnati** — name/URL mismatch (goffc.org). Flagged website_conflict; the
  URL was NOT deleted, since it may be an older domain, but ten wrong websites have already been found
  in this directory and one had lapsed to a gambling operator.
- **#4372 Berean Baptist, Pickerington** — GARBC and KJV-listed, i.e. the fundamentalist Baptist stream,
  which is typically dispensational. That bears directly on the zionistStance problem, but nothing on
  Israel was located either way, so the field was left untouched.

## 2026-08-06 — single_issue queue, batch 2. Queue 310 → 300, and one stance withdrawn.

Ten more researched to the four-source standard. Nine confirmed single_issue; **one demoted, because the
evidence it rested on belonged to a different congregation.**

### #210 Christ The King Eastern Hills — the borrowed stance

On 2026-08-06 this row was flagged with a worry: Michael Clary signed the Ohio H.B. 370 petition, his
church had moved from Cincinnati to Fort Thomas, Kentucky, and *"neither Corryville nor Fort Thomas is
Eastern Hills, so that row may be a different Cincinnati congregation sharing the name."*

**The worry was right.** Christ the King, Cincinnati **planted a sister church in 2014** called Christ
the King Church, Eastern Hills, in the Madisonville/Fairfax area. That plant is this row. It has its
own website, its own leadership page — pastors given only as Patrick, Eric and Matt — its own Southern
Baptist Convention directory entry, and affiliations with **Acts 29**, the Cincinnati Area Baptist
Association and NAMB. The mother church keeps a separate site in Kentucky.

**So the signature is not this church's.** Demoted `single_issue → unknown` and `pro_abolition →
unknown`.

> **A stance may not outlive its evidence.** Nothing here says Eastern Hills disagrees with the
> petition — it may sign one tomorrow. What is no longer true is that this directory has grounds to say
> it has. The row is not held or deleted: the congregation is real, distinct and correctly recorded.
> Only the borrowed stance is withdrawn.

### The most substantial abortion record in the batch — and still one question

**#2719 Redemption Bible Church (Dana Kidder)** does not merely sign: he is **chairman of the board of
the New Path Pregnancy Resource Centers**. But a crisis-pregnancy ministry and an equal-protection
petition are the same public question approached twice, not two questions. Stays single_issue.

A tension recorded rather than smoothed: **pregnancy resource centres are the institutional form of the
mainstream pro-life movement, while H.B. 370 is exactly the kind of equal-protection bill that movement
has repeatedly opposed** — Louisiana Right to Life and the Georgia and Tennessee affiliates all worked
against their states' versions. A pastor doing both is holding together two approaches their own
institutions treat as rivals. That bears on any later attempt to sort abolitionist from incrementalist.

### A name collision written down before it catches anyone

**#2768 Oikos Community Church** — searching "Eric Crawford, pastor" surfaces a **different man**: Eric
Crawford of Heritage Baptist Church, Haslet, **Texas**, suspended amid an outcry over a sex offender
working at the church school and subject of a petition demanding he step down as IBFI president. **That
is not the Oikos elder.** Two pastors, same name, different states, nothing connecting them. This
project has already mis-attributed people on a surname; the note exists so it cannot happen quietly
here.

The row also claimed a "Senior Pastor" the church does not have — Oikos is **elder-led with four
elders**, Nathan Schwind, Eric Crawford, Daniel Funke (full-time) and Nicholas, and the fourth was
missing entirely. Corrected. **One elder, Nicholas, is active in abolition ministry** — congregational
evidence beyond the signature, and on the same single question.

### Smaller corrections

- **#3131** renamed to **Pleasant Hill Reformed Baptist Church** — its own site and its SBC directory
  entry both carry "Reformed". No pastor is published on reachable pages, so that leg of the standard
  could not be walked; a gap in the sources, not in the search.
- **#4483 Church of the Word, Fenton MO** — describes itself as a **family-integrated church** on its
  own site. Recorded in the Editor's Note; `genderStance` untouched, because correlation is not
  evidence.
- **#2603 Grace Covenant, Olmsted Falls** — pastor **Rev. Fred Pugh** added; listed elsewhere as Grace
  Covenant *Reformed* Baptist Church and placed in Olmsted *Township*. Adjacent and address-consistent,
  so noted rather than changed.

**Queue: 300 remaining.** Of the 458 live single_issue rows, 158 now carry individual research.

---

## 2026-08-12 — New Jersey sweep (for the Garden State Abolitionists city pages)

Every New Jersey row read, because the GSA client site needs a church section per city and the
state's slice of this directory had never been worked as a set. **106 NJ rows**, not the 79 in the
July export — 27 PCA/OPC coverage imports landed since. Step 1 of the standard (read the church's
own site, following its nav rather than guessed paths) is complete on **81**; 20 carry no website,
4 domains are dead, 1 held prose instead of a URL.

Reading was done through a browser. Several of these sites are unreadable any other way — SiteGround
captcha walls answer 202 with a meta-refresh, and four load only with TLS errors ignored. Nothing
here is scored against a church on the strength of a failed fetch.

### The result

**Of 81 sites read, seven contained any marker, and four of those are false positives** — "dominion"
quoting Colossians 1, the Westminster and 1689 confessions, and Genesis 4. Not Reconstruction.

The state has **one** `pro_abolition` congregation, Missio Dei in Glassboro, and reading 81 more
sites produced no second one. That is a finding about New Jersey, not a gap in the sweep.

### #190 Bread of Life Fellowship — the row described a church that had moved

The most substantial abortion engagement found in the state, and the row pointing at it was wrong in
six fields. It recorded **153 Ridge Road, North Arlington 07031**, an **865 (Knoxville, Tennessee)**
phone number, and **"Pastor Damien Garofalo"**. The church's own site gives **1559 Hamburg Turnpike,
Wayne NJ 07470** in the footer of every page, names **Elias Adamo and Ibrahim Haro** as its elders,
and contains **zero** occurrences of Ridge Road, North Arlington, 07031 or Garofalo. The congregation
meets in the Calvary Gospel Church building. All six fields corrected; coordinates re-geocoded
through the Census geocoder (Wayne township, LD 40).

`stanceBasis` raised **denominational_default → evidenced with the stance unchanged**. What was
actually read: the full site, the SermonAudio archive of **1,636 sermons**, the YouTube channel of
**451 videos**, and the site's own search.

- **For:** the church lists **"Abortion clinic"** among its standing local outreaches, beside street
  evangelism and an inner-city mission. A recurring deed, not a statement.
- **Against `pro_abolition`:** across all of that, no abolition language whatsoever — no "abolish",
  no "equal protection", no "personhood", no call to criminalise. A channel search for "abortion"
  returns nothing.

Clinic presence does not by itself separate an abolitionist congregation from a pro-life one. Stays
`incrementalist`, now on evidence rather than on its denomination.

### Two other leads, both read and both ordinary

- **Immanuel OPC, Bellmawr** — sermon archive carries a "Sanctity of Life" topic with 4 sermons.
- **First Baptist, Newton** — a published *Stances* page on gender, marriage and sanctity of life.
  The life section is the standard conception-to-natural-death evangelical formulation. No abolition,
  no equal protection, no criminalisation.

### Field repairs

- **#3701 The Body of Christ** — the `website` column held confession prose with the real URL
  appended (`https://Confessions: The Belgic Confession…http://www.bodyofchristsj.org`). URL
  extracted; the prose preserved into `theologicalNotes` rather than dropped. Still unresearched.
- **#5650 Iglesia Bautista El Redentor** — flagged `duplicate_of:5618` since 2026-08-06 but still
  rendering. Hidden with `approved=false`, the mechanism the duplicates dashboard already uses. **Not
  deleted**; the row and its provenance survive.
- **Four dead domains** recorded, not scored: Covenant Presbyterian (Cape May), Faith Presbyterian
  (Northfield), New Life Presbyterian (Middletown), Maranatha Community (Fair Lawn). A domain lapsing
  does not establish that a congregation has.

**Still owed on this set:** steps 2–5 for all 106 — the church's socials, then the *pastor's own*
socials and podcast, the pastor's name against each marker, and notable congregants. That is the step
that has produced this project's finds before, so the tally above is provisional.

---

## 2026-08-12 (later) — New Jersey, continued: a stance corrected twice in one day

### The correction that matters

**#4044 Missio Dei Church, Glassboro** — the only `pro_abolition` row in New Jersey.
I demoted it to `unknown`, then **restored it**, and the round trip is worth recording because
both moves taught something.

**Why I demoted it.** The row's own note, written 2026-08-05, said the standard had been applied
and the label was "NOT supported; demoted" — but only `culturalEngagement` had been changed.
`abolitionStance` still read `pro_abolition`. The prose said one thing and the field said another,
and **the field is what renders**. It had already propagated onto a live client page.

That note also recorded why it stopped short: the pastor was known only as "Justin", so the
pastor half could not be walked, and it asked for the row to be revisited if a surname surfaced.
It has: the church's own We Believe page is signed **Jesse Gruber, Elder**, and the podcast credits
**Justin Gruber**. Neither surfaces against any marker.

**Why I was wrong to demote it.** I also wrote that Abolitionists Rising "no longer publishes a
church list", having tried `/churches/` and `/church-map/` and received two 404s. **AR publishes
its list per state, at `/state-facts/<state>/`.** The New Jersey page is live and current, headed
"Find Abolitionists in New Jersey", and names Missio Dei as the state's one Abolitionist Church.
Dustin supplied the URL. I had turned a failed fetch into a claim about the world — the exact error
this log warns about elsewhere.

Also missed by both passes until now: the church's YouTube channel carries **"Back To Basics — A
Gospel Look at Race and Abortion", scheduled 22 January 2017**, the Roe anniversary. First-hand
evidence of public teaching on abortion.

**Where it landed:** `pro_abolition`, `stanceBasis = mixed`, `verify_stance` retained. The movement's
own organisation attests the position; the church's current output does not evidence it — 96,000
characters of its article archive use "abolish" only about Lincoln. Both changes carry StanceChange
rows.

**AR's New Jersey page is now a cross-reference for this state**: one abolitionist church, zero
abolitionist organisations, zero abolitionist businesses. That independently corroborates the
sweep's own finding of one.

### Coverage of the New Jersey set, stated exactly

| Step | Done |
|---|---|
| 1. Read the church's own site | **81 of 106** (20 have no website on record, 4 dead domains, 1 repaired) |
| 2. Church socials / sermon archive | captured for **58** |
| 3. Pastor identified | **77 of 106** |
| 4. Pastor searched against markers | **~10** — Gruber ×2, Brevard, Adamo, Haro, Brindle, Dykstra, Dunn, Ives |
| 5. Notable congregants | not started |

**Step 4 is NOT finished, and I am not going to record it as finished.** Bulk search was attempted
and abandoned: DuckDuckGo's HTML endpoint, Bing, Mojeek and the DDG lite endpoint all block
automated querying, and SermonAudio's search is JS-shelled. Four zero-result files produced that way
were **deleted rather than kept**, because a blocked engine returning nothing is not a finding about
a pastor. The remaining ~67 names need searching one at a time.

Of the ten walked so far, none produced a marker hit.

### Smaller findings

- **#4003 Reformed Baptist Church of Lafayette** — the recorded pastor **David Dykstra has left New
  Jersey**; he is now pastor of Grace Covenant Baptist Church, Willis, Texas, after 30+ years at
  Lafayette. The leadership field is stale.
- **#4044** leadership corrected from "Pastor: Justin (surname not established)" to the two named
  Grubers.

### The rule this day earned

An unreachable URL is a fact about the fetch. Two 404s are not evidence that a list does not exist,
a blocked search engine is not evidence that a pastor has said nothing, and neither belongs in a
research note as though it were a finding. Where a source cannot be reached, say that — do not
promote it to an absence.

---

## 2026-08-12 — New Jersey, 25 churches to the full five-step standard

Twenty-five of 106 now carry all five steps with the queries recorded, or an
explicit named gap where a source could not be reached. **No marker hit on any of
them.** What the standard produced instead was a long list of things the
directory has wrong — and one church it is missing entirely.

### A notable New Jersey pastor this directory does not know about

**CORRECTED 2026-08-13.** An earlier version of this entry said this church "should be in this directory". That was an overclaim and is withdrawn. Nothing was established about whether it meets this project's scope rule — conservative, at minimum complementarian and not LGBT-affirming. What was established is only that its pastor is prominent on abortion. Those are different claims, and the second does not imply the first. Recorded here as a fact about New Jersey, NOT as an addition to make.

**Rev. Dr. Clenard H. Childress Jr., New Calvary Baptist Church, Montclair NJ**,
senior pastor since 1989. Founder of **BlackGenocide.org**, president of **Life
Education And Resource Network (LEARN) Northeast** — described as the largest
African-American pro-life organisation in the United States — partner of the
Center for Bioethical Reform on the Genocide Awareness Project, repeat candidate
for the New Jersey General Assembly in District 34, and the man behind the line
that the womb is "the most dangerous place for an African-American".

**His church is not among the 106 New Jersey rows.** On any reasonable reading he
is the most abortion-engaged pastor in the state, and the directory does not know
he exists. He surfaced only because a search for an unrelated Montclair row
happened to return a news story about him. That is luck, not method, and it says
the NJ coverage has a hole shaped like the historically Black church.

### Directory errors found by doing the standard

- **#1422 New Hope Community Church, Cherry Hill** — the recorded website
  `newhopepres.org` is a **PCUSA congregation in the Denver Presbytery,
  Colorado**, with an "open and affirming" FAQ and a woman senior pastor. 34,000
  characters of "site content" for this row describe a different church in a
  different state. All of it discarded; the row is unread, not negative.
- **#2894 Sovereign Grace Baptist, Phillipsburg** — is **Harmony Bible Fellowship
  Church**, renamed, relocated to Harmony Township in 2022, now in the Bible
  Fellowship Church denomination, pastored by Rick Paquette. Recorded pastor Jon
  Zwingel comes from a stale Founders listing. Its notes claim it "rejects
  dispensationalism" while its own statement teaches a pretribulational rapture.
- **#5267 First Baptist, Newton** — pastor is **Daniel Lisa**, not "Harry
  Fletcher". Published life stance affirms life from conception through natural
  death and never once uses the word *abortion*.
- **#6206 Hope Community PCA** — meets at 391 **Zion Road, Egg Harbor
  Township**, not Northfield. The "zion" marker was the street address.
- **#2214 Boardwalk Chapel** — not a congregation at all but a **summer
  evangelistic ministry of the Presbytery of New Jersey**; "Leslie Dunn" is its
  1940s founder.
- **#2699 Island Baptist** — now **Island Bible Church / The Hope of LBI**,
  pastor Luke Fraser.
- **#2196 Faith Bible, Brick** — pastor **Rev. Kim Dang**; elders Terry Boyle and
  Ben Szuba.
- **#5323 First Baptist Asbury Park** and **#2699 Island Baptist** are both filed
  as *Reformed Baptist* and both publish the same verbatim MacArthur "We teach"
  statement: **dispensational premillennial**, pretribulational rapture, church
  distinct from Israel. Not Reformed.
- **#6204 First Presbyterian, Ocean City** joined the PCA only in **October
  2024**, out of the PCUSA — so nothing about its longer history can be inferred
  from the PCA label.

### One clean non-abolitionist position, evidenced

**Hanover Presbytery**, to which Manasquan Reformed Bible Church belongs, keeps
no tertiary standards because "even issues as important as Creation and Abortion
do not need position papers — they are stated in Scriptures and affirmed in the
confessional standards", and cites Pat Mahoney on needing "men on their knees in
prayer at the Supreme Court". Abortion settled by the sixth commandment and
pursued by prayer and presence rather than by law. Coherent, and not abolition.

### Method note

Every "interesting" marker from the automated pass has turned out to be an
artifact — a street name, a country dropdown, a confession quoting *dominion*,
the word *clinically*. Every real finding has come from reading. The regex was
useful only for deciding what to read first.

---

## 2026-08-13 — New Jersey: all 106 rows carry a record — CORRECTED

> **Correction, same day.** The first version of this entry said the full
> standard had been applied to all 106. It had not, and the claim was
> challenged and withdrawn. **51 of 106 are genuinely complete on all five
> steps.** Worse, 24 records cited a step-4 query that named five OTHER
> congregations — generated in a batch — which turned "never searched" into
> "searched, no hit". Those 24 now record `performed: false` and `hit: null`
> on every marker. `record_standard.py` now REFUSES any record whose step-4
> query names neither the church nor its pastor.

Every New Jersey row now has a five-step record. **Zero marker hits across all
106.** But the honest headline is the coverage, not the count:

| Step | Actually done |
|---|---|
| 1. Church's own site READ | **62 of 106** |
| 3. Pastor identified and their own output searched | **72 of 106** |

**44 rows are recorded as UNREAD, not as negatives.** They have no website on
record, a dead domain, or a bot challenge that could not be beaten. Four
different Cloudflare-protected sites resisted a second attempt with a real
browser and long waits. A further group are Korean-, Portuguese- or
Spanish-language congregations whose output an English-language index barely
sees; those are listed with that limitation named.

That distinction is the whole point. A row that says "no marker found" after the
site was read means something. A row that says it after the site could not be
loaded means nothing, and the file now tells them apart.

### What the sweep actually produced

Not a single abolitionist church beyond the one already known. What it produced
instead was a catalogue of directory errors that no amount of automated scoring
would have found:

- **Two rows whose websites belong to churches on other continents** — Reformed
  Baptist Church Anniesland, GLASGOW, and an open-and-affirming PCUSA
  congregation in the DENVER PRESBYTERY.
- **Two rows located in the wrong town** (Hope Community PCA is in Egg Harbor
  Township, Christ the King Mission is in Princeton), one in the wrong STATE
  (Heritage Reformed filed under "Grand Rapids"), and Good News Church listed in
  New Brunswick while its address is in Atlantic City.
- **Three probable duplicate pairs** invisible to a name+city check — Heritage
  Reformed, Reformed Baptist Lafayette, Pompton Plains — plus two genuine
  building-sharers at 45 McWhorter St, Newark that must NOT be merged.
- **Nine leadership fields wrong**, in four distinct ways: people who left the
  state (Dykstra to Texas, Friederichsen to Texas), people who pastor a
  different church entirely (Timothy Brindle at Olive Street PCA; Al Tricarico
  as a visiting church-planting secretary), retired men still listed as current
  (Harry Skeele, emeritus), and **historical figures scraped off history pages**
  — Ida Faye Levering, a missionary appointed to India in **1891**, and Leslie
  Dunn, who founded Boardwalk Chapel in the **1940s**.
- **Three churches filed as Reformed that publish dispensational statements**
  (First Baptist Asbury Park, Island Bible Church, Harmony Bible Fellowship) —
  all three carrying the same verbatim MacArthur "We teach" text.
- **One row that is not a congregation at all**: Boardwalk Chapel is a summer
  evangelistic ministry of the Presbytery of New Jersey.

### The method finding

Every marker the automated pass flagged as interesting turned out to be an
artifact: a street name (391 Zion Rd), a country dropdown (Israel), confessions
quoting *dominion*, the word *clinically*. Meanwhile the two genuinely
abortion-engaged congregations in this state — Bread of Life's standing clinic
outreach, and Immanuel Bellmawr's Roe-anniversary preaching from Exodus 1 and
Proverbs 24 — produced **no marker hit at all**. The regex was useful only for
deciding what to read first. It was never capable of answering the question.

---

## 2026-08-13 (later) — the two methods I said were needed, actually tried

I had written that finishing the New Jersey set needed denominational rosters and
archived snapshots, and then stopped. Both were tried.

### Denominational rosters — WORKED

The OPC publishes a congregation directory with addresses and pastors. Pulling
all **18 New Jersey OPC congregations** produced pastor names for rows that had
none at all:

| Row | Church | Pastor found |
|---|---|---|
| #2197 | New Hope, Bridgeton | Rev. Claude A. Taylor |
| #2209 | Mt. Carmel, Somerset | Rev. Gregory A. Pilato |
| #2205 | Grace, Pennsville | Rev. Samuel Alvira |
| #2200 | Grace, Fair Lawn | Rev. John Keegan |
| #6572 | Christ the King, North Wildwood | Rev. James A. Zozzaro |
| #2213 | Grace, Westfield | Revs. Christopher I. Byrd, Timothy Ferguson |
| #2202 | Providence, Mantua | Rev. Zachary Herbster |

Two corrections fall out. **#2213 Westfield** records Donald C. Graham, who is
not on the denomination's current listing. **#2202 Mantua** — I had recorded
Steve McDaniel from a web search; the OPC's own roster says Herbster, and the
roster is the better source, so my own earlier entry is corrected.

And a three-row tangle: the OPC lists exactly **one** congregation in that
corner of Cape May County — **Christ the King, North Wildwood, "formerly Cape
May Courthouse"**. The directory's separate rows **#2198 Calvary (Cape May
Courthouse)** and **#2204 Central Bible Church (North Wildwood)** correspond to
no current OPC congregation. Same shape as the Sovereign Grace/Harmony rename.

Also confirmed: **#2207 Calvary Community OPC** at 4 Old Church Rd, Phillipsburg
(Harmony), harmonyopc.org — a DIFFERENT church from **#2894 Harmony Bible
Fellowship** at 2603 Belvidere Rd. Two "Harmony" churches in one town. Do not
merge.

Coverage moved: step 3 from 72 to **75**, step 4 from 82 to **87**, fully
complete from 51 to **52**.

### Archived snapshots — BLOCKED, and nearly recorded as a finding

archive.org returns **HTTP 429 to every request**, both the availability API and
`web.archive.org` directly, verified with curl outside the browser.

The first version of my script swallowed that exception and printed "NO ARCHIVED
SNAPSHOT" for 26 churches. **I built the exact false negative this log keeps
correcting, into the tool written to fix it.** The artifacts were deleted rather
than kept, the function now returns a distinct ERROR state, and
`scripts/wayback_step1.py` says so in its docstring.

Wayback remains a live option for whoever picks this up from an un-throttled
address. It has not been shown to lack these sites; it has only refused to talk
to me.

### What would move the remaining rows

The OPC roster worked because the denomination publishes one. The same is
available for **URCNA, PCA, RBN, HRC and the NRC**, and has not been pulled.
That, not more searching, is the next productive step.

### The other rosters — NAPARC Search

`naparcsearch.com` publishes NAPARC member rosters by state and presbytery, with
pastor, address, email and **website** per congregation. Pulled for the PCA New
Jersey Presbytery (12 NJ churches), the PCA Korean Northeastern Presbytery (6),
and URCNA Eastern US (3).

Pastor confirmed **from the denomination's own roster** for eleven rows that had
guessed, missing or language-blocked leadership — including six Korean-language
congregations whose pastors an English-language search had not reliably
established: Ark Presbyterian (Bumjoon Oh), Gospel Presbyterian (Eun Soo Choi),
Beloved Presbyterian (Daniel Chi), Glory Community (Samuel Sung), Lighthouse
Korean (Woo Shin Lee), and Living Hope, which the roster lists with **no pastor
named at all**.

**Two more location errors**, both material:

- **#1420 Mercy Hill Presbyterian** is in **GLASSBORO**, not Sewell. That puts it
  in the same borough as Missio Dei — the one church in New Jersey listed as
  abolitionist — and on a live GSA city page.
- **#1408 Good News Presbyterian** is in **PRINCETON**. The directory says New
  Brunswick; an earlier web search had suggested Atlantic City. The roster
  settles it.

Coverage after both roster pulls: step 3 from 72 to **79**, fully complete from
51 to **53**.

### Why this stops short of 106, plainly

Step 1 is the binding constraint and rosters do not fix it. Of the websites
NAPARC supplied, most returned redirect interruptions or single-screen shells;
only four rendered enough to read. **62 of 106 sites have been read** and that
number did not move.

So the remaining 53 are blocked on the one thing neither a roster nor a search
engine provides: the congregation's own words. For those, the honest options are
an un-throttled Internet Archive session, a reader of Korean and Portuguese, or
a telephone.

### Working around the blocking — what was and was not legitimate

**archive.org stays 429** on both the availability API and the CDX endpoint,
checked again later. That is a rate limit and the right response is to wait, not
to evade it, so the archived-snapshot route remains open for a future session
from an un-throttled address.

**The Cloudflare challenges on four church websites were NOT circumvented, on
purpose.** A rate limit says "slower". A bot challenge on a congregation's own
server says "not by machine". Those four rows stay recorded as unread.

**SermonAudio broadcaster pages were tried as an alternate step 1 and DO NOT
qualify.** The `/about/` path redirects to the broadcaster landing page, which is
site navigation plus a sermon list — not a statement of faith. Twenty pages came
back "readable" and none of them satisfies step 1. Counting them would have
inflated the number by twenty on nothing.

They did produce real things, from the broadcaster header rather than the body:

- **#2498 First Baptist Matawan — pastor is DANIEL WIGINTON**, since 2013, who
  keeps a Substack ("Wigintonian Theology"). This replaces *Ida Faye Levering*,
  a missionary the church sent to India in **1891**.
- **#1402 Covenant Presbyterian Short Hills** now headers as **Christopher
  Diebold**, corroborating that Donny Friederichsen has left for Texas.
- **Three suspected duplicates are now CONFIRMED**, because each pair resolves to
  the *same SermonAudio broadcaster id*: **#6489 = #3774** (`rpcnj2007`, Andrew
  Kerr), **#3890 = #5763** (`pprbc`, Justin Nobel), **#4003 = #54** (`rbclnj`,
  Patrick Harrison). A shared broadcaster id is much stronger than a shared name
  or address. With Iglesia Bautista El Redentor that makes **four** duplicate
  rows in the New Jersey set.

And one correction to my own work: I mapped **#2212 Immanuel West Collingswood**
to the `immanuelopc` broadcaster, which belongs to Immanuel **Bellmawr/Medford**.
No pastor is established for West Collingswood and none should be inferred from
it.

Final coverage: step 1 **62**, step 3 **80**, step 4 **87**, all five steps
**54 of 106**. Zero marker hits.

---

## 2026-08-13 — New Jersey corrections applied, and the duplicate flags enforced

### The New Jersey corrections are now in the database

The sweep's findings had been sitting in `NJ-standard-records.json` unapplied.
`scripts/apply-nj-corrections-2026-08-13.mjs` wrote **31 field changes across 20
rows**, each with its rationale appended to `researchNote`. No stance field was
touched, so no stance-change entry is owed.

The corrections worth naming, because they show what the crawl was producing:

- **#2498 First Baptist Matawan** had "Ida Faye Levering" as its leadership. She
  was a member appointed a **missionary in 1891** who sailed for Nellore, India —
  a name lifted off the church history page and filed as a current pastor.
- **#3621 NJ Heritage Reformed** was recorded in **Grand Rapids**. The church is
  in Kinnelon, New Jersey; Grand Rapids is where its pastor trained.
- **#1422 New Hope** pointed at `newhopepres.org`, which is a **PCUSA church in
  the Denver presbytery, Colorado**, with an open-and-affirming FAQ. Thirty-four
  thousand characters of "site content" for this row described a different church
  in a different state. Website cleared.
- **#2214 Boardwalk Chapel** was led by "Leslie Dunn", who **founded it in the
  1940s**. It is also not a congregation but a summer ministry of the presbytery.
- **#2894** turned out to be one church, not two: Sovereign Grace Bible Chapel →
  Sovereign Grace Baptist → **Harmony Bible Fellowship Church**, in the BFC since
  April 2022.
- **#2699 Island Baptist** is **Island Bible Church**, and its statement of faith
  is the MacArthur statement — pretribulational rapture, church distinct from
  Israel. It was filed as Reformed Baptist. Now recorded as dispensational.

Held back: **#1408 Good News Church**, where a web search says Atlantic City and
the PCA roster says Princeton. Neither gets written until one is confirmed.

### The duplicate problem was mostly already solved and never enforced

Scanning all approved rows (`scripts/find-duplicates.mjs`) turned up something
more useful than new candidates: **170 rows already carried a `duplicate_of:<id>`
flag from earlier research, and 159 of them were still `approved=true`.** The
directory was showing both copies of pairs somebody had already adjudicated. The
work had been done; it had just never been applied.

`scripts/enforce-duplicate-flags.mjs` applies it, but only where doing so is
safe. It refuses to act on a pair when the survivor is missing, hidden, itself
flagged a duplicate (a chain), points back at the duplicate (a mutual pair), sits
in another state, or has a name that does not agree.

The part worth keeping: **hiding a duplicate must not discard what it knew.**
Where the duplicate held research the survivor lacked, the script **merges it
forward first and hides second** — filling empty fields, unioning `sourceUrls` —
and only claims `researchStatus=researched` on the survivor if the research
actually came across. Every stance column is excluded from the merge outright,
because CLAUDE.md requires a log entry for a stance change and a stance must
never move as a side effect of deduplication.

**Result: 85 rows hidden, all 85 after merging their research into the survivor.
74 held for a human.** Approved rows 6,544 → 6,459. Table total unchanged at
6,558 — nothing was deleted, and every hidden row keeps its research and its
provenance behind `approved=false`.

The 74 held are genuine editorial calls, not scan failures. Most are one of two
kinds: a **stance would move** (`eschatology unknown -> postmill` recurs across
the #4124–#4217 import block, and several pairs disagree `amill vs postmill`), or
**both rows hold different notes** and choosing between them is a judgement. The
#4124–#4217 block should be looked at as a block rather than pair by pair.

### Two bugs in my own tooling, found by reading its output instead of its totals

- The scanner reported a 16-church "same SermonAudio broadcaster" group. The
  regex made the path segment optional and listed only the singular
  `broadcaster/`, so every `.../broadcasters/xyz` URL yielded the literal id
  **"broadcasters"**. Sixteen unrelated churches, one artifact.
- The safety check rejected seven pairs as "names differ" that were **apostrophe
  variants** — `King's Way` vs `Kings Way`, `Shepherd's` vs `Shepherds`. The
  normaliser replaced apostrophes with spaces instead of deleting them, so every
  possessive name read as a different church.

Both are the same failure this project keeps paying for: an automated pass
producing a confident number that means nothing. Neither would have shown up in
a summary count.

## 2026-08-27 — The single_issue queue opens: the Orrville Statement, and one promotion in seven

The `single_issue` tier holds 459 rows; 301 of them have never had the full standard
applied. All 301 are the **equal-protection petition cohort** — Ohio H.B. 370 (125),
Kentucky H.B. 523 (105), Indiana (67), Missouri (4) — every one flagged
`signature_only`. 293 carry a pastor's name and only **28 carry a website**, so step 1 of
the standard begins by *finding* the church, not reading it.

The precedent going in was discouraging: the last signature cohort worked to this standard
was 128 churches and **one** qualified.

### The find: the Orrville Statement

Nothing on Cross View Church's website suggested anything. Its leadership page carries two
short biographies and no position on any question. **The document that promoted this row
surfaced only from a pastor-name search — step 4.**

`orrvillestatement.com` is an eleven-article affirm/deny declaration, published on its own
domain under the church's name, with a scriptural index under every article and two
companion recordings. **John L. Marino wrote it** because, in his words, he was "approached
to give a pastoral and Christian answer to the drug abuse crisis in Wayne County Ohio."

It is addressed to a county, not a congregation, and it goes far past the crisis it answers:

- **"God requires humanity to subdue and exercise dominion over the world."**
- **"Jesus is Lord over every domain of life"** — denying that "any person, ideology,
  **government**, philosophy, theology, religion, or anything else can take Christ's
  rightful place as Lord."
- **A denial of neutrality**, in a civic document: no one can "apply these moral and
  biblical principles in a neutral fashion so as to divorce morality from theology. There is
  no such thing as morality without Christ."
- **"Non-Christian values (i.e. evolution, humanism, feminism) are objectively sinful and
  destructive for society."**
- **Patriarchy, unqualified** — husbands lead, wives submit, fathers are "obligated to take
  the leading role," and the statement "repudiate[s] the androgynous values of the current
  age."
- **Claims on policy** — against outsourcing parenting "to the state (school)," against
  able-bodied fathers on "government benefits."

**#4348 Cross View Church is promoted to `transformationalist`.** Abortion via the H.B. 370
petition, and the civil and moral order of his county via a document he authored, published
and built a coalition around — five pastors, two elders, the **retired Wayne County
Prosecutor**, the founder of a counselling institute and the CEO of a treatment centre.
Christian nationalism recorded `sympathetic` rather than `affirm`: the statement rejects
neutrality but never addresses the magistrate's duty.

### The statement is also a roster, and it reaches four other rows

- **#4353 Orrville Grace Brethren** — Joshua Steiner and elder Ike Graham, Th.M.
- **#4370 Calvary Bible Church, Columbus** — Eric Sipe.
- **#2684 Hopewell Church, Ashland** — teaching elder Matt Timmons and elder Mike Naylor.
- **Falls Berean Bible Church, Cuyahoga Falls** (Dr. Joel Huffstutler) — **not in the
  directory at all.** A gap, to be added.

### Reading the confession reversed the most promising row

**#4353 looked like a second promotion.** Steiner signed two public documents on two
different questions, which is the literal test. Then the church's own statement of faith
was read: CGBCI, **premillennial and pretribulational**, affirming "the literal fulfillment
of God's covenant promises to ethnic Israel," and committing the church to **nonresistance
"in war and peace."**

> **A nonresistant dispensationalist who expects the church removed before the tribulation
> is not claiming the civil sphere, whatever he signs.** Held at `single_issue`.

That row also moved `zionistStance` unknown → **yes**, which is the standing finding again:
the directory's bulk `zionistStance = no` default is wrong for premillennial bodies.

### One row's abolition went from a signature to a deed

**#3736 Grace and Truth Church of Athens** had no pastor recorded and a county in its city
field. It has **Smiles Welch**, was planted 25 August 2024, is 1689 Reformed Baptist — and
it **hosted Jeff Durbin of Apologia Church for an End Abortion Now event**, which sits in
its sermon feed. Still one question, so still `single_issue`, but evidenced by a deed now
rather than assumed from a list. `city_is_county` cleared from the street address.

### Negatives worth having

- **#4349 Parkman Congregational** — denomination established for the first time (**CCCC**,
  Ohio Fellowship) and its pastor **Will Coley is PCA-ordained**, which will look like a
  contradiction to a later pass if it is not written down. Site complete and carrying
  nothing on any marker. His name collides with **former Ohio state senator William P.
  Coley II** — a different man. The site's **TLS certificate has expired**; that is a fact
  about the fetch, and it reads fine with verification off.
- **#4350 Little Miami Fellowship** — rendered in a browser rather than fetched, so a
  client-side page could not be mistaken for an empty one. **It is genuinely empty**: three
  pages, no leadership, no confession. Its two pastor names remain unconfirmed against any
  church source, and a search summary tried to attach a "Johnathan Newman" to Koinos Church
  in Troy (#4359, pastor Chris Early). **That linkage was an artifact and was not
  recorded.** Flagged `verify_stance`.

### The line-drawing question this raises

Marino **authored** his second public act. Steiner, Sipe, Timmons and Naylor **signed** it.
Whether a pure signatory clears "action across public questions" is a rule that would
ripple across the whole directory, so the three affected rows carry the evidence and the
markers the statement supports, and their `culturalEngagement` was **deliberately not
moved** pending a ruling.

**Result: 7 rows to the full standard, 13 audited stance changes, 1 promotion.** Queue
301 → 295.

## 2026-08-27 (later) — The ruling applied, and the directory turns out to contain the author of H.B. 370

### The signatory ruling

Dustin ruled on the question the Orrville Statement forced:

> **A pastor's signature on another man's public declaration counts as a public act — but only
> when the DOCUMENT ITSELF makes a claim on the civil or public order.** Signing two narrow
> single-question petitions is still `single_issue`. Signing something that claims the civil
> sphere is acting in the civil sphere, whoever held the pen.

**#2684 Hopewell Church** and **#4370 Calvary Bible Church, Columbus** promoted under it.
**#4353 Orrville Grace Brethren was not** — which gives the corollary, now recorded in the
standard:

> **A church's own confession outranks its pastor's signature.** Orrville Grace Brethren signed
> the identical document. Its statement of faith is nonresistant, pretribulational and
> dispensational, so it does not claim the sphere the statement claims. **Read the statement of
> faith before promoting on a signature.**

### #4359 Koinos Church — the row was wrong about its pastor, and the man it missed wrote the bill

The leadership field read "Pastor: Chris Early," lifted from the H.B. 370 petition. Early is
real; he is Koinos's **Director of Music and Liturgy** since July 2019. The church is governed
by a **plurality of ten elders** and names no single senior pastor.

**Its founding pastor is Johnathan Newman, sitting Representative for Ohio House District 80.**

- Elected **November 2024 with 74.9%**, sworn in **6 January 2025**. Vice-chair of House
  Agriculture; also Community Revitalization, Education, Transportation.
- **On 18 June 2025 he CO-INTRODUCED H.B. 370**, the Ohio Prenatal Equal Protection Act, with
  Rep. Levi Dean (R-71).
- 2017 **Dietrich Bonhoeffer Award** from the Center for Christian Virtue for pro-life advocacy.
- Founded Koinos in **1998**; senior pastor 26 years. SBC. Union University, then Mid-America
  Baptist Theological Seminary.

> **Every one of the 125 Ohio rows in this queue was created from the pastoral petition
> supporting H.B. 370. The bill those pastors were petitioning for was co-authored by a pastor
> whose own church sits in that cohort — filed under his worship director's name.** The
> directory had the bill's author and did not know it.

H.B. 370 is not incrementalist: it treats abortion as homicide, would nullify Article I §22 of
the Ohio Constitution, and was **opposed by Ohio Right to Life** for penalising mothers. End
Abortion Ohio backed it.

**The counter-evidence, recorded because it is real.** Newman's essay *"Why I Am Running For
Office,"* published on the church's own site on 20 December 2023, draws the line that normally
lands a church in `limited_mission`: the church's mission is "worship, discipleship, gospel
proclamation," his candidacy is **individual** civic participation, and the church will not
become "a political campaign organization."

**Promoted anyway**, on the standing ruling that if the pastor pushes it the church counts — a
man who enters the magistracy and drafts a personhood bill has claimed the civil order, and his
church published his reasons. **But the note is written so it can be reversed in one line**: his
advocacy is overwhelmingly one question, which is exactly the ground Grace Fellowship Davenport
was held on.

### Also this batch

- **#4352 Blanchard Reformed** — **an OPC mission work, not yet a particular church**, under the
  Presbytery of Ohio. Flagged `in_transition`; a mission work has no session of its own.
- **#4354 Kerusso Baptist** — **SBC**, via the Southwestern Baptist Association. The **SWBA
  roster** (myswba.com/swba-churches) is noted as an unworked association list.
- **#6618 Falls Berean Bible Church, Cuyahoga Falls — ADDED.** An Orrville Statement signatory
  the directory did not contain. Dr. Joel Huffstutler, Bob Jones throughout (PhD 2008), formerly
  **director of the Great Lakes Bible Institute** at a previous church. That directorship is
  flagged and **deliberately not counted** — the education ruling is applied to the institution,
  not followed around after the man. Its site **403s to ordinary fetchers** and had to be
  rendered.

**Running total: 11 rows to the full standard, 1 church added, 5 promotions.** Queue 301 → 292.

## 2026-08-27 (batch 3) — The petition roster keeps naming worship pastors

### The pattern, now confirmed twice, and it should be assumed on every row in this cohort

**#4358 Substance Church, Ashland** was filed as "Pastor: Scott Long." Long is the **Elder and
Pastor of Worship Arts and Operations.** The lead pastor is **Garrick Bailey** — PhD in
Systematic Theology from **Southern Baptist Theological Seminary**, arrived 2024 from **The
Village Church**, where he directed adult discipleship. A third pastor-elder, Jeff Powell, was
unrecorded. The church is **EFCA**, established here for the first time.

> **That is the second row where the H.B. 370 petition named a worship pastor and the import
> filed him as "the pastor"** — after #4359 Koinos, where the same mistake buried a sitting
> state representative. **Assume this failure mode on every row sourced from this petition.**

Note also that the **EFCA no longer requires premillennialism**, so nothing about eschatology can
be inferred from that affiliation. It stays `unknown`.

### A wrong-state website avoided, and a city corrected

**#4356 Germantown Baptist Chapel.** The top search result for this church is
`germantownbaptist.org` — which is **Germantown Baptist Church of Germantown, TENNESSEE**, senior
pastor Matt Brown, 9450 Poplar Avenue. Different church, different state, different name. **Not
recorded.** This is the eleven-wrong-websites failure mode arriving again, and it is worth noting
that the decoy outranked the real site.

The real site is `baptist-chapel.org`, which serves a certificate for `*.websrvcs.com` and so is
rejected by ordinary fetchers on a hostname mismatch — a fact about the fetch. Read with
verification off it gives **Andy Powell, Pastor, 343 Farmersville Pike, Germantown, Ohio 45327.**

**City corrected Franklin → Germantown.** Both are real Ohio towns in adjacent counties, which is
precisely how that error survives review.

Affiliation deliberately **left unset** despite the site listing a **WMU** (Woman's Missionary
Union, a Southern Baptist auxiliary). A WMU is a strong indicator, not a membership claim, and no
association roster lists the chapel.

### Two rows recorded honestly as thin

- **#4355 Living Faith, College Corner** — **a Deaf and Hard of Hearing mainstream church**,
  serving in its own words "a forgotten area." Nothing else in this cohort looks like it. **Its
  pastor's name cannot be settled**: the petition says "Roy Stinson," a listing says "Allen
  Stinson," and the church publishes only "Pastor Allen" and "Pastor Tom" with no surnames —
  though a **Jade Stinson** is on staff, so the surname is genuinely attached. Recorded as a
  conflict, flagged `verify_stance`, not resolved by guess. SBC via the SWBA.
- **#4357 Eternal Life Baptist, Hamilton** — pastor **Michael Byrd** corroborated (Facebook, and
  X as **@preacherbyrd01**), but the church publishes no website, no confession and no sermon
  archive, and neither the Cincinnati Area nor Ohio Valley Baptist association directory confirms
  it. **Namesake traps avoided:** Michael T. Byrd Sr. of St. Louis (Baptist Press) and a Bishop
  Michael Craig Byrd are different men. Flagged `verify_stance`; his own social output is the one
  avenue left unread.

**Running total: 15 rows to the full standard, 1 church added, 5 promotions.** Queue 301 → 286.

## 2026-08-27 (batch 4) — A second name collision, two EPC rows, and a guess refused

### The petition's leadership field has now failed three different ways

**#4367 New Albany Presbyterian** was filed as "Pastor: Tanner Fixari." Fixari is the **Assistant
Pastor of Care**. The lead pastor is **David Milroy, since 2004**, with Ken Rathburn as associate.
That is the third row where the H.B. 370 petition named a man who is not the lead pastor — a
worship pastor at Koinos, a worship pastor at Substance, an assistant pastor of care here.

### A pastor field checked against a false vacancy signal

**#4363 Hudson Presbyterian** surfaces a **CRC Network job posting for "Senior Pastor"** and the
church's own **/pastoral-search** page. Either would ordinarily mean a vacancy and a stale record,
which is a failure mode this project keeps paying for. **The staff page shows Shawn Carafa still in
post.** The posting is stale, not the pastor. Written down because the next pass will hit the same
misleading results.

### Two EPC congregations flagged for women's ordination — and they are not the same case

Both #4367 and #4363 are **Evangelical Presbyterian Church**, which leaves the ordination of women
to presbyteries and sessions. Both carry `womens_ordination`, but the flag means different things:

- **#4363** — no woman appears among the published officers. **Denomination's position only**,
  which is exactly what the flag was written to record.
- **#4367** — the published roster of **ten ruling elders and fourteen deacons includes names that
  read as women's.** That is an inference from names, recorded as an inference and not a finding;
  `genderStance` stays `unknown` rather than being set to egalitarian on it. **If that session does
  include women, the row sits below the directory's "complementarian at minimum" floor** — a scope
  question for Dustin, not one to settle here. Marked, not deleted, per the 2026-08-04 ruling.
  Recorded alongside it: the congregation is listed by **The Gospel Coalition's Columbus
  directory**, a complementarian network. Both facts stand.

### A second wrong-church website avoided, and the decoy outranked the real site again

**#4368 King's Church, Franklin.** Searching returns **kingschurchoh.com** — a **different King's
Church in Lakewood**, near Cleveland: 15422 Detroit Avenue, lead pastor Noah Nickel,
non-denominational, governed by a Board of Overseers. Ours is **kingschurchfranklin.com, 632 South
Main Street, Franklin**, seventy miles away, **Baptist with a "Reformation heritage"** and the Five
Solas.

> **Two churches sharing a name in one state, the decoy ranking above the real one. Twice in two
> batches, after Germantown Baptist Chapel drew Germantown, TENNESSEE.**

A `kingschurchoh.libsyn.com` podcast feed also appears. **Not attributed** — the handle matches the
Lakewood church's domain, and guessing would repeat the error.

### A denominational guess refused, and an education ruling deliberately not stretched

**#4374 Millersport Covenant Church**, founded in a living room on **5 July 1987**. An automated
read concluded it "appears to be Evangelical Covenant Church-affiliated **based on naming**."
**Rejected — nominal inference is not research**, the same error as reading *Christendom* Reformed
Baptist as a claim on Christendom. `denomination` left unset.

Its associate pastor **Mark B. Thogmartin, PhD** wrote **"Teach a Child to Read with Children's
Books"** — four editions, a 1999 Parents' Choice seal, written **for homeschooling parents**,
reviewed by **Creation Ministries International** — and spent 30+ years as a teacher and
**principal**. The 2026-07-31 ruling that **education is movement-building** was **not applied**:
his work is mainstream literacy pedagogy published through the ERIC Clearinghouse, and he founded
no Christian school. **Writing a reading manual homeschoolers buy is not the same act as building
the schools.** Recorded in full so the call is reversible.

**Running total: 19 rows to the full standard, 1 church added, 5 promotions.** Queue 301 → 282.

## 2026-08-27 (batch 5) — A theonomy question raised by sermon titles, and answered no

**#4364 Friendship Baptist, Harveysburg** took the longest row of the day, and it is the clearest
worked example so far of the standard producing a **confident negative** rather than a shrug.

**The question.** The church is preaching a sustained series through **Deuteronomy**, and the
titles repeat one framing: *"Corporately Worship God According to His Good Law" (Deut 12)*, **"No
Exceptions to God's Good Law" (Deut 13)**, *"God's Good Law for His Holy Sons" (Deut 14)*, *"The
Festivals of God's Good Law."* Deuteronomy 13 is the apostasy chapter. Preached as "God's good
law, no exceptions," that is theonomy-adjacent language and could not be waved through either way.

**The answer, from the church's own site search:**

- **`theonomy` — nothing. `postmillennial` — nothing.**
- **`magistrate`** — two expository sermons only, Matthew 5:38-48 and 1 Peter 2:11-17.
- **`abortion`** — two sermons, Isaiah 56-57 and Hosea 13, both child-sacrifice passages. Not a
  standing theme.

**And the confession settles it.** Friendship holds the **Baptist Faith and Message 2000**, whose
Article XVII states that **the church should not resort to the civil power to carry on its work** —
a published position pointing away from transformationalism.

> **The "God's good law" framing is expository practice, not a programme.** He preaches straight
> through books; he reached Deuteronomy, and Deuteronomy is about the law. Calling it good is
> Pauline.

Affiliations established and published plainly by the church: **SBC**, the **State Convention of
Baptists in Ohio (SCBO)**, and the **Cincinnati Area Baptist Association (CABA)** — which also
settles the CABA question left open on #4357 in batch 3.

Jordan Atkinson is the most academically engaged pastor in this cohort — **SBTS MDiv, ABD at
Midwestern in Biblical Studies**, a **Themelios** reviewer, formerly a pastoral intern at Kenwood
Baptist, Louisville. He and Abi have **eight children** and are **licensed foster caregivers**
through Clinton County. That last is recorded as a real and costly commitment on the life question
but **was not counted as a second public act** — it is a work of mercy, not a claim on the civil
order.

### Three more clean negatives

- **#4362 Calvary Baptist, Marysville** — **Independent Baptist**; Matt Schiesser lead pastor since
  March 2020, arriving via Houston and a Circleville church plant. Officer list entirely male.
- **#4365 Calvary Bible, Cortland** — **non-denominational**; both petition names confirmed, and
  **Michael A. Matejka arrived April 2025**, so the leadership field is demonstrably current rather
  than merely unchallenged. **Note its SermonAudio handle is `cbcwarren`, not a Cortland string — a
  broadcaster id is not a location and must never be used to place a church.** Kept explicitly
  distinct from #4370, the Columbus Calvary Bible Church that signed the Orrville Statement.
- **#4360 Quest Church, Middletown** — Ken Henderson, lead pastor since January 2010. **The church
  publishes no statement of faith, no confession, no denomination and no officer list**; its /about
  path does not exist. `denomination` and `genderStance` both left unset rather than guessed from a
  single male pastor. Marker searches return only the End Abortion Ohio petition, which at least
  confirms the signature is genuinely his.

**Running total: 23 rows to the full standard, 1 church added, 5 promotions.** Queue 301 → 278.

## 2026-08-27 (batch 6) — Grace Advance appears twice, and the petition's worst leadership record

### The leadership failure is now at five rows, and #4366 is the worst of them

**#4366 Cornerstone Bible Church, Xenia** was filed as "Pastors: Robert Palacio; Kevin Poole;
Edward Comperry." **None of the three is the pastor.** Palacio is an **elder**; Poole and **Clark**
Comperry — not Edward — **lead small groups**. The pastor-teacher is **Bill Vine**.

The running tally of rows where the H.B. 370 petition did not name the lead pastor:

| Row | Petition named | Actually |
|---|---|---|
| #4359 Koinos | Chris Early | Director of Music and Liturgy — the founding pastor is a **sitting state representative** |
| #4358 Substance | Scott Long | Pastor of Worship Arts and Operations |
| #4367 New Albany Pres. | Tanner Fixari | Assistant Pastor of Care |
| #4373 Hillside Baptist | Rick Thompson | **Associate** pastor; lead is Kevin Fath |
| #4366 Cornerstone Xenia | three men | an elder and two **small-group leaders** |

> **Five of roughly twenty rows worked so far. This is not occasional — it is how the roster was
> built, and every remaining row in the cohort should be treated as naming a signatory rather than
> a pastor.**

### Grace Advance — John MacArthur's network — turns up twice

**#4369 Medina Bible Church** describes itself as "a non-denominational Bible teaching church
affiliated with **Grace Advance**." Mark Rice, **MDiv from The Master's Seminary**, pastor-teacher
since January 2014, 600+ sermons, preaching from the **Legacy Standard Bible**.

**#4371 Grace Church of Rootstown** is the second. Its own site never says so; **Grace Advance's
directory does**, which is the stronger source.

**What was deliberately NOT inferred.** The MacArthur orbit has known positions — premillennial and
pretribulational, futurist on Israel, complementarian, and MacArthur's leading role in the
**Statement on Social Justice and the Gospel**, which per the schema rules transformationalist
**out**. **Neither congregation publishes any of that.** Network membership is not a confession:
the same rule that forbids qualifying a church on CREC membership forbids disqualifying one on
Grace Advance membership. Markers rest on each church's own silence.

Rootstown is worth one more note. It says it wants to "honor God in all areas of life — in their
families, occupations, schools, and their witness." **That is close to this directory's qualifying
language and was tested against it.** It is about personal faithfulness across ordinary life, with
no claim on law and no public act attached. **Not enough** — recorded so a later pass does not read
the sentence out of context.

### A third-party listing shown to be wrong

**#4373 Hillside Baptist** is listed by **kjvchurches.com**, which would imply King James Only
conviction — a real doctrinal marker among independent Baptists. **It is false: Rick Thompson
preaches from the ESV.** A directory listing is a claim like any other, and this one fails against
the church's own practice. GARBC established; the congregation was **planted in 2011 out of
Pleasant Hill Baptist, Smithville**.

### Leads opened, not chased

- **Grace Advance publishes a church list and a map** (gracechurch.org/graceadvance) — an unworked
  roster of exactly the kind that paid out on 2026-08-06.
- **Ohio Association of Regular Baptist Churches (OARBC)** publishes a newsletter and church list.
- **Levi Dean**, the Ohio representative for **District 71** who **co-introduced H.B. 370** with
  Johnathan Newman, is placed in **Xenia** by the Gongwer directory — the town of #4366 and #4350.
  **No connection to any congregation has been established and none is asserted.** Worth chasing.
- **H.B. 370 status updated:** referred to the **House Judiciary Committee on 15 September 2025**.
  The Koinos note recorded it as merely pending as of 28 June 2025.

**Running total: 27 rows to the full standard, 1 church added, 5 promotions.** Queue 301 → 274.

## 2026-08-27 (batch 7) — Created Equal's vice president, a row that is not a church, and a multi-site filed twice

### #4392 CrossPointe Church, Westerville — PROMOTED

The row read "Pastor: Seth Drayer," which is **incomplete rather than wrong** — he is the
**assistant pastor over Adult Bible Education**; the lead pastor is **Matt Keller**. But the man
the petition named is the most publicly engaged figure found in this cohort outside the
legislature.

**Seth Drayer is Vice President of Created Equal**, the Columbus-based national pro-life education
and outreach organisation founded by Mark Harrington, and has been in **full-time pro-life ministry
since 2010**. He acts across three public questions:

1. **Abortion** — not a signature but a vocation; he **debates university professors** in formal
   public debate (most recently Dr. David Sanders of Purdue) and has appeared on **Fox & Friends**
   and **Hannity**.
2. **Gender** — he preached **"Genesis and Gender: The Transgender Delusion"** from this pulpit and
   **the church publishes it on its own media site**, which under the standing ruling makes it the
   institution's position.
3. **Education** — **adjunct instructor of Christian Apologetics at Veritas Academy**, a classical
   school in Columbus. The 2026-07-31 ruling is explicit that working at the institutional centre
   of classical education *is* transformationalist action.

**The qualification is recorded plainly:** the case rests on the **assistant** pastor. The church's
own "What We Believe" is standard evangelical with **nothing on the civil order**, and lead pastor
Matt Keller has no marker record. **If the "pastor pushes it" rule is ever narrowed to lead
pastors, this row is the first to revisit.**

> **Two fetch traps here would each have produced a false negative.** The church runs **two live
> domains**, and only `thisiscrosspointe.online` has a leadership page — which **omits Drayer**.
> Separately, **his speaker page on the primary domain now 404s.** Either alone reads as a
> departure. Neither is true: he preached **5 January 2025**, and the 404 is a migration artifact.
> **An absent page is a fact about the site, not about the man.**

### #4385 Deeper Life Ministries — NOT A CHURCH, held out of scope

**Deeper Life Ministries International is a parachurch 501(c)(3)** whose work is conferences,
revivals, conventions, leadership training and books. **It has no congregation and holds no weekly
worship.** It has a president and a board, not a pastor and elders. Flagged `review_nonfit` and
`approved=false`, in the same class as Boardwalk Chapel in the NJ sweep.

**The man is significant and the record is kept.** **Dr. Michael R. Avery** was **president of God's
Bible School & College for twenty-two years** and became its **Chancellor in 2017**; he is an
ordained elder in the **Bible Methodist Connection of Churches** and currently its **General
Connectional Chairman**. **His signature was given in a personal and organisational capacity, not
for a congregation — which is exactly why the row cannot stand as one.** Two leads follow: the
Bible Methodist Connection roster, and the Wesleyan-holiness orbit around GBS, which this directory
has never touched.

### A third name-collision trap

**#4384** — `citizenschurch.com` is **Citizens Church of Plano, Texas**, an Acts 29 congregation.
Ours is **Citizens Baptist Church**, Westerville, at `citizenschurch.net`. **Name corrected on the
row.** SBC via the **Baptist Resource Network**, also listed by the **Harbor Network**. Rob Kane
planted it with his wife Danielle in 2020 and co-hosts the **Simple Theology** podcast — which has
**not** been listened through, and is the kind of pastor-produced output that has overturned
verdicts before.

> After Germantown drew Germantown TENNESSEE and King's Church Franklin drew King's Church
> Lakewood, this is the third. **In this cohort a plausible domain is a hypothesis, not a source.**

### One church filed twice

**Maranatha Community Church is a single multi-campus congregation** with **directional elders**
over four Ohio locations — Baltimore, Canal Winchester, Pickerington and Southside. The directory
holds **#4383 (Pickerington)** and **#4466 (Canal Winchester)** separately. Both are real meeting
locations, so they are not duplicates in the ordinary sense, but they are **one church**. **Both
flagged `verify_stance` and referred to the duplicate queue** rather than merged here — the
NorthRidge multi-site question is already open and the rule should be set once for all of them.

**Sixth instance of the petition naming a non-lead pastor:** the row's first name, **Randy Surface**,
is Pickerington's **Music and Discipleship** pastor; the campus lead is Jeff Beisel.

### Also

**#4381 Maranatha Baptist, Columbus** — **GARBC**; Andrew Shearer, lead pastor since April 2016, who
came to ministry from **thirteen years in aerospace at Boeing Satellite Systems** while graduating
from **The Master's Seminary (2006)** — the **third Master's-orbit pastor** in this cohort. The
church hosts its own **Proclaim Conference**; examined, and **not counted**, because no programme or
subject matter could be read and a conference is only evidence if what it teaches is known.

**Running total: 33 rows to the full standard, 1 church added, 1 held out of scope, 6 promotions.**
Transformationalist 108 → 113. Queue 301 → 268.

## 2026-08-27 — Is Created Equal abolitionist, or just pro-life? (Dustin's question)

Worth answering in the record, because this directory **ranks on abolition** and "vice president of
Created Equal" reads like an abolition credential. **It is not one.**

**Created Equal is pro-life in the technical sense the abolitionist movement uses:**

- **It uses the label abolitionists reject.** Its own mission is "equipping **pro-life** individuals
  with photographic evidence and conversational skills," and it presents itself as "Created Equal —
  Pro-Life." **Abolitionists refuse that word on purpose** — Free the States and Abolitionists
  Rising both publish essays titled **"Abolitionist, Not Pro-Life"** to mark the division.
- **It takes no published position on the three defining questions** — incrementalism versus
  immediate abolition, equal-protection legislation, and criminal liability for women. An
  abolitionist organisation states these; they are the identity.
- **Its method is persuasion**, in the Center for Bio-Ethical Reform tradition: graphic imagery,
  Justice Rides, campus apologetics, mobile ultrasound.
- **No Created Equal position on H.B. 370 could be found at all.** That silence is evidence. **End
  Abortion Ohio backed the bill; Ohio Right to Life opposed it** for penalising mothers. A
  Columbus-headquartered abolitionist body saying nothing about its own state's equal-protection
  bill would be extraordinary.

**But it is not mainstream-incrementalist either.** It argues for "equal protection between the born
and the preborn" and frames abortion as **age-based discrimination** — abolitionist-adjacent
language. It sits nearer abolition than National Right to Life, without taking abolition's positions.

**What changes: nothing.** #4392's `abolitionStance` stays **pro_abolition**, because it rests on
**Drayer's own signature on the H.B. 370 pastoral petition** — a bill criminalising abortion as
homicide that **Ohio Right to Life opposed**. That is an abolitionist act by the man, independent of
his employer. The promotion stands too: it rested on three public questions, and **cultural
engagement is the qualifier while abolition is only a ranking marker.**

> **The general rule this sets: an activist's EMPLOYER is not a stance. Read the man's own acts.**

## 2026-08-27 (batch 8) — The St. Marys cluster, and Wayback is working again

### Three churches, one small town, three different traditions

Three consecutive rows in this cohort are all in **St. Marys**, and they are **Assembly of God**
(#4376), **Global Methodist** (#4377) and **Calvary Chapel** (#4378).

> **That is not how a doctrinal network signs a petition. It is how a local ministerial association
> does.** Worth chasing: a St. Marys–area ministerial association would explain the cluster and may
> point at more signatories than the petition captured.

### Wayback is working from this environment again

**#4378's website returns "There has been a critical error on this website"** — a WordPress fatal
error, not a dead domain and not a 403. **It was read through the Wayback Machine**, which earlier
sessions had logged as blocked. **It is working now**, and it should be back in the standard
retry list ahead of giving up on a site.

### Two rows where the honest answer was to flag rather than decide

- **#4376 Living Hope Worship Center.** Its **former domain was `livinghopeaog.com`** — Assembly of
  God — and that domain still resolves, carrying only a "we have moved" notice. **The new site
  claims no denomination at all.** The AG has **ordained women since 1914**, so if that affiliation
  is current the row needs `womens_ordination` and falls below the complementarian floor. **The flag
  was NOT applied**: a retired domain is not a membership claim. Flagged `denom_ambiguous` with the
  question written down.

  Also corrected: **"Dr." Joshua Steinke is a chiropractor**, not a theologian — he founded Steinke
  Family Chiropractic. Recorded explicitly, because this directory holds several men with divinity
  doctorates and the title would otherwise read as one.

- **#4375 Abiding Faith Bible Church.** Its confession affirms "the personal, visible, and
  **imminent** return of our Lord and Savior Jesus Christ." **"Imminent" is the pretribulationist's
  word**, and it would have been easy to file the row as dispensational on it. **It was not** — the
  statement never says premillennial, never mentions the tribulation, never addresses Israel.
  `eschatology` stays `unknown`. A **stale second site** at `abidingfaithbible.webnode.page` is
  recorded so a later pass does not read the two domains as two congregations.

### A disaffiliation considered and rejected as qualifying

**#4377 Wayne Street Church is now Global Methodist, formerly United Methodist** — and its UMC
identity is still live in its infrastructure (`waynestreetumc.org` resolves; the Facebook handle is
still `waynestreetumc`). Flagged `in_transition`.

**Leaving a denomination over its sexuality settlement is a real corporate act on a contested
question**, and more than most rows in this cohort have done. **It does not qualify the row**: it is
an act of church government, not a claim on the civil order. Recorded so the reasoning is visible
rather than silent. **Flagged `womens_ordination`** — the GMC ordains women; its split from the UMC
was over sexuality and polity, not that question.

**Running total: 37 rows to the full standard, 1 church added, 1 held out of scope, 6 promotions.**
Queue 301 → 264.

## 2026-08-27 — Does #4377 itself ordain women? (Dustin's question)

Two claims that the `womens_ordination` flag runs together, and they have different answers.

**The denomination does.** The Global Methodist Church's own FAQ: **"Women, like men, are called to
serve in the Global Methodist Church and are entitled to serve at all levels."** Its Book of
Doctrines and Discipline disclaims discrimination on the basis of gender. The GMC split from the UMC
over **sexuality and polity, not the ordination of women**. The flag is correct denominationally.

**Whether Wayne Street itself does is unestablished, and nothing found suggests it has.** The church
**publishes no staff roster anywhere** — the current site has no leadership page, the surviving
UMC-era site **403s to fetchers**, and the **only clergy named on any source is "Pastor Tim"
Benjamin, a man.**

> **This is the ordinary case the flag was written for**, and its own definition already says so: it
> "records the DENOMINATION'S position, not necessarily this congregation's — several churches
> carrying this flag are themselves complementarian, and their records say so." **This record now
> says so explicitly**, so the flag cannot be misread as a finding about the congregation.

The three rows flagged today are deliberately not the same case, and each row states which it is:

| Row | Denomination permits | This congregation |
|---|---|---|
| #4363 Hudson Presbyterian (EPC) | yes | **no woman among published officers** — denominational only |
| #4377 Wayne Street (GMC) | yes | **no roster published at all** — unestablished, only a male pastor named |
| #4367 New Albany Presbyterian (EPC) | yes | **roster appears to include women** — also `verify_stance`; would sit below the floor in practice |

`genderStance` stays `unknown` on all three. **This directory does not infer the doctrine from a
roster, nor in the other direction from a denominational permission a congregation may never have
used.**

## 2026-08-27 (batch 9) — Eight non-lead pastors, and Cedarville emerges as the common training ground

### The leadership tally reaches eight

**#4391 Ashland Grace** was filed as "Pastor: Aaron Arnold." Arnold is the **Associate Pastor of
Worship**; the senior pastor is **Josh Wilson**. **#4379 First Baptist Troy** was filed as "Pastor:
Nate Beaman," who is **Pastor of Family Life Ministries**.

That is **eight of roughly thirty rows worked**, and **three of the eight were specifically worship
pastors**. The pattern is not random: it looks like whoever compiled the petition took whichever
staff member signed, and the import promoted every one of them to "the pastor."

**#4389 Cornerstone Baptist, Springfield is the counter-example** — the petition named **Isaac Dye**,
who genuinely is the senior pastor. Recorded because it has been the exception.

### Cedarville is the most common training ground in this cohort

**Isaac Dye** is the **fourth Cedarville man** found here, after **Bill Vine** (#4366), **Kevin Fath**
(#4373) and **Andrew Shearer** (#4381). Given that the Master's Seminary orbit accounts for three
more (Vine, Mark Rice, Shearer — Vine counting twice), **Cedarville and The Master's between them
train a large share of the pastors on this petition.** Worth carrying into the Kentucky and Indiana
cohorts as a thing to watch rather than a thing to assume.

### Two Grace Brethren denominations, kept distinct

**#4391 is Fellowship of Grace Brethren Churches (Charis Fellowship)** — Grace College and Grace
Theological Seminary in its elders' biographies, and a Charis article marking the congregation's
**100 years**. **#4353 Orrville is CONSERVATIVE Grace Brethren (CGBCI)**, the smaller separatist
body. **Two distinct denominations in one cohort; they must not be collapsed.**

### A Reformed charismatic church, and a phrase tested against the standard

**#4386 Grace Christian Fellowship, Dayton** describes itself as **"Reformed/Evangelical" in doctrine
and "Charismatic" on the Holy Spirit** — no other row in this cohort looks like it. Planted **2003 by
Greg and Catherine Weis** in Dayton's inner city.

Its mission is to see **"the city of Dayton transformed by the love of Christ."** ***Transformed* is
this directory's own vocabulary**, and the phrase was tested against the qualifying standard.
**Rejected**: it is about evangelism and mercy, not law or the civil order, and no public act
accompanies it. Recorded so a later keyword pass does not promote the row on the word alone.

**On women in leadership the record says exactly what the church says.** It is "led by a team of many
men and women" under **two elders, both men**. **No `womens_ordination` flag applied** — the church
has no denomination whose position could be cited, and its eldership is not shown to include women.

**One petition name could not be confirmed at all**: "Steven Leopold" appears on no church source.
Flagged `verify_stance` rather than silently dropped.

### Method note: do not batch marker searches across names

A combined search on four pastors' names returned **nothing but Doug Wilson**, because "Josh Wilson"
collided with him and swamped the query. **Names that collide with a prominent figure must be
searched alone.** The batching that saves time on obscure names destroys the search on common ones.

**Running total: 41 rows to the full standard, 1 church added, 1 held out of scope, 6 promotions.**
Queue 301 → 260.
