// Ohio H.B. 370 cohort, batch 1. Full five-step standard applied to each row.
//
// The find of this batch is THE ORRVILLE STATEMENT (orrvillestatement.com) — an eleven-article
// public declaration authored by John L. Marino of Cross View Church, Orrville, in answer to the
// Wayne County drug-abuse crisis. It is a roster as well as a document: five pastors, two elders,
// a retired county prosecutor and a treatment-centre CEO signed it. Nothing on Cross View's own
// website pointed at it; it surfaced only from a pastor-name search, which is step 4.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'single-issue-oh-batch1-2026-08-27.ts'
const STANDARD = 'site, church socials, the pastor own output, and the pastor name searched against each of the six markers'

const OS = 'https://orrvillestatement.com/'

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
    id: 4348,
    stances: {
      culturalEngagement: 'transformationalist',
      christianNationalism: 'sympathetic',
      genderStance: 'patriarchal',
      sexualityStance: 'traditional',
    },
    also: {
      website: 'https://crossvieworrville.com',
      leadership: 'Pastor: John L. Marino (ordained 2014; BA in Bible, Bob Jones University; evangelism, Northland Baptist Bible College; moved from Greenville SC to join an Orrville church-planting team). Pastor: Kelsey Jurkovich (Associate degree in Biblical and Theological Studies, 2014; in pastoral ministry since 2015).',
      notablePeople: 'John L. Marino — pastor and primary author of the Orrville Statement (orrvillestatement.com), an eleven-article public declaration answering the Wayne County drug-abuse crisis. He gathered signatures from four other pastors, two elders, Dan Lutz (retired Wayne County Prosecutor), Rev. Joseph Propri (founder, Biblical Counseling Institute) and Dr. R. W. Bolois (CEO, New Destiny Treatment Center). The church also produces Cross View Radio and two companion recordings, the Orrville Forum and the Orrville Mission.',
    },
    addSrc: [OS, 'https://crossvieworrville.com/leadership/', 'https://crossvieworrville.com/podcast/', 'https://www.sermonaudio.com/broadcasters/crossview/', 'https://www.facebook.com/church.crossview/'],
    dropFlags: ['signature_only'],
    short: 'PROMOTED to transformationalist — authored the Orrville Statement.',
    note: `**PROMOTED to transformationalist 2026-08-27. Full standard applied — ${STANDARD}.**

This row arrived as a bare signature on the Ohio H.B. 370 pastoral petition, with no website and an
unverified pastor name. The church website, read on its own, would not have changed that: the
leadership page gives two short biographies and no position on anything. **The promotion rests on a
document that only a pastor-name search surfaced.**

**THE ORRVILLE STATEMENT.** Marino was, in his own words, "approached to give a pastoral and
Christian answer to the drug abuse crisis in Wayne County Ohio." He answered with an eleven-article
affirm/deny statement, published on its own domain under the church name, with a scriptural index
under every article and two companion recordings (the Orrville Forum and the Orrville Mission).

It is not a congregational values statement. It is addressed to a county, and it makes claims well
past the drug crisis it was asked about:

- **Dominion.** "God requires humanity to subdue and exercise dominion over the world by laboring to
  bring order out of chaos."
- **Lordship over every sphere.** "Jesus is Lord over every domain of life and as his creatures, we
  are called to submit all our thinking and our behavior to him," denying that "any person, ideology,
  **government**, philosophy, theology, religion, or anything else can take Christ's rightful place
  as Lord."
- **An explicit denial of neutrality** — that anyone can "apply these moral and biblical principles
  in a neutral fashion so as to divorce morality from theology. There is no such thing as morality
  without Christ." That is the Van Tilian premise stated in a civic document.
- **Named public enemies.** "Non-Christian values (i.e. evolution, humanism, feminism) are
  objectively sinful and destructive for society."
- **Patriarchy, unqualified.** "Husbands are called to lead their homes and wives are called to
  submit to their husbands"; fathers are "obligated to take the leading role"; the statement
  "repudiate[s] the androgynous values of the current age."
- **Claims on public policy.** Against outsourcing parenting "to the state (school), daycare,
  after-school program"; against able-bodied fathers depending "on government benefits."

**Why this clears the bar and a petition signature does not.** The rule set on 2026-07-31 is that
transformationalist requires action across public questions, and that one marker acted on publicly
is single_issue. Marino has acted publicly on abortion (the H.B. 370 petition) **and** on the civil
and moral order of his county — and on the second he did not merely sign, he **authored the
document, published it, and assembled a cross-institutional coalition behind it**, including the
county's retired prosecutor.

**Christian nationalism recorded as \`sympathetic\`, not \`affirm\`.** The statement denies that any
government can take Christ's place and rejects neutrality, but it does not call for a Christian civil
order or address the magistrate's duty directly. Sympathy with the position, not the position.

**Read and negative:** the church website carries no eschatology, no theonomy, no statement on Israel
and no confession; searches on Marino against postmillennialism, theonomy and Christian nationalism
return nothing. Those four markers stay \`unknown\` and are not inferred. \`socialJusticeStance\` was
deliberately **not** set: the statement names feminism, humanism, evolution and moral relativism, but
that field tracks the CRT and social-justice debate specifically, and the statement does not engage
it. Denomination remains unset —
Marino is Bob Jones and Northland trained and the church was planted by a team, but no affiliation is
claimed anywhere on the site.`,
  },
  {
    id: 4353,
    stances: {
      eschatology: 'dispensational',
      zionistStance: 'yes',
      genderStance: 'complementarian',
      sexualityStance: 'traditional',
      theonomy: 'non_theonomic',
    },
    also: {
      denomination: 'Conservative Grace Brethren Churches International (CGBCI)',
      website: 'https://orrvillegrace.weebly.com',
      leadership: 'Pastors/elders: Joshua Steiner (Appalachian Bible College; 202 sermons in the SermonAudio archive), Isaac "Ike" Graham, Th.M., and Delmar Miller. Steiner describes himself as learning to shepherd alongside Graham and Miller — the H.B. 370 petition named him alone.',
      notablePeople: 'Joshua Steiner and Isaac "Ike" Graham, Th.M. both signed the Orrville Statement (2026), Graham as elder.',
    },
    addSrc: [OS, 'https://orrvillegrace.weebly.com/what-we-believe.html', 'https://www.sermonaudio.com/broadcasters/ogbc/', 'https://www.facebook.com/orrvillegrace/'],
    dropFlags: ['signature_only'],
    short: 'HELD at single_issue — dispensational, pretrib, pro-Israel and nonresistant.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue, and the church's own confession is what decided it.**

This row looked like a promotion candidate on the way in. Joshua Steiner signed **two** public
documents on two different questions — the Ohio H.B. 370 equal-protection petition and the **Orrville
Statement**, the latter alongside his fellow elder **Ike Graham, Th.M.** Two public questions is the
literal test for transformationalist, and on signatures alone this row would have been promoted.

**Reading the church's own statement of faith settled it the other way.** Orrville Grace Brethren is
**Conservative Grace Brethren Churches International (CGBCI)**, and it confesses:

- **Premillennial and pretribulational** return — Christ removes the church before the tribulation,
  then descends to establish the millennial kingdom.
- **"The literal fulfillment of God's covenant promises to ethnic Israel"** — dispensational, and
  the reason \`zionistStance\` moves from unknown to **yes**. This is one more instance of the standing
  finding that the directory's bulk \`zionistStance = no\` default is wrong for premillennial bodies.
- **Nonresistance** "(not to be equated with pacifism) in war and peace," discouraging participation
  in warfare and carnal strife — a Brethren distinctive that cuts directly against any claim on the
  coercive civil order.

**A nonresistant dispensationalist who expects the church removed before the tribulation is not
claiming the civil sphere for Christ, whatever he signs.** The Orrville Statement signature is
recorded as a real public act, and the abolition stance stands, but the congregation remains
\`single_issue\`.

\`theonomy\` set to \`non_theonomic\` on the church's own confessed dispensationalism rather than on its
denominational label. \`genderStance\` complementarian on the confessed "distinct function of men and
women in the home and the church," not patriarchal — the church states role distinction without the
Orrville Statement's stronger headship language.

**Read and negative:** searches on Steiner against abolition, theonomy, postmillennialism, Christian
nationalism and patriarchy return nothing beyond the two signatures. His 202-sermon SermonAudio
archive has not been listened through; that is the one thing left unread on this row.`,
  },
  {
    id: 3736,
    stances: {},
    also: {
      city: 'Athens',
      address: '3374 Pleasant Hill Road',
      zip: '45701',
      leadership: 'Pastor of Preaching and Vision: Smiles Welch. Church planted 25 August 2024.',
      notablePeople: 'The congregation hosted Jeff Durbin of Apologia Church (Tempe, AZ) as guest speaker for an End Abortion Now event.',
    },
    addSrc: ['https://graceandtruthchurchofathens.podbean.com/', 'https://www.youtube.com/@GraceandTruthChurchofAthens', 'https://www.facebook.com/p/Grace-and-Truth-Church-of-Athens-61560211092553/'],
    dropFlags: ['signature_only', 'city_is_county'],
    short: 'HELD at single_issue, but abolition is now a deed — hosted Jeff Durbin for End Abortion Now.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue, with the abolition stance upgraded from a signature to a deed.**

The row carried no pastor at all and a county in its city field. Both are fixed here.

**Pastor: Smiles Welch**, Pastor of Preaching and Vision. The congregation was **planted 25 August
2024**, is Reformed Baptist on the 1689 Second London Confession, and meets at 3374 Pleasant Hill
Road, **Athens** — the \`city_is_county\` flag is cleared, since the street address resolves the city
the bulk import could not.

**The finding: this church hosted Jeff Durbin of Apologia Church for an End Abortion Now event**, and
the recording sits in its sermon feed. That is materially stronger than the H.B. 370 signature this
row was created from — it is a congregation giving its pulpit to the movement's most prominent
figure, not a pastor adding a name to a list.

**It is still one question.** The rest of the feed is expositional (a five-part series on John
12:12-19, a session on John Gill's doctrine of the Trinity) and a hymn archive. Nothing on the civil
magistrate, eschatology, theonomy or Christian nationalism appears anywhere in it, and a search on
"Smiles Welch" against each of the six markers returns nothing. **Single-issue, and now evidenced as
such rather than assumed.**

**Read and negative:** Podbean feed, YouTube channel and Facebook page all read. The church has no
website of its own beyond the Facebook page. Eschatology, theonomy, Christian nationalism and the
Israel question remain genuinely unstated by the church and stay \`unknown\`.`,
  },
  {
    id: 4349,
    stances: { genderStance: 'complementarian' },
    also: {
      denomination: 'Conservative Congregational Christian Conference (CCCC) — Ohio Fellowship',
      website: 'https://parkmanchurch.com',
      address: '18265 Madison Road',
      zip: '44062',
      leadership: 'Pastor: William "Will" Coley — ordained in the Presbyterian Church in America; MA in Religion and a dual-track MA in Counseling (Mental Health and Family Therapy), Gordon-Conwell Theological Seminary; BA Psychology, Bowling Green State University. Elders: Jim Toth, Frank Bosak, Andrew Stone.',
      notablePeople: 'Will Coley came to the pastorate from outside it — Youth for Christ regional director, then youth director at Sovereign Grace Community Church, and a mental-health therapist with Lahey Health Behavioral Services from 1998.',
    },
    addSrc: ['https://parkmanchurch.com/about/pastor/', 'https://ccccohio.org/parkman-congregational-church/', 'https://www.facebook.com/parkmanchurch/'],
    dropFlags: ['signature_only'],
    short: 'HELD at single_issue. CCCC congregation, PCA-ordained pastor.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

Denomination established for the first time: **Conservative Congregational Christian Conference
(CCCC)**, listed in its Ohio Fellowship. The pastor, **William "Will" Coley, is ordained in the
Presbyterian Church in America** — a PCA teaching elder serving a Congregational church, which is
unremarkable in the CCCC but worth recording so a later pass does not read it as a contradiction.

Coley's route in is unusual for this directory: **Youth for Christ regional director**, then youth
director at Sovereign Grace Community Church, and a **mental-health therapist since 1998** at Lahey
Health Behavioral Services before taking this pulpit full time. Gordon-Conwell, with a dual-track
counselling masters alongside the MA in Religion.

**Read and negative.** The church site is complete — leadership, sermons, constitution, newsletter,
calendar — and carries **no position on abortion, the civil magistrate, eschatology, theonomy,
Christian nationalism or Israel**. Searches on both "Will Coley" and "William Coley" against each
marker return nothing; the name collides with a former **Ohio state senator William P. Coley II**,
who is a different man and must not be conflated. Elders Jim Toth, Frank Bosak and Andrew Stone
return nothing either.

\`genderStance\` complementarian on the church constitution's reservation of the pastorate and
eldership to men. Everything else stays \`unknown\` — this is a researched negative, not an unopened
row.

**Note for the next pass:** the site's TLS certificate has expired, so ordinary fetchers fail on it.
That is a fact about the fetch, not the church — it reads fine over http or with verification off.

**City left alone deliberately.** The church address is 18265 Madison Road, and the CCCC lists it
under **Parkman**, but the ZIP 44062 is Middlefield's. Township and postal city genuinely differ
here; changing it risks the false split that separated Heritage Church from its own Hickman County
row on 2026-08-06.`,
  },
  {
    id: 4350,
    stances: {},
    also: {
      website: 'https://littlemiamifellowship.org',
      address: 'Legacy Christian Academy Auditorium, 1075 Wesley Avenue',
      zip: '45385',
      leadership: 'Pastors: BJ Newman; Douglas Wood — from the H.B. 370 pastoral petition only. NOT confirmed against any church source; the congregation publishes no leadership page.',
    },
    addSrc: ['https://littlemiamifellowship.org/'],
    dropFlags: ['signature_only'],
    addFlags: ['verify_stance'],
    short: 'HELD at single_issue. Site read and it carries nothing — a genuine negative.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue, and the negative here is about the church, not the fetch.**

The website was rendered in a browser rather than fetched, so that a client-side page could not be
mistaken for an empty one. **It is genuinely empty.** littlemiamifellowship.org has three pages —
Home, Give and Contact — and publishes no leadership, no statement of faith, no sermon archive and
no doctrinal content of any kind. An /about path exists but is password protected.

The one thing established first-hand: the congregation meets Sundays at 10:30 in the **Legacy
Christian Academy Auditorium, 1075 Wesley Avenue, Xenia**. Renting a classical/Christian academy
auditorium is a logistical fact and **not** evidence of the education marker; it is recorded as an
address, nothing more.

**The two pastor names on this row remain unconfirmed.** "BJ Newman" and "Douglas Wood" come from the
H.B. 370 petition and match nothing on any church source. Searches against both names return other
men entirely — and one search summary tried to attach a "Johnathan Newman" to Koinos Church in Troy
(#4359 in this directory, whose pastor is Chris Early). **That linkage is an artifact and was not
recorded.** Flagged \`verify_stance\` so the pastor field reads as unconfirmed rather than settled.

Nothing on any of the six markers beyond the petition signature.`,
  },
  {
    id: 4370,
    stances: { genderStance: 'patriarchal', sexualityStance: 'traditional' },
    also: {
      notablePeople: 'Eric Sipe — pastor since July 2010; instructor at VCY Bible Institute. A signatory of the Orrville Statement (orrvillestatement.com, 2026), John Marino\'s eleven-article declaration on the Wayne County drug-abuse crisis.',
    },
    addSrc: [OS],
    short: 'Second public act recorded — Orrville Statement signatory.',
    note: `**Addendum 2026-08-27 — a second public act found for this row, via the Orrville Statement.**

**Eric Sipe signed the Orrville Statement**, the eleven-article public declaration authored by John
Marino of Cross View Church, Orrville (#4348 in this directory). He is recorded there as "Eric Sipe,
Pastor, Calvary Bible Church" with no city given.

**Identification, stated explicitly because this directory has been burned by exactly this.** The
statement is a Wayne County document and this congregation is in **Columbus, ninety miles away**. The
identification rests on there being **only one Eric Sipe pastoring a Calvary Bible Church in Ohio**:
his LinkedIn, the church's own site and its Facebook page all place him at Calvary Bible Church,
3865 North High Street, Columbus, **since July 2010**, and no Wayne County congregation of that name
with that pastor exists. Compare the standing trap on Rick Prettyman's "Christ Community Church,"
which resolved to Louisiana — the check was run here and it came back clean.

By signing he publicly endorsed the statement's patriarchy ("husbands are called to lead their homes
and wives are called to submit to their husbands") and its sexual ethics, which is what \`genderStance\`
and \`sexualityStance\` now record.

**Held at single_issue pending a ruling.** Sipe has now acted publicly on two questions — abortion
(H.B. 370) and the moral and civil order of a county — but in both cases by **signature on another
man's document**. See the batch note: whether a pure signatory clears the "action across public
questions" bar is Dustin's call, not mine, and the three affected rows are flagged rather than moved.

He also teaches at **VCY Bible Institute**, which is the one thread on this row still unpulled.`,
  },
  {
    id: 2684,
    stances: { genderStance: 'patriarchal', sexualityStance: 'traditional' },
    also: {
      notablePeople: 'Matt Timmons — teaching elder and biblical counsellor, trained at Whitefield Theological Seminary. A signatory of the Orrville Statement (orrvillestatement.com, 2026); the congregation\'s elder Mike Naylor signed it as well.',
    },
    addSrc: [OS],
    dropFlags: ['signature_only'],
    short: 'New evidence on a row the 08-05 pass had already closed — Orrville Statement.',
    note: `**Addendum 2026-08-27 — new evidence on a row that was already researched to the full standard.**

The 2026-08-05 pass applied all five steps to this church and deliberately **left every marker at
\`unknown\`**, recording that the theonomy directory listing it is dated 2011 while the congregation
was founded in 2016. That judgment was correct on what was then available.

**It did not have the Orrville Statement.** Teaching elder **Matt Timmons signed it**, and so did
Hopewell's elder **Mike Naylor** — two men from one congregation on John Marino's eleven-article
declaration answering the Wayne County drug-abuse crisis. Ashland is not Wayne County; they signed a
neighbouring county's document.

That gives this row two public acts on two questions: the H.B. 370 equal-protection petition and the
Orrville Statement. Set against **Timmons' training at Whitefield Theological Seminary** — Kenneth
Talbot's school, and a standing lead in this project's queue at eight rows and counting — and the
church's Reformed, family-integrated, Westminster-and-1689 confession, this row is now the strongest
promotion candidate in the Ohio cohort that has **not** been promoted.

\`genderStance\` and \`sexualityStance\` set from the statement Timmons put his name to. **Cultural
engagement deliberately not moved** — see the batch note; Timmons signed, he did not author, and that
line is Dustin's to draw. The \`signature_only\` flag is cleared regardless, since it was already
false: this row has carried individual research since 2026-08-05.`,
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

    const alsoSet = {
      ...(r.also || {}),
      recordFlag: flags.length ? flags.join(';') : null,
      sourceUrls: srcs.length ? srcs.join(';') : null,
      researchStatus: 'researched',
      stanceBasis: 'evidenced',
      lastResearchedAt: new Date(),
      researchNote: `2026-08-27: FULL standard applied — ${STANDARD}. ${r.short}`,
      theologicalNotes: `${c.theologicalNotes || ''}\n\n---\n\n${r.note}`,
    }

    if (dry) {
      console.log(`  [dry] #${r.id} ${c.name} — ${r.short}`)
      console.log(`        stances: ${JSON.stringify(r.stances || {})}`)
      console.log(`        flags:   ${c.recordFlag || '-'}  ->  ${flags.join(';') || '-'}`)
      continue
    }

    const changed = await updateStances(prisma, r.id, (r.stances || {}) as never, {
      actor: ACTOR,
      note: r.short,
      alsoSet,
    })
    console.log(`  #${r.id} ${c.name} — ${r.short}`)
    if (changed.length) console.log(`        stances changed: ${changed.join(', ')}`)
  }
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
