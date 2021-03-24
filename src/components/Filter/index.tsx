import React from 'react'
import { useSelect, useMultipleSelection, UseMultipleSelectionStateChange } from 'downshift'
import { useMedia } from 'react-media'
import Checkbox from '@/components/Checkbox'
import ArrowDown from '@/icons/arrow-down.svg'

export interface FilterProps extends React.HTMLProps<HTMLDivElement> {
  onFiltersChange?: (changes: UseMultipleSelectionStateChange<string>) => void
}

// TODO Add label (accessible name)

const FILTERS = ['draft', 'pending', 'paid']

const Filter = ({ onFiltersChange, className = '', ...props }: FilterProps) => {
  const isTablet = useMedia({ query: '(min-width: 768px)' })

  const { getDropdownProps, addSelectedItem, removeSelectedItem, selectedItems } = useMultipleSelection({
    initialSelectedItems: FILTERS,
    onSelectedItemsChange: onFiltersChange,
  })

  const { isOpen, highlightedIndex, getToggleButtonProps, getMenuProps, getItemProps } = useSelect({
    items: FILTERS,
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
        <span className="font-bold mr-3 md:mr-4">Filter{isTablet && ' by status'}</span>
        <ArrowDown className={`transform transition-transform ${isOpen ? '-rotate-180' : ''}`} />
      </button>
      <div className="dropdown-wrapper" {...getMenuProps()}>
        {isOpen && (
          <ul className="dropdown w-48 p-6 left-1/2 -translate-x-1/2 translate-y-2">
            {FILTERS.map((filter, index) => (
              <li key={filter} {...getItemProps({ item: filter, index })}>
                <Checkbox
                  id={filter}
                  checked={selectedItems.includes(filter)}
                  disabled
                  className={`${index === highlightedIndex ? 'checkbox-focused' : ''}`}
                >
                  {`${filter[0].toUpperCase()}${filter.slice(1)}`}
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
