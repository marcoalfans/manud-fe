'use client'
import Shimmer from './Shimmer'

export default function CardsGridSkeleton({
  items = 8,
  withHeader = true
}: {
  items?: number
  withHeader?: boolean
}) {
  return (
    <main className='container pt-20'>
      {withHeader && (
        <>
          <Shimmer className='mb-3 h-9 w-60' />
          <Shimmer className='mb-6 h-4 w-[40ch]' />
          <div className='mb-6 flex gap-3'>
            <Shimmer className='h-10 w-64' />
            <Shimmer className='h-10 w-40' />
          </div>
        </>
      )}

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {Array.from({ length: items }).map((_, i) => (
          <div key={i} className='overflow-hidden rounded-2xl border'>
            <Shimmer className='h-44 w-full' />
            <div className='space-y-3 p-4'>
              <Shimmer className='h-5 w-1/2' />
              <Shimmer className='h-4 w-3/4' />
              <div className='mt-3 flex gap-2'>
                <Shimmer className='h-9 w-24 rounded-lg' />
                <Shimmer className='h-9 w-36 rounded-lg' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
