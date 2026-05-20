import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Agent 1 results - parsed manually from output
  const results: { id: number, website?: string, email?: string, phone?: string }[] = [
    { id: 22552, website: 'https://www.capitolhillbaptist.org/', phone: '(202) 543-6111' },
    { id: 22553, website: 'https://firstdallas.org/', phone: '(214) 969-0111' },
    { id: 22557, website: 'https://bethlehem.church/', phone: '(612) 338-7653' },
    { id: 22549, website: 'https://mcleanbible.org/' },
    { id: 23045, website: 'https://www.northparkpres.com/', phone: '(619) 855-7162' },
    { id: 23061, website: 'https://www.redemptionsd.org/', phone: '(858) 449-6192' },
    { id: 22686, phone: '(410) 708-1871' },
    { id: 22811, website: 'https://www.livingstonenb.com/', email: 'livingstonebaptist.830@gmail.com', phone: '(830) 629-2685' },
    { id: 22970, phone: '(562) 634-2910' },
    { id: 23123, phone: '(562) 866-8283' },
    { id: 23172, website: 'https://www.elredentor.net/', email: 'salcm@aol.com', phone: '(305) 546-8448' },
    { id: 23289, website: 'https://www.hopeaugusta.com/', phone: '(706) 540-2757' },
    { id: 23328, phone: '404-936-2441' },
  ]

  let updated = 0
  for (const r of results) {
    const c = await prisma.church.findUnique({ where: { id: r.id }, select: { email: true, phone: true, website: true } })
    if (!c) continue
    const updates: any = {}
    if (r.email && !c.email) updates.email = r.email
    if (r.phone && !c.phone) updates.phone = r.phone
    if (r.website && (!c.website || !c.website.startsWith('http'))) updates.website = r.website.replace(/\/+$/, '')
    if (Object.keys(updates).length > 0) {
      await prisma.church.update({ where: { id: r.id }, data: updates })
      updated++
      console.log(`  Updated ${r.id}: ${Object.keys(updates).join(', ')}`)
    }
  }
  console.log(`Applied ${updated} updates from agent batch 1`)
  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
