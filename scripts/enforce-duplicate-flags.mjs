/**
 * Enforce the duplicate_of flags that earlier research already recorded.
 *
 *   node scripts/enforce-duplicate-flags.mjs           # dry run
 *   node scripts/enforce-duplicate-flags.mjs --apply
 *
 * 159 rows carry a duplicate_of:<id> flag and are still approved=true, so the
 * directory shows both copies. The decision was made; it was never enforced.
 * This enforces it — but only where enforcing it is unambiguously safe.
 *
 * FOUR WAYS THIS COULD GO WRONG, each checked rather than assumed:
 *
 *   1. CHAIN      A->B where B->C. Hiding both A and B is fine, but only if C
 *                 survives. Any chain is held.
 *   2. MUTUAL     A->B and B->A. Hiding both deletes the church from the
 *                 directory entirely. Held.
 *   3. DEAD/HIDDEN TARGET  the survivor does not exist or is itself hidden —
 *                 hiding the flagged row loses the congregation. Held.
 *   4. INFORMATION LOSS    the row being hidden carries research the survivor
 *                 lacks (an evidenced stance, a research note, notable people,
 *                 leadership). Hiding it silently discards that work, so it is
 *                 held for a human merge instead.
 *
 * Also held: pairs whose names are too different to be sure they are the same
 * congregation ("Atlanta RP Church" -> "Atlanta Presbyterian Fellowship").
 * Same town plus similar name is a duplicate; same town plus a different name
 * is two churches until someone checks.
 *
 * approved=false, never DELETE. A hidden row keeps its research and can be
 * restored with one update.
 */
import { PrismaClient } from '@prisma/client'

const APPLY = process.argv.includes('--apply')
const prisma = new PrismaClient()

const STOP = /\b(the|of|a|an|at|in|and|inc|church|churches|chapel|congregation|fellowship|mission|station|presbyterian|reformed|baptist|orthodox|community|pca|opc|rp|rpcna|crec|urc|bible)\b/g
const key = (s) => (s || '').toLowerCase()
  .replace(/[''`]/g, '')                    // DELETE apostrophes, don't split on them:
  .replace(/\bst\b\.?/g, 'saint')           // "King's" must reduce to "kings", not "king s",
  .replace(/[^a-z0-9\s]/g, ' ')             // or every possessive name reads as a different church
  .replace(STOP, ' ').replace(/\s+/g, ' ').trim()

/** Do the two names plausibly denote the same congregation? */
function namesAgree(a, b) {
  const ka = key(a), kb = key(b)
  if (!ka && !kb) return true              // both reduce to generic words
  if (!ka || !kb) return true              // one is purely generic: "Emmanuel" vs "Emmanuel Presbyterian Church"
  if (ka === kb) return true
  if (ka.includes(kb) || kb.includes(ka)) return true
  const sa = new Set(ka.split(' ')), sb = new Set(kb.split(' '))
  const shared = [...sa].filter((w) => sb.has(w)).length
  return shared > 0 && shared >= Math.min(sa.size, sb.size)
}

/** Free-text research fields. */
const RESEARCH = ['researchNote', 'notablePeople', 'theologicalNotes', 'leadership', 'description']

/** Every stance-bearing column. NEVER merged: CLAUDE.md requires a research-log
 *  entry for any stance change, and a stance must not move as a side effect of
 *  deduplication. A stance difference sends the pair to human review. */
const STANCE = ['abolitionStance', 'zionistStance', 'christianNationalism', 'eschatology',
  'theonomy', 'federalVision', 'socialJusticeStance', 'sexualityStance', 'genderStance',
  'culturalEngagement', 'stanceBasis']

/**
 * Decide what happens to the research on the row about to be hidden.
 *
 *   { merge }   fields the survivor is EMPTY on — copy them across, then hide.
 *               Filling a blank from a confirmed duplicate loses nothing.
 *   { conflict} both rows hold different text in the same field. Choosing one
 *               is an editorial judgement, so it goes to a human.
 *
 * sourceUrls is a set, so it is unioned rather than treated as a conflict.
 */
function plan(dup, keep) {
  const merge = {}, conflict = []

  for (const f of STANCE) {
    const d = dup[f], k = keep[f]
    if (d && k && d !== k && d !== 'unknown' && k !== 'unknown') conflict.push(`${f}: ${k} vs ${d}`)
    else if (d && d !== 'unknown' && (!k || k === 'unknown')) conflict.push(`${f} would move ${k || 'null'} -> ${d}`)
  }

  for (const f of RESEARCH) {
    const d = (dup[f] || '').trim(), k = (keep[f] || '').trim()
    if (!d) continue
    if (!k) merge[f] = d
    else if (d.length > k.length * 1.5 && d.length > 60) conflict.push(`${f}: both populated, duplicate's is longer`)
  }

  const urls = new Set([...(keep.sourceUrls || '').split(';'), ...(dup.sourceUrls || '').split(';')]
    .map((s) => s.trim()).filter(Boolean))
  if (urls.size > (keep.sourceUrls || '').split(';').filter(Boolean).length) {
    merge.sourceUrls = [...urls].join(';')
  }

  // Only claim the survivor is researched if the research actually came across.
  if (dup.researchStatus === 'researched' && keep.researchStatus !== 'researched'
      && (merge.researchNote || merge.sourceUrls)) {
    merge.researchStatus = 'researched'
  }
  if (dup.lastResearchedAt && (!keep.lastResearchedAt || dup.lastResearchedAt > keep.lastResearchedAt)) {
    merge.lastResearchedAt = dup.lastResearchedAt
  }
  return { merge, conflict }
}

