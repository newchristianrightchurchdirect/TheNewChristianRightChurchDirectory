import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()

  if (!body.reason?.trim()) {
    return NextResponse.json({ error: 'Reason is required' }, { status: 400 })
  }

  const validReasons = ['wrong_stance', 'wrong_info', 'closed', 'duplicate', 'other']
  const reason = validReasons.includes(body.reason) ? body.reason : 'other'
  const details = body.details ? String(body.details).trim().slice(0, 500) : null

  const report = await prisma.report.create({
    data: {
      churchId: parseInt(id),
      reason,
      details,
    },
  })

  return NextResponse.json(report, { status: 201 })
}
