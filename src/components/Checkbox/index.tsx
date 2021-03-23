import React from 'react'
import Check from '@/icons/check.svg'

export interface CheckboxProps extends React.HTMLProps<HTMLInputElement> {
  children: string
}

const Checkbox = ({ id, children, className = '', ...props }: CheckboxProps) => {
  return (
    <>
      <input type="checkbox" id={id} className={`sr-only ${className}`} {...props} />
      <label htmlFor={id} className="checkbox">
        <Check className="absolute top-4 left-2 transform -translate-x-1/2 -translate-y-1/2 hidden" />
        {children}
      </label>
    </>
  )
}

export default Checkbox
