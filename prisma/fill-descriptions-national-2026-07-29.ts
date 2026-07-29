// Fill the public-facing `description` blurb nationwide for rows that have none.
// Composed only from fields already in the DB (denomination, city, state, leadership).
// No new claims are invented, and rows whose denomination label is untrustworthy are SKIPPED
// rather than given a confident-sounding blurb.
//
//   npx tsx prisma/fill-descriptions-national-2026-07-29.ts --dry-run
//   npx tsx prisma/fill-descriptions-national-2026-07-29.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const DRY = process.argv.includes('--dry-run')

const STATE: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California', CO: 'Colorado',
  CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho',
  IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana',
  ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota',
  MS: 'Mississippi', MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada',
  NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York', NC: 'North Carolina',
  ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania',
  RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas',
  UT: 'Utah', VT: 'Vermont', VA: 'Virginia', WA: 'Washington', WV: 'West Virginia',
  WI: 'Wisconsin', WY: 'Wyoming', DC: 'the District of Columbia',
}

const BLURB: Record<string, string> = {
  PCA: 'A Presbyterian Church in America (PCA) congregation holding the Westminster Standards',
  'PCA (Korean)': 'A Korean-language Presbyterian Church in America (PCA) congregation holding the Westminster Standards',
  OPC: 'An Orthodox Presbyterian Church (OPC) congregation holding the Westminster Standards',
  ARP: 'An Associate Reformed Presbyterian (ARP) congregation holding the Westminster Standards',
  RPCNA: 'A Reformed Presbyterian (RPCNA) congregation in the Covenanter tradition, singing psalms a cappella',
  'Reformed Presbyterian': 'A Reformed Presbyterian congregation in the Covenanter tradition',
  RPCGA: 'A Reformed Presbyterian Church General Assembly (RPCGA) congregation',
  'Bible Presbyterian Church (BPC)': 'A Bible Presbyterian Church (BPC) congregation',
  'Vanguard Presbytery': 'A Vanguard Presbyterian Church congregation holding the Westminster Standards',
  'Evangel Presbytery': 'An Evangel Presbytery congregation',
  'Presbyterian Reformed Church (PRC)': 'A Presbyterian Reformed Church congregation',
  CRPC: 'A Covenanted Reformed Presbyterian congregation',
  CPC: 'A Covenant Presbyterian congregation',
  EPC: 'An Evangelical Presbyterian Church (EPC) congregation',
  'Independent Presbyterian': 'An independent Presbyterian congregation',
  'Presbyterian (independent)': 'An independent Presbyterian congregation',
  Presbyterian: 'A Presbyterian congregation',
  URCNA: 'A United Reformed Churches in North America (URCNA) congregation holding the Three Forms of Unity',
  PRCA: 'A Protestant Reformed (PRCA) congregation holding the Three Forms of Unity',
  RPC: 'A Reformed Protestant Churches (RPC) congregation holding the Three Forms of Unity',
  NRC: 'A Netherlands Reformed Congregation (NRC) in the experiential Dutch Further Reformation tradition',
  HRC: 'A Heritage Reformed Congregation (HRC) in the experiential Dutch Further Reformation tradition',
  FRCNA: 'A Free Reformed Church of North America (FRCNA) congregation holding the Three Forms of Unity',
  CanRC: 'A Canadian Reformed Churches (CanRC) congregation holding the Three Forms of Unity',
  CRC: 'A Christian Reformed Church (CRCNA) congregation holding the Three Forms of Unity',
  CREC: 'A Communion of Reformed Evangelical Churches (CREC) congregation',
  Reformed: 'A Reformed congregation',
  'Independent Reformed': 'An independent Reformed congregation',
  'Reformed Baptist': 'A confessional Reformed Baptist church',
  SBC: 'A Southern Baptist Convention congregation',
  GARBC: 'An independent Baptist church in fellowship with the GARBC',
  Converge: 'A Converge (Baptist General Conference) congregation',
  'Independent Baptist': 'An independent Baptist church',
  'American Baptist': 'An American Baptist Churches USA congregation',
  ABCUSA: 'An American Baptist Churches USA congregation',
  Baptist: 'A Baptist congregation',
  'Bible Church': 'An independent Bible church',
  'Non-Denominational': 'An independent, non-denominational congregation',
  'Acts 29': 'An Acts 29 network congregation',
  'Calvary Chapel': 'A Calvary Chapel congregation',
  'Grace Gospel Fellowship': 'A Grace Gospel Fellowship congregation',
  'Church of the Nazarene': 'A Church of the Nazarene congregation',
  'Church of Christ': 'A Church of Christ congregation',
  Anabaptist: 'An Anabaptist congregation',
  Evangelical: 'An evangelical congregation',
}

