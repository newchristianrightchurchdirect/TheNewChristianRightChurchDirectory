import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // 1. Unity ARP — reclassify RPCNA → ARP
  await prisma.church.update({
    where: { id: 3956 },
    data: { denomination: 'ARP' },
  })
  console.log('✓ #3956 Unity → denomination: ARP')

  // 2. Schwertley's Manawa — reclassify RPCNA → CRPC
  await prisma.church.update({
    where: { id: 3684 },
    data: { denomination: 'CRPC' },
  })
  console.log('✓ #3684 Manawa Covenanted → denomination: CRPC')

  // 3. Trinity Burtonsville MD — fix stale NC address
  await prisma.church.update({
    where: { id: 3796 },
    data: { address: '4515 Sandy Spring Road', zip: '20866', city: 'Burtonsville' },
  })
  console.log('✓ #3796 Trinity MD → address: 4515 Sandy Spring Road, Burtonsville, 20866')

  // 4. LA RPC — fix stale pastor and remove bogus postmil tail
  const la = await prisma.church.findUnique({ where: { id: 3257 }, select: { theologicalNotes: true } })
  if (la) {
    // Original: "Westminster Standards. Covenanter heritage. Exclusive psalmody (a cappella worship). Amillennial. RPCNA. Pastor Nathan Eshelman. Postmillennial."
    const cleaned = (la.theologicalNotes || '')
      .replace(/\s*RPCNA\.\s*/g, ' ')
      .replace(/Pastor Nathan Eshelman\./g, 'Pastor Alex Tabaka.')
      .replace(/\s*Postmillennial\.\s*$/, '')
      .replace(/\s+/g, ' ')
      .trim()
    await prisma.church.update({ where: { id: 3257 }, data: { theologicalNotes: cleaned } })
    console.log(`✓ #3257 LA RPC → notes: "${cleaned}"`)
  }

  // 5. Atlanta #3273 — merge in website/phone/email from #3799 (only where empty)
  const atl = await prisma.church.findUnique({
    where: { id: 3273 },
    select: { website: true, phone: true, email: true },
  })
  if (atl) {
    const patch: any = {}
    if (!atl.website) patch.website = 'https://atlanta-rpc.org'
    if (!atl.phone) patch.phone = '(770) 241-3946'
    if (!atl.email) patch.email = 'franksmith76@gmail.com'
    if (Object.keys(patch).length) {
      await prisma.church.update({ where: { id: 3273 }, data: patch })
      console.log(`✓ #3273 Atlanta → merged: ${JSON.stringify(patch)}`)
    } else {
      console.log(`⊘ #3273 Atlanta — already populated, no merge needed`)
    }
  }

  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
