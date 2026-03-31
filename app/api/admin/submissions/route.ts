import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getAuthToken, verifyToken } from '@/lib/actions/auth-actions'

export async function GET() {
  const token = await getAuthToken()
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const result = await verifyToken(token)
  if (!result.authorized || result.user?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const churches = await prisma.church.findMany({
    where: { approved: false },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(churches)
}
