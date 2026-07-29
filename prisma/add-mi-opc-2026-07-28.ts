// One-off: add the 6 Michigan OPC congregations that are in the OPC locator but missing from the directory
// (user-approved 2026-07-28). Data verified against opc.org/church.html?church_id=N.
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const API_KEY = process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyAlbr6hJiUMhkkcB8EgFOEmy_p3czP8Rqc'

const OPC_BASE =
  'Westminster Standards. OPC; covenantal, rejects dispensationalism. Added 2026-07-28 from the official OPC congregation locator - it was in the OPC directory but missing from this database. No statement on abortion or sanctity of life found (2026-07). '

const stances = {
  zionistStance: 'no',
  abolitionStance: 'incrementalist',
  eschatology: 'amill',
  theonomy: 'non_theonomic',
  federalVision: 'critical',
  sexualityStance: 'traditional',
  genderStance: 'complementarian',
  stanceBasis: 'denominational_default',
  researchStatus: 'researched',
  approved: true,
}

const churches = [
  {
    name: 'New Hope Reformed Church',
    denomination: 'OPC',
    address: '507 E Cinnebar St',
    city: 'Bessemer', state: 'MI', zip: '49911',
    website: null as string | null,
    phone: '(616) 490-0931',
    email: null as string | null,
    leadership: 'No installed pastor; contact is Kent Van Timmeren',
    theologicalNotes: OPC_BASE + 'A small northern-Michigan work in the Presbytery of Wisconsin and Minnesota (not Michigan and Ontario, unlike every other MI OPC congregation). Meets in the Bessemer Christ Community SDA building at 507 E. Cinnebar St.; services at 3:30 p.m., with the third Sunday of the month a full worship service. No installed pastor - Kent Van Timmeren is the contact.',
    recordFlag: 'in_transition',
    sourceUrls: 'https://opc.org/church.html?church_id=542',
    geo: 'Bessemer Christ Community Seventh-day Adventist Church, 507 E Cinnebar St, Bessemer, MI 49911',
  },
  {
    name: 'Living Hope Orthodox Presbyterian Church',
    denomination: 'OPC',
    address: '1253 144th Ave',
    city: 'Dorr', state: 'MI', zip: '49335',
    website: 'https://www.lhopc.com/',
    phone: '(616) 250-3959',
    email: 'pastor@lhopc.com',
    leadership: 'Pastor: John Terrell',
    theologicalNotes: OPC_BASE + 'A church plant in Dorr and a daughter church of Harvest OPC in Wyoming, MI (#3340). Meets at Moline Christian School, 1253 144th Ave, Moline. In its own words it seeks "to be a blessing to our community as we seek to minister to it through the faithful preaching of the gospel." Presbytery of Michigan and Ontario.',
    recordFlag: null as string | null,
    sourceUrls: 'https://opc.org/church.html?church_id=493;https://www.lhopc.com/',
    geo: 'Moline Christian School, 1253 144th Ave, Moline, MI 49335',
  },
  {
    name: 'Ascension Orthodox Presbyterian Church',
    denomination: 'OPC',
    address: '1110 Wealthy St SE',
    city: 'Grand Rapids', state: 'MI', zip: '49506',
    website: 'https://www.ascensionchurchgr.org/',
    phone: '(616) 634-2123',
    email: 'jdavison@ascensionchurchgr.org',
    leadership: 'Pastor: Jacey Davison',
    theologicalNotes: OPC_BASE + 'Mailing address 1441 Colorado Ave SE, Grand Rapids MI 49508; the congregation meets at 1110 Wealthy St SE. Services 11:30 a.m. and 5:30 p.m. Presbytery of Michigan and Ontario.',
    recordFlag: null as string | null,
    sourceUrls: 'https://opc.org/church.html?church_id=535;https://www.ascensionchurchgr.org/',
    geo: '1110 Wealthy St SE, Grand Rapids, MI 49506',
  },
  {
    name: 'Reformation Orthodox Presbyterian Church',
    denomination: 'OPC',
    address: '2565 Forest Hill Ave SE, Suite 101',
    city: 'Grand Rapids', state: 'MI', zip: '49546',
    website: 'https://www.reformationgr.org',
    phone: '(616) 481-8692',
    email: 'info@reformationopcgr.org',
    leadership: 'Pastor: Dr. David C. Noe (ordained June 2020, installed as pastor October 2022)',
    theologicalNotes: OPC_BASE + 'STANDOUT FIGURE: Dr. David C. Noe holds a PhD in Classics from the University of Iowa (2003) and taught at Calvin University from 2007 to 2021, chairing the Philosophy Department and teaching across Philosophy, Classics and History. He is a prolific translator of sixteenth- and seventeenth-century Reformed and classical texts - Franciscus Junius, Theodore Beza, William Perkins, John Calvin and others - teaches for Puritan Reformed Theological Seminary, contributes to Reformed Forum, and runs LatinPerDiem. Presbytery of Michigan and Ontario.',
    recordFlag: null as string | null,
    sourceUrls: 'https://opc.org/church.html?church_id=464;https://www.reformationopcgr.org/who-we-are;https://prts.edu/profile/david-noe/;https://reformedforum.org/people/david-noe/',
    geo: '2565 Forest Hill Ave SE, Grand Rapids, MI 49546',
  },
  {
    name: 'River Presbyterian Church',
    denomination: 'OPC',
    address: '1053 Leonard St NW',
    city: 'Grand Rapids', state: 'MI', zip: '49504',
    website: 'https://www.riveropc.org/',
    phone: '(616) 263-1381',
    email: 'wayneveenstra@riveropc.org',
    leadership: 'Pastor: Wayne Veenstra',
    theologicalNotes: OPC_BASE + 'A church plant under the oversight of Harvest OPC in Wyoming, MI (#3340) - Pastor Wayne Veenstra is also listed among Harvest\'s associate pastors. Mailing address c/o Harvest OPC, 930 52nd St SW, Wyoming MI 49509; the congregation meets in the West Leonard Christian Reformed Church building at 1053 Leonard St NW. Services 11:00 a.m. Presbytery of Michigan and Ontario.',
    recordFlag: null as string | null,
    sourceUrls: 'https://opc.org/church.html?church_id=545;https://www.riveropc.org/',
    geo: 'West Leonard Christian Reformed Church, 1053 Leonard St NW, Grand Rapids, MI 49504',
  },
  {
    name: 'Grace Fellowship Orthodox Presbyterian Church',
    denomination: 'OPC',
    address: '435 W Main Ave, Suite 30',
    city: 'Zeeland', state: 'MI', zip: '49464',
    website: 'https://www.gracefellowshipopc.com',
    phone: '(616) 741-9151',
    email: 'pastor@gracefellowshipopc.com',
    leadership: 'Pastor: Michael Schout',
    theologicalNotes: OPC_BASE + 'Services 10:30 a.m. and 5:30 p.m., Sunday school 9:30 a.m. The congregation describes itself as "a place for all people and ages to worship the Living God" and aims "to serve the Lord in Zeeland for many years to come." Presbytery of Michigan and Ontario.',
    recordFlag: null as string | null,
    sourceUrls: 'https://opc.org/church.html?church_id=476;https://www.gracefellowshipopc.com',
    geo: '435 W Main Ave, Zeeland, MI 49464',
  },
]

