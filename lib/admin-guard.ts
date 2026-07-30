import { NextResponse } from 'next/server'
import { getAuthToken, verifyToken } from '@/lib/actions/auth-actions'

/**
 * Returns a 401 response if the caller is not an admin, or null if they are.
 * Every admin route repeated this block; keeping it in one place means a route
 * cannot accidentally ship with a weaker check than its neighbours.
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const token = await getAuthToken()
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const result = await verifyToken(token)
  if (!result.authorized || result.user?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}
