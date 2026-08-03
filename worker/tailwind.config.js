/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        't2t-dark': '#47510B',
        't2t-lime': '#CAD23C',
        't2t-red': '#AB1717',
        't2t-cream': '#FDFAD8',
        't2t-orange': '#FF5B03',
        't2t-yellow': '#FFF24D',
      },
    },
  },
  plugins: [],
}