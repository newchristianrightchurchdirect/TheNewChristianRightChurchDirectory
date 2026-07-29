// Add Michigan congregations found missing from the directory during the 2026-07-29 completeness sweep.
// Sources: Great Lakes Presbytery directory + NAPARC (PCA), NAPARC Classis Michigan (URCNA),
// crechurches.org (CREC), SermonAudio/Vanguard Presbytery (Westminster Presbyterian GR).
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const API_KEY = process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyAlbr6hJiUMhkkcB8EgFOEmy_p3czP8Rqc'

const PCA_SRC = 'https://www.naparcsearch.com/pca/great-lakes;https://greatlakespresbytery.org/churches/'
const PCA_NOTE =
  'Westminster Standards. PCA, Great Lakes Presbytery; covenantal, rejects dispensationalism. Added 2026-07-29 - the congregation is in the Great Lakes Presbytery directory but was missing from this database. No statement on abortion or sanctity of life found (2026-07). '

const westminsterStances = {
  zionistStance: 'no', abolitionStance: 'incrementalist', eschatology: 'amill', theonomy: 'non_theonomic',
  federalVision: 'critical', sexualityStance: 'traditional', genderStance: 'complementarian',
  stanceBasis: 'denominational_default', researchStatus: 'researched', approved: true,
}

