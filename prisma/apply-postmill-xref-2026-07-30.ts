// Apply the postmillennialworldview.com cross-reference: 78 congregations independently listed
// as having postmillennial pastors, currently sitting at culturalEngagement = unknown.
//
// Owner's ruling (2026-07-30): corroborated conviction qualifies as transformationalist even
// without a demonstrated public deed — but these are to be verified individually afterwards,
// the same way #19, #20 and #24 were.
//
// So they are set as transformationalist with stanceBasis = 'mixed', NOT 'evidenced', and every
// row is flagged `verify_stance`. That keeps the difference visible between "a third party says
// the pastor is postmill" and "we read this church ourselves" — which is the exact distinction
// whose absence caused the original problem.
//
//   npx tsx prisma/apply-postmill-xref-2026-07-30.ts --dry-run
//   npx tsx prisma/apply-postmill-xref-2026-07-30.ts
import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
import { updateStances } from '../lib/stance-audit'

const prisma = new PrismaClient()
const DRY = process.argv.includes('--dry-run')
const SRC = 'https://postmillennialworldview.com/postmill-churches/'
const ACTOR = 'apply-postmill-xref-2026-07-30.ts'
const NOTE =
  'Independently listed on the postmillennialworldview.com directory of churches with ' +
  'postmillennial pastors — third-party, church-level corroboration rather than a denominational ' +
  'default. Owner ruled corroborated conviction qualifies. Flagged verify_stance pending ' +
  'individual review.'

async function main() {
  const { upgrade } = JSON.parse(readFileSync('data/postmill-xref-2026-07-30.json', 'utf8'))
  console.log(`candidates: ${upgrade.length}\n`)

  let applied = 0, eschSet = 0, conflicts: string[] = []
  for (const u of upgrade) {
    const c = await prisma.church.findUnique({ where: { id: u.id } })
    if (!c) { console.log(`  #${u.id} MISSING`); continue }

    // Only fill eschatology where it is unset. Where a row already says amill, that is a
    // conflict between two sources and gets flagged for a human, not overwritten.
    const stances: Record<string, string> = { culturalEngagement: 'transformationalist' }
    if (c.eschatology === 'unknown') { stances.eschatology = 'postmill'; eschSet++ }
    else if (c.eschatology !== 'postmill') {
      conflicts.push(`#${c.id} ${c.name} — we record ${c.eschatology}, directory says postmill`)
    }

    const flags = new Set((c.recordFlag || '').split(';').filter(Boolean))
    flags.add('verify_stance')
    const srcs = new Set((c.sourceUrls || '').split(';').filter(Boolean))
    srcs.add(SRC)

    if (DRY) { applied++; continue }
    const changed = await updateStances(prisma, c.id, stances, {
      actor: ACTOR,
      note: NOTE,
      alsoSet: {
        stanceBasis: 'mixed',
        recordFlag: [...flags].join(';'),
        sourceUrls: [...srcs].join(';'),
        researchStatus: 'researched',
        lastResearchedAt: new Date(),
        researchNote: `2026-07-30: ${NOTE}`,
      },
    })
    if (changed.length) applied++
  }

  console.log(`${DRY ? 'WOULD SET' : 'SET'} transformationalist: ${applied}`)
  console.log(`eschatology filled where unknown: ${eschSet}`)
  console.log(`\nESCHATOLOGY CONFLICTS — resolve individually, not overwritten (${conflicts.length}):`)
  conflicts.forEach(c => console.log('   ' + c))

  if (!DRY) {
    const n = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist' } })
    const v = await prisma.church.count({ where: { recordFlag: { contains: 'verify_stance' } } })
    console.log(`\ntransformationalist now: ${n}`)
    console.log(`awaiting independent verification: ${v}`)
  }
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
