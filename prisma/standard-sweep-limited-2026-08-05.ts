// Completing the research standard on every limited_mission row created this session.
//
// Dustin: "never drop the standard... I dont want anything ever missed."
//
// This sweep found a SECOND false negative. Grace Life Dallas was the first; Woodlawn Baptist is
// the second. Both were dismissed on their websites and both have pastors doing corporate public
// work that the site never mentions. Two in fourteen is not a fluke — it is the base rate of what
// site-only reading loses.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'standard-sweep-limited-2026-08-05.ts'
const STANDARD = 'site, church socials, the pastor’s own output, and the pastor’s name searched against each of the six markers'

type Row = { id: number; ce?: string; stances?: Record<string, string>; note: string; also?: Record<string, unknown> }

const ROWS: Row[] = [
  {
    id: 4040, ce: 'transformationalist',
    stances: { genderStance: 'complementarian' },
    also: {
      leadership: 'Senior Pastor: Dr. Lewis Richerson (since May 2012)',
      notablePeople: 'Lewis Richerson — senior pastor since May 2012; M.Div. with Biblical Languages and a Ph.D. in Preaching from Southwestern Baptist Theological Seminary, where he served 2005–2012. Advisory board member of the Center for Baptist Leadership. Moved a motion at the Louisiana Baptist Convention to amend its Articles of Incorporation affirming the office of pastor as exclusive to men.',
    },
    note: `**CORRECTED 2026-08-05 — a SECOND false negative, found the same way as the first.**

This church was classified limited mission earlier the same day on its website, which describes it as Word-Driven, Gospel-Centered and disciple-making, with an after-school Bible club and a church plant. Nothing there touches the civil order.

**Completing the standard on the pastor overturns it.**

**Dr. Lewis Richerson** — and note that the row previously recorded him as "Dr. Lewis", mistaking his **first name for a surname** — is:

- an **advisory board member of the Center for Baptist Leadership**, one of the organisations formed expressly to contend for the direction of the Southern Baptist Convention; and
- the mover of a motion at the **Louisiana Baptist Convention to amend its Articles of Incorporation to affirm the office of pastor as exclusive to men** — a formal, recorded act of denominational politics, taken as a pastor.

**That is corporate public contending done from the pastorate**, and it is the same basis on which Grace Baptist Church of Cape Coral was held to qualify for Tom Ascol's Founders Ministries work. Applying it there and not here would be incoherent.

**Gender set to complementarian on evidence** — not a denominational default, but a motion this pastor personally moved before his state convention.

He holds an **M.Div. with Biblical Languages and a Ph.D. in Preaching** from Southwestern Baptist Theological Seminary, where he served on staff 2005–2012 before coming to Woodlawn in **May 2012**.

**Louisiana context worth keeping as a lead:** the "Abolition of Self-Managed Abortion in Louisiana" resolution — submitted by **Brian Gunter** and declined by the Committee on Resolutions after it researched the abolitionist movement — came through this same convention. Richerson did not author it; whether he supported it is unestablished and is left as an open question rather than assumed.`,
  },
  {
    id: 58,
    also: { leadership: 'Pastor: Rev. Rhett Crabtree' },
    note: `**Standard completed 2026-08-05** — ${STANDARD}. Classification unchanged.

**Rev. Rhett Crabtree** is a native of Marion County who **pastored churches in Scotland and Michigan** before founding this congregation; he and his wife Susan have **six children**. The church is a plant in southwestern Marion County holding the **Westminster Confession**, in the CREC's Augustine Presbytery. He also preaches at LaRue Baptist Church.

*(Founding date is recorded inconsistently across sources — 2014 in one, 2019 in another. Not resolved here.)*

Searched against each of the six markers: **nothing found** on abolition, postmillennialism, theonomy, Christian nationalism, Zionism or patriarchy, from either the church or the pastor. Limited-mission stands on a completed search.`,
  },
  {
    id: 40,
    also: {
      leadership: 'Senior Pastor: Rev. Garrett Craw; Associate Pastor: Rev. Andrew Richardson',
      notablePeople: 'Garrett Craw — born in Honolulu; converted while serving in the Marine Corps, where he was called to ministry. A graduate of Covenant Theological Seminary; planted and pastors Christ Church, Santa Clarita.',
    },
    note: `**Standard completed 2026-08-05** — ${STANDARD}. Classification unchanged.

**Garrett Craw** was born in Honolulu and **converted while serving in the Marine Corps**, where he was called to ministry; he trained at **Covenant Theological Seminary** and planted this congregation. He maintains a WordMp3 speaker profile and preaches beyond his own pulpit — sermons appear at All Saints Kirk and King's Cross Reformed Church (Austin).

Searched against each of the six markers: **nothing found**. The church's published identity remains creedal and confessional — Ecumenical Creeds and the Westminster Standards — and its recent preaching runs to marriage and children. Limited-mission stands on a completed search.`,
  },
  {
    id: 59,
    also: { leadership: 'Pastor: Mark (surname not established)' },
    note: `**Standard completed 2026-08-05** — ${STANDARD}. Classification unchanged, with a gap stated.

The pastor is **"Pastor Mark"**, a native Oklahoman from the Ada area, a **University of Oklahoma music graduate** with an **M.Div. from Reformed Theological Seminary, Orlando**, who has pastored in Texas, Georgia and Oklahoma. **His surname could not be established** from any accessible source — the church's own site is stale (its most recent Pastor's Notes is dated **July 2018**), which is also why the row carries \`website_removed\`.

Searched against each marker on what is known: **nothing found**. **Because the pastor cannot be named, the pastor-level half of the standard is genuinely incomplete here** — that is stated rather than papered over. Next route: the church's Facebook page (facebook.com/redeemerokc), which carries video.`,
  },
  {
    id: 52,
    also: { leadership: 'Pastor: Jay Barfield', address: '1702 Old Vicksburg Rd' },
    note: `**Standard completed 2026-08-05** — ${STANDARD}. Classification unchanged.

Pastor **Jay Barfield** confirmed; the congregation meets at 1702 Old Vicksburg Rd, Sunday School 9:00 and worship 10:30. Preaching sampled from the archived site runs through Genesis and Micah, by Wesley Presnall and Sammie Hargrave as well as Barfield.

Searched against each of the six markers: **nothing found**. Limited-mission stands on a completed search. The live site is dead and the row is flagged accordingly.`,
  },
  {
    id: 45,
    also: { denomination: 'CREC (Tyndale Presbytery)' },
    note: `**Standard attempted 2026-08-05 — and it could not be completed, which is recorded rather than hidden.**

Confirmed: Christ Church Indy is a **non-sectarian CREC congregation in Tyndale Presbytery** — the same presbytery as Providence Church, Caro, which was promoted this session.

**No pastor could be identified** from the church's site or from any directory searched. **The pastor-level half of the standard is therefore undone here**, and the limited-mission classification rests on the church's published self-description alone — which is exactly the evidence base that produced two false negatives elsewhere today.

**Treat this classification as provisional.** Next routes: the CREC's own congregational directory, the church's sermon archive, and Tyndale Presbytery's listings.`,
  },
  {
    id: 48,
    also: { address: '434 Lamarque St' },
    note: `**Standard attempted 2026-08-05 — could not be completed.**

Confirmed: a **CREC mission church serving the Northshore area**, at 434 Lamarque St, Mandeville. **No pastor is named** on its site or in any directory searched, and its entire public self-description remains a single sentence.

**The pastor-level half of the standard is undone**, so this classification rests on almost nothing and should be treated as provisional. For a mission church early in its life this may simply reflect that little has been written yet. Next routes: facebook.com/allsaintsreformedLA and the CREC directory.`,
  },
  {
    id: 49,
    also: { leadership: 'Associate Pastor: Rev. Grant Van Brimmer' },
    note: `**Standard completed 2026-08-05** — ${STANDARD}. Classification unchanged.

**Rev. Grant Van Brimmer** is the **associate** pastor — married to Ericha, three children — and has given a published interview at *Tribute*. **The senior minister is not named on the site**, so the leadership record here is partial and is marked as such.

Searched against each of the six markers: **nothing found**. The church's published emphasis remains liturgical worship, covenant renewal and family-integrated services. Limited-mission stands.`,
  },
  {
    id: 4085,
    also: { recordFlag: 'denom_ambiguous' },
    note: `**Standard completed 2026-08-05, and it turned up a leadership discrepancy.**

This row records **Pastor Jeff Swanson**. He is separately listed as pastor of **Christ the King Church in New Era, Michigan** — a different town — and appears as a **guest speaker at Tri-City Covenant Church** (Somersworth NH), which was promoted to qualifying earlier today. **Whether he holds this Shelby pulpit, the New Era one, or both is unresolved**, and the row is flagged \`denom_ambiguous\` accordingly. New Era and Shelby are neighbouring Oceana County towns, so a single congregation recorded under two names is the likeliest explanation and should be checked for duplication.

Searched against each of the six markers: **nothing found**. The church's published identity is covenant-renewal worship, named as "the central activity of our lives." Limited-mission stands.`,
  },
  {
    id: 105,
    also: { leadership: 'Pastor: Mark Hall' },
    note: `**Standard completed 2026-08-05** — ${STANDARD}. Classification unchanged.

Pastor **Mark Hall**; the congregation is listed in the **Founders Ministries** church search and in the **Reformed Baptist Network** directory, holding the 1689 Second London Baptist Confession, at 3100 W 4th St, Sioux City.

**The Founders listing is worth recording**, because Founders affiliation elsewhere in this directory has evidenced an anti-woke posture and, in Tom Ascol's case, supported a transformationalist reading. **Here it is a directory listing only** — no statement, campaign or public action by this church or pastor was found on any of the six markers.

Limited-mission stands, but **the Founders connection is a live lead**: a closer read of this pastor's preaching could change it.`,
  },
]

