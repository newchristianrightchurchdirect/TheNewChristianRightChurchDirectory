// Add the Michigan confessional-Baptist / independent congregations missing from the directory.
// Found via the Founders Ministries church search (24 MI listings, only 6 were in the DB),
// the International Reformed Baptist Church Directory, and ReformedWiki; each was then
// researched individually on its own website for address, leadership and confession.
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const API_KEY = process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyAlbr6hJiUMhkkcB8EgFOEmy_p3czP8Rqc'

const FOUNDERS = 'https://church.founders.org/church-location/michigan/'
const NO_ABORTION = ' No statement on abortion or sanctity of life found on the church site (2026-07).'

// Confessional Reformed Baptist defaults used elsewhere in this DB.
const rb = {
  zionistStance: 'no', abolitionStance: 'incrementalist', eschatology: 'amill', theonomy: 'non_theonomic',
  federalVision: 'critical', sexualityStance: 'traditional', genderStance: 'complementarian',
  stanceBasis: 'denominational_default',
}
// For churches that publicly affirm Danvers / Nashville / Dallas: those three fields are EVIDENCED.
const rbEvidenced = { ...rb, socialJusticeStance: 'anti_crt', stanceBasis: 'evidenced' }
// For churches with no published confession: only what is safe.
const thin = { sexualityStance: 'traditional', genderStance: 'complementarian', stanceBasis: 'mixed' }

