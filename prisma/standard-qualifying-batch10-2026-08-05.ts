// Batch 10 of the 92.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'standard-qualifying-batch10-2026-08-05.ts'
const STANDARD = 'site, church socials, the pastor’s own output, and the pastor’s name searched against each of the six markers'

const ROWS: Array<{ id: number; note: string; flag?: boolean; also?: Record<string, unknown> }> = [
  {
    id: 252,
    also: {
      leadership: 'Pastor: Anthony Mathenia (since 2011)',
      recordFlag: 'denom_ambiguous',
      notablePeople: 'Anthony Mathenia — pastor since 2011; a Reformed Baptist pastor and missionary affiliated with the HeartCry Missionary Society, a board member of Media Gratiae, and an author with G3 Ministries. Has spoken publicly on moving "from Africa to the abortion clinic."',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED, with a denominational question raised.**

**Anthony Mathenia** has pastored here since **2011**. His institutional life runs through the Reformed Baptist and missions world rather than the CREC:

- a **Reformed Baptist pastor and missionary with the HeartCry Missionary Society** (Paul Washer's organisation);
- a **board member of Media Gratiae**;
- an author with **G3 Ministries**;
- interviewed on the **Church and Family Life** podcast — the NCFIC network, which keeps recurring across this research.

**The confirming evidence is abortion-clinic ministry**: ABWE published his account under the title **"From Africa to the Abortion Clinic: Anthony Mathenia Speaks"** — a missionary who came home to stand at the clinic.

**The denominational question:** this row records the church as **CREC**, but nothing found associates Mathenia or the congregation with the CREC, and his affiliations are consistently Reformed Baptist. **Flagged \`denom_ambiguous\` rather than changed** — the church's own site (christchur.ch) should settle it.`,
  },
  {
    id: 4060,
    also: {
      leadership: 'Senior Pastor: Sam Jones',
      notablePeople: 'Sam Jones — senior pastor; best known for teaching on the four spheres of delegated government and for being "a voice for the pre-born." A confirmed signatory of the Iowa pastors\' equal-protection statement.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED, and the teaching subject is itself the marker.**

**Sam Jones** is described as best known for two things: **his teaching on the four spheres of delegated government**, and **being "a voice for the pre-born."**

**Sphere doctrine is the point.** Teaching that God delegates distinct authority to self, family, church and state — each limited, none absolute — is the Kuyperian and Reconstructionist framework for the church addressing the civil order without collapsing into it. **A pastor whose best-known teaching is a theology of delegated government is contending about the state by definition**, and it is the intellectual substructure of everything else in this directory.

He is separately a **confirmed signatory of the Iowa pastors' equal-protection statement**, already on this record. Confirmed.`,
  },
  {
    id: 2916,
    also: {
      leadership: 'Pastor: Gabriel Render',
      notablePeople: 'Gabriel Render — pastor; M.T.S. in Historical Theology from Reformed Baptist Seminary; an author at TruthScript and a recurring co-host of the "It\'s Time for Truth" podcast with Pastor Danny Steinmeyer, a ministry of Truth Family Bible Church, Middleton, Idaho. He and his wife Christa have five children.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED.**

**Gabriel Render** holds an **M.T.S. in Historical Theology from Reformed Baptist Seminary** and is a published author at **TruthScript** — the same outlet that carries Joseph Spurgeon and Zachary Garris, both also in this directory. He is a **recurring co-host of "It's Time for Truth,"** a podcast ministry of Truth Family Bible Church in Middleton, Idaho.

**The TruthScript cluster is worth noting as a network in its own right:** three qualifying churches in this directory now have pastors publishing there, in Idaho, Indiana and New Mexico. Confirmed.`,
  },
  { id: 1383, flag: true,
    also: { leadership: 'Senior Pastor: Clint Eberspacher (called August 2024)' },
    note: `**Standard applied 2026-08-05** — ${STANDARD}.

**Clint Eberspacher** was called as senior pastor in **August 2024** — a recent arrival, which limits what a public record could show. The church is **listed in The Gospel Coalition's Nebraska directory** and publishes a sermon podcast.

**Nothing found on any of the six markers.** Left qualifying but flagged \`verify_stance\`. **Worth revisiting in a year**: a pastorate under two years old has not had time to leave the kind of trace this research looks for, and the previous minister (Kyle McClellan) may be the relevant figure for anything the row was originally classified on.` },
  { id: 4053, flag: true,
    also: { leadership: 'Pastor: Bryan Carver' },
    note: `**Standard applied 2026-08-05** — ${STANDARD}.

Almost nothing is publicly available. **Bryan Carver** is described only as "a Bible teaching preacher, verse by verse, line by line" — and that description comes from a **review listing**, not from the church. The congregation maintains a YouTube channel and a Facebook page; its site describes it as "a vertical" ministry.

**Nothing found on any of the six markers.** Left qualifying but flagged \`verify_stance\`, with the thinness stated: this row rests on the Abolitionists Rising listing and a verse-by-verse preaching description.` },
]

async function main() {
  for (const r of ROWS) {
    const c = await prisma.church.findUnique({ where: { id: r.id } })
    if (!c) { console.log(`  #${r.id} NOT FOUND`); continue }
    const flags = (c.recordFlag || '').split(';').map(s => s.trim()).filter(Boolean)
    if (r.flag && !flags.includes('verify_stance')) flags.push('verify_stance')
    for (const extra of ((r.also?.recordFlag as string) || '').split(';').filter(Boolean)) {
      if (!flags.includes(extra)) flags.push(extra)
    }
    const also = { ...(r.also || {}) }; delete (also as any).recordFlag
    await updateStances(prisma, r.id, {} as never, {
      actor: ACTOR,
      note: 'Full standard applied to a qualifying row that had never been individually researched.',
      alsoSet: {
        ...also,
        recordFlag: flags.length ? flags.join(';') : null,
        ...(r.flag ? {} : { stanceBasis: 'evidenced' }),
        researchStatus: 'researched',
        lastResearchedAt: new Date(),
        researchNote: `2026-08-05: FULL standard applied — ${STANDARD}. ${r.flag ? 'Nothing found on any marker; left qualifying but flagged.' : 'Qualification confirmed.'}`,
        theologicalNotes: `${c.theologicalNotes || ''}\n\n---\n\n${r.note}`,
      },
    })
    console.log(`  #${r.id} ${c.name} — ${r.flag ? 'flagged' : 'CONFIRMED'}`)
  }
  const done = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist', researchNote: { contains: 'FULL standard applied' } } })
  const tot = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist' } })
  console.log(`\nqualifying with FULL standard applied: ${done} of ${tot}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
