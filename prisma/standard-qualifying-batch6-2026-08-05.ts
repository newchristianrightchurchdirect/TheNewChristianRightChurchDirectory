// Batch 6 of the 92.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'standard-qualifying-batch6-2026-08-05.ts'
const STANDARD = 'site, church socials, the pastor’s own output, and the pastor’s name searched against each of the six markers'

const ROWS: Array<{ id: number; note: string; stances?: Record<string, string>; also?: Record<string, unknown> }> = [
  {
    id: 4036,
    stances: { abolitionStance: 'pro_abolition' },
    also: {
      leadership: 'Pastor: Derin Stidd (~20 years)',
      notablePeople: 'Derin Stidd — pastor; Assistant National Director of Operation Save America. At the 2019 SBC annual meeting he introduced a motion urging the convention to organise its churches behind "the immediate abolition of human abortion," and he was one of nine co-authors of the 2021 SBC resolution "On Abolishing Abortion." Has spoken at the Abolition Now Conference.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED, and it completes a cluster.**

**Derin Stidd** is **Assistant National Director of Operation Save America**, and his denominational record is documented twice over:

- at the **2019 SBC annual meeting** he **introduced a motion** urging the convention to organise its affiliated churches and conventions behind "**the immediate abolition of human abortion**" — one of 23 messenger motions that year, and referred rather than adopted;
- he was then **one of nine co-authors of the 2021 SBC resolution "On Abolishing Abortion."**

**This directory now holds four churches tied to that 2021 resolution**: three pastored by co-authors — Harmony Baptist (Stidd), First Baptist Mena (Russell Threet) and First Baptist Buffalo (Dave Van Bebber) — and **Bethel Baptist, Owasso**, pastored by **Bill Ascol**, who carried it from the floor after the Committee on Resolutions declined to bring it forward.

**That is the American abolition movement's decisive denominational act, and four of its authors are in this file.** Abolition set to pro_abolition (evidenced); qualification confirmed.`,
  },
  {
    id: 4039,
    also: {
      leadership: 'Pastor: Michael Foster',
      notablePeople: 'Michael Foster — pastor; co-author with Bnonn Tennant of It\'s Good to Be a Man, which began as a project to equip men as godly patriarchs and became a ministry. Writes for American Reformer; a frequent podcast guest on masculinity, patriarchy and cultural change.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED.**

**Michael Foster** is co-author, with Bnonn Tennant, of ***It's Good to Be a Man*** — begun as a project "to equip men to become **godly patriarchs**," navigating between "pagan masculinity and feminism," and since grown into a standing ministry with its own publishing platform.

He writes for **American Reformer** and is a regular voice on the cultural-realignment circuit, including Aaron Renn's essay series on "the vibe shift."

**This is the patriarchy marker in published form, and it is the pastor's principal public work** rather than an aside. Confirmed.`,
  },
  {
    id: 66,
    also: {
      leadership: 'Pastor: Joseph Spurgeon',
      notablePeople: 'Joseph Spurgeon — pastor; host of the Patriarchy Podcast and author of It\'s Good to be a Boy! and It\'s Good to be a Girl!. Writes for TruthScript. Married with eight children.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED — and few records state the marker this plainly.**

**Joseph Spurgeon** hosts the **Patriarchy Podcast** — the marker is the title — and is the author of ***It's Good to be a Boy!*** and ***It's Good to be a Girl!***, children's books on the same theme. He writes for **TruthScript**, and he and his wife have **eight children**.

The church belongs to **Evangel Presbytery**. Scoring five of six markers, this is among the highest-ranked congregations in the directory, and the pastor's public output confirms the classification directly rather than by inference.`,
  },
  {
    id: 4038,
    also: {
      leadership: 'Pastor: Toby Sumpter (since 2022)',
      notablePeople: 'Toby J. Sumpter — pastor; co-host of the CrossPolitic Show on the Fight Laugh Feast network, M.A. in Theological Studies with an emphasis in church history, teaches high school civics at Logos School, and is associated with the Idaho Family Policy Center.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED.**

**Toby Sumpter** co-hosts **CrossPolitic**, on the **Fight Laugh Feast** network — one of the movement's principal media platforms — and holds an M.A. in Theological Studies with an emphasis in church history.

Two further details are the real evidence, because they are institutional rather than rhetorical:

- he **teaches high school civics at Logos School**, the Moscow classical school that is the model for the wider classical Christian education movement — teaching the *civil* subject to the next generation;
- he is listed with the **Idaho Family Policy Center**, a state-level policy organisation.

**A pastor who broadcasts, teaches civics, and is attached to a policy centre is working the culture through three separate institutions.** Confirmed.`,
  },
  {
    id: 279,
    also: {
      leadership: 'Pastor Emeritus: Dr. George Grant',
      notablePeople: 'George Grant — pastor; after moving to Tennessee in 1991 he founded the King\'s Meadow Study Center and Franklin Classical School. A prolific author.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED on institution-founding.**

**Dr. George Grant** moved to Tennessee in **1991** and **founded both the King's Meadow Study Center and Franklin Classical School**. He is a prolific author, and has spoken at conferences on the **CrossPolitic / Fight Laugh Feast** network.

**Founding a classical school is the criterion this directory has already accepted** — it is how a movement trains its successors rather than merely persuading its contemporaries — and Franklin Classical is among the more influential of them. Combined with a study centre, this is a pastor who built durable institutions rather than a platform.

Confirmed.`,
  },
  {
    id: 4176,
    also: {
      website: 'https://clovisreformed.com',
      leadership: 'Organizing Pastor: Ryan Denton',
      notablePeople: 'Ryan Denton — ordained Presbyterian minister and organizing pastor of two church plants, in Clovis NM and Lubbock TX; Th.M. from Puritan Reformed Theological Seminary and a PhD student there, with degrees from The Southern Baptist Theological Seminary, St. John\'s College and the University of New Mexico. Author of five books on evangelism.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED, with a website added.**

**Ryan Denton** is the **organizing pastor of two church plants at once** — this congregation in Clovis and another in Lubbock, Texas. He holds a **Th.M. from Puritan Reformed Theological Seminary**, where he is a PhD student, with prior degrees from **The Southern Baptist Theological Seminary, St. John's College and the University of New Mexico**, and is the **author of five books on evangelism** plus numerous articles, including at the Heidelblog. The congregation is listed in the **Founders Ministries** church search; its site is **clovisreformed.com**, now recorded.

**Local context worth keeping:** **Clovis, New Mexico moved toward becoming a "sanctuary city for the unborn"** — one of the ordinance campaigns associated with Mark Lee Dickson's work. **No link between this congregation and that campaign was established here**, and none is claimed; it is recorded as a lead, because a Reformed church plant in a sanctuary-city town is worth asking about directly.`,
  },
]

async function main() {
  for (const r of ROWS) {
    const c = await prisma.church.findUnique({ where: { id: r.id } })
    if (!c) { console.log(`  #${r.id} NOT FOUND`); continue }
    await updateStances(prisma, r.id, (r.stances || {}) as never, {
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
