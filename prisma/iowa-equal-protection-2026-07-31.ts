// The Iowa pastors' equal-protection statement, found 2026-07-31.
//
// Eighteen pastors signed biblical guidance calling for equal protection of all humans in Iowa
// from conception — abortion classified as murder under the existing penal code, with both
// doctor and mother accountable. That is the criminalisation position, and signing it is a formal
// public act by the pastor, which makes it the strongest abolition evidence available short of a
// church running its own ministry.
//
// This VINDICATES the claim on #3910, which I had recorded as unconfirmable. It also CORRECTS
// #46, which carried abolitionStance = incrementalist while its pastor had signed an equal-
// protection statement — the opposite of incrementalism.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'

const prisma = new PrismaClient()
const SRC = 'https://www.kjan.com/index.php/2024/01/iowa-pastors-to-call-for-equal-protection-of-unborn-at-capitol-event/;https://iowaabolitionists.org/'
const LETTER =
  'SIGNATORY — **Iowa pastors’ equal-protection statement (January 2024)**. Eighteen pastors ' +
  'across Iowa signed biblical guidance presented at a Capitol event in Des Moines, making the ' +
  'case for life from conception and **equal protection of all humans in Iowa**. Under it, all ' +
  'chemical and surgical abortion would be outlawed but for medical emergencies threatening the ' +
  'mother’s life, and **both doctor and mother would be accountable under the existing penal ' +
  'code, with abortion classified as murder** in degrees according to knowledge and intent. ' +
  'That is the criminalisation position — abolition, not incrementalism — and signing it is a ' +
  'formal public act by the pastor rather than an inference about him.'

type Row = { id: number; pastor: string; alsoAbolition: boolean }
const SIGNERS: Row[] = [
  { id: 3910, pastor: 'Jody James Lucero', alsoAbolition: true },
  { id: 3280, pastor: 'Grant Brown and David Koch (two signatories from this congregation)', alsoAbolition: true },
  { id: 3904, pastor: 'Caleb Castro', alsoAbolition: true },
  { id: 3907, pastor: 'Todd DeRooy', alsoAbolition: true },
  { id: 3908, pastor: 'Dan Donovan', alsoAbolition: true },
]

async function main() {
  for (const s of SIGNERS) {
    const c = await prisma.church.findUnique({ where: { id: s.id } })
    if (!c) { console.log(`#${s.id} missing`); continue }
    await updateStances(prisma, s.id, {
      abolitionStance: 'pro_abolition',
      culturalEngagement: 'transformationalist',
    }, {
      actor: 'iowa-equal-protection-2026-07-31.ts',
      note: `${s.pastor} signed the January 2024 Iowa pastors' equal-protection statement, which calls for abortion to be prosecuted as murder under the existing penal code with both doctor and mother accountable. Signing a public equal-protection statement is the abolitionist position stated formally.`,
      alsoSet: {
        stanceBasis: 'evidenced',
        recordFlag: null,
        leadership: c.leadership || `Pastor: ${s.pastor}`,
        sourceUrls: [...new Set([...(c.sourceUrls || '').split(';').filter(Boolean), ...SRC.split(';')])].join(';'),
        theologicalNotes: (c.theologicalNotes || '') + '\n\n' + LETTER + ` Signed here by **${s.pastor}**.`,
        researchNote: `2026-07-31: confirmed signatory of the Iowa pastors' equal-protection statement (Jan 2024).`,
      },
    })
    console.log(`#${s.id} ${c.name} — equal-protection signatory recorded (${s.pastor})`)
  }

  // ---- #46 Christ the Redeemer, Pella — CORRECTION ----
  const shover = await prisma.church.findUnique({ where: { id: 46 } })
  if (shover) {
    await updateStances(prisma, 46, { abolitionStance: 'pro_abolition' }, {
      actor: 'iowa-equal-protection-2026-07-31.ts',
      note: 'CORRECTION. This row recorded abolitionStance = incrementalist, but Michael Shover signed the January 2024 Iowa pastors’ equal-protection statement, which calls for abortion to be prosecuted as murder with both doctor and mother accountable. That is the opposite of incrementalism, and the stored value was wrong.',
      alsoSet: {
        sourceUrls: [...new Set([...(shover.sourceUrls || '').split(';').filter(Boolean), ...SRC.split(';')])].join(';'),
        theologicalNotes: (shover.theologicalNotes || '') + '\n\n' + LETTER +
          ' Signed here by **Michael Shover**. **This corrects the record:** this row previously read `abolitionStance = incrementalist`, which was the opposite of the position its pastor had publicly signed.',
        researchNote: '2026-07-31: abolitionStance corrected incrementalist -> pro_abolition on the strength of his signature to the Iowa equal-protection statement.',
      },
    })
    console.log('#46 Christ the Redeemer Pella — CORRECTED incrementalist -> pro_abolition')
  }

  // ---- Abundant Life, Humboldt — matcher missed it on a name variant ----
  const al = await prisma.church.findFirst({
    where: { state: 'IA', city: { contains: 'Humboldt', mode: 'insensitive' }, name: { contains: 'Abundant Life', mode: 'insensitive' } },
  })
  if (al) {
    await updateStances(prisma, al.id, { abolitionStance: 'pro_abolition', culturalEngagement: 'transformationalist' }, {
      actor: 'iowa-equal-protection-2026-07-31.ts',
      note: 'Sam Jones signed the January 2024 Iowa pastors’ equal-protection statement. The signatory list names "Abundant Life Church, Humbolt"; this congregation is recorded here as Abundant Life Christian Fellowship, Humboldt — same town, same pastor, name variant.',
      alsoSet: {
        stanceBasis: 'evidenced', recordFlag: null,
        leadership: al.leadership || 'Pastor: Sam Jones',
        sourceUrls: [...new Set([...(al.sourceUrls || '').split(';').filter(Boolean), ...SRC.split(';')])].join(';'),
        theologicalNotes: (al.theologicalNotes || '') + '\n\n' + LETTER +
          ' Signed here by **Sam Jones**. (The published list spells the town "Humbolt" and names the church "Abundant Life Church"; recorded here under its fuller name.)',
        researchNote: '2026-07-31: confirmed signatory of the Iowa equal-protection statement (Sam Jones).',
      },
    })
    console.log(`#${al.id} ${al.name} — equal-protection signatory recorded (Sam Jones)`)
  } else {
    console.log('Abundant Life Humboldt not matched — check manually')
  }

  const e = await prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist', stanceBasis: 'evidenced' } })
  const a = await prisma.church.count({ where: { approved: true, abolitionStance: 'pro_abolition' } })
  console.log(`\nevidenced ${e} | pro_abolition ${a}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
