// Index of the bundled hymnal/bible/confession JSON assets.
// The actual content lives in /public/hymnal-data/*.json (loaded client-side).

import type { HymnalSource, BibleSource } from '@/types/hymnal'

export const HYMNALS: HymnalSource[] = [
  {
    slug: 'trinity-psalter-hymnal',
    file: 'trinity_psalter_hymnal.json',
    title: 'Trinity Psalter Hymnal',
    short: 'TPH',
    year: 2018,
    blurb: 'OPC / URCNA joint psalter-hymnal. 706 selections.',
  },
  {
    slug: 'trinity-hymnal-1961',
    file: 'trinity_hymnal_1961.json',
    title: 'Trinity Hymnal',
    short: 'TH',
    year: 1961,
    blurb: 'The original Trinity Hymnal of the Orthodox Presbyterian Church. 748 hymns.',
  },
  {
    slug: 'book-of-psalms-for-worship',
    file: 'book_of_psalms_for_worship.json',
    title: 'The Book of Psalms for Worship',
    short: 'BPW',
    year: 2009,
    blurb: 'Complete metrical Psalter of the RPCNA. 460 selections.',
  },
  {
    slug: 'cantus-christi',
    file: 'cantus_christi.json',
    title: 'Cantus Christi',
    short: 'CC',
    year: 2002,
    blurb: 'Psalms, hymns, and spiritual songs in the CREC tradition. 340 selections.',
  },
  {
    slug: 'hymns-of-grace',
    file: 'hymns_of_grace.json',
    title: 'Hymns of Grace',
    short: 'HoG',
    year: 2015,
    blurb: 'Modern hymnal compiled by The Master\u2019s Seminary. 321 hymns.',
  },
  {
    slug: 'sacred-harp-1991',
    file: 'sacred_harp_1991.json',
    title: 'The Sacred Harp',
    short: 'SH',
    year: 1991,
    blurb: 'Shape-note tradition. 1991 Revision. 554 tunes.',
  },
]

export function findHymnal(slug: string): HymnalSource | undefined {
  return HYMNALS.find((h) => h.slug === slug)
}

export const BIBLES: BibleSource[] = [
  { slug: 'esv',  file: 'bible_esv.json',  title: 'English Standard Version',  short: 'ESV'  },
  { slug: 'kjv',  file: 'bible_kjv.json',  title: 'King James Version',         short: 'KJV'  },
  { slug: 'nkjv', file: 'bible_nkjv.json', title: 'New King James Version',     short: 'NKJV' },
  { slug: 'lsb',  file: 'bible_lsb.json',  title: 'Legacy Standard Bible',      short: 'LSB'  },
  { slug: 'gnv',  file: 'bible_gnv.json',  title: 'Geneva Bible (1599)',        short: 'GNV'  },
]

export function findBible(slug: string): BibleSource | undefined {
  return BIBLES.find((b) => b.slug === slug)
}

export const CONFESSIONS_FILE = 'confessions.json'

// Order in which to fetch large assets when the user installs the PWA.
// Smaller selections first so the install feels fast even on slow connections.
export const PRECACHE_ORDER = [
  'trinity_psalter_hymnal.json',
  'trinity_hymnal_1961.json',
  'hymns_of_grace.json',
  'cantus_christi.json',
  'book_of_psalms_for_worship.json',
  'sacred_harp_1991.json',
  'confessions.json',
  'bible_esv.json',
  'bible_kjv.json',
  'bible_nkjv.json',
  'bible_lsb.json',
  'bible_gnv.json',
]
