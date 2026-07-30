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

  // Not everything at approved=false is a submission. Imported and scripted rows are HELD here
  // on purpose — duplicates, closed congregations, records that failed review. Presenting those
  // as "awaiting review" is what caused 28 of them to be published on 2026-07-30, so the split
  // is made server-side rather than left to the UI to infer.
  const isHeld = (c: (typeof churches)[number]) =>
    !!c.recordFlag || c.submissionSource !== 'public_form'

  return NextResponse.json({
    submissions: churches.filter(c => !isHeld(c)),
    held: churches.filter(isHeld),
  })
}
