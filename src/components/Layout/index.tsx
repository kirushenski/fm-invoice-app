import React from 'react'

export interface LayoutProps {
  /** Page content */
  children: React.ReactNode
}

/** Component shares layout structure between pages. Pass common sections like header, footer and content container here and wrap page components with it */
const Layout = ({ children }: LayoutProps) => {
  return <main>{children}</main>
}

export default Layout
