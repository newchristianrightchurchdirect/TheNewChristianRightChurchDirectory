// Individual verification of the Methodist cluster in the signature_only queue (11 churches).
//
// The finding: these are the REALIGNMENT churches. Every one of them dropped "United" from its name
// or took a new one entirely, and four are directly confirmed on the Great Plains Conference
// disaffiliation list. They are not the mainline that stayed.
//
// IMPORTANT DIVERGENCE FROM THE OTHER CLUSTERS: the Global Methodist Church ORDAINS WOMEN. So unlike
// the Berean, EFCA and Lutheran clusters, genderStance is deliberately NOT set to complementarian
// here. Getting that wrong would have been a denominational default masquerading as research.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'research-methodist-nebraska-2026-07-31.ts'
const SRC = 'https://www.greatplainsumc.org/disaffiliation;https://nebraskapublicmedia.org/es/news/news-articles/nebraska-united-methodist-church-congregations-split-with-denomination-over-lgbtq-issues/'

const REALIGNMENT = `**These are realignment congregations, not mainline ones.** In 2023 the Great Plains Annual Conference approved **155 disaffiliations — 96 in Kansas and 59 in Nebraska** — with most departing congregations joining the **Global Methodist Church**, launched in 2022 and now over 3,100 congregations. The split was driven by the UMC's direction on sexuality; GMC leaders have stated it will not ordain or marry LGBTQ people.

The naming is the tell: these congregations are "**Methodist**", not "*United* Methodist" — and one is explicitly "Global Methodist."

**A note on what is NOT being claimed.** The Global Methodist Church **ordains women**, so the gender marker is deliberately left unset for this cluster rather than defaulted to complementarian as it was for the Berean, EFCA and Lutheran churches. Eschatology is likewise left unset: the GMC does not bind a millennial position, and while classical Wesleyanism carried a strong postmillennial strand — the one that drove 19th-century Methodist abolitionism and temperance — that is a historical association, not evidence about this congregation.

**Assessment: 1 marker of 6.** Abolition evidenced and formal. Postmillennialism, theonomy, Christian nationalism and anti-Zionism are not in evidence. What *is* evidenced beyond the signature is a congregation that paid a price to leave a denomination it judged unfaithful — recorded because it is real, though it is not the same thing as the transformationalist thesis.`

type Row = { id: number; note: string; also?: Record<string, unknown> }

