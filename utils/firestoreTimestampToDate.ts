import { format } from 'date-fns'

export function firestoreTimestampToDate(timestamp: {
  _seconds: number
  _nanoseconds: number
}) {
  return new Date(
    timestamp._seconds * 1000 + timestamp._nanoseconds / 1_000_000
  )
}

export default function CreatedAtDisplay(createdAt: {
  _seconds: number
  _nanoseconds: number
}) {
  const date = firestoreTimestampToDate(createdAt)

  return format(date, 'dd MMM yyyy, HH:mm')
}
