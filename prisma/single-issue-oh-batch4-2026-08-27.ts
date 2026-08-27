// Ohio H.B. 370 cohort, batch 4.
//
// Third and fourth instances of the petition naming a man who is not the lead pastor, a second
// wrong-church website avoided, and two EPC congregations that need the womens_ordination flag.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'single-issue-oh-batch4-2026-08-27.ts'
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
    id: 4367,
    stances: {},
    also: {
      denomination: 'Evangelical Presbyterian Church (EPC)',
      website: 'https://www.newalbanypresbyterian.org',
      leadership: 'Lead Pastor: David Milroy (since 2004). Associate Pastor: Ken Rathburn. Assistant Pastor of Care: Tanner Fixari — the man the H.B. 370 petition named. Ten ruling elders and fourteen deacons are published.',
      notablePeople: 'Tanner Fixari — Assistant Pastor of Care; came to faith through this congregation\'s ministries about twenty years ago, at fourteen.',
    },
    addSrc: ['https://www.newalbanypresbyterian.org/leadership/', 'https://newalbanypresbyterian.org/preacher/tanner-fixari/', 'https://columbus.thegospelcoalition.org/columbus-churches/church/17/new-albany-presbyterian-church', 'https://www.facebook.com/newalbanypres/'],
    dropFlags: ['signature_only'],
    addFlags: ['womens_ordination', 'verify_stance'],
    short: 'HELD at single_issue. EPC; the petition named the Assistant Pastor of Care, not the lead pastor.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

**The third row in this cohort where the petition did not name the lead pastor.** The row read
"Pastor: Tanner Fixari." Fixari is the **Assistant Pastor of Care**. The lead pastor is **David
Milroy, in post since 2004**, with **Ken Rathburn** as associate. Fixari's own story is worth keeping
— he came to faith through this congregation's ministries about twenty years ago, at fourteen — but
he is not its pastor.

Denomination established: **Evangelical Presbyterian Church**.

