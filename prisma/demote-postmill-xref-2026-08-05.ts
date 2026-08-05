// The postmill cross-reference cohort: 70 churches marked transformationalist on 2026-07-30 because
// postmillennialworldview.com lists their pastor as postmillennial. The research note on each reads
// "Owner ruled corroborated conviction qualifies."
//
// That ruling was made under the OLD standard — one of the six markers was enough. On 2026-07-31
// Dustin replaced it: transformationalist requires EVIDENCED CORPORATE CIVIL-SPHERE ENGAGEMENT.
// 123 signature-only churches were demoted under the new rule. This cohort is the same shape and
// fails on two counts rather than one:
//
//   1. One marker is no longer sufficient — and all 70 have exactly one, postmillennialism, with
//      no second marker anywhere in the cohort.
//   2. Postmillennialism is an ESCHATOLOGY, not an act. Even fully verified it would say nothing
//      about whether the church acts corporately on public questions.
//
// And the evidence is weaker than the signature cohort's: a third-party listing rather than a
// first-hand, attributable act. The same source had 7 of 8 pastor attributions stale or wrong.
//
// The postmill claim itself is NOT deleted — it stays on the record as a lead, and verify_stance
// stays on the row.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'demote-postmill-xref-2026-08-05.ts'

const NOTE = `\n\n---\n\n**DEMOTED FROM QUALIFYING 2026-08-05 — consistency pass, not a new judgement.**

This church was marked transformationalist on 2026-07-30 because **postmillennialworldview.com** lists its pastor as postmillennial, under the standard then in force: one of the six markers was enough, and a third-party listing counted as church-level corroboration.

**That standard was replaced on 2026-07-31.** Transformationalist now requires **evidenced corporate civil-sphere engagement**. On that rule 123 churches whose pastors had personally signed public equal-protection statements were demoted — and **a signature is a first-hand, attributable act, while a listing on someone else's website is not**. Leaving this cohort qualifying while demoting those would have been incoherent.

It also fails on a second count. **Postmillennialism is an eschatology, not an action.** Even fully verified it would establish what a church expects God to do in history, not that the congregation acts corporately on public questions — which is what this directory classifies on.

**Nothing has been deleted.** The postmillennial attribution stays on the record above as a **research lead**, and the row keeps its \`verify_stance\` flag. Read the church's own site, socials and preaching, and if it acts corporately on public questions it should be promoted back on that evidence — and would then rank on however many of the six markers it actually meets.

**One caution on the source:** an earlier check of eight pastor attributions from this same directory found **seven stale or wrong**, so the postmillennial claim itself needs verifying before it is relied on.`

async function main() {
  const q = await prisma.church.findMany({
    where: { approved: true, culturalEngagement: 'transformationalist' },
    select: { id: true, name: true, city: true, state: true, researchNote: true, theologicalNotes: true,
      abolitionStance: true, eschatology: true, theonomy: true, christianNationalism: true,
      zionistStance: true, genderStance: true, recordFlag: true },
  })
  const cohort = q.filter(c => c.researchNote?.includes('Owner ruled corroborated conviction qualifies'))

  // Guard: only demote rows whose sole marker is postmill. If any other marker is present the row
  // has independent evidence and must be judged on its own, not swept up in a cohort pass.
  const safe = cohort.filter(c =>
    c.eschatology === 'postmill' &&
    c.abolitionStance !== 'pro_abolition' &&
    c.theonomy !== 'theonomic' && c.theonomy !== 'sympathetic' &&
    c.christianNationalism !== 'affirm' && c.christianNationalism !== 'sympathetic' &&
    c.zionistStance !== 'anti' && c.genderStance !== 'patriarchal')

  console.log(`cohort: ${cohort.length}   safe to demote (postmill only): ${safe.length}`)
  if (safe.length !== cohort.length) {
    console.log('SKIPPED (have other markers — judge individually):')
    cohort.filter(c => !safe.includes(c)).forEach(c => console.log(`   #${c.id} ${c.name}`))
  }

  for (const c of safe) {
    const flags = (c.recordFlag || '').split(';').map(s => s.trim()).filter(Boolean)
    if (!flags.includes('verify_stance')) flags.push('verify_stance')
    await updateStances(prisma, c.id, { culturalEngagement: 'unknown' }, {
      actor: ACTOR,
      note: 'Qualified under the superseded 1-marker rule on a third-party postmill listing; the 2026-07-31 standard requires evidenced corporate engagement. Postmill claim retained as a lead.',
      alsoSet: {
        recordFlag: flags.join(';'),
        theologicalNotes: `${c.theologicalNotes || ''}${NOTE}`,
      },
    })
  }

  const cnt = (v: string) => prisma.church.count({ where: { approved: true, culturalEngagement: v } })
  console.log(`\ndemoted: ${safe.length}`)
  console.log(`qualifying now: ${await cnt('transformationalist')}`)
  console.log(`unknown now:    ${await cnt('unknown')}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
