// Individual verification of the Evangelical Free cluster in the signature_only queue (13 churches).
//
// Unlike the Berean Fellowship, the EFCA does NOT bind its churches on eschatology — on 19 June 2019
// the conference voted 79% to strike "premillennial" from Article 9 and replace it with "glorious".
// So eschatology cannot be defaulted for these thirteen; it is left unset except where a church
// publishes its own wording. That restraint is the point of the exercise.
//
// One church is not like the others: Minden's Tom Barnes is publishing political theology.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'research-efca-nebraska-2026-07-31.ts'
const EFCA_SRC = 'https://www.efca.org/resources/document/efca-statement-faith;https://www.efca.org/theological-positions'

const EFCA = `**Evangelical Free Church of America (EFCA).** What the denomination binds its churches to, read first-hand:

**Eschatology is deliberately open.** Article 9 read "the personal, bodily and **premillennial** return of our Lord Jesus Christ" until **19 June 2019**, when the conference voted — 79% of delegates, against a two-thirds threshold — to replace "premillennial" with "**glorious**", the EFCA arguing the millennial position is not an essential doctrine. Current text: "We believe in the personal, bodily and glorious return of our Lord Jesus Christ. The coming of Christ, at a time known only to God, demands constant expectancy…" **No millennial position is affirmed, so none is recorded here without the local church's own words.**

**Sexuality and marriage:** sexual expression belongs "within the commitment of marriage between a man and a woman"; the denomination is "welcoming but not affirming," and credential-holders may not engage in homosexual conduct or deny that it is sinful.

**Gender:** the EFCA has not ordained women since a **1988 conference decision** — the Certificate of Ordination is "designed for qualified males." Women serve under a Certificate of Christian Ministry. Because polity is congregational, the eldership question is left to each local church.

**There is no article on civil government in the Statement of Faith,** and no denominational position on political engagement.`

const THIN = `**Assessment: 1 marker of 6.** Abolition is evidenced and formal — the pastor signed. Postmillennialism, theonomy, Christian nationalism and anti-Zionism are **not** in evidence, and no corporate civil-sphere activity beyond the signature surfaced on the church's site, socials or sermons. Recorded as a negative result, not an omission.`

type Row = { id: number; note: string; ce?: string; also?: Record<string, unknown> }

