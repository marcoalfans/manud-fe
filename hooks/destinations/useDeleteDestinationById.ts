import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { ErrorResponse } from '@/dto/errorResponseDto'

import { deleteDestinationById } from '@/services/destinations/deleteDestinations'

const useDeleteDestinationById = () => {
  const [error, setError] = useState<string>('')
  const router = useRouter()

  const fetchDeleteDestinationById = useCallback(
    async (id: number) => {
      try {
        await deleteDestinationById(id)
      } catch (err) {
        const errorRes = err as ErrorResponse
        if (errorRes?.response?.status === 401) {
          router.push('/login')
        } else {
          setError('An unexpected error occurred')
        }
      }
    },
    [router]
  )
  return {
    fetchDeleteDestinationById,
    error
  }
}

export default useDeleteDestinationById
