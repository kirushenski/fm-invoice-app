import React, { useState, useContext, createContext, useEffect } from 'react'
import netlifyIdentity, { User } from 'netlify-identity-widget'

interface UserProviderProps {
  children: React.ReactNode
}

const UserContext = createContext<User | null>(null)

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) throw new Error('This component must be used within a <UserProvider> component')
  return context
}

// TODO Check page reloads

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null)

  function updateUser(user?: User | null) {
    console.log('handler')
    setUser(user || null)
  }

  useEffect(() => {
    netlifyIdentity.init()

    netlifyIdentity.on('init', updateUser)
    netlifyIdentity.on('login', updateUser)
    netlifyIdentity.on('logout', updateUser)

    return () => {
      netlifyIdentity.off('init', updateUser)
      netlifyIdentity.off('login', updateUser)
      netlifyIdentity.off('logout', updateUser)
    }
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export default UserProvider