const ROWS: Row[] = [
  {
    id: 4229,
    ce: 'transformationalist',
    also: {
      website: 'https://mindenefree.org',
      leadership: 'Senior Pastor: Dr. Tom Barnes; Family Pastor: Lige Reed',
      email: 'admin@mindenefree.org',
      phone: '308-832-1574',
      notablePeople: 'Dr. Tom Barnes — senior pastor, a pastor for over three decades; author of seven books with Evangelical Press: Living In The Hope Of Future Glory (2005), Atonement Matters (2008), Every Word Counts (2010), A Matter Of Life Or Death (2015), God Rules Over All (2018), An Antidote to Division (2018) and Divine Sovereignty and Human Choice (2018). Writes at The Joyful Follower (thejoyfulfollower.blogspot.com).',
    },
    note: `Verified individually 2026-07-31. **The one church in this cluster with an evidenced public theology of the civil order**, and the evidence is the pastor's own current writing rather than an inference.

**Dr. Tom Barnes** has pastored here for over three decades and has published **seven books with Evangelical Press** — a Reformed house — including *God Rules Over All* and *Divine Sovereignty and Human Choice* (both 2018), which place him firmly in the Calvinistic stream of the EFCA.

He blogs at **The Joyful Follower**, and the 2026 run is directly on point. On **7 and 20 July 2026** he published a two-part series, **"Against Socialism And Communism"**, giving "sixteen reasons from Scripture why we should oppose Socialism and Communism and, at the same time, sixteen reasons to advocate for a **biblical approach to government, work, and economics**." He reasons from Romans 13:1-4 to a doctrine of limited magistracy:

> "God's design for government is for limited tasks, tasks that include **preserving righteousness and justice**, not to provide for needs of a person, nor to take from one person to give to another."

and closes: "**Love demands Christians oppose Socialism and Communism, and advocate for a biblical approach to work, government, production, and distribution.**"

**This is a pastor teaching his congregation how Scripture governs the political and economic order** — the substance of transformationalism, not merely a signature. Note what it is *not*: he grounds limited government in Romans 13 and creation order, not in the judicial law of Moses, so this is not theonomy.

The same 2026 run is emphatically complementarian on the household — "Wives, Win Your Husbands By Your Actions" and "Wife, Find Joy In Helping Your Husband Flourish" (June 2026), and "Modesty For The Joy Of Others To God's Glory" (July 2026).

**A correction worth recording:** his 2015 title *A Matter Of Life Or Death* reads like a book on abortion. It is not — it is evangelistic, subtitled *Discovering what it is to be fully alive*, "for thinking people who have not yet come to faith." The title was checked rather than assumed.

${EFCA}

**Assessment: abolition evidenced, and cultural engagement evidenced on the pastor's own published work** — the strongest record in this cluster. Postmillennialism, theonomy, Christian nationalism and anti-Zionism remain not in evidence.`,
  },
  {
    id: 4284,
    also: { website: 'https://oaklandefc.com', leadership: 'Senior Pastor: Mike Sechler', address: '821 E. Fulton Ave', phone: '402-685-6292', email: 'pastormike@oaklandefc.com' },
    note: `Verified individually 2026-07-31. **This church settles the denominational question for the cluster**: it publishes the EFCA statement in its current post-2019 form — "We believe in the personal, bodily and **glorious** return of our Lord Jesus Christ" — confirming the amended Article 9 rather than the old premillennial wording. **No millennial position is affirmed**, so none is recorded.

Ministries are Sunday school, worship, small groups, life coaching, a food pantry and missions. Pastor **Mike Sechler** preaches expositionally (a 2021 series ran through Joshua 23–24); sermons stream on the church's Facebook page, facebook.com/northeastnebraskaefree.

${EFCA}

${THIN}`,
  },
  {
    id: 4267,
    also: { website: 'https://stromsburgefc.org', leadership: 'Lead Pastor: Keet Redden', address: '101 West 9th St' },
    note: `Verified individually 2026-07-31. **Listed in The Gospel Coalition's Nebraska church directory** (nebraska.thegospelcoalition.org) under Lead Pastor **Keet Redden** — a meaningful affiliation, since TGC vets for confessional, Reformed-leaning, complementarian evangelicalism. Two Sunday worship services with Sunday school between. Socials: facebook.com/StromsburgEFC and a YouTube channel.

${EFCA}

${THIN}`,
  },
  {
    id: 4238,
    also: { website: 'https://www.rivervalleyefree.com', leadership: 'Pastor: Nathan Goshert', address: '1201 Elm St' },
    note: `Verified individually 2026-07-31. Sunday worship 9:30, adult and children's Sunday school at 11:00, Wednesday prayer meeting at 7:00; all sermons live-streamed to facebook.com/RVEFree.

Pastor **Nathan Goshert** is affiliated with the **Nebraska Gospel Network** (nebraskagospel.net) — a Nebraska pastors' network that also surfaces in connection with Minden E-Free. Its site was rebuilding when checked ("New WordPress website is being built"), so its doctrinal basis and membership could not be read. **Flagged for the deep-dive queue**: a state-level pastors' network is exactly the kind of connective tissue this directory should map.

${EFCA}

${THIN}`,
  },
  {
    id: 4273,
    also: { website: 'http://stantonefc.org', leadership: 'Pastor: Clint Hogrefe; Associate Pastor for Biblical Counseling: Ron Gunsolley', address: '500 8th St' },
    note: `Verified individually 2026-07-31. Notable for its staffing: alongside Pastor **Clint Hogrefe** the church supports an **Associate Pastor for Biblical Counseling**, Ron Gunsolley — a dedicated biblical-counselling office in a small-town congregation, which places it in the nouthetic/biblical-counselling stream rather than the integrationist one. Runs Operation Christmas Child, weekly events and a public sermon archive.

${EFCA}

${THIN}`,
  },
  {
    id: 4271,
    also: { website: 'https://www.efcconcord.org', leadership: 'Senior Pastor: Todd Thelen', address: '617 Broadway St' },
    note: `Verified individually 2026-07-31. A congregation that **celebrated its 125th anniversary**, making it one of the oldest in this cluster. **Todd Thelen** has been senior pastor since 2001 — over twenty years — which is itself worth recording: the signature comes from a long-settled pastor, not a recent arrival. Sermons are published on the church site (e.g. "The Stance of Strength") and to facebook.com/efcconcord.

${EFCA}

${THIN}`,
  },
  {
    id: 4243,
    also: { website: 'https://www.genevaefc.com', leadership: 'Senior Pastor: Rev. Jeffrey G. Jensen; Associate Pastor of Youth & Families: Toby', address: '230 N 17th St' },
    note: `Verified individually 2026-07-31. A congregation of roughly 150 with a staff of three — Sr. Pastor **Jeff Jensen**, an associate pastor for youth and families, and an office administrator.

${EFCA}

${THIN}`,
  },
  {
    id: 4296,
    also: { website: 'https://www.kearneyhope.org', leadership: 'Lead Pastor: Eric Jones', address: '907 C Ave', phone: '308-234-4673' },
    note: `Verified individually 2026-07-31. Takes its name from Romans 15:4-7 and states a "heart for the '**least of these**' that live in and around Kearney" — a mercy-ministry self-definition rather than a civil-sphere one. Weekly worship, Sunday youth group, Wednesday AWANA. Socials: facebook.com/HopeEFCKearney, plus a video archive on its own site.

${EFCA}

${THIN}`,
  },
  {
    id: 4226,
    also: { website: 'https://www.aurorafree.org', leadership: 'Pastor: Mark Danielson', address: '1202 A St', phone: '402-694-3492', email: 'aurorafreeav@gmail.com' },
    note: `Verified individually 2026-07-31. Mission stated as "Glorifying God through **Exaltation, Edification and Evangelism**" — the three-fold framing is itself the answer to what this church understands its public task to be, and it does not include the civil sphere. Publishes a statement of faith, a sermon archive and a "How to Get to Heaven" page; AWANA (Sparks/T&T/Trek), ladies' Bible study. Pastor **Mark Danielson**; sermons also posted via Podomatic and facebook.com/aurorafreechurch.

${EFCA}

${THIN}`,
  },
  {
    id: 4225,
    also: { website: 'https://www.kimballefreechurch.com', leadership: 'Pastor: Tyler White', address: '101 S Walnut St' },
    note: `Verified individually 2026-07-31. States its purpose as serving "God faithfully, imitating Christ. To teach the word of God and live in correspondence to His word. Recognizing that all biblical understanding and behavior is only possible by the **grace of God** as we work out our faith with fear and trembling."

${EFCA}

${THIN}`,
  },
  {
    id: 4291,
    also: { leadership: 'Pastor: Art Smith' },
    note: `Verified individually 2026-07-31. An EFCA congregation in Alliance under Pastor **Art Smith**, in the same town as Alliance Berean Church — **both pastors signed the statement**, which makes Alliance one of the few Nebraska towns with two signatory congregations from different traditions.

No independent church website was found; the congregation's public footprint is limited to directory listings and the EFCA church finder.

${EFCA}

${THIN}`,
  },
  {
    id: 4228,
    also: { leadership: 'Pastor: Doug Olson', address: '921 N 28th St' },
    note: `Verified individually 2026-07-31. Pastor **Doug Olson**. The congregation's public presence is facebook.com/ordefree and the EFCA church finder; no independent website was found, so nothing beyond the signature could be read on the remaining markers.

${EFCA}

${THIN}`,
  },
  {
    id: 4258,
    also: { leadership: 'Pastor: Fred Sundt', address: '1431 West 29th Street' },
    note: `Verified individually 2026-07-31. **Established 2010**, the youngest congregation in this cluster. Pastor **Fred Sundt**. Ministries listed are children's ministry, adult education, youth group, nursery and choir; music is described as contemporary and traditional hymns. Public presence is facebook.com/LWEFC1 and the EFCA church finder.

${EFCA}

${THIN}`,
  },
]

