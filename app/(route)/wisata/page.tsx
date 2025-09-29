'use client'

import { NextPage } from 'next'
import Link from 'next/link'
import useRecommend from '@/hooks/useRecommend'
import CustomCard from '@/components/ui/card/CustomCard'

const WisataListPage: NextPage = () => {
  const { destinations } = useRecommend()

  const sorted = (destinations ?? [])
    .filter(d => d?.name && d?.imageLink)
    .sort(
      (a, b) =>
        parseFloat(b.rating.toString()) - parseFloat(a.rating.toString())
    )

  return (
    <main className='container pt-20'>
      <div className='mb-10 flex items-end justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold'>Daftar Destinasi Wisata</h1>
          <p className='text-muted-foreground mt-2 text-sm'>
            Jelajahi semua destinasi wisata Desa Manud Jaya.
          </p>
        </div>
        <Link href='/landing' className='text-sm underline underline-offset-4'>
          ← Kembali ke Landing
        </Link>
      </div>

      {sorted.length > 0 ? (
        <div className='grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {sorted.map(item => (
            <CustomCard
              key={item.id}
              title={item.name}
              img={item.imageLink}
              rating={parseFloat(item.rating.toString())}
              location={item.regency}
              description={`${(item.information ?? '').slice(0, 85)}...`}
              isSaveAvailable={false}
              clickToDetail={() =>
                (window.location.href = `/destinations/${item.id}`)
              }
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  window.location.href = `/destinations/${item.id}`
                }
              }}
            />
          ))}
        </div>
      ) : (
        <div className='rounded-xl border p-6 text-center'>
          <p className='text-muted-foreground text-sm'>
            Data destinasi belum tersedia.
          </p>
        </div>
      )}
    </main>
  )
}

export default WisataListPage
