import * as fs from 'fs'

const kml = fs.readFileSync('C:/Users/Dustina/church-directory/gmap_data.kml', 'utf-8')

const usStatesAbbrev = new Set(['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
  'OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC'])

const stateNameToAbbrev: Record<string, string> = {
  'alabama': 'AL', 'alaska': 'AK', 'arizona': 'AZ', 'arkansas': 'AR', 'california': 'CA',
  'colorado': 'CO', 'connecticut': 'CT', 'delaware': 'DE', 'florida': 'FL', 'georgia': 'GA',
  'hawaii': 'HI', 'idaho': 'ID', 'illinois': 'IL', 'indiana': 'IN', 'iowa': 'IA',
  'kansas': 'KS', 'kentucky': 'KY', 'louisiana': 'LA', 'maine': 'ME', 'maryland': 'MD',
  'massachusetts': 'MA', 'michigan': 'MI', 'minnesota': 'MN', 'mississippi': 'MS', 'missouri': 'MO',
  'montana': 'MT', 'nebraska': 'NE', 'nevada': 'NV', 'new hampshire': 'NH', 'new jersey': 'NJ',
  'new mexico': 'NM', 'new york': 'NY', 'north carolina': 'NC', 'north dakota': 'ND', 'ohio': 'OH',
  'oklahoma': 'OK', 'oregon': 'OR', 'pennsylvania': 'PA', 'rhode island': 'RI', 'south carolina': 'SC',
  'south dakota': 'SD', 'tennessee': 'TN', 'texas': 'TX', 'utah': 'UT', 'vermont': 'VT',
  'virginia': 'VA', 'washington': 'WA', 'west virginia': 'WV', 'wisconsin': 'WI', 'wyoming': 'WY',
  'district of columbia': 'DC',
}

// Rough state boundaries by lat/lng (continental US only, used as last resort)
function guessStateFromCoords(lat: number, lng: number): string {
  // This is very rough but better than nothing for US churches
  if (lat < 25 || lat > 49 || lng < -125 || lng > -67) return '' // outside continental US
  // We'll leave this empty for now - better to use the name
  return ''
}

function getDataValue(pm: string, name: string): string {
  const m = pm.match(new RegExp(`<Data name="${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}">[\\s\\S]*?<value>([^<]*)</value>`, 'i'))
  return m ? m[1].trim() : ''
}

function getFromCdata(cdata: string, field: string): string {
  const m = cdata.match(new RegExp(`${field.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:\\s*([^<]+?)(?:<br>|$)`, 'i'))
  return m ? m[1].trim() : ''
}

function extractStateAbbrev(text: string): string {
  const codes = text.match(/\b([A-Z]{2})\b/g) || []
  for (const code of codes) {
    if (usStatesAbbrev.has(code)) return code
  }
  const lower = text.toLowerCase()
  for (const [name, abbr] of Object.entries(stateNameToAbbrev)) {
    if (lower.includes(name)) return abbr
  }
  return ''
}

