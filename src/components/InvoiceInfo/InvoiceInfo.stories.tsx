import React from 'react'
import { Story } from '@storybook/react'
import InvoiceInfo, { InvoiceInfoProps } from '.'

export default {
  title: 'InvoiceInfo',
  component: InvoiceInfo,
}

const Template: Story<InvoiceInfoProps> = args => <InvoiceInfo {...args} />
export const Primary = Template.bind({})
Primary.args = {
  id: 'RT3080',
  createdAt: '2021-08-18',
  paymentDue: '2021-08-19',
  description: 'Re-branding',
  clientName: 'Jensen Huang',
  clientEmail: 'jensenh@mail.com',
  senderAddress: {
    street: '19 Union Terrace',
    city: 'London',
    postCode: 'E1 3EZ',
    country: 'United Kingdom',
  },
  clientAddress: {
    street: '106 Kendell Street',
    city: 'Sharrington',
    postCode: 'NR24 5WQ',
    country: 'United Kingdom',
  },
  items: [
    {
      name: 'Brand Guidelines',
      quantity: 1,
      price: 1800.9,
      total: 1800.9,
    },
  ],
  total: 1800.9,
}
