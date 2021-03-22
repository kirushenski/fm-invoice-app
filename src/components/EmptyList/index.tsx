import React from 'react'
import { useMedia } from 'react-media'
import IllustrationEmpty from '@/icons/illustration-empty.svg'

const EmptyList = ({ className = '', ...props }: React.HTMLProps<HTMLDivElement>) => {
  const isTablet = useMedia({ query: '(min-width: 768px)' })

  return (
    <div className={`text-center ${className}`} {...props}>
      <IllustrationEmpty className=" w-empty-mobile h-empty-mobile md:w-empty md:h-empty mx-auto mb-10 md:mb-16" />
      <h2 className="mb-6 font-bold text-h3">There is nothing here</h2>
      <p className="text-grey-light dark:text-grey-lighter">
        Create an invoice by clicking the
        <br />
        <strong>New{isTablet && ' Invoice'}</strong> button and get started
      </p>
    </div>
  )
}

export default EmptyList
