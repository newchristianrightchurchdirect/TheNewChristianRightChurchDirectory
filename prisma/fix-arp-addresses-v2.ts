// Second pass: normalize state names, handle edge cases
import * as fs from 'fs'
const f = 'data/research-queue/arp_pages_parsed.json'
const data: any[] = JSON.parse(fs.readFileSync(f, 'utf-8'))

const STATE_MAP: Record<string, string> = {
  'CALIFORNIA': 'CA',
  'NOVA SCOTIA': 'NS',
  'NEW BRUNSWICK': 'NB',
  'ONTARIO': 'ON',
}

let normalized = 0
for (const p of data) {
  const a = p.address
  if (!a) continue
  const st = (a.state || '').toUpperCase().trim()
  if (STATE_MAP[st]) { a.state = STATE_MAP[st]; normalized++ }
  // Hardcoded fix for known-bad entries
  if (p.slug === 'christ-the-king') {
    p.address = { street: '311 W. Main St.', poBox: 'Meets at Chamber & Visitors Center', city: 'Lexington', state: 'SC', zip: '29072', country: 'United States' }
    normalized++
  }
  if (p.slug === 'westminster-presbyterian-church' && p.address?.state === 'ROCK HILL') {
    // Need to look at original to fix; skip detailed for now
    p.address.state = 'SC'
    p.address.city = 'Rock Hill'
    normalized++
  }
}

fs.writeFileSync(f, JSON.stringify(data, null, 2))
console.log(`Normalized ${normalized} state names`)

// Final state breakdown
const byState = new Map<string, number>()
for (const p of data.filter(p => p.ok)) {
  const st = (p.address?.state || '?').toUpperCase()
  byState.set(st, (byState.get(st) || 0) + 1)
}
console.log('\nFinal stores by state:')
for (const [st, n] of [...byState.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${st.padEnd(15)} ${n}`)
}
