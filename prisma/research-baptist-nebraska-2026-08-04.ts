// Individual verification of the Baptist cluster in the signature_only queue (19 churches).
//
// "Baptist" turned out to be the least useful label in the whole queue. These nineteen belong to at
// least seven distinct bodies — SBC, GARBC, North American Baptist, Converge, two historically Black
// Missionary Baptist congregations, and a set of independent KJV-only churches — and they do NOT
// share a doctrine of last things, a polity, or a view of the church's public task.
//
// Eschatology is set only where a binding confession says so: GARBC Article XIX affirms the
// pretribulational rapture and premillennial return, which settles Park Lane. Everywhere else it is
// left unset.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'research-baptist-nebraska-2026-08-04.ts'

const NOT_Q = `**Assessment: 1 marker of 6.** Abolition evidenced and formal. No evidence of postmillennialism, theonomy, Christian nationalism or anti-Zionism, and no corporate civil-sphere activity beyond the signature. Recorded as a negative result. Remains **single issue** — examined, does not qualify.`

type Row = { id: number; note: string; stances?: Record<string, string>; also?: Record<string, unknown> }
const BASE = { abolitionStance: 'pro_abolition', sexualityStance: 'traditional' }
const COMP = { ...BASE, genderStance: 'complementarian' }

const ROWS: Row[] = [
  {
    id: 4318,
    stances: { ...COMP, eschatology: 'dispensational', theonomy: 'non_theonomic' },
    also: { denomination: 'GARBC (General Association of Regular Baptist Churches)', website: 'http://www.parklanebaptistchurch.org',
      address: '5550 N 60th Ave', phone: '402-571-6375', leadership: 'Pastor: Shawn Rittmiller',
      notablePeople: 'Shawn Rittmiller — pastor since 2010; raised in Lincoln, trained at Faith Baptist Bible College (Ankeny, Iowa) and took his M.Div. at Detroit Baptist Theological Seminary; pastored seven years in Freeland, Michigan before coming here.' },
    note: `Verified individually 2026-08-04. Self-described as "an independent, fundamental Bible believing church that fellowships with the **General Association of Regular Baptist Churches** and the **Nebraska Association of Regular Baptist Churches**."

**Eschatology is settled by the association's binding articles, not inferred.** GARBC **Article XIX** affirms the **pretribulational rapture** — the church caught up "before the seven years of the Tribulation" — followed by "the **premillennial return** of Christ in power and great glory to sit upon the throne of David and to establish His Kingdom upon this earth." Pastor **Shawn Rittmiller**'s M.Div. is from **Detroit Baptist Theological Seminary**, a consciously dispensational school, which corroborates it.

That is the same eschatology found at Alliance Berean, and the same distance from the transformationalist thesis.

${NOT_Q}`,
  },
  {
    id: 4224,
    stances: COMP,
    also: { denomination: 'SBC (Southern Baptist Convention)', website: 'https://fbcvalentine.com',
      email: 'admin@fbcvalentine.com', phone: '531-257-5592', leadership: 'Pastor: Tim Wilkinson',
      notablePeople: 'Tim Wilkinson — called here August 2022; originally from upstate New York, retired after a 22-year career in the US Air Force, then took an M.Div. at Midwestern Baptist Theological Seminary.' },
    note: `Verified individually 2026-08-04. **Southern Baptist Convention**, through the **Kansas-Nebraska Convention of Southern Baptists (Church Forward)**, the North American Mission Board and the International Mission Board.

The church states its polity carefully and it is worth quoting, because it is the Baptist answer to how a signature works: "We follow a **congregational** form of church government, meaning the ultimate authority rests with the members. While we are affiliated with the Southern Baptist Convention through shared beliefs, we remain an **independent church, accountable only to Christ**."

Pastor **Tim Wilkinson** came in August 2022 after **22 years in the US Air Force**, with an M.Div. from **Midwestern Baptist Theological Seminary**. Mission: "Making disciples of all people by leading them to Jesus through preaching, teaching, and living God's Word." Socials: Facebook and a YouTube channel.

Gender and sexuality follow the Baptist Faith and Message; the SBC binds no millennial position, so eschatology is left unset.

${NOT_Q}`,
  },
  {
    id: 4316,
    stances: COMP,
    also: { denomination: 'North American Baptist Conference (NAB)', address: '33981 205th Ave', leadership: 'Pastor: Benjamin Jones' },
    note: `Verified individually 2026-08-04. **North American Baptist Conference** — confirmed in the NAB's own church directory. The NAB is the **German Baptist** body in North America, and Shell Creek's congregational history is held in the **NAB archives**, so this is a heritage congregation of that stream rather than a recent affiliation.

A country church outside Columbus under Pastor **Benjamin Jones**. The NAB binds no millennial position; eschatology left unset.

${NOT_Q}`,
  },
  {
    id: 4240,
    stances: COMP,
    also: { website: 'https://www.ordbethelbaptist.org', address: '212 N 21st St', leadership: 'Lead Pastor: Kyle Campise',
      notablePeople: 'Kyle Campise — lead pastor; served on staff at Ridgewood in associate pastor roles for seventeen and a half years before answering the call to Bethel.' },
    note: `Verified individually 2026-08-04. **Listed in The Gospel Coalition's Nebraska church directory** — the second Baptist congregation in this queue to carry that marker, which points to confessional, Reformed-leaning evangelicalism rather than the independent fundamentalist stream that dominates the rest of the cluster.

Lead Pastor **Kyle Campise** served **seventeen and a half years** in associate roles at Ridgewood before taking this pulpit.

${NOT_Q}`,
  },
  {
    id: 4250,
    stances: BASE,
    also: { denomination: 'Converge', website: 'https://stromsburgbaptist.org', leadership: 'Pastor: Samuel Tschetter' },
    note: `Verified individually 2026-08-04. **Converge** (formerly the Baptist General Conference), confirmed in Converge's own church directory.

The congregation is a **merger of two**: the First Baptist Church of Stromsburg, organised **12 July 1873**, and the Eden Baptist Church, organised **18 September 1895**, which combined on **6 October 1933** to become Stromsburg Baptist Church. Pastor **Samuel Tschetter**.

**Gender deliberately not set.** Converge leaves the question of women in pastoral ministry to the local church rather than settling it denominationally, so complementarian cannot be inferred here as it can for the SBC and GARBC congregations in this cluster, and no congregational evidence was found either way.

${NOT_Q}`,
  },
  {
    id: 4260,
    stances: BASE,
    also: { denomination: 'Converge', website: 'https://cbccne.org', address: '804 Patterson Street', leadership: 'Pastor: Dr. Geoffrey Plummer',
      notablePeople: 'Dr. Geoffrey Plummer — pastor since 2021; M.Div. and D.Min. from Luther Rice Seminary.' },
    note: `Verified individually 2026-08-04. **Converge Heartland**, confirmed in its church directory. Pastor **Dr. Geoffrey Plummer** has served since 2021 and holds both an **M.Div. and a D.Min. from Luther Rice Seminary**. The church also publishes at orientinglife.com.

**Gender deliberately not set** — Converge leaves women in pastoral ministry to the local church.

${NOT_Q}`,
  },
  {
    id: 4298,
    stances: COMP,
    also: { denomination: 'Independent Baptist (KJV)', website: 'https://www.fbclincolnne.com', address: '1515 W South St', phone: '402-477-7541', leadership: 'Pastor: Jeffery Girdner' },
    note: `Verified individually 2026-08-04. An **independent Baptist** congregation, listed in the **KJV Churches** directory — a King James-only affiliation marker, placing it in the independent fundamental Baptist stream rather than any convention. Pastor **Jeffery Girdner**.

Eschatology left unset: the independent Baptist stream is overwhelmingly dispensational premillennial, but this congregation has no binding confession to cite and published no statement of its own, so the tendency is noted rather than recorded as a finding.

${NOT_Q}`,
  },
  {
    id: 4306,
    stances: COMP,
    also: { denomination: 'Independent Baptist (KJV)', website: 'http://freedom-baptist.us', address: '270 N Main St', leadership: 'Pastor: Jason Dowell' },
    note: `Verified individually 2026-08-04. An **independent, King James-only Baptist** church — listed in the KJV Churches directory and self-described as "a Bible preaching, Christ centered, **soul winning** church."

**The service schedule is itself the identification**: Sunday School 10, Sunday Morning 11, **Sunday Evening 6, Wednesday 7** — the full independent fundamental Baptist pattern, largely abandoned elsewhere. Pastor **Jason Dowell** publishes sermons to YouTube.

Eschatology left unset for the same reason as Fellowship Baptist: no binding confession to cite.

${NOT_Q}`,
  },
  {
    id: 4270,
    stances: COMP,
    also: { denomination: 'Independent Baptist (KJV)', website: 'https://lhbaptist.org', address: '112 Commercial St', leadership: 'Pastor: Mike Szekely' },
    note: `Verified individually 2026-08-04. An **independent, King James-only Baptist** church, listed in the KJV Churches directory. Its stated aims are to "**EXALT** the Savior; **EVANGELIZE** the sinner; and **EDIFY** the saved" — a formulation that locates the church's whole task inside worship, evangelism and discipleship, with no civil-sphere component. Pastor **Mike Szekely**.

${NOT_Q}`,
  },
  {
    id: 4302,
    stances: COMP,
    also: { denomination: 'Missionary Baptist', website: 'https://www.greaternewhopebaptist.com',
      address: '1411 N 30th St', phone: '402-342-0265', leadership: 'Pastor: Rev. Eugene F. Rollerson' },
    note: `Verified individually 2026-08-04. **A historically Black Missionary Baptist congregation in North Omaha**, at 1411 N 30th Street — and one of two on this signatory list, with Saint Matthew Missionary Baptist ten blocks south on the same street.

**This matters for how the Nebraska statement is read.** The equal-protection roster is dominated by rural white evangelical and confessional congregations; that two North Omaha Black Baptist churches signed the same document cuts against treating it as the product of a single constituency, and it is recorded here deliberately.

Pastor **Rev. Eugene F. Rollerson** is publicly active in neighbourhood mercy ministry — reported serving **SNAP recipients, unhoused neighbours** and others through a cooperative effort among North Omaha churches ("We are better together"). That is real corporate public action, and it is noted; it is mercy ministry rather than the civil-sphere programme this directory classifies on, so it does not by itself promote the record.

${NOT_Q}`,
  },
  {
    id: 4282,
    stances: COMP,
    also: { denomination: 'Missionary Baptist', address: '1001 N 30th St', phone: '402-345-5607', leadership: 'Pastor: T. Barlow' },
    note: `Verified individually 2026-08-04. **St. Matthew Missionary Baptist Church**, a historically Black congregation in **North Omaha** at 1001 N 30th Street, founded **1998** — the second of two North Omaha Black Baptist churches on this signatory list, with Greater New Hope ten blocks north on the same street.

Pastor **T. Barlow**; the congregation's public presence is its Facebook page (stmbc). Little beyond the signature could be read, and that is stated rather than filled in.

${NOT_Q}`,
  },
  {
    id: 4235,
    stances: COMP,
    also: { address: '137 I Street', leadership: 'Pastor: Joel Wentworth' },
    note: `Verified individually 2026-08-04. A **Sandhills** congregation — the church notes that in a town of 1,210, "some of their church family travel **up to 40 miles**" to attend, which is worth recording as the practical shape of rural Nebraska ministry.

Pastor **Joel Wentworth** preaches expositionally and publishes to Facebook and YouTube; recent series work through **Genesis** (chs. 40–41, on Joseph and hardship), **Philippians 3** ("Keeping the Gospel Pure") and **John 16:33** ("Training for Trouble"). Nothing civil-sphere surfaces in the archive.

${NOT_Q}`,
  },
  {
    id: 4285,
    stances: COMP,
    also: { address: '107 E Nile St', leadership: 'Pastor: Jeremy Bradshaw' },
    note: `Verified individually 2026-08-04. Pastor **Jeremy Bradshaw**. The congregation publishes its sermons through **PodPoint** as "First Baptist Church of Cairo, NE" — a small church maintaining a public preaching archive, which is how the pulpit was checked.

${NOT_Q}`,
  },
  {
    id: 4246,
    stances: COMP,
    also: { website: 'https://gothenburgbaptist.org', leadership: 'Pastor: Dan Urman' },
    note: `Verified individually 2026-08-04. The congregation presents itself as **Gothenburg Baptist Church** rather than "First Baptist Church of Gothenburg" as the signatory list recorded it; the website is gothenburgbaptist.org. Pastor **Dan Urman**.

Gothenburg is notable in this dataset for density: **four** of its congregations signed — this one, Trinity Lutheran (LCMC), Victory Assembly of God, Cornerstone Bible Church and Tallin Church — making it one of the most heavily represented towns on the roster.

${NOT_Q}`,
  },
  {
    id: 4278,
    stances: COMP,
    also: { website: 'http://www.mccookbaptist.org', address: '329 N Cherokee Rd', leadership: 'Pastor: Dr. Walt Ray' },
    note: `Verified individually 2026-08-04. Pastor **Dr. Walt Ray** and his wife Sarah came from **South Texas** and are originally from the **Lynchburg, Virginia** area — the Liberty University orbit, noted as a biographical fact rather than an affiliation, since no institutional link was established.

${NOT_Q}`,
  },
  {
    id: 4310,
    stances: COMP,
    also: { website: 'https://www.firstbaptistnorfolk.com', address: '404 W. Benjamin Ave', leadership: 'Pastor: Rev. Jason D. Owens' },
    note: `Verified individually 2026-08-04. Pastor **Rev. Jason D. Owens**, who maintains a personal **Vimeo** channel (pastorjasonowens) alongside the church's own site. One of four Norfolk congregations on the signatory list, with LifePoint, One Hope Fellowship and Heartland Church.

${NOT_Q}`,
  },
  {
    id: 4289,
    stances: COMP,
    also: { leadership: 'Pastor: Daniel Bear' },
    note: `Verified individually 2026-08-04. Pastor **Daniel Bear**, in Howard County. No independent church website was found and the congregation's public footprint is limited to state and directory listings, so nothing beyond the signature could be read on the remaining markers. Stated rather than filled in.

${NOT_Q}`,
  },
  {
    id: 4293,
    stances: COMP,
    also: { phone: '402-547-7294', leadership: 'Pastor: John Hart' },
    note: `Verified individually 2026-08-04. Pastor **John Hart**. Sunday pattern is **9:30 family Sunday school, 10:30 worship, and a meal served following the service** — a shared table every Lord's Day, which in a town of Tekamah's size is the congregation's main public face.

${NOT_Q}`,
  },
  {
    id: 180,
    stances: COMP,
    also: { website: 'https://columbusfbc.net' },
    note: `Verified individually 2026-08-04. Already in the directory before the signatory import, and matched to the Nebraska roster during it. One of three Columbus congregations on the list, with Columbus Berean and Shell Creek Baptist.

${NOT_Q}`,
  },
]

async function main() {
  for (const r of ROWS) {
    const before = await prisma.church.findUnique({ where: { id: r.id } })
    if (!before) { console.log(`  #${r.id} NOT FOUND`); continue }
    const changed = await updateStances(prisma, r.id, (r.stances || {}) as never, {
      actor: ACTOR,
      note: 'Individually verified; markers set only where a binding confession or convention actually settles them. GARBC Article XIX settles Park Lane’s eschatology; elsewhere it is left unset.',
      alsoSet: {
        ...(r.also || {}),
        stanceBasis: 'evidenced',
        researchStatus: 'researched',
        recordFlag: null,
        lastResearchedAt: new Date(),
        researchNote: '2026-08-04: individually verified to the full research standard. Nebraska Baptist cluster.',
        theologicalNotes: `${before.theologicalNotes || ''}\n\n---\n\n${r.note}`,
        sourceUrls: [before.sourceUrls, r.also?.website].filter(Boolean).join(';'),
      },
    })
    console.log(`  #${r.id} ${before.name} (${before.city}) — verified; changed: ${changed.join(', ') || 'none'}`)
  }
  console.log(`\nsignature_only remaining: ${await prisma.church.count({ where: { recordFlag: { contains: 'signature_only' } } })}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
