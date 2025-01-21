import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/router'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const session = supabase.auth.session()
    setUser(session?.user ?? null)
    setLoading(false)

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
        
        // Redirect after auth events
        if (event === 'SIGNED_IN') {
          router.push('/dashboard')
        }
        if (event === 'SIGNED_OUT') {
          router.push('/login')
        }
      }
    )

    return () => {
      authListener?.unsubscribe()
    }
  }, [])

  const value = {
    user,
    loading,
    signIn: async (credentials) => {
      const { error } = await supabase.auth.signIn(credentials)
      if (error) throw error
    },
    signUp: async (credentials) => {
      const { error } = await supabase.auth.signUp(credentials)
      if (error) throw error
    },
    signOut: async () => {
      await supabase.auth.signOut()
    },
    signInWithProvider: async (provider) => {
      const { error } = await supabase.auth.signIn({ provider })
      if (error) throw error
    }
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
