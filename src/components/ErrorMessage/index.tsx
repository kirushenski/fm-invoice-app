import React from 'react'
import { Link } from 'gatsby'
import IllustrationEmpty from '@/icons/illustration-empty.svg'

export interface ErrorMessage extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode
  isLink?: boolean
}
const EmptyList = ({ children, isLink = false, className = '', ...props }: ErrorMessage) => {
  return (
    <div className={`pt-32 text-center ${className}`} {...props}>
      <IllustrationEmpty className=" w-empty-mobile h-empty-mobile md:w-empty md:h-empty mx-auto mb-10 md:mb-16" />
      <h2 className="text-h3 font-bold mb-6">There is nothing here</h2>
      <p className="text-grey-light dark:text-grey-lighter">{children}</p>
      {isLink && (
        <Link to="/" className="btn-primary inline-flex mt-6">
          Back to the invoices list
        </Link>
      )}
    </div>
  )
}

export default EmptyList
