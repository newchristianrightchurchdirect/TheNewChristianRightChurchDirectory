// Eight Nebraska signatories each serve TWO congregations, listed in the source as
//   <Pastor>, <Title>
//   <Church A>, <City A>
//   <Church B>, <City B>
//   <County> County
// which the import parser could not read — it expects one church and a "City, X County" line.
// Read from the source PDF by hand and verified line by line. Sixteen congregations.
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const DRY = process.argv.includes('--dry-run')
const API_KEY = process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyAlbr6hJiUMhkkcB8EgFOEmy_p3czP8Rqc'
const SRC = 'https://abolishabortionne.org/docs/Biblical-Counsel-to-Nebraska-on-Abortion-2024.pdf;https://abolishabortionne.org/'

const ENTRIES: Array<{ pastor: string; title: string; churches: Array<[string, string]> }> = [
  { pastor: 'Michael Belinsky, Sr.', title: 'Pastor', churches: [["St. John's Lutheran Church", 'Beemer'], ['Zion Lutheran Church', 'Bancroft']] },
  { pastor: 'Rev. Joel Rathbun', title: 'Pastor/Elder', churches: [['Arapahoe Methodist Church', 'Arapahoe'], ['Beaver City Methodist Church', 'Beaver City']] },
  { pastor: 'Gregory Lawhorn', title: 'Pastor', churches: [['One Hope Fellowship', 'Norfolk'], ['Community of Believers Church', 'Creighton']] },
  { pastor: 'Marcel Kohlmeyer', title: 'Pastor', churches: [['St. John Lutheran Church', 'Tecumseh'], ['Immanuel Lutheran Church', 'Sterling']] },
  { pastor: 'Bruce Phillips', title: 'Pastor', churches: [['Neligh Faith Community Church', 'Neligh'], ['Oakdale Faith Community Church', 'Oakdale']] },
  { pastor: 'Bob Wynn', title: 'Pastor', churches: [["O'Neill Methodist Church", "O'Neill"], ['Atkinson Methodist Church', 'Atkinson']] },
  { pastor: 'Brian G. Loy', title: 'Pastor', churches: [['Imperial Methodist Church', 'Imperial'], ['Wauneta Global Methodist Church', 'Wauneta']] },
  { pastor: 'Lee E. Wonch', title: 'Pastor', churches: [['Tallin Church', 'Gothenburg'], ['Amazing Grace Church', 'Thedford']] },
]

const STATEMENT =
  'SIGNATORY — **"Biblical Counsel from the Protestant Pastors of the Church in Nebraska" (2024)**. ' +
  'The document states that *"life begins at conception, abortion is murder, and the human being in ' +
  'the womb is entitled to **equal protection under the law**, which means parent(s) and doctor are ' +
  'guilty of murder in the civil criminal code"*, and explicitly rejects *"incrementalism, ' +
  'politicization, exception clauses, heartbeat bills"*. Signing it is a formal, attributable act.'

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
    return pl?.location ? { lat: pl.location.latitude, lng: pl.location.longitude, addr: pl.formattedAddress as string } : null
  } catch { return null }
}

async function main() {
  let added = 0, skipped = 0
  for (const e of ENTRIES) {
    const partner = e.churches.map(([n, c]) => `${n} (${c})`).join(' and ')
    for (const [name, city] of e.churches) {
      const dupe = await prisma.church.findFirst({
        where: { state: 'NE', city: { equals: city, mode: 'insensitive' }, name: { equals: name, mode: 'insensitive' } },
      })
      if (dupe) { skipped++; console.log(`  SKIP already present: ${name} (${city})`); continue }
      if (DRY) { added++; console.log(`  would add: ${name} (${city}) — ${e.pastor}`); continue }
      const g = await geo(`${name}, ${city}, Nebraska`)
      const created = await prisma.church.create({
        data: {
          name, city, state: 'NE',
          address: g?.addr?.split(',')[0] || '',
          leadership: `${e.title}: ${e.pastor}`,
          latitude: g?.lat ?? null, longitude: g?.lng ?? null,
          abolitionStance: 'pro_abolition',
          culturalEngagement: 'transformationalist',
          stanceBasis: 'evidenced',
          researchStatus: 'researched',
          recordFlag: 'signature_only',
          sourceUrls: SRC,
          approved: true,
          lastResearchedAt: new Date(),
          description: `A congregation in ${city}, Nebraska whose pastor signed the 2024 Nebraska pastors' statement calling for equal protection of the preborn.`,
          theologicalNotes: STATEMENT + ` Signed here by **${e.pastor}** (${e.title}), who serves ${partner}.` +
            '\n\nAdded 2026-07-31. **The abolition stance is first-hand and formal**; nothing else about this congregation has been researched — denomination, eschatology and the remaining markers are unset and the church has not been read on its own terms. Flagged `signature_only`.',
          researchNote: `2026-07-31: added from the Nebraska equal-protection signatory list; pastor ${e.pastor} serves two congregations.`,
        },
      })
      await prisma.stanceChange.create({
        data: { churchId: created.id, churchName: created.name, field: 'abolitionStance',
                oldValue: null, newValue: 'pro_abolition', actor: 'nebraska-multichurch-2026-07-31.ts',
                note: `Created from the Nebraska equal-protection signatory list; signed by ${e.pastor}.` },
      })
      added++
      console.log(`  ADDED #${created.id} ${name} (${city}) — ${e.pastor}`)
    }
  }
  console.log(`\n${DRY ? 'WOULD ADD' : 'ADDED'} ${added}   already present: ${skipped}`)
  if (!DRY) {
    console.log(`total churches: ${await prisma.church.count()}`)
    console.log(`pro_abolition: ${await prisma.church.count({ where: { approved: true, abolitionStance: 'pro_abolition' } })}`)
  }
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
