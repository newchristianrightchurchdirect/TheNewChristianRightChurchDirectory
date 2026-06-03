import * as fs from 'fs'
const html = fs.readFileSync('data/research-queue/arp_church1.html', 'utf-8')
console.log('SIZE:', html.length)

const cleaned = html
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<svg[\s\S]*?<\/svg>/gi, '')
  .replace(/<!--[\s\S]*?-->/g, '')

// Show headings
const headings = [...cleaned.matchAll(/<h(\d)[^>]*>(.*?)<\/h\1>/gs)].slice(0, 12)
for (const h of headings) {
  const txt = h[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  console.log(`H${h[1]}: ${txt.slice(0, 150)}`)
}

// Look for et_pb_text / divi content modules (this is Divi theme)
const modules = [...cleaned.matchAll(/<div[^>]*class="[^"]*et_pb_text[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g)].slice(0, 10)
console.log('\n--- Divi text modules (first 10) ---')
for (const m of modules) {
  const txt = m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  if (txt.length > 0 && txt.length < 500) console.log('•', txt)
}

// Look for wpsl-store-info or similar wrappers
const wpslBits = [...cleaned.matchAll(/class="[^"]*wpsl[a-z-]*[^"]*"/g)].slice(0, 20)
console.log('\n--- wpsl-* classes seen ---')
for (const b of wpslBits) console.log(b[0])
