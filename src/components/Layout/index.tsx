import React from 'react'
import Sidebar from '@/components/Sidebar'

export interface LayoutProps {
  /** Page content */
  children: React.ReactNode
}

/** Component shares layout structure between pages. Pass common sections like header, footer and content container here and wrap page components with it */
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-grow grid justify-items-center py-8 md:py-14 lg:py-18 px-6 md:px-12">
        <div className="w-full max-w-container">{children}</div>
      </main>
    </div>
  )
}

export default Layout
