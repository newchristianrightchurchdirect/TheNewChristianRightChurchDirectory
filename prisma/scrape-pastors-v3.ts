import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const subpages = ['', '/about', '/about-us', '/leadership', '/staff', '/our-pastor', '/pastors', '/elders', '/about/leadership', '/about/staff', '/about/our-pastor', '/meet-the-pastor']

async function fetchText(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0' },
      signal: AbortSignal.timeout(6000),
      redirect: 'follow'
    })
    if (!res.ok) return null
    const html = await res.text()
    return html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
  } catch { return null }
}

function findPastor(text: string): string | null {
  // Broad patterns for finding pastor names
  const patterns = [
    // "Pastor John Smith" or "Pastor: John Smith"
    /(?:Senior |Lead |Teaching |Associate )?Pastor[:\s]+([A-Z][a-z]{1,15}(?:\s+[A-Z]\.?\s*)?[A-Z][a-z]{1,20}(?:\s+(?:Jr|Sr|II|III|IV)\.?)?)/,
    // "Rev. John Smith" or "Reverend John Smith"
    /(?:Rev(?:erend)?\.?\s+)([A-Z][a-z]{1,15}(?:\s+[A-Z]\.?\s*)?[A-Z][a-z]{1,20})/,
    // "Elder John Smith" (for Reformed churches)
    /(?:Teaching Elder|Ruling Elder)[:\s]+([A-Z][a-z]{1,15}(?:\s+[A-Z]\.?\s*)?[A-Z][a-z]{1,20})/,
    // "Minister: John Smith"
    /Minister[:\s]+([A-Z][a-z]{1,15}(?:\s+[A-Z]\.?\s*)?[A-Z][a-z]{1,20})/,
  ]
  
  for (const p of patterns) {
    const m = text.match(p)
    if (m) {
      const name = m[1].trim()
      // Skip common false positives
      if (/^(The |Our |Your |New |This |That |Senior |First |South |North |East |West |Grace |Christ |Saint |Mount |Trinity |Faith |Hope |Living |Spring )/i.test(name)) continue
      if (name.length < 5 || name.length > 40) continue
      return name
    }
  }
  return null
}

async function main() {
  // Get churches with websites but no pastor in notes
  const churches = await prisma.church.findMany({
    where: {
      website: { startsWith: 'http' },
      OR: [
        { theologicalNotes: null },
        { AND: [
          { theologicalNotes: { not: null } },
          { NOT: { theologicalNotes: { contains: 'Pastor' } } }
        ]}
      ]
    },
    select: { id: true, name: true, website: true, theologicalNotes: true, denomination: true },
    orderBy: { id: 'asc' },
    take: 200  // Process in batches
  })

  console.log(`Scraping ${churches.length} church websites for pastor names...\n`)

  let found = 0, failed = 0, noMatch = 0

  for (let i = 0; i < churches.length; i++) {
    const c = churches[i]
    let base = c.website!.replace(/\/+$/, '')
    
    let pastor: string | null = null
    for (const sub of subpages) {
      const url = base + sub
      const text = await fetchText(url)
      if (text) {
        pastor = findPastor(text)
        if (pastor) break
      }
    }

    if (pastor) {
      let notes = c.theologicalNotes || ''
      if (notes && !notes.endsWith('.')) notes += '.'
      notes = notes ? notes + ` Pastor ${pastor}.` : `Pastor ${pastor}.`
      await prisma.church.update({ where: { id: c.id }, data: { theologicalNotes: notes } })
      found++
      console.log(`  ✓ ${c.name} → Pastor ${pastor}`)
    } else {
      noMatch++
    }

    if ((i + 1) % 50 === 0) {
      console.log(`\n  Progress: ${i + 1}/${churches.length} | Found: ${found} | No match: ${noMatch}\n`)
    }

    // Small delay to be polite
    await new Promise(r => setTimeout(r, 300))
  }

  console.log(`\n=== Results ===`)
  console.log(`Found: ${found} | No match: ${noMatch}`)
  
  const totalPastors = await prisma.church.count({ where: { theologicalNotes: { contains: 'Pastor' } } })
  console.log(`Total with pastor: ${totalPastors}`)

  await prisma.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
