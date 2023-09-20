/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'signika': ['"Signika Negative"', 'serif'],
        'bree': ['"Bree Serif"', 'serif'],
        'fira': ['"Fira Code"', 'serif'],
        'overpass': ['"Overpass"', 'serif'],
      },
      gridColumn: {
        'auto-200px': 'repeat(auto-fill, minmax(200px, 1fr))',
      },
    },
  },
  plugins: [],
};
