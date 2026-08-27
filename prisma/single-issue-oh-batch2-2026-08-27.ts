// Ohio H.B. 370 cohort, batch 2.
//
// The find here is structural. The 125-row Ohio cohort in this queue exists because of a pastoral
// petition supporting H.B. 370 — and THE BILL'S OWN CO-AUTHOR pastors one of the churches in the
// cohort. The row credited the church to its worship director.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'single-issue-oh-batch2-2026-08-27.ts'
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
    id: 4359,
    stances: {
      culturalEngagement: 'transformationalist',
      abolitionStance: 'pro_abolition',
      christianNationalism: 'sympathetic',
    },
    also: {
      denomination: 'Southern Baptist Convention',
      website: 'https://koinos.church',
      address: '722 Grant Street',
      leadership: 'Founding senior pastor: Johnathan Newman (co-founded the church with his wife Jeni in 1998; senior pastor 26 years). Elders/pastors: Bryan Barnes (Teaching Pastor, from February 2025), David Spurlock (Discipleship and Students), Chris Early (Music and Liturgy, from July 2019), Tom Batty, Norm Kight (retiring March 2026), John Hickman, Doug Hoblit, Vic Haddad, Nathan Cargle. The church is governed by a plurality of elders and names no single "senior pastor" on its leadership page.',
      notablePeople: 'Johnathan Newman — founding pastor, and since 6 January 2025 the sitting REPRESENTATIVE FOR OHIO HOUSE DISTRICT 80 (R), covering Miami County and southern Darke County. Elected November 2024 with 74.9% of the vote. Vice-chair of the House Agriculture Committee; member of the Community Revitalization, Education and Transportation committees. On 18 June 2025 he CO-INTRODUCED H.B. 370, the Ohio Prenatal Equal Protection Act, with Rep. Levi Dean (R-71) — the bill that this directory\'s entire Ohio cohort was sourced from. Awarded the 2017 Dietrich Bonhoeffer Award by the Center for Christian Virtue for pro-life advocacy; supports Hope Rising, a Dayton pregnancy resource centre. Union University (BA theology and sociology); Mid-America Baptist Theological Seminary (MDiv); certified marriage and family counsellor through the Association of Certified Biblical Counselors.',
    },
    addSrc: [
      'https://koinos.church/about/',
      'https://koinos.church/why-i-am-running-for-office/',
      'https://www.ohiohouse.gov/members/johnathan-newman/biography',
      'https://www.ohiohouse.gov/members/johnathan-newman/legislation',
      'https://en.wikipedia.org/wiki/Ohio_Prenatal_Equal_Protection_Act',
    ],
    dropFlags: ['signature_only'],
    short: 'PROMOTED — its founding pastor CO-AUTHORED H.B. 370 and sits in the Ohio House.',
    note: `**PROMOTED to transformationalist 2026-08-27. Full standard applied — ${STANDARD}.**

**The row was wrong about who pastors this church, and what it got wrong is the most consequential
person in the Ohio cohort.**

The leadership field read "Pastor: Chris Early," taken from the H.B. 370 petition. Early is real, but
he is Koinos's **Director of Music and Liturgy**, in post since July 2019. The church is governed by
a **plurality of ten elders** and names no single senior pastor on its leadership page.

**Its founding pastor is Johnathan Newman, and he is a sitting member of the Ohio House of
Representatives.**

- **Representative for Ohio House District 80 (R)** — Miami County and southern Darke County —
  elected **November 2024 with 74.9% of the vote**, sworn in **6 January 2025**.
- **Vice-chair of the House Agriculture Committee**; also on Community Revitalization, Education and
  Transportation.
- **On 18 June 2025 he CO-INTRODUCED H.B. 370, the Ohio Prenatal Equal Protection Act**, with Rep.
  Levi Dean (R-71).
- **2017 Dietrich Bonhoeffer Award**, Center for Christian Virtue, for pro-life advocacy.
- Founded Koinos with his wife Jeni in **1998**; senior pastor 26 years. Union University, then
  Mid-America Baptist Theological Seminary. Southern Baptist.

**The structural fact worth recording.** Every one of the 125 Ohio rows in this directory's
single_issue queue was created from the **pastoral petition supporting H.B. 370**. The bill those
pastors were petitioning for was **co-authored by a pastor whose own church sits in that same
cohort** — filed under his worship director's name. The directory had the bill's author and did not
know it.

H.B. 370 is not an incrementalist measure. It **treats abortion as homicide**, would nullify Article
I Section 22 of the Ohio Constitution (added by Issue 1 in 2023), and was **opposed by Ohio Right to
Life** precisely because it penalises mothers. **End Abortion Ohio backed it.** That is the
abolitionist position against the mainstream pro-life lobby, and Newman put his name on the bill.

**THE COUNTER-EVIDENCE, RECORDED IN FULL, BECAUSE IT IS REAL AND IT POINTS THE OTHER WAY.**

Newman's essay **"Why I Am Running For Office," published on the church's own website on 20 December
2023**, draws precisely the line that would normally place a church in \`limited_mission\`:

- He distinguishes the church's **primary mission — worship, discipleship, gospel proclamation** —
  from **individual Christian civic participation**, and locates his candidacy in the second.
- He states plainly that the church **will not become "a political campaign organization."**
- He writes that **"the proclamation of the gospel has the power to do what no politician or
  government policy can do"** and that "the gospel transforms human hearts."
- He does **not** argue that pastors as such should hold office; he cites his own circumstance and
  notes that other pastors have done it (naming Gary Click).

**Why the promotion stands anyway.** The \`culturalEngagement\` test asks whether the church expects to
shape the civil order, and the standing ruling is that **if the pastor pushes it, the church counts**
— a separate corporate statement is not required. A pastor who enters the magistracy and drafts
legislation to redefine personhood in his state's law has made a claim on the civil order that
exceeds every signature in this directory, and **his church published his reasons for doing it.**

**But the tension is genuine and this note exists so it can be reversed in one line.** Two arguments
cut against: his public advocacy is overwhelmingly **one question**, which is the ground on which
Grace Fellowship Davenport was held at \`single_issue\` despite 54 abortion sermons; and his own
published theology of the church is closer to \`limited_mission\` than to transformationalism. If the
Davenport precedent is read strictly, this row moves back.

**Christian nationalism recorded \`sympathetic\`, not \`affirm\`** — holding office and legislating on
personhood is not, by itself, a claim that the civil order should be confessionally Christian, and
Newman has published nothing that says so.

**Read and negative:** his sermon archive on the church site is expositional throughout — Matthew,
Genesis, Ephesians, 2 Peter, Romans — with nothing on the magistrate, theonomy or eschatology beyond
one title referencing Satan being crushed. Searches against postmillennialism, theonomy, Christian
nationalism and Zionism return nothing. Those markers stay \`unknown\` and are not inferred from his
politics.`,
  },
  {
    id: 4352,
    stances: { genderStance: 'complementarian' },
    also: {
      denomination: 'Orthodox Presbyterian Church (mission work, not yet a particular church)',
      website: 'https://blanchardreformed.com',
      address: '1648 Lima Avenue',
      zip: '45840',
      leadership: 'Joseph "Joey" Boehler — organizing minister and contact for the mission work.',
    },
    addSrc: ['https://blanchardreformed.com/', 'https://pohopc.org/churches/', 'https://opc.org/locator.html?presbytery_id=10&search_go=Y'],
    dropFlags: ['signature_only'],
    addFlags: ['in_transition'],
    short: 'HELD at single_issue. An OPC mission work, not yet a particular church.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

**This is not yet a particular church.** Blanchard Reformed describes itself as **"a mission work of
the OPC"** and states it "is not an independent church and is happily joined with the Orthodox
Presbyterian Church," under the **Presbytery of Ohio**. Flagged \`in_transition\` so the distinction is
not lost — a mission work has no session of its own and its status can change.

Denomination established for the first time: **Orthodox Presbyterian Church**. It adopts the
**Westminster Standards**, which it says it "happily submit[s] to such a robust and time-tested
standard of doctrine," and that is the basis for \`genderStance\` complementarian and nothing further.

**Joseph "Joey" Boehler** is the organizing minister and the only name the work publishes; an OPC
home-missions update on Findlay from August 2025 names him as well.

**Read and negative.** The site is small and carries **no position on abortion, the civil magistrate,
eschatology, theonomy, Christian nationalism or Israel** beyond the Westminster Standards themselves.
Searches on both "Joseph Boehler" and "Joey Boehler" against each of the six markers return nothing —
the name collides with a Findlay physical therapist, Mark Boehler, who is unrelated. Confessional
subscription is **not** evidence on the markers and nothing was inferred from it.`,
  },
  {
    id: 4354,
    stances: { genderStance: 'complementarian' },
    also: {
      denomination: 'Southern Baptist Convention — Southwestern Baptist Association (SWBA)',
      website: 'https://www.kerussohamilton.org',
      address: '1069 Millville-Oxford Road',
      zip: '45013',
      leadership: 'Pastor: Kris Theobald (saved at 22; in ministry since 2004 as evangelist, then youth and associate pastor; ordained 2011; pastored six years before planting Kerusso; masters degrees in Theology and Religion). Elders: George Brown (youth pastor), Darrell Prewitt (Sunday School superintendent). Deacons: Jeff Delaney (senior deacon), Ronnie Wagers.',
    },
    addSrc: ['https://www.kerussohamilton.org/leadership', 'https://churches.sbc.net/church/kerusso-baptist-church/', 'https://www.myswba.com/swba-churches', 'https://www.sermonaudio.com/broadcasters/kerussochurch/'],
    dropFlags: ['signature_only'],
    short: 'HELD at single_issue. SBC via the Southwestern Baptist Association.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

Denomination established for the first time: **Southern Baptist Convention**, listed both in the SBC
church directory and on the roster of the **Southwestern Baptist Association (SWBA)** in southwest
Ohio. The name is Greek — *kerusso*, to proclaim or preach.

**Kris Theobald** planted the congregation after six years pastoring elsewhere. Saved at 22, in
ministry from 2004 as an evangelist and then youth and associate pastor, ordained 2011, with masters
degrees in Theology and Religion. The church publishes a full officer list — elders George Brown and
Darrell Prewitt, deacons Jeff Delaney and Ronnie Wagers — which is why \`genderStance\` is recorded
complementarian: every teaching and governing office is held by a man, with wives named in support
roles.

**Read and negative.** Church site, SermonAudio archive (broadcaster \`kerussochurch\`) and Facebook
page all read. The church states three aims — Christ-centred, Bible-based, ministry-minded — and
takes **no published position on abortion, the civil magistrate, eschatology, theonomy, Christian
nationalism or Israel**. Searches on Theobald against each of the six markers return nothing; results
collide heavily with unrelated Hamilton County abortion litigation, which is a county-name artifact
and not evidence about this church.

**Note the SWBA roster** — myswba.com/swba-churches — as an unworked association list for a later
coverage pass.`,
  },
]

