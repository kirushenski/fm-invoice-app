import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import TextField from '@/components/TextField'
import Datepicker from '@/components//Datepicker'
import Dropdown from '@/components/Dropdown'
import Delete from '@/icons/delete.svg'

interface ItemProps {
  id: string
  name: string
  qty: number
  price: number
}

const EditInvoice = ({ className = '', ...props }: React.HTMLProps<HTMLFormElement>) => {
  const [selectedItem, setSelectedItem] = useState('Net 30 Days')
  const [isEdit, setIsEdit] = useState(false)
  const [errors, setErrors] = useState([])
  const [items, setItems] = useState<ItemProps[]>([])

  function onAddNewItem() {
    setItems(items => [...items, { id: uuid(), name: '', qty: 1, price: 0 }])
  }

  function onRemoveItem(id: string) {
    setItems(items => items.filter(item => item.id !== id))
  }

  return (
    <form className={`${className}`} {...props}>
      <fieldset className="mb-10 md:mb-12">
        <legend className="legend">Bill From</legend>
        <div className="form">
          <TextField name="streetAddress" className="col-span-full">
            Street Address
          </TextField>
          <TextField name="city">City</TextField>
          <TextField name="postCode">Post Code</TextField>
          <TextField name="country" className="col-span-full md:col-span-1">
            Country
          </TextField>
        </div>
      </fieldset>
      <fieldset className="mb-10 md:mb-12">
        <legend className="legend">Bill To</legend>
        <div className="form">
          <TextField name="clientName" className="col-span-full">
            Client’s Name
          </TextField>
          <TextField name="clientEmail" type="email" placeholder="e.g. email@example.com" className="col-span-full">
            Client’s Email
          </TextField>
          <TextField name="clientStreetAddress" className="col-span-full">
            Street Address
          </TextField>
          <TextField name="clientCity">City</TextField>
          <TextField name="clientPostCode">Post Code</TextField>
          <TextField name="clientCountry" className="col-span-full md:col-span-1">
            Country
          </TextField>
        </div>
      </fieldset>
      <fieldset className="mb-16 md:mb-8">
        <legend className="sr-only">Details</legend>
        <div className="grid md:grid-cols-2 gap-6">
          <Datepicker value="21 Aug 2021">Invoice Date</Datepicker>
          <Dropdown
            items={['Net 1 Day', 'Net 7 Days', 'Net 14 Days', 'Net 30 Days']}
            selectedItem={selectedItem}
            onSelectedItemChange={({ selectedItem }) => selectedItem && setSelectedItem(selectedItem)}
          >
            Payment Terms
          </Dropdown>
          <TextField name="projectDescription" placeholder="e.g. Graphic Design Service" className="col-span-full">
            Project Description
          </TextField>
        </div>
      </fieldset>
      <fieldset className={`${errors.length ? 'mb-8' : 'mb-12'}`}>
        <legend className="font-bold text-legend text-grey-light-alt mb-4">Item List</legend>
        <div className="hidden md:grid grid-cols-item gap-4">
          <div className="label">Item Name</div>
          <div className="label">Qty.</div>
          <div className="label">Price</div>
          <div className="label">Total</div>
          <div className="sr-only">Remove</div>
        </div>
        {items.map(item => (
          <div
            key={item.id}
            className="grid grid-cols-item-mobile md:grid-cols-item gap-x-4 gap-y-6 md:gap-y-4 mb-12 md:mb-4"
          >
            <TextField name="itemName" value={item.name} hidden className="col-span-full md:col-span-1">
              Item Name
            </TextField>
            <TextField name="qty" type="number" value={item.qty} hidden>
              Qty.
            </TextField>
            <TextField name="price" type="number" value={item.price} hidden>
              Price
            </TextField>
            <TextField name="total" type="number" value={item.price * item.qty} readOnly hidden>
              Total
            </TextField>
            <button type="button" onClick={() => onRemoveItem(item.id)}>
              <Delete title="Remove item" />
            </button>
          </div>
        ))}
        <button type="button" className="btn-secondary w-full" onClick={onAddNewItem}>
          + Add New Item
        </button>
      </fieldset>
      {errors.length ? <div className="mb-11">Errors</div> : null}
      <div className="flex justify-between">
        {!isEdit && (
          <button type="button" className="btn-secondary">
            Discard
          </button>
        )}
        <div className={`flex ${isEdit ? 'ml-auto' : ''}`}>
          {isEdit ? (
            <>
              <button type="button" className="btn-secondary mr-2">
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button type="button" className="btn-save mr-2">
                Save as Draft
              </button>
              <button type="submit" className="btn-primary">
                Save & Send
              </button>
            </>
          )}
        </div>
      </div>
    </form>
  )
}

export default EditInvoice
