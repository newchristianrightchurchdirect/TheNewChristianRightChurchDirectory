import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { validateCsrf } from '@/lib/csrf'
import { checkRateLimit } from '@/lib/rate-limit'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const csrfError = validateCsrf(request)
  if (csrfError) return csrfError

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
  const limit = await checkRateLimit(`upvote:${ip}`, 30)
  if (!limit.allowed) {
    return NextResponse.json(
      { error: `Too many upvotes. Try again in ${limit.retryAfterSeconds} seconds.` },
      { status: 429 }
    )
  }

  const { id } = await params
  const churchId = parseInt(id, 10)
  if (isNaN(churchId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  }

  try {
    const church = await prisma.church.update({
      where: { id: churchId },
      data: { upvotes: { increment: 1 } },
    })
    return NextResponse.json({ upvotes: church.upvotes })
  } catch {
    return NextResponse.json({ error: 'Church not found' }, { status: 404 })
  }
}
