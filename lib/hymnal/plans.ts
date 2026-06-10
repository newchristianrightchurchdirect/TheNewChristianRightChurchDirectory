// Static list of bundled reading plans. Active state lives in the Zustand
// store (`activePlanIds`); readingForDay() computes the day's chapters.

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

// Canonical KJV chapter counts; book route id = array index + 1.
const BOOKS: { name: string; chapters: number }[] = [
  { name: 'Genesis', chapters: 50 }, { name: 'Exodus', chapters: 40 }, { name: 'Leviticus', chapters: 27 },
  { name: 'Numbers', chapters: 36 }, { name: 'Deuteronomy', chapters: 34 }, { name: 'Joshua', chapters: 24 },
  { name: 'Judges', chapters: 21 }, { name: 'Ruth', chapters: 4 }, { name: '1 Samuel', chapters: 31 },
  { name: '2 Samuel', chapters: 24 }, { name: '1 Kings', chapters: 22 }, { name: '2 Kings', chapters: 25 },
  { name: '1 Chronicles', chapters: 29 }, { name: '2 Chronicles', chapters: 36 }, { name: 'Ezra', chapters: 10 },
  { name: 'Nehemiah', chapters: 13 }, { name: 'Esther', chapters: 10 }, { name: 'Job', chapters: 42 },
  { name: 'Psalms', chapters: 150 }, { name: 'Proverbs', chapters: 31 }, { name: 'Ecclesiastes', chapters: 12 },
  { name: 'Song of Solomon', chapters: 8 }, { name: 'Isaiah', chapters: 66 }, { name: 'Jeremiah', chapters: 52 },
  { name: 'Lamentations', chapters: 5 }, { name: 'Ezekiel', chapters: 48 }, { name: 'Daniel', chapters: 12 },
  { name: 'Hosea', chapters: 14 }, { name: 'Joel', chapters: 3 }, { name: 'Amos', chapters: 9 },
  { name: 'Obadiah', chapters: 1 }, { name: 'Jonah', chapters: 4 }, { name: 'Micah', chapters: 7 },
  { name: 'Nahum', chapters: 3 }, { name: 'Habakkuk', chapters: 3 }, { name: 'Zephaniah', chapters: 3 },
  { name: 'Haggai', chapters: 2 }, { name: 'Zechariah', chapters: 14 }, { name: 'Malachi', chapters: 4 },
  { name: 'Matthew', chapters: 28 }, { name: 'Mark', chapters: 16 }, { name: 'Luke', chapters: 24 },
  { name: 'John', chapters: 21 }, { name: 'Acts', chapters: 28 }, { name: 'Romans', chapters: 16 },
  { name: '1 Corinthians', chapters: 16 }, { name: '2 Corinthians', chapters: 13 }, { name: 'Galatians', chapters: 6 },
  { name: 'Ephesians', chapters: 6 }, { name: 'Philippians', chapters: 4 }, { name: 'Colossians', chapters: 4 },
  { name: '1 Thessalonians', chapters: 5 }, { name: '2 Thessalonians', chapters: 3 }, { name: '1 Timothy', chapters: 6 },
  { name: '2 Timothy', chapters: 4 }, { name: 'Titus', chapters: 3 }, { name: 'Philemon', chapters: 1 },
  { name: 'Hebrews', chapters: 13 }, { name: 'James', chapters: 5 }, { name: '1 Peter', chapters: 5 },
  { name: '2 Peter', chapters: 3 }, { name: '1 John', chapters: 5 }, { name: '2 John', chapters: 1 },
  { name: '3 John', chapters: 1 }, { name: 'Jude', chapters: 1 }, { name: 'Revelation', chapters: 22 },
]
const TOTAL_CHAPTERS = BOOKS.reduce((a, b) => a + b.chapters, 0) // 1,189

export type ReadingSegment = {
  bookId: number      // route id, 1-based
  bookName: string
  from: number        // first chapter
  to: number          // last chapter (== from for single)
}

/** The chapters assigned to `day` (1-based) of a plan, or null if out of range. */
export function readingForDay(planId: string, day: number): ReadingSegment[] | null {
  const plan = findPlan(planId)
  if (!plan || day < 1 || day > plan.days) return null

  if (planId === 'psalms_in_30_days') {
    // traditional 30-day psalter: psalm d, d+30, d+60, d+90, d+120
    const segs: ReadingSegment[] = []
    for (let p = day; p <= 150; p += 30) {
      segs.push({ bookId: 19, bookName: 'Psalms', from: p, to: p })
    }
    return segs
  }

  // even split of the canon: day d covers global chapters [lo, hi] (0-based)
  const lo = Math.floor(((day - 1) * TOTAL_CHAPTERS) / plan.days)
  const hi = Math.floor((day * TOTAL_CHAPTERS) / plan.days) - 1
  const segs: ReadingSegment[] = []
  let acc = 0
  for (let b = 0; b < BOOKS.length && acc <= hi; b++) {
    const start = acc
    const end = acc + BOOKS[b].chapters - 1
    if (end >= lo) {
      const from = Math.max(lo, start) - start + 1
      const to = Math.min(hi, end) - start + 1
      segs.push({ bookId: b + 1, bookName: BOOKS[b].name, from, to })
    }
    acc = end + 1
  }
  return segs
}

export function formatReading(segs: ReadingSegment[]): string {
  return segs
    .map((s) => (s.from === s.to ? `${s.bookName} ${s.from}` : `${s.bookName} ${s.from}–${s.to}`))
    .join(' · ')
}
