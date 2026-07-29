// Harvest contact emails for Michigan churches that have a website but no email on file.
// Email is AAM's first outreach channel, so this is the highest-value field to fill.
//
// Fetches the homepage plus the usual contact paths, pulls addresses out of mailto: links and
// visible text, then filters hard: vendor/platform addresses, image filenames and personal
// webmaster accounts are discarded, and church-domain addresses are preferred over free mail.
//
//   npx tsx prisma/harvest-mi-emails-2026-07-29.ts --dry-run
//   npx tsx prisma/harvest-mi-emails-2026-07-29.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const DRY = process.argv.includes('--dry-run')
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'
const PATHS = ['', '/contact', '/contact-us', '/contact.html', '/about', '/about-us', '/connect', '/visit']

const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g
// Platform/vendor noise and file extensions that look like addresses.
const JUNK = /(sentry|wixpress|squarespace|godaddy|weebly|example\.|yourdomain|domain\.com|\.png|\.jpg|\.jpeg|\.gif|\.webp|\.svg|\.css|\.js|@2x|sentry\.io|wordpress|elementor|cloudflare|gravatar|placeholder)/i

const fetchText = async (url: string, ms = 12000): Promise<string | null> => {
  try {
    const ctl = new AbortController()
    const t = setTimeout(() => ctl.abort(), ms)
    const r = await fetch(url, { headers: { 'User-Agent': UA }, signal: ctl.signal, redirect: 'follow' })
    clearTimeout(t)
    if (!r.ok) return null
    const ct = r.headers.get('content-type') || ''
    if (!/text|html/i.test(ct)) return null
    return (await r.text()).slice(0, 400000)
  } catch { return null }
}

function pickBest(found: string[], siteHost: string): string | null {
  const cleaned = [...new Set(found.map(e =>
    // Some sites emit "hello@www.example.org"; the www belongs to the URL, not the address.
    e.trim().toLowerCase().replace(/[.,;:)]+$/, '').replace(/@www\./, '@')))]
    .filter(e => {
      const parts = e.split('@')
      if (parts.length !== 2) return false
      const [local, host] = parts
      // A mailto: can yield fragments like "foo@" or "@example" — both useless.
      if (!local || !host || !host.includes('.')) return false
      return !JUNK.test(e) && e.length < 60 && !/^[0-9]/.test(local)
    })
  if (!cleaned.length) return null
  const domain = siteHost.replace(/^www\./, '')
  const score = (e: string) => {
    const [local, host] = e.split('@')
    let s = 0
    if (host === domain || host.endsWith('.' + domain)) s += 10        // church's own domain
    if (/^(info|office|contact|church|admin|hello|secretary|mail)$/.test(local)) s += 6
    if (/^pastor/.test(local)) s += 5
    if (/(gmail|yahoo|outlook|hotmail|aol|comcast|sbcglobal|frontier)\./.test(host)) s += 2
    if (/(webmaster|web|media|tech|support|noreply|no-reply|donotreply)/.test(local)) s -= 8
    return s
  }
  const ranked = cleaned.sort((a, b) => score(b) - score(a))
  return score(ranked[0]) > -4 ? ranked[0] : null
}

async function main() {
  const targets = await prisma.church.findMany({
    where: { state: 'MI', email: null, NOT: { website: null } },
    select: { id: true, name: true, city: true, website: true },
    orderBy: { id: 'asc' },
  })
  console.log(`Michigan churches with a website but no email: ${targets.length}\n`)

  let found = 0, none = 0
  for (const c of targets) {
    const site = (c.website || '').replace(/\/+$/, '')
    let host = ''
    try { host = new URL(site).host } catch { console.log(`  #${c.id} ${c.name} — unusable website value`); none++; continue }
    if (/facebook\.com|instagram\.com|sermonaudio\.com/i.test(host)) { console.log(`  #${c.id} ${c.name} — social-only presence, skipped`); none++; continue }

    const hits: string[] = []
    for (const p of PATHS) {
      const html = await fetchText(site + p)
      if (!html) continue
      for (const m of html.matchAll(/mailto:([^"'?>\s]+)/gi)) hits.push(m[1])
      const text = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
      for (const m of text.matchAll(EMAIL_RE)) hits.push(m[0])
      if (hits.length > 3) break
    }
    const best = pickBest(hits, host)
    if (!best) { console.log(`  #${c.id} ${c.name} (${c.city}) — none found`); none++; continue }
    console.log(`  #${c.id} ${c.name} (${c.city})  ->  ${best}`)
    found++
    if (!DRY) await prisma.church.update({ where: { id: c.id }, data: { email: best } })
  }

  console.log(`\n${DRY ? 'WOULD FILL' : 'FILLED'} ${found}   no email found: ${none}`)
  if (!DRY) {
    const withEmail = await prisma.church.count({ where: { state: 'MI', NOT: { email: null } } })
    const total = await prisma.church.count({ where: { state: 'MI' } })
    console.log(`Michigan email coverage now: ${withEmail} / ${total}`)
  }
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
