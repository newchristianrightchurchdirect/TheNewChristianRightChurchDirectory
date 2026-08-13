/**
 * #4044 Missio Dei Church — RESTORE abolitionStance to pro_abolition.
 *
 * Run with --apply to write.
 *
 * This reverses the demotion I applied earlier today, because that demotion
 * rested on a claim of mine that was FALSE.
 *
 * I wrote that Abolitionists Rising "publishes no church list any more" after
 * /churches/ and /church-map/ both 404'd. AR does publish one — per state, at
 * /state-facts/<state>/. The New Jersey page is live, current (2026), carries a
 * heading "Find Abolitionists in New Jersey", and lists exactly one entry under
 * **Abolitionist Churches: Missio Dei Church**. Its Abolitionist Organizations
 * and Abolitionist Businesses sections for New Jersey are empty.
 *
 * That is not a neutral third-party directory. It is the abolitionist
 * movement's own national organisation naming this congregation, today, on its
 * "find abolitionists here" page. Churches appear there by affiliating.
 *
 * Also found, and missed by the 2026-08-05 pass: the church's YouTube channel
 * carries "Back To Basics - A Gospel Look at Race and Abortion", scheduled
 * 22 January 2017 — the Roe v. Wade anniversary. First-hand evidence that the
 * congregation has taught on abortion publicly from its own platform.
 *
 * WHAT IS STILL NOT ESTABLISHED, and why stanceBasis stays `mixed`:
 * the church's own current output does not use abolitionist language. 96,000
 * characters of its article archive contain "abolish" only about Lincoln and
 * slavery; the podcast, Facebook and statement of faith contain nothing on
 * abortion; and neither elder (Jesse Gruber, Justin Gruber) surfaces against any
 * marker. So the position is attested by the movement, not evidenced from the
 * pulpit. Per this project's own rule, a listing earns `mixed` and
 * `verify_stance` — never `evidenced`.
 *
 * The lesson recorded for the next person: an unreachable URL is a fact about
 * the fetch, not about the world. Two 404s were not evidence that a list does
 * not exist, and I should not have written that they were.
 */
import { PrismaClient } from '@prisma/client'

const APPLY = process.argv.includes('--apply')
const prisma = new PrismaClient()
const ACTOR = 'restore-missio-dei-2026-08-12.mjs'
const ID = 4044

const NOTE =
  'RESTORED after my own error. I demoted this row earlier today partly on the ' +
  'claim that Abolitionists Rising no longer publishes a church list. That was ' +
  'false: AR lists churches per state at /state-facts/<state>/, and its live New ' +
  'Jersey page names Missio Dei Church as the state\'s one Abolitionist Church ' +
  'under the heading "Find Abolitionists in New Jersey". I had only tried ' +
  '/churches/ and /church-map/, got 404s, and treated a failed fetch as proof of ' +
  'absence. Additionally, the church\'s YouTube channel carries "Back To Basics - ' +
  'A Gospel Look at Race and Abortion", scheduled 22 January 2017, the Roe ' +
  'anniversary — first-hand evidence of public teaching on abortion that the ' +
  '2026-08-05 pass also missed. stanceBasis REMAINS `mixed` and the row keeps ' +
  'verify_stance: the position is attested by the movement\'s own organisation, ' +
  'not evidenced from the church\'s current output, which uses no abolitionist ' +
  'language anywhere. Sources: abolitionistsrising.com/state-facts/new-jersey/ ; ' +
  'the church\'s YouTube channel.'

const c = await prisma.church.findUnique({ where: { id: ID } })
if (!c) throw new Error('#4044 not found')

const flags = new Set((c.recordFlag || '').split(';').filter(Boolean))
flags.add('added_via_ar_list')
flags.add('verify_stance')
const recordFlag = [...flags].join(';')

console.log(`#${ID} ${c.name} — ${c.city}`)
console.log(`  abolitionStance  ${c.abolitionStance}  ->  pro_abolition`)
console.log(`  stanceBasis      ${c.stanceBasis}  (stays 'mixed' — attested, not evidenced)`)
console.log(`  recordFlag       ${c.recordFlag}  ->  ${recordFlag}`)

if (!APPLY) {
  console.log('\nDRY RUN — pass --apply to write')
} else {
  await prisma.church.update({
    where: { id: ID },
    data: {
      abolitionStance: 'pro_abolition',
      stanceBasis: 'mixed',
      recordFlag,
      researchStatus: 'researched',
      lastResearchedAt: new Date('2026-08-12T12:00:00Z'),
      sourceUrls: 'missiodeinj.com;abolitionistsrising.com/state-facts/new-jersey/',
      researchNote: `${c.researchNote || ''}\n\n=== RESTORED 2026-08-12 ===\n${NOTE}`.trim(),
    },
  })
  await prisma.stanceChange.create({
    data: {
      churchId: ID,
      churchName: c.name,
      field: 'abolitionStance',
      oldValue: c.abolitionStance,
      newValue: 'pro_abolition',
      actor: ACTOR,
      note: NOTE,
    },
  })
  console.log('\nAPPLIED + StanceChange row written')
}

const n = await prisma.church.count({ where: { state: 'NJ', abolitionStance: 'pro_abolition' } })
console.log(`\npro_abolition churches in NJ: ${n}`)
await prisma.$disconnect()
