import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
const prisma = new PrismaClient()

function norm(s: string): string {
  return s.toLowerCase()
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\brpcna\b/g, ' ')
    .replace(/\breformed presbyterian church\b/g, ' ')
    .replace(/\breformed presbyterian\b/g, ' ')
    .replace(/\brp church\b/g, ' ')
    .replace(/\brpc\b/g, ' ')
    .replace(/\breformed church\b/g, ' ')
    .replace(/\bchurch\b/g, ' ')
    .replace(/\bof\b/g, ' ')
    .replace(/\bthe\b/g, ' ')
    .replace(/[^a-z0-9]+/g, '')
    .trim()
}

async function main() {
  const slugs = JSON.parse(fs.readFileSync('data/research-queue/rpcna_slug_index.json', 'utf-8'))
  const slugNames = new Set(slugs.map((s: any) => norm(s.name)))

  const all = await prisma.church.findMany({
    where: { denomination: 'RPCNA' },
    select: { id: true, name: true, city: true, state: true, theologicalNotes: true, website: true },
    orderBy: [{ state: 'asc' }, { city: 'asc' }, { name: 'asc' }],
  })

  console.log(`DB total: ${all.length}`)
  console.log(`Official directory total: ${slugs.length}\n`)

  // Find churches in DB whose normalized name doesn't appear in directory
  const notInDirectory = all.filter(c => !slugNames.has(norm(c.name)))
  // Sort by state for easier review
  notInDirectory.sort((a, b) => (a.state || '').localeCompare(b.state || '') || (a.city || '').localeCompare(b.city || ''))

  console.log(`In DB but NOT matching any official directory entry by name (${notInDirectory.length}):`)
  for (const c of notInDirectory) {
    const len = (c.theologicalNotes || '').length
    console.log(`  #${c.id} ${c.state} "${c.name}" (${c.city}) [notes:${len}c]`)
  }

  // Also look for groups of churches with very similar normalized names — possible dupes my first pass missed
  console.log(`\nName-similarity groups in DB (cases with same normalized name):`)
  const byNorm = new Map<string, any[]>()
  for (const c of all) {
    const n = norm(c.name)
    if (!byNorm.has(n)) byNorm.set(n, [])
    byNorm.get(n)!.push(c)
  }
  for (const [n, cs] of byNorm) {
    if (cs.length > 1) {
      console.log(`  norm="${n}":`)
      for (const c of cs) console.log(`    #${c.id} ${c.state} "${c.name}" (${c.city})`)
    }
  }

  await prisma.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
