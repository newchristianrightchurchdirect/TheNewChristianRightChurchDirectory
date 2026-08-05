// The last 32 rows of the signature_only queue: community/fellowship churches and the
// non-denominational remainder. This is the hardest group to research precisely because most of
// them belong to no body that binds anything, so markers are set only where a denomination or the
// congregation itself supplies them — and for most of these, that means very little is set.
//
// That restraint is the finding. A church with no confession, no denominational standard and no
// published statement cannot be classified from a signature, and saying so is the honest record.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'research-final-nebraska-2026-08-04.ts'
const NOT_Q = `**Assessment: 1 marker of 6.** Abolition evidenced and formal. No evidence of postmillennialism, theonomy, Christian nationalism or anti-Zionism, and no corporate civil-sphere activity beyond the signature. Remains **single issue** — examined, does not qualify.`
const NO_BODY = `**Independent, with no binding confession.** Gender, sexuality and eschatology are left unset rather than assumed: this congregation belongs to no body that settles them and published no statement of its own. Recorded as unknown, which is what it is.`

type Row = { id: number; note: string; stances?: Record<string, string>; also?: Record<string, unknown> }
const AB = { abolitionStance: 'pro_abolition' }
const TRAD = { ...AB, sexualityStance: 'traditional' }
const COMP = { ...TRAD, genderStance: 'complementarian' }

