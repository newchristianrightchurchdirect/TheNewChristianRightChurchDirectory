/**
 * Find duplicate church rows across the whole directory.
 *
 *   node scripts/find-duplicates.mjs            # report
 *   node scripts/find-duplicates.mjs --json out.json
 *
 * REPORTS ONLY. It never writes, because "these two rows look alike" is a lead,
 * not a finding — two real congregations can share a name and a town, and a
 * merged pair cannot be unmerged. Confirming a duplicate means checking that the
 * two rows describe the SAME congregation, then hiding one with approved=false.
 *
 * Four signals, strongest first:
 *
 *   1. same SermonAudio broadcaster id   — a broadcaster is one congregation,
 *                                          so this is near-conclusive
 *   2. same website host                 — strong, but campuses of one church
 *                                          and shared denominational hosts
 *                                          (wordpress.com, sites.google.com)
 *                                          produce false pairs, so those hosts
 *                                          are excluded
 *   3. same normalised name + city       — strong within one town
 *   4. same street address + city        — catches renames; two congregations
 *                                          genuinely sharing a building are the
 *                                          false-positive case here
 */
import { PrismaClient } from '@prisma/client'
import { writeFileSync } from 'node:fs'

const prisma = new PrismaClient()

/** Hosts that many unrelated churches share — a match here means nothing. */
const SHARED_HOSTS = new Set([
  'wordpress.com', 'sites.google.com', 'wixsite.com', 'squarespace.com',
  'facebook.com', 'churchtrac.com', 'clover.com', 'godaddysites.com',
  'weebly.com', 'blogspot.com', 'yolasite.com', 'webs.com', 'tripod.com',
  'sermonaudio.com', 'subsplash.com', 'churchcenter.com', 'breeze.church',
  'instagram.com', 'youtube.com', 'linktr.ee',
])

const STOP = /\b(the|of|a|an|at|in|and|inc|church|churches|chapel|congregation|fellowship|assembly|ministries|ministry)\b/g

const normName = (s) =>
  (s || '').toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(STOP, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const normPlace = (s) =>
  (s || '').toLowerCase().replace(/\b(township|twp|borough|boro|city|town|village)\b/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()

const normAddr = (s) =>
  (s || '').toLowerCase()
    .replace(/\b(street|st|avenue|ave|road|rd|drive|dr|lane|ln|boulevard|blvd|highway|hwy|route|rt|place|pl|court|ct|terrace|ter|pike|turnpike|north|south|east|west|n|s|e|w)\b/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()

const host = (u) => {
  try { return new URL(u).hostname.replace(/^www\./, '').toLowerCase() } catch { return '' }
}

/** SermonAudio broadcaster id, from any URL shape SermonAudio has used.
 *  The path segment must be consumed, not optionally skipped: an earlier version
 *  made it optional and listed only the singular "broadcaster/", so every
 *  .../broadcasters/xyz URL yielded the literal id "broadcasters" and 16
 *  unrelated churches were reported as one duplicate group. */
const broadcaster = (u) => {
  const m = (u || '').match(/sermonaudio\.com\/(?:solo|broadcasters?|source|sa)\/([a-z0-9_-]{2,})/i)
  return m && !/^(sermons?|search|about|node|series|speaker)$/i.test(m[1]) ? m[1].toLowerCase() : ''
}

const churches = await prisma.church.findMany({
  where: { approved: true },
  select: {
    id: true, name: true, city: true, state: true, address: true,
    website: true, denomination: true, leadership: true,
    latitude: true, longitude: true, sourceUrls: true, recordFlag: true,
  },
  orderBy: { id: 'asc' },
})
console.log(`scanning ${churches.length} approved rows\n`)

const groups = new Map()
const add = (key, signal, c) => {
  if (!key) return
  const k = `${signal}::${key}`
  if (!groups.has(k)) groups.set(k, { signal, key, rows: [] })
  groups.get(k).rows.push(c)
}

for (const c of churches) {
  // There is no dedicated SermonAudio column; the URLs sit in website or sourceUrls.
  add(broadcaster(c.website) || broadcaster(c.sourceUrls), 'sermonaudio', c)

  const h = host(c.website)
  if (h && !SHARED_HOSTS.has(h) && ![...SHARED_HOSTS].some((s) => h.endsWith('.' + s))) {
    add(h, 'website', c)
  }

  const n = normName(c.name)
  const p = normPlace(c.city)
  if (n && p) add(`${c.state}|${p}|${n}`, 'name+city', c)

  const a = normAddr(c.address)
  if (a && a.length > 5 && p) add(`${c.state}|${p}|${a}`, 'address', c)
}

const RANK = { sermonaudio: 0, website: 1, 'name+city': 2, address: 3 }
const dupes = [...groups.values()].filter((g) => g.rows.length > 1)

// One pair can trip several signals; report each pair once, under its strongest.
const seenPair = new Set()
const report = []
for (const g of dupes.sort((a, b) => RANK[a.signal] - RANK[b.signal])) {
  const ids = g.rows.map((r) => r.id).sort((a, b) => a - b)
  const pairKey = ids.join(',')
  if (seenPair.has(pairKey)) continue
  seenPair.add(pairKey)
  report.push(g)
}

const byBucket = {}
for (const g of report) (byBucket[g.signal] ||= []).push(g)

for (const signal of ['sermonaudio', 'website', 'name+city', 'address']) {
  const gs = byBucket[signal] || []
  if (!gs.length) continue
  console.log(`\n${'='.repeat(70)}\n${signal.toUpperCase()} — ${gs.length} group(s)\n${'='.repeat(70)}`)
  for (const g of gs) {
    console.log(`\n  [${g.key}]`)
    for (const r of g.rows) {
      const flag = r.recordFlag ? `  {${r.recordFlag}}` : ''
      console.log(`    #${String(r.id).padStart(5)}  ${(r.name || '').slice(0, 44).padEnd(44)} ${(r.city || '').slice(0, 20).padEnd(20)} ${r.state}  ${(r.denomination || '').slice(0, 22).padEnd(22)} ${(r.website || '').slice(0, 40)}${flag}`)
    }
  }
}

const total = report.reduce((n, g) => n + g.rows.length - 1, 0)
console.log(`\n${'='.repeat(70)}`)
console.log(`${report.length} candidate groups; ${total} rows would be hidden if every group is a true duplicate.`)
console.log('Strength: sermonaudio > website > name+city > address. NOTHING WRITTEN — confirm each before hiding.')

const outIdx = process.argv.indexOf('--json')
if (outIdx > -1 && process.argv[outIdx + 1]) {
  writeFileSync(process.argv[outIdx + 1], JSON.stringify(report, null, 1))
  console.log(`wrote ${process.argv[outIdx + 1]}`)
}
await prisma.$disconnect()
