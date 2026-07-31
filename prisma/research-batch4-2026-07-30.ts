import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

async function main() {
  // ---- Covenant Bible Church, Georgetown TX — Joel Webbon ----
  const cbc = await prisma.church.findFirst({
    where: { state: 'TX', city: { contains: 'Georgetown', mode: 'insensitive' }, name: { contains: 'Covenant Bible', mode: 'insensitive' } },
  })
  if (cbc) {
    await updateStances(prisma, cbc.id, {
      culturalEngagement: 'transformationalist',
      christianNationalism: 'affirm',
      genderStance: 'patriarchal',
      abolitionStance: 'pro_abolition',
      theonomy: 'sympathetic',
      eschatology: 'postmill',
    }, {
      actor: 'research-batch4-2026-07-30.ts',
      note: 'Joel Webbon is a self-proclaimed Christian nationalist who argues the United States belongs to Christians and that non-Christians should not hold public office; opposes women\u2019s suffrage; advocates outlawing abortion, pornography and contraceptives in civil law. Founder/president of Right Response Ministries. Extensively documented in national coverage.',
      alsoSet: {
        stanceBasis: 'evidenced', recordFlag: null,
        leadership: 'Senior Pastor: Joel Webbon',
        notablePeople: 'Joel Webbon \u2014 founder and president of Right Response Ministries; one of the most prominent public advocates of Christian nationalism in the United States.',
        theologicalNotes:
          'INDEPENDENTLY VERIFIED 2026-07-30. Senior pastor **Joel Webbon**, founder and president of **Right Response Ministries**. He is a **self-proclaimed Christian nationalist** who argues that "the United States belongs to Christians" and that non-Christians should not hold public office. ' +
          'He **opposes women\u2019s suffrage**. On civil law he argues for **outlawing abortion**, pornography and contraceptives, and for ordering government by Christian doctrine \u2014 a reconstructionist programme, and the criminalisation position rather than incrementalism. ' +
          'His positions are documented at length in national coverage (Christian Post, Right Wing Watch, San Antonio Current) rather than inferred. Listed on the postmillennialworldview.com directory. ' +
          'Right Response is a media operation run out of the church \u2014 a pattern shared with New Christendom Press (Sauve) and The Patriarchy Podcast (Spurgeon).',
        sourceUrls: 'https://rightresponseministries.com/;https://www.christianpost.com/news/pastor-joel-webbon-no-place-for-non-christians-in-us-leadership.html;https://www.peoplefor.org/rightwingwatch/post/men-must-be-governed-the-christian-nationalist-worldview-laid-bare-by-pastor-joel-webbon;https://postmillennialworldview.com/postmill-churches/',
        researchNote: '2026-07-30: independently verified. Self-proclaimed Christian nationalist; opposes women\u2019s suffrage; advocates criminalising abortion.',
      },
    })
    console.log(`#${cbc.id} Covenant Bible Church (Webbon) — VERIFIED, evidenced`)
  }

  // ---- By the Word Baptist, Azle TX (#4035) — Jon Speed's ACTUAL church since Nov 2019 ----
  const btw = await prisma.church.findUnique({ where: { id: 4035 } })
  if (btw) {
    await updateStances(prisma, 4035, {
      culturalEngagement: 'transformationalist',
      abolitionStance: 'pro_abolition',
    }, {
      actor: 'research-batch4-2026-07-30.ts',
      note: 'Jon Speed co-produced "Babies Are Murdered Here", a foundational abortion-abolition documentary, and in 2019 his Syracuse store publicly defied New York\u2019s Reproductive Health Act (covered by Fox & Friends, Hannity, Glenn Beck). He has been Pastor of Missions and Evangelism here since November 2019.',
      alsoSet: {
        stanceBasis: 'evidenced', recordFlag: null,
        notablePeople: 'Jon Speed \u2014 co-producer of the abolitionist documentary *Babies Are Murdered Here*; planted Christ is King Baptist Church, Syracuse NY (2011) and has served here since November 2019; nationally known open-air preacher.',
        theologicalNotes: (btw.theologicalNotes || '') +
          '\n\nINDEPENDENTLY VERIFIED 2026-07-30. **Jon Speed** has been Pastor of Missions and Evangelism here since **November 2019**. He co-produced **"Babies Are Murdered Here"**, one of the foundational documentaries of the abortion **abolition** movement, and planted Christ is King Baptist Church in Syracuse NY in 2011. In 2019 his Syracuse store publicly defied New York\u2019s Reproductive Health Act, drawing national coverage (Fox & Friends, Hannity, Glenn Beck). He preaches open-air on university campuses across the country.',
        researchNote: '2026-07-30: verified. Jon Speed here since Nov 2019; co-producer of Babies Are Murdered Here.',
      },
    })
    console.log('#4035 By the Word Baptist (Jon Speed) — VERIFIED, evidenced')
  }

  // ---- Christ is King Baptist, Syracuse NY — SECOND stale pastor attribution ----
  const cik = await prisma.church.findFirst({
    where: { state: 'NY', city: { contains: 'Syracuse', mode: 'insensitive' }, name: { contains: 'Christ is King', mode: 'insensitive' } },
  })
  if (cik) {
    const flags = new Set((cik.recordFlag || '').split(';').filter(Boolean))
    flags.add('verify_stance')
    await prisma.church.update({
      where: { id: cik.id },
      data: {
        recordFlag: [...flags].join(';'),
        theologicalNotes: (cik.theologicalNotes || '') +
          '\n\n**PASTOR ATTRIBUTION IS STALE \u2014 verified 2026-07-30.** The postmillennialworldview.com directory credits **Jon Speed** here. Speed planted this church in 2011 but **left in November 2019** to become Pastor of Missions and Evangelism at First Baptist Church of Briar (now By the Word Baptist) in Azle, TX \u2014 recorded here as #4035. Any classification of this congregation resting on Speed\u2019s reputation is therefore unsupported: the current pastor is unidentified and the church has not been assessed on its own terms.',
        researchNote: '2026-07-30: third-party listing credits Jon Speed, who left in November 2019. Needs assessment on its own terms.',
        lastResearchedAt: new Date(),
      },
    })
    console.log(`#${cik.id} Christ is King Baptist Syracuse — flagged, Speed left Nov 2019`)
  } else console.log('Christ is King Baptist Syracuse not found in directory')

  const e = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist', stanceBasis: 'evidenced' } })
  console.log(`\nevidenced now: ${e}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