const ROWS: Row[] = [
  { id: 4299, stances: TRAD,
    also: { denomination: 'Citylight Family (network)', website: 'https://citylightmosaic.church', address: '3416 Woolworth Ave',
      leadership: 'Lead Pastor: Jacob Richardson',
      notablePeople: 'Jacob Richardson — co-founder of the congregation in 2021 and lead pastor; developed as a church planter at Citylight Omaha after a year serving in Guatemala.' },
    note: `Verified individually 2026-08-04. **A bilingual church plant, founded 2021**, whose stated purpose is "**Multiplying Diverse Disciples and Churches**" — it "exists to multiply diverse disciples and churches, unified by the gospel of Jesus."

Part of the **Citylight Family**, an Omaha-area church-planting network that includes Citylight Omaha, Citylight Omaha West, Citylight Bennington, Citylight Greenwood, Citylight Kearney, Providence Church and Harbor Church, and which runs a church-planting residency. **Jacob Richardson** co-founded this congregation and leads it, having been trained as a planter at Citylight Omaha after a year in Guatemala.

**A network worth adding to the deep-dive queue** — a metro-wide planting family with a shared residency pipeline is exactly the connective tissue this directory should map, and only one of its congregations is currently on file.

${NOT_Q}`,
  },
  { id: 4253, stances: COMP,
    also: { denomination: 'SBC / Converge Heartland', website: 'https://thewellhastings.com', address: '1814 W B St', leadership: 'Pastor: Joe Marino' },
    note: `Verified individually 2026-08-04. **Dually aligned — SBC and Converge Heartland.** **Planted in 2012 by Joe Marino with six adults in a living room**, which makes it one of the youngest congregations on the roster and entirely a church plant.

The name is deliberate: *The Well* recalls Jesus and the Samaritan woman in John 4, and reflects a stated aim "to reach the **unchurched, de-churched**, and anyone else who wants to come." Publishes a podcast (*The Well Hastings*) and to YouTube.

Gender and sexuality follow the Baptist Faith and Message through its SBC alignment; the SBC binds no millennial position, so eschatology is left unset.

${NOT_Q}`,
  },
  { id: 4223, stances: COMP,
    also: { denomination: 'SBC (Southern Baptist Convention)', website: 'https://insidenp.com', leadership: 'Pastor: Lyn Hansen' },
    note: `Verified individually 2026-08-04. **North Park Baptist Church** — a **Southern Baptist Convention** congregation serving Platte County, though it now presents publicly as simply "North Park Church." **Lyn Hansen has pastored here since 2004.**

The congregation runs a **recovery ministry for those coming out of addiction**, reported in the local press — real corporate public-facing work, recorded as mercy ministry rather than a civil-sphere programme. Hansen publishes sermon material through SermonCentral and the church keeps a devotional blog.

${NOT_Q}`,
  },
  { id: 4294, stances: TRAD,
    also: { website: 'https://sowerchurch.com', leadership: 'Pastor: Dan Coke' },
    note: `Verified individually 2026-08-04. **Listed in The Gospel Coalition's Nebraska church directory** and self-described as a "**Gospel-Centered, Multi-Ethnic Church**… committed to making authentic disciples who love His Word, Church, and Mission."

The multi-ethnic self-definition is worth recording alongside Citylight Mosaic's bilingual plant and the two North Omaha Black Baptist congregations: **the Nebraska signatory roster is markedly less monochrome than a rural-Plains list would suggest.**

${NOT_Q}`,
  },
  { id: 4280, stances: TRAD,
    also: { website: 'https://heartchurch.org', address: '1213 E Phillip Ave', leadership: 'Lead Pastor: Rev. Ty K. Woznek' },
    note: `Verified individually 2026-08-04. **Rev. Ty Woznek** has been lead pastor since **May 2021**; he maintains a personal professional site (twoznek.com) alongside the church's. One of **four Norfolk congregations** on the signatory roster, with LifePoint, One Hope Fellowship and First Baptist.\n\n${NOT_Q}`,
  },
  { id: 4297, stances: TRAD,
    also: { website: 'https://www.lifepointne.com', leadership: 'Missions Pastor: James McClenahan' },
    note: `Verified individually 2026-08-04. **This row was created named "Missions Pastor"** — a job title, not a church — by the import parser, and was repaired to LifePoint Church, Norfolk earlier this week.

**A note on the office:** the signatory list records **James McClenahan** as Missions Pastor, and he appears as a speaker in the church's sermon archive; the congregation separately announced him as **Family Discipleship Pastor**. Both titles are recorded rather than choosing between them — he is a staff pastor, not the senior minister, which is the fourth such case in this queue.

${NOT_Q}`,
  },
  { id: 4311, stances: TRAD,
    also: { website: 'https://www.mycalvary.org', address: '3941 North 10th Street',
      leadership: 'Signatories: Shane Sundermann (Family Life Pastor & Facilities Director) and Steve Davenport' },
    note: `Verified individually 2026-08-04. **A leadership correction, the fourth of its kind in this queue.** **Shane Sundermann is the Family Life Pastor and Facilities Director**, not the senior minister — he began attending at ten years old, took his degree at **Calvary Bible College in Kansas City**, and has served as children's pastor since 2000, overseeing Kid City from birth through elementary. The row had recorded him and Steve Davenport as "Pastors" without qualification.

**Two of this congregation's staff signed**, which is unusual on the roster. The church holds **Sunday services in both English and Spanish** and runs AWANA.

${NOT_Q}`,
  },
  { id: 4241, stances: TRAD,
    also: { denomination: 'Converge', website: 'http://www.arbordrive.org', address: '1527 N Blackburn Ave', leadership: 'Signatory: Jon Hawkins' },
    note: `Verified individually 2026-08-04. A **Converge** (Baptist General Conference) congregation serving York County; publishes to YouTube.

**Gender deliberately not set** — Converge leaves women in pastoral ministry to the local church, as with Stromsburg Baptist and Calvary Cambridge in the Baptist cluster. Directory listings also name a Brad Johnson in connection with the pulpit; **Jon Hawkins** is recorded here as the signatory rather than asserted as senior pastor, since the roster establishes only the former.

${NOT_Q}`,
  },
  { id: 4312, stances: TRAD,
    also: { denomination: 'Converge Heartland', website: 'https://heightschurchelkhorn.org', address: '20230 Hopper St', leadership: 'Lead Pastor: Neal Kloster' },
    note: `Verified individually 2026-08-04. **Converge Heartland**. **Neal Kloster** came to Elkhorn in **2016** as lead pastor. The congregation's Facebook handle is still *osbcelkhorn*, a remnant of a former name — the same kind of legacy artefact seen at O'Neill Methodist, and noted rather than treated as evidence of present affiliation.

**Gender deliberately not set** — Converge leaves the question to the local church.

${NOT_Q}`,
  },
  { id: 4247, stances: TRAD,
    also: { denomination: 'Christian and Missionary Alliance (C&MA)', website: 'https://cucstratton4.wixsite.com/home', leadership: 'Pastor: Larry Unruh' },
    note: `Verified individually 2026-08-04. Despite the name, this congregation is associated with the **Christian and Missionary Alliance** — a denomination, not an independent "union" church, which is what the name suggests. Pastor **Larry Unruh**.

**Gender deliberately not set:** the C&MA's practice regarding women and the pastoral title has changed in recent years and is not uniform, so it cannot be defaulted the way the SBC or a confessional body can.

${NOT_Q}`,
  },
  { id: 4227, stances: TRAD,
    also: { denomination: 'NorthRidge Network (multi-site)', website: 'https://northridgenetwork.org/peru', leadership: 'Campus Pastor: Daniel Hutchison' },
    note: `Verified individually 2026-08-04. **Not a standalone congregation — a campus.** NorthRidge Peru is one location of the **NorthRidge Network**, a multi-site church. **Daniel Hutchison** and his wife Rebekah have lived in Peru since **2021**.

This matters for how the roster is counted: a multi-site campus signature reflects a network's posture as much as a single congregation's, and the network's other campuses are not on file. **Flagged for the deep-dive queue.**

${NOT_Q}`,
  },
  { id: 4305, stances: AB,
    also: { website: 'https://www.wpfamilyworship.com', leadership: 'Pastors: Aaron and Sara Trimble' },
    note: `Verified individually 2026-08-04. A **non-denominational** congregation that Aaron Trimble founded in West Point; the local paper covered its establishment under the headline "Establishing non-denominational church in West Point 'just tip of iceberg' for pastor." He graduated from the **UNL College of Journalism** in August 2000, and the Trimbles live in rural Wisner.

**Gender deliberately NOT set, and this one is important: Aaron pastors the church together with his wife Sara.** A co-pastoring husband-and-wife model is not complementarian in the sense the other clusters use the term, and defaulting it here would have been plainly wrong.

Sexuality and eschatology also left unset — no binding confession, no published statement.

${NOT_Q}`,
  },
  { id: 4254, stances: AB,
    also: { website: 'https://truenorthgi.com', leadership: 'Pastor: Rev. Paul D. Canady' },
    note: `Verified individually 2026-08-04. **A church plant of 2016** — the congregation's own account is that "early in 2016, God put together several families through a shared experience and began to excite their hearts about the possibility of starting a ministry"; the *Grand Island Independent* covered it under "New G.I. church came together quickly." Non-denominational, under **Rev. Paul D. Canady**.

${NO_BODY}

${NOT_Q}`,
  },
  { id: 4263, stances: AB,
    also: { website: 'https://gracepointogallala.org', leadership: 'Head Pastor: Curtis Tschetter' },
    note: `Verified individually 2026-08-04. Non-denominational. **Curtis Tschetter has been head pastor since November 1992 — over thirty-three years, the longest single-church tenure in this queue.** He has appeared on KSLT Christian radio.

One of two Ogallala congregations on the roster, with New Hope Church. (Note also **Samuel Tschetter** at Stromsburg Baptist — the surname recurs on the roster, a possible family connection not established here.)

${NO_BODY}

${NOT_Q}`,
  },
  { id: 4339, stances: AB,
    also: { website: null, address: '41196 Hwy 40', leadership: 'Pastor: Lee E. Wonch' },
    note: `Verified individually 2026-08-04. **A genuinely remote country church** — non-denominational, at 41196 Highway 40, described in local directories as eleven miles south of Arnold on Highway 40 and then two miles east. Sunday School 9:45, worship 10:45.

Served by **Lee E. Wonch** together with **Amazing Grace Church in Thedford** — a two-point charge spanning **Custer and Thomas Counties**, added to the directory on 2026-07-31 when eight such multi-church signatory entries were recovered from the source document.

${NO_BODY}

${NOT_Q}`,
  },
  { id: 4340, stances: AB, also: { leadership: 'Pastor: Lee E. Wonch' },
    note: `Verified individually 2026-08-04. Thedford is the seat of **Thomas County**, one of the least populous counties in Nebraska, and no independent web presence for this congregation could be found — the record rests on the signatory document and the pairing with Tallin Church.

Served by **Lee E. Wonch** alongside Tallin Church (Gothenburg), the two forming a charge across Custer and Thomas Counties.

${NO_BODY}

${NOT_Q}`,
  },
  { id: 4329, stances: AB, also: { leadership: 'Pastor: Gregory Lawhorn' },
    note: `Verified individually 2026-08-04. Served by **Gregory Lawhorn** together with **Community of Believers Church in Creighton** — a two-point charge across **Madison and Knox Counties**, recovered from the source document on 2026-07-31. One of four Norfolk congregations on the roster.\n\n${NO_BODY}\n\n${NOT_Q}` },
  { id: 4330, stances: AB, also: { leadership: 'Pastor: Gregory Lawhorn' },
    note: `Verified individually 2026-08-04. Served by **Gregory Lawhorn** alongside **One Hope Fellowship in Norfolk**, the two forming a charge across Knox and Madison Counties.\n\n${NO_BODY}\n\n${NOT_Q}` },
  { id: 4304, stances: AB, also: { leadership: 'Pastor: Tony Tangwall' },
    note: `Verified individually 2026-08-04. Pastor **Tony Tangwall**, in Dawes County. The name suggests a charismatic or Word-of-Faith orientation, but **no statement was found to confirm it and none is recorded** — one of two Chadron congregations on the roster, with Ridgeview Bible Church.\n\n${NO_BODY}\n\n${NOT_Q}` },
  { id: 4307, stances: AB, also: { leadership: 'Pastor/Elder: Doug Hitzel' },
    note: `Verified individually 2026-08-04. **Doug Hitzel** signs as **Pastor/Elder**, a plural-eldership formulation, in Nemaha County. No independent web presence was found beyond directory listings.\n\n${NO_BODY}\n\n${NOT_Q}` },
  { id: 4255, stances: AB, also: { address: '524 5th St', leadership: 'Pastor: Luke Veldt' },
    note: `Verified individually 2026-08-04. Pastor **Luke Veldt**; worship Sundays at 10:00. One of two Fairbury congregations on the roster, with Zion Countryside Church.\n\n${NO_BODY}\n\n${NOT_Q}` },
  { id: 4237, stances: AB, also: { leadership: 'Pastor: Keith Feisel' },
    note: `Verified individually 2026-08-04. Described in local listings as "a **small country church in a rural setting** in the southeast corner of Nebraska." Pastor **Keith Feisel**. One of two Fairbury congregations on the roster.\n\n${NO_BODY}\n\n${NOT_Q}` },
  { id: 4261, stances: AB, also: { website: 'https://www.christthekingponca.com', leadership: 'Pastor: Jeff Peters' },
    note: `Verified individually 2026-08-04. States its aim "according to the **Great Commission** to bring people into a personal relationship with Jesus Christ" — a mission framed entirely in terms of evangelism and discipleship, with no civil-sphere component. Pastor **Jeff Peters**.\n\n${NO_BODY}\n\n${NOT_Q}` },
  { id: 4232, stances: AB, also: { leadership: 'Pastor: Kevin Hausman' },
    note: `Verified individually 2026-08-04. Pastor **Kevin Hausman**, in Scotia — the church takes its name from the **Chalk Hills**, the local limestone formations. Public footprint limited to a Facebook page and directory listings.\n\n${NO_BODY}\n\n${NOT_Q}` },
  { id: 4269, stances: AB, also: { leadership: 'Pastor: Brent DeJong' },
    note: `Verified individually 2026-08-04. Pastor **Brent DeJong**. One of two Chappell congregations on the roster, with Chappell Methodist Church. No independent web presence was found.\n\n${NO_BODY}\n\n${NOT_Q}` },
  { id: 4309, stances: AB, also: { leadership: 'Pastor: Jim Bates' },
    note: `Verified individually 2026-08-04. Pastor **Jim Bates**. One of **four Columbus congregations** on the roster, with Columbus Berean, Shell Creek Baptist, North Park and Columbus First Baptist — making Columbus, with Gothenburg, one of the two most heavily represented towns. No independent web presence was found.\n\n${NO_BODY}\n\n${NOT_Q}` },
  { id: 4222, stances: AB, also: { leadership: 'Pastor: John Goodell' },
    note: `Verified individually 2026-08-04. Pastor **John Goodell**, in Grant, Perkins County. No independent web presence was found beyond directory listings.\n\n${NO_BODY}\n\n${NOT_Q}` },
  { id: 4272, stances: AB, also: { leadership: 'Pastor: Matt Waitley' },
    note: `Verified individually 2026-08-04. Pastor **Matt Waitley**. One of two Ogallala congregations on the roster, with GracePoint. Searches returned no independent presence for this congregation distinct from similarly named churches elsewhere, and **nothing was recorded on that basis** — a negative result, stated rather than guessed at.\n\n${NO_BODY}\n\n${NOT_Q}` },
  { id: 4274, stances: AB, also: { leadership: 'Pastor: Brian Keene' },
    note: `Verified individually 2026-08-04. Pastor **Brian Keene**, Beaver Crossing, Seward County. No independent web presence was found.\n\n${NO_BODY}\n\n${NOT_Q}` },
  { id: 4231, stances: AB, also: { leadership: 'Pastor: Dale Bowlin' },
    note: `Verified individually 2026-08-04. Pastor **Dale Bowlin**, in Cody — a village of under 150 in **Cherry County**, the largest county in Nebraska by area and one of the emptiest. No independent web presence was found, which is unsurprising at that scale and is recorded as such.\n\n${NO_BODY}\n\n${NOT_Q}` },
  { id: 4259, stances: AB, also: { leadership: 'Pastor: Trent Fugitt' },
    note: `Verified individually 2026-08-04. Pastor **Trent Fugitt**, at Ellsworth — an unincorporated Sandhills community in Sheridan County, and with Gandy among the smallest places represented on the entire roster. No independent web presence was found.\n\n${NO_BODY}\n\n${NOT_Q}` },
  { id: 4266, stances: AB, also: {},
    note: `Note added 2026-08-04: see the Bible Church cluster entry above. Retained in the final pass only to confirm the record was cleared.` },
]

