import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-guard'

// Finds likely duplicate pairs. 22 duplicates sat in the directory for months before anyone
// noticed, so this exists to surface the next batch before they are published rather than after.
//
// Two match kinds, reported separately because they mean different things:
//
//   name    same state, same city, same normalised name -> almost certainly one congregation.
//   address same state, same city, same street address -> often a SHARED BUILDING rather than a
//           duplicate (a Korean or Hispanic congregation meeting at an established church is
//           common), so these need a human eye, not a merge.
//
// Matching is deliberately strict. A looser version paired "Community Bible Church, Reno" with
// "Fellowship Bible Church, Carson City" because it stripped "community" and "fellowship" as
// noise words, and matched on state alone rather than city.

const normName = (s: string | null) =>
  (s || '')
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\b(the|a|of|at|in|church|churches|congregation|inc)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

// Case and punctuation only. Stripping street types ("road", "north") made distinct
// addresses collide into the same key.
const normAddr = (s: string | null) =>
  (s || '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim()

export async function GET() {
  const denied = await requireAdmin()
  if (denied) return denied

  const rows = await prisma.church.findMany({
    select: { id: true, name: true, city: true, state: true, denomination: true, address: true,
              website: true, approved: true, recordFlag: true, researchStatus: true, sourceUrls: true },
  })

  const byKey = new Map<string, typeof rows>()
  for (const r of rows) {
    const n = normName(r.name)
    if (!n) continue
    const city = (r.city || '').toLowerCase().trim()
    const keys = [`name|${r.state}|${city}|${n}`]
    const a = normAddr(r.address)
    if (a && a.length >= 8) keys.push(`address|${r.state}|${city}|${a}`)
    for (const k of keys) {
      const list = byKey.get(k) || []
      list.push(r)
      byKey.set(k, list)
    }
  }

  const seen = new Set<string>()
  const groups: Array<{ kind: string; rows: typeof rows }> = []
  for (const [key, list] of byKey) {
    if (list.length < 2) continue
    const sig = list.map(r => r.id).sort((a, b) => a - b).join(',')
    if (seen.has(sig)) continue
    seen.add(sig)
    // Pairs already resolved are not news.
    if (list.every(r => /duplicate_of/.test(r.recordFlag || ''))) continue
    groups.push({ kind: key.split('|')[0], rows: list })
  }

  // Name matches first — they are the ones that are almost certainly duplicates.
  groups.sort((a, b) =>
    (a.kind === b.kind ? 0 : a.kind === 'name' ? -1 : 1) ||
    a.rows[0].name.localeCompare(b.rows[0].name))

  return NextResponse.json({
    groups,
    count: groups.length,
    nameMatches: groups.filter(g => g.kind === 'name').length,
    addressMatches: groups.filter(g => g.kind === 'address').length,
  })
}
