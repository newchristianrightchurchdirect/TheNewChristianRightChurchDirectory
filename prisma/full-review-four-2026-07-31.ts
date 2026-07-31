// Completing the four churches previously reviewed only partially (#23, #25, #26, #28) to the
// full research standard: site, church socials, pastor socials/podcast, pastor's name searched
// against every marker. Two turn out far stronger than the partial pass showed; two do not, and
// their negative results are recorded explicitly rather than left implicit in a flag.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

async function main() {
  // ================= #25 Providence Church, Pensacola FL — Uri Brito =================
  await updateStances(prisma, 25, {
    culturalEngagement: 'transformationalist',
    christianNationalism: 'sympathetic',
    eschatology: 'postmill',
  }, {
    actor: 'full-review-four-2026-07-31.ts',
    note: 'Full standard applied. Brito founded Kuyperian Commentary, is Senior Fellow for Pastoral Theology at the Center for Cultural Leadership, sits on the boards of the Theopolis Institute and New Saint Andrews College, hosts the Perspectivalist Podcast, and PRESENTED AT THE NATIONAL CONSERVATISM CONFERENCE (NatCon 4, Washington 2024). christianNationalism set to sympathetic rather than affirm: National Conservatism is not identical to Christian nationalism and no explicit CN statement was found.',
    alsoSet: {
      stanceBasis: 'evidenced', recordFlag: null,
      leadership: 'Senior Pastor: Rev. Uriesou (Uri) Brito',
      notablePeople: 'Uri Brito — founder of Kuyperian Commentary; board member of the Theopolis Institute and New Saint Andrews College; Senior Fellow for Pastoral Theology at the Center for Cultural Leadership; presenter at the National Conservatism Conference 2024.',
      theologicalNotes:
        'INDEPENDENTLY VERIFIED 2026-07-31 (full standard). Senior pastor **Rev. Uriesou "Uri" Brito**, here since 2009; M.Div and D.Min from Reformed Theological Seminary, Orlando. ' +
        '\n\nHe **founded Kuyperian Commentary** — an essay and podcast platform with 20+ contributors, named for Abraham Kuyper, whose "every square inch" doctrine is the transformationalist tradition itself. He is **Senior Fellow for Pastoral Theology at the Center for Cultural Leadership**, a board member of the **Theopolis Institute** and of **New Saint Andrews College**, hosts the **Perspectivalist Podcast**, and writes for Fight Laugh Feast Magazine. ' +
        '\n\n**He presented at the National Conservatism Conference (NatCon 4, Washington, 2024)** — a pastor addressing a national political-movement conference is direct civil-sphere engagement, not private conviction. ' +
        '\n\nThe congregation separately **teaches postmillennial eschatology as one of its stated distinctives**, in classes offered by its own pastors, so the eschatology is the church’s position and not an inference from CREC membership. ' +
        '\n\n`christianNationalism` set to **sympathetic, not affirm**: National Conservatism and Christian nationalism are not the same thing, and no explicit CN statement by Brito was located. No abortion position found; abolitionStance left unknown.',
      researchNote: '2026-07-31: full standard applied. Founded Kuyperian Commentary; CCL senior fellow; Theopolis and New Saint Andrews boards; NatCon 4 presenter.',
    },
  })
  console.log('#25 Providence Pensacola (Brito) — VERIFIED, evidenced')

  // ================= #28 Providence Church, Lynchburg VA — Virgil Hurt =================
  await updateStances(prisma, 28, {
    culturalEngagement: 'transformationalist',
    eschatology: 'postmill',
  }, {
    actor: 'full-review-four-2026-07-31.ts',
    note: 'Full standard applied. Hurt planted the church in 2000 as a mission of Christ Church Moscow; it is now one of the largest CREC congregations. He has TWICE served as the CREC Presiding Minister of Council and becomes President of Reformed Evangelical Seminary on 1 July 2026. Leadership of the movement itself is the evidence here; no specific civil-sphere action was found, and that is stated on the record.',
    alsoSet: {
      stanceBasis: 'evidenced', recordFlag: null,
      leadership: 'Pastor: Virgil Hurt',
      notablePeople: 'Virgil Hurt — twice Presiding Minister of Council of the CREC; incoming President of Reformed Evangelical Seminary (from 1 July 2026).',
      theologicalNotes:
        'INDEPENDENTLY VERIFIED 2026-07-31 (full standard). Pastor **Virgil Hurt** planted this congregation in 2000 as a **mission church of Christ Church, Moscow ID** — direct Moscow lineage rather than general CREC membership. It has since grown into **one of the largest congregations in the CREC**. ' +
        '\n\nHurt has **twice served as the CREC’s Presiding Minister of Council**, the denomination’s highest office, and the board of **Reformed Evangelical Seminary appointed him President**, effective 1 July 2026. ' +
        '\n\n**What this evidence is and is not:** it establishes that this pastor is a leading figure of the movement this directory maps, and that the congregation is a Moscow plant at its centre. It is **not** a record of the church acting on a specific public question — no such action was located, and no abortion, Christian-nationalism or theonomy statement was found. Classified on movement leadership and corroborated eschatology under the owner’s ruling that corroborated conviction qualifies. ' +
        '\n\nSocials: x.com/ProvidenceKirk, instagram.com/providencekirk, facebook.com/ProvidenceKirk.',
      researchNote: '2026-07-31: full standard applied. Twice CREC Presiding Minister; incoming seminary president; Moscow plant. No specific civil-sphere action found.',
    },
  })
  console.log('#28 Providence Lynchburg (Hurt) — VERIFIED, evidenced')

  // ================= #23 Reformation Covenant, Oregon City OR — Bo Cogbill =================
  // NOT promoted. Institution-building, but internal pastoral training rather than civil sphere.
  const c23 = await prisma.church.findUnique({ where: { id: 23 } })
  await prisma.church.update({
    where: { id: 23 },
    data: {
      leadership: 'Pastor: Bo Cogbill',
      recordFlag: [...new Set([...(c23?.recordFlag || '').split(';').filter(Boolean), 'verify_stance'])].join(';'),
      theologicalNotes: (c23?.theologicalNotes || '') +
        '\n\nFULL STANDARD APPLIED 2026-07-31 — **NOT PROMOTED.** Pastor **Bo Cogbill**, installed **January 2019** (so the third-party listing is current on him, unusually). M.Div. from Westminster/Redeemer Seminary; pursuing a PhD in Biblical Counseling. In **2021 he helped found the Reformation Bible Institute** to give local churches rigorous theological training for their pastors. ' +
        '\n\nSearched against every marker — abortion, abolition, politics, theonomy, Christian nationalism, patriarchy — and **nothing was found**. The Bible Institute is institution-building, but it equips pastors internally rather than engaging the civil sphere. The church’s mission line "Transforming the fallen world" and the third-party postmill listing remain the only support. ' +
        '\n\nOutstanding: the SermonAudio archive (broadcaster `rccoffice`, decades of sermons, returned 503 on attempt), Facebook, and YouTube (@reformationcovenantchurch). If this church qualifies, the evidence is most likely in the preaching. Left `mixed` + `verify_stance`.',
      researchNote: '2026-07-31: full standard applied — nothing found on any marker. Founded Reformation Bible Institute (internal pastoral training). Sermon archive unread. Not promoted.',
      lastResearchedAt: new Date(),
    },
  })
  console.log('#23 Reformation Covenant (Cogbill) — reviewed to standard, NOT promoted')

  // ================= #26 Holy Trinity Reformed, Concord NC — Brian Phillips =================
  const c26 = await prisma.church.findUnique({ where: { id: 26 } })
  await prisma.church.update({
    where: { id: 26 },
    data: {
      recordFlag: [...new Set([...(c26?.recordFlag || '').split(';').filter(Boolean), 'verify_stance'])].join(';'),
      theologicalNotes: (c26?.theologicalNotes || '') +
        '\n\nFULL STANDARD APPLIED 2026-07-31 — **NOT PROMOTED.** Pastor **Dr. Brian Phillips**, here since 2008. Searched against every marker and **nothing was found** on abortion, politics, Christian nationalism, theonomy or postmillennialism. ' +
        '\n\nWhat he is deeply embedded in is **classical Christian education**: instructor at Schole Academy, staff/speaker/consultant at the **CIRCE Institute**, writer of the Legal Update for the Association of Classical Christian Schools, and a speaker at the MassHope and TEACH CT homeschool conventions. The church publishes a podcast, *Sunday Mornings at Holy Trinity* (Spotify). ' +
        '\n\nClassical Christian education is culture-building and sits close to this directory’s concerns, but it is **the pastor’s vocation rather than an act of this congregation**, and the academies involved are not the church’s. On the civil-sphere question specifically, no evidence either way. Left `mixed` + `verify_stance`.',
      researchNote: '2026-07-31: full standard applied — nothing found on any marker. Deep classical-education involvement (CIRCE, ACCS, Schole) but it is the pastor’s vocation, not church action. Not promoted.',
      lastResearchedAt: new Date(),
    },
  })
  console.log('#26 Holy Trinity Concord (Phillips) — reviewed to standard, NOT promoted')

  const t = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist' } })
  const e = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist', stanceBasis: 'evidenced' } })
  console.log(`\ntransformationalist ${t} | evidenced ${e}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
