import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const prisma = new PrismaClient()

type Store = { id: number; slug: string; link: string; title: string }

function normName(s: string): string {
  return s
    .toLowerCase()
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
    .replace(/[^a-z0-9]+/g, '')
    .trim()
}

function normCity(s: string): string {
  return (s || '').toLowerCase().replace(/[^a-z0-9]/g, '')
}

function score(a: string, b: string): number {
  if (!a || !b) return 0
  if (a === b) return 1.0
  if (a.includes(b) || b.includes(a)) return 0.7 + 0.2 * Math.min(a.length, b.length) / Math.max(a.length, b.length)
  return 0
}

async function main() {
  const stores: Store[] = JSON.parse(fs.readFileSync('data/research-queue/arp_slug_index.json', 'utf-8'))
  console.log(`Index: ${stores.length} ARP stores`)

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
  console.log(`DB ARP total: ${all.length}, T1 to research: ${t1.length}\n`)

  // Index stores by normalized name
  const idx = stores.map(s => ({ ...s, norm: normName(s.title), normSlug: normName(s.slug) }))

  type Match = { churchId: number; churchName: string; churchCity: string; state: string; slug: string; storeId: number; storeTitle: string; link: string; score: number }
  const matched: Match[] = []
  const unmatched: { id: number; name: string; city: string; state: string; bestSlug?: string; bestScore?: number }[] = []

  for (const c of t1) {
    const cn = normName(c.name)
    let best: typeof idx[0] | null = null
    let bestScore = 0
    for (const s of idx) {
      let sc = Math.max(score(cn, s.norm), score(cn, s.normSlug))
      if (sc > bestScore) { bestScore = sc; best = s }
    }
    if (best && bestScore >= 0.85) {
      matched.push({
        churchId: c.id,
        churchName: c.name,
        churchCity: c.city || '',
        state: c.state || '',
        slug: best.slug,
        storeId: best.id,
        storeTitle: best.title,
        link: best.link,
        score: Math.round(bestScore * 100) / 100,
      })
    } else {
      unmatched.push({
        id: c.id, name: c.name, city: c.city || '', state: c.state || '',
        bestSlug: best?.slug, bestScore: best ? Math.round(bestScore * 100) / 100 : 0,
      })
    }
  }

  // Detect collisions: multiple churches mapped to same slug
  const slugCount = new Map<string, Match[]>()
  for (const m of matched) {
    if (!slugCount.has(m.slug)) slugCount.set(m.slug, [])
    slugCount.get(m.slug)!.push(m)
  }
  const collisions = [...slugCount.entries()].filter(([_, ms]) => ms.length > 1)

  console.log(`✓ Matched: ${matched.length}`)
  console.log(`✗ Unmatched: ${unmatched.length}`)
  console.log(`⚠ Slug collisions: ${collisions.length}\n`)

  if (collisions.length) {
    console.log('--- COLLISIONS (need manual resolution) ---')
    for (const [slug, ms] of collisions) {
      console.log(`  slug=${slug}: ${ms.map(m => `#${m.churchId} ${m.state} "${m.churchName}" (${m.churchCity})`).join(' | ')}`)
    }
    console.log()
  }

  console.log('--- UNMATCHED (sample first 20) ---')
  for (const u of unmatched.slice(0, 20)) {
    console.log(`  #${u.id} ${u.state} "${u.name}" (${u.city}) — best: ${u.bestSlug || '(none)'} score=${u.bestScore}`)
  }

  fs.writeFileSync('data/research-queue/arp_match_plan.json', JSON.stringify({ matched, unmatched, collisions: collisions.map(([slug, ms]) => ({ slug, members: ms })) }, null, 2))
  console.log(`\nSaved → data/research-queue/arp_match_plan.json`)

  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
