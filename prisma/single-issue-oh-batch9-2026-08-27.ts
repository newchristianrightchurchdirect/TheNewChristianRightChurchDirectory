// Ohio H.B. 370 cohort, batch 9. Two more non-lead pastors (bringing it to eight), and one row where
// the petition finally named the right man.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'single-issue-oh-batch9-2026-08-27.ts'
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
    id: 4391,
    stances: { genderStance: 'complementarian' },
    also: {
      denomination: 'Fellowship of Grace Brethren Churches (Charis Fellowship)',
      website: 'https://ashlandgrace.org',
      address: '1142 West Main Street',
      zip: '44805',
      phone: '(419) 289-8334',
      leadership: 'Senior Pastor: Josh Wilson. Associate Pastor of Worship: Aaron Arnold — the man the H.B. 370 petition named. Associate Pastors: Nate Meiers (Students and Families), Dan Allan (Ministry Development), Dan Jackson (Groups and Global Impact). Eighteen elders are published.',
    },
    addSrc: ['https://ashlandgrace.org/leadership', 'https://charisfellowship.com/ashland-ohio-grace-brethren-church-marks-100-years/'],
    dropFlags: ['signature_only'],
    short: 'HELD at single_issue. FGBC/Charis Fellowship; the petition named the worship pastor again.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

**The eighth row where the petition did not name the lead pastor, and the third time it was
specifically a worship pastor.** The row read "Pastor: Aaron Arnold." Arnold is the **Associate
Pastor of Worship**. The senior pastor is **Josh Wilson**, with three further associate pastors —
Nate Meiers, Dan Allan and Dan Jackson — and **eighteen published elders**.

Denomination established: the **Fellowship of Grace Brethren Churches**, now the **Charis
Fellowship**, confirmed through an elder's biography and the church's ties to **Grace College and
Grace Theological Seminary**. Charis published a piece on this congregation marking **100 years**.

**Note this is a different body from #4353 Orrville Grace Brethren**, which is **Conservative** Grace
Brethren (CGBCI). Two distinct Grace Brethren denominations appear in this cohort and they should not
be collapsed: the CGBCI is the smaller separatist body, the FGBC/Charis the larger.

