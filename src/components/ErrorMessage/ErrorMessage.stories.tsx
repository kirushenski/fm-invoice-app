import React from 'react'
import { useMedia } from 'react-media'
import ErrorMessage from '.'

export default {
  title: 'Global / ErrorMessage',
  component: ErrorMessage,
}

export const EmptyList = () => {
  const isTablet = useMedia({ query: '(min-width: 768px)' })
  return (
    <ErrorMessage>
      Create an invoice by clicking the
      <br />
      <strong>New{isTablet && ' Invoice'}</strong> button and get started
    </ErrorMessage>
  )
}

export const InvoiceNotFound = () => {
  return (
    <ErrorMessage isLink>
      Invoice with id{' '}
      <span className="font-bold">
        <span className="text-grey-light">#</span>
        XM9141
      </span>{' '}
      doesn’t exist
    </ErrorMessage>
  )
}

export const PageNotFound = () => {
  return (
    <ErrorMessage isLink>
      Path <span className="font-bold">/404/</span> doesn’t exist
    </ErrorMessage>
  )
}