// Labels we will NOT describe. `URC` is an unresearched bulk import whose denomination was
// guessed wholesale — 86 of its 203 rows are named "Presbyterian", which no URCNA church is.
// Writing "A United Reformed congregation" onto those would publish a claim we know is shaky.
const UNTRUSTED = new Set(['URC'])

// Some `city` values are junk from old imports — street names ("Gaston Rd"), postcodes
// ("66849 Landstuhl"), or fragments. Publishing "in Gaston Rd, Texas" would be worse than
// publishing nothing, so those rows are skipped and reported for repair instead.
const STREET_SUFFIX = /(^|\s)(rd|road|st|street|ave|avenue|blvd|hwy|highway|ln|lane|dr|drive|ct|court|way|pkwy|suite|ste|box)\.?$/i
// A city value should be a place name: no digits, no street suffix, not a church name, short.
const CHURCHY_CITY = /(church|presbyterian|baptist|chapel|fellowship|congregation|http|@)/i
const badCity = (raw: string) => {
  const city = (raw || '').trim()
  return !city || city.length < 2 || city.length > 30 || /\d/.test(city) ||
    STREET_SUFFIX.test(city) || CHURCHY_CITY.test(city) || city.split(/\s+/).length > 4
}

const pastorClause = (leadership: string | null): string => {
  if (!leadership) return ''
  if (/vacant/i.test(leadership)) return ' The pulpit is currently vacant.'
  const first = leadership.split(';')[0].trim().replace(/\.$/, '')
  return first ? ` ${first}.` : ''
}

async function main() {
  const rows = await prisma.church.findMany({
    where: { OR: [{ description: null }, { description: '' }] },
    select: { id: true, name: true, denomination: true, city: true, state: true, leadership: true },
    orderBy: { id: 'asc' },
  })
  console.log(`rows without a description: ${rows.length}\n`)

  let filled = 0
  const skipped: Record<string, number> = {}
  const badCities: string[] = []
  for (const c of rows) {
    const denom = c.denomination ?? ''
    if (UNTRUSTED.has(denom) || !BLURB[denom]) {
      skipped[denom || '(none)'] = (skipped[denom || '(none)'] || 0) + 1
      continue
    }
    if (badCity(c.city)) {
      skipped['BAD CITY VALUE'] = (skipped['BAD CITY VALUE'] || 0) + 1
      badCities.push(`#${c.id} ${c.name} — city="${c.city}" state=${c.state}`)
      continue
    }
    const where = STATE[c.state] ? `${c.city}, ${STATE[c.state]}` : `${c.city}, ${c.state}`
    const description = `${BLURB[denom]} in ${where}.${pastorClause(c.leadership)}`
    if (!DRY) await prisma.church.update({ where: { id: c.id }, data: { description } })
    if (filled < 6) console.log(`  #${c.id} ${description}`)
    filled++
  }

  console.log(`\n${DRY ? 'WOULD FILL' : 'FILLED'} ${filled}`)
  console.log('skipped:', Object.entries(skipped).map(([k, v]) => `${k}=${v}`).join('  ') || 'none')
  if (badCities.length) {
    console.log(`
ROWS WITH A BAD city VALUE (${badCities.length}) — need repair, not a description:`)
    badCities.slice(0, 25).forEach(b => console.log('   ' + b))
    if (badCities.length > 25) console.log(`   ...and ${badCities.length - 25} more`)
  }
  if (!DRY) {
    const left = await prisma.church.count({ where: { OR: [{ description: null }, { description: '' }] } })
    console.log(`rows still without a description: ${left}`)
  }
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
