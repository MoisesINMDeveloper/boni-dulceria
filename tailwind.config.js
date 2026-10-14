/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#DBDBD3',
        cocoa: '#1C1F2A',
        caramel: '#B35718',
        latte: '#BCA786',
        rose: '#CC8189',
        brass: '#BC9869',
        taupe: '#927D63',
        espresso: '#332C26',
        surface: 'var(--brand-card)',
      },
      fontFamily: {
        sans: ['SF UI Display', 'sans-serif'],
        display: ['Bang Tamvan', 'SF UI Display', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 60px rgba(28, 31, 42, 0.10)',
      },
    },
  },
  plugins: [],
}
