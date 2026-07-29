// Build an outreach call-sheet of Michigan churches for Abolish Abortion Michigan.
//
// Two deliberate choices:
//  * INTERNAL EDITORIAL JUDGEMENTS ARE NOT EXPORTED. The directory's private notes contain
//    assessments that would be inappropriate to hand to a third party doing cold outreach
//    (denominational fit calls, a women-in-office question, an SPLC listing). The sheet carries
//    contact details, a priority tier, and a short neutral reason only.
//  * Rows that should not be contacted at all are excluded: closed churches, flagged
//    duplicates, non-fit rows, and congregations whose existence is unconfirmed.
import { PrismaClient } from '@prisma/client'
import { writeFileSync } from 'fs'
import { join } from 'path'

const prisma = new PrismaClient()

const csvCell = (v: unknown) => {
  const s = v == null ? '' : String(v)
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}
const pastorOf = (leadership: string | null) => {
  if (!leadership) return ''
  if (/vacant/i.test(leadership)) return '(pulpit vacant)'
  // Leadership strings vary a lot ("Pastor: X", "Senior Pastor X", "Founding/Lead Pastor: X",
  // "Head Pastor and Elder: X"). Strip any leading title words up to the name.
  return leadership.split(';')[0]
    .replace(/^[A-Za-z/ ]*\b(Pastor|Minister|Preacher)s?\b[A-Za-z ]*:?\s*/i, '')
    .replace(/\s*\(.*$/, '')
    .trim()
}

async function main() {
  const all = await prisma.church.findMany({ where: { state: 'MI' }, orderBy: { city: 'asc' } })

  const excluded: string[] = []
  const rows = all.filter(c => {
    const f = c.recordFlag || ''
    if (/closed|duplicate_of|review_nonfit/.test(f)) { excluded.push(`${c.name} (${c.city}) — ${f}`); return false }
    if (c.id === 2145) { excluded.push(`${c.name} (${c.city}) — existence unconfirmed`); return false }
    if (!c.email && !c.phone && !c.website) { excluded.push(`${c.name} (${c.city}) — no contact channel`); return false }
    return true
  })

  const tierOf = (c: any): [number, string] => {
    if (c.abolitionStance === 'pro_abolition') return [1, 'Already recorded as abolitionist']
    if (c.culturalEngagement === 'transformationalist') return [1, 'Acts corporately on public issues']
    if (['affirm', 'sympathetic'].includes(c.christianNationalism)) return [1, 'Christian-nationalist sympathies on record']
    if (c.eschatology === 'postmill') return [1, 'Postmillennial']
    if (c.zionistStance === 'anti') return [1, 'Publicly anti-Zionist']
    if (['CREC', 'Vanguard Presbytery', 'RPCNA'].includes(c.denomination || '')) return [2, 'Denomination with a strong civil-sphere theology']
    if (c.denomination === 'Reformed Baptist' && /1689/.test(c.theologicalNotes || '')) return [2, 'Confessional 1689 Reformed Baptist']
    if (['OPC', 'PCA', 'URCNA', 'PRCA', 'RPC', 'NRC', 'HRC', 'FRCNA', 'CanRC', 'Reformed Baptist'].includes(c.denomination || '')) return [3, 'Confessional Reformed / Presbyterian']
    return [4, 'Conservative evangelical']
  }

  const enriched = rows.map(c => {
    const [tier, why] = tierOf(c)
    return { c, tier, why }
  }).sort((a, b) => a.tier - b.tier || a.c.city.localeCompare(b.c.city) || a.c.name.localeCompare(b.c.name))

  // Outreach runs email first, then phone, then the website's contact form. Say which one
  // applies per church so nobody has to work that out from three half-filled columns.
  const routeOf = (c: any) => c.email ? 'Email' : c.phone ? 'Call' : c.website ? 'Website form' : ''

  const header = ['Priority', 'Church', 'Denomination', 'City', 'Address', 'Zip', 'Pastor', 'Contact via', 'Email', 'Phone', 'Website', 'Why prioritised', 'Contacted? (date)', 'Response', 'Abolitionist? (Y/N/Unsure)']
  const lines = [header.join(',')]
  for (const { c, tier, why } of enriched) {
    lines.push([
      `Tier ${tier}`, c.name, c.denomination, c.city, c.address, c.zip,
      pastorOf(c.leadership), routeOf(c), c.email, c.phone, c.website, why, '', '', '',
    ].map(csvCell).join(','))
  }

  const out = join(process.cwd(), 'data', 'AAM_michigan_outreach_2026-07-29.csv')
  writeFileSync(out, lines.join('\n') + '\n', 'utf8')

  const byTier: Record<number, number> = {}
  enriched.forEach(e => { byTier[e.tier] = (byTier[e.tier] || 0) + 1 })
  console.log(`WROTE ${out}`)
  console.log(`  churches on the sheet: ${enriched.length} of ${all.length} Michigan rows`)
  console.log(`  by priority: ` + Object.entries(byTier).map(([t, n]) => `Tier ${t}=${n}`).join('  '))
  console.log(`  with email: ${rows.filter(c => c.email).length}   phone: ${rows.filter(c => c.phone).length}   website: ${rows.filter(c => c.website).length}   named pastor: ${rows.filter(c => c.leadership).length}`)
  const routes: Record<string, number> = {}
  enriched.forEach(({ c }) => { const r = routeOf(c); routes[r] = (routes[r] || 0) + 1 })
  console.log(`  contact route: ` + Object.entries(routes).map(([r, n]) => `${r}=${n}`).join('  '))
  console.log(`\n  EXCLUDED (${excluded.length}):`)
  excluded.forEach(e => console.log('    - ' + e))
  console.log('\n  Tier 1 (contact these first):')
  enriched.filter(e => e.tier === 1).forEach(e => console.log(`    ${e.c.name} (${e.c.city}) — ${e.why}`))
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
