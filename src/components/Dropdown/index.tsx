import React from 'react'
import { useSelect, UseSelectProps } from 'downshift'
import ArrowDown from '@/icons/arrow-down.svg'

export interface DropdownProps extends UseSelectProps<string> {
  children: string
  className?: string
}

function Dropdown({ children, items, selectedItem, className = '', ...props }: DropdownProps) {
  const { isOpen, highlightedIndex, getToggleButtonProps, getLabelProps, getMenuProps, getItemProps } = useSelect({
    items,
    selectedItem,
    ...props,
  })
  return (
    <div className={`relative ${className}`}>
      <label className="block label" {...getLabelProps()}>
        {children}
      </label>
      <button
        type="button"
        className={`input relative pr-11 ${isOpen ? 'border-purple' : ''}`}
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
