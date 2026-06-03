import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Denomination boilerplate prefixes from bulk-theology.ts
const boilerplateMarkers = [
  'Westminster Standards',
  'Three Forms of Unity',
  '1689 London Baptist Confession',
  'Generally postmillennial',
]

async function main() {
  const total = await prisma.church.count()

  const churches = await prisma.church.findMany({
    select: {
      id: true, denomination: true, theologicalNotes: true,
      email: true, phone: true, website: true, description: true,
    }
  })

  // Research-depth tiers (most-specific wins):
  //   tier3 = "directly researched": notes mention a pastor by name
  //   tier2 = "extended": notes go beyond boilerplate template (long or non-template)
  //   tier1 = "boilerplate": notes match the denomination template only
  //   tier0 = "no notes" (after bulk-theology this should be ~0)
  const tier = { t3: 0, t2: 0, t1: 0, t0: 0 }
  const perDenom: Record<string, { total: number; t3: number; t2: number; t1: number; t0: number; contact: number }> = {}

  for (const c of churches) {
    const d = c.denomination || '(none)'
    if (!perDenom[d]) perDenom[d] = { total: 0, t3: 0, t2: 0, t1: 0, t0: 0, contact: 0 }
    perDenom[d].total++

    const notes = c.theologicalNotes || ''
    const hasContact = !!(c.email || c.phone || c.website)
    if (hasContact) perDenom[d].contact++

    let t: 't3' | 't2' | 't1' | 't0'
    if (!notes) t = 't0'
    else if (/Pastor[:\s]/i.test(notes)) t = 't3'
    else {
      const startsBoilerplate = boilerplateMarkers.some(m => notes.startsWith(m))
      if (startsBoilerplate && notes.length < 250) t = 't1'
      else t = 't2'
    }
    tier[t]++
    perDenom[d][t]++
  }

  const pct = (n: number) => `${((n / total) * 100).toFixed(1)}%`

  console.log(`\n=== TOTAL: ${total} churches ===\n`)
  console.log('=== RESEARCH-DEPTH TIERS ===')
  console.log(`  Tier 3  Direct (pastor named in notes)     ${tier.t3}  (${pct(tier.t3)})`)
  console.log(`  Tier 2  Extended (custom notes, no pastor) ${tier.t2}  (${pct(tier.t2)})`)
  console.log(`  Tier 1  Boilerplate denomination only      ${tier.t1}  (${pct(tier.t1)})`)
  console.log(`  Tier 0  No notes                            ${tier.t0}  (${pct(tier.t0)})`)

  console.log('\n=== PER-DENOMINATION RESEARCH DEPTH ===')
  console.log(
    `  ${'Denomination'.padEnd(22)} ${'Tot'.padStart(5)} ${'T3'.padStart(5)} ${'T2'.padStart(5)} ${'T1'.padStart(5)} ${'T0'.padStart(4)} ${'T3%'.padStart(6)} ${'Contact%'.padStart(8)}`
  )
  const sorted = Object.entries(perDenom).sort((a, b) => b[1].total - a[1].total)
  for (const [d, b] of sorted) {
    if (b.total < 3) continue
    const t3p = `${Math.round((b.t3 / b.total) * 100)}%`
    const cp = `${Math.round((b.contact / b.total) * 100)}%`
    console.log(
      `  ${d.padEnd(22)} ${String(b.total).padStart(5)} ${String(b.t3).padStart(5)} ${String(b.t2).padStart(5)} ${String(b.t1).padStart(5)} ${String(b.t0).padStart(4)} ${t3p.padStart(6)} ${cp.padStart(8)}`
    )
  }

  // Per-church completeness: 7 enrichable fields
  console.log('\n=== PER-CHURCH FIELD COMPLETENESS ===')
  const missingFieldCounts = { email: 0, phone: 0, website: 0, description: 0, theology_boilerplate_only: 0 }
  const completenessHist = { '0/5': 0, '1/5': 0, '2/5': 0, '3/5': 0, '4/5': 0, '5/5': 0 }
  for (const c of churches) {
    let have = 0
    if (c.email) have++; else missingFieldCounts.email++
    if (c.phone) have++; else missingFieldCounts.phone++
    if (c.website) have++; else missingFieldCounts.website++
    if (c.description) have++; else missingFieldCounts.description++
    const notes = c.theologicalNotes || ''
    const boilerplateOnly = !notes || (boilerplateMarkers.some(m => notes.startsWith(m)) && notes.length < 250 && !/Pastor[:\s]/i.test(notes))
    if (!boilerplateOnly) have++
    else missingFieldCounts.theology_boilerplate_only++
    const k = `${have}/5` as keyof typeof completenessHist
    completenessHist[k]++
  }
  console.log('Missing per field (of total):')
  for (const [k, v] of Object.entries(missingFieldCounts)) console.log(`  ${k.padEnd(28)} ${v}  (${pct(v)})`)
  console.log('\nCompleteness histogram (have-count out of 5 enrichable):')
  for (const [k, v] of Object.entries(completenessHist)) console.log(`  ${k.padEnd(5)} ${v}  (${pct(v)})`)

  await prisma.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
