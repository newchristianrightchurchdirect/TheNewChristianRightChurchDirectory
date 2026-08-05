// The last row of the signature_only queue.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

async function main() {
  const before = await prisma.church.findUnique({ where: { id: 4251 } })
  if (!before) { console.log('not found'); return }

  const note = `Verified individually 2026-08-04. **The last row of the signature_only queue, and a fitting one to end on.**

New Breath Church is a **Slavic — Ukrainian and Russian-speaking — immigrant congregation** in Lincoln, pastored by **Oleksii Barkalov**, who writes publicly of "our New Breath Church in Lincoln, Nebraska" and of the congregation praying for those outside it.

Lincoln sustains a substantial Slavic evangelical community — First Slavic Baptist Church, Slavic Christian Church in nearby Raymond, and the **Midwest Association of Slavic Churches** and Slavic Midwest Youth networks. **That network is a lead worth following**, since only this one congregation of it is currently on file.

**Why it belongs in the record beyond itself.** The Nebraska equal-protection roster reads at first glance like a rural white Plains document. It is not. It carries two historically Black Missionary Baptist congregations in North Omaha, a bilingual church plant (Citylight Mosaic), a self-described multi-ethnic congregation (Sower), a Spanish-and-English service (Calvary Community), and this Slavic immigrant church. **A directory that classified this roster by its stereotype would have got it wrong.**

**Independent of any body that binds gender, sexuality or eschatology**, and no congregational statement was found in English; those markers are left unset rather than assumed. Given the Slavic Baptist and Pentecostal traditions represented in Lincoln, defaulting them from Anglo-American denominational patterns would have been particularly unsafe.

**Assessment: 1 marker of 6.** Abolition evidenced and formal. Remains **single issue** — examined, does not qualify.`

  await updateStances(prisma, 4251, { abolitionStance: 'pro_abolition' }, {
    actor: 'research-newbreath-2026-08-04.ts',
    note: 'Individually verified; Slavic immigrant congregation, no binding confession found, other markers deliberately left unset.',
    alsoSet: {
      denomination: 'Slavic evangelical (independent)',
      leadership: 'Senior Pastor: Oleksii Barkalov',
      stanceBasis: 'evidenced',
      researchStatus: 'researched',
      recordFlag: null,
      lastResearchedAt: new Date(),
      researchNote: '2026-08-04: individually verified to the full research standard. Final row of the signature_only queue.',
      theologicalNotes: `${before.theologicalNotes || ''}\n\n---\n\n${note}`,
    },
  })
  console.log('#4251 New Breath Church — verified')

  const left = await prisma.church.count({ where: { recordFlag: { contains: 'signature_only' } } })
  const c = (v: string) => prisma.church.count({ where: { approved: true, culturalEngagement: v } })
  const verified = await prisma.church.count({ where: { researchNote: { contains: 'individually verified' } } })
  console.log(`\n=== signature_only remaining: ${left} ===`)
  console.log(`individually verified in this campaign: ${verified}`)
  console.log(`qualifying: ${await c('transformationalist')}   single_issue: ${await c('single_issue')}   quietist: ${await c('quietist')}   limited: ${await c('limited_mission')}`)
  console.log(`total churches: ${await prisma.church.count()}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
