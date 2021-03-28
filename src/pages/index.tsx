import React, { useState } from 'react'
import { useMedia } from 'react-media'
import { format } from 'date-fns'
import netlifyIdentity from 'netlify-identity-widget'
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
import { SHOW_DATE_FORMAT } from '@/utils/constants'

// TODO Add mutation on create
// TODO Add mutation on edit
// TODO Add mutation on status change
// TODO Add mutation on remove
// TODO Add loader to the both pages
// TODO Mount error message component instead of console.error
// TODO Check validation summary
// TODO Check console errors about null
// TODO How to change status from draft to pending?
// TODO Write tests

const IndexPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const isTablet = useMedia({ query: '(min-width: 768px)' })

  const [invoices, setInvoices] = useInvoices()
  const [filters, setFilters] = useState(['draft', 'pending', 'paid'])
  const filteredInvoices = invoices?.filter(invoice => filters.includes(invoice.status))

  function createInvoice(values: Omit<Invoice, 'id' | 'paymentDue' | 'status' | 'total'>, isDraft = false) {
    if (!invoices) return
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

  function handleLoginButtonClick() {
    netlifyIdentity.open()
  }

  return (
    <Layout>
      <Seo />
      {filteredInvoices ? (
        <>
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
              {filteredInvoices.map(({ client, id, paymentDue, status, total }) => (
                <Invoice
                  key={id}
                  clientName={client.name}
                  id={id}
                  paymentDue={paymentDue}
                  status={status}
                  total={total}
                />
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
                createdAt: format(new Date(), SHOW_DATE_FORMAT),
                description: '',
                paymentTerms: 'Net 30 Days',
                sender: {
                  street: '',
                  city: '',
                  postCode: '',
                  country: '',
                },
                client: {
                  name: '',
                  email: '',
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
        </>
      ) : (
        <>
          <h1 className="sr-only">Invoices</h1>
          <ErrorMessage isLogin onLoginButtonClick={handleLoginButtonClick}>
            You need to log in first to work with the invoices
          </ErrorMessage>
        </>
      )}
    </Layout>
  )
}

export default IndexPage
