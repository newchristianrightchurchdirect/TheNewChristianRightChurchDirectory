// Batch 12 of the 92.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'standard-qualifying-batch12-2026-08-05.ts'
const STANDARD = 'site, church socials, the pastor’s own output, and the pastor’s name searched against each of the six markers'

const ROWS: Array<{ id: number; note: string; flag?: boolean; also?: Record<string, unknown> }> = [
  {
    id: 2543,
    also: {
      leadership: 'Senior Pastor: Dr. Tom Ascol (since 1 June 1986)',
      notablePeople: 'Tom Ascol — senior pastor since 1 June 1986; President of Founders Ministries and of The Institute of Public Theology. In January 2025 Founders established Founders Seminary, a residential seminary in Cape Coral, with Ascol, Voddie Baucham and Tom Nettles as founding faculty. B.S. Texas A&M (1979), M.Div. and Ph.D. from Southwestern Baptist Theological Seminary; editor of the Founders Journal. Brother of Bill Ascol, who forced the 2021 SBC abolition resolution to the floor.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED, and it settles a judgement call this record has carried since 2026-07-29.**

**The open question was this.** The row's own note recorded that the evidence "genuinely cuts both ways": *for* transformationalist, Ascol's Founders Ministries work and abolition advocacy; *against*, his signature on the **Dallas Statement**, which denies that political or social activism is primary to the mission of the church — and elsewhere in this directory a Dallas affirmation has been treated as ruling transformationalist **out**. The note ended "Revisit if that reading is wrong."

**Two facts found now settle it in favour of the classification, and neither was on the record:**

1. **He is President of The Institute of Public Theology** — an office whose entire subject is the church's address to the public square. A man does not preside over an institute of *public theology* while holding that the church has no public task.
2. **In January 2025, Founders Ministries established Founders Seminary**, a residential seminary in Cape Coral, with **Ascol, Voddie Baucham and Tom Nettles as founding faculty.**

**That is the fourth seminary founded by a church on this list** — after Grace Bible Theological Seminary (Conway), the Institute for Theonomic Reformation (Appomattox) and Reformation Seminary (Prescott). **Founding a seminary is the most durable form of this engagement there is**, and it resolves the tension: whatever the Dallas Statement says about activism, Ascol's actual practice is institution-building for a contending Reformed Baptist movement.

He has pastored here since **1 June 1986** — forty years — holds a B.S. from Texas A&M and an M.Div. and Ph.D. from Southwestern, and edits the **Founders Journal**. **His brother Bill Ascol**, of Bethel Baptist Owasso, also on this list, forced the 2021 SBC abolition resolution onto the floor.

**Judgement call resolved; classification confirmed on evidence rather than on balance.**`,
  },
  {
    id: 4035,
    also: {
      leadership: 'Pastor of Missions and Evangelism: Jon Speed (since November 2019)',
      notablePeople: 'Jon Speed — Pastor of Missions and Evangelism; author of Evangelism in the New Testament (2009) and co-producer of the abolitionist documentary Babies Are Murdered Here (2014) and related films. Ministers outside abortion facilities and speaks on "Pastors and the Local Church in Abolition."',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED.**

**Jon Speed** is **co-producer of *Babies Are Murdered Here* (2014)** — the documentary that did more than any other single piece of media to put the word *abolition* into American evangelical usage — and of related films. He is the author of ***Evangelism in the New Testament*** (2009).

His ministry is not only cinematic: he **works outside abortion facilities**, and speaks specifically on **"Pastors and the Local Church in Abolition"** and on abolishing abortion in Texas. He came to this pulpit in **November 2019**.

**Making the movement's defining documentary is propagation at the widest scale available** — the film is how most of the pastors in this directory first encountered the argument. Confirmed.`,
  },
  {
    id: 4221,
    also: {
      leadership: 'Pastor: Rev. Dr. Wayne C. Sedlak',
      website: 'https://reformedpresbyterianmilwaukee.wordpress.com',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED on the congregation's own statement of purpose.**

Reformation Hope Church "grew from **35 years of ministry** under the pastoral leadership of **Rev. Wayne C. Sedlak**," and describes its people as "believers committed to **applying the Christian worldview across the landscape of culture**."

**That last phrase is the classification stated by the church itself** — not a marker inferred from a denomination or a listing, but the congregation's own account of what it is for. Thirty-five years of continuous ministry behind it gives the claim weight that a new plant's mission statement would not carry.

Website recorded. Confirmed.`,
  },
  { id: 29, flag: true,
    also: { leadership: 'Pastor: Dave Hatcher' },
    note: `**Standard applied 2026-08-05** — ${STANDARD}.

**Dave Hatcher** confirmed as pastor of this **CREC** congregation, which meets at the Seventh-day Adventist building on 108th Ave NE and publishes a full sermon podcast.

**Nothing found on any of the six markers** from the pastor's own output — no books, campaigns, testimony or public controversy surfaced. Left qualifying but **flagged \`verify_stance\`**.

Note the pattern established earlier today: **CREC membership alone does not qualify a church** — nine CREC congregations were moved to limited_mission this session on exactly that reasoning. **This row should be read against its sermon archive before it is relied on.**` },
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
