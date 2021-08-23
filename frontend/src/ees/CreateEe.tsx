import client from '../api'
import { FormikHelpers } from 'formik'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Ee, EeError } from '../types'
import EeForm from './EeForm'
import { useHistory } from 'react-router-dom'

function CreateEe() {
  const queryClient = useQueryClient()
  const history = useHistory()
  const createEe = useMutation<Ee, EeError, Ee>(
    (values) => {
      return client.post('/api/v1/ees', values)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('ees')
      },
    }
  )

  const handleSubmit = (values: Ee, { setSubmitting }: FormikHelpers<Ee>) => {
    createEe.mutate(values)
    setSubmitting?.(false)
    history.push('/ees')
  }

  return <EeForm onSubmit={handleSubmit} />
}

export default CreateEe
