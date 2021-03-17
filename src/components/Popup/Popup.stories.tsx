import React, { useState } from 'react'
import { Story } from '@storybook/react'
import Popup, { PopupProps } from '.'
import EditInvoice from '@/components/EditInvoice'

export default {
  title: 'Popup',
  component: Popup,
}

const PrimaryTemplate: Story<PopupProps> = args => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  return (
    <>
      <button className="btn-delete" onClick={() => setIsPopupOpen(true)}>
        Delete
      </button>
      <Popup {...args} isOpen={isPopupOpen} onRequestClose={() => setIsPopupOpen(false)}>
        <p className="text-grey-light leading-5 mb-4">
          Are you sure you want to delete invoice #XM9141? This action cannot be undone.
        </p>
        <div className="flex justify-end">
          <button className="btn-secondary mr-2" onClick={() => setIsPopupOpen(false)}>
            Cancel
          </button>
          <button className="btn-delete">Delete</button>
        </div>
      </Popup>
    </>
  )
}
export const Primary = PrimaryTemplate.bind({})
Primary.args = {
  heading: 'Confirm Deletion',
}

const SidebarTemplate: Story<PopupProps> = args => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  return (
    <>
      <button className="btn-secondary" onClick={() => setIsPopupOpen(true)}>
        Edit
      </button>
      <Popup {...args} isOpen={isPopupOpen} onRequestClose={() => setIsPopupOpen(false)}>
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
    </>
  )
}
export const Sidebar = SidebarTemplate.bind({})
Sidebar.args = {
  isSidebar: true,
  heading: 'Edit #XM9141',
}
