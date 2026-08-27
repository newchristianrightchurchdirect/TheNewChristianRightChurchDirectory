// Run: npx tsx scripts/check-pastor-name.ts
//
// Guards lib/pastor-name.ts, which feeds the Pastor stat on every church page. The cases below are
// all real strings out of the `leadership` column — each one broke an earlier draft of the parser.
// The second half re-runs it over the whole table and fails on any output that looks like prose
// rather than a person.
import { PrismaClient } from '@prisma/client'
import { pastorName } from '../lib/pastor-name'

const CASES: Array<[string | null, string | null, string]> = [
  ['Pastor: John L. Marino (ordained 2014)', null, 'John L. Marino'],
  ['Founding senior pastor: Johnathan Newman (1998)', null, 'Johnathan Newman'],
  ['Teaching Elder Matt Timmons, who studied at Whitefield.', null, 'Matt Timmons'],
  ['Senior Pastor: David Guy Van Bebber Jr. (from Founders)', null, 'David Guy Van Bebber Jr.'],
  ['Pastor Warren R. Bennett II. Listed in the directory.', null, 'Warren R. Bennett II'],
  ['Senior Pastor: Dr. Joel Huffstutler — associate from 2013', null, 'Dr. Joel Huffstutler'],
  ['Founding & Teaching Pastor Tim Rice (commissioned 1996)', null, 'Tim Rice'],
  ['Pastors: BJ Newman; Douglas Wood', null, 'BJ Newman'],
  ['Pastors Lee McKinnon and Scott Holland.', null, 'Lee McKinnon and Scott Holland'],
  ['Other Pastor/Elder: Alan (from Founders)', 'Pastor Joshua David Kemper. Listed', 'Joshua David Kemper'],
  [null, 'Pastor Marc Brashear.\n\nListed in the directory', 'Marc Brashear'],
  ['Pastor: NOT CURRENT — Kendall Lankford left', null, ''],
  ['Preaching/Teaching Elder Patrick Ryan.', null, 'Patrick Ryan'],
  ['EM Pastor Anson Lee (TEDS).', null, 'Anson Lee'],
  ['Pastor John (surname unconfirmed).', null, 'John'],
  ['Head Pastor Bill Spanjer (since 1999; RTS).', null, 'Bill Spanjer'],
  ['Founder/Senior Pastor John Hagee; Lead Pastor Matt', null, 'John Hagee'],
  ['Pastor: Without a Pastor (from the Founders ch', null, ''],
  ['PULPIT VACANT since December 2024, filled by a', null, ''],
  ['Rev. Harry Skeele is PASTOR EMERITUS (retired)', null, 'Rev. Harry Skeele'],
  ['Other Pastor/Elder: Ron Starcher/Preaching Pastor', null, 'Ron Starcher'],
  ['Minister: Rev. Benjamin Church (from the PCA)', null, 'Rev. Benjamin Church'],
  ['Rev. Dr. Allen Church (church site, confirmed)', null, 'Rev. Dr. Allen Church'],
  ['Senior Pastor: Currently vacant (from the Fo', null, ''],
  ['Planted by Pastor Tim Worrell (1998-2013); m', null, 'Tim Worrell'],
  ['Planted 2008 by Danny Jang (from Grace Churc', null, 'Danny Jang'],
  ['Planted 1999 by Chris Robins; staff incl. Tr', null, 'Chris Robins'],
  ['Other Pastor/Elder: Conducting Pastoral Search', null, ''],
]

// Words that mean the parser returned a sentence instead of a name. "church" is deliberately absent
// — Rev. Benjamin Church and Rev. Dr. Allen Church are real men with that surname.
const PROSE = /\b(ministr|seminar|confess|directory|listed|from|pastor|elder|search|unconfirm|vacant|planted)\b/i

async function main() {
  let fail = 0
  for (const [lead, notes, want] of CASES) {
    const got = pastorName(lead, notes) || ''
    if (got !== want) {
      fail++
      console.log(`  FAIL ${JSON.stringify((lead ?? notes ?? '').slice(0, 50))}`)
      console.log(`       want ${JSON.stringify(want)}  got ${JSON.stringify(got)}`)
    }
  }
  console.log(fail === 0 ? `all ${CASES.length} unit cases pass` : `${fail} of ${CASES.length} FAILING`)

  const prisma = new PrismaClient()
  const all = await prisma.church.findMany({
    where: { approved: true },
    select: { id: true, name: true, leadership: true, theologicalNotes: true },
  })
  let shown = 0
  const leaks: string[] = []
  for (const c of all) {
    const got = pastorName(c.leadership, c.theologicalNotes)
    if (!got) continue
    shown++
    if (/\d/.test(got) || PROSE.test(got)) leaks.push(`  #${c.id} ${c.name.slice(0, 30)} -> ${JSON.stringify(got)}`)
  }
  console.log(`approved rows ${all.length}: Pastor shown on ${shown}, prose leaks ${leaks.length}`)
  leaks.slice(0, 20).forEach(l => console.log(l))
  await prisma.$disconnect()
  if (fail || leaks.length) process.exit(1)
}
main().catch(e => { console.error(e); process.exit(1) })
