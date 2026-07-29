// 2026-07-29 (second pass): four additions, the OneLife upgrade, and safe label merges.
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const API_KEY = process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyAlbr6hJiUMhkkcB8EgFOEmy_p3czP8Rqc'

async function place(q: string) {
  try {
    const r = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': API_KEY, 'X-Goog-FieldMask': 'places.location,places.formattedAddress' },
      body: JSON.stringify({ textQuery: q, maxResultCount: 1 }),
    })
    if (!r.ok) return null
    const p = (await r.json()).places?.[0]
    return p?.location ? { lat: p.location.latitude, lng: p.location.longitude, addr: p.formattedAddress as string } : null
  } catch { return null }
}

const additions = [
  {
    name: 'Second Reformed Protestant Church', denomination: 'RPC',
    address: '2501 Hart St', city: 'Dyer', state: 'IN', zip: '46311',
    phone: '(712) 432-3410', website: 'https://www.2ndrpc.org/', email: null,
    leadership: 'Pastor: Rev. Nathan Langerak',
    notes: 'Three Forms of Unity. The SECOND of the two founding congregations of the Reformed Protestant Churches, which federated 28 May 2021 in Hudsonville MI out of the Protestant Reformed split. Originally met in Calumet City, Illinois; now at 2501 Hart St, Dyer, Indiana. With First RPC (#4107) and Remnant Reformed (#4108) this completes the RPC federation as far as public sources show - the federation has only these congregations in North America, plus a sister-church conversation with First RPC of Bulacan in the Philippines. Added 2026-07-29 at the user\'s direction: the RPC fits the directory\'s confessional criteria even though its posture is inward rather than transformationalist.',
    ce: 'quietist',
    src: 'https://www.2ndrpc.org/;https://reformedbelieverspub.org/article/reformed-protestant-churches/',
    stances: { zionistStance: 'no', abolitionStance: 'incrementalist', eschatology: 'amill', theonomy: 'non_theonomic', federalVision: 'critical', sexualityStance: 'traditional', genderStance: 'complementarian', stanceBasis: 'denominational_default' },
    flag: null as string | null,
  },
  {
    name: 'Christian Reformed Church of St. Joseph', denomination: 'CRC',
    address: '3275 Washington Ave', city: 'Saint Joseph', state: 'MI', zip: '49085',
    phone: '(269) 429-5541', website: 'https://www.crcstjoseph.com/', email: 'office@crcsj.org',
    leadership: null,
    notes: 'Christian Reformed Church in North America (CRCNA). Three Forms of Unity; covenantal; amillennial. **ADDED BECAUSE OF ITS PEOPLE, NOT ITS POLITY**: the leader of **Abolish Abortion Michigan** attends here (per the directory owner, who works with AAM). AAM Action is registered at 3665 S Lakeshore Dr, Suite 4, St Joseph MI 49085 (EIN 99-4483710, founded 2025), which corroborates the St. Joseph base. **POLICY CHECK NEEDED**: the CRCNA permits women as ministers, elders and deacons, which would trigger this directory\'s egalitarian-exclusion rule; the church publishes no officer list, so whether women serve here is unverified - the same open question as #3979 Beaverdam CRC. Resolve before treating the row as settled. Note the CRCNA also made HC Q&A 108 confessional on unchastity in 2022, so it is not affirming on sexuality. No statement on abortion found on the church site (2026-07).',
    ce: null,
    src: 'https://www.crcstjoseph.com/;https://www.crcna.org/churches/5199;https://www.causeiq.com/organizations/abolish-abortion-michigan-action,332109069/',
    stances: { zionistStance: 'no', eschatology: 'amill', theonomy: 'non_theonomic', sexualityStance: 'traditional', stanceBasis: 'mixed' },
    flag: 'review_nonfit',
  },
  {
    name: 'The Sanctuary of Swartz Creek', denomination: 'Non-Denominational',
    address: '7365 Miller Rd', city: 'Swartz Creek', state: 'MI', zip: '48473',
    phone: null, website: 'https://www.facebook.com/TheSanctuaryofSwartzCreek/', email: null,
    leadership: null,
    notes: 'THIN RECORD - NEEDS VERIFICATION. Added 2026-07-29 on the directory owner\'s recollection that **Cal Zastrow** - co-founder of Personhood USA, longtime Michigan abolitionist, convicted under the FACE Act for the August 2020 Northland Family Planning blockade - mentioned this congregation on Facebook. The church has only a Facebook presence; thesanctuarymichigan.com is an UNRELATED sculpture park near Gull Lake in Augusta MI, not this church. No pastor, denomination, confession or statement of faith could be found in any source, and Zastrow\'s connection is unconfirmed. Do not treat the Zastrow link or any stance as established until someone calls or visits. Distinct from #4094 Sovereign Grace Baptist, also in Swartz Creek.',
    ce: null,
    src: 'https://www.facebook.com/TheSanctuaryofSwartzCreek/;https://www.yelp.com/biz/the-sanctuary-swartz-creek',
    stances: { stanceBasis: 'mixed' },
    flag: 'denom_ambiguous',
  },
  {
    name: 'Areopagus Church', denomination: 'Non-Denominational',
    address: '', city: 'Norman', state: 'OK', zip: null,
    phone: null, website: 'https://www.facebook.com/AreopagusNorman/', email: null,
    leadership: null,
    notes: 'THIN RECORD - NEEDS VERIFICATION. Added 2026-07-29 at the directory owner\'s direction as the reported congregation of **T. Russell Hunter** - founder of Abolish Human Abortion, Free the States and Abolitionists Rising, the abolition movement\'s chief debater and theorist, who lives in Norman OK. Court documents and the congregation\'s Facebook page associate Hunter with Areopagus. It presents as a small, informal gathering ("a place to discuss things that matter") rather than a conventional congregation, and no pastor, address, confession or denominational affiliation could be found. CULTURAL ENGAGEMENT: left unset despite Hunter being one of the most politically active figures in this entire directory - his activism is conducted through Abolitionists Rising, and there is no evidence the gathering acts corporately. Verify before relying on this row.',
    ce: null,
    src: 'https://www.facebook.com/AreopagusNorman/;https://abolitionistsrising.com/speakers/t-russell-hunter/',
    stances: { abolitionStance: 'pro_abolition', stanceBasis: 'mixed' },
    flag: 'denom_ambiguous',
  },
]