const churches = [
  {
    name: 'Immanuel Church (Holland)', denomination: 'Non-Denominational',
    address: '325 104th Ave', city: 'Holland', zip: '49423',
    phone: '(616) 392-1814', email: 'info@immanuel.cc', website: 'https://www.immanuel.cc',
    leadership: 'Pastor: Alyn Goossen',
    notes: 'Large independent congregation (roughly 1,000 members) listed on the Founders Ministries church search, which indicates agreement with Founders\' confessional Calvinistic-Baptist values. The church publishes no confession or denominational affiliation on its site, so its doctrinal standard is unconfirmed and the stance fields are held to what is safe.' + NO_ABORTION,
    flag: 'denom_ambiguous', src: FOUNDERS + ';https://www.immanuel.cc', stances: thin,
  },
  {
    name: 'First Baptist Church of Howell', denomination: 'Baptist',
    address: '210 Church St', city: 'Howell', zip: '48843',
    phone: '(517) 546-2830', email: null, website: 'https://www.fbchowell.com',
    leadership: 'Pastor: Garth Kassner (since May 2025)',
    notes: 'Listed on the Founders Ministries church search (confessional Calvinistic Baptist values). Pastor Garth Kassner began in May 2025. NOTE: this building at 210 Church St is also the meeting place of #51 Christ Church of Livingston County (CREC), which worships there at 11:30 a.m. - two distinct congregations sharing a building, not a duplicate record. The church\'s site uses a self-signed certificate, so it could not be fetched directly.' + NO_ABORTION,
    flag: null, src: FOUNDERS + ';https://www.fbchowell.com', stances: thin,
  },
  {
    name: 'Calvary Church (Webberville)', denomination: 'Converge',
    address: '500 N Howard St', city: 'Webberville', zip: '48892',
    phone: '(517) 521-4700', email: null, website: 'https://webbervillechurch.org/',
    leadership: 'Pastor: Kevin Pierpont',
    notes: 'Converge (Baptist General Conference) congregation that affirms the **1689 Second London Baptist Confession** and the **Abstract of Principles** - a genuinely confessional Baptist church inside a broad-evangelical network. Describes itself as "a Bible-believing, friendly, come-as-you-are church" with blended worship. Site moved from calvarychurch.xyz to webbervillechurch.org.' + NO_ABORTION,
    flag: null, src: FOUNDERS + ';https://webbervillechurch.org/', stances: rb,
  },
  {
    name: 'City Gates Church (Byron Center)', denomination: 'Reformed Baptist',
    address: '7979 Kalamazoo Ave SE', city: 'Byron Center', zip: '49315',
    phone: '(616) 848-6156', email: null, website: 'https://citygateschurch.com',
    leadership: 'Founding Pastor: Brian Robinson',
    notes: 'Independent congregation affirming both the **1689 Second London Baptist Confession** and the New Hampshire Confession. Founded 2025 and still small (about 20 members); meets at South Christian High School, 7979 Kalamazoo Ave SE, with a mailing address of P.O. Box 163, Byron Center MI 49315. A church plant worth re-checking as it establishes itself.' + NO_ABORTION,
    flag: null, src: FOUNDERS + ';https://citygateschurch.com', stances: rb,
  },
  {
    name: 'Redeemer Bible Church (Byron Center)', denomination: 'Reformed Baptist',
    address: '8840 Byron Center Ave SW', city: 'Byron Center', zip: '49315',
    phone: '(616) 896-8314', email: 'admin@redeemerwestmichigan.org', website: 'https://redeemerwestmichigan.org',
    leadership: 'Lead Pastor: Aaron Meares (since the church\'s founding in 2011)',
    notes: 'Also known as Redeemer West Michigan; founded 2011, roughly 80 members. Listed on the Founders Ministries church search. Lead Pastor Aaron Meares was converted in 1991 reading Isaiah 52-53, holds a B.A. from Judson University (1994) and a Master of Ministry from Bethel College (2008), and has over twenty years of pastoral experience across Illinois, Indiana and Michigan. The church publishes a statement of faith but names no formal confession.' + NO_ABORTION,
    flag: null, src: FOUNDERS + ';https://redeemerwestmichigan.org;https://redeemerwestmichigan.org/our-pastor', stances: thin,
  },
  {
    name: 'Plymouth Township Baptist Church', denomination: 'SBC',
    address: '14356 Genoa Ct', city: 'Plymouth', zip: '48170',
    phone: '(248) 222-3831', email: 'plymouthtownshipbc@gmail.com', website: 'https://www.plymouthtownshipbaptist.org/',
    leadership: 'Pastor: Scott Belsley',
    notes: 'Elder-led congregational church describing itself as "Reformed and baptistic." Founded 2025. Affiliations: Southern Baptist Convention, the **Pillar Network**, ACME and **9Marks**. Affirms the Abstract of Principles, the New Hampshire Confession, the Baptist Faith & Message 2000, the Chicago Statement on Biblical Inerrancy, the **Danvers Statement** (complementarian - EVIDENCED), the **Nashville Statement** (traditional sexuality - EVIDENCED) and **The Statement on Social Justice and the Gospel** (Dallas Statement - anti-CRT, EVIDENCED). Meets at Ivywood Classical Academy near M-14 & Beck Rd.' + NO_ABORTION,
    flag: null, src: FOUNDERS + ';https://www.plymouthtownshipbaptist.org/', stances: rbEvidenced,
  },
  {
    name: 'Maple Avenue Bible Church (Adrian)', denomination: 'Reformed Baptist',
    address: '735 W Maple Ave', city: 'Adrian', zip: '49221',
    phone: '(517) 263-8580', email: 'mabc2@frontier.com', website: 'https://mabcadrian.com',
    leadership: 'Pastor: Andrew Thurlow',
    notes: 'Independent, elder-led congregation founded 1954, roughly 70 members, affiliated with **G3 Ministries**. Affirms the Baptist Faith & Message 2000, the Abstract of Principles and the New Hampshire Confession, plus the Chicago Statement on Biblical Inerrancy, the **Danvers Statement** (complementarian - EVIDENCED), the **Nashville Statement** (traditional sexuality - EVIDENCED) and **The Statement on Social Justice and the Gospel** (Dallas Statement - anti-CRT, EVIDENCED). Emphasises verse-by-verse expository preaching and "God-centered living."' + NO_ABORTION,
    flag: null, src: FOUNDERS + ';https://mabcadrian.com', stances: rbEvidenced,
  },
  {
    name: 'Trinity Bible Church (Edwardsburg)', denomination: 'Baptist',
    address: '69950 M-62', city: 'Edwardsburg', zip: '49112',
    phone: '(269) 430-7779', email: null, website: 'https://www.mytrinitybible.com/',
    leadership: 'Pastor: Gebriell Sierra',
    notes: 'Listed on the Founders Ministries church search (confessional Calvinistic Baptist values). The church publishes no confession or denominational affiliation on its site, so stances are held to what is safe. Site moved from trinityedwardsburg.org to mytrinitybible.com.' + NO_ABORTION,
    flag: 'denom_ambiguous', src: FOUNDERS + ';https://www.mytrinitybible.com/', stances: thin,
  },
  {
    name: 'Sovereign Grace Baptist Church (Swartz Creek)', denomination: 'Reformed Baptist',
    address: '5069 Fairchild St', city: 'Swartz Creek', zip: '48473',
    phone: '(810) 373-2828', email: null, website: 'https://sovereigngracebaptistchurch.com',
    leadership: 'Pastor: Jim Aydelotte',
    notes: 'Sovereign-grace Baptist congregation listed on the Founders Ministries church search. The site describes its theology in **New Covenant Theology** terms rather than naming the 1689 Confession, which is a meaningful distinction in Reformed Baptist circles (NCT churches reject the classic 1689-federalism covenant scheme) - eschatology, theonomy and Federal Vision are therefore left unknown. Formed when the congregations of Faith Bible Church of Vernon and Sovereign Grace Baptist of Swartz Creek came together as one body.' + NO_ABORTION,
    flag: 'denom_ambiguous', src: FOUNDERS + ';https://sovereigngracebaptistchurch.com',
    stances: { zionistStance: 'no', abolitionStance: 'incrementalist', sexualityStance: 'traditional', genderStance: 'complementarian', stanceBasis: 'mixed' },
  },
  {
    name: 'Solid Rock Community Church (Burton)', denomination: 'Non-Denominational',
    address: '2222 S Belsay Rd', city: 'Burton', zip: '48519',
    phone: '(810) 715-2600', email: 'info@SolidRockCommunity.org', website: 'https://www.solidrockcommunity.org',
    leadership: 'Pastor: Zach San Miguel (the Founders directory still lists Don Chapin - verify which is current)',
    notes: 'Independent community church listed on the Founders Ministries church search. PASTOR CONFLICT: the church\'s own site names Zach San Miguel while the Founders listing still shows Don Chapin; both recorded pending confirmation. No confession or denominational affiliation published.' + NO_ABORTION,
    flag: 'denom_ambiguous', src: FOUNDERS + ';https://www.solidrockcommunity.org', stances: thin,
  },
  {
    name: 'Berean Bible Church (Livonia)', denomination: 'Reformed Baptist',
    address: '35375 Ann Arbor Trail', city: 'Livonia', zip: '48150',
    phone: '(734) 425-5585', email: 'hello@bereanbiblelivonia.org', website: 'https://bereanbiblelivonia.org/',
    leadership: 'Pastor: Jonathan Hackett',
    notes: 'Independent Reformed Baptist congregation founded 1963, roughly 60 members, affirming the **1689 Second London Baptist Confession**. Also affirms statements on biblical inerrancy, complementarianism (**Danvers** - EVIDENCED) and social justice (**Dallas Statement** - anti-CRT, EVIDENCED).' + NO_ABORTION,
    flag: null, src: FOUNDERS + ';https://bereanbiblelivonia.org/', stances: rbEvidenced,
  },
  {
    name: 'Faith Baptist Church (Kentwood)', denomination: 'Converge',
    address: '1412 44th St SE', city: 'Kentwood', zip: '49508',
    phone: '(616) 345-0963', email: 'office@faithon44th.com', website: 'https://www.faithon44th.com/',
    leadership: 'Lead Pastor: Matt Stone',
    notes: 'Elder-led Baptist congregation in the Converge MidAmerica network, known locally as "Faith on 44th," listed on the Founders Ministries church search. Describes itself as a "Kingdom-minded, Christ-exalting, multigenerational community." No formal confession published on the site.' + NO_ABORTION,
    flag: null, src: FOUNDERS + ';https://www.faithon44th.com/;https://www.converge.org/midamerica/about/church/faith-baptist-church-kentwood', stances: thin,
  },
  {
    name: 'Colon Baptist Church', denomination: 'GARBC',
    address: '200 Frank Ave', city: 'Colon', zip: '49040',
    phone: '(269) 432-2358', email: null, website: 'https://www.colonbaptist.com/',
    leadership: 'Pastor: Jeff Minniear (Continental Baptist Missions)',
    notes: 'Independent Baptist church in fellowship with the **General Association of Regular Baptist Churches (GARBC)**, listed on the Founders Ministries church search. Pastor Jeff Minniear and his wife Deb are Continental Baptist Missions church-planting/revitalisation workers of 37 years; the congregation asked them to reinvigorate the church in June 2022, so this is a revitalisation work.' + NO_ABORTION,
    flag: null, src: FOUNDERS + ';https://www.colonbaptist.com/about-us;https://www.faithstreet.com/church/colon-baptist-church-colon-mi', stances: thin,
  },
  {
    name: 'Harvest Bible Church (Westland)', denomination: 'Reformed Baptist',
    address: '6420 N Newburgh Rd', city: 'Westland', zip: '48185',
    phone: '(734) 895-3280', email: null, website: 'https://harvestdetroitwest.org',
    leadership: 'Pastor: Mike Moses; also preaching: Mike Hanafee',
    notes: 'Independent congregation founded 2003, roughly 450 members - one of the larger confessional Baptist churches in metro Detroit. Affirms the **Abstract of Principles**, the Chicago Statement on Biblical Inerrancy, the **Danvers Statement** (complementarian - EVIDENCED), the **Nashville Statement** (traditional sexuality - EVIDENCED) and **The Statement on Social Justice and the Gospel** (Dallas Statement - anti-CRT, EVIDENCED). Emphasises expository preaching: "the Word of God is preached without apology."' + NO_ABORTION,
    flag: null, src: FOUNDERS + ';https://harvestdetroitwest.org', stances: rbEvidenced,
  },
  {
    name: "The River's Edge Church (Caseville)", denomination: 'Reformed Baptist',
    address: '6750 Main St', city: 'Caseville', zip: '48725',
    phone: '(989) 453-3435', email: 'theriversedgecaseville@gmail.com', website: 'http://theriversedgeonline.com/',
    leadership: "Senior Pastor: John Gunden; Associate Pastor: Ryan Badgerow",
    notes: 'Reformed Baptist congregation in Michigan\'s Thumb referencing the **1689 Baptist Confession of Faith**. Mailing address 7267 W. Michigan Ave, P.O. Box 49, Pigeon MI 48755. Stated purpose: "Glorify God, Proclaim His Gospel, Grow in Christ, Serve His Church."' + NO_ABORTION,
    flag: null, src: FOUNDERS + ';http://theriversedgeonline.com/', stances: rb,
  },
  {
    name: 'Redeeming Grace Church (Southgate)', denomination: 'Reformed Baptist',
    address: '15700 Leroy St', city: 'Southgate', zip: '48195',
    phone: '(734) 282-0115', email: 'info@redeeminggracesouthgate.org', website: 'https://www.redeeminggracesouthgate.org/',
    leadership: 'Senior Pastor: Kevin Godin; Elders: Pastor Chris and Pastor Craig (surnames not published)',
    notes: 'Gospel-centred congregation in Downriver Detroit listed on the Founders Ministries church search; plural eldership. The site names no formal confession, so stances are held to what is safe.' + NO_ABORTION,
    flag: 'denom_ambiguous', src: FOUNDERS + ';https://www.redeeminggracesouthgate.org/', stances: thin,
  },
  {
    name: 'Grace Community Church (Battle Creek)', denomination: 'Reformed Baptist',
    address: '9037 Pennfield Rd', city: 'Battle Creek', zip: '49014',
    phone: '(269) 963-6606', email: null, website: 'https://www.bcgrace.net',
    leadership: 'Pastor: Nick Snellgrove',
    notes: 'Listed on the Founders Ministries church search. Describes itself as "Glorifying God by being Bible centered and Gospel focused," Christ-centred with expository preaching. No formal confession published on the site.' + NO_ABORTION,
    flag: 'denom_ambiguous', src: FOUNDERS + ';https://www.bcgrace.net', stances: thin,
  },
  {
    name: 'Spurgeon Heritage Church (Holland)', denomination: 'Reformed Baptist',
    address: '665 136th Ave', city: 'Holland', zip: '49424',
    phone: null, email: null, website: 'http://www.spurgeonheritage.org/',
    leadership: 'Pastor: Gerin Woodbury',
    notes: 'Reformed Baptist congregation listed both on the Founders Ministries church search and in the International Reformed Baptist Church Directory. Confirmed still active as of January 2025 under Pastor Gerin Woodbury. NOTE: the church website returned HTTP 500 on repeated fetches in July 2026 - re-check whether the site is simply down or the congregation has folded.' + NO_ABORTION,
    flag: 'in_transition', src: FOUNDERS + ';http://www.spurgeonheritage.org/;https://www.reformedreader.org/rbmichigan.htm', stances: rb,
  },
  {
    name: 'Reformed Baptist Church of Kalamazoo', denomination: 'Reformed Baptist',
    address: '454 S Drake Rd', city: 'Kalamazoo', zip: '49009',
    phone: '(269) 344-2783', email: null, website: 'https://rbckalamazoo.org',
    leadership: 'Elders: Allan Kenitz, Josh Armstrong, Scott Penning, Don Tinney; Deacons: Aaron Bergren, Mike Bogard, Jon Hutchens, Jon Mayhew, James Steele, Mike Trexler',
    notes: 'Reformed Baptist congregation with a four-man plural eldership; explicitly holds to "qualified leadership, plural leadership, and male leadership." Publishes a confession of faith and church constitution without naming the confession on the leadership page. NOTE: older directories place this church at 708 Nichols Rd - that building is now Good Shepherd Presbyterian (PCA); the congregation is at 454 S Drake Rd.' + NO_ABORTION,
    flag: null, src: 'https://rbckalamazoo.org;https://rbckalamazoo.org/about/leadership/;https://www.reformedreader.org/rbmichigan.htm', stances: rb,
  },
  {
    name: 'Cornerstone Bible Church (Sault Ste. Marie)', denomination: 'Reformed Baptist',
    address: '2000 Ryan Ave', city: 'Sault Ste. Marie', zip: '49783',
    phone: '(906) 440-6406', email: null, website: null,
    leadership: null,
    notes: 'Listed as a Reformed Baptist congregation in the ReformedWiki Michigan list; mailing address P.O. Box 782. NEEDS VERIFICATION: the domain soocornerstonebiblechurch.com no longer resolves and no pastor could be identified from any source checked, so this record is thin - a phone call to (906) 440-6406 would settle it. Note a separate "Reformed Baptist Church of Sault Ste Marie" also appears in registry data at 1705 Davitt; confirm whether these are the same body under two names.' + NO_ABORTION,
    flag: 'denom_ambiguous', src: 'https://reformedwiki.com/reformed-churches/michigan;https://www.reformedreader.org/rbmichigan.htm', stances: thin,
  },
]

