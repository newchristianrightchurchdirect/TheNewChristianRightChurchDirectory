// Persist manual-review findings that were written to data/manual-review-2026-07-30.md but never
// reached the database. Research that lives only in a markdown file is research that gets lost —
// it must land in theologicalNotes, which is what the site publishes as "Editor's Note".
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const FINDINGS: Array<{ id: number; leadership?: string; notable?: string; flag: string | null; notes: string; note: string }> = [
  {
    id: 23,
    leadership: 'Pastor: Bo Cogbill',
    flag: 'verify_stance',
    notes:
      'REVIEWED 2026-07-30 (partial). Pastor **Bo Cogbill**. Independently listed on the postmillennialworldview.com directory of churches with postmillennial pastors, which corroborates the eschatology at church level rather than by denominational guess. The congregation\u2019s stated mission includes "**Transforming the fallen world**". Sermon archive runs decades on SermonAudio (broadcaster `rccoffice`), with Facebook and YouTube (@reformationcovenantchurch). ' +
      '**Caveat:** the sermon topics surfaced are domestic \u2014 tithing, parenting, technology, church discipline, marriage \u2014 and no specific corporate action on a public question was found. Doctrine is corroborated; a deed is not. Kept transformationalist under the owner\u2019s ruling that corroborated conviction qualifies, flagged for confirmation.',
    note: '2026-07-30: partial review — postmill corroborated by third-party directory and mission language; no corporate action located.',
  },
  {
    id: 25,
    leadership: 'Pastor: Uri Brito',
    notable: 'Uri Brito \u2014 CREC pastor (Athanasius Presbytery) and writer at Resurrectio et Vita.',
    flag: 'verify_stance',
    notes:
      'REVIEWED 2026-07-30 (partial). Pastor **Uri Brito**, CREC Athanasius Presbytery; writes the blog *Resurrectio et Vita*. The church **offers classes on its own distinctives, among them its commitment to a postmillennial eschatology** \u2014 that is the congregation teaching postmillennialism as an official position, not an inference from CREC membership. Holds the Westminster Confession (1646) and the Heidelberg Catechism. ' +
      'Socials: facebook.com/ProvidenceCREC, x.com/ProvidenceCREC, youtube.com/@providencepensacola. The homepage carries service times only; the YouTube archive is JS-rendered and was not readable by script \u2014 a manual pass through the sermons is still outstanding.',
    note: '2026-07-30: partial review — postmill taught as an official church distinctive; sermon archive not yet read.',
  },
  {
    id: 26,
    leadership: 'Pastor: Brian Phillips',
    notable: 'Brian Phillips \u2014 Ed.D. in Classical Education; writes the Legal Update for the Association of Classical Christian Schools; teaches at Schole Academy and Oaks Classical Christian Academy.',
    flag: 'verify_stance',
    notes:
      'REVIEWED 2026-07-30 (partial). Pastor **Brian Phillips** \u2014 M.A. Theological Studies (Liberty), M.A. Christian & Classical Studies (Knox Seminary), **Ed.D. in Classical Education** (Whitefield). He writes the **Legal Update for the Association of Classical Christian Schools** and teaches Ancient History, Literature and Mythology at Schole Academy and Oaks Classical Christian Academy. The church began as a Bible study, became a mission of Christ Church in Cary NC, and was established in 2010 in the CREC. Listed on the postmillennialworldview.com directory. ' +
      '**Caveat:** classical Christian education is institution-building for the culture and is transformationalist in substance, but those academies are not obviously *this congregation\u2019s* schools \u2014 this is the pastor\u2019s vocation more than a demonstrated corporate act by the church.',
    note: '2026-07-30: partial review — classical-education institution building via the pastor; church-level action not established.',
  },
  {
    id: 28,
    leadership: 'Pastor: Virgil Hurt',
    flag: 'verify_stance',
    notes:
      'REVIEWED 2026-07-30 (partial). Pastor **Virgil Hurt**. Independently listed on the postmillennialworldview.com directory as a church with a postmillennial pastor. The congregation began in autumn 1999 and became a **mission church of Christ Church, Moscow ID in October 2000** \u2014 direct Moscow lineage rather than general CREC membership, which is a materially stronger association. ' +
      'Socials: x.com/ProvidenceKirk, instagram.com/providencekirk, facebook.com/ProvidenceKirk. No specific corporate action on a public question located yet; the socials have not been read in depth.',
    note: '2026-07-30: partial review — postmill corroborated; direct Christ Church Moscow lineage; socials not yet read.',
  },
  {
    id: 29,
    leadership: 'Pastor: Dave Hatcher',
    flag: 'verify_stance',
    notes:
      'REVIEWED 2026-07-30 \u2014 **WEAKEST OF THE CREC ROWS EXAMINED.** Pastor **Dave Hatcher**. Podcast running 2008\u20132026 with 100 episodes, but no political, abortion, cultural or civil-sphere content surfaced in search, and nothing was found beyond CREC membership itself. Listed on the postmillennialworldview.com directory, which is the only corroboration on file. ' +
      'This row is a genuine open question: it may well qualify, but at present the classification rests on denominational membership plus one third-party listing. Read the podcast archive before treating it as settled.',
    note: '2026-07-30: reviewed — no evidence found beyond CREC membership and a third-party postmill listing. Needs the podcast archive read.',
  },
]

async function main() {
  for (const f of FINDINGS) {
    const c = await prisma.church.findUnique({ where: { id: f.id } })
    if (!c) { console.log(`#${f.id} MISSING`); continue }
    const flags = new Set((c.recordFlag || '').split(';').filter(Boolean))
    if (f.flag) flags.add(f.flag)
    const srcs = new Set((c.sourceUrls || '').split(';').filter(Boolean))
    srcs.add('https://postmillennialworldview.com/postmill-churches/')
    await prisma.church.update({
      where: { id: f.id },
      data: {
        theologicalNotes: f.notes,
        leadership: f.leadership ?? c.leadership,
        notablePeople: f.notable ?? c.notablePeople,
        recordFlag: [...flags].join(';') || null,
        sourceUrls: [...srcs].join(';'),
        researchNote: f.note,
        lastResearchedAt: new Date(),
      },
    })
    console.log(`#${f.id} ${c.name} — Editor's Note saved (${f.notes.length} chars)`)
  }
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
