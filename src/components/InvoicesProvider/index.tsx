import React, { useState, useContext, createContext, useEffect } from 'react'

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
  const [invoices, setInvoices] = useState<Invoice[]>([])

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const response = await fetch('/.netlify/functions/invoices')
        const data = await response.json()
        if (!response.ok) throw new Error(data)

        const formattedInvoices = data.map(
          ({
            created_at,
            payment_due,
            payment_terms,
            sender: { post_code: sender_post_code, ...sender },
            client: { post_code: client_post_code, ...client },
            ...invoice
          }: any) => ({
            ...invoice,
            createdAt: created_at,
            paymentDue: payment_due,
            paymentTerms: payment_terms,
            sender: { ...sender, postCode: sender_post_code },
            client: { ...client, postCode: client_post_code },
          })
        )
        setInvoices(formattedInvoices)
      } catch (e) {
        console.error(e)
      }
    }
    loadInvoices()
  }, [])

  return <InvoicesContext.Provider value={[invoices, setInvoices]}>{children}</InvoicesContext.Provider>
}

export default InvoicesProvider
