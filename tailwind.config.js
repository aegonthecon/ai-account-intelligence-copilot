module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(210, 100%, 50%)',
        secondary: 'hsl(210, 15%, 20%)',
        accent: 'hsl(160, 80%, 50%)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
