// Ohio H.B. 370 cohort, batch 5. Four clean negatives, one of them worth the time it took.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'single-issue-oh-batch5-2026-08-27.ts'
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
    id: 4364,
    stances: { genderStance: 'complementarian', sexualityStance: 'traditional' },
    also: {
      denomination: 'Southern Baptist Convention — State Convention of Baptists in Ohio (SCBO) and Cincinnati Area Baptist Association (CABA)',
      website: 'https://friendshipchurchohio.com',
      address: '10600 East State Route 73',
      zip: '45032',
      leadership: 'Pastor: Jordan Atkinson (since summer 2018).',
      notablePeople: 'Jordan Atkinson — pastor since summer 2018. BA in History with a religious studies minor, University of Alabama (2014); MDiv in Biblical and Theological Studies, The Southern Baptist Theological Seminary (2017); ThM and PhD in Biblical Studies, Midwestern Baptist Theological Seminary (ABD). Previously a pastoral intern at Kenwood Baptist Church, Louisville, and Associate Pastor of Youth Ministry at Calvary Baptist Church, Fayette, Alabama (2010-2014). He and his wife Abi have eight children and are licensed foster caregivers through Clinton County, Ohio. He has reviewed for The Gospel Coalition\'s journal Themelios.',
    },
    addSrc: ['https://friendshipchurchohio.com/our-pastor/', 'https://friendshipchurchohio.com/affiliations/', 'https://mbts.academia.edu/JordanAtkinson', 'https://www.facebook.com/FriendshipBaptistHarveysburg/'],
    dropFlags: ['signature_only'],
    short: 'HELD at single_issue. A theonomy question raised by the sermon titles and answered NO.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue, and this row took the longest of the batch because its sermon titles looked like something.**

**The question.** The church's recent preaching is a sustained series through **Deuteronomy**, and the
titles repeat a single framing: *"Corporately Worship God According to His Good Law" (Deut 12)*, **"No
Exceptions to God's Good Law" (Deut 13)**, *"God's Good Law for His Holy Sons" (Deut 14)*, *"God's
Good Laws on Giving"*, *"The Festivals of God's Good Law."* Deuteronomy 13 is the apostasy and
false-prophet chapter. Preaching it as **"God's good law, no exceptions"** is theonomy-adjacent
language and had to be checked rather than waved through in either direction.

**The answer is no, and it is well evidenced.** Searching the church's own site:

