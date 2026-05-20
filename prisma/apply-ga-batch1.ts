import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
const updates: { id: number; data: any }[] = [
  { id: 775, data: { phone: '(770) 796-0390' } },
]
async function main() {
  for (const u of updates) { await p.church.update({ where: { id: u.id }, data: u.data }); console.log(`Updated ${u.id}`) }
  await p.$disconnect()
}
main()