async function geocode(query: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': API_KEY, 'X-Goog-FieldMask': 'places.location' },
      body: JSON.stringify({ textQuery: query, maxResultCount: 1 }),
    })
    if (!res.ok) return null
    const place = (await res.json()).places?.[0]
    return place?.location ? { lat: place.location.latitude, lng: place.location.longitude } : null
  } catch { return null }
}

async function main() {
  let added = 0
  for (const c of churches) {
    const existing = await prisma.church.findFirst({ where: { state: 'MI', address: c.address, city: c.city } })
    if (existing) { console.log(`SKIP (already #${existing.id}): ${c.name}`); continue }

    const coords = await geocode(`${c.address}, ${c.city}, MI ${c.zip}`)
    const created = await prisma.church.create({
      data: {
        name: c.name, denomination: c.denomination, address: c.address, city: c.city, state: 'MI', zip: c.zip,
        phone: c.phone, email: c.email, website: c.website, leadership: c.leadership,
        theologicalNotes: c.notes, recordFlag: c.flag, sourceUrls: c.src,
        latitude: coords?.lat ?? null, longitude: coords?.lng ?? null,
        researchStatus: 'researched', approved: true, lastResearchedAt: new Date(),
        researchNote: '2026-07-29: added during the Michigan independent/confessional-Baptist sweep (Founders Ministries church search + Reformed Baptist directories), then researched individually on the church website.',
        ...c.stances,
      },
    })
    console.log(`#${created.id}  ${c.name}${coords ? '' : '  [NO COORDS]'}`)
    added++
  }
  const mi = await prisma.church.count({ where: { state: 'MI' } })
  const noCoords = await prisma.church.count({ where: { OR: [{ latitude: null }, { longitude: null }] } })
  console.log(`\nAdded ${added}. MI churches: ${mi} | total: ${await prisma.church.count()} | missing coords: ${noCoords}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
