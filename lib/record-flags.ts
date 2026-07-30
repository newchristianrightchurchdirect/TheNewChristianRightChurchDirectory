// The recordFlag vocabulary. Flags were free text, which is how "closed_hidden" ended up
// meaning nothing anywhere and a closed congregation stayed published. Anything not listed
// here still displays, but as an unrecognised flag so it gets noticed rather than ignored.

export type FlagDef = {
  key: string
  label: string
  /** Held flags keep a row off the directory and out of the submissions queue. */
  held: boolean
  description: string
}

export const RECORD_FLAGS: FlagDef[] = [
  { key: 'duplicate_of', label: 'Duplicate', held: true,
    description: 'Already present under another id. Merge anything unique into the survivor, then delete.' },
  { key: 'closed', label: 'Closed', held: true,
    description: 'Congregation has dissolved or stopped meeting.' },
  { key: 'review_nonfit', label: 'Out of scope', held: true,
    description: 'Reviewed and judged not to belong in this directory.' },
  { key: 'in_transition', label: 'In transition', held: false,
    description: 'Renaming, merging or relocating — verify before citing.' },
  { key: 'denom_ambiguous', label: 'Denomination unclear', held: false,
    description: 'Sources disagree on affiliation.' },
  { key: 'denom_verify', label: 'Denomination unverified', held: false,
    description: 'Affiliation taken from a single weak source.' },
  { key: 'denom_corrected', label: 'Denomination corrected', held: false,
    description: 'Affiliation was wrong and has been fixed.' },
  { key: 'verify_stance', label: 'Stance needs verifying', held: false,
    description: 'A recorded stance rests on thin evidence.' },
  { key: 'website_removed', label: 'Website gone', held: false,
    description: 'Site no longer resolves; contact details may be stale.' },
  { key: 'pastor_vacant', label: 'Pulpit vacant', held: false, description: 'No settled pastor.' },
  { key: 'corrected', label: 'Corrected', held: false, description: 'Record has been through a correction pass.' },
  { key: 'added_via_ar_list', label: 'From AR list', held: false, description: 'Sourced from the abolitionist-orgs list.' },
  { key: 'added_via_crosscheck', label: 'From cross-check', held: false, description: 'Found while cross-referencing another source.' },
]

const BY_KEY = new Map(RECORD_FLAGS.map(f => [f.key, f]))

/** Split a ';'-separated recordFlag into its parts, resolving known definitions. */
export function parseFlags(recordFlag: string | null | undefined) {
  if (!recordFlag) return []
  return recordFlag.split(';').map(raw => raw.trim()).filter(Boolean).map(raw => {
    const key = raw.split(':')[0]
    const def = BY_KEY.get(key)
    const targetId = key === 'duplicate_of' ? raw.split(':')[1] : undefined
    return {
      raw,
      key,
      targetId,
      label: def ? (targetId ? `${def.label} of #${targetId}` : def.label) : `Unrecognised: ${raw}`,
      held: def?.held ?? false,
      known: !!def,
      description: def?.description ?? 'Not part of the flag vocabulary — check whether it is a typo.',
    }
  })
}

/** True when any flag on the row should keep it off the public directory. */
export function isHeldFlag(recordFlag: string | null | undefined) {
  return parseFlags(recordFlag).some(f => f.held)
}
