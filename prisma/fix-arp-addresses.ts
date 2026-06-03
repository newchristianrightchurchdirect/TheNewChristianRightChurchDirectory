// Repair shift-by-one addresses where PO Box was in spans[1]
import * as fs from 'fs'

const f = 'data/research-queue/arp_pages_parsed.json'
const data: any[] = JSON.parse(fs.readFileSync(f, 'utf-8'))

let fixed = 0
for (const p of data) {
  const a = p.address
  if (!a) continue
  // Heuristic: if "state" field is mixed-case length>2 AND "zip" is 2 upper chars
  const looksLikeShiftBy1 =
    a.state &&
    /^[A-Z][a-z]/.test(a.state) &&
    a.state.length > 2 &&
    a.zip &&
    /^[A-Z]{2}$/.test(a.zip)
  if (looksLikeShiftBy1) {
    p.address = {
      street: a.street,
      poBox: a.city,
      city: a.state,
      state: a.zip,
      zip: a.country || '',
      country: 'United States',
    }
    fixed++
  }
}

fs.writeFileSync(f, JSON.stringify(data, null, 2))
console.log(`Fixed ${fixed} shift-by-1 addresses`)

// Also report state coverage after fix
const ok = data.filter(p => p.ok)
const byState = new Map<string, number>()
for (const p of ok) {
  const st = (p.address?.state || '?').toUpperCase()
  byState.set(st, (byState.get(st) || 0) + 1)
}
console.log('\nStores by state (after fix):')
for (const [st, n] of [...byState.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${st.padEnd(4)} ${n}`)
}
