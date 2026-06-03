// Build per-church job files for the remaining 189 (excluding 4 pilots already done)
// Splits into 4 batches for parallel subagent processing.
import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

const PILOTS_DONE = new Set([3495, 3645, 3767, 21])

type Job = {
  id: number
  name: string
  denomination: string
  city: string
  state: string
  website: string | null
  existingNotes: string
  aboutText: string  // empty if no website or no about-text
  hasWebsite: boolean
}

async function main() {
  const list = JSON.parse(fs.readFileSync('data/research-queue/enriched_193.json', 'utf-8'))
  const rows = await prisma.church.findMany({
    where: { id: { in: list.map((c: any) => c.id) } },
    select: { id: true, name: true, denomination: true, city: true, state: true, website: true, theologicalNotes: true },
  })
  const byId = new Map(rows.map(r => [r.id, r]))

  const textDir = 'data/research-queue/about-text'
  const jobs: Job[] = []
  for (const c of list) {
    if (PILOTS_DONE.has(c.id)) continue
    const row = byId.get(c.id)
    if (!row) continue
    const textPath = path.join(textDir, `${c.id}.txt`)
    const aboutText = fs.existsSync(textPath) ? fs.readFileSync(textPath, 'utf-8') : ''
    jobs.push({
      id: c.id,
      name: row.name,
      denomination: row.denomination || '',
      city: row.city,
      state: row.state,
      website: row.website,
      existingNotes: row.theologicalNotes || '',
      aboutText,
      hasWebsite: !!(row.website && row.website.trim()),
    })
  }

  // Stats
  const withText = jobs.filter(j => j.aboutText && j.aboutText.length > 1500).length
  const thin = jobs.filter(j => j.aboutText && j.aboutText.length <= 1500).length
  const noWeb = jobs.filter(j => !j.hasWebsite).length
  console.log(`Total jobs: ${jobs.length}`)
  console.log(`  Rich about-text (>1.5KB): ${withText}`)
  console.log(`  Thin about-text:          ${thin}`)
  console.log(`  No website:               ${noWeb}`)

  // Split into 4 batches (round-robin by denom so each batch sees variety)
  jobs.sort((a, b) => a.denomination.localeCompare(b.denomination) || a.id - b.id)
  const batches: Job[][] = [[], [], [], []]
  for (let i = 0; i < jobs.length; i++) batches[i % 4].push(jobs[i])

  for (let i = 0; i < 4; i++) {
    const out = `data/research-queue/process-batch-${i + 1}.json`
    fs.writeFileSync(out, JSON.stringify(batches[i], null, 2))
    const sizeMB = (fs.statSync(out).size / 1024 / 1024).toFixed(2)
    console.log(`  Batch ${i + 1}: ${batches[i].length} jobs (${sizeMB} MB)`)
  }

  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
