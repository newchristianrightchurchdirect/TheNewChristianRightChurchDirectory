// Seed culturalEngagement only where there is real evidence. Appends the basis to
// theologicalNotes rather than overwriting it.
import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()

const rows: { id: number; value: string; basis: string }[] = [
  // Published Dallas Statement affirmation = an explicit denial that political/social activism is
  // "primary to the mission of the church". That rules transformationalist OUT. It does NOT mean
  // the church is soft on abortion personally - only that it will not act corporately.
  { id: 4091, value: 'limited_mission', basis: 'CULTURAL ENGAGEMENT (evidenced): affirms The Statement on Social Justice and the Gospel (Dallas), which denies that political or social activism is integral to the gospel or primary to the mission of the church - a limited institutional mission. Members may act as citizens; the church as institution does not take up causes.' },
  { id: 4092, value: 'limited_mission', basis: 'CULTURAL ENGAGEMENT (evidenced): affirms The Statement on Social Justice and the Gospel (Dallas), which denies that political or social activism is integral to the gospel or primary to the mission of the church - a limited institutional mission.' },
  { id: 4096, value: 'limited_mission', basis: 'CULTURAL ENGAGEMENT (evidenced): affirms The Statement on Social Justice and the Gospel (Dallas), which denies that political or social activism is integral to the gospel or primary to the mission of the church - a limited institutional mission.' },
  // CREC congregations: the communion's own identity is postmillennial, theonomy-sympathetic and
  // explicitly culture-shaping. Recorded as orbit-based, not a per-church statement - verify later.
  { id: 51,   value: 'transformationalist', basis: 'CULTURAL ENGAGEMENT (orbit-based, verify per-church): CREC congregations are postmillennial and explicitly culture-shaping - the communion expects Christ\'s lordship to be applied to law, politics and education. Basis is CREC membership rather than a statement from this congregation.' },
  { id: 3245, value: 'transformationalist', basis: 'CULTURAL ENGAGEMENT (orbit-based, verify per-church): CREC congregations are postmillennial and explicitly culture-shaping. Basis is CREC membership rather than a statement from this congregation.' },
  { id: 4085, value: 'transformationalist', basis: 'CULTURAL ENGAGEMENT (orbit-based, verify per-church): CREC congregations are postmillennial and explicitly culture-shaping. Basis is CREC membership rather than a statement from this congregation.' },
]

async function main() {
  for (const r of rows) {
    const c = await p.church.findUnique({ where: { id: r.id }, select: { name: true, city: true, theologicalNotes: true } })
    if (!c) { console.log(`#${r.id} MISSING - skipped`); continue }
    const notes = (c.theologicalNotes || '').includes('CULTURAL ENGAGEMENT')
      ? c.theologicalNotes!
      : `${c.theologicalNotes || ''} ${r.basis}`.trim()
    await p.church.update({ where: { id: r.id }, data: { culturalEngagement: r.value, theologicalNotes: notes } })
    console.log(`#${r.id} ${c.name} (${c.city}) -> ${r.value}`)
  }
  const dist = await p.$queryRawUnsafe<any[]>(
    `SELECT "culturalEngagement", COUNT(*)::int n FROM "Church" WHERE state='MI' GROUP BY 1 ORDER BY 2 DESC`)
  console.log('\nMI distribution:', dist.map(d => `${d.culturalEngagement}=${d.n}`).join('  '))
  await p.$disconnect()
}
main().catch(async e => { console.error(e); await p.$disconnect(); process.exit(1) })
