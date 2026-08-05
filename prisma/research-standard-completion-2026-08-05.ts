// Dustin asked whether the standard was being kept. It was not, fully — the CREC pass read mission
// pages and largely stopped there, skipping the church socials, the PASTOR's own output, and the
// pastor-name-against-each-marker searches. The standard exists precisely because a bland church
// website says nothing about what the man in the pulpit preaches: **if the pastor pushes it, the
// church counts.** Site-only reading risks false negatives, and false negatives are invisible.
//
// This pass completes the standard on the churches judged in that round.
//
// It immediately produced one promotion that site-reading had missed for a purely technical reason:
// Christ Church Denver was recorded "unreadable" because the URL needed a www. It is a qualifier.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'research-standard-completion-2026-08-05.ts'

type Row = { id: number; ce?: string; note: string; also?: Record<string, unknown> }

const ROWS: Row[] = [
  {
    id: 41, ce: 'transformationalist',
    also: { website: 'https://www.christkirkdenver.church', leadership: 'Pastor: Craig Thighe (CREC member 2024)' },
    note: `**PROMOTED TO QUALIFYING 2026-08-05 — and it had been marked unreadable for a purely technical reason.**

The earlier pass recorded this church as impossible to read. **The URL simply needed a \`www\`.** Once fetched, its "Who We Are" page is one of the plainest statements of the thesis in the directory:

> "We are evangelical and we believe in fulfilling the great commission… **We believe that Jesus is winning and the world is being renewed with Christ as King.** This is His kingdom, on earth as it is in heaven, and **we are called to build it. We do not sit idly but instead actively work towards the growth of God's kingdom here and now** with Christ as our guide. **Our work on this earth matters.**"

and on the CREC:

> "…that we might work together effectively for **the reformation of the church and the redemption of the world**."

"Jesus is winning and the world is being renewed" is **postmillennial optimism stated as a conviction**, and "we are called to build it… we do not sit idly but actively work" turns it into a mandate for present action. Self-described as "reformed, evangelical, liturgical, confessional, covenantal, presbyterian, and catholic," holding the Apostles', Nicene and Athanasian Creeds, the Definition of Chalcedon, the Belgic Confession, the Heidelberg Catechism and the Canons of Dort. Pastor **Craig Thighe**; received into the CREC in **2024**, so a young congregation.

**The lesson is recorded deliberately: an unreachable site is a fact about the fetch, not about the church.** This one was two round-trips away from being written off.`,
  },
  {
    id: 35,
    also: { recordFlag: 'denom_ambiguous' },
    note: `**Standard completed 2026-08-05 — pastor's own output searched, and a leadership discrepancy found.**

**The leadership on this row may be wrong.** It records "Pastor Todd Ruddell (stated supply Chris Moulton)", but **Rev. Todd Ruddell pastors Christ Covenant Reformed Presbyterian Church (CCRPC)**, a different RPCGA congregation — he appears in connection with Reformation Presbyterian Sheboygan as a **conference speaker** (April 2024, "The Puritans on the Doctrine of Salvation" and "The Puritans on Worship"), not as its minister. Flagged \`denom_ambiguous\` pending direct confirmation of who actually holds this pulpit.

**His public output, searched against each marker:** exclusive psalmody and the regulative principle of worship; "Antichrist in the Epistles of John"; a "The Pope is Antichrist" Reformation 500 conference; and an April 2020 piece, **"A Testimony to our Times."** The last is dated to the first weeks of the COVID closures and **may bear on the civil magistrate and the church** — it has not been read and is recorded here as an open lead rather than as evidence.

Nothing found connects him to abolition, Christian nationalism, theonomy or Zionism. **The limited-mission classification stands on the church's own published mission**, but it now rests on a completed search rather than a site read alone.`,
  },
  {
    id: 56,
    note: `**Standard completed 2026-08-05.** Pastor **Troy Greene**; the congregation was established in **2010**. Searched against each of the six markers: nothing found on abolition, theonomy, Christian nationalism, Zionism or postmillennialism from either the church or the pastor.

One connection recorded as a lead, not evidence: **The King's Chapel appears on the postmillennialworldview.com list of churches with postmillennial pastors.** That is the same third-party directory whose attributions were found stale or wrong in 7 of 8 checks, so it is noted and not acted on. **If the postmillennial attribution is correct it would be a marker, but not by itself engagement**, and the church's published mission remains evangelism and mercy in the borough.

Limited-mission classification stands.`,
  },
  {
    id: 44,
    also: { leadership: 'Pastor: Jon Herr (first full-time pastor, 2017)' },
    note: `**Standard completed 2026-08-05 — pastor researched.**

**Jon Herr** is from Lancaster, Pennsylvania, served as a deacon and **trained under the late Dr. Gregg Strawbridge** — a significant CREC figure and the force behind WordMp3 — completing his seminary degree through **Reformed Theological Seminary**. He has his own **WordMp3 speaker profile**, so recorded lectures exist and are a further avenue if this church is revisited.

Searched against each marker: nothing found on abolition, theonomy, Christian nationalism, Zionism or postmillennialism. The Strawbridge lineage places him squarely in confessional CREC paedobaptist circles, which is a theological pedigree rather than a civil-sphere commitment.

Limited-mission classification stands, now on a completed search.`,
  },
  {
    id: 63,
    also: { notablePeople: 'Jared McNabb — pastor; BA Lancaster Bible College, M.Div. Westminster Theological Seminary (Philadelphia); has worked in disability services and taught at a classical school.' },
    note: `**Standard completed 2026-08-05 — pastor researched, and one detail is worth keeping.**

**Jared McNabb** holds a BA from Lancaster Bible College and an **M.Div. from Westminster Theological Seminary, Philadelphia**. He has worked in **disability services** and **has taught at a classical school**.

The classical-school connection is noted because **classical Christian education is one of the ways this directory recognises the movement propagating itself** — training the next generation. But **teaching at one is a personal vocation, not the church acting corporately**, which is the distinction that matters here: Tri-City Covenant was promoted because the *church runs* a two-campus academy, not because a member teaches at one.

Searched against each marker: nothing found. Preaching sampled — "Practicing Prayer", "A Crash Course on Creation Week" (Genesis 1). CREC, Augustine Presbytery.

Limited-mission classification stands.`,
  },
]

