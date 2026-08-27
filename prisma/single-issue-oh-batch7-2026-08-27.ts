// Ohio H.B. 370 cohort, batch 7.
//
// One promotion (Seth Drayer, VP of Created Equal), one row that is not a church at all, and a
// multi-site church filed twice.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'single-issue-oh-batch7-2026-08-27.ts'
const STANDARD = 'site, church socials, the pastor own output, and the pastor name searched against each of the six markers'

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
    id: 4392,
    stances: {
      culturalEngagement: 'transformationalist',
      genderStance: 'complementarian',
      sexualityStance: 'traditional',
    },
    also: {
      website: 'https://experiencecrosspointe.church',
      address: '119 North Cleveland Avenue',
      zip: '43081',
      phone: '614-891-1250',
      leadership: 'Lead Pastor: Matt Keller. Assistant Pastor (Adult Bible Education): Seth Drayer — the man the H.B. 370 petition named. Associate Pastor: Ben Crawford. Worship and Small Groups Pastor: Nate Sexton.',
      notablePeople: 'Seth Drayer — assistant pastor over Adult Bible Education, and VICE PRESIDENT OF CREATED EQUAL, the Columbus-based national pro-life education and outreach organisation founded by Mark Harrington. In full-time pro-life ministry since 2010. He debates university professors in formal public debate — most recently Dr. David Sanders of Purdue — and has appeared on Fox & Friends and Hannity. He is also adjunct instructor of Christian Apologetics at Veritas Academy, a private classical school in Columbus. MA in Christian Apologetics, Biola University; BA, Indiana University. He preached "Genesis and Gender: The Transgender Delusion" from this pulpit.',
    },
    addSrc: [
      'https://experiencecrosspointe.church/',
      'https://thisiscrosspointe.online/leadership/',
      'https://www.createdequal.org/author/seth-drayer/',
      'https://www.createdequal.org/wp-content/uploads/2026/02/Bio_Seth_Drayer.pdf',
      'https://www.sethdrayer.org/bio',
    ],
    dropFlags: ['signature_only'],
    short: 'PROMOTED — its assistant pastor is vice president of Created Equal and teaches at a classical academy.',
    note: `**PROMOTED to transformationalist 2026-08-27. Full standard applied — ${STANDARD}.**

The row read "Pastor: Seth Drayer," which is **incomplete rather than wrong** — he is the **assistant
pastor over Adult Bible Education**; the lead pastor is **Matt Keller**, with Ben Crawford as
associate and Nate Sexton over worship and small groups. But the man the petition named turns out to
be the most publicly engaged figure yet found in this cohort outside the legislature.

**Seth Drayer is Vice President of Created Equal** — the Columbus-based national pro-life education
and outreach organisation founded by Mark Harrington. He has been in **full-time pro-life ministry
since 2010**.

**He acts across more than one public question, and that is what promotes this row:**

1. **Abortion.** Not a signature but a vocation. He leads Created Equal's programme of equipping
   defenders with the scientific and philosophical case, and he **debates university professors in
   formal public debate** — most recently **Dr. David Sanders of Purdue**. He has appeared on **Fox
   & Friends** and **Hannity**.
2. **Gender.** He preached **"Genesis and Gender: The Transgender Delusion"** from this pulpit, and
   **the church publishes it on its own media site.** Under the standing ruling that a pastor
   preaching and publishing a position from that pulpit is the institution's position, that is the
   church's position, not merely his.
3. **Education.** He is **adjunct instructor of Christian Apologetics at Veritas Academy**, a private
   classical school in Columbus. The 2026-07-31 ruling is explicit that **working at the
   institutional centre of classical education is transformationalist action**, not a lesser
   substitute for it.

MA in Christian Apologetics from **Biola**; BA from Indiana University.

**The qualification, recorded plainly.** The transformationalist case here rests on the **assistant**
pastor, not the lead. **The church's own "What We Believe" is standard evangelical** — God, Christ,
humanity, Scripture, salvation, the church, the resurrection, baptism — with **nothing on the civil
order**, and lead pastor **Matt Keller has no marker record at all**. The promotion stands on the
"if the pastor pushes it, the church counts" ruling, applied to a man who is a pastor of this church
and whose work it platforms. **If that rule is ever narrowed to lead pastors, this row is the first
to revisit.**

**Two fetch traps cleared, both of which would have produced a false finding:**

- The church runs **two live domains** — \`experiencecrosspointe.church\` and
  \`thisiscrosspointe.online\` — and **only the second has a leadership page, which omits Drayer
  entirely.** Taken alone that reads as a departure.
- **Drayer's speaker page on the primary domain now returns 404.** Taken alone that reads as a
  departure too.
- **Neither is true.** He is recorded as assistant pastor overseeing Adult Bible Education and
  **preached as recently as 5 January 2025**. The 404 is a site-migration artifact between the two
  domains. **An absent page is a fact about the site, not about the man.**

Note also that \`usachurches.org\` files this congregation under a **calvary-bible-baptist-church**
slug, which suggests a former name. **No "Calvary Bible Baptist Church" row exists in this
directory**, so no duplicate is created by it — checked rather than assumed.

**Left \`unknown\` deliberately:** eschatology, theonomy, Christian nationalism and the Israel
question. None is stated by the church or by Drayer, and none was inferred from his activism.`,
  },
  {
    id: 4385,
    stances: {},
    also: {
      website: 'https://livethedeeperlife.org',
      leadership: 'President: Dr. Michael R. Avery. Board: Richard Miles, Monte Stetler.',
      notablePeople: 'Dr. Michael R. Avery — president of Deeper Life Ministries International; named Chancellor of God\'s Bible School & College in 2017 after twenty-two years as its president. An ordained elder in the Bible Methodist Connection of Churches, where he pastored ten years, served five years as a Conference Vice-president and five as General Missions Secretary, and now serves as General Connectional Chairman. Degrees from God\'s Bible School & College, Wesley Biblical Seminary (honoris causa) and Cincinnati Christian University.',
      approved: false,
    },
    addSrc: ['https://livethedeeperlife.org/about/', 'https://livethedeeperlife.org/about-michael/', 'https://www.gbs.edu/about-us/our-story/leadership/', 'https://www.biblemethodist.org/our-team/'],
    dropFlags: ['signature_only'],
    addFlags: ['review_nonfit'],
    short: 'OUT OF SCOPE — not a church. A parachurch conference ministry with no congregation.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD OUT OF SCOPE: this is not a church.**

**Deeper Life Ministries International is a parachurch organisation**, registered **501(c)(3)**, whose
own description of itself is that it exists "to deepen the spiritual life of Christians everywhere."
Its work is **Deeper Life Conferences held globally**, plus "evangelism, revivals, conventions, Bible
conferences, leadership training, strategic planning sessions, books, DVDs and other special events."

**It has no congregation and holds no weekly worship services.** It has a president and a board —
Michael R. Avery, with Richard Miles and Monte Stetler — not a pastor and elders.

**This directory is a directory of churches.** The row is flagged \`review_nonfit\` and held, in the
same class as Boardwalk Chapel in the New Jersey sweep, which turned out to be a summer ministry of
the presbytery rather than a congregation.

**The man is genuinely significant and the record is kept, not discarded.** **Dr. Michael R. Avery**
was **president of God's Bible School & College for twenty-two years** and was named its
**Chancellor in 2017**. He is an ordained elder in the **Bible Methodist Connection of Churches**,
where he pastored ten years, served five years as a Conference Vice-president and five as General
Missions Secretary, and now serves as **General Connectional Chairman** — that is, a sitting
denominational officer. Degrees from GBS, Wesley Biblical Seminary (honoris causa) and Cincinnati
Christian University.

**Two live leads follow from him and are recorded rather than chased:** the **Bible Methodist
Connection of Churches** publishes a roster, and **God's Bible School & College** is a
Wesleyan-holiness institution whose orbit this directory has not touched. His signature on the H.B.
370 petition was given in a personal and organisational capacity, not on behalf of a congregation,
which is exactly why the row cannot stand as one.`,
  },
  {
    id: 4381,
    stances: { genderStance: 'complementarian' },
    also: {
      denomination: 'General Association of Regular Baptist Churches (GARBC)',
      website: 'https://www.mbccolumbus.org',
      address: '4663 Trabue Road',
      zip: '43228',
      leadership: 'Lead Pastor: Andrew Shearer (since April 2016). Community Life Pastor: David Bout. Worship Pastor: Jon Krull. Sixteen deacons are published.',
      notablePeople: 'Andrew Shearer — lead pastor since April 2016. BS in mechanical engineering, Cedarville University (1994); thirteen years in the aerospace industry at Boeing Satellite Systems in Los Angeles, during which he attended and graduated from The Master\'s Seminary in Sun Valley (2006). In pastoral ministry since 2007, first in Aurora, Illinois and then in southern Ohio. The church hosts a Proclaim Conference.',
    },
    addSrc: ['https://www.mbccolumbus.org/our-leadership-team', 'https://www.mbccolumbus.org/proclaim-conference', 'https://www.garbc.org/ministry-highlights/four-churches-combine-for-good-friday-service/', 'https://www.youtube.com/channel/UCdJ4ffTTvGy-6pe8BKz2BUA'],
    dropFlags: ['signature_only'],
    short: 'HELD at single_issue. GARBC; hosts its own Proclaim Conference.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

Denomination established: **General Association of Regular Baptist Churches (GARBC)**, confirmed by
the GARBC's own coverage of a combined Good Friday service.

**Andrew Shearer** has led the congregation since **April 2016**, and his route in is unusual:
**mechanical engineering at Cedarville (1994)**, then **thirteen years in aerospace at Boeing
Satellite Systems** in Los Angeles — during which he attended and **graduated from The Master's
Seminary in 2006** — then pastoral ministry from 2007 in Aurora, Illinois and southern Ohio. He is
the **third pastor in this cohort trained in the Master's orbit**, after Bill Vine and Mark Rice.

**The church hosts its own Proclaim Conference**, which is institutional work of the kind this
directory watches for. **It was examined and does not qualify the row**: no programme, roster or
subject matter could be read from the church's page, and a conference is only evidence if what it
teaches is known. Recorded as a thread worth pulling, not as a marker.

**A city discrepancy, resolved and worth noting.** The leadership page's own title says **"Hilliard
OH"** while the published address is **4663 Trabue Road, Columbus, OH 43228**. The address is
authoritative and the row keeps Columbus; the Hilliard string is a stale page title. Left as it is
rather than "corrected" in either direction on a title tag.

\`genderStance\` complementarian on a three-man pastoral staff and **sixteen deacons, all men**.

**Read and negative.** Leadership page, conference page, YouTube channel and podcast read. **Nothing
on abortion beyond the petition signature, and nothing on the civil magistrate, eschatology,
theonomy, Christian nationalism or Israel.** Marker searches on Shearer return nothing.`,
  },
  {
    id: 4384,
    stances: { genderStance: 'complementarian' },
    also: {
      name: 'Citizens Baptist Church',
      denomination: 'Southern Baptist Convention — Baptist Resource Network; Harbor Network',
      website: 'https://www.citizenschurch.net',
      leadership: 'Pastor and primary preacher/teacher: Rob (Robert) Kane, since 2020. Planted the congregation with his wife Danielle.',
      notablePeople: 'Rob Kane — planted Citizens with his wife Danielle in 2020 after teaching at Summit Baptist Church, Pataskala and Lifepoint Church, Westerville. He produces and co-hosts the Simple Theology podcast and runs simpletheology.org.',
    },
    addSrc: ['https://www.citizenschurch.net/', 'https://www.facebook.com/citizensohio/', 'https://www.brnunited.org/news/cp-stories-robert-danielle-kane-ohio/', 'https://www.harbornetwork.com/churches-list/tag/Rob+Kane'],
    dropFlags: ['signature_only'],
    short: 'HELD at single_issue. Name corrected to Citizens Baptist Church; a Texas namesake avoided.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

**Name corrected: the congregation is Citizens BAPTIST Church**, and it describes itself as
**confessionally Baptist**. The row's "Citizens Church" is the short form used in conversation.

**A third wrong-church website was avoided.** \`citizenschurch.com\` is **Citizens Church of Plano,
Texas**, an **Acts 29** congregation at 4501 Legacy Drive. Different church, different state,
different network. **Not recorded.** The correct domain is **citizenschurch.net**, with Facebook at
\`citizensohio\`.

> **That is the third name-collision trap in this cohort**, after Germantown Baptist Chapel drew
> Germantown, Tennessee and King's Church Franklin drew King's Church Lakewood. **In this cohort a
> plausible domain is a hypothesis, not a source.**

Affiliation established: **Southern Baptist Convention**, via the **Baptist Resource Network** — the
SBC state convention, which profiled the Kanes in its Cooperative Program stories — and the church is
also listed by the **Harbor Network**, a church-planting network.

**Rob Kane** planted the congregation with his wife **Danielle in 2020**, having previously taught at
**Summit Baptist Church, Pataskala** and **Lifepoint Church, Westerville**. He produces and co-hosts
the **Simple Theology podcast** and runs simpletheology.org. The church's stated aim is disciples who
are "theologically rich, relationally deep, and missionally engaged."

**Read and negative.** Site, Facebook, the BRN profile and the Harbor Network listing read. **Nothing
on abortion beyond the petition signature, and nothing on the civil magistrate, eschatology,
theonomy, Christian nationalism or Israel.** Marker searches on Kane return nothing. **His Simple
Theology podcast has not been listened through** — that is the one avenue left on this row, and it
is the kind of pastor-produced output that has overturned verdicts before.`,
  },
  {
    id: 4383,
    stances: {},
    also: {
      denomination: 'Southern Baptist Convention',
      website: 'https://www.maranathaohio.com',
      address: '170 East Columbus Street',
      zip: '43147',
      phone: '(614) 462-0335',
      leadership: 'Pickerington campus lead pastor: Jeff Beisel. Music and Discipleship Pastor: Randy Surface — the first name on the petition, and not the lead. Maranatha is one multi-campus church with directional elders across four Ohio locations.',
    },
    addSrc: ['https://www.maranathaohio.com/about', 'https://www.maranathaohio.com/pickerington', 'https://churches.sbc.net/church/maranatha-community-church/', 'https://www.facebook.com/MaranathaOhio/'],
    dropFlags: ['signature_only'],
    addFlags: ['verify_stance'],
    short: 'HELD at single_issue. One campus of a four-location church that is filed twice — see #4466.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue, and a filing problem found.**

**Maranatha is one multi-campus church, not four congregations.** It operates in **Baltimore, Canal
Winchester, Pickerington and Southside**, all Ohio, under **directional elders** with elders across
locations, and describes itself as "a family of churches in multiple locations who have chosen to
collaborate."

Campus lead pastors: **Pickerington — Jeff Beisel. Canal Winchester — David Appelt. Southside —
Justin Bubar. Baltimore — Dan Case.**

> **This directory holds it twice: #4383 (Pickerington) and #4466 (Canal Winchester).** They are not
> duplicates in the ordinary sense — both are real meeting locations — but they are **one church**,
> and no rule has been set for multi-site congregations. Flagged \`verify_stance\` on both and
> **referred to the duplicate queue rather than merged here**, since the NorthRidge multi-site
> question is already open and should be settled once for all of them.

**The petition's leadership failure again, for the sixth time.** The row's first name was **Randy
Surface**, who is the **Music and Discipleship Pastor** at Pickerington. The campus lead is **Jeff
Beisel**, who does appear third on the row.

Denomination established: **Southern Baptist Convention**, per the SBC church directory.

**Read and negative.** The published Statement of Faith covers nine heads — Trinity, Father, Son,
Spirit, Scripture, mankind, salvation, the church, **end times** and evangelism — but **the end-times
article's content could not be read from the summary page**, so \`eschatology\` stays \`unknown\` rather
than being guessed at. Nothing on abortion beyond the petition signature, and nothing on the civil
magistrate, theonomy, Christian nationalism or Israel. \`genderStance\` left \`unknown\`: the church
publishes an all-male pastoral staff but no statement on the question.`,
  },
  {
    id: 4466,
    stances: {},
    also: {
      denomination: 'Southern Baptist Convention',
      website: 'https://www.maranathaohio.com',
      leadership: 'Canal Winchester campus lead pastor: David Appelt. Maranatha is one multi-campus church with directional elders across four Ohio locations — see #4383 (Pickerington).',
    },
    addSrc: ['https://www.maranathaohio.com/about', 'https://churches.sbc.net/church/maranatha-community-church/'],
    addFlags: ['verify_stance'],
    short: 'Linked to #4383 — the same multi-campus church, filed twice.',
    note: `**Cross-reference added 2026-08-27 while working #4383.**

**This row and #4383 are the same church.** Maranatha Community Church is a **single multi-campus
congregation** with **directional elders** governing four Ohio locations — Baltimore, Canal
Winchester, Pickerington and Southside. This row is the **Canal Winchester** campus, whose lead
pastor is **David Appelt**; #4383 is **Pickerington**, whose lead pastor is Jeff Beisel.

Neither row is wrong about a location existing. **What is unsettled is whether this directory lists
a multi-site church once or once per campus**, and that question is already open elsewhere — the
NorthRidge multi-site lead has been sitting in the queue. **Both rows are flagged \`verify_stance\` and
referred to the duplicate queue so the rule is set once**, rather than resolved ad hoc here.

Denomination established: **Southern Baptist Convention**. Full research remains owed on this row;
only the cross-reference and the affiliation are recorded.`,
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

    // #4466 keeps its not_researched status: only a cross-reference was added.
    const partial = r.id === 4466

    if (dry) { console.log(`  [dry] #${r.id} ${c.name} — ${r.short}`); continue }
    const changed = await updateStances(prisma, r.id, (r.stances || {}) as never, {
      actor: ACTOR,
      note: r.short,
      alsoSet: {
        ...(r.also || {}),
        recordFlag: flags.length ? flags.join(';') : null,
        sourceUrls: srcs.length ? srcs.join(';') : null,
        ...(partial ? {} : { researchStatus: 'researched', stanceBasis: 'evidenced', lastResearchedAt: new Date() }),
        researchNote: partial
          ? `2026-08-27: cross-referenced to #4383 as the same multi-campus church; SBC established. FULL standard still owed on this row.`
          : `2026-08-27: FULL standard applied — ${STANDARD}. ${r.short}`,
        theologicalNotes: `${c.theologicalNotes || ''}\n\n---\n\n${r.note}`,
      },
    })
    console.log(`  #${r.id} ${c.name} — ${r.short}`)
    if (changed.length) console.log(`        stances changed: ${changed.join(', ')}`)
  }
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
