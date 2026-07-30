// Sentry — browser runtime. Next.js loads this file directly for the client bundle.
//
// NOTE: session replay is deliberately NOT enabled. This site records churches by political and
// doctrinal stance, so replaying a visitor's browsing session captures which stances they were
// looking at. That is a privacy decision for the site owner to make, not a default to inherit.
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // 100% of traces in dev, 10% in production.
  tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,

  enableLogs: true,
})

// Reports App Router navigations as spans.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
