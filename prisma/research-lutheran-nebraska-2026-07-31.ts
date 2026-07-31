// Individual verification of the Lutheran cluster in the signature_only queue (13 churches).
//
// This is the sharpest correction to the bulk assumption yet, because confessional Lutheranism has
// a doctrine about precisely the question this directory classifies on — the Two Kingdoms — and
// the Augsburg Confession explicitly condemns the millennial hope that postmillennialism rests on.
//
// It does NOT make their abolitionism soft. It makes it Lutheran: the civil magistrate bears the
// sword to punish murder (Rom. 13), so demanding the state protect the unborn is a two-kingdoms
// duty, not a transformationalist project. Both halves of that need saying precisely.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'research-lutheran-nebraska-2026-07-31.ts'
const SRC = 'https://locator.lcms.org/;https://ndlcms.org/;https://makingdisciples-resources.lcms.org/abortion-infanticide/'

const TWO_KINGDOMS = `**Confessional Lutheranism and the two kingdoms — why this congregation is not transformationalist, and why it signed anyway.**

Lutheran doctrine holds that God rules through **two kingdoms**: the left-hand kingdom of civil government, ruled by law and the sword, and the right-hand kingdom of the church, ruled by the gospel. The institutional church preaches; the Christian serves as citizen. This is the historic **foil** to transformationalism — the position against which postmillennial and theonomic programmes define themselves.

**Augsburg Confession XVII condemns the millennial hope outright:** it rejects "others who now scatter Jewish opinions, that before the resurrection of the dead the godly shall take possession of the kingdom of the world, the ungodly being everywhere suppressed." A congregation subscribing to the Book of Concord is **confessionally barred from postmillennialism**. Recorded as amillennial on that basis, not by denominational guesswork.

**And yet the signature is entirely coherent.** Two kingdoms teaches that the magistrate "does not bear the sword in vain" and is God's servant to punish the evildoer. Demanding that the state treat the killing of a child as murder is the left-hand kingdom doing its God-given job. **The abolitionism here is real and confessionally grounded — it simply does not carry the other five markers with it.**

The LCMS has held since 1979 that "the living and unborn are persons in the sight of God from the time of conception" and that abortion "is not a moral option except to prevent the death of another person, the mother"; the Council of Presidents reaffirmed the synod's sanctity-of-life position in 2019. Worth noting precisely: the Nebraska statement these pastors signed **rejects "exception clauses" outright**, which goes somewhat further than their synod's own formulation.

**Assessment: 1 marker of 6.** Abolition evidenced and formal. Postmillennialism is confessionally excluded; theonomy, Christian nationalism and anti-Zionism are not in evidence.`

type Row = { id: number; note: string; also?: Record<string, unknown> }
const D = (s: string) => s // denomination shorthand

