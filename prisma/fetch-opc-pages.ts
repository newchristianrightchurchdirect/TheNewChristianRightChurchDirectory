// Fetch each OPC church page, extract structured data
import * as fs from 'fs'

type IndexEntry = { id: number; name: string; city: string; state: string; website?: string }
type Parsed = {
  id: number
  name: string
  city: string
  state: string
  ok: boolean
  title?: string
  mailingAddress?: { street?: string; city?: string; state?: string; zip?: string }
  meetingAt?: string
  pastor?: string
  phone?: string
  email?: string
  presbytery?: string
  website?: string
  error?: string
}

function decodeHtmlEntities(s: string): string {
  return s.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
          .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
}

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function parseChurch(html: string, idx: IndexEntry): Parsed {
  const out: Parsed = { id: idx.id, name: idx.name, city: idx.city, state: idx.state, ok: false }
  try {
    const cardM = html.match(/<table class="churchCard">[\s\S]*?<\/table>/)
    if (!cardM) { out.error = 'no card'; return out }
    const card = cardM[0]

    // Title
    const titleM = card.match(/<h2>([^<]+)<\/h2>/)
    if (titleM) out.title = decodeHtmlEntities(titleM[1]).trim()

    // Mailing address: <h4>Mailing Address</h4><p>STREET<br />CITY, ST ZIP</p>
    const mailM = card.match(/<h4>Mailing Address<\/h4>\s*<p>([^<]+)<br\s*\/?>([^<]+)<\/p>/i)
    if (mailM) {
      const street = decodeHtmlEntities(mailM[1]).trim()
      const csz = decodeHtmlEntities(mailM[2]).trim()
      // "City, ST ZIP"
      const cszM = csz.match(/^(.+?),\s*([A-Z]{2})\s+(\d{5}(?:-\d{4})?)$/)
      if (cszM) {
        out.mailingAddress = { street, city: cszM[1].trim(), state: cszM[2], zip: cszM[3] }
      } else {
        out.mailingAddress = { street, city: csz }
      }
    }

    // Meeting At: optional alt physical location
    const meetM = card.match(/<h4>Meeting At<\/h4>\s*<p>([\s\S]*?)<\/p>/i)
    if (meetM) {
      const txt = stripTags(decodeHtmlEntities(meetM[1]))
      if (txt) out.meetingAt = txt
    }

    // Contact Information block
    const contactM = card.match(/<h4>Contact Information<\/h4>\s*<p>([\s\S]*?)<\/p>/i)
    if (contactM) {
      const block = contactM[1]
      const pastorM = block.match(/Pastor:\s*([^<]+?)(?:<br|$)/i)
      if (pastorM) out.pastor = decodeHtmlEntities(pastorM[1]).trim()
      const phoneM = block.match(/Phone:\s*([^<]+?)(?:<br|$)/i)
      if (phoneM) out.phone = decodeHtmlEntities(phoneM[1]).trim()
      // Email is encoded with &#NN; html entities or in a mailto link
      const emailM = block.match(/Email:\s*<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/i)
      if (emailM) {
        const href = decodeHtmlEntities(emailM[1])
        const txt = decodeHtmlEntities(emailM[2])
        out.email = (href.startsWith('mailto:') ? href.slice(7) : txt).trim()
      }
    }

    // Presbytery
    const presbyM = card.match(/<h4>Presbytery<\/h4>\s*<p>(?:<a[^>]*>)?([^<]+)<\/a>?<\/p>/i)
    if (presbyM) out.presbytery = decodeHtmlEntities(presbyM[1]).trim()

    // Website: <span class="desktop">Website: </span><a ... href="URL">
    const webM = card.match(/Website:\s*<\/span>\s*<a[^>]+href="([^"]+)"/i)
    if (webM) out.website = decodeHtmlEntities(webM[1]).trim()

    out.ok = !!(out.mailingAddress?.street || out.pastor || out.phone || out.email)
    return out
  } catch (e: any) {
    out.error = e.message
    return out
  }
}

async function fetchPage(id: number): Promise<string> {
  const res = await fetch(`https://opc.org/church.html?church_id=${id}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
  })
  return res.text()
}

async function worker(queue: IndexEntry[], results: Parsed[], counter: { n: number; total: number }) {
  while (queue.length) {
    const idx = queue.shift()
    if (!idx) break
    try {
      const html = await fetchPage(idx.id)
      const parsed = parseChurch(html, idx)
      results.push(parsed)
    } catch (e: any) {
      results.push({ id: idx.id, name: idx.name, city: idx.city, state: idx.state, ok: false, error: e.message })
    }
    counter.n++
    if (counter.n % 25 === 0) console.log(`  ${counter.n}/${counter.total}`)
  }
}

async function main() {
  const idxList: IndexEntry[] = JSON.parse(fs.readFileSync('data/research-queue/opc_index.json', 'utf-8'))
  const queue = [...idxList]
  const results: Parsed[] = []
  const counter = { n: 0, total: idxList.length }
  console.log(`Fetching ${idxList.length} OPC pages with concurrency 5...\n`)
  const start = Date.now()
  await Promise.all(Array.from({ length: 5 }, () => worker(queue, results, counter)))
  const elapsed = ((Date.now() - start) / 1000).toFixed(1)
  results.sort((a, b) => a.id - b.id)
  fs.writeFileSync('data/research-queue/opc_pages_parsed.json', JSON.stringify(results, null, 2))
  const ok = results.filter(r => r.ok).length
  const withPastor = results.filter(r => r.pastor).length
  const withAddr = results.filter(r => r.mailingAddress?.street).length
  const withPhone = results.filter(r => r.phone).length
  const withEmail = results.filter(r => r.email).length
  const withPresb = results.filter(r => r.presbytery).length
  const withWeb = results.filter(r => r.website).length
  console.log(`\nDone in ${elapsed}s`)
  console.log(`  ok:        ${ok}/${results.length}`)
  console.log(`  pastor:    ${withPastor}`)
  console.log(`  address:   ${withAddr}`)
  console.log(`  phone:     ${withPhone}`)
  console.log(`  email:     ${withEmail}`)
  console.log(`  presbytery:${withPresb}`)
  console.log(`  website:   ${withWeb}`)
}
main().catch(e => { console.error(e); process.exit(1) })
