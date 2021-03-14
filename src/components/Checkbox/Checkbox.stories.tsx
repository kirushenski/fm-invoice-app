import React from 'react'
import { Story } from '@storybook/react'
import Checkbox, { CheckboxProps } from '.'

export default {
  title: 'Forms / Checkbox',
  component: Checkbox,
}

const Template: Story<CheckboxProps> = args => <Checkbox {...args} />
export const Primary = Template.bind({})
Primary.args = {
  name: 'filter',
  value: 'draft',
  id: 'draft',
  children: 'Draft',
}
