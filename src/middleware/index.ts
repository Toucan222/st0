import { NextResponse } from 'next/server'
import { rateLimiter } from './rateLimiter'
import { errorHandler } from './errorHandler'

export async function middleware(request) {
  try {
    // Apply rate limiting
    const rateLimitResponse = await rateLimiter(request)
    if (rateLimitResponse) return rateLimitResponse

    return NextResponse.next()
  } catch (error) {
    return errorHandler(error)
  }
}

export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*',
  ],
}
