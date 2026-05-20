import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const results: { id: number, website?: string, email?: string, phone?: string, pastor?: string }[] = [
  { id: 693, website: 'pckc.org' },
  { id: 696, email: 'officeadmin@pinewoodchurch.org' },
  { id: 701, email: 'info@rpcinverness.com' },
  { id: 704, email: 'office@redeemerriverview.org' },
  { id: 705, pastor: 'Gueillant Dorcinvil' },
  { id: 723, website: 'stpaulsorlando.com' },
  { id: 728, email: 'info@treasurecoastpca.org' },
  { id: 732, phone: '(901) 326-2448' },
  { id: 733, pastor: 'Jerry Robbins', email: 'office@wpca.net' },
  { id: 735, email: 'office@wpcfortmyers.org' },
  { id: 736, email: 'office@wpcbrandon.org' },
  { id: 737, website: 'westminstermilton.org' },
  { id: 738, website: 'wpc-pca.com' },
  { id: 2300, email: 'boer.1@opc.org' },
  { id: 2312, email: 'sharpe.1@opc.org', website: 'calvaryopc.net' },
  { id: 2424, pastor: 'Tony Alonso' },
  { id: 2485, email: 'gweaver@faithreformedbaptistfl.org', pastor: 'G. Weaver' },
  { id: 2538, website: 'graceandpeacesfl.com' },
  { id: 2645, pastor: 'A.W. Tucker' },
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
  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
