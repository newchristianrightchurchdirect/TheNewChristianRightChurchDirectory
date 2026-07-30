// Sentry — Node.js server runtime. Loaded by instrumentation.ts when NEXT_RUNTIME === 'nodejs'.
//
// If SENTRY_DSN is unset the SDK initialises as a no-op, so the app runs normally without it.
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // 100% of traces in dev, 10% in production.
  tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,

  // Attach local variable values to stack frames — the main reason a server stack trace is
  // actually actionable rather than just a line number.
  includeLocalVariables: true,

  enableLogs: true,
})