async function main() {
  for (const c of additions) {
    const dupe = await prisma.church.findFirst({ where: { state: c.state, name: { contains: c.name.slice(0, 22) } } })
    if (dupe) { console.log(`SKIP (already #${dupe.id}): ${c.name}`); continue }
    const geo = await place(c.address ? `${c.address}, ${c.city}, ${c.state}` : `${c.name}, ${c.city}, ${c.state}`)
    const created = await prisma.church.create({
      data: {
        name: c.name, denomination: c.denomination,
        address: c.address || (geo?.addr?.split(',')[0] ?? c.city),
        city: c.city, state: c.state, zip: c.zip,
        phone: c.phone, website: c.website, email: c.email, leadership: c.leadership,
        theologicalNotes: c.notes, recordFlag: c.flag, sourceUrls: c.src,
        latitude: geo?.lat ?? null, longitude: geo?.lng ?? null,
        researchStatus: 'researched', approved: true, lastResearchedAt: new Date(),
        researchNote: '2026-07-29: added at the directory owner\'s direction.',
        ...(c.ce ? { culturalEngagement: c.ce } : {}),
        ...c.stances,
      },
    })
    console.log(`#${created.id}  ${c.name} (${c.city}, ${c.state})${geo ? '' : '  [NO COORDS]'}`)
  }

  // OneLife / Ekklesia of Grand Blanc: the church hosts One Life For Life, which stations
  // missionaries at abortion clinics — that is the congregation acting corporately.
  const one = await prisma.church.findUnique({ where: { id: 3247 } })
  if (one) {
    await prisma.church.update({
      where: { id: 3247 },
      data: {
        culturalEngagement: 'transformationalist',
        stanceBasis: 'evidenced',
        theologicalNotes: `${one.theologicalNotes || ''} **CULTURAL ENGAGEMENT (EVIDENCED): transformationalist.** The congregation hosts and promotes **One Life For Life** as its own ministry - an organisation that "exists to rescue pre-born children... by positioning gospel-equipped missionaries at abortion mills across the United States," with the stated aim of a trained missionary at every abortion clinic every day. The church runs an annual ONElife for Life banquet and gives the ministry a dedicated section of its site. That is the church acting corporately on abortion, not merely individual members doing so.`.trim(),
        researchNote: '2026-07-29: culturalEngagement -> transformationalist, evidenced by the church hosting One Life For Life as a church ministry.',
        lastResearchedAt: new Date(),
      },
    })
    console.log('\n#3247 OneLife / Ekklesia of Grand Blanc -> transformationalist (evidenced)')
  }

  // Safe label merges only. URC is deliberately NOT touched - see the log.
  const merges: Array<[string, string]> = [
    ['Vanguard Presbytery (ex-PCA)', 'Vanguard Presbytery'],
    ['Vanguard Presbyterian', 'Vanguard Presbytery'],
    ['Evangel Presbytery (ex-PCA)', 'Evangel Presbytery'],
  ]
  console.log('\nlabel merges:')
  for (const [from, to] of merges) {
    const r = await prisma.church.updateMany({ where: { denomination: from }, data: { denomination: to } })
    console.log(`  "${from}" -> "${to}"  (${r.count})`)
  }

  const d = await prisma.$queryRawUnsafe<any[]>(`SELECT denomination, COUNT(*)::int n FROM "Church" WHERE denomination IN ('Vanguard Presbytery','Evangel Presbytery','RPC','CRC') GROUP BY 1 ORDER BY 2 DESC`)
  console.log('\nafter:', d.map(x => `${x.denomination}=${x.n}`).join('  '))
  console.log(`total: ${await prisma.church.count()} | missing coords: ${await prisma.church.count({ where: { OR: [{ latitude: null }, { longitude: null }] } })}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
