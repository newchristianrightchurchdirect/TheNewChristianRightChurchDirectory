// Reframe #23 and #26. My notes treated founding a Bible institute and building classical
// Christian schools as *lesser* than civil-sphere action — "internal", "the pastor's vocation".
// That is wrong about how this movement actually grows. Doug Wilson's Logos School is the seed of
// the entire classical Christian school movement and is how Moscow became what it is; education
// is the movement's primary means of reproduction, not a substitute for engagement.
//
// Owner's correction, 2026-07-31: note it honestly, as work that grows the movement by training
// the next generation. Both promoted accordingly, with what is and is not evidenced stated plainly.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const strip = (notes: string | null, marker: string) => (notes || '').split(marker)[0].trimEnd()

async function main() {
  // ================= #23 Reformation Covenant, Oregon City OR — Bo Cogbill =================
  const c23 = await prisma.church.findUnique({ where: { id: 23 } })
  await updateStances(prisma, 23, { culturalEngagement: 'transformationalist', eschatology: 'postmill' }, {
    actor: 'reframe-education-2026-07-31.ts',
    note: 'Reclassified on the owner’s correction that founding a theological training institute is movement-building, not a lesser substitute for it. Cogbill founded the Reformation Bible Institute in 2021 to give local churches rigorous theological training for their pastors — that reproduces the movement in the next generation of ministers, which is how this tradition has always propagated.',
    alsoSet: {
      stanceBasis: 'evidenced',
      recordFlag: 'verify_stance',
      theologicalNotes: strip(c23?.theologicalNotes ?? null, '\n\nFULL STANDARD APPLIED 2026-07-31') +
        '\n\nFULL STANDARD APPLIED 2026-07-31, REFRAMED. Pastor **Bo Cogbill**, installed **January 2019** — the third-party listing is current on him, which is unusual for that source. M.Div. Westminster/Redeemer; pursuing a PhD in Biblical Counseling. ' +
        '\n\n**In 2021 he founded the Reformation Bible Institute**, to give local churches the ability to equip their own pastors with a rigorous theological education. ' +
        '\n\n**This is movement-building and is counted as such.** A congregation that founds an institution to train ministers is not merely serving itself — it is reproducing this tradition in the next generation of pastors, which is precisely how it has always propagated. An earlier draft of this note treated that as "internal" and lesser than civil-sphere action; that was a misreading of how this movement grows. ' +
        '\n\n**What is still not on record:** searching Cogbill against every marker — abortion, abolition, politics, theonomy, Christian nationalism, patriarchy — returned nothing. The classification rests on the institute, the church’s "Transforming the fallen world" mission statement, and third-party postmill corroboration. The SermonAudio archive (`rccoffice`, decades of sermons, 503 on attempt), Facebook and YouTube (@reformationcovenantchurch) remain unread and are the likeliest place further evidence sits. `verify_stance` retained for that reason.',
      researchNote: '2026-07-31: promoted. Founded Reformation Bible Institute (2021) — training the next generation of pastors is movement-building. Markers still unevidenced; sermon archive unread.',
    },
  })
  console.log('#23 Reformation Covenant (Cogbill) — reframed and PROMOTED')

  // ================= #26 Holy Trinity Reformed, Concord NC — Brian Phillips =================
  const c26 = await prisma.church.findUnique({ where: { id: 26 } })
  await updateStances(prisma, 26, { culturalEngagement: 'transformationalist', eschatology: 'postmill' }, {
    actor: 'reframe-education-2026-07-31.ts',
    note: 'Reclassified on the owner’s correction that classical Christian education is movement-building. Phillips holds an Ed.D. in Classical Education, teaches at Schole Academy and Oaks Classical Christian Academy, serves the CIRCE Institute, and writes the Legal Update for the Association of Classical Christian Schools. Classical Christian education is this movement’s primary long-game institution — Doug Wilson’s Logos School is its origin — and forming children in it is training the next generation.',
    alsoSet: {
      stanceBasis: 'evidenced',
      recordFlag: 'verify_stance',
      theologicalNotes: strip(c26?.theologicalNotes ?? null, '\n\nFULL STANDARD APPLIED 2026-07-31') +
        '\n\nFULL STANDARD APPLIED 2026-07-31, REFRAMED. Pastor **Dr. Brian Phillips**, here since 2008. **Ed.D. in Classical Education** (Whitefield), M.A. Christian & Classical Studies (Knox Seminary). He teaches Ancient History, Literature and Mythology at **Schole Academy** and **Oaks Classical Christian Academy**, serves the **CIRCE Institute** as staff, speaker and consultant, writes the **Legal Update for the Association of Classical Christian Schools**, and speaks at the MassHope and TEACH CT homeschool conventions. The church publishes a podcast, *Sunday Mornings at Holy Trinity*. ' +
        '\n\n**This is movement-building and is counted as such.** Classical Christian education is this tradition’s primary long-game institution: Doug Wilson founded Logos School in Moscow in 1981 and the classical Christian school movement grew out of it — the schools are how Moscow became Moscow. Forming children in that tradition is training the next generation, and a pastor working at its institutional centre (CIRCE, ACCS) is building the movement, not pursuing a private career. An earlier draft of this note called it "the pastor’s vocation rather than an act of this congregation"; that undersold what the work actually does. ' +
        '\n\n**What is still not on record:** searching Phillips against every marker returned nothing on abortion, politics, Christian nationalism, theonomy or postmillennialism. The academies he serves are not owned by this congregation. The classification rests on his classical-education leadership plus third-party postmill corroboration; the church podcast remains unread. `verify_stance` retained.',
      researchNote: '2026-07-31: promoted. Classical Christian education leadership (CIRCE, ACCS, Schole) is movement-building — training the next generation. Markers still unevidenced.',
    },
  })
  console.log('#26 Holy Trinity Concord (Phillips) — reframed and PROMOTED')

  const t = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist' } })
  const e = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist', stanceBasis: 'evidenced' } })
  console.log(`\ntransformationalist ${t} | evidenced ${e}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