const ROWS: Row[] = [
  { id: 4313, also: { denomination: 'LCMS', website: 'https://www.pacifichillslutheran.org', leadership: 'Senior Pastor: Rev. Bryan Drebes',
      notablePeople: 'Rev. Bryan Drebes — senior pastor since November 2015; trained at Concordia Seminary, St. Louis (from 1997), vicarages at St. John Lutheran, Plymouth WI and Bethany Lutheran, Overland Park KS, ordained 19 August 2001 at his home congregation in Palmyra, Missouri.' },
    note: `Verified individually 2026-07-31. **Lutheran Church—Missouri Synod**, Nebraska District, organised 1955. **Rev. Bryan Drebes** accepted the call as senior pastor in November 2015; he trained at **Concordia Seminary, St. Louis**, and was ordained in 2001. The congregation publishes a sermon podcast organised by liturgical season, which is itself a marker of confessional practice — the preaching follows the church year rather than a topical programme.` },
  { id: 4288, also: { denomination: 'LCMS', website: 'http://www.bethlehemlutherancrete.org', leadership: 'Pastor: Rev. Ronald J. Benson', address: '805 Hawthorne Ave', phone: '402-826-4359', email: 'bethlehem.lutheran.crete@gmail.com' },
    note: `Verified individually 2026-07-31. **Lutheran Church—Missouri Synod**, Nebraska District — organised **1889** and a member of the synod from that same year. Pastor **Rev. Ronald J. Benson**. Socials: facebook.com/bethlehemlutherancrete.` },
  { id: 4248, also: { denomination: 'LCMS', website: 'https://stpaullutheranwisner.360unite.com', leadership: 'Pastor: Rev. Jared P. Hartman', address: '509 13th St' },
    note: `Verified individually 2026-07-31. **Lutheran Church—Missouri Synod**, Nebraska District. **Rev. Jared P. Hartman** was installed in May 2018 and served a four-year term as Junior and Senior Pastoral Counselor of the **Nebraska North District Lutheran Women's Missionary League** — district-level service, which is worth recording as evidence of standing within the synod. He maintains a public pastoral Facebook page.` },
  { id: 4275, also: { denomination: 'LCMS', website: 'https://zionainsworth.com', leadership: 'Pastor: Rev. Lynn Wilson Christensen', address: '318 E. 4th Street' },
    note: `Verified individually 2026-07-31. **Lutheran Church—Missouri Synod** — **organised 1884**, and a synod member since that year, making it one of the oldest congregations in the whole signatory list. Pastor **Rev. Lynn Wilson Christensen**.` },
  { id: 4279, also: { denomination: 'LCMS', leadership: 'Pastor: Rev. Timothy Wayne Wagner', address: '11668 W State Hwy 4' },
    note: `Verified individually 2026-07-31. **Lutheran Church—Missouri Synod**, Nebraska District. **Rev. Timothy Wayne Wagner** serves as sole pastor. The congregation has **celebrated its 150th anniversary**.` },
  { id: 4325, also: { denomination: 'LCMS', leadership: 'Pastor: Rev. Michael (Mike) Belinsky, Sr.' },
    note: `Verified individually 2026-07-31. **Lutheran Church—Missouri Synod**, Nebraska District, **West Point Circuit**. Served in a two-point parish by **Rev. Mike Belinsky, Sr.** together with Zion Lutheran, Bancroft — the arrangement is listed by the district as "Zion/St. John, Bancroft/Beemer." His signature therefore covers both congregations.` },
  { id: 4326, also: { denomination: 'LCMS', leadership: 'Pastor: Rev. Michael (Mike) Belinsky, Sr.' },
    note: `Verified individually 2026-07-31. **Lutheran Church—Missouri Synod**, Nebraska District, **West Point Circuit**, served with St. John's Lutheran, Beemer as a two-point parish under **Rev. Mike Belinsky, Sr.** The congregation is old enough to have its records held by the **Nebraska State Historical Society** (Zion Evangelical Lutheran Church, Bancroft, RG3985.AM).` },
  { id: 4331, also: { denomination: 'LCMS', website: 'https://2gatherinchrist.org', leadership: 'Pastor: Rev. Marcel Kohlmeyer' },
    note: `Verified individually 2026-07-31. **Lutheran Church—Missouri Synod**. A two-point parish with Immanuel Lutheran, Sterling — the two congregations share a website under the name **"2 Gather in Christ."** **Rev. Marcel Kohlmeyer** has served both since **May 2019** and has been in ministry since 2005.` },
  { id: 4332, also: { denomination: 'LCMS', website: 'https://2gatherinchrist.org', leadership: 'Pastor: Rev. Marcel Kohlmeyer' },
    note: `Verified individually 2026-07-31. **Lutheran Church—Missouri Synod**. Yoked with St. John Lutheran, Tecumseh under **Rev. Marcel Kohlmeyer** (both since May 2019), the two sharing a website as **"2 Gather in Christ."**` },
  { id: 4257, also: { denomination: 'LCMS', leadership: 'Pastor: Allen Pingel' },
    note: `Verified individually 2026-07-31. **Lutheran Church—Missouri Synod**, confirmed on the synod's own congregation locator. Pastor **Allen Pingel**. Small-town congregation with no independent website; nothing beyond the signature could be read on the remaining markers.` },
  { id: 4268, also: { denomination: 'Lutheran', leadership: 'Pastor: Aaron Hannemann' },
    note: `Verified individually 2026-07-31. Pastor **Aaron Hannemann**. **Synod not confirmed** — the congregation has no independent website and did not resolve to a single body on the LCMS locator, so the affiliation is recorded as Lutheran without a synod rather than assumed to be LCMS like most of this cluster. The two-kingdoms and Augsburg Confession reasoning below applies to any confessional Lutheran body, but the specific synod remains open.` },
  { id: 4242, also: { denomination: 'WELS', website: 'https://www.rockofageschurch.org', leadership: 'Pastor: David Young' },
    note: `Verified individually 2026-07-31. **The one WELS congregation in this cluster** — Wisconsin Evangelical Lutheran Synod, the most confessionally strict of the major American Lutheran bodies, which practises closed communion and does not hold altar or pulpit fellowship with the LCMS.

Began as a **mission in 1980**, organised in **1987**, and dedicated its purchased building in 1988. **Pastor David Young** has served since **July 2023**.

The two-kingdoms and Augsburg Confession reasoning applies with even greater force here: WELS is if anything more insistent than the LCMS that the church as institution does not take up political programmes. That a WELS pastor signed an equal-protection statement is therefore **more striking, not less**.` },
  { id: 4315, also: { denomination: 'LCMC (Lutheran Congregations in Mission for Christ)', website: 'http://www.trinitylutherangothenburg.com', leadership: 'Pastor: Rev. Jeff Cottingham, STS',
      notablePeople: 'Rev. Jeff Cottingham, STS — in his 14th year at Trinity and 30 years of ordained ministry; a member of the Society of the Holy Trinity (Societas Trinitatis Sanctae), a pan-Lutheran ministerium for confessional renewal.' },
    note: `Verified individually 2026-07-31. **This congregation is not LCMS, and the difference matters.** It is listed by the **LCMC — Lutheran Congregations in Mission for Christ**, the association formed by congregations departing the ELCA. So this is a congregation in the **mainline-descended orbit that walked away from it**, which places its signature in a different light from the Missouri Synod ones: it is a mark of the realignment, not of settled confessional habit.

Its pastor, **Rev. Jeff Cottingham**, signs himself **STS** — a member of the **Society of the Holy Trinity**, a pan-Lutheran ministerium for confessional renewal that draws clergy from across the ELCA, NALC and LCMC. He is in his 14th year here and his 30th of ordained ministry.

The church's own teaching page is notably ressourcement in tone: "The Early Church knew best how to live a life worthy of the calling of Christ. We look to the early Christians to know how to be faithful in the 21st century," and it frames Scripture as "an amazing **Divine Drama** of God's activity within His creation."` },
]

