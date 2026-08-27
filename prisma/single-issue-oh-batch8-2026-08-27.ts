// Ohio H.B. 370 cohort, batch 8 — the St. Marys cluster.
//
// Three of these four are in one small town and belong to three different traditions: Assembly of
// God, Global Methodist and Calvary Chapel. That is not how a doctrinal network signs a petition;
// it is how a local ministerial association does.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'single-issue-oh-batch8-2026-08-27.ts'
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
    id: 4377,
    stances: {},
    also: {
      denomination: 'Global Methodist Church (formerly United Methodist)',
      website: 'https://waynestreetchurch.org',
      address: '130 North Wayne Street',
      zip: '45885',
      phone: '419.394.3615',
      leadership: 'Pastor: Tim Benjamin.',
    },
    addSrc: ['https://waynestreetchurch.org/', 'https://waynestreetumc.org/author/pastor-tim/', 'https://www.facebook.com/waynestreetumc/'],
    dropFlags: ['signature_only'],
    addFlags: ['womens_ordination', 'in_transition'],
    short: 'HELD at single_issue. Global Methodist — a UMC disaffiliation, and it ordains women.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

Denomination established, and it has changed: **the church is now affiliated with the Global
Methodist Church**, which it states plainly on its own site. **It was formerly United Methodist**, and
the old identity is still live in its infrastructure — the domain **waynestreetumc.org** still
resolves and the Facebook handle is still **waynestreetumc**. Flagged \`in_transition\` so a later pass
does not read the UMC traces as a current affiliation, or as two churches.

**Flagged \`womens_ordination\`.** The Global Methodist Church **ordains women**; its separation from
the UMC was over sexuality and polity, not the ordination question. That places the row below the
directory's "complementarian at minimum" floor on the denominational test, and it is **marked rather
than deleted** per the 2026-08-04 ruling.

**The disaffiliation itself was considered and does not qualify the row.** Leaving a denomination
over its sexuality settlement is a real corporate act by the congregation on a genuinely contested
question, and it is more than most rows in this cohort have done. But it is **an act of church
government, not a claim on the civil order** — the test for transformationalist. Recorded so the
reasoning is visible rather than silent.

**Read and negative.** Site, the surviving UMC-era site and Facebook page read. The church's public
material is invitational — it "values your mind, your story, and your mission — where questions are
welcome" — with **no statement of faith and no position on abortion beyond the petition signature,
and nothing on the civil magistrate, eschatology, theonomy, Christian nationalism or Israel.**
Marker searches on Tim Benjamin return nothing.`,
  },
  {
    id: 4378,
    stances: {},
    also: {
      denomination: 'Calvary Chapel',
      website: 'https://calvarychristianfellowshipstmarys.com',
      address: '302 West High Street',
      zip: '45885',
      leadership: 'Pastor: Dane Gilmore.',
    },
    addSrc: ['https://calvarychristianfellowshipstmarys.com/', 'https://www.faithstreet.com/church/calvary-christian-fellowship-st-marys-ohio', 'https://www.facebook.com/p/Calvary-Christian-Fellowship-100064545650298/'],
    dropFlags: ['signature_only'],
    addFlags: ['verify_stance'],
    short: 'HELD at single_issue. Calvary Chapel; its website is currently throwing a fatal error.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

Denomination established: **Calvary Chapel**, per FaithStreet's listing and the congregation's name
and practice. Pastor **Dane Gilmore**; 302 West High Street, St. Marys.

**The church's website is currently broken, and that is a fact about the site rather than the
church.** calvarychristianfellowshipstmarys.com returns **"There has been a critical error on this
website"** — a WordPress fatal error, not a dead domain and not a 403. **It was read through the
Wayback Machine instead**, which is worth recording because earlier sessions logged Wayback as
blocked from this environment; **it is working now.** The archived site is genuinely thin: home,
about, messages, contact, service times, monthly communion and a monthly prayer hour.

**What was deliberately NOT inferred.** Calvary Chapel as a movement is dispensational,
premillennial and pretribulational, and strongly futurist on Israel. **This congregation publishes
none of that**, and the same rule that forbids qualifying a church on CREC membership forbids
reading a movement's distinctives onto a row. \`eschatology\` and \`zionistStance\` stay \`unknown\`.

Flagged \`verify_stance\`: the affiliation rests on a third-party listing plus the church's name, and
its own site could not confirm it while broken. **Re-test the site rather than the church when it
comes back up.**

**Read and negative.** Archived site and Facebook page read. **Nothing on abortion beyond the
petition signature, and nothing on the civil magistrate, theonomy, Christian nationalism, gender or
Israel.** Marker searches on Dane Gilmore return nothing — the name collides with **Hiram S.
Gilmore**, a nineteenth-century figure, who is unrelated.`,
  },
  {
    id: 4376,
    stances: {},
    also: {
      website: 'https://livinghopeworship.org',
      leadership: 'Senior Pastor: Dr. Joshua Steinke. NOTE: the doctorate is chiropractic, not theological — he founded Steinke Family Chiropractic.',
      notablePeople: 'Joshua Steinke — senior pastor; founder of Steinke Family Chiropractic, director of the "Worship Anyway" music ministry, and with his wife Randee operates Wild Willows Homestead. They have seven children. His stated ministry aim is "to lay hands on the sick and see them healed, to worship boldly in every season, and to restore hope to communities."',
    },
    addSrc: ['https://livinghopeworship.org/', 'https://www.facebook.com/LivingHopeWorshipCenter/', 'https://worshipanyway.com/artists/dr-joshua-steinke/'],
    dropFlags: ['signature_only'],
    addFlags: ['denom_ambiguous'],
    short: 'HELD at single_issue. Its old domain says Assembly of God; its new site claims no affiliation.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

**The affiliation is genuinely ambiguous and is flagged rather than guessed.** The congregation's
**former web address was \`livinghopeaog.com\`** — "AOG," Assembly of God — and that domain still
resolves, carrying only a notice that the church **"has moved web addresses."** **The new site,
livinghopeworship.org, claims no denomination anywhere.** So the evidence for Assemblies of God is a
retired domain name, and the church's current public material is silent.

**That distinction matters beyond tidiness.** The Assemblies of God has **ordained women since
1914**. If the AG affiliation is current, this row needs the \`womens_ordination\` flag and sits below
the directory's complementarian floor. **The flag was NOT applied**, because a retired domain is not
a membership claim, and applying it would assert something the church does not say. **Flagged
\`denom_ambiguous\` instead, with the question written down so the next pass can settle it by asking
rather than inferring.**

The church's own language is plainly charismatic or Pentecostal — "Experiencing Miracles," and the
pastor's stated aim "to lay hands on the sick and see them healed" — which is consistent with the AG
history without establishing it.

**One correction worth making explicit: "Dr." Joshua Steinke is not a theologian.** He is a
**chiropractor**, the founder of Steinke Family Chiropractic. He also directs a music ministry called
**"Worship Anyway"** and, with his wife Randee, runs **Wild Willows Homestead**; they have seven
children. **Recorded so that no later pass reads the title as a divinity doctorate**, which this
directory has several of and which would change how the row reads.

**Read and negative.** New site, old site, Facebook page and his music-ministry profile read.
**Nothing on abortion beyond the petition signature, and nothing on the civil magistrate,
eschatology, theonomy, Christian nationalism, gender or Israel.** Marker searches return nothing.`,
  },
  {
    id: 4375,
    stances: {},
    also: {
      denomination: 'Independent evangelical Bible church',
      website: 'https://www.abidingfaithbible.org',
      address: '14161 West River Road',
      zip: '44028',
      phone: '440-230-6093',
      leadership: 'Pastor (main teaching pastor): Michael "Mike" Lehman — MA, Liberty University; BA, Cleveland State University. Elders: Joseph Liana, Robert Lehman. Youth Leader: Lucas Nowosielski.',
    },
    addSrc: ['https://www.abidingfaithbible.org/staff/', 'https://www.abidingfaithbible.org/what-we-believe/', 'https://www.facebook.com/AbidingFaithBibleChurch/'],
    dropFlags: ['signature_only'],
    short: 'HELD at single_issue. Independent; its confession stops short of an eschatological position.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

**Michael "Mike" Lehman** is the main teaching pastor — **MA from Liberty University, BA from
Cleveland State** — with elders **Joseph Liana** and **Robert Lehman** and youth leader **Lucas
Nowosielski**. 14161 West River Road, Columbia Station.

Denomination recorded as **independent evangelical**: the church claims no affiliation anywhere on
its site, and no association roster read lists it.

**Its confession stops one word short of an eschatological position, and the row records that
precisely.** The statement of faith affirms biblical **inerrancy and infallibility**, salvation by
grace apart from works, and **"the personal, visible, and imminent return of our Lord and Savior
Jesus Christ."** **"Imminent" is the word premillennial pretribulationists use**, and it would be easy
to file this row as dispensational on it. **It was not.** The statement never says premillennial,
never mentions the tribulation, and never addresses Israel. \`eschatology\` stays \`unknown\`.

**A stale second website exists** — \`abidingfaithbible.webnode.page\`, carrying its own "our pastors"
page. The current site is **abidingfaithbible.org**. Recorded so a later pass does not treat the two
as different congregations, which is how duplicates have entered this directory before.

**Read and negative.** Site, staff page, statement of faith and Facebook page read. **Nothing on
abortion beyond the petition signature, and nothing on the civil magistrate, theonomy, Christian
nationalism, gender roles or Israel.** Marker searches on Michael Lehman return nothing — the name
collides with **David Lehmann**, unrelated. \`genderStance\` left \`unknown\`: the officer list is
all-male but the church publishes no statement, and this directory does not infer the doctrine from
the roster.`,
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
