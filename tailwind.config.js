/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#001f3f', // Navy Blue
        accent: '#ff6600',  // Orange
        gray: '#808080',
        black: '#000000',
        white: '#ffffff'
      }
    }
  },
  plugins: []
}
