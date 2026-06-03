// Retry only failed OPC pages with serial + 1s delay (rate-limit friendly)
import * as fs from 'fs'

type IndexEntry = { id: number; name: string; city: string; state: string; website?: string }
type Parsed = {
  id: number; name: string; city: string; state: string; ok: boolean
  title?: string
  mailingAddress?: { street?: string; city?: string; state?: string; zip?: string }
  meetingAt?: string; pastor?: string; phone?: string; email?: string
  presbytery?: string; website?: string; error?: string
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
  const cardM = html.match(/<table class="churchCard">[\s\S]*?<\/table>/)
  if (!cardM) {
    if (html.length < 500) out.error = `short response (${html.length}b)`
    else out.error = 'no card'
    return out
  }
  const card = cardM[0]
  const titleM = card.match(/<h2>([^<]+)<\/h2>/)
  if (titleM) out.title = decodeHtmlEntities(titleM[1]).trim()
  const mailM = card.match(/<h4>Mailing Address<\/h4>\s*<p>([^<]+)<br\s*\/?>([^<]+)<\/p>/i)
  if (mailM) {
    const street = decodeHtmlEntities(mailM[1]).trim()
    const csz = decodeHtmlEntities(mailM[2]).trim()
    const cszM = csz.match(/^(.+?),\s*([A-Z]{2})\s+(\d{5}(?:-\d{4})?)$/)
    if (cszM) out.mailingAddress = { street, city: cszM[1].trim(), state: cszM[2], zip: cszM[3] }
    else out.mailingAddress = { street, city: csz }
  }
  const meetM = card.match(/<h4>Meeting At<\/h4>\s*<p>([\s\S]*?)<\/p>/i)
  if (meetM) {
    const txt = stripTags(decodeHtmlEntities(meetM[1]))
    if (txt) out.meetingAt = txt
  }
  const contactM = card.match(/<h4>Contact Information<\/h4>\s*<p>([\s\S]*?)<\/p>/i)
  if (contactM) {
    const block = contactM[1]
    const pastorM = block.match(/Pastor:\s*([^<]+?)(?:<br|$)/i)
    if (pastorM) out.pastor = decodeHtmlEntities(pastorM[1]).trim()
    const phoneM = block.match(/Phone:\s*([^<]+?)(?:<br|$)/i)
    if (phoneM) out.phone = decodeHtmlEntities(phoneM[1]).trim()
    const emailM = block.match(/Email:\s*<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/i)
    if (emailM) {
      const href = decodeHtmlEntities(emailM[1])
      const txt = decodeHtmlEntities(emailM[2])
      out.email = (href.startsWith('mailto:') ? href.slice(7) : txt).trim()
    }
  }
  const presbyM = card.match(/<h4>Presbytery<\/h4>\s*<p>(?:<a[^>]*>)?([^<]+)<\/a>?<\/p>/i)
  if (presbyM) out.presbytery = decodeHtmlEntities(presbyM[1]).trim()
  const webM = card.match(/Website:\s*<\/span>\s*<a[^>]+href="([^"]+)"/i)
  if (webM) out.website = decodeHtmlEntities(webM[1]).trim()
  out.ok = !!(out.mailingAddress?.street || out.pastor || out.phone || out.email)
  return out
}

async function fetchWithRetry(id: number, maxRetries = 3): Promise<string> {
  let lastErr: any
  for (let i = 0; i < maxRetries; i++) {
    try {
      const ctl = new AbortController()
      const t = setTimeout(() => ctl.abort(), 45000)
      const res = await fetch(`https://opc.org/church.html?church_id=${id}`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
        signal: ctl.signal,
      })
      clearTimeout(t)
      const html = await res.text()
      if (html.length < 500) {
        lastErr = new Error(`short response (${html.length}b)`)
        await new Promise(r => setTimeout(r, 5000 * (i + 1)))
        continue
      }
      return html
    } catch (e: any) {
      lastErr = e
      await new Promise(r => setTimeout(r, 5000 * (i + 1)))
    }
  }
  throw lastErr
}

async function main() {
  const idxList: IndexEntry[] = JSON.parse(fs.readFileSync('data/research-queue/opc_index.json', 'utf-8'))
  const existing: Parsed[] = JSON.parse(fs.readFileSync('data/research-queue/opc_pages_parsed.json', 'utf-8'))
  const okIds = new Set(existing.filter(p => p.ok).map(p => p.id))
  const todo = idxList.filter(i => !okIds.has(i.id))
  console.log(`Retrying ${todo.length} failed pages (serial, 1s delay)...\n`)

  const byId = new Map(existing.map(p => [p.id, p]))
  let succeeded = 0
  for (let i = 0; i < todo.length; i++) {
    const idx = todo[i]
    try {
      const html = await fetchWithRetry(idx.id)
      const parsed = parseChurch(html, idx)
      byId.set(idx.id, parsed)
      if (parsed.ok) succeeded++
      if ((i + 1) % 10 === 0) {
        console.log(`  ${i + 1}/${todo.length} (${succeeded} new ok)`)
        // Save progress every 10
        const merged = idxList.map(idx => byId.get(idx.id) || { id: idx.id, name: idx.name, city: idx.city, state: idx.state, ok: false, error: 'missing' })
        fs.writeFileSync('data/research-queue/opc_pages_parsed.json', JSON.stringify(merged, null, 2))
      }
    } catch (e: any) {
      byId.set(idx.id, { id: idx.id, name: idx.name, city: idx.city, state: idx.state, ok: false, error: e.message })
      console.log(`  ${i + 1}/${todo.length} id=${idx.id} FAILED: ${e.message}`)
    }
    await new Promise(r => setTimeout(r, 1000))
  }

  const merged = idxList.map(idx => byId.get(idx.id) || { id: idx.id, name: idx.name, city: idx.city, state: idx.state, ok: false, error: 'missing' })
  fs.writeFileSync('data/research-queue/opc_pages_parsed.json', JSON.stringify(merged, null, 2))

  const ok = merged.filter(r => r.ok).length
  const withPastor = merged.filter(r => r.pastor).length
  const withAddr = merged.filter(r => r.mailingAddress?.street).length
  const withMeet = merged.filter(r => r.meetingAt).length
  const withPhone = merged.filter(r => r.phone).length
  const withEmail = merged.filter(r => r.email).length
  const withPresb = merged.filter(r => r.presbytery).length
  const withWeb = merged.filter(r => r.website).length
  console.log(`\nFinal:`)
  console.log(`  ok:        ${ok}/${merged.length}`)
  console.log(`  pastor:    ${withPastor}`)
  console.log(`  mailAddr:  ${withAddr}`)
  console.log(`  meetingAt: ${withMeet}`)
  console.log(`  phone:     ${withPhone}`)
  console.log(`  email:     ${withEmail}`)
  console.log(`  presbytery:${withPresb}`)
  console.log(`  website:   ${withWeb}`)
}
main().catch(e => { console.error(e); process.exit(1) })
