#!/usr/bin/env node
// Enrich a hymnal JSON with sheet music + audio URLs from hymnary.org.
//
// Usage:
//   node scripts/enrich-hymnary.mjs <json-path> <hymnary-hymnal-code> [--limit=N] [--sleep=MS] [--dry]
//
// Examples:
//   node scripts/enrich-hymnary.mjs public/hymnal-data/trinity_psalter_hymnal.json TPH2018 --limit=5 --dry
//   node scripts/enrich-hymnary.mjs public/hymnal-data/trinity_psalter_hymnal.json TPH2018
//   node scripts/enrich-hymnary.mjs public/hymnal-data/book_of_psalms_for_worship.json BPW2009b

import { readFileSync, writeFileSync } from 'node:fs'
import { argv, exit } from 'node:process'

const args = argv.slice(2)
if (args.length < 2) {
  console.error('Usage: enrich-hymnary.mjs <json-path> <hymnal-code> [--limit=N] [--sleep=MS] [--dry]')
  exit(1)
}
const jsonPath = args[0]
const code = args[1]
const opt = Object.fromEntries(args.slice(2).map((a) => {
  const m = a.match(/^--([^=]+)(?:=(.*))?$/)
  return m ? [m[1], m[2] ?? true] : [a, true]
}))
const limit = opt.limit ? Number(opt.limit) : Infinity
const sleepMs = opt.sleep ? Number(opt.sleep) : 350
const dry = !!opt.dry

const UA = 'NXRHymnal-Enricher/1.0 (+sheet music backfill)'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'text/html,*/*' }, redirect: 'follow' })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return await res.text()
}

async function getHymnTune(num) {
  const html = await fetchText(`https://hymnary.org/hymn/${code}/${encodeURIComponent(num)}`)
  const text = html.match(/\/text\/([a-z0-9_]+)/i)?.[1] ?? null
  const tune = html.match(/\/tune\/([a-z0-9_]+)/i)?.[1] ?? null
  return { text, tune }
}

async function getTuneMedia(tune) {
  const html = await fetchText(`https://hymnary.org/tune/${tune}`)
  const sheet = html.match(/media\/fetch\/(\d+)/)?.[0] ?? null
  const audio = html.match(/https?:[^"' ]+\.mp3/)?.[0]
            ?? (html.match(/media\/fetch\/(\d+)\.mp3/)?.[0] ?? null)
  return {
    sheet: sheet ? `https://hymnary.org/${sheet}` : null,
    audio,
  }
}

const raw = JSON.parse(readFileSync(jsonPath, 'utf8'))
const hymns = Array.isArray(raw.hymns) ? raw.hymns : []
console.log(`[${code}] ${hymns.length} hymns; limit=${limit}; sleep=${sleepMs}ms; dry=${dry}`)

let found = 0, sheetAdded = 0, audioAdded = 0, errors = 0, processed = 0
for (const h of hymns) {
  if (processed >= limit) break
  processed += 1
  if (h.sheetMusicUrl && h.audioUrl) continue
  try {
    const { tune } = await getHymnTune(h.number)
    if (!tune) { console.log(`  #${h.number}: no tune`); await sleep(sleepMs); continue }
    const { sheet, audio } = await getTuneMedia(tune)
    let changed = false
    if (sheet && !h.sheetMusicUrl) { h.sheetMusicUrl = sheet; sheetAdded += 1; changed = true }
    if (audio && !h.audioUrl) { h.audioUrl = audio; audioAdded += 1; changed = true }
    if (changed) found += 1
    console.log(`  #${h.number} tune=${tune.padEnd(28)} sheet=${sheet ? 'Y' : '-'} audio=${audio ? 'Y' : '-'}`)
  } catch (e) {
    errors += 1
    console.log(`  #${h.number} ERR ${e.message}`)
  }
  await sleep(sleepMs)
}

console.log(`Done. processed=${processed} hymnsFilled=${found} sheetAdded=${sheetAdded} audioAdded=${audioAdded} errors=${errors}`)
if (!dry && found > 0) {
  writeFileSync(jsonPath, JSON.stringify(raw, null, 2))
  console.log(`Wrote ${jsonPath}`)
} else if (dry) {
  console.log('(dry run; no file written)')
}
