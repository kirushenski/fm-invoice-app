import React from 'react'
import { Link } from 'gatsby'
import ArrowLeft from '@/icons/arrow-left.svg'

const GoBack = ({ children, className = '', ...props }: Omit<React.HTMLProps<HTMLAnchorElement>, 'ref'>) => {
  return (
    <Link to="/" className={`flex items-center font-bold ${className}`} {...props}>
      <ArrowLeft className="mr-6" />
      Go back
    </Link>
  )
}

export default GoBack
