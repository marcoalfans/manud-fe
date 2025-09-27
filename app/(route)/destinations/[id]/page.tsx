'use client'

import { NextPage } from 'next'
import { useParams, useRouter } from 'next/navigation'
import useRecommend from '@/hooks/useRecommend'

const DestinationDetailPage: NextPage = () => {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const { destinations } = useRecommend()

  const data = (destinations ?? []).find(d => d.id === params.id)

  if (!data) {
    return (
      <main className='container pt-20'>
        <div className='rounded-xl border p-6 text-center'>
          <p className='text-muted-foreground text-sm'>
            Destinasi tidak ditemukan.
          </p>
          <button
            onClick={() => router.back()}
            className='mt-4 rounded-xl border px-4 py-2 text-sm'
          >
            ← Kembali
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className='container pt-20'>
      <button
        onClick={() => router.back()}
        className='mb-6 rounded-xl border px-4 py-2 text-sm'
      >
        ← Kembali
      </button>

      <div className='grid gap-8 lg:grid-cols-2'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.imageLink}
          alt={data.name}
          className='h-64 w-full rounded-2xl object-cover sm:h-80 lg:h-full'
        />

        <div>
          <h1 className='text-3xl font-bold'>{data.name}</h1>
          <p className='text-muted-foreground mt-2 text-sm'>
            {data.regency} • Rating {parseFloat(data.rating).toFixed(1)}
          </p>

          <p className='mt-6 text-[15px] leading-relaxed'>{data.information}</p>

          <div className='mt-8 flex gap-3'>
            {data.whatsapp && (
              <a
                href={`https://wa.me/${encodeURIComponent(data.whatsapp)}`}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90'
              >
                Booking via WhatsApp
              </a>
            )}
            {data.mapsLink && (
              <a
                href={data.mapsLink}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center rounded-xl border px-5 py-3 text-sm'
              >
                Lihat di Google Maps
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default DestinationDetailPage

// import React from 'react'

// import DestinationDetail from '@/app/(route)/destinations/components/DestinationDetail'
// import { NextPage } from 'next'
// import { DetailPageProps } from '../index.props'

// const DestinationDetailPage: NextPage<DetailPageProps> = ({ params }) => {
//   return (
//     <>
//       <DestinationDetail id={params.id} />
//     </>
//   )
// }

// export default DestinationDetailPage
