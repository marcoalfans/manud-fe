'use client'

import { useRouter, useParams } from 'next/navigation'
import { umkmData } from '@/data/umkm'

export default function UmkmDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const data = umkmData.find(x => x.id === id)

  if (!data) {
    return (
      <main className='container pt-20'>
        <div className='rounded-xl border p-6 text-center'>
          <p className='text-muted-foreground text-sm'>UMKM tidak ditemukan.</p>
          <button
            onClick={() => router.back()}
            className='mt-4 rounded-lg border px-4 py-2 text-sm'
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
        className='mb-6 rounded-lg border px-4 py-2 text-sm'
      >
        ← Kembali
      </button>

      <div className='grid gap-8 lg:grid-cols-2'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.image}
          alt={data.name}
          className='h-64 w-full rounded-2xl object-cover sm:h-80 lg:h-full'
        />
        <div>
          <h1 className='text-3xl font-bold'>{data.name}</h1>
          <p className='text-muted-foreground mt-2 text-sm'>
            {data.category} • {data.location ?? 'Desa Manud Jaya'}
          </p>
          <p className='mt-6 text-[15px] leading-relaxed'>{data.description}</p>

          <div className='mt-8 flex flex-wrap gap-3'>
            {data.marketplaceUrl && (
              <a
                href={data.marketplaceUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white hover:opacity-90'
              >
                Ke Marketplace
              </a>
            )}
            {data.whatsapp && (
              <a
                href={`https://wa.me/${data.whatsapp}`}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:opacity-90'
              >
                Hubungi via WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
