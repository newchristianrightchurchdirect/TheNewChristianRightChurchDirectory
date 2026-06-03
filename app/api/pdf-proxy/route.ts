import { NextRequest } from 'next/server'

const ALLOWED_HOSTS = new Set([
  'hymnary.org',
  'www.hymnary.org',
  'media.hymnary.org',
])

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const target = req.nextUrl.searchParams.get('url')
  if (!target) return new Response('Missing url', { status: 400 })

  let u: URL
  try { u = new URL(target) } catch { return new Response('Bad url', { status: 400 }) }
  if (u.protocol !== 'https:' && u.protocol !== 'http:') {
    return new Response('Bad scheme', { status: 400 })
  }
  if (!ALLOWED_HOSTS.has(u.hostname)) {
    return new Response('Host not allowed', { status: 403 })
  }

  const upstream = await fetch(u.toString(), {
    headers: {
      'User-Agent': 'NXRHymnal/1.0 (+sheet music viewer)',
      Accept: 'application/pdf,*/*',
    },
    redirect: 'follow',
    cache: 'force-cache',
  })

  if (!upstream.ok || !upstream.body) {
    return new Response(`Upstream ${upstream.status}`, { status: upstream.status })
  }

  const ct = upstream.headers.get('content-type') || 'application/pdf'
  const len = upstream.headers.get('content-length')

  const headers = new Headers({
    'Content-Type': ct,
    'Content-Disposition': 'inline',
    'Cache-Control': 'public, max-age=604800, immutable',
    'X-Content-Type-Options': 'nosniff',
  })
  if (len) headers.set('Content-Length', len)

  return new Response(upstream.body, { status: 200, headers })
}
