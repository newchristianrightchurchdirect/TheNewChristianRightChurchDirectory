// #3247 — the Grand Blanc congregation formerly recorded as "OneLife Church".
//
// The record was flagged `in_transition` because reporting suggested a rename that the church
// had not confirmed. The congregation has now confirmed it directly to the directory owner:
// the name is Ekklesia of Grand Blanc, the contact is nick@ekklesiagb.com, and the church has
// missionaries at abortion facilities daily through One Life For Life (onelifeforlife.org).
//
// Two things are corrected rather than added:
//  * the public description asserted "postmillennial", which came from a third-party directory
//    and the church has never confirmed. Removed.
//  * `abolitionStance` stays UNKNOWN on purpose. See the note in theologicalNotes.
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const NOTES = [
  'Formed when OneLife Church — planted in Flint in 2014 by founding pastor Eric Stewart — combined with Bethany Baptist Church at 2353 E. Grand Blanc Rd. **The congregation is now named Ekklesia of Grand Blanc** (ekklesiagb.com); the rename was confirmed directly by the church to this directory on 2026-07-29. The old hisonelife.com domain and the former 2237 Reid Rd address are stale.',
  '**CULTURAL ENGAGEMENT (EVIDENCED): transformationalist.** The church gives One Life For Life (onelifeforlife.org) a dedicated section of its own site, and the congregation confirmed to this directory that it has missionaries at abortion mills every day as part of that work. One Life For Life, founded 2017, "exists to rescue pre-born children and bring hope to their families by positioning gospel-equipped missionaries at abortion mills across the United States," with the stated aim of a trained, fully supported missionary present every day at every abortion clinic. That is the church acting corporately on abortion, not merely individual members doing so.',
  '**ABOLITION STANCE DELIBERATELY LEFT UNKNOWN.** One Life For Life calls abortion "the murder of our pre-born neighbors" and speaks of "the American Holocaust" — abolitionist-sounding language — but its published method is missionary presence and persuasion at the facility. No statement was found, from either the church or the ministry, on equal protection under the law, on criminalising abortion as homicide, or on abolition versus incremental legislation, which are the questions that actually distinguish abolitionism from mill ministry. Recording pro_abolition on rescue-ministry evidence would corrupt the field, so it stays unknown pending a direct answer from the church.',
  'Eschatology: an earlier third-party directory labelled this church postmillennial. The church has not confirmed that, so it is not asserted here.',
].join('\n\n')

const DESCRIPTION =
  'An independent, non-denominational congregation in Grand Blanc, Michigan, formed when ' +
  'OneLife Church and Bethany Baptist Church combined. The church sends missionaries to ' +
  'abortion facilities daily through One Life For Life. Founding/Lead Pastor: Eric Stewart.'

async function main() {
  const before = await prisma.church.findUnique({ where: { id: 3247 } })
  if (!before) throw new Error('#3247 not found')
  console.log(`before: "${before.name}"  email=${before.email}  flag=${before.recordFlag}`)

  const after = await prisma.church.update({
    where: { id: 3247 },
    data: {
      name: 'Ekklesia of Grand Blanc',
      email: 'nick@ekklesiagb.com',
      // Titles are not published on the leadership page, so none are invented.
      leadership: 'Founding/Lead Pastor: Eric Stewart; leadership team: Jonathan Wass, Nick Staley, Josh Smith, Justin Phillips, Nathan Brackenridge (titles not published)',
      description: DESCRIPTION,
      theologicalNotes: NOTES,
      recordFlag: null, // rename confirmed by the church — nothing left to verify
      stanceBasis: 'evidenced',
      culturalEngagement: 'transformationalist',
      researchStatus: 'researched',
      sourceUrls: [
        'https://www.ekklesiagb.com/',
        'https://www.ekklesiagb.com/one-life-for-life',
        'https://www.ekklesiagb.com/leadership',
        'https://onelifeforlife.org/',
        'https://www.onelifemi.com/our-leadership/',
      ].join(';'),
      researchNote:
        '2026-07-29: name corrected to Ekklesia of Grand Blanc and email set to nick@ekklesiagb.com, both confirmed by the congregation to the directory owner, who also confirmed daily missionary presence at abortion facilities through One Life For Life. in_transition flag cleared. Public description corrected: it asserted "postmillennial", which the church has never confirmed. abolitionStance left unknown — see theologicalNotes.',
      lastResearchedAt: new Date(),
    },
  })
  console.log(`after:  "${after.name}"  email=${after.email}  flag=${after.recordFlag ?? 'cleared'}`)
  console.log(`        culturalEngagement=${after.culturalEngagement}  abolitionStance=${after.abolitionStance}  eschatology=${after.eschatology}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
