import React from 'react'
import { useMedia } from 'react-media'
import { UseMultipleSelectionStateChange } from 'downshift'
import Filter from '@/components/Filter'
import Plus from '@/icons/plus.svg'

export interface NavProps extends React.HTMLProps<HTMLDivElement> {
  invoicesCount: number
  onFiltersChange: (changes: UseMultipleSelectionStateChange<string>) => void
  onNewInvoiceCreate: () => void
}

const Nav = ({ invoicesCount, onFiltersChange, onNewInvoiceCreate, className = '', ...props }: NavProps) => {
  const isTablet = useMedia({ query: '(min-width: 768px)' })

  return (
    <nav className={`flex items-center ${className}`} {...props}>
      <div className="flex-grow">
        <h1 className="text-h2 md:text-h1 font-bold mb-1 md:mb-2">Invoices</h1>
        <div className="text-grey-light dark:text-grey-lighter">
          {invoicesCount
            ? `${isTablet ? 'There are ' : ''}${invoicesCount}${isTablet ? ' total' : ''} invoices`
            : 'No invoices'}
        </div>
      </div>
      <Filter onFiltersChange={onFiltersChange} className="md:mr-6" />
      <button className="btn btn-primary pl-2 pr-4 h-11 md:h-12" onClick={onNewInvoiceCreate}>
        <div className="grid place-items-center w-8 h-8 mr-2 md:mr-4 rounded-full bg-white">
          <Plus />
        </div>
        New{isTablet && ' Invoice'}
      </button>
    </nav>
  )
}

export default Nav