const churches = [
  { name: 'Christ the King Presbyterian Church (Hastings)', denomination: 'PCA', address: '328 S Jefferson St', city: 'Hastings', zip: '49058', phone: '(616) 690-8609', website: 'https://christthekinghastings.org', leadership: 'Pastor: Phillip Peter Adams', notes: PCA_NOTE, src: PCA_SRC, stances: westminsterStances },
  { name: 'Cornerstone Presbyterian Church (Muskegon)', denomination: 'PCA', address: '356 W Western Ave', city: 'Muskegon', zip: '49440', phone: '(231) 974-2231', website: 'https://cornerstonepca.church', leadership: 'Pastor: Matthew S. Luchenbill', notes: PCA_NOTE, src: PCA_SRC, stances: westminsterStances },
  { name: 'Faith Presbyterian Church (Grandville)', denomination: 'PCA', address: '3110 Barrett Ave SW', city: 'Grandville', zip: '49418', phone: '(616) 481-3347', website: 'https://fpcgrandville.org', leadership: 'Pastor: Dan Naulty', notes: PCA_NOTE, src: PCA_SRC, stances: westminsterStances },
  { name: 'Fellowship Reformed Church (Mount Pleasant)', denomination: 'PCA', address: '1730 E Pickard St', city: 'Mount Pleasant', zip: '48858', phone: '(989) 236-1145', website: 'https://fellowshipreformedchurch.org', leadership: 'Pastor: Devon Rossman', notes: PCA_NOTE, src: PCA_SRC, stances: westminsterStances },
  { name: 'First Presbyterian Church (Trenton)', denomination: 'PCA', address: '2799 West Rd', city: 'Trenton', zip: '48183', phone: '(734) 676-1510', website: 'https://fpchurch.com', leadership: 'Pastor: Aaron Carr', notes: PCA_NOTE, src: PCA_SRC, stances: westminsterStances },
  { name: 'Good Shepherd Presbyterian Church (Kalamazoo)', denomination: 'PCA', address: '708 Nichols Rd', city: 'Kalamazoo', zip: '49006', phone: '(269) 254-8820', website: 'https://gskalamazoo.org', leadership: 'Pastor: Neil Quinn', notes: PCA_NOTE, src: PCA_SRC, stances: westminsterStances },
  { name: 'Grace Presbyterian Church of Dearborn', denomination: 'PCA', address: '22546 Michigan Ave', city: 'Dearborn', zip: '48124', phone: '(313) 550-9462', website: 'https://gracedearborn.com', leadership: 'Pastor: Jerry Riendeau', notes: PCA_NOTE, src: PCA_SRC, stances: westminsterStances },
  { name: 'Gracehill Church (Grand Rapids)', denomination: 'PCA', address: '1415 Lyon St NE', city: 'Grand Rapids', zip: '49503', phone: '(616) 227-8813', website: 'https://gracehillgr.org', leadership: 'Pastor: Ben Seneker', notes: PCA_NOTE, src: PCA_SRC, stances: westminsterStances },
  { name: 'Hudsonville Reformed Church', denomination: 'PCA', address: '3950 Highland Dr', city: 'Hudsonville', zip: '49426', phone: '(616) 669-1040', website: 'https://hudref.org', leadership: 'Pastor: Chad DeGraff', notes: PCA_NOTE + 'Despite the "Reformed Church" name (a legacy of its RCA origins) this congregation is enrolled in the PCA\'s Great Lakes Presbytery.', src: PCA_SRC, stances: westminsterStances },
  { name: 'Immanuel Presbyterian Church (Clarkston)', denomination: 'PCA', address: '5860 Andersonville Rd', city: 'Waterford', zip: '48329', phone: '(810) 305-3499', website: 'https://immanuelclarkston.com', leadership: 'Pastor: Micah Jelinek', notes: PCA_NOTE + 'Known as Immanuel Clarkston; the building is in Waterford.', src: PCA_SRC, stances: westminsterStances },
  { name: 'Red Tree Presbyterian Church (Ann Arbor)', denomination: 'PCA', address: '530 S State St', city: 'Ann Arbor', zip: '48109', phone: '(734) 746-5022', website: 'https://redtreeannarbor.com', leadership: 'Pastor: Ryan Davis McVicar (founding pastor of New City Presbyterian, Ferndale, 2012-2022)', notes: PCA_NOTE, src: PCA_SRC, stances: westminsterStances },
  { name: 'Sojourn Church (Sterling Heights)', denomination: 'PCA', address: '37680 Van Dyke Ave', city: 'Sterling Heights', zip: '48312', phone: null, website: 'https://sojournsterlingheights.com', leadership: 'Pastor: Steven Van Noort', notes: PCA_NOTE, src: PCA_SRC, stances: westminsterStances },
  { name: 'Trinity Presbyterian Church (Hudsonville)', denomination: 'PCA', address: '3435 Oak St', city: 'Hudsonville', zip: '49426', phone: '(616) 502-7081', website: 'https://trinityhudsonville.org', leadership: 'Pastor: Jeremy Visser', notes: PCA_NOTE, src: PCA_SRC, stances: westminsterStances },

  { name: 'Covenant United Reformed Church (Byron Center)', denomination: 'URCNA', address: '58 100th St', city: 'Byron Center', zip: '49315', phone: '(616) 890-5950', website: 'https://covenanturc.com', leadership: 'Pastor: Rodney Kleyn',
    notes: 'United Reformed Churches in North America (URCNA), Classis Michigan. Three Forms of Unity; covenantal; amillennial; male-only office. Added 2026-07-29 - listed in the URCNA Classis Michigan directory but missing from this database. Not to be confused with #3920 Covenant URC of Kalamazoo. No statement on abortion or sanctity of life found (2026-07). ',
    src: 'https://www.naparcsearch.com/urcna/michigan;https://covenanturc.com', stances: westminsterStances },

  { name: 'Christ the King Presbyterian Church (Shelby)', denomination: 'CREC', address: '2205 Main St', city: 'Shelby', zip: '49455', phone: null, website: 'https://christthekingmi.org/', leadership: 'Pastor: Jeff Swanson',
    notes: 'Communion of Reformed Evangelical Churches (CREC), established 2008. Added 2026-07-29 - listed on the CREC\'s own church directory (which files it under Ferry, MI) but missing from this database; the congregation meets at 2205 Main St, Shelby, Sundays at 9:45 a.m. Pastor Jeff Swanson and his wife Kelle have nine children; he also works at Country Dairy in New Era. CREC-orbit defaults applied (postmillennial, theonomy- and Federal-Vision-sympathetic). No statement on abortion or abolition found (2026-07) - worth a direct ask, as CREC congregations are among the likelier abolitionist holdouts. ',
    src: 'https://crechurches.org/churches/;https://christthekingmi.org/',
    stances: { zionistStance: 'no', abolitionStance: 'incrementalist', eschatology: 'postmill', theonomy: 'sympathetic', federalVision: 'sympathetic', sexualityStance: 'traditional', genderStance: 'complementarian', stanceBasis: 'denominational_default', researchStatus: 'researched', approved: true } },

  { name: 'Westminster Presbyterian Church (Grand Rapids)', denomination: 'Vanguard Presbyterian', address: '501 68th St SE', city: 'Grand Rapids', zip: '49548', phone: null, website: 'https://www.sermonaudio.com/solo/westminstervpc/', leadership: 'Pastor: Dr. Sacha Walicord',
    notes: 'Vanguard Presbyterian Church (Westminster Presbytery) - a continuing conservative Presbyterian denomination governed by the Westminster Standards as adopted by the OPC in 1939 and the PCA in 1973; the Reformed Presbyterian Church in the United States merged into Vanguard in 2020. Added 2026-07-29 - missing from this database entirely. The congregation held its first worship service on 2 July 2023 with over 130 present and meets in the Cutlerville East Christian Reformed Church building at 501 68th St SE, with services at 9:30 a.m. and 5:00 p.m. Pastor Dr. Sacha Walicord is Austrian, educated at the universities of Linz, Salzburg and Klagenfurt, and was an airline pilot and a criminal prosecutor before entering the ministry. Eschatology, theonomy and Federal Vision left UNKNOWN - Vanguard congregations vary and nothing was verified for this church. No statement on abortion or sanctity of life found (2026-07). ',
    src: 'https://www.sermonaudio.com/solo/westminstervpc/;https://vpcwestminsterpresbytery.com/;https://vanguardpresbyterianchurch.com/commitments/',
    stances: { zionistStance: 'no', abolitionStance: 'incrementalist', sexualityStance: 'traditional', genderStance: 'complementarian', stanceBasis: 'mixed', researchStatus: 'researched', approved: true } },
]

