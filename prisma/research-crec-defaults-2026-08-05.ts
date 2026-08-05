// Reading pass over the 23 churches demoted on 2026-08-05 for qualifying on a denominational
// default. These were demoted for not having been read, not for failing, and CREC churches were
// expected to be the likeliest promotions in the directory.
//
// THE RESULT IS NOT WHAT WAS EXPECTED. Of thirteen read, TWO claim the civil sphere. Nine describe
// a purely ecclesial mission — preaching, worship, fellowship, mercy — with no public-square claim
// at all. Dustin's original instinct was right: **CREC membership does not mean a church contends
// for the civil order.** Most of these congregations say, in their own words, that they do not.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'research-crec-defaults-2026-08-05.ts'

type Row = { id: number; verdict: 'promote' | 'lead' | 'negative'; note: string; also?: Record<string, unknown> }

const ROWS: Row[] = [
  {
    id: 3245, verdict: 'promote',
    also: { leadership: 'Pastor: Jacob Hanby' },
    note: `**PROMOTED TO QUALIFYING 2026-08-05 — read and it qualifies on its own words.**

Providence Church states its hope plainly on its About page:

> "It is our hope that God would use our congregation to **promote reformation in the family, church, and state** as we proclaim and apply His Word and celebrate His sacraments."

**"…and state."** That is a congregation naming the civil order as a sphere its ministry aims at — not a member acting privately, not a signature, but the church's own statement of what it hopes to do. It is the clearest three-sphere formulation found in this cohort.

A member of **Tyndale Presbytery** in the CREC, confirmed on its own site; tagline "Ancient Faith for today"; facilities noted as wheelchair-accessible and barrier-free. Socials: facebook.com/ProvidenceCaro and instagram.com/providencechurchcaro.

**This also closes a standing deep-dive item.** "Caro MI" has been on the research queue because **Jason Garwood** — who now leads Abolish Abortion Virginia and founded the Virginia Center for Public Theology — pastored in Caro until 2017. This is that church. Its present pastor is **Jacob Hanby**, and the civil-sphere language survives Garwood's departure, which is the more interesting fact: it is the congregation's stated posture, not one minister's hobbyhorse.`,
  },
  {
    id: 38, verdict: 'promote',
    also: {
      notablePeople: 'Rich Lusk — pastor since December 2004, a leading Federal Vision writer. Peter J. Leithart — President and Director of the Theopolis Institute, which operates in conjunction with this church at 3251 Greendale Road; author on political theology including Defending Constantine and Between Babel and Beast.',
    },
    note: `**PROMOTED TO QUALIFYING 2026-08-05 — and it is among the strongest cases in the directory.**

Trinity Presbyterian **houses the Theopolis Institute**, which "operates in conjunction with Trinity Presbyterian Church, 3251 Greendale Road, Birmingham" — the same address. **Peter J. Leithart** is its President and Director; **Rich Lusk** has pastored the church since **December 2004**.

Theopolis states the thesis this directory exists to map, in terms:

> "The church is an outpost of God's future city in the present, **called to transform the cities of men**, and cultural and political crises can be addressed only as the Church becomes more fully and faithfully herself."

and describes itself as perpetuating "the Biblical Horizons agenda of **church reformation and cultural transformation**."

**This is not a church that comments on culture from outside it — it hosts an institute whose stated purpose is cultural transformation**, under a president who writes on Christendom and political theology (*Defending Constantine*, *Between Babel and Beast*). The engagement is institutional, corporate and permanent, not a statement or a signature.

Note the second clause of the Theopolis mission, because it is a real qualification and worth keeping: cultural and political crises are addressed "**only as the Church becomes more fully and faithfully herself**" — a liturgical and ecclesial route to cultural change rather than a directly political one. That is still transformationalism; it is not activism, and the record should not imply otherwise.`,
  },
  {
    id: 39, verdict: 'lead',
    note: `Read 2026-08-05. **A strong lead, deliberately not promoted.**

Christ Church Searcy organises its identity around four words — Covenant, Calling, Communion, **Commissioning** — and glosses the last as "**All of Christ for all of Searcy**." That is the same construction as Christ Church Omaha's "All of Christ for all of life" and its aim to "make Omaha a Christian town": a claim of comprehensive lordship over a *place*.

**But a four-word tagline is thinner evidence than a stated aim**, and this congregation's identity is currently in flux: it "is currently in the process of **merging with an Anglican church plant (REC)**, with the blessing of our supporting session at Four Winds Reformed Church (CREC)." Contact is given as Jay Baker, "our deacon within the REC."

So the church may shortly not be CREC at all. Recorded as a lead with the transition noted; **promote once the merger settles and the resulting congregation states its own mission.**`,
    also: { recordFlag: 'verify_stance;in_transition' },
  },
  {
    id: 50, verdict: 'lead',
    note: `Read 2026-08-05. **A lead, not a promotion.** The church's banner statement is a three-part progression: "Be a disciple. Disciple your brothers and sisters. **Disciple the nations**."

In the CREC orbit "disciple the nations" is deliberately the transformationalist reading of Matthew 28 — that nations *as nations* are to be discipled, not merely individuals within them. **But it is also simply the text of the Great Commission**, which every evangelical church affirms, and nothing else on the site develops it into a claim about the civil order. Recorded as a lead rather than treated as evidence; the distinction between the transformationalist reading and the plain citation cannot be settled from a tagline.

Pastor **Dan Nash**. Sunday School at 8:45.`,
  },

  // ---------- read, and the answer is no ----------
  { id: 56, verdict: 'negative', note: `Read 2026-08-05. **Does not claim the civil sphere.** The King's Chapel "exists to celebrate, in word and deed, the Gospel of Jesus Christ **in our neighborhood and throughout the borough**," offering "classical Christian worship that is robust, reverent, and joyful" and longing "to be a community that practices **love, service, and mercy** towards our community and the world." Pastor Troy Greene, Brooklyn.\n\nThat is evangelism and mercy ministry, described warmly and at length, with **no reference to law, politics, magistracy or the public order**. A negative result on a church whose CREC membership would have predicted otherwise.` },
  { id: 58, verdict: 'negative', note: `Read 2026-08-05. **Does not claim the civil sphere.** All Souls describes itself as "committed to the historic Christian faith as expressed in the Reformed tradition," "governed by a plurality of elders," seeking "to serve our community through **faithful preaching, meaningful worship, and genuine fellowship**." Its CREC paragraph is entirely about catholicity and confessional continuity — Apostles, Church Fathers, Reformers — and about the inerrancy, authority and sufficiency of Scripture.\n\n**Three stated means, all ecclesial.** Current series "Corinthian Christianity"; sermons on Spotify and Facebook.` },
  { id: 59, verdict: 'negative', note: `Read 2026-08-05. **Does not claim the civil sphere**, and the site is stale. Redeemer Reformed is "an evangelical and confessionally Reformed congregation that seeks to **proclaim and live out the saving grace of God in Christ**," with a paragraph on subscribing to Calvin and Luther, the Trinity, and the efficacy of the sacraments.\n\n**The most recent "Pastor's Notes" is dated July 2018** — eight years stale — so the public record here is thin as well as ecclesial. Flagged accordingly.`, also: { recordFlag: 'verify_stance;website_removed' } },
  { id: 63, verdict: 'negative', note: `Read 2026-08-05. **Borderline, resolved as negative.** Christ Church of Morgantown's banner reads "Pursuing biblical community through a **comprehensive application of God's Word to our lives**."\n\n"Comprehensive application" is Kuyperian in flavour — but the object is "**our lives**", not the civil order, and the rest of the site is about the theology of worship: "rooted first in the Scriptures and then in the patterns of historic Christian worship." CREC, Augustine Presbytery, meeting in a community centre; recent preaching is "A Crash Course on Creation Week" (Genesis 1) by Jared McNabb.\n\nComprehensive personal discipleship is not the same claim as reformation of the state, and the record should not blur them.` },
  { id: 40, verdict: 'negative', note: `Read 2026-08-05. **Does not claim the civil sphere.** Christ Church Santa Clarita is "a Traditional Protestant church affirming the essentials of the faith as outlined in the **Ecumenical Creeds**… a confessional Reformed church recognizing the **Westminster Standards**… a member church of the CREC." Senior Pastor Rev. Garrett Craw; Associate Pastor Rev. Andrew Richardson.\n\nThe self-description is creedal and confessional throughout. Recent preaching runs to marriage and children — "Kingdom Living: Marriage and Children" on Mark 10 — which is household ethics, not public-square contention. Active YouTube livestream, its own app, Facebook and X.` },
  { id: 44, verdict: 'negative', note: `Read 2026-08-05. **Does not claim the civil sphere.** The stated mission is "to be the **salt of the earth and the light of the world**, to manifest God's love, holiness, majesty and glory through true worship and Christian fellowship, and to **serve our local community** and the world around us, that God may be all in all." Pastor Jon Herr, its first full-time pastor (2017).\n\nSalt-and-light language is used across the whole evangelical spectrum and is not by itself a claim on the civil order; the means named here are worship, fellowship and service.` },
  { id: 45, verdict: 'negative', note: `Read 2026-08-05. **Borderline, resolved as negative.** Christ Church Indy describes itself as "reformed and covenantally oriented, **parishional in our growth strategy**, and desirous of maturing in Christlikeness in **every aspect of life**," under the heading "Protestant Catholicity."\n\nBoth phrases point toward a comprehensive vision — a *parish* model implies responsibility for a territory, and "every aspect of life" is Kuyperian in shape. **But the object of both is the maturing of believers**, not the ordering of the commonwealth, and nothing on the site develops either into a public-square claim. A closer read of its preaching could change this; recorded as negative on what is published.` },
  { id: 48, verdict: 'negative', note: `Read 2026-08-05. **Nothing to assess.** All Saints Reformed's public self-description is a single line — "ASR is a **mission Church** in the CREC, Communion of Reformed Evangelical Churches" — followed by a link to the CREC. There is no mission statement, no beliefs page and no pastor listed.\n\nRecorded as negative in the strict sense that no civil-sphere claim exists to find, not as a judgement that the church holds none. A mission church early in its life may simply not have written one yet.` },
  { id: 35, verdict: 'negative', note: `Read 2026-08-05. **Does not claim the civil sphere.** Reformation Presbyterian defines itself by exactly two distinctives, and states both at length: it is **Confessional** — holding the Westminster Confession with the Larger and Shorter Catechisms as "faithful summaries of what the Bible teaches" — and **Family Friendly**, meaning family-integrated worship: "As many churches in today's age seek to separate the children from their parents during worship we seek to do just the opposite… rather than ushering off our young people to a Sunday School or Children's Hour."\n\nRPCGA, Pastor Todd Ruddell. Both distinctives concern the congregation's own worship. Family-integrated worship is a marker of conservative Reformed practice but is not a claim on the civil order.` },
]

async function main() {
  for (const r of ROWS) {
    const c = await prisma.church.findUnique({ where: { id: r.id } })
    if (!c) { console.log(`  #${r.id} NOT FOUND`); continue }
    const stances = r.verdict === 'promote' ? { culturalEngagement: 'transformationalist' } : {}
    await updateStances(prisma, r.id, stances as never, {
      actor: ACTOR,
      note: r.verdict === 'promote'
        ? 'Read to the standard; the church claims the civil sphere in its own published words. Promoted on evidence.'
        : 'Read to the standard; recorded result. No promotion.',
      alsoSet: {
        ...(r.also || {}),
        stanceBasis: 'evidenced',
        researchStatus: 'researched',
        lastResearchedAt: new Date(),
        researchNote: `2026-08-05: read individually — site, mission statement, socials. Verdict: ${r.verdict}.`,
        theologicalNotes: `${c.theologicalNotes || ''}\n\n---\n\n${r.note}`,
      },
    })
    console.log(`  #${r.id} ${c.name} (${c.city}, ${c.state}) — ${r.verdict.toUpperCase()}`)
  }
  const q = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist' } })
  console.log(`\nqualifying now: ${q}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
