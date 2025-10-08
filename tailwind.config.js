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
        'primary-cyan': '#0396A6',
        'primary-teal': '#01DDC3',
        secondary: '#00966D',
        'text-primary': '#25384D',
        'text-secondary': '#7A869A',
        'text-light': '#B0B8C4',
        'text-muted': '#626B7B',
        'bg-light': '#E8F5F0',
        'bg-white': '#F9F9F9',
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