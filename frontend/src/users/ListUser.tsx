import React from 'react'
import { useQueryClient, useQuery, useMutation } from 'react-query'
import client from '../api'
import { User } from '../types'
import { useHistory } from 'react-router-dom'

type UserPreviewProps = {
  user: User
  handleEdit: (user: User) => void
  handleDelete: (user: User) => void
  handleDetail: (user: User) => void
}

function UserPreview({
  user,
  handleEdit,
  handleDelete,
  handleDetail,
}: UserPreviewProps) {
  return (
    <>
      {user.username}
      <br />
      <button type='button' onClick={() => handleDetail(user)}>
        detail
      </button>
      <button type='button' onClick={() => handleEdit(user)}>
        edit
      </button>
      <button type='button' onClick={() => handleDelete(user)}>
        delete
      </button>
    </>
  )
}

function ListUsers() {
  const history = useHistory()
  const queryClient = useQueryClient() // eslint-disable-line no-unused-vars
  const usersQuery = useQuery<User[]>('users', () => {
    return client
      .get('/api/v1/users')
      .then((response) => response.data) as Promise<User[]>
  })

  const deleteUser = useMutation<any, any, Partial<User>>(
    ({ id }) => {
      return client.delete(`/api/v1/users/${id}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users')
      },
    }
  )

  const handleEdit = ({ id }: User) => {
    history.push(`/users/update/${id}`)
  }

  const handleDelete = ({ id }: User) => {
    deleteUser.mutate({ id })
  }

  const handleDetail = ({ id }: User) => {
    history.push(`/users/detail/${id}`)
  }

  return (
    <>
      <p>{usersQuery.data?.length} users</p>
      <ul>
        {usersQuery.data?.map((user) => (
          <li key={user.id}>
            <UserPreview
              user={user}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleDetail={handleDetail}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ListUsers
