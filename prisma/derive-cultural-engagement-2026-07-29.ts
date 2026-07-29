// Derive culturalEngagement from evidence ALREADY recorded in this DB - no new web research.
// Each row gets a short basis line appended to theologicalNotes naming the exact trigger, so
// the value stays traceable (see CLAUDE.md: no unsourced stances).
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const DRY = process.argv.includes('--dry-run')

type Row = {
  id: number; name: string; state: string; denomination: string | null
  eschatology: string; theonomy: string; christianNationalism: string
  abolitionStance: string; zionistStance: string; theologicalNotes: string | null
}

// Ordered: first match wins.
function classify(c: Row): { value: string; why: string } | null {
  const t: string[] = []
  if (c.abolitionStance === 'pro_abolition') t.push('an evidenced pro-abolition position (the congregation has already committed corporately to a political-moral cause)')
  if (c.christianNationalism === 'affirm' || c.christianNationalism === 'sympathetic') t.push(`christianNationalism=${c.christianNationalism}`)
  if (c.eschatology === 'postmill' && (c.theonomy === 'theonomic' || c.theonomy === 'sympathetic')) t.push('postmillennial eschatology combined with theonomic sympathies')
  if (c.denomination === 'CREC') t.push('CREC membership (the communion is explicitly culture-shaping)')
  if (c.zionistStance === 'anti') t.push('an active anti-Zionist position, which in this orbit tracks covenantal/postmillennial rather than dispensational commitments')
  if (t.length) return { value: 'transformationalist', why: t.join('; ') }

  if ((c.theologicalNotes || '').toLowerCase().includes('dallas statement'))
    return { value: 'limited_mission', why: 'a published affirmation of the Dallas Statement, which denies that political or social activism is primary to the mission of the church' }

  if (c.denomination === 'PRCA')
    return { value: 'quietist', why: 'the PRCA\'s rejection of common grace and its emphasis on the antithesis, which disfavours political co-belligerence (denominational distinctive, documented across this bloc)' }

  return null
}

async function main() {
  const rows = await prisma.$queryRawUnsafe<Row[]>(
    `SELECT id, name, state, denomination, eschatology, theonomy, "christianNationalism",
            "abolitionStance", "zionistStance", "theologicalNotes"
     FROM "Church" WHERE "culturalEngagement"='unknown' ORDER BY id`)

  const tally: Record<string, number> = {}
  let changed = 0
  for (const c of rows) {
    const hit = classify(c)
    if (!hit) continue
    tally[hit.value] = (tally[hit.value] || 0) + 1
    changed++
    if (DRY) { if (changed <= 12) console.log(`  #${c.id} ${c.name} (${c.state}) -> ${hit.value}`); continue }

    const basis = `CULTURAL ENGAGEMENT (derived ${new Date().toISOString().slice(0, 10)} from evidence already in this record, no new research): ${hit.value} - basis: ${hit.why}.`
    const notes = (c.theologicalNotes || '').includes('CULTURAL ENGAGEMENT')
      ? c.theologicalNotes!
      : `${c.theologicalNotes || ''} ${basis}`.trim()
    await prisma.church.update({ where: { id: c.id }, data: { culturalEngagement: hit.value, theologicalNotes: notes } })
  }

  console.log(`\n${DRY ? 'WOULD SET' : 'SET'} ${changed} rows:`, Object.entries(tally).map(([k, v]) => `${k}=${v}`).join('  '))
  if (!DRY) {
    const dist = await prisma.$queryRawUnsafe<any[]>(
      `SELECT "culturalEngagement", COUNT(*)::int n FROM "Church" GROUP BY 1 ORDER BY 2 DESC`)
    console.log('DB-wide:', dist.map(d => `${d.culturalEngagement}=${d.n}`).join('  '))
  }
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
