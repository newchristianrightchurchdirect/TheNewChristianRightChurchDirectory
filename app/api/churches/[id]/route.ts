import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const church = await prisma.church.findUnique({
    where: { id: parseInt(id), approved: true },
  })

  if (!church) {
    return NextResponse.json({ error: 'Church not found' }, { status: 404 })
  }

  return NextResponse.json(church)
}
