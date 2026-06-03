// V2 matcher: uses state + city from parsed pages to disambiguate ARP collisions
import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const prisma = new PrismaClient()

type Parsed = {
  storeId: number; slug: string; link: string; title: string; ok: boolean
  storeName?: string
  address?: { street?: string; city?: string; state?: string; zip?: string }
  phone?: string; pastor?: string; email?: string; website?: string
}

function normName(s: string): string {
  return s.toLowerCase()
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\bassociate reformed presbyterian church\b/g, ' ')
    .replace(/\bassociate reformed presbyterian\b/g, ' ')
    .replace(/\barp church\b/g, ' ')
    .replace(/\barpc\b/g, ' ')
    .replace(/\barp\b/g, ' ')
    .replace(/\breformed presbyterian church\b/g, ' ')
    .replace(/\bpresbyterian church\b/g, ' ')
    .replace(/\bpresbyterian\b/g, ' ')
    .replace(/\bchurch\b/g, ' ')
    .replace(/\bof\b/g, ' ')
    .replace(/\bthe\b/g, ' ')
    .replace(/\bcommunity\b/g, ' ')
    .replace(/\bcongregation\b/g, ' ')
    .replace(/[^a-z0-9]+/g, '')
    .trim()
}

function normCity(s: string): string {
  return (s || '').toLowerCase().replace(/[^a-z0-9]/g, '')
}

function nameSim(a: string, b: string): number {
  if (!a || !b) return 0
  if (a === b) return 1.0
  if (a.includes(b) || b.includes(a)) return 0.7 + 0.2 * Math.min(a.length, b.length) / Math.max(a.length, b.length)
  return 0
}

async function main() {
  const parsed: Parsed[] = JSON.parse(fs.readFileSync('data/research-queue/arp_pages_parsed.json', 'utf-8'))
  // Build candidates with normalized fields
  const idx = parsed.filter(p => p.ok).map(p => ({
    ...p,
    nName: normName(p.storeName || p.title),
    nCity: normCity(p.address?.city || ''),
    state: (p.address?.state || '').toUpperCase(),
  }))

  const T1_MARKERS = ['Westminster Standards', 'Three Forms of Unity', '1689 London Baptist Confession']
  const all = await prisma.church.findMany({
    where: { denomination: 'ARP', approved: true },
    select: { id: true, name: true, city: true, state: true, theologicalNotes: true },
  })
  const t1 = all.filter(c => {
    const n = (c.theologicalNotes || '').trim()
    if (!n) return true
    if (n.length > 250) return false
    if (/pastor|elder|vacant/i.test(n)) return false
    return T1_MARKERS.some(m => n.startsWith(m))
  })
  console.log(`DB ARP T1: ${t1.length}`)
  console.log(`Index: ${idx.length} parsed stores\n`)

  type Match = { churchId: number; churchName: string; churchCity: string; churchState: string; storeSlug: string; storeName: string; storeCity: string; storeState: string; nameScore: number; cityMatch: boolean; total: number }
  const matched: Match[] = []
  const unmatched: any[] = []
  const usedSlug = new Map<string, number>()  // slug → churchId (first claim wins)

  // Sort T1 to give better-named entries first claim (longer names = more specific)
  const t1Sorted = [...t1].sort((a, b) => b.name.length - a.name.length)

  for (const c of t1Sorted) {
    const cn = normName(c.name)
    const cCity = normCity(c.city || '')
    const cState = (c.state || '').toUpperCase()

    // Only consider candidates in same state if state is set
    const stateCandidates = cState ? idx.filter(s => s.state === cState) : idx
    const candidates = stateCandidates.length ? stateCandidates : idx

    let best: typeof idx[0] | null = null
    let bestTotal = 0
    let bestNameScore = 0
    let bestCityMatch = false

    for (const s of candidates) {
      if (usedSlug.has(s.slug)) continue  // already claimed
      const ns = Math.max(nameSim(cn, s.nName), nameSim(cn, normName(s.slug)))
      if (ns < 0.7) continue
      let cityMatch = false
      let cityBoost = 0
      if (cCity && s.nCity) {
        if (cCity === s.nCity) { cityMatch = true; cityBoost = 0.3 }
        else if (cCity.includes(s.nCity) || s.nCity.includes(cCity)) { cityMatch = true; cityBoost = 0.15 }
      }
      const total = ns + cityBoost
      if (total > bestTotal) {
        best = s; bestTotal = total; bestNameScore = ns; bestCityMatch = cityMatch
      }
    }

    if (best && bestTotal >= 0.85) {
      usedSlug.set(best.slug, c.id)
      matched.push({
        churchId: c.id,
        churchName: c.name,
        churchCity: c.city || '',
        churchState: c.state || '',
        storeSlug: best.slug,
        storeName: best.storeName || best.title,
        storeCity: best.address?.city || '',
        storeState: best.state,
        nameScore: Math.round(bestNameScore * 100) / 100,
        cityMatch: bestCityMatch,
        total: Math.round(bestTotal * 100) / 100,
      })
    } else {
      unmatched.push({
        id: c.id, name: c.name, city: c.city || '', state: c.state || '',
        bestSlug: best?.slug, bestTotal: best ? Math.round(bestTotal * 100) / 100 : 0,
      })
    }
  }

  console.log(`✓ Matched: ${matched.length}`)
  console.log(`✗ Unmatched: ${unmatched.length}\n`)

  // Show matches grouped by state for review
  console.log('--- MATCHED (showing low-confidence and no-city-match) ---')
  for (const m of matched.filter(m => m.total < 1.0 || !m.cityMatch).sort((a, b) => a.total - b.total)) {
    const flag = !m.cityMatch ? '⚠ no-city' : ''
    console.log(`  [${m.total}] ${flag} #${m.churchId} ${m.churchState} "${m.churchName}" (${m.churchCity}) → ${m.storeSlug} "${m.storeName}" (${m.storeCity}, ${m.storeState})`)
  }

  console.log('\n--- UNMATCHED ---')
  for (const u of unmatched.sort((a, b) => (a.state || '').localeCompare(b.state || ''))) {
    console.log(`  #${u.id} ${u.state} "${u.name}" (${u.city}) — best: ${u.bestSlug || '(none)'} score=${u.bestTotal}`)
  }

  fs.writeFileSync('data/research-queue/arp_match_plan.json', JSON.stringify({ matched, unmatched }, null, 2))
  console.log(`\nSaved match plan → data/research-queue/arp_match_plan.json`)

  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
