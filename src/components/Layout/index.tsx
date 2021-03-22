import React from 'react'
import Sidebar from '@/components/Sidebar'
import avatar from '@/images/avatar.jpg'

export interface LayoutProps extends React.HTMLProps<HTMLDivElement> {
  /** Page content */
  children: React.ReactNode
}

/** Component shares layout structure between pages. Pass common sections like header, footer and content container here and wrap page components with it */
const Layout = ({ children, className = '', ...props }: LayoutProps) => {
  return (
    <div className={`relative min-h-screen flex flex-col lg:flex-row overflow-hidden ${className}`} {...props}>
      <Sidebar avatar={avatar} />
      <main className="flex-grow grid justify-items-center py-8 md:py-14 lg:py-18 px-6 md:px-12">
        <div className="w-full max-w-container">{children}</div>
      </main>
    </div>
  )
}

export default Layout
