// One-off: back up then hard-delete #283 Grace OPC Lansing, a duplicate of #2146 (user-approved 2026-07-29)
import { PrismaClient } from '@prisma/client'
import { writeFileSync } from 'fs'
import { join } from 'path'

const p = new PrismaClient()
const IDS = [283]

async function main() {
  const reports = await p.report.count({ where: { churchId: { in: IDS } } })
  if (reports > 0) { console.error(`ABORT: ${reports} Report row(s) reference this church.`); process.exit(1) }

  const rows = await p.church.findMany({ where: { id: { in: IDS } } })
  if (rows.length !== IDS.length) { console.error(`ABORT: expected ${IDS.length}, found ${rows.length}.`); process.exit(1) }

  // Confirm the survivor exists before removing the duplicate.
  const keep = await p.church.findUnique({ where: { id: 2146 } })
  if (!keep) { console.error('ABORT: #2146 (the row to keep) is missing.'); process.exit(1) }
  console.log(`Keeping  #2146 ${keep.name} | ${keep.address}, ${keep.city} ${keep.zip} | ${keep.leadership}`)
  console.log(`Deleting #283  ${rows[0].name} | ${rows[0].address}, ${rows[0].city} | [${rows[0].recordFlag}]`)

  const backup = join(process.cwd(), 'data', 'deleted-churches-2026-07-29.json')
  writeFileSync(backup, JSON.stringify(rows, null, 2), 'utf8')
  console.log(`Backed up -> ${backup}`)

  const res = await p.church.deleteMany({ where: { id: { in: IDS } } })
  console.log(`Deleted ${res.count} row.`)
  console.log(`MI churches now: ${await p.church.count({ where: { state: 'MI' } })} | total: ${await p.church.count()}`)
  await p.$disconnect()
}
main().catch(async e => { console.error(e); await p.$disconnect(); process.exit(1) })
