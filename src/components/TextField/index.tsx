import React from 'react'
import { useField } from 'formik'
import { DayPickerInputProps } from 'react-day-picker'

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
  Input,
  required = true,
  className = '',
  ...props
}: TextFieldProps) {
  const [field, meta, helpers] = useField(name)
  const isError = meta.touched && meta.error

  const inputProps = {
    type,
    id: id || name,
    'aria-invalid': !!isError,
    'aria-describedby': `${name}Error`,
    className: `input ${isError ? 'border-red' : ''}`,
    required,
    ...field,
    ...props,
  }

  return (
    <div className={`${className}`}>
      <label htmlFor={id || name} className={`label ${isError ? 'text-red' : ''} ${hidden ? 'md:sr-only' : ''}`}>
        <span>{children}</span>
        {isError && (
          <span id={`${name}Error`} role="alert" className="text-red text-error font-semibold">
            {meta.error}
          </span>
        )}
      </label>
      {React.isValidElement(Input) ? (
        React.cloneElement(Input, {
          inputProps,
          onDayChange: day => {
            helpers.setValue(day || null)
          },
        } as DayPickerInputProps)
      ) : (
        <input {...inputProps} />
      )}
    </div>
  )
}

export default TextField
