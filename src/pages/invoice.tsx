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
import { useInvoices } from '@/components/InvoicesProvider'

// TODO Wrong id
// TODO Fallbacks for draft status

const NotFoundPage = ({ location }: PageProps) => {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)

  const isTablet = useMedia({ query: '(min-width: 768px)' })

  const searchParams = new URLSearchParams(location.search)
  const id = searchParams.get('id')
  const [invoices] = useInvoices()
  const invoice = invoices.find(invoice => invoice.id === id)
  if (!invoice) return null

  function handleDelete() {
    console.log('delete')
    setIsDeletePopupOpen(true)
  }

  function handleEdit() {
    console.log('edit')
    setIsEditPopupOpen(true)
  }

  function handleMarkAsPaid() {
    console.log('mark')
  }

  return (
    <Layout className="pt-4 md:pt-8 lg:pt-12">
      <Seo />
      <h1 className="sr-only">Invoice #{id}</h1>
      <GoBack className="mb-4" />
      <InvoiceStatus
        status={invoice.status as any}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onMarkAsPaid={handleMarkAsPaid}
        className="mb-6 md:mb-8"
      />
      {!isTablet && (
        <nav className="fixed left-0 right-0 bottom-0 px-6 py-5 bg-white dark:bg-grey-dark shadow-invoice">
          <InvoiceControls onEdit={handleEdit} onDelete={handleDelete} onMarkAsPaid={handleMarkAsPaid} />
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
            createdAt: format(new Date(invoice.createdAt), 'dd MMM y'),
            description: invoice.description,
            paymentTerms: invoice.paymentTerms,
            clientName: invoice.clientName,
            clientEmail: invoice.clientEmail,
            senderAddress: invoice.senderAddress,
            clientAddress: invoice.clientAddress,
            items: invoice.items,
          }}
          onSubmit={values => {
            console.log('Update invoice with changes: ', JSON.stringify(values, null, 2))
            setIsEditPopupOpen(false)
          }}
          onCancel={() => {
            console.log('Reset form and close popup without saving')
            setIsEditPopupOpen(false)
          }}
          className="h-form-mobile md:h-form-tablet lg:h-form-desktop"
        />
      </Popup>
      <Popup isOpen={isDeletePopupOpen} onRequestClose={() => setIsDeletePopupOpen(false)} heading="Confirm Deletion">
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
              console.log('Invoice is deleted')
              navigate('/')
            }}
          >
            Delete
          </button>
        </div>
      </Popup>
    </Layout>
  )
}

export default NotFoundPage
