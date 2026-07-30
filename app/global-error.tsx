'use client'

// Catches errors thrown in the root layout itself — the case app/error.tsx cannot reach.
// This component REPLACES the root layout when it renders, so globals.css is never loaded:
// every style here has to be inline. Palette matches globals.css (paper / ink / oxblood).
import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#f4ede0', color: '#1a1814' }}>
        <main
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
            fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif",
          }}
        >
          <div style={{ maxWidth: '32rem' }}>
            <h1 style={{ fontSize: '2.5rem', margin: '0 0 1rem', color: '#6e1f1a' }}>
              Something went wrong
            </h1>
            <div style={{ width: '3rem', height: 2, background: '#c8bda4', margin: '0 auto 1.5rem' }} />
            <p
              style={{
                fontFamily: "'Inter Tight', 'Inter', system-ui, sans-serif",
                fontSize: '0.95rem',
                color: '#6b6357',
                margin: '0 0 2rem',
              }}
            >
              The error has been reported. Try reloading, or return to the directory.
            </p>
            <a
              href="/"
              style={{
                fontFamily: "'Inter Tight', 'Inter', system-ui, sans-serif",
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#1a1814',
                border: '1px solid #c8bda4',
                padding: '0.75rem 1.5rem',
                textDecoration: 'none',
              }}
            >
              Back to the directory
            </a>
          </div>
        </main>
      </body>
    </html>
  )
}
