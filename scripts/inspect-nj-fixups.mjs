/** Read-only. Shows the exact current state of the four NJ rows flagged for repair. */
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const ids = [3701, 5618, 5650]
const bol = await prisma.church.findMany({
  where: { name: { contains: 'Bread of Life', mode: 'insensitive' }, state: 'NJ' },
})
const rows = await prisma.church.findMany({ where: { id: { in: ids } } })

for (const c of [...bol, ...rows]) {
  console.log('='.repeat(70))
  console.log(`#${c.id}  ${c.name}`)
  for (const k of ['denomination', 'address', 'city', 'state', 'zip', 'latitude', 'longitude',
    'website', 'phone', 'email', 'leadership', 'abolitionStance', 'stanceBasis',
    'researchStatus', 'recordFlag', 'approved']) {
    const v = c[k]
    if (v !== null && v !== undefined && v !== '') console.log(`  ${k.padEnd(16)} ${String(v).slice(0, 150)}`)
  }
  if (c.theologicalNotes) console.log(`  theologicalNotes ${String(c.theologicalNotes).slice(0, 200)}`)
  if (c.researchNote) console.log(`  researchNote     ${String(c.researchNote).slice(0, 200)}`)
}

// Does anything reference these rows? Check before touching the duplicate.
for (const id of [5618, 5650]) {
  const changes = await prisma.stanceChange.count({ where: { churchId: id } }).catch(() => 'n/a')
  console.log(`#${id} stanceChange rows: ${changes}`)
}
await prisma.$disconnect()
