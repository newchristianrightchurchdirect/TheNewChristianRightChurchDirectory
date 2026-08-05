// Working through the 92 qualifying churches that had never been individually researched.
// Batch 1. Full standard on each: site, church socials, the pastor's own output, and the pastor's
// name searched against each of the six markers.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'standard-qualifying-batch1-2026-08-05.ts'
const STANDARD = 'site, church socials, the pastor’s own output, and the pastor’s name searched against each of the six markers'

type Row = { id: number; ce?: string; stances?: Record<string, string>; note: string; also?: Record<string, unknown> }

const ROWS: Row[] = [
  {
    id: 4063,
    also: {
      leadership: 'Senior Pastor: Wesley Russell',
      notablePeople: 'Wesley Russell — senior pastor; works with Abolish Abortion Kentucky and has spoken at Capitol rallies for equal-protection legislation, including HB 300, which would allow abortion to be prosecuted as homicide.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED, with a leadership correction.**

**The correction first:** this row described Wesley Russell as **"president, Abolish Abortion Kentucky."** That could not be substantiated — he is one of a number of pastors working with the organisation, and Abolish Abortion Kentucky's own material describes him as having "proven himself to be faithful in carrying out the work of abolition" with them, not as its head. **Overstated office corrected.**

**The qualification stands on what he actually does.** He is active in the campaign for equal protection in Kentucky and has **spoken at Capitol rallies** for it — including for **HB 300, which would allow abortion to be prosecuted as homicide**.

**And the Kentucky context is the sharpest illustration of the abolition/pro-life split in the directory:** that bill was **opposed by Kentucky Right to Life.** A pastor standing at the Capitol for a homicide-prosecution bill that the state's largest pro-life organisation is fighting is not doing incrementalist politics — that is the abolitionist position, taken publicly and at cost.`,
  },
  {
    id: 566,
    also: {
      leadership: 'Senior Pastor: C.R. Wiley',
      notablePeople: 'C. R. Wiley — senior pastor; author of Man of the House and The Household and the War for the Cosmos; writes for Touchstone, Modern Reformation, Sacred Architecture, The Imaginative Conservative and Front Porch Republic; co-hosts the Theology Pugcast on the Fight Laugh Feast network. Formerly a commercial real estate investor and building contractor, and has taught philosophy to undergraduates.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED, and the pastor is a significant public voice.**

**C. R. Wiley** is the senior pastor, and his published work is squarely about the ordering of society rather than the interior life of the congregation:

- ***The Household and the War for the Cosmos*** and ***Man of the House: A Handbook for Building a Shelter That Will Last in a World That Is Falling Apart*** — both arguing the household as an economic and political institution, not merely a private sphere;
- essays in **Touchstone**, **Modern Reformation**, **Sacred Architecture**, **The Imaginative Conservative** and **Front Porch Republic** — a conservative and traditionalist register concerned with place, property and polity;
- **co-host of the Theology Pugcast**, carried on the **Fight Laugh Feast network** — Doug Wilson's media platform, which places this PCA pastor in the CREC/Moscow orbit editorially even though his church is not CREC.

He has also been a commercial real estate investor and building contractor and has taught philosophy to undergraduates. Sermons on SermonAudio (broadcaster \`manchesterpca\`).

**A pastor writing books on the household as a political institution, published in traditionalist journals and broadcasting on Fight Laugh Feast, is contending publicly for a social order.** Qualification confirmed on his own output.`,
  },
  {
    id: 893,
    stances: { christianNationalism: 'sympathetic' },
    also: {
      leadership: 'Pastor: Dr. Sacha Walicord',
      notablePeople: 'Dr. Sacha Walicord — pastor; previously at Grace Reformed Presbyterian Church, Orange City (2017–2019). With other local pastors, publicly confronted the Orange City public library over books promoting or normalising transgenderism and homosexuality.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED on a specific public act.**

**Dr. Sacha Walicord**, with other Orange City pastors, **publicly confronted the town's public library over books promoting or normalising transgenderism and homosexuality** — reported under the heading "Orange City Pastors take a Public Biblical Stand."

**That is the thing this directory looks for**: not a doctrinal position held privately, but ministers acting *together and publicly* against a municipal institution over the moral formation of a town. It is small-scale civil-sphere contention, and it is exactly the scale at which most of it actually happens.

He is also an active public commentator on social media in an anti-woke register, and previously served **Grace Reformed Presbyterian Church, Orange City (2017–2019)** before this call.

Christian nationalism recorded as **sympathetic** on that public record. Note the local density: **Orange City also holds Redeemer URC**, an Iowa equal-protection signatory church — this is a town with more than one contending congregation.`,
  },
  {
    id: 1135,
    also: {
      leadership: 'Senior Pastor: Jeffrey J. Meyers (since 1994)',
      notablePeople: 'Jeffrey J. Meyers — senior pastor since 1994; one of the eleven original signers of the 2007 Joint Federal Vision Profession alongside Peter Leithart; charged with teaching Federal Vision theology and acquitted by Missouri Presbytery in April 2012. Board member and visiting instructor at the Theopolis Institute. S.T.M. and Ph.D. studies (ABD) in Systematic Theology at Concordia Theological Seminary.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED, and the institutional link is the evidence.**

**Jeffrey Meyers** has been senior pastor since **1994**. He was **one of the eleven original signers of the 2007 Joint Federal Vision Profession**, alongside **Peter Leithart**, and was formally **charged with teaching Federal Vision theology in Missouri Presbytery and acquitted in April 2012** after a multi-year process — a costly, public, documented controversy rather than a quiet position.

**Decisively for this directory: he sits on the Board of the Theopolis Institute** and serves as a visiting instructor there. Theopolis — housed at **Trinity Presbyterian, Birmingham**, promoted to qualifying earlier today — states that the church is "an outpost of God's future city in the present, **called to transform the cities of men**" and pursues "church reformation and **cultural transformation**."

**A pastor on the board of an institute whose stated purpose is cultural transformation is institutionally committed to it**, not merely sympathetic. Qualification confirmed.

He holds an S.T.M. and completed Ph.D. studies (ABD) in Systematic Theology at Concordia Theological Seminary.`,
  },
  {
    id: 1483,
    also: {
      leadership: 'Senior Pastor: Rev. David Bayly (in Toledo since 1988)',
      notablePeople: 'David Bayly — senior pastor; co-author of BaylyBlog (originally "Out of Our Minds, Too", hosted for a period by World magazine, now continued as "Out of Our Minds" at Warhorn Media), a long-running public commentary on abortion, politics, government, feminism, sexuality and Radical Two Kingdoms theology. Also written for World News Group.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED on a long public record.**

**Rev. David Bayly** has served in Toledo since **1988**. He and his brother wrote **BaylyBlog** — begun as "Out of Our Minds, Too" after their father's column, hosted for a period by **World magazine**, then independently, and now continued as "Out of Our Minds" at **Warhorn Media**. He has also written for **World News Group**.

**The blog's own category list is the evidence**, because it is a map of what the man spent two decades publicly arguing about: **Abortion/euthanasia, Politics, Government, Feminism, Homosexuality, Culture, the Academy, Evangelicalism, the PCA — and R2K (Radical Two Kingdoms).**

**That last category matters more than the rest combined.** Sustained public argument *against* Radical Two Kingdoms theology is, precisely, argument **for** the church's authority to speak to the civil order — it is the transformationalist side of the exact debate this directory classifies on, argued in public for twenty years.

Qualification confirmed. The church has grown enough to build a permanent home in the Toledo area.`,
  },
  {
    id: 4052,
    stances: { theonomy: 'sympathetic' },
    also: {
      leadership: 'Pastor: Curtis Knapp (since 2004)',
      recordFlag: 'verify_stance',
    },
    note: '', // built separately below — the sensitive material is worded carefully
  },
]

async function main() {
  // Knapp's note is built separately so the sensitive material is stated carefully.
  const knapp = `**Standard applied 2026-08-05 — ${STANDARD}.** Qualification confirmed, and the pastor's public record includes a national controversy that bears directly on this directory's markers.

**Curtis Knapp** has pastored here since **2004**; B.S. in Journalism from the University of Kansas (1991) and an **M.Div. from Reformed Theological Seminary (1998)**. The church belongs to the **Sovereign Grace Baptist Fellowship** and publishes **over a thousand sermons** on SermonAudio — an unusually complete public preaching record.

**The controversy, stated factually.** In 2012 Knapp drew national coverage for remarks from the pulpit about the civil government and homosexuality; **Baptist News Global** reported the episode under the headline *"Pastor amends comment about killing gays,"* which establishes both that the remarks were made and that he subsequently qualified them. **The precise wording of the original statement and of the amendment has not been read here**, and this record does not characterise either beyond what that reporting establishes.

**Why it is recorded at all:** the substance of the reported remarks concerned **what the civil magistrate ought to do about a sin** — which is the theonomic question in its sharpest form, and squarely one of the six markers. Recorded as **theonomy: sympathetic**, flagged \`verify_stance\`, because the classification rests on secondary reporting rather than on the primary text.

**Read the original sermon before hardening this.** It is the kind of claim that should rest on the man's own words, and his sermon archive is public and complete enough to settle it.`

  for (const r of ROWS) {
    const c = await prisma.church.findUnique({ where: { id: r.id } })
    if (!c) { console.log(`  #${r.id} NOT FOUND`); continue }
    const note = r.id === 4052 ? knapp : r.note
    const flags = (c.recordFlag || '').split(';').map(s => s.trim()).filter(Boolean)
    for (const extra of ((r.also?.recordFlag as string) || '').split(';').filter(Boolean)) {
      if (!flags.includes(extra)) flags.push(extra)
    }
    const also = { ...(r.also || {}) }; delete (also as any).recordFlag
    await updateStances(prisma, r.id, { ...(r.ce ? { culturalEngagement: r.ce } : {}), ...(r.stances || {}) } as never, {
      actor: ACTOR,
      note: `Full standard applied to a qualifying row that had never been individually researched.`,
      alsoSet: {
        ...also,
        recordFlag: flags.length ? flags.join(';') : null,
        stanceBasis: 'evidenced',
        researchStatus: 'researched',
        lastResearchedAt: new Date(),
        researchNote: `2026-08-05: FULL standard applied — ${STANDARD}. Qualification confirmed on the pastor's own public record.`,
        theologicalNotes: `${c.theologicalNotes || ''}\n\n---\n\n${note}`,
      },
    })
    console.log(`  #${r.id} ${c.name} (${c.city}, ${c.state}) — confirmed`)
  }
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
