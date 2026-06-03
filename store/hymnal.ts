import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Identifies one hymn or psalm selection in a specific hymnal.
export type HymnRef = {
  hymnal: string  // hymnal slug, e.g. 'trinity-psalter-hymnal'
  number: string  // hymn number (string to support tokens like "1A", "S1")
}

// Identifies one Bible chapter (book uses NXR id, e.g. 'gen', 'matt').
export type BibleRef = {
  translation: string  // e.g. 'esv'
  book: string
  chapter: number
}

// Identifies one confession / creed document.
export type ConfessionRef = {
  id: string
}

// Identifies one entry within a confession / creed document.
export type ConfessionEntryRef = {
  docId: string
  key: string  // stable composite of group index + entry index (or label)
}

// One element of a worship-service order.
export type ServiceItem =
  | { kind: 'hymn'; ref: HymnRef; note?: string }
  | { kind: 'scripture'; ref: BibleRef; note?: string }
  | { kind: 'confession'; ref: ConfessionRef; section?: string; note?: string }
  | { kind: 'note'; text: string }

export type Service = {
  id: string
  title: string
  date?: string  // YYYY-MM-DD
  items: ServiceItem[]
  createdAt: number
  updatedAt: number
}

type State = {
  // Saved selections
  favoriteHymns: HymnRef[]
  bookmarkedChapters: BibleRef[]
  favoriteConfessions: ConfessionRef[]
  bookmarkedConfessionEntries: ConfessionEntryRef[]

  // Custom services
  services: Service[]

  // Search overlay history
  searchHistory: string[]

  // Active reading plans (by plan id)
  activePlanIds: string[]

  // Per-plan progress: start date (YYYY-MM-DD) + set of completed day numbers (1-indexed)
  planProgress: Record<string, { startDate: string; completedDays: number[] }>

  // User-imported hymnals (full HymnalDocument JSON, keyed by slug)
  customHymnals: { slug: string; title: string; short: string; year?: number; data: unknown }[]

  // Last-opened memory: hymnal slug -> last hymn number; translation slug -> last chapter ref
  lastOpenedHymn: Record<string, string>
  lastOpenedChapter: Record<string, { book: string; chapter: number }>

  // Reader preferences
  textScale: number       // 0.85 .. 1.5
  showRomanNumerals: boolean
  showDropCaps: boolean
  bibleSingleColumn: boolean
  defaultHymnal: string   // slug
  defaultBible: string    // slug
  themePref: 'light' | 'dark' | 'system'

  // Mutations
  toggleHymnFavorite: (ref: HymnRef) => void
  toggleChapterBookmark: (ref: BibleRef) => void
  toggleConfessionFavorite: (ref: ConfessionRef) => void
  toggleConfessionEntryBookmark: (ref: ConfessionEntryRef) => void

  isHymnFavorite: (ref: HymnRef) => boolean
  isChapterBookmarked: (ref: BibleRef) => boolean
  isConfessionFavorite: (ref: ConfessionRef) => boolean
  isConfessionEntryBookmarked: (ref: ConfessionEntryRef) => boolean

  createService: (title: string, date?: string) => string
  deleteService: (id: string) => void
  renameService: (id: string, title: string) => void
  setServiceDate: (id: string, date: string | undefined) => void
  addServiceItem: (id: string, item: ServiceItem) => void
  removeServiceItem: (id: string, index: number) => void
  moveServiceItem: (id: string, from: number, to: number) => void
  setServiceItemNote: (id: string, index: number, note: string | undefined) => void

  setTextScale: (n: number) => void
  setShowRomanNumerals: (b: boolean) => void
  setShowDropCaps: (b: boolean) => void
  setBibleSingleColumn: (b: boolean) => void
  setDefaultHymnal: (slug: string) => void
  setDefaultBible: (slug: string) => void
  setThemePref: (t: 'light' | 'dark' | 'system') => void

  addSearchTerm: (term: string) => void
  removeSearchTerm: (term: string) => void
  clearSearchHistory: () => void

  toggleActivePlan: (planId: string) => void
  isPlanActive: (planId: string) => boolean
  markPlanDay: (planId: string, day: number, done: boolean) => void
  resetPlanStart: (planId: string) => void

  addCustomHymnal: (h: { slug: string; title: string; short: string; year?: number; data: unknown }) => void
  removeCustomHymnal: (slug: string) => void

  setLastOpenedHymn: (slug: string, number: string) => void
  setLastOpenedChapter: (translation: string, book: string, chapter: number) => void
}

