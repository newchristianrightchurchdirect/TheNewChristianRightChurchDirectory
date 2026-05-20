import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
const updates: { id: number; data: any }[] = [
  { id: 217, data: { phone: "(208) 423-1114" } },
  { id: 2956, data: { theologicalNotes: "1689 London Baptist Confession. Covenantal theology rejects dispensationalism. Pastor Eric Botzet." } },
  { id: 3058, data: { theologicalNotes: "1689 London Baptist Confession. Covenantal theology rejects dispensationalism. Pastor Rick Stoltenburg.", phone: "(208) 490-3669" } },
  { id: 3277, data: { phone: "(208) 342-9141" } },
]
async function main() { for (const u of updates) { await p.church.update({ where: { id: u.id }, data: u.data }); console.log(`Updated ${u.id}`) } await p.$disconnect() }
main()
