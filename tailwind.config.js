/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ArmadaOS Design Tokens
        'armada': {
          'bg': '#0A0A0A',
          'surface': '#111111',
          'border': '#1F1F1F',
          'text': '#FFFFFF',
          'text-muted': '#A0A0A0',
          'purple': {
            DEFAULT: '#8B5CF6',
            'light': '#A78BFA',
            'dark': '#7C3AED',
          },
          'green': '#22C55E',
          'yellow': '#EAB308',
          'red': '#EF4444',
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
