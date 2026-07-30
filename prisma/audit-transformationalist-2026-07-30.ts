// Evidence pass over every church currently marked transformationalist.
//
// The audit found only 31 of the 104 defensible: 39 were set by denominational default, 28 of
// 33 CREC rows on blanket "it is CREC" reasoning, and 26 by notable-figure sync alone. This
// fetches each congregation's own site and pulls the passages that would justify — or fail to
// justify — the classification.
//
// It DOES NOT reclassify anything. It gathers quotes for a human decision, because the whole
// problem being fixed is a machine having decided too confidently.
//
//   npx tsx prisma/audit-transformationalist-2026-07-30.ts
import { PrismaClient } from '@prisma/client'
import { writeFileSync } from 'fs'
import { join } from 'path'

const prisma = new PrismaClient()
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'
const PATHS = ['', '/about', '/beliefs', '/what-we-believe', '/statement-of-faith', '/our-beliefs',
               '/vision', '/mission', '/distinctives', '/ministries', '/missions']

// Evidence that the CHURCH AS INSTITUTION claims authority over the civil sphere or acts on it.
// Weighted: "corporate" phrases are the actual test, "doctrine" only supports it.
const PATTERNS: Array<{ re: RegExp; kind: 'corporate' | 'doctrine'; tag: string }> = [
  { re: /every square inch|all of life|crown rights|lordship of christ over/i, kind: 'doctrine', tag: 'lordship-over-all' },
  { re: /kuyper|cultural mandate|dominion/i, kind: 'doctrine', tag: 'kuyperian' },
  { re: /postmillennial|post-millennial|victory of the gospel in history/i, kind: 'doctrine', tag: 'postmill' },
  { re: /theonom|general equity|god'?s law.{0,30}(civil|magistrate|nation)/i, kind: 'doctrine', tag: 'theonomy' },
  { re: /christian nationalis|christendom|christian nation/i, kind: 'doctrine', tag: 'christian-nationalism' },
  { re: /abolition of abortion|abolitionist|abolish (human )?abortion|end abortion|equal protection.{0,40}(preborn|unborn)/i, kind: 'corporate', tag: 'abolition' },
  { re: /abortion mill|sidewalk (counsel|ministry)|pregnancy (center|resource|clinic)|crisis pregnancy|sanctity of (human )?life ministry|pro-?life ministry/i, kind: 'corporate', tag: 'abortion-ministry' },
  { re: /abortion is (murder|homicide|the shedding)|preborn (image bearers|neighbou?rs)/i, kind: 'corporate', tag: 'abortion-language' },
  { re: /(school|academy|classical education|homeschool co-?op) (of|at) (our|this) church|church-?run (school|academy)/i, kind: 'corporate', tag: 'church-school' },
  { re: /as a church,? we (stand|oppose|affirm|call|declare)|this church (stands|opposes|declares)/i, kind: 'corporate', tag: 'church-declares' },
  { re: /(elders|session|consistory) (have )?(signed|issued|published).{0,40}(statement|letter|declaration)/i, kind: 'corporate', tag: 'elders-statement' },
  { re: /transform (the )?(culture|society|city|nation)|reform(ing)? (the )?(culture|society|nation)/i, kind: 'doctrine', tag: 'transform-culture' },
  { re: /political|civil government|magistrate|public square|legislat/i, kind: 'doctrine', tag: 'mentions-civil' },
  // Counter-evidence: an explicit limitation of the institutional church's mission.
  { re: /(church|we) (do(es)? not|will not) (take|engage in|involve).{0,40}(politic|partisan|social caus)/i, kind: 'corporate', tag: 'DISCLAIMS-POLITICS' },
  { re: /spirituality of the church|two kingdoms|not the church'?s (role|mission|business)/i, kind: 'doctrine', tag: 'DISCLAIMS-two-kingdoms' },
]

const fetchText = async (url: string, ms = 12000): Promise<string | null> => {
  try {
    const ctl = new AbortController()
    const t = setTimeout(() => ctl.abort(), ms)
    const r = await fetch(url, { headers: { 'User-Agent': UA }, signal: ctl.signal, redirect: 'follow' })
    clearTimeout(t)
    if (!r.ok) return null
    const ct = r.headers.get('content-type') || ''
    if (!/text|html/i.test(ct)) return null
    const html = (await r.text()).slice(0, 500000)
    return html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
  } catch { return null }
}

async function main() {
  const churches = await prisma.church.findMany({
    where: { approved: true, culturalEngagement: 'transformationalist' },
    select: { id: true, name: true, city: true, state: true, denomination: true, website: true,
              stanceBasis: true, sourceUrls: true, researchNote: true },
    orderBy: { id: 'asc' },
  })
  console.log(`auditing ${churches.length} transformationalist churches\n`)

  const results: any[] = []
  let i = 0
  for (const c of churches) {
    i++
    const site = (c.website || '').replace(/\/+$/, '')
    if (!site.startsWith('http')) {
      results.push({ ...c, verdict: 'NO WEBSITE', hits: [], quotes: [] })
      console.log(`[${i}/${churches.length}] #${c.id} ${c.name} — no website`)
      continue
    }

    const hits = new Map<string, { kind: string; quote: string }>()
    let pagesRead = 0
    let bytesRead = 0
    for (const p of PATHS) {
      const text = await fetchText(site + p)
      if (!text) continue
      // Track that we genuinely read something. Without this, "found nothing" and
      // "was blocked" produce the same verdict, which is how v1 wrote off Apologia Church.
      pagesRead++
      bytesRead += text.length
      for (const pat of PATTERNS) {
        if (hits.has(pat.tag)) continue
        const m = text.match(pat.re)
        if (!m) continue
        const idx = Math.max(0, (m.index ?? 0) - 110)
        hits.set(pat.tag, { kind: pat.kind, quote: text.slice(idx, idx + 300).trim() })
      }
      // Enough signal from this site; stop hammering it.
      if ([...hits.values()].filter(h => h.kind === 'corporate').length >= 2) break
    }

    const corporate = [...hits.entries()].filter(([t, h]) => h.kind === 'corporate' && !t.startsWith('DISCLAIMS'))
    const disclaims = [...hits.keys()].filter(t => t.startsWith('DISCLAIMS'))
    const doctrine = [...hits.entries()].filter(([t, h]) => h.kind === 'doctrine' && !t.startsWith('DISCLAIMS'))

    // The read threshold governs only NEGATIVE verdicts. Evidence we actually found stands on
    // its own — Apologia Church matched on abolition off a single page and v2 still filed it as
    // unreadable, which is the absence-of-evidence rule overriding evidence.
    const readEnough = pagesRead >= 2 && bytesRead >= 4000
    const verdict =
      corporate.length >= 1 ? 'SUPPORTED — corporate action found'
      : !readEnough ? 'UNREADABLE — site blocked or JS-only, needs manual check'
      : disclaims.length ? 'LIKELY NOT — disclaims political engagement'
      : doctrine.length >= 3 ? 'PARTIAL — doctrine only, no corporate action'
      : hits.size === 0 ? 'NO EVIDENCE ON SITE'
      : 'WEAK — little on site'

    results.push({
      id: c.id, name: c.name, city: c.city, state: c.state, denomination: c.denomination,
      website: site, stanceBasis: c.stanceBasis, researchNote: c.researchNote,
      pagesRead, bytesRead, verdict,
      corporate: corporate.map(([t]) => t),
      doctrine: doctrine.map(([t]) => t),
      disclaims,
      quotes: Object.fromEntries([...hits.entries()].map(([t, h]) => [t, h.quote])),
    })
    console.log(`[${i}/${churches.length}] #${c.id} ${c.name} — ${verdict}${corporate.length ? ' [' + corporate.map(([t]) => t).join(',') + ']' : ''}`)
  }

  const out = join(process.cwd(), 'data', 'transformationalist-audit-2026-07-30.json')
  writeFileSync(out, JSON.stringify(results, null, 1), 'utf8')

  const tally: Record<string, number> = {}
  results.forEach(r => { tally[r.verdict] = (tally[r.verdict] || 0) + 1 })
  console.log('\n=== TALLY ===')
  Object.entries(tally).sort((a, b) => b[1] - a[1]).forEach(([v, n]) => console.log(`  ${String(n).padStart(4)}  ${v}`))
  console.log(`\nwritten: ${out}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
