import React from 'react'
import Plus from '@/icons/plus.svg'

export default {
  title: 'Button',
}

export const NewInvoice = () => (
  <button className="btn-primary pl-2 pr-4">
    <div className="grid place-items-center w-8 h-8 mr-4 rounded-full bg-white">
      <Plus />
    </div>
    New Invoice
  </button>
)
export const MarkAsPaid = () => <button className="btn-primary">Mark as Paid</button>
export const Edit = () => <button className="btn-secondary">Edit</button>
export const SaveAsDraft = () => <button className="btn-save">Save as Draft</button>
export const Delete = () => <button className="btn-delete">Delete</button>
export const AddNewItem = () => <button className="btn-secondary block">+ Add New Item</button>
