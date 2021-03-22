import React from 'react'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'

// 3. Tailwind Nightmare (Theme, Styles)
// 4. Build static pages
// 5. Manage local state
// 6. Setup serverless app

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
