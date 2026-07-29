// Fill the public-facing `description` blurb for Michigan rows that have none.
// Composed only from fields already verified in this DB (denomination, city, leadership)
// plus per-id overrides for churches with a special status. No new claims are invented.
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const denomBlurb: Record<string, string> = {
  PRCA: 'A Protestant Reformed (PRCA) congregation holding the Three Forms of Unity',
  OPC: 'An Orthodox Presbyterian Church (OPC) congregation holding the Westminster Standards',
  PCA: 'A Presbyterian Church in America (PCA) congregation holding the Westminster Standards',
  URCNA: 'A United Reformed Churches in North America (URCNA) congregation holding the Three Forms of Unity',
  NRC: 'A Netherlands Reformed Congregation (NRC) in the experiential Dutch Further Reformation tradition',
  HRC: 'A Heritage Reformed Congregation (HRC) in the experiential Dutch Further Reformation tradition',
  FRCNA: 'A Free Reformed Church of North America (FRCNA) congregation holding the Three Forms of Unity',
  CanRC: 'A Canadian Reformed Churches (CanRC) congregation holding the Three Forms of Unity',
  CRC: 'A Christian Reformed Church (CRCNA) congregation holding the Three Forms of Unity',
  RPCNA: 'A Reformed Presbyterian (RPCNA) congregation in the Covenanter tradition, singing psalms a cappella',
  CREC: 'A Communion of Reformed Evangelical Churches (CREC) congregation',
  'Reformed Baptist': 'A confessional Reformed Baptist church',
  'American Baptist': 'An American Baptist Churches USA congregation',
  'Non-Denominational': 'An independent, non-denominational congregation',
  'Vanguard Presbyterian': 'A Vanguard Presbyterian Church congregation (Westminster Presbytery) holding the Westminster Standards',
  RPC: 'A Reformed Protestant Churches (RPC) congregation holding the Three Forms of Unity',
  Converge: 'A Converge (Baptist General Conference) congregation',
  SBC: 'A Southern Baptist Convention congregation',
  GARBC: 'An independent Baptist church in fellowship with the GARBC',
  Baptist: 'A Baptist congregation listed on the Founders Ministries church search',
}

// Churches whose status needs saying plainly rather than a stock blurb.
const overrides: Record<number, string> = {
  2145: 'An Orthodox Presbyterian congregation recognized in Kentwood, Michigan in 1999 whose current status is unconfirmed - it no longer appears in the OPC congregation locator.',
  2150: 'A Westminster Standards congregation in Southfield, Michigan, planted as Providence Orthodox Presbyterian Church and now known as Christ Presbyterian Church.',
  2625: 'A Reformed Baptist church in Clyde Township, Michigan that closed in December 2025. Formerly Court Street Baptist Church of Port Huron, founded 1939.',
  3247: 'A congregation in Grand Blanc, Michigan planted in 2014 as OneLife Church, since combined with Bethany Baptist Church to form Ekklesia of Grand Blanc.',
  2142: 'A Westminster Standards congregation in Holland, Michigan, organized in the OPC in 1997 and since transitioned into the Presbyterian Church in America (PCA).',
}

const pastorClause = (leadership: string | null): string => {
  if (!leadership) return ''
  if (/vacant/i.test(leadership)) return ' The pulpit is currently vacant.'
  const first = leadership.split(';')[0].trim().replace(/\.$/, '')
  if (!first) return ''
  return ` ${first}.`
}

async function main() {
  const rows = await prisma.church.findMany({
    where: { state: 'MI', OR: [{ description: null }, { description: '' }] },
    select: { id: true, name: true, denomination: true, city: true, leadership: true },
    orderBy: { id: 'asc' },
  })
  console.log(`Rows needing a description: ${rows.length}\n`)

  let filled = 0
  const skipped: string[] = []
  for (const c of rows) {
    let description = overrides[c.id]
    if (!description) {
      const blurb = c.denomination ? denomBlurb[c.denomination] : undefined
      if (!blurb) { skipped.push(`#${c.id} ${c.name} (denomination: ${c.denomination ?? 'none'})`); continue }
      description = `${blurb} in ${c.city}, Michigan.${pastorClause(c.leadership)}`
    }
    await prisma.church.update({ where: { id: c.id }, data: { description } })
    console.log(`#${c.id} ${description}`)
    filled++
  }

  console.log(`\nFilled ${filled}.`)
  if (skipped.length) { console.log(`Skipped (no blurb for denomination):`); skipped.forEach(s => console.log(`  ${s}`)) }
  const left = await prisma.church.count({ where: { state: 'MI', OR: [{ description: null }, { description: '' }] } })
  console.log(`MI rows still without a description: ${left}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
