import React from 'react'
import netlifyIdentity from 'netlify-identity-widget'
import Sidebar from '@/components/Sidebar'
import { useUser } from '@/components/UserProvider'
import defaultAvatar from '@/images/avatar.jpg'

export interface LayoutProps extends React.HTMLProps<HTMLDivElement> {
  /** Page content */
  children: React.ReactNode
}

/** Component shares layout structure between pages. Pass common sections like header, footer and content container here and wrap page components with it */
const Layout = ({ children, className = '', ...props }: LayoutProps) => {
  const { user, isUserLoading } = useUser()

  function handleAvatarClick() {
    netlifyIdentity.open()
  }

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">
      <Sidebar
        avatar={user?.user_metadata.avatar_url || defaultAvatar}
        onAvatarClick={handleAvatarClick}
        isLoggedIn={!!user}
        isLoading={isUserLoading}
        className="lg:fixed top-0 bottom-0 left-0"
      />
      <main
        className={`flex-grow grid justify-items-center py-8 px-6 md:py-14 md:px-12 lg:py-18 ${className}`}
        {...props}
      >
        <div className="w-full max-w-container">{children}</div>
      </main>
    </div>
  )
}

export default Layout
