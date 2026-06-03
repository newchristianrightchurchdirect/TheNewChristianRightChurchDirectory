import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

type SlugEntry = { presbytery: string; name: string; city: string; state: string; slug: string }

// Normalize a church name for fuzzy matching:
// - lowercase
// - strip "reformed presbyterian church", "rpcna", "rp church", "rpc", "church", "of", "the"
// - strip parenthetical content
// - strip non-alphanumeric
function normName(s: string): string {
  return s
    .toLowerCase()
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\brpcna\b/g, ' ')
    .replace(/\breformed presbyterian church\b/g, ' ')
    .replace(/\breformed presbyterian\b/g, ' ')
    .replace(/\brp church\b/g, ' ')
    .replace(/\brpc\b/g, ' ')
    .replace(/\breformed church\b/g, ' ')
    .replace(/\bchurch\b/g, ' ')
    .replace(/\bof\b/g, ' ')
    .replace(/\bthe\b/g, ' ')
    .replace(/[^a-z0-9]+/g, '')
    .trim()
}

// Score: 1.0 = exact, ~0.7 = one contains the other, 0 = no overlap
function score(a: string, b: string): number {
  if (!a || !b) return 0
  if (a === b) return 1.0
  if (a.includes(b) || b.includes(a)) return 0.7 + 0.2 * Math.min(a.length, b.length) / Math.max(a.length, b.length)
  return 0
}

async function main() {
  const slugIndexPath = path.join(process.cwd(), 'data', 'research-queue', 'rpcna_slug_index.json')
  const slugs: SlugEntry[] = JSON.parse(fs.readFileSync(slugIndexPath, 'utf-8'))

  // Pre-compute normalized slug names
  const slugIdx = slugs.map(s => ({ ...s, norm: normName(s.name), normCity: s.city.toLowerCase().replace(/[^a-z0-9]/g, '') }))

  // Pull T1 RPCNA churches from DB (boilerplate-only)
  const T1_MARKERS = ['Westminster Standards', 'Three Forms of Unity', '1689 London Baptist Confession', 'Generally postmillennial']
  const all = await prisma.church.findMany({
    where: { denomination: 'RPCNA', approved: true },
    select: { id: true, name: true, city: true, state: true, theologicalNotes: true },
  })
  const t1 = all.filter(c => {
    const n = (c.theologicalNotes || '').trim()
    if (!n) return true
    if (n.length > 250) return false
    if (/pastor/i.test(n)) return false
    return T1_MARKERS.some(m => n.startsWith(m))
  })

  console.log(`T1 RPCNA churches: ${t1.length}`)
  console.log(`Slug index entries: ${slugIdx.length}\n`)

  type Match = { churchId: number; churchName: string; churchCity: string; state: string; slug: string; slugName: string; slugCity: string; score: number }
  const matched: Match[] = []
  const unmatched: { id: number; name: string; city: string; state: string }[] = []

  for (const c of t1) {
    const cn = normName(c.name)
    const cCity = (c.city || '').toLowerCase().replace(/[^a-z0-9]/g, '')

    // Prefer same-state candidates first, then any
    const candidates = slugIdx.filter(s => s.state === c.state)
    const all = candidates.length ? candidates : slugIdx

    let best: typeof slugIdx[0] | null = null
    let bestScore = 0
    for (const s of all) {
      let sc = score(cn, s.norm)
      // City boost: if cities match (or one contains other), add 0.2
      if (cCity && s.normCity) {
        if (cCity === s.normCity) sc += 0.2
        else if (cCity.includes(s.normCity) || s.normCity.includes(cCity)) sc += 0.1
      }
      if (sc > bestScore) {
        bestScore = sc
        best = s
      }
    }

    if (best && bestScore >= 0.7) {
      matched.push({
        churchId: c.id,
        churchName: c.name,
        churchCity: c.city || '',
        state: c.state || '',
        slug: best.slug,
        slugName: best.name,
        slugCity: best.city,
        score: Math.round(bestScore * 100) / 100,
      })
    } else {
      unmatched.push({ id: c.id, name: c.name, city: c.city || '', state: c.state || '' })
    }
  }

  console.log(`✓ Matched: ${matched.length}`)
  console.log(`✗ Unmatched: ${unmatched.length}\n`)

  console.log('--- MATCHED ---')
  for (const m of matched.sort((a, b) => a.state.localeCompare(b.state))) {
    const cityNote = m.churchCity.toLowerCase() !== m.slugCity.toLowerCase() ? ` [city: db="${m.churchCity}" → slug="${m.slugCity}"]` : ''
    console.log(`  ${m.state} #${m.churchId} "${m.churchName}" → ${m.slug} (score=${m.score})${cityNote}`)
  }
  console.log('\n--- UNMATCHED (T1 in DB, no slug found) ---')
  for (const u of unmatched.sort((a, b) => a.state.localeCompare(b.state))) {
    console.log(`  ${u.state} #${u.id} "${u.name}" (${u.city})`)
  }

  // Slugs in index but NOT matched to any T1 — likely already T3 in DB, or not approved, or in DB under different name
  const matchedSlugs = new Set(matched.map(m => m.slug))
  const orphanSlugs = slugIdx.filter(s => !matchedSlugs.has(s.slug))
  console.log(`\n--- ORPHAN SLUGS (in index, no T1 match — may be T3 already, missing from DB, or under different name) ---`)
  for (const s of orphanSlugs.sort((a, b) => a.state.localeCompare(b.state))) {
    console.log(`  ${s.state} ${s.slug} "${s.name}" (${s.city})`)
  }

  // Save the match plan as JSON for the apply step
  const planPath = path.join(process.cwd(), 'data', 'research-queue', 'rpcna_match_plan.json')
  fs.writeFileSync(planPath, JSON.stringify({ matched, unmatched, orphanSlugs }, null, 2))
  console.log(`\nSaved match plan → ${planPath}`)

  await prisma.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
