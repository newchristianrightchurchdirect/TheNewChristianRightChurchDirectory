import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const prisma = new PrismaClient()
const DRY_RUN = process.argv.includes('--dry')

type Extracted = {
  churchId: number
  slug: string
  url: string
  ok: boolean
  pageTitle?: string
  pastor?: string
  append: string
}

async function main() {
  const all: Extracted[] = JSON.parse(fs.readFileSync('data/research-queue/rpcna_extracted.json', 'utf-8'))
  const usable = all.filter(r => r.ok && r.append.trim().length > 0)

  console.log(`${DRY_RUN ? 'DRY RUN — ' : ''}Applying ${usable.length} RPCNA updates...\n`)

  let updated = 0
  let skipped = 0
  for (const r of usable) {
    const c = await prisma.church.findUnique({
      where: { id: r.churchId },
      select: { id: true, name: true, theologicalNotes: true },
    })
    if (!c) {
      console.log(`  ✗ id ${r.churchId} not found in DB`)
      continue
    }

    const existing = (c.theologicalNotes || '').replace(/\s+$/, '')
    if (existing && /pastor|elder|vacant/i.test(existing)) {
      console.log(`  ⊘ id ${r.churchId} "${c.name}" — already has pastor/elder/vacant info, SKIPPING`)
      skipped++
      continue
    }

    const sep = existing.endsWith('.') || existing === '' ? '' : '.'
    const updatedNotes = (existing + sep + r.append).trim()

    if (DRY_RUN) {
      console.log(`  [dry] id ${r.churchId} "${c.name}"`)
      console.log(`      BEFORE: "${existing}"`)
      console.log(`      AFTER:  "${updatedNotes}"\n`)
    } else {
      await prisma.church.update({
        where: { id: r.churchId },
        data: { theologicalNotes: updatedNotes },
      })
      console.log(`  ✓ id ${r.churchId} "${c.name}"`)
    }
    updated++
  }

  console.log(`\n${DRY_RUN ? 'Would update' : 'Updated'}: ${updated}`)
  console.log(`Skipped (already had leadership info): ${skipped}`)

  await prisma.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
