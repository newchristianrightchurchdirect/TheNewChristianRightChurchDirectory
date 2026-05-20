import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const API_KEY = process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyAlbr6hJiUMhkkcB8EgFOEmy_p3czP8Rqc'

async function searchPlace(query: string): Promise<any | null> {
  try {
    const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'places.formattedAddress,places.displayName',
      },
      body: JSON.stringify({ textQuery: query, maxResultCount: 1 }),
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.places?.[0] || null
  } catch { return null }
}

// More aggressive search strategies for hard-to-find churches
const queryStrategies = [
  (c: any) => `"${c.name}" ${c.city} ${c.state}`,
  (c: any) => `${c.name} church ${c.city} ${c.state}`,
  (c: any) => `${c.name} PCA church ${c.city} ${c.state}`,
  (c: any) => `${c.name} OPC church ${c.city} ${c.state}`,
  (c: any) => `Presbyterian church ${c.city} ${c.state}`,
  (c: any) => `${c.name} ${c.state}`,
]

async function main() {
  const churches = await prisma.church.findMany({
    select: { id: true, name: true, address: true, city: true, state: true, denomination: true },
    orderBy: { id: 'asc' }
  })
  const remaining = churches.filter(c => c.address && !/\d/.test(c.address))
  console.log(`Trying ${remaining.length} remaining churches with aggressive search...\n`)

  let found = 0
  for (const c of remaining) {
    for (const strategy of queryStrategies) {
      const query = strategy(c)
      const place = await searchPlace(query)
      if (place?.formattedAddress) {
        const parts = place.formattedAddress.split(',')
        const street = parts[0]?.trim()
        if (street && /^\d/.test(street)) {
          // Verify city/state roughly matches
          const addr = place.formattedAddress.toLowerCase()
          const stateMatch = addr.includes(c.state.toLowerCase())
          if (stateMatch || queryStrategies.indexOf(strategy) < 3) {
            const zipMatch = place.formattedAddress.match(/\b(\d{5})(?:-\d{4})?\b/)
            const data: any = { address: street }
            if (zipMatch) data.zip = zipMatch[1]
            await prisma.church.update({ where: { id: c.id }, data })
            found++
            console.log(`✓ ${c.id}: ${c.name} (${c.city}, ${c.state}) → ${street}`)
            break
          }
        }
      }
      await new Promise(r => setTimeout(r, 200))
    }
  }

  console.log(`\nFound ${found} more. Remaining: ${remaining.length - found}`)
  await prisma.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
