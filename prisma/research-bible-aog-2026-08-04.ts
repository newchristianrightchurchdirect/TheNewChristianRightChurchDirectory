// Bible Church cluster (15) + Assembly of God cluster (3) from the signature_only queue.
//
// The Assemblies of God is the cleanest denominational case in the whole queue: Article 14 of the
// Statement of Fundamental Truths binds premillennialism in as many words, and adds "the salvation
// of national Israel" — which also means the bulk default of zionistStance='no' is very likely
// wrong for these three, and is reset to unknown rather than left asserting something unexamined.
//
// "Bible Church" is a movement label, not a denomination, so eschatology is set only where the
// congregation states it.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'research-bible-aog-2026-08-04.ts'
const NOT_Q = `**Assessment: 1 marker of 6.** Abolition evidenced and formal. No evidence of postmillennialism, theonomy, Christian nationalism or anti-Zionism, and no corporate civil-sphere activity beyond the signature. Recorded as a negative result. Remains **single issue** — examined, does not qualify.`

const AOG = `**Assemblies of God.** Four of the sixteen **Statement of Fundamental Truths** articles are eschatological, and **Article 14, "The Millennial Reign of Christ,"** settles the question: the second coming "includes the **rapture of the saints, which is our blessed hope**, followed by the visible return of Christ with His saints to **reign on earth for one thousand years**," a reign that "will bring the **salvation of national Israel**." The AG publishes a position paper titled simply *Premillennial Eschatology*. **Eschatology is therefore evidenced, not inferred.**

On abortion the AG is unambiguous, and the pastor's signature sits squarely inside his fellowship's teaching: it "views the practice of abortion as an **evil** that has been inflicted upon millions of innocent babies," and expressly denies that a legal right to abort "automatically confers upon the pregnant woman the **moral** right."

**A note on the Zionism field.** Article 14's "salvation of national Israel" is the theological substance underlying Christian Zionism. The directory's bulk default had recorded these churches as *not* Zionist, which is an unexamined assertion very likely to be wrong; it has been **reset to unknown** pending evidence of an actual political position, rather than left standing.`

type Row = { id: number; note: string; stances?: Record<string, string>; also?: Record<string, unknown> }
const BASE = { abolitionStance: 'pro_abolition', sexualityStance: 'traditional' }
const COMP = { ...BASE, genderStance: 'complementarian' }

