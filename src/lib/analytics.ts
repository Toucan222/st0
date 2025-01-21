export function trackEvent(event: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.analytics) {
    window.analytics.track(event, params)
  }
}

export function identifyUser(userId: string, traits?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.analytics) {
    window.analytics.identify(userId, traits)
  }
}

export function pageView() {
  if (typeof window !== 'undefined' && window.analytics) {
    window.analytics.page()
  }
}
