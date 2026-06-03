// Match URC parsed entries to T1 URC churches in DB
import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const prisma = new PrismaClient()

type Parsed = {
  name: string; lat?: string; lng?: string
  street?: string; city?: string; state?: string; zip?: string; country?: string
  phone?: string; email?: string; website?: string; minister?: string
  ok: boolean
}

function normName(s: string): string {
  let t = s.toLowerCase()
    .replace(/\([^)]*\)/g, ' ')
    // Strip trailing ", City, ST" or ", City ST" (some entries embed location)
    .replace(/,\s*[a-z][a-z\s\-\.]+,\s*[a-z]{2}\s*$/i, ' ')
    .replace(/,\s*[a-z][a-z\s\-\.]+\s*$/i, ' ')
    // Strip trailing "of CITY" patterns (URC convention)
    .replace(/\s+of\s+[a-z][a-z\s\-]+$/i, ' ')
  return t
    .replace(/\bunited reformed church\b/g, ' ')
    .replace(/\bunited reformed\b/g, ' ')
    .replace(/\burcna\b/g, ' ')
    .replace(/\burc\b/g, ' ')
    .replace(/\breformed church\b/g, ' ')
    .replace(/\bpresbyterian church\b/g, ' ')
    .replace(/\bpresbyterian\b/g, ' ')
    .replace(/\breformed\b/g, ' ')
    .replace(/\bchurch\b/g, ' ')
    .replace(/\bof\b/g, ' ')
    .replace(/\bthe\b/g, ' ')
    .replace(/\bcongregation\b/g, ' ')
    .replace(/[^a-z0-9]+/g, '')
    .trim()
}
function normCity(s: string): string { return (s || '').toLowerCase().replace(/[^a-z0-9]/g, '') }
function nameSim(a: string, b: string): number {
  if (!a || !b) return 0
  if (a === b) return 1.0
  if (a.includes(b) || b.includes(a)) return 0.7 + 0.2 * Math.min(a.length, b.length) / Math.max(a.length, b.length)
  return 0
}

async function main() {
  const parsed: Parsed[] = JSON.parse(fs.readFileSync('data/research-queue/urc_pages_parsed.json', 'utf-8'))
  const idx = parsed.filter(p => p.ok).map(p => ({
    ...p,
    nName: normName(p.name),
    nCity: normCity(p.city || ''),
    state: (p.state || '').toUpperCase(),
  }))

  const T1_MARKERS = ['Westminster Standards', 'Three Forms of Unity', '1689 London Baptist Confession']
  const all = await prisma.church.findMany({
    where: { denomination: 'URC', approved: true },
    select: { id: true, name: true, city: true, state: true, theologicalNotes: true },
  })
  const t1 = all.filter(c => {
    const n = (c.theologicalNotes || '').trim()
    if (!n) return true
    if (n.length > 250) return false
    if (/pastor|elder|vacant/i.test(n)) return false
    return T1_MARKERS.some(m => n.startsWith(m))
  })
  console.log(`DB URC T1: ${t1.length} / ${all.length}`)
  console.log(`Parsed index: ${idx.length}\n`)

  type Match = { churchId: number; churchName: string; churchCity: string; churchState: string; entryName: string; entryCity: string; entryState: string; nameScore: number; cityMatch: boolean; total: number }
  const matched: Match[] = []
  const unmatched: any[] = []
  const usedName = new Set<string>()  // entryName lowercase

  const t1Sorted = [...t1].sort((a, b) => b.name.length - a.name.length)

  for (const c of t1Sorted) {
    const cn = normName(c.name)
    const cCity = normCity(c.city || '')
    const cState = (c.state || '').toUpperCase()

    // If state is set, ONLY consider same-state candidates (no cross-state fallback)
    const cands = cState ? idx.filter(s => s.state === cState) : idx

    let best: typeof idx[0] | null = null
    let bestTotal = 0
    let bestName = 0
    let bestCity = false

    for (const s of cands) {
      if (usedName.has(s.name.toLowerCase())) continue
      const ns = nameSim(cn, s.nName)
      if (ns < 0.7) continue
      let cm = false, cb = 0
      if (cCity && s.nCity) {
        if (cCity === s.nCity) { cm = true; cb = 0.3 }
        else if (cCity.includes(s.nCity) || s.nCity.includes(cCity)) { cm = true; cb = 0.15 }
      }
      const total = ns + cb
      if (total > bestTotal) { best = s; bestTotal = total; bestName = ns; bestCity = cm }
    }

    if (best && bestTotal >= 0.85) {
      usedName.add(best.name.toLowerCase())
      matched.push({
        churchId: c.id, churchName: c.name, churchCity: c.city || '', churchState: c.state || '',
        entryName: best.name, entryCity: best.city || '', entryState: best.state,
        nameScore: Math.round(bestName * 100) / 100, cityMatch: bestCity,
        total: Math.round(bestTotal * 100) / 100,
      })
    } else {
      unmatched.push({ id: c.id, name: c.name, city: c.city || '', state: c.state || '', bestName: best?.name, bestTotal: best ? Math.round(bestTotal * 100) / 100 : 0 })
    }
  }

  console.log(`✓ Matched: ${matched.length}`)
  console.log(`✗ Unmatched: ${unmatched.length}\n`)

  console.log('--- LOW-CONFIDENCE / NO-CITY MATCHES ---')
  for (const m of matched.filter(m => m.total < 1.0 || !m.cityMatch).sort((a, b) => a.total - b.total).slice(0, 30)) {
    const flag = !m.cityMatch ? '⚠ no-city' : ''
    console.log(`  [${m.total}] ${flag} #${m.churchId} ${m.churchState} "${m.churchName}" (${m.churchCity}) → "${m.entryName}" (${m.entryCity}, ${m.entryState})`)
  }

  console.log('\n--- UNMATCHED (first 30) ---')
  for (const u of unmatched.sort((a, b) => (a.state || '').localeCompare(b.state || '')).slice(0, 30)) {
    console.log(`  #${u.id} ${u.state} "${u.name}" (${u.city}) — best: "${u.bestName || '(none)'}" score=${u.bestTotal}`)
  }
  console.log(`...and ${Math.max(0, unmatched.length - 30)} more`)

  fs.writeFileSync('data/research-queue/urc_match_plan.json', JSON.stringify({ matched, unmatched }, null, 2))
  console.log(`\nSaved → data/research-queue/urc_match_plan.json`)
  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
