import React from 'react'
import { Story } from '@storybook/react'
import Sidebar, { SidebarProps } from '.'
import avatar from '@/images/avatar.jpg'

export default {
  title: 'Global / Sidebar',
  component: Sidebar,
}

const Template: Story<SidebarProps> = args => <Sidebar {...args} />
export const Primary = Template.bind({})
Primary.args = {
  avatar,
  isLoggedIn: true,
}
