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
        sans: ['SF UI Display', 'sans-serif'],
        display: ['Bang Tamvan', 'SF UI Display', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 60px rgba(60, 42, 33, 0.10)',
      },
    },
  },
  plugins: [],
}
