import React, { useState } from 'react'
import { Formik, Form, FormikHelpers } from 'formik'

import api from '../api'
import { useHistory } from 'react-router-dom'
import { useQueryClient } from 'react-query'

type LogoutValues = {}

function Logout() {
  const [error, setError] = useState<string>('')
  const history = useHistory()
  const queryClient = useQueryClient()

  const handleError = (
    error: any,
    { setSubmitting }: Partial<FormikHelpers<LogoutValues>>
  ) => {
    if (error.response && error.response.data) {
      const { error: message } = error.response.data
      message && setError(message)
    }
    setSubmitting?.(false)
  }

  const handleSubmit = async (
    _: LogoutValues,
    { setSubmitting }: FormikHelpers<LogoutValues>
  ) => {
    try {
      await api.get('/auth/logout')
      setSubmitting?.(false)
      queryClient.setQueryData('user', () => undefined)
      history.push('/')
    } catch (error) {
      handleError(error, { setSubmitting })
    }
  }

  return (
    <Formik initialValues={{}} validate={() => ({})} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <button type='submit' disabled={isSubmitting}>
            Logout
          </button>
          {error && <div>{error}</div>}
        </Form>
      )}
    </Formik>
  )
}

export default Logout
