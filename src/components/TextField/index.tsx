import React from 'react'
import { useField } from 'formik'

export interface TextFieldProps extends React.HTMLProps<HTMLInputElement> {
  children: string
  name: string
  hidden?: boolean
  Input?: React.ReactNode
}

function TextField({
  children,
  type = 'text',
  name,
  id,
  hidden,
  required = true,
  className = '',
  ...props
}: TextFieldProps) {
  const [field, meta] = useField(name)
  const isError = meta.touched && meta.error

  return (
    <div className={`${className}`}>
      <label htmlFor={id || name} className={`label ${isError ? 'text-red' : ''} ${hidden ? 'md:sr-only' : ''}`}>
        <span>{children}</span>
        {isError && (
          <span id={`${name}Error`} role="alert" className="error">
            {meta.error}
          </span>
        )}
      </label>
      <input
        type={type}
        id={id || name}
        required={required}
        aria-invalid={!!isError}
        aria-describedby={`${name}Error`}
        className={`input ${isError ? 'border-red' : ''}`}
        {...field}
        {...props}
      />
    </div>
  )
}

export default TextField
