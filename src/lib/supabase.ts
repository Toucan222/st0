import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Scorecard data types
export interface Scorecard {
  id: string
  user_id: string
  created_at: string
  updated_at: string
  scores: {
    technical_analysis: number
    market_sentiment: number
    financial_health: number
    growth_potential: number
    competitive_position: number
    innovation_metrics: number
    risk_assessment: number
    management_quality: number
    esg_performance: number
    valuation_metrics: number
  }
  predictions: {
    one_year: Prediction
    two_year: Prediction
    three_year: Prediction
  }
}

interface Prediction {
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

// API functions
export async function getScorecard(userId: string): Promise<Scorecard | null> {
  const { data, error } = await supabase
    .from('scorecards')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) throw error
  return data
}

export async function savePrediction(
  userId: string,
  prediction: Prediction
): Promise<Scorecard> {
  const { data, error } = await supabase
    .from('scorecards')
    .upsert({
      user_id: userId,
      predictions: prediction
    })
    .select()
    .single()

  if (error) throw error
  return data
}
