import React from 'react'
import { useMedia } from 'react-media'

export interface InvoiceStatusProps extends React.HTMLProps<HTMLDivElement> {
  status: 'paid' | 'pending' | 'draft'
  onEdit: () => void
  onDelete: () => void
  onMarkAsPaid: () => void
}

const InvoiceStatus = ({ status, onEdit, onDelete, onMarkAsPaid, className = '', ...props }: InvoiceStatusProps) => {
  const isTablet = useMedia({ query: '(min-width: 768px)' })

  return (
    <section
      className={`flex items-center justify-between p-6 md:px-8 md:py-5 bg-white dark:bg-grey-dark rounded-invoice shadow-invoice ${className}`}
      {...props}
    >
      <div className="w-full md:w-auto grid grid-flow-col gap-4 items-center justify-between md:justify-start">
        <div className="text-grey-light-alt2 dark:text-grey-lighter">Status</div>
        <div
          className={`${status === 'paid' ? 'status-paid' : status === 'pending' ? 'status-pending' : 'status-draft'}`}
        >
          {status[0].toUpperCase()}
          {status.slice(1)}
        </div>
      </div>
      {isTablet && (
        <div className="grid grid-flow-col gap-2">
          <button className="btn-secondary" onClick={onEdit}>
            Edit
          </button>
          <button className="btn-delete" onClick={onDelete}>
            Delete
          </button>
          <button className="btn-primary" onClick={onMarkAsPaid}>
            Mark as Paid
          </button>
        </div>
      )}
    </section>
  )
}

export default InvoiceStatus
