// Ohio H.B. 370 cohort, batch 6.
//
// Two Grace Advance congregations (John MacArthur's planting network) and two more rows where the
// petition did not name the lead pastor — bringing that count to five.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'single-issue-oh-batch6-2026-08-27.ts'
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
    id: 4366,
    stances: { genderStance: 'complementarian' },
    also: {
      denomination: 'Non-denominational',
      website: 'http://www.cbcxenia.com',
      address: '45 West Church Street',
      zip: '45385',
      phone: '(937) 372-4434',
      leadership: 'Pastor-Teacher: Bill Vine. Elder: Bob (Robert) Palacio. Kevin Poole and Clark Comperry lead small groups — the H.B. 370 petition listed all three as though they were pastors.',
      notablePeople: 'Bill Vine — pastor-teacher; taught and preached at The Master\'s College, Santa Clarita, for nine years before moving to Ohio in 2001 with his wife Shari and their five children. Afterwards employed by Cedarville University with an itinerant preaching ministry. Formerly an athletic trainer; led five student mission teams to Brazil and taught at the Penza Bible Institute in Russia in 2002. San Jose State University, California State University Chico, and coursework at The Master\'s Seminary.',
    },
    addSrc: ['http://www.cbcxenia.com/bio', 'http://www.cbcxenia.com/get-to-know-us', 'https://www.facebook.com/cornerstonebiblechurchxenia/', 'https://www.youtube.com/@cornerstonebiblechurchxenia'],
    dropFlags: ['signature_only'],
    short: 'HELD at single_issue. The petition named three men and none of them is the pastor.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

**The worst leadership record found in this cohort.** The row read "Pastors: Robert Palacio; Kevin
Poole; Edward Comperry." **None of the three is the pastor.** Bob Palacio is an **elder**; Kevin Poole
and **Clark** Comperry — not Edward — **lead small groups**. The pastor-teacher is **Bill Vine**.

That is now the fifth row in this cohort where the H.B. 370 petition did not name the lead pastor,
and the first where it named nobody in pastoral office at all.

**Bill Vine is squarely in the MacArthur orbit.** He **taught and preached at The Master's College in
Santa Clarita for nine years** before moving to Ohio in **2001** with his wife Shari and their five
children, and has coursework from **The Master's Seminary**. Afterwards he was employed by
**Cedarville University** with an itinerant preaching ministry. He was formerly an **athletic
trainer**, led **five student mission teams to Brazil**, and taught at the **Penza Bible Institute in
Russia in 2002**.

**The church endorses the Cambridge Declaration** — the Alliance of Confessing Evangelicals' 1996
statement of the Reformation solas, calling churches to resist worldliness in worship and ministry.
That is a real confessional commitment and is recorded, but it is a **worship-and-gospel** document,
not a claim on the civil order, and nothing was inferred from it.

**Read and negative.** Site, bio, Facebook and YouTube read. Verse-by-verse expository preaching,
non-denominational. **Nothing on abortion beyond the petition signature, and nothing on the civil
magistrate, eschatology, theonomy, Christian nationalism or Israel.** Searches on Bill Vine against
each of the six markers return nothing — note the name collides with **W. E. Vine** of *Vine's
Expository Dictionary*, and with Matthew Vines, who argues the opposite case on sexuality. Neither is
this man.

