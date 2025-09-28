'use client'

import { NextPage } from 'next'
import CustomCard from '@/components/ui/card/CustomCard'
import useRecommend from '@/hooks/useRecommend'
import { useRouter } from 'next/navigation'
import React from 'react'
import Link from 'next/link'

const DestinasiUnggulan: NextPage = () => {
  const router = useRouter()
  const { destinations } = useRecommend()

  const handleCardClick = (id: string) => {
    router.push(`/destinations/${id}`)
  }

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    id: string
  ) => {
    if (event.key === 'Enter') {
      handleCardClick(id)
    }
  }

  // Urutkan berdasarkan rating tertinggi, ambil beberapa teratas
  const topPicks = (destinations ?? [])
    .filter(d => d?.rating) // safeguard
    .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    .slice(0, 8) // tampilkan maksimal 8 item di landing

  return (
    <section id='destinasi-unggulan' className='container pt-20'>
      <div className='mb-12 text-center'>
        <h1 className='text-4xl font-bold'>Destinasi Unggulan</h1>
        <p className='text-muted-foreground mt-3 text-sm'>
          Rekomendasi destinasi terbaik di Desa Manud Jaya berdasarkan rating &
          minat pengunjung.
        </p>
      </div>

      {topPicks.length > 0 ? (
        <div className='grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {topPicks.map(item => (
            <CustomCard
              key={item.id}
              title={item.name}
              img={item.imageLink}
              rating={parseFloat(item.rating)}
              location={item.regency}
              description={`${(item.information ?? '').slice(0, 85)}...`}
              isSaveAvailable={false}
              clickToDetail={() => handleCardClick(item.id)}
              onKeyPress={e => handleKeyPress(e, item.id)}
            />
          ))}
        </div>
      ) : (
        <div className='rounded-xl border p-6 text-center'>
          <p className='text-muted-foreground text-sm'>
            Data destinasi belum tersedia. Silakan cek kembali nanti.
          </p>
        </div>
      )}

      <div className='mt-10 text-center'>
        <Link
          href='/wisata'
          className='inline-block rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90'
        >
          Lihat Semua Destinasi
        </Link>
      </div>
    </section>
  )
}

export default DestinasiUnggulan

// 'use client'
// import { NextPage } from 'next'
// import CustomCard from '@/components/ui/card/CustomCard'
// import useRecommend from '@/hooks/useRecommend'
// import { useRouter } from 'next/navigation'
// import React from 'react'

// interface Props {}

// const Recommendation: NextPage<Props> = () => {
//   const router = useRouter()

//   const handleCardClick = (id: string) => {
//     router.push(`/destinations/${id}`)
//   }

//   const handleKeyPress = (
//     event: React.KeyboardEvent<HTMLDivElement>,
//     id: string
//   ) => {
//     if (event.key === 'Enter') {
//       handleCardClick(id)
//     }
//   }

//   const { destinations } = useRecommend()
//   return (
//     <>
//       <div className='container pt-20'>
//         <h1 className='py-12 text-center text-4xl font-medium'>
//           What We Reccomends <br /> For You
//         </h1>
//         <div className='grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
//           {destinations
//             .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
//             .filter(item => parseFloat(item.rating) > 4.5)
//             .slice(0, 12)
//             .map(item => (
//               <CustomCard
//                 key={item.id}
//                 title={item.name}
//                 img={item.imageLink}
//                 rating={parseFloat(item.rating)}
//                 location={item.regency}
//                 description={`${item.information.slice(0, 85)}...`}
//                 isSaveAvailable={false}
//                 clickToDetail={() => handleCardClick(item.id)}
//                 onKeyPress={e => handleKeyPress(e, item.id)}
//               />
//             ))}
//         </div>
//       </div>
//     </>
//   )
// }

// export default Recommendation
