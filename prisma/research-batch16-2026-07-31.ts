import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

async function main() {
  // ================= #109 Eastside Baptist, Twin Falls ID — Paul Thompson =================
  await updateStances(prisma, 109, { culturalEngagement: 'transformationalist', abolitionStance: 'pro_abolition' }, {
    actor: 'research-batch16-2026-07-31.ts',
    note: 'Thompson led repeated efforts to make Twin Falls a sanctuary city for the preborn, blogs extensively on abolishing abortion and the Idaho Abortion Human Rights Act, wrote a newspaper column for over a decade, co-hosts Pastors Round Table on KLIX radio, and RAN FOR THE IDAHO STATE SENATE as a Constitution Party candidate. Abolition and civil-sphere engagement are first-hand, sustained and local.',
    alsoSet: {
      stanceBasis: 'evidenced', recordFlag: null,
      leadership: 'Pastor: Paul Thompson',
      notablePeople: 'Paul Thompson — candidate for the Idaho State Senate (Constitution Party); led the campaign to make Twin Falls a sanctuary city for the preborn; long-time newspaper columnist and co-host of Pastors Round Table on KLIX.',
      theologicalNotes:
        'INDEPENDENTLY VERIFIED 2026-07-31 (full standard). Pastor **Paul Thompson**, Southern Baptist / Reformed (Founders-listed). ' +
        '\n\n**He has led repeated efforts to make the city of Twin Falls a sanctuary city for all preborn children**, and states the aim of abolishing abortion in Idaho. His blog (**paulthompsonblog.com**) carries sustained writing on abolition — including *"Abolish Abortion Resolution"*, *"Concerning HB507"*, the **Idaho Abortion Human Rights Act**, and *"To God Fearing Pastors of the Magic Valley"*, an open appeal to other pastors in his region. ' +
        '\n\n**He ran for the Idaho State Senate** as a Constitution Party candidate, wrote a local newspaper column for over a decade, and co-hosts **Pastors Round Table** on Newsradio 96.1 / 1310 KLIX. He was covered locally on the abortion debate after the Dobbs leak. ' +
        '\n\nThis is the pattern the directory exists to find: a pastor working municipal ordinance, state legislation, local media and a candidacy at once — and calling neighbouring pastors to do the same.',
      sourceUrls: 'https://www.paulthompsonblog.com/;https://www.paulthompsonblog.com/abolish-abortion-resolution/;https://www.paulthompsonblog.com/to-god-fearing-pastors-of-the-magic-valley/;https://newsradio1310.com/pastor-paul-thompson-is-a-candidate-for-idaho-state-senate/;https://www.kmvt.com/2022/05/06/scotus-leak-rekindles-abortion-debate-twin-falls/',
      researchNote: '2026-07-31: full standard. Sanctuary-city-for-the-preborn campaigns; extensive abolition blogging; Idaho State Senate candidate; KLIX radio co-host.',
    },
  })
  console.log('#109 Eastside Baptist (Thompson) — VERIFIED')

  const e = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist', stanceBasis: 'evidenced' } })
  const t = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist' } })
  const v = await prisma.church.count({ where: { recordFlag: { contains: 'verify_stance' } } })
  console.log(`\ntransformationalist ${t} | EVIDENCED ${e} | awaiting verification ${v}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
