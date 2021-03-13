import React from 'react'
import { Story } from '@storybook/react'
import TextField, { TextFieldProps } from '.'

export default {
  title: 'Forms / TextField',
  component: TextField,
}

const Template: Story<TextFieldProps> = args => <TextField {...args} />
export const Primary = Template.bind({})
Primary.args = {
  children: 'Street Address',
}
