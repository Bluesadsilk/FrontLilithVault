// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{astro,js,ts,jsx,tsx}'],
  theme: {
    extend: {fontFamily: {
      'josefin': ['"Josefin Sans"', 'sans-serif'],},
    
      colors: {
        primary: '#ba9aec',  // Primary
        secondary: '#b33f36', // Secondary
        accent1: '#f7c2fd',   // Accent1
        accent2: '#d0f3fb',   // Accent2
      },
    },
  },
  plugins: [],
};
