import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const updates = [
    {
      name: "Judson Baptist Church",
      state: "MI",
      zionistStance: "unknown",
      theologicalNotes: "American Baptist Churches USA. Pastor Greg Rowan (since 2002). Connected to the rescue movement through Cal Zastrow.",
    },
    {
      name: "Mercy Seat Christian Church",
      state: "WI",
      zionistStance: "unknown",
      theologicalNotes: "Non-denominational. Pastor Matt Trewhella. Author of 'The Doctrine of the Lesser Magistrates.' Founded 1989. Minister of Evangelism: Jason Storms. Connected to rescue movement — Missionaries to the Preborn.",
    },
    {
      name: "American Reformation Church",
      state: "FL",
      zionistStance: "unknown",
      theologicalNotes: "Non-denominational. Pastor Rusty Thomas, founder of Elijah Ministries, former national director of Operation Save America. Founded Oct 2023. Emphasis on faith, fatherhood, family, and freedom.",
    },
  ]

  for (const u of updates) {
    const church = await prisma.church.findFirst({
      where: { name: u.name, state: u.state },
    })
    if (!church) {
      console.log(`Not found: "${u.name}"`)
      continue
    }
    await prisma.church.update({
      where: { id: church.id },
      data: {
        zionistStance: u.zionistStance,
        theologicalNotes: u.theologicalNotes,
      },
    })
    console.log(`Updated "${u.name}" (id: ${church.id}) — stance set to unknown`)
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
