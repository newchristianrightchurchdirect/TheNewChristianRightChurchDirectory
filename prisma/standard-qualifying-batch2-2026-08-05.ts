// Batch 2 of the 92 unverified qualifying churches. Full standard on each.
//
// Four confirmed on strong first-hand evidence; nine found to rest on the Abolitionists Rising
// listing alone, left qualifying but flagged with the gap stated rather than left looking researched.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'standard-qualifying-batch2-2026-08-05.ts'
const STANDARD = 'site, church socials, the pastor’s own output, and the pastor’s name searched against each of the six markers'

const THIN = (extra: string) => `**Standard applied 2026-08-05** — ${STANDARD}.

${extra}

**No first-hand evidence found on any of the six markers** — no statement, campaign, testimony, resolution or public action by this church or its pastor. **The qualifying label still rests on the third-party Abolitionists Rising listing**, and its own note concedes the classification was "derived… no new research."

**Left qualifying but flagged \`verify_stance\`**, so the row does not read as researched-and-confirmed when it is not. It is not demoted, because an AR listing is a claim *about abolition alignment* — closer to the mark than the postmill directory was — but it is still someone else's assertion.`

type Row = { id: number; stances?: Record<string, string>; note: string; also?: Record<string, unknown>; flag?: boolean }

const ROWS: Row[] = [
  {
    id: 76,
    also: {
      leadership: 'Senior Pastor: Jeffrey D. Johnson',
      notablePeople: 'Jeffrey D. Johnson — founded this church in 2000 in his apartment living room; President of Grace Bible Theological Seminary, which grew out of a Wednesday evening theology class he began in 2011; founder of Free Grace Press. Dr. Owen Strachan served as GBTS Provost and Research Professor of Theology before leaving to become Senior Director of the Dobson Culture Center.',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED, and it resolves a zero-marker anomaly.**

This row hit **none of the six markers** and was one of only three qualifying churches in that position — a standing question mark. The research answers it: **the engagement here is institutional, and it is substantial.**

**Jeffrey D. Johnson** founded this church in **2000**, meeting with a few families in his apartment living room. In **2011** he began a Wednesday-evening theology class to train men within the congregation; that became **Grace Bible Institute in 2017** and is now **Grace Bible Theological Seminary**, of which he is **President**. He is also founder of **Free Grace Press**.

**A church that has produced a seminary and a publishing house is propagating a movement**, which is the criterion this directory has already applied — founding schools trains the next generation. This is that, at the highest level: not a parish school but a seminary training ministers.

**Dr. Owen Strachan** — author of *Christianity and Wokeness* — served as **Provost and Research Professor of Theology at GBTS**, arriving from Midwestern Baptist Theological Seminary and later leaving to become **Senior Director of the Dobson Culture Center**. That places a nationally prominent anti-woke voice inside this church's own institution for several years.

Qualification confirmed on institution-building rather than on the six markers, and the record now says so explicitly.`,
  },
  {
    id: 4037,
    stances: { abolitionStance: 'pro_abolition' },
    also: { leadership: 'Pastor: Russell Threet (since 2015)' },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED on a documented act.**

**Russell Threet** was **one of nine co-authors of the 2021 Southern Baptist Convention resolution "On Abolishing Abortion."**

That resolution called for "the **immediate abolition of abortion without exception or compromise**" and was, in Baptist News Global's assessment, **the most strident language ever used in an SBC resolution against abortion — so strongly worded that the Convention's own Committee on Resolutions declined to bring it forward.** It reached the floor only because Bill Ascol moved it from the floor, and it passed.

**Co-authoring that document is not sympathy with a movement; it is drafting its central American text.** Abolition set to pro_abolition (evidenced) and qualification confirmed.`,
  },
  {
    id: 4032,
    stances: { abolitionStance: 'pro_abolition' },
    also: { leadership: 'Pastor: David (Dave) Van Bebber (since 2015)' },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED on a documented act.**

**David Van Bebber** was **one of nine co-authors of the 2021 SBC resolution "On Abolishing Abortion"** — the resolution demanding "the immediate abolition of abortion without exception or compromise," which the Convention's **Committee on Resolutions declined to bring forward** because of its strength, and which passed only after being carried from the floor.

**Two churches in this directory are pastored by co-authors of that resolution** — this one and First Baptist Mena (Russell Threet) — with a third, Bethel Baptist Owasso, pastored by the man who moved it. Abolition set to pro_abolition (evidenced); qualification confirmed.`,
  },
  {
    id: 123,
    also: {
      leadership: 'Pastor: Josh Eaton',
      notablePeople: 'Josh Eaton — pastor; M.Div. from Mid-America Baptist Theological Seminary (2005). Spoke at a January 2026 Kansas Statehouse rally calling for abortion to be criminalised as murder without exceptions, and is described within the movement as "a beloved and faithful brother in the fight for the preborn."',
    },
    note: `**Standard applied 2026-08-05 — ${STANDARD}. CONFIRMED.**

**Josh Eaton** holds an M.Div. from **Mid-America Baptist Theological Seminary** (2005). The existing record — that he **spoke at a January 2026 Kansas Statehouse rally calling for abortion to be criminalised as murder with no exceptions** — is corroborated by his standing within the movement, where he is described as "a beloved and faithful brother in the fight for the preborn," and by local press quoting him on anti-abortion legislation.

**Statehouse advocacy for criminalisation without exceptions is the abolitionist position stated at the seat of civil power.** Qualification confirmed. The church maintains a full public media archive.`,
  },

  // ---- rest on the AR listing alone ----
  { id: 4046, flag: true, also: { leadership: 'Pastor: Eric Barbee (M.Div. SBTS; D.Min. TMS; ordained 2014)' },
    note: THIN('Pastor **Eric Barbee** confirmed on the church\'s leadership page; M.Div. from Southern Seminary and a D.Min. from The Master\'s Seminary. The church is connected to **Fellowship Associates**, a church-planting residency organisation.') },
  { id: 4042, flag: true, also: { leadership: 'Pastor-Teacher: Brandon Scalf' },
    note: THIN('Pastor-Teacher **Brandon Scalf** confirmed; MBTS, and a doctoral student at The Master\'s Seminary. The church publishes sermons on **SermonAudio** (broadcaster heritagechurchtulsa), which is the obvious next route.') },
  { id: 4045, flag: true, also: { leadership: 'Pastor: Joe Griffo' },
    note: THIN('Pastor **Joe Griffo**. Searches surfaced a differently-named Redeemer congregation in Tulsa rather than this one; nothing was found for this pastor against any marker.') },
  { id: 2758, flag: true, also: { leadership: 'Pastor: Dr. Bob Kerr' },
    note: THIN('**Dr. Bob Kerr** confirmed as pastor. The existing record notes the church is **Founders-affiliated** and listed by Abolitionists Rising, which is why it was classified anti-woke and pro-abolition — but both are affiliations rather than acts.') },
  { id: 4056, flag: true, also: { leadership: 'Pastor: Ryan Wade (with a plurality of elders)' },
    note: THIN('Pastor **Ryan Wade**, serving with a plurality of elders. Nothing found against any marker.') },
  { id: 4050, flag: true, also: { leadership: 'Pastor: Chris Gore (since 2008)' },
    note: THIN('Pastor **Chris Gore**, serving since 2008. Nothing found against any marker.') },
  { id: 214, flag: true, also: { denomination: 'Reformed Baptist (1689)' },
    note: THIN('**The church is far newer than the record implied: it was planted in May 2025**, sponsored by **Heritage Baptist Church, Mansfield TX**. Its pastor holds a B.A. in Pastoral Studies from Georgia Baptist College and an **M.Div. from International Reformed Baptist Seminary (IRBS)**, and has been married since 2010 with five children — but **his name is not published on the site** and could not be established.\n\nA congregation barely a year old will have little public record by definition; that is a reason to revisit rather than to conclude.') },
  { id: 2656, flag: true, note: THIN('**No pastor is named** on the church\'s site or in any directory searched, and nothing was found for the congregation itself against any marker. The pastor-level half of the standard is therefore undone, and the classification rests on the AR listing alone.') },
  { id: 3294, flag: true, note: THIN('**No pastor is named** anywhere searched, and no independent information about this congregation surfaced. As with Harvest Mission Aubrey, the pastor-level half of the standard cannot be completed until a name is found.') },
]

async function main() {
  for (const r of ROWS) {
    const c = await prisma.church.findUnique({ where: { id: r.id } })
    if (!c) { console.log(`  #${r.id} NOT FOUND`); continue }
    const flags = (c.recordFlag || '').split(';').map(s => s.trim()).filter(Boolean)
    if (r.flag && !flags.includes('verify_stance')) flags.push('verify_stance')
    await updateStances(prisma, r.id, (r.stances || {}) as never, {
      actor: ACTOR,
      note: 'Full standard applied to a qualifying row that had never been individually researched.',
      alsoSet: {
        ...(r.also || {}),
        recordFlag: flags.length ? flags.join(';') : null,
        ...(r.flag ? {} : { stanceBasis: 'evidenced' }),
        researchStatus: 'researched',
        lastResearchedAt: new Date(),
        researchNote: `2026-08-05: FULL standard applied — ${STANDARD}. ${r.flag ? 'No first-hand evidence found; left qualifying but flagged.' : 'Qualification confirmed on first-hand evidence.'}`,
        theologicalNotes: `${c.theologicalNotes || ''}\n\n---\n\n${r.note}`,
      },
    })
    console.log(`  #${r.id} ${c.name} (${c.city}, ${c.state}) — ${r.flag ? 'flagged, gap stated' : 'CONFIRMED'}`)
  }
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
