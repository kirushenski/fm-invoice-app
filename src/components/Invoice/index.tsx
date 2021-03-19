import React from 'react'
import { Link } from 'gatsby'
import { useMedia } from 'react-media'
import ArrowRight from '@/icons/arrow-right.svg'

export interface InvoiceProps extends Omit<React.HTMLProps<HTMLAnchorElement>, 'ref'> {
  id: string
  paymentDue: string
  clientName: string
  total: number
  status: 'paid' | 'pending' | 'draft'
}

// TODO Transform dates
// TODO Transform prices
// TODO Add responsive version

const Invoice = ({ id, paymentDue, clientName, total, status, className = '', ...props }: InvoiceProps) => {
  const isTablet = useMedia({ query: '(min-width: 768px)' })

  return (
    <Link
      to={`/${id}/`}
      className={`relative grid grid-cols-2 md:grid-cols-invoice items-end md:items-center gap-6 md:gap-5 p-6 md:py-4 bg-white dark:bg-grey-dark text-grey-darkest dark:text-white rounded-invoice shadow-invoice ${className}`}
      {...props}
    >
      <div className="font-bold">
        <span className="text-purple-light">#</span>
        {id}
      </div>
      <div className="absolute md:static left-6 top-15">
        <span className="text-grey-light dark:text-grey-lighter">Due </span>
        <time className="text-purple-light dark:text-grey-lighter">{paymentDue}</time>
      </div>
      <div className="text-grey-light-alt2 text-right md:text-left">{clientName}</div>
      <div className="font-bold text-h3 pr-5 md:text-right">£ {total}</div>
      <div
        className={`ml-auto md:ml-0 ${
          status === 'paid' ? 'status-paid' : status === 'pending' ? 'status-pending' : 'status-draft'
        }`}
      >
        {status[0].toUpperCase()}
        {status.slice(1)}
      </div>
      {isTablet && <ArrowRight />}
    </Link>
  )
}

export default Invoice
