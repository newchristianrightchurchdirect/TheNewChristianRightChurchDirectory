import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

async function main() {
  // ---- Heritage Presbyterian Church, Cumming GA — Dr Joe Morecraft III ----
  const her = await prisma.church.findFirst({
    where: { state: 'GA', city: { contains: 'Cumming', mode: 'insensitive' }, name: { contains: 'Heritage Presbyterian', mode: 'insensitive' } },
  })
  if (her) {
    await updateStances(prisma, her.id, {
      culturalEngagement: 'transformationalist',
      theonomy: 'theonomic',
      christianNationalism: 'affirm',
      eschatology: 'postmill',
    }, {
      actor: 'research-batch3-2026-07-30.ts',
      note: 'Joe Morecraft III founded Chalcedon Presbyterian Church (1974) and the RPCUS (1983) on explicitly Christian-reconstructionist, theonomic grounds; ran for US Congress in 1986; serves as chaplain of the Cobb County Republican Assembly; wrote "With Liberty and Justice for All: Christian Politics Made Simple". Direct, sustained civil-sphere engagement.',
      alsoSet: {
        stanceBasis: 'evidenced', recordFlag: null,
        leadership: 'Pastor: Dr. Joe Morecraft III',
        denomination: 'RPCUS',
        notablePeople: 'Dr. Joe Morecraft III — founder of the Reformed Presbyterian Church in the United States and of Chalcedon Presbyterian Church; a first-generation Christian Reconstructionist and 1986 congressional candidate.',
        theologicalNotes:
          'INDEPENDENTLY VERIFIED 2026-07-30. Pastor **Dr. Joe Morecraft III** (b. 1944) founded **Chalcedon Presbyterian Church** in Atlanta in 1974 \u2014 the Chalcedon name marking the Rushdoony reconstructionist lineage \u2014 and in 1983 founded the **Reformed Presbyterian Church in the United States (RPCUS)**, established on Christian reconstructionist theology and explicitly working out how to apply theonomy. ' +
          'He **ran for the US Congress in Georgia\u2019s 7th District in 1986**, wrote *With Liberty and Justice for All: Christian Politics Made Simple*, authored the five-volume *Authentic Christianity* on the Westminster Larger Catechism, and serves as **chaplain of the Cobb County Republican Assembly**. He is described as a noted lecturer on contemporary political trends. ' +
          'Theonomy and civil engagement here are not inferred \u2014 they are the founding purpose of the man and his denomination. No specific abortion position located; abolitionStance deliberately left unknown.',
        sourceUrls: 'https://heritagepresbyterianchurch.com/;https://cobbgra.com/member/dr-joe-morecraft/;https://en.wikipedia.org/wiki/Reformed_Presbyterian_Church_in_the_United_States;https://www.sermonaudio.com/heritagerpchanove;https://postmillennialworldview.com/postmill-churches/',
        researchNote: '2026-07-30: independently verified. Founding reconstructionist; RPCUS founder; congressional candidate 1986.',
      },
    })
    console.log(`#${her.id} Heritage Presbyterian (Morecraft) — VERIFIED, evidenced`)
  } else console.log('Heritage Presbyterian Cumming not found')

  // ---- Grace Covenant Reformed Church, Clovis NM — Pastor Ryan Denton ----
  const gc = await prisma.church.findFirst({
    where: { state: 'NM', city: { contains: 'Clovis', mode: 'insensitive' }, name: { contains: 'Grace Covenant', mode: 'insensitive' } },
  })
  if (gc) {
    await updateStances(prisma, gc.id, {
      culturalEngagement: 'transformationalist',
      eschatology: 'postmill',
    }, {
      actor: 'research-batch3-2026-07-30.ts',
      note: 'Pastor Ryan Denton directs Christ in the Wild Ministries and preaches publicly at abortion clinics, campuses and jails, including holding a sign reading "Abortion is murder". Public-square action is first-hand. abolitionStance left unknown: street preaching at clinics is not by itself the equal-protection/criminalisation position, and no such statement was found.',
      alsoSet: {
        stanceBasis: 'evidenced', recordFlag: null,
        leadership: 'Organizing Pastor: Ryan Denton',
        notablePeople: 'Ryan Denton — director of Christ in the Wild Ministries, author of five books on evangelism, Founders Ministries contributor.',
        theologicalNotes:
          'INDEPENDENTLY VERIFIED 2026-07-30. Organizing pastor **Ryan Denton** (ThM, PhD student at Puritan Reformed) has directed **Christ in the Wild Ministries** since 2016, preaching publicly at **abortion clinics**, college campuses, jails, homeless shelters and city centres. At Texas Tech he preached carrying a sign reading **"Abortion is murder"**. Author of five books on evangelism including *Ten Modern Evangelism Myths*; writes for Founders Ministries and the Heidelblog. Also plants in Lubbock TX. ' +
          '**abolitionStance deliberately left unknown.** Clinic preaching and "abortion is murder" language are abolitionist-sounding, but nothing was found stating the equal-protection or criminalisation position that distinguishes abolitionism from pro-life street evangelism \u2014 the same care taken with Ekklesia of Grand Blanc.',
        sourceUrls: 'https://clovisreformed.com/;https://www.christinthewild.com/bio;https://ryandenton.com/;https://founders.org/author-name/ryan-denton/;https://postmillennialworldview.com/postmill-churches/',
        researchNote: '2026-07-30: independently verified via Christ in the Wild and press coverage of his clinic/campus preaching.',
      },
    })
    console.log(`#${gc.id} Grace Covenant Reformed (Denton) — VERIFIED, evidenced`)
  } else console.log('Grace Covenant Reformed Clovis not found')

  const n = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist' } })
  const e = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist', stanceBasis: 'evidenced' } })
  const v = await prisma.church.count({ where: { recordFlag: { contains: 'verify_stance' } } })
  console.log(`\ntransformationalist ${n} | evidenced ${e} | awaiting verification ${v}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
