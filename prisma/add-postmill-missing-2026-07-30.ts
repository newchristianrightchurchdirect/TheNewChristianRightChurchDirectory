// Two jobs from the postmillennialworldview.com cross-reference:
//
//  1. Resolve the 10 eschatology conflicts in the directory's favour (owner's call), each
//     flagged verify_stance rather than silently overwritten.
//  2. Add the 99 congregations the directory lists that are not here under that name/location.
//
// Everything added carries stanceBasis 'mixed' and recordFlag verify_stance: a third-party
// listing is a lead, not a verdict, and must stay distinguishable from a church we have read.
//
//   npx tsx prisma/add-postmill-missing-2026-07-30.ts --dry-run
//   npx tsx prisma/add-postmill-missing-2026-07-30.ts
import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
import { updateStances } from '../lib/stance-audit'

const prisma = new PrismaClient()
const DRY = process.argv.includes('--dry-run')
const API_KEY = process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyAlbr6hJiUMhkkcB8EgFOEmy_p3czP8Rqc'
const SRC = 'https://postmillennialworldview.com/postmill-churches/'
const ACTOR = 'add-postmill-missing-2026-07-30.ts'

const CONFLICTS = [31, 440, 885, 106, 979, 2142, 1507, 1585, 1755, 174]

async function geo(q: string) {
  try {
    const r = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': API_KEY,
                 'X-Goog-FieldMask': 'places.location,places.formattedAddress' },
      body: JSON.stringify({ textQuery: q, maxResultCount: 1 }),
    })
    if (!r.ok) return null
    const pl = (await r.json()).places?.[0]
    if (!pl?.location) return null
    return { lat: pl.location.latitude, lng: pl.location.longitude, addr: pl.formattedAddress as string }
  } catch { return null }
}

async function main() {
  // ---- 1. eschatology conflicts ----
  console.log('=== conflicts -> postmill ===')
  for (const id of CONFLICTS) {
    const c = await prisma.church.findUnique({ where: { id } })
    if (!c) { console.log(`  #${id} missing`); continue }
    console.log(`  #${id} ${c.name}: ${c.eschatology} -> postmill`)
    if (DRY) continue
    const flags = new Set((c.recordFlag || '').split(';').filter(Boolean)); flags.add('verify_stance')
    const srcs = new Set((c.sourceUrls || '').split(';').filter(Boolean)); srcs.add(SRC)
    await updateStances(prisma, id, { eschatology: 'postmill' }, {
      actor: ACTOR,
      note: `Eschatology conflict resolved in favour of the postmillennialworldview.com directory, which lists this pastor as postmillennial. Previous value "${c.eschatology}" was itself most likely a denominational default. Owner's call; flagged verify_stance for independent confirmation.`,
      alsoSet: { recordFlag: [...flags].join(';'), sourceUrls: [...srcs].join(';'), stanceBasis: 'mixed' },
    })
  }

  // ---- 2. add the missing congregations ----
  const { unmatched } = JSON.parse(readFileSync('data/postmill-xref-2026-07-30.json', 'utf8'))
  console.log(`\n=== adding ${unmatched.length} congregations ===`)
  let added = 0, skipped = 0, noCoords = 0
  for (const u of unmatched) {
    const dupe = await prisma.church.findFirst({
      where: { state: u.state, city: { equals: u.city, mode: 'insensitive' }, name: { equals: u.name, mode: 'insensitive' } },
    })
    if (dupe) { skipped++; continue }
    if (DRY) { added++; continue }

    const g = await geo(`${u.name}, ${u.city}, ${u.state}`)
    if (!g) noCoords++
    const created = await prisma.church.create({
      data: {
        name: u.name, city: u.city, state: u.state,
        address: g?.addr?.split(',')[0] || '', zip: null,
        denomination: null,
        leadership: u.pastor ? `Pastor: ${u.pastor}` : null,
        latitude: g?.lat ?? null, longitude: g?.lng ?? null,
        culturalEngagement: 'transformationalist',
        eschatology: 'postmill',
        stanceBasis: 'mixed',
        researchStatus: 'researched',
        recordFlag: 'verify_stance',
        sourceUrls: SRC,
        approved: true,
        lastResearchedAt: new Date(),
        description: `A postmillennial congregation in ${u.city}, ${u.state}.`,
        theologicalNotes: `Added 2026-07-30 from the postmillennialworldview.com directory of churches with postmillennial pastors${u.pastor ? ` (pastor: ${u.pastor})` : ''}. **NOT INDEPENDENTLY VERIFIED** — third-party listing only; the church's own site, socials and preaching have not yet been read.`,
        researchNote: '2026-07-30: added from third-party postmill directory. Flagged verify_stance pending individual research.',
      },
    })
    // Record the classification in the audit trail even though the row is new.
    await prisma.stanceChange.create({
      data: { churchId: created.id, churchName: created.name, field: 'culturalEngagement',
              oldValue: null, newValue: 'transformationalist', actor: ACTOR,
              note: 'Created from third-party postmill directory; awaiting independent verification.' },
    })
    added++
  }

  console.log(`${DRY ? 'WOULD ADD' : 'ADDED'} ${added}   already present: ${skipped}   without coords: ${noCoords}`)
  if (!DRY) {
    console.log(`\ntotal churches: ${await prisma.church.count()}`)
    console.log(`transformationalist: ${await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist' } })}`)
    console.log(`awaiting verification: ${await prisma.church.count({ where: { recordFlag: { contains: 'verify_stance' } } })}`)
  }
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
