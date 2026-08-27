// Ohio H.B. 370 cohort, batch 10 — THE GAMBLING LETTER.
//
// The find: the Center for Christian Virtue's letter against predatory gambling, signed by 129 Ohio
// pastors and ministry leaders and addressed to Governor DeWine and the General Assembly. It is a
// roster, and cross-referencing it against this cohort produces churches that have petitioned the
// legislature on TWO different questions — which is the test for transformationalist.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'single-issue-oh-batch10-2026-08-27.ts'
const STANDARD = 'site, church socials, the pastor own output, and the pastor name searched against each of the six markers'
const CCV = 'https://www.ccv.org/gamblingletter'

type Row = {
  id: number
  stances?: Record<string, string>
  also?: Record<string, unknown>
  addSrc?: string[]
  dropFlags?: string[]
  addFlags?: string[]
  short: string
  note: string
}

const ROWS: Row[] = [
  {
    id: 4387,
    stances: {
      culturalEngagement: 'transformationalist',
      genderStance: 'complementarian',
      sexualityStance: 'traditional',
      socialJusticeStance: 'anti_crt',
    },
    also: {
      denomination: 'Southern Baptist Convention — Greater Dayton Association of Baptists',
      website: 'http://www.thebridgechurch.live',
      address: '323 North 11th Street',
      zip: '45342',
      leadership: 'Lead Pastor: John Michael LaRue (since March 2019).',
      notablePeople: 'John Michael LaRue — lead pastor since March 2019, when the congregation was still First Baptist Church Miamisburg. MDiv and ABD toward a PhD in Systematic Theology at The Southern Baptist Theological Seminary. Serves on the CHRISTIAN LIFE AND RESOLUTIONS COMMITTEE of the Greater Dayton Association of Baptists. Author of "Missing the Mark: A Pastor\'s Loss of Trust in the ERLC" (Christ Over All, 26 March 2025). Featured by the Center for Baptist Leadership. A signatory of the Center for Christian Virtue letter against predatory gambling, addressed to Governor DeWine and the Ohio General Assembly.',
    },
    addSrc: [CCV, 'https://christoverall.com/article/concise/missing-the-mark-a-pastors-loss-of-trust-in-the-erlc/', 'https://centerforbaptistleadership.org/hurricane-helene-relief-update-ft-john-michael-larue/', 'https://church.founders.org/church/the-bridge-church/', 'https://www.facebook.com/thebridgechurch.live/'],
    dropFlags: ['signature_only'],
    short: 'PROMOTED — petitioned the legislature on two questions, plus published public theology.',
    note: `**PROMOTED to transformationalist 2026-08-27. Full standard applied — ${STANDARD}.**

**John Michael LaRue** has led this congregation since **March 2019**, when it was still **First
Baptist Church Miamisburg** — the fourth name in a history reaching back to **1948**. **MDiv and ABD
toward a PhD in Systematic Theology at The Southern Baptist Theological Seminary.**

**He acts across more than one public question, and both acts address the civil magistrate directly:**

1. **Abortion** — the H.B. 370 pastoral petition.
2. **Gambling** — he signed the **Center for Christian Virtue's letter against predatory gambling**,
   one of **129 Ohio pastors and ministry leaders**, urging **Governor DeWine and the Ohio General
   Assembly** to reject bills legalising online poker and virtual casino gambling. It is listed
   there as "Pastor John Michael LaRue / The Bridge Church / Miamisburg, OH."

**Two petitions to the legislature on two different questions.** Under the 2026-08-27 signatory
ruling — a signature counts when the document itself claims the civil order — both documents do,
and together they clear the "action across public questions" bar.

**And he does more than sign.** He sits on the **Christian Life and Resolutions Committee of the
Greater Dayton Association of Baptists**, which is standing institutional work on exactly these
questions. He published **"Missing the Mark: A Pastor's Loss of Trust in the ERLC"** at **Christ Over
All** on 26 March 2025, arguing that the Ethics and Religious Liberty Commission has lost Southern
Baptists' trust — citing an informal poll in which **over 90% of nearly 400 respondents** said they
had not engaged its materials, faulting its silence during the Trump administration's first weeks,
and criticising its promotion of **critical race theory as an analytical tool** under Russell Moore,
including the 2018 MLK50 conference. He argues Southern Baptists should not have to rely on
"conservative non-Christian commentators" for representation in public discourse. He has also been
featured by the **Center for Baptist Leadership**.

**\`socialJusticeStance\` recorded as \`anti_crt\` on his own published argument** — the only row in this
cohort where that field rests on the pastor's own words rather than inference.

Denomination established: **Southern Baptist Convention**, via the **Greater Dayton Association of
Baptists**; the church is also **Founders-listed**.

**Left \`unknown\` deliberately:** eschatology, theonomy, Christian nationalism and Israel. He states
none of them, and none was inferred from his politics.`,
  },
  {
    id: 4437,
    stances: {
      culturalEngagement: 'transformationalist',
      genderStance: 'complementarian',
    },
    also: {
      denomination: 'Southern Baptist Convention — Greater Dayton Association of Baptists',
      website: 'https://www.daytonave.org',
      leadership: 'Lead Pastor: Jonathan Lawler. Senior Associate Pastor: Bruce Traeger (at the church since July 2005; Worship Pastor bi-vocationally 2005-2016). Pastors: John Bright (Student Ministries), Adam Mabe (Missions and Church Ministries), Robert Rhodes (Worship Arts), and a Pastor to Senior Adults. "James Risner", the name on the H.B. 370 petition, does NOT appear on the current staff list.',
      notablePeople: 'Bruce Traeger — Senior Associate Pastor since July 2005; on Cedarville University\'s pulpit supply list. He signed the Center for Christian Virtue letter against predatory gambling addressed to Governor DeWine and the Ohio General Assembly, while a different man from this church signed the H.B. 370 pastoral petition.',
    },
    addSrc: [CCV, 'https://www.daytonave.org/leadership', 'https://www.daytonave.org/contributor/bruce-traeger', 'https://www.cedarville.edu/ministries/church-relations/pulpit-supply/traeger-bruce', 'https://www.facebook.com/p/Dayton-Avenue-Baptist-Church-100064493208060/'],
    dropFlags: ['signature_only'],
    addFlags: ['verify_stance'],
    short: 'PROMOTED — two different pastors signed two different legislative petitions.',
    note: `**PROMOTED to transformationalist 2026-08-27. Full standard applied — ${STANDARD}.**

**This row is stronger than a single pastor signing twice, because two different men from this one
church signed two different letters to the legislature.**

1. **Abortion** — the **H.B. 370 pastoral petition**, signed for this church by **James Risner**.
2. **Gambling** — the **Center for Christian Virtue letter** to **Governor DeWine and the Ohio
   General Assembly**, signed by **Bruce Traeger**, the church's **Senior Associate Pastor**.

**When two officers of one congregation independently petition the legislature on two unrelated
questions, the engagement is the church's and not one man's hobby.** That is the clearest form the
"action across public questions" test can take short of a corporate statement.

**The leadership on this row was wrong and is corrected.** The row read "Pastor: James Risner." The
**lead pastor is Jonathan Lawler**; **Bruce Traeger** is Senior Associate Pastor, at the church since
**July 2005** and its bi-vocational Worship Pastor from 2005 to 2016. The staff also includes John
Bright (Student Ministries), Adam Mabe (Missions and Church Ministries) and Robert Rhodes (Worship
Arts). **"James Risner" appears nowhere on the current staff list** — he may hold the Senior Adults
post or may have left, and neither could be established. Flagged \`verify_stance\` for that reason
alone; the promotion does not depend on him.

Denomination established: founded **1960**, affiliated from the outset with the **Greater Dayton
Association of Baptists** and the **Southern Baptist Convention** — the same association whose
Christian Life and Resolutions Committee **John Michael LaRue** (#4387) sits on. **Two GDAB churches
promoted in one batch; the association is worth a look in its own right.**

Traeger is also on **Cedarville University's pulpit supply list** — the **fifth Cedarville tie** in
this cohort.

**Read and negative.** Leadership page, contributor page, Facebook and the Cedarville listing read.
**Nothing on eschatology, theonomy, Christian nationalism or Israel**; those stay \`unknown\`.`,
  },
  {
    id: 4456,
    stances: {
      culturalEngagement: 'transformationalist',
      genderStance: 'complementarian',
    },
    also: {
      notablePeople: 'Walfrido "Wally" Contreras — senior pastor. A signatory of the Center for Christian Virtue letter against predatory gambling, addressed to Governor DeWine and the Ohio General Assembly, in addition to the H.B. 370 pastoral petition.',
    },
    addSrc: [CCV],
    short: 'PROMOTED — a second legislative petition found via the gambling roster.',
    note: `**PROMOTED to transformationalist 2026-08-27, on new evidence.**

This row was already researched and its pastor confirmed on 2026-08-06. **The gambling-letter
cross-reference adds a second public question.**

**Senior Pastor Walfrido "Wally" Contreras signed the Center for Christian Virtue letter against
predatory gambling**, listed as "Pastor Wally Contreras / First Baptist Church of Gahanna," urging
**Governor DeWine and the Ohio General Assembly** to reject online gambling expansion. He had already
signed the **H.B. 370 pastoral petition**.

**Two petitions to the legislature on two unrelated questions.** Under the 2026-08-27 signatory
ruling both documents claim the civil order, and together they clear the "action across public
questions" bar. The congregation is also **Founders-listed**.

**This promotion rests entirely on two signatures**, which is the thinnest basis on which the ruling
permits one. It is recorded plainly so it can be revisited: **no authored work, no institutional
role and no pulpit statement on either question has been found for Contreras.** Compare #4387, whose
pastor sits on a resolutions committee and publishes, and #4437, where two different officers signed
two different letters.

Markers other than cultural engagement are untouched; eschatology, theonomy, Christian nationalism
and Israel remain \`unknown\`.`,
  },
  {
    id: 4367,
    stances: {},
    also: {
      notablePeople: 'Both Lead Pastor David Milroy AND Associate Pastor Ken Rathburn signed the Center for Christian Virtue letter against predatory gambling, addressed to Governor DeWine and the Ohio General Assembly — in addition to Assistant Pastor Tanner Fixari signing the H.B. 370 pastoral petition. Three of this church\'s pastors have signed legislative petitions on two different questions.',
    },
    addSrc: [CCV],
    short: 'New evidence: two more pastors signed a second legislative petition. HELD pending the scope question.',
    note: `**ADDENDUM 2026-08-27 — this row now meets the engagement test, and is deliberately NOT promoted.**

The gambling-letter cross-reference found **two more of this church's pastors**: **Lead Pastor David
Milroy** and **Associate Pastor Ken Rathburn** both signed the **Center for Christian Virtue letter**
to **Governor DeWine and the Ohio General Assembly** against predatory gambling. **Assistant Pastor
Tanner Fixari** had already signed the **H.B. 370 pastoral petition**.

**That is three pastors of one congregation signing legislative petitions on two different
questions** — on engagement alone, a stronger record than #4456, which was promoted in this same
batch.

**It is held anyway, because a different question about this row is unresolved.** This is the
Evangelical Presbyterian congregation whose **published roster of ten ruling elders and fourteen
deacons appears to include women**. If that is right, the row sits below the directory's
**"complementarian at minimum" floor** — a question about whether it belongs in the directory at all,
which is prior to how it should be classified within it.

**Promoting it into the qualifying tier while its scope status is open would surface it as a
recommended church on an unresolved question.** The engagement evidence is therefore recorded in
full and the classification left where it is, with \`womens_ordination\` and \`verify_stance\` still
set. **This is Dustin's call and it is now a concrete one: on engagement this row qualifies; on the
floor it may not belong.**`,
  },
  {
    id: 4380,
    stances: {},
    also: {
      denomination: 'Methodist — voted to leave the United Methodist Church, seeking the Global Methodist Church',
      website: 'https://www.cornerstonedegraff.org',
      address: '1839 County Road 24 S',
      leadership: 'Pastor: Michael Mitchell, who also serves Maplewood Methodist (GMC).',
    },
    addSrc: ['https://www.cornerstonedegraff.org/about-us.html', 'https://www.facebook.com/CornerstoneDeGraff/'],
    dropFlags: ['signature_only'],
    addFlags: ['womens_ordination', 'in_transition'],
    short: 'HELD at single_issue. A second UMC disaffiliation, mid-transition.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

**The second UMC disaffiliation in this cohort**, after #4377 Wayne Street — and this one is caught
mid-process. The congregation was **DeGraff United Methodist Church**; it **renamed itself
Cornerstone Fellowship of DeGraff in March 2026 by a vote of 42-26**, then **voted 42-0 on 12 April
to leave the United Methodist Church**, with the stated hope of eventually belonging to the **Global
Methodist Church**. **It is not yet GMC**, and \`denomination\` says so rather than recording an
affiliation the church has not completed. Flagged \`in_transition\`.

**Flagged \`womens_ordination\`** on the same basis as #4377: the destination body, the GMC, ordains
women and states they "are entitled to serve at all levels." As on that row, **this records the
denomination's position and not the congregation's** — no woman has been found in office here.

Its history is long: the congregation traces to **Hanks Chapel, a Methodist Society formed around
1825**. Pastor **Michael Mitchell** also serves **Maplewood Methodist (GMC)**, a second charge — a
two-point circuit, which is worth recording because a shared pastor is a standing source of
duplicate and stale-leadership errors.

**Read and negative.** Site and Facebook page read. **Nothing on abortion beyond the petition
signature, and nothing on the civil magistrate, eschatology, theonomy, Christian nationalism, gender
or Israel.** Marker searches on Michael Mitchell return nothing — the name is common and collides
with a Maplewood UMC licensed local pastor listing, which is the same man.`,
  },
  {
    id: 4388,
    stances: { genderStance: 'complementarian' },
    also: {
      denomination: 'Non-denominational',
      website: 'https://www.cornerstonesidney.com',
      address: '1028 Park Street',
      zip: '45365',
      leadership: 'Lead Pastor: Harry Peterson (since 2002). Elders: John Bruce, Bobby Carter, Dod Noffsinger, Bryan Rioch — the petition named two of the elders alongside the lead pastor.',
    },
    addSrc: ['https://www.cornerstonesidney.com/about', 'https://www.facebook.com/cornerstonechurchsidney/', 'https://justinpeters.org/venue/cornerstone-church-sidney-oh/'],
    dropFlags: ['signature_only'],
    short: 'HELD at single_issue. Non-denominational; the petition named two elders and the lead pastor.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

The row listed "Pastors: Bryan Rioch; Dod Noffsinger; Harry Peterson." **Two of those three are
elders, not pastors** — the eldership is **John Bruce, Bobby Carter, Dod Noffsinger and Bryan
Rioch** — but unlike most rows in this cohort **the lead pastor is genuinely among them**: **Harry
Peterson**, who has led the congregation **since 2002**, with his wife Rhonda.

Denomination established: **non-denominational**. 1028 Park Street, Sidney.

**One detail recorded as context rather than as a marker:** the church has hosted **Justin Peters
Ministries**, a discernment ministry known for critiquing the prosperity gospel and the charismatic
renewal. That places the congregation in a cessationist, discernment-minded orbit — **it is not
evidence on any of the six markers** and nothing was set from it, but it is the kind of hosting
decision that tells you what a church considers important.

\`genderStance\` complementarian on an all-male pastorate and eldership.

**Read and negative.** About page, Facebook and the Justin Peters venue listing read. **Nothing on
abortion beyond the petition signature, and nothing on the civil magistrate, eschatology, theonomy,
Christian nationalism or Israel.** Marker searches on Peterson, Rioch and Noffsinger return nothing.`,
  },
  {
    id: 4390,
    stances: {},
    also: {
      denomination: 'Converge (formerly Baptist General Conference)',
      website: 'https://bereanfamily.com',
      address: '2145 Middle Bellville Road',
      leadership: 'Lead Pastor: Dan (Daniel D.) Krause, from 16 February 2020.',
    },
    addSrc: ['https://bereanfamily.com/about-us/our-staff-leaders/', 'https://bereanfamily.com/about-us/our-story/'],
    dropFlags: ['signature_only'],
    addFlags: ['womens_ordination'],
    short: 'HELD at single_issue. Converge — consistent with the nine Converge rows already flagged.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

Denomination established: **Converge**, formerly the Baptist General Conference. The congregation was
**founded in 1979**; **Dan Krause** became lead pastor on **16 February 2020**.

**Flagged \`womens_ordination\`, and the precedent is already set in this directory.** Nine Converge
congregations carry that flag from earlier passes — #15 Bethlehem Baptist, #186 Christ Redeemer,
#4088, #4097, #4118, #4241, #4250, #4260 and #4312 — because Converge leaves the ordination question
to its districts and churches rather than restricting the office nationally. **This row is flagged
for consistency with that treatment, not on anything this congregation has said**, and as on every
other such row it records the denomination's position rather than the church's. \`genderStance\` left
\`unknown\`.

**Read and negative.** Staff page, church history and sermon archive read. **Nothing on abortion
beyond the petition signature, and nothing on the civil magistrate, eschatology, theonomy, Christian
nationalism or Israel.** Marker searches on Krause return nothing beyond a namesake campus pastor at
Changepoint, who is a different man.`,
  },
]

