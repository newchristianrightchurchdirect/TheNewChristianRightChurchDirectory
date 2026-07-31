import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

async function main() {
  // ---- Apologia Church, Tempe/Mesa AZ (#3) — Jeff Durbin ----
  await updateStances(prisma, 3, {
    culturalEngagement: 'transformationalist',
    abolitionStance: 'pro_abolition',
    christianNationalism: 'affirm',
    eschatology: 'postmill',
  }, {
    actor: 'research-batch5-2026-07-30.ts',
    note: 'End Abortion Now is an outreach ministry OF Apologia Church — the institution itself, not a parachurch alongside it. It exists to criminalise abortion nationwide through local churches and state legislation, and Durbin has helped draft equal-protection bills in Alabama and Louisiana. That is the equal-protection/criminalisation test this directory uses to separate abolitionism from pro-life ministry, met explicitly.',
    alsoSet: {
      stanceBasis: 'evidenced', recordFlag: null,
      leadership: 'Teaching Elder: Jeff Durbin',
      notablePeople: 'Jeff Durbin \u2014 head of End Abortion Now, host of Apologia Radio; among the most prominent figures in the abortion abolition movement nationally.',
      theologicalNotes:
        'INDEPENDENTLY VERIFIED 2026-07-30. Teaching elder **Jeff Durbin**. **End Abortion Now is an outreach ministry _of Apologia Church_** \u2014 the congregation itself runs it, which is corporate action in the strictest sense this directory uses. Its stated purpose is to **criminalise abortion nationwide through local churches and state legislation**, and it equips churches worldwide to minister at abortion facilities. ' +
        'Durbin has **helped draft equal-protection bills in Alabama and Louisiana**. Equal protection \u2014 abortion prosecuted as homicide, no exception for the mother \u2014 is precisely the position that distinguishes abolitionism from incrementalism, and it is why mainstream pro-life organisations and the SBC\u2019s ERLC have publicly rejected the movement. He has testified before state legislators on it. ' +
        'This is the clearest abolition case in the directory: the church, not merely the pastor, is the vehicle.',
      sourceUrls: 'https://apologiachurch.com/;https://endabortionnow.com/jeff-durbin/;https://apologiachurch.com/meet-the-team/;https://1819news.com/news/item/what-makes-human-beings-valuable-pastor-jeff-durbin-discusses-moral-implications-of-equal-protection-laws-ivf;https://postmillennialworldview.com/postmill-churches/',
      researchNote: '2026-07-30: independently verified. End Abortion Now is a ministry of this church; Durbin drafts equal-protection legislation.',
    },
  })
  console.log('#3 Apologia Church (Durbin) — VERIFIED, evidenced')

  // ---- Immanuel Baptist Church, Tucumcari NM — Gordan Runyan ----
  const imm = await prisma.church.findFirst({
    where: { state: 'NM', city: { contains: 'Tucumcari', mode: 'insensitive' }, name: { contains: 'Immanuel', mode: 'insensitive' } },
  })
  if (imm) {
    await updateStances(prisma, imm.id, {
      culturalEngagement: 'transformationalist',
      theonomy: 'theonomic',
      christianNationalism: 'sympathetic',
      eschatology: 'postmill',
    }, {
      actor: 'research-batch5-2026-07-30.ts',
      note: 'Gordan Runyan wrote "Resistance to Tyrants: Romans 13 and the Christian Duty to Oppose Wicked Rulers" and has argued in print that 1689 Reformed Baptist confessionalism is compatible with theonomy. Hosts The Ragtown Pulpit. Theonomy is explicit and defended, not inferred.',
      alsoSet: {
        stanceBasis: 'evidenced', recordFlag: null,
        leadership: 'Pastor: Gordan Runyan',
        notablePeople: 'Gordan Runyan \u2014 author of *Resistance to Tyrants: Romans 13 and the Christian Duty to Oppose Wicked Rulers* and of published work defending theonomy from a 1689 Reformed Baptist position; hosts The Ragtown Pulpit.',
        theologicalNotes:
          'INDEPENDENTLY VERIFIED 2026-07-30. Pastor **Gordan Runyan** \u2014 Reformed Baptist, Navy veteran of the nuclear submarine fleet, self-described "Paleo-Patriot". ' +
          'He wrote **_Resistance to Tyrants: Romans 13 and the Christian Duty to Oppose Wicked Rulers_**, and has published a direct defence of **theonomy from within 1689 Reformed Baptist confessionalism**, answering the charge that the two are inconsistent. Also wrote *Bramble Government: A Ragtown Pulpit Sermon Against Executive Power*. Hosts **The Ragtown Pulpit** podcast. Tucumcari hosted a theonomy-themed Freedom Conference in 2016. ' +
          '**Connection:** his Romans 13 resistance argument sits in the same tradition as Matthew Trewhella\u2019s *Doctrine of the Lesser Magistrates* \u2014 see the deep-dive queue; that doctrine looks like a network axis rather than an isolated position. ' +
          'No abortion position located; abolitionStance left unknown.',
        sourceUrls: 'https://www.goodreads.com/author/show/7461100.Gordan_E_Runyan;https://archive.org/details/strsbaptist;https://podpoint.com/immanuel-baptist-tucumcari;https://postmillennialworldview.com/postmill-churches/',
        researchNote: '2026-07-30: independently verified. Published theonomist and author of Resistance to Tyrants.',
      },
    })
    console.log(`#${imm.id} Immanuel Baptist (Runyan) — VERIFIED, evidenced`)
  }

  const e = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist', stanceBasis: 'evidenced' } })
  console.log(`\nevidenced now: ${e}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