async function main() {
  for (const r of ROWS) {
    const before = await prisma.church.findUnique({ where: { id: r.id } })
    if (!before) { console.log(`  #${r.id} NOT FOUND`); continue }
    const also: Record<string, unknown> = { ...(r.also || {}) }
    if (also.website === null) delete also.website
    const changed = await updateStances(prisma, r.id, (r.stances || {}) as never, {
      actor: ACTOR,
      note: 'Individually verified. Most of this group belongs to no body that binds gender, sexuality or eschatology, so those are left unset rather than assumed.',
      alsoSet: {
        ...also,
        stanceBasis: 'evidenced',
        researchStatus: 'researched',
        recordFlag: null,
        lastResearchedAt: new Date(),
        researchNote: '2026-08-04: individually verified to the full research standard. Final Nebraska community/non-denominational pass.',
        theologicalNotes: `${before.theologicalNotes || ''}\n\n---\n\n${r.note}`,
        sourceUrls: [before.sourceUrls, also.website].filter(Boolean).join(';'),
      },
    })
    console.log(`  #${r.id} ${before.name} (${before.city}) — verified; changed: ${changed.join(', ') || 'none'}`)
  }
  const left = await prisma.church.count({ where: { recordFlag: { contains: 'signature_only' } } })
  const c = (v: string) => prisma.church.count({ where: { approved: true, culturalEngagement: v } })
  console.log(`\n=== signature_only remaining: ${left} ===`)
  console.log(`qualifying: ${await c('transformationalist')}   single_issue: ${await c('single_issue')}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
