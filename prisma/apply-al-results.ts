import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Manually parsed results from agent (cleaned up shifted columns)
const results: Record<number, { website?: string, email?: string, phone?: string, pastor?: string }> = {
  22611: { website: 'https://www.alexcityreformed.com', pastor: 'Patrick McDonald' },
  22613: { pastor: 'Mark Liddle' },
  22614: { phone: '(256) 764-2300', pastor: 'Daniel Michael' },
  22856: { email: undefined }, // no useful data
  22860: { pastor: 'George H. McKee' },
  22889: { pastor: 'Lincoln Speece' },
  22896: { website: 'https://www.lindenpres.org' },
  22897: { pastor: 'Lincoln Speece' },
  22898: { website: 'https://www.loxleypresbyterian.org' },
  22899: { website: 'https://www.marionpresbyterianchurch.com' },
  22911: { website: 'https://www.pleasantridgepresbyterian.org' },
  22912: { pastor: 'Ray H. Cureton' },
  22922: { phone: '(334) 308-9893', pastor: 'Seyeom Son' },
  22929: { website: 'https://www.trinitygrace.org' },
  22933: { website: 'https://www.unitypresbyterianchurch.com' },
  25072: { pastor: 'Chris Lamb' },
  25082: { phone: '(256) 837-8821', pastor: 'Chip Davidson' },
  25123: { pastor: 'Traever Guingrich' },
  25142: { website: 'https://www.gracecovenantbaptist.org', phone: '(205) 426-2234', pastor: 'Todd Wilson' },
  25143: { phone: '(256) 677-9038' },
  25158: { website: 'https://www.gfbcrd.org', phone: '(251) 410-7619', pastor: 'Mark Gervais' },
  25345: { pastor: 'Andy Sherrill' },
  25378: { pastor: 'Brandon Scroggins' },
  25716: { phone: '(256) 355-3790', pastor: 'Parker Smith' },
  25794: { website: 'https://www.christchurchbranchcove.org', phone: '(205) 644-2100' },
  25950: { phone: '(256) 479-5540' },
  25954: { website: 'https://www.prosperityarp.org', phone: '(334) 872-1081' },
  25957: { website: 'https://www.riversidearp.org' },
}

async function main() {
  let updated = 0
  for (const [idStr, data] of Object.entries(results)) {
    const id = Number(idStr)
    const c = await prisma.church.findUnique({ 
      where: { id }, 
      select: { email: true, phone: true, website: true, theologicalNotes: true } 
    })
    if (!c) continue
    
    const updates: any = {}
    if (data.email && !c.email) updates.email = data.email
    if (data.phone && !c.phone) updates.phone = data.phone
    if (data.website && (!c.website || !c.website.startsWith('http'))) updates.website = data.website
    if (data.pastor && (!c.theologicalNotes || !c.theologicalNotes.includes('Pastor'))) {
      let notes = c.theologicalNotes || ''
      if (notes && !notes.endsWith('.')) notes += '.'
      notes = notes ? notes + ` Pastor ${data.pastor}.` : `Pastor ${data.pastor}.`
      updates.theologicalNotes = notes
    }
    
    if (Object.keys(updates).length > 0) {
      await prisma.church.update({ where: { id }, data: updates })
      updated++
      console.log(`  ${id}: ${Object.keys(updates).join(', ')}`)
    }
  }
  
  // Stats for AL
  const al = await prisma.$queryRaw<any[]>`
    SELECT COUNT(*) as total,
      SUM(CASE WHEN email IS NOT NULL AND email != '' THEN 1 ELSE 0 END) as emails,
      SUM(CASE WHEN phone IS NOT NULL AND phone != '' THEN 1 ELSE 0 END) as phones,
      SUM(CASE WHEN website LIKE 'http%' THEN 1 ELSE 0 END) as websites,
      SUM(CASE WHEN "theologicalNotes" LIKE '%Pastor%' THEN 1 ELSE 0 END) as pastors
    FROM "Church" WHERE state = 'AL'
  `
  const s = al[0]
  console.log(`\n=== Alabama Report ===`)
  console.log(`Updated: ${updated} churches`)
  console.log(`Total: ${s.total} | Email: ${s.emails} | Phone: ${s.phones} | Website: ${s.websites} | Pastor: ${s.pastors}`)
  
  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
