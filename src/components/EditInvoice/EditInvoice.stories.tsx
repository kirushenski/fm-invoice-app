import React from 'react'
import { Story } from '@storybook/react'
import EditInvoice, { EditInvoiceProps } from '.'

export default {
  title: 'Edit / EditInvoice',
  component: EditInvoice,
}

const Template: Story<EditInvoiceProps> = args => <EditInvoice {...args} />

export const New = Template.bind({})
New.args = {
  mode: 'new',
  initialValues: {
    streetAddress: '',
    city: '',
    postCode: '',
    country: '',
    clientName: '',
    clientEmail: '',
    clientStreetAddress: '',
    clientCity: '',
    clientPostCode: '',
    clientCountry: '',
    invoiceDate: '',
    paymentTerms: '',
    projectDescription: '',
    items: [],
  },
  onSubmit: values => {
    console.log('Create new invoice with data: ', JSON.stringify(values, null, 2))
  },
  onCancel: () => {
    console.log('Close popup without saving')
  },
  onSaveAsDraft: values => {
    console.log('Create new invoice with data as draft: ', JSON.stringify(values, null, 2))
  },
}

export const Edit = Template.bind({})
Edit.args = {
  mode: 'edit',
  initialValues: {
    streetAddress: '19 Union Terrace',
    city: 'London',
    postCode: 'E1 3EZ',
    country: 'United Kingdom',
    clientName: 'Alex Grim',
    clientEmail: 'alexgrim@mail.com',
    clientStreetAddress: '84 Church Way',
    clientCity: 'Bradford',
    clientPostCode: 'BD1 9PB',
    clientCountry: 'United Kingdom',
    invoiceDate: '21 Aug 2021',
    paymentTerms: 'Net 30 Days',
    projectDescription: 'Graphic Design',
    items: [
      { name: 'Banner Design', qty: 1, price: '156.00' },
      { name: 'Email Design', qty: 2, price: '200.00' },
    ],
  },
  onSubmit: values => {
    console.log('Update invoice with changes: ', JSON.stringify(values, null, 2))
  },
  onCancel: () => {
    console.log('Reset form and close popup without saving')
  },
}
