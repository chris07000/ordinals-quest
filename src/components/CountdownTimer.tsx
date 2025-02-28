'use client'

import React, { useEffect, useState } from 'react'

interface CountdownTimerProps {
  onComplete: () => void
}

export default function CountdownTimer({ onComplete }: CountdownTimerProps) {
  // Set target date inside the component to avoid re-renders
  const targetDate = new Date('2025-02-27T18:15:00.000Z') // 19:15 NL time = 18:15 UTC
  
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  useEffect(() => {
    let isMounted = true

    const updateCountdown = () => {
      if (!isMounted) return

      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      // Calculate time units
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      // Check if countdown is finished
      if (distance < 0) {
        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00'
        })
        onComplete()
        return
      }

      // Update the countdown display
      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
      })
    }

    // Initial update
    updateCountdown()

    // Update countdown every second
    const countdownInterval = setInterval(updateCountdown, 1000)

    // Cleanup function
    return () => {
      isMounted = false
      clearInterval(countdownInterval)
    }
  }, [onComplete]) // Remove targetDate from dependencies

  return (
    <div className="countdown-wrapper">
      <div className="countdown-unit">
        <span className="count days">{timeLeft.days}</span>
        <span className="label">Days</span>
      </div>
      <div className="countdown-unit">
        <span className="count hours">{timeLeft.hours}</span>
        <span className="label">Hours</span>
      </div>
      <div className="countdown-unit">
        <span className="count minutes">{timeLeft.minutes}</span>
        <span className="label">Minutes</span>
      </div>
      <div className="countdown-unit">
        <span className="count seconds">{timeLeft.seconds}</span>
        <span className="label">Seconds</span>
      </div>
    </div>
  )
} 