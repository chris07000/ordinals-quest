'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface LaunchScreenProps {
  onCountdownComplete: () => void
}

const TIGER_MESSAGES = [
  "Psst... Ready for the hunt? 🐯",
  "Keep your eyes on the prize! 👀",
  "The quest awaits... 🗝️",
  "Are you worthy? 🏆",
  "Time is ticking... ⏳",
  "First one gets the mint! 🎯",
  "Can you solve the riddles? 🤔",
  "The Tiger is watching... 👁️",
]

export default function LaunchScreen({ onCountdownComplete }: LaunchScreenProps) {
  const [mounted, setMounted] = useState(false)
  const [showTiger, setShowTiger] = useState(false)
  const [tigerMessage, setTigerMessage] = useState('')
  const [tigerPosition, setTigerPosition] = useState<'left' | 'right'>('right')
  const [sparklePositions, setSparklePositions] = useState<Array<{ top: string, left: string }>>([])
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  // Initialize client-side only features
  useEffect(() => {
    setMounted(true)
    // Initialize sparkle positions
    const newSparklePositions = Array(4).fill(null).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`
    }))
    setSparklePositions(newSparklePositions)
  }, [])

  // Tiger appearance effect
  useEffect(() => {
    if (!mounted) return

    const showRandomTiger = () => {
      if (!showTiger) {
        const newPosition = Math.random() > 0.5 ? 'left' : 'right'
        setTigerPosition(newPosition)
        setTigerMessage(TIGER_MESSAGES[Math.floor(Math.random() * TIGER_MESSAGES.length)])
        setShowTiger(true)
        
        setTimeout(() => {
          setShowTiger(false)
        }, 4000)
      }
    }

    const tigerInterval = setInterval(() => {
      showRandomTiger()
    }, Math.random() * (30000 - 15000) + 15000)

    const initialTimer = setTimeout(showRandomTiger, 5000)

    return () => {
      clearInterval(tigerInterval)
      clearTimeout(initialTimer)
    }
  }, [mounted, showTiger])

  // Countdown timer effect
  useEffect(() => {
    if (!mounted) return

    const targetDate = new Date('2025-02-27T18:15:00.000Z')

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance < 0) {
        clearInterval(timer)
        onCountdownComplete()
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
    }, 1000)

    return () => clearInterval(timer)
  }, [mounted, onCountdownComplete])

  // Don't render anything until mounted
  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0a0f1f] text-white flex items-center justify-center relative overflow-hidden">
      {/* Mystical Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,176,44,0.15)_0%,transparent_70%)]"></div>
      
      {/* Tiger Easter Egg */}
      <div 
        className={`fixed transition-all duration-1000 ease-in-out ${
          showTiger 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-90'
        } ${
          tigerPosition === 'right'
            ? 'translate-x-0 right-0'
            : '-translate-x-0 left-0'
        }`}
      >
        <div className="relative">
          {/* Tiger Image */}
          <div className={`absolute ${
            tigerPosition === 'right'
              ? 'right-4 md:right-8'
              : 'left-4 md:left-8'
            } top-4 md:top-8 w-32 h-32 md:w-48 md:h-48`}
          >
            <div className="relative w-full h-full animate-float">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[30px] animate-pulse"></div>
              <Image
                src="/tiger-pixel.png"
                alt="Tiger"
                width={192}
                height={192}
                className={`w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,176,44,0.5)]
                         transition-transform duration-300 ${tigerPosition === 'left' ? 'scale-x-[-1]' : ''}`}
                priority
              />
              
              {/* Sparkle Effects */}
              {sparklePositions.map((pos, i) => (
                <div
                  key={`sparkle-${i}`}
                  className="absolute w-1 h-1 bg-primary rounded-full animate-sparkle"
                  style={{
                    top: pos.top,
                    left: pos.left,
                    animationDelay: `${i * 0.3}s`
                  }}
                />
              ))}
              
              {/* Message Bubble */}
              <div className={`absolute -top-16 ${
                tigerPosition === 'right' ? 'right-0' : 'left-0'
              } bg-black/60 backdrop-blur-sm px-6 py-3 rounded-2xl border border-primary/30
                            whitespace-nowrap animate-fadeIn min-w-[200px]`}
              >
                <p className="text-primary text-sm md:text-base font-cinzel">{tigerMessage}</p>
                {/* Bubble Triangle */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-black/60 border-r border-b border-primary/30
                              transform rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo Section */}
          <div className="mb-16 relative">
            <div className="w-32 h-32 mx-auto mb-8 relative">
              {/* Magical Glow Effects */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[50px] animate-pulse"></div>
              <div className="absolute inset-0 bg-primary/10 rounded-full rotate-45 blur-[30px] animate-pulse delay-75"></div>
              <Image
                src="/btc-logo.png"
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
              A Legendary Ordinals Hunt Approaches
            </p>
          </div>

          {/* Countdown Timer */}
          {mounted && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16">
              {[
                { value: timeLeft.days, label: 'Days' },
                { value: timeLeft.hours, label: 'Hours' },
                { value: timeLeft.minutes, label: 'Minutes' },
                { value: timeLeft.seconds, label: 'Seconds' }
              ].map((unit, i) => (
                <div 
                  key={i}
                  className="relative group"
                >
                  {/* Mystical Container */}
                  <div className="bg-black/30 backdrop-blur-sm border border-primary/30 rounded-xl p-6 md:p-8
                               transform transition-all duration-500 group-hover:border-primary/50
                               relative overflow-hidden">
                    {/* Corner Decorations */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/50 rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/50 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary/50 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/50 rounded-br-lg"></div>
                    
                    {/* Content */}
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
          )}

          {/* Quest Preview */}
          <div className="relative">
            {/* Magical Border */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 rounded-2xl"></div>
            
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 relative">
              <div className="max-w-3xl mx-auto">
                <p className="text-2xl mb-6 font-cinzel">🏆 First to complete the quest receives:</p>
                <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFB02C] via-[#FFD700] to-[#FFB02C] mb-12">
                  Exclusive Free Mint Pass
                </h3>
                
                {/* Magical Key */}
                <div className="relative w-40 h-40 mx-auto mb-12">
                  {/* Multiple layered glows for depth */}
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-[50px] animate-pulse"></div>
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-[30px] animate-pulse delay-150"></div>
                  
                  {/* Floating key with shadow */}
                  <div className="relative animate-float">
                    <Image
                      src="/pixel-key.png"
                      alt="Pixel Art Key"
                      width={160}
                      height={160}
                      className="relative w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,176,44,0.3)]
                               transition-all duration-300 hover:scale-110"
                      priority
                    />
                    
                    {/* Magical sparkles */}
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-primary rounded-full animate-sparkle"
                        style={{
                          top: `${50 + 35 * Math.sin(i * Math.PI / 3)}%`,
                          left: `${50 + 35 * Math.cos(i * Math.PI / 3)}%`,
                          animationDelay: `${i * 0.2}s`,
                          opacity: 0
                        }}
                      />
                    ))}
                    
                    {/* Orbital particles */}
                    <div className="absolute inset-0 animate-orbit">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={`particle-${i}`}
                          className="absolute w-1 h-1 bg-primary rounded-full"
                          style={{
                            top: `${50 + 45 * Math.sin(i * (2 * Math.PI / 3))}%`,
                            left: `${50 + 45 * Math.cos(i * (2 * Math.PI / 3))}%`,
                            boxShadow: '0 0 10px rgba(255,176,44,0.5)'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-12">
                  {[
                    { value: '3', label: 'Challenges' },
                    { value: '24h', label: 'Time Limit' },
                    { value: '1', label: 'Winner' }
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <span className="block text-4xl font-bold text-primary mb-2 drop-shadow-[0_0_10px_rgba(255,176,44,0.3)]">
                        {stat.value}
                      </span>
                      <span className="text-sm uppercase tracking-[0.2em] text-white/70">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 