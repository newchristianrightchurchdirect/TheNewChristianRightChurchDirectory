// Extract text from a PDF for research. Usage: npx tsx prisma/_pdftext.ts <file> [grepRegex]
import { readFileSync } from 'fs'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pdfjs = require('pdfjs-dist/legacy/build/pdf.mjs')

async function main() {
  const file = process.argv[2]
  const re = process.argv[3] ? new RegExp(process.argv[3], 'i') : null
  const data = new Uint8Array(readFileSync(file))
  const doc = await pdfjs.getDocument({ data, useSystemFonts: true }).promise
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i)
    const content = await page.getTextContent()
    let last = -1
    const line = content.items.map((it: any) => {
      const y = Math.round(it.transform[5])
      const br = last !== -1 && Math.abs(y - last) > 3 ? '\n' : ''
      last = y
      return br + it.str
    }).join('')
    if (!re || re.test(line)) console.log(`\n--- p${i} ---\n${line.replace(/\n{3,}/g, '\n\n')}`)
  }
}
main().catch(e => { console.error(e); process.exit(1) })
