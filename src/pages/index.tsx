import React from 'react'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'

// TODO Setup dark mode on app level
// TODO Setup dark mode on Storybook level

// TODO Create sidebar with scrollable wrapper for form

// TODO Add react-modal and build delete popup
// TODO Status component (tailwind only?)
// TODO InvoiceItem and InvoicesList
// TODO GoBack link
// TODO StatusBar and ActionsBar components with react-media (on Details page)
// TODO ItemsTable component
// TODO InvoiceDetails component
// TODO Component for empty invoices page

// NEW FieldArray

const IndexPage = () => {
  return (
    <Layout>
      <Seo title="Home" />
      <h1>Home</h1>
    </Layout>
  )
}

export default IndexPage
