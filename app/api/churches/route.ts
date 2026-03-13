import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const churches = await prisma.church.findMany({
    where: { approved: true },
    orderBy: [{ upvotes: 'desc' }, { name: 'asc' }],
  })

  return NextResponse.json(churches)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  if (!body.name?.trim() || !body.address?.trim() || !body.city?.trim() || !body.state?.trim()) {
    return NextResponse.json({ error: 'Name, address, city, and state are required.' }, { status: 400 })
  }

  const name = String(body.name).trim().slice(0, 200)
  const denomination = body.denomination ? String(body.denomination).trim().slice(0, 100) : null
  const address = String(body.address).trim().slice(0, 200)
  const city = String(body.city).trim().slice(0, 100)
  const state = String(body.state).trim().slice(0, 2).toUpperCase()
  const zip = body.zip ? String(body.zip).trim().slice(0, 10) : null
  const website = body.website ? String(body.website).trim().slice(0, 300) : null
  const phone = body.phone ? String(body.phone).trim().slice(0, 20) : null
  const description = body.description ? String(body.description).trim().slice(0, 1000) : null
  const theologicalNotes = body.theologicalNotes ? String(body.theologicalNotes).trim().slice(0, 1000) : null

  const validStances = ['yes', 'no', 'unknown']
  const zionistStance = validStances.includes(body.zionistStance) ? body.zionistStance : 'unknown'

  let latitude: number | null = null
  let longitude: number | null = null

  try {
    const query = encodeURIComponent(`${address}, ${city}, ${state}`)
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=us&limit=1`,
      { headers: { 'User-Agent': 'NewChristianRightDirectory/1.0' } }
    )
    const geoData = await geoRes.json()
    if (geoData.length > 0) {
      latitude = parseFloat(geoData[0].lat)
      longitude = parseFloat(geoData[0].lon)
    }
  } catch {
    // Geocoding failed silently
  }

  const church = await prisma.church.create({
    data: {
      name, denomination, address, city, state, zip,
      latitude, longitude, website, phone,
      zionistStance, theologicalNotes, description,
      approved: false,
    },
  })

  return NextResponse.json(church, { status: 201 })
}
