import api from '@/utils/api/axios'

export const deleteDestination = async (id: string) => {
  await api.delete('/destinations/delete', { data: { id } })
}

export const deleteDestinationById = async (id: number) => {
  await api.delete(`/destinations/${id}`)
}
