import React from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { Ee } from '../types'

type CreateProps = {
  ee?: Ee
  onSubmit: (values: Ee, helpers: FormikHelpers<Ee>) => void
}

function EeForm({ ee, onSubmit }: CreateProps) {
  const initialValues: Ee = {
    e: ee ? ee.e : '',
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={() => {
        return {}
      }}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type='text' name='e' placeholder='E' />

          <button type='submit' disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default EeForm
