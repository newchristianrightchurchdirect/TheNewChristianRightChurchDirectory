import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
p.church.findMany({ where: { id: { in: [26, 23, 27, 28, 29, 22, 21] } }, select: { id: true, name: true, theologicalNotes: true } })
  .then(r => {
    r.forEach(c => console.log(`#${c.id} ${c.name}: ${JSON.stringify((c.theologicalNotes || '').slice(0, 300))}`))
    return p.$disconnect()
  })
