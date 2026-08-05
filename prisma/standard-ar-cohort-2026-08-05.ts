// Applying the full standard to the Abolitionists Rising cohort — ~26 qualifying churches whose
// notes say the classification was "derived 2026-07-29 from evidence already in this record, no new
// research". They are the thinnest qualifying rows in the directory and the likeliest to be wrong
// in either direction.
//
// First batch of five. The results already run both ways, which is the point of doing it.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'standard-ar-cohort-2026-08-05.ts'
const STANDARD = 'site, church socials, the pastor’s own output, and the pastor’s name searched against each of the six markers'

type Row = { id: number; ce?: string; note: string; also?: Record<string, unknown> }

const ROWS: Row[] = [
  {
    id: 4051,
    also: {
      leadership: 'Pastor: Benje Graves',
      notablePeople: 'Benje Graves — pastor, teacher and evangelist for twenty-seven years; testified before an Idaho legislative committee on abortion-funding legislation ("God is offended by compromise") and has publicly endorsed political candidates.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. The qualifying label is CONFIRMED, and now on first-hand evidence rather than a derivation.**

This row had been marked transformationalist by inference from an Abolitionists Rising listing, with its own note admitting "no new research". The research now exists.

**Pastor Benje Graves testified before an Idaho legislative committee** during hearings on abortion-funding legislation (HB 220, on defunding abortion providers), telling the committee that **"God is offended by compromise."**

That is a pastor **in the statehouse, on the record, rejecting compromise on abortion** — which is the abolitionist position stated in the abolitionist idiom, and it is exactly the corporate civil-sphere action this directory classifies on. He has also **publicly endorsed political candidates**, and has been "a Pastor, Teacher, and Evangelist for the past twenty-seven years."

Sermons are published on **SermonAudio** (broadcaster \`vcc\`). **Basis upgraded from derived to evidenced.**`,
    },
  {
    id: 4059,
    also: { leadership: 'Pastor: Robert Scott', address: '1725 Waskey Road' },
    note: `**Standard applied 2026-08-05** — ${STANDARD}.

Pastor **Robert Scott**; a Southern Baptist congregation in Dillingham that "seeks to glorify God in worship, lifestyles, and service to His Kingdom." **Listed in both the Founders Ministries church search and The Gospel Coalition's directory**, and it publishes a sermon podcast (libsyn).

**Searched against each of the six markers: no first-hand evidence found** — no statement, campaign or public action by this church or pastor on abortion or any other marker. **The qualifying label still rests on the Abolitionists Rising listing alone**, which is third-party.

Left qualifying but **flagged \`verify_stance\`, and the gap is stated**: the Founders and TGC listings corroborate a confessional Reformed-leaning identity, not civil-sphere engagement. Next route: the sermon podcast.`,
    also_flag: true,
  } as any,
  {
    id: 4055,
    also: { leadership: 'Senior Pastor: Johnny McCoy', address: '609 E. 5th Ave' },
    note: `**Standard applied 2026-08-05** — ${STANDARD}.

Senior Pastor **Johnny McCoy**; SBC, listed in the **SBC churches directory** and the **Founders Ministries** church search, with an active YouTube channel and Facebook page.

**Searched against each of the six markers: no first-hand evidence found.** The qualifying label rests on the Abolitionists Rising listing alone. Left qualifying but **flagged \`verify_stance\`** with the gap stated. Next route: the YouTube sermon archive.`,
  },
  {
    id: 4048,
    also: { leadership: 'Pastor: Joe', address: '76 Lewis Mill Rd' },
    note: `**Standard applied 2026-08-05** — ${STANDARD}. One affiliation found that is worth more than the rest of the record.

**Hope Fellowship is listed on Church and Family Life** (churchandfamilylife.com) — **Scott Brown's family-integrated church network**, the same network that surfaced on **Grace Life Church of Dallas**, whose pastor turned out to speak at an abolitionist conference alongside the president of the Foundation to Abolish Abortion.

The pastor is given only as **"Joe"**, raised in Gatesville and running a local business since 1999; no surname could be established, so **the pastor-level half of the standard is incomplete here** and that is stated rather than hidden.

**Searched against each marker on what is known: nothing found first-hand.** Left qualifying, **flagged \`verify_stance\`**. The NCFIC listing is a live lead: that network correlates with the patriarchy marker and, on today's evidence, with abolitionist connections.`,
  },
  {
    id: 4044, ce: 'unknown',
    also: { leadership: 'Pastor: Justin (surname not established)' },
    note: `**DEMOTED 2026-08-05 after applying the standard** — ${STANDARD}.

This row was marked transformationalist by inference from an Abolitionists Rising listing, its own note conceding "no new research". **The research has now been done and it does not support the label.**

Missio Dei publishes **three core focuses**, and all three are ecclesial: "**growing closer to Jesus together as a church, preaching the Bible faithfully as often as we gather, and loving and serving our local community.**" It maintains an active podcast (Buzzsprout and Apple), Instagram and Facebook — a substantial public output — and **nothing across any of it touches abortion, the civil order, or any of the six markers.**

The pastor is given only as **"Justin"**; no surname could be established, so the pastor-level half of the standard is incomplete, and **this row should be revisited if that changes** — today's two false negatives both turned on the pastor, not the church.

**Reclassified as unresearched rather than limited_mission**, precisely because the pastor could not be searched: the honest statement is that this church has not been established either way, not that it holds a limited view of the church's mission.`,
  },
]

async function main() {
  const FLAG_VERIFY = new Set([4059, 4055, 4048])
  for (const r of ROWS) {
    const c = await prisma.church.findUnique({ where: { id: r.id } })
    if (!c) { console.log(`  #${r.id} NOT FOUND`); continue }
    const flags = (c.recordFlag || '').split(';').map(s => s.trim()).filter(Boolean)
    if (FLAG_VERIFY.has(r.id) && !flags.includes('verify_stance')) flags.push('verify_stance')
    const also = { ...(r.also || {}) }
    await updateStances(prisma, r.id, (r.ce ? { culturalEngagement: r.ce } : {}) as never, {
      actor: ACTOR,
      note: `Full research standard applied to an Abolitionists Rising cohort row that had been derived without research.`,
      alsoSet: {
        ...also,
        recordFlag: flags.length ? flags.join(';') : null,
        stanceBasis: r.id === 4051 ? 'evidenced' : c.stanceBasis,
        researchStatus: 'researched',
        lastResearchedAt: new Date(),
        researchNote: `2026-08-05: FULL standard applied — ${STANDARD}. ${r.id === 4051 ? 'CONFIRMED on first-hand evidence (legislative testimony).' : r.ce ? 'Label NOT supported; demoted.' : 'No first-hand evidence found; left qualifying but flagged.'}`,
        theologicalNotes: `${c.theologicalNotes || ''}\n\n---\n\n${r.note}`,
      },
    })
    console.log(`  #${r.id} ${c.name} (${c.city}, ${c.state}) — ${r.id === 4051 ? 'CONFIRMED (evidence found)' : r.ce ? 'DEMOTED' : 'flagged, gap stated'}`)
  }
  const t = async (v: string) => `${v}=${await prisma.church.count({ where: { approved: true, culturalEngagement: v } })}`
  console.log(`\n${await t('transformationalist')}  ${await t('single_issue')}  ${await t('limited_mission')}  ${await t('unknown')}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