// Falls Berean Bible Church is a gap this batch found: an Orrville Statement signatory that the
// directory does not contain at all.
const NEW_CHURCH = {
  name: 'Falls Berean Bible Church',
  denomination: 'Independent Bible church (fundamental Baptist orbit)',
  address: '1736 Bailey Road',
  city: 'Cuyahoga Falls',
  state: 'OH',
  zip: '44221',
  website: 'https://www.fallsbbc.org',
  phone: '330-945-9325',
  culturalEngagement: 'single_issue',
  genderStance: 'complementarian',
  sexualityStance: 'traditional',
  researchStatus: 'researched',
  stanceBasis: 'evidenced',
  approved: true,
  recordFlag: 'added_via_crosscheck',
  sourceUrls: 'https://orrvillestatement.com/;https://www.fallsbbc.org/;https://www.fallsbbc.org/pastor-joel-huffstutler/;https://www.sermonaudio.com/broadcasters/fallsbbc/;https://www.facebook.com/fallsbbc/',
  leadership: 'Senior Pastor: Dr. Joel Huffstutler — associate pastor from 2013, senior pastor from 2014 when the previous senior pastor left for another ministry.',
  notablePeople: 'Joel Huffstutler — BS Business Education (1995) and MS Counseling (1997) from Bob Jones University, PhD in Theology from Bob Jones University Seminary (2008). Short-term missionary in North Queensland, Australia (1997). Taught Bible and theology at Bob Jones Academy and served with Gospel Fellowship Association Missions. Bi-vocational pastor of Calvary Baptist Church, Landrum SC (2004-2009); interim pastor, Whitewater Bible Church, Wisconsin; then Grace Church of Mentor, where he was DIRECTOR OF THE GREAT LAKES BIBLE INSTITUTE. A signatory of the Orrville Statement (2026).',
  researchNote: '2026-08-27: ADDED and researched to the FULL standard in the same pass. Found as a signatory of the Orrville Statement while working the Ohio H.B. 370 single_issue queue; the directory did not contain it.',
  theologicalNotes: `**ADDED 2026-08-27 — a gap found by the Orrville Statement, not by a roster or a search.**

This congregation was not in the directory. It surfaced because **Dr. Joel Huffstutler signed the
Orrville Statement**, John Marino's eleven-article declaration answering the Wayne County drug-abuse
crisis (see #4348). Cuyahoga Falls is Summit County, so like Hopewell in Ashland he signed a
neighbouring county's document.

**The church.** 1736 Bailey Road, Cuyahoga Falls. Independent Bible church in the fundamental Baptist
orbit — "Biblical preaching without compromise," "conservative, Christ-honoring music," and an
explicit rejection of entertainment-driven services: "In a day when entertainment is used to entice
people to visit church, we are committed to church services that are modeled after the pattern of the
Bible." Sunday morning and evening worship plus a Wednesday prayer meeting, which is itself a
fundamentalist tell. **One directory lists it as Presbyterian; that is wrong** and was not carried
over.

**The pastor.** Huffstutler is **Bob Jones University throughout** — BS 1995, MS Counseling 1997,
**PhD in Theology from BJU Seminary 2008** — with service at Bob Jones Academy, **Gospel Fellowship
Association Missions**, and Mount Calvary Baptist Church in Greenville. He pastored Calvary Baptist,
Landrum SC bi-vocationally 2004-2009, was interim at Whitewater Bible Church in Wisconsin, then came
to Grace Church of Mentor where he was **director of the Great Lakes Bible Institute**. He joined FBBC
as associate in 2013 and became senior pastor in 2014.

**The Bible-institute directorship is flagged deliberately.** The 2026-07-31 ruling is that founding
or running a Bible institute counts as transformationalist action. **It is not applied here**, because
the directorship belonged to a previous ministry at a different congregation, and this row classifies
*this* church. If that ruling is ever read to follow the man rather than the institution, this row is
the first one to revisit.

**Classified \`single_issue\`: one public act.** The Orrville Statement claims the civil order and so
counts under the 2026-08-27 signatory ruling — but it is the **only** public act found. Huffstutler
is **not** on the H.B. 370 pastoral petition, and no second question has been evidenced.

**Read and negative.** The site returns **HTTP 403 to ordinary fetchers** and had to be rendered in a
browser — a fact about the fetch, not the church. Home, About, Our Beliefs, Sermons, Missionaries and
the pastor's page were all read. Nothing on abortion, the civil magistrate, theonomy, Christian
nationalism, Israel or eschatology appears anywhere on it, and searches on Huffstutler against each
of the six markers return nothing.`,
}

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

    if (dry) {
      console.log(`  [dry] #${r.id} ${c.name} — ${r.short}`)
      console.log(`        stances: ${JSON.stringify(r.stances || {})}`)
      continue
    }
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

  // Add Falls Berean if it is genuinely absent.
  const existing = await prisma.church.findFirst({
    where: { name: { contains: 'Falls Berean', mode: 'insensitive' } },
    select: { id: true, name: true },
  })
  if (existing) {
    console.log(`  Falls Berean already present as #${existing.id} — NOT adding.`)
  } else if (dry) {
    console.log('  [dry] would ADD Falls Berean Bible Church, Cuyahoga Falls OH')
  } else {
    const created = await prisma.church.create({
      data: { ...NEW_CHURCH, lastResearchedAt: new Date() },
      select: { id: true, name: true },
    })
    console.log(`  ADDED #${created.id} ${created.name}`)
  }
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
