import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Common pastor title patterns
const pastorPatterns = [
  /(?:Senior\s+)?Pastor[:\s]+(?:Dr\.?\s+|Rev\.?\s+)?([A-Z][a-z]+(?:\s+[A-Z]\.?\s+)?[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/g,
  /(?:Lead\s+)?Pastor[:\s]+(?:Dr\.?\s+|Rev\.?\s+)?([A-Z][a-z]+(?:\s+[A-Z]\.?\s+)?[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/g,
  /(?:Rev(?:erend)?\.?\s+|Dr\.?\s+)([A-Z][a-z]+(?:\s+[A-Z]\.?\s+)?[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/g,
  /Senior\s+Minister[:\s]+([A-Z][a-z]+(?:\s+[A-Z]\.?\s+)?[A-Z][a-z]+)/g,
  /(?:Teaching|Preaching)\s+(?:Elder|Pastor)[:\s]+([A-Z][a-z]+(?:\s+[A-Z]\.?\s+)?[A-Z][a-z]+)/g,
]

// Words that are NOT pastor names
const falsePositives = new Set([
  'Jesus Christ', 'Holy Spirit', 'God Almighty', 'John Calvin', 'Martin Luther',
  'Westminster Confession', 'Lord Jesus', 'Christ Jesus', 'King James',
  'Privacy Policy', 'All Rights', 'Web Design', 'Church Online',
  'Learn More', 'Read More', 'Sign Up', 'Log In', 'Contact Us',
])

function extractPastor(text: string): string | null {
  for (const pattern of pastorPatterns) {
    pattern.lastIndex = 0
    const match = pattern.exec(text)
    if (match && match[1]) {
      const name = match[1].trim()
      if (name.length > 4 && name.length < 40 && !falsePositives.has(name)) {
        return name
      }
    }
  }
  return null
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

function htmlToText(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#?\w+;/g, ' ')
    .replace(/\s{2,}/g, ' ')
}

async function main() {
  const churches = await prisma.church.findMany({
    select: { id: true, name: true, website: true, theologicalNotes: true, state: true, city: true },
    orderBy: { id: 'asc' }
  })

  // Find churches that have websites but no pastor in their theologicalNotes
  const needsPastor = churches.filter(c =>
    c.website?.startsWith('http') &&
    c.theologicalNotes &&
    !c.theologicalNotes.includes('Pastor') &&
    !c.theologicalNotes.includes('Rev.') &&
    !c.theologicalNotes.includes('Dr.')
  )

  console.log(`Scraping pastor names from ${needsPastor.length} church websites...\n`)

  const pages = ['', '/about', '/staff', '/leadership', '/pastors', '/our-team', '/about-us', '/our-pastors', '/our-staff', '/elders', '/meet-the-pastor']

  let found = 0
  let processed = 0

  for (let i = 0; i < needsPastor.length; i += 10) {
    const batch = needsPastor.slice(i, i + 10)
    await Promise.all(batch.map(async (c) => {
      const baseUrl = c.website!.replace(/\/$/, '')
      for (const page of pages) {
        const html = await fetchSafe(baseUrl + page, 5000)
        if (!html) continue
        const text = htmlToText(html)
        const pastor = extractPastor(text)
        if (pastor) {
          // Update theologicalNotes with pastor name
          const newNotes = c.theologicalNotes!.replace(/\.\s*Westminster/, `. Pastor ${pastor}. Westminster`)
            || c.theologicalNotes + ` Pastor ${pastor}.`
          try {
            await prisma.church.update({
              where: { id: c.id },
              data: { theologicalNotes: newNotes }
            })
            found++
            process.stdout.write(`✓ ${c.id}: ${c.name} → Pastor ${pastor}\n`)
          } catch {}
          return
        }
      }
      processed++
    }))

    if ((i + 10) % 100 === 0) {
      console.log(`  Progress: ${i + 10}/${needsPastor.length} | Found: ${found}`)
    }
  }

  console.log(`\nDone! Found ${found} pastor names from ${needsPastor.length} churches.`)
  await prisma.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
