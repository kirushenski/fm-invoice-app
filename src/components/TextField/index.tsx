import React from 'react'

export interface TextFieldProps extends React.HTMLProps<HTMLInputElement> {
  children: string
}

function TextField({ children, type = 'text', className = '', ...props }: TextFieldProps) {
  return (
    <label className={`${className}`}>
      <div className="label">{children}</div>
      <input type={type} className="input" {...props} />
    </label>
  )
}

export default TextField
