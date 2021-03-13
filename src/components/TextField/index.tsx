import React from 'react'

export interface TextFieldProps extends React.HTMLProps<HTMLInputElement> {
  children: string
}

function TextField({ children, type = 'text', className = '', ...props }: TextFieldProps) {
  return (
    <label className={`${className}`}>
      <div className="text-purple-light dark:text-grey-lighter mb-3">{children}</div>
      <input
        type={type}
        className="w-full h-12 px-5 bg-white dark:grey-dark border border-grey-lighter dark:border-grey focus:border-purple font-bold rounded-input transition-colors"
        {...props}
      />
    </label>
  )
}

export default TextField
