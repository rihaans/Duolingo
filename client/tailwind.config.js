/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        duo: {
          green: '#58CC02',
          'green-hover': '#58A700',
          'green-dark': '#478600',
          'green-light': '#89E219',
          blue: '#1CB0F6',
          'blue-hover': '#14A0E0',
          'blue-dark': '#0E8EC4',
          red: '#FF4B4B',
          'red-hover': '#EA2B2B',
          'red-dark': '#D41F1F',
          yellow: '#FFC800',
          'yellow-hover': '#FFB800',
          'yellow-dark': '#FFA700',
          purple: '#CE82FF',
          gray: {
            50: '#F7F7F7',
            100: '#E5E5E5',
            200: '#CECECE',
            300: '#AFAFAF',
            400: '#8C8C8C',
            500: '#6E6E6E',
            600: '#525252',
            700: '#4B4B4B',
            800: '#3C3C3C',
            900: '#2B2B2B',
          },
        },
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      borderRadius: {
        'duo': '16px',
        'duo-lg': '20px',
      },
      boxShadow: {
        'duo-btn': '0 4px 0 0',
      },
      animation: {
        'bounce-slow': 'bounce 1.5s infinite',
        'pulse-slow': 'pulse 2s infinite',
      },
    },
  },
  plugins: [],
}
