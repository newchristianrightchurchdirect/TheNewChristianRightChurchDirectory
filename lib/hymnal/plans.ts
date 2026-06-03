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
    id: 'mcheyne',
    title: "M'Cheyne One-Year Plan",
    dek: 'Robert Murray M\u2019Cheyne\u2019s celebrated calendar: four chapters daily, two in the family and two in the closet, covering the Old Testament once and the New Testament and Psalms twice in a year.',
    duration: '365 days',
    days: 365,
    stamp: 'Whole Bible \u00B7 Twice through NT',
  },
  {
    id: 'chrono-1y',
    title: 'Chronological One-Year',
    dek: 'Read the Scriptures in the order events occurred, weaving the historical books with the prophets and the Gospels in parallel.',
    duration: '365 days',
    days: 365,
    stamp: 'Whole Bible \u00B7 Chronological',
  },
  {
    id: 'psalms-30',
    title: 'Psalms in Thirty Days',
    dek: 'The ancient monastic discipline: five psalms each morning, five each evening, completing the Psalter monthly.',
    duration: '30 days',
    days: 30,
    stamp: 'Book of Psalms \u00B7 Daily',
  },
  {
    id: 'nt-90',
    title: 'New Testament in Ninety Days',
    dek: 'A three-month immersion in the apostolic writings, three chapters per day from Matthew through Revelation.',
    duration: '90 days',
    days: 90,
    stamp: 'New Testament \u00B7 Daily',
  },
  {
    id: 'gospels-lent',
    title: 'The Four Gospels for Lent',
    dek: 'Forty days through the life of Christ \u2014 a chapter of Matthew, Mark, Luke, or John daily through the Lenten season.',
    duration: '40 days',
    days: 40,
    stamp: 'Gospels \u00B7 Lenten',
  },
  {
    id: 'wsc',
    title: 'Westminster Shorter Catechism',
    dek: 'One question and answer each day with proof-texts \u2014 the historic catechism of Reformed Christendom completed in three months.',
    duration: '107 days',
    days: 107,
    stamp: 'Catechism \u00B7 Daily',
  },
]

export function findPlan(id: string): ReadingPlan | undefined {
  return READING_PLANS.find((p) => p.id === id)
}
