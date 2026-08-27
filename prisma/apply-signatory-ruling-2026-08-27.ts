// Dustin's ruling, 2026-08-27, on a question the Orrville Statement forced:
//
//   A PASTOR'S SIGNATURE ON ANOTHER MAN'S PUBLIC DECLARATION COUNTS AS A PUBLIC ACT —
//   BUT ONLY WHEN THE DOCUMENT ITSELF MAKES A CLAIM ON THE CIVIL OR PUBLIC ORDER.
//
// Signing two narrow single-question petitions is still single_issue. Signing something that
// claims the civil sphere is acting in the civil sphere, whoever held the pen.
//
// And the corollary this batch demonstrates: A CHURCH'S OWN CONFESSION OUTRANKS A SIGNATURE.
// #4353 signed the same document and is NOT promoted, because its statement of faith is
// nonresistant, pretribulational and dispensational.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'apply-signatory-ruling-2026-08-27.ts'

const RULING = `**PROMOTED to transformationalist 2026-08-27 under a ruling made today.**

The question this row forced: **John Marino authored the Orrville Statement; this church's pastor
signed it.** Does signing another man's public declaration count as action in the public sphere?

**Dustin's ruling: it counts — but only when the document itself makes a claim on the civil or
public order.** Signing two narrow single-question petitions remains \`single_issue\`. Signing a
document that claims the civil sphere is acting in the civil sphere, whoever held the pen.

The Orrville Statement clears that bar without difficulty. It asserts **dominion** ("God requires
humanity to subdue and exercise dominion over the world"), **Christ's lordship over every domain**
against "any person, ideology, **government**, philosophy, theology, religion," an explicit
**denial of neutrality** ("no such thing as morality without Christ"), and direct claims on public
policy — against outsourcing parenting "to the state (school)" and against able-bodied fathers on
"government benefits."

**Two public questions, therefore: abortion via the equal-protection petition, and the civil and
moral order of a county via the Orrville Statement.**

**The corollary, recorded because it decided a row the other way on the same day:** a church's own
confession outranks its pastor's signature. **#4353 Orrville Grace Brethren signed the identical
document and was NOT promoted**, because its statement of faith is nonresistant, pretribulational
and dispensational — it does not claim the sphere the statement claims.`

const ROWS = [
  {
    id: 2684,
    extra: `**This row carried more than the signature.** Teaching elder **Matt Timmons trained at
Whitefield Theological Seminary** — Kenneth Talbot's school, and a standing lead in this project at
eight rows and counting. The congregation is Reformed and family-integrated, holds **both the
Westminster and the 1689 London Baptist** confessions, is listed in the Founders directory, and
appears in the 2011 theonomy church directory despite having been founded in 2016. **Two men from
this one congregation signed the Orrville Statement** — Timmons and elder **Mike Naylor** — and
Ashland is not Wayne County, so they signed a neighbouring county's document.

The 2026-08-05 pass applied the full standard here and deliberately left every marker at
\`unknown\`. That was correct on what it had. It did not have this document.`,
  },
  {
    id: 4370,
    extra: `**Eric Sipe** has pastored Calvary Bible Church, 3865 North High Street, Columbus, since
**July 2010**, and teaches at **VCY Bible Institute**. The identification was checked rather than
assumed: the Orrville Statement lists him without a city and is a Wayne County document, while this
congregation is ninety miles away — but his LinkedIn, the church site and its Facebook page all
place him here, and no second Ohio Eric Sipe pastors a Calvary Bible Church. Compare the standing
trap on Rick Prettyman's "Christ Community Church," which resolved to Louisiana.

**Still unread on this row:** his VCY Bible Institute teaching.`,
  },
]

async function main() {
  const dry = process.argv.includes('--dry')
  for (const r of ROWS) {
    const c = await prisma.church.findUnique({ where: { id: r.id } })
    if (!c) { console.log(`  #${r.id} NOT FOUND`); continue }
    if (dry) { console.log(`  [dry] #${r.id} ${c.name}: ${c.culturalEngagement} -> transformationalist`); continue }
    const changed = await updateStances(prisma, r.id, { culturalEngagement: 'transformationalist' }, {
      actor: ACTOR,
      note: 'Ruling 2026-08-27: a signature on a public declaration that itself claims the civil order counts as a public act.',
      alsoSet: {
        researchStatus: 'researched',
        stanceBasis: 'evidenced',
        lastResearchedAt: new Date(),
        researchNote: `2026-08-27: FULL standard applied. PROMOTED under the signatory ruling — signed the Orrville Statement, which claims the civil order.`,
        theologicalNotes: `${c.theologicalNotes || ''}\n\n---\n\n${RULING}\n\n${r.extra}`,
      },
    })
    console.log(`  #${r.id} ${c.name} — PROMOTED (${changed.join(', ') || 'no change'})`)
  }
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
