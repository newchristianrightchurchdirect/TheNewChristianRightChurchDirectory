import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const churches = await prisma.church.findMany({
    select: { id: true, name: true, city: true, state: true, email: true, phone: true, website: true },
    orderBy: { id: 'asc' }
  })

  console.log(`Total churches: ${churches.length}`)
  console.log(`ID range: ${churches[0]?.id} to ${churches[churches.length - 1]?.id}\n`)

  // 1. Phone numbers in email fields
  console.log('=== PHONE NUMBERS IN EMAIL FIELD ===')
  for (const c of churches) {
    if (c.email && /^\d[\d\s\-().]+$/.test(c.email.trim())) {
      console.log(`  ID ${c.id}: email="${c.email}" (${c.name}, ${c.city}, ${c.state})`)
    }
  }

  // 2. Emails that look wrong (no @)
  console.log('\n=== INVALID EMAILS (no @) ===')
  for (const c of churches) {
    if (c.email && !c.email.includes('@')) {
      console.log(`  ID ${c.id}: email="${c.email}" (${c.name}, ${c.city}, ${c.state})`)
    }
  }

  // 3. Duplicate emails
  console.log('\n=== DUPLICATE EMAILS ===')
  const emailMap = new Map<string, { id: number, name: string, city: string, state: string }[]>()
  for (const c of churches) {
    if (c.email) {
      const key = c.email.toLowerCase().trim()
      if (!emailMap.has(key)) emailMap.set(key, [])
      emailMap.get(key)!.push({ id: c.id, name: c.name, city: c.city, state: c.state })
    }
  }
  for (const [email, entries] of emailMap) {
    if (entries.length > 1) {
      console.log(`  "${email}" used by ${entries.length} churches:`)
      for (const e of entries) console.log(`    ID ${e.id}: ${e.name}, ${e.city}, ${e.state}`)
    }
  }

  // 4. Emails in phone fields
  console.log('\n=== EMAILS IN PHONE FIELD ===')
  for (const c of churches) {
    if (c.phone && c.phone.includes('@')) {
      console.log(`  ID ${c.id}: phone="${c.phone}" (${c.name}, ${c.city}, ${c.state})`)
    }
  }

  // 5. Websites that don't start with http
  console.log('\n=== INVALID WEBSITES (no http) ===')
  for (const c of churches) {
    if (c.website && !c.website.startsWith('http')) {
      console.log(`  ID ${c.id}: website="${c.website}" (${c.name}, ${c.city}, ${c.state})`)
    }
  }

  // 6. Phone numbers that look like wrong format
  console.log('\n=== UNUSUAL PHONE FORMATS ===')
  for (const c of churches) {
    if (c.phone && !c.phone.includes('@')) {
      const digits = c.phone.replace(/\D/g, '')
      if (digits.length < 10 || digits.length > 11) {
        console.log(`  ID ${c.id}: phone="${c.phone}" (${digits.length} digits) (${c.name}, ${c.city}, ${c.state})`)
      }
    }
  }

  // 7. Duplicate phones
  console.log('\n=== DUPLICATE PHONES ===')
  const phoneMap = new Map<string, { id: number, name: string, city: string, state: string }[]>()
  for (const c of churches) {
    if (c.phone) {
      const digits = c.phone.replace(/\D/g, '')
      if (digits.length >= 10) {
        const key = digits.slice(-10)
        if (!phoneMap.has(key)) phoneMap.set(key, [])
        phoneMap.get(key)!.push({ id: c.id, name: c.name, city: c.city, state: c.state })
      }
    }
  }
  for (const [phone, entries] of phoneMap) {
    if (entries.length > 1) {
      console.log(`  "${phone}" used by ${entries.length} churches:`)
      for (const e of entries) console.log(`    ID ${e.id}: ${e.name}, ${e.city}, ${e.state}`)
    }
  }

  // 8. Duplicate websites
  console.log('\n=== DUPLICATE WEBSITES ===')
  const webMap = new Map<string, { id: number, name: string, city: string, state: string }[]>()
  for (const c of churches) {
    if (c.website && c.website.startsWith('http')) {
      const key = c.website.toLowerCase().replace(/\/+$/, '').replace(/^https?:\/\/(www\.)?/, '')
      if (!webMap.has(key)) webMap.set(key, [])
      webMap.get(key)!.push({ id: c.id, name: c.name, city: c.city, state: c.state })
    }
  }
  for (const [web, entries] of webMap) {
    if (entries.length > 1) {
      console.log(`  "${web}" used by ${entries.length} churches:`)
      for (const e of entries) console.log(`    ID ${e.id}: ${e.name}, ${e.city}, ${e.state}`)
    }
  }

  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
