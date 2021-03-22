import React from 'react'
import { Story } from '@storybook/react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Dropdown, { DropdownProps } from '.'

export default {
  title: 'Edit / Dropdown',
  component: Dropdown,
  argTypes: {
    className: { table: { disable: true } },
  },
}

const Template: Story<DropdownProps> = args => (
  <Formik
    initialValues={{ paymentTerms: 30 }}
    validationSchema={Yup.object().shape({
      paymentTerms: Yup.string().required('Payment Terms cannot be empty'),
    })}
    onSubmit={values => {
      console.log(JSON.stringify(values, null, 2))
    }}
  >
    <Form noValidate>
      <Dropdown {...args} />
      <button type="submit" className="btn btn-primary mt-4">
        Submit
      </button>
    </Form>
  </Formik>
)
export const Primary = Template.bind({})
Primary.args = {
  name: 'paymentTerms',
  children: 'Payment Terms',
  items: [
    { name: 'Net 1 Day', value: 1 },
    { name: 'Net 7 Days', value: 7 },
    { name: 'Net 14 Days', value: 14 },
    { name: 'Net 30 Days', value: 30 },
  ],
}
