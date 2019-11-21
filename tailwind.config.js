module.exports = {
  theme: {
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
    backgroundColor: ['responsive', 'odd', 'even', 'hover', 'focus']
  },
  plugins: []
}
