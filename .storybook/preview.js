import React, { useEffect } from 'react'
import { action } from '@storybook/addon-actions'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { useDarkMode } from 'storybook-dark-mode'
import RootWrapper from '@/components/RootWrapper'
import { useColorScheme } from '@/components/ColorSchemeProvider'
import tailwindConfig from '../tailwind.config'
import '../test/loadershim'

export const parameters = {
  // Automatically create action args for all props that start with "on"
  actions: { argTypesRegex: '^on.*' },
  // Use list of viewports provided by addon
  viewport: { viewports: INITIAL_VIEWPORTS },
  backgrounds: {
    // Use colors from tailwind theme as backgrounds
    values: Object.entries(tailwindConfig.theme.colors).map(([name, value]) => ({ name, value })),
    // Use minimal step of 8 px as 0.5rem by default
    grid: { cellSize: 8 },
  },
}

// Wrap all stories in same wrapper as the main app but with dark mode support from the context panel
const DarkThemeWrapper = ({ children }) => {
  const isDarkMode = useDarkMode()
  const [, setColorScheme] = useColorScheme()
  useEffect(() => {
    setColorScheme(isDarkMode ? 'dark' : 'light')
  }, [isDarkMode, setColorScheme])
  return children
}
const RootWrapperDecorator = storyFn => (
  <RootWrapper>
    <DarkThemeWrapper>{storyFn()}</DarkThemeWrapper>
  </RootWrapper>
)
export const decorators = [RootWrapperDecorator]

// Log action instead of actual navigation for Link
window.___navigate = pathname => {
  action('Link')(pathname)
}
