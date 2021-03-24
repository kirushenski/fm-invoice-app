import React, { useEffect, useState } from 'react'
import { useMedia } from 'react-media'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import Nav from '@/components/Nav'
import InvoicesList from '@/components/InvoicesList'
import Invoice from '@/components/Invoice'
import Popup from '@/components/Popup'
import EditInvoice from '@/components/EditInvoice'
import ErrorMessage from '@/components/ErrorMessage'
import { useInvoices } from '@/components/InvoicesProvider'
import generateId from '@/utils/generateId'
import getCreatedAt from '@/utils/getCreatedAt'
import getPaymentDue from '@/utils/getPaymentDue'

// 7. Setup serverless app
// 8. Write tests

const IndexPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const isTablet = useMedia({ query: '(min-width: 768px)' })

  const [invoices, setInvoices] = useInvoices()
  const [filters, setFilters] = useState(['draft', 'pending', 'paid'])
  const filteredInvoices = invoices.filter(invoice => filters.includes(invoice.status))

  useEffect(() => {
    const request = async () => {
      try {
        const res = await fetch('/.netlify/functions/test')
        const text = await res.text()
        console.log(text)
      } catch (e) {
        console.error(e)
      }
    }
    request()
  }, [])

  function createInvoice(values: Omit<Invoice, 'id' | 'paymentDue' | 'status' | 'total'>, isDraft = false) {
    setInvoices([
      ...invoices,
      {
        ...values,
        id: generateId(invoices.map(({ id }) => id)),
        createdAt: getCreatedAt(values.createdAt),
        paymentDue: getPaymentDue(values.createdAt, values.paymentTerms),
        status: isDraft ? 'draft' : 'pending',
        total: values.items.reduce((acc, item) => acc + item.total, 0),
      },
    ])
  }

  return (
    <Layout>
      <Seo />
      <Nav
        invoicesCount={filteredInvoices.length}
        onFiltersChange={({ selectedItems }) => {
          selectedItems && setFilters(selectedItems)
        }}
        onNewInvoiceCreate={() => setIsPopupOpen(true)}
        className="mb-8 md:mb-14 lg:mb-16"
      />
      {filteredInvoices.length ? (
        <InvoicesList>
          {filteredInvoices.map(({ clientName, id, paymentDue, status, total }) => (
            <Invoice key={id} clientName={clientName} id={id} paymentDue={paymentDue} status={status} total={total} />
          ))}
        </InvoicesList>
      ) : (
        <ErrorMessage>
          Create an invoice by clicking the
          <br />
          <strong>New{isTablet && ' Invoice'}</strong> button and get started
        </ErrorMessage>
      )}
      <Popup isOpen={isPopupOpen} onRequestClose={() => setIsPopupOpen(false)} heading="New Invoice" isSidebar>
        <EditInvoice
          mode="new"
          initialValues={{
            createdAt: '',
            description: '',
            paymentTerms: 30,
            clientName: '',
            clientEmail: '',
            senderAddress: {
              street: '',
              city: '',
              postCode: '',
              country: '',
            },
            clientAddress: {
              street: '',
              city: '',
              postCode: '',
              country: '',
            },
            items: [],
          }}
          onCancel={() => setIsPopupOpen(false)}
          onSaveAsDraft={values => {
            createInvoice(values, true)
            setIsPopupOpen(false)
          }}
          onSubmit={values => {
            createInvoice(values)
            setIsPopupOpen(false)
          }}
          className="h-form-mobile md:h-form-tablet lg:h-form-desktop"
        />
      </Popup>
    </Layout>
  )
}

export default IndexPage
