/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./assets/styles/**/*.{css,scss}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#DCE2BD',
          100: '#D4CDAB',
          200: '#B6C4A2',
          300: '#93C0A4',
          400: '#8E9B90',
          500: '#7A8A7C',
          600: '#6B7A6D',
          700: '#5C6A5E',
        },
        sage: {
          50: '#DCE2BD',
          100: '#D4CDAB',
          200: '#B6C4A2',
          300: '#93C0A4',
          400: '#8E9B90',
          500: '#7A8A7C',
          600: '#6B7A6D',
          700: '#5C6A5E',
        }
      }
    },
  },
  plugins: [],
}

