import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { ErrorResponse } from '@/dto/errorResponseDto'
import {
  addDestination,
  addDestinationParams
} from '@/services/destinations/addDestinations'

const usePostDestination = () => {
  const [error, setError] = useState<string>('')
  const router = useRouter()

  const fetchPostDestination = useCallback(
    async (params: addDestinationParams) => {
      try {
        await addDestination(params)
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
    fetchPostDestination,
    error
  }
}

export default usePostDestination
