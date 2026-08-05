// Dustin caught this: the nine churches read on 2026-08-05 and found to describe a purely
// ecclesial mission were left at culturalEngagement = 'unknown'.
//
// That is wrong, and in a way that matters. 'unknown' means "not researched closely enough to
// classify" — which is exactly what these are NOT. They were read to the standard and the answer
// was recorded. Leaving them 'unknown' throws the research away and makes the directory look like
// it never checked.
//
// They belong in 'limited_mission': examined, does not qualify.
//
// The public wording for that category has been softened at the same time, because it over-claimed.
// It asserted such churches "hold the institutional church should not take up public causes" — a
// positive doctrine. What was actually found is thinner and should be stated as such: their
// published mission is limited to worship, teaching, fellowship and mercy, and no claim on the
// civil order appears. Several may hold no view at all on the question.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

// The nine read-and-negative. NOT #39 Searcy or #50 Annapolis — those were read and the evidence
// was genuinely ambiguous, so 'unknown' plus verify_stance is the honest record for them.
const NEGATIVES = [56, 58, 59, 63, 40, 44, 45, 48, 35]

const NOTE = `\n\n---\n\n**RECLASSIFIED 2026-08-05: unresearched → limited mission.** This row was left at "unresearched" after being read, which understated the work: the church *was* read to the standard and the result *was* recorded. It now sits in the category that says so — **examined, does not qualify**.

**What that category does and does not claim.** It records that the congregation's **published mission is limited to worship, teaching, fellowship and mercy**, and that no claim on the civil order was found in it. It is **not** a finding that the church positively opposes such engagement, or holds a doctrine against it. Some churches in this category do hold that view deliberately; others simply have not addressed the question in anything they publish. This record cannot tell the two apart, and does not pretend to.`

async function main() {
  for (const id of NEGATIVES) {
    const c = await prisma.church.findUnique({ where: { id } })
    if (!c) { console.log(`  #${id} NOT FOUND`); continue }
    // Drop verify_stance: the stance is no longer unverified, it is verified as not qualifying.
    const flags = (c.recordFlag || '').split(';').map(s => s.trim())
      .filter(Boolean).filter(f => f !== 'verify_stance')
    await updateStances(prisma, id, { culturalEngagement: 'limited_mission' }, {
      actor: 'fix-limited-mission-2026-08-05.ts',
      note: 'Read to the standard and found to publish a purely ecclesial mission; belongs in limited_mission, not unknown. verify_stance cleared — the stance is settled, not unverified.',
      alsoSet: {
        recordFlag: flags.length ? flags.join(';') : null,
        theologicalNotes: `${c.theologicalNotes || ''}${NOTE}`,
      },
    })
    console.log(`  #${id} ${c.name} (${c.city}, ${c.state}) — limited_mission`)
  }
  const t = async (v: string) => `${v}=${await prisma.church.count({ where: { approved: true, culturalEngagement: v } })}`
  console.log(`\n${await t('transformationalist')}  ${await t('single_issue')}  ${await t('limited_mission')}  ${await t('quietist')}  ${await t('unknown')}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
