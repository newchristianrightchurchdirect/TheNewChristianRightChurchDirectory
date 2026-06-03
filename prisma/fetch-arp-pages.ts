// Fetch all 269 ARP store pages, parse wpsl-location-address + contact details
// Includes Cloudflare email decoder
import * as fs from 'fs'

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

type Store = { id: number; slug: string; link: string; title: string }

type Parsed = {
  storeId: number
  slug: string
  link: string
  title: string
  ok: boolean
  status?: number
  storeName?: string
  address?: { street?: string; city?: string; state?: string; zip?: string; country?: string }
  phone?: string
  pastor?: string // stored in "Fax" field (lol)
  email?: string
  website?: string
}

function decodeHtml(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8217;/g, '\u2019')
    .replace(/&#160;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
}

function decodeCfEmail(hex: string): string {
  // Cloudflare email obfuscation: first byte is XOR key, remaining bytes are XOR'd
  try {
    const r = parseInt(hex.slice(0, 2), 16)
    let out = ''
    for (let i = 2; i < hex.length; i += 2) {
      out += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16) ^ r)
    }
    return out
  } catch { return '' }
}

function parsePage(html: string, store: Store): Parsed {
  const out: Parsed = { storeId: store.id, slug: store.slug, link: store.link, title: store.title, ok: true }

  // Store name
  const nameM = html.match(/<div class="wpsl-locations-details">\s*<span><strong>([^<]+)<\/strong>/)
  if (nameM) out.storeName = decodeHtml(nameM[1].trim())

  // Address: <span>STREET</span><br/><span>CITY </span><span>STATE </span><span>ZIP </span><br /><span>COUNTRY</span>
  const addrM = html.match(/<div class="wpsl-location-address">([\s\S]*?)<\/div>/)
  if (addrM) {
    const block = addrM[1]
    const spans = [...block.matchAll(/<span>([^<]*)<\/span>/g)].map(m => decodeHtml(m[1].trim()))
    // Spans typically: [street, city, state, zip, country]
    if (spans.length >= 4) {
      out.address = { street: spans[0], city: spans[1], state: spans[2], zip: spans[3], country: spans[4] || '' }
    } else if (spans.length) {
      out.address = { street: spans[0], city: spans[1], state: spans[2], zip: spans[3] }
    }
  }

  // Contact: Phone / Fax (pastor) / Email / Url
  const contactM = html.match(/<div class="wpsl-contact-details">([\s\S]*?)<\/div>/)
  if (contactM) {
    const block = contactM[1]
    const phoneM = block.match(/Phone:\s*<span><a href="tel:[^"]*">([^<]+)<\/a>/)
    if (phoneM) out.phone = decodeHtml(phoneM[1].trim())
    // The "Fax:" field is being used to store pastor name in many cases
    const faxM = block.match(/Fax:\s*<span><a href="tel:([^"]*)">([^<]+)<\/a>/)
    if (faxM) {
      const candidate = decodeHtml(faxM[2].trim())
      // Only treat as pastor if it looks like a name (not a phone number)
      if (!/^[\d\-().+\s]+$/.test(candidate) && candidate.length > 0) {
        out.pastor = candidate
      }
    }
    // Email — could be plain or cf-protected
    const cfEmailM = block.match(/class="__cf_email__"\s+data-cfemail="([a-f0-9]+)"/)
    if (cfEmailM) {
      out.email = decodeCfEmail(cfEmailM[1])
    } else {
      const emailM = block.match(/Email:\s*<span><a href="mailto:([^"]+)"/)
      if (emailM) out.email = decodeHtml(emailM[1])
    }
    const urlM = block.match(/Url:\s*<a[^>]+href="([^"]+)"/)
    if (urlM) out.website = urlM[1]
  }

  return out
}

async function fetchOne(s: Store): Promise<Parsed> {
  try {
    const r = await fetch(s.link, { headers: { 'user-agent': UA } })
    if (!r.ok) {
      return { storeId: s.id, slug: s.slug, link: s.link, title: s.title, ok: false, status: r.status }
    }
    const html = await r.text()
    return { ...parsePage(html, s), status: 200 }
  } catch (e: any) {
    return { storeId: s.id, slug: s.slug, link: s.link, title: s.title, ok: false, status: -1 }
  }
}

async function withConcurrency<T, R>(items: T[], n: number, fn: (item: T) => Promise<R>, onProgress?: (done: number, total: number) => void): Promise<R[]> {
  const out: R[] = new Array(items.length)
  let i = 0, done = 0
  async function worker() {
    while (i < items.length) {
      const idx = i++
      out[idx] = await fn(items[idx])
      done++
      if (onProgress && done % 25 === 0) onProgress(done, items.length)
    }
  }
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, () => worker()))
  return out
}

async function main() {
  const stores: Store[] = JSON.parse(fs.readFileSync('data/research-queue/arp_slug_index.json', 'utf-8'))
  console.log(`Fetching ${stores.length} ARP store pages (concurrency 8)...`)

  const t0 = Date.now()
  const parsed = await withConcurrency(stores, 8, fetchOne, (d, t) => console.log(`  ${d}/${t}`))
  const elapsed = ((Date.now() - t0) / 1000).toFixed(1)
  console.log(`Done in ${elapsed}s\n`)

  const ok = parsed.filter(p => p.ok)
  const fail = parsed.filter(p => !p.ok)
  console.log(`✓ Success: ${ok.length}`)
  console.log(`✗ Failed: ${fail.length}`)
  for (const f of fail.slice(0, 5)) console.log(`  ${f.slug} → HTTP ${f.status}`)

  console.log(`\nField coverage on ${ok.length} OK pages:`)
  console.log(`  storeName: ${ok.filter(p => p.storeName).length}`)
  console.log(`  street:    ${ok.filter(p => p.address?.street).length}`)
  console.log(`  state:     ${ok.filter(p => p.address?.state).length}`)
  console.log(`  phone:     ${ok.filter(p => p.phone).length}`)
  console.log(`  pastor:    ${ok.filter(p => p.pastor).length}`)
  console.log(`  email:     ${ok.filter(p => p.email).length}`)
  console.log(`  website:   ${ok.filter(p => p.website).length}`)

  fs.writeFileSync('data/research-queue/arp_pages_parsed.json', JSON.stringify(parsed, null, 2))
  console.log(`\nSaved → data/research-queue/arp_pages_parsed.json`)

  console.log('\n--- SAMPLE (first 3) ---')
  for (const p of ok.slice(0, 3)) {
    console.log(`\n[${p.slug}] ${p.storeName || p.title}`)
    console.log(`  address: ${p.address?.street || ''}, ${p.address?.city || ''} ${p.address?.state || ''} ${p.address?.zip || ''}`)
    console.log(`  pastor: ${p.pastor || '(none)'}`)
    console.log(`  phone: ${p.phone || '(none)'}`)
    console.log(`  email: ${p.email || '(none)'}`)
    console.log(`  web: ${p.website || '(none)'}`)
  }
}
main().catch(e => { console.error(e); process.exit(1) })
