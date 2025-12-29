/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // God Mode Design Tokens (BATCH-GM-01-FIX-1)
        gm: {
          bg: '#0A0A0B',
          surface: '#111113',
          elevated: '#18181B',
          border: '#27272A',
          text: '#FAFAFA',
          secondary: '#A1A1AA',
          muted: '#52525B',
          purple: '#8B5CF6',
          red: '#EF4444',
          green: '#10B981',
          yellow: '#F59E0B',
        },
        // Legacy mapping for backward compatibility
        armada: {
          bg: '#0A0A0B',
          surface: '#111113',
          border: '#27272A',
          text: '#FAFAFA',
          'text-muted': '#A1A1AA',
          purple: {
            DEFAULT: '#8B5CF6',
            'light': '#A78BFA',
            'dark': '#7C3AED',
          },
          green: '#10B981',
          yellow: '#F59E0B',
          red: '#EF4444',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
