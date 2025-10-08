/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: '#04BF7B',
        'primary-dark': '#007D4F',
        secondary: '#00966D',
        'text-primary': '#25384D',
        'text-secondary': '#B0B8C4',
        'text-muted': '#626B7B',
        'bg-light': '#E8F5F0',
        'border-light': '#F5F7FA',
        'success': '#47D187',
        'danger': '#E14242',
      },
      minHeight: {
        '190': '190px',
      },
    },
  },
  plugins: [],
}