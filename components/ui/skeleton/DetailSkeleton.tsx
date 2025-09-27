'use client'
import Shimmer from './Shimmer'

export default function DetailSkeleton() {
  return (
    <main className='container pt-20'>
      <Shimmer className='mb-6 h-9 w-44' />
      <div className='grid gap-8 lg:grid-cols-2'>
        <Shimmer className='h-64 w-full rounded-2xl sm:h-80 lg:h-[480px]' />
        <div className='space-y-3'>
          <Shimmer className='h-8 w-2/3' />
          <Shimmer className='h-4 w-40' />
          <Shimmer className='mt-4 h-4 w-full' />
          <Shimmer className='h-4 w-[80%]' />
          <Shimmer className='h-4 w-[60%]' />
          <div className='mt-6 flex gap-3'>
            <Shimmer className='h-11 w-40 rounded-xl' />
            <Shimmer className='h-11 w-44 rounded-xl' />
          </div>
        </div>
      </div>
    </main>
  )
}
