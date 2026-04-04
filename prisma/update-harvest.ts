import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.church.update({
    where: { id: 25198 },
    data: {
      theologicalNotes: "1689 London Baptist Confession. Covenantal theology rejects dispensationalism. Pastor T. Russell Hunter, founder of Abolitionists Rising (formerly Free the States) and Abolish Human Abortion. Key figure in the abortion abolitionist movement.",
    },
  })
  console.log("Updated Harvest Mission Baptist Church with T. Russell Hunter info")
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
