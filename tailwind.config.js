/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-primary',
    'text-primary',
    'border-primary',
    'bg-white',
    'text-white',
    'border-white',
    'opacity-5',
    'opacity-10',
    'opacity-20',
    'opacity-50',
    'opacity-60',
    'opacity-80',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFB02C',
        secondary: '#FF6B2C',
        background: '#0a0f1f',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
      },
      opacity: {
        '10': '0.1',
        '20': '0.2',
        '60': '0.6',
        '80': '0.8',
        '15': '0.15',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        sparkle: 'sparkle 2s ease-in-out infinite',
        orbit: 'orbit 10s linear infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        fadeIn: 'fadeIn 0.5s ease-in-out forwards',
        slideIn: 'slideIn 1s ease-out forwards',
        bounce: 'bounce 1s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { 
            transform: 'translateY(0) rotate(0deg)',
            filter: 'drop-shadow(0 0 15px rgba(255,176,44,0.2))'
          },
          '50%': { 
            transform: 'translateY(-10px) rotate(2deg)',
            filter: 'drop-shadow(0 0 25px rgba(255,176,44,0.4))'
          },
        },
        sparkle: {
          '0%, 100%': { 
            transform: 'scale(0) rotate(0deg)',
            opacity: 0
          },
          '50%': { 
            transform: 'scale(1) rotate(180deg)',
            opacity: 1
          },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} 