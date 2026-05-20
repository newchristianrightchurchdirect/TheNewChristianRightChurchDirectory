import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const results: { id: number, pastor: string }[] = [
  { id: 22641, pastor: 'Russ Atmore' },
  { id: 22822, pastor: '' }, // R.C. Sproul founded but need current - skip
  { id: 23248, pastor: 'Jonathan Winfree' },
  { id: 24849, pastor: 'Geoff Downey' },
  { id: 25086, pastor: 'Michael Hildebrandt' },
  { id: 25229, pastor: 'Arxaphad Braithwaite' },
  { id: 25305, pastor: 'Don Lajoie' },
  { id: 25355, pastor: 'Jose Abella' },
  { id: 25383, pastor: 'Eric Ayala' },
  { id: 25402, pastor: 'Josh Brown' },
  { id: 25407, pastor: 'Rob Hess' },
  { id: 25412, pastor: 'Dan Mastrapa' },
  { id: 25413, pastor: 'Andrew Coleman' },
  { id: 25433, pastor: 'Shane Waters' },
  { id: 25472, pastor: 'Jon Mark Olesky' },
  { id: 25474, pastor: 'Kurt Gebhards' },
  { id: 25531, pastor: 'Daniel Alvarez Lobaina' },
  { id: 25554, pastor: 'Jonny White' },
  { id: 25597, pastor: 'Jeremy Tatom' },
  { id: 25602, pastor: 'Edgar Nazario' },
  { id: 25666, pastor: 'Braydon Hotchkiss' },
  { id: 25686, pastor: 'Ian White' },
  { id: 25703, pastor: 'Luis Leon' },
  { id: 25722, pastor: 'Matt Simpson' },
  { id: 25740, pastor: 'Grant Costanzo' },
  { id: 25744, pastor: 'Micah Sandowich' },
  { id: 25769, pastor: 'Russell Taylor' },
]

async function main() {
  let updated = 0
  for (const r of results) {
    if (!r.pastor || !r.pastor.includes(' ')) continue
    const c = await prisma.church.findUnique({ where: { id: r.id }, select: { theologicalNotes: true } })
    if (!c) continue
    if (c.theologicalNotes?.includes('Pastor')) continue
    let notes = c.theologicalNotes || ''
    if (notes && !notes.endsWith('.')) notes += '.'
    notes = notes ? notes + ` Pastor ${r.pastor}.` : `Pastor ${r.pastor}.`
    await prisma.church.update({ where: { id: r.id }, data: { theologicalNotes: notes } })
    updated++
    console.log(`  ${r.id}: Pastor ${r.pastor}`)
  }
  console.log(`\nFL batch 4: updated ${updated} churches`)

  // FL report
  const flTotal = await prisma.church.count({ where: { state: 'FL' } })
  const flEmail = await prisma.church.count({ where: { state: 'FL', email: { not: null } } })
  const flPhone = await prisma.church.count({ where: { state: 'FL', phone: { not: null } } })
  const flWeb = await prisma.church.count({ where: { state: 'FL', website: { startsWith: 'http' } } })
  const flPastor = await prisma.church.count({ where: { state: 'FL', theologicalNotes: { contains: 'Pastor' } } })
  console.log(`\n=== FL REPORT ===`)
  console.log(`Total: ${flTotal} | Email: ${flEmail} | Phone: ${flPhone} | Website: ${flWeb} | Pastor: ${flPastor}`)

  const total = await prisma.church.count()
  const hasEmail = await prisma.church.count({ where: { email: { not: null } } })
  const hasPhone = await prisma.church.count({ where: { phone: { not: null } } })
  const hasWebsite = await prisma.church.count({ where: { website: { startsWith: 'http' } } })
  const hasPastor = await prisma.church.count({ where: { theologicalNotes: { contains: 'Pastor' } } })
  console.log(`\n=== OVERALL ===`)
  console.log(`Total: ${total} | Email: ${hasEmail} | Phone: ${hasPhone} | Website: ${hasWebsite} | Pastor: ${hasPastor}`)
  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
