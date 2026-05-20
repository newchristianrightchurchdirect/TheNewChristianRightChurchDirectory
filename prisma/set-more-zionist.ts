import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  // EPC is Presbyterian/covenant theology
  await prisma.church.updateMany({ where: { denomination: 'EPC', zionistStance: 'unknown' }, data: { zionistStance: 'no' } })
  // Church of Christ tends to be amillennial
  await prisma.church.updateMany({ where: { denomination: 'Church of Christ', zionistStance: 'unknown' }, data: { zionistStance: 'no' } })
  // Church of the Nazarene - Wesleyan tradition, generally amillennial
  await prisma.church.updateMany({ where: { denomination: 'Church of the Nazarene', zionistStance: 'unknown' }, data: { zionistStance: 'no' } })
  
  const remaining = await prisma.church.count({ where: { zionistStance: 'unknown' } })
  console.log('Zionist unknown remaining:', remaining)
  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
