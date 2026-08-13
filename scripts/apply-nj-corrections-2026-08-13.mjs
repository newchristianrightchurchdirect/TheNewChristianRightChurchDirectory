/**
 * Apply the New Jersey corrections established by the five-step sweep.
 *
 *   node scripts/apply-nj-corrections-2026-08-13.mjs           # dry run
 *   node scripts/apply-nj-corrections-2026-08-13.mjs --apply
 *
 * Every change here has a written rationale in NJ-standard-records.json and
 * church_research_log.md. NO STANCE FIELD IS TOUCHED — these are identity,
 * location, leadership and denomination facts, so they need no StanceChange
 * row, and a stance is never corrected as a side effect of a name fix.
 *
 * DELIBERATELY NOT INCLUDED: #1408 Good News Church. Two sources give two
 * different towns (a web search says Atlantic City, the PCA roster says
 * Princeton). Writing either would be guessing, so it stays as it is until
 * one is confirmed.
 */
import { PrismaClient } from '@prisma/client'

const APPLY = process.argv.includes('--apply')
const prisma = new PrismaClient()
const STAMP = '\n\n=== CORRECTED 2026-08-13 (NJ five-step sweep) ===\n'

/** id -> { field: value }, plus a `why` recorded into researchNote. */
const FIXES = {
  2699: {
    name: 'Island Bible Church (The Hope of LBI)',
    denomination: 'Dispensational / independent',
    leadership: 'Lead Pastor Luke Fraser. Elder John Pagenkopf; Dan Malay, executive.',
    why: 'Trades as Island Bible Church / The Hope of LBI, not "Island Baptist Church". Recorded as Reformed Baptist, but its own 35,453-character "What We Teach" is the MacArthur statement: pretribulational rapture, millennial kingdom, church distinct from Israel. That is dispensational, not Reformed. Leadership field held a crawl artifact.',
  },
  2196: {
    leadership: 'Rev. Kim Dang. Ruling elders Terry Boyle and Ben Szuba.',
    why: 'Leadership held the crawl artifact "Kim Dang Mr. Charles". Corrected from the church site and confirmed by the OPC congregation directory.',
  },
  5267: {
    leadership: 'Pastor Daniel Lisa. Elders Jeff Lukawski and Phil Mingle; deacon Paul Manzo.',
    why: 'Leadership recorded "Harry Fletcher", who is not the pastor. The church site names Daniel Lisa. An earlier marker search of "Harry Fletcher" therefore proved nothing about this church.',
  },
  6206: {
    city: 'Egg Harbor Township',
    address: '391 Zion Rd',
    leadership: 'Pastor Ryan Colvin (called September 2024; B.Div. Greenville Presbyterian Theological Seminary).',
    why: 'Meets at 391 Zion Rd, Egg Harbor Township — not Northfield. Confirmed independently by the PCA New Jersey Presbytery roster. The "zion" marker an automated pass flagged here was this street name.',
  },
  2894: {
    name: 'Harmony Bible Fellowship Church',
    denomination: 'Bible Fellowship Church (BFC)',
    city: 'Harmony Township',
    leadership: 'Pastor Rick Paquette. Elders Donald Jackson, Robert Burnett, David Heller.',
    why: 'One congregation, not two. Its own history page: founded May 1992 as Sovereign Grace Bible Chapel, became Sovereign Grace Baptist Church, and since April 2022 worships at 2603 Belvidere Road in Harmony Township as Harmony Bible Fellowship Church. Now in the Bible Fellowship Church denomination. Recorded pastor Jon Zwingel came from a stale Founders listing. NOTE the theologicalNotes claim "covenantal theology rejects dispensationalism" is contradicted by the church\'s own statement, which teaches a pretribulational rapture.',
  },
  1420: {
    city: 'Glassboro',
    why: 'The PCA New Jersey Presbytery roster places Mercy Hill Presbyterian in Glassboro, not Sewell.',
  },
  2214: {
    leadership: 'Director: Rev. James A. Zozzaro (also pastor of Christ the King OPC, North Wildwood).',
    why: 'Leadership held "Leslie Dunn", who FOUNDED the chapel in the 1940s and is not its current leader. Also note this row is NOT a congregation: the Boardwalk Chapel is a summer evangelistic ministry of the Presbytery of New Jersey, staffed by rotating visiting church groups.',
  },
  3948: { leadership: 'Rev. David F. Elmer.', why: 'Leadership was blank. Named on the Hanover Presbytery pastors list.' },
  1422: {
    website: null,
    why: 'The recorded website newhopepres.org is NOT this church. It belongs to New Hope Presbyterian, a PCUSA congregation in the DENVER PRESBYTERY, Colorado, with a woman senior pastor and an "open and affirming" FAQ. 34,000 characters of "site content" gathered for this row describe a different church in a different state and have been discarded. The row already carried a flag that it is not on the PCA roster. Website cleared rather than left pointing at another denomination.',
  },
  2201: {
    leadership: 'John Vroegindewey. Ron Pearce founded the work in 1981 and retired 17 April 2022. Contact elder: Joel Pearce.',
    why: 'Leadership recorded "Rev. Timothy Brindle", who pastors Olive Street Presbyterian (PCA) in Philadelphia and is not the pastor here. Corrected from the church site and the OPC directory.',
  },
  3621: {
    city: 'Kinnelon',
    leadership: 'Rev. Reuel Xavier, pastor since August 2024 (M.Div. Puritan Reformed Theological Seminary, 2023).',
    why: 'City recorded as "Grand Rapids" — the church is at 129 Boonton Avenue, KINNELON, New Jersey. Grand Rapids is where the pastor trained (PRTS); the two appear to have been conflated.',
  },
  1403: {
    leadership: 'Rev. Harry Skeele is PASTOR EMERITUS (retired). Current lead pastor not established.',
    why: 'Recorded as "Lead Pastor Harry Skeele" — he is emeritus and retired.',
  },
  1425: { leadership: 'Daniel Ying, senior pastor since July 2012.', why: 'Leadership recorded "Senior pastor unconfirmed".' },
  1405: {
    leadership: "Pastor Christopher Mark O'Brien.",
    why: 'Leadership held the crawl artifact "Rev. Chris O\'". Confirmed by the PCA New Jersey Presbytery roster. Worth recording that this is the OLDEST EXISTING CONGREGATION IN THE PCA, founded 1680; it left the UPCUSA in 1971 and joined the PCA in 1980.',
  },
  54: {
    leadership: 'Pastors Patrick Harrison and Phil Horjus. David Dykstra served 30+ years and has left for Grace Covenant Baptist Church, Willis, Texas.',
    why: 'Recorded pastor David Dykstra is stale — he has left New Jersey.',
  },
  1402: {
    leadership: 'Christopher Diebold (RTS Charlotte M.Div. 2017) heads the church\'s SermonAudio broadcaster. Donny Friederichsen, previously recorded, has moved to Texas.',
    why: 'Friederichsen has served in Belarus, Kentucky, Florida, the Bahamas, New Jersey "and now Texas", and appears on the staff of Lakeside PCA.',
  },
  6201: {
    city: 'Princeton',
    address: '75 Mapleton Road',
    leadership: 'Rev. Diogo Inawashiro — Portuguese/Spanish-speaking church planter; Latino Ministry Pastoral Assistant at Tenth Presbyterian Church, Philadelphia.',
    why: 'Located at 75 Mapleton Road, Princeton — not Cherry Hill. Confirmed by the PCA New Jersey Presbytery roster.',
  },
  2498: {
    leadership: 'Pastor Daniel Wiginton, since 2013.',
    why: 'Leadership recorded "Ida Faye Levering" — a MEMBER OF THE CONGREGATION APPOINTED A MISSIONARY IN 1891 who sailed for Nellore, India. A name scraped from the church history page and filed as current leadership. The pastor is Daniel Wiginton.',
  },
  5056: {
    why: 'Seth McCoy is reported to have left and formed Four Anchors Church in Evesham, so the recorded pastor may be stale. Left in place rather than cleared, because his departure is reported rather than confirmed by the church.',
  },
  1401: {
    website: 'https://cpcnj.org',
    why: 'Website added from the PCA New Jersey Presbytery roster; the row had none. FLAG: Dr. Bob Orner, recorded as lead pastor, is also named Dean of Students at RTS Orlando, so the field may be out of date.',
  },
}

