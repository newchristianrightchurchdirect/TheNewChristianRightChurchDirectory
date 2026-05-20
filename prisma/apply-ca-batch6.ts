import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const results: { id: number, website?: string, email?: string, phone?: string, pastor?: string }[] = [
  { id: 22623, pastor: 'Mike Johnson' },
  { id: 22627, pastor: 'John Waldrip' },
  { id: 22582, email: 'office@christchurchscv.com' },
  { id: 24947, email: 'christredeemer1689@gmail.com' },
  { id: 25107, email: 'info@gbfreformed.org' },
  { id: 25129, email: 'graceame@ymail.com' },
  { id: 25236, email: 'office@ibcsac.org' },
  { id: 25283, pastor: 'Mike Johnson' },
  { id: 25468, pastor: 'Brian Anderson' },
  { id: 25496, pastor: 'Campbell Colledge' },
  { id: 25527, phone: '661-349-8649', pastor: 'Anthony Delgado' },
  { id: 25690, pastor: 'Antonio Rugnao' },
  { id: 25735, pastor: 'Joe Anady' },
  { id: 25756, email: 'info@lightbythebay.church', pastor: 'Glenn Nicolas' },
  { id: 23037, pastor: 'Will Chang' },
  { id: 25800, website: 'https://www.rpcla.org' },
  { id: 26323, pastor: undefined }, // same church as 25800 probably
]

async function main() {
  let updated = 0
  for (const r of results) {
    const c = await prisma.church.findUnique({ where: { id: r.id }, select: { email: true, phone: true, website: true, theologicalNotes: true } })
    if (!c) continue
    const updates: any = {}
    if (r.email && !c.email) updates.email = r.email
    if (r.phone && !c.phone) updates.phone = r.phone
    if (r.website && (!c.website || !c.website.startsWith('http'))) updates.website = r.website
    if (r.pastor && (!c.theologicalNotes || !c.theologicalNotes.includes('Pastor'))) {
      let notes = c.theologicalNotes || ''
      if (notes && !notes.endsWith('.')) notes += '.'
      notes = notes ? notes + ` Pastor ${r.pastor}.` : `Pastor ${r.pastor}.`
      updates.theologicalNotes = notes
    }
    if (Object.keys(updates).length > 0) {
      await prisma.church.update({ where: { id: r.id }, data: updates })
      updated++
      console.log(`  ${r.id}: ${Object.keys(updates).join(', ')}`)
    }
  }
  console.log(`\nCA batch 6: updated ${updated} churches`)

  const total = await prisma.church.count()
  const hasEmail = await prisma.church.count({ where: { email: { not: null } } })
  const hasPhone = await prisma.church.count({ where: { phone: { not: null } } })
  const hasWebsite = await prisma.church.count({ where: { website: { startsWith: 'http' } } })
  const hasPastor = await prisma.church.count({ where: { theologicalNotes: { contains: 'Pastor' } } })
  const caNeeds = await prisma.church.count({ where: { state: 'CA', OR: [{ email: null }, { phone: null }, { website: { not: { startsWith: 'http' } } }, { NOT: { theologicalNotes: { contains: 'Pastor' } } }] } })
  console.log(`\nOverall: ${total} total | Email: ${hasEmail} | Phone: ${hasPhone} | Website: ${hasWebsite} | Pastor: ${hasPastor}`)
  console.log(`CA remaining: ${caNeeds}`)
  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
