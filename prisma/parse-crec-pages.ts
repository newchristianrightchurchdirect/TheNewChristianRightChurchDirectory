// Parse all CREC churches from the inline /churches/ page
import * as fs from 'fs'

type Parsed = {
  name: string; city?: string; state?: string
  website?: string; pastor?: string; detail?: string
  ok: boolean
}

function decodeHtmlEntities(s: string): string {
  return s.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
          .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
}

async function main() {
  const html = fs.readFileSync('data/research-queue/crec_churches.html', 'utf-8')
  // Each entry is a <div class="church_pod">...</div> wrapping an <a> with city_state, church_name, pastor
  const blocks = [...html.matchAll(/<div class="church_pod">[\s\S]*?<\/a>\s*<\/div>/g)].map(m => m[0])
  console.log(`Found ${blocks.length} church_pod blocks`)

  const parsed: Parsed[] = []
  for (const b of blocks) {
    const out: Parsed = { name: '', ok: false }
    const webM = b.match(/<a href="([^"]+)"[^>]*>/)
    if (webM && !webM[1].startsWith('#')) out.website = decodeHtmlEntities(webM[1]).trim()
    const cityM = b.match(/<div class="city_state">([^<]+)<\/div>/)
    if (cityM) {
      const cs = decodeHtmlEntities(cityM[1]).trim()
      const m = cs.match(/^(.+?),\s*([A-Z]{2})$/)
      if (m) { out.city = m[1].trim(); out.state = m[2] }
      else out.city = cs
    }
    const nameM = b.match(/<div class="church_name">([^<]+)<\/div>/)
    if (nameM) out.name = decodeHtmlEntities(nameM[1]).trim()
    const detailM = b.match(/<div class="church_detail">([^<]+)<\/div>/)
    if (detailM) out.detail = decodeHtmlEntities(detailM[1]).trim()
    const pastorM = b.match(/<div class="pastor"><span>Pastor:\s*([^<]*)<\/span>/)
    if (pastorM) out.pastor = decodeHtmlEntities(pastorM[1]).trim()
    out.ok = !!out.name
    if (out.name) parsed.push(out)
  }

  fs.writeFileSync('data/research-queue/crec_pages_parsed.json', JSON.stringify(parsed, null, 2))
  const stats = {
    total: parsed.length,
    withCity: parsed.filter(p => p.city).length,
    withState: parsed.filter(p => p.state).length,
    withWebsite: parsed.filter(p => p.website).length,
    withPastor: parsed.filter(p => p.pastor && p.pastor !== '').length,
  }
  console.log('\nStats:')
  for (const [k, v] of Object.entries(stats)) console.log(`  ${k.padEnd(12)} ${v}`)
}
main().catch(e => { console.error(e); process.exit(1) })
