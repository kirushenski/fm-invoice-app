import React, { useState } from 'react'
import { Story } from '@storybook/react'
import Dropdown, { DropdownProps } from '.'

export default {
  title: 'Forms / Dropdown',
  component: Dropdown,
  argTypes: {
    selectedItem: { control: false },
    onSelectedItemChange: { control: false },
    className: { table: { disable: true } },
  },
}

const Template: Story<DropdownProps> = args => {
  const [selectedItem, setSelectedItem] = useState('Net 30 Days')
  return (
    <Dropdown
      {...args}
      selectedItem={selectedItem}
      onSelectedItemChange={({ selectedItem }) => selectedItem && setSelectedItem(selectedItem)}
    />
  )
}
export const Primary = Template.bind({})
Primary.args = {
  children: 'Payment Terms',
  items: ['Net 1 Day', 'Net 7 Days', 'Net 14 Days', 'Net 30 Days'],
}
