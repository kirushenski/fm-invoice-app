import React, { useState } from 'react'
import Checkbox from '@/components/Checkbox'
import ArrowDown from '@/icons/arrow-down.svg'

// TODO Add animation

const Filter = ({ className = '', ...props }: React.HTMLProps<HTMLDivElement>) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`relative inline-block ${className}`} {...props}>
      <button
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        className="flex items-center"
      >
        <span className="font-bold mr-4">Filter by status</span>
        <ArrowDown className={`transition-transform transform ${!isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="dropdown p-6 w-48 left-1/2 -translate-x-1/2">
          <Checkbox name="filter" value="draft" id="draft">
            Draft
          </Checkbox>
          <Checkbox name="filter" value="pending" id="pending">
            Pending
          </Checkbox>
          <Checkbox name="filter" value="paid" id="paid">
            Paid
          </Checkbox>
        </div>
      )}
    </div>
  )
}

export default Filter
