import React from 'react'
import { format } from 'date-fns'

interface Address {
  street: string
  city: string
  postCode: string
  country: string
}

export interface InvoiceInfoProps extends React.HTMLProps<HTMLDivElement> {
  id: string
  createdAt: string
  paymentDue: string
  description: string
  clientName: string
  clientEmail: string
  senderAddress: Address
  clientAddress: Address
  items: {
    name: string
    quantity: number
    price: number
    total: number
  }[]
  total: number
}

const InvoiceInfo = ({
  id,
  createdAt,
  paymentDue,
  description,
  clientName,
  clientEmail,
  senderAddress,
  clientAddress,
  items,
  total,
  className = '',
  ...props
}: InvoiceInfoProps) => {
  const createdAtDate = new Date(createdAt)
  const paymentDueDate = new Date(paymentDue)

  return (
    <section className={`invoice p-6 md:p-8 lg:p-12 ${className}`} {...props}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-12">
        <div>
          <div className="font-bold text-h3 mb-2">
            <span className="text-grey-light">#</span>
            {id}
          </div>
          <div className="text-purple-light dark:text-grey-lighter">{description}</div>
        </div>
        <div className="md:col-span-2 text-right invoice-address">
          <div>{senderAddress.street}</div>
          <div>{senderAddress.city}</div>
          <div>{senderAddress.postCode}</div>
          <div>{senderAddress.country}</div>
        </div>
        <div>
          <div className="invoice-label">Invoice Date</div>
          <time dateTime={createdAtDate.toISOString()} className="invoice-value">
            {format(createdAtDate, 'dd MMM yyyy')}
          </time>
        </div>
        <div className="row-span-2">
          <div className="invoice-label">Bill To</div>
          <div className="invoice-value mb-2">{clientName}</div>
          <div className="invoice-address">
            <div>{clientAddress.street}</div>
            <div>{clientAddress.city}</div>
            <div>{clientAddress.postCode}</div>
            <div>{clientAddress.country}</div>
          </div>
        </div>
        <div className="md:order-2">
          <div className="invoice-label">Payment Due</div>
          <time dateTime={paymentDueDate.toISOString()} className="invoice-value">
            {format(paymentDueDate, 'dd MMM yyyy')}
          </time>
        </div>
        <div className="md:order-1 col-span-full md:col-span-1">
          <div className="invoice-label">Sent To</div>
          <div className="invoice-value">{clientEmail}</div>
        </div>
      </div>
      <div>
        <div>
          <div>Item Name</div>
          <div>QTY.</div>
          <div>Price</div>
          <div>Total</div>
        </div>
        <ol>
          {items.map(({ name, quantity, price, total }, index) => (
            <li key={index}>
              <div>{name}</div>
              <div>{quantity}</div>
              <div>
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP' })
                  .format(price)
                  .replace(/^(\D)/, '$1 ')}
              </div>
              <div>
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP' })
                  .format(total)
                  .replace(/^(\D)/, '$1 ')}
              </div>
            </li>
          ))}
        </ol>
        <div>
          <div>Amount Due</div>
          <div>
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP' })
              .format(total)
              .replace(/^(\D)/, '$1 ')}
          </div>
        </div>
      </div>
    </section>
  )
}

export default InvoiceInfo
