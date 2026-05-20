import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  // Get churches missing multiple fields, skip ones with garbage city names
  const churches = await prisma.$queryRaw<any[]>`
    SELECT id, name, city, state, denomination, email, phone, website, address
    FROM "Church"
    WHERE (
      (email IS NULL OR email = '')
      OR (phone IS NULL OR phone = '')
      OR (website IS NULL OR website = '' OR website NOT LIKE 'http%')
    )
    AND city NOT LIKE '%County%'
    AND city NOT LIKE '%Township%'
    AND city != 'Unknown'
    AND LENGTH(city) > 3
    AND name NOT LIKE '%Korean%'
    AND name NOT LIKE '%College%'
    AND name NOT LIKE '%Seminary%'
    ORDER BY 
      (CASE WHEN email IS NULL OR email = '' THEN 1 ELSE 0 END) +
      (CASE WHEN phone IS NULL OR phone = '' THEN 1 ELSE 0 END) +
      (CASE WHEN website IS NULL OR website = '' OR website NOT LIKE 'http%' THEN 1 ELSE 0 END) DESC,
      id ASC
    LIMIT 50
  `
  
  // Format for agent consumption
  for (const c of churches) {
    const needs = []
    if (!c.email) needs.push('email')
    if (!c.phone) needs.push('phone')
    if (!c.website || !c.website.startsWith('http')) needs.push('website')
    console.log(`${c.id}|${c.name}|${c.city}, ${c.state}|${c.denomination}|needs:${needs.join(',')}`)
  }
  
  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
