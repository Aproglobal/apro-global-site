/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f3',
          100: '#ffe4e8',
          500: '#f05676',
          600: '#e24464',
          700: '#c92a4b'
        }
      }
    }
  },
  plugins: []
};
