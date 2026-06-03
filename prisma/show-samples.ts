import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
async function main() {
  // Pick 2 examples from each denomination we touched this session
  const ids = [
    // RPCNA
    3257, 3796,
    // ARP
    3922, 3902,
    // URC
    3921, 3653,
    // CREC
    21,
  ]
  const rows = await p.church.findMany({
    where: { id: { in: ids } },
    select: { id: true, name: true, denomination: true, city: true, state: true, theologicalNotes: true },
  })
  for (const c of rows.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id))) {
    console.log(`\n--- #${c.id} [${c.denomination}] ${c.name} (${c.city}, ${c.state}) ---`)
    console.log(c.theologicalNotes)
  }
  await p.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
