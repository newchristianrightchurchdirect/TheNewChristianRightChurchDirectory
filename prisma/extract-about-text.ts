// Strip HTML to clean text per church for LLM processing
import * as fs from 'fs'
import * as path from 'path'

function clean(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&[a-z]+;/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n\s*\n+/g, '\n\n')
    .trim()
}

async function main() {
  const inDir = 'data/research-queue/about-pages'
  const outDir = 'data/research-queue/about-text'
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

  const files = fs.readdirSync(inDir).filter(f => f.endsWith('.html'))
  console.log(`Extracting text from ${files.length} HTML files...\n`)

  let totalIn = 0, totalOut = 0, ok = 0
  for (const f of files) {
    const html = fs.readFileSync(path.join(inDir, f), 'utf-8')
    totalIn += html.length

    // Split by section markers (=== HOMEPAGE: ... === / === url ===) so we keep page boundaries
    const sections = html.split(/\n(?===\s)/)
    const cleanedSections = sections.map(s => {
      const headerMatch = s.match(/^(=== [^\n]+ ===)\n?/)
      const header = headerMatch ? headerMatch[1] : ''
      const body = headerMatch ? s.slice(headerMatch[0].length) : s
      return (header ? header + '\n' : '') + clean(body)
    })
    let out = cleanedSections.join('\n\n').trim()

    // Cap each church to ~40KB of text
    if (out.length > 40000) out = out.slice(0, 40000) + '\n\n[TRUNCATED]'

    fs.writeFileSync(path.join(outDir, f.replace('.html', '.txt')), out)
    totalOut += out.length
    ok++
  }

  console.log(`Done: ${ok} files`)
  console.log(`Total HTML bytes:  ${(totalIn / 1024 / 1024).toFixed(2)} MB`)
  console.log(`Total text bytes:  ${(totalOut / 1024 / 1024).toFixed(2)} MB`)
  console.log(`Compression: ${(100 - 100 * totalOut / totalIn).toFixed(1)}%`)
}
main().catch(e => { console.error(e); process.exit(1) })
