'use client'

import Link from 'next/link'
import { Umkm } from '@/data/umkm'

export default function UmkmCard({ item }: { item: Umkm }) {
  return (
    <article className='group w-full overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt={item.name}
        className='h-44 w-full object-cover transition group-hover:scale-[1.02]'
        loading='lazy'
      />
      <div className='space-y-3 p-4'>
        <div className='flex items-center justify-between gap-3'>
          <h3 className='line-clamp-1 text-base font-semibold'>{item.name}</h3>
          <span className='rounded-full bg-neutral-100 px-2.5 py-1 text-xs'>
            {item.category}
          </span>
        </div>
        <p className='text-muted-foreground line-clamp-2 text-sm'>
          {item.description}
        </p>
        {item.location && (
          <p className='text-xs text-neutral-500'>📍 {item.location}</p>
        )}

        <div className='flex flex-wrap gap-2 pt-1'>
          <Link
            href={`/umkm/${item.id}`}
            className='inline-flex items-center rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50'
            aria-label={`Lihat detail ${item.name}`}
          >
            Detail
          </Link>

          {item.marketplaceUrl && (
            <a
              href={item.marketplaceUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center rounded-lg bg-black px-3 py-2 text-sm font-semibold text-white hover:opacity-90'
            >
              Ke Marketplace
            </a>
          )}

          {item.whatsapp && (
            <a
              href={`https://wa.me/${item.whatsapp}`}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:opacity-90'
            >
              Hubungi WA
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
