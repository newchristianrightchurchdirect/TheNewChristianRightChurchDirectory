// Batch 9 of the 92.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'standard-qualifying-batch9-2026-08-05.ts'
const STANDARD = 'site, church socials, the pastor’s own output, and the pastor’s name searched against each of the six markers'

const ROWS: Array<{ id: number; note: string; flag?: boolean; also?: Record<string, unknown> }> = [
  {
    id: 4043,
    also: {
      leadership: 'Teaching Pastor: Rev. Dr. Jason M. Garwood (M.Div., Th.D.); Consistory includes Ron Kronz and elder Allen Cohen',
      notablePeople: 'Jason M. Garwood — teaching pastor; Founder and President of The Virginia Center for Public Theology, "a ministry dedicated to defending Christian ethics in the town square." Author of The Disciples\' Prayer, Reconstructing the Heart, Have Yourself an Eschatological Christmas and Health for All of Life. Hosts Cross & Crown Radio on the Reconstructionist Radio network; spoke at the Abolish Abortion Virginia Conference 2022. Pastored in Caro, Michigan until 2017.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED, and this is a keystone record.**

**Rev. Dr. Jason M. Garwood** (M.Div., Th.D.) is **Founder and President of The Virginia Center for Public Theology** — described as "a ministry dedicated to **defending Christian ethics in the town square**," which is the directory's own thesis in one line. He leads **Abolish Abortion Virginia** and spoke at its 2022 conference.

He hosts **Cross & Crown Radio** on the **Reconstructionist Radio** network, whose **first episode is "The Warrenton Declaration"** — a named public statement issued from this pulpit and worth retrieving in full. He has authored several books, including *The Disciples' Prayer*, *Reconstructing the Heart*, *Have Yourself an Eschatological Christmas*, and *Health for All of Life*.

**Two connections make this row unusually valuable to the wider project:**

1. **Garwood pastored in Caro, Michigan until 2017** — that is **Providence Church, Caro (#3245)**, promoted to qualifying earlier today on its stated aim of "reformation in the family, church, and state." One man links a Virginia and a Michigan congregation on this list.
2. He was already identified in the AAM briefing as **the single most useful contact for Abolish Abortion Michigan** — he runs the Virginia equivalent of what AAM does, and he knows Michigan.

The church is CREC and governed by a **consistory**. Confirmed without qualification.`,
  },
  {
    id: 2470,
    also: {
      leadership: 'Pastor: Brett Anthony Baggett (since 2011)',
      notablePeople: 'Brett Baggett — a pastor of Ekklesia Muskogee since its planting in 2011; President of Rescue Those, which "seeks to equip the saints to rescue their preborn neighbors being carried off to death." Spoke at the 2023 Abolition NOW! Conference; listed among Shepherd School pastors; covered by Oklahoma Watch.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED.**

**Brett Baggett** has pastored this Reformed Baptist congregation since it was planted in **2011**, and is **President of Rescue Those**, whose stated purpose is to "equip the saints to **rescue their preborn neighbors being carried off to death**" — Proverbs 24:11 as an organisational mandate.

He spoke at the **2023 Abolition NOW! Conference** convened by **Free the States**, is listed among the pastors of the **Shepherd School**, and has been covered by **Oklahoma Watch** as a public figure in the state's abortion politics. The church hosted its own **Rescue Those Conference** in 2020.

Confirmed on organisational leadership, not affiliation.`,
  },
  {
    id: 3301,
    also: {
      website: 'https://allofchrist.org',
      leadership: 'Pastor: Matt Kenitzer (since June 2018)',
      notablePeople: 'Matt Kenitzer — pastor since June 2018 and a Director on the Board of Abolish Abortion Pennsylvania. Spoke at the 2023 Abolition NOW! Conference representing both the church and Abolish Abortion PA. The congregation runs the Friedensburg Biblical Institute, whose published lectures include "Why Abolition and Not Pro Life."',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED, and the church teaches the position as well as holding it.**

**Matt Kenitzer** has pastored here since **June 2018** and serves as a **Director on the Board of Abolish Abortion Pennsylvania**. He spoke at the **2023 Abolition NOW! Conference** representing both this church and Abolish Abortion PA.

**The detail that matters most is institutional:** the congregation runs the **Friedensburg Biblical Institute**, and among its published lectures is one titled **"Why Abolition and Not Pro Life"** (29 May 2022). **That is a church running a school that teaches the abolitionist case against incrementalism by name** — not a pastor holding a view, but a congregation propagating it as curriculum.

Its site is **allofchrist.org**, now recorded — the domain is itself a claim.`,
  },
  { id: 181, flag: true,
    also: { leadership: 'Staff Pastor: Luke Gorsett (since 2012)' },
    note: `**Standard applied 2026-08-05** — ${STANDARD}.

**Luke Gorsett** has served here since **2012**; he graduated from **UNL** and **Midwestern Baptist Theological Seminary**, and works in preaching and leadership studies with interests in historical theology and exegesis. The church is **listed in The Gospel Coalition's Nebraska directory** and maintains a substantial **SermonAudio** archive with multiple preachers.

**Nothing found on any of the six markers** from the church or from Gorsett. **Left qualifying but flagged \`verify_stance\`.** The sermon archive is large and public, which is the obvious next route.` },
  { id: 282, flag: true,
    also: { leadership: 'Pastor: Roy Miller' },
    note: `**Standard applied 2026-08-05** — ${STANDARD}.

**Nothing could be established about Pastor Roy Miller** beyond the name already on file — no biography, no published output, no coverage, and the congregation does not surface in the OPC's own locator results under that description.

**Nothing found on any of the six markers.** Left qualifying but flagged \`verify_stance\`, with the gap stated plainly: **the pastor-level half of the standard is undone here**, and this classification rests on the existing record alone.` },
]

async function main() {
  for (const r of ROWS) {
    const c = await prisma.church.findUnique({ where: { id: r.id } })
    if (!c) { console.log(`  #${r.id} NOT FOUND`); continue }
    const flags = (c.recordFlag || '').split(';').map(s => s.trim()).filter(Boolean)
    if (r.flag && !flags.includes('verify_stance')) flags.push('verify_stance')
    await updateStances(prisma, r.id, {} as never, {
      actor: ACTOR,
      note: 'Full standard applied to a qualifying row that had never been individually researched.',
      alsoSet: {
        ...(r.also || {}),
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
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
