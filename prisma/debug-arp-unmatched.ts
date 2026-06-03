// Look at index entries for states with many unmatched
import * as fs from 'fs'
type Parsed = { storeId: number; slug: string; ok: boolean; storeName?: string; title: string; address?: any }
const parsed: Parsed[] = JSON.parse(fs.readFileSync('data/research-queue/arp_pages_parsed.json', 'utf-8'))

// All SC stores
const sc = parsed.filter(p => p.ok && (p.address?.state || '').toUpperCase() === 'SC')
console.log(`\n=== SC stores in directory (${sc.length}) ===`)
sc.sort((a, b) => (a.storeName || a.title).localeCompare(b.storeName || b.title))
for (const s of sc) {
  console.log(`  ${s.slug}  | "${s.storeName || s.title}" (${s.address?.city || ''})`)
}

// Look for slugs containing "due west", "bethlehem", "sharon", "newberry", "chester", "iva", etc.
console.log('\n=== Searching for specific keywords ===')
const keywords = ['due-west', 'bethlehem', 'sharon', 'newberry', 'chester', 'iva', 'troy', 'oconee', 'travelers', 'unity', 'bethel', 'ebenezer', 'cedar', 'wrens', 'louisville', 'pinecrest', 'pressly', 'long-cane', 'young-memorial', 'spartanburg', 'lancaster', 'clemson', 'ora', 'hopewell']
for (const kw of keywords) {
  const hits = parsed.filter(p => p.ok && (p.slug.includes(kw) || (p.storeName || '').toLowerCase().includes(kw.replace('-', ' '))))
  if (hits.length) {
    console.log(`\n"${kw}" → ${hits.length} hits:`)
    for (const h of hits.slice(0, 6)) {
      console.log(`  ${h.slug}  | "${h.storeName || h.title}" (${h.address?.city || ''}, ${(h.address?.state || '').toUpperCase()})`)
    }
  } else {
    console.log(`"${kw}" → NO HITS`)
  }
}
