import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Get all churches ordered by current ID
  const churches = await prisma.church.findMany({
    select: { id: true },
    orderBy: { id: 'asc' }
  })

  console.log(`Total churches: ${churches.length}`)
  console.log(`Current ID range: ${churches[0]?.id} to ${churches[churches.length - 1]?.id}`)
  console.log(`Target ID range: 1 to ${churches.length}`)

  // Get all reports to update their churchId references
  const reports = await prisma.report.findMany({ select: { id: true, churchId: true } })
  console.log(`Reports to update: ${reports.length}`)

  // Build old->new ID mapping
  const idMap = new Map<number, number>()
  churches.forEach((c, i) => idMap.set(c.id, i + 1))

  // Step 1: Move all IDs to a temporary high range to avoid conflicts
  // (since we can't have two rows with the same ID during renumbering)
  const tempOffset = 1000000
  console.log('\nStep 1: Moving to temp IDs...')

  // Use raw SQL for efficiency - disable FK constraints, update in bulk
  await prisma.$executeRaw`ALTER TABLE "Report" DROP CONSTRAINT IF EXISTS "Report_churchId_fkey"`

  // Batch update churches to temp IDs
  for (let i = 0; i < churches.length; i += 100) {
    const batch = churches.slice(i, i + 100)
    await prisma.$transaction(
      batch.map((c, j) =>
        prisma.church.update({
          where: { id: c.id },
          data: { id: tempOffset + i + j }
        })
      )
    )
    if ((i + 100) % 1000 === 0 || i + 100 >= churches.length) {
      console.log(`  Temp IDs: ${Math.min(i + 100, churches.length)}/${churches.length}`)
    }
  }

  // Update report churchIds to temp
  for (const r of reports) {
    const newChurchId = idMap.get(r.churchId)
    if (newChurchId !== undefined) {
      // Find what temp ID this church got
      const idx = churches.findIndex(c => c.id === r.churchId)
      if (idx >= 0) {
        await prisma.report.update({
          where: { id: r.id },
          data: { churchId: tempOffset + idx }
        })
      }
    }
  }

  // Step 2: Move from temp IDs to final sequential IDs (1, 2, 3, ...)
  console.log('\nStep 2: Setting final IDs...')
  for (let i = 0; i < churches.length; i += 100) {
    const batch = churches.slice(i, i + 100)
    await prisma.$transaction(
      batch.map((c, j) =>
        prisma.church.update({
          where: { id: tempOffset + i + j },
          data: { id: i + j + 1 }
        })
      )
    )
    if ((i + 100) % 1000 === 0 || i + 100 >= churches.length) {
      console.log(`  Final IDs: ${Math.min(i + 100, churches.length)}/${churches.length}`)
    }
  }

  // Update report churchIds to final
  for (const r of reports) {
    const newChurchId = idMap.get(r.churchId)
    if (newChurchId !== undefined) {
      const idx = churches.findIndex(c => c.id === r.churchId)
      if (idx >= 0) {
        await prisma.report.update({
          where: { id: r.id },
          data: { churchId: idx + 1 }
        })
      }
    }
  }

  // Step 3: Reset the autoincrement sequence
  console.log('\nStep 3: Resetting autoincrement sequence...')
  await prisma.$executeRaw`SELECT setval('"Church_id_seq"', ${churches.length}, true)`

  // Verify
  const newChurches = await prisma.church.findMany({
    select: { id: true },
    orderBy: { id: 'asc' }
  })
  console.log(`\nDone! New ID range: ${newChurches[0]?.id} to ${newChurches[newChurches.length - 1]?.id}`)
  console.log(`Total: ${newChurches.length} churches`)

  // Verify sequential
  let gaps = 0
  for (let i = 0; i < newChurches.length; i++) {
    if (newChurches[i].id !== i + 1) {
      gaps++
      if (gaps <= 5) console.log(`  Gap at expected ${i + 1}, got ${newChurches[i].id}`)
    }
  }
  if (gaps === 0) console.log('All IDs are sequential starting from 1!')
  else console.log(`WARNING: ${gaps} gaps found`)

  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
