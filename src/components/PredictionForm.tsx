import { useState } from 'react'
import { getPrediction } from '../lib/deepseek'
import { useAuth } from './AuthProvider'

export default function PredictionForm() {
  const { user } = useAuth()
  const [symbol, setSymbol] = useState('')
  const [timeframe, setTimeframe] = useState('1year')
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const request = {
        symbol,
        timeframe,
        market_data: {
          price: 0, // Will be fetched from API
          volume: 0,
          market_cap: 0
        },
        historical_data: {
          prices: [], // Will be populated
          volumes: []
        }
      }

      const result = await getPrediction(request)
      setPrediction(result)
      
      // Save prediction to Supabase
      await savePrediction(user.id, result)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <h2 className="text-xl font-semibold text-white mb-4">
        Get Market Prediction
      </h2>
      
      {error && (
        <div className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Stock Symbol
          </label>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Timeframe
          </label>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="1year">1 Year</option>
            <option value="2year">2 Years</option>
            <option value="3year">3 Years</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Get Prediction'}
        </button>
      </form>

      {prediction && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">Prediction Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(prediction).map(([key, value]) => (
              <div
                key={key}
                className={`p-4 rounded-xl ${
                  key === 'bear' ? 'bg-red-500/10' :
                  key === 'base' ? 'bg-gray-700/50' :
                  'bg-green-500/10'
                }`}
              >
                <h4 className="font-medium text-white capitalize mb-2">
                  {key} Case
                </h4>
                <p className="text-sm text-gray-300 mb-2">
                  {value.description}
                </p>
                <div className="text-sm text-gray-400">
                  <div>Growth: {value.growth}%</div>
                  <div>Confidence: {value.confidence}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
