// Cross-reference the 2002 Knox Seminary Open Letter signatories against the directory.
// The letter is an explicit, public rejection of Christian Zionism, so a signatory tied to a
// named congregation is real evidence for zionistStance='anti' — far better than a default.
//
// CAUTION built in: the letter is from 2002. A match only becomes 'evidenced' when the
// signatory's surname still appears in that church's leadership field today; otherwise it is
// recorded as 'mixed' and flagged for confirmation, because pastors move.
//
//   npx tsx prisma/knox-crossref-2026-07-29.ts --dry-run
//   npx tsx prisma/knox-crossref-2026-07-29.ts
import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'

const prisma = new PrismaClient()
const DRY = process.argv.includes('--dry-run')
const fileArg = process.argv.slice(2).find(a => !a.startsWith('--'))
const SIGS = JSON.parse(readFileSync(fileArg || 'C:/Users/Dustina/AppData/Local/Temp/knox_sigs.json', 'utf8')) as
  Array<{ name: string; org: string; city: string; state: string; raw: string }>

const CHURCHY = /(church|chapel|presbyterian|baptist|reformed|opc|pca|congregation|parish|fellowship)/i
const STOP = new Set(['the', 'of', 'church', 'christian', 'reformed', 'presbyterian', 'baptist', 'orthodox', 'community', 'chapel', 'inc', 'in', 'and', 'america'])

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim()
const tokens = (s: string) => new Set(norm(s).split(' ').filter(w => w.length > 2 && !STOP.has(w)))
const overlap = (a: Set<string>, b: Set<string>) => [...a].filter(x => b.has(x)).length

async function main() {
  const churches = await prisma.church.findMany({
    select: { id: true, name: true, city: true, state: true, denomination: true, zionistStance: true, leadership: true, theologicalNotes: true },
  })

  const candidates = SIGS.filter(s => CHURCHY.test(s.org) && s.state.length === 2)
  console.log(`${SIGS.length} signatories, ${candidates.length} tied to something church-shaped\n`)

  let evidenced = 0, mixed = 0, unmatched = 0
  for (const sig of candidates) {
    const surname = sig.name.trim().split(/\s+/).pop()!.replace(/[^A-Za-z\-']/g, '')
    const sigTok = tokens(sig.org)
    const inState = churches.filter(c => c.state === sig.state)

    const scored = inState.map(c => {
      let score = overlap(sigTok, tokens(c.name)) * 2
      if (norm(c.city) === norm(sig.city)) score += 3
      else if (norm(c.city).includes(norm(sig.city)) || norm(sig.city).includes(norm(c.city))) score += 1
      if (c.leadership && surname.length > 3 && new RegExp(`\\b${surname}\\b`, 'i').test(c.leadership)) score += 5
      return { c, score }
    }).filter(x => x.score >= 7).sort((a, b) => b.score - a.score)

    if (!scored.length) { unmatched++; continue }
    const best = scored[0]
    const stillPastor = !!(best.c.leadership && surname.length > 3 && new RegExp(`\\b${surname}\\b`, 'i').test(best.c.leadership))
    // A ruling elder or member signing is his own act, not the congregation's position.
    const isPastor = !/ruling elder|member,|proprietor|professor|seminary|emeritus/i.test(sig.org)
    const basis = stillPastor ? 'evidenced' : 'mixed'
    stillPastor ? evidenced++ : mixed++

    console.log(`${basis === 'evidenced' ? '**' : '  '} #${best.c.id} ${best.c.name} (${best.c.city}, ${best.c.state})  [score ${best.score}, now ${best.c.zionistStance}]`)
    console.log(`      signatory: ${sig.name} — ${sig.org}, ${sig.city}, ${sig.state}${stillPastor ? '  ← STILL PASTOR' : ''}`)

    if (DRY) continue
    if ((best.c.theologicalNotes || '').includes('Knox Theological Seminary Open Letter')) continue

    if (!stillPastor) {
      // 2002 signature, signatory no longer listed here: record the LEAD, do not assert a
      // present-day stance. This becomes a verification queue rather than 49 fresh claims.
      const lead = `KNOX OPEN LETTER LEAD (unverified, do not treat as the church's current position): ${sig.name} signed the 2002 Knox Theological Seminary Open Letter against Christian Zionism as "${sig.raw}"${isPastor ? '' : ' — as a ruling elder or member rather than as pastor, so it was his own act and not an act of the congregation'}. He does not appear in this church's current leadership record. zionistStance left unchanged; confirm with the session before upgrading to anti.`
      await prisma.church.update({
        where: { id: best.c.id },
        data: {
          theologicalNotes: `${best.c.theologicalNotes || ''} ${lead}`.trim(),
          researchNote: '2026-07-29 Knox Open Letter cross-reference: historic anti-Zionist signal recorded as a lead; stance NOT changed.',
        },
      })
      continue
    }
    const note = `**ANTI-ZIONIST (${basis === 'evidenced' ? 'EVIDENCED' : 'from a 2002 signature — CONFIRM'})**: ${sig.name} signed the 2002 Knox Theological Seminary Open Letter against Christian Zionism as "${sig.raw}". ${stillPastor ? 'That signatory still appears in this church\'s leadership, so it reflects current leadership.' : 'The signatory is not in this church\'s current leadership record, so the congregation\'s present position needs confirming.'}`
    await prisma.church.update({
      where: { id: best.c.id },
      data: {
        zionistStance: 'anti',
        stanceBasis: basis,
        theologicalNotes: `${best.c.theologicalNotes || ''} ${note}`.trim(),
        researchNote: `2026-07-29 Knox Open Letter cross-reference: zionistStance -> anti (${basis}).`,
        lastResearchedAt: new Date(),
      },
    })
  }

  console.log(`\n${DRY ? 'WOULD SET' : 'SET'}  evidenced=${evidenced}  mixed=${mixed}  |  unmatched signatories=${unmatched}`)
  if (!DRY) {
    const t = await prisma.$queryRawUnsafe<any[]>(`SELECT "zionistStance", COUNT(*)::int n FROM "Church" GROUP BY 1 ORDER BY 2 DESC`)
    console.log('DB-wide zionistStance:', t.map(x => `${x.zionistStance}=${x.n}`).join('  '))
  }
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
