import { useEffect } from 'react'
import { useAuth } from './AuthProvider'
import { useRouter } from 'next/router'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading])

  if (loading || !user) {
    return <div>Loading...</div>
  }

  return children
}
