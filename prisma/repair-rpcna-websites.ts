// Repair RPCNA websites corrupted by backfill-websites.ts bug
// (Map.get(undefined) collapsed all lookups to last entry: laramierpc.org)
import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const prisma = new PrismaClient()
const DRY_RUN = process.argv.includes('--dry')

function normalize(url?: string): string | null {
  if (!url || !url.trim() || url === '.') return null
  let u = url.trim()
  if (!/^https?:\/\//i.test(u)) u = 'http://' + u
  return u
}

async function main() {
  const matchPlan = JSON.parse(fs.readFileSync('data/research-queue/rpcna_match_plan.json', 'utf-8'))
  const extracted = JSON.parse(fs.readFileSync('data/research-queue/rpcna_extracted.json', 'utf-8'))
  const bySlug = new Map<string, any>(extracted.map((e: any) => [e.slug, e]))

  // Build correct (churchId, website|null) pairs for all matched RPCNA churches
  const correct = matchPlan.matched.map((m: any) => {
    const ex = bySlug.get(m.slug)
    return { id: m.churchId, slug: m.slug, name: m.churchName, website: normalize(ex?.website) }
  })

  // Find any churches currently set to laramierpc (and the actual Laramie #)
  const laramie = extracted.find((e: any) => e.slug === 'laramie-rp-church')
  const laramieMatched = matchPlan.matched.find((m: any) => m.slug === 'laramie-rp-church')
  console.log(`Laramie's correct churchId: ${laramieMatched?.churchId}, website: ${laramie?.website}\n`)

  const dbRows = await prisma.church.findMany({
    where: { id: { in: correct.map(c => c.id) } },
    select: { id: true, name: true, city: true, website: true, denomination: true },
  })
  const dbById = new Map(dbRows.map(r => [r.id, r]))

  let fixed = 0, cleared = 0, ok = 0, skipped = 0, missingCorrect = 0
  for (const c of correct) {
    const db = dbById.get(c.id)
    if (!db) { skipped++; continue }
    const current = db.website || null

    // If DB matches what it should be, leave alone
    if ((current || null) === (c.website || null)) { ok++; continue }

    // The actual Laramie church (id 3782 or whatever) should KEEP laramierpc.org
    if (c.id === laramieMatched?.churchId) { ok++; continue }

    if (!c.website) {
      // The match doesn't have a real website. If current is laramierpc (corrupt), clear it.
      if (current && /laramierpc\.org/i.test(current)) {
        console.log(`  CLEAR #${c.id} ${db.name} (${db.city}): ${current} → null`)
        if (!DRY_RUN) await prisma.church.update({ where: { id: c.id }, data: { website: null } })
        cleared++
      } else {
        missingCorrect++
      }
    } else {
      // We have a correct website; current is wrong (or missing)
      console.log(`  FIX   #${c.id} ${db.name} (${db.city}): ${current || 'null'} → ${c.website}`)
      if (!DRY_RUN) await prisma.church.update({ where: { id: c.id }, data: { website: c.website } })
      fixed++
    }
  }

  console.log(`\n${DRY_RUN ? '[DRY] ' : ''}Summary:`)
  console.log(`  Fixed (replaced wrong with correct): ${fixed}`)
  console.log(`  Cleared (corrupt laramierpc → null): ${cleared}`)
  console.log(`  Already correct:                    ${ok}`)
  console.log(`  Missing in DB:                      ${skipped}`)
  console.log(`  No source website + current is OK:  ${missingCorrect}`)

  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
