import React from 'react'
import InvoicesList from '.'
import Invoice from '@/components/Invoice'

export default {
  title: 'Home / InvoicesList',
  component: InvoicesList,
}

export const Primary = () => (
  <InvoicesList>
    <Invoice name="RT3080" clientName="Jensen Huang" paymentDue="2021-08-19" status="paid" total={1800.9} />
    <Invoice name="XM9141" clientName="Alex Grim" paymentDue="2021-09-20" status="pending" total={556} />
    <Invoice name="FV2353" clientName="Anita Wainwright" paymentDue="2021-11-12" status="draft" total={3102.04} />
  </InvoicesList>
)
