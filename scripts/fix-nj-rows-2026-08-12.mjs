/**
 * Four New Jersey row repairs found while researching NJ churches for the
 * Garden State Abolitionists city pages, 2026-08-12.
 *
 * Run with --apply to write; without it, prints the diff and changes nothing.
 *
 *  #190  Bread of Life Fellowship — the row describes a location the church
 *        left. Its own site says 1559 Hamburg Turnpike, Wayne (9-10 mentions
 *        across pages) and contains ZERO occurrences of "Ridge Road",
 *        "North Arlington", "07031" or the recorded pastor's name. The stored
 *        phone is an 865 number — a Knoxville, Tennessee area code. Address,
 *        city, zip, coordinates, phone and leadership all corrected from the
 *        church's own site. stanceBasis also moves denominational_default ->
 *        evidenced: the stance itself does not change, but it is no longer a
 *        guess from the denomination. See the note for what was actually read.
 *
 *  #3701 The Body of Christ — the `website` column contains confession prose
 *        with the real URL buried at the end. The URL is extracted and the
 *        prose preserved into theologicalNotes rather than discarded.
 *
 *  #5650 Iglesia Bautista El Redentor — already flagged `duplicate_of:5618`
 *        but still rendering. Hidden via approved=false, which is this
 *        project's own mechanism for a held row (see the duplicates
 *        dashboard). The row is NOT deleted.
 */
import { PrismaClient } from '@prisma/client'

const APPLY = process.argv.includes('--apply')
const prisma = new PrismaClient()
const ACTOR = 'fix-nj-rows-2026-08-12.mjs'

// None of these repairs touches a field in STANCE_FIELDS, so updateStances()
// would write no StanceChange rows — a plain update is equivalent. Provenance
// goes into researchNote instead, which is where this directory keeps it.
// If a stance ever changes here, switch back to updateStances.
async function repair(id, data, why) {
  if (!why?.trim()) throw new Error(`repair(#${id}): refusing an unexplained write`)
  await prisma.church.update({ where: { id }, data })
}

const show = (label, before, after) => {
  if (String(before ?? '') === String(after ?? '')) return
  console.log(`    ${label}`)
  console.log(`      - ${String(before ?? '(null)').slice(0, 120)}`)
  console.log(`      + ${String(after ?? '(null)').slice(0, 120)}`)
}