async function geocode(query: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': API_KEY, 'X-Goog-FieldMask': 'places.location,places.formattedAddress' },
      body: JSON.stringify({ textQuery: query, maxResultCount: 1 }),
    })
    if (!res.ok) return null
    const place = (await res.json()).places?.[0]
    return place?.location ? { lat: place.location.latitude, lng: place.location.longitude } : null
  } catch { return null }
}

async function main() {
  for (const c of churches) {
    const existing = await prisma.church.findFirst({ where: { state: 'MI', address: c.address, city: c.city } })
    if (existing) { console.log(`SKIP (already present as #${existing.id}): ${c.name}`); continue }

    const coords = await geocode(`${c.address}, ${c.city}, MI ${c.zip}`)
    const created = await prisma.church.create({
      data: {
        name: c.name, denomination: c.denomination, address: c.address, city: c.city, state: 'MI', zip: c.zip,
        phone: c.phone, website: c.website, leadership: c.leadership, theologicalNotes: c.notes,
        sourceUrls: c.src, latitude: coords?.lat ?? null, longitude: coords?.lng ?? null,
        lastResearchedAt: new Date(),
        researchNote: '2026-07-29: added during the Michigan completeness sweep against denominational directories.',
        ...c.stances,
      },
    })
    console.log(`#${created.id}  ${c.name} (${c.city})${coords ? '' : '  [NO COORDS]'}`)
  }
  const mi = await prisma.church.count({ where: { state: 'MI' } })
  const noCoords = await prisma.church.count({ where: { OR: [{ latitude: null }, { longitude: null }] } })
  console.log(`\nMI churches: ${mi} | total: ${await prisma.church.count()} | missing coords: ${noCoords}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
