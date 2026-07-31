// The Nebraska pastors' equal-protection statement — "Biblical Counsel from the Protestant
// Pastors of the Church in Nebraska" (2024), abolishabortionne.org.
//
// 122 signatories extracted from the PDF with church and city. The document states the
// abolitionist position without ambiguity: "life begins at conception, abortion is murder, and
// the human being in the womb is entitled to equal protection under the law, which means
// parent(s) and doctor are guilty of murder in the civil criminal code" — and it explicitly
// rejects "incrementalism, politicization, exception clauses, heartbeat bills".
//
// Signing is a formal, attributable public act by the pastor. That makes it stronger evidence
// than a directory listing, a denomination, or a reported sermon.
//
//   npx tsx prisma/nebraska-equal-protection-2026-07-31.ts --dry-run
//   npx tsx prisma/nebraska-equal-protection-2026-07-31.ts
import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
import { updateStances } from '../lib/stance-audit'

const prisma = new PrismaClient()
const DRY = process.argv.includes('--dry-run')
const API_KEY = process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyAlbr6hJiUMhkkcB8EgFOEmy_p3czP8Rqc'
const SRC = 'https://abolishabortionne.org/docs/Biblical-Counsel-to-Nebraska-on-Abortion-2024.pdf;https://abolishabortionne.org/'
const ACTOR = 'nebraska-equal-protection-2026-07-31.ts'

const STATEMENT =
  'SIGNATORY — **"Biblical Counsel from the Protestant Pastors of the Church in Nebraska" (2024)**. ' +
  'The document states the abolitionist position without ambiguity: *"life begins at conception, ' +
  'abortion is murder, and the human being in the womb is entitled to **equal protection under the ' +
  'law**, which means parent(s) and doctor are guilty of murder in the civil criminal code."* It ' +
  'explicitly rejects *"incrementalism, politicization, exception clauses, heartbeat bills... and ' +
  'criminal laws that leave the mother (and father) and the doctor guiltless before society."* ' +
  'Signing it is a formal, attributable public act by the pastor.'

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ')
  .replace(/\b(the|a|of|at|in|church|churches|congregation|inc)\b/g, ' ').replace(/\s+/g, ' ').trim()
