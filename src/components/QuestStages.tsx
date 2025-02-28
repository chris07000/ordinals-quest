'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface QuestStagesProps {
  onComplete: () => void
}

const stages = [
  {
    id: 1,
    title: 'First Hunt',
    description: `In the depths of time where legends begin,
      On Twitter's scroll, our tale did spin.
      When winter met spring, on February's dawn,
      The first Tiger's mark was digitally drawn.
      
      In this genesis post of ancient time,
      Seek the elements that intertwine.
      A lone amber guardian keeps watch high,
      As jagged peaks pierce the night sky.
      
      Count well the gems of deepest blue,
      Let starlight guide your numbers true.
      The amber watcher's value hold,
      Add mountain shadows dark and bold.`,
    hint: `1. Find our first tweet @OrdinalTigerBTC from February
      2. Study the illustration carefully
      3. The path begins with multiplication
      4. Not all that glows should be multiplied
      5. The order of operations is key`
  },
  {
    id: 2,
    title: 'Hidden Path',
    description: `The ancient crystals showed you way,
      Now seek the tiger's latest prey.
      Where shadows dance and numbers climb,
      A message posted in recent time.
      
      Share this wisdom far and wide,
      Let your retweet be your guide.
      When done, return with proof divine -
      Your own retweet's sacred line.`,
    hint: `1. Visit @OrdinalTigerBTC
      2. Find and retweet our pinned tweet
      3. Click on your retweet
      4. Take a screenshot of your retweet and upload it here`,
    requiresScreenshot: true
  },
  {
    id: 3,
    title: 'Tiger\'s Code',
    description: `Through the realm of Ordinals brave,
      Three treasures you must save.
      First seek the Wizards of Ord's spell,
      Number seven-five-eight holds their tale.
      In ancient sat names lies your key,
      First four runes will set you free.
      
      Next where Pizza Ninjas train,
      One-four-eight-one holds their name.
      In their sat name's mystic sight,
      Four more symbols burn bright.
      
      Last quest leads to Sigma's might,
      Three-zero-seven-one shines bright.
      Hidden in its digital core,
      Four final keys unlock the door.
      
      From each treasure take four signs,
      Where golden letters brightly shine.
      Combine them all in sequence true,
      To forge the key that will set you through.`,
    hint: `1. The Wizards' secrets lie within ord.io's vast library
      2. A Ninja's path is marked by numbers in sequence
      3. Sigma's power reveals itself to those who seek deeply
      4. Follow the ancient scrolls in order of discovery`
  }
]

