import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { ErrorResponse } from '@/dto/errorResponseDto'
import {
  updateDestination,
  updateDestinationFull,
  updateDestinationParams
} from '@/services/destinations/updateDestinations'

const useUpdateDestination = () => {
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const fetchUpdateDestination = useCallback(
    async (id: number, params: updateDestinationParams) => {
      setLoading(true)
      setError('')
      try {
        const response = await updateDestination(id, params)
        setLoading(false)
        return response.data
      } catch (err) {
        const errorRes = err as ErrorResponse
        setLoading(false)
        if (errorRes?.response?.status === 401) {
          router.push('/login')
        } else {
          setError('An unexpected error occurred')
        }
        throw err
      }
    },
    [router]
  )

  const fetchUpdateDestinationFull = useCallback(
    async (id: number, params: updateDestinationParams) => {
      setLoading(true)
      setError('')
      try {
        const response = await updateDestinationFull(id, params)
        setLoading(false)
        return response.data
      } catch (err) {
        const errorRes = err as ErrorResponse
        setLoading(false)
        if (errorRes?.response?.status === 401) {
          router.push('/login')
        } else {
          setError('An unexpected error occurred')
        }
        throw err
      }
    },
    [router]
  )

  return {
    fetchUpdateDestination,
    fetchUpdateDestinationFull,
    error,
    loading
  }
}

export default useUpdateDestination