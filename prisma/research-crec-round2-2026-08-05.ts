// The ten churches whose sites defeated the first fetcher. Dustin asked whether there was another
// way to check them — there was, and it mattered:
//
//   * several "empty" pages were just JS that had not finished; waiting for network idle fixed them
//   * two sites are dead and were read from the WAYBACK MACHINE instead
//   * http/https variants recovered one more
//
// Nine of the ten are now readable. That is worth stating plainly because the first pass would have
// left them as permanent unknowns on a purely technical failure.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'research-crec-round2-2026-08-05.ts'

const LIMITED_TAIL = `\n\n**On what this category claims:** it records that the congregation's **published mission is limited to worship, teaching, fellowship and mercy**, and that no claim on the civil order was found in it. It is **not** a finding that the church positively opposes such engagement.`

type Row = { id: number; ce: 'transformationalist' | 'limited_mission' | null; note: string; also?: Record<string, unknown> }

const ROWS: Row[] = [
  {
    id: 30, ce: 'transformationalist',
    also: { leadership: 'Pastor Harold Guptill; Associate Pastor John A. Correia' },
    note: `**PROMOTED TO QUALIFYING 2026-08-05 — on an institution, not a statement.**

Tri-City Covenant **operates Tri-City Christian Academy, across two campuses**, and names it among the ministries by which it "serves the community." Its stated aim is "**the whole Good News for the whole person for our whole community**."

**A church running a two-campus Christian academy is acting corporately in a sphere beyond the sanctuary**, and doing it institutionally and permanently rather than by resolution or signature. It is also the form of engagement this directory has already ruled counts: **founding and running schools trains the next generation**, which is how a movement is actually propagated rather than merely asserted.

Founded **1972** and has now celebrated **50 years**; a CREC congregation in Somersworth serving the New Hampshire Tri-City area. Pastor Harold Guptill with Associate Pastor John A. Correia.

Recorded as qualifying on the school and the "whole community" formulation together. Note what is *not* claimed: nothing was found on law, politics or magistracy, so this church ranks on engagement rather than on the six markers.`,
  },
  {
    id: 27, ce: null,
    also: { recordFlag: 'verify_stance' },
    note: `Read 2026-08-05 (the site needed a patient fetch; the first attempt returned a navigation error). **A strong lead, and the closest call in this cohort.**

Christ the King's language is transformationalist in shape:

> "Through worship, **God forms His Church for renewing the world**."
> "We aim to disciple our children and prepare them to **advance the Kingdom of Christ**."
> "We want to be united in serving our community, Christian fellowship, and **standing for God's truth**."

That is the liturgical route to cultural change — the same logic Theopolis states at Trinity Presbyterian, Birmingham, which was promoted. **The difference is that Trinity has an institute doing the work and this church has the sentence.** "Renewing the world" is an aim; nothing published names a public question the congregation has taken up, and its distinctives otherwise are Psalm-singing, liturgical formation and cross-denominational cooperation.

Held as a lead rather than promoted. **Read the preaching before deciding** — this one could go either way, and the language is closer to qualifying than anything else left in this group. Pastors Rev. Michael Hansen and Rev. Caleb Levi; ruling elder Steve Roderer.`,
  },
  { id: 49, ce: 'limited_mission', note: `Read 2026-08-05. **Published mission is ecclesial.** Christ Reformed "loves Biblical liturgical worship, seeks genuine community, focuses on discipleship, and looks to partner with other Biblical Churches in Central Maine," holding "that families should worship God together, where even little children praise Him together with their families in the sanctuary." Founded over twenty years ago; a fellowship meal on the first Lord's Day of each month.\n\nIts one extended quotation is on worship form — "Style equals form, and form matters… the way we pray and how we worship is inexorably related to who we are" — from *The Lord's Service: The Grace of Covenant Renewal Worship*. Serious, deliberate, and entirely about the congregation's own worship.${LIMITED_TAIL}` },
  { id: 52, ce: 'limited_mission', also: { recordFlag: 'website_removed' }, note: `Read 2026-08-05 — **the live site no longer resolves; this was read from the Wayback Machine** (2024 capture), and the row is flagged accordingly.\n\nImmanuel Presbyterian is "a community of faith, seeking to be **transformed** through worship and service in the kingdom of Jesus Christ," aiming at "being a **light for Christ in our community** that the Kingdom of God might grow." Worship is "centered around the Word, robust singing, and prayer culminating in a communion meal."\n\nThe transformation named is of the congregation, and the growth named is the Kingdom's — neither is a claim on the civil order. Preaching by Wesley Presnall and Sammie Hargrave through Genesis and Micah.${LIMITED_TAIL}` },
  { id: 4085, ce: 'limited_mission', note: `Read 2026-08-05. **Published mission is ecclesial, and emphatically so.** "The saints at Christ the King Presbyterian Church believe **worship is the central activity of our lives**," following "the covenant renewal pattern found in Scripture" — Call to Worship, Confession of Sin, Consecration, Communion, and Commission. "Our **first aim** is to strive to delight in the worship of the Triune God, not to entertain ourselves."\n\nA church that names worship as the central activity of life and its first aim, and describes nothing else, is not making a claim on the civil order. Pastor Jeff Swanson, Shelby MI.${LIMITED_TAIL}` },
  { id: 32, ce: 'limited_mission', also: { recordFlag: 'website_removed' }, note: `Read 2026-08-05 — **the live site no longer resolves; read from the Wayback Machine**, and flagged accordingly.\n\nGrace Life Church "exist[s] to glorify God by the **faithful proclamation of the Gospel**," meeting Sundays at 12:30 for "worship in song, preaching the word and partaking of the Lord's Supper," followed by "meals, prayer time, additional classes." Pastor Phil George since 2015.\n\nA single-clause mission statement, and the clause is proclamation.${LIMITED_TAIL}` },
  { id: 105, ce: 'limited_mission', note: `Read 2026-08-05, and **the name is the most misleading in the directory**. *Christendom* Reformed Baptist Church makes no claim on Christendom: it "hold[s] to the 1689 2nd London Baptist Confession of Faith, and believe[s] that the Word of God is central to all that we do," and describes its worship as reading, singing, prayer, preaching, the Lord's Supper weekly and baptism. Its closing text is the Great Commission.\n\n**A worked example of why denominational and nominal inference fails.** The word "Christendom" over a door is not evidence of a doctrine of the civil order, any more than CREC membership was. Pastor Mark Hall, Sioux City.${LIMITED_TAIL}` },
  { id: 4040, ce: 'limited_mission', note: `Read 2026-08-05. Woodlawn Baptist organises itself as **Word-Driven, Gospel-Centered and disciple-making** — "everything we do to be driven by the Word of God," the gospel as "what fuels our life," and Matthew 28 worked out through Sunday School, Life Groups and Discipleship Groups.\n\nIts outward work is real and worth recording: a **weekly after-school Bible club at Woodlawn Elementary**, VBS, Upward, Middle School Mania, and a **church plant in Vernon**. That is genuine corporate community presence — but it is evangelism and children's ministry, not contention over the civil order, and the two should not be blurred. Lead Pastor Dr. Lewis (SWBTS PhD).${LIMITED_TAIL}` },
]

