import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-guard'
import { validateCsrf } from '@/lib/csrf'

// Fields an admin may edit from the dashboard. Anything not listed is ignored rather than
// trusted, so a crafted request cannot flip `approved` or rewrite ids.
const EDITABLE = [
  'name', 'denomination', 'address', 'city', 'state', 'zip', 'website', 'phone', 'email',
  'leadership', 'description', 'theologicalNotes', 'notablePeople', 'researchNote',
  'recordFlag', 'sourceUrls', 'researchStatus', 'stanceBasis',
] as const

// Stance fields are edited through the same form but recorded separately: every change to one
// of these writes a StanceChange row. CLAUDE.md requires a log entry per stance change, and
// relying on whoever is editing to remember is not a control.
const STANCE_FIELDS = [
  'zionistStance', 'abolitionStance', 'christianNationalism', 'eschatology', 'theonomy',
  'federalVision', 'socialJusticeStance', 'sexualityStance', 'genderStance', 'culturalEngagement',
] as const

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const csrfError = validateCsrf(request)
  if (csrfError) return csrfError
  const denied = await requireAdmin()
  if (denied) return denied

  const { id } = await params
  const churchId = parseInt(id, 10)
  if (isNaN(churchId)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

  const existing = await prisma.church.findUnique({ where: { id: churchId } })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await request.json()
  const data: Record<string, unknown> = {}
  const changes: Array<{ field: string; oldValue: string | null; newValue: string | null }> = []

  for (const f of EDITABLE) {
    if (f in body && body[f] !== (existing as any)[f]) {
      data[f] = body[f] === '' ? null : body[f]
    }
  }
  for (const f of STANCE_FIELDS) {
    if (f in body && body[f] !== (existing as any)[f]) {
      data[f] = body[f]
      changes.push({ field: f, oldValue: (existing as any)[f] ?? null, newValue: body[f] ?? null })
    }
  }

  if (!Object.keys(data).length) return NextResponse.json({ ok: true, changed: 0, stanceChanges: 0 })

  const note = typeof body.changeNote === 'string' ? body.changeNote.slice(0, 500) : null
  // A stance edit without a reason is exactly the unsourced claim this directory exists to avoid.
  if (changes.length && !note) {
    return NextResponse.json(
      { error: 'A reason is required when changing a stance field.' },
      { status: 400 },
    )
  }

  const updated = await prisma.church.update({ where: { id: churchId }, data })

  if (changes.length) {
    await prisma.stanceChange.createMany({
      data: changes.map(c => ({
        churchId, churchName: existing.name, field: c.field,
        oldValue: c.oldValue, newValue: c.newValue, actor: 'admin', note,
      })),
    })
  }

  return NextResponse.json({ ok: true, changed: Object.keys(data).length, stanceChanges: changes.length, church: updated })
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin()
  if (denied) return denied
  const { id } = await params
  const churchId = parseInt(id, 10)
  if (isNaN(churchId)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

  const [church, history] = await Promise.all([
    prisma.church.findUnique({ where: { id: churchId } }),
    prisma.stanceChange.findMany({ where: { churchId }, orderBy: { createdAt: 'desc' }, take: 50 }),
  ])
  if (!church) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ church, history })
}