async function geocode(query: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'places.location,places.formattedAddress,places.displayName',
      },
      body: JSON.stringify({ textQuery: query, maxResultCount: 1 }),
    })
    if (!res.ok) { console.log(`   geocode HTTP ${res.status}`); return null }
    const data = await res.json()
    const place = data.places?.[0]
    if (!place?.location) return null
    console.log(`   geocoded -> ${place.formattedAddress}`)
    return { lat: place.location.latitude, lng: place.location.longitude }
  } catch (e) { console.log(`   geocode error: ${String(e).slice(0, 120)}`); return null }
}

async function main() {
  for (const c of churches) {
    const existing = await prisma.church.findFirst({ where: { name: c.name, state: 'MI' } })
    if (existing) { console.log(`SKIP (already present): #${existing.id} ${c.name}`); continue }

    console.log(`${c.name} (${c.city}, MI)`)
    const coords = await geocode(c.geo)
    const { geo, ...data } = c
    const created = await prisma.church.create({
      data: {
        ...data,
        ...stances,
        latitude: coords?.lat ?? null,
        longitude: coords?.lng ?? null,
        lastResearchedAt: new Date(),
        researchNote: '2026-07-28: added from the official OPC congregation locator during the Michigan completion pass.',
      },
    })
    console.log(`   created #${created.id}${coords ? '' : '  (NO COORDS - needs geocoding)'}`)
  }

  const total = await prisma.church.count()
  const mi = await prisma.church.count({ where: { state: 'MI' } })
  const noCoords = await prisma.church.count({ where: { OR: [{ latitude: null }, { longitude: null }] } })
  console.log(`\nTotal churches: ${total} | MI: ${mi} | missing coords: ${noCoords}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
