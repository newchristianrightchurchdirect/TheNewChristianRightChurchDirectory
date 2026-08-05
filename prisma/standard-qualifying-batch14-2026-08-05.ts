// Batch 14 of the 92. Resolves the Kendall Lankford question raised in batch 13, and records a
// third instance of the public-library pattern.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'standard-qualifying-batch14-2026-08-05.ts'
const STANDARD = 'site, church socials, the pastor’s own output, and the pastor’s name searched against each of the six markers'

const ROWS: Array<{ id: number; note: string; stances?: Record<string, string>; also?: Record<string, unknown> }> = [
  {
    id: 24,
    stances: { christianNationalism: 'sympathetic' },
    also: {
      leadership: 'Senior/Teaching Pastor: Kendall Lankford (lead planter; church founded 2019)',
      notablePeople: 'Kendall Lankford — lead planter and senior pastor; trained at Gordon-Conwell Theological Seminary and previously pastored Christ Church of Livingston County, Howell, Michigan. Hosts The PRODCAST; writes for Kuyperian Commentary. Ran a "Pastor Story Hour" at a public library, which the library initially cancelled — he responded publicly that faith belongs in the public square, covered by Fox News.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED, and it resolves a question raised earlier today.**

**The question, now answered:** batch 13 flagged that a Kendall Lankford appeared as pastor of both this church and **Christ Church of Livingston County, Howell MI (#51)**, and declined to link two qualifying churches on a coincidence of names. **It is the same man.** He **previously pastored Christ Church of Livingston County** and is now senior pastor here, having planted this congregation in **2019**. He trained at **Gordon-Conwell Theological Seminary**.

**The confirming evidence is a third instance of a pattern this research has been tracking all day.**

The church ran a **"Pastor Story Hour" at a public library**. The library **changed its mind about hosting it**, and Lankford took the argument public — **Fox News** carried his response under the line that **faith belongs in the public square**.

**That is now the third qualifying church found engaging its town library**, after Sacha Walicord in Orange City and Paul Thompson in Twin Falls — and it is the most interesting of the three, because it is not a protest against library content but an attempt to *occupy* the institution on the same terms as anyone else. Christian nationalism recorded as **sympathetic** on that public argument.

He also hosts **The PRODCAST** and writes for **Kuyperian Commentary**. CREC, five of six markers. Confirmed.`,
  },
  {
    id: 51,
    also: {
      leadership: 'Pastor: NOT CURRENT — Kendall Lankford left for The Shepherd\'s Church, Chelmsford MA; present minister not established',
      recordFlag: 'verify_stance;pastor_vacant',
    },
    note: `**CORRECTED 2026-08-05 — the leadership recorded here is stale, and the man named has moved.**

Batch 13 identified **Kendall Lankford** as pastor of this congregation from third-party sources. Following it up: **he previously pastored here and now leads The Shepherd's Church in Chelmsford, Massachusetts (#24 in this directory), which he planted in 2019.**

**So this row's pastor field described a man who left for another state.** The present minister of Christ Church of Livingston County **could not be established**, and the row is flagged \`pastor_vacant\` and \`verify_stance\` accordingly.

**This is the third stale-leadership finding today** — after Los Angeles RPC (Nathan Eshelman, departed 2021) and Crossroad Earlham (elder David Koch, deceased 2025) — and together with the postmillennial directory's seven-of-eight failure rate it makes the case for a **systematic sweep of the \`leadership\` field across the whole directory**, which has been queued.

The congregation itself remains real and CREC, begun as a mission church in **2003**, currently meeting Sundays at 11:30 in space at Ascend Church, Howell, and listed on the **Church and Family Life** network.`,
  },
  {
    id: 46,
    stances: { christianNationalism: 'affirm' },
    also: {
      leadership: 'Pastor: Rev. Michael Shover (since May 2018)',
      notablePeople: 'Michael Shover — pastor since May 2018. A clip of one of his sermons circulated widely in which he argues that the First Amendment is an idol that needs to be cleared away; the episode was covered critically by The Roys Report and defended by American Reformer as "The Anatomy of a Cancellation Attempt."',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED, and the position is unusually explicit.**

**Rev. Michael Shover** came to Christ the Redeemer in **May 2018**. A thirty-second clip of one of his sermons circulated widely on social media, in which **he argues that the First Amendment is an idol that needs to be cleared away.**

**That is about as direct a statement of the position as this directory will find.** Most churches here are classified on what they *do* — a signature, a rally, a school. This is a pastor making an explicit theological claim about the American constitutional settlement itself, from the pulpit, and being reported for it.

The episode was covered critically by **The Roys Report** ("Is the First Amendment Idolatrous?") and defended by **American Reformer** under the title "The Anatomy of a Cancellation Attempt" — the two responses together being a fair map of where this argument sits in current Reformed debate.

**Christian nationalism recorded as \`affirm\` rather than sympathetic.** Arguing that the First Amendment is an idol is not sympathy with a position; it is the position. CREC; five of six markers. Confirmed.`,
  },
  {
    id: 2355,
    also: {
      leadership: 'Pastor: Paul M. Viggiano (since 1990)',
      notablePeople: 'Paul M. Viggiano — pastor since 1990; the congregation was received into the Orthodox Presbyterian Church by the Presbytery of Southern California on 20 July 2003. Previously a youth pastor at St. Andrew\'s Presbyterian Church (PCUSA) and on staff with Athletes in Action, the athletic outreach of Campus Crusade for Christ.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED.**

**Paul M. Viggiano** has pastored Branch of Hope since **1990** — thirty-five years — and led the congregation into the **Orthodox Presbyterian Church**, where it was received by the **Presbytery of Southern California on 20 July 2003**, with Michael Stingley giving the charge.

His route into Reformed ministry is worth recording because it is unusual for this list: he came from **youth ministry at a PCUSA congregation** and before that from **Athletes in Action**, Campus Crusade's athletic outreach — mainline and parachurch evangelicalism rather than the confessional Reformed world he now serves in.

He maintains a substantial sermon archive on SermonAudio. Confirmed.`,
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
    await updateStances(prisma, r.id, (r.stances || {}) as never, {
      actor: ACTOR,
      note: 'Full standard applied; Kendall Lankford question resolved across two rows.',
      alsoSet: {
        ...also,
        recordFlag: flags.length ? flags.join(';') : null,
        stanceBasis: 'evidenced',
        researchStatus: 'researched',
        lastResearchedAt: new Date(),
        researchNote: `2026-08-05: FULL standard applied — ${STANDARD}. ${r.id === 51 ? 'Leadership found STALE; flagged.' : 'Qualification confirmed.'}`,
        theologicalNotes: `${c.theologicalNotes || ''}\n\n---\n\n${r.note}`,
      },
    })
    console.log(`  #${r.id} ${c.name} — ${r.id === 51 ? 'STALE LEADERSHIP, corrected' : 'CONFIRMED'}`)
  }
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
