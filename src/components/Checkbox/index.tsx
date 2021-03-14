import React from 'react'
import Check from '@/icons/check.svg'

export interface CheckboxProps extends React.HTMLProps<HTMLInputElement> {
  children: string
}

const Checkbox = ({ id, children, ...props }: CheckboxProps) => {
  return (
    <>
      <input type="checkbox" id={id} className="sr-only" {...props} />
      <label htmlFor={id} className="checkbox">
        <Check className="absolute top-2 left-2 transform -translate-x-1/2 -translate-y-1/2 hidden" />
        {children}
      </label>
    </>
  )
}

export default Checkbox
