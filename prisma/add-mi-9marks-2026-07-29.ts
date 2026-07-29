// Add the Michigan congregations found on the 9Marks church search that were missing here.
//
// STANCE POLICY FOR THIS BATCH: 9Marks membership is real evidence for two things only —
// the network is explicitly complementarian and traditional on sexuality, and a listed church
// has affirmed that. It says nothing about eschatology, theonomy, Zionism, abolition or
// cultural engagement, so those stay `unknown`. Most of these are broad-evangelical rather
// than confessional Reformed; that is recorded plainly rather than dressed up.
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const API_KEY = process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyAlbr6hJiUMhkkcB8EgFOEmy_p3czP8Rqc'

const SRC = 'https://www.9marks.org/church-search/'
const NINE = ' Listed on the 9Marks church search, which requires affirming expositional preaching, meaningful membership, elder leadership and complementarianism — that is the basis for the gender and sexuality stances here. Added 2026-07-29 during the Michigan gap sweep. No statement on abortion or cultural engagement found; those fields are deliberately left unknown.'

type Row = {
  name: string; denom: string; address: string; city: string; zip: string
  phone?: string | null; website?: string | null; leadership?: string | null; notes: string; flag?: string | null
}

const churches: Row[] = [
  { name: 'Calvary Bible Church East', denom: 'Bible Church', address: '5495 E Main St', city: 'Kalamazoo', zip: '49048', phone: null, website: 'https://calvaryeast.com/', leadership: 'Pastor: Bryan Craddock',
    notes: 'Independent, non-denominational congregation governed by a council of elders and deacons; gospel-centred verse-by-verse exposition, roughly 150 in Sunday worship. Pastor Bryan Craddock holds a B.A. and M.Div. from The Master\'s College and Seminary and a D.Min. from Southern Baptist Theological Seminary — a MacArthur-orbit training profile. The strongest confessional fit in this batch.' + NINE },
  { name: 'Bethesda Baptist Church (Allen Park)', denom: 'Independent Baptist', address: '10000 Reeck Rd', city: 'Allen Park', zip: '48101', phone: '(313) 383-8900', website: 'http://www.bethesdabaptist.us/', leadership: 'Pastors: Bob Moore, David Harrison, Joshua Evans, Ken Keilman',
    notes: 'Independent Baptist congregation with a plurality of pastors, in the orbit of Inter-City Baptist School. Also listed in The Gospel Coalition\'s Michigan church directory. Stated mission: "to reflect God\'s glory and delight in Him by extolling the name of Jesus Christ, equipping His people, and proclaiming to all His saving grace."' + NINE },
  { name: 'Trinity Baptist Church (Grand Rapids)', denom: 'GARBC', address: '2050 Aberdeen St NE', city: 'Grand Rapids', zip: '49505', phone: '(616) 361-2802', website: 'http://trinitybaptistgr.com/', leadership: null,
    notes: 'General Association of Regular Baptist Churches (GARBC) congregation.' + NINE },
  { name: 'Cornerstone Baptist Church (Roseville)', denom: 'SBC', address: '17017 E Twelve Mile Rd', city: 'Roseville', zip: '48066', phone: null, website: 'https://cbcroseville.org/', leadership: 'Senior Pastor: Robert (Bob) Johnson II (since 1989)',
    notes: 'Southern Baptist Convention congregation formed in 1983 by the merger of Beulah Baptist and Gratiot Avenue Baptist churches.' + NINE },
  { name: 'Maranatha Bible Church (Comstock Park)', denom: 'Bible Church', address: '4426 Stony Creek Ave NW', city: 'Comstock Park', zip: '49321', phone: '(616) 784-5905', website: 'https://www.mbcmi.org/', leadership: null,
    notes: 'Independent Bible church affiliated with the IFCA. Stated purpose: "to display God\'s glory, declare God\'s truth, delight in God\'s Son, and disciple God\'s people."' + NINE },
  { name: 'Berkley Community Church', denom: 'Converge', address: '2855 Wiltshire Rd', city: 'Berkley', zip: '48072', phone: '(248) 544-2052', website: 'https://bcchurch.com/', leadership: 'Lead Pastor: Adam Groh (senior pastor since 2012)',
    notes: 'Community church of 105+ years, associated with Converge and reported also with the IFCA; conservative Bible teaching.' + NINE, flag: 'denom_ambiguous' },
  { name: 'Grace Community Church (Hudsonville)', denom: 'Non-Denominational', address: '3500 New Holland St', city: 'Hudsonville', zip: '49426', phone: null, website: 'https://www.gracehudsonville.org/', leadership: 'Lead Pastor: Keoni Hughes (since 2019)',
    notes: 'Independent congregation since 11 June 1978, having begun under the "sheltering wing" of Hudsonville Baptist Church.' + NINE },
  { name: 'Georgetown Grace Church', denom: 'Grace Gospel Fellowship', address: '8379 36th Ave', city: 'Hudsonville', zip: '49426', phone: '(616) 669-1026', website: 'https://georgetowngracechurch.org/', leadership: 'Pulpit supply following Pastor Bob Davis; contact listed as Pastor Jared',
    notes: 'Grace Gospel Fellowship congregation. **FIT CAVEAT**: the GGF is a mid-Acts ("hyper-") dispensational body, which sits a long way from this directory\'s covenantal centre of gravity — recorded accurately rather than filed as Reformed.' + NINE, flag: 'denom_ambiguous' },
  { name: 'Bella Vista Church', denom: 'Non-Denominational', address: '5100 Belding Rd NE', city: 'Rockford', zip: '49341', phone: '(616) 874-7727', website: null, leadership: null,
    notes: 'Non-denominational evangelical congregation, "not tied to any particular denomination... solidly in the Evangelical, Protestant tradition." **VERIFY**: some listings describe a Bella Vista campus of Ada Bible Church at this address, so it may be a multisite campus rather than an independent congregation.' + NINE, flag: 'denom_ambiguous' },
  { name: 'Evangel Ministries (Detroit)', denom: 'Non-Denominational', address: '13660 Stansbury Ave', city: 'Detroit', zip: '48227', phone: null, website: null, leadership: 'Senior Pastor: Christopher W. Brooks (since 2003)',
    notes: 'Large Detroit congregation (~1,600 members) founded 1964. Senior Pastor Christopher Brooks is campus dean of Moody Theological Seminary and a widely published voice, associated with the ERLC and the Acton Institute. **FIT CAVEAT**: that is a mainstream-evangelical institutional profile rather than this directory\'s orbit; recorded for accuracy.' + NINE, flag: 'denom_ambiguous' },
]

