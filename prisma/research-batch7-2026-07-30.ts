import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

async function main() {
  // ---- Christ Church, Moscow ID (#18) — Doug Wilson ----
  await updateStances(prisma, 18, {
    culturalEngagement: 'transformationalist',
    christianNationalism: 'affirm',
    theonomy: 'sympathetic',
    genderStance: 'patriarchal',
    eschatology: 'postmill',
  }, {
    actor: 'research-batch7-2026-07-30.ts',
    note: 'Wilson is a public proponent of postmillennialism, Christian nationalism and biblical patriarchy; his political theology draws directly on Rushdoony\u2019s Christian Reconstructionism. The congregation openly seeks to make Moscow a Christian town and has built a network of churches, schools and media. Documented in CNN, NPR and Religion News Service coverage.',
    alsoSet: {
      stanceBasis: 'evidenced', recordFlag: null,
      leadership: 'Pastor: Douglas Wilson',
      notablePeople: 'Douglas Wilson \u2014 founder of the CREC, Logos School, New Saint Andrews College and Canon Press; the most publicly prominent advocate of Christian nationalism in the United States.',
      theologicalNotes:
        'INDEPENDENTLY VERIFIED 2026-07-30. Pastor **Douglas Wilson**, the single most publicly prominent figure in this movement. Openly **postmillennial**, **Christian nationalist**, covenantal and committed to **biblical patriarchy**; his political theology draws directly on **R. J. Rushdoony\u2019s Christian Reconstructionism** and the claim that Old Testament civil law should order modern society. ' +
        'The congregation has drawn roughly **3,000 of Moscow\u2019s 25,000 residents** and states the intent to make Moscow a **"Christian town"** \u2014 a stated programme for a polity, not a private conviction. It anchors a global network of affiliated churches, classical schools and media (Logos School, New Saint Andrews, Canon Press), and Christ Church meets in the Logos School gymnasium. ' +
        'Extensively covered by CNN, NPR and Religion News Service. **This is the reference case for the transformationalist category.** ' +
        '**No abortion-abolition position located** \u2014 abolitionStance left unknown, which is why Christ Church scores 5/6 rather than 6/6 on the core markers.',
      sourceUrls: 'https://christkirk.com/;https://en.wikipedia.org/wiki/Christ_Church_(Moscow,_Idaho);https://www.cnn.com/2025/08/07/politics/pastor-doug-wilson-christian-domination-trump;https://religionnews.com/2025/12/10/christ-church-at-50-how-doug-wilson-pushed-christian-nationalism-to-the-center/;https://postmillennialworldview.com/postmill-churches/',
      researchNote: '2026-07-30: independently verified. Reference case for the category; abolition marker absent.',
    },
  })
  console.log('#18 Christ Church Moscow (Wilson) — VERIFIED, evidenced')

  // ---- MERGE the duplicate my own import created ----
  // The directory lists this congregation under its pre-2018 name "Charlotte CRC"; it has been
  // "Christ the King Reformed Church" since being removed from the CRC. Merge before deleting.
  const dup = await prisma.church.findUnique({ where: { id: 4166 } })
  const surv = await prisma.church.findUnique({ where: { id: 65 } })
  if (dup && surv) {
    const srcs = new Set((surv.sourceUrls || '').split(';').filter(Boolean))
    ;(dup.sourceUrls || '').split(';').filter(Boolean).forEach(s => srcs.add(s))
    const flags = new Set((surv.recordFlag || '').split(';').filter(Boolean))
    flags.add('verify_stance'); flags.add('review_nonfit')
    await prisma.church.update({
      where: { id: 65 },
      data: {
        leadership: surv.leadership || dup.leadership,
        latitude: surv.latitude ?? dup.latitude,
        longitude: surv.longitude ?? dup.longitude,
        sourceUrls: [...srcs].join(';'),
        recordFlag: [...flags].join(';'),
        eschatology: surv.eschatology === 'unknown' ? 'postmill' : surv.eschatology,
        notablePeople: 'Bret L. McAtee \u2014 author of the Iron Ink blog; a vocal defender of theonomy and postmillennialism, and of Kinism.',
        theologicalNotes: (surv.theologicalNotes || '') +
          '\n\nREVIEWED 2026-07-30. Pastor **Bret L. McAtee** is postmillennial and explicitly theonomic \u2014 he has written that "theonomy remains the only model that can consistently provide relief" and defends Bahnsen in print at his **Iron Ink** blog. On the directory\u2019s doctrinal markers he scores well. ' +
          '\n\n**EDITORIAL DECISION REQUIRED \u2014 NOT CLASSIFIED.** McAtee promotes **Kinism**, a teaching of racial/tribal separation. Promoting it in worship services led to the congregation\u2019s **removal from the CRC in December 2018**, and the **Southern Poverty Law Center listed the church among white-nationalist hate groups** in February 2021. ' +
          'That is a different thing from this directory\u2019s stated criteria, which concern Christ\u2019s authority over the civil sphere, not racial ideology. `culturalEngagement` is deliberately left **unknown** pending the owner\u2019s decision on whether such a congregation belongs here at all. Listing it as transformationalist would place it alongside Apologia and Christ Church without qualification. ' +
          '\n\n**Merged duplicate #4166** ("Charlotte CRC"), created 2026-07-30 by the postmillennialworldview.com import, which still uses the pre-2018 name.',
        researchNote: '2026-07-30: absorbed duplicate #4166. Doctrinally postmill/theonomic; Kinism and SPLC listing make classification an editorial decision, deliberately left unknown.',
        lastResearchedAt: new Date(),
      },
    })
    await prisma.stanceChange.create({
      data: { churchId: 65, churchName: surv.name, field: 'merge', oldValue: '#4166 Charlotte CRC',
              newValue: 'merged then deleted', actor: 'research-batch7-2026-07-30.ts',
              note: 'Import duplicate under the church\u2019s pre-2018 name. Merged before deletion.' },
    })
    await prisma.church.delete({ where: { id: 4166 } })
    console.log('#4166 Charlotte CRC merged into #65 Christ the King and deleted')
  }

  const e = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist', stanceBasis: 'evidenced' } })
  console.log(`\nevidenced now: ${e}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
