const defaultTheme = require('tailwindcss/defaultTheme')

// TODO Remove unused colors and rename remaining ones

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      'purple-dark': '#7C5DFA',
      purple: '#9277FF',
      'purple-light': '#7E88C3',
      'grey-darkest': '#0C0E16',
      'grey-darker': '#141625',
      'grey-darker-alt': '#373B53',
      'grey-dark': '#1E2139',
      grey: '#252945',
      'grey-light': '#888EB0',
      'grey-lighter': '#DFE3FA',
      'grey-lightest': '#F8F8FB',
      'grey-lightest-alt': '#F9FAFE',
      red: '#EC5757',
      'red-light': '#FF9797',
      white: '#FFF',
      transparent: 'transparent',
    },
    fontFamily: {
      sans: ['SpartanVariable', ...defaultTheme.fontFamily.sans],
    },
    fontSize: {
      h1: ['2rem', { lineHeight: '1.125', letterSpacing: '-.03125em' }],
      h2: ['1.25rem', { lineHeight: '1.1', letterSpacing: '-.0315em' }],
      h3: ['1rem', { lineHeight: '1.5', letterSpacing: '-.05em' }],
      body: ['.75rem', { lineHeight: '1.25', letterSpacing: '-.02em' }],
      small: ['.6875rem', { lineHeight: '1.65', letterSpacing: '-.02em' }],
    },
    boxShadow: {
      dropdown: '0px 10px 20px rgba(72, 84, 159, 0.25)',
      'dropdown-dark': '0px 10px 20px rgba(0, 0, 0, 0.25)',
    },
    extend: {
      outline: theme => ({
        DEFAULT: [`3px solid ${theme('colors.grey-darkest')}`, '2px'],
      }),
      borderRadius: {
        input: '4px',
        dropdown: '8px',
      },
      inset: {
        arrow: '-1.125rem',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['last'],
      boxShadow: ['dark'],
    },
  },
}