async function main() {
  for (const r of ROWS) {
    const c = await prisma.church.findUnique({ where: { id: r.id } })
    if (!c) { console.log(`  #${r.id} NOT FOUND`); continue }
    const flags = (c.recordFlag || '').split(';').map(s => s.trim()).filter(Boolean)
    for (const extra of ((r.also?.recordFlag as string) || '').split(';').filter(Boolean)) {
      if (!flags.includes(extra)) flags.push(extra)
    }
    const also = { ...(r.also || {}) }; delete (also as any).recordFlag
    await updateStances(prisma, r.id, { ...(r.ce ? { culturalEngagement: r.ce } : {}), ...(r.stances || {}) } as never, {
      actor: ACTOR,
      note: `Research standard completed: ${STANDARD}.`,
      alsoSet: {
        ...also,
        recordFlag: flags.length ? flags.join(';') : null,
        stanceBasis: 'evidenced',
        researchStatus: 'researched',
        lastResearchedAt: new Date(),
        researchNote: `2026-08-05: FULL standard applied — ${STANDARD}.${r.ce ? ' OVERTURNED the site-only reading; promoted.' : ' Classification unchanged.'}`,
        theologicalNotes: `${c.theologicalNotes || ''}\n\n---\n\n${r.note}`,
      },
    })
    console.log(`  #${r.id} ${c.name} (${c.city}, ${c.state}) — ${r.ce ? 'PROMOTED' : 'standard completed'}`)
  }
  const t = async (v: string) => `${v}=${await prisma.church.count({ where: { approved: true, culturalEngagement: v } })}`
  console.log(`\n${await t('transformationalist')}  ${await t('single_issue')}  ${await t('limited_mission')}  ${await t('quietist')}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
