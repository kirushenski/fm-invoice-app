import React from 'react'
import { Form, Formik, FormikHelpers, FormikErrors, FieldArray } from 'formik'
import * as Yup from 'yup'
import TextField from '@/components/TextField'
import Datepicker from '@/components/Datepicker'
import Dropdown from '@/components/Dropdown'
import Delete from '@/icons/delete.svg'

interface Item {
  name: string
  qty: number
  price: string
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
  invoiceDate: string
  paymentTerms: string
  projectDescription: string
  items: Item[]
}

export interface EditInvoiceProps extends Omit<React.HTMLProps<HTMLFormElement>, 'ref' | 'onSubmit'> {
  mode: 'new' | 'edit'
  initialValues: InitialValues
  onSubmit: (values: InitialValues, formikHelpers: FormikHelpers<InitialValues>) => void
  onCancel: () => void
  onSaveAsDraft?: (values: InitialValues) => void
}

const EditInvoice = ({
  mode,
  initialValues,
  onSubmit,
  onCancel,
  onSaveAsDraft,
  className = '',
  ...props
}: EditInvoiceProps) => {
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
        invoiceDate: Yup.date().nullable().required('Invoice Date cannot be empty'),
        paymentTerms: Yup.string().required('Payment Terms cannot be empty'),
        projectDescription: Yup.string().required('Project Description cannot be empty'),
        items: Yup.array().of(
          Yup.object().shape({
            name: Yup.string().required(({ path }) => `Item ${path.match(/\[(\d+)\]/)?.[1]} Name cannot be empty`),
            qty: Yup.number().required(({ path }) => `Item ${path.match(/\[(\d+)\]/)?.[1]} Quantity cannot be empty`),
            price: Yup.number()
              .min(0, ({ path }) => `Item ${path.match(/\[(\d+)\]/)?.[1]} Price must be greater than or equal to 0`)
              .required(({ path }) => `Item ${path.match(/\[(\d+)\]/)?.[1]} Price cannot be empty`),
          })
        ),
      })}
      onSubmit={onSubmit}
    >
      {({ values, errors, isValid }) => (
        <Form noValidate className={`relative ${className}`} {...props}>
          <div className="h-full overflow-y-auto scroll-gradient sidebar-paddings pb-38 md:pb-64">
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
                <TextField
                  name="clientEmail"
                  type="email"
                  placeholder="e.g. email@example.com"
                  className="col-span-full"
                >
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
                <Datepicker name="invoiceDate">Invoice Date</Datepicker>
                <Dropdown name="paymentTerms" items={['Net 1 Day', 'Net 7 Days', 'Net 14 Days', 'Net 30 Days']}>
                  Payment Terms
                </Dropdown>
                <TextField
                  name="projectDescription"
                  placeholder="e.g. Graphic Design Service"
                  className="col-span-full"
                >
                  Project Description
                </TextField>
              </div>
            </fieldset>
            <fieldset>
              <legend className="font-bold text-legend text-grey-light-alt mb-4">Item List</legend>
              <div className="hidden md:grid grid-cols-item gap-4">
                <div className="label">Item Name</div>
                <div className="label">Qty.</div>
                <div className="label">Price</div>
                <div className="label">Total</div>
                <div className="sr-only">Remove</div>
              </div>
              <FieldArray name="items">
                {({ push, remove }) => (
                  <div className="grid gap-12 md:gap-4">
                    {values.items.map((item, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-item-mobile md:grid-cols-item gap-x-4 gap-y-6 md:gap-y-4"
                      >
                        <TextField name={`items[${index}].name`} hidden className="col-span-full md:col-span-1">
                          Item Name
                        </TextField>
                        <TextField name={`items[${index}].qty`} type="number" min={1} hidden>
                          Qty.
                        </TextField>
                        <TextField name={`items[${index}].price`} hidden>
                          Price
                        </TextField>
                        <div>
                          <div className="label md:sr-only">Total</div>
                          <output className="input flex items-center bg-transparent dark:bg-transparent text-grey-light border-none px-0">
                            {!Number.isNaN(parseFloat(item.price))
                              ? (parseFloat(item.price) * item.qty).toFixed(2)
                              : '–'}
                          </output>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-grey-light hover:text-red focus-visible:text-red focus:outline-none transition-colors"
                        >
                          <Delete title={`Remove item ${index}`} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn-secondary w-full"
                      onClick={() => push({ name: '', qty: 1, price: '0.00' })}
                    >
                      + Add New Item
                    </button>
                  </div>
                )}
              </FieldArray>
            </fieldset>
            {!isValid ? (
              <ul className="mt-8">
                {Object.entries(errors)
                  .map(([name, value]) =>
                    name === 'items' ? (value as FormikErrors<Item>[]).map(item => item && Object.values(item)) : value
                  )
                  .flat(2)
                  .map((error, index) => (
                    <li key={index} className="list-item error">
                      {error}
                    </li>
                  ))}
              </ul>
            ) : null}
          </div>
          <div className="z-10 absolute left-0 right-0 bottom-0 grid grid-flow-col gap-2 justify-between sidebar-paddings py-5 md:py-8 md:rounded-r-sidebar bg-white dark:bg-grey-darker">
            <div>
              {mode === 'new' && (
                <button type="button" className="btn-secondary" onClick={onCancel}>
                  Discard
                </button>
              )}
            </div>
            <div className="grid grid-flow-col gap-2">
              {mode === 'edit' ? (
                <>
                  <button type="reset" className="btn-secondary" onClick={onCancel}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button type="button" className="btn-save" onClick={() => onSaveAsDraft?.(values)}>
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
      )}
    </Formik>
  )
}

export default EditInvoice