/** Confirmed duplicates: hidden, never deleted. */
const DUPES = {
  6489: { of: 3774, why: 'Same SermonAudio broadcaster "rpcnj2007" under Andrew Kerr as #3774.' },
  3890: { of: 5763, why: 'Same SermonAudio broadcaster "pprbc" under Justin Nobel as #5763.' },
  4003: { of: 54, why: 'Same SermonAudio broadcaster "rbclnj" under Patrick Harrison as #54. Its recorded website rbcweb.org is Reformed Baptist Church ANNIESLAND, GLASGOW — a different church on another continent.' },
}

let changes = 0
for (const [id, fix] of Object.entries(FIXES)) {
  const cid = Number(id)
  const c = await prisma.church.findUnique({ where: { id: cid } })
  if (!c) { console.log(`#${cid} NOT FOUND`); continue }
  const { why, ...fields } = fix
  const diff = Object.entries(fields).filter(([k, v]) => String(c[k] ?? '') !== String(v ?? ''))
  if (!diff.length && !why) continue
  console.log(`#${cid} ${c.name}`)
  for (const [k, v] of diff) {
    console.log(`   ${k}`)
    console.log(`     - ${String(c[k] ?? '(null)').slice(0, 110)}`)
    console.log(`     + ${String(v ?? '(null)').slice(0, 110)}`)
    changes++
  }
  if (APPLY) {
    await prisma.church.update({
      where: { id: cid },
      data: { ...fields, researchNote: `${c.researchNote || ''}${STAMP}${why}`.trim() },
    })
  }
}

console.log('\n--- duplicates ---')
for (const [id, d] of Object.entries(DUPES)) {
  const cid = Number(id)
  const c = await prisma.church.findUnique({ where: { id: cid } })
  if (!c) { console.log(`#${cid} NOT FOUND`); continue }
  console.log(`#${cid} ${c.name} (${c.city})  approved ${c.approved} -> false   [dup of #${d.of}]`)
  changes++
  if (APPLY) {
    const flags = new Set((c.recordFlag || '').split(';').filter(Boolean))
    flags.add(`duplicate_of:${d.of}`)
    await prisma.church.update({
      where: { id: cid },
      data: {
        approved: false,
        recordFlag: [...flags].join(';'),
        researchNote: `${c.researchNote || ''}${STAMP}HELD as a duplicate of #${d.of}. ${d.why} Hidden with approved=false rather than deleted, so the row and its provenance survive.`.trim(),
      },
    })
  }
}

console.log(`\n${changes} field changes ${APPLY ? 'APPLIED' : 'pending'}`)
console.log('NOT included: #1408 Good News Church — two sources give two different towns.')
if (!APPLY) console.log('DRY RUN — pass --apply to write')
await prisma.$disconnect()
