// Fetch one RPCNA congregation page and dump structure so we can pick a parser strategy
const SLUG = process.argv[2] || 'salt-and-light'
const URL = `https://reformedpresbyterian.org/congregations/info/${SLUG}`

async function main() {
  const r = await fetch(URL, {
    headers: { 'user-agent': 'Mozilla/5.0 (church-directory research bot; contact: dustin@newchristianright.com)' },
  })
  if (!r.ok) {
    console.log(`HTTP ${r.status}`)
    return
  }
  const html = await r.text()
  // Strip scripts/styles for clarity
  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
  console.log(`URL: ${URL}`)
  console.log(`Size: ${html.length} bytes`)
  // Find the main content section — strip header nav
  const bodyStart = cleaned.indexOf('id="content"')
  const sliceStart = bodyStart > 0 ? bodyStart : Math.max(0, cleaned.length / 2 - 2000)
  console.log('=== CLEANED HTML (content section, ~6000 chars) ===')
  console.log(cleaned.slice(sliceStart, sliceStart + 6000))
}

main()
