// Apply CREC T1 enrichment — 7 churches, manual ID → directory-entry mapping
import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const prisma = new PrismaClient()
const DRY_RUN = process.argv.includes('--dry')

type Parsed = { name: string; city?: string; state?: string; website?: string; pastor?: string; detail?: string }

// Explicit mapping: T1 DB id → CREC directory name + city match-key
const MAP: { churchId: number; matchName: string; matchCity: string; note?: string }[] = [
  { churchId: 21, matchName: 'Trinity Church',               matchCity: "Coeur d'Alene" },
  { churchId: 26, matchName: 'Holy Trinity Reformed Church', matchCity: 'Concord' },
  { churchId: 23, matchName: 'Reformation Covenant Church',  matchCity: 'Oregon City' },
  { churchId: 27, matchName: 'Christ the King Church',       matchCity: 'Greenville' },
  { churchId: 28, matchName: 'Providence Church',            matchCity: 'Lynchburg' },
  { churchId: 29, matchName: 'Trinity Church',               matchCity: 'Woodinville', note: 'DB lists Kirkland; directory lists Woodinville (same trinitykirk.org)' },
  { churchId: 22, matchName: 'Christ Church',                matchCity: 'Spokane' },
]

function buildAppend(p: Parsed): string {
  const parts: string[] = []
  if (p.pastor && p.pastor.trim() && p.pastor.trim() !== '-') {
    const m = p.pastor.replace(/^(Pastor|Rev\.?|Dr\.?|Pr\.?)\s+/i, '').trim()
    if (/^vacant$/i.test(m)) parts.push(`Pulpit currently vacant.`)
    else if (m) parts.push(`Pastor ${m}.`)
  }
  if (p.website && /^https?:\/\//i.test(p.website)) {
    parts.push(`Website: ${p.website}.`)
  }
  return parts.length ? ' ' + parts.join(' ') : ''
}

async function main() {
  const parsed: Parsed[] = JSON.parse(fs.readFileSync('data/research-queue/crec_pages_parsed.json', 'utf-8'))
  console.log(`${DRY_RUN ? 'DRY RUN — ' : ''}Applying ${MAP.length} CREC updates...\n`)

  let updated = 0, skipped = 0, noMatch = 0

  for (const m of MAP) {
    const candidates = parsed.filter(p =>
      p.name === m.matchName &&
      (p.city || '').toLowerCase() === m.matchCity.toLowerCase()
    )
    if (candidates.length === 0) {
      console.log(`  ✗ #${m.churchId} — no match for "${m.matchName}" in ${m.matchCity}`)
      noMatch++
      continue
    }
    if (candidates.length > 1) {
      console.log(`  ⚠ #${m.churchId} — ${candidates.length} candidates, using first`)
    }
    const p = candidates[0]

    const c = await prisma.church.findUnique({ where: { id: m.churchId }, select: { id: true, name: true, theologicalNotes: true } })
    if (!c) { console.log(`  ✗ id ${m.churchId} not found in DB`); continue }

    const existing = (c.theologicalNotes || '').replace(/\s+$/, '')
    if (existing && /pastor|elder|vacant/i.test(existing)) {
      console.log(`  ⊘ #${m.churchId} "${c.name}" — already has leadership info`)
      skipped++
      continue
    }

    const append = buildAppend(p)
    if (!append) { console.log(`  ⊘ #${m.churchId} "${c.name}" — no data to append`); noMatch++; continue }

    const sep = existing.endsWith('.') || existing === '' ? '' : '.'
    const updatedNotes = (existing + sep + append).trim()

    if (m.note) console.log(`  ℹ #${m.churchId}: ${m.note}`)
    if (DRY_RUN) {
      console.log(`  [dry] #${m.churchId} "${c.name}"`)
      console.log(`      → "${updatedNotes}"`)
    } else {
      await prisma.church.update({ where: { id: m.churchId }, data: { theologicalNotes: updatedNotes } })
      console.log(`  ✓ #${m.churchId} "${c.name}"`)
    }
    updated++
  }

  console.log(`\n${DRY_RUN ? 'Would update' : 'Updated'}: ${updated}`)
  console.log(`Skipped (already has):  ${skipped}`)
  console.log(`No match / no data:     ${noMatch}`)
  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
