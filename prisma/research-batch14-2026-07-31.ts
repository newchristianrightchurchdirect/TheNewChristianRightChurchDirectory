import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

async function main() {
  // ================= #4043 Cross & Crown, Warrenton VA — Jason Garwood =================
  // This also closes the Caro, Michigan thread: Garwood resigned from Colwood in 2017 and this
  // is where he went.
  await updateStances(prisma, 4043, {
    culturalEngagement: 'transformationalist',
    abolitionStance: 'pro_abolition',
    theonomy: 'theonomic',
    christianNationalism: 'affirm',
    eschatology: 'postmill',
  }, {
    actor: 'research-batch14-2026-07-31.ts',
    note: 'Garwood founded and presides over the Virginia Center for Public Theology, "committed to defending Christian ethics in the town square"; leads Abolish Abortion Virginia and spoke at its 2022 conference; hosts Cross & Crown Radio on the Reconstructionist Radio network, including an episode arguing theonomy against autonomy in the Virginia Code. Abolition, theonomy and civil engagement all first-hand and institutional.',
    alsoSet: {
      stanceBasis: 'evidenced', recordFlag: null,
      notablePeople: 'Dr. Jason Garwood — founder and president of the Virginia Center for Public Theology; leads Abolish Abortion Virginia; hosts Cross & Crown Radio on the Reconstructionist Radio network. Previously pastor of Colwood Church, Caro MI.',
      theologicalNotes:
        'INDEPENDENTLY VERIFIED 2026-07-31 (full standard). Teaching pastor **Dr. Jason Garwood**, minister of Word and sacrament. ' +
        '\n\nHe **founded and presides over the Virginia Center for Public Theology**, a ministry "committed to defending Christian ethics in the town square" — an institution built by this church’s pastor for civil-sphere argument. He **leads Abolish Abortion Virginia** and spoke at its 2022 conference, held in Warrenton. He hosts **Cross & Crown Radio** on the **Reconstructionist Radio** network, including *"The Warrenton Declaration"* and a segment arguing **"THEONOMY or AUTONOMY"** over religious exemption in the Virginia Code. ' +
        '\n\nAbolition, theonomy and public-square engagement are all first-hand here and all institutional rather than personal opinion. ' +
        '\n\n**This closes an open thread.** Garwood is the pastor the postmillennialworldview.com directory still credits at **Colwood Church, Caro MI** (#4165), which he left in September 2017 — he came here. The Caro postmill attribution therefore belonged to the man, not the Michigan congregation, exactly as suspected. Colwood still needs assessing on its own terms.',
      sourceUrls: 'https://crosscrownchurch.com/about/consistory/;https://www.vacpt.org/leadership;https://abolishabortionvirginia.com/conference/;https://jasongarwood.com/;https://crosscrownradio.com/podcast/the-warrenton-declaration/;https://www.reconstructionistradio.com/podcasts/cross-crown-radio/',
      researchNote: '2026-07-31: full standard. Founded the Virginia Center for Public Theology; leads Abolish Abortion Virginia; theonomy on record via Cross & Crown Radio. Closes the Caro MI thread.',
    },
  })
  console.log('#4043 Cross & Crown (Garwood) — VERIFIED; closes the Caro MI thread')

  // ================= #252 Christ Church of Radford VA — Anthony Mathenia =================
  await updateStances(prisma, 252, { culturalEngagement: 'transformationalist' }, {
    actor: 'research-batch14-2026-07-31.ts',
    note: 'Mathenia founded Better Than Life Ministries, a pro-life outreach — an institution founded by the pastor and carried by the congregation. He is a missionary affiliate of HeartCry Missionary Society, writes for G3 Ministries and sits on the Media Gratiae board.',
    alsoSet: {
      stanceBasis: 'evidenced', recordFlag: null,
      leadership: 'Pastor: Anthony Mathenia',
      notablePeople: 'Anthony Mathenia — founder of Better Than Life Ministries (pro-life outreach); missionary affiliate of HeartCry Missionary Society; board member of Media Gratiae; contributor to G3 Ministries.',
      theologicalNotes:
        'INDEPENDENTLY VERIFIED 2026-07-31 (full standard). Pastor **Anthony Mathenia**, here since 2011, living in Christiansburg. ' +
        '\n\nHe **founded Better Than Life Ministries, a pro-life outreach** — founding a standing ministry against abortion is corporate action, not private conviction. He is a **missionary affiliate of HeartCry Missionary Society** (Paul Washer’s work), contributes to **G3 Ministries**, and serves on the board of **Media Gratiae**. ' +
        '\n\nHis public output is largely expository and missions-focused rather than political; no Christian-nationalism or theonomy statement was located, and those markers are untouched. The classification rests on the pro-life ministry he founded plus the markers already recorded on this row.',
      sourceUrls: 'https://christchur.ch/about/leadership/;https://g3min.org/authors/anthony-mathenia/;https://www.mediagratiae.org/board-members/anthony-mathenia;https://postmillennialworldview.com/postmill-churches/',
      researchNote: '2026-07-31: full standard. Founded Better Than Life Ministries (pro-life outreach); HeartCry affiliate; G3 and Media Gratiae.',
    },
  })
  console.log('#252 Christ Church of Radford (Mathenia) — VERIFIED')

  // Record the resolution on the Colwood row too.
  const col = await prisma.church.findUnique({ where: { id: 4165 } })
  if (col) {
    await prisma.church.update({
      where: { id: 4165 },
      data: {
        theologicalNotes: (col.theologicalNotes || '') +
          '\n\nRESOLVED 2026-07-31: **Jason Garwood went to Cross & Crown Church, Warrenton VA** (#4043), where he founded the Virginia Center for Public Theology and now leads Abolish Abortion Virginia. The postmill attribution on this row belonged to him personally and left with him in 2017. Colwood — a United Brethren in Christ congregation — still has not been assessed on its own terms and its current leadership is unrecorded here.',
        researchNote: '2026-07-31: Garwood traced to Cross & Crown Warrenton VA (#4043). This row still needs assessing on its own terms.',
        lastResearchedAt: new Date(),
      },
    })
    console.log('#4165 Colwood — Garwood traced to #4043')
  }

  const e = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist', stanceBasis: 'evidenced' } })
  console.log(`\nevidenced: ${e}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
