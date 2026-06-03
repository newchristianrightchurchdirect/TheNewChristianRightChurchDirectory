#!/usr/bin/env node
// Copy sheetMusicFileName + audioFileName from the Android source-of-truth JSON
// into web JSON as web URLs under /hymnal-media/<slug>/.
//
// Usage: node scripts/apply-android-media.mjs

import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const ANDROID = 'C:/Users/Dustina/AndroidStudioProjects/NXRHymnal/app/src/main/assets'
const WEB = 'public/hymnal-data'
const MEDIA = 'public/hymnal-media'

const jobs = [
  { name: 'TPH', file: 'trinity_psalter_hymnal.json', slug: 'tph' },
  { name: 'BPW', file: 'book_of_psalms_for_worship.json', slug: 'bpw' },
]

for (const j of jobs) {
  const src = JSON.parse(readFileSync(`${ANDROID}/${j.file}`, 'utf8'))
  const dst = JSON.parse(readFileSync(`${WEB}/${j.file}`, 'utf8'))
  const srcByNum = new Map(src.hymns.map((h) => [h.number, h]))
  let sheetSet = 0, sheetMissing = 0, audioSet = 0, audioMissing = 0
  for (const h of dst.hymns) {
    const a = srcByNum.get(h.number)
    if (!a) continue
    if (a.sheetMusicFileName) {
      const localPath = `${MEDIA}/${j.slug}/${a.sheetMusicFileName}`
      if (existsSync(localPath)) {
        h.sheetMusicUrl = `/hymnal-media/${j.slug}/${a.sheetMusicFileName}`
        sheetSet += 1
      } else {
        sheetMissing += 1
      }
    }
    if (a.audioFileName) {
      const localPath = `${MEDIA}/${j.slug}-audio/${a.audioFileName}`
      if (existsSync(localPath)) {
        h.audioUrl = `/hymnal-media/${j.slug}-audio/${a.audioFileName}`
        audioSet += 1
      } else {
        audioMissing += 1
      }
    }
  }
  writeFileSync(`${WEB}/${j.file}`, JSON.stringify(dst, null, 2))
  console.log(`[${j.name}] sheetSet=${sheetSet} sheetMissing=${sheetMissing} audioSet=${audioSet} audioMissing=${audioMissing}`)
}
