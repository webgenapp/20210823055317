import React, { useState } from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'

import { LoginValues } from '../types'
import client from '../api'
import { useHistory } from 'react-router-dom'
import { useQueryClient } from 'react-query'

function Login() {
  const [error, setError] = useState<string>('')
  const history = useHistory()
  const queryClient = useQueryClient()

  const initialValues: LoginValues = {
    username: '',
    password: '',
  }

  const handleError = (
    error: any,
    { setSubmitting }: Partial<FormikHelpers<LoginValues>>
  ) => {
    if (error.response && error.response.data) {
      const { error: message } = error.response.data
      message && setError(message)
    }
    setSubmitting?.(false)
  }

  const handleSubmit = async (
    values: LoginValues,
    { setSubmitting }: FormikHelpers<LoginValues>
  ) => {
    try {
      await client.post('/auth/login', values)
      setSubmitting?.(false)
      await queryClient.invalidateQueries('user')
      history.push('/')
    } catch (error) {
      handleError(error, { setSubmitting })
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
          <Field type='password' name='password' placeholder='Password' />
          {error && <div>{error}</div>}
          <button type='submit' disabled={isSubmitting}>
            Login
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default Login
