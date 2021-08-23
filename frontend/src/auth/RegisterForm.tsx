import React, { useState } from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { RegisterValues } from '../types'
import api from '../api'

function Register() {
  const [error, setError] = useState<string>('')

  const initialValues: RegisterValues = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  }

  const handleSubmit = async (
    values: RegisterValues,
    { setSubmitting }: FormikHelpers<RegisterValues>
  ) => {
    try {
      await api.post('/auth/register', values)
      setSubmitting?.(false)
    } catch (error) {
      if (error.response && error.response.data) {
        const { error: message } = error.response.data
        message && setError(message)
      }
      setSubmitting?.(false)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={() => {
        return {}
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type='text' name='username' placeholder='Username' />
          <Field type='text' name='email' placeholder='Email' />
          <Field type='password' name='password' placeholder='Password' />
          <Field
            type='password'
            name='passwordConfirm'
            placeholder='Confirm password'
          />
          {error && <div>{error}</div>}
          <button type='submit' disabled={isSubmitting}>
            Register
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default Register
