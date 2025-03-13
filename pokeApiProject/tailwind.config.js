// Example `tailwind.config.js` file
import colors from 'tailwindcss/colors'

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        exo: ['"Exo 2"', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  }
}