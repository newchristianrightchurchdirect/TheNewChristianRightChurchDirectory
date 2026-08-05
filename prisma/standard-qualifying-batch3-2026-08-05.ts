// Batch 3 of the 92. This tranche is the movement's spine — nationally known figures whose records
// are already substantial. The job here is confirmation to the standard plus correcting the record
// where the research contradicts it, which it did twice.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'standard-qualifying-batch3-2026-08-05.ts'
const STANDARD = 'site, church socials, the pastor’s own output, and the pastor’s name searched against each of the six markers'

type Row = { id: number; stances?: Record<string, string>; note: string; also?: Record<string, unknown> }

const ROWS: Row[] = [
  {
    id: 17,
    also: {
      leadership: 'Senior Pastor: Joel Webbon',
      notablePeople: 'Joel Webbon — senior pastor and founder of Right Response Ministries, an online platform advocating a transformed Christian society and political order. A self-described Christian nationalist who holds that public office should be held by Christians. Convened "Blueprints for Christendom 2.0: Seven Doctrines for Ruling the World," whose speakers included Doug Wilson and Oklahoma State Senator Dusty Deevers.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED. One of only two churches in the directory meeting all six markers.**

**Joel Webbon** is senior pastor and the founder of **Right Response Ministries**, an online platform through which he argues for a transformed Christian society and political order. He is a **self-described Christian nationalist**, and holds that public office should be held by Christians.

He convened **"Blueprints for Christendom 2.0: Seven Doctrines for Ruling the World,"** whose speakers included **Doug Wilson** and **Oklahoma State Senator Dusty Deevers** — who pastors Grace Reformed Baptist Church of Elgin, #216 in this directory and the author of SB 456, the Abolition of Abortion Act.

**That conference is a useful map of the network this directory exists to trace**, connecting a Texas pastor, the Moscow pulpit, and a sitting state senator who is himself a pastor. Qualification confirmed on the pastor's own stated programme rather than on inference.`,
  },
  {
    id: 16,
    also: {
      leadership: 'Pastors: Brian Sauvé, Eric Conn, Dan Berkholder, Kevin Griffith, Ben Garrett',
      notablePeople: 'Brian Sauvé — senior pastor, and a charting Christian musician; co-hosts The King\'s Hall podcast with Eric Conn and Dan Berkholder, and the Hard Men Podcast. Eric Conn — pastor; a career journalist in the firearms and outdoor media industry (Gun Digest editor-in-chief, Guns & Ammo, the NRA\'s Shooting Illustrated) and former chief of staff at a conservative media company. Ben Garrett — pastor; with Sauvé and Conn a creator of the Haunted Cosmos show. The congregation is associated with New Christendom Press, a Protestant publishing house.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED. The directory's other six-of-six church.**

Refuge Church is an **independent Reformed congregation** in Ogden led by a plurality — **Brian Sauvé, Eric Conn, Dan Berkholder, Kevin Griffith and Ben Garrett** — whose public reach far exceeds the congregation:

- **The King's Hall** podcast (Sauvé, Conn, Berkholder) and the **Hard Men Podcast**;
- **Haunted Cosmos**, a widely followed show arguing that the universe is "not just stuff";
- **New Christendom Press**, a Protestant publishing house associated with the church, which also runs conferences.

**Eric Conn's background is unusual enough to record**: a career journalist in the firearms and outdoor media industry — editor-in-chief of *Gun Digest*, roles at *Guns & Ammo* and the NRA's *Shooting Illustrated* — and chief of staff at a conservative media company, before pastoring. **Brian Sauvé** is also a charting Christian musician.

**A church operating a publishing house and several national podcasts is contending for the culture as an institution**, which is what the qualifying label is for. Confirmed.`,
  },
  {
    id: 3275,
    also: {
      denomination: 'Reformed Presbyterian Church – Hanover Presbytery',
      leadership: 'Pastor: Dr. Joseph (Joe) Morecraft III',
      notablePeople: 'Dr. Joe Morecraft III — a founder of the Reformed Presbyterian Church in the United States (RPCUS) in 1983, having led Chalcedon Presbyterian Church out of the PCA after a complaint that theonomic views were required for office there. Removed from Covenant Presbytery, RPCUS in April 2015; subsequently joined the Reformed Presbyterian Church – Hanover Presbytery and became pastor of Heritage Presbyterian Church, Cumming.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED, with a denominational correction.**

**The correction:** this row recorded the church as **RPCUS**. That is out of date. **Dr. Joe Morecraft III was removed from Covenant Presbytery, RPCUS in April 2015**, after which he joined the **Reformed Presbyterian Church – Hanover Presbytery** and became pastor here. The congregation's own SermonAudio broadcaster is \`heritagerpchanove\` and its Facebook page is "Heritage Presbyterian Church - Hanover Presbytery." **Denomination corrected.**

**The qualification is not in doubt.** Morecraft is one of the **founders of the RPCUS in 1983**, which he formed by **leading Chalcedon Presbyterian Church out of the PCA** after a formal complaint that theonomic views were being required for office. He appears in standard timelines of the modern theonomy movement and in Chalcedon Foundation material.

**A man who took a congregation out of a denomination over theonomy, and founded a new one, is not a sympathiser** — he is a principal. Confirmed.`,
  },
  {
    id: 1296,
    also: {
      recordFlag: 'verify_stance',
      leadership: 'Pastor: John M. Otis',
      notablePeople: 'John M. Otis — pastor; author (Jesus\' Victorious Kingdom; Danger in the Camp; work refuting the Federal Vision) and founder of Triumphant Publications Ministries. Moved his family to Atlanta in 1987 to join the ministry of Chalcedon Presbyterian Church, and transferred from Westminster Presbytery (PCA) to Covenant Presbytery (RPCUS) in 1990.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. Qualification confirmed; the LOCATION needs checking.**

**A discrepancy to resolve:** this row places Covenant Reformed Presbyterian Church (RPCUS) in **Asheville, NC**. Sources consistently place **John M. Otis's** congregation of that name in **Burlington, NC** — roughly 200 miles east. Either the row's city is wrong, or there are two RPCUS congregations of the same name. **Flagged \`verify_stance\` rather than silently changed**, because the earlier postmill-import audit showed how easily two real congregations get merged by a confident guess.

*(Note that this is the same church the postmill bulk import tried to match to a row in Graham, NC — which was held back from auto-merging for exactly this reason. The cluster of Covenant Reformed Presbyterian congregations in North Carolina needs untangling as one job.)*

**The qualification itself is solid.** Otis joined the ministry of **Chalcedon Presbyterian Church** in Atlanta in 1987 — Morecraft's congregation — and transferred from Westminster Presbytery (PCA) to **Covenant Presbytery (RPCUS)** in 1990. He founded **Triumphant Publications Ministries**, and writes and lectures extensively, including *Jesus' Victorious Kingdom* and conference work refuting the Federal Vision.

**A pastor running a publishing ministry out of the Chalcedon/theonomic stream is contending publicly**, and that is confirmed regardless of which town the church sits in.`,
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
      note: 'Full standard applied to a qualifying row that had never been individually researched.',
      alsoSet: {
        ...also,
        recordFlag: flags.length ? flags.join(';') : null,
        stanceBasis: 'evidenced',
        researchStatus: 'researched',
        lastResearchedAt: new Date(),
        researchNote: `2026-08-05: FULL standard applied — ${STANDARD}. Qualification confirmed on the pastor's own public record.`,
        theologicalNotes: `${c.theologicalNotes || ''}\n\n---\n\n${r.note}`,
      },
    })
    console.log(`  #${r.id} ${c.name} (${c.city}, ${c.state}) — CONFIRMED`)
  }
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
