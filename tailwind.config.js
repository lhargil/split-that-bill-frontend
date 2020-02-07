module.exports = {
  theme: {
    container: {
      center: true,
      padding: '2rem'
    },
    fontFamily: {
      display: ['Raleway', 'Roboto', 'sans-serif'],
      body: ['Roboto', 'sans-serif'],
    },
    minWidth: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    },
    extend: {
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
  },
  plugins: []
}
