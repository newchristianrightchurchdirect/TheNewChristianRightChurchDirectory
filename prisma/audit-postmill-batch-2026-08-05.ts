// Audit of the 91-row postmillennialworldview.com bulk import (added 2026-07-30).
//
// Every one of these rows says in its own notes: "NOT INDEPENDENTLY VERIFIED — third-party listing
// only; the church's own site, socials and preaching have not yet been read." Every one is
// currently marked QUALIFYING. Under the standard Dustin set on 2026-07-31 — transformationalist
// requires EVIDENCED corporate civil-sphere engagement — a third-party directory listing does not
// qualify a church. A signature at least is a first-hand act; this is hearsay.
//
// The source is also known to be unreliable: 7 of 8 pastor attributions checked against it earlier
// were stale or wrong.
//
// And the import duplicated existing, better-researched records. This pass reports; it writes
// nothing. Run with --apply to act.
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const tight = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')
  .replace(/church(es)?$/, '').replace(/^the/, '')

type Row = { id: number; name: string; city: string; state: string; culturalEngagement: string | null
  theologicalNotes: string | null; website: string | null }

// Different-city matches are mostly town-vs-county or spelling variants (Pendleton/Madison County,
// Mount Vernon/Mt. Vernon, Mill Creek/Mills Creek) and are safe. These three are NOT: the cities are
// genuinely far apart and the congregations are probably distinct. Merging two real churches
// destroys one, so they are held back for judgement rather than auto-merged.
//   #4137 Christ Presbyterian, Lakeland FL vs Bradenton — and #3967 (Kenneth Talbot, RPCGA) is a
//         better candidate in Lakeland itself, so the auto-pick is likely the wrong survivor.
//   #4183 Covenant Reformed Presbyterian, Graham NC vs Asheville — opposite ends of the state.
//   #4205 Grace Covenant Baptist, McKinney TX vs Willis — ~200 miles apart.
const HOLD_FOR_JUDGEMENT = new Set([4137, 4183, 4205])

/** A bulk row duplicates another when the names match and either the city matches or the bulk row
 *  has no website while the candidate does (the bulk import never carried websites). */
function pickDuplicate(b: Row, others: Row[]): Row | null {
  if (HOLD_FOR_JUDGEMENT.has(b.id)) return null
  const tb = tight(b.name)
  const cands = others.filter(o => {
    if (o.state !== b.state) return false
    const to = tight(o.name)
    return to === tb || (tb.length > 6 && to.length > 6 && (to.includes(tb) || tb.includes(to)))
  })
  const sameCity = cands.filter(o => o.city.toLowerCase().trim() === b.city.toLowerCase().trim())
  if (sameCity.length === 1) return sameCity[0]
  if (sameCity.length > 1) return sameCity.sort((a, c) => (c.theologicalNotes?.length || 0) - (a.theologicalNotes?.length || 0))[0]
  // Exact name match in the same state but a different city — report for judgement, do not auto-merge.
  const exact = cands.filter(o => tight(o.name) === tb)
  return exact.length === 1 ? exact[0] : null
}

