import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const updates = [
  { id: 25797, address: "18911 E San Tan Blvd", zip: "85142", website: "https://gracereformedfamilychurch.org", theologicalNotes: "Non-Denominational. Also known as Grace Reformed Family Church. Fellowship of Independent Reformed Evangelicals (FIRE).", description: "A Reformed non-denominational congregation in Queen Creek, AZ, part of the FIRE network." },
  { id: 22956, address: "16415 N 90th St", zip: "85260", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Scottsdale, AZ." },
  { id: 22961, address: "4950 E Camino Segundo", zip: "85650", theologicalNotes: "PCA. Senior Pastor Rev. Judson Marvel (installed May 2023). Westminster Standards.", description: "A PCA congregation in Sierra Vista, AZ." },
  { id: 22969, address: "2230 E Choctaw Dr", zip: "85650", website: "https://svukpc.com", theologicalNotes: "PCA. Pastor Rev. Dr. James S. Park. Also known as Sierra Vista United Presbyterian Church. Westminster Standards.", description: "A PCA congregation in Sierra Vista, AZ." },
  { id: 22957, address: "13601 W Aleppo Dr", zip: "85375", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Sun City West, AZ." },
  { id: 22968, address: "8445 E Tanque Verde Rd", zip: "85749", theologicalNotes: "PCA. Pastor Philip S. Kruis. Associate Pastor Luke Evans. Westminster Standards.", description: "A PCA congregation in Tucson, AZ on Tanque Verde Road." },
  { id: 22954, address: "2150 E Orange Grove Rd", zip: "85718", theologicalNotes: "PCA. Pastor Paul Utnage. Westminster Standards.", description: "A PCA congregation in Tucson, AZ." },
  { id: 22959, address: "1555 W Overton Rd", zip: "85704", theologicalNotes: "PCA. First PCA church in Tucson. In pastoral transition as of 2025. Westminster Standards.", description: "The first PCA congregation planted in Tucson, AZ." },
  { id: 22962, address: "7730 N Cortaro Rd, Suite 105", zip: "85743", phone: "(520) 222-9709", theologicalNotes: "PCA. In pastor search. Elders: Tim Sinclair, Andrew Haines, Robert Kim, James Lee. Westminster Standards.", description: "A PCA congregation in northwest Tucson, AZ." },
]

async function main() {
  let count = 0
  for (const update of updates) {
    const { id, ...data } = update
    try {
      await prisma.church.update({ where: { id }, data: data as any })
      count++
      console.log(`Updated ${id}`)
    } catch (e: any) {
      console.error(`Failed ${id}: ${e.message}`)
    }
  }
  console.log(`\nUpdated ${count} churches`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
