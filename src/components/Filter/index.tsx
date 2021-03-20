import React from 'react'
import { useSelect, useMultipleSelection, UseSelectProps } from 'downshift'
import Checkbox from '@/components/Checkbox'
import ArrowDown from '@/icons/arrow-down.svg'

// TODO Add animation
// TODO Make this component work (a11y & state)

export interface FilterProps extends UseSelectProps<string> {
  initialSelectedItems?: string[]
  className?: string
}

const Filter = ({ items, initialSelectedItems, className = '', ...props }: FilterProps) => {
  const { getDropdownProps, addSelectedItem } = useMultipleSelection({ initialSelectedItems })
  const { isOpen, getToggleButtonProps, getMenuProps, getItemProps } = useSelect({
    items,
    selectedItem: null,
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    stateReducer: (_, actionAndChanges) => {
      const { changes, type } = actionAndChanges
      switch (type) {
        case useSelect.stateChangeTypes.MenuKeyDownEnter:
        case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true, // keep the menu open after selection.
          }
      }
      return changes
    },
    onStateChange: ({ type, selectedItem }) => {
      switch (type) {
        case useSelect.stateChangeTypes.MenuKeyDownEnter:
        case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          if (selectedItem) {
            addSelectedItem(selectedItem)
          }
          break
        default:
          break
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
      {isOpen && (
        <div className="dropdown p-6 w-48 left-1/2 -translate-x-1/2 translate-y-2" {...getMenuProps()}>
          {isOpen &&
            items.map((item, index) => (
              <Checkbox
                key={`${item}${index}`}
                {...getItemProps({ item, index, name: 'filter', value: item, id: item })}
              >
                {item[0].toUpperCase()}
                {item.slice(1)}
              </Checkbox>
            ))}
        </div>
      )}
    </div>
  )
}

export default Filter
