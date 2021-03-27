import React from 'react'
import { format } from 'date-fns'
import convertPrice from '@/utils/convertPrice'
import { SHOW_DATE_FORMAT } from '@/utils/constants'

export type InvoiceInfoProps = Omit<Invoice, 'paymentTerms' | 'status'> & React.HTMLProps<HTMLDivElement>

const InvoiceInfo = ({
  id,
  createdAt,
  paymentDue,
  description,
  sender,
  client,
  items,
  total,
  className = '',
  ...props
}: InvoiceInfoProps) => {
  const createdAtDate = createdAt && new Date(createdAt)
  const paymentDueDate = paymentDue && new Date(paymentDue)

  return (
    <section className={`invoice p-6 md:p-8 lg:p-12 ${className}`} {...props}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-12">
        <div>
          <div className="font-bold md:text-h4 mb-2">
            <span className="text-grey-light">#</span>
            {id}
          </div>
          <div className="text-purple-light dark:text-grey-lighter">{description || '–'}</div>
        </div>
        <div className="md:col-span-2 text-right invoice-address">
          <div>{sender.street || '–'}</div>
          <div>{sender.city || '–'}</div>
          <div>{sender.postCode || '–'}</div>
          <div>{sender.country || '–'}</div>
        </div>
        <div>
          <div className="invoice-label">Invoice Date</div>
          {createdAtDate ? (
            <time dateTime={createdAtDate.toISOString()} className="invoice-value">
              {format(createdAtDate, SHOW_DATE_FORMAT)}
            </time>
          ) : (
            <div className="invoice-value">–</div>
          )}
        </div>
        <div className="row-span-2">
          <div className="invoice-label">Bill To</div>
          <div className="invoice-value mb-2">{client.name || '–'}</div>
          <div className="invoice-address">
            <div>{client.street || '–'}</div>
            <div>{client.city || '–'}</div>
            <div>{client.postCode || '–'}</div>
            <div>{client.country || '–'}</div>
          </div>
        </div>
        <div className="md:order-2">
          <div className="invoice-label">Payment Due</div>
          {paymentDueDate ? (
            <time dateTime={paymentDueDate.toISOString()} className="invoice-value">
              {format(paymentDueDate, SHOW_DATE_FORMAT)}
            </time>
          ) : (
            <div className="invoice-value">–</div>
          )}
        </div>
        <div className="md:order-1 col-span-full md:col-span-1">
          <div className="invoice-label">Sent To</div>
          <div className="invoice-value">{client.email || '–'}</div>
        </div>
      </div>
      <div className="bg-grey-lightest dark:bg-grey rounded overflow-hidden">
        <div className="p-6 md:p-8 md:pb-10">
          <div
            className={`sr-only md:not-sr-only grid grid-cols-6 text-small text-purple-light ${
              items.length ? 'mb-8 md:mb-8' : ''
            }`}
          >
            <div id="invoice-name" className="col-span-3">
              Item Name
            </div>
            <div id="invoice-qty" className="text-center">
              QTY.
            </div>
            <div id="invoice-price" className="text-right">
              Price
            </div>
            <div id="invoice-total" className="text-right">
              Total
            </div>
          </div>
          {items.length ? (
            <ol className="grid gap-6 md:gap-8 font-bold">
              {items.map(({ name, quantity, price, total }, index) => (
                <li key={index} className="grid grid-cols-2 md:grid-cols-6 gap-2 items-center">
                  <div aria-labelledby="invoice-name" className="md:col-span-3">
                    {name || '–'}
                  </div>
                  <div className="order-2 md:order-none md:col-span-2 flex md:grid md:grid-cols-2">
                    <div
                      aria-labelledby="invoice-qty"
                      className="md:text-center text-purple-light dark:text-grey-lighter"
                    >
                      {quantity}
                    </div>
                    <div
                      aria-labelledby="invoice-price"
                      className="invoice-price md:text-right text-purple-light dark:text-grey-lighter"
                    >
                      {convertPrice(price)}
                    </div>
                  </div>
                  <div
                    aria-labelledby="invoice-total"
                    className="order-1 md:order-none row-span-2 md:row-span-1 text-right"
                  >
                    {convertPrice(total)}
                  </div>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
        <div className="flex justify-between items-center p-6 md:px-8 bg-grey dark:bg-grey-darkest text-white">
          <div className="text-small">Amount Due</div>
          <div className="text-h2 font-bold">{convertPrice(total)}</div>
        </div>
      </div>
    </section>
  )
}

export default InvoiceInfo
