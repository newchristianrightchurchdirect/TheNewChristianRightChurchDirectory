/**
 * #4044 Missio Dei Church, Glassboro NJ — abolitionStance pro_abolition -> unknown.
 *
 * Run with --apply to write.
 *
 * WHY: this row was the ONLY pro_abolition church in New Jersey, and the label
 * was never supported by anything first-hand.
 *
 * A session on 2026-08-05 applied the standard, concluded "Label NOT supported;
 * demoted", and wrote that verdict into researchNote and theologicalNotes — but
 * only changed `culturalEngagement`. `abolitionStance` was left at
 * pro_abolition. The prose said demoted; the data said abolitionist. The data
 * is what renders.
 *
 * That note also recorded why the demotion was incomplete: the pastor was known
 * only as "Justin", no surname, so the pastor half of the standard could not be
 * walked. It asked for the row to be revisited if that ever changed.
 *
 * It has now changed. The church's own "We Believe" page is signed **Jesse
 * Gruber, Elder**, and the podcast credits **Justin Gruber**. Both were searched
 * against the markers on 2026-08-12. Nothing.
 *
 * Full evidence against the label:
 *   - Site (3 pages incl. "We Believe"): no abortion, life, or abolition content.
 *   - Church socials — Facebook, Instagram, YouTube, Buzzsprout/Apple podcast:
 *     checked 2026-08-05, nothing on any of the six markers.
 *   - Pastors Jesse Gruber and Justin Gruber searched by name against the
 *     markers, 2026-08-12: nothing.
 *   - Abolitionists Rising, the sole cited source, publishes no church list on
 *     its current site, so the listing cannot be re-verified.
 *   - Not a Norman Statement signatory.
 *   - stanceBasis was already `mixed`, never `evidenced`.
 *
 * CONSEQUENCE: New Jersey now has ZERO evidenced publicly-abolitionist churches
 * in this directory. That is the honest state of the data.
 */
import { PrismaClient } from '@prisma/client'

const APPLY = process.argv.includes('--apply')
const prisma = new PrismaClient()
const ACTOR = 'demote-missio-dei-2026-08-12.mjs'
const ID = 4044

const NOTE =
  'Completes the demotion recorded but not applied on 2026-08-05. That session ' +
  'applied the standard, found nothing on any marker across the site, church ' +
  'socials and podcast, and wrote "Label NOT supported; demoted" — but changed ' +
  'only culturalEngagement, leaving abolitionStance at pro_abolition. It flagged ' +
  'that the pastor half was incomplete because only the forename "Justin" was ' +
  'known. Resolved 2026-08-12: the church\'s own We Believe page is signed Jesse ' +
  'Gruber, Elder, and the podcast credits Justin Gruber. Both searched against ' +
  'every marker — nothing. Abolitionists Rising, the sole cited source, no longer ' +
  'publishes a church list, and the church is not a Norman Statement signatory. ' +
  'No first-hand evidence of an abolitionist position exists, so the row goes to ' +
  'unknown rather than to a position it has not been shown to hold.'

const c = await prisma.church.findUnique({ where: { id: ID } })
if (!c) throw new Error('#4044 not found')

console.log(`#${ID} ${c.name} — ${c.city}`)
console.log(`  abolitionStance  ${c.abolitionStance}  ->  unknown`)
console.log(`  stanceBasis      ${c.stanceBasis}  (unchanged — was never 'evidenced')`)
console.log(`  researchStatus   ${c.researchStatus}  ->  researched`)

if (!APPLY) {
  console.log('\nDRY RUN — pass --apply to write')
} else {
  await prisma.church.update({
    where: { id: ID },
    data: {
      abolitionStance: 'unknown',
      researchStatus: 'researched',
      lastResearchedAt: new Date('2026-08-12T12:00:00Z'),
      leadership: 'Elder: Jesse Gruber (signs the church\'s We Believe page). Justin Gruber is credited on the church podcast.',
      researchNote: `${c.researchNote || ''}\n\n=== ABOLITION STANCE DEMOTED 2026-08-12 ===\n${NOTE}`.trim(),
    },
  })
  // This IS a stance change, so it gets an audit row — unlike the field repairs.
  await prisma.stanceChange.create({
    data: {
      churchId: ID,
      churchName: c.name,
      field: 'abolitionStance',
      oldValue: c.abolitionStance,
      newValue: 'unknown',
      actor: ACTOR,
      note: NOTE,
    },
  })
  console.log('\nAPPLIED + StanceChange row written')
}

const remaining = await prisma.church.count({
  where: { state: 'NJ', abolitionStance: 'pro_abolition' },
})
console.log(`\npro_abolition churches remaining in NJ: ${remaining}`)
await prisma.$disconnect()