- **\`theonomy\` returns nothing. \`postmillennial\` returns nothing.**
- **\`magistrate\`** returns two expository sermons and nothing else — Matthew 5:38-48 and 1 Peter
  2:11-17, both texts that simply mention the subject.
- **\`abortion\`** returns two sermons, on Isaiah 56-57 and Hosea 13, both passages about child
  sacrifice. It is not a standing theme.
- **\`civil government\`** returns the same 1 Peter sermon and the church's confession.

**The confession settles it.** Friendship holds the **Baptist Faith and Message 2000**, whose Article
XVII on Religious Liberty states that **the church should not resort to the civil power to carry on
its work**. That is a published position pointing away from transformationalism, not toward it.

**The "God's good law" framing is expository practice, not a programme.** Atkinson preaches
systematically through books; he reached Deuteronomy, and Deuteronomy is about the law. Calling it
good is Pauline. **Nothing here claims the civil order.**

Affiliations established for the first time, and the church publishes them plainly: **Southern Baptist
Convention**, the **State Convention of Baptists in Ohio (SCBO)**, and the **Cincinnati Area Baptist
Association (CABA)** — which also settles the CABA question left open on #4357.

Atkinson is the most academically engaged pastor found in this cohort: **SBTS MDiv, ABD at Midwestern
in Biblical Studies**, a reviewer for **Themelios**, formerly a pastoral intern at **Kenwood Baptist,
Louisville**. He and Abi have **eight children** and are **licensed foster caregivers** through Clinton
County — recorded because it is a real and costly commitment on the life question, though it is a
work of mercy rather than a claim on the civil order and was **not** counted as a second public act.

\`genderStance\` and \`sexualityStance\` from the BF&M 2000. \`eschatology\`, \`theonomy\`,
\`christianNationalism\` and \`zionistStance\` left \`unknown\` — searched for and genuinely absent.`,
  },
  {
    id: 4362,
    stances: { genderStance: 'complementarian' },
    also: {
      denomination: 'Independent Baptist',
      website: 'https://marysvillecbc.com',
      zip: '43040',
      leadership: 'Lead Pastor: Matt Schiesser (since March 2020). Deacons: Phillip Barlow (chair), Bill McComas, Darrell Grove.',
      notablePeople: 'Matt Schiesser — lead pastor from March 2020. He and his wife Julie returned to their native Ohio after eighteen months in Houston, Texas, where he was an associate pastor; before that both served at a church plant, Faith Baptist Church in Circleville, Ohio.',
    },
    addSrc: ['https://marysvillecbc.com/leadership', 'https://marysvillecbc.com/', 'https://www.instagram.com/marysville_cbc/', 'https://podcasts.apple.com/us/podcast/calvary-baptist-church-marysville-ohio/id982541081'],
    dropFlags: ['signature_only'],
    short: 'HELD at single_issue. Independent Baptist; officer list entirely male.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

**Matt Schiesser** has led the congregation since **March 2020**, arriving with his wife Julie after
eighteen months as an associate pastor in **Houston, Texas**, and before that service at a church
plant — **Faith Baptist Church, Circleville, Ohio**. The petition recorded him as "Senior Pastor";
the church's own leadership page says **Lead Pastor**, which is what is recorded here.

Denomination established: **Independent Baptist**, per FaithStreet's listing and the absence of any
convention or association claim anywhere on the church's own site. It is recorded as the best
available reading rather than a membership the church asserts.

\`genderStance\` complementarian on a published officer list that is **entirely male** — lead pastor
plus three deacons, Phillip Barlow as chair with Bill McComas and Darrell Grove.

**Read and negative.** Leadership page, home page, Instagram and the church's sermon podcast (running
since at least 2015) all read. **No position on abortion beyond the petition signature, and nothing
on the civil magistrate, eschatology, theonomy, Christian nationalism or Israel.** Searches on
Schiesser against each of the six markers return only the H.B. 370 petition itself.`,
  },
  {
    id: 4365,
    stances: { genderStance: 'complementarian' },
    also: {
      denomination: 'Non-denominational',
      website: 'https://www.mycalvarybiblechurch.org',
      address: '4747 Warren Road NE',
      zip: '44410',
      leadership: 'Pastors: Michael A. Matejka (began April 2025; BA in Biblical Studies, Moody Bible Institute) and Brandon Byler.',
      notablePeople: 'Brandon Byler — pastor; he and his wife Maddie have four children and state their aim as reaching Trumbull County. Michael A. Matejka joined in April 2025 from Moody Bible Institute.',
    },
    addSrc: ['https://www.mycalvarybiblechurch.org/', 'https://www.sermonaudio.com/broadcasters/cbcwarren/', 'https://www.facebook.com/profile.php?id=100067999411380'],
    dropFlags: ['signature_only'],
    short: 'HELD at single_issue. Non-denominational; one pastor arrived April 2025, so the record is current.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

Both names on this row are confirmed, which is unusual for this cohort. **Brandon Byler** is pastor —
he and his wife Maddie have four children and state their aim as reaching **Trumbull County** — and
**Michael A. Matejka began in April 2025**, holding a BA in Biblical Studies from **Moody Bible
Institute**. Because Matejka arrived so recently, this is one of the few rows here whose leadership
field is demonstrably current rather than merely unchallenged.

Denomination established: **non-denominational**. Address confirmed as **4747 Warren Road NE,
Cortland**. Note the SermonAudio broadcaster handle is **\`cbcwarren\`**, not a Cortland string — a
reminder that a broadcaster id is not a location and should never be used to place a church.

**This is the Calvary Bible Church that is NOT the Orrville Statement signatory.** Eric Sipe's
Calvary Bible Church is #4370 in Columbus. Two same-named Ohio churches again, and they are kept
distinct deliberately — see the note on #4370 for the identification that was run there.

**Read and negative.** Site, SermonAudio archive and Facebook page read. **Nothing on abortion beyond
the petition signature, and nothing on the civil magistrate, eschatology, theonomy, Christian
nationalism or Israel.** Searches on both Matejka and Byler against each of the six markers return
only the H.B. 370 petition. \`genderStance\` complementarian on a male-only pastorate; the church
publishes no statement on the question.`,
  },
  {
    id: 4360,
    stances: {},
    also: {
      website: 'https://myquestchurch.com',
      address: '6933 Hendrickson Road',
      zip: '45044',
      phone: '(513) 422-1922',
      leadership: 'Lead Pastor: Ken Henderson (since January 2010) — a church planter and church-growth strategist with more than twenty years of pastoral leadership.',
    },
    addSrc: ['https://myquestchurch.com/', 'https://www.facebook.com/qcmiddletown/', 'https://www.instagram.com/myquestchurch/'],
    dropFlags: ['signature_only'],
    short: 'HELD at single_issue. A seeker-oriented church that publishes no doctrine.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

**Ken Henderson** has been lead pastor since **January 2010**, describing himself as a church planter
and church-growth strategist with more than twenty years in pastoral leadership. Address confirmed:
**6933 Hendrickson Road, Middletown, Ohio 45044.**

**The church publishes almost no doctrine, and that is the finding.** It presents itself as "a casual
place" with "serious faith," and its stated mission is to "help you know God, find freedom, discover
your purpose, and make a difference." There is **no statement of faith, no confession, no
denominational claim and no officer list** on the site; an /about path does not exist. This is a
seeker-oriented congregation whose public material is entirely invitational.

\`denomination\` therefore left **unset**, and \`genderStance\` left \`unknown\` — the church names one
pastor and says nothing about the question, and inferring complementarianism from a single male
pastor would be a guess.

**Read and negative.** Site, Facebook and Instagram read. **Nothing on abortion beyond the petition
signature, and nothing on the civil magistrate, eschatology, theonomy, Christian nationalism or
Israel.** Searches on Henderson against each of the six markers return only the End Abortion Ohio
petition — which is at least direct confirmation that the signature on this row is genuinely his.`,
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
