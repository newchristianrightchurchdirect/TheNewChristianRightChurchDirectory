// Correct the Christ Church Spokane leadership record.
//
// I wrote on 2026-07-31 that Joost Nixon "has pastored here since 2001". That came from a
// third-party speaker bio and is not true today: the church's own leadership page lists Kenton
// Spratt as the pastor and does not mention Nixon at all. Correcting my own error rather than
// leaving it, and recording the lesson — a speaker bio is as unreliable as a church directory.
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const c = await prisma.church.findUnique({ where: { id: 22 } })
  if (!c) { console.log('#22 not found'); await prisma.$disconnect(); return }

  // Strip the incorrect paragraph I added earlier, then restate it correctly.
  const cleaned = (c.theologicalNotes || '').split('\n\nNOTED 2026-07-31.')[0].trimEnd()

  const flags = new Set((c.recordFlag || '').split(';').filter(Boolean))
  flags.add('verify_stance')

  await prisma.church.update({
    where: { id: 22 },
    data: {
      leadership: 'Pastor: Kenton Spratt',
      notablePeople: null,
      recordFlag: [...flags].join(';'),
      sourceUrls: [...new Set([
        ...(c.sourceUrls || '').split(';').filter(Boolean),
        'https://ccspokane.com/more-about-us/leadership-staff/',
        'https://ccspokane.com/more-about-us/leadership-staff/kenton-spratt/',
        'https://postmillennialworldview.com/postmill-churches/',
      ])].join(';'),
      theologicalNotes: cleaned +
        '\n\nLEADERSHIP CONFIRMED 2026-07-31 from the church’s own site. **Kenton Spratt is the pastor** — the sole pastor listed, alongside a deacon and administrative staff. Born in Edmonton, he immigrated to the United States in 2006, moved to Spokane in 2013 and became a citizen in 2020; he studied under **J.I. Packer at Regent College**, and was previously the first pastor of Holy Trinity Church until 2013. CREC. Sermons and a YouTube channel are published; no church-run school or civil-sphere ministry is listed. ' +
        '\n\n**Correction to an earlier note on this record:** it stated that Joost Nixon had pastored here since 2001. That came from a third-party speaker bio and **does not reflect the church today** — Nixon does not appear anywhere on the staff or leadership pages. His current work is **Training Leaders International**, where he directs formal education, and Christ Covenant Reformed in Billings MT is a partner church of that training ministry, not his pastorate. ' +
        '\n\n**Lesson recorded:** a third-party *speaker bio* is no more current than a third-party *church directory*. Both are leads. Only the congregation’s own site settled this.' +
        '\n\nThe postmillennialworldview.com listing for this church (Kenton Spratt) is therefore **correct** — the only one of five attributions checked so far that has held up.',
      researchNote: '2026-07-31: leadership confirmed from the church’s own site — Kenton Spratt is pastor; Joost Nixon is not on staff. Corrects an earlier note of mine drawn from a stale speaker bio.',
      lastResearchedAt: new Date(),
    },
  })
  console.log('#22 Christ Church Spokane — leadership corrected: Kenton Spratt is pastor')
  console.log('   earlier claim that Joost Nixon pastors here has been retracted in the record')
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
