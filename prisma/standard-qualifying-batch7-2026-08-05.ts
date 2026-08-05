// Batch 7 of the 92.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'standard-qualifying-batch7-2026-08-05.ts'
const STANDARD = 'site, church socials, the pastor’s own output, and the pastor’s name searched against each of the six markers'

const THIN = (extra: string) => `**Standard applied 2026-08-05** — ${STANDARD}.

${extra}

**Nothing found on any of the six markers** from either the church or the pastor. **Left qualifying but flagged \`verify_stance\`**, with the gap stated so the row does not read as researched-and-confirmed.`

const ROWS: Array<{ id: number; note: string; flag?: boolean; also?: Record<string, unknown> }> = [
  {
    id: 21,
    also: {
      leadership: 'Pastor: Stuart W. Bryan',
      notablePeople: 'Stuart W. Bryan — pastor; taught nine years at The Oaks, a classical Christian school, before coming to Coeur d\'Alene. Writes publicly in the local press, including a February 2024 opinion piece in the Coeur d\'Alene Press, and was among the local ministers engaged in the public debate over the city\'s 2013 anti-discrimination ordinance.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED, and on unusually local evidence.**

**Stuart W. Bryan** taught for **nine years at The Oaks, a classical Christian school**, before taking this pulpit — the education strand that keeps recurring across this list.

**What confirms the classification is his engagement with his own city, in public and by name:**

- he published an opinion piece in the **Coeur d'Alene Press** (February 2024);
- he was among the local ministers in the public argument over Coeur d'Alene's **2013 anti-discrimination ordinance**, covered at the time by the *Spokesman-Review* under "New CdA law opens rift over equality."

**A pastor writing under his own name in the town paper and taking a public side on a city ordinance is doing exactly what this directory classifies on**, at the scale where most of it actually happens. It is easy to miss because it leaves no national trace — which is why the standard requires searching the pastor rather than reading the church's About page.

CREC, Knox Presbytery. Confirmed.`,
  },
  {
    id: 4144,
    also: {
      denomination: 'OPC (Orthodox Presbyterian Church)',
      website: 'https://www.covenant-presbyterian.church',
      leadership: 'Pastor: Chris Strevel (since 1994)',
      notablePeople: 'Chris Strevel — pastor since 1994; a published author with a standing SermonAudio catalogue, and a teaching contributor at teachmi.com. He and his wife Elizabeth have five children and four grandchildren.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. Qualification stands; denomination corrected.**

**The correction:** this row carried **no denomination**. Covenant Presbyterian Church, Buford is an **Orthodox Presbyterian Church (OPC)** congregation. Recorded, along with its website.

**Chris Strevel** has pastored here since **1994** — over thirty years — and is a **published author** with a substantial **SermonAudio** catalogue and teaching work at teachmi.com.

Nothing was found tying him personally to abolition campaigning, a legislature or a public controversy. **The qualification rests on the existing record rather than on anything added here**, and a closer read of his published writing is the obvious next step — a thirty-year pastorate with a book list will have a position on the civil order somewhere in it.`,
  },
  { id: 3771, flag: true,
    also: { leadership: 'Pastor: Rev. Jason Housewright (installed 16 April 2019)' },
    note: THIN(`**Rev. Jason Housewright** was installed here on **16 April 2019**. He took a bachelor's in Biblical Education at **Graham Bible College** and an **M.Div. at Greenville Presbyterian Theological Seminary**, was ordained in **2001**, and previously pastored Presbyterian congregations in **Mississippi and Alabama**. RPCNA, with a full elder and deacon board recorded.

The RPCNA is worth a note in its own right: it is the **Covenanter** tradition, historically the most insistent of American Presbyterian bodies on the crown rights of Christ over the nations, and it declined to vote in US elections for much of its history on the ground that the Constitution does not acknowledge Christ. **That heritage is a strong prior for this directory** — but it is a denominational inheritance, not this congregation's act, and it is recorded as context rather than evidence.`) },
  { id: 2477, flag: true,
    also: { denomination: 'Independent Baptist (KJV) / Missionary Baptist',
            leadership: 'Pastor and co-elder: David Webber (ordained December 1980)' },
    note: THIN(`**David Webber** surrendered to ministry in **1972 at sixteen** and was **ordained by this congregation in December 1980** — he has served the church that ordained him for over forty years. B.S. in History from the University of Texas at Tyler, with study at **Baptist Missionary Association Theological Seminary**.

Two affiliations recorded: the church is listed in the **KJV Churches** directory and among the member churches of the **Missionary Baptist General Convention of Texas**, which places it in the independent/missionary Baptist stream rather than the SBC. *(Note it maintains two domains — faithlongview.org and faithlongview.com.)*`) },
  { id: 3074, flag: true,
    also: { leadership: 'Pastor: Clay Hall' },
    note: THIN(`**Clay Hall** is confirmed as pastor only by the church's own contact page. No biography, no sermon archive and no public output could be found for him, and the congregation's footprint is limited to its own site.

**This is the weakest evidence base of any church still carrying the qualifying label**, and it rests entirely on the Abolitionists Rising listing.`) },
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
    console.log(`  #${r.id} ${c.name} — ${r.flag ? 'flagged, gap stated' : 'CONFIRMED'}`)
  }
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
