import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const updates: any[] = [
  // PA Batch 1 - 9 churches (ID 24071 skipped, address not found)
  { id: 24072, address: "229 Dutch Ridge Road", zip: "16117", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Ellwood City, PA." },
  { id: 24073, address: "2483 Baltimore Pike", zip: "19363", theologicalNotes: "PCA. Senior Pastor Dr. Mark Mathews. Westminster Standards.", description: "A PCA congregation in Oxford, PA." },
  { id: 24074, address: "2960 Church Rd", zip: "19038", theologicalNotes: "PCA. Meets at Westminster Seminary's Van Til Hall. Westminster Standards.", description: "A PCA congregation meeting in Glenside, PA (Philadelphia area)." },
  { id: 24075, address: "901 Washington Street", zip: "18042", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Easton, PA." },
  { id: 24076, address: "405 Easton Road", zip: "19090", theologicalNotes: "PCA. Pastor Rev. Angel Gomez. Westminster Standards.", description: "A PCA congregation in Willow Grove, PA." },
  { id: 24077, address: "260 Maus Dr", zip: "15642", theologicalNotes: "PCA. Pastor Aaron Garber. Westminster Standards.", description: "A PCA congregation in North Huntingdon, PA." },
  { id: 24078, address: "14 Westminster Drive", zip: "17013", theologicalNotes: "PCA. Senior Pastor Matt Purdy. Westminster Standards.", description: "A PCA congregation in Carlisle, PA." },
  { id: 24079, address: "625 Barclay Hill Road", zip: "15009", theologicalNotes: "PCA. Pastor Thomas J. Stein Jr. Westminster Standards.", description: "A PCA congregation in Beaver, PA." },
  { id: 24080, address: "7507 Tookany Creek Parkway", zip: "19012", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Cheltenham, PA." },
]

async function main() {
  let count = 0
  for (const update of updates) {
    const { id, ...data } = update
    try {
      await prisma.church.update({ where: { id }, data })
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
