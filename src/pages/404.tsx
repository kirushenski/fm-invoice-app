import React from 'react'
import { PageProps } from 'gatsby'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import ErrorMessage from '@/components/ErrorMessage'

// TODO More content on 404?
// TODO Improve SEO on pages

const NotFoundPage = ({ location }: PageProps) => {
  return (
    <Layout>
      <Seo />
      <h1 className="sr-only">Page not found</h1>
      <ErrorMessage isLink>
        Path <span className="font-bold">{location.pathname}</span> doesn’t exist
      </ErrorMessage>
    </Layout>
  )
}

export default NotFoundPage
