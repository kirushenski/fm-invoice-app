import React from 'react'
import { Story } from '@storybook/react'
import InvoiceStatus, { InvoiceStatusProps } from '.'

export default {
  title: 'InvoiceStatus',
  component: InvoiceStatus,
}

const Template: Story<InvoiceStatusProps> = args => <InvoiceStatus {...args} />
export const Primary = Template.bind({})
Primary.args = {
  status: 'paid',
}
