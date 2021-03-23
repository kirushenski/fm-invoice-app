import React from 'react'
import { Story } from '@storybook/react'
import InvoiceControls, { InvoiceControlsProps } from '.'

export default {
  title: 'Invoice / InvoiceControls',
  component: InvoiceControls,
}

const Template: Story<InvoiceControlsProps> = args => (
  <nav className="px-6 py-5 bg-white dark:bg-grey-dark shadow-invoice">
    <InvoiceControls {...args} />
  </nav>
)
export const Primary = Template.bind({})
Primary.args = {
  status: 'pending',
}
