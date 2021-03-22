import React from 'react'
import { Story } from '@storybook/react'
import Nav, { NavProps } from '.'

export default {
  title: 'Home / Nav',
  component: Nav,
}

const Template: Story<NavProps> = args => <Nav {...args} />
export const Primary = Template.bind({})
Primary.args = {
  invoicesCount: 7,
}

export const Empty = Template.bind({})
Empty.args = {
  invoicesCount: 0,
}
