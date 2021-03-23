import React, { useState } from 'react'
import { navigate, PageProps } from 'gatsby'
import { format } from 'date-fns'
import { useMedia } from 'react-media'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import GoBack from '@/components/GoBack'
import InvoiceStatus from '@/components/InvoiceStatus'
import Popup from '@/components/Popup'
import EditInvoice from '@/components/EditInvoice'
import InvoiceControls from '@/components/InvoiceControls'
import InvoiceInfo from '@/components/InvoiceInfo'
import ErrorMessage from '@/components/ErrorMessage'
import { useInvoices } from '@/components/InvoicesProvider'
import getCreatedAt from '@/utils/getCreatedAt'
import getPaymentDue from '@/utils/getPaymentDue'
import { SHOW_DATE_FORMAT } from '@/utils/constants'

const NotFoundPage = ({ location }: PageProps) => {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)

  const isTablet = useMedia({ query: '(min-width: 768px)' })

  const searchParams = new URLSearchParams(location.search)
  const id = searchParams.get('id')
  const [invoices, setInvoices] = useInvoices()
  const invoice = invoices.find(invoice => invoice.id === id)

  function handleDelete() {
    setIsDeletePopupOpen(true)
  }

  function handleEdit() {
    setIsEditPopupOpen(true)
  }

  function handleMarkAsPaid() {
    setInvoices(
      invoices.map(invoice =>
        invoice.id === id
          ? {
              ...invoice,
              status: 'paid',
            }
          : invoice
      )
    )
  }

  return (
    <Layout className="pt-4 md:pt-8 lg:pt-12">
      <Seo title={`Invoice #${id}`} />
      <h1 className="sr-only">Invoice #{id}</h1>
      {invoice ? (
        <>
          <GoBack className="mb-4" />
          <InvoiceStatus
            status={invoice.status}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onMarkAsPaid={handleMarkAsPaid}
            className="mb-6 md:mb-8"
          />
          {!isTablet && (
            <nav className="fixed left-0 right-0 bottom-0 px-6 py-5 bg-white dark:bg-grey-dark shadow-invoice">
              <InvoiceControls
                status={invoice.status}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onMarkAsPaid={handleMarkAsPaid}
              />
            </nav>
          )}
          <InvoiceInfo
            id={invoice.id}
            createdAt={invoice.createdAt}
            paymentDue={invoice.paymentDue}
            description={invoice.description}
            clientName={invoice.clientName}
            clientEmail={invoice.clientEmail}
            senderAddress={invoice.senderAddress}
            clientAddress={invoice.clientAddress}
            items={invoice.items}
            total={invoice.total}
            className="mb-36 md:mb-0"
          />
          <Popup
            isOpen={isEditPopupOpen}
            onRequestClose={() => setIsEditPopupOpen(false)}
            heading={`Edit #${id}`}
            isSidebar
          >
            <EditInvoice
              mode="edit"
              initialValues={{
                createdAt: invoice.createdAt ? format(new Date(invoice.createdAt), SHOW_DATE_FORMAT) : '',
                description: invoice.description,
                paymentTerms: invoice.paymentTerms,
                clientName: invoice.clientName,
                clientEmail: invoice.clientEmail,
                senderAddress: invoice.senderAddress,
                clientAddress: invoice.clientAddress,
                items: invoice.items,
              }}
              onSubmit={values => {
                console.log(values)
                setInvoices(
                  invoices.map(invoice =>
                    invoice.id === id
                      ? {
                          ...invoice,
                          ...values,
                          createdAt: getCreatedAt(values.createdAt),
                          paymentDue: getPaymentDue(values.createdAt, values.paymentTerms),
                          total: values.items.reduce((acc, item) => acc + item.total, 0),
                        }
                      : invoice
                  )
                )
                setIsEditPopupOpen(false)
              }}
              onCancel={() => setIsEditPopupOpen(false)}
              className="h-form-mobile md:h-form-tablet lg:h-form-desktop"
            />
          </Popup>
          <Popup
            isOpen={isDeletePopupOpen}
            onRequestClose={() => setIsDeletePopupOpen(false)}
            heading="Confirm Deletion"
          >
            <p className="text-grey-light leading-5 mb-4">
              Are you sure you want to delete invoice #{id}? This action cannot be undone.
            </p>
            <div className="flex justify-end">
              <button className="btn btn-secondary mr-2" onClick={() => setIsDeletePopupOpen(false)}>
                Cancel
              </button>
              <button
                className="btn btn-delete"
                onClick={() => {
                  setInvoices(invoices.filter(invoice => invoice.id !== id))
                  navigate('/')
                }}
              >
                Delete
              </button>
            </div>
          </Popup>
        </>
      ) : (
        <ErrorMessage isLink>
          Invoice with id{' '}
          <span className="font-bold">
            <span className="text-purple-light">#</span>
            {id}
          </span>{' '}
          doesn’t exist
        </ErrorMessage>
      )}
    </Layout>
  )
}

export default NotFoundPage
