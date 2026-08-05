// Batch 4 of the 92. Four confirmed, two location corrections, and a standing deep-dive item closed.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'standard-qualifying-batch4-2026-08-05.ts'
const STANDARD = 'site, church socials, the pastor’s own output, and the pastor’s name searched against each of the six markers'

const ROWS: Array<{ id: number; note: string; also?: Record<string, unknown> }> = [
  {
    id: 4220,
    also: {
      website: 'https://mercyseat.net',
      leadership: 'Pastor: Matthew J. Trewhella',
      notablePeople: 'Matthew J. Trewhella — pastor; founder of Missionaries to the Preborn (1990), the first Christian mission in America to take the preborn child as its people group. Author of The Doctrine of the Lesser Magistrates, and publisher of the first English translation of the Magdeburg Confession (1550), the document that first formalised that doctrine. B.S. in Theology, Valley Forge Christian College, 1987. Speaks for the John Birch Society on interposition and the lesser magistrates.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED, and this closes a standing deep-dive item.**

"Trewhella / lesser-magistrate network" has sat in the research queue since it was opened. **This is that church.**

**Matthew Trewhella** founded **Missionaries to the Preborn** in **1990** — described as the first Christian mission in America to take the preborn child as its people group. The ministry's own claim is concrete and measurable: **six of the eight abortion clinics in Milwaukee have closed since, and abortion in Wisconsin has fallen by over 60 percent.** He created the *Tell the Truth Tours* and *Campus Town Tours*, which display large photographs of preborn children.

**He is also the author of *The Doctrine of the Lesser Magistrates*** — the modern text of Christian resistance theory — and **published the first-ever English translation of the Magdeburg Confession (1550)**, the document in which that doctrine was first formalised. He speaks on interposition and the lesser magistrates for the **John Birch Society**.

**In March 2020 he defied a government order to close his church**, which is the doctrine applied to his own congregation rather than argued in the abstract.

**This is as complete a case as the directory contains**: a pastor who founded a mission that measurably closed abortion clinics, wrote the movement's handbook on resisting civil authority, recovered its sixteenth-century source text, and then acted on it himself. Confirmed without qualification.`,
  },
  {
    id: 36,
    also: {
      leadership: 'Pastor: Dr. Chuck Baldwin',
      notablePeople: 'Chuck Baldwin — pastor, radio host and politician; the Constitution Party\'s nominee for President of the United States in 2008. Florida state chairman of the Moral Majority in the 1980s; left the Republican Party in 2000 over George W. Bush\'s candidacy. Moved his family to Montana\'s Flathead Valley in October 2010 and founded Liberty Fellowship in January 2011.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED.**

**Dr. Chuck Baldwin** was the **Constitution Party's nominee for President of the United States in 2008**. Before that he was **Florida state chairman of the Moral Majority** in the 1980s, and he **left the Republican Party in 2000** on the ground that George W. Bush was not conservative enough.

He moved his family to Montana's Flathead Valley in **October 2010** and founded **Liberty Fellowship** in **January 2011**. The congregation describes itself as **"unorganized, unincorporated, nondenominational, non-501c3"** — a deliberate refusal of the tax-exempt status that conditions most American church speech, and itself a position on the church's relation to the state.

**A pastor who has stood for the presidency and who structures his congregation to stay outside federal tax recognition is not adjacent to the civil question — he has organised his ministry around it.** Confirmed. He also broadcasts a long-running radio programme and publishes video messages weekly.`,
  },
  {
    id: 4131,
    also: {
      city: 'Sacramento',
      website: 'https://cotksac.com',
      leadership: 'Pastor: John Stoos (elder 2004; full-time pastor since October 2005)',
      notablePeople: 'John Stoos — ordained as Church of the King\'s first Sacramento elder in 2004 and full-time pastor since October 2005. A political consultant active in California politics for over twenty years, ten of them as Chief Consultant to State Senator Tom McClintock.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED, with a location correction.**

**The correction:** this row placed the church in **Roseville**. Its own site and SermonAudio presence identify it as **Church of the King, Sacramento** (cotksac.com). **City corrected.**

**John Stoos** was ordained as the congregation's first Sacramento elder in **2004** and has been full-time pastor since **October 2005**. Before and alongside that he has been **a political consultant in California politics for over twenty years — ten of them as Chief Consultant to State Senator Tom McClintock.**

**That is an unusually direct case**: not a pastor who comments on legislation, but one who spent a decade as senior staff to a state senator. The church is CREC (Wycliffe Presbytery). Confirmed.`,
  },
  {
    id: 4206,
    also: {
      website: 'https://gcov.org',
      leadership: 'Pastor: Randy (Robert R.) Booth',
      notablePeople: 'Randy Booth — ordained forty years, pastor of Grace Covenant Presbyterian for twenty-four; Director of the Covenant Media Foundation and an author published by P&R Books.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED.**

**Randy Booth** (Robert R. Booth) has been an ordained minister for **forty years** and pastor here for **twenty-four**. He is **Director of the Covenant Media Foundation** — the publishing and media body that carries Greg Bahnsen's work and much of the presuppositional and theonomic corpus — and an author published by **P&R**.

**Directing the media foundation that keeps the Bahnsen catalogue in circulation is institutional work for the movement**, not private conviction: it is the mechanism by which a theological programme is transmitted. Confirmed.`,
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
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
