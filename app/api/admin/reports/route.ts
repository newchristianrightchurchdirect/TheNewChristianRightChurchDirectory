import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-guard'
import { validateCsrf } from '@/lib/csrf'

// Visitors have been able to report bad data from church pages all along, but nothing ever
// read those rows — they accumulated unseen. This is the inbox.
export async function GET(request: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  const status = request.nextUrl.searchParams.get('status') || 'open'
  const reports = await prisma.report.findMany({
    where: status === 'all' ? {} : { status },
    orderBy: { createdAt: 'desc' },
    take: 200,
  })

  // Report has no FK to Church, so the church is attached by hand — and may be missing if the
  // congregation was deleted after the report was filed.
  const ids = [...new Set(reports.map(r => r.churchId))]
  const churches = await prisma.church.findMany({
    where: { id: { in: ids } },
    select: { id: true, name: true, city: true, state: true, denomination: true },
  })
  const byId = new Map(churches.map(c => [c.id, c]))

  return NextResponse.json({
    reports: reports.map(r => ({ ...r, church: byId.get(r.churchId) ?? null })),
    counts: {
      open: await prisma.report.count({ where: { status: 'open' } }),
      resolved: await prisma.report.count({ where: { status: 'resolved' } }),
      dismissed: await prisma.report.count({ where: { status: 'dismissed' } }),
    },
  })
}

export async function PATCH(request: NextRequest) {
  const csrfError = validateCsrf(request)
  if (csrfError) return csrfError
  const denied = await requireAdmin()
  if (denied) return denied

  const { id, status, adminNote } = await request.json()
  if (!id || !['open', 'resolved', 'dismissed'].includes(status)) {
    return NextResponse.json({ error: 'Invalid id or status' }, { status: 400 })
  }

  const updated = await prisma.report.update({
    where: { id: Number(id) },
    data: {
      status,
      adminNote: typeof adminNote === 'string' ? adminNote.slice(0, 500) : undefined,
      resolvedAt: status === 'open' ? null : new Date(),
    },
  })
  return NextResponse.json({ ok: true, report: updated })
}
