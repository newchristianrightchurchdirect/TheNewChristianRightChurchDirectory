// Individual verification of the Berean Fellowship cluster in the signature_only queue.
//
// Six Nebraska congregations came in from the equal-protection signatory list. All six belong to
// the Berean Fellowship of Churches (BFC) — and one of the signatories turns out to be the
// Fellowship's national PRESIDENT, which the import had recorded as a church literally named
// "President".
//
// The finding that matters: these churches are evidenced abolitionist and explicitly NOT
// transformationalist in eschatology. Alliance Berean's own statement of faith is pretribulational
// dispensational premillennialism in as many words. That is the opposite end of the spectrum from
// the postmillennial thesis this directory was built to map.
//
// Sources read first-hand: BFC national constitution (2021), each church's own site and statement
// of faith, church socials, and the pastors' training.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'research-berean-fellowship-2026-07-31.ts'
const BFC_CONST = 'https://s3.amazonaws.com/media.cloversites.com/cb/cb1787f0-4fdc-4438-844e-2caa2acf48f6/documents/2021_BFC_National_Constitution.pdf'

// What every BFC church is bound by. The constitution states the doctrinal statement "will serve
// as the primary statement of doctrine for every local church in the Berean Fellowship", so these
// two markers are evidenced for each member congregation rather than guessed from a denomination.
const FELLOWSHIP = `**Berean Fellowship of Churches (BFC).** An association of 57–60 self-governing churches across 13 states, begun 21 August 1932 in a North Platte, Nebraska home under Ivan Olsen, named "The Berean Fundamental Church" in 1935 and organised as a council in 1947. Its 2021 constitution binds every member church to a common doctrinal statement.

On sexuality and gender the statement is explicit: God "ordained marriage to be between one man and one woman as part of his design that some roles within the family and the church be distinctly male or female" — complementarian, and stated at the association level.

**There is no article on civil government anywhere in the constitution.** The church's public duty is given as "godly living and evangelism."

On eschatology the national statement is deliberately minimal, and treats the question as secondary: "We believe in the imminent, bodily, personal return of Jesus Christ… Jesus will return for his Church." **No millennium is affirmed at all.** The imminence-and-rapture framing is dispensational in shape, and the fellowship's historic name was "Berean Fundamental Church."`

const NOT_TRANSFORMATIONALIST = `**Assessment against the six markers: 1 of 6.** Abolition is evidenced and formal. Theonomy, Christian nationalism, anti-Zionism and postmillennialism are **not** in evidence — and the eschatology runs actively against the transformationalist thesis rather than merely being silent on it. The congregation's public output is ordinary small-town evangelical ministry: Awana, youth group, women's Bible study, food pantry. Recorded here as a negative result, not an omission.`

type Row = { id: number; note: string; esch?: string; alsoSet?: Record<string, unknown> }

