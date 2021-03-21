import React from 'react'
import { useSelect, useMultipleSelection, UseSelectProps, UseMultipleSelectionStateChange } from 'downshift'
import Checkbox from '@/components/Checkbox'
import ArrowDown from '@/icons/arrow-down.svg'

export interface FilterProps extends UseSelectProps<string> {
  initialSelectedItems?: string[]
  onSelectedItemsChange?: (changes: UseMultipleSelectionStateChange<string>) => void
  className?: string
}

const Filter = ({ items, initialSelectedItems, onSelectedItemsChange, className = '', ...props }: FilterProps) => {
  const { getDropdownProps, addSelectedItem, removeSelectedItem, selectedItems } = useMultipleSelection({
    initialSelectedItems,
    onSelectedItemsChange,
  })

  const { isOpen, getToggleButtonProps, getMenuProps, getItemProps } = useSelect({
    items,
    selectedItem: null,
    stateReducer: (_, actionAndChanges) => {
      const { changes, type } = actionAndChanges
      switch (type) {
        case useSelect.stateChangeTypes.MenuKeyDownEnter:
        case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          return { ...changes, isOpen: true }
      }
      return changes
    },
    onStateChange: ({ type, selectedItem }) => {
      switch (type) {
        case useSelect.stateChangeTypes.MenuKeyDownEnter:
        case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          if (selectedItem) {
            if (selectedItems.includes(selectedItem)) {
              removeSelectedItem(selectedItem)
            } else {
              addSelectedItem(selectedItem)
            }
          }
      }
    },
    ...props,
  })

  return (
    <div className={`relative inline-block ${className}`} {...props}>
      <button
        type="button"
        className="flex items-center p-4 rounded-input focus"
        {...getToggleButtonProps(getDropdownProps({ preventKeyAction: isOpen }))}
      >
        <span className="font-bold mr-4">Filter by status</span>
        <ArrowDown className={`transform transition-transform ${isOpen ? '-rotate-180' : ''}`} />
      </button>
      <div className="dropdown-wrapper" {...getMenuProps()}>
        {isOpen && (
          <ul className="dropdown w-48 p-6 left-1/2 -translate-x-1/2 translate-y-2">
            {items.map((item, index) => (
              <li key={item} {...getItemProps({ item, index })}>
                <Checkbox id={item} checked={selectedItems.includes(item)} disabled>
                  {`${item[0].toUpperCase()}${item.slice(1)}`}
                </Checkbox>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Filter
