// Sync notable_figures.md into the directory:
//   1. report whether each figure's church is marked transformationalist
//   2. write the figure and why he matters into that church's theologicalNotes
//
//   npx tsx prisma/notable-figures-sync-2026-07-29.ts --dry-run
//   npx tsx prisma/notable-figures-sync-2026-07-29.ts
import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'

const prisma = new PrismaClient()
const DRY = process.argv.includes('--dry-run')

type Fig = { name: string; blurb: string }
const byChurch = new Map<number, Fig[]>()

for (const raw of readFileSync('notable_figures.md', 'utf8').split(/\r?\n/)) {
  const line = raw.trim()
  if (!line.startsWith('- **')) continue
  const name = line.match(/^- \*\*(.+?)\*\*/)?.[1]
  if (!name) continue
  // A figure can cite more than one church (e.g. Durbin: Apologia + the Utah plant).
  const ids = [...line.matchAll(/\[#(\d+)(?:,\s*network #(\d+))?\]/g)].flatMap(m => [m[1], m[2]].filter(Boolean).map(Number))
  if (!ids.length) continue
  const blurb = line
    .replace(/^- \*\*.+?\*\*\s*[—-]\s*/, '')
    .replace(/`\[#\d+(?:,\s*network #\d+)?\]`/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/^[.,;\s]+/, '')
    .trim()
  for (const id of ids) {
    if (!byChurch.has(id)) byChurch.set(id, [])
    if (!byChurch.get(id)!.some(f => f.name === name)) byChurch.get(id)!.push({ name, blurb })
  }
}

async function main() {
  console.log(`notable_figures.md references ${byChurch.size} churches\n`)
  const missing: string[] = []
  const notTransform: string[] = []
  let updated = 0, alreadyNoted = 0

  for (const [id, figs] of [...byChurch.entries()].sort((a, b) => a[0] - b[0])) {
    const c = await prisma.church.findUnique({ where: { id } })
    if (!c) { missing.push(`#${id} — ${figs.map(f => f.name).join(', ')}`); continue }

    const names = figs.map(f => f.name).join(', ')
    const flag = c.culturalEngagement === 'transformationalist' ? '  ' : '!!'
    console.log(`${flag} #${id} ${c.name} (${c.city}, ${c.state})  ce=${c.culturalEngagement}  ← ${names}`)
    if (c.culturalEngagement !== 'transformationalist') notTransform.push(`#${id} ${c.name} (${c.city}, ${c.state}) ce=${c.culturalEngagement} — ${names}`)

    const already = (c.theologicalNotes || '').includes('NOTABLE FIGURE')
    if (already) { alreadyNoted++; continue }
    if (DRY) { updated++; continue }

    const block = figs.map(f => `${f.name} — ${f.blurb}`).join(' | ')
    const note = `NOTABLE FIGURE${figs.length > 1 ? 'S' : ''} (from notable_figures.md, the directory's roster of the most media-active voices in this movement): ${block}`
    await prisma.church.update({
      where: { id },
      data: {
        theologicalNotes: `${c.theologicalNotes || ''} ${note}`.trim(),
        researchNote: '2026-07-29: notable-figure attribution synced from notable_figures.md.',
      },
    })
    updated++
  }

  console.log(`\n${DRY ? 'WOULD ANNOTATE' : 'ANNOTATED'} ${updated}   already noted: ${alreadyNoted}`)
  if (missing.length) { console.log(`\nreferenced but NOT IN DB (${missing.length}):`); missing.forEach(m => console.log('  ', m)) }
  if (notTransform.length) {
    console.log(`\nNOT marked transformationalist (${notTransform.length}):`)
    notTransform.forEach(m => console.log('  ', m))
  }
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
