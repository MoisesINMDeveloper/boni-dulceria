/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFFBF7',
        cocoa: '#3C2A21',
        caramel: '#B86B3B',
        latte: '#EDE2D5',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Fraunces', 'serif'],
      },
      boxShadow: {
        soft: '0 18px 60px rgba(60, 42, 33, 0.10)',
      },
    },
  },
  plugins: [],
}
