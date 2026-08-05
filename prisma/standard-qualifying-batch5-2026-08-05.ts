// Batch 5 of the 92, plus a duplicate found while working: Mercy Seat Christian Church is on file
// twice — once under Milwaukee and once under Hartland — both Matthew Trewhella's congregation.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'standard-qualifying-batch5-2026-08-05.ts'
const STANDARD = 'site, church socials, the pastor’s own output, and the pastor’s name searched against each of the six markers'

const ROWS: Array<{ id: number; note: string; also?: Record<string, unknown> }> = [
  {
    id: 3241,
    also: {
      leadership: 'Pastor: Rev. Rusty Thomas (founder); Elder: Jason Storms',
      notablePeople: 'Rusty Thomas — founding pastor; National Director of Operation Save America, having succeeded Flip Benham, and the man who moved OSA\'s headquarters to Dallas in 2014. Jason Storms — elder here and the current National Director of Operation Save America, formerly OSA campus leader and Assistant Director under Thomas; a street, campus and open-air evangelist.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED, and this congregation is unusual: it houses the leadership of a national organisation.**

**Rev. Rusty Thomas** founded this church — its first service was **29 October 2023** — and he is the **National Director of Operation Save America**, having succeeded **Flip Benham** and moved OSA's headquarters to Dallas in 2014.

**Jason Storms**, an **elder of this congregation**, is the **current National Director of Operation Save America**. He came up through OSA as campus leader and then Assistant Director under Thomas, and works as a street, campus and open-air evangelist.

**So both the former and the current national director of OSA are officers of this church.** That is not a congregation sympathetic to a movement — it is a movement's headquarters constituted as a church. Confirmed.`,
  },
  {
    id: 4064,
    also: {
      leadership: 'Pastor: Ken Peters (with Valencia Peters)',
      notablePeople: 'Ken Peters — founder of The Church at Planned Parenthood (TCAPP), begun outside the Spokane Planned Parenthood in October 2018, and of the Patriot Church movement, whose first congregation he planted in Knoxville/Lenoir City in September 2020. Previously founded Covenant Church, Spokane (1998, beginning in a Super 8 Motel) and Covenant Christian School in Spokane and Moses Lake, serving the area 21 years.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED on a record of founding institutions.**

**Ken Peters** began **The Church at Planned Parenthood (TCAPP)** in **October 2018**, holding monthly worship services on the lawn outside the Spokane Planned Parenthood. He then founded the **Patriot Church** movement, planting its first congregation in **Knoxville/Lenoir City in September 2020**, and established a **TCAPP in Tennessee that meets across the street from Knoxville's Planned Parenthood**, holding its first service on 29 December 2020.

Before that he and his wife Valencia started **Covenant Church, Spokane in 1998** — beginning in a Super 8 Motel with his wife and parents — and founded **Covenant Christian School** in both Spokane and Moses Lake, serving the area for twenty-one years.

**Three kinds of institution founded: a church-planting movement, schools, and a form of protest-worship staged at abortion facilities.** Confirmed.

*(Note for the record: Peters and TCAPP have drawn significant national press coverage, some of it hostile, including in connection with a Knoxville Planned Parenthood arson he denied any part in. That coverage is noted as existing and is not summarised or relied on here.)*`,
  },
  {
    id: 64,
    also: {
      leadership: 'Pastor: Andrew Isker (founded 2025)',
      notablePeople: 'Andrew Isker — pastor; co-author with Gab founder Andrew Torba of Christian Nationalism: A Biblical Guide For Taking Dominion and Discipling Nations, and author of The Boniface Option: A Strategy For Christian Counteroffensive in a Post-Christian Nation. Relocated from Minnesota to Tennessee to plant this congregation; writes at the Boniface Option Substack.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED.**

**Andrew Isker** relocated from Minnesota to Jackson County, Tennessee to plant this congregation in **2025**; it currently meets on an invite-only basis during its start-up phase.

He is **co-author, with Gab founder Andrew Torba, of *Christian Nationalism: A Biblical Guide For Taking Dominion and Discipling Nations***, and author of ***The Boniface Option: A Strategy For Christian Counteroffensive in a Post-Christian Nation***. He publishes at the Boniface Option Substack.

**A pastor who has co-written the movement's explicit manual on taking dominion and discipling nations is a principal in it.** The church has also drawn national coverage in connection with a developer building a residential religious community in the same Tennessee hills — reported by Religion News Service and Word&Way, noted here as context rather than assessed.

Confirmed. Note the church is very young: any judgement about its congregational life, as opposed to its pastor's programme, should wait.`,
  },
  {
    id: 1429,
    also: {
      website: 'https://www.brycepresbyterian.org',
      leadership: 'Pastor: Zachary Garris',
      notablePeople: 'Zachary Garris — pastor; author of Masculine Christianity and Thinking Biblically About Education, and editor of Dabney on Fire: A Theology of Parenting, Education, Feminism, and Government. Writes for American Reformer and TruthScript, runs Teach Diligently, and holds an M.Div. from RTS Jackson and a J.D. from Wayne State.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED, with a website correction.**

**The correction:** the row carried \`bapca.org\`; the church's own site is **brycepresbyterian.org**. Sources also place the congregation in **White Rock**, a community within Los Alamos County — the recorded city is close enough to stand, but worth knowing.

**Zachary Garris** is a lawyer as well as a minister — **M.Div. from RTS Jackson and a J.D. from Wayne State** — and his published work is directly on the directory's markers:

- ***Masculine Christianity*** — on the feminisation of the church, the patriarchy marker in book form;
- ***Thinking Biblically About Education***, and he runs **Teach Diligently**;
- editor of ***Dabney on Fire: A Theology of Parenting, Education, Feminism, and Government***.

He writes for **American Reformer** and **TruthScript**, and is listed among the authors carried by **Church and Family Life** — the NCFIC network that has now surfaced repeatedly in this research.

Confirmed on his own published corpus.`,
  },
]

async function main() {
  for (const r of ROWS) {
    const c = await prisma.church.findUnique({ where: { id: r.id } })
    if (!c) { console.log(`  #${r.id} NOT FOUND`); continue }
    await updateStances(prisma, r.id, {} as never, {
      actor: ACTOR,
      note: 'Full standard applied to a qualifying row that had never been individually researched.',
      alsoSet: {
        ...(r.also || {}),
        stanceBasis: 'evidenced',
        researchStatus: 'researched',
        lastResearchedAt: new Date(),
        researchNote: `2026-08-05: FULL standard applied — ${STANDARD}. Qualification confirmed on the pastor's own public record.`,
        theologicalNotes: `${c.theologicalNotes || ''}\n\n---\n\n${r.note}`,
      },
    })
    console.log(`  #${r.id} ${c.name} — CONFIRMED`)
  }

  // ---- duplicate: Mercy Seat is on file twice ----
  const survivor = await prisma.church.findUnique({ where: { id: 4220 } })   // Hartland, richer record
  const dupe = await prisma.church.findUnique({ where: { id: 3240 } })       // Milwaukee
  if (survivor && dupe && !dupe.recordFlag?.includes('duplicate_of')) {
    await prisma.church.update({
      where: { id: 4220 },
      data: {
        website: dupe.website || survivor.website,
        theologicalNotes: `${survivor.theologicalNotes || ''}\n\n---\n\n**Merged from a duplicate record 2026-08-05.** Row **#3240** held the same congregation under **Milwaukee** rather than Hartland — Hartland is a Milwaukee suburb and both rows named **Matthew Trewhella** as pastor. The duplicate carried the working website (**mercyseat.net**) and the founding year **1989**, both merged here. #3240 is held under a duplicate flag rather than deleted.`,
      },
    })
    await prisma.church.update({
      where: { id: 3240 },
      data: {
        recordFlag: 'duplicate_of:4220',
        culturalEngagement: 'unknown',
        theologicalNotes: `${dupe.theologicalNotes || ''}\n\n---\n\n**DUPLICATE, flagged 2026-08-05.** The same congregation as **#4220 Mercy Seat Christian Church, Hartland WI** — Matthew Trewhella's church, Hartland being a Milwaukee suburb. **#4220 is the record to use**; anything unique here has been merged into it. Found while applying the research standard to the qualifying list, which is how a duplicate that had survived every earlier dedup pass finally surfaced: **both rows were researched, and the research matched.**`,
      },
    })
    await prisma.stanceChange.create({
      data: { churchId: 3240, churchName: dupe.name, field: 'recordFlag', oldValue: dupe.recordFlag,
              newValue: 'duplicate_of:4220', actor: ACTOR,
              note: 'Same congregation as #4220 (Hartland/Milwaukee); merged and held.' },
    })
    console.log('  #3240 Mercy Seat (Milwaukee) — merged into #4220 and held as duplicate')
  }

  const t = async (v: string) => `${v}=${await prisma.church.count({ where: { approved: true, culturalEngagement: v } })}`
  console.log(`\n${await t('transformationalist')}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
