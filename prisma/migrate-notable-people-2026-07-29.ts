// Move the NOTABLE FIGURE(S) block out of theologicalNotes into its own notablePeople field.
import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
const DRY = process.argv.includes('--dry-run')

async function main() {
  const rows = await p.$queryRawUnsafe<any[]>(
    `SELECT id, name, city, state, "theologicalNotes" FROM "Church" WHERE "theologicalNotes" LIKE '%NOTABLE FIGURE%' ORDER BY id`)
  console.log(`rows carrying a NOTABLE FIGURE block: ${rows.length}\n`)

  let moved = 0
  for (const c of rows) {
    const notes: string = c.theologicalNotes
    const start = notes.indexOf('NOTABLE FIGURE')
    if (start < 0) continue
    // The block was always appended last, so it runs to the end of the notes.
    const block = notes.slice(start).trim()
    const rest = notes.slice(0, start).trim()
    // Strip the provenance preamble - the field name now carries that meaning.
    const people = block
      .replace(/^NOTABLE FIGURES?\s*\(from notable_figures\.md[^)]*\):\s*/i, '')
      .replace(/\s{2,}/g, ' ')
      .trim()

    console.log(`#${c.id} ${c.name} (${c.city}, ${c.state})`)
    console.log(`   -> ${people.slice(0, 120)}${people.length > 120 ? '…' : ''}`)
    if (DRY) { moved++; continue }
    await p.church.update({ where: { id: c.id }, data: { notablePeople: people, theologicalNotes: rest || null } })
    moved++
  }
  console.log(`\n${DRY ? 'WOULD MOVE' : 'MOVED'} ${moved}`)
  if (!DRY) {
    const n = await p.$queryRawUnsafe<any[]>(`SELECT COUNT(*)::int c FROM "Church" WHERE "notablePeople" IS NOT NULL`)
    const leftover = await p.$queryRawUnsafe<any[]>(`SELECT COUNT(*)::int c FROM "Church" WHERE "theologicalNotes" LIKE '%NOTABLE FIGURE%'`)
    console.log(`notablePeople populated: ${n[0].c} | leftover in notes: ${leftover[0].c}`)
  }
  await p.$disconnect()
}
main().catch(async e => { console.error(e); await p.$disconnect(); process.exit(1) })
