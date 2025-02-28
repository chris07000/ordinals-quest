'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

// Countdown component separated
const CountdownDisplay = React.memo(({ timeLeft }: { timeLeft: { days: string, hours: string, minutes: string, seconds: string } }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
    {[
      { value: timeLeft.days, label: 'Days' },
      { value: timeLeft.hours, label: 'Hours' },
      { value: timeLeft.minutes, label: 'Minutes' },
      { value: timeLeft.seconds, label: 'Seconds' }
    ].map((unit, i) => (
      <div key={i} className="relative group">
        <div className="bg-black/30 backdrop-blur-sm border border-primary/30 rounded-xl p-6 md:p-8
                     transform transition-all duration-500 group-hover:border-primary/50
                     relative overflow-hidden">
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/50 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/50 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary/50 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/50 rounded-br-lg"></div>
          
          <span className="block text-5xl md:text-6xl font-bold text-primary mb-2 drop-shadow-[0_0_10px_rgba(255,176,44,0.3)]">
            {unit.value}
          </span>
          <span className="text-sm uppercase tracking-[0.2em] text-white/70">
            {unit.label}
          </span>
        </div>
      </div>
    ))}
  </div>
))

CountdownDisplay.displayName = 'CountdownDisplay'

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
    {/* Sparkles */}
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-primary rounded-full animate-sparkle"
        style={{
          top: `${50 + 35 * Math.sin(i * Math.PI / 3)}%`,
          left: `${50 + 35 * Math.cos(i * Math.PI / 3)}%`,
          animationDelay: `${i * 0.2}s`
        }}
      />
    ))}
  </div>
)

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  })
  const [isLaunched, setIsLaunched] = useState(false)

  useEffect(() => {
    const targetDate = new Date('2025-02-27T18:15:00.000Z') // 18:15 UTC

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance < 0) {
        setIsLaunched(true)
        return
      }

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
    <div className="min-h-screen bg-[#0a0f1f] text-white flex items-center justify-center relative overflow-hidden">
      {/* Mystical Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,176,44,0.15)_0%,transparent_70%)]"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo Section */}
          <div className="mb-16 relative">
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[50px] animate-pulse"></div>
              <div className="absolute inset-0 bg-primary/10 rounded-full rotate-45 blur-[30px] animate-pulse delay-75"></div>
              <Image
                src="/images/btc-logo.png"
                alt="Bitcoin Tiger Collective Logo"
                width={128}
                height={128}
                className="relative w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,176,44,0.5)]"
                priority
              />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold font-cinzel mb-6 relative">
              <span className="bg-gradient-to-r from-[#FFB02C] via-[#FFD700] to-[#FFB02C] text-transparent bg-clip-text">
                The Tiger&apos;s Quest
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-cinzel tracking-wider">
              {isLaunched ? "Solve The Riddle" : "A Legendary Ordinals Hunt Approaches"}
            </p>
          </div>

          {!isLaunched ? (
            // Countdown Timer Section
            <div className="space-y-16">
              <StaticKey />
              <CountdownDisplay timeLeft={timeLeft} />
              <p className="text-white/70 text-sm">
                Launch time: February 27, 2025 at 18:15 UTC
              </p>
            </div>
          ) : (
            // Post-Launch Content
            <div className="space-y-16 animate-fadeIn">
              {/* Puzzle Image */}
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 rounded-2xl"></div>
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 relative">
                  <Image
                    src="/images/puzzle.png"
                    alt="Bitcoin Tiger Puzzle"
                    width={800}
                    height={800}
                    className="w-full h-auto rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-[1.02]"
                    priority
                  />
                </div>
              </div>

              {/* Clues Section */}
              <div className="relative">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 rounded-2xl"></div>
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 relative">
                  <div className="max-w-3xl mx-auto space-y-6">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFB02C] via-[#FFD700] to-[#FFB02C]">
                      Initial Clues
                    </h2>
                    <div className="space-y-6 text-lg text-white/90">
                      <div className="space-y-4">
                        <p className="text-primary/80 font-semibold">Across:</p>
                        <p className="pl-4">1. A 3-letter word miners chase, but it's not gold. (Col 1-3, R2)</p>
                        <p className="pl-4">4. A 9-letter word for function over flash, a builder's creed. (Col 2-10, R5)</p>
                      </div>
                      <div className="space-y-4">
                        <p className="text-primary/80 font-semibold">Down:</p>
                        <p className="pl-4">2. A 4-letter word for what shines through blockchain noise. (Col 3, R1-4)</p>
                      </div>
                      <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <p className="text-white/80 text-base">
                          <span className="text-primary font-semibold">Note:</span> Additional clues will be revealed on Twitter. Follow and turn on notifications for both{' '}
                          <a 
                            href="https://x.com/HenkyBTC" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-primary hover:text-primary/80 transition-colors"
                          >
                            @HenkyBTC
                          </a>
                          {' '}and{' '}
                          <a 
                            href="https://x.com/OrdinalTigerBTC" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-primary hover:text-primary/80 transition-colors"
                          >
                            @OrdinalTigerBTC
                          </a>
                          {' '}to receive more hints!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Instructions */}
              <div className="relative">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 rounded-2xl"></div>
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 relative">
                  <div className="max-w-3xl mx-auto space-y-6">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFB02C] via-[#FFD700] to-[#FFB02C]">
                      🏆 How to Win
                    </h2>
                    <div className="space-y-4 text-lg text-white/90">
                      <p>1. Study the puzzle carefully</p>
                      <p>2. When you think you have the answer, tweet it and tag:</p>
                      <div className="flex flex-col md:flex-row justify-center gap-4 py-2">
                        <a 
                          href="https://x.com/HenkyBTC" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary font-semibold hover:text-primary/80 transition-colors flex items-center justify-center gap-2"
                        >
                          <span>@HenkyBTC</span>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        </a>
                        <span className="text-white/50">&</span>
                        <a 
                          href="https://x.com/OrdinalTigerBTC" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary font-semibold hover:text-primary/80 transition-colors flex items-center justify-center gap-2"
                        >
                          <span>@OrdinalTigerBTC</span>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        </a>
                      </div>
                      <p>3. The first person to solve it correctly will receive a special key</p>
                    </div>
                    <div className="mt-8 text-white/70 text-sm">
                      Only one winner will be selected. Good luck!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 