const ROWS: Row[] = [
  {
    // #4286 came in named "President" — the source line was "Tyce Jensen | President / Berean
    // Fellowship of Churches | Broken Bow". The parser took his OFFICE for a church name.
    id: 4286,
    esch: 'dispensational',
    alsoSet: {
      name: 'Berean Bible Church',
      leadership: 'Lead Pastor: Tyce Jensen (also President of the Berean Fellowship of Churches)',
      website: 'https://brokenbowberean.com',
      notablePeople: 'Tyce Jensen — lead pastor here since 2014 and, since July 2024, President of the Berean Fellowship of Churches, the 57-church association he signed on behalf of; BFC vice-president from 2016. A Broken Bow native, he trained at Moody Bible Institute and Dallas Theological Seminary and served four years as assistant pastor here before succeeding the retiring Larry DeMoss.',
      description: 'A Berean Fellowship congregation in Broken Bow, Nebraska whose lead pastor is also the national president of the Fellowship, and who signed the 2024 Nebraska pastors’ statement calling for equal protection of the preborn.',
    },
    note: `**RECORD REPAIRED 2026-07-31, and the correction is the finding.** This row was created named **"President"** — an office, not a church. The signatory line read "Tyce Jensen | President / Berean Fellowship of Churches | Broken Bow", and the import parser took the title for a church name.

Tyce Jensen is **President of the Berean Fellowship of Churches** (since July 2024; vice-president from 2016), and lead pastor of **Berean Bible Church in Broken Bow** since 2014. The Fellowship's own site closes every page with "For more information please contact Tyce Jensen, BFC President."

**So the signature is not one small-town pastor's — it is the sitting head of a 57-church, 13-state association.** That is the single most consequential signature on the Nebraska list, and it was very nearly lost to a parsing bug.

${FELLOWSHIP}

Jensen trained at **Moody Bible Institute** and **Dallas Theological Seminary** — both dispensational premillennial institutions. The church's YouTube channel (@brokenbowberean3141, 480 videos) carries him preaching most weeks; the sermons are expository and pastoral, with no civil-sphere content surfacing. Its own domain was mid-migration when checked and served only a Squarespace "domain connection in progress" placeholder.

${NOT_TRANSFORMATIONALIST}`,
  },
  {
    id: 4230,
    esch: 'dispensational',
    alsoSet: {
      website: 'https://allianceberean.com',
      leadership: 'Senior Pastor: Glenn Johnson; Associate Pastor of Worship: Philip Hawkins',
      address: '1639 Emerson Avenue',
      email: 'alliancebereanchurch@gmail.com',
      phone: '308-762-2250',
    },
    note: `Verified individually 2026-07-31 — and **this church settles the eschatology question for the cluster.**

Alliance Berean publishes the BFC statement plus a local distinctive the national document does not contain, and it is unambiguous:

> "We believe on a day known only by God the Father, but **prior to the 7-year period known as the tribulation, Jesus will rapture His church** to deliver it from the judgments that God will pour upon the earth. After this terrible period, the Lord Jesus Christ will return in glory to **establish His Millennial Kingdom on the earth**."

That is **pretribulational dispensational premillennialism**, stated by the church itself — historically the least transformationalist eschatology there is, since it expects the world to worsen and the church to be removed before the worst of it.

${FELLOWSHIP}

The church's public life is ordinary small-town evangelical ministry: "Faith. Family. Friends.", children's and youth ministry, men's and women's ministry, MomCo, missions. Socials: facebook.com/AllianceNE, instagram.com/alliance_berean_church, youtube.com/@AllianceBerean (with livestreams). Searching Glenn Johnson against each marker returns the abortion statement and nothing else.

${NOT_TRANSFORMATIONALIST}`,
  },
  {
    id: 4295,
    alsoSet: {
      website: 'https://columbusberean.org',
      leadership: 'Senior Pastor: Justin Bebb',
      address: '3027 38th St',
      phone: '402-562-5647',
      notablePeople: 'Justin Bebb — senior pastor since 2017, M.Div. from The Southern Baptist Theological Seminary; came to Columbus in 2016 from Kearney, where he and his wife Megan ran a mailing and shipping business.',
    },
    note: `Verified individually 2026-07-31. Founded 1999; a Berean Fellowship congregation that publishes the BFC national statement verbatim, including its minimal "Future Events" article — so **no millennial position is affirmed** here, unlike Alliance Berean.

${FELLOWSHIP}

Pastor **Justin Bebb** holds an M.Div. from **The Southern Baptist Theological Seminary** and has served since 2017. His sermon archive is public and substantial — "Tell the Truth: In Doctrine and in Life", "Persecution and Gospel Advancement", "The Just Judgment of God", "Holy Fear and Diligence" — expository preaching through Scripture with no civil-sphere or political programme in evidence. Socials: facebook.com/ColumbusBerean, instagram.com/columbusberean, and a YouTube channel.

${NOT_TRANSFORMATIONALIST}`,
  },
  {
    id: 4277,
    esch: 'dispensational',
    alsoSet: {
      website: 'https://www.imperialberean.org',
      leadership: 'Pastor: Matt Maxwell',
      address: '1530 Broadway Street',
      notablePeople: 'Matt Maxwell — pastor since June 2011; taught high school history and English and coached for twelve years before entering ministry; M.Div. from Calvary Theological Seminary, Kansas City (2011).',
    },
    note: `Verified individually 2026-07-31. A Berean Fellowship congregation — "calling ourselves 'Berean' is a way of saying the Bible is our truth authority" — whose public identity is "REACH. TEACH. REPEAT." and whose ministries are Sunday school, Awana and a 7–12 youth group.

${FELLOWSHIP}

Pastor **Matt Maxwell** came in June 2011 from **Calvary Theological Seminary in Kansas City**, a dispensational school; he taught high school history and English and coached for twelve years beforehand. His pastor page describes his preaching aim in entirely expository terms — working from the original languages, "engaging and entertaining, without sacrificing the challenges presented by the true word." Sole social presence is a Facebook page.

${NOT_TRANSFORMATIONALIST}`,
  },
  {
    id: 4283,
    alsoSet: {
      website: 'https://www.valentinebereanchurch.com',
      leadership: 'Pastor: Scott McClellen',
      name: 'Valentine Berean Bible Church',
    },
    note: `Verified individually 2026-07-31. A Berean Fellowship congregation whose own name is **Valentine Berean Bible Church**; mission statement "Glorifying God by reaching the lost and equipping the saints through the Gospel of Jesus Christ."

${FELLOWSHIP}

Its public calendar is the clearest possible picture of what this church is: a **Cowboy Church during fair week**, youth group, a baptism and backyard party, a food pantry taking condiments and dressings, and a monthly verse. Self-described as "a group of imperfect people who love Jesus… We believe that the doors to salvation and to our church are open to everyone!"

${NOT_TRANSFORMATIONALIST}`,
  },
  {
    id: 4233,
    alsoSet: {
      website: 'https://www.almaberean.org',
      leadership: 'Pastor: Tom Walker; Elders: Don Ehrke, Chad Hamilton, Jake Noonan',
      address: '202 North Jewell Street',
      email: 'alma.berean@gmail.com',
      phone: '308-999-6180',
    },
    note: `Verified individually 2026-07-31, and this one has the most interesting history in the cluster.

Founded **1885** as the First Christian Church of Alma with 46 charter members who signed a pledge "to be governed by the Bible alone." It **left the Disciples of Christ in 1991** to become independent. Aging and in decline, it then merged with a group of families meeting for worship in homes and, on **9 July 2017, joined the Berean Fellowship of Churches** — so this is a mainline-descended congregation that walked away from a liberal denomination and re-formed as an evangelical one. The building at 202 Jewell dates to 1924.

${FELLOWSHIP}

Governed by three elders — Don Ehrke, Chad Hamilton and Jake Noonan, all men, consistent with the BFC's complementarian article. Pastor **Tom Walker** signed the statement. Ministries are children and youth and a women's Bible study; the sole social presence is Facebook.

${NOT_TRANSFORMATIONALIST}`,
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
      ...(r.esch ? { eschatology: r.esch } : {}),
    }, {
      actor: ACTOR,
      note: 'Individually verified against the church’s own statement of faith and the Berean Fellowship constitution it is bound by; see theologicalNotes.',
      alsoSet: {
        ...(r.alsoSet || {}),
        denomination: 'Berean Fellowship of Churches',
        stanceBasis: 'evidenced',
        researchStatus: 'researched',
        recordFlag: null, // signature_only debt discharged for this row
        lastResearchedAt: new Date(),
        researchNote: '2026-07-31: individually verified to the full research standard — site, statement of faith, socials, sermons, pastor background. Berean Fellowship cluster.',
        theologicalNotes: `${before.theologicalNotes || ''}\n\n---\n\n${r.note}`,
        sourceUrls: [before.sourceUrls, r.alsoSet?.website, BFC_CONST, 'https://weareberean.org/']
          .filter(Boolean).join(';'),
      },
    })
    const name = (r.alsoSet?.name as string) || before.name
    console.log(`  #${r.id} ${name} — verified; stance fields changed: ${changed.join(', ') || 'none'}`)
  }

  const left = await prisma.church.count({ where: { recordFlag: { contains: 'signature_only' } } })
  console.log(`\nsignature_only remaining: ${left}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
