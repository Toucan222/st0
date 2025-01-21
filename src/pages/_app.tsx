import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { initializeMonitoring, logError } from '../lib/monitoring'
import { pageView } from '../lib/analytics'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    initializeMonitoring()
    
    const handleRouteChange = (url) => {
      pageView()
    }

    const handleError = (event) => {
      logError(event.error, {
        componentStack: event.error?.componentStack,
      })
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    window.addEventListener('error', handleError)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      window.removeEventListener('error', handleError)
    }
  }, [router.events])

  return <Component {...pageProps} />
}

export default MyApp
