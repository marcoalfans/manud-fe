// data/card-grid.tsx
export const cardGrids = [
  {
    id: 1,
    title: 'Suasana Desa',
    description: 'Kehidupan desa yang asri dan harmonis.',
    thumbnail: '/assets/images/landscape/image-2-landscape.webp',
    className: 'md:col-span-2',
    content: (
      <div className='p-4 text-white'>
        <h3 className='text-lg font-semibold'>Suasana Desa</h3>
        <p className='text-xs opacity-80'>
          Kehidupan desa yang asri dan harmonis.
        </p>
      </div>
    )
  },
  {
    id: 2,
    title: 'Produk UMKM',
    description: 'Kerajinan tangan dan kuliner khas Desa Manud Jaya.',
    thumbnail: '/assets/images/potrait/image-7-potrait.webp',
    className: 'col-span-1',
    content: (
      <div className='p-4 text-white'>
        <h3 className='text-lg font-semibold'>Produk UMKM</h3>
        <p className='text-xs opacity-80'>Kerajinan & kuliner khas desa.</p>
      </div>
    )
  },
  {
    id: 3,
    title: 'Wisata Alam',
    description: 'Destinasi wisata alam dan budaya desa.',
    thumbnail: '/assets/images/landscape/image-4-landscape.webp',
    className: 'col-span-1',
    content: (
      <div className='p-4 text-white'>
        <h3 className='text-lg font-semibold'>Wisata Alam</h3>
        <p className='text-xs opacity-80'>Alam & budaya Desa Manud Jaya.</p>
      </div>
    )
  },
  {
    id: 4,
    title: 'Budaya Lokal',
    description: 'Tradisi dan kesenian khas masyarakat Desa Manud Jaya.',
    thumbnail: '/assets/images/balinese-dance.webp',
    className: 'col-span-1',
    content: (
      <div className='p-4 text-white'>
        <h3 className='text-lg font-semibold'>Budaya Lokal</h3>
        <p className='text-xs opacity-80'>Tradisi & kesenian desa.</p>
      </div>
    )
  },

  {
    id: 5,
    title: 'Infrastruktur Desa',
    description:
      'Fasilitas umum, jalan, dan sarana desa yang mendukung kehidupan warga.',
    thumbnail: '/assets/images/potrait/image-13-potrait.webp',
    className: 'col-span-1',
    content: (
      <div className='p-4 text-white'>
        <h3 className='text-lg font-semibold'>Infrastruktur Desa</h3>
        <p className='text-xs opacity-80'>
          Fasilitas umum, jalanan dan sarana Desa Manud Jaya.
        </p>
      </div>
    )
  }
]

// import {
//   SkeletonFive,
//   SkeletonFour,
//   SkeletonOne,
//   SkeletonSix,
//   SkeletonThree,
//   SkeletonTwo
// } from '@/components/ui/skeleton/SkeletonCard'

// export const cardGrids = [
//   {
//     id: 1,
//     content: <SkeletonOne />,
//     className: 'md:col-span-2',
//     thumbnail:
//       'https://ik.imagekit.io/rom/melancong/landscape/image-4-landscape.webp?updatedAt=1721609670404'
//   },
//   {
//     id: 2,
//     content: <SkeletonTwo />,
//     className: 'col-span-1',
//     thumbnail:
//       'https://ik.imagekit.io/rom/melancong/landscape/image-5-landscape.webp?updatedAt=1721609670657'
//   },
//   {
//     id: 3,
//     content: <SkeletonThree />,
//     className: 'col-span-1',
//     thumbnail:
//       'https://ik.imagekit.io/rom/melancong/potrait/image-7-potrait.webp?updatedAt=1721609671849'
//   },
//   {
//     id: 4,
//     content: <SkeletonFour />,
//     className: 'md:col-span-2',
//     thumbnail:
//       'https://ik.imagekit.io/rom/melancong/landscape/image-10-landscape.webp?updatedAt=1721609668000'
//   },
//   {
//     id: 5,
//     content: <SkeletonFive />,
//     className: 'md:col-span-2',
//     thumbnail:
//       'https://ik.imagekit.io/rom/melancong/potrait/image-9-potrait.webp?updatedAt=1721609671961'
//   },
//   {
//     id: 6,
//     content: <SkeletonSix />,
//     className: 'md:col-span-1',
//     thumbnail:
//       'https://ik.imagekit.io/rom/melancong/potrait/image-13-potrait.webp?updatedAt=1721609671477'
//   }
// ]
