import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

async function main() {
  // ---- Grace Covenant Presbyterian, Nacogdoches TX — Randy Booth ----
  const gcp = await prisma.church.findFirst({
    where: { state: 'TX', city: { contains: 'Nacogdoches', mode: 'insensitive' }, name: { contains: 'Grace Covenant', mode: 'insensitive' } },
  })
  if (gcp) {
    await updateStances(prisma, gcp.id, {
      culturalEngagement: 'transformationalist',
      federalVision: 'affirm',
      theonomy: 'sympathetic',
      eschatology: 'postmill',
    }, {
      actor: 'research-batch8-2026-07-30.ts',
      note: 'Randy Booth directs the Covenant Media Foundation — the ministry that publishes Greg Bahnsen, theonomy\u2019s principal theologian — and signed "A Joint Federal Vision Profession" in 2007, so Federal Vision is affirmed on his own signature. Long involvement in the pro-life movement and in Christian day and home schooling.',
      alsoSet: {
        stanceBasis: 'evidenced', recordFlag: null,
        leadership: 'Pastor: Randy Booth',
        notablePeople: 'Randy Booth \u2014 director of the Covenant Media Foundation (publisher of Greg Bahnsen); signatory of A Joint Federal Vision Profession (2007).',
        theologicalNotes:
          'INDEPENDENTLY VERIFIED 2026-07-30. Pastor **Randy Booth** \u2014 ordained 40 years, pastor here 24. He directs the **Covenant Media Foundation**, the ministry that publishes **Greg Bahnsen**, theonomy\u2019s principal theologian; that is a direct institutional tie to the movement\u2019s intellectual centre rather than a sympathy. ' +
          'He **signed "A Joint Federal Vision Profession" (2007)**, so `federalVision = affirm` rests on his own signature. He has been active in the **pro-life movement** and has worked with Christian day schools and home schools for over 45 years, and presents on the postmillennial vision. ' +
          'No abolition-specific (equal-protection/criminalisation) position located, so abolitionStance is left unknown despite the pro-life involvement \u2014 the same distinction applied to Ekklesia of Grand Blanc and Grace Covenant Reformed.',
        sourceUrls: 'https://gcov.org/;https://gcov.org/officers/;https://x.com/randybooth2;https://postmillennialworldview.com/postmill-churches/',
        researchNote: '2026-07-30: independently verified. Directs Covenant Media Foundation (Bahnsen); FV signatory 2007.',
      },
    })
    console.log(`#${gcp.id} Grace Covenant Presbyterian (Booth) — VERIFIED, evidenced`)
  }

  // ---- Covenant Presbyterian, Buford GA — Chris Strevel ----
  const cov = await prisma.church.findFirst({
    where: { state: 'GA', city: { contains: 'Buford', mode: 'insensitive' }, name: { contains: 'Covenant Presbyterian', mode: 'insensitive' } },
  })
  if (cov) {
    await updateStances(prisma, cov.id, {
      culturalEngagement: 'transformationalist',
      theonomy: 'theonomic',
      eschatology: 'postmill',
    }, {
      actor: 'research-batch8-2026-07-30.ts',
      note: 'Listed in the Theonomy Resources church directory as a congregation holding "Christ\u2019s Lordship in all areas of life (family, church, and state)" — which is this directory\u2019s transformationalist definition stated almost verbatim — and separately on the postmillennialworldview.com directory. Two independent third-party corroborations.',
      alsoSet: {
        stanceBasis: 'evidenced',
        recordFlag: 'denom_verify',
        leadership: 'Pastor: Chris Strevel',
        theologicalNotes:
          'INDEPENDENTLY VERIFIED 2026-07-30. Pastor **Chris Strevel**, preaching and pastoring here since **1994**; a published author. ' +
          'The congregation appears in the **Theonomy Resources church directory**, whose stated criterion is churches holding **"Christ\u2019s Lordship in all areas of life (family, church, and state)"** \u2014 this directory\u2019s transformationalist definition, almost word for word \u2014 and separately on the postmillennialworldview.com directory. Two independent third-party sources agreeing is materially stronger than one. ' +
          '**Denomination unresolved:** sources conflict, describing the church as OPC in one place and **RPCUS** in another (its SermonAudio handle is `covenant-opc`). Flagged `denom_verify`. The distinction matters here \u2014 RPCUS was founded to apply theonomy, the OPC was not.',
        sourceUrls: 'https://www.covenant-presbyterian.church/;https://www.covenant-presbyterian.church/about-us;https://theonomyresources.blogspot.com/2011/02/church-directory.html;https://postmillennialworldview.com/postmill-churches/',
        researchNote: '2026-07-30: independently verified via two third-party directories. Denomination conflicts between OPC and RPCUS — flagged.',
      },
    })
    console.log(`#${cov.id} Covenant Presbyterian Buford (Strevel) — VERIFIED, evidenced`)
  }

  const e = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist', stanceBasis: 'evidenced' } })
  console.log(`\nevidenced now: ${e}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
