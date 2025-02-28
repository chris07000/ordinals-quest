'use client'

import React, { useEffect } from 'react'

export default function ParticleBackground() {
  useEffect(() => {
    // Create particles
    const container = document.createElement('div')
    container.className = 'web3-particles'
    document.body.appendChild(container)

    // Create 50 particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      
      // Random size
      const size = Math.random() * 3 + 1
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      
      // Random animation duration
      particle.style.animationDuration = `${Math.random() * 20 + 10}s`
      
      // Random delay
      particle.style.animationDelay = `${Math.random() * 5}s`
      
      container.appendChild(particle)
    }

    return () => {
      document.body.removeChild(container)
    }
  }, [])

  return null
} 