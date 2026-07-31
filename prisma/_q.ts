import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
async function main() {
  const verified = await p.church.findMany({
    where: { researchNote: { contains: '2026-07-31: individually verified' } },
    select: { id: true, denomination: true, eschatology: true, culturalEngagement: true },
  })
  console.log(`individually verified today: ${verified.length}`)
  const tally = (f: 'denomination' | 'eschatology' | 'culturalEngagement') => {
    const m: Record<string, number> = {}
    verified.forEach(v => { const k = (v[f] as string) || 'unset'; m[k] = (m[k] || 0) + 1 })
    return Object.entries(m).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k}(${n})`).join('  ')
  }
  console.log(`  denomination: ${tally('denomination')}`)
  console.log(`  eschatology:  ${tally('eschatology')}`)
  console.log(`  culturalEng:  ${tally('culturalEngagement')}`)
  console.log(`\nsignature_only remaining: ${await p.church.count({ where: { recordFlag: { contains: 'signature_only' } } })}`)
  console.log(`total churches: ${await p.church.count()}`)
  console.log(`postmill overall: ${await p.church.count({ where: { eschatology: 'postmill' } })}`)
  await p.$disconnect()
}
main()