// #41 Christ Church Denver and #4047 Broadview Baptist stayed effectively unreadable — each
// returned a single line — so neither is judged. They keep culturalEngagement = 'unknown'.
const STILL_UNREAD: Array<[number, string]> = [
  [41, 'Christ Church Denver — the site renders only "Weekly Lord\'s Day Covenant Renewal Worship Service" and nothing else; no about, mission or beliefs text could be extracted by any route tried, including the Wayback Machine.'],
  [4047, 'Broadview Baptist, Lubbock — the site returns one truncated sentence and no readable mission text by any route tried.'],
]

async function main() {
  for (const r of ROWS) {
    const c = await prisma.church.findUnique({ where: { id: r.id } })
    if (!c) { console.log(`  #${r.id} NOT FOUND`); continue }
    const flags = (c.recordFlag || '').split(';').map(s => s.trim()).filter(Boolean)
      .filter(f => r.ce === 'limited_mission' ? f !== 'verify_stance' : true)
    for (const extra of ((r.also?.recordFlag as string) || '').split(';').filter(Boolean)) {
      if (!flags.includes(extra)) flags.push(extra)
    }
    const also = { ...(r.also || {}) }; delete (also as any).recordFlag
    await updateStances(prisma, r.id, (r.ce ? { culturalEngagement: r.ce } : {}) as never, {
      actor: ACTOR,
      note: 'Read to the standard on a second, more patient pass (network-idle wait, http/https retry, Wayback fallback).',
      alsoSet: {
        ...also,
        recordFlag: flags.length ? flags.join(';') : null,
        stanceBasis: 'evidenced',
        researchStatus: 'researched',
        lastResearchedAt: new Date(),
        researchNote: `2026-08-05 (round 2): read individually. Verdict: ${r.ce || 'lead — not promoted'}.`,
        theologicalNotes: `${c.theologicalNotes || ''}\n\n---\n\n${r.note}`,
      },
    })
    console.log(`  #${r.id} ${c.name} (${c.city}, ${c.state}) — ${r.ce || 'LEAD'}`)
  }

  for (const [id, why] of STILL_UNREAD) {
    const c = await prisma.church.findUnique({ where: { id } })
    if (!c) continue
    await prisma.church.update({
      where: { id },
      data: {
        theologicalNotes: `${c.theologicalNotes || ''}\n\n---\n\n**STILL UNREAD after a second attempt, 2026-08-05.** ${why}\n\n**Not judged either way.** The record says the church has not been read, which is the truth; it does not say the church fails. Next routes to try: its Facebook page, its sermon archive or YouTube channel, and the CREC's own congregational directory.`,
      },
    })
    console.log(`  #${id} ${c.name} — still unread, recorded as such`)
  }

  const t = async (v: string) => `${v}=${await prisma.church.count({ where: { approved: true, culturalEngagement: v } })}`
  console.log(`\n${await t('transformationalist')}  ${await t('single_issue')}  ${await t('limited_mission')}  ${await t('quietist')}  ${await t('unknown')}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
