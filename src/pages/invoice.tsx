import React, { useState } from 'react'
import { navigate, PageProps } from 'gatsby'
import { format } from 'date-fns'
import { useMedia } from 'react-media'
import netlifyIdentity from 'netlify-identity-widget'
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
import { useUser } from '@/components/UserProvider'
import getCreatedAt from '@/utils/getCreatedAt'
import getPaymentDue from '@/utils/getPaymentDue'
import { SHOW_DATE_FORMAT } from '@/utils/constants'
import { deleteInvoice, editInvoice, getInvoices } from '@/utils/api'
import LoadingButton from '@/components/LoadingButton'

const InvoicePage = ({ location }: PageProps) => {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
  const [isInvoiceDeleting, setIsInvoiceDeleting] = useState(false)

  const isTablet = useMedia({ query: '(min-width: 768px)' })

  const searchParams = new URLSearchParams(location.search)
  const name = searchParams.get('name')
  const [invoices, setInvoices] = useInvoices()
  const invoice = invoices?.find(invoice => invoice.name === name)

  const { user, isUserLoading } = useUser()

  function handleDelete() {
    setIsDeletePopupOpen(true)
  }

  function handleEdit() {
    setIsEditPopupOpen(true)
  }

  async function handleStatusChange() {
    if (!invoice || !user || !user.token) return

    const updatedInvoice: Invoice = { ...invoice, status: invoice.status === 'pending' ? 'paid' : 'pending' }

    await editInvoice(user.token.access_token, updatedInvoice)
    const updatedInvoices = await getInvoices(user.token.access_token)
    if (updatedInvoices) setInvoices(updatedInvoices)
  }

  async function handleInvoiceEditSubmit(values: InvoiceFormValues, isDraft = false) {
    if (!invoice || !user || !user.token) return

    const updatedInvoice: Invoice = {
      ...invoice,
      ...values,
      createdAt: getCreatedAt(values.createdAt),
      paymentDue: getPaymentDue(values.createdAt, values.paymentTerms),
      status: invoice.status === 'draft' && !isDraft ? 'pending' : invoice.status,
      total: values.items.reduce((acc, item) => acc + item.total, 0),
    }

    await editInvoice(user.token.access_token, updatedInvoice)
    const updatedInvoices = await getInvoices(user.token.access_token)
    if (updatedInvoices) setInvoices(updatedInvoices)

    setIsEditPopupOpen(false)
  }

  async function handleInvoiceDelete() {
    if (!invoice || !user || !user.token) return

    await deleteInvoice(user.token.access_token, invoice.id)
    const updatedInvoices = await getInvoices(user.token.access_token)
    if (updatedInvoices) setInvoices(updatedInvoices)

    navigate('/')
  }

  function handleLoginButtonClick() {
    netlifyIdentity.open()
  }

  return (
    <Layout className="pt-4 md:pt-8 lg:pt-12">
      <Seo title={`Invoice #${name}`} />
      {user ? (
        <>
          <h1 className="sr-only">Invoice #{name}</h1>
          <GoBack className="mb-4" />
          {invoices ? (
            invoice ? (
              <>
                <InvoiceStatus
                  status={invoice.status}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                  className="mb-6 md:mb-8"
                />
                {!isTablet && (
                  <nav className="fixed left-0 right-0 bottom-0 px-6 py-5 bg-white dark:bg-grey-dark shadow-invoice">
                    <InvoiceControls
                      status={invoice.status}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onStatusChange={handleStatusChange}
                    />
                  </nav>
                )}
                <InvoiceInfo
                  name={invoice.name}
                  createdAt={invoice.createdAt}
                  paymentDue={invoice.paymentDue}
                  description={invoice.description}
                  sender={invoice.sender}
                  client={invoice.client}
                  items={invoice.items}
                  total={invoice.total}
                  className="mb-36 md:mb-0"
                />
                <Popup
                  isOpen={isEditPopupOpen}
                  onRequestClose={() => setIsEditPopupOpen(false)}
                  heading={
                    <>
                      Edit <span className="text-grey-light">#</span>XM9141
                    </>
                  }
                  isSidebar
                >
                  <EditInvoice
                    mode="edit"
                    status={invoice.status}
                    initialValues={{
                      createdAt: invoice.createdAt && format(new Date(invoice.createdAt), SHOW_DATE_FORMAT),
                      description: invoice.description,
                      paymentTerms: invoice.paymentTerms,
                      sender: invoice.sender,
                      client: invoice.client,
                      items: invoice.items,
                    }}
                    onSaveAsDraft={values => handleInvoiceEditSubmit(values, true)}
                    onSubmit={values => handleInvoiceEditSubmit(values)}
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
                    Are you sure you want to delete invoice #{name}? This action cannot be undone.
                  </p>
                  <div className="flex justify-end">
                    <button type="button" className="btn-secondary mr-2" onClick={() => setIsDeletePopupOpen(false)}>
                      Cancel
                    </button>
                    <LoadingButton
                      type="button"
                      className="btn-delete"
                      onClick={async () => {
                        setIsInvoiceDeleting(true)
                        await handleInvoiceDelete()
                        setIsInvoiceDeleting(false)
                      }}
                      isLoading={isInvoiceDeleting}
                      loadingText="Invoice Deleting..."
                    >
                      Delete
                    </LoadingButton>
                  </div>
                </Popup>
              </>
            ) : (
              <ErrorMessage isLink>
                Invoice with id{' '}
                <span className="font-bold">
                  <span className="text-grey-light">#</span>
                  {name}
                </span>{' '}
                doesn’t exist
              </ErrorMessage>
            )
          ) : (
            <div className="loader mx-auto">
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </>
      ) : (
        <>
          <h1 className="sr-only">Invoices</h1>
          {isUserLoading ? (
            <div className="loader mx-auto">
              <span className="sr-only">Loading user data...</span>
            </div>
          ) : (
            <ErrorMessage isLogin onLoginButtonClick={handleLoginButtonClick}>
              You need to log in first to work with the invoices
            </ErrorMessage>
          )}
        </>
      )}
    </Layout>
  )
}

export default InvoicePage
