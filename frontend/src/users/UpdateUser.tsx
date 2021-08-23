import client from '../api'
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import UserForm from './UserForm'
import { User } from '../types'
import { useQuery, useMutation, useQueryClient } from 'react-query'

function UpdateUser() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const history = useHistory()

  const { data, isLoading } = useQuery<User>(['users', id], () =>
    client.get(`/api/v1/users/${id}`).then((response) => response.data)
  )

  const updateUser = useMutation<User, any, User>(
    (values: User) =>
      client
        .put(`/api/v1/users/${id}`, values)
        .then((response) => response.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users')
      },
    }
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const user = data as User
  return (
    <UserForm
      user={user}
      onSubmit={(values, { setSubmitting }) => {
        updateUser.mutate(values)
        setSubmitting?.(false)
        history.push('/users')
      }}
    />
  )
}

export default UpdateUser