**A lead, recorded but not claimed:** searching this church surfaces **Levi Dean**, the Ohio
representative for **District 71** who **co-introduced H.B. 370** with Johnathan Newman of Koinos
(#4359). The Gongwer directory places Dean in **Xenia**, this church's town. **No connection between
Dean and this congregation, or any congregation, has been established** — he is not recorded as a
pastor anywhere. Worth someone chasing; not worth asserting.`,
  },
  {
    id: 4369,
    stances: { genderStance: 'complementarian' },
    also: {
      denomination: 'Non-denominational Bible church — Grace Advance (Grace Community Church network)',
      website: 'https://www.medinabible.org',
      address: '222 South Broadway Street',
      zip: '44256',
      phone: '330-722-4847',
      leadership: 'Pastor-Teacher: Mark Rice (since January 2014) — MDiv, The Master\'s Seminary.',
      notablePeople: 'Mark Rice — pastor-teacher since January 2014, with an MDiv from The Master\'s Seminary and a prior career in engineering. His SermonAudio archive runs past 600 sermons.',
    },
    addSrc: ['https://www.medinabible.org/page/from-the-pastor', 'https://www.gracechurch.org/medina-bible-church', 'https://www.sermonaudio.com/broadcasters/medinabible/', 'https://podcasts.apple.com/us/podcast/medina-bible-church/id1315599831'],
    dropFlags: ['signature_only'],
    short: 'HELD at single_issue. Grace Advance — MacArthur network — established as its affiliation.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

Affiliation established for the first time, and it is a real one rather than a nominal reading: the
church describes itself as **"a non-denominational Bible teaching church affiliated with Grace
Advance,"** which is the church-planting and church-strengthening arm of **John MacArthur's Grace
Community Church**, Sun Valley.

**Mark Rice** has been pastor-teacher since **January 2014**, holds an **MDiv from The Master's
Seminary**, and came to ministry from engineering. His SermonAudio archive runs past **600 sermons**.
The congregation preaches from the **Legacy Standard Bible**, the Master's Seminary translation —
another marker of the same orbit.

**What was deliberately NOT inferred.** The MacArthur orbit has well-known positions: premillennial
and pretribulational eschatology, a futurist reading of Israel, complementarianism, and MacArthur's
own leading role in the **Statement on Social Justice and the Gospel**. The schema notes that a
published Dallas Statement affirmation rules transformationalist **out**. **This congregation has
published none of that**, and network membership is not a confession — the same rule that forbids
qualifying a church on CREC membership forbids disqualifying one on Grace Advance membership.
\`eschatology\`, \`zionistStance\`, \`socialJusticeStance\` and \`culturalEngagement\` markers therefore rest
on this church's own silence, not on MacArthur's positions.

\`genderStance\` complementarian on a sole male pastor-teacher in a network whose churches uniformly
restrict the office, which is the narrowest defensible reading.

**Read and negative.** Site, Grace Advance profile, SermonAudio archive and podcast read. **Nothing
on abortion beyond the petition signature — which searches do confirm is genuinely his — and nothing
on the civil magistrate, theonomy or Christian nationalism.**

**Lead for a later pass: Grace Advance publishes a churches list and a map** at
gracechurch.org/graceadvance. It is an unworked roster of the same kind that produced results on
2026-08-06.`,
  },
  {
    id: 4371,
    stances: { genderStance: 'complementarian' },
    also: {
      denomination: 'Non-denominational — Grace Advance (Grace Community Church network)',
      website: 'https://www.gracechurchrootstown.com',
      address: '4808 Tallmadge Road',
      zip: '44272',
      phone: '330-325-7174',
      leadership: 'Pastor: Tim Paulding.',
    },
    addSrc: ['https://www.gracechurchrootstown.com/', 'https://www.gracechurchrootstown.com/beliefs', 'https://www.gracechurch.org/graceadvance/grace-church-rootstown', 'https://www.facebook.com/GraceChurchRootstown/', 'https://www.youtube.com/GraceChurchofRootstown'],
    dropFlags: ['signature_only'],
    short: 'HELD at single_issue. The second Grace Advance church in this cohort.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

**The second Grace Advance congregation in this cohort**, after #4369 Medina Bible. The church's own
site never mentions the affiliation; **Grace Advance's directory does**, listing it with Tim Paulding
as pastor. Recorded from the network's side, which is the stronger source here.

The row's pastor name was "Timothy Paulding"; the church and the network both give **Tim Paulding**,
and he is confirmed preaching current series in Ephesians and 1 John. Address confirmed as **4808
Tallmadge Road, Rootstown**.

**Its published beliefs are narrow and worth recording precisely**, because what is absent matters as
much as what is present. The statement covers the gospel, salvation by grace apart from human merit,
the local church as "the pillar and buttress of truth," **household order** and **church leadership
structure**. **It says nothing about eschatology, Israel, civil government, abortion or cultural
engagement** — and this is a MacArthur-network church, where an eschatological position would
ordinarily be expected. Its absence from the public statement is a fact about the record, not
permission to import the network's.

\`genderStance\` complementarian on the published commitments to household order and a defined church
leadership structure.

The church states it wants to "honor God in all areas of life — in their families, occupations,
schools, and their witness in Rootstown, Portage County, and around the globe." **That phrasing is
close to the directory's qualifying language and was tested against it.** It is a statement about
personal faithfulness across the spheres of ordinary life, with no claim on law or the civil order,
and **no public act accompanies it**. Not enough, and recorded so that a later pass does not read the
sentence out of context.

**Read and negative.** Site, beliefs page, Grace Advance profile, Facebook and YouTube read. Marker
searches on Paulding return nothing.`,
  },
  {
    id: 4373,
    stances: { genderStance: 'complementarian' },
    also: {
      denomination: 'General Association of Regular Baptist Churches (GARBC)',
      website: 'https://www.hillsidebaptistrittman.org',
      address: '19 West Ohio Avenue',
      zip: '44270',
      phone: '(330) 925-3704',
      leadership: 'Lead Pastor: Kevin Fath. Associate Pastor: Rick Thompson — the man the H.B. 370 petition named.',
      notablePeople: 'Kevin Fath — lead pastor; Cedarville University (1995) and Baptist Bible Seminary, Clarks Summit, Pennsylvania. He was youth and assistant pastor of Pleasant Hill Baptist Church, Sterling, from 2000 to 2011, and the congregation he now leads began in 2011 as a church plant of Pleasant Hill Baptist, Smithville.',
    },
    addSrc: ['https://www.hillsidebaptistrittman.org/about/', 'https://www.hillsidebaptistrittman.org/our-pastors/', 'https://www.faithstreet.com/church/hillside-baptist-church-rittman-oh', 'https://www.youtube.com/channel/UCJaiwhjkatZQWwmbLas__xg'],
    dropFlags: ['signature_only'],
    short: 'HELD at single_issue. GARBC; the petition named the associate, and a KJV-only listing is wrong.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

**The fourth row where the petition named a man who is not the lead pastor.** The row read "Pastor:
Rick Thompson." Thompson is the **associate pastor**; the lead pastor is **Kevin Fath**.

Denomination established: **General Association of Regular Baptist Churches (GARBC)**. The
congregation is young — **planted in 2011 out of Pleasant Hill Baptist Church, Smithville** — and Fath
came to it from **eleven years as youth and assistant pastor at Pleasant Hill Baptist in Sterling
(2000-2011)**. Cedarville University in 1995, then **Baptist Bible Seminary in Clarks Summit,
Pennsylvania**.

**A third-party listing is wrong and is recorded as wrong.** **kjvchurches.com lists this
congregation**, which would imply King James Only conviction — a meaningful doctrinal marker in
independent Baptist circles. **It is not so: Rick Thompson preaches from the ESV.** A directory
listing is a claim like any other and this one fails against the church's own practice. Nothing about
translation policy was carried over.

**A namesake trap avoided.** Searching "Rick Thompson" surfaces a **senior pastor at CRBC who is also
a ministry president** — a different man, not this church's associate. Not recorded.

\`genderStance\` complementarian on a two-man pastoral staff and GARBC practice, which restricts the
office.

**Read and negative.** About page, pastors page, sermons page and YouTube channel read. **Nothing on
abortion beyond the petition signature, and nothing on the civil magistrate, eschatology, theonomy,
Christian nationalism or Israel.** Marker searches on both Fath and Thompson return nothing.

**Lead for a later pass:** the **Ohio Association of Regular Baptist Churches (OARBC)** publishes a
newsletter and church list. Another unworked association roster, alongside the SWBA noted in batch 2
and Grace Advance in this one.`,
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
