/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        kid: {
          blue: '#4F46E5',
          purple: '#7C3AED',
          pink: '#EC4899',
          orange: '#F97316',
          yellow: '#EAB308',
          green: '#22C55E',
          cyan: '#06B6D4',
          red: '#EF4444',
        },
        sky: {
          light: '#87CEEB',
          DEFAULT: '#4A90D9',
          dark: '#1E40AF',
        },
        cloud: {
          light: '#FFFFFF',
          DEFAULT: '#F3F4F6',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 20s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'kid': '0 4px 20px rgba(79, 70, 229, 0.15)',
        'kid-lg': '0 8px 30px rgba(79, 70, 229, 0.2)',
        'glow-blue': '0 0 20px rgba(79, 70, 229, 0.4)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.4)',
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.4)',
      },
    },
  },
  plugins: [],
}
