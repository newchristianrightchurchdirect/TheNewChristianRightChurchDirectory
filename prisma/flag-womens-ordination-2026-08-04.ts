// Dustin's call, 2026-08-04: churches whose denomination permits women in the pastoral office
// should be marked as not qualifying — marked, not deleted, so the research survives and the
// directory keeps recording what was examined.
//
// Scope chosen: denominational permission (25 churches), not evidenced practice (which is 1).
//
// IMPORTANT — the flag records the DENOMINATION'S position. Five of these twenty-five are recorded
// complementarian from their own practice, most notably Bethlehem Baptist, Minneapolis. Their notes
// say so explicitly rather than letting the flag imply something the evidence contradicts.
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const ACTOR = 'flag-womens-ordination-2026-08-04.ts'
const FLAG = 'womens_ordination'

const PERMISSIVE = new Set(['Global Methodist Church', 'Methodist (disaffiliated from UMC)',
  'EPC (Evangelical Presbyterian Church)', 'Evangelical Covenant Church', 'Converge',
  'Converge Heartland', 'SBC / Converge Heartland', 'Christian and Missionary Alliance (C&MA)',
  'Wesleyan Church', 'RCA'])

// Why each body qualifies, so the record is specific rather than gesturing at a category.
const BASIS: Record<string, string> = {
  'Global Methodist Church': 'The **Global Methodist Church ordains women**, and did so from its founding in 2022 — it separated from the UMC over sexuality, not over the ordination of women.',
  'Methodist (disaffiliated from UMC)': 'These congregations disaffiliated from the United Methodist Church and are Methodist in polity; **the Methodist bodies they align with ordain women.**',
  'EPC (Evangelical Presbyterian Church)': 'The **EPC treats the ordination of women as a matter of liberty** rather than a settled position, leaving each presbytery and session to decide.',
  'Evangelical Covenant Church': 'The **Evangelical Covenant Church ordains women** and has done so since 1976.',
  'Converge': 'Converge (formerly the Baptist General Conference) **leaves the question of women in pastoral ministry to the local church** rather than settling it denominationally.',
  'Converge Heartland': 'Converge **leaves the question of women in pastoral ministry to the local church** rather than settling it denominationally.',
  'SBC / Converge Heartland': 'Dually aligned. Converge **leaves women in pastoral ministry to the local church** — though its **SBC** alignment binds the Baptist Faith and Message, which restricts the pastoral office to men.',
  'Christian and Missionary Alliance (C&MA)': 'The **C&MA’s practice regarding women and the pastoral title has changed in recent years and is not uniform**, so it does not restrict the office the way a confessional body does.',
  'Wesleyan Church': 'The **Wesleyan Church ordains women**, and has since its founding — its 1843 abolitionist founders held the same position.',
  'RCA': 'The **Reformed Church in America ordains women.**',
}

async function main() {
  const all = await prisma.church.findMany({
    select: { id: true, name: true, city: true, state: true, denomination: true,
              genderStance: true, recordFlag: true, theologicalNotes: true, culturalEngagement: true },
  })
  const rows = all.filter(c => c.denomination && PERMISSIVE.has(c.denomination))
  console.log(`marking ${rows.length} churches\n`)

  let flagged = 0, contested = 0
  for (const c of rows) {
    const flags = (c.recordFlag || '').split(';').map(s => s.trim()).filter(Boolean)
    if (!flags.includes(FLAG)) flags.push(FLAG)

    const basis = BASIS[c.denomination!] || 'This congregation’s denomination permits women in the pastoral office.'

    // Where the congregation's OWN practice is complementarian, say so plainly. A flag that
    // implied otherwise would misrepresent the church.
    const contradicts = c.genderStance === 'complementarian' || c.genderStance === 'patriarchal'
    if (contradicts) contested++

    const note = `\n\n---\n\n**MARKED 2026-08-04 — does not qualify: denomination ordains women.**

${basis}

**This directory holds that the pastoral office is restricted to men**, and a congregation in a body that does not hold that is recorded as not meeting the standard. The church remains listed, because the point of this directory is to record what was examined.${
  contradicts
    ? `\n\n**Important qualification, and it cuts against the flag.** This congregation is recorded as **${c.genderStance}** on its own evidence — its practice restricts the pastoral office to men, whatever its denomination permits. **The flag records the denomination's position, not this church's.** It is marked for the affiliation, and the distinction is preserved here deliberately rather than being flattened.`
    : `\n\nNo evidence was found that this particular congregation has a woman in pastoral office; the mark rests on the denominational position, which is the standard applied here.`
}`

    await prisma.church.update({
      where: { id: c.id },
      data: {
        recordFlag: flags.join(';'),
        theologicalNotes: `${c.theologicalNotes || ''}${note}`,
      },
    })
    await prisma.stanceChange.create({
      data: { churchId: c.id, churchName: c.name, field: 'recordFlag',
              oldValue: c.recordFlag || null, newValue: flags.join(';'), actor: ACTOR,
              note: `Denomination (${c.denomination}) ordains women or leaves it to the local church; marked as not qualifying.${contradicts ? ' NOTE: this congregation is itself recorded ' + c.genderStance + '.' : ''}` },
    })
    flagged++
    console.log(`  #${c.id} ${c.name} (${c.city}, ${c.state}) — ${c.denomination}${contradicts ? `  [!] own practice: ${c.genderStance}` : ''}`)
  }

  console.log(`\nflagged: ${flagged}   of which recorded complementarian/patriarchal themselves: ${contested}`)
  const q = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist' } })
  console.log(`qualifying (unchanged — none of the 25 were qualifying): ${q}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
