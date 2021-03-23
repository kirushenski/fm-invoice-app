import React from 'react'

export interface InvoiceControlsHandlers {
  status: InvoiceStatus
  onEdit: () => void
  onDelete: () => void
  onMarkAsPaid: () => void
}

export type InvoiceControlsProps = InvoiceControlsHandlers & React.HTMLProps<HTMLDivElement>

const InvoiceControls = ({
  status,
  onEdit,
  onDelete,
  onMarkAsPaid,
  className = '',
  ...props
}: InvoiceControlsProps) => {
  return (
    <div className={`grid grid-flow-col gap-2 justify-center ${className}`} {...props}>
      <button className="btn-secondary" onClick={onEdit}>
        Edit
      </button>
      <button className="btn-delete" onClick={onDelete}>
        Delete
      </button>
      {status === 'pending' && (
        <button className="btn-primary" onClick={onMarkAsPaid}>
          Mark as Paid
        </button>
      )}
    </div>
  )
}

export default InvoiceControls
