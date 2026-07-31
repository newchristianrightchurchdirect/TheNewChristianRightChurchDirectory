import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
// Group the remaining signature_only queue by likely denominational family, so churches bound by
// a common confession can be read against that confession as well as individually.
const FAMILY: Array<[string, RegExp]> = [
  ['Evangelical Free', /evangelical free|e\.?free/i],
  ['Lutheran', /lutheran/i],
  ['Methodist', /methodist|wesleyan/i],
  ['Baptist', /baptist/i],
  ['Assembly of God', /assembly of god|assemblies/i],
  ['Reformed/Presbyterian', /reformed|presbyterian|\bPCA\b|\bEPC\b|covenant church/i],
  ['Bible Church', /bible (church|fellowship)/i],
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
  console.log(`\n### Unclassified (${rest.length})`)
  rest.forEach(r => console.log(`#${r.id}\t${r.name}\t${r.city}, ${r.state}\t${r.leadership || ''}`))
  console.log(`\nTOTAL ${rows.length}`)
  await p.$disconnect()
}
main()
