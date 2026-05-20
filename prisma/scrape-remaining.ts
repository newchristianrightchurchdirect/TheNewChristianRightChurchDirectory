import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const prisma = new PrismaClient()

// Use multiple free church directory sites that render server-side
const SEARCH_SOURCES = [
  // FaithStreet - has good PCA coverage
  (name: string, city: string, state: string) =>
    `https://www.faithstreet.com/search?q=${encodeURIComponent(name + ' ' + city + ' ' + state)}`,
  // Yellow Pages
  (name: string, city: string, state: string) =>
    `https://www.yellowpages.com/${encodeURIComponent(city.toLowerCase().replace(/\s+/g, '-'))}-${state.toLowerCase()}/mip/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'))}`,
]

function extractAddressFromText(text: string): { address: string | null, zip: string | null } {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 5 && l.length < 120)
  const streetWords = /\b(street|st|avenue|ave|boulevard|blvd|drive|dr|road|rd|lane|ln|way|court|ct|place|pl|parkway|pkwy|circle|cir|highway|hwy|pike|trail|loop)\b/i

  for (const line of lines) {
    if (/^\d{1,6}\s/.test(line) && streetWords.test(line)) {
      const cleaned = line.replace(/[,\s]+$/, '').trim()
      if (cleaned.length > 8 && cleaned.length < 80) {
        const zipMatch = text.match(new RegExp(line.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s,]*(?:[A-Za-z\\s]+)?[\\s,]*(\\d{5})'))
        const nearbyZip = text.substring(text.indexOf(line), text.indexOf(line) + 200).match(/\b(\d{5})(?:-\d{4})?\b/)
        return { address: cleaned, zip: nearbyZip ? nearbyZip[1] : null }
      }
    }
  }
  return { address: null, zip: null }
}

async function fetchSafe(url: string, timeout = 6000): Promise<string | null> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0' },
      redirect: 'follow',
    })
    clearTimeout(timer)
    if (!res.ok) return null
    return await res.text()
  } catch {
    clearTimeout(timer)
    return null
  }
}

async function main() {
  const churches = await prisma.church.findMany({
    select: { id: true, name: true, address: true, city: true, state: true, zip: true, website: true, phone: true },
    orderBy: { id: 'asc' }
  })

  const remaining = churches.filter(c => c.address && !/\d/.test(c.address))

  // Split into: has website (try subpages), no website (try directories)
  const withWebsite = remaining.filter(c => c.website?.startsWith('http'))
  const noWebsite = remaining.filter(c => !c.website || !c.website.startsWith('http'))

  console.log(`Remaining: ${remaining.length} (${withWebsite.length} with website, ${noWebsite.length} without)`)
  console.log('Trying additional subpages on church websites...\n')

  const results: any[] = []
  let found = 0

  // For churches with websites, try more subpages
  const subpages = ['/contact', '/about', '/visit', '/location', '/directions', '/about-us', '/contact-us', '/visit-us', '/find-us', '/connect', '/info', '/our-church', '/welcome', '/map']

  for (let i = 0; i < withWebsite.length; i += 10) {
    const batch = withWebsite.slice(i, i + 10)
    await Promise.all(batch.map(async (c) => {
      const baseUrl = c.website!.replace(/\/$/, '')
      for (const page of subpages) {
        const html = await fetchSafe(baseUrl + page, 4000)
        if (!html) continue
        const text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, '\n').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&#?\w+;/g, ' ')
        const result = extractAddressFromText(text)
        if (result.address) {
          found++
          results.push({ id: c.id, name: c.name, address: result.address, zip: result.zip })
          process.stdout.write(`✓ ${c.id}: ${result.address} (from ${page})\n`)
          return
        }
      }
    }))
    if ((i + 10) % 100 === 0) console.log(`  Website pass: ${i + 10}/${withWebsite.length}, found: ${found}`)
  }

  console.log(`\nWebsite subpage pass found: ${found}`)
  console.log(`\nNow trying directory lookups for churches without websites...`)

  // For churches without websites, try Google Maps embed search
  let dirFound = 0
  for (let i = 0; i < noWebsite.length; i += 5) {
    const batch = noWebsite.slice(i, i + 5)
    await Promise.all(batch.map(async (c) => {
      // Try a simple search on mapquest/similar
      const query = encodeURIComponent(`${c.name} ${c.city} ${c.state}`)
      const url = `https://www.mapquest.com/search/${query}`
      const html = await fetchSafe(url, 5000)
      if (html) {
        const text = html.replace(/<[^>]+>/g, '\n')
        const result = extractAddressFromText(text)
        if (result.address) {
          dirFound++
          results.push({ id: c.id, name: c.name, address: result.address, zip: result.zip })
          process.stdout.write(`✓ ${c.id}: ${result.address} (mapquest)\n`)
          return
        }
      }
    }))
    if ((i + 5) % 100 === 0) console.log(`  Directory pass: ${i + 5}/${noWebsite.length}, found: ${dirFound}`)
  }

  console.log(`\nDirectory pass found: ${dirFound}`)
  console.log(`Total new addresses: ${results.length}`)

  // Save and apply
  fs.writeFileSync('prisma/scraped-addresses-round2.json', JSON.stringify(results, null, 2))

  // Apply to database
  let applied = 0
  for (const entry of results) {
    const addr = entry.address.replace(/[,\s]+$/, '').trim()
    if (addr.length < 8) continue
    const data: any = { address: addr }
    if (entry.zip) data.zip = entry.zip
    try {
      await prisma.church.update({ where: { id: entry.id }, data })
      applied++
    } catch {}
  }

  console.log(`Applied ${applied} to database`)
  await prisma.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
