'use client'

import { useMemo, useState } from 'react'
import UmkmCard from '@/components/ui/card/UmkmCard'
import Link from 'next/link'
import useGetUmkms from '@/hooks/umkm/useFetchUmkm'

export default function UmkmListPage() {
  const { umkms, loading } = useGetUmkms()

  const [q, setQ] = useState('')
  const [cat, setCat] = useState<
    'Semua' | 'Kuliner' | 'Kerajinan' | 'Pertanian' | 'Lainnya'
  >('Semua')

  const data = useMemo(() => {
    const text = q.toLowerCase()
    return umkms.filter(i => {
      const passCat = cat === 'Semua' || i.category === cat
      const passText =
        i.name.toLowerCase().includes(text) ||
        i.description.toLowerCase().includes(text)
      return passCat && passText
    })
  }, [q, umkms, cat])

  if (loading) {
    return <>...</>
  }

  return (
    <main className='container pt-20'>
      <div className='mb-8 flex flex-wrap items-end justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold'>Daftar UMKM Desa</h1>
          <p className='text-muted-foreground mt-2 text-sm'>
            Temukan produk unggulan UMKM Desa Manud Jaya. Klik detail,
            marketplace, atau langsung hubungi via WhatsApp.
          </p>
        </div>
        <Link
          href='/landing#potensi'
          className='text-sm underline underline-offset-4'
        >
          ← Kembali ke Potensi
        </Link>
      </div>

      {/* Controls */}
      <div className='mb-6 flex flex-wrap gap-3'>
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder='Cari UMKM atau produk…'
          className='h-10 w-full max-w-xs rounded-lg border px-3 text-sm outline-none focus:ring-2 focus:ring-neutral-400'
        />
        <select
          value={cat}
          onChange={e => setCat(e.target.value as any)}
          className='h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2 focus:ring-neutral-400'
        >
          <option>Semua</option>
          <option>Kuliner</option>
          <option>Kerajinan</option>
        </select>
      </div>

      {/* Grid */}
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {data?.map(item => (
          <UmkmCard key={item.id} item={item} />
        ))}
      </div>

      {data.length === 0 && (
        <div className='mt-10 rounded-xl border p-6 text-center'>
          <p className='text-muted-foreground text-sm'>
            Tidak ada UMKM yang cocok dengan pencarian.
          </p>
        </div>
      )}
    </main>
  )
}
