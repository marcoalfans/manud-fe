/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import api from '@/utils/api/axios'

export interface Umkms {
  id: number
  name: string
  name_lower: string
  image: string
  description: string
  category: string
  category_lower: string
  marketplaceUrl: string
  whatsapp: string
  location: string
  createdAt: {
    _seconds: number
    _nanoseconds: number
  }
  updatedAt: {
    _seconds: number
    _nanoseconds: number
  }
}

const useGetUmkms = () => {
  const [umkms, setUmkms] = useState<Umkms[]>([])
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const fetchUmkms = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await api.get('/umkm')
      setUmkms(response.data.items)
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUmkms()
  }, [])

  return {
    umkms,
    error,
    loading,
    fetchUmkms
  }
}

export default useGetUmkms
