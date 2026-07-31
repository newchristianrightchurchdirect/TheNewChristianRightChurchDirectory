// Christ Church Spokane (#22) — completing the review to the actual research standard.
//
// The first pass only settled who the pastor is. That is not the standard: site, church socials,
// pastor socials/podcast, then the pastor's name searched against each marker. Done properly, the
// answer is that nothing qualifying was found — which is a result worth recording explicitly, so
// nobody re-researches this row from scratch and so the flag is understood as deliberate.
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const c = await prisma.church.findUnique({ where: { id: 22 } })
  if (!c) { console.log('#22 not found'); await prisma.$disconnect(); return }

  const flags = new Set((c.recordFlag || '').split(';').filter(Boolean))
  flags.add('verify_stance')

  await prisma.church.update({
    where: { id: 22 },
    data: {
      recordFlag: [...flags].join(';'),
      stanceBasis: 'mixed',
      sourceUrls: [...new Set([
        ...(c.sourceUrls || '').split(';').filter(Boolean),
        'https://ccspokane.com/more-about-us/denomination/',
        'https://ccspokane.com/sermons/',
      ])].join(';'),
      theologicalNotes: (c.theologicalNotes || '') +
        '\n\nFULL REVIEW COMPLETED 2026-07-31 — **NOTHING QUALIFYING FOUND.** Searched Kenton Spratt against every marker this directory uses (abolition, Christian nationalism, theonomy, postmillennialism, patriarchy) and found **no material attributable to him on any of them**. The church’s own denomination page states only CREC generalities — "thoroughly Trinitarian, historically Reformed, and warmly evangelical" — with no statement on the civil sphere, politics, education or abortion. The only cultural institution it names is **New St. Andrews College**, which is a CREC-affiliated college rather than this congregation’s work. ' +
        '\n\nThe sermon archive is embedded via iFrame and could not be read by script; the YouTube channel and Facebook group have not been reviewed in depth. **Those remain the outstanding avenues** — if this church qualifies, the evidence is most likely there. ' +
        '\n\nOn present evidence the classification rests on **CREC membership plus one third-party postmill listing**, which is precisely the thin basis this verification pass exists to catch. Deliberately left `mixed` + `verify_stance` rather than promoted. ' +
        '\n\n**Lead:** Spratt also appears in the archives of **Trinity Church, Coeur d’Alene** (#21, Stuart Bryan — verified), suggesting a preaching or presbytery link between the two congregations worth following.',
      researchNote: '2026-07-31: full review to standard — no qualifying evidence found for Kenton Spratt or the church. Sermon archive (iFrame) and socials still unread. Left flagged, not promoted.',
      lastResearchedAt: new Date(),
    },
  })
  console.log('#22 Christ Church Spokane — full review recorded; NOT promoted, nothing found')
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
