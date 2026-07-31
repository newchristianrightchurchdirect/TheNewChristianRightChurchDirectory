import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const find = (where: Record<string, unknown>) => prisma.church.findFirst({ where })

async function main() {
  // ---- Trinity Church, Coeur d'Alene ID — Stuart Bryan ----
  const tri = await find({ state: 'ID', city: { contains: 'Coeur', mode: 'insensitive' }, name: { contains: 'Trinity', mode: 'insensitive' } })
  if (tri) {
    await updateStances(prisma, tri.id, { culturalEngagement: 'transformationalist', eschatology: 'postmill' }, {
      actor: 'research-batch9-2026-07-30.ts',
      note: 'Stuart Bryan publicly opposed a Coeur d’Alene city ordinance on sexual-orientation discrimination (Spokesman-Review, 2013) and writes op-eds in the Coeur d’Alene Press. A pastor engaging municipal legislation in his own name is civil-sphere action, not private opinion.',
      alsoSet: {
        stanceBasis: 'evidenced', recordFlag: null,
        leadership: 'Pastor: Stuart W. Bryan',
        theologicalNotes:
          'INDEPENDENTLY VERIFIED 2026-07-30. Pastor **Stuart W. Bryan**, CREC. In 2013 he **publicly opposed a Coeur d’Alene city ordinance** on sexual-orientation discrimination, covered by the Spokesman-Review, and he continues to publish op-eds in the Coeur d’Alene Press ("Standing by Pastor Paul", 2024). Engaging municipal legislation publicly, as a pastor, is civil-sphere action rather than private conviction. Listed on the postmillennialworldview.com directory. No abortion-specific position located; abolitionStance left unknown.',
        sourceUrls: 'https://www.trinitycda.org/;https://www.trinitycda.org/pastor/stuart-bryan/;https://www.spokesman.com/stories/2013/jun/06/new-cda-law-opens-rift-over-equality/;https://cdapress.com/news/2024/feb/02/my-turn-stuart-w-bryan/;https://postmillennialworldview.com/postmill-churches/',
        researchNote: '2026-07-30: verified. Publicly opposed a city ordinance in 2013; ongoing local op-eds.',
      },
    })
    console.log(`#${tri.id} Trinity Church CdA (Bryan) — VERIFIED`)
  }

  // ---- Church of the King, Roseville CA — John Stoos ----
  const cotk = await find({ state: 'CA', name: { contains: 'Church of the King', mode: 'insensitive' } })
  if (cotk) {
    await updateStances(prisma, cotk.id, { culturalEngagement: 'transformationalist', eschatology: 'postmill' }, {
      actor: 'research-batch9-2026-07-30.ts',
      note: 'John Stoos was a California political consultant for over twenty years, ten as Chief Consultant to State Senator Tom McClintock, and is Vice-President of Cherish California’s Children, which supports pro-life organisations. He hosted a daily Christian talk-radio show on social issues. Professional civil-sphere engagement, not sympathy.',
      alsoSet: {
        stanceBasis: 'evidenced', recordFlag: null,
        leadership: 'Pastor: John Stoos',
        notablePeople: 'John Stoos — California political consultant for 20+ years, ten as Chief Consultant to State Senator Tom McClintock; Vice-President of Cherish California’s Children.',
        theologicalNotes:
          'INDEPENDENTLY VERIFIED 2026-07-30. Pastor **John Stoos**, ordained the congregation’s first Sacramento elder in 2004 and full-time pastor since October 2005. He worked as a **political consultant in California politics for over twenty years, ten of them as Chief Consultant to State Senator Tom McClintock**, and serves as **Vice-President of Cherish California’s Children, Inc.**, which supports pro-life organisations statewide. He hosted *Dialog*, a two-hour daily Christian talk-radio programme applying Scripture to social issues, and writes on politics at thestoos.com. This is a pastor who has worked professionally inside the civil sphere — among the most direct cases of political engagement in the directory. Pro-life work is documented; the abolitionist (equal-protection) position specifically is not, so abolitionStance is left unknown.',
        sourceUrls: 'https://cotksac.com/profiles/john-stoos/;https://www.thestoos.com/;https://www.sermonaudio.com/broadcasters/cotks/;https://postmillennialworldview.com/postmill-churches/',
        researchNote: '2026-07-30: verified. Career political consultant; VP of Cherish California’s Children.',
      },
    })
    console.log(`#${cotk.id} Church of the King (Stoos) — VERIFIED`)
  }

  // ---- Reformed Bible Church, Appomattox VA — Paul Michael Raymond ----
  const rbc = await find({ state: 'VA', name: { contains: 'Reformed Bible Church', mode: 'insensitive' } })
  if (rbc) {
    await updateStances(prisma, rbc.id, {
      culturalEngagement: 'transformationalist', theonomy: 'theonomic',
      christianNationalism: 'affirm', eschatology: 'postmill',
    }, {
      actor: 'research-batch9-2026-07-30.ts',
      note: 'Paul Michael Raymond founded the Institute for Theonomic Reformation (2001) and New Geneva Christian Leadership Academy (2009), is a founding member of the Alliance of Reformed and Theonomic Churches, and advocates a theocratic ordering of society. Chalcedon covered the work as "Christian Reconstruction Comes to Appomattox". Theonomy is the institution’s explicit purpose.',
      alsoSet: {
        stanceBasis: 'evidenced', recordFlag: null,
        leadership: 'Pastor: Rev. Dr. Paul Michael Raymond',
        notablePeople: 'Rev. Dr. Paul Michael Raymond — founder of the Institute for Theonomic Reformation and of New Geneva Christian Leadership Academy; founding member of the Alliance of Reformed and Theonomic Churches (ARTC).',
        theologicalNotes:
          'INDEPENDENTLY VERIFIED 2026-07-30. Pastor **Rev. Dr. Paul Michael Raymond**. The church began in Suffolk County NY in 1992, planted in Virginia in 1998, and in **2001 established the Institute for Theonomic Reformation**; in **2009 it founded the New Geneva Christian Leadership Academy**, an undergraduate, graduate and seminary-level institution. Its stated emphasis is the **Cultural Mandate of Genesis 1:28**. Chalcedon covered the congregation under the title *"Christian Reconstruction Comes to Appomattox"*, describing a body deliberately applying Reconstruction in practice, and Raymond advocates a **theocratic** ordering of society. Founding an institute and a seminary on theonomic premises is corporate action of the strongest kind. **Network lead:** Raymond is a founding member of the **Alliance of Reformed and Theonomic Churches (ARTC)**, which publishes a member-church list at thereformationalliance.org/churches — a third third-party directory to cross-reference. Added to the deep-dive queue.',
        sourceUrls: 'https://www.hisglory.us/projects/;https://www.thereformationalliance.org/churches/;https://chalcedon.edu/resources/articles/christian-reconstruction-comes-to-appomattox;https://www.sermonaudio.com/broadcasters/hisglory/;https://postmillennialworldview.com/postmill-churches/',
        researchNote: '2026-07-30: verified. Founded the Institute for Theonomic Reformation and New Geneva Academy; ARTC founding member.',
      },
    })
    console.log(`#${rbc.id} Reformed Bible Church (Raymond) — VERIFIED`)
  }

  // ---- Christ Covenant Reformed, Billings MT — Joost Nixon: reviewed, NOT promoted ----
  const ccr = await find({ state: 'MT', city: { contains: 'Billings', mode: 'insensitive' }, name: { contains: 'Christ Covenant', mode: 'insensitive' } })
  if (ccr) {
    await prisma.church.update({
      where: { id: ccr.id },
      data: {
        leadership: 'Pastor: Joost Nixon',
        theologicalNotes: (ccr.theologicalNotes || '') +
          '\n\nREVIEWED 2026-07-30 — **NOT PROMOTED.** Pastor **Joost Nixon**; CREC; meets at the Yellowstone Baptist College Chapel. The only corroboration on file is the postmillennialworldview.com listing — no theonomic, abortion or civil-sphere material surfaced for this pastor. Deliberately left at `stanceBasis = mixed` with `verify_stance` rather than promoted, because a directory listing on its own is a lead, not a verdict.',
        researchNote: '2026-07-30: reviewed, nothing found beyond the third-party listing. Left flagged rather than promoted.',
        lastResearchedAt: new Date(),
      },
    })
    console.log(`#${ccr.id} Christ Covenant Billings (Nixon) — reviewed, NOT promoted`)
  }

  const e = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist', stanceBasis: 'evidenced' } })
  const t = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist' } })
  console.log(`\ntransformationalist ${t} | EVIDENCED ${e}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
