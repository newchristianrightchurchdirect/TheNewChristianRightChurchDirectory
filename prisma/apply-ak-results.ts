import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const results: { id: number, website?: string, email?: string, phone?: string, pastor?: string }[] = [
    { id: 25795, website: 'https://www.covenantbiblechurch.com', pastor: 'Jack Phelps' },
    { id: 25796, website: 'https://valleyreformationchurch.com', phone: '907-841-1021', pastor: 'Tait Zimmerman' },
    { id: 26215, website: 'https://akredeemer.org', email: 'info@akredeemer.org', phone: '(907) 317-9635' },
    { id: 26294, email: 'AgapeFellowshipAlaska@gmail.com', website: 'https://agapefellowshipak.com', pastor: 'Nathaniel Buck' },
  ]

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

  const ak = await prisma.$queryRaw<any[]>`
    SELECT COUNT(*) as total,
      SUM(CASE WHEN email IS NOT NULL AND email != '' THEN 1 ELSE 0 END) as emails,
      SUM(CASE WHEN phone IS NOT NULL AND phone != '' THEN 1 ELSE 0 END) as phones,
      SUM(CASE WHEN website LIKE 'http%' THEN 1 ELSE 0 END) as websites,
      SUM(CASE WHEN "theologicalNotes" LIKE '%Pastor%' THEN 1 ELSE 0 END) as pastors
    FROM "Church" WHERE state = 'AK'
  `
  const s = ak[0]
  console.log(`\n=== Alaska Report ===`)
  console.log(`Updated: ${updated} | Total: ${s.total} | Email: ${s.emails} | Phone: ${s.phones} | Website: ${s.websites} | Pastor: ${s.pastors}`)
  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
