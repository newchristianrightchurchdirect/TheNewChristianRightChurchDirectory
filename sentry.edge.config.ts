// Sentry — Edge runtime. Loaded by instrumentation.ts when NEXT_RUNTIME === 'edge'.
// middleware.ts runs here, so this is what captures failures in the /admin auth gate.
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,
  enableLogs: true,
})
