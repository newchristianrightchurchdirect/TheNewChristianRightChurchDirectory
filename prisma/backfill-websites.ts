// Backfill website column from source-data scrapes where empty
import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const prisma = new PrismaClient()
const DRY_RUN = process.argv.includes('--dry')

type SourceLookup = { id: number; website?: string }

function normalize(url?: string): string | null {
  if (!url || !url.trim() || url === '.') return null
  let u = url.trim()
  if (!/^https?:\/\//i.test(u)) u = 'http://' + u
  return u
}

async function main() {
  // RPCNA: rpcna_match_plan + rpcna_extracted (keyed by slug)
  const rpcnaMatch = JSON.parse(fs.readFileSync('data/research-queue/rpcna_match_plan.json', 'utf-8'))
  const rpcnaExtracted = JSON.parse(fs.readFileSync('data/research-queue/rpcna_extracted.json', 'utf-8'))
  const rpcnaBySlug = new Map<string, any>(rpcnaExtracted.map((e: any) => [e.slug, e]))
  const rpcnaLookups: SourceLookup[] = rpcnaMatch.matched.map((m: any) => {
    const ex = rpcnaBySlug.get(m.slug)
    return { id: m.churchId, website: ex?.website }
  })

  // ARP: arp_match_plan + arp_pages_parsed
  const arpMatch = JSON.parse(fs.readFileSync('data/research-queue/arp_match_plan.json', 'utf-8'))
  const arpParsed = JSON.parse(fs.readFileSync('data/research-queue/arp_pages_parsed.json', 'utf-8'))
  const arpBySlug = new Map<string, any>(arpParsed.map((e: any) => [e.slug, e]))
  const arpLookups: SourceLookup[] = arpMatch.matched.map((m: any) => {
    const ex = arpBySlug.get(m.storeSlug)
    return { id: m.churchId, website: ex?.website }
  })

  // URC: urc_match_plan + urc_pages_parsed
  const urcMatch = JSON.parse(fs.readFileSync('data/research-queue/urc_match_plan.json', 'utf-8'))
  const urcParsed = JSON.parse(fs.readFileSync('data/research-queue/urc_pages_parsed.json', 'utf-8'))
  const urcByName = new Map<string, any>(urcParsed.map((e: any) => [e.name.toLowerCase(), e]))
  const urcLookups: SourceLookup[] = urcMatch.matched.map((m: any) => {
    const ex = urcByName.get(m.entryName.toLowerCase())
    return { id: m.churchId, website: ex?.website }
  })

  // CREC: just #21
  const crecParsed = JSON.parse(fs.readFileSync('data/research-queue/crec_pages_parsed.json', 'utf-8'))
  const trinityCda = crecParsed.find((p: any) => p.city === "Coeur d'Alene" && p.name === 'Trinity Church')
  const crecLookups: SourceLookup[] = trinityCda ? [{ id: 21, website: trinityCda.website }] : []

  const all: SourceLookup[] = [...rpcnaLookups, ...arpLookups, ...urcLookups, ...crecLookups]
    .filter(l => normalize(l.website) !== null)
    .map(l => ({ id: l.id, website: normalize(l.website)! }))

  console.log(`Source lookups with website URL: ${all.length}`)

  const dbRows = await prisma.church.findMany({
    where: { id: { in: all.map(l => l.id) } },
    select: { id: true, name: true, website: true },
  })
  const dbById = new Map(dbRows.map(r => [r.id, r]))

  let updated = 0, alreadyHas = 0, missing = 0
  for (const l of all) {
    const c = dbById.get(l.id)
    if (!c) { missing++; continue }
    if (c.website && c.website.trim()) { alreadyHas++; continue }
    if (DRY_RUN) {
      console.log(`  [dry] #${l.id} ${c.name} → ${l.website}`)
    } else {
      await prisma.church.update({ where: { id: l.id }, data: { website: l.website } })
    }
    updated++
  }

  console.log(`\n${DRY_RUN ? 'Would update' : 'Updated'}: ${updated}`)
  console.log(`Already had website: ${alreadyHas}`)
  console.log(`Missing in DB:       ${missing}`)
  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
