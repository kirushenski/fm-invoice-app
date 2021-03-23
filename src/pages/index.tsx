import React, { useState } from 'react'
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

// 5. Write business logic and manage state locally
// 6. Bug fixes
// 7. Write tests and run a11y/perf tests
// 8. Setup serverless app

// NEW FieldArray

// Each ID should be 2 random uppercased letters followed by 4 random numbers.
// Invoices can be created either as drafts or as pending. Clicking "Save as Draft" should allow the user to leave any form field blank, but should create an ID if one doesn't exist and set the status to "draft". Clicking "Save & Send" should require all forms fields to be filled in, and should set the status to "pending".
// Changing the Payments Terms field should set the `paymentDue` property based on the `createdAt` date plus the numbers of days set for the payment terms.
// The `total` should be the sum of all items on the invoice.

const IndexPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const isTablet = useMedia({ query: '(min-width: 768px)' })

  const [invoices, setInvoices] = useInvoices()
  const [filters, setFilters] = useState(['draft', 'pending', 'paid'])
  const filteredInvoices = invoices.filter(invoice => filters.includes(invoice.status))

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
      <Seo title="Home" />
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
