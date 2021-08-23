import client from '../api'
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import EeForm from './EeForm'
import { Ee } from '../types'
import { useQuery, useMutation, useQueryClient } from 'react-query'

function UpdateEe() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const history = useHistory()

  const { data, isLoading } = useQuery<Ee>(['ees', id], () =>
    client.get(`/api/v1/ees/${id}`).then((response) => response.data)
  )

  const updateEe = useMutation<Ee, any, Ee>(
    (values: Ee) =>
      client.put(`/api/v1/ees/${id}`, values).then((response) => response.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('ees')
      },
    }
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const ee = data as Ee
  return (
    <EeForm
      ee={ee}
      onSubmit={(values, { setSubmitting }) => {
        updateEe.mutate(values)
        setSubmitting?.(false)
        history.push('/ees')
      }}
    />
  )
}

export default UpdateEe
