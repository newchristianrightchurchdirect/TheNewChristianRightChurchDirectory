// Repair rows my own Nebraska import created badly.
//
// The parser treated any standalone role line as a title only if it began with a known prefix.
// "Missions Pastor", "Teaching Pastor" and "Youth Pastor" were not in that list, so each was
// consumed as a CHURCH NAME — producing three rows literally named after job titles, and
// costing the real church name in each case.
//
// Checked for a systematic shift as well: there is none. Diffing every imported row against a
// corrected parse shows only these three are wrong. Calvary Community Church (Lincoln) legitimately
// has two signatories, as does Dominion Covenant and Faith Bible.
import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
const prisma = new PrismaClient()

async function main() {
  // ---- #4297: "Missions Pastor" is really LifePoint Church, Norfolk ----
  const lp = await prisma.church.findUnique({ where: { id: 4297 } })
  if (lp) {
    await prisma.church.update({
      where: { id: 4297 },
      data: {
        name: 'LifePoint Church',
        leadership: 'Missions Pastor: James McClenahan',
        description: 'A congregation in Norfolk, Nebraska whose missions pastor signed the 2024 Nebraska pastors’ statement calling for equal protection of the preborn.',
        theologicalNotes: (lp.theologicalNotes || '').replace(/Signed here by \*\*James McClenahan\*\*\./,
          'Signed here by **James McClenahan**, Missions Pastor.') +
          '\n\n**RECORD REPAIRED 2026-07-31.** This row was created named "Missions Pastor" — a job title, not a church. The import parser did not recognise two-word role lines, so it consumed the real church name. Corrected to **LifePoint Church, Norfolk** from the source document.',
        researchNote: '2026-07-31: repaired — row had been named after a job title by a parser bug. Correct church is LifePoint Church, Norfolk.',
      },
    })
    console.log('#4297 "Missions Pastor" -> LifePoint Church (Norfolk)')
  }

  // ---- #4319: "Teaching Pastor" is really Faith Bible Church, Lincoln ----
  const fb = await prisma.church.findUnique({ where: { id: 4319 } })
  if (fb) {
    await prisma.church.update({
      where: { id: 4319 },
      data: {
        name: 'Faith Bible Church',
        leadership: 'Teaching Pastor: Brad Myers; Youth Pastor: Koty Krawczyk',
        description: 'A congregation in Lincoln, Nebraska whose teaching and youth pastors both signed the 2024 Nebraska pastors’ statement calling for equal protection of the preborn.',
        theologicalNotes: (fb.theologicalNotes || '').replace(/Signed here by \*\*Brad Myers\*\*\./,
          'Signed here by **two of its pastors** — Brad Myers (Teaching Pastor) and Koty Krawczyk (Youth Pastor).') +
          '\n\n**RECORD REPAIRED 2026-07-31.** This row was created named "Teaching Pastor" — a job title, not a church — by a parser bug that did not recognise two-word role lines. Corrected to **Faith Bible Church, Lincoln** from the source document, and merged with the duplicate row #4323 ("Youth Pastor"), which was the same congregation via its second signatory.',
        researchNote: '2026-07-31: repaired from a parser bug; absorbed duplicate #4323. Two signatories from this congregation.',
      },
    })
    console.log('#4319 "Teaching Pastor" -> Faith Bible Church (Lincoln), 2 signatories')
  }

  // ---- #4323: same congregation as #4319 — merge and delete ----
  const yp = await prisma.church.findUnique({ where: { id: 4323 } })
  if (yp) {
    await prisma.stanceChange.create({
      data: { churchId: 4319, churchName: 'Faith Bible Church', field: 'merge',
              oldValue: '#4323 "Youth Pastor" (Koty Krawczyk)', newValue: 'merged then deleted',
              actor: 'fix-nebraska-parse-2026-07-31.ts',
              note: 'Both rows were the same congregation, split by a parser bug that named each after a job title.' },
    })
    await prisma.church.delete({ where: { id: 4323 } })
    console.log('#4323 "Youth Pastor" merged into #4319 and deleted')
  }

  // ---- record the second signatory at Calvary Community Church, Lincoln ----
  const cc = await prisma.church.findFirst({
    where: { state: 'NE', city: { equals: 'Lincoln', mode: 'insensitive' }, name: { contains: 'Calvary Community', mode: 'insensitive' } },
  })
  if (cc) {
    await prisma.church.update({
      where: { id: cc.id },
      data: {
        leadership: 'Pastors: Shane Sundermann and Steve Davenport',
        theologicalNotes: (cc.theologicalNotes || '') +
          '\n\nNOTED 2026-07-31: **two** of this congregation’s pastors signed — Shane Sundermann and Steve Davenport.',
      },
    })
    console.log(`#${cc.id} Calvary Community Church — second signatory recorded`)
  }

  // ---- add any corrected-parse signatories still missing ----
  const corrected = readFileSync('data/nebraska-signatories-CORRECTED.txt', 'utf8').split('\n').filter(Boolean)
    .map(l => { const [pastor, title, church, city] = l.split('|'); return { pastor, title, church, city } })
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\b(the|a|of|at|in|church|churches|congregation|inc)\b/g, ' ').replace(/\s+/g, ' ').trim()
  const rows = await prisma.church.findMany({ where: { state: 'NE' }, select: { name: true, city: true } })
  const missing = corrected.filter(c =>
    !rows.some(r => r.city.toLowerCase() === c.city.toLowerCase() && norm(r.name) === norm(c.church.split(' / ')[0])))
  console.log(`\ncorrected signatories still missing from the directory: ${missing.length}`)
  missing.forEach(m => console.log(`   ${m.church} (${m.city}) — ${m.pastor}, ${m.title}`))

  console.log(`\ntotal churches: ${await prisma.church.count()}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
