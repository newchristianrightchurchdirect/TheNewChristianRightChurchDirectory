// Dustin asked whether #4377 itself ordains women, having seen the womens_ordination flag.
// The honest answer separates two claims that the flag alone runs together, so the row now says
// which one it is resting on.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const NOTE = `**CLARIFICATION 2026-08-27 — what the \`womens_ordination\` flag on this row does and does not claim.**

Dustin asked directly whether this congregation ordains women. The two halves of that question have
different answers and the record should not blur them.

**The denomination does.** The Global Methodist Church's own FAQ states that **"Women, like men, are
called to serve in the Global Methodist Church and are entitled to serve at all levels of the Global
Methodist Church,"** and its Book of Doctrines and Discipline disclaims discrimination on the basis
of gender. The GMC's separation from the United Methodist Church was over **sexuality and polity**,
not over the ordination of women. **The flag is correct at the denominational level.**

**Whether THIS congregation does is unestablished, and nothing found suggests it has.** The church
**publishes no staff roster anywhere** — the current site has no leadership page, the surviving
United Methodist–era site returns **403 to fetchers**, and the **only clergy named on any source is
"Pastor Tim" Benjamin, a man.** No woman has been found in ordained or pastoral office here.

**So this row is the ordinary case the flag was written for**, and its own definition says as much:
it "records the DENOMINATION'S position, not necessarily this congregation's — several churches
carrying this flag are themselves complementarian, and their records say so." **This record now says
so.**

Compare the two Evangelical Presbyterian rows worked earlier the same day, which are deliberately
NOT the same case:

- **#4363 Hudson Presbyterian** — denomination permits it; **no woman among the published officers**.
  Denominational position only, exactly like this row.
- **#4367 New Albany Presbyterian** — denomination permits it, **and the published roster of ten
  ruling elders and fourteen deacons appears to include women**. That row carries \`verify_stance\`
  as well, because if true it sits below the directory's complementarian floor in practice and not
  merely on paper.

**\`genderStance\` is left \`unknown\` here rather than set either way.** The church states nothing, and
this directory does not infer the doctrine from a roster — nor, in the other direction, from a
denominational permission the congregation may never have used.`

async function main() {
  const c = await prisma.church.findUnique({ where: { id: 4377 } })
  if (!c) { console.log('#4377 NOT FOUND'); return }
  await updateStances(prisma, 4377, {}, {
    actor: 'amend-wayne-street-ordination-2026-08-27.ts',
    note: 'Clarified that womens_ordination on this row is the denomination\'s position; the congregation\'s own practice is unestablished.',
    alsoSet: {
      leadership: 'Pastor: Tim Benjamin. The church publishes no staff roster; he is the only clergy named on any source found.',
      theologicalNotes: `${c.theologicalNotes || ''}\n\n---\n\n${NOTE}`,
      sourceUrls: [
        ...(c.sourceUrls || '').split(';').map(s => s.trim()).filter(Boolean),
        'https://www.globalmethodist.org/faq',
      ].filter((v, i, a) => a.indexOf(v) === i).join(';'),
    },
  })
  console.log('#4377 clarified — denominational flag, congregation unestablished.')
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
