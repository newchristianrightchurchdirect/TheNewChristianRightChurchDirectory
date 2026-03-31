import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { validateCsrf } from '@/lib/csrf'
import { checkRateLimit } from '@/lib/rate-limit'
import { escapeHtml } from '@/lib/sanitize'

export async function GET() {
  const churches = await prisma.church.findMany({
    where: { approved: true },
    orderBy: [{ upvotes: 'desc' }, { name: 'asc' }],
  })

  return NextResponse.json(churches)
}

export async function POST(request: NextRequest) {
  // CSRF validation
  const csrfError = validateCsrf(request)
  if (csrfError) return csrfError

  // Rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
  const limit = await checkRateLimit(`submit:${ip}`, 10)
  if (!limit.allowed) {
    return NextResponse.json(
      { error: `Too many submissions. Try again in ${limit.retryAfterSeconds} seconds.` },
      { status: 429 }
    )
  }

  const body = await request.json()

  // Honeypot check — silently accept but don't save
  if (body.honeypot) {
    return NextResponse.json({
      id: 0,
      name: body.name,
      city: body.city,
      state: body.state,
    }, { status: 201 })
  }

  if (!body.name?.trim() || !body.address?.trim() || !body.city?.trim() || !body.state?.trim()) {
    return NextResponse.json({ error: 'Name, address, city, and state are required.' }, { status: 400 })
  }

  const name = escapeHtml(String(body.name).trim().slice(0, 200))
  const denomination = body.denomination ? escapeHtml(String(body.denomination).trim().slice(0, 100)) : null
  const address = escapeHtml(String(body.address).trim().slice(0, 200))
  const city = escapeHtml(String(body.city).trim().slice(0, 100))
  const state = String(body.state).trim().slice(0, 2).toUpperCase()
  const zip = body.zip ? String(body.zip).trim().slice(0, 10) : null
  let website: string | null = null
  if (body.website) {
    const websiteStr = String(body.website).trim().slice(0, 300)
    try {
      const url = new URL(websiteStr)
      if (['http:', 'https:'].includes(url.protocol)) {
        website = websiteStr
      }
    } catch {
      // Invalid URL — ignore silently
    }
  }
  const phone = body.phone ? String(body.phone).trim().slice(0, 20) : null
  const description = body.description ? escapeHtml(String(body.description).trim().slice(0, 1000)) : null
  const theologicalNotes = body.theologicalNotes ? escapeHtml(String(body.theologicalNotes).trim().slice(0, 1000)) : null

  const validStances = ['yes', 'no', 'anti', 'unknown']
  const zionistStance = validStances.includes(body.zionistStance) ? body.zionistStance : 'unknown'

  let latitude: number | null = null
  let longitude: number | null = null

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const query = encodeURIComponent(`${address}, ${city}, ${state}`)
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=us&limit=1`,
      {
        signal: controller.signal,
        headers: { 'User-Agent': 'NewChristianRightDirectory/1.0' },
      }
    )
    clearTimeout(timeoutId)

    if (geoRes.ok) {
      const geoData = await geoRes.json() as Array<{ lat?: string; lon?: string }>
      if (geoData.length > 0 && geoData[0].lat && geoData[0].lon) {
        const lat = parseFloat(geoData[0].lat)
        const lon = parseFloat(geoData[0].lon)
        if (!isNaN(lat) && !isNaN(lon)) {
          latitude = lat
          longitude = lon
        }
      }
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
