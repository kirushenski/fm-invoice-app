import React from 'react'
import { Story } from '@storybook/react'
import Datepicker, { DatepickerProps } from '.'

export default {
  title: 'Forms / Datepicker',
  component: Datepicker,
  argTypes: {
    className: { table: { disable: true } },
  },
}

const Template: Story<DatepickerProps> = args => <Datepicker {...args} />
export const Primary = Template.bind({})
Primary.args = {
  children: 'Issue Date',
  value: '21 Aug 2021',
}
