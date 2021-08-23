import React from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { User } from '../types'

type CreateProps = {
  user?: User
  onSubmit: (values: User, helpers: FormikHelpers<User>) => void
}

function UserForm({ user, onSubmit }: CreateProps) {
  const initialValues: User = {
    username: user ? user.username : '',
    passwordHash: user ? user.passwordHash : '',
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
          <Field type='text' name='username' placeholder='Username' />

          <Field type='text' name='passwordHash' placeholder='PasswordHash' />

          <button type='submit' disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default UserForm
