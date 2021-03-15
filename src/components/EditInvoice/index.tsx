import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import TextField from '@/components/TextField'
import Datepicker from '@/components/Datepicker'
import Dropdown from '@/components/Dropdown'
import Delete from '@/icons/delete.svg'

interface ItemProps {
  id: string
  name: string
  qty: number
  price: number
}

interface InitialValues {
  streetAddress: string
  city: string
  postCode: string
  country: string
  clientName: string
  clientEmail: string
  clientStreetAddress: string
  clientCity: string
  clientPostCode: string
  clientCountry: string
  projectDescription: string
}

export interface EditInvoiceProps extends Omit<React.HTMLProps<HTMLFormElement>, 'ref' | 'onSubmit'> {
  mode: 'new' | 'edit'
  initialValues: InitialValues
  onSubmit: (values: InitialValues, formikHelpers: FormikHelpers<InitialValues>) => void
}

// TODO Integrate Datepicker
// TODO Integrate Dropdown
// TODO Add dynamic fields
// TODO Add errors block

const EditInvoice = ({ mode, initialValues, onSubmit, className = '', ...props }: EditInvoiceProps) => {
  const [selectedItem, setSelectedItem] = useState('Net 30 Days')
  const [errors, setErrors] = useState([])
  const [items, setItems] = useState<ItemProps[]>([])

  function onAddNewItem() {
    setItems(items => [...items, { id: uuid(), name: '', qty: 1, price: 0 }])
  }

  function onRemoveItem(id: string) {
    setItems(items => items.filter(item => item.id !== id))
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        streetAddress: Yup.string().required('Street Address cannot be empty'),
        city: Yup.string().required('City cannot be empty'),
        postCode: Yup.string().required('Post Code cannot be empty'),
        country: Yup.string().required('Country cannot be empty'),
        clientName: Yup.string().required('Client’s Name cannot be empty'),
        clientEmail: Yup.string().required('Client’s Email cannot be empty'),
        clientStreetAddress: Yup.string().required('Client’s Street Address cannot be empty'),
        clientCity: Yup.string().required('Client’s City cannot be empty'),
        clientPostCode: Yup.string().required('Client’s Post Code cannot be empty'),
        clientCountry: Yup.string().required('Client’s Country cannot be empty'),
        projectDescription: Yup.string().required('Project Description cannot be empty'),
      })}
      onSubmit={onSubmit}
    >
      <Form noValidate className={`${className}`} {...props}>
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
            {/* <Datepicker value="21 Aug 2021">Invoice Date</Datepicker>
          <Dropdown
            items={['Net 1 Day', 'Net 7 Days', 'Net 14 Days', 'Net 30 Days']}
            selectedItem={selectedItem}
            onSelectedItemChange={({ selectedItem }) => selectedItem && setSelectedItem(selectedItem)}
          >
            Payment Terms
          </Dropdown> */}
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
              <TextField name={`${item.id}-name`} value={item.name} hidden className="col-span-full md:col-span-1">
                Item Name
              </TextField>
              <TextField name={`${item.id}-qty`} type="number" value={item.qty} hidden>
                Qty.
              </TextField>
              <TextField name={`${item.id}-price`} type="number" value={item.price} hidden>
                Price
              </TextField>
              <TextField name={`${item.id}-total`} type="number" value={item.price * item.qty} readOnly hidden>
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
          {mode === 'new' && (
            <button type="button" className="btn-secondary">
              Discard
            </button>
          )}
          <div className={`flex ${mode === 'edit' ? 'ml-auto' : ''}`}>
            {mode === 'edit' ? (
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
      </Form>
    </Formik>
  )
}

export default EditInvoice
