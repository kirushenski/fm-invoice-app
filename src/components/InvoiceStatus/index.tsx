import React from 'react'
import { useMedia } from 'react-media'
import InvoiceControls, { InvoiceControlsHandlers } from '@/components/InvoiceControls'

export interface InvoiceStatusProps extends InvoiceControlsHandlers, React.HTMLProps<HTMLDivElement> {
  status: InvoiceStatus
}

const InvoiceStatus = ({ status, onEdit, onDelete, onMarkAsPaid, className = '', ...props }: InvoiceStatusProps) => {
  const isTablet = useMedia({ query: '(min-width: 768px)' })

  return (
    <section className={`invoice flex items-center justify-between p-6 md:px-8 md:py-5 ${className}`} {...props}>
      <div className="w-full md:w-auto grid grid-flow-col gap-4 items-center justify-between md:justify-start">
        <div className="text-purple-light dark:text-grey-lighter">Status</div>
        <div
          className={`status ${
            status === 'paid' ? 'status-paid' : status === 'pending' ? 'status-pending' : 'status-draft'
          }`}
        >
          {status[0].toUpperCase()}
          {status.slice(1)}
        </div>
      </div>
      {isTablet && <InvoiceControls status={status} onEdit={onEdit} onDelete={onDelete} onMarkAsPaid={onMarkAsPaid} />}
    </section>
  )
}

export default InvoiceStatus
