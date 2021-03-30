import React, { useEffect } from 'react'
import { Form, Formik, FormikHelpers, FieldArray, useFormikContext } from 'formik'
import * as Yup from 'yup'
import TextField, { TextFieldProps } from '@/components/TextField'
import Datepicker from '@/components/Datepicker'
import Dropdown from '@/components/Dropdown'
import Delete from '@/icons/delete.svg'

export interface EditInvoiceProps extends Omit<React.HTMLProps<HTMLFormElement>, 'ref' | 'onSubmit'> {
  mode: 'new' | 'edit'
  status?: InvoiceStatus
  initialValues: InvoiceFormValues
  onSubmit: (values: InvoiceFormValues, formikHelpers: FormikHelpers<InvoiceFormValues>) => void
  onCancel: () => void
  onSaveAsDraft: (values: InvoiceFormValues) => void
}

const TotalField = ({ index, name, ...props }: { index: number } & TextFieldProps) => {
  const { values, setFieldValue } = useFormikContext<InvoiceFormValues>()
  const quantity = values.items[index].quantity
  const price = values.items[index].price

  useEffect(() => {
    const total = Math.floor(price * quantity * 100) / 100
    setFieldValue(name, !Number.isNaN(total) ? total : '0.00')
  }, [quantity, price, setFieldValue, name])

  return <TextField name={name} {...props} />
}

const EditInvoice = ({
  mode,
  status,
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
        sender: Yup.object().shape({
          street: Yup.string().required("can't be empty"),
          city: Yup.string().required("can't be empty"),
          postCode: Yup.string().required("can't be empty"),
          country: Yup.string().required("can't be empty"),
        }),
        client: Yup.object().shape({
          name: Yup.string().required("can't be empty"),
          email: Yup.string().required("can't be empty"),
          street: Yup.string().required("can't be empty"),
          city: Yup.string().required("can't be empty"),
          postCode: Yup.string().required("can't be empty"),
          country: Yup.string().required("can't be empty"),
        }),
        createdAt: Yup.date().nullable().required("can't be empty"),
        paymentTerms: Yup.string().required("can't be empty"),
        description: Yup.string().required("can't be empty"),
        items: Yup.array()
          .of(
            Yup.object().shape({
              name: Yup.string().required("can't be empty"),
              quantity: Yup.number().required("can't be empty"),
              price: Yup.number().min(0, 'must be greater than or equal to 0').required("can't be empty"),
            })
          )
          .min(1, 'An item must be added'),
      })}
      onSubmit={onSubmit}
    >
      {({ values, errors, isValid }) => (
        <Form noValidate className={`relative ${className}`} {...props}>
          <div className="h-full overflow-y-auto scroll-gradient sidebar-paddings pb-38 md:pb-64">
            <fieldset className="mb-10 md:mb-12">
              <legend className="legend">Bill From</legend>
              <div className="form">
                <TextField name="sender.street" className="col-span-full">
                  Street Address
                </TextField>
                <TextField name="sender.city">City</TextField>
                <TextField name="sender.postCode">Post Code</TextField>
                <TextField name="sender.country" className="col-span-full md:col-span-1">
                  Country
                </TextField>
              </div>
            </fieldset>
            <fieldset className="mb-10 md:mb-12">
              <legend className="legend">Bill To</legend>
              <div className="form">
                <TextField name="client.name" className="col-span-full">
                  Client’s Name
                </TextField>
                <TextField
                  name="client.email"
                  type="email"
                  placeholder="e.g. email@example.com"
                  className="col-span-full"
                >
                  Client’s Email
                </TextField>
                <TextField name="client.street" className="col-span-full">
                  Street Address
                </TextField>
                <TextField name="client.city">City</TextField>
                <TextField name="client.postCode">Post Code</TextField>
                <TextField name="client.country" className="col-span-full md:col-span-1">
                  Country
                </TextField>
              </div>
            </fieldset>
            <fieldset className="mb-16 md:mb-8">
              <legend className="sr-only">Details</legend>
              <div className="grid md:grid-cols-2 gap-6">
                <Datepicker name="createdAt">Invoice Date</Datepicker>
                <Dropdown name="paymentTerms" items={['Net 1 Day', 'Net 7 Days', 'Net 14 Days', 'Net 30 Days']}>
                  Payment Terms
                </Dropdown>
                <TextField name="description" placeholder="e.g. Graphic Design Service" className="col-span-full">
                  Project Description
                </TextField>
              </div>
            </fieldset>
            <fieldset>
              <legend className="font-bold text-h3 text-purple-light mb-6">Item List</legend>
              <div className="hidden md:grid grid-cols-item gap-4 mb-2">
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
                        <TextField name={`items[${index}].quantity`} type="number" min={1} hidden>
                          Qty.
                        </TextField>
                        <TextField name={`items[${index}].price`} placeholder="0.00" hidden>
                          Price
                        </TextField>
                        <TotalField index={index} name={`items[${index}].total`} hidden readOnly>
                          Total
                        </TotalField>
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
                      onClick={() => push({ name: '', quantity: 1, price: '', total: '' })}
                    >
                      + Add New Item
                    </button>
                  </div>
                )}
              </FieldArray>
            </fieldset>
            {!isValid ? (
              <ul className="mt-8">
                {Object.keys(errors).filter(field => field !== 'items').length || Array.isArray(errors.items) ? (
                  <li className="list-dash list-inside error">All fields must be added</li>
                ) : null}
                {typeof errors.items === 'string' ? (
                  <li className="list-dash list-inside error">{errors.items}</li>
                ) : null}
              </ul>
            ) : null}
          </div>
          <div className="absolute left-0 right-0 bottom-0 grid grid-flow-col gap-2 justify-between sidebar-paddings py-5 md:py-8 md:rounded-r-sidebar bg-white dark:bg-grey-darker">
            <div>
              {mode === 'new' && (
                <button type="button" className="btn-secondary" onClick={onCancel}>
                  Discard
                </button>
              )}
              {mode === 'edit' && status === 'draft' && (
                <button type="button" className="btn-secondary" onClick={onCancel}>
                  Cancel
                </button>
              )}
            </div>
            <div className="grid grid-flow-col gap-2">
              {mode === 'new' && (
                <>
                  <button type="button" className="btn-save" onClick={() => onSaveAsDraft(values)}>
                    Save as Draft
                  </button>
                  <button type="submit" className="btn-primary">
                    Save & Send
                  </button>
                </>
              )}
              {mode === 'edit' && status === 'draft' && (
                <>
                  <button type="button" className="btn-save" onClick={() => onSaveAsDraft(values)}>
                    Save as Draft
                  </button>
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                </>
              )}
              {mode === 'edit' && status !== 'draft' && (
                <>
                  <button type="button" className="btn-secondary" onClick={onCancel}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Save Changes
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
