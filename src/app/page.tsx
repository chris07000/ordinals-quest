'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

// Countdown component separated
const CountdownDisplay = ({ timeLeft }: { timeLeft: { days: string, hours: string, minutes: string, seconds: string } }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
    {[
      { value: timeLeft.days, label: 'Days' },
      { value: timeLeft.hours, label: 'Hours' },
      { value: timeLeft.minutes, label: 'Minutes' },
      { value: timeLeft.seconds, label: 'Seconds' }
    ].map((unit, i) => (
      <div key={i} className="relative group">
        <div className="bg-black/30 backdrop-blur-sm border border-primary/30 rounded-xl p-6 md:p-8">
          <span className="block text-5xl md:text-6xl font-bold text-primary mb-2">
            {unit.value}
          </span>
          <span className="text-sm uppercase tracking-[0.2em] text-white/70">
            {unit.label}
          </span>
        </div>
      </div>
    ))}
  </div>
)

// Static Key Component with only sparkles
const StaticKey = () => (
  <div className="relative w-32 h-32 mx-auto mb-8">
    <Image
      src="/images/pixel-key.png"
      alt="Pixel Key"
      width={128}
      height={128}
      className="relative w-full h-full object-contain"
      priority
    />
  </div>
)

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  useEffect(() => {
    const targetDate = new Date('2025-02-27T18:15:00.000Z')

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
      })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0f1f] text-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-16">
            <div className="w-32 h-32 mx-auto mb-8">
              <Image
                src="/images/btc-logo.png"
                alt="Bitcoin Tiger Collective Logo"
                width={128}
                height={128}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              The Tiger&apos;s Quest
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              A Legendary Ordinals Hunt Approaches
            </p>
          </div>

          <div className="space-y-16">
            <StaticKey />
            <CountdownDisplay timeLeft={timeLeft} />
            <p className="text-white/70 text-sm">
              Launch time: February 27, 2025 at 18:15 UTC
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 