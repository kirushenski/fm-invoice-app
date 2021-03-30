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
import { useUser } from '@/components/UserProvider'
import generateInvoiceName from '@/utils/generateInvoiceName'
import getCreatedAt from '@/utils/getCreatedAt'
import getPaymentDue from '@/utils/getPaymentDue'
import { SHOW_DATE_FORMAT } from '@/utils/constants'
import { createInvoice, getInvoices } from '@/utils/api'

// TODO Prod version returns 502
// TODO Change production URL
// TODO Write README
// TODO Write tests

const IndexPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const isTablet = useMedia({ query: '(min-width: 768px)' })

  const [invoices, setInvoices] = useInvoices()
  const [filters, setFilters] = useState(['draft', 'pending', 'paid'])
  const filteredInvoices = invoices?.filter(invoice => filters.includes(invoice.status))

  const user = useUser()

  async function handleNewInvoiceSubmit(values: InvoiceFormValues, isDraft = false) {
    if (!invoices || !user || !user.token) return

    const newInvoice: CreatedInvoice = {
      ...values,
      name: generateInvoiceName(invoices.map(({ name }) => name)),
      createdAt: getCreatedAt(values.createdAt),
      paymentDue: getPaymentDue(values.createdAt, values.paymentTerms),
      status: isDraft ? 'draft' : 'pending',
      total: values.items.reduce((acc, item) => acc + item.total, 0),
    }

    await createInvoice(user.token.access_token, newInvoice)
    const updatedInvoices = await getInvoices(user.token.access_token)
    if (updatedInvoices) setInvoices(updatedInvoices)

    setIsPopupOpen(false)
  }

  function handleLoginButtonClick() {
    netlifyIdentity.open()
  }

  return (
    <Layout>
      <Seo />
      {user ? (
        <>
          <Nav
            invoicesCount={filteredInvoices?.length ?? 0}
            onFiltersChange={({ selectedItems }) => {
              selectedItems && setFilters(selectedItems)
            }}
            onNewInvoiceCreate={() => setIsPopupOpen(true)}
            className="mb-8 md:mb-14 lg:mb-16"
          />
          {filteredInvoices ? (
            filteredInvoices.length ? (
              <InvoicesList>
                {filteredInvoices.map(({ id, name, client, paymentDue, status, total }) => (
                  <Invoice
                    key={id}
                    name={name}
                    clientName={client.name}
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
            )
          ) : (
            <div className="loader mx-auto">
              <span className="sr-only">Loading...</span>
            </div>
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
              onSaveAsDraft={values => handleNewInvoiceSubmit(values, true)}
              onSubmit={values => handleNewInvoiceSubmit(values)}
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
