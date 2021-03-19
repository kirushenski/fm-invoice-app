import React from 'react'
import InvoicesList from '.'
import Invoice from '@/components/Invoice'

export default {
  title: 'InvoicesList',
  component: InvoicesList,
}

export const Primary = () => (
  <InvoicesList>
    <Invoice clientName="Jensen Huang" id="RT3080" paymentDue="2021-08-19" status="paid" total={1800.9} />
    <Invoice clientName="Alex Grim" id="XM9141" paymentDue="2021-09-20" status="pending" total={556} />
    <Invoice clientName="Anita Wainwright" id="FV2353" paymentDue="2021-11-12" status="draft" total={3102.04} />
  </InvoicesList>
)
