import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()
const find = (where: Record<string, unknown>) => prisma.church.findFirst({ where })

async function main() {
  // ================= St. David's, Hockley TX — Adam McIntosh =================
  const std = await find({ state: 'TX', name: { contains: 'David', mode: 'insensitive' }, city: { contains: 'Hockley', mode: 'insensitive' } })
  if (std) {
    await updateStances(prisma, std.id, { culturalEngagement: 'transformationalist', eschatology: 'postmill' }, {
      actor: 'research-batch12-2026-07-31.ts',
      note: 'McIntosh writes for Kuyperian Commentary — Uri Brito’s platform — including a piece on giving pastoral prayers at city council. A pastor leading invocations at city council in his pastoral capacity is participation in the civil sphere, modest but real and self-documented.',
      alsoSet: {
        stanceBasis: 'evidenced', recordFlag: null,
        leadership: 'Pastor: Adam McIntosh',
        theologicalNotes:
          'INDEPENDENTLY VERIFIED 2026-07-31 (full standard). Pastor **Adam McIntosh**. **St. David’s Reformed Church** (the directory listed it as "Saint David’s Church of Hockley") — an evangelical, liturgical and sacramental **CREC** congregation in north-west Houston, meeting at 21255 FM 2920, Hockley TX. ' +
          '\n\nHe writes for **Kuyperian Commentary** — Uri Brito’s platform (#25) — including *"Pastoral Prayers at City Council"*, on giving the opening invocation at municipal council meetings. A pastor appearing before city council in his pastoral capacity is civil-sphere participation: modest beside Apologia or Missionaries to the Preborn, but real, deliberate and self-documented. ' +
          '\n\n**Connection:** the Kuyperian Commentary contributor network is turning into a map of its own — Brito founded it, McIntosh writes for it. Worth treating as a discovery axis alongside the postmill directories.' +
          '\n\nNo abortion, theonomy or Christian-nationalism statement located; those markers left unknown.',
        sourceUrls: 'https://saintdavids.church/;https://www.kuyperian.com/p/pastoral-prayers-at-city-council;https://www.facebook.com/saintdavidshouston/;https://postmillennialworldview.com/postmill-churches/',
        researchNote: '2026-07-31: full standard. Kuyperian Commentary contributor; gives pastoral invocations at city council.',
      },
    })
    console.log(`#${std.id} St. David's Hockley (McIntosh) — VERIFIED`)
  }

  // ================= Christ the Redeemer, Pella IA — Michael Shover =================
  const ctr = await find({ state: 'IA', city: { contains: 'Pella', mode: 'insensitive' }, name: { contains: 'Christ the Redeemer', mode: 'insensitive' } })
  if (ctr) {
    await updateStances(prisma, ctr.id, {
      culturalEngagement: 'transformationalist', christianNationalism: 'sympathetic', eschatology: 'postmill',
    }, {
      actor: 'research-batch12-2026-07-31.ts',
      note: 'Shover preached that the First Amendment is an idol to be cleared away — a claim about the American constitutional order made from the pulpit. It went national, drew a defence from Doug Wilson and coverage from American Reformer and Julie Roys. Preaching on the ordering of the polity is civil-sphere engagement by definition.',
      alsoSet: {
        stanceBasis: 'evidenced', recordFlag: null,
        leadership: 'Pastor: Michael Shover',
        theologicalNotes:
          'INDEPENDENTLY VERIFIED 2026-07-31 (full standard). Pastor **Michael Shover**, here since May 2018; B.S. Cairn University, M.Div. Reformed Episcopal Seminary. **CREC**. ' +
          '\n\nHe preached that **the First Amendment is an idol that needs to be cleared away**. A 30-second clip circulated nationally and drew coverage from **American Reformer** ("The Anatomy of a Cancellation Attempt") and **Julie Roys** ("Is the First Amendment Idolatrous?"), with **Doug Wilson** defending him by noting the manuscript distinguished the original First Amendment from later "bowdlerized versions". ' +
          '\n\nWhatever the merits of the dispute, preaching on **the right ordering of the American polity** is civil-sphere engagement by definition — this is a pulpit addressing the constitutional order, not private opinion. `christianNationalism` set to **sympathetic** rather than affirm: the claim concerns constitutional interpretation and no explicit CN profession was located.',
        sourceUrls: 'https://redeemerpella.org/pastor/;https://redeemerpella.org/leadership/;https://americanreformer.org/2024/03/the-anatomy-of-a-cancellation-attempt/;https://julieroys.com/opinion-is-the-first-amendment-idolatrous/;https://postmillennialworldview.com/postmill-churches/',
        researchNote: '2026-07-31: full standard. Preached the First Amendment as idol; national coverage; Wilson defended him.',
      },
    })
    console.log(`#${ctr.id} Christ the Redeemer Pella (Shover) — VERIFIED`)
  }

  // ================= Covenant Reformed, Sacramento CA — SEVENTH attribution failure =================
  const crs = await find({ state: 'CA', city: { contains: 'Sacramento', mode: 'insensitive' }, name: { contains: 'Covenant Reformed', mode: 'insensitive' } })
  if (crs) {
    await prisma.church.update({
      where: { id: crs.id },
      data: {
        leadership: null,
        recordFlag: [...new Set([...(crs.recordFlag || '').split(';').filter(Boolean), 'verify_stance', 'denom_verify'])].join(';'),
        theologicalNotes: (crs.theologicalNotes || '') +
          '\n\nFULL STANDARD APPLIED 2026-07-31 — **NOT PROMOTED. SEVENTH ATTRIBUTION FAILURE, AND THE WORST.** The postmillennialworldview.com directory credits **Jim West** as pastor. West served **1986–2013** — he left the pastorate thirteen years ago — and **died in 2023**. ' +
          '\n\nHe was ordained in the OPC in 1973, took his B.D. and M.Div. at Westminster, and wrote *Drinking with Calvin and Luther*, *Christian Courtship Versus the Dating Game* and *The Covenant Baptism of Infants*. The congregation is **RCUS** (Reformed Church in the United States) and is named **Covenant Reformed Church**, not "Covenant Reformed Presbyterian" as listed; it recently marked its 50th anniversary. ' +
          '\n\nSo the row carries a wrong denomination, a wrong name and a pastor dead three years. Its current leadership is unidentified. Left `mixed` + `verify_stance` + `denom_verify`; nothing here should be relied on until someone reads the church directly.',
        researchNote: '2026-07-31: attribution failure — Jim West left in 2013 and died in 2023. Church is RCUS "Covenant Reformed Church". Current pastor unknown.',
        lastResearchedAt: new Date(),
      },
    })
    console.log(`#${crs.id} Covenant Reformed Sacramento — NOT promoted, Jim West d.2023`)
  }

  // ================= Evangelical Reformed, Tacoma WA — Rich Hamlin: not promoted =================
  const erc = await find({ state: 'WA', city: { contains: 'Tacoma', mode: 'insensitive' }, name: { contains: 'Evangelical Reformed', mode: 'insensitive' } })
  if (erc) {
    await prisma.church.update({
      where: { id: erc.id },
      data: {
        leadership: 'Founding Pastor: Rich Hamlin',
        recordFlag: [...new Set([...(erc.recordFlag || '').split(';').filter(Boolean), 'verify_stance'])].join(';'),
        theologicalNotes: (erc.theologicalNotes || '') +
          '\n\nFULL STANDARD APPLIED 2026-07-31 — **NOT PROMOTED.** **Rich Hamlin** founded the congregation in **1997**; BAE from Pacific Lutheran, MA in Pastoral Ministry from Trinity Theological Seminary. He writes a weekly blog and publishes sermons at **solideogloria.org**, runs a YouTube channel (@ERC-Tacoma), and wrote *Prepare to Meet Your God* on the prophet Amos. ' +
          '\n\nHe is a publishing, public-facing pastor — but searching him against every marker returned **nothing** on theonomy, abortion, Christian nationalism or the civil sphere. The output located is expository and devotional. Classification rests on the third-party postmill listing alone. Left `mixed` + `verify_stance`; the blog archive at solideogloria.org is the obvious next place to look.',
        researchNote: '2026-07-31: full standard — expository/devotional output only, nothing civil-sphere. Not promoted; blog archive unread.',
        lastResearchedAt: new Date(),
      },
    })
    console.log(`#${erc.id} Evangelical Reformed Tacoma (Hamlin) — NOT promoted`)
  }

  const e = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist', stanceBasis: 'evidenced' } })
  console.log(`\nevidenced: ${e}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