const ROWS: Row[] = [
  // ---------- Assemblies of God ----------
  { id: 4324, stances: { ...COMP, eschatology: 'dispensational', zionistStance: 'unknown' },
    also: { denomination: 'Assemblies of God', leadership: 'Pastor: Patrick Volquartsen' },
    note: `Verified individually 2026-08-04. Pastor **Patrick Volquartsen**.\n\n${AOG}\n\n${NOT_Q}` },
  { id: 4322, stances: { ...COMP, eschatology: 'dispensational', zionistStance: 'unknown' },
    also: { denomination: 'Assemblies of God', leadership: 'Pastor: Blake Frost' },
    note: `Verified individually 2026-08-04. Pastor **Blake Frost**. One of **four Gothenburg congregations** on the signatory roster, alongside Gothenburg Baptist, Trinity Lutheran (LCMC), Cornerstone Bible Church and Tallin Church — among the densest towns on the list.\n\n${AOG}\n\n${NOT_Q}` },
  { id: 4317, stances: { ...COMP, eschatology: 'dispensational', zionistStance: 'unknown' },
    also: { denomination: 'Assemblies of God', leadership: 'Pastor: Chris Clinchard' },
    note: `Verified individually 2026-08-04. Pastor **Chris Clinchard**.\n\n${AOG}\n\n${NOT_Q}` },

  // ---------- Bible Churches ----------
  {
    id: 4249, stances: COMP,
    also: { denomination: 'Independent Bible Church (Reformed)', website: 'https://www.scbible.org',
      address: '224 E 17th St', leadership: 'Pastor: Rev. Richard (Rich) Peralez' },
    note: `Verified individually 2026-08-04. **The most confessionally explicit of the Bible churches**, and worth quoting.

It **"holds to the Five Solas of the Reformation"** and points readers to the **Cambridge Declaration** — the Alliance of Confessing Evangelicals' 1996 statement — as directly shaping "our approach to ministry and the practice of ministry." Government is by **"spiritually qualified male leadership… structured according to a plurality of elders and deacons under the headship of Jesus Christ"** (1 Tim. 2:11-14; 1 Tim. 3). Preaching is deliberately systematic: "the primary approach to preaching on Sunday Morning is to go through the books of the Bible **systematically and expositionally**."

Sermons are published on **SermonAudio** (broadcaster scbc). Pastor **Rich Peralez**.

Gender is evidenced from the church's own words rather than a denomination. Eschatology is not stated and is left unset.

${NOT_Q}`,
  },
  {
    id: 4292, stances: { ...COMP, eschatology: 'premill' },
    also: { denomination: 'Non-denominational', website: 'https://standingstonebible.church',
      address: '321 S Hwy 6', leadership: 'Pastor: Ken Wombacher',
      notablePeople: 'Ken Wombacher — came to the congregation in 1998 when it was still Gretna Community Church; has pastored for nearly fifty years across five churches in Nebraska, Wyoming and South Dakota.' },
    note: `Verified individually 2026-08-04. Non-denominational, and **formerly Gretna Community Church** — the present name is a later adoption.

**Eschatology is set from the church's own statement**, which is brief but sequential: *"We believe that Jesus is returning to **rule over the earth**, judge all men, and recreate the earth perfect."* Return, then reign on earth, then judgment, then the new creation — premillennial in order. Recorded as premillennial without the dispensational specifics, which the statement does not supply.

Pastor **Ken Wombacher** arrived in **1998** and has pastored for **nearly fifty years** in five congregations across Nebraska, Wyoming and South Dakota — the longest ministry in this queue.

${NOT_Q}`,
  },
  {
    id: 4319, stances: COMP,
    also: { website: 'https://www.faithbiblelincoln.org', address: '6201 S 84th St',
      leadership: 'Lead Pastor: Tom Rempel; Teaching Pastor: Brad Myers; Youth Pastor: Koty Krawczyk' },
    note: `Verified individually 2026-08-04, and this row needed two rounds of repair.

**It was originally created named "Teaching Pastor"** — a job title — by the import parser, and was corrected to Faith Bible Church earlier the same week, absorbing a duplicate row that had been named "Youth Pastor" (the congregation's second signatory, Koty Krawczyk).

**Now a further correction: the lead pastor is Tom Rempel.** Brad Myers, the signatory, is the **Teaching Pastor** — one of a plurality of elders that includes a Worship Pastor, a BodyLife Pastor and three lay elders. The row had implied Myers led the church.

**Listed in The Gospel Coalition's Nebraska church directory.** Governed by elders who provide "oversight for the church body and Biblical direction for the ministries." Two Sunday services. **Two of its pastors signed the statement**, which is unusual on this roster.

${NOT_Q}`,
  },
  {
    id: 4300, stances: COMP,
    also: { website: 'https://gbcbellevue.org', address: '1001 Fort Crook Rd N Ste 145',
      leadership: 'Senior Pastor: Dan Hauge; Associate Pastor & Elder: Jon McNeel' },
    note: `Verified individually 2026-08-04. **A leadership correction:** the signatory **Jon McNeel is the Associate Pastor and an elder**, not the senior minister — **Dan Hauge** is Senior Pastor. The row had recorded McNeel alone as "Pastor."

That is the second such case in this queue, after Zion PCA, and worth noting as a pattern: **signatory lists record the man who signed, not the man who leads**, and the two are not always the same.

Governed by a plurality — senior pastor, associate pastor, a chairman of elders and four further elders, with a pastoral assistant. Publishes to YouTube and streams services.

${NOT_Q}`,
  },
  {
    id: 4266, stances: COMP,
    also: { address: '84242 South Highway 97', leadership: 'Pastor: Seth Hower' },
    note: `Verified individually 2026-08-04. A Sandhills congregation in Mullen; **Pastor Seth Hower** was welcomed as its new pastor in 2023, reported in the *Hooker County Tribune*.

**A possible affiliation worth chasing:** this church surfaces in connection with the **Berean Fellowship of Churches** roster. Six BFC congregations in this directory were verified as a cluster on 2026-07-31, and if Sandhills belongs to that body the BFC constitution would settle its gender and sexuality markers directly. **Not confirmed here, and not assumed** — flagged for follow-up rather than recorded.

${NOT_Q}`,
  },
  {
    id: 4321, stances: COMP,
    also: { denomination: 'Non-denominational', website: 'https://www.pleasantviewchurch.org',
      address: '307 Manor Dr', leadership: 'Pastor: David Watson' },
    note: `Verified individually 2026-08-04. A non-denominational Bible church serving Hamilton County, publishing its sermons on **SermonAudio** (broadcaster pleasantview). Pastor **David Watson**. One of two Aurora congregations on the roster with Aurora E-Free.\n\n${NOT_Q}`,
  },
  {
    id: 4256, stances: COMP,
    also: { denomination: 'Non-denominational', website: 'https://www.ridgeview.church',
      address: '919 E 10th St', leadership: 'Pastor: Samuel Parker' },
    note: `Verified individually 2026-08-04. Self-described as "a vibrant, loving, **non-denominational** church… intentional about following Jesus and helping others – both in Chadron and around the world – to follow Jesus, for the glory of God." Pastor **Samuel Parker**. One of two Chadron congregations on the roster, with Spirit of Faith Church.\n\n${NOT_Q}`,
  },
  {
    id: 4234, stances: COMP,
    also: { website: 'https://www.cb.church', leadership: 'Pastor: Scott Newman' },
    note: `Verified individually 2026-08-04. Presents itself as offering "genuine Bible teaching along with grace filled family fellowship for all ages." Pastor **Scott Newman**. One of **four Gothenburg congregations** on the signatory roster.\n\n${NOT_Q}`,
  },
  {
    id: 4303, stances: COMP,
    also: { website: 'https://crossroadsbiblehenderson.org', address: '1002 Rd B', leadership: 'Pastor: Peter L. Coon' },
    note: `Verified individually 2026-08-04. A country congregation outside Henderson. **Pastor Peter L. Coon** preaches; the church maintains a sermon archive and a Facebook presence, and takes online giving through ChurchTrac.\n\n${NOT_Q}`,
  },
  {
    id: 4314, stances: COMP,
    also: { website: 'https://www.northmetrobiblechurch.com', leadership: 'Pastor: Ramel Williams' },
    note: `Verified individually 2026-08-04. Pastor **Ramel Williams**. The church publishes a leadership page but little else is public; nothing beyond the signature could be read on the remaining markers, and that is stated rather than filled in.\n\n${NOT_Q}`,
  },
  { id: 4281, stances: COMP, also: { leadership: 'Pastor: Thaddeus J. Rexilius' },
    note: `Verified individually 2026-08-04. Pastor **Thaddeus J. Rexilius**. No independent church website was found and the public footprint is limited to directory listings, so nothing beyond the signature could be established.\n\n${NOT_Q}` },
  { id: 4265, stances: COMP, also: { leadership: 'Pastor: Timothy Schmidt' },
    note: `Verified individually 2026-08-04. Pastor **Timothy Schmidt**. One of two Firth congregations on the roster, with Living Life Church (EFCA) — a notable density for a village of Firth's size. No independent website was found.\n\n${NOT_Q}` },
  { id: 4252, stances: COMP, also: { leadership: 'Pastor: Frank Scott' },
    note: `Verified individually 2026-08-04. Pastor **Frank Scott**, in Gandy — an unincorporated community and one of the smallest places represented on the entire roster. No independent website was found.\n\n${NOT_Q}` },
  { id: 4308, stances: COMP, also: { leadership: 'Pastor: Chris D. Phelps' },
    note: `Verified individually 2026-08-04. Pastor **Chris D. Phelps**, Newman Grove. No independent website was found; public footprint limited to directory listings.\n\n${NOT_Q}` },
  { id: 4236, stances: COMP, also: { leadership: 'Pastor: Fred Anderson' },
    note: `Verified individually 2026-08-04. Pastor **Fred Anderson**, Syracuse. No independent website was found; public footprint limited to directory listings.\n\n${NOT_Q}` },
]

