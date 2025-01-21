import axios from 'axios'

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1'
const API_KEY = process.env.DEEPSEEK_API_KEY

const deepseekClient = axios.create({
  baseURL: DEEPSEEK_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
})

interface PredictionRequest {
  symbol: string
  timeframe: '1year' | '2year' | '3year'
  market_data: {
    price: number
    volume: number
    market_cap: number
  }
  historical_data: {
    prices: number[]
    volumes: number[]
  }
}

interface PredictionResponse {
  bear: PredictionCase
  base: PredictionCase
  bull: PredictionCase
}

interface PredictionCase {
  description: string
  growth: number
  confidence: number
  risks: string[]
  opportunities: string[]
  key_metrics: {
    revenue: string
    margins: string
    market_share: string
  }
}

export async function getPrediction(
  request: PredictionRequest
): Promise<PredictionResponse> {
  try {
    const response = await deepseekClient.post('/predict', request)
    return response.data
  } catch (error) {
    console.error('Deepseek API Error:', error)
    throw error
  }
}

export async function getMarketAnalysis(symbol: string) {
  try {
    const response = await deepseekClient.get(`/analysis/${symbol}`)
    return response.data
  } catch (error) {
    console.error('Deepseek Analysis Error:', error)
    throw error
  }
}

export async function getSentimentAnalysis(text: string) {
  try {
    const response = await deepseekClient.post('/sentiment', { text })
    return response.data
  } catch (error) {
    console.error('Deepseek Sentiment Error:', error)
    throw error
  }
}