function parseCity(raw: string): { city: string, state: string } {
  const commaMatch = raw.match(/^([A-Za-z\s.'-]+),\s*([A-Z]{2})\b/)
  if (commaMatch && usStatesAbbrev.has(commaMatch[2])) {
    return { city: commaMatch[1].trim(), state: commaMatch[2] }
  }
  return { city: raw.trim(), state: '' }
}

// Extract city name from church name (e.g. "Southfield Reformed Presbyterian Church" -> "Southfield")
function guessCityFromName(name: string): string {
  // Common patterns: "<City> <Type> Church" or "<Type> Church of <City>"
  const ofMatch = name.match(/(?:Church|Presbyterian|Baptist|Reformed)\s+of\s+([A-Za-z\s.'-]+?)$/i)
  if (ofMatch) return ofMatch[1].trim()
  // Try first word if it looks like a city name (not a common church word)
  const skipWords = new Set(['first','second','third','faith','grace','hope','christ','new','old','trinity',
    'covenant','bethel','calvary','emmanuel','immanuel','redeemer','zion','providence','cornerstone',
    'heritage','westminster','reformed','free','orthodox'])
  const words = name.split(/\s+/)
  if (words.length >= 3 && !skipWords.has(words[0].toLowerCase())) {
    return words[0]
  }
  return ''
}

const placemarkRegex = /<Placemark>([\s\S]*?)<\/Placemark>/g
const churches: any[] = []
let skippedHeaders = 0

let match
while ((match = placemarkRegex.exec(kml)) !== null) {
  const pm = match[1]

  const nameMatch = pm.match(/<name>([^<]*)<\/name>/)
  let name = nameMatch ? nameMatch[1].trim() : ''
  if (!name) continue
  if (name.length > 120) { skippedHeaders++; continue }
  if (/^\d{3,}/.test(name)) { skippedHeaders++; continue }
  if (/^(====|Last Updated|Skull|ABUSE|WARNING)/i.test(name)) { skippedHeaders++; continue }
  if (/^(PCA|OPC|RPCNA|ARP|URC|CREC|FRC|HRC|RCUS|PRCA|ERQ|FPCS|CanRC|URCNA)\s*\(/i.test(name)) { skippedHeaders++; continue }

  name = name.replace(/^\([^)]+\)\s*/, '').trim()
  if (name.includes('\n')) name = name.split('\n')[0].trim()

  const cdataMatch = pm.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)
  const cdata = cdataMatch ? cdataMatch[1] : ''
  const addrMatch = pm.match(/<address>([^<]*)<\/address>/)
  const addressField = addrMatch ? addrMatch[1] : ''

  // Coordinates
  const coordMatch = pm.match(/<coordinates>([\s\S]*?)<\/coordinates>/)
  let lng = '', lat = ''
  if (coordMatch) {
    const parts = coordMatch[1].trim().split(',')
    lng = parts[0]?.trim() || ''
    lat = parts[1]?.trim() || ''
  }

  // Detect format
  const hasdenomAbbrev = pm.includes('"Denom. Abbrev."')
  const hasContact = pm.includes('"Contact"')
  const hasEMail = pm.includes('"EMail"')

  let state = '', city = '', phone = '', email = '', website = '', pastor = '', denomination = ''

  if (hasdenomAbbrev) {
    // Format 3: RPCNA-style - has Phone, Email, Denom. Abbrev. but NO City/State
    denomination = getDataValue(pm, 'Denom. Abbrev.') || getFromCdata(cdata, 'Denom. Abbrev.')
    phone = getDataValue(pm, 'Phone') || getFromCdata(cdata, 'Phone')
    email = getDataValue(pm, 'Email') || getFromCdata(cdata, 'Email')
    website = getDataValue(pm, 'Website') || getFromCdata(cdata, 'Website')
    pastor = getDataValue(pm, 'Pastor') || getFromCdata(cdata, 'Pastor')

    // Street address field
    const streetAddr = getDataValue(pm, 'Street Address') || getFromCdata(cdata, 'Street Address')

    // Try to get state from address field, CDATA, or name
    state = extractStateAbbrev(addressField) || extractStateAbbrev(cdata) || extractStateAbbrev(streetAddr)

    // Try country field for non-US
    const country = getDataValue(pm, 'Country') || getFromCdata(cdata, 'Country')

    // City from name or address
    city = guessCityFromName(name)
    if (!city && streetAddr) {
      const parts = streetAddr.split(',')
      if (parts.length >= 2) city = parts[parts.length - 2]?.trim() || ''
    }
    if (!city && addressField) {
      // "Southfield Reformed Presbyterian Church" in address might just be the name
      const addrParts = addressField.split(',')
      if (addrParts.length > 1) city = addrParts[0]?.replace(name, '').trim() || ''
    }
  } else if (hasContact) {
    // Format 2: OPC-style - Contact field combines email/phone, City has state embedded
    const rawCity = getDataValue(pm, 'City') || getFromCdata(cdata, 'City')
    const parsed = parseCity(rawCity)
    city = parsed.city
    state = parsed.state

    const contact = getDataValue(pm, 'Contact') || getFromCdata(cdata, 'Contact')
    const emailM = contact.match(/Email:\s*(\S+@\S+)/i)
    const phoneM = contact.match(/Phone:\s*([\d\s()+-]+)/i)
    email = emailM ? emailM[1].trim() : ''
    phone = phoneM ? phoneM[1].trim() : ''

    website = getDataValue(pm, 'Website') || getFromCdata(cdata, 'Website')
    pastor = getDataValue(pm, 'Pastor') || getFromCdata(cdata, 'Pastor')
    denomination = getDataValue(pm, 'Denomination') || getFromCdata(cdata, 'Denomination')

    if (!state) state = extractStateAbbrev(addressField) || extractStateAbbrev(cdata)
  } else {
    // Format 1: Standard - EMail, Phone, State, City, Confessions
    state = getDataValue(pm, 'State') || getFromCdata(cdata, 'State')
    city = getDataValue(pm, 'City') || getFromCdata(cdata, 'City')

    if (!usStatesAbbrev.has(state)) {
      const origState = state
      state = extractStateAbbrev(origState) || extractStateAbbrev(addressField) || extractStateAbbrev(cdata)
      if (!city) {
        const cityM = origState.match(/City\s*\n?\s*([A-Za-z\s.'-]+?)\s*\n/i)
        if (cityM) city = cityM[1].trim()
      }
    }
    if (!city) {
      const rawCity = getDataValue(pm, 'City') || getFromCdata(cdata, 'City')
      const parsed = parseCity(rawCity)
      city = parsed.city
      if (parsed.state && !usStatesAbbrev.has(state)) state = parsed.state
    }

    phone = getDataValue(pm, 'Phone') || getFromCdata(cdata, 'Phone')
    email = getDataValue(pm, 'EMail') || getFromCdata(cdata, 'EMail')
    website = getDataValue(pm, 'Website') || getFromCdata(cdata, 'Website')
    pastor = getDataValue(pm, 'Pastor') || getFromCdata(cdata, 'Pastor')
    const confessions = getDataValue(pm, 'Confessions') || getFromCdata(cdata, 'Confessions')
    if (confessions) denomination = confessions
  }

  // Last resort: try to get state from coordinates (check if in US lat/lng range)
  if (!state && lat && lng) {
    const latN = parseFloat(lat), lngN = parseFloat(lng)
    if (latN >= 24 && latN <= 50 && lngN >= -125 && lngN <= -66) {
      // It's in the continental US but we can't determine the state from coords alone
      // Mark as needing geocoding
      state = 'US_UNKNOWN'
    }
  }

  if (!usStatesAbbrev.has(state) && state !== 'US_UNKNOWN') continue

  // Clean fields
  if (city.includes('\n') || city.length > 50) city = city.split('\n')[0].replace(/[^A-Za-z\s.'-]/g, '').trim()
  if (!city) city = guessCityFromName(name) || 'Unknown'
  if (email === '-' || (email && !email.includes('@'))) email = ''
  if (email) email = email.replace(/\s+/g, '') // remove whitespace
  if (phone === '-' || phone === 'N/A') phone = ''
  if (website === '-') website = ''
  if (website && !website.startsWith('http')) website = 'https://' + website
  if (pastor === '-') pastor = ''

  churches.push({ name, city, state, phone, email, website, pastor, denomination, lat, lng })
}

// Stats
const usKnown = churches.filter(c => c.state !== 'US_UNKNOWN')
const usUnknown = churches.filter(c => c.state === 'US_UNKNOWN')
console.log('Total parsed (US known state):', usKnown.length)
console.log('US but unknown state (need geocoding):', usUnknown.length)
console.log('With email:', churches.filter(c => c.email).length)
console.log('With phone:', churches.filter(c => c.phone).length)
console.log('With pastor:', churches.filter(c => c.pastor).length)
console.log()

// Michigan
const mi = churches.filter(c => c.state === 'MI')
console.log('Michigan:', mi.length)
mi.forEach(c => console.log('  ' + c.name + ' (' + c.city + ') | ' + (c.denomination || '-') + ' | ' + (c.email || '-')))

// Show US_UNKNOWN samples
console.log('\nUS_UNKNOWN samples:')
usUnknown.slice(0, 15).forEach(c => console.log('  ' + c.name + ' (' + c.city + ') lat=' + c.lat + ' lng=' + c.lng))

// Save
fs.writeFileSync('C:/Users/Dustina/church-directory/kml_churches_final.json', JSON.stringify(churches, null, 2))
console.log('\nSaved to kml_churches_final.json')
