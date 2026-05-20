import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const results: { id: number, website?: string, email?: string, phone?: string, pastor?: string }[] = [
  { id: 70, phone: '(334) 618-7775', email: 'ChristFamilyMail@gmail.com' },
  { id: 299, website: 'https://www.christpreshuntsville.org/', pastor: 'Michael Calvert' },
  { id: 300, pastor: 'Lucia' }, // single name, will be filtered
  { id: 301, website: 'https://collinspresbyterian.org', pastor: 'Tommy Shields' },
  { id: 306, email: 'covenant@covpres.com' },
  { id: 308, email: 'contact@cpcauburn.org' },
  { id: 331, website: 'https://www.chantillychurch.com/' },
  { id: 353, phone: '(251) 215-0256', website: 'http://www.lillianfellowship.org', pastor: 'Dean Conkel' },
  { id: 357, website: 'https://marionpresbyterianchurch.com/', pastor: 'Mark Spellman' },
  { id: 367, phone: '(334) 397-4258' },
  { id: 369, pastor: 'K. Nicholas Yoda' },
  { id: 370, pastor: 'Ray H. Cureton' },
  { id: 371, email: 'providencepres@gmail.com' },
  { id: 374, email: 'info@redeemershoals.com' },
  { id: 380, pastor: 'Seyeom Son' },
  { id: 387, website: 'https://trinitygrace.org/', email: 'chris@trinitygrace.org' },
  { id: 389, email: 'info@trinitypca.org' },
  { id: 390, email: 'geoffmacpherson@gmail.com' },
  { id: 1556, website: 'https://www.darlingtonpres.org/' },
  { id: 2601, pastor: 'Jared Nelson' },
  { id: 2622, pastor: 'Paul Stith' },
  { id: 2628, pastor: 'Jeff Noblit' },
  { id: 2803, website: 'http://www.providencegospelchurch.com/' },
  { id: 2986, website: 'https://gbctroy.com/' },
  { id: 3405, phone: '(256) 479-5540' },
  { id: 3406, website: 'https://www.mmarpc.org/' },
  { id: 3409, phone: '(334) 872-1081', website: 'https://www.prosperityarp.org/' },
  { id: 3412, pastor: 'Greg Duke', website: 'https://riversidearp.org/' },
  { id: 3737, website: 'https://www.covpres.com/' }, // Urban Hope shares building with Covenant Pres
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

  // AL report
  const total = await prisma.church.count({ where: { state: 'AL' } })
  const hasEmail = await prisma.church.count({ where: { state: 'AL', email: { not: null } } })
  const hasPhone = await prisma.church.count({ where: { state: 'AL', phone: { not: null } } })
  const hasWebsite = await prisma.church.count({ where: { state: 'AL', website: { startsWith: 'http' } } })
  const hasPastor = await prisma.church.count({ where: { state: 'AL', theologicalNotes: { contains: 'Pastor' } } })
  console.log(`\nAL Report: ${total} total | Email: ${hasEmail} (${Math.round(hasEmail/total*100)}%) | Phone: ${hasPhone} (${Math.round(hasPhone/total*100)}%) | Website: ${hasWebsite} (${Math.round(hasWebsite/total*100)}%) | Pastor: ${hasPastor} (${Math.round(hasPastor/total*100)}%)`)

  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
