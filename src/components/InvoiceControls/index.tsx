import React from 'react'

export interface InvoiceControlsHandlers {
  status: InvoiceStatus
  onEdit: () => void
  onDelete: () => void
  onStatusChange: () => void
}

export type InvoiceControlsProps = InvoiceControlsHandlers & React.HTMLProps<HTMLDivElement>

const InvoiceControls = ({
  status,
  onEdit,
  onDelete,
  onStatusChange,
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
      {status !== 'draft' && (
        <button className="btn-primary" onClick={onStatusChange}>
          Mark as {status === 'pending' ? 'Paid' : 'Pending'}
        </button>
      )}
    </div>
  )
}

export default InvoiceControls
