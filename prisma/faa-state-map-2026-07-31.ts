// Record the equal-protection legislative map on the churches it actually touches.
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // #216 Grace Reformed Baptist Church of Elgin — Dusty Deevers.
  // Already evidenced; this adds the specific legislation he authored, which is the sharpest
  // single illustration of what this directory classifies on: the pastor IS the magistrate.
  const c = await prisma.church.findUnique({ where: { id: 216 } })
  if (c) {
    await prisma.church.update({
      where: { id: 216 },
      data: {
        notablePeople: 'Dusty Deevers — pastor here since 2016 and Oklahoma State Senator for District 32; filed SB 456, the Abolition of Abortion Act; nominated for first vice president of the Southern Baptist Convention in 2023, taking 20% of the vote; writes for American Reformer and the Center for Baptist Leadership.',
        theologicalNotes: (c.theologicalNotes || '') +
          '\n\nLEGISLATION, recorded 2026-07-31. Pastor **Dusty Deevers** filed **SB 456, the Abolition of Abortion Act**, in the Oklahoma Senate in 2025 — he is simultaneously the pastor of this congregation and the state senator who authored the bill. ' +
          'He holds an M.Div. with languages from Southwestern Baptist Theological Seminary, was **nominated for first vice president of the Southern Baptist Convention in 2023** (20% of the vote), and writes for **American Reformer** and the **Center for Baptist Leadership**. Founders Ministries interviewed him on how Christians engage in politics. ' +
          '\n\n**This is the clearest single case in the directory of the thesis it was built to test** — not a church commenting on the civil sphere from outside it, but a pastor sitting in the legislature and writing the abolition bill himself. Oklahoma’s 2026 successor bill, HB 3038, was filed by Rep. Gabe Woolley and co-sponsored by Sen. Warren Hamilton.',
        researchNote: '2026-07-31: recorded SB 456 authorship — Deevers is both pastor here and the Oklahoma senator who filed the Abolition of Abortion Act.',
        lastResearchedAt: new Date(),
      },
    })
    console.log('#216 Grace Reformed Baptist Elgin — SB 456 authorship recorded')
  }
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
