import * as fs from 'fs'
import * as path from 'path'

type Match = { churchId: number; churchName: string; churchCity: string; state: string; slug: string; slugName: string; slugCity: string; score: number }
type Plan = { matched: Match[]; unmatched: any[]; orphanSlugs: any[] }

type Extracted = {
  churchId: number
  slug: string
  url: string
  ok: boolean
  status?: number
  pageTitle?: string
  presbytery?: string
  pastor?: string
  leadership?: { name: string; role: string }[]
  phone?: string
  website?: string
  address?: { street?: string; cityStateZip?: string }
  serviceTimes?: string
  facebook?: string
  append: string  // text to append to theologicalNotes
}

function decodeHtml(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

function stripTags(s: string): string {
  return decodeHtml(s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
}

function parsePage(html: string): Omit<Extracted, 'churchId' | 'slug' | 'url' | 'ok' | 'append'> {
  const out: any = {}

  const titleM = html.match(/<h1 class="page-title">([^<]+)<\/h1>/)
  if (titleM) out.pageTitle = decodeHtml(titleM[1].trim())

  const presbyteryM = html.match(/\/congregations\/presbytery\/[a-z_]+">([^<]+)<\/a>/)
  if (presbyteryM) out.presbytery = decodeHtml(presbyteryM[1].trim())

  // Leadership block: <div class="elders">...</div>
  const eldersM = html.match(/<div class="elders">([\s\S]*?)<\/div>/)
  if (eldersM) {
    const block = eldersM[1]
    const leadership: { name: string; role: string }[] = []
    // pastor: <span class="cong_pastor">NAME, <em>Pastor</em></span>
    const pastorM = block.match(/<span class="cong_pastor">([^<]+),\s*<em>([^<]+)<\/em>/)
    if (pastorM) {
      const name = pastorM[1].trim()
      const role = pastorM[2].trim()
      out.pastor = name
      leadership.push({ name, role })
    }
    // other roles: <p>NAME, <em>ROLE</em></p>
    const pRegex = /<p>([^<]+?),\s*<em>([^<]+)<\/em>/g
    let m
    while ((m = pRegex.exec(block)) !== null) {
      const name = m[1].trim()
      const role = m[2].trim()
      if (!leadership.some(l => l.name === name && l.role === role)) {
        leadership.push({ name, role })
      }
    }
    if (leadership.length) out.leadership = leadership
  }

  // Phone: <th>Phone:</th><td> XXX</td>
  const phoneM = html.match(/<th>Phone:<\/th>\s*<td>\s*([^<]+?)\s*<\/td>/)
  if (phoneM) out.phone = decodeHtml(phoneM[1].trim())

  // Website: <th>Website:</th><td> <a href="URL"
  const websiteM = html.match(/<th>Website:<\/th>\s*<td>\s*<a href="([^"]+)"/)
  if (websiteM) out.website = websiteM[1].trim()

  // Service time: <th>Time:</th><td> TEXT</td>
  const timeM = html.match(/<th>Time:<\/th>\s*<td>([\s\S]*?)<\/td>/)
  if (timeM) out.serviceTimes = stripTags(timeM[1])

  // Facebook: <th>Facebook:&nbsp;</th><td> <a href="URL"
  const fbM = html.match(/<th>Facebook:[^<]*<\/th>\s*<td>\s*<a href="([^"]+)"/)
  if (fbM) out.facebook = fbM[1].trim()

  // Address: <span class="cong_add">STREET</span><br>\n   CITY, STATE ZIP
  const addrBlockM = html.match(/<div class="address">([\s\S]*?)<\/div>/)
  if (addrBlockM) {
    const block = addrBlockM[1]
    const streetM = block.match(/<span class="cong_add">([^<]+)<\/span>/)
    if (streetM) {
      const street = decodeHtml(streetM[1].trim())
      // Find text after the <br> up to the next tag
      const afterStreetM = block.match(/<span class="cong_add">[^<]+<\/span>\s*<br>\s*([\s\S]*?)<\/p>/)
      const csz = afterStreetM ? decodeHtml(afterStreetM[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()) : ''
      out.address = { street, cityStateZip: csz }
    }
  }

  return out
}

function buildAppend(e: Omit<Extracted, 'append'>): string {
  if (!e.ok) return ''
  const parts: string[] = []

  if (e.pastor && !/^vacant$/i.test(e.pastor.trim())) {
    parts.push(`Pastor ${e.pastor}.`)
  } else if (e.pastor && /^vacant$/i.test(e.pastor.trim())) {
    parts.push(`Pulpit currently vacant.`)
  }

  // Leadership minus the pastor (group by role)
  if (e.leadership && e.leadership.length) {
    const others = e.leadership.filter(l => !/pastor/i.test(l.role))
    if (others.length) {
      const byRole = new Map<string, string[]>()
      for (const l of others) {
        if (!byRole.has(l.role)) byRole.set(l.role, [])
        byRole.get(l.role)!.push(l.name)
      }
      for (const [role, names] of byRole) {
        const roleLabel = names.length > 1 ? `${role}s` : role
        parts.push(`${roleLabel}: ${names.join(', ')}.`)
      }
    }
  }

  if (e.address?.street && e.address?.cityStateZip) {
    parts.push(`Address: ${e.address.street}, ${e.address.cityStateZip}.`)
  }

  if (e.presbytery) parts.push(`Part of the RPCNA ${e.presbytery} Presbytery.`)

  if (e.website) parts.push(`Website: ${e.website}.`)

  return ' ' + parts.join(' ')
}

async function fetchOne(m: Match): Promise<Extracted> {
  const url = `https://reformedpresbyterian.org/congregations/info/${m.slug}`
  try {
    const r = await fetch(url, {
      headers: { 'user-agent': 'Mozilla/5.0 (church-directory research; contact: dustin@newchristianright.com)' },
    })
    if (!r.ok) {
      return { churchId: m.churchId, slug: m.slug, url, ok: false, status: r.status, append: '' }
    }
    const html = await r.text()
    const parsed = parsePage(html)
    const ext: Extracted = { churchId: m.churchId, slug: m.slug, url, ok: true, status: 200, ...parsed, append: '' }
    ext.append = buildAppend(ext)
    return ext
  } catch (err: any) {
    return { churchId: m.churchId, slug: m.slug, url, ok: false, status: -1, append: '' }
  }
}

async function withConcurrency<T, R>(items: T[], n: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length)
  let i = 0
  async function worker() {
    while (i < items.length) {
      const idx = i++
      out[idx] = await fn(items[idx])
    }
  }
  const workers = Array.from({ length: Math.min(n, items.length) }, () => worker())
  await Promise.all(workers)
  return out
}

async function main() {
  const planPath = path.join(process.cwd(), 'data', 'research-queue', 'rpcna_match_plan.json')
  const plan: Plan = JSON.parse(fs.readFileSync(planPath, 'utf-8'))

  // Skip churchId 3971 — it's a duplicate of 3795 Broomall
  const matches = plan.matched.filter(m => m.churchId !== 3971)
  // Dedupe by slug — keep first
  const seen = new Set<string>()
  const dedup: Match[] = []
  for (const m of matches) {
    if (seen.has(m.slug)) continue
    seen.add(m.slug)
    dedup.push(m)
  }
  console.log(`Fetching ${dedup.length} RPCNA congregation pages (concurrency 5)...`)

  const t0 = Date.now()
  const results = await withConcurrency(dedup, 5, fetchOne)
  const elapsed = ((Date.now() - t0) / 1000).toFixed(1)
  console.log(`Done in ${elapsed}s\n`)

  const ok = results.filter(r => r.ok)
  const fail = results.filter(r => !r.ok)
  console.log(`✓ Success: ${ok.length}`)
  console.log(`✗ Failed: ${fail.length}`)
  for (const f of fail) console.log(`  ✗ id=${f.churchId} slug=${f.slug} → HTTP ${f.status}`)

  const withPastor = ok.filter(r => r.pastor).length
  const withAddr = ok.filter(r => r.address?.street).length
  console.log(`\nFields extracted across ${ok.length} OK pages:`)
  console.log(`  pastor:   ${withPastor}`)
  console.log(`  address:  ${withAddr}`)
  console.log(`  phone:    ${ok.filter(r => r.phone).length}`)
  console.log(`  website:  ${ok.filter(r => r.website).length}`)
  console.log(`  service:  ${ok.filter(r => r.serviceTimes).length}`)
  console.log(`  leaders:  ${ok.reduce((sum, r) => sum + (r.leadership?.length || 0), 0)} total across all`)

  const outPath = path.join(process.cwd(), 'data', 'research-queue', 'rpcna_extracted.json')
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2))
  console.log(`\nSaved → ${outPath}`)

  // Show first 3 as sanity check
  console.log('\n--- SAMPLE (first 3) ---')
  for (const r of ok.slice(0, 3)) {
    console.log(`\n[${r.churchId}] ${r.pageTitle} (${r.slug})`)
    console.log(`  pastor: ${r.pastor || '(none)'}`)
    console.log(`  leadership: ${r.leadership?.map(l => `${l.name} (${l.role})`).join(', ') || '(none)'}`)
    console.log(`  address: ${r.address?.street}, ${r.address?.cityStateZip}`)
    console.log(`  phone: ${r.phone}`)
    console.log(`  append → "${r.append}"`)
  }
}

main().catch(e => { console.error(e); process.exit(1) })
