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
