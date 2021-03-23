import React, { useState, useContext, createContext } from 'react'
import data from '../../../data.json'

interface InvoicesProviderProps {
  children: React.ReactNode
}

const InvoicesContext = createContext<[Invoice[], (value: Invoice[]) => void] | null>(null)

export const useInvoices = () => {
  const context = useContext(InvoicesContext)
  if (!context) throw new Error('This component must be used within a <InvoicesProvider> component')
  return context
}

const InvoicesProvider = ({ children }: InvoicesProviderProps) => {
  const [invoices, setInvoices] = useState<Invoice[]>(data as any)

  return <InvoicesContext.Provider value={[invoices, setInvoices]}>{children}</InvoicesContext.Provider>
}

export default InvoicesProvider
