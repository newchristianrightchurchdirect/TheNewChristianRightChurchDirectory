#!/usr/bin/env node
// Rewrite hymnal JSON audioUrl values from .mid -> .mp3 where the .mp3 exists on disk.
// Run from repo root: node scripts/update-audio-paths.mjs

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DATA_DIR = path.join(ROOT, 'public', 'hymnal-data')
const PUBLIC_DIR = path.join(ROOT, 'public')

const FILES = [
  'book_of_psalms_for_worship.json',
  'trinity_psalter_hymnal.json',
  'cantus_christi.json',
  'hymns_of_grace.json',
  'sacred_harp_1991.json',
  'trinity_hymnal_1961.json',
]

function relMp3Exists(audioUrl) {
  if (!audioUrl || typeof audioUrl !== 'string') return null
  if (!audioUrl.startsWith('/')) return null
  const lower = audioUrl.toLowerCase()
  if (!(lower.endsWith('.mid') || lower.endsWith('.midi'))) return null
  const mp3Rel = audioUrl.replace(/\.midi?$/i, '.mp3')
  const mp3Abs = path.join(PUBLIC_DIR, mp3Rel.replace(/^\//, ''))
  return fs.existsSync(mp3Abs) ? mp3Rel : null
}

let totalChanged = 0
let totalMissing = 0

for (const f of FILES) {
  const p = path.join(DATA_DIR, f)
  if (!fs.existsSync(p)) { console.log(`skip (missing): ${f}`); continue }
  const doc = JSON.parse(fs.readFileSync(p, 'utf8'))
  let changed = 0
  let missing = 0
  for (const h of doc.hymns ?? []) {
    if (!h.audioUrl) continue
    const lower = h.audioUrl.toLowerCase()
    if (!(lower.endsWith('.mid') || lower.endsWith('.midi'))) continue
    const swap = relMp3Exists(h.audioUrl)
    if (swap) { h.audioUrl = swap; changed++ }
    else { missing++ }
  }
  if (changed > 0) {
    fs.writeFileSync(p, JSON.stringify(doc, null, 2) + '\n')
  }
  console.log(`${f}: ${changed} updated, ${missing} mp3 missing on disk`)
  totalChanged += changed
  totalMissing += missing
}
console.log(`---\ntotal: ${totalChanged} updated, ${totalMissing} mp3 still missing`)
