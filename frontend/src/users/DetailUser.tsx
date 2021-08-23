import React from 'react'
import { useParams } from 'react-router-dom'
import client from '../api'
import { useQuery } from 'react-query'
import { User } from '../types'

function DetailUser() {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading } = useQuery<User>(['users', id], () =>
    client.get(`/api/v1/users/${id}`).then((response) => response.data)
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const user = data as User

  return (
    <div>
      <label>{user.username}</label>
      <br />

      <label>{user.passwordHash}</label>
      <br />
    </div>
  )
}

export default DetailUser
