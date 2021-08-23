import React from 'react'
import { useParams } from 'react-router-dom'
import client from '../api'
import { useQuery } from 'react-query'
import { Ee } from '../types'

function DetailEe() {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading } = useQuery<Ee>(['ees', id], () =>
    client.get(`/api/v1/ees/${id}`).then((response) => response.data)
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const ee = data as Ee

  return (
    <div>
      <label>{ee.e}</label>
      <br />
    </div>
  )
}

export default DetailEe
