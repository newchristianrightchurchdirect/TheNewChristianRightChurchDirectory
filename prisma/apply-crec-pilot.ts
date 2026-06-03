import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// CREC pilot research — direct site visits June 2026
// Existing boilerplate notes for CREC: "Generally postmillennial. Classical Christian education emphasis. Paedocommunion common in many congregations."
// We APPEND pastor + distinctives so the boilerplate remains.
const updates: { id: number; append: string }[] = [
  {
    id: 22, // Christ Church Spokane
    append: ' Pastor Kenton Spratt. Self-described "sunny Calvinism" with optimistic eschatology. Covenantal ecclesiology; subscribes to the ecumenical and reformed creeds. Deacon: Spencer Ansett.',
  },
  {
    id: 23, // Reformation Covenant Church, Oregon City OR
    append: ' Pastor Bo Cogbill. Elders: Gary Barnard, Roger Payne, Michael Lortz, Matt Dau, Brad Hangartner. Emphasis on liturgical worship (five-fold structure), classical Christian education, and family-centered ministry.',
  },
  {
    id: 26, // Holy Trinity Reformed, Concord NC
    append: ' Pastor Brian Phillips. Elders: Marshall Joiner, Wade Choate.',
  },
  {
    id: 27, // Christ the King, Greenville SC
    append: ' Pastors: Rev. Michael Hansen, Rev. Caleb Levi. Ruling Elder: Steve Roderer. Part of the CREC Athanasius Presbytery.',
  },
  {
    id: 28, // Providence Church Lynchburg, VA
    append: ' Pastor Virgil Hurt. Associate Pastors: Rick Davis, Jody Simmons. Elders: Jason Biette, David Cooper, Kyle Harris, Dan Tuckwiller.',
  },
  {
    id: 29, // Trinity Church Kirkland, WA
    append: ' Pastor Dave Hatcher. Associate Pastor: Tyler Hatcher. Elders: Brett Baker, Eric Letsche, Jeff Zahller. Five-elder session plus board of deacons. Psalm-singing, family-integrated worship; practices paedocommunion.',
  },
  // id 21 Trinity Church CDA — site has no standard about/leadership/contact; skipped pending manual lookup
]

async function main() {
  for (const u of updates) {
    const c = await prisma.church.findUnique({ where: { id: u.id }, select: { id: true, name: true, theologicalNotes: true } })
    if (!c) { console.log(`  ✗ id ${u.id} not found`); continue }
    const existing = (c.theologicalNotes || '').replace(/\s+$/, '')
    const sep = existing.endsWith('.') || existing === '' ? '' : '.'
    const updated = (existing + sep + u.append).trim()
    await prisma.church.update({ where: { id: u.id }, data: { theologicalNotes: updated } })
    console.log(`  ✓ ${c.name} (id ${u.id})`)
    console.log(`      → "${updated}"\n`)
  }
  await prisma.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
