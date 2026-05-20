import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const results: { id: number, website?: string, email?: string, phone?: string, pastor?: string }[] = [
    { id: 23070, website: 'https://lordschurchla.com', phone: '(562) 866-8283' },
    { id: 25070, website: 'https://www.gatewaylivermore.org', phone: '(925) 449-1444' },
    { id: 25107, website: 'https://www.gbfreformed.org', phone: '(209) 522-2004' },
    { id: 25118, website: 'https://www.gbc-sd.org', phone: '(858) 762-4646' },
    { id: 25527, website: 'https://www.palmdale.church' },
    { id: 25735, website: 'https://emmausrbc.org', phone: '(951) 444-8765' },
    { id: 25753, phone: '(916) 972-1106' },
    { id: 25756, website: 'https://lightbythebay.church', phone: '(510) 432-9526' },
    { id: 25799, website: 'https://www.hinkleybiblechurch.com', phone: '(760) 253-2783' },
    { id: 25804, website: 'https://www.gpcredding.org', phone: '530-223-5288' },
    { id: 26192, phone: '(626) 820-9390', pastor: 'Jay Fluck' },
    { id: 26201, phone: '(661) 776-5226', pastor: 'Ruben Zartman' },
    { id: 26203, website: 'https://calvaryreformedchurch.com', phone: '(209) 599-4294' },
    { id: 26222, website: 'https://pasadenaurc.org', phone: '626-437-4944', pastor: 'Movses Janbazian' },
    { id: 26224, website: 'https://highdeserturc.org', phone: '(760) 951-0809', pastor: 'Tom Morrison' },
    { id: 26256, website: 'https://emmanuelgrace.org', phone: '(916) 721-7730' },
    { id: 26315, website: 'https://www.sfopc.org', phone: '(415) 564-8180' },
    { id: 26319, website: 'https://www.newlifelamesa.org', phone: '619-667-5999' },
    { id: 26447, website: 'https://www.bigspringsurc.com', pastor: 'Nollie Malabuyo' },
    { id: 26459, website: 'http://trinityurcwc.org', phone: '(510) 432-9526', pastor: 'Joghinda Gangar' },
    { id: 26460, website: 'https://www.zionreformedripon.org', phone: '(209) 599-9399' },
    { id: 26461, website: 'https://www.fresnourc.com', phone: '(559) 276-7382' },
    { id: 26462, website: 'https://www.graceurctorrance.org', phone: '(310) 782-7019' },
    { id: 26463, website: 'https://www.christurc.org', phone: '(619) 258-8500', pastor: 'Michael Brown' },
    { id: 26501, website: 'https://www.chinourc.org', phone: '(909) 591-9111' },
    { id: 26502, website: 'https://www.ontariourc.org', phone: '(909) 986-9889' },
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
    }
  }
  const ca = await prisma.$queryRaw<any[]>`
    SELECT COUNT(*) as total,
      SUM(CASE WHEN email IS NOT NULL AND email != '' THEN 1 ELSE 0 END) as emails,
      SUM(CASE WHEN phone IS NOT NULL AND phone != '' THEN 1 ELSE 0 END) as phones,
      SUM(CASE WHEN website LIKE 'http%' THEN 1 ELSE 0 END) as websites,
      SUM(CASE WHEN "theologicalNotes" LIKE '%Pastor%' THEN 1 ELSE 0 END) as pastors
    FROM "Church" WHERE state = 'CA'
  `
  const s = ca[0]
  console.log(`=== California Batch 1 Report ===`)
  console.log(`Updated: ${updated} | Total: ${s.total} | Email: ${s.emails} | Phone: ${s.phones} | Website: ${s.websites} | Pastor: ${s.pastors}`)
  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
