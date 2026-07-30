// Remove the 28 rows that were approved by mistake on 2026-07-30: 6 congregations flagged
// `closed` and 22 flagged `duplicate_of:N`. They surfaced in the admin dashboard as if they
// were submission requests, because that screen does not show recordFlag.
//
// DUPLICATES ARE MERGED BEFORE THEY ARE DELETED. A duplicate row often carries a detail the
// surviving row lacks — a website, an email, a sentence of research. Deleting first and asking
// later has already cost this directory a Knox Open Letter signatory note once.
//
// Only factual/contact fields and research text are merged. STANCE FIELDS ARE NEVER COPIED:
// the survivor is the researched row, and these duplicates mostly hold denominational defaults,
// so copying them would quietly downgrade an evidenced stance to a guess.
//
//   npx tsx prisma/purge-mistaken-approvals-2026-07-30.ts --dry-run
//   npx tsx prisma/purge-mistaken-approvals-2026-07-30.ts
import { PrismaClient } from '@prisma/client'
import { writeFileSync } from 'fs'
import { join } from 'path'

const prisma = new PrismaClient()
const DRY = process.argv.includes('--dry-run')

// Contact/factual fields worth rescuing from a duplicate. Stances are deliberately absent.
const FILLABLE = [
  'website', 'phone', 'email', 'address', 'zip', 'leadership', 'description',
] as const

const isEmpty = (v: unknown) => v == null || v === '' || v === 'unknown'

async function main() {
  const cutoff = new Date(Date.now() - 6 * 3600000)
  const targets = await prisma.church.findMany({
    where: { updatedAt: { gte: cutoff }, NOT: { id: 58 } }, // #58 All Souls is a legitimate row
    orderBy: { id: 'asc' },
  })

  const closed = targets.filter(c => /closed/.test(c.recordFlag || ''))
  const dupes = targets.filter(c => /duplicate_of/.test(c.recordFlag || ''))
  const other = targets.filter(c => !closed.includes(c) && !dupes.includes(c))

  console.log(`targets: ${targets.length}  (closed ${closed.length}, duplicates ${dupes.length}, other ${other.length})`)
  if (other.length) {
    console.log('REFUSING TO RUN — unexpected rows in the window:')
    other.forEach(c => console.log(`   #${c.id} ${c.name} flag=${c.recordFlag}`))
    await prisma.$disconnect()
    process.exit(1)
  }

  // Full backup before anything is written, so any of this can be reconstructed.
  const backup = join(process.cwd(), 'data', `purged-approvals-backup-2026-07-30.json`)
  writeFileSync(backup, JSON.stringify(targets, null, 1), 'utf8')
  console.log(`backup written: ${backup}\n`)

  let merged = 0
  for (const dup of dupes) {
    const survivorId = Number((dup.recordFlag || '').match(/duplicate_of:(\d+)/)![1])
    const survivor = await prisma.church.findUnique({ where: { id: survivorId } })
    if (!survivor) { console.log(`  #${dup.id} -> survivor #${survivorId} MISSING, skipping merge`); continue }

    const patch: Record<string, unknown> = {}
    for (const f of FILLABLE) {
      if (isEmpty((survivor as any)[f]) && !isEmpty((dup as any)[f])) patch[f] = (dup as any)[f]
    }
    if (survivor.latitude == null && dup.latitude != null) { patch.latitude = dup.latitude; patch.longitude = dup.longitude }

    // Union the sources.
    const sSrc = (survivor.sourceUrls || '').split(';').filter(Boolean)
    const dSrc = (dup.sourceUrls || '').split(';').filter(Boolean)
    const addSrc = dSrc.filter(u => !sSrc.includes(u))
    if (addSrc.length) patch.sourceUrls = [...sSrc, ...addSrc].join(';')

    // Keep research text the survivor does not already contain.
    const dNote = (dup.theologicalNotes || '').trim()
    if (dNote && !(survivor.theologicalNotes || '').includes(dNote)) {
      patch.theologicalNotes =
        `${survivor.theologicalNotes || ''}\n\nFrom merged duplicate record #${dup.id}: ${dNote}`.trim()
    }

    if (Object.keys(patch).length) {
      merged++
      console.log(`  #${dup.id} -> #${survivorId}  merge: ${Object.keys(patch).join(', ')}`)
      if (!DRY) {
        await prisma.church.update({
          where: { id: survivorId },
          data: { ...patch, researchNote: `2026-07-30: absorbed duplicate record #${dup.id} (${dup.name}) before it was deleted.` },
        })
      }
    } else {
      console.log(`  #${dup.id} -> #${survivorId}  nothing to merge`)
    }
  }

  console.log(`\nmerged into survivors: ${merged} of ${dupes.length}`)
  console.log(`closed congregations to delete: ${closed.map(c => '#' + c.id).join(' ')}`)

  if (!DRY) {
    const ids = targets.map(c => c.id)
    const res = await prisma.church.deleteMany({ where: { id: { in: ids } } })
    console.log(`\nDELETED ${res.count} rows`)
    console.log(`total now: ${await prisma.church.count()}  unapproved: ${await prisma.church.count({ where: { approved: false } })}`)
  } else {
    console.log(`\nWOULD DELETE ${targets.length} rows`)
  }
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
