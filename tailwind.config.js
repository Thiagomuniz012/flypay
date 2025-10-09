/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,tsx}',
    './src/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}'
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#04BF7B',
        secondary: '#F2F5FA',
        background: '#FFFFFF',
        'text-primary': '#1A202C',
        'text-secondary': '#4A5568',
        'text-muted': '#7A869A',
      },
    },
  },
  plugins: [],
};
