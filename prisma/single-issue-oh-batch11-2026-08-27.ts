// Ohio H.B. 370 cohort, batch 11. A fourth wrong-domain trap, a city correction, and the eleventh
// row where the petition did not name the lead pastor — this time a ruling elder.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'single-issue-oh-batch11-2026-08-27.ts'
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
    id: 4395,
    stances: { genderStance: 'complementarian' },
    also: {
      city: 'Bellefontaine',
      address: '169 County Highway 32 N',
      zip: '43311',
      website: 'https://rbcbellefontaine.com',
      leadership: 'Lead Pastor: Dana Kidder (since January 2012). Administrative Pastor: Lee Jones (joined the pastoral staff January 2026). Benjamin "Ben" Beaghan — the man the H.B. 370 petition named — served as Discipleship Pastor from January 2020 and leads the counselling programme, but does NOT appear on the current leadership page.',
      notablePeople: 'Dana Kidder — lead pastor since January 2012; a New Hampshire native who worked in the automotive-parts and building-materials industries before moving to Ohio in 2001 and taking a degree in Pastoral Ministry from Cedarville University. He is CHAIRMAN OF THE BOARD OF DIRECTORS of the New Path Pregnancy Resource Centers. Ben Beaghan — Discipleship Pastor from January 2020; MDiv, The Southern Baptist Theological Seminary; previously Program Specialist and Discipleship Manager at Bair Lake Bible Camp; undergraduate degree in environmental science, Oakland University.',
    },
    addSrc: ['https://rbcbellefontaine.com/leadership', 'https://rbcbellefontaine.com/who-we-are', 'https://www.facebook.com/RBCBellefontaine/', 'https://www.youtube.com/@redemptionbiblechurch3371'],
    dropFlags: ['signature_only'],
    addFlags: ['verify_stance'],
    short: 'HELD at single_issue. City corrected to Bellefontaine; an Illinois church nearly recorded over it.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

