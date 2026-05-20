import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()

const updates: { id: number; data: any }[] = [
  { id: 2740, data: { theologicalNotes: '1689 London Baptist Confession. Covenantal theology rejects dispensationalism. Pastor Bruce DeVoe.' } },
  { id: 2984, data: { phone: '(720) 635-8096', theologicalNotes: '1689 London Baptist Confession. Covenantal theology rejects dispensationalism. Pastor Mitch Giannatala.' } },
  { id: 2878, data: { phone: '(970) 641-1091', theologicalNotes: '1689 London Baptist Confession. Covenantal theology rejects dispensationalism. Pastor RT Hull.' } },
  { id: 3073, data: { phone: '(720) 635-8096', theologicalNotes: '1689 London Baptist Confession. Covenantal theology rejects dispensationalism. Pastor Jason Edwards.' } },
  { id: 3266, data: { phone: '(303) 321-3291', zionistStance: 'no' } },
  { id: 3267, data: { phone: '(303) 321-3291' } },
  { id: 3268, data: { theologicalNotes: 'Postmillennial. Pastor Brian Brown.' } },
  { id: 3269, data: { phone: '(970) 216-8992' } },
  { id: 3336, data: { phone: '(303) 828-3581', city: 'Westminster', theologicalNotes: 'Three Forms of Unity (Belgic Confession, Heidelberg Catechism, Canons of Dort). Covenant theology. Infant baptism. Amillennial.' } },
  { id: 3669, data: { phone: '(719) 338-1080', theologicalNotes: 'Three Forms of Unity (Belgic Confession, Heidelberg Catechism, Canons of Dort). Covenant theology. Infant baptism. Amillennial. Pastor Jason Ryce.' } },
]

async function main() {
  for (const u of updates) {
    await p.church.update({ where: { id: u.id }, data: u.data })
    console.log(`Updated ${u.id}`)
  }
  await p.$disconnect()
}
main()
