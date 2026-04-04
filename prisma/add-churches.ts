import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const newChurches = [
  {
    name: "Judson Baptist Church",
    denomination: "American Baptist",
    address: "4471 E Atherton Rd",
    city: "Burton",
    state: "MI",
    zip: "48519",
    latitude: 42.9914,
    longitude: -83.5863,
    website: "https://www.judsonchurchburton.org",
    phone: "(810) 744-0650",
    zionistStance: "anti",
    theologicalNotes: "American Baptist. Pastor Greg Rowan (since 2002). Anti-Zionist stance.",
    description: "A Baptist church in Burton, MI founded in 1975, committed to biblical teaching.",
    approved: true,
  },
  {
    name: "Mercy Seat Christian Church",
    denomination: "Non-Denominational",
    address: "10240 W National Ave Suite 129",
    city: "Milwaukee",
    state: "WI",
    zip: "53227",
    latitude: 42.9762,
    longitude: -88.0232,
    website: "https://mercyseat.net",
    phone: null,
    zionistStance: "anti",
    theologicalNotes: "Non-denominational. Pastor Matt Trewhella. Author of 'The Doctrine of the Lesser Magistrates.' Founded 1989. Covenantal theology, anti-Zionist. Minister of Evangelism: Jason Storms.",
    description: "A church committed to declaring God's holy Law and great Salvation, known for lesser magistrate doctrine and cultural engagement.",
    approved: true,
  },
  {
    name: "American Reformation Church",
    denomination: "Non-Denominational",
    address: "4235 Promise Lane",
    city: "West Melbourne",
    state: "FL",
    zip: "32904",
    latitude: 28.0657,
    longitude: -80.6531,
    website: "https://www.archurch.net",
    phone: null,
    zionistStance: "anti",
    theologicalNotes: "Non-denominational. Pastor Rusty Thomas, founder of Elijah Ministries. Founded Oct 2023. Postmillennial, abolitionist, emphasis on faith, fatherhood, family, and freedom.",
    description: "A bold community of kingdom-advancing believers in Melbourne, FL focused on reformation, mercy ministries, and cultural engagement.",
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
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
