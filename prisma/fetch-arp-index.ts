// Fetch all 3 pages of ARP REST API → save slug index
import * as fs from 'fs'

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

type Store = {
  id: number
  slug: string
  link: string
  title: string
}

function decodeEntities(s: string): string {
  return s.replace(/&amp;/g, '&').replace(/&#8217;/g, '\u2019').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
}

async function main() {
  const all: Store[] = []
  for (let page = 1; page <= 3; page++) {
    const url = `https://arpchurch.org/wp-json/wp/v2/wpsl_stores?per_page=100&page=${page}`
    const r = await fetch(url, { headers: { 'user-agent': UA, accept: 'application/json' } })
    if (!r.ok) { console.error(`page ${page}: HTTP ${r.status}`); continue }
    const arr: any[] = await r.json()
    for (const s of arr) {
      all.push({
        id: s.id,
        slug: s.slug,
        link: s.link,
        title: decodeEntities(s.title?.rendered || ''),
      })
    }
    console.log(`page ${page}: +${arr.length} (running total: ${all.length})`)
  }
  fs.writeFileSync('data/research-queue/arp_slug_index.json', JSON.stringify(all, null, 2))
  console.log(`\nSaved ${all.length} ARP stores → data/research-queue/arp_slug_index.json`)
}
main().catch(e => { console.error(e); process.exit(1) })
