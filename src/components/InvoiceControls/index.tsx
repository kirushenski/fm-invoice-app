import React, { useState } from 'react'
import LoadingButton from '../LoadingButton'

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
  const [isStatusChanging, setIsStatusChanging] = useState(false)

  return (
    <div className={`grid grid-flow-col gap-2 justify-center ${className}`} {...props}>
      <button type="button" className="btn-secondary" onClick={onEdit}>
        Edit
      </button>
      <button type="button" className="btn-delete" onClick={onDelete}>
        Delete
      </button>
      {status !== 'draft' && (
        <LoadingButton
          type="button"
          className="btn-primary"
          onClick={async () => {
            setIsStatusChanging(true)
            await onStatusChange()
            setIsStatusChanging(false)
          }}
          isLoading={isStatusChanging}
          loadingText="Status Changing..."
        >
          Mark as {status === 'pending' ? 'Paid' : 'Pending'}
        </LoadingButton>
      )}
    </div>
  )
}

export default InvoiceControls
