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

// PostHog — client-side analytics
import posthog from 'posthog-js'

const posthogToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST

if (!posthogToken) {
  if (process.env.NODE_ENV === 'development') {
    console.error('NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is configured')
  }
} else {
  posthog.init(posthogToken, {
    api_host: '/ingest',
    ui_host: 'https://us.posthog.com',
    defaults: '2026-01-30',
    capture_exceptions: true,
    debug: process.env.NODE_ENV === 'development',
  })
}
