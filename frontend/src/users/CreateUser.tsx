import client from '../api'
import { FormikHelpers } from 'formik'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { User, UserError } from '../types'
import UserForm from './UserForm'
import { useHistory } from 'react-router-dom'

function CreateUser() {
  const queryClient = useQueryClient()
  const history = useHistory()
  const createUser = useMutation<User, UserError, User>(
    (values) => {
      return client.post('/api/v1/users', values)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users')
      },
    }
  )

  const handleSubmit = (
    values: User,
    { setSubmitting }: FormikHelpers<User>
  ) => {
    createUser.mutate(values)
    setSubmitting?.(false)
    history.push('/users')
  }

  return <UserForm onSubmit={handleSubmit} />
}

export default CreateUser
