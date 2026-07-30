import type { PrismaClient } from '@prisma/client'

// Batch scripts write straight through Prisma and bypass the admin API, so the StanceChange
// trail would otherwise miss the majority of its subject matter — nearly every stance change on
// this directory has come from a script, not the dashboard.
//
// Usage from a script:
//
//   import { updateStances } from '@/lib/stance-audit'
//   await updateStances(prisma, churchId, { culturalEngagement: 'transformationalist' }, {
//     actor: 'derive-cultural-engagement-2026-07-30.ts',
//     note: 'Church hosts One Life For Life as its own ministry; see sourceUrls.',
//   })

export const STANCE_FIELDS = [
  'zionistStance', 'abolitionStance', 'christianNationalism', 'eschatology', 'theonomy',
  'federalVision', 'socialJusticeStance', 'sexualityStance', 'genderStance', 'culturalEngagement',
] as const

export type StanceField = (typeof STANCE_FIELDS)[number]

/**
 * Applies stance changes to a church and records each one, refusing to write without a reason.
 * Non-stance fields may be passed in `alsoSet` and are updated without an audit row.
 *
 * Returns the fields that actually changed — passing a value identical to the stored one is a
 * no-op and is not logged, so re-running a script does not pollute the trail.
 */
export async function updateStances(
  prisma: PrismaClient,
  churchId: number,
  stances: Partial<Record<StanceField, string>>,
  opts: { actor: string; note: string; alsoSet?: Record<string, unknown> },
): Promise<StanceField[]> {
  if (!opts.note?.trim()) {
    throw new Error(
      `updateStances(#${churchId}): a note is required. An unsourced stance is worse than a missing one.`,
    )
  }
  if (!opts.actor?.trim()) {
    throw new Error(`updateStances(#${churchId}): an actor is required (use the script filename).`)
  }

  const existing = await prisma.church.findUnique({ where: { id: churchId } })
  if (!existing) throw new Error(`updateStances: church #${churchId} not found`)

  const changed: StanceField[] = []
  const data: Record<string, unknown> = { ...(opts.alsoSet || {}) }

  for (const f of STANCE_FIELDS) {
    const next = stances[f]
    if (next === undefined) continue
    if (next === (existing as any)[f]) continue // no-op, keeps re-runs out of the trail
    data[f] = next
    changed.push(f)
  }

  if (!changed.length && !Object.keys(opts.alsoSet || {}).length) return []

  await prisma.church.update({ where: { id: churchId }, data })

  if (changed.length) {
    await prisma.stanceChange.createMany({
      data: changed.map(f => ({
        churchId,
        churchName: existing.name,
        field: f,
        oldValue: (existing as any)[f] ?? null,
        newValue: stances[f] ?? null,
        actor: opts.actor,
        note: opts.note,
      })),
    })
  }

  return changed
}
