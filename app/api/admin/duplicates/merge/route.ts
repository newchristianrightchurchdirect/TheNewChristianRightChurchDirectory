import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-guard'
import { validateCsrf } from '@/lib/csrf'

// Merge a duplicate into a survivor, then delete it.
//
// The ORDER is the whole point. Deleting first has already cost this directory a Knox Seminary
// Open Letter signatory note that existed only on the duplicate row. Encoding it here means the
// safe path is the default path rather than something the operator has to remember.

// Contact and factual fields worth rescuing. Stances are deliberately excluded: the survivor is
// normally the researched row, and duplicates usually carry denominational defaults, so copying
// them would quietly downgrade an evidenced stance to a guess.
const FILLABLE = [
  'website', 'phone', 'email', 'address', 'zip', 'leadership', 'description', 'denomination',
] as const

const isEmpty = (v: unknown) => v == null || v === '' || v === 'unknown'

export async function POST(request: NextRequest) {
  const csrfError = validateCsrf(request)
  if (csrfError) return csrfError
  const denied = await requireAdmin()
  if (denied) return denied

  const { duplicateId, survivorId, dryRun } = await request.json()
  const dupId = Number(duplicateId)
  const survId = Number(survivorId)
  if (!dupId || !survId || dupId === survId) {
    return NextResponse.json({ error: 'Need two different church ids' }, { status: 400 })
  }

  const [dup, survivor] = await Promise.all([
    prisma.church.findUnique({ where: { id: dupId } }),
    prisma.church.findUnique({ where: { id: survId } }),
  ])
  if (!dup || !survivor) return NextResponse.json({ error: 'Church not found' }, { status: 404 })

  const patch: Record<string, unknown> = {}
  const rescued: string[] = []
  for (const f of FILLABLE) {
    if (isEmpty((survivor as any)[f]) && !isEmpty((dup as any)[f])) {
      patch[f] = (dup as any)[f]
      rescued.push(f)
    }
  }
  if (survivor.latitude == null && dup.latitude != null) {
    patch.latitude = dup.latitude
    patch.longitude = dup.longitude
    rescued.push('coordinates')
  }

  const sSrc = (survivor.sourceUrls || '').split(';').filter(Boolean)
  const dSrc = (dup.sourceUrls || '').split(';').filter(Boolean)
  const addSrc = dSrc.filter(u => !sSrc.includes(u))
  if (addSrc.length) {
    patch.sourceUrls = [...sSrc, ...addSrc].join(';')
    rescued.push(`${addSrc.length} source url(s)`)
  }

  const dNote = (dup.theologicalNotes || '').trim()
  if (dNote && !(survivor.theologicalNotes || '').includes(dNote)) {
    patch.theologicalNotes =
      `${survivor.theologicalNotes || ''}\n\nFrom merged duplicate record #${dup.id}: ${dNote}`.trim()
    rescued.push('research notes')
  }

  // Let the operator see what would move before anything is destroyed.
  if (dryRun) {
    return NextResponse.json({
      dryRun: true,
      survivor: { id: survivor.id, name: survivor.name, city: survivor.city, state: survivor.state },
      duplicate: { id: dup.id, name: dup.name, city: dup.city, state: dup.state },
      rescued,
    })
  }

  if (Object.keys(patch).length) {
    await prisma.church.update({
      where: { id: survId },
      data: {
        ...patch,
        researchNote: `${new Date().toISOString().slice(0, 10)}: absorbed duplicate record #${dup.id} (${dup.name}) before it was deleted.`,
      },
    })
  }

  await prisma.stanceChange.create({
    data: {
      churchId: survId, churchName: survivor.name, field: 'merge',
      oldValue: `#${dup.id} ${dup.name}`,
      newValue: rescued.length ? `merged: ${rescued.join(', ')}` : 'nothing to merge',
      actor: 'admin', note: `Duplicate #${dup.id} merged into #${survId} and deleted.`,
    },
  })

  await prisma.church.delete({ where: { id: dupId } })

  return NextResponse.json({ ok: true, rescued, deleted: dupId, survivorId: survId })
}
