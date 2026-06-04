module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'club-blue': '#0057B8',
        'club-blue-dark': '#004494',
        'club-yellow': '#FFC72C',
        'club-yellow-dark': '#e6b000',
        'navy': '#0F172A',
        'navy-800': '#1e293b',
        'light': '#F8FAFC',
      },
      fontFamily: {
        heading: ['"Bebas Neue"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
