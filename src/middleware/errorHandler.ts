import { NextResponse } from 'next/server'
import { logError } from '../lib/monitoring'

export function errorHandler(error) {
  logError(error)

  return NextResponse.json(
    { 
      success: false,
      error: process.env.NODE_ENV === 'production' 
        ? 'An unexpected error occurred' 
        : error.message
    },
    { status: error.statusCode || 500 }
  )
}
