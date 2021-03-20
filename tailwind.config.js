const defaultTheme = require('tailwindcss/defaultTheme')

// TODO Remove unused colors and rename remaining ones
// TODO Filter strange typography styles

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
      'grey-alt': '#494E6E',
      'grey-light': '#888EB0',
      'grey-light-alt2': '#858BB2',
      'grey-light-alt': '#777F98',
      'grey-lighter': '#DFE3FA',
      'grey-lightest': '#F8F8FB',
      'grey-lightest-alt': '#F9FAFE',
      red: '#EC5757',
      'red-light': '#FF9797',
      green: '#33D69F',
      orange: '#FF8F00',
      white: '#FFF',
      black: '#000',
      transparent: 'transparent',
      current: 'currentColor',
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
      legend: ['1.125rem', { lineHeight: '1.78', letterSpacing: '-0.02em' }],
      error: ['.625rem', { lineHeight: '1.5', letterSpacing: '-0.02em' }],
      popup: ['1.5rem', { lineHeight: '1.33', letterSpacing: '-0.02em' }],
      invoice: ['.9375rem', { lineHeight: '1.33', letterSpacing: '-0.02em' }],
    },
    boxShadow: theme => ({
      dropdown: '0 10px 20px rgba(72, 84, 159, .25)',
      'dropdown-dark': '0 10px 20px rgba(0, 0, 0, .25)',
      invoice: '0 10px 10px -10px rgba(72, 84, 159, .1)',
      focus: `0 0 0 1px ${theme('colors.purple-dark')}`,
    }),
    extend: {
      borderRadius: {
        checkbox: '2px',
        input: '4px',
        status: '6px',
        dropdown: '8px',
        popup: '8px',
        invoice: '8px',
        sidebar: '20px',
      },
      inset: {
        arrow: '-1.125rem',
        15: '3.75rem',
        22: '5.5rem',
      },
      gridTemplateColumns: {
        item: '3fr 1fr 2fr 1fr 13px',
        'item-mobile': '1fr 2fr 1fr 13px',
        invoice: '3fr 5fr 5fr 5fr 6.5rem 4px',
      },
      width: {
        26: '6.5rem',
        empty: '242px',
        'empty-mobile': '193px',
        18: '4.5rem',
      },
      height: {
        sidebar: '7.5rem',
        'form-desktop': 'calc(100vh - 8.5rem)',
        'form-tablet': 'calc(100vh - 13.5rem)',
        'form-mobile': 'calc(100vh - 10rem)',
        empty: '200px',
        'empty-mobile': '160px',
        18: '4.5rem',
        50: '12.5rem',
      },
      maxWidth: {
        container: '45.625rem',
        popup: '30rem',
        sidebar: '45rem',
        'sidebar-mobile': '38.5rem',
      },
      padding: {
        38: '9.5rem',
      },
      gradientColorStops: {
        sidebar: 'rgba(0, 0, 0, .1)',
      },
      translate: {
        18: '4.5rem',
      },
      rotate: {
        360: '360deg',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['last'],
      borderColor: ['focus-visible'],
      boxShadow: ['dark', 'focus-visible'],
      margin: ['last'],
      textColor: ['focus-visible'],
      backgroundColor: ['focus-visible'],
    },
  },
}
