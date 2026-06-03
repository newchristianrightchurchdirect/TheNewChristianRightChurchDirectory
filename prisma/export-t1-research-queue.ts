import { PrismaClient } from '@prisma/client'
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const prisma = new PrismaClient()

const boilerplateMarkers = [
  'Westminster Standards',
  'Three Forms of Unity',
  '1689 London Baptist Confession',
  'Generally postmillennial',
]

const isBoilerplateOnly = (notes: string | null): boolean => {
  if (!notes) return true
  if (/Pastor[:\s]/i.test(notes)) return false
  return boilerplateMarkers.some(m => notes.startsWith(m)) && notes.length < 250
}

const csvEscape = (v: string | null | undefined): string => {
  if (v == null) return ''
  const s = String(v)
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

async function main() {
  const churches = await prisma.church.findMany({
    select: {
      id: true, name: true, denomination: true, address: true, city: true, state: true, zip: true,
      website: true, phone: true, email: true, theologicalNotes: true,
    },
    orderBy: [{ denomination: 'asc' }, { state: 'asc' }, { city: 'asc' }, { name: 'asc' }],
  })

  const t1 = churches.filter(c => isBoilerplateOnly(c.theologicalNotes))

  const outDir = join(process.cwd(), 'data', 'research-queue')
  mkdirSync(outDir, { recursive: true })

  // 1. Full T1 CSV
  const header = 'id,denomination,name,city,state,zip,address,website,phone,email,has_website,has_phone,has_email\n'
  const rows = t1.map(c => [
    c.id,
    csvEscape(c.denomination),
    csvEscape(c.name),
    csvEscape(c.city),
    csvEscape(c.state),
    csvEscape(c.zip),
    csvEscape(c.address),
    csvEscape(c.website),
    csvEscape(c.phone),
    csvEscape(c.email),
    c.website ? '1' : '0',
    c.phone ? '1' : '0',
    c.email ? '1' : '0',
  ].join(','))
  writeFileSync(join(outDir, 't1_all.csv'), header + rows.join('\n') + '\n', 'utf8')

  // 2. Per-denomination split
  const byDenom: Record<string, typeof t1> = {}
  for (const c of t1) {
    const d = c.denomination || '(none)'
    if (!byDenom[d]) byDenom[d] = []
    byDenom[d].push(c)
  }

  const summary: { denom: string; count: number; file: string; haveWebPct: number; havePhonePct: number; haveEmailPct: number }[] = []
  for (const [denom, list] of Object.entries(byDenom)) {
    const safe = denom.replace(/[^A-Za-z0-9_-]/g, '_').toLowerCase() || 'none'
    const file = `t1_${safe}.csv`
    const rows = list.map(c => [
      c.id, csvEscape(c.denomination), csvEscape(c.name), csvEscape(c.city), csvEscape(c.state),
      csvEscape(c.zip), csvEscape(c.address), csvEscape(c.website), csvEscape(c.phone), csvEscape(c.email),
      c.website ? '1' : '0', c.phone ? '1' : '0', c.email ? '1' : '0',
    ].join(','))
    writeFileSync(join(outDir, file), header + rows.join('\n') + '\n', 'utf8')

    const hw = list.filter(c => c.website).length
    const hp = list.filter(c => c.phone).length
    const he = list.filter(c => c.email).length
    summary.push({
      denom, count: list.length, file,
      haveWebPct: Math.round((hw / list.length) * 100),
      havePhonePct: Math.round((hp / list.length) * 100),
      haveEmailPct: Math.round((he / list.length) * 100),
    })
  }
  summary.sort((a, b) => b.count - a.count)

  // 3. Summary index
  const idxLines = [
    `T1 (boilerplate-only) research queue — generated ${new Date().toISOString()}`,
    `Total T1 churches: ${t1.length}`,
    ``,
    `Per-denomination files (sorted by size):`,
    ``,
    `${'Denomination'.padEnd(24)} ${'Count'.padStart(6)} ${'Web%'.padStart(5)} ${'Ph%'.padStart(5)} ${'Em%'.padStart(5)}  File`,
    `${'-'.repeat(24)} ${'-'.repeat(6)} ${'-'.repeat(5)} ${'-'.repeat(5)} ${'-'.repeat(5)}  ${'-'.repeat(30)}`,
  ]
  for (const s of summary) {
    idxLines.push(
      `${s.denom.padEnd(24)} ${String(s.count).padStart(6)} ${String(s.haveWebPct).padStart(5)} ${String(s.havePhonePct).padStart(5)} ${String(s.haveEmailPct).padStart(5)}  ${s.file}`
    )
  }
  writeFileSync(join(outDir, 'README.txt'), idxLines.join('\n') + '\n', 'utf8')

  console.log(`Wrote ${t1.length} T1 churches to ${outDir}`)
  console.log(`  t1_all.csv (all denoms)`)
  console.log(`  ${summary.length} per-denomination files`)
  console.log(`  README.txt (index/summary)`)
  console.log()
  console.log('Top 5 by count:')
  for (const s of summary.slice(0, 5)) {
    console.log(`  ${s.denom.padEnd(22)} ${String(s.count).padStart(5)} churches  →  ${s.file}`)
  }

  await prisma.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