const cityKey = (s: string) => s.toLowerCase().replace(/[^a-z ]/g, '').trim()

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
  const sig = readFileSync('data/nebraska-equal-protection-signatories.txt', 'utf8')
    .split('\n').filter(Boolean)
    .map(l => { const [pastor, church, city] = l.split('|'); return { pastor, church, city } })

  const rows = await prisma.church.findMany({ where: { state: 'NE' } })

  // ---- 1. update congregations already held ----
  const byRow = new Map<number, { row: typeof rows[number]; pastors: string[]; church: string }>()
  const missing: typeof sig = []
  for (const s of sig) {
    const m = rows.find(r => cityKey(r.city) === cityKey(s.city) && norm(r.name) === norm(s.church.split(' / ')[0]))
    if (m) {
      if (!byRow.has(m.id)) byRow.set(m.id, { row: m, pastors: [], church: s.church })
      byRow.get(m.id)!.pastors.push(s.pastor)
    } else missing.push(s)
  }

  let corrected = 0
  for (const { row, pastors } of byRow.values()) {
    const wasIncrementalist = row.abolitionStance === 'incrementalist'
    if (wasIncrementalist) corrected++
    if (DRY) continue
    await updateStances(prisma, row.id, {
      abolitionStance: 'pro_abolition',
      culturalEngagement: 'transformationalist',
    }, {
      actor: ACTOR,
      note: `${pastors.join(' and ')} signed the 2024 Nebraska pastors' equal-protection statement, which calls for abortion to be prosecuted as murder with parent and doctor accountable, and explicitly rejects incrementalism.${wasIncrementalist ? ' CORRECTION: this row previously read abolitionStance = incrementalist, the opposite of the position its pastor signed.' : ''}`,
      alsoSet: {
        stanceBasis: 'evidenced',
        recordFlag: null,
        leadership: row.leadership || `Pastor: ${pastors[0]}`,
        sourceUrls: [...new Set([...(row.sourceUrls || '').split(';').filter(Boolean), ...SRC.split(';')])].join(';'),
        theologicalNotes: (row.theologicalNotes || '') + '\n\n' + STATEMENT +
          ` Signed here by **${pastors.join(' and ')}**.` +
          (wasIncrementalist ? ' **This corrects the record:** the row previously read `abolitionStance = incrementalist`, which is the position the document its pastor signed explicitly repudiates.' : ''),
        researchNote: `2026-07-31: confirmed signatory of the Nebraska pastors' equal-protection statement (2024).`,
      },
    })
    console.log(`  UPDATED #${row.id} ${row.name} <- ${pastors.join(', ')}${wasIncrementalist ? '  [CORRECTED from incrementalist]' : ''}`)
  }

  // ---- 2. add congregations not yet held ----
  console.log(`\nadding ${missing.length} congregations not yet in the directory...`)
  let added = 0, noCoords = 0
  for (const s of missing) {
    const name = s.church.split(' / ')[0].trim()
    if (DRY) { added++; continue }
    const dupe = await prisma.church.findFirst({
      where: { state: 'NE', city: { equals: s.city, mode: 'insensitive' }, name: { equals: name, mode: 'insensitive' } },
    })
    if (dupe) continue
    const g = await geo(`${name}, ${s.city}, Nebraska`)
    if (!g) noCoords++
    const created = await prisma.church.create({
      data: {
        name, city: s.city, state: 'NE',
        address: g?.addr?.split(',')[0] || '',
        leadership: `Pastor: ${s.pastor}`,
        latitude: g?.lat ?? null, longitude: g?.lng ?? null,
        abolitionStance: 'pro_abolition',
        culturalEngagement: 'transformationalist',
        stanceBasis: 'evidenced',
        researchStatus: 'researched',
        sourceUrls: SRC,
        approved: true,
        lastResearchedAt: new Date(),
        description: `A congregation in ${s.city}, Nebraska whose pastor signed the 2024 Nebraska pastors' statement calling for equal protection of the preborn.`,
        theologicalNotes: STATEMENT + ` Signed here by **${s.pastor}**.` +
          (s.church.includes(' / ') ? ` The signature lists the congregation as "${s.church}".` : '') +
          '\n\nAdded 2026-07-31 from that signatory list. **The abolition stance is first-hand and formal** — the pastor put his name to a public document demanding criminalisation. Nothing else about this congregation has been researched yet: denomination, eschatology and the other markers are unset, and the church has not been read on its own terms.',
        researchNote: `2026-07-31: added from the Nebraska equal-protection signatory list. Abolition evidenced by signature; all other markers unresearched.`,
      },
    })
    added++
    await prisma.stanceChange.create({
      data: { churchId: created.id, churchName: created.name, field: 'abolitionStance',
              oldValue: null, newValue: 'pro_abolition', actor: ACTOR,
              note: `Created from the Nebraska equal-protection signatory list; signed by ${s.pastor}.` },
    })
  }

  console.log(`\n${DRY ? 'WOULD UPDATE' : 'UPDATED'} ${byRow.size} (${corrected} corrected from incrementalist)`)
  console.log(`${DRY ? 'WOULD ADD' : 'ADDED'} ${added}   without coordinates: ${noCoords}`)
  if (!DRY) {
    console.log(`\ntotal churches: ${await prisma.church.count()}`)
    console.log(`pro_abolition: ${await prisma.church.count({ where: { approved: true, abolitionStance: 'pro_abolition' } })}`)
    console.log(`evidenced: ${await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist', stanceBasis: 'evidenced' } })}`)
  }
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
