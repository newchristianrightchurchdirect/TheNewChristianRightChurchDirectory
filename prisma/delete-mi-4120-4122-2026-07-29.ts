// Remove #4120-4122 at the directory owner's direction — the three rows added from the 9Marks
// batch that carried explicit fit caveats. Backed up before deletion.
import { PrismaClient } from '@prisma/client'
import { writeFileSync } from 'fs'
import { join } from 'path'
const p = new PrismaClient()
const IDS = [4120, 4121, 4122]

async function main() {
  const reports = await p.report.count({ where: { churchId: { in: IDS } } })
  if (reports > 0) { console.error(`ABORT: ${reports} Report row(s) reference these.`); process.exit(1) }
  const rows = await p.church.findMany({ where: { id: { in: IDS } } })
  if (!rows.length) { console.log('nothing to delete'); return }
  for (const r of rows) console.log(`Deleting #${r.id} ${r.name} (${r.city}, ${r.state}) — ${r.denomination}`)
  const backup = join(process.cwd(), 'data', 'deleted-churches-2026-07-29-9marks.json')
  writeFileSync(backup, JSON.stringify(rows, null, 2), 'utf8')
  console.log(`Backed up -> ${backup}`)
  const res = await p.church.deleteMany({ where: { id: { in: IDS } } })
  console.log(`Deleted ${res.count}.`)
  console.log(`MI: ${await p.church.count({ where: { state: 'MI' } })} | total: ${await p.church.count()}`)
  await p.$disconnect()
}
main().catch(async e => { console.error(e); await p.$disconnect(); process.exit(1) })