const all = await prisma.church.findMany()
const byId = new Map(all.map((c) => [c.id, c]))
const targetOf = (c) => Number((c.recordFlag || '').match(/duplicate_of:(\d+)/)?.[1]) || null

const flagged = all.filter((c) => c.approved && targetOf(c))
console.log(`${flagged.length} approved rows carry a duplicate_of flag\n`)

const safe = [], held = []
for (const dup of flagged) {
  const tid = targetOf(dup)
  const keep = byId.get(tid)
  const hold = (reason, detail = '') => held.push({ dup, keep, tid, reason, detail })

  if (!keep) { hold('TARGET MISSING', `#${tid} is not in the table`); continue }
  if (!keep.approved) { hold('TARGET HIDDEN', `#${tid} is itself approved=false`); continue }
  if (targetOf(keep) === dup.id) { hold('MUTUAL', `#${tid} points back at #${dup.id}`); continue }
  if (targetOf(keep)) { hold('CHAIN', `#${tid} is itself flagged dup of #${targetOf(keep)}`); continue }
  if (dup.state !== keep.state) { hold('DIFFERENT STATE', `${dup.state} vs ${keep.state}`); continue }
  if (!namesAgree(dup.name, keep.name)) { hold('NAMES DIFFER', `${dup.name!==keep.name?`"${dup.name}" vs "${keep.name}"`:''}`); continue }

  const { merge, conflict } = plan(dup, keep)
  if (conflict.length) { hold('NEEDS A HUMAN MERGE', conflict.join('; ')); continue }

  safe.push({ dup, keep, tid, merge })
}

console.log(`${'='.repeat(76)}\nSAFE TO HIDE — ${safe.length}\n${'='.repeat(76)}`)
for (const { dup, tid, merge } of safe) {
  const m = Object.keys(merge)
  console.log(`  #${String(dup.id).padStart(5)} ${(dup.name || '').slice(0, 40).padEnd(40)} ${(dup.city || '').slice(0, 16).padEnd(16)} ${dup.state} -> keep #${String(tid).padEnd(5)}${m.length ? '  merge forward: ' + m.join(', ') : ''}`)
}

console.log(`\n${'='.repeat(76)}\nHELD FOR REVIEW — ${held.length}\n${'='.repeat(76)}`)
const byReason = {}
for (const h of held) (byReason[h.reason] ||= []).push(h)
for (const [reason, hs] of Object.entries(byReason).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`\n  ${reason} (${hs.length})`)
  for (const h of hs) {
    console.log(`    #${String(h.dup.id).padStart(5)} ${(h.dup.name || '').slice(0, 38).padEnd(38)} ${(h.dup.city || '').slice(0, 15).padEnd(15)} ${h.dup.state} -> #${h.tid}  ${h.detail.slice(0, 74)}`)
  }
}

const merged = safe.filter((s) => Object.keys(s.merge).length).length

if (APPLY) {
  for (const { dup, tid, merge } of safe) {
    // Merge FIRST, so a failure here cannot leave the row hidden and its research dropped.
    if (Object.keys(merge).length) {
      await prisma.church.update({
        where: { id: tid },
        data: {
          ...merge,
          researchNote: merge.researchNote
            ? `${merge.researchNote}\n\n(Absorbed from duplicate row #${dup.id} on 2026-08-13.)`
            : undefined,
        },
      })
    }
    await prisma.church.update({
      where: { id: dup.id },
      data: {
        approved: false,
        researchNote: `${dup.researchNote || ''}\n\n=== HIDDEN 2026-08-13 ===\nEnforcing the duplicate_of:${tid} flag this row already carried; both copies were visible in the directory. Checked first: #${tid} exists, is approved, is not itself flagged a duplicate, is in the same state, and has an agreeing name. ${Object.keys(merge).length ? `Merged forward into #${tid} before hiding: ${Object.keys(merge).join(', ')}.` : 'It held nothing #' + tid + ' lacked.'} No stance field was touched. Hidden with approved=false, not deleted — restore by setting approved=true.`.trim(),
      },
    })
  }
  console.log(`\nHID ${safe.length} rows (${merged} after merging research forward). ${held.length} left visible for review.`)
} else {
  console.log(`\nDRY RUN — would hide ${safe.length} (${merged} needing a merge first), hold ${held.length}. Pass --apply to write.`)
}
await prisma.$disconnect()
