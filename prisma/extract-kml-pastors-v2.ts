import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const prisma = new PrismaClient()

function norm(s: string) { return s.toLowerCase().replace(/[^a-z0-9]/g, '') }

function cleanPastor(raw: string): string {
  return raw.replace(/^Rev\.?\s*/i, '').replace(/^Dr\.?\s*/i, '').replace(/^Pastor\s*/i, '')
    .replace(/,\s*(Jr|Sr|II|III|IV|V)\.?$/i, ' $1').trim()
}

async function main() {
  const kml = fs.readFileSync('C:/Users/Dustina/church-directory/gmap_data.kml', 'utf-8')
  
  // Parse Placemarks: extract name + description pairs
  const placemarks = kml.match(/<Placemark>[\s\S]*?<\/Placemark>/gi) || []
  console.log('Total placemarks:', placemarks.length)
  
  const pastorMap = new Map<string, string>() // norm(name) -> pastor
  const emailMap = new Map<string, string>()
  const phoneMap = new Map<string, string>()
  const addressMap = new Map<string, string>()
  
  for (const pm of placemarks) {
    const nameMatch = pm.match(/<name>(.*?)<\/name>/i)
    if (!nameMatch) continue
    const churchName = nameMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim()
    const key = norm(churchName)
    
    // Get description content
    const descMatch = pm.match(/<description>([\s\S]*?)<\/description>/i)
    if (!descMatch) continue
    let desc = descMatch[1].replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '')
    
    // Strip HTML tags but keep text
    desc = desc.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, ' ')
    
    // Extract pastor
    const pastorPatterns = [
      /(?:Pastor|Senior Pastor|Lead Pastor|Teaching Elder)[:\s]+([A-Z][a-z]+(?:\s+[A-Z]\.?\s*)?[A-Z][a-z]+(?:\s+(?:Jr|Sr|II|III|IV)\.?)?)/,
      /(?:Rev(?:erend)?\.?\s+)([A-Z][a-z]+(?:\s+[A-Z]\.?\s*)?[A-Z][a-z]+(?:\s+(?:Jr|Sr|II|III|IV)\.?)?)/,
      /(?:Minister|Pasteur)[:\s]+([A-Z][a-z]+(?:\s+[A-Z]\.?\s*)?[A-Z][a-z]+)/,
      // "pastor name" field in KML data
      /pastor\s+name[:\s]+([A-Z][a-z]+(?:\s+[A-Z]\.?\s*)?[A-Z][a-z]+)/i,
    ]
    
    for (const p of pastorPatterns) {
      const m = desc.match(p)
      if (m) {
        const name = cleanPastor(m[1])
        if (name.length >= 3 && name.length <= 40 && /[a-z]/.test(name)) {
          pastorMap.set(key, name)
          break
        }
      }
    }
    
    // Extract email
    const emailMatch = desc.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/)
    if (emailMatch) emailMap.set(key, emailMatch[1])
    
    // Extract phone
    const phoneMatch = desc.match(/(\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4})/)
    if (phoneMatch) phoneMap.set(key, phoneMatch[1])
    
    // Extract street address
    const addrMatch = desc.match(/(\d+\s+[A-Za-z0-9\s.]+(?:St|Street|Ave|Avenue|Blvd|Boulevard|Dr|Drive|Rd|Road|Ln|Lane|Way|Ct|Court|Pl|Place|Pkwy|Hwy|Highway|Pike)[.\s,])/i)
    if (addrMatch) addressMap.set(key, addrMatch[1].trim().replace(/[,.]$/, ''))
  }
  
  console.log(`Extracted: ${pastorMap.size} pastors, ${emailMap.size} emails, ${phoneMap.size} phones, ${addressMap.size} addresses`)
  
  // Match to DB
  const churches = await prisma.church.findMany({
    select: { id: true, name: true, state: true, theologicalNotes: true, email: true, phone: true, address: true }
  })
  
  let pastorsAdded = 0, emailsAdded = 0, phonesAdded = 0, addressesAdded = 0
  
  for (const c of churches) {
    const key = norm(c.name)
    const updates: any = {}
    
    // Add pastor if missing
    const pastor = pastorMap.get(key)
    if (pastor && (!c.theologicalNotes || !c.theologicalNotes.includes('Pastor'))) {
      let notes = c.theologicalNotes || ''
      if (notes && !notes.endsWith('.')) notes += '.'
      notes = notes ? notes + ` Pastor ${pastor}.` : `Pastor ${pastor}.`
      updates.theologicalNotes = notes
      pastorsAdded++
    }
    
    // Add email if missing
    const email = emailMap.get(key)
    if (email && !c.email) {
      updates.email = email
      emailsAdded++
    }
    
    // Add phone if missing
    const phone = phoneMap.get(key)
    if (phone && !c.phone) {
      updates.phone = phone
      phonesAdded++
    }
    
    // Add address if current address is just a city name (no street number)
    const addr = addressMap.get(key)
    if (addr && c.address && !/\d/.test(c.address)) {
      updates.address = addr
      addressesAdded++
    }
    
    if (Object.keys(updates).length > 0) {
      await prisma.church.update({ where: { id: c.id }, data: updates })
    }
  }
  
  console.log(`\n=== Updated ===`)
  console.log(`Pastors: +${pastorsAdded}`)
  console.log(`Emails: +${emailsAdded}`)
  console.log(`Phones: +${phonesAdded}`)
  console.log(`Addresses: +${addressesAdded}`)
  
  // Final stats
  const total = await prisma.church.count()
  const withPastor = await prisma.church.count({ where: { theologicalNotes: { contains: 'Pastor' } } })
  const withEmail = await prisma.church.count({ where: { email: { not: '' } } })
  const withPhone = await prisma.church.count({ where: { phone: { not: '' } } })
  console.log(`\n=== DB Stats ===`)
  console.log(`Total: ${total}`)
  console.log(`With pastor: ${withPastor} (${Math.round(withPastor/total*100)}%)`)
  console.log(`With email: ${withEmail}`)
  console.log(`With phone: ${withPhone}`)
  
  await prisma.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
