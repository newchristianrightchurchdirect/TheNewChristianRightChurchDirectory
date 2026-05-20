import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const updates: any[] = [
  // === FL Batch 1 ===
  { id: 23125, address: "10201 Bahia Dr", zip: "33189", theologicalNotes: "PCA. Korean-American congregation (Areumdown Presbyterian Korean Church). Westminster Standards.", description: "A Korean PCA congregation in Miami, FL." },
  { id: 23126, address: "642 N Auburn Rd", zip: "34292", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Venice, FL on Auburn Road." },
  { id: 23127, address: "26911 S Bay Dr", zip: "34134", theologicalNotes: "PCA. Pastor Patrick Womack. Westminster Standards.", description: "A PCA congregation in Bonita Springs, FL." },
  { id: 23128, address: "9515 Boynton Beach Blvd", zip: "33472", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Boynton Beach, FL." },
  { id: 23129, address: "1200 South Monroe Street", zip: "32301", theologicalNotes: "PCA. Pastor Jonathan Robson. Westminster Standards.", description: "A PCA congregation in Tallahassee, FL." },
  { id: 23130, address: "3318 E Silver Springs Blvd", zip: "34470", theologicalNotes: "PCA. Pastor Mike Gordon. Westminster Standards.", description: "A PCA congregation in Ocala, FL." },
  { id: 23131, address: "425 Main Street", zip: "32324", theologicalNotes: "PCA. Pastor Robert S. Hayes. Westminster Standards.", description: "A PCA congregation in Chattahoochee, FL." },
  { id: 23132, address: "12000 Alumni Dr", zip: "32257", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Jacksonville, FL (East campus)." },
  { id: 23133, address: "9791 Old Saint Augustine Rd", zip: "32257", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Jacksonville, FL (Mandarin campus)." },
  { id: 23134, address: "1041 Edgewood Ave S", zip: "32205", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Jacksonville, FL (Intown)." },

  // === GA Batch 1 ===
  { id: 23285, address: "650 Rowland Road", zip: "30083", theologicalNotes: "PCA. Pastor Rev. Dr. Aung Lai Matu. Chin/Burmese-American congregation. Westminster Standards.", description: "A Chin/Burmese-American PCA congregation in Stone Mountain, GA." },
  { id: 23286, zip: "30039", theologicalNotes: "PCA. Korean-American congregation. Westminster Standards.", description: "A Korean PCA congregation in Snellville, GA." },
  { id: 23287, zip: "30047", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Lilburn, GA." },
  { id: 23288, address: "1255 Collier Rd NW", zip: "30318", theologicalNotes: "PCA. Pastor Walter Henegar. Westminster Standards.", description: "A PCA congregation on the westside of Atlanta, GA." },
  { id: 23289, address: "4522 Oakley Pirkle Road", zip: "30907", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Martinez, GA (Augusta area)." },
  { id: 23290, address: "2100 Highway 77 S", zip: "30642", theologicalNotes: "PCA. Pastoral position vacant (nominating committee in process). Westminster Standards.", description: "A PCA congregation in Greensboro, GA." },
  { id: 23291, address: "4484 Peachtree Road NE", zip: "30319", theologicalNotes: "PCA. Pastor Zachary Bradley. Westminster Standards.", description: "A PCA congregation in the Brookhaven neighborhood of Atlanta, GA." },
  { id: 23292, address: "1551 Oak Rd", zip: "30078", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Snellville, GA." },
  { id: 23293, address: "101 Carriage Lane", zip: "30269", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Peachtree City, GA." },
  { id: 23294, address: "2320 Glynmoore Dr", zip: "30043", theologicalNotes: "PCA. Korean-American congregation. Westminster Standards.", description: "A Korean PCA congregation in Lawrenceville, GA." },

  // === CA Batch 1 ===
  { id: 22970, address: "9312 Alondra Blvd", zip: "90706", theologicalNotes: "PCA. Westminster Standards. Church status may be unclear.", description: "A PCA congregation in Bellflower, CA." },
  { id: 22971, address: "2A Liberty", zip: "92656", theologicalNotes: "PCA. Pastor Tom G. Gastil. Westminster Standards.", description: "A PCA congregation in Aliso Viejo, CA." },
  { id: 22972, address: "804 S Lincoln Ave", zip: "92882", theologicalNotes: "PCA. Korean-American congregation. Westminster Standards.", description: "A Korean PCA congregation in Corona, CA." },
  { id: 22973, address: "2225 West Victoria Drive", zip: "91901", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Alpine, CA." },
  { id: 22974, address: "14435 Mercado Avenue", zip: "90638", theologicalNotes: "PCA. Pastor Philip Song. Korean-American congregation. Westminster Standards.", description: "A Korean PCA congregation in La Mirada, CA." },
  { id: 22975, address: "5746 Marconi Ave", zip: "95608", theologicalNotes: "PCA. Pastor Thomas D. Park. Westminster Standards.", description: "A PCA congregation in Carmichael, CA." },
  { id: 22976, address: "6745 Amherst St", zip: "92115", theologicalNotes: "PCA. Pastor Christian Castro. Westminster Standards.", description: "A PCA congregation in San Diego, CA." },
  { id: 22977, address: "510 N Buena Vista St", zip: "91505", theologicalNotes: "PCA. Pastor Bong Ho Choi. Korean-American congregation. Westminster Standards.", description: "A Korean PCA congregation in Burbank, CA." },
  { id: 22978, address: "8381 Katella Ave", zip: "90680", website: "https://www.c4ministry.com", theologicalNotes: "PCA. Korean-American congregation. Westminster Standards.", description: "A Korean PCA congregation in Stanton, CA." },
  { id: 22979, address: "610 N Glendale Ave", zip: "91206", theologicalNotes: "PCA. Pastor Philip George. Westminster Standards. Note: church building may now be occupied by New Creation L.A. Church.", description: "A PCA congregation in Glendale, CA." },

  // === NC Batch 1 ===
  { id: 23811, address: "5319 Fernhill Dr", zip: "28217", theologicalNotes: "PCA. Pastor Rev. Joon Won Kang. Westminster Standards.", description: "A PCA mission church in Charlotte, NC." },
  { id: 23812, address: "215 Cherry St", zip: "28901", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Andrews, NC." },
  { id: 23813, address: "2306 Old Smithfield Rd", zip: "27530", website: "https://antiochpres-goldsboro.com", theologicalNotes: "PCA. Pastor Kelley Buffaloe. Westminster Standards.", description: "A PCA congregation in Goldsboro, NC." },
  { id: 23814, address: "2215 Hendersonville Rd", zip: "28704", theologicalNotes: "PCA. Pastor Wes Strebeck. Westminster Standards.", description: "A PCA congregation in Arden, NC." },
  { id: 23815, address: "2145 Back Creek Church Rd", zip: "28125", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Mount Ulla, NC." },
  { id: 23816, address: "6520 Ray Rd", zip: "27613", theologicalNotes: "PCA. Pastor Rev. Nathanael James Wilks. Westminster Standards.", description: "A PCA congregation in Raleigh, NC." },
  { id: 23817, address: "406 Renee Ford Rd", zip: "28097", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Locust, NC." },
  // 23818 skipped - Charlotte Presbyterian Church not found as a real congregation
  { id: 22719, address: "P.O. Box 955", zip: "28164", theologicalNotes: "1689 London Baptist Confession. Covenant theology, Reformed soteriology. Pastor Joshua Huggins. Rejects dispensationalism.", description: "A confessional Reformed Baptist congregation in Stanley, NC." },
  { id: 22760, address: "600 Holly Ave", zip: "27101", theologicalNotes: "Independent Presbyterian. Pastors Ben Milner and Austin Pfeiffer. Anti-Zionist stance.", description: "An independent Presbyterian congregation in Winston-Salem, NC." },
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
