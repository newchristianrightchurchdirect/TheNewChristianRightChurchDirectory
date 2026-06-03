// Iterate all US states, POST to /locator.html, extract church_id links
import * as fs from 'fs'

const STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC',
]

type Entry = { id: number; name: string; city: string; state: string; website?: string }

async function fetchState(state: string): Promise<Entry[]> {
  const body = new URLSearchParams({ state, search_go: 'Y' }).toString()
  const res = await fetch('https://opc.org/locator.html', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
    body,
  })
  const html = await res.text()
  // Each church card has <h2>NAME - City, ST</h2> ... ?church_id=N
  const cards = [...html.matchAll(/<h2>([^<]+)<\/h2>[\s\S]*?(?:Website:\s*<\/span><a[^>]+href="([^"]*)"[^>]*>[^<]*<\/a>[\s\S]*?)?<a target="_blank" href="\/church\.html\?church_id=(\d+)"/g)]
  const out: Entry[] = []
  for (const c of cards) {
    const title = c[1].trim()
    const website = c[2]
    const id = parseInt(c[3], 10)
    // Parse "NAME - City, ST"
    const m = title.match(/^(.*?)\s*-\s*(.*?),\s*([A-Z]{2})$/)
    if (m) {
      out.push({ id, name: m[1].trim(), city: m[2].trim(), state: m[3], website })
    } else {
      out.push({ id, name: title, city: '', state, website })
    }
  }
  return out
}

async function main() {
  const all = new Map<number, Entry>()
  let done = 0
  for (const st of STATES) {
    try {
      const entries = await fetchState(st)
      for (const e of entries) {
        if (!all.has(e.id)) all.set(e.id, e)
      }
      done++
      console.log(`  ${st}: ${entries.length} churches (total unique: ${all.size}, states done ${done}/${STATES.length})`)
    } catch (e: any) {
      console.error(`  ${st}: FAILED ${e.message}`)
    }
    // Tiny pause to be polite
    await new Promise(r => setTimeout(r, 250))
  }
  const list = [...all.values()].sort((a, b) => a.id - b.id)
  fs.writeFileSync('data/research-queue/opc_index.json', JSON.stringify(list, null, 2))
  console.log(`\nSaved ${list.length} OPC churches → data/research-queue/opc_index.json`)
}
main().catch(e => { console.error(e); process.exit(1) })
