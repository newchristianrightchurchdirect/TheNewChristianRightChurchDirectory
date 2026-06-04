// NXR Hymnal service worker.
// - network-first for HTML (so updates ship fast)
// - cache-first for /hymnal-data/*.json and /_next/static/* (offline)
// - cache-first for /fonts/* (offline)

const VERSION = 'nxr-hymnal-v9'
const SHELL_CACHE = `${VERSION}-shell`
const DATA_CACHE = `${VERSION}-data`
const STATIC_CACHE = `${VERSION}-static`

const SHELL = [
  '/hymnal',
  '/hymnal/bible',
  '/hymnal/creeds',
  '/hymnal/services',
  '/hymnal/saved',
  '/hymnal/more',
  '/hymnal/search',
  '/install',
  '/manifest.webmanifest',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((c) => c.addAll(SHELL).catch(() => {})),
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k)),
      ),
    ),
  )
  self.clients.claim()
})

function isJsonData(url) {
  return url.pathname.startsWith('/hymnal-data/') && url.pathname.endsWith('.json')
}
function isStatic(url) {
  return url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/fonts/')
}
function isHtml(req) {
  return req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')
}

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return

  if (isJsonData(url)) {
    event.respondWith(cacheFirst(req, DATA_CACHE))
    return
  }
  if (isStatic(url)) {
    event.respondWith(cacheFirst(req, STATIC_CACHE))
    return
  }
  if (isHtml(req)) {
    event.respondWith(networkFirst(req, SHELL_CACHE))
    return
  }
  // Default: try network, fall back to cache.
  event.respondWith(
    fetch(req).catch(() => caches.match(req).then((m) => m || Response.error())),
  )
})

async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName)
  const hit = await cache.match(req)
  if (hit) return hit
  try {
    const res = await fetch(req)
    if (res && res.ok) cache.put(req, res.clone())
    return res
  } catch (e) {
    const fallback = await cache.match(req)
    if (fallback) return fallback
    throw e
  }
}

async function networkFirst(req, cacheName) {
  const cache = await caches.open(cacheName)
  try {
    const res = await fetch(req)
    if (res && res.ok) cache.put(req, res.clone())
    return res
  } catch (e) {
    const hit = await cache.match(req)
    if (hit) return hit
    const shellRoot = await cache.match('/hymnal')
    if (shellRoot) return shellRoot
    throw e
  }
}

// Allow the install page to ask the worker to pre-cache the full data bundle.
self.addEventListener('message', (event) => {
  const data = event.data || {}
  if (data.type === 'PRECACHE_DATA' && Array.isArray(data.urls)) {
    event.waitUntil(precacheData(data.urls, event.source))
  }
})

async function precacheData(urls, source) {
  const cache = await caches.open(DATA_CACHE)
  let done = 0
  for (const u of urls) {
    try {
      const r = await fetch(u, { cache: 'reload' })
      if (r && r.ok) await cache.put(u, r.clone())
    } catch {}
    done++
    if (source && source.postMessage) {
      source.postMessage({ type: 'PRECACHE_PROGRESS', done, total: urls.length, url: u })
    }
  }
  if (source && source.postMessage) {
    source.postMessage({ type: 'PRECACHE_DONE', done, total: urls.length })
  }
}
