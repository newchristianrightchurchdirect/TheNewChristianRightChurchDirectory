import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const results: { id: number, website?: string, email?: string, phone?: string, pastor?: string }[] = [
  { id: 3252, email: 'session@covenantbiblechurch.com', phone: '(907) 745-7600', pastor: 'Jack Phelps' },
  { id: 3253, phone: '(907) 841-1021', pastor: 'Tait Zimmerman' },
  { id: 3313, email: 'pakyongd@gmail.com', pastor: 'Yong Dok Pak' },
  { id: 3664, phone: '(475) 325-1517', pastor: 'Joseph Váradi' },
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

  const total = await prisma.church.count({ where: { state: 'AK' } })
  const hasEmail = await prisma.church.count({ where: { state: 'AK', email: { not: null } } })
  const hasPhone = await prisma.church.count({ where: { state: 'AK', phone: { not: null } } })
  const hasWebsite = await prisma.church.count({ where: { state: 'AK', website: { startsWith: 'http' } } })
  const hasPastor = await prisma.church.count({ where: { state: 'AK', theologicalNotes: { contains: 'Pastor' } } })
  console.log(`\nAK Report: ${total} total | Email: ${hasEmail} (${Math.round(hasEmail/total*100)}%) | Phone: ${hasPhone} (${Math.round(hasPhone/total*100)}%) | Website: ${hasWebsite} (${Math.round(hasWebsite/total*100)}%) | Pastor: ${hasPastor} (${Math.round(hasPastor/total*100)}%)`)

  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
