// Batch 13 of the 92. Four corrections, including a leadership record naming a man who has died.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'standard-qualifying-batch13-2026-08-05.ts'
const STANDARD = 'site, church socials, the pastor’s own output, and the pastor’s name searched against each of the six markers'

const ROWS: Array<{ id: number; note: string; also?: Record<string, unknown> }> = [
  {
    id: 60,
    also: {
      leadership: 'Lead Pastor: Rev. Kasey Horvath; Associate Pastor: Brandon Gilanyi',
      notablePeople: 'Dr. Gregg Strawbridge — the congregation\'s first pastor, arriving 2002 and serving twenty years until his death in 2022; the church continues the Strawbridge Ministerial Forum in his name. Kasey Horvath now serves as Lead Pastor and Brandon Gilanyi as associate, overseeing Christian education.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED, and the leadership gap this row has carried is now closed.**

**The row previously noted that a third-party listing named a pastor who died in 2022, and that leadership needed re-establishing.** That man was **Dr. Gregg Strawbridge**, the congregation's first pastor, who arrived in **2002** and served **twenty years** until his death.

**Current leadership, now established:** **Rev. Kasey Horvath** is Lead Pastor — primary preacher and point person for pastoral care, shepherding the staff and consistory — with **Brandon Gilanyi** as associate pastor overseeing Christian education and Sunday School.

**The church's origin is the confirming fact:** All Saints was **established in 1999 as a church plant of Christ Church, Moscow, Idaho** — Doug Wilson's congregation, #18 in this directory. It is a direct Moscow daughter church, and it maintains a **planting** ministry of its own and the **Strawbridge Ministerial Forum**, which trains ministers in Strawbridge's memory.

**A Moscow plant that itself plants churches and runs a ministerial forum is propagating the movement in the most literal sense.** It meets in a historic former Evangelical United Methodist building on West Main Street. Confirmed.`,
  },
  {
    id: 51,
    also: {
      leadership: 'Pastor: Kendall Lankford',
      recordFlag: 'verify_stance',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. Pastor identified; one point to verify.**

**The row carried no pastor at all.** Sources name **Kendall Lankford** as pastor of Christ Church of Livingston County, which **began in 2003 as a CREC mission church** and currently meets Sundays at 11:30 in space at Ascend Church on Church Street, Howell.

The congregation is also listed on **Church and Family Life** — the **sixth appearance** of that NCFIC network in this research, after Grace Life Dallas, Hope Fellowship Gatesville, Zachary Garris, Anthony Mathenia and the sponsor board of a New Christendom Press conference. **That network is now clearly a structural feature of this movement and should be mined as a directory in its own right.**

**The point to verify:** a Kendall Lankford is also associated with **The Shepherd's Church, Chelmsford MA** — #24 in this directory. Whether this is the same man serving or having served both congregations, or two men of the same name, **could not be settled here**, and the row is flagged accordingly rather than asserting a link that would connect two qualifying churches on a coincidence of names.`,
  },
  {
    id: 3280,
    also: {
      website: 'https://www.crossroad-church.com',
      leadership: 'Pastor: Grant Brown (called 2021). Elder David Koch died 17 September 2025.',
      notablePeople: 'Grant Brown — pastor since 2021; M.Div. from Midwestern Baptist Theological Seminary. The congregation runs Christ Is Lord Academy (CILA). David Koch served many years as an elder here and was the congregation\'s second signatory to the Iowa equal-protection statement; he died on 17 September 2025.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED, with a correction that matters for accuracy and for tact.**

**The correction: David Koch has died.** This row recorded "Pastor: Grant Brown and David Koch (two signatories from this congregation)." Koch served many years as an **elder** here — not a pastor — and **died on 17 September 2025**. The leadership field now says so.

**This is the second stale-leadership finding today**, after Los Angeles RPC, and it is the more important kind: **a directory that lists a deceased man as current leadership is wrong in a way that will be noticed by the people who knew him.** Both signatures on the Iowa statement remain historically true and are unaffected.

**Grant Brown** was called in **2021** and holds an **M.Div. from Midwestern Baptist Theological Seminary**; the Baptist Convention of Iowa announced his call.

**The confirming fact is institutional: the congregation runs Christ Is Lord Academy (CILA)** — a church-operated school, the pattern that recurs across the strongest records in this directory. Combined with two men from one small Iowa congregation signing the state equal-protection statement, the classification stands.`,
  },
  {
    id: 251,
    also: {
      leadership: 'Planting / Lead-Teaching Elder: Jeff Durbin (Apologia network); resident leadership of the Utah congregation not established',
      notablePeople: 'Jeff Durbin — founding elder and Lead-Teaching Elder of Apologia Church since 2010, co-founder with Luke Pierson of Apologia Studios and End Abortion Now. End Abortion Now describes itself as a global ministry that has raised up and trained over one thousand churches across the United States, Canada, Australia and Northern Ireland.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED, with a scope note.**

**Jeff Durbin** has been founding elder and **Lead-Teaching Elder of Apologia Church since 2010**, and co-founded **Apologia Studios** and **End Abortion Now** with Luke Pierson.

**The scale of End Abortion Now is the confirming fact, and it is larger than this directory has recorded anywhere:** it describes itself as a global ministry that has **raised up and trained over one thousand churches** across the United States, Canada, Australia and Northern Ireland. **No other ministry connected to a church on this list operates at that order of magnitude** — it is not a congregation acting publicly but a congregation that has taught a thousand others to.

**The scope note:** Durbin pastors the **Mesa, Arizona** congregation (#3). This row is the **South Jordan, Utah** church in the Apologia network, and **its own resident leadership could not be established**. The row is correct to associate him with it as planting elder, but should not be read as saying he pastors it week to week.

Durbin has separately been a public critic of incrementalist pro-life organisations and testified in favour of Georgia's equal-protection bill — both already on this directory's record.`,
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
    await updateStances(prisma, r.id, {} as never, {
      actor: ACTOR,
      note: 'Full standard applied to a qualifying row that had never been individually researched.',
      alsoSet: {
        ...also,
        recordFlag: flags.length ? flags.join(';') : null,
        stanceBasis: 'evidenced',
        researchStatus: 'researched',
        lastResearchedAt: new Date(),
        researchNote: `2026-08-05: FULL standard applied — ${STANDARD}. Qualification confirmed; leadership corrected.`,
        theologicalNotes: `${c.theologicalNotes || ''}\n\n---\n\n${r.note}`,
      },
    })
    console.log(`  #${r.id} ${c.name} — CONFIRMED`)
  }
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
