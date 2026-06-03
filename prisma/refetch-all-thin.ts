// Re-fetch about-pages for churches where original fetch got too little content
// (thin = under 4KB cleaned text, often caused by www-vs-non-www hostname mismatch
// rejecting all internal links)
import * as fs from 'fs'
import * as path from 'path'

type Church = { id: number; name: string; denom: string; city: string; state: string; website: string | null; hasWebsite: boolean }

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'
const LINK_KEYWORDS = /(?:about|who[\s\-]we[\s\-]are|our[\s\-]church|history|beliefs?|doctrine|what[\s\-]we[\s\-]believe|confessions?|leadership|staff|team|elders?|pastors?|ministers?|sanctity[\s\-]of[\s\-]life|pro[\s\-]life|abortion|israel|zionism|sermons?)/i

function stripWww(h: string): string { return h.replace(/^www\./i, '') }

function normUrl(href: string, base: URL): string | null {
  try {
    const u = new URL(href, base)
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null
    // FIX: compare hosts without www prefix
    if (stripWww(u.hostname) !== stripWww(base.hostname)) return null
    return u.toString().split('#')[0]
  } catch { return null }
}

async function fetchUrl(url: string, timeoutMs = 25000): Promise<{ status: number; html: string } | null> {
  try {
    const ctl = new AbortController()
    const t = setTimeout(() => ctl.abort(), timeoutMs)
    const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: ctl.signal, redirect: 'follow' })
    clearTimeout(t)
    const ct = res.headers.get('content-type') || ''
    if (!ct.includes('text/html')) return { status: res.status, html: '' }
    const html = await res.text()
    return { status: res.status, html }
  } catch { return null }
}

function discoverLinks(homeHtml: string, baseUrl: URL): string[] {
  const found = new Set<string>()
  for (const m of homeHtml.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const href = m[1]
    const linkText = m[2].replace(/<[^>]+>/g, ' ').trim()
    if (!LINK_KEYWORDS.test(linkText) && !LINK_KEYWORDS.test(href)) continue
    const url = normUrl(href, baseUrl)
    if (url) found.add(url)
  }
  return [...found]
}

async function processChurch(c: Church): Promise<{ id: number; status: string; pages: number }> {
  if (!c.website) return { id: c.id, status: 'no-website', pages: 0 }

  let baseUrl: URL
  try { baseUrl = new URL(c.website) }
  catch { return { id: c.id, status: 'bad-url', pages: 0 } }

  const home = await fetchUrl(baseUrl.toString())
  if (!home) return { id: c.id, status: 'fetch-fail', pages: 0 }
  if (home.status >= 400 || !home.html) return { id: c.id, status: `http-${home.status}`, pages: 0 }

  const combined: string[] = []
  combined.push(`=== HOMEPAGE: ${baseUrl} ===\n${home.html}`)
  let pages = 1

  const candidates = discoverLinks(home.html, baseUrl).slice(0, 6)
  for (const url of candidates) {
    const sub = await fetchUrl(url)
    if (sub && sub.html && sub.status < 400) {
      combined.push(`\n\n=== ${url} ===\n${sub.html}`)
      pages++
    }
    if (combined.join('').length > 500000) break
  }

  fs.writeFileSync(`data/research-queue/about-pages/${c.id}.html`, combined.join('\n'))
  return { id: c.id, status: 'ok', pages }
}

async function worker(queue: Church[], results: any[], counter: { n: number; total: number }) {
  while (queue.length) {
    const c = queue.shift()
    if (!c) break
    const r = await processChurch(c)
    results.push(r)
    counter.n++
    if (counter.n % 5 === 0 || r.pages < 2) {
      console.log(`  ${counter.n}/${counter.total} #${c.id} ${r.status} (${r.pages} pages)`)
    }
  }
}

async function main() {
  const list: Church[] = JSON.parse(fs.readFileSync('data/research-queue/enriched_193.json', 'utf-8'))
  const withWeb = list.filter(c => c.hasWebsite && c.website)
  const textDir = 'data/research-queue/about-text'

  // Find "thin" churches: text file under 4KB AND only 1 section in the HTML
  const thin: Church[] = []
  for (const c of withWeb) {
    const textPath = path.join(textDir, `${c.id}.txt`)
    if (!fs.existsSync(textPath)) {
      thin.push(c)
      continue
    }
    const txt = fs.readFileSync(textPath, 'utf-8')
    if (txt.length < 4000) {
      const htmlPath = `data/research-queue/about-pages/${c.id}.html`
      if (fs.existsSync(htmlPath)) {
        const sections = fs.readFileSync(htmlPath, 'utf-8').match(/=== [^\n]+ ===/g) || []
        if (sections.length <= 1) thin.push(c)
      } else {
        thin.push(c)
      }
    }
  }

  console.log(`Re-fetching ${thin.length} thin churches (1-page or missing) with www-fix (concurrency 4)...\n`)

  const queue = [...thin]
  const results: any[] = []
  const counter = { n: 0, total: thin.length }
  const start = Date.now()
  await Promise.all(Array.from({ length: 4 }, () => worker(queue, results, counter)))
  const elapsed = ((Date.now() - start) / 1000).toFixed(1)

  fs.writeFileSync('data/research-queue/refetch_thin_manifest.json', JSON.stringify(results, null, 2))

  const ok = results.filter(r => r.status === 'ok').length
  const multi = results.filter(r => r.status === 'ok' && r.pages > 1).length
  const stats: Record<string, number> = {}
  for (const r of results) stats[r.status] = (stats[r.status] || 0) + 1
  console.log(`\nDone in ${elapsed}s`)
  console.log(`OK: ${ok}/${thin.length} (${multi} got 2+ pages)`)
  console.log('Status breakdown:')
  for (const [k, v] of Object.entries(stats)) console.log(`  ${k.padEnd(15)} ${v}`)
}
main().catch(e => { console.error(e); process.exit(1) })
