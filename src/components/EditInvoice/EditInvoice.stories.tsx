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
    createdAt: '',
    description: '',
    paymentTerms: 30,
    clientName: '',
    clientEmail: '',
    senderAddress: {
      street: '',
      city: '',
      postCode: '',
      country: '',
    },
    clientAddress: {
      street: '',
      city: '',
      postCode: '',
      country: '',
    },
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
  status: 'pending',
  initialValues: {
    createdAt: '21 Aug 2021',
    description: 'Graphic Design',
    paymentTerms: 30,
    clientName: 'Alex Grim',
    clientEmail: 'alexgrim@mail.com',
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom',
    },
    clientAddress: {
      street: '84 Church Way',
      city: 'Bradford',
      postCode: 'BD1 9PB',
      country: 'United Kingdom',
    },
    items: [
      {
        name: 'Banner Design',
        quantity: 1,
        price: 156.0,
        total: 156.0,
      },
      {
        name: 'Email Design',
        quantity: 2,
        price: 200.0,
        total: 400.0,
      },
    ],
  },
  onSubmit: values => {
    console.log('Update invoice with changes: ', JSON.stringify(values, null, 2))
  },
  onCancel: () => {
    console.log('Reset form and close popup without saving')
  },
}