async function main() {
  const dry = process.argv.includes('--dry')
  for (const r of ROWS) {
    const c = await prisma.church.findUnique({ where: { id: r.id } })
    if (!c) { console.log(`  #${r.id} NOT FOUND`); continue }
    const flags = (c.recordFlag || '').split(';').map(s => s.trim()).filter(Boolean)
      .filter(f => !(r.dropFlags || []).includes(f.split(':')[0]))
    for (const f of (r.addFlags || [])) if (!flags.includes(f)) flags.push(f)
    const srcs = (c.sourceUrls || '').split(';').map(s => s.trim()).filter(Boolean)
    for (const s of (r.addSrc || [])) if (!srcs.includes(s)) srcs.push(s)

    if (dry) { console.log(`  [dry] #${r.id} ${c.name} — ${r.short}`); continue }
    const changed = await updateStances(prisma, r.id, (r.stances || {}) as never, {
      actor: ACTOR,
      note: r.short,
      alsoSet: {
        ...(r.also || {}),
        recordFlag: flags.length ? flags.join(';') : null,
        sourceUrls: srcs.length ? srcs.join(';') : null,
        researchStatus: 'researched',
        stanceBasis: 'evidenced',
        lastResearchedAt: new Date(),
        researchNote: `2026-08-27: FULL standard applied — ${STANDARD}. ${r.short}`,
        theologicalNotes: `${c.theologicalNotes || ''}\n\n---\n\n${r.note}`,
      },
    })
    console.log(`  #${r.id} ${c.name} — ${r.short}`)
    if (changed.length) console.log(`        stances changed: ${changed.join(', ')}`)
  }
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
