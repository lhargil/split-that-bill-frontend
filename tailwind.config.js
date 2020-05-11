const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        display: ['Raleway', ...defaultTheme.fontFamily.sans],
        body: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      inset: {
        '1/2': '50%',
      },
      screens: {
        'xxs': '325px',
        'xs': '375px'
      },
      customForms: theme => ({
        invalid: {
          'input, textarea, select, multiselect, checkbox, radio': {
            borderColor: theme('colors.red.300'),
            '&::placeholder': {
              color: theme('colors.red.300')
            },
            '&:focus': {
              boxShadow: theme('boxShadow.outline-red'),
              borderColor: theme('colors.red.300')
            }
          },
        }
      })
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
