// Fetch homepage + discovered about/beliefs/leadership pages for each enriched church
import * as fs from 'fs'

type Church = { id: number; name: string; denom: string; city: string; state: string; website: string | null; hasWebsite: boolean }

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'

const LINK_KEYWORDS = /(?:about|who[\s\-]we[\s\-]are|our[\s\-]church|history|beliefs?|doctrine|what[\s\-]we[\s\-]believe|confessions?|leadership|staff|team|elders?|pastors?|ministers?|sanctity[\s\-]of[\s\-]life|pro[\s\-]life|abortion|israel|zionism|sermons?)/i

function normUrl(href: string, base: URL): string | null {
  try {
    const u = new URL(href, base)
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null
    if (u.hostname !== base.hostname) return null
    return u.toString().split('#')[0]
  } catch { return null }
}

async function fetchUrl(url: string, timeoutMs = 20000): Promise<{ status: number; html: string } | null> {
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

async function processChurch(c: Church): Promise<{ id: number; status: string; pages: { url: string; bytes: number }[]; error?: string }> {
  const result: { id: number; status: string; pages: { url: string; bytes: number }[]; error?: string } = { id: c.id, status: 'ok', pages: [] }
  if (!c.website) return { ...result, status: 'no-website' }

  let baseUrl: URL
  try { baseUrl = new URL(c.website) }
  catch { return { ...result, status: 'bad-url', error: c.website } }

  const home = await fetchUrl(baseUrl.toString())
  if (!home) return { ...result, status: 'fetch-fail' }
  if (home.status >= 400 || !home.html) return { ...result, status: `http-${home.status}` }

  const combined: string[] = []
  combined.push(`=== HOMEPAGE: ${baseUrl} ===\n${home.html}`)
  result.pages.push({ url: baseUrl.toString(), bytes: home.html.length })

  // Discover links
  const candidates = discoverLinks(home.html, baseUrl).slice(0, 6)
  for (const url of candidates) {
    const sub = await fetchUrl(url)
    if (sub && sub.html && sub.status < 400) {
      combined.push(`\n\n=== ${url} ===\n${sub.html}`)
      result.pages.push({ url, bytes: sub.html.length })
    }
    if (combined.join('').length > 500000) break // cap total
  }

  fs.writeFileSync(`data/research-queue/about-pages/${c.id}.html`, combined.join('\n'))
  return result
}

async function worker(queue: Church[], results: any[], counter: { n: number; total: number }) {
  while (queue.length) {
    const c = queue.shift()
    if (!c) break
    const r = await processChurch(c)
    results.push(r)
    counter.n++
    if (counter.n % 10 === 0) console.log(`  ${counter.n}/${counter.total}`)
  }
}

async function main() {
  const list: Church[] = JSON.parse(fs.readFileSync('data/research-queue/enriched_193.json', 'utf-8'))
  const withWeb = list.filter(c => c.hasWebsite && c.website)
  console.log(`Fetching ${withWeb.length} churches with websites (concurrency 4)...\n`)

  const queue = [...withWeb]
  const results: any[] = []
  const counter = { n: 0, total: withWeb.length }
  const start = Date.now()
  await Promise.all(Array.from({ length: 4 }, () => worker(queue, results, counter)))
  const elapsed = ((Date.now() - start) / 1000).toFixed(1)

  fs.writeFileSync('data/research-queue/fetch_about_manifest.json', JSON.stringify(results, null, 2))

  const ok = results.filter(r => r.status === 'ok').length
  const stats: Record<string, number> = {}
  for (const r of results) stats[r.status] = (stats[r.status] || 0) + 1
  console.log(`\nDone in ${elapsed}s`)
  console.log(`OK (saved): ${ok}/${withWeb.length}`)
  console.log('Status breakdown:')
  for (const [k, v] of Object.entries(stats)) console.log(`  ${k.padEnd(15)} ${v}`)
}
main().catch(e => { console.error(e); process.exit(1) })
