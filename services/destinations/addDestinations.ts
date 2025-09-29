import api from '@/utils/api/axios'

export interface addDestinationParams {
  name: string
  regency: string // e.g., "Tabanan"
  category: string // e.g., "Historical Landmark"
  rating: number // 0–5 (float)
  location: string // Google Maps URL
  childEntry: string // e.g., "Rp30,000"
  adultsEntry: string // e.g., "Rp60,000"
  imageLink: string // image URL
  information: string // long description
}

export const addDestination = async (params: addDestinationParams) => {
  await api.post('/destinations', {
    ...params,
    regency_lower: '-'
  })
}