export default function QuestStages({ onComplete }: QuestStagesProps) {
  const [currentStage, setCurrentStage] = useState(1)
  const [input, setInput] = useState('')
  const [twitterHandle, setTwitterHandle] = useState('')
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [questCompleted, setQuestCompleted] = useState(false)

  const handleCompletion = () => {
    // Add dramatic fade effect
    const mainContent = document.querySelector('.main-content') as HTMLElement
    if (mainContent) {
      mainContent.style.animation = 'fadeToBlack 3s forwards'
    }

    // Create and show completion message
    setTimeout(() => {
      const stageContent = document.querySelector('.stage-content') as HTMLElement
      if (stageContent) {
        stageContent.innerHTML = `
          <div class="completion-message">
            <div class="completion-header">
              <img src="/btc-logo.png" alt="Bitcoin Tiger Logo" class="completion-logo" />
              <h2>CONGRATULATIONS! YOU'VE CRACKED THE CODE!</h2>
            </div>
            
            <div class="completion-details">
              <p class="completion-text">
                You have successfully completed The Tiger's Quest and proven yourself worthy!
              </p>
              
              <div class="reward-box">
                <h3>YOUR REWARD</h3>
                <div class="pixel-key-container">
                  <img src="/pixel-key.png" alt="Free Mint Pass Key" class="pixel-key" />
                  <div class="key-sparkles">
                    <span class="sparkle"></span>
                    <span class="sparkle"></span>
                    <span class="sparkle"></span>
                  </div>
                </div>
                <p>You've earned an exclusive Free Mint Pass!</p>
              </div>

              <div class="contact-info">
                <h3>NEXT STEPS</h3>
                <p>To claim your Free Mint Pass, please contact:</p>
                <a href="https://twitter.com/HenkyBTC" target="_blank" rel="noopener noreferrer" class="twitter-link">
                  @HenkyBTC
                </a>
                <p class="contact-note">
                  Send a DM with a screenshot of this completion screen to verify your achievement.
                </p>
              </div>
            </div>

            <div class="completion-footer">
              <p class="timestamp">Completed on: ${new Date().toLocaleString()}</p>
              <p class="quest-closed">The quest is now closed for other participants.</p>
            </div>
          </div>
        `

        // Add completion styles
        const style = document.createElement('style')
        style.textContent = `
          .completion-message {
            text-align: center;
            padding: 2rem;
            background: rgba(0, 0, 0, 0.95);
            border: 2px solid var(--primary-color);
            border-radius: 15px;
            box-shadow: 0 0 30px rgba(255, 176, 44, 0.3);
            animation: goldenReveal 2s forwards;
          }

          .completion-header {
            margin-bottom: 2rem;
          }

          .completion-logo {
            width: 120px;
            height: 120px;
            margin: 0 auto 1rem;
            animation: pulseGlow 2s infinite;
          }

          .completion-header h2 {
            color: var(--primary-color);
            font-size: 2rem;
            margin-bottom: 1rem;
            text-shadow: 0 0 10px rgba(255, 176, 44, 0.5);
            letter-spacing: 0.1em;
          }

          .completion-text {
            color: rgba(255, 255, 255, 0.9);
            font-size: 1.2rem;
            margin-bottom: 2rem;
          }

          .reward-box {
            background: rgba(255, 176, 44, 0.1);
            padding: 1.5rem;
            border-radius: 10px;
            margin: 2rem 0;
            border: 1px solid rgba(255, 176, 44, 0.3);
            position: relative;
            overflow: hidden;
          }

          .reward-box h3 {
            color: var(--primary-color);
            font-size: 1.5rem;
            margin-bottom: 1rem;
            letter-spacing: 0.1em;
          }

          .pixel-key-container {
            position: relative;
            width: 200px;
            height: 200px;
            margin: 2rem auto;
            perspective: 1000px;
          }

          .pixel-key {
            width: 100%;
            height: 100%;
            object-fit: contain;
            animation: floatKey 3s ease-in-out infinite;
            filter: drop-shadow(0 0 10px rgba(255, 176, 44, 0.5));
          }

          .key-sparkles {
            position: absolute;
            inset: 0;
            pointer-events: none;
          }

          .sparkle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            animation: sparkleFloat 2s ease-in-out infinite;
          }

          .sparkle:nth-child(1) {
            top: 20%;
            left: 20%;
            animation-delay: 0s;
          }

          .sparkle:nth-child(2) {
            top: 50%;
            right: 20%;
            animation-delay: 0.5s;
          }

          .sparkle:nth-child(3) {
            bottom: 20%;
            left: 40%;
            animation-delay: 1s;
          }

          @keyframes floatKey {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
            100% { transform: translateY(0) rotate(0deg); }
          }

          @keyframes sparkleFloat {
            0% { transform: scale(1) rotate(0deg); opacity: 0.3; }
            50% { transform: scale(2) rotate(180deg); opacity: 1; }
            100% { transform: scale(1) rotate(360deg); opacity: 0.3; }
          }

          .contact-info {
            margin: 2rem 0;
          }

          .contact-info h3 {
            color: var(--primary-color);
            font-size: 1.3rem;
            margin-bottom: 1rem;
            letter-spacing: 0.1em;
          }

          .twitter-link {
            display: inline-block;
            color: var(--primary-color);
            font-size: 1.5rem;
            font-weight: bold;
            text-decoration: none;
            padding: 0.5rem 1rem;
            margin: 1rem 0;
            border: 1px solid var(--primary-color);
            border-radius: 5px;
            transition: all 0.3s ease;
          }

          .twitter-link:hover {
            background: rgba(255, 176, 44, 0.1);
            box-shadow: 0 0 15px rgba(255, 176, 44, 0.3);
            transform: translateY(-2px);
          }

          .contact-note {
            color: rgba(255, 255, 255, 0.7);
            font-style: italic;
            margin-top: 1rem;
          }

          .completion-footer {
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px solid rgba(255, 176, 44, 0.2);
          }

          .timestamp {
            color: rgba(255, 255, 255, 0.6);
            font-size: 0.9rem;
          }

          .quest-closed {
            color: rgba(255, 176, 44, 0.7);
            font-size: 0.9rem;
            margin-top: 0.5rem;
          }

          @keyframes fadeToBlack {
            to { background: rgba(0, 0, 0, 0.95); }
          }

          @keyframes goldenReveal {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes pulseGlow {
            0% { filter: drop-shadow(0 0 5px rgba(255, 176, 44, 0.5)); }
            50% { filter: drop-shadow(0 0 20px rgba(255, 176, 44, 0.8)); }
            100% { filter: drop-shadow(0 0 5px rgba(255, 176, 44, 0.5)); }
          }
        `
        document.head.appendChild(style)

        // Disable all inputs and buttons
        document.querySelectorAll('input, button').forEach(element => {
          (element as HTMLElement).style.pointerEvents = 'none'
          element.setAttribute('disabled', 'true')
        })
      }
    }, 2000)

    // Send completion notification to Discord
    const messageData = {
      content: "🏆 **QUEST COMPLETED!**",
      embeds: [{
        title: "Quest Champion Found!",
        description: `${twitterHandle} has completed the quest!\nCode: ${input}\nCompleted at: ${new Date().toLocaleString()}\n\n🎉 They will be contacted for their Free Mint Pass!`,
        color: 16766720,
        footer: {
          text: "Bitcoin Tiger Collective - The Tiger's Quest"
        }
      }]
    }
    
    fetch('https://discord.com/api/webhooks/1342938846073061378/q-ExnqsHl_IjrG13A07vNY8Tx4LLw3AkeiI1oq_3VdvPSHNt7c7fg4pjPBnihEUMoqZO', {
      method: 'POST',
      body: JSON.stringify(messageData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        console.error('Failed to send completion notification')
      }
    })
    .catch(error => {
      console.error('Error sending completion:', error)
    })

    setQuestCompleted(true)
    onComplete()
  }

  const handleSubmit = async () => {
    try {
      setError('')

      if (currentStage === 2 && !screenshot) {
        setError('Please upload a screenshot of your retweet')
        return
      }

      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/validate`
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stage: currentStage,
          answer: input,
          apiKey: process.env.NEXT_PUBLIC_API_KEY
        })
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()

      if (data.success) {
        if (currentStage === 3) {
          setQuestCompleted(true)
          onComplete()
        } else {
          setCurrentStage(prev => prev + 1)
          setInput('')
          setScreenshot(null)
          setShowHint(false)
        }
      } else {
        setError(data.error || 'Incorrect answer, try again')
      }
    } catch (err) {
      console.error('Submit error:', err)
      setError('An error occurred. Please try again.')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0])
      setError('')
    }
  }

  const currentStageData = stages[currentStage - 1]

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <Image
              src="/btc-logo.png"
              alt="Quest Logo"
              width={64}
              height={64}
              priority
              className="logo-image"
            />
          </div>
          <h1 className="title">The Tiger&apos;s Quest</h1>
        </div>
      </header>
      
      <div className="quest-progress">
        <div className="progress-track">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className={`progress-step ${currentStage >= stage.id ? 'active' : ''}`}
            >
              <div className="step-icon">{stage.id}</div>
              <span>{stage.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="stage-content">
        <h2>{currentStageData.title}</h2>
        <div className="riddle-container">
          <p className="riddle-text whitespace-pre-line">
            {currentStageData.description}
          </p>
          
          <div className="hint-container">
            <button 
              className="hint-text"
              onClick={() => setShowHint(!showHint)}
            >
              <span className="hint-icon">🔍</span>
              Need a hint? Click here
            </button>
            {showHint && (
              <div className="extended-hint">
                <ol>
                  {currentStageData.hint.split('\n').map((hint, index) => (
                    <li key={index}>{hint.trim().replace(/^\d+\.\s*/, '')}</li>
                  ))}
                </ol>
          </div>
        )}
          </div>

          <div className="riddle-input">
            {currentStage === 2 && (
              <>
                <input
                  type="text"
                  value={twitterHandle}
                  onChange={(e) => setTwitterHandle(e.target.value)}
                  placeholder="Your Twitter/X handle (e.g. @username)"
                  className="quest-input"
                />
                <div className="custom-file-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="screenshot-upload"
                  />
                  <label
                    htmlFor="screenshot-upload"
                    className="quest-input flex items-center justify-center gap-2 cursor-pointer hover:bg-primary/10 transition-all duration-300"
                  >
                    <i className="fas fa-camera"></i> Take Screenshot of Your Retweet
                  </label>
                  <div className="text-sm text-primary/60 mt-2 text-center">
                    {screenshot ? screenshot.name : 'No screenshot selected'}
                  </div>
                </div>
              </>
            )}
        {currentStage === 3 && (
              <>
                <input
                  type="text"
                  value={twitterHandle}
                  onChange={(e) => setTwitterHandle(e.target.value)}
                  placeholder="Your Twitter Handle"
                  className="quest-input"
                />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="The 12-character Code"
                  className="quest-input"
                />
              </>
            )}
            {currentStage === 1 && (
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
                placeholder="Enter the secret number"
                className="quest-input"
              />
            )}
            <button
              onClick={handleSubmit}
              className="submit-btn"
            >
              {currentStage === stages.length ? 'Complete Quest' : 'Submit'}
            </button>
            {error && <div className="error-message">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  )
} 