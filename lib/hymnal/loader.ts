// Tiny client-side cache + fetch helpers for the bundled JSON assets.
// Each file is fetched at most once per page session; the service worker
// handles cross-session caching for offline mode.

import type {
  HymnalDocument,
  BibleDocument,
  BibleBook,
  ConfessionsFile,
} from '@/types/hymnal'
import { findHymnal, findBible, CONFESSIONS_FILE } from './sources'

const cache = new Map<string, Promise<unknown>>()

function fetchJson<T>(path: string): Promise<T> {
  let p = cache.get(path) as Promise<T> | undefined
  if (!p) {
    p = fetch(path, { cache: 'force-cache' }).then(async (r) => {
      if (!r.ok) throw new Error(`Failed to load ${path}: ${r.status}`)
      return (await r.json()) as T
    })
    cache.set(path, p)
  }
  return p
}

export function loadHymnal(slug: string): Promise<HymnalDocument> {
  const src = findHymnal(slug)
  if (!src) return Promise.reject(new Error(`Unknown hymnal: ${slug}`))
  return fetchJson<HymnalDocument>(`/hymnal-data/${src.file}`)
}

// The bundled Bible JSON files store `book.id` as an integer (1, 2, ...) and
// `book.testament` as "OT"/"NT". The reader expects string ids and the
// "old"/"new" testament tokens used by the rest of the UI. Normalize once on
// load so every consumer can rely on the same shape.
function normalizeBible(d: BibleDocument): BibleDocument {
  return {
    ...d,
    books: d.books.map((b) => {
      const t = String(b.testament || '').toLowerCase()
      const testament: BibleBook['testament'] =
        t === 'ot' || t.startsWith('o') ? 'old'
        : t === 'nt' || t.startsWith('n') ? 'new'
        : b.testament
      return { ...b, id: String(b.id), testament }
    }),
  }
}

const bibleCache = new Map<string, Promise<BibleDocument>>()

export function loadBible(slug: string): Promise<BibleDocument> {
  const src = findBible(slug)
  if (!src) return Promise.reject(new Error(`Unknown bible: ${slug}`))
  const path = `/hymnal-data/${src.file}`
  let p = bibleCache.get(path)
  if (!p) {
    p = fetch(path, { cache: 'force-cache' })
      .then(async (r) => {
        if (!r.ok) throw new Error(`Failed to load ${path}: ${r.status}`)
        return (await r.json()) as BibleDocument
      })
      .then(normalizeBible)
    bibleCache.set(path, p)
  }
  return p
}

export function loadConfessions(): Promise<ConfessionsFile> {
  return fetchJson<ConfessionsFile>(`/hymnal-data/${CONFESSIONS_FILE}`)
}

// Roman numeral helper for verse markers.
export function toRoman(num: number): string {
  if (num <= 0 || num > 3999) return String(num)
  const map: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ]
  let out = ''
  let n = num
  for (const [v, s] of map) {
    while (n >= v) { out += s; n -= v }
  }
  return out
}
