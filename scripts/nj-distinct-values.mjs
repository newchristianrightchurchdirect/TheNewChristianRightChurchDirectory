/** Read-only: what values these stance fields actually hold, before writing any. */
import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
for (const f of ['abolitionStance', 'stanceBasis', 'researchStatus', 'culturalEngagement']) {
  try {
    const g = await p.church.groupBy({ by: [f], _count: true })
    console.log(f, '->', g.map(x => `${x[f]}:${x._count}`).join('  '))
  } catch {
    console.log(f, '-> field missing')
  }
}
await p.$disconnect()
