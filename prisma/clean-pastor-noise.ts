import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const churches = await prisma.church.findMany({
    where: { theologicalNotes: { contains: 'Pastor' } },
    select: { id: true, theologicalNotes: true, name: true }
  })

  let cleaned = 0
  for (const c of churches) {
    if (!c.theologicalNotes) continue
    let notes = c.theologicalNotes
    const original = notes

    // Remove trailing noise words after pastor names
    notes = notes.replace(/Pastor\s+(\w+\s+\w+\.?\s+\w+)\s+Epaphroditus/g, 'Pastor $1')
    notes = notes.replace(/Pastor\s+(\w+\s+\w+\.?\s+\w+)\s+Elder/g, 'Pastor $1')
    notes = notes.replace(/Pastor\s+(\w+\s+\w+\.?\s+\w+)\s+Phone/g, 'Pastor $1')
    notes = notes.replace(/Pastor\s+(\w+\s+\w+\.?\s+\w+)\s+Our/g, 'Pastor $1')
    notes = notes.replace(/Pastor\s+(\w+\s+\w+\.?\s+\w+)\s+Deacons/g, 'Pastor $1')
    notes = notes.replace(/Pastor\s+(\w+\s+\w+\.?\s+\w+)\s+Meet/g, 'Pastor $1')
    notes = notes.replace(/Pastor Facebook X \w+/g, '')
    notes = notes.replace(/Pastor Bio A Message From/g, '')
    notes = notes.replace(/Pastor ChristRedeemer/g, '')
    notes = notes.replace(/Pastor Stacey M\. Cox Pastor/g, 'Pastor Stacey M. Cox')

    // Remove truncated names
    notes = notes.replace(/Pastor \w+ \w\. Mc\b/g, '')
    notes = notes.replace(/Pastor \w+ \w\. Garc\b/g, '')
    notes = notes.replace(/Pastor \w+ \w\. O\b/g, '')

    // Clean up
    notes = notes.replace(/\s{2,}/g, ' ').replace(/\.\s*\./g, '.').trim()

    if (notes !== original) {
      await prisma.church.update({ where: { id: c.id }, data: { theologicalNotes: notes } })
      cleaned++
      console.log(`Cleaned ${c.id}: ${c.name}`)
    }
  }
  console.log(`\nCleaned ${cleaned} entries`)
  await prisma.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
