import React from 'react'

export interface TextFieldProps extends React.HTMLProps<HTMLInputElement> {
  children: string
  hidden?: boolean
}

function TextField({ children, type = 'text', hidden, className = '', ...props }: TextFieldProps) {
  return (
    <label className={`${className}`}>
      <div className={`label ${hidden ? 'md:sr-only' : ''}`}>{children}</div>
      <input type={type} className="input" {...props} />
    </label>
  )
}

export default TextField
