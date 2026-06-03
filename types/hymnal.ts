// Schemas mirror the JSON shipped in public/hymnal-data/
// (ported from the NXRHymnal Android app's asset bundle).

export type HymnVerse = {
  number: number
  isChorus: boolean
  text: string
}

export type Hymn = {
  number: number
  title: string
  firstLine?: string | null
  tune?: string | null
  author?: string | null
  meter?: string | null
  key?: string | null
  composer?: string | null
  scriptureReference?: string | null
  sheetMusicUrl?: string | null
  audioUrl?: string | null
  verses: HymnVerse[]
}

export type HymnalMeta = {
  id: string
  name: string
  abbreviation: string
  description?: string | null
  year?: number | null
  publisher?: string | null
}

export type HymnalDocument = {
  hymnal: HymnalMeta
  hymns: Hymn[]
}

// --- Bible ---

export type BibleVerse = {
  number: number
  text: string
}

export type BibleChapter = {
  number: number
  verses: BibleVerse[]
}

export type BibleBook = {
  id: string
  name: string
  abbreviation: string
  testament: 'old' | 'new' | string
  chapters: BibleChapter[]
}

export type BibleTranslationMeta = {
  id: string
  name: string
  abbreviation: string
  language?: string | null
  license?: string | null
}

export type BibleDocument = {
  translation: BibleTranslationMeta
  books: BibleBook[]
}

// --- Confessions / Creeds ---

export type ConfessionEntry = {
  id?: string
  label?: string | null
  question?: string | null
  answer?: string | null
  proofs?: string | null
  [k: string]: unknown
}

export type ConfessionGroup = {
  number?: number | string | null
  title?: string
  entries?: ConfessionEntry[]
  [k: string]: unknown
}

export type ConfessionDocument = {
  id: string
  type: string
  title: string
  year?: number | null
  authors?: string[] | null
  alternativeTitles?: string[] | null
  tradition?: string | null
  country?: string | null
  content?: string | null
  groups?: ConfessionGroup[] | null
}

export type ConfessionsFile = {
  source?: string
  documents: ConfessionDocument[]
}

// --- Index of bundled hymnals (used by the home picker) ---

export type HymnalSource = {
  slug: string         // url slug, e.g. 'trinity-hymnal-1961'
  file: string         // filename inside /hymnal-data/
  title: string        // display title
  short: string        // short label / abbreviation
  year?: number
  blurb?: string       // one-line description for the picker card
}

export type BibleSource = {
  slug: string         // 'esv', 'kjv', etc.
  file: string
  title: string
  short: string
}