async function main() {
  for (const r of ROWS) {
    const c = await prisma.church.findUnique({ where: { id: r.id } })
    if (!c) { console.log(`  #${r.id} NOT FOUND`); continue }
    const flags = (c.recordFlag || '').split(';').map(s => s.trim()).filter(Boolean)
    for (const extra of ((r.also?.recordFlag as string) || '').split(';').filter(Boolean)) {
      if (!flags.includes(extra)) flags.push(extra)
    }
    const also = { ...(r.also || {}) }; delete (also as any).recordFlag
    await updateStances(prisma, r.id, (r.ce ? { culturalEngagement: r.ce } : {}) as never, {
      actor: ACTOR,
      note: 'Research standard completed: church socials, the pastor’s own output, and the pastor’s name searched against each of the six markers — not the site alone.',
      alsoSet: {
        ...also,
        recordFlag: flags.length ? flags.join(';') : null,
        stanceBasis: 'evidenced',
        researchStatus: 'researched',
        lastResearchedAt: new Date(),
        researchNote: `2026-08-05: FULL standard applied — site, church socials, pastor's own output, pastor name searched against each marker.${r.ce ? ' Promoted on evidence.' : ' Classification unchanged.'}`,
        theologicalNotes: `${c.theologicalNotes || ''}\n\n---\n\n${r.note}`,
      },
    })
    console.log(`  #${r.id} ${c.name} (${c.city}, ${c.state}) — ${r.ce || 'standard completed, classification unchanged'}`)
  }
  const t = async (v: string) => `${v}=${await prisma.church.count({ where: { approved: true, culturalEngagement: v } })}`
  console.log(`\n${await t('transformationalist')}  ${await t('single_issue')}  ${await t('limited_mission')}  ${await t('quietist')}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
