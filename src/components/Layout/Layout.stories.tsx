import React from 'react'
import Layout from '.'

export default {
  title: 'Global / Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
}

export const Primary = () => <Layout>Page content</Layout>