async function main() {
  for (const r of ROWS) {
    const before = await prisma.church.findUnique({ where: { id: r.id } })
    if (!before) { console.log(`  #${r.id} NOT FOUND`); continue }
    const changed = await updateStances(prisma, r.id, {
      abolitionStance: 'pro_abolition',
      genderStance: 'complementarian',
      sexualityStance: 'traditional',
      theonomy: 'non_theonomic',
      ...(r.ce ? { culturalEngagement: r.ce } : {}),
    }, {
      actor: ACTOR,
      note: 'Individually verified; gender and sexuality from the EFCA’s own binding positions, eschatology deliberately left unset because the EFCA struck "premillennial" in 2019. See theologicalNotes.',
      alsoSet: {
        ...(r.also || {}),
        denomination: 'Evangelical Free Church of America (EFCA)',
        stanceBasis: 'evidenced',
        researchStatus: 'researched',
        recordFlag: null,
        lastResearchedAt: new Date(),
        researchNote: '2026-07-31: individually verified to the full research standard — site, statement of faith, socials, sermons, pastor background. EFCA Nebraska cluster.',
        theologicalNotes: `${before.theologicalNotes || ''}\n\n---\n\n${r.note}`,
        sourceUrls: [before.sourceUrls, r.also?.website, EFCA_SRC].filter(Boolean).join(';'),
      },
    })
    console.log(`  #${r.id} ${before.name} — verified; changed: ${changed.join(', ') || 'none'}`)
  }
  console.log(`\nsignature_only remaining: ${await prisma.church.count({ where: { recordFlag: { contains: 'signature_only' } } })}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