**A fourth wrong-church domain was nearly recorded, and this one is in another state.**
\`redemptionbiblechurch.org\` is **Redemption Bible Church of Mount Prospect, ILLINOIS** — 505 West
Golf Road, lead pastor Ashley Herr, associate Robin Philip. **Not this church, and not recorded.**
The Ohio congregation is **rbcbellefontaine.com**.

> That makes four in this cohort — Germantown drew Germantown TENNESSEE, King's Church Franklin drew
> King's Church Lakewood, Citizens Church drew Plano TEXAS, and now this. **A plausible domain is a
> hypothesis, not a source.**

**City corrected from West Liberty to Bellefontaine.** The church's own published address is **169
County Highway 32 N, Bellefontaine, Ohio 43311**. Both towns are in Logan County about eight miles
apart, which is how the error survived; the correction rests on the congregation's own site, not on a
directory listing.

**The eleventh row where the petition did not name the lead pastor.** It read "Pastor: Benjamin
Beaghan." The **lead pastor is Dana Kidder**, in post since **January 2012**, with **Lee Jones** as
Administrative Pastor from **January 2026**. Beaghan served as **Discipleship Pastor from January
2020** and leads the counselling programme — **but he does not appear on the current leadership
page.** Whether he has left could not be established, which is why the row is flagged
\`verify_stance\`.

**Kidder's own record is the substantive finding, and it is still one question.** He is **chairman of
the board of directors of the New Path Pregnancy Resource Centers**, which is an institutional role
on the life question rather than a signature — materially stronger than most rows in this cohort. The
church states that it regards abortion "not as a political issue, but a moral and biblical one."
**That framing points away from a claim on the civil order, not toward one**, and no second public
question was found. Single-issue, and now evidenced as such.

He is the **sixth Cedarville tie** in this cohort, and Beaghan the **fourth SBTS man**.

**Read and negative.** Leadership page, who-we-are, Facebook and YouTube read. **Nothing on the civil
magistrate, eschatology, theonomy, Christian nationalism or Israel.**`,
  },
  {
    id: 4404,
    stances: { genderStance: 'complementarian' },
    also: {
      denomination: 'Orthodox Presbyterian Church',
      website: 'https://providenceopc.us',
      address: '7095 Summit Road SW',
      leadership: 'Pastor: Rev. Stephen J. Dufresne. Ruling elder: Michael D. Diercks — the man the H.B. 370 petition named, and not a pastor. Congregation organised 2002.',
    },
    addSrc: ['https://providenceopc.us/', 'https://providenceopc.us/about', 'https://opcgaminutes.org/wp-content/uploads/2021/11/GA-Minutes-2021-without-CFM-Report-or-Ministers-List-10.30.21.pdf', 'https://www.youtube.com/channel/UCOvnLMFynGOg4X0v4K-Kqlg'],
    dropFlags: ['signature_only'],
    short: 'HELD at single_issue. OPC; the petition named a RULING ELDER, not the pastor.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

**The eleventh leadership error in this cohort, and the second where the man named holds no pastoral
office at all.** The row read "Pastor: Michael Diercks." **Michael D. Diercks is a RULING ELDER** —
the Orthodox Presbyterian Church's own **General Assembly minutes** list him as a ruling elder from
Pataskala. **The pastor is Rev. Stephen J. Dufresne.**

After #4366 Cornerstone Xenia, where the petition named an elder and two small-group leaders, this
is the second row where the import promoted a layman to "the pastor."

Denomination established: **Orthodox Presbyterian Church**; the congregation was **organised in
2002** and meets at **7095 Summit Road SW, Pataskala**, with Sunday school, morning worship, an
evening study and a Wednesday prayer meeting — a full traditional schedule.

**Two live domains** exist for this congregation, \`providenceopc.us\` and \`providence-opc.org\`, the
second carrying an "Our Pastor" page. Recorded so a later pass does not read them as two churches;
the \`.us\` site is the current primary.

\`genderStance\` complementarian on OPC polity, which restricts both the teaching and ruling offices to
men — and unusually for this directory that is a denominational fact the congregation actually
practises, since its only named officers are men.

**Read and negative.** Site, about page, OPC General Assembly minutes and YouTube channel read. The
church says only that the OPC is "thoroughly committed to the authority and relevance of the
Scriptures." **Nothing on abortion beyond the petition signature, and nothing on the civil
magistrate, eschatology, theonomy, Christian nationalism or Israel.** Marker searches on Dufresne
return nothing.`,
  },
  {
    id: 4398,
    stances: { genderStance: 'complementarian' },
    also: {
      denomination: 'Non-denominational with Reformed Baptist convictions',
      website: 'https://www.gccbeavercreek.org',
      address: '780 North Fairfield Road',
      zip: '45434',
      phone: '(937) 306-8566',
      leadership: 'Pastor: Paul Craig. Elder: Jim (James) Koerber — the man the H.B. 370 petition named, and an elder rather than a pastor.',
      notablePeople: 'The congregation runs GRACE COVENANT COUNSELING, a training centre of the Association of Certified Biblical Counselors (ACBC). Jim Koerber, elder, also leads Men\'s Discipleship for the East Area in the Cedarville and Xenia region.',
    },
    addSrc: ['https://www.gccbeavercreek.org/whoweare', 'https://biblicalcounseling.com/training-centers/grace-covenant-counseling/', 'https://www.facebook.com/GraceCovenantChurchBeavercreek/'],
    dropFlags: ['signature_only'],
    short: 'HELD at single_issue. Reformed Baptist convictions; an ACBC training centre; the petition named an elder.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

**The twelfth leadership error, and the third naming a man in no pastoral office.** The row read
"Pastor: James Koerber." **Jim Koerber is an ELDER.** The pastor is **Paul Craig**.

Denomination established, and it is more precise than most in this cohort: **non-denominational with
Reformed Baptist convictions** — the church's own formulation. 780 North Fairfield Road, Beavercreek.

**The institutional finding: the congregation runs Grace Covenant Counseling, a recognised training
centre of the Association of Certified Biblical Counselors.** That is real institutional work — a
church training counsellors under a national certifying body, not merely offering counselling. **It
was tested against the education ruling and does not qualify the row**: the 2026-07-31 ruling covers
Bible institutes, seminaries and classical Christian schools as movement-building, and an ACBC
training centre trains counsellors for churches rather than forming the next generation for the
public square. **Recorded in full so the call is visible and reversible.**

Koerber also leads **Men's Discipleship for the East Area** in the Cedarville and Xenia region — the
**seventh Cedarville-orbit tie** in this cohort.

\`genderStance\` complementarian on Reformed Baptist convictions and an all-male pastorate and
eldership.

**Read and negative.** Who-we-are, ministries, contact, the ACBC training-centre listing and Facebook
read. **Nothing on abortion beyond the petition signature, and nothing on the civil magistrate,
eschatology, theonomy, Christian nationalism or Israel.** Marker searches on Paul Craig return
nothing — the name is very common and collides broadly, so the search was run with the church name
attached.`,
  },
  {
    id: 4397,
    stances: { genderStance: 'complementarian' },
    also: {
      website: 'https://www.sacredmission.life',
      leadership: 'Lead Pastor: Justin Rahmes. Pastors: Rick Ianniello (also Director of Discipleship — listed as "Errico Ianniello" on the H.B. 370 petition), Tim Harris, Jerod Martin, Tyler Payne. The church states its leadership structure follows 1 Timothy 3 and Titus 1.',
      notablePeople: 'Justin Rahmes — lead pastor; previously lead pastor of the North Campus of Missio Dei Church, and before that at KingsWay Community Church and Epipheo.',
    },
    addSrc: ['https://www.sacredmission.life/leaders', 'https://www.sacredmission.life/', 'https://www.facebook.com/sacredmissioncincy/'],
    dropFlags: ['signature_only'],
    short: 'HELD at single_issue. Lead pastor confirmed; the petition\'s "Errico" is the church\'s "Rick".',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

**A name resolved rather than flagged.** The petition listed "Errico Ianniello; Justin Rahmes." The
church's own leadership page lists **Rick Ianniello**, pastor and Director of Discipleship. **Errico
is the formal name and Rick the one he uses** — the same man, not two, and not an error worth
flagging. Recorded because a later pass comparing the petition against the site would otherwise read
it as a mismatch.

**Justin Rahmes is the lead pastor**, and unusually for this cohort **the petition did name him** —
second on the row rather than first. The pastoral team is **Rahmes, Ianniello, Tim Harris, Jerod
Martin and Tyler Payne**, with a substantial diaconate. The church states its leadership structure
follows **1 Timothy 3 and Titus 1**, which is the basis for \`genderStance\` complementarian and
nothing further.

Rahmes came from **Missio Dei Church**, where he led the North Campus, and before that KingsWay
Community Church. **Note for a later pass:** this directory has rows touched by scripts named
\`demote-missio-dei\` and \`restore-missio-dei\` from 2026-08-12. **No connection between that Missio
Dei and this man's former church has been established** — the name is widely used — and none is
asserted here.

Denomination **left unset**: the church claims none, and its material is thoroughly
gospel-centred-evangelical in idiom without a confessional or associational claim.

**Read and negative.** Leaders page, home page and Facebook read. **Nothing on abortion beyond the
petition signature, and nothing on the civil magistrate, eschatology, theonomy, Christian nationalism
or Israel.** Marker searches on Rahmes return nothing.`,
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
