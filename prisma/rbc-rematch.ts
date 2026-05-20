import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

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

function norm(s: string) { return s.toLowerCase().replace(/[^a-z0-9]/g, '') }

async function main() {
  const rbcData = require('C:/Users/Dustina/church-directory/rbc_data.json')
  const rbcUS = rbcData.filter((c: any) => c.country === 'United States' && stateNameToAbbrev[c.state])

  // Build DB lookup for ALL churches (not just Reformed Baptist)
  const dbChurches = await prisma.church.findMany({
    select: { id: true, name: true, city: true, state: true, email: true, phone: true, website: true, address: true }
  })
  
  const nameStateLookup = new Map<string, typeof dbChurches[0]>()
  const cityStateLookup = new Map<string, typeof dbChurches[0][]>()
  for (const c of dbChurches) {
    nameStateLookup.set(norm(c.name) + '_' + c.state, c)
    const ck = norm(c.city) + '_' + c.state
    if (!cityStateLookup.has(ck)) cityStateLookup.set(ck, [])
    cityStateLookup.get(ck)!.push(c)
  }

  let emailsAdded = 0, phonesAdded = 0, websitesAdded = 0, matched = 0, unmatched = 0

  for (const rbc of rbcUS) {
    const st = stateNameToAbbrev[rbc.state]
    const key = norm(rbc.title) + '_' + st
    let dbC = nameStateLookup.get(key)
    
    // Fuzzy match by city
    if (!dbC && rbc.city) {
      const ck = norm(rbc.city) + '_' + st
      const candidates = cityStateLookup.get(ck) || []
      const srcNorm = norm(rbc.title)
      dbC = candidates.find(c => {
        const dbNorm = norm(c.name)
        return dbNorm.includes(srcNorm) || srcNorm.includes(dbNorm)
      })
    }
    
    // Try name variants
    if (!dbC) {
      const variants = [
        rbc.title + ' Church', rbc.title.replace(/ Church$/, ''),
        rbc.title.replace(/ Baptist Church$/, ''), rbc.title.replace(/ Reformed Baptist Church$/, ''),
      ]
      for (const v of variants) {
        const vk = norm(v) + '_' + st
        if (nameStateLookup.has(vk)) { dbC = nameStateLookup.get(vk); break }
      }
    }

    if (!dbC) { unmatched++; continue }
    matched++

    const updates: any = {}
    if (rbc.email && rbc.email.includes('@') && !dbC.email) {
      updates.email = rbc.email
      emailsAdded++
    }
    if (rbc.phone && rbc.phone.length >= 10 && !dbC.phone) {
      updates.phone = rbc.phone
      phonesAdded++
    }
    if (rbc.website && !dbC.website) {
      const url = rbc.website.startsWith('http') ? rbc.website : 'https://' + rbc.website
      updates.website = url
      websitesAdded++
    }

    if (Object.keys(updates).length > 0) {
      await prisma.church.update({ where: { id: dbC.id }, data: updates })
      // Update local cache
      Object.assign(dbC, updates)
    }
  }

  console.log('=== RBC Re-match ===')
  console.log(`Matched: ${matched} | Unmatched: ${unmatched}`)
  console.log(`Emails: +${emailsAdded} | Phones: +${phonesAdded} | Websites: +${websitesAdded}`)
  
  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
