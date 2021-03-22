import React from 'react'
import { Story } from '@storybook/react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Datepicker, { DatepickerProps } from '.'

export default {
  title: 'Edit / Datepicker',
  component: Datepicker,
  argTypes: {
    className: { table: { disable: true } },
  },
}

const Template: Story<DatepickerProps> = args => (
  <Formik
    initialValues={{ invoiceDate: '21 Aug 2021' }}
    validationSchema={Yup.object().shape({
      invoiceDate: Yup.date().nullable().required('Invoice Date cannot be empty'),
    })}
    onSubmit={values => {
      console.log(JSON.stringify(values, null, 2))
    }}
  >
    <Form noValidate>
      <Datepicker {...args} />
      <button type="submit" className="btn btn-primary mt-4">
        Submit
      </button>
    </Form>
  </Formik>
)
export const Primary = Template.bind({})
Primary.args = {
  name: 'invoiceDate',
  children: 'Invoice Date',
}
