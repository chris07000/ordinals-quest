import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'
export const preferredRegion = ['iad1'] // US East (N. Virginia)

const TARGET_DATE = '2025-02-27T18:15:00.000Z' // 19:15 NL tijd

export async function GET(request: NextRequest) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  }

  try {
    const now = new Date()
    const targetDate = new Date(TARGET_DATE)
    const remaining = targetDate.getTime() - now.getTime()
    
    // Calculate time units
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24))
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000)

    // Check if countdown is finished
    if (remaining <= 0) {
      return new NextResponse(JSON.stringify({
        success: true,
        status: 'completed',
        currentTime: now.toISOString(),
        targetTime: targetDate.toISOString(),
        remaining: 0,
        formatted: {
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00'
        }
      }), {
        status: 200,
        headers: corsHeaders
      })
    }

    return new NextResponse(JSON.stringify({
      success: true,
      status: 'counting',
      currentTime: now.toISOString(),
      targetTime: targetDate.toISOString(),
      remaining,
      formatted: {
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
      }
    }), {
      status: 200,
      headers: corsHeaders
    })
  } catch (error) {
    console.error('Time calculation error:', error)
    return new NextResponse(JSON.stringify({
      success: false,
      error: 'Error calculating time'
    }), { 
      status: 500,
      headers: corsHeaders
    })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  })
}