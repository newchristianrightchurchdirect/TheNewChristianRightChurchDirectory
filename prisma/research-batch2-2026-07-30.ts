// Individually researched, per the standard: site, church socials, pastor socials/podcast,
// then the pastor's name searched against each marker.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'

const prisma = new PrismaClient()

async function main() {
  // ---- Mercy Seat Christian Church, Hartland WI — Pastor Matthew Trewhella ----
  const mercy = await prisma.church.findFirst({
    where: { state: 'WI', name: { contains: 'Mercy Seat', mode: 'insensitive' } },
  })
  if (mercy) {
    await updateStances(prisma, mercy.id, {
      culturalEngagement: 'transformationalist',
      abolitionStance: 'pro_abolition',
      christianNationalism: 'affirm',
      theonomy: 'sympathetic',
      eschatology: 'postmill',
    }, {
      actor: 'research-batch2-2026-07-30.ts',
      note: 'Founder of Missionaries to the Preborn; author of The Doctrine of the Lesser Magistrates; described in reporting as the eminence grise of the abortion abolitionist movement, which seeks outright criminalisation and rejects incrementalism as "regulating murder". Abolition and civil-resistance positions are first-hand and extensively documented.',
      alsoSet: {
        stanceBasis: 'evidenced',
        recordFlag: null,
        leadership: 'Pastor: Matthew Trewhella',
        denomination: 'Independent',
        notablePeople: 'Matthew Trewhella — founder of Missionaries to the Preborn and author of The Doctrine of the Lesser Magistrates; a central figure in the abortion abolition movement.',
        theologicalNotes:
          'INDEPENDENTLY VERIFIED 2026-07-30. Pastor **Matthew Trewhella**, who founded the church in 1989 and founded **Missionaries to the Preborn** in 1990 — the first Christian mission in America to name the preborn child as its people group. Six of Milwaukee\u2019s eight abortion facilities have since closed and abortion in Wisconsin has fallen by over 60%. ' +
          'He wrote **The Doctrine of the Lesser Magistrates: A Proper Resistance to Tyranny**, and published the first English translation of the **Magdeburg Confession (1550)**, the text that formalised that doctrine. Reporting describes him as the eminence grise of the abortion abolitionist movement, which "seeks the outright criminalization of abortion" and "sneers at incremental anti-abortion measures as regulating murder" \u2014 the abolitionist position stated exactly. ' +
          'He lectures for the John Birch Society and is documented as influencing Wisconsin Republican politics. This is corporate, sustained, institutional action on the central question of this directory.',
        sourceUrls: 'http://missionariestothepreborn.com/;https://en.wikipedia.org/wiki/Missionaries_to_the_Preborn;https://wisconsinwatch.org/2024/07/wisconsin-trewhella-republican-abortion-election-pastor-politics/;https://defytyrants.com/;https://postmillennialworldview.com/postmill-churches/',
        researchNote: '2026-07-30: independently verified. Founder of Missionaries to the Preborn; author of The Doctrine of the Lesser Magistrates.',
      },
    })
    console.log(`#${mercy.id} Mercy Seat (Trewhella) — VERIFIED, evidenced`)
  } else console.log('Mercy Seat not found')

  // ---- Refuge Church, Ogden UT (#16) — Pastor Brian Sauve ----
  await updateStances(prisma, 16, {
    culturalEngagement: 'transformationalist',
    abolitionStance: 'pro_abolition',
    christianNationalism: 'affirm',
    genderStance: 'patriarchal',
    eschatology: 'postmill',
  }, {
    actor: 'research-batch2-2026-07-30.ts',
    note: 'Pastor Brian Sauve self-describes as "Patriarchal, Postmillennial, Social Conservative, Abortion Abolitionist"; the church explicitly affirms biblical patriarchy in its own doctrine; he founded New Christendom Press. All markers first-hand from the church and pastor.',
    alsoSet: {
      stanceBasis: 'evidenced',
      recordFlag: null,
      leadership: 'Pastors: Brian Sauve, Eric Conn, Dan Berkholder, Kevin Griffith, Ben Garrett',
      notablePeople: 'Brian Sauve — founder and president of New Christendom Press. Eric Conn — co-pastor, also a public voice in the same movement.',
      theologicalNotes:
        'INDEPENDENTLY VERIFIED 2026-07-30. Lead pastor **Brian Sauve** describes himself on his own site as "a Reformed Christian, a Protestant, Inerrantist, Calvinist, **Patriarchal, Postmillennial**, Social Conservative, **Abortion Abolitionist**" \u2014 four of this directory\u2019s markers stated by the man himself. ' +
          'The church **explicitly subscribes to and affirms "a Christlike father-rule within the home, often referred to as biblical patriarchy"** in its own doctrinal statement, so patriarchy is institutional here, not merely personal. ' +
          'Sauve founded and presides over **New Christendom Press** and argues Scripture has "direct implications for all of life... political" \u2014 explicit transformationalism. He is a prominent and combative voice on X; critics call the church "Christ Church Moscow 2.0". Co-pastor **Eric Conn** is a further public figure in the same orbit.',
      sourceUrls: 'https://www.briansauve.com/;https://x.com/Brian_Sauve;https://thethink.institute/articles/brian-sauv-the-rise-of-the-christian-culture-builders;https://postmillennialworldview.com/postmill-churches/',
      researchNote: '2026-07-30: independently verified via the pastor\u2019s own site and the church\u2019s doctrinal statement on patriarchy.',
    },
  })
  console.log('#16 Refuge Church (Sauve) — VERIFIED, evidenced')

  const n = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist' } })
  const e = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist', stanceBasis: 'evidenced' } })
  console.log(`\ntransformationalist ${n}, of which evidenced ${e}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
