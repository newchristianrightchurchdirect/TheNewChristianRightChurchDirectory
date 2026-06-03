'use client'

import { useEffect, useState } from 'react'
import { PRECACHE_ORDER } from '@/lib/hymnal/sources'

type BIPEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

type Platform = 'unknown' | 'ios' | 'android-chrome' | 'desktop-chrome' | 'standalone'

function detect(): Platform {
  if (typeof window === 'undefined') return 'unknown'
  const standalone =
    window.matchMedia?.('(display-mode: standalone)').matches ||
    // iOS Safari sets a non-standard navigator flag when launched from home screen
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  if (standalone) return 'standalone'
  const ua = window.navigator.userAgent.toLowerCase()
  const isIOS = /iphone|ipad|ipod/.test(ua) || (/mac/.test(ua) && 'ontouchend' in document)
  if (isIOS) return 'ios'
  if (/android/.test(ua)) return 'android-chrome'
  return 'desktop-chrome'
}

export default function InstallClient() {
  const [platform, setPlatform] = useState<Platform>('unknown')
  const [bip, setBip] = useState<BIPEvent | null>(null)
  const [installState, setInstallState] = useState<'idle' | 'accepted' | 'dismissed'>('idle')
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null)
  const [precaching, setPrecaching] = useState(false)
  const [precacheDone, setPrecacheDone] = useState(false)

  useEffect(() => {
    setPlatform(detect())
    function onBIP(e: Event) { e.preventDefault(); setBip(e as BIPEvent) }
    window.addEventListener('beforeinstallprompt', onBIP)
    return () => window.removeEventListener('beforeinstallprompt', onBIP)
  }, [])

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return
    function onMsg(ev: MessageEvent) {
      const m = ev.data || {}
      if (m.type === 'PRECACHE_PROGRESS') setProgress({ done: m.done, total: m.total })
      if (m.type === 'PRECACHE_DONE') { setPrecaching(false); setPrecacheDone(true) }
    }
    navigator.serviceWorker.addEventListener('message', onMsg)
    return () => navigator.serviceWorker.removeEventListener('message', onMsg)
  }, [])

  async function install() {
    if (!bip) return
    await bip.prompt()
    const { outcome } = await bip.userChoice
    setInstallState(outcome === 'accepted' ? 'accepted' : 'dismissed')
    setBip(null)
  }

  async function downloadOffline() {
    if (!('serviceWorker' in navigator)) return
    const reg = await navigator.serviceWorker.ready
    setPrecaching(true)
    setProgress({ done: 0, total: PRECACHE_ORDER.length })
    const urls = PRECACHE_ORDER.map((f) => `/hymnal-data/${f}`)
    reg.active?.postMessage({ type: 'PRECACHE_DATA', urls })
  }

  const pct = progress ? Math.round((progress.done / progress.total) * 100) : 0

  return (
    <>
      <header className="install-hero">
        <div className="hymnal-eyebrow">Pocket Library</div>
        <h1 className="hymnal-h1" style={{ marginTop: 6 }}>Install <em>NXR Hymnal</em></h1>
        <p className="hymnal-dek" style={{ marginTop: 6 }}>
          Six hymnals, five Bible translations, and forty-two confessions on your home screen. Fully offline.
        </p>
      </header>

      {platform === 'standalone' && (
        <div className="hymnal-empty" style={{ marginTop: 24 }}>
          You are already running the installed app. Tap <strong>Download for offline</strong> below to make every hymn and chapter readable without a connection.
        </div>
      )}

      {platform === 'ios' && (
        <section style={{ marginTop: 16 }}>
          <h2 className="hymnal-eyebrow">iPhone &amp; iPad &middot; Safari</h2>
          <div className="install-step">
            <div className="n">i</div>
            <div className="body">Tap the <strong>Share</strong> button at the bottom of Safari (the square with an upward arrow).</div>
          </div>
          <div className="install-step">
            <div className="n">ii</div>
            <div className="body">Scroll the share sheet and tap <strong>Add to Home Screen</strong>.</div>
          </div>
          <div className="install-step">
            <div className="n">iii</div>
            <div className="body">Confirm by tapping <strong>Add</strong>. NXR Hymnal will appear on your home screen as a standalone app.</div>
          </div>
        </section>
      )}

      {(platform === 'android-chrome' || platform === 'desktop-chrome') && (
        <section style={{ marginTop: 16 }}>
          <h2 className="hymnal-eyebrow">{platform === 'android-chrome' ? 'Android \u00B7 Chrome' : 'Desktop \u00B7 Chrome'}</h2>
          {bip ? (
            <>
              <div className="install-step">
                <div className="n">i</div>
                <div className="body">Tap the button below. Chrome will ask once whether to install NXR Hymnal.</div>
              </div>
              <button className="install-cta" onClick={install} disabled={installState === 'accepted'}>
                {installState === 'accepted' ? 'Installed' : 'Install NXR Hymnal'}
              </button>
              {installState === 'dismissed' && (
                <p style={{ marginTop: 12, fontStyle: 'italic', color: 'var(--ink-mute)' }}>
                  Install dismissed. Refresh the page to try again.
                </p>
              )}
            </>
          ) : (
            <>
              <div className="install-step">
                <div className="n">i</div>
                <div className="body">
                  Open the browser menu (three dots, top-right) and choose <strong>Install app</strong> or <strong>Add to Home screen</strong>.
                </div>
              </div>
              <div className="install-step">
                <div className="n">ii</div>
                <div className="body">Confirm the prompt. NXR Hymnal will appear in your launcher as a standalone app.</div>
              </div>
            </>
          )}
        </section>
      )}

      <section style={{ marginTop: 32, paddingTop: 18, borderTop: '1px solid var(--rule)' }}>
        <h2 className="hymnal-eyebrow">Download for Offline</h2>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 16, color: 'var(--ink-soft)', marginBottom: 14 }}>
          Cache every hymnal, Bible translation, and confession (~31&nbsp;MB) so the app works without a connection.
        </p>
        {!precacheDone ? (
          <button className="install-cta" onClick={downloadOffline} disabled={precaching}>
            {precaching ? `Downloading ${pct}%` : 'Download all content'}
          </button>
        ) : (
          <div className="hymnal-empty">All content cached. NXR Hymnal will work offline.</div>
        )}
        {precaching && progress && (
          <div style={{ marginTop: 14, fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--ink-mute)', textTransform: 'uppercase' }}>
            {progress.done} / {progress.total} files
          </div>
        )}
      </section>
    </>
  )
}
