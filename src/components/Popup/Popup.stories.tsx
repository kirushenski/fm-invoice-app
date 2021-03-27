import React, { useState } from 'react'
import { Story } from '@storybook/react'
import Popup, { PopupProps } from '.'
import EditInvoice from '@/components/EditInvoice'
import Layout from '@/components/Layout'

export default {
  title: 'Edit / Popup',
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
      <Layout>
        <button className="btn-secondary" onClick={() => setIsPopupOpen(true)}>
          Edit
        </button>
        <Popup {...args} isOpen={isPopupOpen} onRequestClose={() => setIsPopupOpen(false)}>
          <EditInvoice
            className="h-form-mobile md:h-form-tablet lg:h-form-desktop"
            mode="edit"
            initialValues={{
              createdAt: '21 Aug 2021',
              description: 'Graphic Design',
              paymentTerms: 'Net 30 Days',
              sender: {
                street: '19 Union Terrace',
                city: 'London',
                postCode: 'E1 3EZ',
                country: 'United Kingdom',
              },
              client: {
                name: 'Alex Grim',
                email: 'alexgrim@mail.com',
                street: '84 Church Way',
                city: 'Bradford',
                postCode: 'BD1 9PB',
                country: 'United Kingdom',
              },
              items: [
                {
                  name: 'Banner Design',
                  quantity: 1,
                  price: 156.0,
                  total: 156.0,
                },
                {
                  name: 'Email Design',
                  quantity: 2,
                  price: 200.0,
                  total: 400.0,
                },
              ],
            }}
            onSubmit={values => {
              console.log('Update invoice with changes: ', JSON.stringify(values, null, 2))
              setIsPopupOpen(false)
            }}
            onCancel={() => {
              console.log('Reset form and close popup without saving')
              setIsPopupOpen(false)
            }}
          />
        </Popup>
      </Layout>
    </>
  )
}
export const Sidebar = SidebarTemplate.bind({})
Sidebar.args = {
  isSidebar: true,
  heading: (
    <>
      Edit <span className="text-grey-light">#</span>XM9141
    </>
  ),
}
Sidebar.parameters = {
  layout: 'fullscreen',
}
