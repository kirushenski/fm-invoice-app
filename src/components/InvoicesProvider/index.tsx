import React, { useState, useContext, createContext, useEffect } from 'react'
import { useUser } from '@/components/UserProvider'
import { getInvoices } from '@/utils/api'

interface InvoicesProviderProps {
  children: React.ReactNode
}

const InvoicesContext = createContext<[Invoice[] | null, (value: Invoice[] | null) => void] | null>(null)

export const useInvoices = () => {
  const context = useContext(InvoicesContext)
  if (!context) throw new Error('This component must be used within a <InvoicesProvider> component')
  return context
}

const InvoicesProvider = ({ children }: InvoicesProviderProps) => {
  const [invoices, setInvoices] = useState<Invoice[] | null>(null)
  const { user } = useUser()

  useEffect(() => {
    const loadInvoices = async () => {
      if (!user || !user.token) {
        setInvoices(null)
        return
      }

      const invoices = await getInvoices(user.token.access_token)
      if (invoices) setInvoices(invoices)
    }
    loadInvoices()
  }, [user])

  return <InvoicesContext.Provider value={[invoices, setInvoices]}>{children}</InvoicesContext.Provider>
}

export default InvoicesProvider
