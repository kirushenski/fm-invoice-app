import React from 'react'
import { Story } from '@storybook/react'
import Filter, { FilterProps } from '.'

export default {
  title: 'Home / Filter',
  component: Filter,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: { table: { disable: true } },
  },
}

const Template: Story<FilterProps> = args => <Filter {...args} />
export const Primary = Template.bind({})
Primary.args = {
  items: ['draft', 'pending', 'paid'],
  initialSelectedItems: ['draft', 'pending', 'paid'],
}
