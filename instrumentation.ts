// Next.js server-side registration hook. Dispatches to the right Sentry config per runtime.
import * as Sentry from '@sentry/nextjs'

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config')
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config')
  }
}

// Captures unhandled server-side request errors (App Router route handlers, server components).
export const onRequestError = Sentry.captureRequestError
