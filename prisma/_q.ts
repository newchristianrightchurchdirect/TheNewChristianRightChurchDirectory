import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
const FIELDS = ['eschatology', 'culturalEngagement', 'zionistStance', 'theonomy', 'genderStance',
  'sexualityStance', 'christianNationalism', 'abolitionStance', 'socialJusticeStance', 'federalVision']
async function main() {
  for (const f of FIELDS) {
    const r: any[] = await p.$queryRawUnsafe(
      `SELECT "${f}" AS v, COUNT(*)::int AS n FROM "Church" WHERE "${f}" IS NOT NULL GROUP BY 1 ORDER BY 2 DESC LIMIT 12`)
    console.log(`${f}: ${r.map(x => `${x.v}(${x.n})`).join('  ')}`)
  }
  await p.$disconnect()
}
main()
