import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const total = await prisma.church.count()
  const withPastor = await prisma.church.count({ where: { theologicalNotes: { contains: 'Pastor' } } })
  const withEmail = await prisma.church.count({ where: { NOT: [{ email: null }, { email: '' }] } })
  const withPhone = await prisma.church.count({ where: { NOT: [{ phone: null }, { phone: '' }] } })
  const withWebsite = await prisma.church.count({ where: { website: { startsWith: 'http' } } })
  const withCoords = await prisma.church.count({ where: { NOT: { latitude: null } } })
  const nullNotes = await prisma.church.count({ where: { theologicalNotes: null } })
  const zNo = await prisma.church.count({ where: { zionistStance: 'no' } })
  const zUnknown = await prisma.church.count({ where: { zionistStance: 'unknown' } })
  const approved = await prisma.church.count({ where: { approved: true } })
  
  console.log('=== CHURCH DIRECTORY DATABASE ===')
  console.log(`Total: ${total} | Approved: ${approved}`)
  console.log()
  console.log(`Email:    ${withEmail} (${Math.round(withEmail/total*100)}%)`)
  console.log(`Phone:    ${withPhone} (${Math.round(withPhone/total*100)}%)`)
  console.log(`Website:  ${withWebsite} (${Math.round(withWebsite/total*100)}%)`)
  console.log(`Coords:   ${withCoords} (${Math.round(withCoords/total*100)}%)`)
  console.log(`Pastor:   ${withPastor} (${Math.round(withPastor/total*100)}%)`)
  console.log(`Theology: ${total - nullNotes} (${nullNotes} null)`)
  console.log(`Zionist:  no=${zNo} | unknown=${zUnknown}`)
  console.log()
  
  const denoms = await prisma.$queryRaw<any[]>`
    SELECT denomination, COUNT(*) as total,
      SUM(CASE WHEN "theologicalNotes" LIKE '%Pastor%' THEN 1 ELSE 0 END) as pastors,
      SUM(CASE WHEN email IS NOT NULL AND email != '' THEN 1 ELSE 0 END) as emails,
      SUM(CASE WHEN phone IS NOT NULL AND phone != '' THEN 1 ELSE 0 END) as phones
    FROM "Church" GROUP BY denomination ORDER BY COUNT(*) DESC LIMIT 15
  `
  console.log('Denom'.padEnd(22) + 'Total'.padStart(6) + 'Pastor'.padStart(8) + 'Email'.padStart(7) + 'Phone'.padStart(7))
  for (const d of denoms) {
    console.log(
      (d.denomination || 'null').padEnd(22) + 
      String(d.total).padStart(6) +
      String(d.pastors).padStart(8) +
      String(d.emails).padStart(7) +
      String(d.phones).padStart(7)
    )
  }
  
  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
