import React from 'react'
import { useQueryClient, useQuery, useMutation } from 'react-query'
import client from '../api'
import { Ee } from '../types'
import { useHistory } from 'react-router-dom'

type EePreviewProps = {
  ee: Ee
  handleEdit: (ee: Ee) => void
  handleDelete: (ee: Ee) => void
  handleDetail: (ee: Ee) => void
}

function EePreview({
  ee,
  handleEdit,
  handleDelete,
  handleDetail,
}: EePreviewProps) {
  return (
    <>
      {ee.e}
      <br />
      <button type='button' onClick={() => handleDetail(ee)}>
        detail
      </button>
      <button type='button' onClick={() => handleEdit(ee)}>
        edit
      </button>
      <button type='button' onClick={() => handleDelete(ee)}>
        delete
      </button>
    </>
  )
}

function ListEes() {
  const history = useHistory()
  const queryClient = useQueryClient() // eslint-disable-line no-unused-vars
  const eesQuery = useQuery<Ee[]>('ees', () => {
    return client
      .get('/api/v1/ees')
      .then((response) => response.data) as Promise<Ee[]>
  })

  const deleteEe = useMutation<any, any, Partial<Ee>>(
    ({ id }) => {
      return client.delete(`/api/v1/ees/${id}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('ees')
      },
    }
  )

  const handleEdit = ({ id }: Ee) => {
    history.push(`/ees/update/${id}`)
  }

  const handleDelete = ({ id }: Ee) => {
    deleteEe.mutate({ id })
  }

  const handleDetail = ({ id }: Ee) => {
    history.push(`/ees/detail/${id}`)
  }

  return (
    <>
      <p>{eesQuery.data?.length} ees</p>
      <ul>
        {eesQuery.data?.map((ee) => (
          <li key={ee.id}>
            <EePreview
              ee={ee}
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

export default ListEes
