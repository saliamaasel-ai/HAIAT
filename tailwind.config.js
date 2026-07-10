/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#0B1E45',
          700: '#12357A',
          600: '#1554D6',
          500: '#2C6BEF',
          100: '#E7EFFE',
        },
        accent: {
          500: '#F5B301',
          400: '#FFC93C',
          100: '#FFF4D6',
        },
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl2: '20px',
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(18,21,28,0.12)',
        cardsm: '0 4px 14px -6px rgba(18,21,28,0.08)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pop: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        fadein: {
          from: { opacity: 0, transform: 'translateY(10px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        floaty: 'floaty 5s ease-in-out infinite',
        pop: 'pop .5s cubic-bezier(.2,1.4,.4,1)',
        fadein: 'fadein .4s ease',
      },
    },
  },
  plugins: [],
};
