// Individual verification of the Reformed/Presbyterian cluster (13 churches).
//
// This is the cluster where a genuine qualifier finally turns up: Christ Church Omaha is CREC and
// its own mission statement is explicitly transformationalist. It is promoted OUT of single_issue.
//
// It is also the cluster with the most heterogeneous polity, which matters: the EPC and the
// Evangelical Covenant Church BOTH ORDAIN WOMEN, so complementarian is not set for them, while the
// PCA, URCNA and RCUS restrict office to men and it is.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'research-reformed-2026-07-31.ts'

const NOT_Q = `**Assessment: 1 marker of 6.** Abolition evidenced and formal. No evidence of postmillennialism, theonomy, Christian nationalism or anti-Zionism, and no corporate civil-sphere activity beyond the signature. Recorded as a negative result. Remains **single issue** — examined, does not qualify.`

type Row = {
  id: number; note: string
  stances?: Record<string, string>
  also?: Record<string, unknown>
}

const ROWS: Row[] = [
  {
    // THE QUALIFIER.
    id: 4290,
    stances: {
      culturalEngagement: 'transformationalist',
      christianNationalism: 'sympathetic',
      genderStance: 'complementarian',
      sexualityStance: 'traditional',
      abolitionStance: 'pro_abolition',
    },
    also: {
      denomination: 'CREC (Communion of Reformed Evangelical Churches)',
      website: 'https://christchurchomaha.org',
      address: '4223 S 120th St',
      leadership: 'Pastor: Nathan Joslin; Elders: George Little, Grant Little; Deacon: Andrew Harris',
      notablePeople: 'Nathan Joslin — church planter and pastor since the congregation was established in 2023.',
    },
    note: `**PROMOTED TO QUALIFYING 2026-07-31 — the first church in the signatory queue to earn it on its own evidence.**

Christ Church Omaha is a member of the **CREC (Communion of Reformed Evangelical Churches)**, Knox Presbytery, planted in **2023** under Pastor **Nathan Joslin**. Its motto is the Kuyperian one: **"All of Christ for all of life."**

**Its own mission statement is the evidence, and it is unambiguous.** The stated desire is

> "to **make Omaha a Christian town** through faithful and robust covenant renewal worship on the Lord's Day, through proclamation of the gospel to unbelievers, while training additional evangelists… through establishing a family-friendly culture of **Christian education**… through **genuine cultural engagement that provides Christian leadership in the arts, in business, in education, in politics, and in literature**."

That is a church claiming the civil and cultural spheres **as a church** — not a signature, not a member acting privately. It is exactly what this directory was built to find.

On Scripture it refuses cultural accommodation in terms: "In a day when many people soften hard truths, our culture desperately needs to hear God's Word clearly, accurately, and boldly. Therefore, **we will not exclude anything based on the cultural sensitivities of our day**."

Worship is **covenant renewal** on the CREC pattern — Call to Worship, Confession, Consecration, Communion, Commissioning — with all children, "from infants to young adults," kept in the service and taught to participate in the liturgy. Its bylaws adopt the **Westminster Confession with the Larger and Shorter Catechisms and the Three Forms of Unity** (Belgic, Dort, Heidelberg), "of which we are in essential agreement." Office is held by men: a pastor, two elders and a deacon.

**On eschatology, deliberately left unset.** The CREC does *not* doctrinally require postmillennialism, though its pastors are overwhelmingly postmillennial, and this congregation has published no millennial position — the sermon archive is expository (currently working through **Nehemiah**, a rebuilding-the-city book, with weekly exhortations from the Psalms). "Make Omaha a Christian town" is the postmillennial hope in substance, but substance is not a stated position, and it is recorded as an open question rather than a finding.

**Christian nationalism recorded as sympathetic** on the strength of "make Omaha a Christian town" together with the explicit call for Christian leadership in politics — the substance of the position, though the church does not use the term.`,
  },
  {
    id: 4301,
    stances: { genderStance: 'complementarian', sexualityStance: 'traditional', abolitionStance: 'pro_abolition' },
    also: { denomination: 'PCA', website: 'https://www.zionpca.com', address: '5511 S 27th St',
      leadership: 'Lead Pastor: Stu Kerns; Executive Pastor: David Chambers' },
    note: `Verified individually 2026-07-31. **Presbyterian Church in America**, Platte Valley Presbytery, and listed in **The Gospel Coalition's Nebraska church directory**.

**A leadership correction:** the signatory **David Chambers is the executive pastor**, not the senior minister — the lead pastor is **Stu Kerns**. The row previously recorded Chambers alone as "Pastor," which overstated his office. Both are now recorded.

The PCA restricts ordained office to men and holds a traditional view of marriage, so those two markers are evidenced denominationally; the PCA binds no millennial position, so eschatology is left unset.

${NOT_Q}`,
  },
  {
    id: 4320,
    stances: { genderStance: 'complementarian', sexualityStance: 'traditional', abolitionStance: 'pro_abolition' },
    also: { denomination: 'PCA', website: 'https://gracegi.org', leadership: 'Pastor: Todd Bowen' },
    note: `Verified individually 2026-07-31. **Presbyterian Church in America**, Platte Valley Presbytery. **Todd Bowen has pastored here since 1997** — nearly thirty years, which is worth recording: this signature comes from a deeply settled ministry, not a passing one.

${NOT_Q}`,
  },
  {
    id: 4262,
    stances: { genderStance: 'complementarian', sexualityStance: 'traditional', abolitionStance: 'pro_abolition' },
    also: { denomination: 'Evangelical Free Church of America (EFCA)', website: 'https://www.livinglifereformed.org',
      address: '603 Russell St', leadership: 'Pastor: Nat Crawford',
      notablePeople: 'Nat Crawford — pastor, author, executive coach and conference speaker; MA in Christian Apologetics (Biola University) and MA in Biblical Exposition (Moody Bible Institute).' },
    note: `Verified individually 2026-07-31. **The name is misleading and the record is corrected accordingly: despite being called "Living Life Reformed Church," this is an EFCA congregation** — "Living Life Church is an EFCA church located in Firth, Nebraska," and it appears in the EFCA's own church finder. It was grouped with the Reformed churches by name and does not belong there.

Pastor **Nat Crawford** holds an MA in Christian Apologetics from **Biola** and an MA in Biblical Exposition from **Moody**, and works as an author, executive coach and conference speaker. The church describes itself as "Gospel-Centered, Bible-Lead, and Community-Focused" and maintains a YouTube channel.

Because it is EFCA, eschatology is left unset — the denomination struck "premillennial" from its statement of faith in 2019 and binds no millennial position.

${NOT_Q}`,
  },
  {
    id: 3653,
    stances: { genderStance: 'complementarian', sexualityStance: 'traditional', abolitionStance: 'pro_abolition' },
    also: { denomination: 'RCUS (Reformed Church in the United States)', website: 'https://emmanuelreformedrcus.org',
      address: '110 S Way Ave', leadership: 'Pastor: Carl Gobelman' },
    note: `Verified individually 2026-07-31. **Reformed Church in the United States (RCUS)** — a small, strictly confessional Reformed denomination holding the **Three Forms of Unity** (Heidelberg Catechism, Belgic Confession, Canons of Dort).

**Organised 20 February 1877** as the German Reformed Church under Rev. William Bonekeeper, whose father had ministered to Reformed families in **Russia** — this is a **Volga German** congregation, documented as such by the Volga German Institute, with its records held by the Nebraska State Historical Society. Pastor **Carl Gobelman**.

**Three RCUS congregations signed the Nebraska statement** (Emmanuel and Hope in Sutton, and Omaha Reformed). Against a denomination of only a few dozen churches nationally, that is a **proportionally striking level of participation** and worth flagging for the deep-dive queue.

${NOT_Q}`,
  },
  {
    id: 3654,
    stances: { genderStance: 'complementarian', sexualityStance: 'traditional', abolitionStance: 'pro_abolition' },
    also: { denomination: 'RCUS (Reformed Church in the United States)', website: 'https://hopereformedrcus.com',
      leadership: 'Pastor: Scott Henry' },
    note: `Verified individually 2026-07-31. **Reformed Church in the United States (RCUS)**, holding the Three Forms of Unity.

**Organised in 1908 by 72 families who withdrew from Emmanuel Reformed Church** in the same town — originally the *Free German Reformed Hope Church*. It joined the RCUS **Eureka Classis in 1945** and took its present name in 1946. **Both congregations of that 1908 split signed the same statement in 2024**, which is a detail worth keeping.

Pastor **Scott Henry**. Sermons are published on **SermonAudio** (broadcaster hopercus).

${NOT_Q}`,
  },
  {
    id: 3647,
    stances: { genderStance: 'complementarian', sexualityStance: 'traditional', abolitionStance: 'pro_abolition' },
    also: { denomination: 'RCUS (Reformed Church in the United States)', website: 'https://omahareformed.com',
      address: '4905 N 96th St', leadership: 'Pastor: Rev. Randall Klynsma' },
    note: `Verified individually 2026-07-31. **Reformed Church in the United States (RCUS)** — and notably **a church plant, not an inherited congregation**: begun as RCUS home mission work in **2015**, with **Rev. Randall Klynsma** called as associate pastor of St. John's Reformed Church (RCUS) in Lincoln specifically to plant in the Omaha metro, taking up the work on **1 February 2016**.

That a denomination this small is actively planting, and that the plant's pastor signed, is worth recording. Sermons on **SermonAudio** (broadcaster omahareformed).

${NOT_Q}`,
  },
  {
    id: 4245,
    stances: { sexualityStance: 'traditional', abolitionStance: 'pro_abolition' },
    also: { denomination: 'EPC (Evangelical Presbyterian Church)', leadership: 'Pastor: Rev. Mark Rohrbach' },
    note: `Verified individually 2026-07-31. **Evangelical Presbyterian Church**, confirmed in the **Presbytery of the West** church directory under **Rev. Mark Rohrbach**.

**Gender deliberately not set.** The EPC treats the ordination of women as a matter of liberty rather than a settled position, so unlike the PCA, URCNA and RCUS congregations in this cluster, complementarian cannot be inferred from the denomination and no congregational evidence was found either way. Recorded as open.

${NOT_Q}`,
  },
  {
    id: 4276,
    stances: { sexualityStance: 'traditional', abolitionStance: 'pro_abolition' },
    also: { denomination: 'Evangelical Covenant Church', website: 'https://www.moseshillchurch.com',
      address: '11071 737th Rd', leadership: 'Pastor: Brad Perry' },
    note: `Verified individually 2026-07-31. **Evangelical Covenant Church**, Midwest Conference — the congregation's own Facebook presence is "Moses Hill **Evangelical Covenant** Church." A rural congregation outside Loomis; worship at 10:45.

**Gender deliberately not set: the Evangelical Covenant Church ordains women.** Inferring complementarian here from the pattern of the other clusters would have been a default dressed as research.

${NOT_Q}`,
  },
  {
    id: 4239,
    stances: { sexualityStance: 'traditional', abolitionStance: 'pro_abolition' },
    also: { denomination: 'Evangelical Covenant Church', leadership: 'Pastor: Casey Holencik' },
    note: `Verified individually 2026-07-31. An **Evangelical Covenant** congregation in Wausa under Pastor **Casey Holencik**, in the same Midwest Conference orbit as Moses Hill. No independent website was found, so nothing beyond the signature could be read.

**Gender deliberately not set** — the Evangelical Covenant Church ordains women.

${NOT_Q}`,
  },
  {
    id: 3907,
    stances: { genderStance: 'complementarian', sexualityStance: 'traditional', abolitionStance: 'pro_abolition' },
    also: { denomination: 'URCNA', leadership: 'Pastor: Todd DeRooy' },
    note: `Verified individually 2026-07-31. **United Reformed Churches in North America (URCNA)**, holding the **Three Forms of Unity**, in the heavily Dutch-Reformed northwest corner of Iowa. Pastor **Todd DeRooy**. From the **Iowa** equal-protection signatory list rather than the Nebraska one.

The URCNA restricts office to men and holds a traditional view of marriage; it binds no millennial position, so eschatology is left unset.

${NOT_Q}`,
  },
  {
    id: 3904,
    stances: { genderStance: 'complementarian', sexualityStance: 'traditional', abolitionStance: 'pro_abolition' },
    also: { denomination: 'URCNA', leadership: 'Pastor: Caleb Castro' },
    note: `Verified individually 2026-07-31. **United Reformed Churches in North America (URCNA)**, Three Forms of Unity. Pastor **Caleb Castro**. From the **Iowa** signatory list.

**Three URCNA congregations in adjacent Sioux County / O'Brien County towns signed** — Orange City, Rock Valley and Sanborn — which makes this a genuine regional cluster rather than three unrelated signatures, and a candidate for the deep-dive queue.

${NOT_Q}`,
  },
  {
    id: 3908,
    stances: { genderStance: 'complementarian', sexualityStance: 'traditional', abolitionStance: 'pro_abolition' },
    also: { denomination: 'URCNA', leadership: 'Pastor: Dan Donovan' },
    note: `Verified individually 2026-07-31. **United Reformed Churches in North America (URCNA)**, Three Forms of Unity. Pastor **Dan Donovan**. From the **Iowa** signatory list, and the third of three URCNA congregations in the same corner of northwest Iowa to sign.

${NOT_Q}`,
  },
]

