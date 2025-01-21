import { reportWebVitals } from 'next/web-vitals'

export function trackWebVitals() {
  reportWebVitals((metric) => {
    switch (metric.name) {
      case 'FCP':
      case 'LCP':
      case 'CLS':
      case 'FID':
      case 'TTFB':
        logPerformance(metric)
        break
      default:
        break
    }
  })
}
