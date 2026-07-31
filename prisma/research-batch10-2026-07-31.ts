import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

async function main() {
  // ---- #65 Christ the King Reformed, Charlotte MI — owner's editorial decision ----
  // The Kinism and SPLC facts stay in the Editor's Note. The classification is the owner's call;
  // the documentation is what makes the claim traceable, and removing it would be the real error.
  await updateStances(prisma, 65, {
    culturalEngagement: 'transformationalist',
    theonomy: 'theonomic',
    eschatology: 'postmill',
  }, {
    actor: 'research-batch10-2026-07-31.ts',
    note: 'Owner decision 2026-07-31 to classify as transformationalist. Bret McAtee is explicitly postmillennial and theonomic — "theonomy remains the only model that can consistently provide relief" — and defends Bahnsen in print at Iron Ink. The Kinism and SPLC facts remain documented in the Editor’s Note; they are relevant to a reader and are not erased by the classification.',
    alsoSet: {
      stanceBasis: 'evidenced',
      recordFlag: 'review_nonfit',
      leadership: 'Pastor: Bret L. McAtee',
      theologicalNotes:
        'INDEPENDENTLY VERIFIED 2026-07-31. Pastor **Bret L. McAtee**, author of the **Iron Ink** blog. Explicitly **postmillennial** and **theonomic** — he has written that "theonomy remains the only model that can consistently provide relief" and defends Greg Bahnsen in print against critics including R. Scott Clark and Dewey Roberts. On this directory’s doctrinal markers the congregation scores clearly. ' +
        '\n\n**READERS SHOULD KNOW:** McAtee also promotes **Kinism**, a teaching of racial and tribal separation. Promoting it in worship services led to the congregation’s **removal from the Christian Reformed Church in December 2018**, and in February 2021 the **Southern Poverty Law Center listed the church among white-nationalist hate groups**. The congregation, formerly Charlotte Christian Reformed Church, is now independent. ' +
        '\n\nThese facts are recorded because this directory’s claims are meant to be traceable, and a reader deciding whether to visit should have them. Kinism is a separate question from the cultural-engagement axis on which the church is classified. ' +
        '\n\nAbsorbed duplicate record #4166 ("Charlotte CRC"), created by the postmillennialworldview.com import, which still used the pre-2018 name.',
      researchNote: '2026-07-31: classified transformationalist per owner decision. Postmill/theonomic verified via Iron Ink. Kinism and SPLC listing documented, not erased.',
    },
  })
  console.log('#65 Christ the King Reformed — classified transformationalist, Kinism documented')

  // ---- Christ Covenant Reformed, Billings MT — the attribution is simply WRONG ----
  const ccr = await prisma.church.findFirst({
    where: { state: 'MT', city: { contains: 'Billings', mode: 'insensitive' }, name: { contains: 'Christ Covenant', mode: 'insensitive' } },
  })
  if (ccr) {
    const flags = new Set((ccr.recordFlag || '').split(';').filter(Boolean))
    flags.add('verify_stance')
    await prisma.church.update({
      where: { id: ccr.id },
      data: {
        leadership: null, // the recorded pastor does not pastor here
        recordFlag: [...flags].join(';'),
        theologicalNotes:
          'REVIEWED 2026-07-31 — **THE THIRD-PARTY ATTRIBUTION IS WRONG, not merely stale.** The postmillennialworldview.com directory lists **Joost Nixon** as pastor here. He is not: Nixon has been **Pastor of Christ Church, Spokane WA since 2001**, and is Director of Formal Education at Training Leaders International. Christ Covenant Reformed, Billings is described as one of the **partnering churches for his theological training ministry** — the directory appears to have mistaken a ministry partnership for a pastorate. ' +
          '\n\nSo this congregation’s postmillennial listing rests on a man who pastors ~500 miles away in another state. **Its actual pastor is unidentified here and the church has not been assessed on its own terms.** Left at `stanceBasis = mixed` with `verify_stance`; do not treat the classification as supported. ' +
          '\n\nThis is the **fourth** attribution failure found in that source, and a new kind: Garwood resigned (2017), Speed moved (2019) and Strawbridge died (2022) — all stale. This one was never true.',
        researchNote: '2026-07-31: attribution is wrong, not stale — Joost Nixon pastors Christ Church Spokane WA; Billings is a ministry partner church. Actual pastor unknown.',
        lastResearchedAt: new Date(),
      },
    })
    console.log(`#${ccr.id} Christ Covenant Billings — Nixon attribution corrected (he pastors in Spokane)`)
  }

  // ---- Note Nixon's real church if we hold it ----
  const spokane = await prisma.church.findFirst({
    where: { state: 'WA', city: { contains: 'Spokane', mode: 'insensitive' }, name: { contains: 'Christ Church', mode: 'insensitive' } },
  })
  if (spokane) {
    await prisma.church.update({
      where: { id: spokane.id },
      data: {
        notablePeople: [spokane.notablePeople, 'Joost Nixon — pastor here since 2001; contributing editor to Credenda/Agenda, executive editor of St. Anne’s Public House, and Director of Formal Education at Training Leaders International.'].filter(Boolean).join(' | '),
        theologicalNotes: (spokane.theologicalNotes || '') +
          '\n\nNOTED 2026-07-31. **Joost Nixon** has pastored here since 2001 — contributing editor to **Credenda/Agenda** (the Moscow magazine) and executive editor of the St. Anne’s Public House audio magazine, previously a missionary in South Africa, now Director of Formal Education at Training Leaders International planting pastoral training schools in Asia, Africa and Latin America. ' +
          'The postmillennialworldview.com directory lists this congregation under a different pastor (Kenton Spratt) and misattributes Nixon to Billings MT, so the leadership record here should be confirmed — the two may be co-pastors or the listing may be out of date.',
        researchNote: '2026-07-31: Joost Nixon pastors here since 2001; third-party directory names a different pastor — confirm leadership.',
        lastResearchedAt: new Date(),
      },
    })
    console.log(`#${spokane.id} Christ Church Spokane — Nixon recorded, leadership flagged for confirmation`)
  } else {
    console.log('Christ Church Spokane not in the directory — candidate to add (Joost Nixon)')
  }

  const t = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist' } })
  const e = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist', stanceBasis: 'evidenced' } })
  console.log(`\ntransformationalist ${t} | evidenced ${e}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
