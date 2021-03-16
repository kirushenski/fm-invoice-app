import React from 'react'
import { Story } from '@storybook/react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import TextField, { TextFieldProps } from '.'

export default {
  title: 'Forms / TextField',
  component: TextField,
}

const Template: Story<TextFieldProps> = args => (
  <Formik
    initialValues={{ streetAddress: '' }}
    validationSchema={Yup.object().shape({
      streetAddress: Yup.string().required('Street Address cannot be empty'),
    })}
    onSubmit={values => {
      console.log(JSON.stringify(values, null, 2))
    }}
  >
    <Form noValidate>
      <TextField {...args} />
      <button type="submit" className="btn-primary mt-4">
        Submit
      </button>
    </Form>
  </Formik>
)
export const Primary = Template.bind({})
Primary.args = {
  children: 'Street Address',
  name: 'streetAddress',
}
