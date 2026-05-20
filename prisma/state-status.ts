import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
async function main() {
  const rows = await p.$queryRawUnsafe<{state:string, total:bigint, unknown:bigint, no_pastor:bigint, no_phone:bigint}[]>(`
    SELECT state,
      COUNT(*)::bigint AS total,
      SUM(CASE WHEN "zionistStance"='unknown' THEN 1 ELSE 0 END)::bigint AS unknown,
      SUM(CASE WHEN "theologicalNotes" IS NULL OR "theologicalNotes" NOT LIKE '%Pastor%' THEN 1 ELSE 0 END)::bigint AS no_pastor,
      SUM(CASE WHEN phone IS NULL THEN 1 ELSE 0 END)::bigint AS no_phone
    FROM "Church" WHERE state IS NOT NULL
    GROUP BY state ORDER BY state
  `)
  for (const r of rows) {
    console.log(`${r.state}\t${r.total}\t${r.unknown}\t${r.no_pastor}\t${r.no_phone}`)
  }
  await p.$disconnect()
}
main()
