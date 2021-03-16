import React from 'react'
import ColorSchemeProvider from '@/components/ColorSchemeProvider'
import 'focus-visible'
import '@fontsource/spartan/variable.css'
import '@/styles/global.css'

export interface RootWrapperProps {
  /** Site content */
  children: React.ReactNode
}

/** This component wraps the whole application in App/Test/Storybook environments. Pass all global providers here and add global imports at the top of the file */
const RootWrapper = ({ children }: RootWrapperProps) => {
  return <ColorSchemeProvider>{children}</ColorSchemeProvider>
}

export default RootWrapper
