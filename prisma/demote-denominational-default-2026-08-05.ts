// Final round of the qualifying-church audit: rows that qualify on DENOMINATIONAL DEFAULT.
//
// Dustin's ruling, made early in this project: "CREC does not necessarily mean good." A church
// qualifies on what it does, not on the body it belongs to. Yet a set of rows still read
// "Defaults (CREC); pastor not listed" or "Stance(s) set by denominational default (no individual
// position stated on church site)" while carrying the qualifying label.
//
// Their markers are defaults too, which is the deeper problem: a denominational default set the
// eschatology and theonomy fields, and those fields were then read back as evidence that the
// church qualifies. That is circular, and it is the last of the four bulk-inference cohorts.
//
// CREC churches remain the likeliest promotions in the whole directory — Christ Church Omaha
// qualified on 2026-07-31 on exactly this kind of evidence, once someone read its mission
// statement. So these are demoted to unresearched and flagged, NOT ruled out.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'demote-denominational-default-2026-08-05.ts'
const DEFAULT_LANG = /denominational default|Defaults \(|SBC defaults/i

const NOTE = (denom: string | null) => `\n\n---\n\n**DEMOTED FROM QUALIFYING 2026-08-05 — qualified on a denominational default, not on evidence.**

This row's own research note records that its stances were **set by denominational default** because no individual position could be found on the church's own site. It was then counted as qualifying on the strength of those defaulted fields — **which is circular**: the denomination set the markers, and the markers were read back as evidence about the church.

**The standing ruling on this directory is that denominational membership does not qualify a congregation.** ${denom === 'CREC' ? 'The point was made about this denomination specifically: **CREC membership does not by itself mean a church fits.** ' : ''}A church qualifies on what it does.

**This is not a ruling against the church — it is an admission that nobody has looked yet.**${denom === 'CREC' ? ' CREC congregations are the likeliest promotions in the entire directory: **Christ Church Omaha** was promoted on 2026-07-31 on exactly this kind of evidence, the moment someone actually read its mission statement ("make Omaha a Christian town… Christian leadership in the arts, in business, in education, in politics"). Expect several of these to qualify once read.' : ''}

Reclassified as unresearched and flagged \`verify_stance\`. Read the site, the socials and the preaching; promote on what is found.`

async function main() {
  const q = await prisma.church.findMany({
    where: { approved: true, culturalEngagement: 'transformationalist' },
    select: { id: true, name: true, city: true, state: true, denomination: true, stanceBasis: true,
      theologicalNotes: true, researchNote: true, recordFlag: true },
  })

  const onDefault = q.filter(c => DEFAULT_LANG.test(c.researchNote || '') || c.stanceBasis === 'denominational_default')
  // Keep any row that ALSO records a real act — the AR-list SBC churches whose pastors co-authored
  // the 2021 SBC abolition resolution mention defaults only for the secondary fields.
  const REAL_ACT = /co-authored|rally|statehouse|filed SB|senator|signatory|co-produc|resolution 'On Abolishing|resolution "On Abolishing/i
  const demote = onDefault.filter(c => !REAL_ACT.test(c.researchNote || ''))
  const kept = onDefault.filter(c => REAL_ACT.test(c.researchNote || ''))

  console.log(`qualifying: ${q.length}`)
  console.log(`qualify on denominational-default language: ${onDefault.length}`)
  console.log(`  kept (also record a real act): ${kept.length}`)
  kept.forEach(c => console.log(`     #${c.id} ${c.name}`))
  console.log(`  demoting: ${demote.length}`)

  for (const c of demote) {
    const flags = (c.recordFlag || '').split(';').map(s => s.trim()).filter(Boolean)
    if (!flags.includes('verify_stance')) flags.push('verify_stance')
    await updateStances(prisma, c.id, { culturalEngagement: 'unknown' }, {
      actor: ACTOR,
      note: 'Qualified on denominational default rather than evidence of corporate civil-sphere action; demoted pending individual research.',
      alsoSet: { recordFlag: flags.join(';'), theologicalNotes: `${c.theologicalNotes || ''}${NOTE(c.denomination)}` },
    })
    console.log(`     demoted #${c.id} ${c.name} (${c.city}, ${c.state}) [${c.denomination || '-'}]`)
  }

  // Separate bug: a row whose own note says it was NOT promoted, while carrying the qualifying label.
  const spokane = await prisma.church.findUnique({ where: { id: 22 } })
  if (spokane && spokane.culturalEngagement === 'transformationalist') {
    await updateStances(prisma, 22, { culturalEngagement: 'unknown' }, {
      actor: ACTOR,
      note: 'Its own research note records "no qualifying evidence found ... Left flagged, not promoted" — the label contradicted the finding.',
      alsoSet: {
        theologicalNotes: `${spokane.theologicalNotes || ''}\n\n---\n\n**CORRECTED 2026-08-05 — the label contradicted the research.** This row's own note from the 2026-07-31 review reads: *"full review to standard — no qualifying evidence found for Kenton Spratt or the church. Sermon archive (iFrame) and socials still unread. Left flagged, not promoted."* It was nonetheless still carrying the qualifying label. **The review's conclusion now matches the record.** The sermon archive is served in an iFrame and remains unread; that is the obvious next step before any promotion.`,
      },
    })
    console.log(`     corrected #22 Christ Church Spokane — note said "not promoted" while label said qualifying`)
  }

  const cnt = (v: string) => prisma.church.count({ where: { approved: true, culturalEngagement: v } })
  console.log(`\nqualifying now: ${await cnt('transformationalist')}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
