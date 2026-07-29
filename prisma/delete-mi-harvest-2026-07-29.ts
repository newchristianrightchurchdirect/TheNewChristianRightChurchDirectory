// One-off: remove #4099 Harvest Bible Church (Westland) at the directory owner's direction.
// Basis: the owner knows this congregation first-hand and reports it is not sound on abortion
// (tolerates chemical abortion among members), which fails the directory's core criterion.
// Backed up before deletion so the record can be restored if that assessment ever changes.
import { PrismaClient } from '@prisma/client'
import { writeFileSync } from 'fs'
import { join } from 'path'

const p = new PrismaClient()

async function main() {
  const row = await p.church.findFirst({ where: { state: 'MI', name: { contains: 'Harvest Bible Church' } } })
  if (!row) { console.log('Harvest Bible Church not found - already removed?'); return }

  const reports = await p.report.count({ where: { churchId: row.id } })
  if (reports > 0) { console.error(`ABORT: ${reports} Report row(s) reference #${row.id}.`); process.exit(1) }

  console.log(`Deleting #${row.id} ${row.name} | ${row.address}, ${row.city} ${row.zip} | ${row.leadership}`)
  const backup = join(process.cwd(), 'data', 'deleted-churches-2026-07-29-harvest.json')
  writeFileSync(backup, JSON.stringify([row], null, 2), 'utf8')
  console.log(`Backed up -> ${backup}`)

  await p.church.delete({ where: { id: row.id } })
  console.log(`Deleted. MI: ${await p.church.count({ where: { state: 'MI' } })} | total: ${await p.church.count()}`)
  await p.$disconnect()
}
main().catch(async e => { console.error(e); await p.$disconnect(); process.exit(1) })
