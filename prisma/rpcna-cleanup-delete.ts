import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const TO_DELETE = [
  { id: 3971, reason: 'Empty Broomall dupe of #3795' },
  { id: 3968, reason: 'Broken row with city="Worship Sunday am", San Diego dupe' },
  { id: 3799, reason: 'Atlanta "Chruch" typo dupe of #3273 (merged)' },
  { id: 3760, reason: 'LA dupe of #3257 (pastor Tabaka copied)' },
]

async function main() {
  for (const t of TO_DELETE) {
    const c = await prisma.church.findUnique({ where: { id: t.id }, select: { id: true, name: true, city: true, state: true } })
    if (!c) { console.log(`  ⊘ #${t.id} already gone`); continue }
    await prisma.church.delete({ where: { id: t.id } })
    console.log(`  ✓ Deleted #${t.id} "${c.name}" (${c.city}, ${c.state}) — ${t.reason}`)
  }
  const remaining = await prisma.church.count({ where: { denomination: 'RPCNA' } })
  console.log(`\nRPCNA count now: ${remaining}`)
  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
