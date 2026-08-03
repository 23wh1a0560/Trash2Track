/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'butter-bean': '#FDFAD8',
        'sungold': '#FF5B03',
        'lemon-yellow': '#FFF24D',
        'beet-red': '#AB1717',
        'grassy-green': '#47510B',
        'seed-green': '#CAD23C',
        'petal-pink': '#FFB6A9',
        'blue-linen': '#A1AED1',
      }
    },
  },
  plugins: [],
}