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

const INITIAL_FILTERS = ['draft', 'pending', 'paid']

const IndexPage = () => {
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const filteredInvoices = invoices.filter(invoice => filters.includes(invoice.status))
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  return (
    <Layout>
      <Seo title="Home" />
      <Nav
        filters={INITIAL_FILTERS}
        initialFilters={INITIAL_FILTERS}
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
      <Popup heading="New Invoice" isSidebar isOpen={isPopupOpen} onRequestClose={() => setIsPopupOpen(false)}>
        <EditInvoice
          initialValues={{
            city: '',
            clientCity: '',
            clientCountry: '',
            clientEmail: '',
            clientName: '',
            clientPostCode: '',
            clientStreetAddress: '',
            country: '',
            invoiceDate: '',
            items: [],
            paymentTerms: '',
            postCode: '',
            projectDescription: '',
            streetAddress: '',
          }}
          mode="new"
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
