export default function LoadingUmkm() {
  return (
    <main className='container pt-20'>
      <div className='mb-8 h-8 w-56 animate-pulse rounded bg-neutral-200' />
      <div className='mb-6 flex gap-3'>
        <div className='h-10 w-64 animate-pulse rounded bg-neutral-200' />
        <div className='h-10 w-40 animate-pulse rounded bg-neutral-200' />
      </div>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className='overflow-hidden rounded-2xl border'>
            <div className='h-44 w-full animate-pulse bg-neutral-200' />
            <div className='space-y-2 p-4'>
              <div className='h-4 w-1/2 animate-pulse rounded bg-neutral-200' />
              <div className='h-3 w-3/4 animate-pulse rounded bg-neutral-200' />
              <div className='mt-4 flex gap-2'>
                <div className='h-8 w-20 animate-pulse rounded bg-neutral-200' />
                <div className='h-8 w-28 animate-pulse rounded bg-neutral-200' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
