import React from 'react'
import { Link } from 'gatsby'
import { useMedia } from 'react-media'
import { format } from 'date-fns'
import convertPrice from '@/utils/convertPrice'
import { SHOW_DATE_FORMAT } from '@/utils/constants'
import ArrowRight from '@/icons/arrow-right.svg'

export type InvoiceProps = Pick<Invoice, 'id' | 'paymentDue' | 'total' | 'status'> & {
  clientName: string
} & Omit<React.HTMLProps<HTMLAnchorElement>, 'ref'>

const Invoice = ({ id, paymentDue, clientName, total, status, className = '', ...props }: InvoiceProps) => {
  const isTablet = useMedia({ query: '(min-width: 768px)' })
  const paymentDueDate = paymentDue && new Date(paymentDue)

  return (
    <Link
      to={`/invoice?id=${id}`}
      className={`invoice relative grid grid-cols-2 md:grid-cols-invoice items-end md:items-center gap-x-2 gap-y-7 md:gap-5 p-6 md:py-4 border border-transparent hover:border-purple-dark focus-visible:border-purple-dark focus:outline-none transition-colors ${className}`}
      {...props}
    >
      <div className="font-bold">
        <span className="text-grey-light">#</span>
        {id}
      </div>
      <div className="absolute md:static left-6 top-15">
        <span className="text-grey-light dark:text-grey-lighter">{paymentDue ? 'Due ' : '–'}</span>
        {paymentDueDate && (
          <time dateTime={paymentDueDate.toISOString()} className="text-purple-light dark:text-grey-lighter">
            {format(paymentDueDate, SHOW_DATE_FORMAT)}
          </time>
        )}
      </div>
      <div className="text-purple-light dark:text-white text-right md:text-left">{clientName || '–'}</div>
      <div className="font-bold text-h4 md:pr-5 md:text-right">{convertPrice(total)}</div>
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
