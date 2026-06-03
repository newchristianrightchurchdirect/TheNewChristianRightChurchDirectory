import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  for (const denom of ['RPCNA', 'CREC']) {
    const all = await prisma.church.findMany({
      where: { denomination: denom },
      select: { id: true, name: true, city: true, state: true, approved: true, theologicalNotes: true },
      orderBy: [{ state: 'asc' }, { city: 'asc' }, { name: 'asc' }],
    })
    const approved = all.filter(c => c.approved)
    const unapproved = all.filter(c => !c.approved)
    console.log(`\n=== ${denom} ===`)
    console.log(`Total:      ${all.length}`)
    console.log(`Approved:   ${approved.length}`)
    console.log(`Unapproved: ${unapproved.length}`)

    // Detect duplicates (same name+city+state)
    const seen = new Map<string, number[]>()
    for (const c of all) {
      const key = `${(c.name || '').toLowerCase().replace(/[^a-z0-9]/g, '')}|${(c.city || '').toLowerCase()}|${c.state}`
      if (!seen.has(key)) seen.set(key, [])
      seen.get(key)!.push(c.id)
    }
    const dupes = [...seen.entries()].filter(([_, ids]) => ids.length > 1)
    if (dupes.length) {
      console.log(`\nLikely duplicates (${dupes.length} groups):`)
      for (const [key, ids] of dupes) {
        console.log(`  ${key} → ids ${ids.join(', ')}`)
      }
    }

    // List unapproved
    if (unapproved.length && unapproved.length < 50) {
      console.log(`\nUnapproved entries:`)
      for (const c of unapproved) {
        console.log(`  #${c.id} ${c.state} "${c.name}" (${c.city})`)
      }
    }
  }
  await prisma.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
