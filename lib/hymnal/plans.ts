// Static list of bundled reading plans. Active state lives in the Zustand
// store (`activePlanIds`). Per-day reading lists are not yet generated;
// activating a plan currently bookmarks it on the user's dashboard.

export type ReadingPlan = {
  id: string
  title: string
  dek: string
  duration: string  // e.g. "365 days"
  days: number      // numeric duration for progress math
  stamp: string     // small-caps subtitle, e.g. "Whole Bible \u00B7 Daily"
}

export const READING_PLANS: ReadingPlan[] = [
  {
    id: 'bible_in_a_year',
    title: 'Bible in a Year',
    dek: 'Read the entire Bible in canonical order, about three chapters each day.',
    duration: '365 days',
    days: 365,
    stamp: 'Whole Bible \u00B7 Daily',
  },
  {
    id: 'psalms_in_30_days',
    title: 'Psalter in a Month',
    dek: 'Pray through the Psalter in thirty days, five psalms per day.',
    duration: '30 days',
    days: 30,
    stamp: 'Book of Psalms \u00B7 Daily',
  },
]

export function findPlan(id: string): ReadingPlan | undefined {
  return READING_PLANS.find((p) => p.id === id)
}