async function geo(q: string) {
  try {
    const r = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': API_KEY, 'X-Goog-FieldMask': 'places.location' },
      body: JSON.stringify({ textQuery: q, maxResultCount: 1 }),
    })
    if (!r.ok) return null
    const pl = (await r.json()).places?.[0]
    return pl?.location ? { lat: pl.location.latitude, lng: pl.location.longitude } : null
  } catch { return null }
}

async function main() {
  for (const c of churches) {
    const dupe = await prisma.church.findFirst({ where: { state: 'MI', address: c.address, city: c.city } })
    if (dupe) { console.log(`SKIP (already #${dupe.id}): ${c.name}`); continue }
    const g = await geo(`${c.address}, ${c.city}, MI ${c.zip}`)
    const created = await prisma.church.create({
      data: {
        name: c.name, denomination: c.denom, address: c.address, city: c.city, state: 'MI', zip: c.zip,
        phone: c.phone ?? null, website: c.website ?? null, leadership: c.leadership ?? null,
        theologicalNotes: c.notes, recordFlag: c.flag ?? null, sourceUrls: SRC + (c.website ? ';' + c.website : ''),
        latitude: g?.lat ?? null, longitude: g?.lng ?? null,
        sexualityStance: 'traditional', genderStance: 'complementarian', stanceBasis: 'mixed',
        researchStatus: 'researched', approved: true, lastResearchedAt: new Date(),
        researchNote: '2026-07-29: found on the 9Marks church search during the Michigan gap sweep and researched individually. Gender/sexuality from 9Marks membership requirements; all other stances left unknown.',
      },
    })
    console.log(`#${created.id}  ${c.name} (${c.city})${g ? '' : '  [NO COORDS]'}`)
  }
  console.log(`\nMI: ${await prisma.church.count({ where: { state: 'MI' } })} | total: ${await prisma.church.count()} | missing coords: ${await prisma.church.count({ where: { OR: [{ latitude: null }, { longitude: null }] } })}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