function eqHymn(a: HymnRef, b: HymnRef) {
  return a.hymnal === b.hymnal && a.number === b.number
}
function eqChapter(a: BibleRef, b: BibleRef) {
  return a.translation === b.translation && a.book === b.book && a.chapter === b.chapter
}
function eqConf(a: ConfessionRef, b: ConfessionRef) { return a.id === b.id }
function eqEntry(a: ConfessionEntryRef, b: ConfessionEntryRef) { return a.docId === b.docId && a.key === b.key }

function newId() {
  return 'svc_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}

export const useHymnalStore = create<State>()(
  persist(
    (set, get) => ({
      favoriteHymns: [],
      bookmarkedChapters: [],
      favoriteConfessions: [],
      bookmarkedConfessionEntries: [],
      services: [],
      searchHistory: [],
      activePlanIds: [],
      planProgress: {},
      customHymnals: [],
      lastOpenedHymn: {},
      lastOpenedChapter: {},

      textScale: 1,
      showRomanNumerals: true,
      showDropCaps: true,
      bibleSingleColumn: false,
      defaultHymnal: 'trinity-psalter-hymnal',
      defaultBible: 'esv',
      themePref: 'system',

      toggleHymnFavorite: (ref) => set((s) => {
        const present = s.favoriteHymns.some((r) => eqHymn(r, ref))
        return { favoriteHymns: present
          ? s.favoriteHymns.filter((r) => !eqHymn(r, ref))
          : [...s.favoriteHymns, ref] }
      }),
      toggleChapterBookmark: (ref) => set((s) => {
        const present = s.bookmarkedChapters.some((r) => eqChapter(r, ref))
        return { bookmarkedChapters: present
          ? s.bookmarkedChapters.filter((r) => !eqChapter(r, ref))
          : [...s.bookmarkedChapters, ref] }
      }),
      toggleConfessionFavorite: (ref) => set((s) => {
        const present = s.favoriteConfessions.some((r) => eqConf(r, ref))
        return { favoriteConfessions: present
          ? s.favoriteConfessions.filter((r) => !eqConf(r, ref))
          : [...s.favoriteConfessions, ref] }
      }),
      toggleConfessionEntryBookmark: (ref) => set((s) => {
        const present = s.bookmarkedConfessionEntries.some((r) => eqEntry(r, ref))
        return { bookmarkedConfessionEntries: present
          ? s.bookmarkedConfessionEntries.filter((r) => !eqEntry(r, ref))
          : [...s.bookmarkedConfessionEntries, ref] }
      }),

      isHymnFavorite: (ref) => get().favoriteHymns.some((r) => eqHymn(r, ref)),
      isChapterBookmarked: (ref) => get().bookmarkedChapters.some((r) => eqChapter(r, ref)),
      isConfessionFavorite: (ref) => get().favoriteConfessions.some((r) => eqConf(r, ref)),
      isConfessionEntryBookmarked: (ref) => get().bookmarkedConfessionEntries.some((r) => eqEntry(r, ref)),

      createService: (title, date) => {
        const id = newId()
        const now = Date.now()
        set((s) => ({
          services: [
            ...s.services,
            { id, title, date, items: [], createdAt: now, updatedAt: now },
          ],
        }))
        return id
      },
      deleteService: (id) => set((s) => ({ services: s.services.filter((x) => x.id !== id) })),
      renameService: (id, title) => set((s) => ({
        services: s.services.map((x) => x.id === id ? { ...x, title, updatedAt: Date.now() } : x),
      })),
      setServiceDate: (id, date) => set((s) => ({
        services: s.services.map((x) => x.id === id ? { ...x, date, updatedAt: Date.now() } : x),
      })),
      addServiceItem: (id, item) => set((s) => ({
        services: s.services.map((x) => x.id === id
          ? { ...x, items: [...x.items, item], updatedAt: Date.now() }
          : x),
      })),
      removeServiceItem: (id, index) => set((s) => ({
        services: s.services.map((x) => x.id === id
          ? { ...x, items: x.items.filter((_, i) => i !== index), updatedAt: Date.now() }
          : x),
      })),
      moveServiceItem: (id, from, to) => set((s) => ({
        services: s.services.map((x) => {
          if (x.id !== id) return x
          if (from < 0 || from >= x.items.length || to < 0 || to >= x.items.length) return x
          const next = x.items.slice()
          const [m] = next.splice(from, 1)
          next.splice(to, 0, m)
          return { ...x, items: next, updatedAt: Date.now() }
        }),
      })),
      setServiceItemNote: (id, index, note) => set((s) => ({
        services: s.services.map((x) => x.id === id
          ? { ...x, items: x.items.map((it, i) => i === index ? ({ ...it, note } as ServiceItem) : it), updatedAt: Date.now() }
          : x),
      })),

      setTextScale: (n) => set({ textScale: Math.max(0.75, Math.min(1.75, n)) }),
      setShowRomanNumerals: (b) => set({ showRomanNumerals: b }),
      setShowDropCaps: (b) => set({ showDropCaps: b }),
      setBibleSingleColumn: (b) => set({ bibleSingleColumn: b }),
      setDefaultHymnal: (slug) => set({ defaultHymnal: slug }),
      setDefaultBible: (slug) => set({ defaultBible: slug }),
      setThemePref: (t) => set({ themePref: t }),

      addSearchTerm: (term) => set((s) => {
        const t = term.trim()
        if (!t) return {}
        const next = [t, ...s.searchHistory.filter((x) => x.toLowerCase() !== t.toLowerCase())].slice(0, 12)
        return { searchHistory: next }
      }),
      removeSearchTerm: (term) => set((s) => ({
        searchHistory: s.searchHistory.filter((x) => x !== term),
      })),
      clearSearchHistory: () => set({ searchHistory: [] }),

      toggleActivePlan: (planId) => set((s) => {
        const isActive = s.activePlanIds.includes(planId)
        if (isActive) {
          return { activePlanIds: s.activePlanIds.filter((x) => x !== planId) }
        }
        const today = new Date().toISOString().slice(0, 10)
        const prev = s.planProgress[planId]
        return {
          activePlanIds: [...s.activePlanIds, planId],
          planProgress: prev
            ? s.planProgress
            : { ...s.planProgress, [planId]: { startDate: today, completedDays: [] } },
        }
      }),
      isPlanActive: (planId) => get().activePlanIds.includes(planId),
      markPlanDay: (planId, day, done) => set((s) => {
        const today = new Date().toISOString().slice(0, 10)
        const prev = s.planProgress[planId] ?? { startDate: today, completedDays: [] }
        const set2 = new Set(prev.completedDays)
        if (done) set2.add(day); else set2.delete(day)
        return {
          planProgress: {
            ...s.planProgress,
            [planId]: { ...prev, completedDays: [...set2].sort((a, b) => a - b) },
          },
        }
      }),
      resetPlanStart: (planId) => set((s) => {
        const today = new Date().toISOString().slice(0, 10)
        return {
          planProgress: {
            ...s.planProgress,
            [planId]: { startDate: today, completedDays: [] },
          },
        }
      }),

      addCustomHymnal: (h) => set((s) => ({
        customHymnals: [...s.customHymnals.filter((x) => x.slug !== h.slug), h],
      })),
      removeCustomHymnal: (slug) => set((s) => ({
        customHymnals: s.customHymnals.filter((x) => x.slug !== slug),
      })),

      setLastOpenedHymn: (slug, number) => set((s) => ({
        lastOpenedHymn: { ...s.lastOpenedHymn, [slug]: number },
      })),
      setLastOpenedChapter: (translation, book, chapter) => set((s) => ({
        lastOpenedChapter: { ...s.lastOpenedChapter, [translation]: { book, chapter } },
      })),
    }),
    {
      name: 'nxr-hymnal',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        favoriteHymns: s.favoriteHymns,
        bookmarkedChapters: s.bookmarkedChapters,
        favoriteConfessions: s.favoriteConfessions,
        bookmarkedConfessionEntries: s.bookmarkedConfessionEntries,
        services: s.services,
        searchHistory: s.searchHistory,
        activePlanIds: s.activePlanIds,
        planProgress: s.planProgress,
        customHymnals: s.customHymnals,
        lastOpenedHymn: s.lastOpenedHymn,
        lastOpenedChapter: s.lastOpenedChapter,
        textScale: s.textScale,
        showRomanNumerals: s.showRomanNumerals,
        showDropCaps: s.showDropCaps,
        bibleSingleColumn: s.bibleSingleColumn,
        defaultHymnal: s.defaultHymnal,
        defaultBible: s.defaultBible,
        themePref: s.themePref,
      }),
    },
  ),
)
