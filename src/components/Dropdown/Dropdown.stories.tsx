import React from 'react'
import { Story } from '@storybook/react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Dropdown, { DropdownProps } from '.'

export default {
  title: 'Forms / Dropdown',
  component: Dropdown,
  argTypes: {
    selectedItem: { control: false },
    onSelectedItemChange: { control: false },
    className: { table: { disable: true } },
  },
}

// TODO Fix handler in this story

const Template: Story<DropdownProps> = args => (
  <Formik
    initialValues={{ paymentTerms: 'Net 30 Days' }}
    validationSchema={Yup.object().shape({
      paymentTerms: Yup.string().required('Payment Terms cannot be empty'),
    })}
    onSubmit={values => {
      console.log(JSON.stringify(values, null, 2))
    }}
  >
    <Form noValidate>
      <Dropdown {...args} />
      <button type="submit" className="btn-primary mt-4">
        Submit
      </button>
    </Form>
  </Formik>
)
export const Primary = Template.bind({})
Primary.args = {
  name: 'paymentTerms',
  children: 'Payment Terms',
  items: ['Net 1 Day', 'Net 7 Days', 'Net 14 Days', 'Net 30 Days'],
}
