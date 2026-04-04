import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const newChurches = [
  {
    name: "By the Word Baptist Church",
    denomination: "Reformed Baptist",
    address: "200 W N Woody Rd",
    city: "Azle",
    state: "TX",
    zip: "76020",
    latitude: 32.8951,
    longitude: -97.5461,
    website: "https://bytheword.org",
    phone: "(817) 444-3484",
    zionistStance: "unknown",
    theologicalNotes: "1689 London Baptist Confession. Pastor Jon Speed (Missions & Evangelism), formerly of Christ is King Baptist Church in Syracuse, NY. Abolitionist, co-founding partner of LOOR.tv. Connected to T. Russell Hunter's abolitionist circle.",
    description: "A Reformed Baptist church in Azle, TX committed to expository preaching, evangelism, and abortion ministry.",
    approved: true,
  },
  {
    name: "Rising Sun Church of Christ",
    denomination: "Church of Christ",
    address: "6390 NE Rising Sun Dr",
    city: "Pleasant Hill",
    state: "IA",
    zip: "50327",
    latitude: 41.5878,
    longitude: -93.5196,
    website: "https://www.risingsunchurch.org",
    phone: "(515) 265-7393",
    zionistStance: "unknown",
    theologicalNotes: "Church of Christ (Restorationist). Hosted Abolitionists Rising national conference. Connected to abolitionist movement through Rep. Zach Dieken and T. Russell Hunter's network.",
    description: "A historic Church of Christ in Pleasant Hill, IA, established in the 1850s.",
    approved: true,
  },
]

async function main() {
  for (const church of newChurches) {
    const existing = await prisma.church.findFirst({
      where: { name: church.name, state: church.state },
    })
    if (existing) {
      console.log(`Skipping "${church.name}" — already exists (id: ${existing.id})`)
      continue
    }
    const created = await prisma.church.create({ data: church })
    console.log(`Added "${created.name}" (id: ${created.id})`)
  }
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
