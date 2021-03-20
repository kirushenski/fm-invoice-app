import React from 'react'
import { Link } from 'gatsby'
import ArrowLeft from '@/icons/arrow-left.svg'

const GoBack = ({ children, className = '', ...props }: Omit<React.HTMLProps<HTMLAnchorElement>, 'ref'>) => {
  return (
    <Link
      to="/"
      className={`inline-flex items-center py-4 pr-8 font-bold hover:text-purple-light dark:hover:text-grey-light focus-visible:text-purple-light dark:focus-visible:text-grey-light focus:outline-none transition-colors ${className}`}
      {...props}
    >
      <ArrowLeft className="mr-6" />
      Go back
    </Link>
  )
}

export default GoBack
