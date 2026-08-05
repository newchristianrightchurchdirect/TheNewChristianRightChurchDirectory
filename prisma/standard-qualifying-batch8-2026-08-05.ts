// Batch 8 of the 92.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'standard-qualifying-batch8-2026-08-05.ts'
const STANDARD = 'site, church socials, the pastor’s own output, and the pastor’s name searched against each of the six markers'

const ROWS: Array<{ id: number; note: string; stances?: Record<string, string>; also?: Record<string, unknown> }> = [
  {
    id: 3309,
    stances: { theonomy: 'theonomic' },
    also: {
      website: 'https://reformedbiblechurch.net',
      leadership: 'Pastor: Rev. Dr. Paul Michael Raymond',
      notablePeople: 'Paul Michael Raymond — pastor; founded the Institute for Theonomic Reformation in 2001 and teaches Theology, History and Political Science at its Academy. Presented the Doctrine of the Lesser Magistrate to the Appomattox County Board of Supervisors. Author of monographs and articles on biblical worldview; the church belongs to the Reformation Alliance.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED, and it is one of the most explicit records in the directory.**

The church's stated emphasis is the **Christian's Cultural Mandate of Genesis 1:28** — the dominion text, named as the congregation's organising principle rather than implied.

**Paul Michael Raymond** planted a Virginia congregation with the RBC session in 1998 and, by **2001, established the Institute for Theonomic Reformation.** He teaches **Theology, History and Political Science** at its Academy and is a conference speaker and author of monographs on biblical worldview.

**And he took the doctrine to the county government in person: he delivered a presentation on the Doctrine of the Lesser Magistrate to the Appomattox County Board of Supervisors**, recorded on the church's own Facebook page.

The **Chalcedon Foundation** has published on this ministry under the title "Christian Reconstruction Comes to Appomattox," and the church is listed by **The Reformation Alliance**.

**Theonomy set to theonomic — not sympathetic.** A pastor who founds an *Institute for Theonomic Reformation* is not adjacent to the position; he named an institution after it. Confirmed.`,
  },
  {
    id: 3289,
    stances: { theonomy: 'theonomic' },
    also: {
      website: 'https://ibctucumcari.org',
      leadership: 'Pastor: Gordan Runyan',
      notablePeople: 'Gordan Runyan — pastor; author of Theonomy and Reformed Baptists, Resistance to Tyrants, Great Commission or Victory Covenant?, and The Biblical Case for Private Gun Ownership. A Navy veteran of the nuclear submarine fleet during the first Persian Gulf war. Hosts The Ragtown Pulpit podcast.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED.**

**Gordan Runyan** writes directly on this directory's markers, and one of his titles is the argument itself: ***Theonomy and Reformed Baptists***, which takes up "the recurring charge that there is something inconsistent about being a 1689 Reformed Baptist and also adhering to **Theonomy**." He is also the author of ***Resistance to Tyrants***, ***Great Commission or Victory Covenant?***, and ***The Biblical Case for Private Gun Ownership***, and spoke on *On This Ancient Battleground: Winning the War Between Tyranny & Christian Faith*.

He is a **Navy veteran of the nuclear submarine fleet during the first Persian Gulf war**, describes himself as a "Paleo-Patriot," and hosts **The Ragtown Pulpit** podcast.

**Theonomy set to theonomic on the pastor's own published defence of it.** Confirmed.`,
  },
  {
    id: 611,
    also: {
      leadership: 'Senior Pastor: Dr. Robert (Rob) Pacienza (since 2016)',
      notablePeople: 'Rob Pacienza — senior pastor; President and CEO of D. James Kennedy Ministries and of Coral Ridge Ministries, founder of the Institute for Faith and Culture, and a Senior Fellow for the American Dream at the America First Policy Institute. Also in the leadership of the Center for Christian Statesmanship. B.A. Samford, M.Div. Knox Theological Seminary, D.Min. Westminster Theological Seminary (Philadelphia). Mentored by D. James Kennedy.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED, and the institutional reach here is national.**

**Dr. Rob Pacienza** is senior pastor of Coral Ridge — **D. James Kennedy's own pulpit**, and Pacienza was mentored by Kennedy before succeeding to it. He holds four positions beyond the congregation:

- **President and CEO of D. James Kennedy Ministries**, whose broadcast *Truths That Transform* airs nationwide, and of **Coral Ridge Ministries**;
- **founder of the Institute for Faith and Culture**;
- **Senior Fellow for the American Dream at the America First Policy Institute (AFPI)** — a national policy organisation;
- leadership of the **Center for Christian Statesmanship**, the body Kennedy founded to disciple members of Congress.

**A sitting pastor who is a senior fellow at a national policy institute and runs a broadcast ministry is engaged with the civil order at a level almost no other church in this directory reaches.** The Kennedy inheritance is itself the point: Coral Ridge is where the modern American project of Christian political engagement was substantially built.

Confirmed. B.A. Samford, M.Div. Knox, D.Min. Westminster Philadelphia.`,
  },
  {
    id: 109,
    stances: { christianNationalism: 'sympathetic' },
    also: {
      leadership: 'Pastor: Paul Thompson',
      notablePeople: 'Paul Thompson — pastor; ran for Idaho State Senate District 25 as a Constitution Party candidate in 2022, losing to Linda Wright Hartgen. Led the effort to declare Twin Falls a "sanctuary city for pre-born children," and petitioned the library board to remove LGBTQ displays at the entrance to the children\'s section. Writes at PaulThompsonBlog.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED on three separate civil acts.**

**Paul Thompson** has taken his ministry into the civil sphere repeatedly and by name:

1. **He stood for the Idaho State Senate**, District 25, as a **Constitution Party** candidate — the same party whose 2008 presidential nominee, Chuck Baldwin, pastors Liberty Fellowship, also in this directory. He was defeated by Linda Wright Hartgen on 8 November 2022.
2. **He led the effort to declare Twin Falls a "sanctuary city for pre-born children"** — the municipal-ordinance route to abolition.
3. **He petitioned the library board to remove LGBTQ displays** from the entrance to the children's section.

**Note the recurrence:** this is the **second pastor in this batch of research** to confront a public library — Sacha Walicord and other ministers did the same in Orange City, Iowa. **The public library is emerging as a characteristic site of this movement's local action**, alongside the abortion facility and the city council, and it is worth tracking as a marker in its own right.

Christian nationalism set to **sympathetic** on the candidacy and the ordinance work together. Confirmed.`,
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