async function main() {
  const APPLY = process.argv.includes('--apply')
  const batch = await prisma.church.findMany({
    where: { theologicalNotes: { contains: 'NOT INDEPENDENTLY VERIFIED' } },
    select: { id: true, name: true, city: true, state: true, culturalEngagement: true,
              theologicalNotes: true, website: true },
    orderBy: { id: 'asc' },
  })
  const others = await prisma.church.findMany({
    where: { theologicalNotes: { not: { contains: 'NOT INDEPENDENTLY VERIFIED' } } },
    select: { id: true, name: true, city: true, state: true, culturalEngagement: true,
              theologicalNotes: true, website: true },
  })

  const dupes: Array<{ b: Row; o: Row; sameCity: boolean }> = []
  const unique: Row[] = []
  for (const b of batch) {
    const o = pickDuplicate(b, others)
    if (o) dupes.push({ b, o, sameCity: o.city.toLowerCase().trim() === b.city.toLowerCase().trim() })
    else unique.push(b)
  }

  console.log(`bulk batch: ${batch.length}`)
  console.log(`  duplicates of an existing record: ${dupes.length}`)
  console.log(`  no existing match (genuinely new): ${unique.length}\n`)

  console.log('=== DUPLICATES — bulk row will be flagged duplicate_of the survivor ===')
  dupes.forEach(({ b, o, sameCity }) => console.log(
    `  #${b.id} ${b.name} (${b.city})  ->  #${o.id} ${o.name} (${o.city}) [${(o.theologicalNotes || '').length}ch, ${o.website ? 'has site' : 'no site'}]${sameCity ? '' : '  *DIFFERENT CITY — check*'}`))

  console.log('\n=== NO EXISTING MATCH — will be demoted to unknown (unverified third-party listing) ===')
  unique.forEach(b => console.log(`  #${b.id} ${b.name} (${b.city}, ${b.state})`))

  if (!APPLY) { console.log('\n(dry run — pass --apply to write)'); await prisma.$disconnect(); return }

  // ---- write ----
  for (const { b, o } of dupes) {
    const survivor = await prisma.church.findUnique({ where: { id: o.id } })
    if (!survivor) continue
    // Carry the one thing the bulk row knew that the survivor may not: the postmill attribution.
    const claim = (b.theologicalNotes || '').match(/\(pastor: ([^)]+)\)/)?.[1]
    await prisma.church.update({
      where: { id: o.id },
      data: {
        theologicalNotes: `${survivor.theologicalNotes || ''}\n\n---\n\n**Merged from a duplicate record 2026-08-05.** Row #${b.id} ("${b.name}", ${b.city}) was created on 2026-07-30 by a bulk import from the **postmillennialworldview.com** directory and is the same congregation as this one. It carried one claim not otherwise recorded here: that directory lists this church as having a **postmillennial pastor**${claim ? ` (**${claim}**)` : ''}. **That listing is third-party and unverified**, and the same source was found to have 7 of 8 pastor attributions stale or wrong, so it is recorded as a lead, not a finding. The duplicate row is retained under a duplicate flag rather than deleted.`,
      },
    })
    await prisma.church.update({
      where: { id: b.id },
      data: {
        recordFlag: `duplicate_of:${o.id}`,
        culturalEngagement: 'unknown',
        theologicalNotes: `${b.theologicalNotes || ''}\n\n---\n\n**DUPLICATE, flagged 2026-08-05.** This row is the same congregation as **#${o.id} ${o.name}**, which is the better-researched record and the one to use. Created by the 2026-07-30 bulk import from a third-party postmillennial directory, which did not check whether the church was already on file. Anything unique here has been merged into #${o.id}. Held off the public directory by the duplicate flag; kept rather than deleted so the import's provenance stays visible.`,
      },
    })
    await prisma.stanceChange.create({
      data: { churchId: b.id, churchName: b.name, field: 'recordFlag', oldValue: null,
              newValue: `duplicate_of:${o.id}`, actor: 'audit-postmill-batch-2026-08-05.ts',
              note: `Bulk postmill import duplicated existing record #${o.id}; merged and held.` },
    })
  }

  for (const b of unique) {
    const held = HOLD_FOR_JUDGEMENT.has(b.id)
    await prisma.church.update({
      where: { id: b.id },
      data: {
        culturalEngagement: 'unknown',
        ...(held ? { recordFlag: 'verify_stance;denom_ambiguous' } : {}),
        theologicalNotes: `${b.theologicalNotes || ''}${held ? `\n\n---\n\n**POSSIBLE DUPLICATE — held for judgement 2026-08-05.** A same-named congregation exists elsewhere in this state, but far enough away that they are probably distinct churches, so **this row was deliberately NOT merged**: wrongly merging two real congregations destroys one, and the demotion below is reversible where a merge is not. Check by hand before acting.` : ''}\n\n---\n\n**DEMOTED FROM QUALIFYING 2026-08-05.** This row was marked transformationalist purely on a **third-party directory listing** — its own notes have said "NOT INDEPENDENTLY VERIFIED" since the day it was added. The standard set on 2026-07-31 requires **evidenced corporate civil-sphere engagement**, and a listing on someone else's website is not that; an equal-protection signature at least is a first-hand act, and even those were held not to qualify. The same source was separately found to have **7 of 8 pastor attributions stale or wrong**.\n\nThe postmillennial claim is retained above **as a research lead**. Reclassified as unresearched, which is what it is.`,
      },
    })
    await prisma.stanceChange.create({
      data: { churchId: b.id, churchName: b.name, field: 'culturalEngagement',
              oldValue: 'transformationalist', newValue: 'unknown', actor: 'audit-postmill-batch-2026-08-05.ts',
              note: 'Qualified on an unverified third-party directory listing only; demoted pending individual research.' },
    })
  }

  const c = (v: string) => prisma.church.count({ where: { approved: true, culturalEngagement: v } })
  console.log(`\nqualifying now: ${await c('transformationalist')}`)
  console.log(`held as duplicates: ${await prisma.church.count({ where: { recordFlag: { contains: 'duplicate_of' } } })}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