// ---- #190 Bread of Life Fellowship -------------------------------------
{
  const c = await prisma.church.findUnique({ where: { id: 190 } })
  if (!c) throw new Error('#190 not found')
  console.log(`#190 ${c.name}`)

  const next = {
    address: '1559 Hamburg Turnpike',
    city: 'Wayne',
    zip: '07470',
    latitude: 40.964964,
    longitude: -74.255018,
    phone: '201-907-0300',
    leadership: 'Elders: Elias Adamo and Ibrahim Haro (from the church\'s own leadership page, read 2026-08-12).',
    stanceBasis: 'evidenced',
    researchStatus: 'researched',
    // Midday UTC, not midnight: a bare YYYY-MM-DD parses as UTC midnight and
    // renders as the previous day in every US timezone.
    lastResearchedAt: new Date('2026-08-12T12:00:00Z'),
    theologicalNotes:
      'Reformed Baptist, 1689 London Baptist Confession. Wayne NJ — the congregation meets in the Calvary Gospel Church building at 1559 Hamburg Turnpike.\n\n'
      + 'FAMILY-INTEGRATED CHURCH. Listed in the Church & Family Life / NCFIC church network.\n\n'
      + 'Elders Elias Adamo and Ibrahim Haro. Haro pastored an Arabic-speaking church in Paterson for ten years before joining in 2020.',
    researchNote:
      (c.researchNote ? c.researchNote + '\n\n' : '')
      + '=== RE-RESEARCHED 2026-08-12 (NJ sweep for Garden State Abolitionists city pages) ===\n'
      + 'LOCATION CORRECTED. The row described 153 Ridge Road, North Arlington 07031, with an 865 (Knoxville TN) phone and "Pastor Damien Garofalo". The church\'s own site gives 1559 Hamburg Turnpike, Wayne NJ 07470 and 201-907-0300 in the footer of every page, names Elias Adamo and Ibrahim Haro as its elders, and contains no occurrence of Ridge Road, North Arlington, 07031 or Garofalo. Coordinates re-geocoded through the Census geocoder (Wayne township, Legislative District 40).\n\n'
      + 'STANCE BASIS RAISED denominational_default -> evidenced, WITHOUT CHANGING THE STANCE. What was read: the full site (statement of faith, who-we-are, leadership, ministries), the SermonAudio archive of 1,636 sermons, the YouTube channel of 451 videos, and the site\'s own search.\n\n'
      + 'FOR: the church lists "Abortion clinic" among its standing local outreaches, alongside street evangelism, nursing homes and an inner-city mission. That is a recurring deed, not a statement, and more than most congregations in this state do.\n'
      + 'AGAINST pro_abolition: none of those sources contains abolition language — no "abolish", no "abolition", no "equal protection", no "personhood", no call to criminalise. A YouTube channel search for "abortion" returns no content. Clinic presence alone does not distinguish an abolitionist from a pro-life congregation, so the stance stays incrementalist; it is now evidenced rather than inferred from the denomination.',
  }

  for (const [k, v] of Object.entries(next)) show(k, c[k], v)
  if (APPLY) {
    await repair(190, next, 'Location/leadership corrected from the church\'s own site; stanceBasis raised to evidenced after reading the site, 1,636 sermons and 451 videos. Stance unchanged.')
    console.log('    APPLIED')
  }
}

// ---- #3701 The Body of Christ ------------------------------------------
{
  const c = await prisma.church.findUnique({ where: { id: 3701 } })
  if (!c) throw new Error('#3701 not found')
  console.log(`#3701 ${c.name}`)

  const raw = c.website || ''
  const url = (raw.match(/https?:\/\/(?:www\.)?[a-z0-9.-]+\.[a-z]{2,}[^\s]*/gi) || [])
    .find(u => !/^https?:\/\/Confessions/i.test(u)) || null
  const prose = raw.replace(url || '', '').replace(/^https?:\/\//i, '').trim()

  const next = {
    website: url,
    theologicalNotes: [prose, c.theologicalNotes].filter(Boolean).join('\n\n'),
    researchNote:
      (c.researchNote ? c.researchNote + '\n\n' : '')
      + '=== FIELD REPAIR 2026-08-12 ===\n'
      + 'The `website` column held confession prose with the real URL appended. The URL has been extracted into `website` and the prose preserved into theologicalNotes rather than dropped. No stance was touched and the congregation has still not been researched.',
  }
  for (const [k, v] of Object.entries(next)) show(k, c[k], v)
  if (APPLY) {
    await repair(3701, next, 'Repaired website column that contained confession prose; text preserved to theologicalNotes.')
    console.log('    APPLIED')
  }
}

// ---- #5650 duplicate ----------------------------------------------------
{
  const c = await prisma.church.findUnique({ where: { id: 5650 } })
  if (!c) throw new Error('#5650 not found')
  console.log(`#5650 ${c.name} (duplicate of #5618)`)
  const next = {
    approved: false,
    researchNote:
      (c.researchNote ? c.researchNote + '\n\n' : '')
      + '=== HELD 2026-08-12 ===\nDuplicate of #5618 (same name, city, pastor and Founders listing). Hidden via approved=false rather than deleted, so the record and its provenance survive.',
  }
  for (const [k, v] of Object.entries(next)) show(k, c[k], v)
  if (APPLY) {
    await repair(5650, next, 'Hidden as a duplicate of #5618. Row retained, not deleted.')
    console.log('    APPLIED')
  }
}

console.log(APPLY ? '\nwrote 3 rows' : '\nDRY RUN — pass --apply to write')
await prisma.$disconnect()
