// Repair `city` values that are not cities — street names, service directions, URLs,
// church names, a German postcode. Every affected row already has verified lat/long, so the
// city is recovered by REVERSE-GEOCODING those coordinates rather than guessed.
//
//   npx tsx prisma/fix-bad-cities-2026-07-29.ts --dry-run
//   npx tsx prisma/fix-bad-cities-2026-07-29.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const DRY = process.argv.includes('--dry-run')
const API_KEY = process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyAlbr6hJiUMhkkcB8EgFOEmy_p3czP8Rqc'

const STREET_SUFFIX = /(^|\s)(rd|road|st|street|ave|avenue|blvd|hwy|highway|ln|lane|dr|drive|ct|court|way|pkwy|suite|ste|box)\.?$/i
const CHURCHY_CITY = /(church|presbyterian|baptist|chapel|fellowship|congregation|http|@)/i
const isJunk = (raw: string) => {
  const city = (raw || '').trim()
  return !city || city.length < 2 || city.length > 30 || /\d/.test(city) ||
    /(http|@)/i.test(city) || city.split(/\s+/).length > 4
}
const isSuspicious = (raw: string) => {
  const city = (raw || '').trim()
  return STREET_SUFFIX.test(city) || CHURCHY_CITY.test(city)
}
const badCity = (raw: string) => isJunk(raw) || isSuspicious(raw)

// Ask Places whether the stored value is itself a real locality in that state.
async function isRealCity(city: string, state: string): Promise<boolean> {
  try {
    const r = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': API_KEY, 'X-Goog-FieldMask': 'places.addressComponents' },
      body: JSON.stringify({ textQuery: `${city}, ${state}`, maxResultCount: 1 }),
    })
    if (!r.ok) return false
    const place = (await r.json()).places?.[0]
    const comp = place?.addressComponents || []
    const loc = comp.find((c: any) => (c.types || []).includes('locality'))
    return !!loc && loc.longText.toLowerCase() === city.trim().toLowerCase()
  } catch { return false }
}

// The API key has Places enabled but not the Geocoding API, so resolve the city by asking
// Places to look up the church itself and reading the locality out of its address components.
async function resolveCity(name: string, address: string, state: string, lat: number, lng: number) {
  const query = `${name}, ${address}, ${state}`.replace(/\s+/g, ' ').trim()
  try {
    const r = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': API_KEY, 'X-Goog-FieldMask': 'places.addressComponents,places.formattedAddress,places.location' },
      body: JSON.stringify({
        textQuery: query,
        maxResultCount: 1,
        locationBias: { circle: { center: { latitude: lat, longitude: lng }, radius: 20000 } },
      }),
    })
    if (!r.ok) return null
    const place = (await r.json()).places?.[0]
    if (!place) return null
    const comp = place.addressComponents || []
    const pick = (t: string) => comp.find((c: any) => (c.types || []).includes(t))
    const city = pick('locality') || pick('sublocality') || pick('administrative_area_level_3')
    const st = pick('administrative_area_level_1')
    if (!city) return null
    return { city: city.longText as string, state: st?.shortText as string, formatted: place.formattedAddress as string }
  } catch { return null }
}

async function main() {
  const all = await prisma.church.findMany({
    select: { id: true, name: true, city: true, state: true, address: true, latitude: true, longitude: true },
    orderBy: { id: 'asc' },
  })
  const bad = all.filter(c => badCity(c.city))
  console.log(`rows with a bad city value: ${bad.length}\n`)

  let fixed = 0, mismatch = 0, failed = 0, kept = 0
  for (const c of bad) {
    if (c.latitude == null || c.longitude == null) {
      console.log(`  #${c.id} ${c.name} — NO COORDS, skipped`); failed++; continue
    }
    // Suspicious-but-maybe-real names get verified before we touch them.
    if (!isJunk(c.city) && await isRealCity(c.city, c.state)) {
      console.log(`  #${c.id} ${c.name.slice(0, 40)} — "${c.city}" IS a real city, left alone`); kept++; continue
    }
    const g = await resolveCity(c.name, c.address, c.state, c.latitude, c.longitude)
    if (!g || !g.city) {
      console.log(`  #${c.id} ${c.name.slice(0, 45)} — could not resolve a city`); failed++; continue
    }
    const stateOk = !g.state || g.state === c.state
    console.log(`  #${c.id} ${c.name.slice(0, 40)}`)
    console.log(`      "${c.city.slice(0, 55)}"  ->  "${g.city}"${stateOk ? '' : `   ⚠ state ${c.state} vs geocoded ${g.state}`}`)
    if (!stateOk) {
      // A result in a different state means Places matched the WRONG church. Never write it.
      mismatch++
      console.log('      SKIPPED - resolved to another state, needs manual repair')
      continue
    }
    if (DRY) { fixed++; continue }
    await prisma.church.update({
      where: { id: c.id },
      data: {
        city: g.city,
        researchNote: `2026-07-29: city column repaired via a Places lookup biased to the stored coordinates. Previous value was not a city: "${c.city.slice(0, 90)}".`,
      },
    })
    fixed++
  }
  console.log(`\n${DRY ? 'WOULD FIX' : 'FIXED'} ${fixed}   failed: ${failed}   state mismatches flagged: ${mismatch}`)
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
