import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
const prisma = new PrismaClient()

function norm(s: string) { return s.toLowerCase().replace(/[^a-z0-9]/g, '') }
function cleanPastor(raw: string): string {
  return raw.replace(/^Rev\.?\s*/i, '').replace(/^Dr\.?\s*/i, '').replace(/^Pastor\s*/i, '')
    .replace(/,\s*(Jr|Sr|II|III|IV|V)\.?$/i, ' $1').trim()
}

const stateNameToAbbrev: Record<string, string> = {
  'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
  'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
  'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
  'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
  'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
  'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
  'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
  'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
  'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
  'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY',
  'District of Columbia': 'DC',
}

async function main() {
  const kml = fs.readFileSync('C:/Users/Dustina/church-directory/gmap_data.kml', 'utf-8')
  const placemarks = kml.match(/<Placemark>[\s\S]*?<\/Placemark>/gi) || []
  
  // Build a more detailed map: include city info from description for fuzzy matching
  type ChurchData = { name: string, pastor?: string, email?: string, phone?: string, address?: string, city?: string, state?: string }
  const kmlChurches: ChurchData[] = []
  
  for (const pm of placemarks) {
    const nameMatch = pm.match(/<name>(.*?)<\/name>/i)
    if (!nameMatch) continue
    const churchName = nameMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim()
    
    const descMatch = pm.match(/<description>([\s\S]*?)<\/description>/i)
    if (!descMatch) continue
    let desc = descMatch[1].replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '').replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, ' ')
    
    const entry: ChurchData = { name: churchName }
    
    // Pastor
    for (const p of [
      /(?:Pastor|Senior Pastor|Lead Pastor|Teaching Elder)[:\s]+([A-Z][a-z]+(?:\s+[A-Z]\.?\s*)?[A-Z][a-z]+(?:\s+(?:Jr|Sr|II|III|IV)\.?)?)/,
      /(?:Rev(?:erend)?\.?\s+)([A-Z][a-z]+(?:\s+[A-Z]\.?\s*)?[A-Z][a-z]+(?:\s+(?:Jr|Sr|II|III|IV)\.?)?)/,
      /pastor\s+name[:\s]+([A-Z][a-z]+(?:\s+[A-Z]\.?\s*)?[A-Z][a-z]+)/i,
    ]) {
      const m = desc.match(p)
      if (m) { entry.pastor = cleanPastor(m[1]); break }
    }
    
    // State from description (e.g. "City, ST 12345")
    const stateMatch = desc.match(/,\s*([A-Z]{2})\s+\d{5}/)
    if (stateMatch) entry.state = stateMatch[1]
    
    // City
    const cityMatch = desc.match(/([A-Za-z\s.'-]+),\s*[A-Z]{2}\s+\d{5}/)
    if (cityMatch) entry.city = cityMatch[1].trim()
    
    // Email
    const emailMatch = desc.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/)
    if (emailMatch) entry.email = emailMatch[1]
    
    // Phone
    const phoneMatch = desc.match(/(\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4})/)
    if (phoneMatch) entry.phone = phoneMatch[1]
    
    // Address
    const addrMatch = desc.match(/(\d+\s+[A-Za-z0-9\s.]+(?:St|Street|Ave|Avenue|Blvd|Dr|Drive|Rd|Road|Ln|Lane|Way|Ct|Court|Pl|Place|Pkwy|Hwy|Pike)[.\s,])/i)
    if (addrMatch) entry.address = addrMatch[1].trim().replace(/[,.]$/, '')
    
    kmlChurches.push(entry)
  }
  
  const withPastor = kmlChurches.filter(c => c.pastor)
  console.log(`KML: ${kmlChurches.length} churches, ${withPastor.length} with pastor`)
  
  // Get DB churches without pastor
  const dbChurches = await prisma.church.findMany({
    where: {
      OR: [
        { theologicalNotes: null },
        { AND: [
          { theologicalNotes: { not: null } },
          { NOT: { theologicalNotes: { contains: 'Pastor' } } }
        ]}
      ]
    },
    select: { id: true, name: true, city: true, state: true, theologicalNotes: true, email: true, phone: true, address: true }
  })
  
  console.log(`DB churches needing pastor: ${dbChurches.length}`)
  
  // Build lookup maps for fuzzy matching
  const cityStateLookup = new Map<string, ChurchData[]>()
  for (const c of withPastor) {
    if (c.city && c.state) {
      const key = norm(c.city) + '_' + c.state
      if (!cityStateLookup.has(key)) cityStateLookup.set(key, [])
      cityStateLookup.get(key)!.push(c)
    }
  }
  
  let pastorsAdded = 0
  for (const dbC of dbChurches) {
    // Try fuzzy city+state match
    const ck = norm(dbC.city) + '_' + dbC.state
    const candidates = cityStateLookup.get(ck) || []
    for (const kmlC of candidates) {
      const dn = norm(dbC.name), kn = norm(kmlC.name)
      if (dn.includes(kn) || kn.includes(dn) || 
          dn.replace(/church|presbyterian|reformed|baptist/g, '') === kn.replace(/church|presbyterian|reformed|baptist/g, '')) {
        if (kmlC.pastor) {
          let notes = dbC.theologicalNotes || ''
          if (notes && !notes.endsWith('.')) notes += '.'
          notes = notes ? notes + ` Pastor ${kmlC.pastor}.` : `Pastor ${kmlC.pastor}.`
          await prisma.church.update({ where: { id: dbC.id }, data: { theologicalNotes: notes } })
          pastorsAdded++
          break
        }
      }
    }
  }
  
  console.log(`Fuzzy matched pastors: +${pastorsAdded}`)
  
  const totalPastors = await prisma.church.count({ where: { theologicalNotes: { contains: 'Pastor' } } })
  const totalEmails = await prisma.church.count({ where: { email: { not: '' } } })
  const totalPhones = await prisma.church.count({ where: { phone: { not: '' } } })
  const total = await prisma.church.count()
  console.log(`\nFinal: ${totalPastors}/${total} pastors (${Math.round(totalPastors/total*100)}%), ${totalEmails} emails, ${totalPhones} phones`)
  
  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
