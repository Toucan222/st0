import { captureException, init } from '@sentry/nextjs'
import { Integrations } from '@sentry/tracing'

export function initializeMonitoring() {
  if (process.env.NODE_ENV === 'production') {
    init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 0.2,
      environment: process.env.NEXT_PUBLIC_VERCEL_ENV || 'development',
      release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'local',
    })
  }
}

export function logError(error, context = {}) {
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', error, context)
  } else {
    captureException(error, { extra: context })
  }
}

export function logPerformance(metric) {
  if (process.env.NODE_ENV === 'production') {
    captureMessage(`Performance: ${metric.name}`, {
      level: 'info',
      extra: {
        value: metric.value,
        rating: metric.rating,
        id: metric.id,
      },
    })
  }
}
