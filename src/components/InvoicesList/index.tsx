import React from 'react'

export interface InvoicesListProps extends Omit<React.HTMLProps<HTMLOListElement>, 'type'> {
  children: React.ReactNode
}

const InvoicesList = ({ children, className = '', ...props }: InvoicesListProps) => {
  return (
    <ol className={`grid gap-4 ${className}`} {...props}>
      {React.Children.map(children, child => (
        <li>{child}</li>
      ))}
    </ol>
  )
}

export default InvoicesList
