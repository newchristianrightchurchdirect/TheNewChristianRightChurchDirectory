import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const find = (where: Record<string, unknown>) => prisma.church.findFirst({ where })

async function main() {
  // ================= Branch of Hope OPC, Torrance CA — Paul Viggiano =================
  const boh = await find({ state: 'CA', name: { contains: 'Branch of Hope', mode: 'insensitive' } })
  if (boh) {
    await updateStances(prisma, boh.id, {
      culturalEngagement: 'transformationalist', eschatology: 'postmill', theonomy: 'sympathetic',
    }, {
      actor: 'research-batch11-2026-07-31.ts',
      note: 'Viggiano studied at Bahnsen Theological Seminary, founded by Greg Bahnsen, theonomy’s principal theologian, and publicly DEBATED the postmillennial position against Thomas Ice — so the eschatology is his own argued position, not a third-party attribution. Writes on abortion, stem-cell research, euthanasia and cloning; connected to the Chalcedon Foundation.',
      alsoSet: {
        stanceBasis: 'evidenced', recordFlag: null,
        leadership: 'Pastor: Paul M. Viggiano',
        notablePeople: 'Paul M. Viggiano — pastor since 1990; studied at Bahnsen Theological Seminary; debated Thomas Ice on eschatology.',
        theologicalNotes:
          'INDEPENDENTLY VERIFIED 2026-07-31 (full standard). Pastor **Paul M. Viggiano**, here since 1990. The congregation began as a Foursquare mission, became non-denominational, and was **received into the OPC in July 2003** after Viggiano and the elders worked through G. I. Williamson’s commentary on the Westminster Confession. ' +
          '\n\nHe holds a Master’s in Apologetics from Biola and studied at **Bahnsen Theological Seminary** — founded by **Greg Bahnsen**, theonomy’s principal theologian — alongside Talbot, King’s College, Westminster and Fuller. ' +
          '\n\n**He publicly debated the postmillennial position against Dr. Thomas Ice**, so the eschatology here is his own argued conviction rather than a directory’s attribution — a materially stronger basis than most rows carry. He writes on abortion, stem-cell research, euthanasia and cloning, and his work appears alongside the **Chalcedon Foundation**. ' +
          '\n\nNo equal-protection/criminalisation statement located, so abolitionStance is left unknown despite the bioethics writing.',
        sourceUrls: 'https://www.branchofhope.org/churchleadership;https://www.sermonaudio.com/broadcasters/branchofhope/;https://en.wikipedia.org/wiki/Paul_M._Viggiano;https://opc.org/today.html?history_id=478;https://postmillennialworldview.com/postmill-churches/',
        researchNote: '2026-07-31: full standard. Bahnsen Theological Seminary; publicly debated postmillennialism vs Thomas Ice; writes on bioethics.',
      },
    })
    console.log(`#${boh.id} Branch of Hope (Viggiano) — VERIFIED`)
  }

  // ================= Reformation Hope Church, Brookfield WI — Wayne Sedlak =================
  const rh = await find({ state: 'WI', name: { contains: 'Reformation Hope', mode: 'insensitive' } })
  if (rh) {
    await updateStances(prisma, rh.id, {
      culturalEngagement: 'transformationalist', eschatology: 'postmill', theonomy: 'sympathetic',
    }, {
      actor: 'research-batch11-2026-07-31.ts',
      note: 'The church states its own purpose as applying the Christian worldview "across the landscape of culture" — arts, sciences, mathematics, law, education, economics and governments. Its ministries include radio, the pro-life movement, and networks organising churches into "active involvement in the decisions of our nation", the largest being the Parent Information Network. Corporate cultural and political action stated by the congregation itself.',
      alsoSet: {
        stanceBasis: 'evidenced', recordFlag: null,
        leadership: 'Pastor: Rev. Dr. Wayne C. Sedlak',
        theologicalNotes:
          'INDEPENDENTLY VERIFIED 2026-07-31 (full standard). Pastor **Rev. Dr. Wayne C. Sedlak**, whose ministry here spans **35 years**. Cum Laude, Reformed Episcopal Seminary, Philadelphia. ' +
          '\n\n**The church states the transformationalist position in its own words.** It is named for a belief in "God’s ordering of history into eras of reformation: a return to a culture that delivers Christ’s Gospel and the themes of **His law** to all areas including the **arts, sciences, mathematics, law, education, economics, and governments**", and describes its people as "committed to applying the Christian worldview across the landscape of culture". That is the category defined, by the congregation, without inference. ' +
          '\n\nIts ministries have included radio programmes, **the pro-life movement**, and **networks uniting churches into active involvement in the decisions of the nation** — the largest being the **Parent Information Network (PIN)**. The church "has actively promoted saving the lives of the unborn throughout the Milwaukee region". Organising other churches into civil action is corporate engagement of the strongest kind. ' +
          '\n\n**Connection:** this is the Milwaukee area, where **Matthew Trewhella’s Missionaries to the Preborn** (#4220) also operates. Two congregations organising pro-life action in the same metro is worth mapping — added to the deep-dive queue.',
        sourceUrls: 'https://reformedpresbyterianmilwaukee.wordpress.com/about-our-church-2/;https://reformedpresbyterianmilwaukee.wordpress.com/pastor-profile/;https://visionviewpoint.com/;https://postmillennialworldview.com/postmill-churches/',
        researchNote: '2026-07-31: full standard. Church states applied-worldview purpose itself; organised the Parent Information Network; pro-life action across Milwaukee.',
      },
    })
    console.log(`#${rh.id} Reformation Hope (Sedlak) — VERIFIED`)
  }

  // ================= Christ Church Lakeland FL — Steven Wedgeworth: SIXTH attribution problem =================
  const ccl = await find({ state: 'FL', city: { contains: 'Lakeland', mode: 'insensitive' }, name: { contains: 'Christ Church', mode: 'insensitive' } })
  if (ccl) {
    await prisma.church.update({
      where: { id: ccl.id },
      data: {
        recordFlag: [...new Set([...(ccl.recordFlag || '').split(';').filter(Boolean), 'verify_stance'])].join(';'),
        theologicalNotes: (ccl.theologicalNotes || '') +
          '\n\nFULL STANDARD APPLIED 2026-07-31 — **NOT PROMOTED, ATTRIBUTION DOUBTFUL ON TWO COUNTS.** The postmillennialworldview.com directory credits **Steven Wedgeworth** here. ' +
          '\n\n**First, he appears to have moved:** current sources consistently identify Wedgeworth as **rector of Christ Church Anglican, South Bend, Indiana**. He remains listed as an author on christchurchlakeland.com, but that is not the same as being its pastor. ' +
          '\n\n**Second, the postmillennial attribution itself is doubtful.** Wedgeworth is a founding board member of the **Davenant Institute** and writes for The Gospel Coalition, Desiring God, CBMW and Mere Orthodoxy — a magisterial-Protestant, deliberately moderate orbit rather than the Moscow one. His Ad Fontes essay is titled *"The Success of the Great Commission: **Probing a Postmillennial Presupposition**"*, which reads as interrogating postmillennialism rather than professing it. ' +
          '\n\nSo this row rests on a pastor who may have left, credited with an eschatology he may not hold. Left `mixed` + `verify_stance`; the current pastor needs establishing before any classification. ' +
          '\n\n**Sixth attribution problem in that source** — and the first where the *doctrine* claim, not just the leadership, looks wrong.',
        researchNote: '2026-07-31: full standard — Wedgeworth is now rector in South Bend IN, and his own writing questions postmillennialism. Attribution doubtful on both counts. Not promoted.',
        lastResearchedAt: new Date(),
      },
    })
    console.log(`#${ccl.id} Christ Church Lakeland — NOT promoted, attribution doubtful`)
  }

  // ================= LA Reformed Presbyterian — Nathan Eshelman: not promoted =================
  const larp = await find({ state: 'CA', name: { contains: 'Los Angeles Reformed Presbyterian', mode: 'insensitive' } })
  if (larp) {
    await prisma.church.update({
      where: { id: larp.id },
      data: {
        leadership: 'Pastor: Nathan Eshelman',
        recordFlag: [...new Set([...(larp.recordFlag || '').split(';').filter(Boolean), 'verify_stance'])].join(';'),
        theologicalNotes: (larp.theologicalNotes || '') +
          '\n\nFULL STANDARD APPLIED 2026-07-31 — **NOT PROMOTED.** Pastor **Nathan Eshelman**, RPCNA; M.Div. and Th.M. from Puritan Reformed, doctorate from Reformed Presbyterian Theological Seminary, Pittsburgh. Co-hosts **The Jerusalem Chamber** podcast (a paragraph-by-paragraph walk through the Westminster Confession), writes for **Gentle Reformation** and Meet the Puritans, and authored *I Have a Confession* (Crown & Covenant). Active on X as @pastoreshelman. ' +
          '\n\nHe is a genuinely public and prolific pastor — but the output located is **confessional and historical rather than civil-sphere**. Searching him against abortion, Christian nationalism, theonomy, postmillennialism and patriarchy returned nothing specific. ' +
          '\n\nWorth noting the **RPCNA Covenanter tradition itself** holds to Christ’s mediatorial kingship over the nations and has a history of national covenanting, which is transformationalist in principle. That is a denominational argument, though, not evidence about this congregation, and this directory does not classify by denomination. Left `mixed` + `verify_stance`.',
          researchNote: '2026-07-31: full standard — prolific but confessional/historical output; nothing civil-sphere specific. Not promoted.',
        lastResearchedAt: new Date(),
      },
    })
    console.log(`#${larp.id} LA Reformed Presbyterian (Eshelman) — NOT promoted`)
  }

  const e = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist', stanceBasis: 'evidenced' } })
  console.log(`\nevidenced: ${e}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
