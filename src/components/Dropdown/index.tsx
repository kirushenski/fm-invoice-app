import React from 'react'
import { useSelect, UseSelectProps } from 'downshift'

export interface DropdownProps extends UseSelectProps<string> {
  children: string
  className: string
}

function Dropdown({ children, items, selectedItem, className = '', ...props }: DropdownProps) {
  const { isOpen, highlightedIndex, getToggleButtonProps, getLabelProps, getMenuProps, getItemProps } = useSelect({
    items,
    selectedItem,
    ...props,
  })
  return (
    <div className={`${className}`}>
      <label className="block label" {...getLabelProps()}>
        {children}
      </label>
      <button className="input" {...getToggleButtonProps()}>
        {selectedItem}
      </button>
      <ul className="dropdown" {...getMenuProps()}>
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
