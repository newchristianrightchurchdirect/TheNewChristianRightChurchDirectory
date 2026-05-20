import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const results: { id: number, website?: string, email?: string, phone?: string, pastor?: string }[] = [
  { id: 20, email: 'Joseph@KingsWayBible.org' },
  { id: 427, email: 'jspark4c55@yahoo.com' },
  { id: 2659, email: 'jyoung@heritagebaptistaz.org' },
  { id: 2868, pastor: 'Scott Malm' },
  { id: 3254, email: 'contact@grace4families.org' },
  { id: 3369, email: 'info@covenantopctucson.org', phone: '(520) 261-1948' },
  { id: 3988, phone: '(928) 768-2515', website: 'https://www.gscbc.org/' },
]

async function main() {
  let updated = 0
  for (const r of results) {
    const c = await prisma.church.findUnique({
      where: { id: r.id },
      select: { email: true, phone: true, website: true, theologicalNotes: true }
    })
    if (!c) { console.log(`  ID ${r.id}: NOT FOUND`); continue }

    const updates: any = {}
    if (r.email && !c.email) updates.email = r.email
    if (r.phone && !c.phone) updates.phone = r.phone
    if (r.website && (!c.website || !c.website.startsWith('http'))) updates.website = r.website
    if (r.pastor && r.pastor.includes(' ') && (!c.theologicalNotes || !c.theologicalNotes.includes('Pastor'))) {
      let notes = c.theologicalNotes || ''
      if (notes && !notes.endsWith('.')) notes += '.'
      notes = notes ? notes + ` Pastor ${r.pastor}.` : `Pastor ${r.pastor}.`
      updates.theologicalNotes = notes
    }

    if (Object.keys(updates).length > 0) {
      await prisma.church.update({ where: { id: r.id }, data: updates })
      console.log(`  ${r.id}: updated ${Object.keys(updates).join(', ')}`)
      updated++
    } else {
      console.log(`  ${r.id}: no new data`)
    }
  }

  console.log(`\nUpdated ${updated} churches`)

  const total = await prisma.church.count({ where: { state: 'AZ' } })
  const hasEmail = await prisma.church.count({ where: { state: 'AZ', email: { not: null } } })
  const hasPhone = await prisma.church.count({ where: { state: 'AZ', phone: { not: null } } })
  const hasWebsite = await prisma.church.count({ where: { state: 'AZ', website: { startsWith: 'http' } } })
  const hasPastor = await prisma.church.count({ where: { state: 'AZ', theologicalNotes: { contains: 'Pastor' } } })
  console.log(`\nAZ Report: ${total} total | Email: ${hasEmail} (${Math.round(hasEmail/total*100)}%) | Phone: ${hasPhone} (${Math.round(hasPhone/total*100)}%) | Website: ${hasWebsite} (${Math.round(hasWebsite/total*100)}%) | Pastor: ${hasPastor} (${Math.round(hasPastor/total*100)}%)`)

  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
