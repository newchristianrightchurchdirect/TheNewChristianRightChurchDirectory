// Ohio H.B. 370 cohort, batch 3.
//
// The pattern this batch establishes: THE PETITION ROSTER REPEATEDLY NAMED A WORSHIP PASTOR AND THE
// IMPORT FILED HIM AS "THE PASTOR". Koinos (#4359) credited its Director of Music and Liturgy over a
// sitting state representative; Substance (#4358) credits its Pastor of Worship Arts over a lead
// pastor with a doctorate. Assume that failure mode on every row sourced from this petition.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'single-issue-oh-batch3-2026-08-27.ts'
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
    id: 4358,
    stances: { genderStance: 'complementarian' },
    also: {
      denomination: 'Evangelical Free Church of America (EFCA)',
      website: 'https://www.substance-church.org',
      address: '101 South Street West',
      zip: '44805',
      leadership: 'Lead Pastor: Garrick Bailey (elder/lead pastor since 2024). Elders/pastors: Scott Long (Worship Arts and Operations), Jeff Powell.',
      notablePeople: 'Garrick Bailey — lead pastor from 2024; PhD in Systematic Theology with a minor in Church History from The Southern Baptist Theological Seminary. Came from The Village Church, where he directed adult discipleship and home groups.',
    },
    addSrc: ['https://www.substance-church.org/about-substance/leadership', 'https://churches.efca.org/?id=278615', 'https://www.facebook.com/substancechrch/'],
    dropFlags: ['signature_only'],
    short: 'HELD at single_issue. EFCA — and the row named the worship pastor, not the lead pastor.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue, and the leadership was wrong in the same way Koinos was.**

The row read "Pastor: Scott Long," taken from the H.B. 370 petition. **Long is the Elder and Pastor of
Worship Arts and Operations.** The lead pastor is **Garrick Bailey**, in post since 2024, and a third
pastor-elder, **Jeff Powell**, was unrecorded.

**That is the second row in this cohort where the petition named a worship pastor and the import
filed him as the pastor** — after #4359 Koinos, where the same mistake buried a sitting state
representative. Treat it as a standing hazard on every row sourced from this petition.

Bailey is the more interesting man in any case: **PhD in Systematic Theology (minor in Church
History) from The Southern Baptist Theological Seminary**, arriving from **The Village Church**, where
he directed adult discipleship and home groups. An SBTS doctorate leading an **EFCA** congregation.