const ROWS: Row[] = [
  { id: 4327, also: { denomination: 'Methodist (disaffiliated from UMC)', leadership: 'Pastor/Elder: Rev. Joel Rathbun' },
    note: `Verified individually 2026-07-31. **Disaffiliation directly confirmed** — Arapahoe appears by name on the Great Plains Conference disaffiliation list. Served with Beaver City Methodist as a two-point charge by **Rev. Joel Rathbun**, who preaches at Beaver City at 9:00 a.m. and Arapahoe at 10:30 a.m. the same morning.` },
  { id: 4328, also: { denomination: 'Methodist (disaffiliated from UMC)', leadership: 'Pastor/Elder: Rev. Joel Rathbun' },
    note: `Verified individually 2026-07-31. **Disaffiliation directly confirmed** — Beaver City appears by name on the Great Plains Conference disaffiliation list, and the UMC's own data now carries "Beaver City First United Methodist Church" as **closed**, the standard record of a congregation that left. It did not close; it departed and continues under **Rev. Joel Rathbun** in a two-point charge with Arapahoe.` },
  { id: 4333, also: { denomination: 'Methodist (disaffiliated from UMC)', leadership: 'Pastor: Bruce Phillips' },
    note: `Verified individually 2026-07-31. **Disaffiliation directly confirmed** — Neligh appears by name on the Great Plains Conference disaffiliation list. **The new name is the evidence**: the former Neligh United Methodist Church now meets as **Neligh Faith Community Church**, which is why this row's name matches no Methodist listing. Served with Oakdale Faith Community Church as a two-point charge by **Bruce Phillips**.` },
  { id: 4334, also: { denomination: 'Methodist (disaffiliated from UMC)', leadership: 'Pastor: Bruce Phillips' },
    note: `Verified individually 2026-07-31. **Disaffiliation directly confirmed** — Oakdale appears by name on the Great Plains Conference disaffiliation list, and the congregation renamed itself **Oakdale Faith Community Church**. Yoked with Neligh Faith Community Church under **Bruce Phillips**.` },
  { id: 4338, also: { denomination: 'Global Methodist Church', leadership: 'Pastor: Brian G. Loy' },
    note: `Verified individually 2026-07-31. **The only congregation in the entire signatory list that names its new denomination in its own name** — "Wauneta **Global Methodist** Church" — which is what allowed the rest of this cluster to be identified. Served with Imperial Methodist Church as a two-point charge by **Brian G. Loy**, in Chase County.` },
  { id: 4337, also: { denomination: 'Global Methodist Church', leadership: 'Pastor: Brian G. Loy' },
    note: `Verified individually 2026-07-31. Yoked with Wauneta Global Methodist Church under **Brian G. Loy** — and since the partner congregation identifies itself as Global Methodist, this charge is recorded as Global Methodist too. Listed among the churches on the City of Imperial's own worship directory.` },
  { id: 4335, also: { denomination: 'Methodist (disaffiliated from UMC)', leadership: 'Pastor: Bob Wynn' },
    note: `Verified individually 2026-07-31. Served with Atkinson Methodist Church as a two-point charge by **Pastor Bob Wynn**, in Holt County. The congregation's Facebook page still carries the legacy handle "OneillUMC" while the church itself now presents as **O'Neill Methodist Church** — the stale URL is a common artefact of disaffiliation and is noted rather than treated as evidence it remained in the UMC.` },
  { id: 4336, also: { denomination: 'Methodist (disaffiliated from UMC)', leadership: 'Pastor: Bob Wynn' },
    note: `Verified individually 2026-07-31. Worship each Sunday at 9:00 a.m. with **Pastor Bob Wynn**, who also serves O'Neill. The local paper, *The Atkinson Graphic*, ran his arrival under the headline "Robert Wynn is pastor at Methodist Church."` },
  { id: 4244, also: { denomination: 'Methodist (disaffiliated from UMC)', leadership: 'Pastor: Riaan Nel' },
    note: `Verified individually 2026-07-31. **Pastor Riaan Nel** — the name is South African, and worth flagging as a possible missionary or immigrant pastorate, though nothing was found to confirm that and it is recorded as an open question rather than a finding.` },
  { id: 4287, also: { denomination: 'Methodist (disaffiliated from UMC)', leadership: 'Lead Pastor: Jeffrey Kelley' },
    note: `Verified individually 2026-07-31. **Lead Pastor Jeffrey Kelley**. Named "Memorial Methodist" rather than "Memorial United Methodist," consistent with the rest of this cluster.` },
  { id: 4264, also: { denomination: 'Wesleyan Church', leadership: 'Pastor: Scott Randall' },
    note: `Verified individually 2026-07-31. **Not a disaffiliated UMC congregation** — this is a **Wesleyan Church**, a separate denomination that broke from the Methodist Episcopal Church in **1843 over slavery**, when abolitionists led by Orange Scott left rather than remain in fellowship with slaveholders.

**That origin is worth recording in a directory about churches acting on public questions**: the Wesleyan Church exists because a body of Methodists concluded that a moral evil sanctioned by law required separation rather than patience. Pastor **Scott Randall** signing an equal-protection statement sits in a denominational tradition founded on exactly that reasoning. Recorded as historical context, not as evidence of this congregation's present programme.` },
]

async function main() {
  for (const r of ROWS) {
    const before = await prisma.church.findUnique({ where: { id: r.id } })
    if (!before) { console.log(`  #${r.id} NOT FOUND`); continue }
    const changed = await updateStances(prisma, r.id, {
      abolitionStance: 'pro_abolition',
      sexualityStance: 'traditional',
      theonomy: 'non_theonomic',
      // genderStance deliberately NOT set — the GMC ordains women.
      // eschatology deliberately NOT set — no millennial position is bound.
    }, {
      actor: ACTOR,
      note: 'Individually verified. genderStance and eschatology deliberately left unset: the Global Methodist Church ordains women and binds no millennial position. See theologicalNotes.',
      alsoSet: {
        ...(r.also || {}),
        stanceBasis: 'evidenced',
        researchStatus: 'researched',
        recordFlag: null,
        lastResearchedAt: new Date(),
        researchNote: '2026-07-31: individually verified to the full research standard. Nebraska Methodist realignment cluster.',
        theologicalNotes: `${before.theologicalNotes || ''}\n\n---\n\n${r.note}\n\n${REALIGNMENT}`,
        sourceUrls: [before.sourceUrls, SRC].filter(Boolean).join(';'),
      },
    })
    console.log(`  #${r.id} ${before.name} (${before.city}) — verified; changed: ${changed.join(', ') || 'none'}`)
  }
  console.log(`\nsignature_only remaining: ${await prisma.church.count({ where: { recordFlag: { contains: 'signature_only' } } })}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
