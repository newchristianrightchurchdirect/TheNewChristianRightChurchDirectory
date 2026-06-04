'use client'

import { useEffect, useRef, useState } from 'react'

export default function PdfViewer({ src, title }: { src: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    let cancelled = false
    let loadingTask: { destroy: () => Promise<void> } | null = null
    const container = containerRef.current
    if (!container) return

    ;(async () => {
      try {
        const pdfjs = await import('pdfjs-dist')
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf-worker/pdf.worker.min.mjs'

        const task = pdfjs.getDocument({ url: src })
        loadingTask = task
        const doc = await task.promise
        if (cancelled) return
        setPageCount(doc.numPages)
        setStatus('ready')

        container.innerHTML = ''
        const dpr = window.devicePixelRatio || 1
        const containerWidth = container.clientWidth || 600

        for (let i = 1; i <= doc.numPages; i++) {
          if (cancelled) break
          const page = await doc.getPage(i)
          const baseViewport = page.getViewport({ scale: 1 })
          const scale = containerWidth / baseViewport.width
          const viewport = page.getViewport({ scale })

          const canvas = document.createElement('canvas')
          canvas.width = Math.floor(viewport.width * dpr)
          canvas.height = Math.floor(viewport.height * dpr)
          canvas.style.width = '100%'
          canvas.style.height = 'auto'
          canvas.style.display = 'block'
          canvas.style.marginBottom = '12px'
          canvas.setAttribute('role', 'img')
          canvas.setAttribute('aria-label', `${title} page ${i} of ${doc.numPages}`)
          container.appendChild(canvas)

          const ctx = canvas.getContext('2d')
          if (!ctx) continue
          await page.render({
            canvasContext: ctx,
            canvas,
            viewport,
            transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined,
          }).promise
        }
      } catch {
        if (!cancelled) setStatus('error')
      }
    })()

    return () => {
      cancelled = true
      if (loadingTask) loadingTask.destroy().catch(() => {})
    }
  }, [src, title])

  return (
    <div className="sheet-pdf">
      {status === 'loading' && <div className="sheet-empty">Loading sheet music…</div>}
      {status === 'error' && (
        <div className="sheet-empty">
          Could not render PDF.{' '}
          <a href={src} target="_blank" rel="noopener noreferrer">Open in new tab →</a>
        </div>
      )}
      <div ref={containerRef} className="pdf-pages" aria-live="polite" />
      {status === 'ready' && pageCount > 0 && (
        <a className="sheet-open" href={src} target="_blank" rel="noopener noreferrer">
          Open PDF in new tab →
        </a>
      )}
    </div>
  )
}
