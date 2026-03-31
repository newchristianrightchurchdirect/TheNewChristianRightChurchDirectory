import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { getAuthToken, verifyToken } from '@/lib/actions/auth-actions'
import { validateCsrf } from '@/lib/csrf'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const csrfError = validateCsrf(request)
  if (csrfError) return csrfError

  const token = await getAuthToken()
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const result = await verifyToken(token)
  if (!result.authorized || result.user?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const churchId = parseInt(id, 10)
  if (isNaN(churchId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  }

  const church = await prisma.church.update({
    where: { id: churchId },
    data: { approved: true },
  })

  return NextResponse.json(church)
}
