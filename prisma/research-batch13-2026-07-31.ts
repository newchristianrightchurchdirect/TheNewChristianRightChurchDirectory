import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()
const find = (where: Record<string, unknown>) => prisma.church.findFirst({ where })

async function main() {
  // ================= Stone Mountain Baptist, Nampa ID — Gabriel Render =================
  const smb = await find({ state: 'ID', name: { contains: 'Stone Mountain', mode: 'insensitive' } })
  if (smb) {
    await updateStances(prisma, smb.id, { culturalEngagement: 'transformationalist', eschatology: 'postmill' }, {
      actor: 'research-batch13-2026-07-31.ts',
      note: 'Render writes for TruthScript and is a recurring co-host of its podcast "It’s Time for Truth". The church professes a realised-kingdom eschatology — Jesus reigning now, the church age as the millennium — and locates itself in the Scottish Covenanter and Particular Baptist lineage. Public media work plus a stated eschatology, both first-hand.',
      alsoSet: {
        stanceBasis: 'evidenced', recordFlag: null,
        leadership: 'Pastor: Gabriel Render',
        theologicalNotes:
          'INDEPENDENTLY VERIFIED 2026-07-31 (full standard). Pastor **Gabriel Render**, MTS in Historical Theology from Reformed Baptist Seminary; on X as **@PastorGabe1689**. Founders-affiliated. ' +
          '\n\nHe writes for **TruthScript** and is a recurring co-host of its podcast **"It’s Time for Truth"** (a ministry of Truth Family Bible Church, Middleton ID) — a public media voice beyond his own pulpit, which is the pattern shared by most churches verified in this directory. ' +
          '\n\n**The church states its own eschatology:** it holds that "Jesus has established His kingdom on this earth and that the age of the church is the millennium, an age in which Jesus reigns at the right hand of the Father", and places itself in the lineage of "the English Puritans and the **Scottish Covenanters** and especially the Particular Baptists". Covenanter descent carries a doctrine of Christ’s mediatorial kingship over nations. ' +
          '\n\nNo abortion, theonomy or Christian-nationalism statement located; those markers left unknown.',
        sourceUrls: 'https://stonemountainchurch.com/leadership/;https://truthscript.com/author/grender/;https://x.com/PastorGabe1689;https://church.founders.org/church/stone-mountain-baptist-church/;https://postmillennialworldview.com/postmill-churches/',
        researchNote: '2026-07-31: full standard. TruthScript author and podcast co-host; church professes realised-kingdom eschatology and Covenanter lineage.',
      },
    })
    console.log(`#${smb.id} Stone Mountain Baptist (Render) — VERIFIED`)
  }

  // ================= Christ Church Moscow (#18) — enrich leadership and connections =================
  const cc = await prisma.church.findUnique({ where: { id: 18 } })
  if (cc) {
    await prisma.church.update({
      where: { id: 18 },
      data: {
        leadership: 'Pastor: Douglas Wilson; Associate Pastor: Jared Longshore; Elder Pro Tem: Toby Sumpter',
        notablePeople:
          'Douglas Wilson — founder of the CREC, Logos School, New Saint Andrews College and Canon Press; the most publicly prominent advocate of Christian nationalism in the United States, and reported in 2026 as a mentor to US Defense Secretary Pete Hegseth. | ' +
          'Jared Longshore — Associate Pastor; has said he would support repealing the 19th Amendment. | ' +
          'Toby Sumpter — Elder Pro Tem; has said "In an ideal society, we would vote as households."',
        theologicalNotes: (cc.theologicalNotes || '') +
          '\n\nLEADERSHIP AND REACH, 2026-07-31. Alongside Wilson the congregation is served by **Jared Longshore** (Associate Pastor) and **Toby Sumpter** (Elder Pro Tem), both of whom hold town-hall meetings with him. Longshore has said he **would support repealing the 19th Amendment**; Sumpter has said **"In an ideal society, we would vote as households."** Those positions are on the record from the men themselves and place the church’s patriarchy marker beyond doubt. ' +
          '\n\n**Reach:** in 2026 Wilson was reported by Religion News Service and The Hill as a **mentor to US Secretary of Defense Pete Hegseth**, whose church is tied to this network. Whatever one makes of the coverage, it is the clearest evidence in this directory that the movement it maps now touches the highest levels of American government — the reason a directory of these churches is worth keeping accurate.',
        researchNote: '2026-07-31: leadership expanded (Longshore, Sumpter) with their own stated positions on women’s suffrage; Wilson reported as a mentor to Defense Secretary Hegseth.',
        lastResearchedAt: new Date(),
      },
    })
    console.log('#18 Christ Church Moscow — leadership and Hegseth connection recorded')
  }

  const e = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist', stanceBasis: 'evidenced' } })
  console.log(`\nevidenced: ${e}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
