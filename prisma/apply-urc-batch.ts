import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const prisma = new PrismaClient()
const DRY_RUN = process.argv.includes('--dry')

type Match = { churchId: number; churchName: string; entryName: string; entryCity: string; entryState: string }
type Parsed = {
  name: string; street?: string; city?: string; state?: string; zip?: string; country?: string
  phone?: string; email?: string; website?: string; minister?: string
}

function buildAppend(p: Parsed): string {
  const parts: string[] = []
  if (p.minister && p.minister.trim() && p.minister.trim() !== '.') {
    let m = p.minister.trim()
      // Strip embedded phone numbers
      .replace(/\s*\(?\d{3}\)?[\s\-\.]?\d{3}[\s\-\.]?\d{4}.*$/, '')
      // Strip leading titles (Pastor, Rev., Dr.) — we add our own
      .replace(/^(Pastor|Rev\.?|Dr\.?|Pr\.?)\s+/i, '')
      .trim()
    if (/^vacant$/i.test(m)) parts.push(`Pulpit currently vacant.`)
    else if (m) parts.push(`Pastor ${m}.`)
  }
  if (p.street && p.city && p.state) {
    const state = p.state.toUpperCase()
    const csz = `${p.city}, ${state}${p.zip ? ' ' + p.zip : ''}`
    parts.push(`Address: ${p.street}, ${csz}.`)
  }
  if (p.website && p.website !== '.') {
    let w = p.website
    if (!/^https?:\/\//i.test(w)) w = 'http://' + w
    parts.push(`Website: ${w}.`)
  }
  return parts.length ? ' ' + parts.join(' ') : ''
}

async function main() {
  const plan = JSON.parse(fs.readFileSync('data/research-queue/urc_match_plan.json', 'utf-8'))
  const parsed: Parsed[] = JSON.parse(fs.readFileSync('data/research-queue/urc_pages_parsed.json', 'utf-8'))
  const byName = new Map(parsed.map(p => [p.name.toLowerCase(), p]))

  const matches: Match[] = plan.matched
  console.log(`${DRY_RUN ? 'DRY RUN — ' : ''}Applying ${matches.length} URC updates...\n`)

  let updated = 0
  let skipped = 0
  let noAppend = 0

  for (const m of matches) {
    const p = byName.get(m.entryName.toLowerCase())
    if (!p) { console.log(`  ✗ entry "${m.entryName}" not in parsed data`); continue }

    const append = buildAppend(p)
    if (!append) { console.log(`  ⊘ #${m.churchId} "${m.churchName}" — no data to append`); noAppend++; continue }

    const c = await prisma.church.findUnique({ where: { id: m.churchId }, select: { id: true, name: true, theologicalNotes: true } })
    if (!c) { console.log(`  ✗ id ${m.churchId} not found in DB`); continue }

    const existing = (c.theologicalNotes || '').replace(/\s+$/, '')
    if (existing && /pastor|elder|vacant/i.test(existing)) {
      console.log(`  ⊘ #${m.churchId} "${c.name}" — already has leadership info`)
      skipped++
      continue
    }

    const sep = existing.endsWith('.') || existing === '' ? '' : '.'
    const updatedNotes = (existing + sep + append).trim()

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
  console.log(`Skipped (already had leadership): ${skipped}`)
  console.log(`Skipped (no extractable data):    ${noAppend}`)

  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
