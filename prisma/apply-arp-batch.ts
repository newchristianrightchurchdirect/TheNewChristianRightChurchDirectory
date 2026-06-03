import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const prisma = new PrismaClient()
const DRY_RUN = process.argv.includes('--dry')

type Match = { churchId: number; churchName: string; storeSlug: string; storeName: string; storeCity: string; storeState: string }
type Parsed = { slug: string; storeName?: string; address?: any; phone?: string; pastor?: string; email?: string; website?: string }

function buildAppend(p: Parsed): string {
  const parts: string[] = []
  if (p.pastor && p.pastor.trim().length) {
    // Strip "Rev. " prefix if present, we'll add our own if absent
    const pastor = p.pastor.replace(/^Rev\.?\s+/i, '').trim()
    parts.push(`Pastor ${pastor}.`)
  }
  if (p.address?.street && p.address?.city && p.address?.state) {
    const street = p.address.street
    const state = p.address.state.toUpperCase()
    const csz = `${p.address.city}, ${state}${p.address.zip ? ' ' + p.address.zip : ''}`
    parts.push(`Address: ${street}, ${csz}.`)
  }
  if (p.website) parts.push(`Website: ${p.website}.`)
  return parts.length ? ' ' + parts.join(' ') : ''
}

async function main() {
  const plan = JSON.parse(fs.readFileSync('data/research-queue/arp_match_plan.json', 'utf-8'))
  const parsed: Parsed[] = JSON.parse(fs.readFileSync('data/research-queue/arp_pages_parsed.json', 'utf-8'))
  const bySlug = new Map(parsed.map(p => [p.slug, p]))

  const matches: Match[] = plan.matched
  console.log(`${DRY_RUN ? 'DRY RUN — ' : ''}Applying ${matches.length} ARP updates...\n`)

  let updated = 0
  let skipped = 0
  let noAppend = 0

  for (const m of matches) {
    const p = bySlug.get(m.storeSlug)
    if (!p) { console.log(`  ✗ slug ${m.storeSlug} not in parsed data`); continue }

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
