import React from 'react'
import { Story } from '@storybook/react'
import EditInvoice, { EditInvoiceProps } from '.'

export default {
  title: 'Forms / EditInvoice',
  component: EditInvoice,
}

const Template: Story<EditInvoiceProps> = args => <EditInvoice {...args} />

export const New = Template.bind({})
New.args = {
  mode: 'new',
  initialValues: {
    streetAddress: '',
    city: '',
    postCode: '',
    country: '',
    clientName: '',
    clientEmail: '',
    clientStreetAddress: '',
    clientCity: '',
    clientPostCode: '',
    clientCountry: '',
    projectDescription: '',
  },
  onSubmit: values => {
    alert(JSON.stringify(values, null, 2))
  },
}

export const Edit = Template.bind({})
Edit.args = {
  mode: 'edit',
  initialValues: {
    streetAddress: '19 Union Terrace',
    city: 'London',
    postCode: 'E1 3EZ',
    country: 'United Kingdom',
    clientName: 'Alex Grim',
    clientEmail: 'alexgrim@mail.com',
    clientStreetAddress: '84 Church Way',
    clientCity: 'Bradford',
    clientPostCode: 'BD1 9PB',
    clientCountry: 'United Kingdom',
    projectDescription: 'Graphic Design',
  },
  onSubmit: values => {
    alert(JSON.stringify(values, null, 2))
  },
}
