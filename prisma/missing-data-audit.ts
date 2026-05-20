import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const total = await prisma.church.count()
  const gaps = await prisma.$queryRaw<any[]>`
    SELECT denomination,
      COUNT(*) as total,
      SUM(CASE WHEN email IS NULL OR email = '' THEN 1 ELSE 0 END) as no_email,
      SUM(CASE WHEN phone IS NULL OR phone = '' THEN 1 ELSE 0 END) as no_phone,
      SUM(CASE WHEN website IS NULL OR website = '' OR website NOT LIKE 'http%' THEN 1 ELSE 0 END) as no_website,
      SUM(CASE WHEN address ~ '^[A-Za-z]' AND address !~ '[0-9]' THEN 1 ELSE 0 END) as city_only_addr
    FROM "Church" GROUP BY denomination ORDER BY COUNT(*) DESC LIMIT 12
  `
  const totals = await prisma.$queryRaw<any[]>`
    SELECT 
      SUM(CASE WHEN email IS NULL OR email = '' THEN 1 ELSE 0 END) as no_email,
      SUM(CASE WHEN phone IS NULL OR phone = '' THEN 1 ELSE 0 END) as no_phone,
      SUM(CASE WHEN website IS NULL OR website = '' OR website NOT LIKE 'http%' THEN 1 ELSE 0 END) as no_website,
      SUM(CASE WHEN address ~ '^[A-Za-z]' AND address !~ '[0-9]' THEN 1 ELSE 0 END) as city_only_addr
    FROM "Church"
  `
  const t = totals[0]
  console.log('=== Missing Data Summary ===')
  console.log(`Email:   ${t.no_email} missing (${Math.round((total-Number(t.no_email))/total*100)}% have)`)
  console.log(`Phone:   ${t.no_phone} missing (${Math.round((total-Number(t.no_phone))/total*100)}% have)`)
  console.log(`Website: ${t.no_website} missing (${Math.round((total-Number(t.no_website))/total*100)}% have)`)
  console.log(`Address: ${t.city_only_addr} city-only (no street number)`)
  
  console.log('\n' + 'Denom'.padEnd(22) + 'Total'.padStart(6) + 'NoEmail'.padStart(9) + 'NoPhone'.padStart(9) + 'NoWeb'.padStart(8) + 'NoAddr'.padStart(8))
  for (const d of gaps) {
    console.log(
      (d.denomination||'?').padEnd(22) + 
      String(d.total).padStart(6) +
      String(d.no_email).padStart(9) +
      String(d.no_phone).padStart(9) +
      String(d.no_website).padStart(8) +
      String(d.city_only_addr).padStart(8)
    )
  }
  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