Denomination established for the first time: **Evangelical Free Church of America**, confirmed on the
EFCA's own church locator. The church subscribes to the EFCA Statement of Faith by reference and
publishes no confession of its own, which is the basis for \`genderStance\` complementarian and nothing
more — the EFCA reserves the office of pastor to men while leaving other questions open.

**Read and negative.** Site, leader biographies, sermon series (Colossians and Philemon; The Church
That Jesus Builds) and Facebook page all read. **Nothing on abortion, the civil magistrate,
eschatology, theonomy, Christian nationalism or Israel.** Searches on Bailey against each of the six
markers return nothing beyond his academic profile. Note the EFCA's own position statement makes
premillennialism no longer required, so **nothing about eschatology can be inferred from the
affiliation** and it stays \`unknown\`.`,
  },
  {
    id: 4356,
    stances: { genderStance: 'complementarian' },
    also: {
      city: 'Germantown',
      address: '343 Farmersville Pike',
      zip: '45327',
      phone: '(937) 672-7104',
      website: 'http://www.baptist-chapel.org',
      leadership: 'Pastor: Andy Powell.',
    },
    addSrc: ['http://www.baptist-chapel.org/', 'https://www.facebook.com/germantownchapel'],
    dropFlags: ['signature_only'],
    short: 'HELD at single_issue. City corrected Franklin -> Germantown; a wrong-state website avoided.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

**A wrong website was very nearly recorded here, and the trap is worth writing down.** Searching this
church surfaces \`germantownbaptist.org\` at the top. That site belongs to **Germantown Baptist Church
of Germantown, TENNESSEE** — senior pastor Matt Brown, 9450 Poplar Avenue, TN 38139. Different
church, different state, different name. It was **not** recorded.

The real site is **baptist-chapel.org**, which is a different domain entirely and serves a certificate
for \`*.websrvcs.com\`, so ordinary fetchers reject it on a hostname mismatch. That is a fact about the
fetch. Read with verification off, it gives everything plainly:

> **Andy Powell, Pastor. 343 Farmersville Pike, Germantown, Ohio 45327. (937) 672-7104.**

**City corrected from Franklin to Germantown** on the church's own published address. Both are real
Ohio towns in adjacent counties, which is exactly how this kind of error survives a review.

**Affiliation not claimed.** The site lists a **WMU** — the Woman's Missionary Union, a Southern
Baptist auxiliary — alongside a Men's Fellowship, puppet ministry, VBS and a Pretzel Festival. A WMU
is a **strong indicator** of SBC affiliation but is not a claim of membership, and no association
roster lists this chapel, so \`denomination\` is deliberately left unset rather than guessed.

\`genderStance\` complementarian on a sole male pastorate with the women's work organised separately.

**Read and negative.** Site and Facebook page read; the sermon archive is a weekly audio list with no
topical index. **Nothing on abortion beyond the petition signature, and nothing at all on the civil
magistrate, eschatology, theonomy, Christian nationalism or Israel.** Searches on "Andy Powell"
against each marker return nothing — the name collides with Adam Clayton Powell Sr., who is
unrelated.`,
  },
  {
    id: 4355,
    stances: {},
    also: {
      denomination: 'Southern Baptist Convention — Southwestern Baptist Association (SWBA)',
      website: 'https://www.livingfaithsbc.com',
      address: '10257 Morning Sun Road',
      zip: '45003',
      phone: '(513) 796-6588',
      leadership: 'Pastors: "Pastor Allen" and "Pastor Tom" — the church publishes NO surnames for either. Deacon: Clark Robinson. Staff: Jade Stinson (Community Outreach Leader and Deaf Advocate), Cara Lewallen (nursery), Robyne Robinson (treasurer and pianist).',
      notablePeople: 'Living Faith is a Deaf and Hard of Hearing mainstream church — it describes itself as serving "a forgotten area" — which makes it unusual in this directory and is the reason its abolition signature is worth keeping visible.',
    },
    addSrc: ['https://www.livingfaithsbc.com/', 'https://www.livingfaithsbc.com/about-us', 'https://www.livingfaithsbc.com/our-staff', 'https://www.facebook.com/LivingFaithSBC/', 'https://www.myswba.com/swba-churches'],
    dropFlags: ['signature_only'],
    addFlags: ['verify_stance'],
    short: 'HELD at single_issue. A Deaf and Hard of Hearing SBC church; the pastor name on this row is unconfirmed.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

**The most distinctive thing about this congregation is not on any marker: it is a Deaf and Hard of
Hearing mainstream church**, in its own words serving "a forgotten area." It carries a Community
Outreach Leader and Deaf Advocate on staff. Nothing else in this cohort looks like it.

**The pastor's name on this row is not confirmed and is flagged.** The H.B. 370 petition gave "Roy
Stinson." A third-party listing gives "Allen Stinson." **The church's own site names only "Pastor
Allen" and "Pastor Tom" and publishes no surname for either.** What the church does publish is a
staff member named **Jade Stinson**, so the surname is genuinely attached to the congregation — but
which Stinson pastors it, and whether "Roy" and "Allen" are the same man, cannot be settled from any
source read. Recorded as the conflict it is rather than resolved by guess; \`verify_stance\` set.

Denomination established: **Southern Baptist Convention**, via its own domain (livingfaithsbc.com),
its Facebook handle (LivingFaithSBC) and the **Southwestern Baptist Association** roster.

**Read and negative.** Home, About Us and Our Staff pages read; the beliefs page states only that the
church is "firmly rooted in Scripture." **No position on abortion beyond the petition signature, and
nothing on the civil magistrate, eschatology, theonomy, Christian nationalism, gender or Israel.**
Searches on both "Roy Stinson" and "Allen Stinson" against each of the six markers return nothing;
results collide with other deaf-ministry pastors — Allen Snare and Todd Stinson — who are **different
men and were not recorded.** \`genderStance\` left \`unknown\`: the church names two male pastors but
publishes no statement on the question.`,
  },
  {
    id: 4357,
    stances: {},
    also: {
      leadership: 'Pastor: Michael Byrd (Facebook "Pastor Michael Byrd"; X @preacherbyrd01).',
    },
    addSrc: ['https://www.facebook.com/p/Eternal-Life-Baptist-Church-61578677397607/', 'https://www.facebook.com/pastormichael.byrd/', 'https://twitter.com/preacherbyrd01'],
    dropFlags: ['signature_only'],
    addFlags: ['verify_stance'],
    short: 'HELD at single_issue. Pastor corroborated; the church itself publishes almost nothing.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue. This row is thin and the record says so.**

**Michael Byrd is corroborated as a real pastor** with an active public presence — a Facebook profile
as "Pastor Michael Byrd" and an X account, **@preacherbyrd01** — and the congregation has a Facebook
page. **Beyond that the church publishes essentially nothing**: no website was found, no statement of
faith, no sermon archive, and no association roster read lists it. The Cincinnati Area Baptist
Association and Ohio Valley Baptist Association directories were both checked and **neither confirms
membership**, so \`denomination\` stays unset.

**A namesake trap was avoided.** Searches surface **Michael T. Byrd Sr. of St. Louis**, an
associational missions strategist covered by Baptist Press and the Illinois Baptist — a different man
in a different state. Also surfacing: an obituary for a **Bishop Michael Craig Byrd**, again
unrelated. **None of that was recorded against this row.**

**Read and negative.** Marker searches on Michael Byrd return nothing but those namesakes. His X and
Facebook output has not been read post by post — that is the one avenue left, and it is the reason
this row is flagged \`verify_stance\` rather than closed. Every marker stays \`unknown\`; only the
abolition signature stands.`,
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

    if (dry) { console.log(`  [dry] #${r.id} ${c.name} — ${r.short}\n        ${JSON.stringify(r.stances || {})}`); continue }
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