\`genderStance\` complementarian on a senior-and-associate structure that is male throughout. **The
eighteen-name elder list was NOT used to draw a conclusion in either direction** — this directory
does not infer the doctrine from a roster, and a name is not evidence of anything.

**Read and negative.** Leadership page and the Charis Fellowship article read. **Nothing on abortion
beyond the petition signature, and nothing on the civil magistrate, eschatology, theonomy, Christian
nationalism or Israel.** Marker searches on Arnold and Wilson return nothing.`,
  },
  {
    id: 4389,
    stances: { genderStance: 'complementarian' },
    also: {
      denomination: 'Baptist (independent; no association claimed)',
      website: 'https://www.cbcspringfield.net',
      address: '2643 North Limestone Street',
      zip: '45503',
      leadership: 'Senior Pastor: Isaac Dye (since October 2024). Worship Director: Chris Hatton (since October 2021). Administrative Assistant: Judy Caviggiola (since 2015).',
      notablePeople: 'Isaac Dye — senior pastor since October 2024, with his wife Sadie. Ohio-born but raised in Berlin, Germany, where his family helped plant an international church. Cedarville University, BA in Biblical Studies (2020) and MDiv (2022). The congregation is listed in The Gospel Coalition\'s church directory.',
    },
    addSrc: ['https://www.cbcspringfield.net/staff', 'https://www.thegospelcoalition.org/church/cornerstone-baptist-church9/', 'https://www.facebook.com/cbcspringfield/'],
    dropFlags: ['signature_only'],
    short: 'HELD at single_issue. The petition named the right man for once.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

**The petition named the actual senior pastor on this row** — worth recording precisely because it
has been the exception rather than the rule in this cohort. **Isaac Dye** is senior pastor, arriving
with his wife Sadie in **October 2024**.

His background is unusual for the cohort: **Ohio-born but raised in Berlin, Germany**, where his
family helped plant an international church. **Cedarville University, BA in Biblical Studies (2020)
and MDiv (2022)** — making him the **fourth Cedarville man** found here, after Bill Vine, Kevin Fath
and Andrew Shearer. Cedarville is emerging as the single most common training ground in this cohort
and is worth noting as a pattern in its own right.

The congregation is listed in **The Gospel Coalition's church directory**, which is a complementarian
network and the basis for \`genderStance\` alongside an all-male pastoral staff.

Denomination recorded as **independent Baptist**: the church claims no convention or association
anywhere on its site, and none of the Ohio association rosters read lists it.

**Read and negative.** Staff page, TGC listing and Facebook page read. **Nothing on abortion beyond
the petition signature, and nothing on the civil magistrate, eschatology, theonomy, Christian
nationalism or Israel.** The church's "What We Believe" page was not reachable and remains the one
unread item on this row. Marker searches on Isaac Dye return nothing.`,
  },
  {
    id: 4379,
    stances: {},
    also: {
      website: 'https://www.fbctroy.com',
      phone: '937-339-3602',
      leadership: 'Pastors: Dale Christian, and Nate Beaman — Pastor of Family Life Ministries, the man the H.B. 370 petition named. Pastor Emeritus: Doug Magin.',
    },
    addSrc: ['https://www.fbctroy.com/', 'https://www.youtube.com/@FBCTroyOH'],
    dropFlags: ['signature_only'],
    addFlags: ['verify_stance'],
    short: 'HELD at single_issue. The petition named the family-life pastor; the site publishes no staff page.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

**The seventh row where the petition did not name the lead pastor.** The row read "Pastor: Nate
Beaman." Beaman is **Pastor of Family Life Ministries**. **Dale Christian** is also a pastor here,
with **Doug Magin as Pastor Emeritus** — but which of them leads could not be established, because
**the church publishes no staff or leadership page at all.** Its site is built around visiting,
service times and life groups.

That is why this row is flagged \`verify_stance\` rather than closed: the leadership recorded is
assembled from a business directory and a LinkedIn profile, not from the church, and **a Pastor
Emeritus in the mix is exactly the configuration that produces a stale record** — this project has
already found deceased and departed men still credited as current.

Denomination **left unset**. The name says Baptist; the site claims no convention or association, and
no roster read lists it. Recording "Baptist" as a denomination on the strength of the church's name
would be the nominal inference this project has ruled out.

**Read and negative.** Site and YouTube channel read. **Nothing on abortion beyond the petition
signature, and nothing on the civil magistrate, eschatology, theonomy, Christian nationalism, gender
or Israel.** Marker searches on Beaman return nothing.`,
  },
  {
    id: 4386,
    stances: {},
    also: {
      denomination: 'Independent — self-described "Reformed/Evangelical" in doctrine and "Charismatic" on the Holy Spirit',
      website: 'https://gcfdayton.org',
      address: '1645 Spaulding Road',
      zip: '45432',
      phone: '(937) 930-4233',
      leadership: 'Elders: John Gray and Anvesh Perumalla. The church describes itself as "led by a team of many men and women" under those two elders. "Steven Leopold", the second name on the H.B. 370 petition for this church, could NOT be confirmed against any church source.',
      notablePeople: 'Greg and Catherine Weis — planted the congregation with their immediate family in 2003 in Dayton\'s inner city.',
    },
    addSrc: ['https://gcfdayton.org/about-us/', 'https://gcfdayton.org/meet-the-team/', 'https://www.facebook.com/GCFDayton/', 'https://www.instagram.com/gcf_dayton/'],
    dropFlags: ['signature_only'],
    addFlags: ['verify_stance'],
    short: 'HELD at single_issue. Reformed charismatic; one petition name unconfirmed.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

An unusual congregation for this directory: it describes itself as **"Reformed/Evangelical" on
Scripture and doctrine and "Charismatic" on the Holy Spirit** — a Reformed charismatic church, of
which this cohort has produced no other. **Planted in 2003 by Greg and Catherine Weis** with their
immediate family, **in Dayton's inner city**, at 1645 Spaulding Road.

**One of the two names on this row could not be confirmed.** The petition gave "John Gray; Steven
Leopold." **John Gray is confirmed as an elder**, alongside **Anvesh Perumalla**. **Steven Leopold
appears on no church source at all** — not the about page, not the team page, not the socials.
Flagged \`verify_stance\` rather than silently dropped.

**On women in leadership, the record states exactly what the church states and no more.** The
congregation says it is **"led by a team of many men and women"** under the leadership of its two
elders — both of whom are men. So women hold ministry leadership here while **eldership appears to
rest with the two named men**. **No \`womens_ordination\` flag was applied**: the church belongs to no
denomination whose position could be cited, and its own eldership is not shown to include women.
\`genderStance\` left \`unknown\` — the church makes no statement, and "many men and women" on a
leadership team is not one.

**One phrase was tested against the qualifying standard and rejected.** The church's stated mission
is to see **"the city of Dayton transformed by the love of Christ."** *Transformed* is the
directory's own vocabulary, and inner-city church planting is real public-facing work. **But the
sentence is about evangelism and mercy, not about law or the civil order, and no public act
accompanies it.** Not enough — recorded so a later keyword pass does not promote this row on the
word alone.

**Read and negative.** About page, socials and the Weis planting history read; the team page renders
empty to a browser and is the one item still unread. **Nothing on abortion beyond the petition
signature, and nothing on the civil magistrate, eschatology, theonomy, Christian nationalism or
Israel.**`,
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
