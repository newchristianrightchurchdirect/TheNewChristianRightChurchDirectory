// A false negative, found by completing the research standard Dustin asked about.
//
// Grace Life Church of Dallas was read on 2026-08-05 from its website alone. The site says the
// church exists "to glorify God by the faithful proclamation of the Gospel" and describes a Sunday
// service. On that basis it was classified limited_mission — examined, does not qualify.
//
// Applying the rest of the standard — the PASTOR's own name searched against each marker —
// overturns it. This is precisely the failure mode the standard exists to prevent, and it is
// recorded here rather than quietly corrected.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

async function main() {
  const c = await prisma.church.findUnique({ where: { id: 32 } })
  if (!c) { console.log('#32 not found'); return }

  await updateStances(prisma, 32, {
    culturalEngagement: 'transformationalist',
    abolitionStance: 'pro_abolition',
  }, {
    actor: 'fix-false-negative-gracelife-2026-08-05.ts',
    note: 'Pastor Phil George is a listed speaker at the Love Your Pre-born Neighbor Conference alongside the president of the Foundation to Abolish Abortion and a sitting state representative. Site-only reading had missed this entirely.',
    alsoSet: {
      stanceBasis: 'evidenced',
      researchStatus: 'researched',
      recordFlag: 'website_removed',
      lastResearchedAt: new Date(),
      leadership: 'Pastor: Phil George (since 2015)',
      notablePeople: 'Phil George — pastor since 2015; runs an accounting practice begun in 2001 and ranches; he and his wife Bobbi home-educate their ten children on family property northeast of McKinney. A listed speaker at the Love Your Pre-born Neighbor Conference.',
      researchNote: '2026-08-05: FULL standard applied and it OVERTURNED the site-only reading. Pastor speaks at an abolitionist conference; promoted from limited_mission to transformationalist and abolition set to pro_abolition.',
      theologicalNotes: `${c.theologicalNotes || ''}\n\n---\n\n**CORRECTED 2026-08-05 — this row was a FALSE NEGATIVE, and the correction is worth reading as a method note.**

Earlier the same day this church was classified **limited mission** on the strength of its website, which says only that Grace Life exists "to glorify God by the **faithful proclamation of the Gospel**" and describes a Sunday service. Nothing on that site touches the civil order.

**Completing the research standard — searching the pastor's own name against each marker — overturned it.**

**Pastor Phil George is a listed speaker at the Love Your Pre-born Neighbor Conference**, which convenes "pastors, ministry leaders, and **legislators** who will bring biblical clarity and gospel-driven urgency to the issue of unborn children." He appears on that platform alongside:

- **Bradley Pierce** — president of the **Foundation to Abolish Abortion** and of Abolish Abortion Texas, a constitutional attorney who "has drafted legislation in more than 30 states… including drafting **dozens of equal protection bills filed to abolish abortion**," and who filed a *Dobbs* brief for 21 organisations and 20 state legislators;
- **State Representative Brent Money**, Texas House District 2.

That is the abolition movement's legislative core, and this church's pastor stands on its platform. **Under this directory's standard — if the pastor pushes it, the church counts — that qualifies.** Abolition stance set to **pro_abolition (evidenced)**.

Two further details recorded from the same pass. The church is listed on the **Church and Family Life** network (Scott Brown's family-integrated churches), and Phil George **home-educates ten children** — a family-integrated posture consistent with that network. And its leadership page is headed by **Colossians 1:15-18**: "by him all things were created, in heaven and on earth, visible and invisible, **whether thrones or dominions or rulers or authorities**—all things were created through him and for him" — the comprehensive-lordship text, chosen deliberately.

**The methodological point, kept on the record because it will recur:** a church's website is the weakest of the four sources the standard requires. Grace Life's site would have left it permanently misclassified. **A bland site is not evidence of a bland church.**

*(The live site no longer resolves; the leadership page was read from an archived capture, and the row is flagged \`website_removed\`.)*`,
    },
  })
  console.log('#32 Grace Life Church of Dallas — limited_mission -> transformationalist, abolition pro_abolition')

  const t = async (v: string) => `${v}=${await prisma.church.count({ where: { approved: true, culturalEngagement: v } })}`
  console.log(`\n${await t('transformationalist')}  ${await t('single_issue')}  ${await t('limited_mission')}  ${await t('quietist')}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
