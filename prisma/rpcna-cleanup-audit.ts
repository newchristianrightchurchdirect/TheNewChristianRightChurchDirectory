import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const ids = [3257, 3760, 3273, 3799, 3795, 3971, 3590, 3796, 3956, 3684, 3968]
  const all = await prisma.church.findMany({
    where: { id: { in: ids } },
    select: {
      id: true, name: true, denomination: true, city: true, state: true, zip: true,
      address: true, website: true, phone: true, email: true, theologicalNotes: true,
      approved: true, createdAt: true, updatedAt: true,
    },
  })
  // Get distinct denominations in DB to see what exists
  const denoms = await prisma.church.groupBy({ by: ['denomination'], _count: { _all: true } })
  console.log('Denominations in DB:')
  for (const d of denoms.sort((a, b) => b._count._all - a._count._all)) {
    console.log(`  ${d._count._all.toString().padStart(5)}  ${d.denomination}`)
  }
  console.log()

  for (const id of ids) {
    const c = all.find(x => x.id === id)
    if (!c) { console.log(`#${id} NOT FOUND`); continue }
    console.log(`#${c.id} [${c.denomination}] "${c.name}"`)
    console.log(`  loc: ${c.city}, ${c.state} ${c.zip || ''}`)
    console.log(`  addr: ${c.address || '(none)'}`)
    console.log(`  web/ph/em: ${c.website || '-'} | ${c.phone || '-'} | ${c.email || '-'}`)
    console.log(`  notes: "${c.theologicalNotes || ''}"`)
    console.log(`  created: ${c.createdAt.toISOString().slice(0, 10)} | updated: ${c.updatedAt.toISOString().slice(0, 10)}`)
    console.log()
  }
  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
