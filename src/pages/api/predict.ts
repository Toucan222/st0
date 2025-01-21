import { NextApiRequest, NextApiResponse } from 'next'
import { getPrediction } from '../../lib/deepseek'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { symbol, timeframe } = req.body
      
      // Get market data from external API
      const marketData = await getMarketData(symbol)
      
      // Get prediction
      const prediction = await getPrediction({
        symbol,
        timeframe,
        market_data: marketData
      })

      res.status(200).json(prediction)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

async function getMarketData(symbol: string) {
  // Implement actual market data fetching
  return {
    price: 0,
    volume: 0,
    market_cap: 0
  }
}
