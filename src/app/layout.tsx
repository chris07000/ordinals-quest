import React from 'react'
import type { Metadata } from 'next'
import { Cinzel } from 'next/font/google'
import './globals.css'

const cinzel = Cinzel({ 
  subsets: ['latin'],
  weight: ['400', '600', '700']
})

export const metadata: Metadata = {
  title: 'Bitcoin Tiger Collective - The Tiger\'s Quest',
  description: 'A Legendary Ordinals Hunt',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
          rel="stylesheet"
        />
      </head>
      <body className={cinzel.className}>
        <audio id="bgMusic" loop>
          <source src="/audio/background-music.mp3" type="audio/mp3" />
        </audio>
        {children}
      </body>
    </html>
  )
} 