**Flagged \`womens_ordination\`, and with a qualification that matters.** The EPC leaves the ordination
of women to presbyteries and sessions, which is why the flag exists and why it normally records only
the *denomination's* position. **Here the congregation appears to practise it**: the published roster
of ten ruling elders and fourteen deacons includes names that read as women's. That is an inference
from names and is recorded as such rather than as a finding — the church publishes no statement on
the question, and \`genderStance\` is therefore left \`unknown\` rather than set to egalitarian.

**This is a scope question for Dustin, not one I should settle.** The directory's floor is
"complementarian at minimum." If this session's eldership does include women, the row sits below that
floor. The 2026-08-04 ruling was **mark, don't delete**, so it is marked. \`verify_stance\` is set so
the question is visibly open.

Worth noting alongside it: the congregation is listed by **The Gospel Coalition's Columbus
directory**, which is a complementarian network. The two facts sit oddly together and both are
recorded.

**Read and negative.** Leadership page, sermon archive and Facebook read. **Nothing on abortion
beyond the petition signature, and nothing on the civil magistrate, theonomy, Christian nationalism
or Israel.** A sermon series titled "Apocalypse Now (and Later)" exists but no eschatological position
can be read off a title, so \`eschatology\` stays \`unknown\`. Searches on Milroy and Fixari against each
of the six markers return nothing.

**One unresolved detail:** third-party listings give this church's address as both **5001** and
**5220 Johnstown Road**. Neither could be confirmed against the church's own site, so the address
field was left alone rather than changed to a guess.`,
  },
  {
    id: 4363,
    stances: {},
    also: {
      denomination: 'Evangelical Presbyterian Church (EPC)',
      website: 'https://hudsonpc.org',
      leadership: 'Senior Pastor: Shawn Carafa — a teaching elder in the Evangelical Presbyterian Church; came to the congregation from Indiana. Staff: Stephen Thomas (youth ministry intern), Jennie Adams (music ministry director), Nancy Bock (office administrator), Susan Buerlen (communications).',
    },
    addSrc: ['https://hudsonpc.org/', 'https://hudsonpc.org/welcome/meet-our-staff', 'https://www.facebook.com/hudsonpresbyterian/'],
    dropFlags: ['signature_only'],
    addFlags: ['womens_ordination'],
    short: 'HELD at single_issue. EPC; pastor checked against a search notice and confirmed current.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

Denomination established: **Evangelical Presbyterian Church**. **Shawn Carafa** is senior pastor, a
teaching elder in the EPC, and came to the congregation from Indiana.

**The pastor field was checked rather than assumed, and the check mattered.** Searching this church
surfaces a **CRC Network job posting for "Senior Pastor at Hudson Presbyterian Church"** and the
church's own **/pastoral-search** page — both of which would ordinarily mean a vacancy and a stale
leadership field, which this directory has been repeatedly burned by. **Reading the staff page
directly shows Carafa still in post.** The posting and search page are stale, not the pastor. Recorded
because the next pass will hit the same misleading results.

**Flagged \`womens_ordination\`** for the EPC's position, which the denomination leaves to presbyteries
and sessions. No woman is named among this congregation's officers on the staff page, so unlike
#4367 this is the denomination's position only — which is exactly what the flag was written to say.
\`genderStance\` left \`unknown\`.

**Read and negative.** Site and Facebook page read. **No position on abortion beyond the petition
signature, and nothing on the civil magistrate, eschatology, theonomy, Christian nationalism or
Israel.** Searches on Carafa against each of the six markers return nothing — and note the name
collides with a "Pastor Shawn" at Clayton Community Church, a different man.`,
  },
  {
    id: 4368,
    stances: { genderStance: 'complementarian' },
    also: {
      denomination: 'Baptist (independent; "Reformation heritage", Five Solas)',
      website: 'https://www.kingschurchfranklin.com',
      address: '632 South Main Street',
      zip: '45005',
      leadership: 'Pastor: Jake Taube — from the H.B. 370 petition only. The church publishes NO leadership page and no officer names.',
    },
    addSrc: ['https://www.kingschurchfranklin.com/', 'https://www.facebook.com/61553333964399'],
    dropFlags: ['signature_only'],
    addFlags: ['verify_stance'],
    short: 'HELD at single_issue. A second King\'s Church in Ohio was nearly recorded over this one.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

**A wrong-church website was nearly recorded, for the second time in two batches.** Searching
"King's Church Ohio" returns **kingschurchoh.com**, which is a **different congregation in Lakewood,
near Cleveland** — 15422 Detroit Avenue, lead pastor Noah Nickel, associate Matt LoPresti, prayer
director Casey Tobik, self-described non-denominational with a Board of Overseers. **That is not this
church and none of it was recorded.**

This congregation is **kingschurchfranklin.com**, at **632 South Main Street, Franklin, Ohio 45005** —
seventy miles away and doctrinally distinct. It describes itself as **Baptist with a "Reformation
heritage,"** summarised by the **Five Solas**, committed to expository preaching, and wanting to be
"a church to change, not just entertain the world." \`genderStance\` complementarian rests on that
confessional Baptist self-description and nothing more.

> **Two churches sharing a name in one state, and the decoy outranks the real one in search. That is
> now twice in this cohort, after Germantown.**

A podcast feed at \`kingschurchoh.libsyn.com\` also appears in results. **It was not attributed to this
row** — the handle matches the Lakewood church's domain, and guessing would repeat the very error
this note is about.

**The pastor name is unconfirmed and flagged.** "Jake Taube" comes from the H.B. 370 petition; the
church publishes **no leadership page and no officer names at all**, directing enquiries to an email
address and a text line. Nothing corroborates or contradicts it.

**Read and negative.** Site and Facebook page read. **Nothing on abortion beyond the signature, and
nothing on the civil magistrate, eschatology, theonomy, Christian nationalism or Israel.** Searches
on "Jake Taube" against each of the six markers return nothing.`,
  },
  {
    id: 4374,
    stances: { genderStance: 'complementarian' },
    also: {
      website: 'https://millersportcc.com',
      leadership: 'Head Pastor: Steven Alan Bush — founded the congregation in his home on 5 July 1987, ordained 1991; Otterbein University and Ohio State; BA in Business and Organizational Communications; pastored part-time while working as a production foreman and then operations manager at Licco, Inc. Associate Pastor, Worship Leader and Treasurer: Mark B. Thogmartin, PhD — with the church since its first meeting. Deacon: Carlton Timothy Meek.',
      notablePeople: 'Mark B. Thogmartin, PhD — associate pastor, and the author of "Teach a Child to Read with Children\'s Books," now in a fourth edition and winner of a 1999 Parents\' Choice Approved Seal. Published through the Family Literacy Center and the ERIC Clearinghouse, it is written particularly for homeschooling parents and has been reviewed by Creation Ministries International. BA in elementary education (University of Kentucky), MA in reading (Ohio State), PhD in Leadership (Andrews University); 30+ years as a teacher, tutor, technology coordinator and principal across private, public and charter schools.',
    },
    addSrc: ['https://millersportcc.com/our-pastor-and-leadership/', 'https://millersportcc.com/our-story/', 'https://podcasts.apple.com/us/podcast/millersport-covenant-church-sermon-podcasts/id1143593082'],
    dropFlags: ['signature_only'],
    short: 'HELD at single_issue. A denominational guess rejected; an education question raised and answered no.',
    note: `**Standard applied 2026-08-27 — ${STANDARD}. HELD at single_issue.**

**Founded 5 July 1987** in Steve and Janet Bush's home, with Mark and Donna Thogmartin and a handful
of others present. **Steven Alan Bush** is head pastor — ordained 1991, Otterbein and Ohio State, and
he pastored **part-time while working as a production foreman and then operations manager** at a
manufacturer, which is worth recording because bivocational founding pastors are thin on the ground
in this directory.

**A denominational guess was offered and is rejected.** An automated read of the leadership page
concluded the church "appears to be Evangelical Covenant Church-affiliated **based on naming**."
**That is nominal inference, which this project has ruled is not research** — the same error as
reading *Christendom* Reformed Baptist as a claim on Christendom. Nothing on the church's own site
claims any affiliation, and a congregation begun in a living room in 1987 has no presumption of one.
**\`denomination\` deliberately left unset.**

**The education question, raised and answered no.** Associate pastor **Mark B. Thogmartin, PhD** is
the author of **"Teach a Child to Read with Children's Books"** — four editions, a 1999 Parents'
Choice Approved Seal, written **particularly for homeschooling parents**, and reviewed by **Creation
Ministries International**. He holds a PhD in Leadership from Andrews University and spent 30+ years
as a teacher and **principal** across private, public and charter schools.

The 2026-07-31 ruling is that **education is movement-building** — founding a Bible institute, a
seminary or a classical Christian school counts as transformationalist action. **It is not applied
here.** Thogmartin's work is mainstream literacy pedagogy, published through the **ERIC Clearinghouse
and the Family Literacy Center**; he founded no Christian school and holds no post at the
institutional centre of classical education. Writing a reading manual that homeschoolers happen to
buy is not the same act as building the schools. **Recorded in full so the call can be reversed if
that ruling is ever read more broadly.**

\`genderStance\` complementarian on a published officer list — head pastor, associate pastor, deacon —
that is entirely male.

**Read and negative.** Leadership page, church history and sermon podcast read. **Nothing on
abortion beyond the petition signature, and nothing on the civil magistrate, eschatology, theonomy,
Christian nationalism or Israel.** Searches on both Bush and Thogmartin against each of the six
markers return only Thogmartin's literacy publications.`,
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

    if (dry) { console.log(`  [dry] #${r.id} ${c.name} — ${r.short}\n        ${JSON.stringify(r.stances || {})} flags-> ${flags.join(';') || '-'}`); continue }
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
