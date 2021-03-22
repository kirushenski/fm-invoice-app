import React, { useState } from 'react'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import Nav from '@/components/Nav'
import InvoicesList from '@/components/InvoicesList'
import Invoice from '@/components/Invoice'
import Popup from '@/components/Popup'
import EditInvoice from '@/components/EditInvoice'
import EmptyList from '@/components/EmptyList'
import invoices from '../../data.json'

// 3. Tailwind Nightmare (Theme, Styles)
// 4. Build static pages
// 5. Manage local state
// 6. Setup serverless app

// NEW FieldArray

// Each ID should be 2 random uppercased letters followed by 4 random numbers.
// Invoices can be created either as drafts or as pending. Clicking "Save as Draft" should allow the user to leave any form field blank, but should create an ID if one doesn't exist and set the status to "draft". Clicking "Save & Send" should require all forms fields to be filled in, and should set the status to "pending".
// Changing the Payments Terms field should set the `paymentDue` property based on the `createdAt` date plus the numbers of days set for the payment terms.
// The `total` should be the sum of all items on the invoice.

const IndexPage = () => {
  const [filters, setFilters] = useState(['draft', 'pending', 'paid'])
  const filteredInvoices = invoices.filter(invoice => filters.includes(invoice.status))
  const [isPopupOpen, setIsPopupOpen] = useState(false)

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
            <Invoice
              key={id}
              clientName={clientName}
              id={id}
              paymentDue={paymentDue}
              status={status as any}
              total={total}
            />
          ))}
        </InvoicesList>
      ) : (
        <EmptyList className="mt-32" />
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
          onCancel={() => {
            console.log('Close popup without saving')
            setIsPopupOpen(false)
          }}
          onSaveAsDraft={values => {
            console.log('Create new invoice with data: ', JSON.stringify(values, null, 2))
            setIsPopupOpen(false)
          }}
          onSubmit={values => {
            console.log('Create new invoice with data: ', JSON.stringify(values, null, 2))
            setIsPopupOpen(false)
          }}
          className="h-form-mobile md:h-form-tablet lg:h-form-desktop"
        />
      </Popup>
    </Layout>
  )
}

export default IndexPage
