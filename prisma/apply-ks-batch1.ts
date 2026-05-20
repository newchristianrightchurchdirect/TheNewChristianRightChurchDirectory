import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
const updates: { id: number; data: any }[] = [
  { id: 4, data: { phone: '(785) 273-2811', theologicalNotes: '1689 Federalism. Covenantal, amillennial. No distinction between Israel and the Church. Pastor Samuel Norris.' } },
  { id: 2899, data: { phone: '(785) 233-7255', theologicalNotes: '1689 London Baptist Confession. Covenantal theology rejects dispensationalism. Pastor Mark Langley.' } },
  { id: 3200, data: { theologicalNotes: '1689 London Baptist Confession. Covenantal theology rejects dispensationalism. Pastor Jordan Friesen.' } },
  { id: 3285, data: { phone: '(913) 297-9533', theologicalNotes: 'Postmillennial. Pastor Daniel Spratt.' } },
  { id: 3800, data: { phone: '(785) 754-3406', theologicalNotes: 'Westminster Standards. Covenanter heritage. Exclusive psalmody (a cappella worship). Amillennial. Pastor Matthew Sexton.' } },
  { id: 3801, data: { theologicalNotes: 'Westminster Standards. Covenanter heritage. Exclusive psalmody (a cappella worship). Amillennial. Pastor Brian Wright.' } },
  { id: 3806, data: { theologicalNotes: 'Westminster Standards. Covenanter heritage. Exclusive psalmody (a cappella worship). Amillennial. Pastor Robert Kelbe.' } },
]
async function main() { for (const u of updates) { await p.church.update({ where: { id: u.id }, data: u.data }); console.log(`Updated ${u.id}`) } await p.$disconnect() }
main()
