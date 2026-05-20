import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const prisma = new PrismaClient()

function cleanAddress(raw: string): { address: string, zip: string | null } | null {
  // Remove common noise patterns
  let cleaned = raw
    .replace(/\d{1,2}:\d{2}\s*(a\.?m\.?|p\.?m\.?|AM|PM)/gi, '')
    .replace(/Play Video/gi, '')
    .replace(/Now Pl\w*/gi, '')
    .replace(/(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)\s*/gi, '')
    .replace(/\b(Morning|Evening)\s+(Worship|Service)\b/gi, '')
    .replace(/\b\d{4}\s+[A-Z][a-z]+\s+Presbyterian Church\b/gi, '') // years
    .replace(/\n+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()

  // Extract the actual street address: find first occurrence of number + street
  const streetMatch = cleaned.match(/(\d{1,6}\s+(?:[NSEW]\.?\s+)?(?:[A-Za-z0-9'.]+[\s-]){1,6}(?:Street|St\.?|Avenue|Ave\.?|Boulevard|Blvd\.?|Drive|Dr\.?|Road|Rd\.?|Lane|Ln\.?|Way|Court|Ct\.?|Place|Pl\.?|Parkway|Pkwy\.?|Circle|Cir\.?|Terrace|Ter\.?|Loop|Pike|Highway|Hwy\.?|Trail|Trl\.?|Run|Pass|Path|Row|Creek|Bridge|Square|Crossing|Point|View|Ridge|Hill|Valley|Glen|Gate|Oaks|Commons|Plaza|Hollow|Bend|Cove|Ranch|Meadow|Spring|Dale|Shores|Harbor|Heights|Spur|Grove|Center|Station)(?:\s+(?:[NSEW]|NE|NW|SE|SW|North|South|East|West|Suite|Ste\.?|#|Apt\.?)\s*\S*)?)/i)

  if (!streetMatch) {
    // Try simpler pattern: number + words
    const simpleMatch = cleaned.match(/(\d{1,6}\s+(?:[A-Za-z0-9'.]+\s+){1,4}(?:St|Ave|Blvd|Dr|Rd|Ln|Way|Ct|Pl|Pkwy|Cir|Hwy|Pike|Trl)\.?\b)/i)
    if (!simpleMatch) return null
    cleaned = simpleMatch[1].trim()
  } else {
    cleaned = streetMatch[1].trim()
  }

  // Remove trailing punctuation
  cleaned = cleaned.replace(/[,.\s]+$/, '').trim()

  // Must be reasonable length
  if (cleaned.length < 8 || cleaned.length > 100) return null

  // Extract zip code from the original raw string
  const zipMatch = raw.match(/\b(\d{5})(?:-\d{4})?\b/)
  const zip = zipMatch ? zipMatch[1] : null

  // Filter out things that are clearly not addresses
  if (/^\d{4}$/.test(cleaned)) return null // just a year
  if (/phone|fax|tel/i.test(cleaned)) return null

  return { address: cleaned, zip }
}

async function main() {
  const data = JSON.parse(fs.readFileSync('prisma/scraped-addresses.json', 'utf8'))
  console.log(`Processing ${data.length} scraped results...\n`)

  let updated = 0
  let skipped = 0

  for (const entry of data) {
    const result = cleanAddress(entry.address)
    if (!result) {
      skipped++
      continue
    }

    const updateData: any = { address: result.address }
    if (result.zip) updateData.zip = result.zip

    try {
      await prisma.church.update({
        where: { id: entry.id },
        data: updateData
      })
      updated++
      if (updated % 50 === 0) {
        console.log(`Progress: ${updated} updated...`)
      }
    } catch (e: any) {
      console.error(`Failed ${entry.id}: ${e.message}`)
    }
  }

  console.log(`\nDone! Updated ${updated} churches with scraped addresses. Skipped ${skipped} noisy results.`)
  await prisma.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
