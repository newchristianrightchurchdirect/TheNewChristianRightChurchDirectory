import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

async function main() {
  // ================= #2470 Ekklesia Muskogee, OK — Brett Baggett =================
  await updateStances(prisma, 2470, { culturalEngagement: 'transformationalist', abolitionStance: 'pro_abolition' }, {
    actor: 'research-batch15-2026-07-31.ts',
    note: 'Baggett is president of Rescue Those, speaks at Abolition Day "demanding the immediate abolition of abortion", wrote an open letter to an Oklahoma senator supporting SB13, appears in Foundation to Abolish Abortion leadership, and the church publishes its own Abortion Ministry series. He explicitly distinguishes abolition from the pro-life movement and calls on governing authorities to establish equal justice — the equal-protection position stated outright.',
    alsoSet: {
      stanceBasis: 'evidenced', recordFlag: null,
      leadership: 'Pastor: Brett Anthony Baggett',
      notablePeople: 'Brett Anthony Baggett — president of Rescue Those; Foundation to Abolish Abortion leadership; Abolition Day speaker; runs the Shepherd School at this church.',
      theologicalNotes:
        'INDEPENDENTLY VERIFIED 2026-07-31 (full standard). Pastor **Brett Anthony Baggett**. 1689 Reformed Baptist, planted 2011. ' +
        '\n\nHe is **president of Rescue Those** (rescuethose.com), which exists "to equip the saints as they rescue their preborn neighbors carried off to death", and appears in the leadership of the **Foundation to Abolish Abortion**. He speaks at **Abolition Day**, "demanding the immediate abolition of abortion", and wrote a public **open letter to an Oklahoma state senator supporting SB13** — abolition legislation. ' +
        '\n\n**He states the abolitionist position precisely**, distinguishing abolition from what is commonly called the pro-life movement and calling on governing authorities to **establish equal justice** for the preborn. That is the equal-protection test this directory uses, met explicitly. ' +
        '\n\nThe congregation carries this corporately: it publishes its own **Abortion Ministry** teaching series, hosted the **Rescue Those Conference**, and runs a **Shepherd School**. Institution, not just pastor.',
      sourceUrls: 'https://rescuethose.com/;https://faa.life/leadership;https://subsplash.com/ekklesiamuskogee/media/ms/+5ncqdw5;https://www.muskogeepolitico.com/2020/02/muskogee-pastors-open-letter-to-senator.html',
      researchNote: '2026-07-31: full standard. President of Rescue Those; FAA leadership; open letter for SB13; church runs an Abortion Ministry series and Shepherd School.',
    },
  })
  console.log('#2470 Ekklesia Muskogee (Baggett) — VERIFIED')

  // ================= #212 Bethel Baptist, Owasso OK — Bill Ascol =================
  await updateStances(prisma, 212, { culturalEngagement: 'transformationalist', abolitionStance: 'pro_abolition' }, {
    actor: 'research-batch15-2026-07-31.ts',
    note: 'Ascol co-authored and was the floor advocate for the 2021 SBC resolution calling for the "immediate abolition of abortion without exception or compromise" — the strongest such language in SBC history, which the Convention’s own Committee on Resolutions had declined to bring forward. He is chairman of the board of Founders Ministries and brother of its president Tom Ascol.',
    alsoSet: {
      stanceBasis: 'evidenced', recordFlag: null,
      leadership: 'Senior Pastor: Bill (William) Ascol',
      notablePeople: 'Bill Ascol — co-author and floor advocate of the 2021 Southern Baptist Convention resolution calling for the immediate abolition of abortion without exception or compromise; chairman of the board of Founders Ministries; brother of Tom Ascol.',
      theologicalNotes:
        'INDEPENDENTLY VERIFIED 2026-07-31 (full standard). Senior pastor **Bill (William) Ascol**. Reformed Baptist / SBC, 1689. ' +
        '\n\n**He co-authored the 2021 Southern Baptist Convention resolution calling for the "immediate abolition of abortion without exception or compromise"** — adopted by messengers in Nashville on 16 June 2021, and described in reporting as the most strident language ever used in an SBC resolution on abortion. The Convention’s **own Committee on Resolutions had declined to bring it forward**; Ascol was the front man from the floor, speaking most often and answering messengers’ questions until it passed. ' +
        '\n\nThat is a pastor moving the official position of the largest Protestant body in the United States to the abolitionist position — corporate action at denominational scale. He is **chairman of the board of Founders Ministries**, whose president **Tom Ascol** is his brother. ' +
        '\n\n**Connection:** this resolution is the same fault line documented on #3 Apologia (Jeff Durbin) — abolition versus incrementalism, and the SBC’s ERLC on the other side of it. Ascol carried the argument inside the SBC while Durbin pressed it through state legislatures.',
      sourceUrls: 'https://baptistnews.com/article/sbc-calls-for-immediate-abolition-of-abortion-without-exception-or-compromise/;https://thefederalist.com/2021/06/24/how-abortion-abolition-became-southern-baptists-official-stance/;https://founders.org/;https://www.faithwire.com/2021/06/24/southern-baptist-convention-calls-for-immediate-abolition-of-abortion-without-exception-or-compromise/',
      researchNote: '2026-07-31: full standard. Co-author and floor advocate of the 2021 SBC abolition resolution; Founders board chairman.',
    },
  })
  console.log('#212 Bethel Baptist Owasso (Ascol) — VERIFIED')

  // ================= #3910 Providence Reformed, Des Moines — claim NOT confirmable =================
  const pr = await prisma.church.findUnique({ where: { id: 3910 } })
  if (pr) {
    await prisma.church.update({
      where: { id: 3910 },
      data: {
        recordFlag: [...new Set([...(pr.recordFlag || '').split(';').filter(Boolean), 'verify_stance'])].join(';'),
        theologicalNotes: (pr.theologicalNotes || '') +
          '\n\nFULL STANDARD APPLIED 2026-07-31 — **NOT PROMOTED; THE KEY CLAIM COULD NOT BE CONFIRMED.** This record states that Pastor **Jody (J. James) Lucero** signed the Iowa pastors’ equal-protection-of-the-preborn letter. Searching for that letter and his signature returned **nothing** — his pastorate here is well attested (SermonAudio broadcaster `providencerc`, providencerc.org leadership page) but the equal-protection signature is not. ' +
          '\n\nThe `abolitionStance = pro_abolition` on this row therefore rests on an unverified claim. Left flagged rather than promoted, and flagged rather than reversed — absence of a search result is not disproof, and the letter may simply not be indexed. **Whoever picks this up should look for the letter itself.**',
        researchNote: '2026-07-31: full standard — could NOT confirm the equal-protection signature the row asserts. Not promoted; claim needs the primary document.',
        lastResearchedAt: new Date(),
      },
    })
    console.log('#3910 Providence Reformed Des Moines — claim unconfirmed, flagged')
  }

  const e = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist', stanceBasis: 'evidenced' } })
  console.log(`\nevidenced: ${e}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
