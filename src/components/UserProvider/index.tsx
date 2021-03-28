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

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null)

  function updateUser(user?: User | null) {
    setUser(user || null)
  }

  useEffect(() => {
    netlifyIdentity.init({})

    updateUser(netlifyIdentity.currentUser())
    netlifyIdentity.on('login', updateUser)
    netlifyIdentity.on('logout', updateUser)

    return () => {
      netlifyIdentity.off('login', updateUser)
      netlifyIdentity.off('logout', updateUser)
    }
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export default UserProvider
