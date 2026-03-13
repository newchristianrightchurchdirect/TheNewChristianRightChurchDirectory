import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const churchId = parseInt(id)

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
