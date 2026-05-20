import * as fs from 'fs'

// Simple reverse geocoding using the Nominatim API (free, no key needed)
// Rate limit: 1 request per second
async function reverseGeocode(lat: string, lng: string): Promise<{ state: string, city: string } | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
      { headers: { 'User-Agent': 'ChurchDirectory/1.0' } }
    )
    if (!res.ok) return null
    const data = await res.json()
    const addr = data.address || {}
    return {
      state: addr.state || '',
      city: addr.city || addr.town || addr.village || addr.hamlet || addr.county || '',
    }
  } catch { return null }
}

const stateNameToAbbrev: Record<string, string> = {
  'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
  'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
  'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
  'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
  'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
  'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
  'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
  'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
  'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
  'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY',
  'District of Columbia': 'DC',
}

async function main() {
  const data = JSON.parse(fs.readFileSync('C:/Users/Dustina/church-directory/kml_churches_final.json', 'utf-8'))
  const unknown = data.filter((c: any) => c.state === 'US_UNKNOWN')
  console.log(`Resolving ${unknown.length} US_UNKNOWN entries via Nominatim...\n`)

  let resolved = 0
  let failed = 0
  let nonUS = 0

  for (let i = 0; i < unknown.length; i++) {
    const c = unknown[i]
    if (!c.lat || !c.lng) { failed++; continue }

    const geo = await reverseGeocode(c.lat, c.lng)
    if (geo && geo.state) {
      const abbrev = stateNameToAbbrev[geo.state]
      if (abbrev) {
        c.state = abbrev
        if (c.city === 'Unknown' || !c.city) c.city = geo.city || 'Unknown'
        resolved++
      } else {
        nonUS++
        c.state = 'NON_US'
      }
    } else {
      failed++
    }

    if ((i + 1) % 50 === 0) {
      console.log(`  Progress: ${i + 1}/${unknown.length} | Resolved: ${resolved} | Failed: ${failed} | Non-US: ${nonUS}`)
    }

    // Rate limit: 1 req/sec for Nominatim
    await new Promise(r => setTimeout(r, 1100))
  }

  console.log(`\nDone! Resolved: ${resolved} | Failed: ${failed} | Non-US: ${nonUS}`)

  // Remove NON_US entries
  const filtered = data.filter((c: any) => c.state !== 'NON_US' && c.state !== 'US_UNKNOWN')
  console.log('Total US churches after resolution:', filtered.length)

  // Check Michigan
  const mi = filtered.filter((c: any) => c.state === 'MI')
  console.log('\nMichigan:', mi.length)
  mi.forEach((c: any) => console.log('  ' + c.name + ' (' + c.city + ') | ' + (c.email || '-')))

  fs.writeFileSync('C:/Users/Dustina/church-directory/kml_churches_final.json', JSON.stringify(filtered, null, 2))
  console.log('\nSaved updated kml_churches_final.json')
}

main().catch(e => { console.error(e); process.exit(1) })
