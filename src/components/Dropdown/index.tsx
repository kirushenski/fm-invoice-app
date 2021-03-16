import React from 'react'
import { useSelect, UseSelectProps } from 'downshift'
import { useField } from 'formik'
import ArrowDown from '@/icons/arrow-down.svg'

export interface DropdownProps extends UseSelectProps<string> {
  name: string
  children: string
  className?: string
}

function Dropdown({ name, children, items, className = '', ...props }: DropdownProps) {
  const [field, meta, helpers] = useField(name)
  const isError = meta.touched && meta.error

  const {
    isOpen,
    selectedItem,
    highlightedIndex,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
  } = useSelect({
    items,
    selectedItem: field.value,
    onSelectedItemChange: ({ selectedItem }) => {
      helpers.setValue(selectedItem)
    },
    ...props,
  })
  return (
    <div className={`relative ${className}`}>
      <label className={`label ${isError ? 'text-red' : ''}`} {...getLabelProps()}>
        <span>{children}</span>
        {isError && (
          <span id={`${name}Error`} role="alert" className="error">
            {meta.error}
          </span>
        )}
      </label>
      <button
        type="button"
        className={`input relative pr-11 ${isError ? 'border-red' : ''} ${isOpen ? 'border-purple' : ''}`}
        {...getToggleButtonProps()}
      >
        {selectedItem}
        <ArrowDown className="absolute right-4 top-1/2 transform -translate-y-1/2" />
      </button>
      <ul className="dropdown right-0" {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <li
              key={`${item}${index}`}
              className={`flex items-center h-12 px-5 font-bold border-b last:border-none border-grey-lighter dark:border-grey-dark cursor-pointer ${
                index === highlightedIndex ? 'text-purple-dark dark:text-purple' : ''
              }`}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Dropdown
