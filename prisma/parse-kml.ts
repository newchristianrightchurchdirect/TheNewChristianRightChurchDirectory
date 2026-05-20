import * as fs from 'fs'

const kml = fs.readFileSync('C:/Users/Dustina/church-directory/gmap_data.kml', 'utf-8')

// Extract all placemarks
const placemarkRegex = /<Placemark>([\s\S]*?)<\/Placemark>/g
const churches: any[] = []

let match
while ((match = placemarkRegex.exec(kml)) !== null) {
  const pm = match[1]

  const getName = (tag: string) => {
    const m = pm.match(new RegExp(`<${tag}>([^<]*)</${tag}>`))
    return m ? m[1].trim() : ''
  }

  const getDataValue = (name: string) => {
    const m = pm.match(new RegExp(`<Data name="${name}">[\\s\\S]*?<value>([^<]*)</value>`, 'i'))
    return m ? m[1].trim() : ''
  }

  // Also extract from CDATA description
  const cdataMatch = pm.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)
  const cdata = cdataMatch ? cdataMatch[1] : ''

  const getFromCdata = (field: string) => {
    const m = cdata.match(new RegExp(`${field}:\\s*([^<]+?)(?:<br>|$)`))
    return m ? m[1].trim() : ''
  }

  const coordMatch = pm.match(/<coordinates>([\s\S]*?)<\/coordinates>/)
  let lng = '', lat = ''
  if (coordMatch) {
    const parts = coordMatch[1].trim().split(',')
    lng = parts[0]
    lat = parts[1]
  }

  const name = getName('name')
  if (!name || name.includes('Presby Church Amer') || name.includes('Reformed Baptist') ||
      name.includes('OPC') || name.includes('RPCNA') || name.includes('ARP') ||
      name.includes('URC') || name.includes('CREC') || name.includes('FRC') ||
      name.includes('HRC') || name.includes('RCUS') || name.includes('Skull') ||
      name.includes('Last Updated') || name.includes('====') || name.length > 100) {
    // Skip folder labels, abuse markers, etc.
    // But don't skip if it looks like a church name
    if (!name.includes('Church') && !name.includes('Chapel') && !name.includes('Presbyterian') &&
        !name.includes('Baptist') && !name.includes('Reformed')) {
      continue
    }
  }

  const city = getDataValue('City') || getFromCdata('City')
  const state = getDataValue('State') || getFromCdata('State')
  const phone = getDataValue('Phone') || getFromCdata('Phone')
  const email = getDataValue('EMail') || getFromCdata('EMail')
  const website = getDataValue('Website') || getFromCdata('Website')
  const pastor = getDataValue('Pastor') || getFromCdata('Pastor')
  const confessions = getDataValue('Confessions') || getFromCdata('Confessions')

  if (city || state) {
    churches.push({
      name,
      city,
      state,
      phone,
      email,
      website,
      pastor,
      confessions,
      lat: lat || '',
      lng: lng || '',
    })
  }
}

// Filter to US states
const usStates = new Set(['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
  'OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC'])

const us = churches.filter(c => usStates.has(c.state))

console.log('Total parsed:', churches.length)
console.log('US churches:', us.length)
console.log('With email:', us.filter(c => c.email).length)
console.log('With phone:', us.filter(c => c.phone).length)
console.log('With pastor:', us.filter(c => c.pastor).length)
console.log('With website:', us.filter(c => c.website).length)

// Show some samples with pastor names
console.log('\nSample entries with pastors:')
us.filter(c => c.pastor).slice(0, 10).forEach(c => {
  console.log(`  ${c.name} (${c.city}, ${c.state}) - Pastor: ${c.pastor} | Email: ${c.email}`)
})

fs.writeFileSync('C:/Users/Dustina/church-directory/kml_churches.json', JSON.stringify(us, null, 2))
console.log('\nSaved to kml_churches.json')
