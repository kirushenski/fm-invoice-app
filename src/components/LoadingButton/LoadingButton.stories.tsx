import React, { useState } from 'react'
import { Story } from '@storybook/react'
import LoadingButton, { LoadingButtonProps } from '.'

export default {
  title: 'Global / LoadingButton',
  component: LoadingButton,
}

const Template: Story<LoadingButtonProps> = ({ onClick, ...args }) => {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <LoadingButton
      {...args}
      isLoading={isLoading}
      onClick={async e => {
        if (!onClick) return
        setIsLoading(true)
        await onClick(e)
        setIsLoading(false)
      }}
    />
  )
}
export const Primary = Template.bind({})
Primary.args = {
  type: 'button',
  loadingText: 'Saving',
  className: 'btn-primary',
  children: 'Save & Send',
}
