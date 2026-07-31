import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
const FAMILY: Array<[string, RegExp]> = [
  ['Baptist', /baptist/i],
  ['Assembly of God / Pentecostal', /assembly of god|assemblies|foursquare|pentecost/i],
  ['Reformed / Presbyterian', /reformed|presbyterian|\bPCA\b|\bEPC\b|covenant/i],
  ['Bible Church', /bible/i],
  ['Community / Fellowship', /community|fellowship/i],
]
async function main() {
  const rows = await p.church.findMany({
    where: { recordFlag: { contains: 'signature_only' } },
    select: { id: true, name: true, city: true, state: true, leadership: true },
    orderBy: [{ state: 'asc' }, { city: 'asc' }],
  })
  const seen = new Set<number>()
  for (const [label, re] of FAMILY) {
    const g = rows.filter(r => !seen.has(r.id) && re.test(r.name))
    g.forEach(r => seen.add(r.id))
    console.log(`\n### ${label} (${g.length})`)
    g.forEach(r => console.log(`#${r.id}\t${r.name}\t${r.city}, ${r.state}\t${r.leadership || ''}`))
  }
  const rest = rows.filter(r => !seen.has(r.id))
  console.log(`\n### Other (${rest.length})`)
  rest.forEach(r => console.log(`#${r.id}\t${r.name}\t${r.city}, ${r.state}\t${r.leadership || ''}`))
  console.log(`\nTOTAL ${rows.length}`)
  await p.$disconnect()
}
main()
