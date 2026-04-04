import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const church = await prisma.church.findFirst({
    where: { name: { contains: "Harvest Mission" } },
  })
  if (church) {
    console.log(`Found: id=${church.id}, name="${church.name}", stance="${church.zionistStance}", notes="${church.theologicalNotes}"`)
  } else {
    console.log("Not found in live DB")
  }
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
