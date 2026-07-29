// Add the Reformed Protestant Churches (RPC) congregations in Michigan. The federation formed
// 28 May 2021 out of the Protestant Reformed split and had ZERO rows in this directory.
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const API_KEY = process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyAlbr6hJiUMhkkcB8EgFOEmy_p3czP8Rqc'

const BASE = 'Three Forms of Unity (Belgic Confession, Heidelberg Catechism, Canons of Dordt). Amillennial; covenantal; male-only office. '
const stances = {
  zionistStance: 'no', abolitionStance: 'incrementalist', eschatology: 'amill', theonomy: 'non_theonomic',
  federalVision: 'critical', sexualityStance: 'traditional', genderStance: 'complementarian',
  stanceBasis: 'denominational_default', researchStatus: 'researched', approved: true,
}

const churches = [
  {
    name: 'First Reformed Protestant Church', denomination: 'RPC',
    address: '3925 Van Buren St', city: 'Hudsonville', zip: '49426',
    email: 'firstreformedprotestantchurch@gmail.com', website: 'https://firstrpc.org/', phone: null,
    leadership: null,
    notes: BASE + 'THE FOUNDING CONGREGATION of the **Reformed Protestant Churches (RPC)**, a federation formed 28 May 2021 at a meeting of combined councils in Hudsonville. Its origin is the January 2021 Act of Separation signed by members of Byron Center PRC (#3615 in this directory), which began the split from the Protestant Reformed Churches over the doctrinal controversy on grace, works and assurance. The RPC federation began with two congregations: this one and Second Reformed Protestant Church (then meeting in Calumet City, IL). Added 2026-07-29 - the entire RPC federation had zero rows in this directory. No statement on abortion or sanctity of life found (2026-07).',
    src: 'https://firstrpc.org/;https://firstrpc.org/about/;https://reformedbelieverspub.org/article/reformed-protestant-churches/',
  },
  {
    name: 'Remnant Reformed Church', denomination: 'RPC',
    address: '9181 Kenowa Ave SW', city: 'Grand Rapids', zip: '49534',
    email: 'remnantreformedchurch@gmail.com', website: 'https://www.remnantreformedchurch.org/', phone: null,
    leadership: 'Pastor: Rev. Andrew Lanning',
    notes: BASE + 'Organized 22 May 2023 when a deacon and several families left First Reformed Protestant Church (#see First RPC, Hudsonville) - a second split within the two-year-old Reformed Protestant federation, which itself had split from the PRC in 2021. Pastor **Rev. Andrew Lanning** was previously a Protestant Reformed minister and a leading figure in that 2021 separation. Meets at Pavilion Christian School; worship 10:00 a.m. and 5:00 p.m. Listed in the Theocast confessional church finder. Added 2026-07-29. No statement on abortion or sanctity of life found (2026-07).',
    src: 'https://www.remnantreformedchurch.org/;https://theocast.org/tools/church-finder/locations/remnant-reformed-church;https://www.sermonaudio.com/broadcasters/remnantreformed/',
  },
]

async function geocode(q: string) {
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
    const exists = await prisma.church.findFirst({ where: { state: 'MI', address: c.address, city: c.city } })
    if (exists) { console.log(`SKIP (already #${exists.id}): ${c.name}`); continue }
    const co = await geocode(`${c.address}, ${c.city}, MI ${c.zip}`)
    const created = await prisma.church.create({
      data: {
        name: c.name, denomination: c.denomination, address: c.address, city: c.city, state: 'MI', zip: c.zip,
        phone: c.phone, email: c.email, website: c.website, leadership: c.leadership,
        theologicalNotes: c.notes, sourceUrls: c.src,
        latitude: co?.lat ?? null, longitude: co?.lng ?? null,
        lastResearchedAt: new Date(),
        researchNote: '2026-07-29: added during the Michigan gap sweep — the Reformed Protestant Churches federation was entirely absent from this directory.',
        ...stances,
      },
    })
    console.log(`#${created.id}  ${c.name} (${c.city})${co ? '' : '  [NO COORDS]'}`)
  }
  console.log(`\nMI: ${await prisma.church.count({ where: { state: 'MI' } })} | total: ${await prisma.church.count()} | missing coords: ${await prisma.church.count({ where: { OR: [{ latitude: null }, { longitude: null }] } })}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
