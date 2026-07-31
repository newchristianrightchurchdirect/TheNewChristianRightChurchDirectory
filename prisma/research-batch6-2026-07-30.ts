import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

async function main() {
  // ---- Covenant Reformed Presbyterian Church, Graham/Burlington NC — John M. Otis ----
  const otis = await prisma.church.findFirst({
    where: { state: 'NC', name: { contains: 'Covenant Reformed Presbyterian', mode: 'insensitive' } },
  })
  if (otis) {
    await updateStances(prisma, otis.id, {
      culturalEngagement: 'transformationalist',
      theonomy: 'theonomic',
      federalVision: 'critical',
      eschatology: 'postmill',
    }, {
      actor: 'research-batch6-2026-07-30.ts',
      note: 'RPCUS congregation — the denomination Joe Morecraft founded in 1983 explicitly to apply theonomy, and which self-identifies as theonomic. Pastor John M. Otis wrote "Jesus\u2019 Victorious Kingdom" (postmillennial) and the 540-page "Danger in the Camp: An Analysis and Refutation of the Heresies of the Federal Vision" — so federalVision is set to critical on the strength of a book-length refutation.',
      alsoSet: {
        stanceBasis: 'evidenced', recordFlag: null,
        leadership: 'Evangelist/Pastor: John M. Otis',
        denomination: 'RPCUS',
        notablePeople: 'John M. Otis \u2014 author of *Danger in the Camp*, a 540-page refutation of the Federal Vision, and of *Jesus\u2019 Victorious Kingdom*; RPCUS evangelist.',
        theologicalNotes:
          'INDEPENDENTLY VERIFIED 2026-07-30. Pastor **John M. Otis** (M.Div. and M.C.E., Reformed Theological Seminary 1979) took up this **RPCUS** mission work in September 2009. Sources place the congregation in Burlington NC rather than Graham \u2014 adjacent towns; the address should be checked. ' +
          '**The RPCUS self-identifies as theonomic** \u2014 it was founded in 1983 by Joe Morecraft III expressly to apply theonomy \u2014 so denominational membership carries real information here, unlike in the PCA or SBC. ' +
          'Otis wrote *Jesus\u2019 Victorious Kingdom* (postmillennial) and the 540-page **_Danger in the Camp: An Analysis and Refutation of the Heresies of the Federal Vision_**. ' +
          '**Note the distinction this draws:** theonomic and postmillennial, yet strongly **anti**-Federal Vision. RPCUS and CREC share an eschatology and a view of the civil sphere while diverging sharply on FV \u2014 which is exactly why Federal Vision was dropped from the ranking markers. No abortion position located.',
        sourceUrls: 'https://www.sermonaudio.com/broadcasters/covenantrpc/;https://www.sermonaudio.com/speakers/12398/;https://en.wikipedia.org/wiki/Reformed_Presbyterian_Church_in_the_United_States;https://postmillennialworldview.com/postmill-churches/',
        researchNote: '2026-07-30: independently verified. RPCUS theonomic congregation; pastor authored a book-length refutation of Federal Vision.',
      },
    })
    console.log(`#${otis.id} Covenant Reformed Presbyterian (Otis) — VERIFIED, evidenced`)
  }

  // ---- All Saints Church, Brownstown/Lancaster PA — THIRD stale attribution: pastor deceased ----
  const as = await prisma.church.findFirst({
    where: { state: 'PA', name: { contains: 'All Saints', mode: 'insensitive' } },
  })
  if (as) {
    const flags = new Set((as.recordFlag || '').split(';').filter(Boolean))
    flags.add('verify_stance'); flags.add('pastor_vacant')
    await prisma.church.update({
      where: { id: as.id },
      data: {
        recordFlag: [...flags].join(';'),
        notablePeople: 'Dr. Gregg Strawbridge (1965\u20132022) \u2014 founding pastor; a significant CREC figure and classical-education teacher. Deceased.',
        theologicalNotes: (as.theologicalNotes || '') +
          '\n\nREVIEWED 2026-07-30. Founded **1999 as a church plant of Christ Church, Moscow ID** \u2014 direct Moscow lineage, not merely CREC membership \u2014 and CREC-affiliated since 2001. ' +
          '**PASTOR ATTRIBUTION IS STALE:** the postmillennialworldview.com directory lists **Dr. Gregg Strawbridge** as pastor, but **Strawbridge died in 2022** (1965\u20132022). He taught at All Saints Academy (Cary NC), Firm Foundations Academy and Veritas Academy, and ran the Strawbridge Ministerial Forum. ' +
          'The current pastor is unidentified here and the congregation has not been assessed on its own terms. The Moscow plant lineage is solid; the leadership record is nine years out of date. ' +
          '**This is the third stale attribution found in that directory** \u2014 after Jason Garwood (resigned Colwood 2017) and Jon Speed (left Christ is King Syracuse 2019). Treat every pastor name imported from it as unverified.',
        researchNote: '2026-07-30: third-party listing names a pastor who died in 2022. Moscow plant lineage confirmed; leadership needs re-establishing.',
        lastResearchedAt: new Date(),
      },
    })
    console.log(`#${as.id} All Saints PA — flagged, Strawbridge d.2022`)
  }

  const e = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist', stanceBasis: 'evidenced' } })
  console.log(`\nevidenced now: ${e}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
