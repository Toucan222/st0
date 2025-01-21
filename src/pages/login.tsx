import { useState } from 'react'
import { useAuth } from '../components/AuthProvider'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const { signIn, signInWithProvider } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signIn({ email, password })
      router.push('/dashboard')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6">Login</h1>
        
        {error && (
          <div className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => signInWithProvider('google')}
              className="w-full flex justify-center py-2 px-4 border border-gray-700 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <span className="text-white">Google</span>
            </button>

            <button
              onClick={() => signInWithProvider('github')}
              className="w-full flex justify-center py-2 px-4 border border-gray-700 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <span className="text-white">GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
