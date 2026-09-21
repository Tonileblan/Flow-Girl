/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#e6f5f5',
          100: '#ccebeb',
          500: '#008080', // Transformative Teal
          600: '#006666',
          700: '#004d4d',
          800: '#003333',
        },
        cloud: {
          50: '#ffffff',
          100: '#f9f9f9',
          200: '#F5F5F5', // Cloud Dancer
          300: '#eaeaea',
          400: '#d5d5d5',
        },
        sage: {
          50: '#f4f6f1',
          100: '#e5eadd',
          500: '#8A9A5B', // Sage Green
          600: '#738249',
          700: '#5c693a',
        },
        orchid: {
          50: '#f7f2fb',
          100: '#ebe0f6',
          500: '#9966CC', // Amethyst Orchid
          600: '#824db7',
          700: '#6c3a9e',
        },
        circadian: {
          dark: '#0D1317',
          card: '#161F26',
          border: '#25333D',
          amber: '#FFB067',
          soft: '#FFE4C9',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-teal': '0 10px 25px -5px rgba(0, 128, 128, 0.15), 0 8px 10px -6px rgba(0, 128, 128, 0.1)',
        'soft-orchid': '0 10px 25px -5px rgba(153, 102, 204, 0.15), 0 8px 10px -6px rgba(153, 102, 204, 0.1)',
      }
    },
  },
  plugins: [],
}
