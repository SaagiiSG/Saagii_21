/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
        'display':['aeonik TRIAL'],
        'body':['Outfit']
    },
    extend: {
      colors: {
        paper: 'var(--paper)',
        ink: 'var(--ink)',
        vermillion: 'var(--vermillion)',
      },
      transitionTimingFunction: {
        'out-strong': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out-strong': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
    },
  },
  plugins: [],
}

