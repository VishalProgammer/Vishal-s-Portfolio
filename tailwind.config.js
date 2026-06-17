/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          light: '#1E293B',
          DEFAULT: '#0F172A',
          dark: '#0B0F17',
          deep: '#05070B',
        },
        gold: {
          light: '#E5C453',
          DEFAULT: '#D4AF37',
          dark: '#9A7B1C',
        },
        parchment: {
          light: '#F8F9FA',
          DEFAULT: '#E2E8F0',
          dark: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
