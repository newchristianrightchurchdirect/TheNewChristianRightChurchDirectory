// Batch 11 of the 92.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'standard-qualifying-batch11-2026-08-05.ts'
const STANDARD = 'site, church socials, the pastor’s own output, and the pastor’s name searched against each of the six markers'

const ROWS: Array<{ id: number; note: string; stances?: Record<string, string>; also?: Record<string, unknown> }> = [
  {
    id: 212,
    also: {
      leadership: 'Senior Pastor: Bill (William) Ascol',
      notablePeople: 'Bill Ascol — senior pastor; submitted the 2021 SBC resolution "On Abolishing Abortion" and moved it to the floor after the Committee on Resolutions declined to bring it. Messengers voted it onto the floor by a two-thirds majority on 15 June 2021 and adopted it on 16 June. By his own account it was the first time the Committee on Resolutions had been overridden since he began attending SBC annual meetings in 1979.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED, and the detail is better than the record showed.**

**Bill Ascol** did not merely support the 2021 SBC resolution "On Abolishing Abortion" — he **submitted it, and then moved it onto the floor after the Committee on Resolutions declined to bring it forward.** Messengers carried that motion by a **two-thirds vote on 15 June 2021** and **adopted the resolution on 16 June**, calling for "abolishing abortion immediately, without exception or compromise."

**Two facts make this the single most consequential act in the directory's abolition record:**

1. It was, in the Biblical Recorder's assessment, **the strictest anti-abortion statement Southern Baptist messengers had adopted in nearly fifty years**.
2. By Ascol's own account, **it was the first time the Committee on Resolutions had been overridden in this way since he began attending SBC annual meetings in 1979** — a forty-two-year precedent broken from the floor.

**With Threet, Van Bebber and Stidd — three of the resolution's nine co-authors, all pastoring churches on this list — the directory now holds the men who wrote it and the man who forced it through.** Confirmed without qualification.`,
  },
  {
    id: 19,
    stances: { theonomy: 'theonomic' },
    also: {
      leadership: 'Senior Pastor: Dr. Phillip G. Kayser (ordained 1987)',
      notablePeople: 'Phillip G. Kayser — senior pastor; Ph.D. from Whitefield Theological Seminary and its Professor of Ethics; President of Biblical Blueprints and of the Providential History Festival. Author of The Divine Right of Resistance and Is the Death Penalty Just?, among works on theonomy described by reviewers as "probably the best book on theonomy" for brevity and clarity.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED, and theonomy upgraded to theonomic.**

**Dr. Phillip G. Kayser**, ordained **1987**, holds a **Ph.D. from Whitefield Theological Seminary** and serves as its **Professor of Ethics** — he teaches the discipline in which theonomy is argued. He is:

- **President of Biblical Blueprints**, which exists to help ministries "recapture Biblical patterns of training, leadership development, and **cultural renewal**";
- **President of the Providential History Festival**;
- author of ***The Divine Right of Resistance*** and ***Is the Death Penalty Just?***, with his work on theonomy described by reviewers as "**probably the best book on theonomy**" for its brevity and clarity.

**Theonomy set to theonomic rather than sympathetic.** A professor of ethics who has written the standard short treatment of the position is a principal in it, not a sympathiser. He is also, separately, already on record here as a **signatory of the 2024 Nebraska pastors' equal-protection statement**. Confirmed.`,
  },
  {
    id: 20,
    also: {
      leadership: 'Pastor: Dale Partridge (since 2023)',
      notablePeople: 'Dale Partridge — pastor; President of Relearn.org, a digital ministry for biblical and theological literacy, and Founder of Reformation Seminary. An author and evangelist with a Graduate Certificate from Western Seminary.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED on institution-founding.**

**Dale Partridge** is **President of Relearn.org**, a digital ministry built around biblical and theological literacy, and — the detail that matters most — **Founder of Reformation Seminary**.

**That is the third seminary founded by a pastor on this list**, after Jeffrey Johnson's **Grace Bible Theological Seminary** (Conway AR) and the **Institute for Theonomic Reformation** at Appomattox. **Founding institutions that train ministers is the most durable form of the engagement this directory classifies on** — it outlives the founder and reproduces the position.

He is a published author and evangelist with a Graduate Certificate from Western Seminary, and preaches a podcast sermon series from this pulpit. Confirmed.`,
  },
  {
    id: 3257,
    also: {
      recordFlag: 'verify_stance;pastor_vacant',
      leadership: 'Pastor: NOT CURRENT — Nathan Eshelman left for Orlando in 2021; present minister not established',
      notablePeople: 'Nathan Eshelman — pastored this congregation 2009–2021 before being called to the Orlando RPCNA congregation. Co-host of The Jerusalem Chamber, a paragraph-by-paragraph discussion of the Westminster Confession; writes at Gentle Reformation and Evangelical Times; has appeared on Presbycast discussing the RPCNA.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. THE LEADERSHIP RECORD IS FIVE YEARS STALE.**

This row names **Nathan Eshelman** as pastor. **He pastored here from 2009 to 2021 and was called to the Orlando RPCNA congregation in 2021.** The present minister of the Los Angeles congregation could not be established from any source searched.

**This is the same failure mode found earlier in the postmillennial directory**, where seven of eight pastor attributions proved stale or wrong — and it is a reminder that a pastor field is a claim with a date on it, not a permanent fact.

**Flagged \`pastor_vacant\` and \`verify_stance\`; the leadership field now says plainly that it is not current.**

**On the substance:** Eshelman is a genuinely notable figure — co-host of **The Jerusalem Chamber**, a paragraph-by-paragraph treatment of the Westminster Confession, a writer at **Gentle Reformation** and **Evangelical Times**, and a Presbycast guest on the RPCNA. **But he is not this church's pastor**, and whatever this row was originally classified on may have left with him. Establish the current minister before relying on the classification.`,
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
    await updateStances(prisma, r.id, (r.stances || {}) as never, {
      actor: ACTOR,
      note: 'Full standard applied to a qualifying row that had never been individually researched.',
      alsoSet: {
        ...also,
        recordFlag: flags.length ? flags.join(';') : null,
        stanceBasis: 'evidenced',
        researchStatus: 'researched',
        lastResearchedAt: new Date(),
        researchNote: `2026-08-05: FULL standard applied — ${STANDARD}. ${r.id === 3257 ? 'Leadership found FIVE YEARS STALE; flagged.' : 'Qualification confirmed.'}`,
        theologicalNotes: `${c.theologicalNotes || ''}\n\n---\n\n${r.note}`,
      },
    })
    console.log(`  #${r.id} ${c.name} — ${r.id === 3257 ? 'STALE LEADERSHIP, flagged' : 'CONFIRMED'}`)
  }
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
