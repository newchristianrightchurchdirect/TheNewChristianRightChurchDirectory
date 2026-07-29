// One-off: back up then hard-delete the 4 Michigan non-fit/duplicate records (user-approved 2026-07-28)
import { PrismaClient } from '@prisma/client'
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const p = new PrismaClient()
const IDS = [3244, 3663, 3975, 3992]

async function main() {
  const reports = await p.report.count({ where: { churchId: { in: IDS } } })
  if (reports > 0) {
    console.error(`ABORT: ${reports} Report row(s) reference these churches.`)
    process.exit(1)
  }

  const rows = await p.church.findMany({ where: { id: { in: IDS } } })
  if (rows.length !== IDS.length) {
    console.error(`ABORT: expected ${IDS.length} rows, found ${rows.length}.`)
    process.exit(1)
  }

  const outDir = join(process.cwd(), 'data')
  mkdirSync(outDir, { recursive: true })
  const backup = join(outDir, 'deleted-churches-2026-07-28.json')
  writeFileSync(backup, JSON.stringify(rows, null, 2), 'utf8')
  console.log(`Backed up ${rows.length} full records -> ${backup}`)
  for (const r of rows) console.log(`  #${r.id} ${r.name} (${r.city}, ${r.state}) [${r.recordFlag}]`)

  const res = await p.church.deleteMany({ where: { id: { in: IDS } } })
  console.log(`\nDeleted ${res.count} rows.`)

  const left = await p.church.count({ where: { id: { in: IDS } } })
  console.log(`Remaining with those ids: ${left}`)
  console.log(`Total churches now: ${await p.church.count()}`)
  await p.$disconnect()
}
main().catch(async e => { console.error(e); await p.$disconnect(); process.exit(1) })
