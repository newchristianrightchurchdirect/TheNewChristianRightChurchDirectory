import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-guard'

// The stance audit trail. church_research_log.md records this by hand; this records it whether
// or not anyone remembers to write it down.
export async function GET(request: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  const field = request.nextUrl.searchParams.get('field') || ''
  const changes = await prisma.stanceChange.findMany({
    where: field ? { field } : {},
    orderBy: { createdAt: 'desc' },
    take: 200,
  })

  const byField = await prisma.stanceChange.groupBy({
    by: ['field'],
    _count: true,
  })

  return NextResponse.json({
    changes,
    byField: byField.map(f => ({ field: f.field, n: f._count })).sort((a, b) => b.n - a.n),
    total: await prisma.stanceChange.count(),
  })
}
