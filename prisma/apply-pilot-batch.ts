// Pilot batch: 4 representative churches across denoms, processed end-to-end
// Validates description/leadership/stance generation before scaling to 193.
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const DRY_RUN = process.argv.includes('--dry')

type Update = {
  id: number
  description: string
  leadership: string
  abolitionStance: 'pro_abolition' | 'incrementalist' | 'anti' | 'unknown'
  zionistStance: 'yes' | 'no' | 'anti' | 'unknown'
}

const updates: Update[] = [
  {
    id: 3495,
    description: `Huntersville Associate Reformed Presbyterian Church has served the Lord since 1875 in Huntersville, North Carolina, just north of Charlotte. The congregation of nearly 200 members holds to the historic ecumenical creeds—Apostles', Nicene, Athanasian, and Chalcedon—together with the Westminster Confession and Catechisms as faithful summaries of biblical doctrine. Worship is reverent and traditional; preaching is expository and grounded in Scripture. The church is governed by elders, baptizes covenant children, and emphasizes connection to its presbytery and the broader ARP denomination. About fifteen percent of the annual budget is devoted to local and global outreach and missions.`,
    leadership: 'Pastor: Nick Napier; Director of Children\'s Ministries: Rachael Neal; Director of Music: Betsy Logeman; Administrative Assistant: Heidi Reckard',
    abolitionStance: 'incrementalist',
    zionistStance: 'no',
  },
  {
    id: 3645,
    description: `Trinity United Reformed Church is a confessionally Reformed congregation in Visalia, California, affiliated with the United Reformed Churches in North America (URCNA). The church exists to make disciples of Jesus Christ who worship God faithfully, walk together in love, and witness to neighbors near and far—taking its motto from 1 Corinthians 16:13–14, "Stand Firm in the Faith… Do Everything in Love." Trinity holds the Three Forms of Unity—the Belgic Confession, Heidelberg Catechism, and Canons of Dort—as faithful summaries of Scripture. Worship is offered Sundays at 9:30 a.m. and again at 6:00 p.m., with a children's safeguarding policy and active youth ministries.`,
    leadership: 'Pastor: Jacques Roets',
    abolitionStance: 'incrementalist',
    zionistStance: 'no',
  },
  {
    id: 3767,
    description: `Seattle Reformed Presbyterian Church gathers in northeast Seattle to proclaim the truth in love and to encourage one another in the faith of Jesus Christ. The congregation belongs to the Reformed Presbyterian Church of North America, an heir of the Scottish Covenanters, and worships in the historic RPCNA manner with a cappella Psalm singing. The Bible is confessed as the only infallible standard for faith and life; the Westminster Standards summarize what the congregation believes Scripture teaches. Sunday School begins at 10:00 a.m. and worship at 11:00 a.m. The church is part of the RPCNA Pacific Coast Presbytery.`,
    leadership: 'Pastor: David Witmer; Clerk of Session: Paul Perkins',
    abolitionStance: 'incrementalist',
    zionistStance: 'no',
  },
  {
    id: 21,
    description: `Trinity Church gathers each Lord's Day in Coeur d'Alene, Idaho, to worship the Triune God and labor to see all of life transformed by Christ's gracious rule. As a Reformed and evangelical congregation in the Communion of Reformed Evangelical Churches (CREC), Trinity confesses the ecumenical creeds (Apostles', Nicene, Chalcedon), the Westminster Confession of Faith (with a few exceptions), and an Evangelical Statement summarizing central convictions. The church holds covenant theology, postmillennial "optimistic eschatology," and expository, verse-by-verse preaching. Special emphasis is placed on biblical families, with fathers equipped to lead their homes. The session of elders governs under Christ's headship.`,
    leadership: 'Pastor: Chase Fluhart',
    abolitionStance: 'incrementalist',
    zionistStance: 'no',
  },
]

async function main() {
  for (const u of updates) {
    const existing = await prisma.church.findUnique({ where: { id: u.id }, select: { name: true, description: true, leadership: true, abolitionStance: true, zionistStance: true } })
    if (!existing) { console.log(`#${u.id} NOT FOUND`); continue }

    const words = u.description.trim().split(/\s+/).length
    console.log(`\n#${u.id} ${existing.name}`)
    console.log(`  description: ${words} words`)
    console.log(`  leadership:  ${u.leadership}`)
    console.log(`  abolition:   ${existing.abolitionStance} → ${u.abolitionStance}`)
    console.log(`  zionist:     ${existing.zionistStance} → ${u.zionistStance}`)

    if (!DRY_RUN) {
      await prisma.church.update({
        where: { id: u.id },
        data: {
          description: u.description,
          leadership: u.leadership,
          abolitionStance: u.abolitionStance,
          zionistStance: u.zionistStance,
        },
      })
    }
  }
  console.log(`\n${DRY_RUN ? '[DRY] ' : ''}Pilot batch complete: ${updates.length} churches`)
  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
