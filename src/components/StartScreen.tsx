'use client'

import React from 'react'
import Image from 'next/image'

interface StartScreenProps {
  onStart: () => void
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="start-screen">
      <div className="start-content">
        <Image
          src="/btc-logo.png"
          alt="Quest Logo"
          width={120}
          height={120}
          className="mx-auto mb-8"
        />
        
        <h1 className="launch-title">Welcome to The Tiger&apos;s Quest</h1>
        
        <p className="quest-intro">
          You're about to embark on an exciting journey into the world of Bitcoin Ordinals.
          Through this quest, you'll learn how to create and manage your own digital artifacts
          on the Bitcoin blockchain. Are you ready to begin?
        </p>
        
        <button 
          onClick={onStart}
          className="start-button"
        >
          Begin Quest
        </button>
      </div>
    </div>
  )
} 