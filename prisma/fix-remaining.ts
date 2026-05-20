import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Check remaining ARP in Idaho
  const arpID = await prisma.church.findMany({
    where: { denomination: 'ARP', state: 'ID' },
    select: { id: true, name: true, city: true, latitude: true, longitude: true }
  })
  console.log('ARP still in Idaho:', arpID)

  // Add pastor names we extracted from city fields (that the regex missed)
  const pastorUpdates: [number, string][] = [
    [26142, 'Keith Ginn'],      // Trinity Chapel Charlotte
    [26135, 'Greg Duke'],       // Riverside Presbyterian (ARP)
    [26152, 'Alex Campbell'],   // Christ Reformed Church
    [25899, 'Charlie Perkins'], // Prescott Presbyterian
    [26236, 'Brian Schwertley'],// Covenanted Reformed Presbyterian
    [26256, 'Brent Woody'],     // Emmanuel Grace Church
    [26314, 'Daniel Doleys'],   // Living Water OPC
    [26509, 'Larry Morrison'],  // Church of the Good Shepherd
    [26512, 'David F. Elmer'], // Manasquan Reformed Bible
    [26514, 'Mike Chastain'],   // Southbridge Community
    [26510, 'Bill Marshall'],   // Presbyterian Reformed Fellowship
    [26511, 'Richard Hicks'],   // Dillingham Presbyterian
    [26143, 'Alex Lott'],       // Starmount ARP
    [26146, 'Andy Ward'],       // Mooresville ARP
  ]

  let added = 0
  for (const [id, pastor] of pastorUpdates) {
    const c = await prisma.church.findUnique({ where: { id }, select: { theologicalNotes: true } })
    if (c && c.theologicalNotes && !c.theologicalNotes.includes('Pastor')) {
      let notes = c.theologicalNotes
      if (!notes.endsWith('.')) notes += '.'
      notes += ` Pastor ${pastor}.`
      await prisma.church.update({ where: { id }, data: { theologicalNotes: notes } })
      added++
    }
  }
  console.log(`\nAdded ${added} pastor names from city field data`)

  // Save phone from city field for Church of the Harvest ARP
  const harvest = await prisma.church.findUnique({ where: { id: 26153 }, select: { phone: true } })
  if (harvest && !harvest.phone) {
    await prisma.church.update({ where: { id: 26153 }, data: { phone: '804-814-2411' } })
    console.log('Added phone for Church of the Harvest ARP')
  }
  const firstArp = await prisma.church.findUnique({ where: { id: 26149 }, select: { phone: true } })
  if (firstArp && !firstArp.phone) {
    await prisma.church.update({ where: { id: 26149 }, data: { phone: '704-864-3468' } })
    console.log('Added phone for First ARP Church')
  }

  // Save email for Mount Zion ARP
  const mzion = await prisma.church.findUnique({ where: { id: 26140 }, select: { email: true } })
  if (mzion && !mzion.email) {
    await prisma.church.update({ where: { id: 26140 }, data: { email: 'mountzionarp1@gmail.com' } })
    console.log('Added email for Mount Zion ARP')
  }

  // Quick stats
  const total = await prisma.church.count()
  const withPastor = await prisma.church.count({ where: { theologicalNotes: { contains: 'Pastor' } } })
  const withEmail = await prisma.church.count({ where: { email: { not: '' } } })
  const noNotes = await prisma.church.count({ where: { theologicalNotes: null } })
  const zUnknown = await prisma.church.count({ where: { zionistStance: 'unknown' } })
  console.log(`\n=== DB Stats ===`)
  console.log(`Total: ${total}`)
  console.log(`With pastor: ${withPastor} (${Math.round(withPastor/total*100)}%)`)
  console.log(`With email: ${withEmail}`)
  console.log(`No theological notes: ${noNotes}`)
  console.log(`Zionist unknown: ${zUnknown}`)

  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
