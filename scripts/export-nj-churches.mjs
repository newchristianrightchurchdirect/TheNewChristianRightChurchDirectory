/**
 * Read-only export of every New Jersey church, for the Garden State
 * Abolitionists city-page research pass. Writes JSON to stdout's sibling file
 * so the research can run against live data rather than a stale Downloads dump.
 */
import { PrismaClient } from '@prisma/client'
import { writeFileSync } from 'node:fs'

const prisma = new PrismaClient()

const churches = await prisma.church.findMany({
  where: { state: 'NJ' },
  orderBy: [{ city: 'asc' }, { name: 'asc' }],
})

const out = churches.map(c => ({
  id: c.id,
  name: c.name,
  denomination: c.denomination,
  address: c.address,
  city: c.city,
  zip: c.zip,
  latitude: c.latitude,
  longitude: c.longitude,
  website: c.website,
  phone: c.phone,
  email: c.email,
  leadership: c.leadership,
  abolitionStance: c.abolitionStance,
  culturalEngagement: c.culturalEngagement ?? null,
  christianNationalism: c.christianNationalism,
  eschatology: c.eschatology,
  theonomy: c.theonomy,
  socialJusticeStance: c.socialJusticeStance,
  stanceBasis: c.stanceBasis,
  recordFlag: c.recordFlag,
  researchStatus: c.researchStatus,
  researchNote: c.researchNote,
  theologicalNotes: c.theologicalNotes,
  sourceUrls: c.sourceUrls,
  lastResearchedAt: c.lastResearchedAt,
  approved: c.approved,
}))

writeFileSync(process.argv[2] || 'nj-churches.json', JSON.stringify(out, null, 1))

const tally = (f) => out.reduce((a, c) => (a[c[f] ?? 'null'] = (a[c[f] ?? 'null'] || 0) + 1, a), {})
console.log(`NJ churches: ${out.length}`)
console.log('abolitionStance:', tally('abolitionStance'))
console.log('stanceBasis:', tally('stanceBasis'))
console.log('recordFlag:', tally('recordFlag'))
console.log('researchStatus:', tally('researchStatus'))
console.log('has website:', out.filter(c => c.website).length)
console.log('has leadership:', out.filter(c => c.leadership).length)

await prisma.$disconnect()
