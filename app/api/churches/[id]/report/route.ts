import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { validateCsrf } from '@/lib/csrf'
import { checkRateLimit } from '@/lib/rate-limit'
import { escapeHtml } from '@/lib/sanitize'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const csrfError = validateCsrf(request)
  if (csrfError) return csrfError

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
  const limit = await checkRateLimit(`report:${ip}`, 10)
  if (!limit.allowed) {
    return NextResponse.json(
      { error: `Too many reports. Try again in ${limit.retryAfterSeconds} seconds.` },
      { status: 429 }
    )
  }

  const { id } = await params
  const churchId = parseInt(id, 10)
  if (isNaN(churchId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  }

  const body = await request.json()

  if (!body.reason?.trim()) {
    return NextResponse.json({ error: 'Reason is required' }, { status: 400 })
  }

  const validReasons = ['wrong_stance', 'wrong_info', 'closed', 'duplicate', 'other']
  const reason = validReasons.includes(body.reason) ? body.reason : 'other'
  const details = body.details ? escapeHtml(String(body.details).trim().slice(0, 500)) : null

  const report = await prisma.report.create({
    data: {
      churchId,
      reason,
      details,
    },
  })

  return NextResponse.json(report, { status: 201 })
}
