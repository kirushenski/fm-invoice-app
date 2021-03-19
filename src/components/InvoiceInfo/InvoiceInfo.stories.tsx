import React from 'react'
import { Story } from '@storybook/react'
import InvoiceInfo, { InvoiceInfoProps } from '.'

export default {
  title: 'Invoice / InvoiceInfo',
  component: InvoiceInfo,
}

const Template: Story<InvoiceInfoProps> = args => <InvoiceInfo {...args} />
export const Primary = Template.bind({})
Primary.args = {
  id: 'XM9141',
  createdAt: '2021-08-21',
  paymentDue: '2021-09-20',
  description: 'Graphic Design',
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
  total: 556.0,
}
