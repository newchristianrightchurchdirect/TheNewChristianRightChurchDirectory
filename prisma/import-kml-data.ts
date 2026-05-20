import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const prisma = new PrismaClient()

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function cleanPastorName(raw: string): string {
  if (!raw || raw === '-' || raw.length < 3) return ''
  // Remove Rev., Dr., etc. prefixes for storage, keep the name
  let name = raw
    .replace(/^Rev\.?\s*/i, '')
    .replace(/^Dr\.?\s*/i, '')
    .replace(/^Pastor\s*/i, '')
    .replace(/,\s*(Jr|Sr|II|III|IV|V)\.?$/i, ' $1')
    .trim()
  if (name.length < 3) return ''
  return name
}

async function main() {
  const kmlData = JSON.parse(fs.readFileSync('C:/Users/Dustina/church-directory/kml_churches.json', 'utf-8'))

  const dbChurches = await prisma.church.findMany({
    select: { id: true, name: true, city: true, state: true, email: true, phone: true, website: true, theologicalNotes: true },
  })

  // Build lookups
  const nameStateLookup = new Map<string, typeof dbChurches[0][]>()
  const cityStateLookup = new Map<string, typeof dbChurches[0][]>()

  for (const c of dbChurches) {
    const key1 = normalize(c.name) + '_' + c.state
    if (!nameStateLookup.has(key1)) nameStateLookup.set(key1, [])
    nameStateLookup.get(key1)!.push(c)

    const key2 = normalize(c.city) + '_' + c.state
    if (!cityStateLookup.has(key2)) cityStateLookup.set(key2, [])
    cityStateLookup.get(key2)!.push(c)
  }

  let matched = 0
  let emailsAdded = 0
  let phonesAdded = 0
  let pastorsAdded = 0

  for (const kml of kmlData) {
    if (!kml.state) continue

    // Try exact name+state match
    const key = normalize(kml.name) + '_' + kml.state
    let candidates = nameStateLookup.get(key)

    // Try fuzzy match by city+state
    if (!candidates || candidates.length === 0) {
      const cityKey = normalize(kml.city) + '_' + kml.state
      const cityMatches = cityStateLookup.get(cityKey) || []
      const kmlNorm = normalize(kml.name)
      candidates = cityMatches.filter(c => {
        const dbNorm = normalize(c.name)
        return dbNorm.includes(kmlNorm) || kmlNorm.includes(dbNorm) ||
          (kmlNorm.length > 10 && dbNorm.length > 10 &&
           kmlNorm.split(/(?=[A-Z])/).filter((w: string) => w.length > 3 && dbNorm.includes(w)).length >= 2)
      })
    }

    if (!candidates || candidates.length === 0) continue

    const dbC = candidates[0]
    const updates: any = {}

    // Add email if missing
    if (kml.email && kml.email !== '-' && !dbC.email) {
      updates.email = kml.email
      emailsAdded++
    }

    // Add phone if missing
    if (kml.phone && kml.phone !== '-' && !dbC.phone) {
      updates.phone = kml.phone
      phonesAdded++
    }

    // Add pastor if missing from theologicalNotes
    const pastor = cleanPastorName(kml.pastor)
    if (pastor && dbC.theologicalNotes && !dbC.theologicalNotes.includes('Pastor')) {
      let notes = dbC.theologicalNotes
      if (!notes.endsWith('.')) notes += '.'
      notes += ` Pastor ${pastor}.`
      updates.theologicalNotes = notes
      pastorsAdded++
    }

    if (Object.keys(updates).length > 0) {
      await prisma.church.update({ where: { id: dbC.id }, data: updates })
    }
    matched++
  }

  console.log(`Matched: ${matched} / ${kmlData.length}`)
  console.log(`Emails added: ${emailsAdded}`)
  console.log(`Phones added: ${phonesAdded}`)
  console.log(`Pastors added: ${pastorsAdded}`)

  // Final counts
  const totalEmails = await prisma.church.count({ where: { email: { not: null } } })
  const totalPastors = await prisma.church.count({ where: { theologicalNotes: { contains: 'Pastor' } } })
  console.log(`\nDB totals: ${totalEmails} emails, ${totalPastors} with pastor names`)

  await prisma.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
