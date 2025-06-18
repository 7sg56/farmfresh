/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 10s ease-in-out infinite',
        'pulse-green': 'pulse-green 2s infinite',
        'loading': 'loading 1.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg) scale(1)' },
          '25%': { transform: 'translateY(-15px) rotate(5deg) scale(1.05)' },
          '50%': { transform: 'translateY(-8px) rotate(-3deg) scale(0.95)' },
          '75%': { transform: 'translateY(-20px) rotate(7deg) scale(1.02)' },
        },
        'pulse-green': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(34, 197, 94, 0.7)' },
          '50%': { boxShadow: '0 0 0 15px rgba(34, 197, 94, 0)' },
        },
        loading: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        }
      }
    },
  },
  plugins: [],
}
