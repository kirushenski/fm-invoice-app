import React, { useState } from 'react'
import Layout from '.'
import Popup from '@/components/Popup'
import EditInvoice from '@/components/EditInvoice'

export default {
  title: 'Basics / Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
}

export const Primary = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  return (
    <Layout>
      <button className="btn-secondary" onClick={() => setIsPopupOpen(true)}>
        Edit
      </button>
      <Popup heading="Edit #XM9141" isSidebar isOpen={isPopupOpen} onRequestClose={() => setIsPopupOpen(false)}>
        <EditInvoice
          mode="edit"
          initialValues={{
            city: 'London',
            clientCity: 'Bradford',
            clientCountry: 'United Kingdom',
            clientEmail: 'alexgrim@mail.com',
            clientName: 'Alex Grim',
            clientPostCode: 'BD1 9PB',
            clientStreetAddress: '84 Church Way',
            country: 'United Kingdom',
            invoiceDate: '21 Aug 2021',
            items: [
              {
                name: 'Banner Design',
                price: '156.00',
                qty: 1,
              },
              {
                name: 'Email Design',
                price: '200.00',
                qty: 2,
              },
            ],
            paymentTerms: 'Net 30 Days',
            postCode: 'E1 3EZ',
            projectDescription: 'Graphic Design',
            streetAddress: '19 Union Terrace',
          }}
          onSubmit={values => {
            console.log(JSON.stringify(values, null, 2))
          }}
        />
      </Popup>
    </Layout>
  )
}
