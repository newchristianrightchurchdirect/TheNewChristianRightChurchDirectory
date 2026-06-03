// Build list of 193 enriched-this-session church IDs and their websites
import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const prisma = new PrismaClient()

async function main() {
  const ids = new Set<number>()
  // RPCNA: from rpcna_match_plan.json
  try {
    const plan = JSON.parse(fs.readFileSync('data/research-queue/rpcna_match_plan.json', 'utf-8'))
    for (const m of plan.matched) ids.add(m.churchId)
  } catch (e) { console.error('rpcna_match_plan missing') }
  // ARP
  try {
    const plan = JSON.parse(fs.readFileSync('data/research-queue/arp_match_plan.json', 'utf-8'))
    for (const m of plan.matched) ids.add(m.churchId)
  } catch (e) { console.error('arp_match_plan missing') }
  // URC
  try {
    const plan = JSON.parse(fs.readFileSync('data/research-queue/urc_match_plan.json', 'utf-8'))
    for (const m of plan.matched) ids.add(m.churchId)
  } catch (e) { console.error('urc_match_plan missing') }
  // CREC: just #21
  ids.add(21)

  const rows = await prisma.church.findMany({
    where: { id: { in: [...ids] } },
    select: { id: true, name: true, denomination: true, city: true, state: true, website: true },
    orderBy: { id: 'asc' },
  })

  // Only keep churches we actually updated (theologicalNotes contains "Pastor " or "Pulpit currently vacant")
  const updated = await prisma.church.findMany({
    where: { id: { in: [...ids] } },
    select: { id: true, name: true, denomination: true, city: true, state: true, website: true, theologicalNotes: true },
  })

  const out = updated.map(c => ({
    id: c.id,
    name: c.name,
    denom: c.denomination,
    city: c.city,
    state: c.state,
    website: c.website || null,
    hasWebsite: !!(c.website && c.website.trim()),
  }))

  fs.writeFileSync('data/research-queue/enriched_193.json', JSON.stringify(out, null, 2))

  const withWeb = out.filter(c => c.hasWebsite).length
  const noWeb = out.length - withWeb
  const byDenom = new Map<string, number>()
  for (const c of out) byDenom.set(c.denom || '?', (byDenom.get(c.denom || '?') || 0) + 1)
  console.log(`Total: ${out.length}`)
  console.log(`With website: ${withWeb}`)
  console.log(`No website:   ${noWeb}`)
  console.log('\nBy denomination:')
  for (const [d, n] of byDenom) console.log(`  ${d.padEnd(8)} ${n}`)
  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
