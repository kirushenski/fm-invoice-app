import React from 'react'
import { useColorScheme } from '@/components/ColorSchemeProvider'
import Moon from '@/icons/moon.svg'
import Sun from '@/icons/sun.svg'

export interface LayoutProps {
  /** Page content */
  children: React.ReactNode
}

/** Component shares layout structure between pages. Pass common sections like header, footer and content container here and wrap page components with it */
const Layout = ({ children }: LayoutProps) => {
  const [colorScheme, setColorScheme] = useColorScheme()
  return (
    <div>
      <main>{children}</main>
      <aside>
        <button
          onClick={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
          aria-label="Dark mode"
          aria-pressed={colorScheme === 'dark'}
        >
          {colorScheme === 'light' ? <Moon /> : <Sun />}
        </button>
      </aside>
    </div>
  )
}

export default Layout
