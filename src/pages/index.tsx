import React from 'react'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'

// TODO Setup dark mode on app level
// TODO Setup dark mode on Storybook level
// TODO Add Formik and create TextField
// TODO Add downshift and create Dropdown
// TODO Add dates library and create Datepicker
// TODO Build EditInvoice form and setup validation
// TODO Create sidebar with scrollable wrapper for form
// TODO Add react-modal and build delete popup
// TODO Filter component
// TODO Status component (tailwind only?)
// TODO InvoiceItem and InvoicesList
// TODO GoBack link
// TODO StatusBar and ActionsBar components with react-media (on Details page)
// TODO ItemsTable component
// TODO InvoiceDetails component
// TODO Component for empty invoices page

const IndexPage = () => {
  return (
    <Layout>
      <Seo title="Home" />
      <h1>Home</h1>
    </Layout>
  )
}

export default IndexPage