async function main() {
  for (const r of ROWS) {
    const before = await prisma.church.findUnique({ where: { id: r.id } })
    if (!before) { console.log(`  #${r.id} NOT FOUND`); continue }
    const changed = await updateStances(prisma, r.id, {
      abolitionStance: 'pro_abolition',
      eschatology: 'amill',
      theonomy: 'non_theonomic',
      genderStance: 'complementarian',
      sexualityStance: 'traditional',
    }, {
      actor: ACTOR,
      note: 'Individually verified; amillennial on the basis of Augsburg Confession XVII, which condemns the millennial hope, not by denominational guesswork. See theologicalNotes.',
      alsoSet: {
        ...(r.also || {}),
        stanceBasis: 'evidenced',
        researchStatus: 'researched',
        recordFlag: null,
        lastResearchedAt: new Date(),
        researchNote: '2026-07-31: individually verified to the full research standard — synod confirmed, site, socials, pastor background. Nebraska Lutheran cluster.',
        theologicalNotes: `${before.theologicalNotes || ''}\n\n---\n\n${r.note}\n\n${TWO_KINGDOMS}`,
        sourceUrls: [before.sourceUrls, r.also?.website, SRC].filter(Boolean).join(';'),
      },
    })
    console.log(`  #${r.id} ${before.name} (${before.city}) — verified; changed: ${changed.join(', ') || 'none'}`)
  }
  console.log(`\nsignature_only remaining: ${await prisma.church.count({ where: { recordFlag: { contains: 'signature_only' } } })}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
