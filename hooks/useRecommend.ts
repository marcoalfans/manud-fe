/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import api from '@/utils/api/axios'

export interface Destination {
  id: number
  name: string
  regency: string
  category: string
  rating: number
  location: string
  childEntry: string
  adultsEntry: string
  imageLink: string
  information: string
  name_lower: string
  regency_lower: string
  category_lower: string
  createdAt: {
    _seconds: number
    _nanoseconds: number
  }
  updatedAt: {
    _seconds: number
    _nanoseconds: number
  }
}

const useRecommend = () => {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const fetchRecommendation = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await api.get('/destinations')
      setDestinations(response.data.data)
      setLoading(false)
    } catch (err) {
      setError('An unexpected error occurred')
    }
  }

  useEffect(() => {
    fetchRecommendation()
  }, [])

  return {
    destinations,
    error,
    loading,
    fetchRecommendation
  }
}

export default useRecommend