async function main() {
  for (const r of ROWS) {
    const before = await prisma.church.findUnique({ where: { id: r.id } })
    if (!before) { console.log(`  #${r.id} NOT FOUND`); continue }
    const changed = await updateStances(prisma, r.id, (r.stances || {}) as never, {
      actor: ACTOR,
      note: 'Individually verified; denomination confirmed and markers set only where that body actually binds them. See theologicalNotes.',
      alsoSet: {
        ...(r.also || {}),
        stanceBasis: 'evidenced',
        researchStatus: 'researched',
        recordFlag: null,
        lastResearchedAt: new Date(),
        researchNote: '2026-07-31: individually verified to the full research standard. Reformed/Presbyterian cluster.',
        theologicalNotes: `${before.theologicalNotes || ''}\n\n---\n\n${r.note}`,
        sourceUrls: [before.sourceUrls, r.also?.website].filter(Boolean).join(';'),
      },
    })
    console.log(`  #${r.id} ${before.name} (${before.city}) — verified; changed: ${changed.join(', ') || 'none'}`)
  }
  const c = (v: string) => prisma.church.count({ where: { approved: true, culturalEngagement: v } })
  console.log(`\nsignature_only remaining: ${await prisma.church.count({ where: { recordFlag: { contains: 'signature_only' } } })}`)
  console.log(`qualifying (transformationalist): ${await c('transformationalist')}   single_issue: ${await c('single_issue')}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
