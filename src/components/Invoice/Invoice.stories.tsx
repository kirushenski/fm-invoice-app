import React from 'react'
import { Story } from '@storybook/react'
import Invoice, { InvoiceProps } from '.'

export default {
  title: 'Invoice',
  component: Invoice,
}

const Template: Story<InvoiceProps> = args => <Invoice {...args} />

export const Paid = Template.bind({})
Paid.args = {
  id: 'RT3080',
  paymentDue: '2021-08-19',
  clientName: 'Jensen Huang',
  total: 1800.9,
  status: 'paid',
}

export const Pending = Template.bind({})
Pending.args = {
  id: 'XM9141',
  paymentDue: '2021-09-20',
  clientName: 'Alex Grim',
  total: 556.0,
  status: 'pending',
}

export const Draft = Template.bind({})
Draft.args = {
  id: 'FV2353',
  paymentDue: '2021-11-12',
  clientName: 'Anita Wainwright',
  total: 3102.04,
  status: 'draft',
}