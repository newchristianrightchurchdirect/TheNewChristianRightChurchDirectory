// Parse all URC churches from the single find-a-church page mapList[] inline data
import * as fs from 'fs'

type Parsed = {
  name: string
  lat?: string; lng?: string
  street?: string; city?: string; state?: string; zip?: string; country?: string
  phone?: string; email?: string; website?: string; minister?: string
  ok: boolean
}

function decodeHtmlEntities(s: string): string {
  return s.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
          .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
}

function parseEntry(block: string): Parsed {
  const out: Parsed = { name: '', ok: false }
  const grab = (key: string): string | undefined => {
    const m = block.match(new RegExp(`${key}\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 'i'))
    if (!m) return undefined
    return decodeHtmlEntities(m[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\')).trim()
  }
  out.name = grab('name') || ''
  out.lat = grab('lat')
  out.lng = grab('lng')
  out.phone = grab('phone')
  out.email = grab('email')
  out.website = grab('website')
  out.minister = grab('minister')
  // readableAddress is "STREET<br />CITY&nbsp;ST&nbsp;ZIP<br />COUNTRY" (US)
  // or "STREET<br />CITY&nbsp;PROV&nbsp;A1A 1A1<br />Canada"
  const ra = grab('readableAddress')
  if (ra) {
    const lines = ra.split(/<br\s*\/?\s*>/i).map(s => s.replace(/&nbsp;/g, ' ').trim()).filter(Boolean)
    if (lines.length >= 2) {
      out.street = lines[0]
      out.country = lines.length >= 3 ? lines[lines.length - 1] : 'United States'
      const cityLine = lines[1]
      // US: "City ST ZIP" (ZIP=5 digits, maybe -4); Canada: "City PROV A1A 1A1"
      const usM = cityLine.match(/^(.+?)\s+([A-Z]{2})\s+(\d{5}(?:-\d{4})?)$/)
      const caM = cityLine.match(/^(.+?)\s+([A-Z]{2})\s+([A-Z]\d[A-Z]\s*\d[A-Z]\d)$/)
      if (usM) {
        out.city = usM[1].trim(); out.state = usM[2]; out.zip = usM[3]
      } else if (caM) {
        out.city = caM[1].trim(); out.state = caM[2]; out.zip = caM[3]
      } else {
        // Maybe no zip, or trailing punctuation. Try city+state
        const m2 = cityLine.match(/^(.+?)\s+([A-Z]{2})\s*$/)
        if (m2) { out.city = m2[1].trim(); out.state = m2[2] }
        else out.city = cityLine
      }
    }
  }
  // Sentinel "." entry is the test/stat row — skip
  if (out.name === '.' || !out.name) return out
  out.ok = !!(out.street || out.phone || out.email || out.minister)
  return out
}

async function main() {
  const html = fs.readFileSync('data/research-queue/urcna_find.html', 'utf-8')
  // Each entry: mapList.push({ ... });
  const blocks = [...html.matchAll(/mapList\.push\(\s*\{([\s\S]*?)\}\s*\)\s*;/g)].map(m => m[1])
  console.log(`Found ${blocks.length} mapList entries`)

  const parsed: Parsed[] = []
  for (const b of blocks) {
    const p = parseEntry(b)
    if (p.name && p.name !== '.') parsed.push(p)
  }

  fs.writeFileSync('data/research-queue/urc_pages_parsed.json', JSON.stringify(parsed, null, 2))

  const stats = {
    total: parsed.length,
    ok: parsed.filter(p => p.ok).length,
    name: parsed.filter(p => p.name).length,
    street: parsed.filter(p => p.street).length,
    cityState: parsed.filter(p => p.city && p.state).length,
    phone: parsed.filter(p => p.phone).length,
    email: parsed.filter(p => p.email).length,
    website: parsed.filter(p => p.website).length,
    minister: parsed.filter(p => p.minister).length,
  }
  console.log('\nStats:')
  for (const [k, v] of Object.entries(stats)) console.log(`  ${k.padEnd(10)} ${v}`)

  // State breakdown
  const byState = new Map<string, number>()
  for (const p of parsed) {
    const st = (p.state || '?').toUpperCase()
    byState.set(st, (byState.get(st) || 0) + 1)
  }
  console.log('\nBy state:')
  for (const [st, n] of [...byState.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${st.padEnd(4)} ${n}`)
  }
}
main().catch(e => { console.error(e); process.exit(1) })