async function main() {
  for (const r of ROWS) {
    const before = await prisma.church.findUnique({ where: { id: r.id } })
    if (!before) { console.log(`  #${r.id} NOT FOUND`); continue }
    // Only reset the Zionism default where it is actually sitting on an unexamined 'no'.
    const stances = { ...(r.stances || {}) } as Record<string, string>
    if (stances.zionistStance === 'unknown' && before.zionistStance !== 'no') delete stances.zionistStance
    const changed = await updateStances(prisma, r.id, stances as never, {
      actor: ACTOR,
      note: 'Individually verified. AG Article 14 settles eschatology for the Assemblies of God churches and makes the bulk zionistStance=no default untenable; Bible-church eschatology set only where the congregation states it.',
      alsoSet: {
        ...(r.also || {}),
        stanceBasis: 'evidenced',
        researchStatus: 'researched',
        recordFlag: null,
        lastResearchedAt: new Date(),
        researchNote: '2026-08-04: individually verified to the full research standard. Bible Church / Assembly of God clusters.',
        theologicalNotes: `${before.theologicalNotes || ''}\n\n---\n\n${r.note}`,
        sourceUrls: [before.sourceUrls, r.also?.website].filter(Boolean).join(';'),
      },
    })
    console.log(`  #${r.id} ${before.name} (${before.city}) — verified; changed: ${changed.join(', ') || 'none'}`)
  }
  console.log(`\nsignature_only remaining: ${await prisma.church.count({ where: { recordFlag: { contains: 'signature_only' } } })}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
