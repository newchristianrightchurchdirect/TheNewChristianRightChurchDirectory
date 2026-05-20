import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const results: { id: number, website?: string, email?: string, phone?: string, pastor?: string }[] = [
  { id: 485, website: 'livinghopepca.org' },
  { id: 506, email: 'pch3927@hotmail.com' },
  { id: 513, email: 'churchredeemer900@gmail.com' },
  { id: 516, phone: '(310) 375-3393' },
  { id: 523, website: 'www.koreanchurchos.org' },
  { id: 528, email: 'info@lordschurchla.com' },
  { id: 2250, email: 'CovenantOPCsj@gmail.com' },
  { id: 2343, email: 'office@gracecarson.org' },
  { id: 2346, email: 'thibault.1@opc.org' },
  { id: 2353, email: 'RedeemerOPC.sm@gmail.com' },
  { id: 2373, email: 'hankins.1@opc.org' },
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
