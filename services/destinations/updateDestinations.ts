import api from '@/utils/api/axios'

export interface updateDestinationParams {
  name?: string
  regency?: string
  category?: string
  rating?: number
  location?: string
  childEntry?: string
  adultsEntry?: string
  imageLink?: string
  information?: string
  whatsapp?: string
  mapsLink?: string
}

export const updateDestination = async (id: number, params: updateDestinationParams) => {
  return await api.patch(`/destinations/${id}`, {
    ...params,
    regency_lower: params.regency ? params.regency.toLowerCase() : undefined
  })
}

export const updateDestinationFull = async (id: number, params: updateDestinationParams) => {
  return await api.put(`/destinations/${id}`, {
    ...params,
    regency_lower: params.regency ? params.regency.toLowerCase() : undefined
  })
}