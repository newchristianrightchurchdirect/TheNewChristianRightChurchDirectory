import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Get all churches with phone numbers that need normalization
  const churches = await prisma.church.findMany({
    where: { phone: { not: null } },
    select: { id: true, phone: true },
    orderBy: { id: 'asc' }
  })

  const updates: { id: number, phone: string }[] = []
  for (const c of churches) {
    if (!c.phone) continue
    const digits = c.phone.replace(/\D/g, '')
    const d = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits
    if (d.length === 10) {
      const formatted = `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`
      if (c.phone !== formatted) {
        updates.push({ id: c.id, phone: formatted })
      }
    }
  }

  console.log(`${updates.length} phones to normalize`)

  // Batch update in groups of 50
  for (let i = 0; i < updates.length; i += 50) {
    const batch = updates.slice(i, i + 50)
    await prisma.$transaction(
      batch.map(u => prisma.church.update({ where: { id: u.id }, data: { phone: u.phone } }))
    )
    console.log(`  Normalized ${Math.min(i + 50, updates.length)}/${updates.length}`)
  }

  // Final report
  const total = await prisma.church.count()
  const hasEmail = await prisma.church.count({ where: { email: { not: null } } })
  const hasPhone = await prisma.church.count({ where: { phone: { not: null } } })
  const hasWebsite = await prisma.church.count({ where: { website: { startsWith: 'http' } } })
  const hasPastor = await prisma.church.count({ where: { theologicalNotes: { contains: 'Pastor' } } })
  console.log(`\nPost-cleanup: ${total} churches | Email: ${hasEmail} | Phone: ${hasPhone} | Website: ${hasWebsite} | Pastor: ${hasPastor}`)

  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
