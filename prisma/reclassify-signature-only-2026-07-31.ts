// Dustin's call, 2026-07-31: transformationalist must mean evidenced corporate civil-sphere
// engagement, not merely hitting one marker.
//
// The bulk signatory import set culturalEngagement = 'transformationalist' on every church whose
// pastor signed an equal-protection statement. Individually verifying 43 of them showed that label
// is wrong at scale: NONE are postmillennial, 13 are confessionally BARRED from postmillennialism
// by Augsburg Confession XVII, and 3 are explicitly pretribulational dispensational premillennial.
//
// New value: 'single_issue' — examined, acts publicly on one question, not shown to be
// transformationalist in the fuller sense. It does NOT qualify as an NXR church.
//
// The one exception is Minden E-Free, where the engagement is evidenced independently of the
// signature: Dr. Tom Barnes publishes political theology on government and economics.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'reclassify-signature-only-2026-07-31.ts'
const KEEP = new Set([4229]) // Minden E-Free — Tom Barnes, evidenced engagement in his own writing

const NOTE = `\n\n---\n\n**RECLASSIFIED 2026-07-31 — from "transformationalist" to "single issue."** This church entered the directory because its pastor signed a public equal-protection statement, and the bulk import recorded that as transformationalist cultural engagement. Individually verifying this cohort showed the inference did not hold: **none of the verified churches are postmillennial**, several are confessionally barred from postmillennialism, and their public ministry is otherwise ordinary congregational life.

**Nothing about the abolition finding has changed** — the signature is first-hand, formal and attributable, and it stands. What changed is the claim built on top of it. **This congregation is recorded as acting publicly on one question, and is not counted as a qualifying New Christian Right church.** Promotion requires evidence of the church acting corporately on public questions in its own right.`

async function main() {
  const flagged = await prisma.church.findMany({
    where: { recordFlag: { contains: 'signature_only' } }, select: { id: true },
  })
  const verified = await prisma.church.findMany({
    where: { researchNote: { contains: '2026-07-31: individually verified' } }, select: { id: true },
  })
  const ids = [...new Set([...flagged, ...verified].map(c => c.id))].filter(id => !KEEP.has(id))
  console.log(`candidates: ${ids.length} (kept as transformationalist: ${[...KEEP].join(', ')})`)

  let changed = 0
  for (const id of ids) {
    const before = await prisma.church.findUnique({ where: { id } })
    if (!before) continue
    if (before.culturalEngagement !== 'transformationalist') continue
    await updateStances(prisma, id, { culturalEngagement: 'single_issue' }, {
      actor: ACTOR,
      note: 'Transformationalist now requires evidenced corporate civil-sphere engagement; a signature on an equal-protection statement evidences abolition only. Abolition stance unchanged.',
      alsoSet: { theologicalNotes: `${before.theologicalNotes || ''}${NOTE}` },
    })
    changed++
  }

  console.log(`reclassified to single_issue: ${changed}`)
  const c = (v: string) => prisma.church.count({ where: { approved: true, culturalEngagement: v } })
  console.log(`\napproved by engagement:`)
  console.log(`  transformationalist (QUALIFYING): ${await c('transformationalist')}`)
  console.log(`  single_issue:                     ${await c('single_issue')}`)
  console.log(`  limited_mission:                  ${await c('limited_mission')}`)
  console.log(`  quietist:                         ${await c('quietist')}`)
  console.log(`  unknown:                          ${await c('unknown')}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
