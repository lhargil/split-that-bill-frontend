const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', 'Roboto', ...defaultTheme.fontFamily.sans]
      },
      inset: {
        '1/2': '50%',
      },
      screens: {
        'xxs': '325px',
        'xs': '375px'
      }
    },
  },
  variants: {
    borderWidth: ['responsive', 'first', 'last', 'odd', 'even', 'hover', 'focus'],
    backgroundColor: ['responsive', 'odd', 'even', 'hover', 'focus'],
    translate: ['responsive', 'hover', 'focus'],
    padding: ['responsive', 'hover', 'focus', 'last'],
  },
  plugins: [
    require('@tailwindcss/ui'),
  ]
}
