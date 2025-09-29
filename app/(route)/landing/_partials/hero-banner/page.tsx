'use client'

import { NextPage } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { ImagesSlider } from '@/components/ui/hero/ImageSlider'
import { FlipWords } from '@/components/ui/text/FlipWord'
import { heroImageSliderImages } from '@/data/index'

const HERO_WORDS = ['UMKM', 'Wisata']

const HeroBanner: NextPage = () => {
  return (
    <section id='hero' aria-label='Hero' className='relative'>
      <ImagesSlider
        className='h-[38rem] md:h-[50rem]'
        images={heroImageSliderImages}
      >
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className='z-50 flex max-w-3xl flex-col items-start justify-start'
        >
          <motion.p
            className='text-left text-sm font-medium tracking-wide text-neutral-300'
            aria-label='judul situs'
          >
            Portal Digital Desa Manud Jaya
          </motion.p>

          <motion.h1 className='bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text py-4 text-left text-3xl font-extrabold text-transparent md:text-5xl'>
            Kenali{' '}
            <span className='whitespace-nowrap'>
              <FlipWords words={HERO_WORDS} />
            </span>{' '}
            Desa Kami
          </motion.h1>

          <motion.p className='max-w-prose text-left text-base text-neutral-200/90 md:text-lg'>
            Semua informasi inti dalam satu tempat: profil & visi desa, potensi
            ekonomi, hingga rencana modul wisata dan UMKM. Cepat, informatif,
            dan mobile-friendly.
          </motion.p>

          <div className='mt-8 flex flex-wrap gap-3'>
            <Link
              href='/landing#profil'
              className='inline-flex items-center rounded-xl border border-neutral-200/60 px-5 py-3 text-sm font-medium text-neutral-100 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10'
            >
              Lihat Profil Desa
            </Link>
            <Link
              href='/landing#potensi'
              className='inline-flex items-center rounded-xl bg-white/90 px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:-translate-y-0.5 hover:bg-white'
            >
              Jelajahi Potensi
            </Link>
          </div>
        </motion.div>
      </ImagesSlider>
    </section>
  )
}

export default HeroBanner

// 'use client'
// import { NextPage } from 'next'
// import { ImagesSlider } from '@/components/ui/hero/ImageSlider'
// import { motion } from 'framer-motion'
// import { FlipWords } from '@/components/ui/text/FlipWord'
// import { heroImageSliderImages, words } from '@/data/index'
// import Link from 'next/link'
// interface Props {}

// const HeroBanner: NextPage<Props> = () => {
//   return (
//     <>
//       <ImagesSlider className='h-[50rem]' images={heroImageSliderImages}>
//         <motion.div
//           initial={{
//             opacity: 0,
//             y: -80
//           }}
//           animate={{
//             opacity: 1,
//             y: 0
//           }}
//           transition={{
//             duration: 1
//           }}
//           className='z-50 flex flex-col items-start justify-start'
//         >
//           <motion.p className='text-left text-lg font-medium text-neutral-400'>
//             Welcome to Melancong
//           </motion.p>
//           <motion.div className='bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text py-4 text-left text-xl font-bold text-transparent md:text-5xl'>
//             Let&apos;s <FlipWords words={words} /> <br /> Great Destination With
//             Us
//           </motion.div>
//           <button className='mt-4 transform rounded-lg border border-neutral-200 bg-transparent px-8 py-2 font-bold text-neutral-200 transition duration-400 will-change-transform hover:-translate-y-1 dark:border-white dark:text-white'>
//             <Link href='/landing#services' className='block p-4 tracking-wider'>
//               What we offer?
//             </Link>
//           </button>
//         </motion.div>
//       </ImagesSlider>
//     </>
//   )
// }

// export default HeroBanner
