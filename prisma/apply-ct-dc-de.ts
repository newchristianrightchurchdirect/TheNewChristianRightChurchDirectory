import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const results: { id: number, website?: string, email?: string, phone?: string, pastor?: string }[] = [
  { id: 42, email: 'info@ledyardpca.org' },
  { id: 558, email: 'contact@cpcct.org', website: 'https://www.cpcct.org' },
  { id: 10, email: 'chbc@capbap.org' },
  { id: 3935, email: 'info@ChristReformedDC.org', phone: '(202) 656-1611' },
  { id: 43, email: 'office@eopc.org' },
  { id: 581, email: 'redemptionchurch@redemption.global', website: 'https://www.redemptionisfamily.com' },
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

  // Report for each state
  const ct = await prisma.church.count({ where: { state: 'CT' } })
  const ctEmail = await prisma.church.count({ where: { state: 'CT', email: { not: null } } })
  const ctPhone = await prisma.church.count({ where: { state: 'CT', phone: { not: null } } })
  const ctWebsite = await prisma.church.count({ where: { state: 'CT', website: { startsWith: 'http' } } })
  const ctPastor = await prisma.church.count({ where: { state: 'CT', theologicalNotes: { contains: 'Pastor' } } })

  const dc = await prisma.church.count({ where: { state: 'DC' } })
  const dcEmail = await prisma.church.count({ where: { state: 'DC', email: { not: null } } })
  const dcPhone = await prisma.church.count({ where: { state: 'DC', phone: { not: null } } })
  const dcWebsite = await prisma.church.count({ where: { state: 'DC', website: { startsWith: 'http' } } })
  const dcPastor = await prisma.church.count({ where: { state: 'DC', theologicalNotes: { contains: 'Pastor' } } })

  const de = await prisma.church.count({ where: { state: 'DE' } })
  const deEmail = await prisma.church.count({ where: { state: 'DE', email: { not: null } } })
  const dePhone = await prisma.church.count({ where: { state: 'DE', phone: { not: null } } })
  const deWebsite = await prisma.church.count({ where: { state: 'DE', website: { startsWith: 'http' } } })
  const dePastor = await prisma.church.count({ where: { state: 'DE', theologicalNotes: { contains: 'Pastor' } } })

  console.log(`\nCT Report: ${ct} total | Email: ${ctEmail} (${Math.round(ctEmail/ct*100)}%) | Phone: ${ctPhone} (${Math.round(ctPhone/ct*100)}%) | Website: ${ctWebsite} (${Math.round(ctWebsite/ct*100)}%) | Pastor: ${ctPastor} (${Math.round(ctPastor/ct*100)}%)`)
  console.log(`DC Report: ${dc} total | Email: ${dcEmail} (${Math.round(dcEmail/dc*100)}%) | Phone: ${dcPhone} (${Math.round(dcPhone/dc*100)}%) | Website: ${dcWebsite} (${Math.round(dcWebsite/dc*100)}%) | Pastor: ${dcPastor} (${Math.round(dcPastor/dc*100)}%)`)
  console.log(`DE Report: ${de} total | Email: ${deEmail} (${Math.round(deEmail/de*100)}%) | Phone: ${dePhone} (${Math.round(dePhone/de*100)}%) | Website: ${deWebsite} (${Math.round(deWebsite/de*100)}%) | Pastor: ${dePastor} (${Math.round(dePastor/de*100)}%)`)

  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
