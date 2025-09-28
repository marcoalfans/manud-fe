// app/(route)/landing/page.tsx
import { FloatingNav } from '@/components/ui/navigation/FloatingNav'
import type { Metadata, NextPage } from 'next'
import { landingLinks } from '@/data/landing-link'
import About from '@/app/(route)/landing/_partials/about/page'
import HeroBanner from '@/app/(route)/landing/_partials/hero-banner/page'
import Recommendation from '@/app/(route)/landing/_partials/recomendation/page'
import OurService from '@/app/(route)/landing/_partials/our-services/page'
import Footer from '@/components/ui/footer/Footer'

export const metadata: Metadata = {
  title: 'Portal Digital Desa Manud Jaya',
  description:
    'Landing page resmi: profil/visi, potensi (UMKM, pertanian, wisata), dan informasi awal portal.'
}

const LandingPage: NextPage = () => {
  return (
    <>
      {/* navbar start */}
      <header>
        <FloatingNav navItems={landingLinks} />
      </header>
      {/* navbar end */}

      {/* Hero Banner */}
      <section id='hero'>
        <HeroBanner />
      </section>

      {/* Profil / Visi */}
      <section id='profil'>
        <About />
      </section>

      {/* Potensi (pakai OurService sebagai potensi untuk tahap slicing) */}
      <section id='potensi'>
        <OurService />
      </section>

      {/* Opsional: Rekomendasi (boleh dipertahankan untuk konten statik tambahan) */}
      <section id='rekomendasi'>
        <Recommendation />
      </section>

      {/* Footer */}
      <section>
        <Footer />
      </section>
    </>
  )
}

export default LandingPage

// import { FloatingNav } from '@/components/ui/navigation/FloatingNav'
// import { Metadata, NextPage } from 'next'
// import { landingLinks } from '@/data/landing-link'
// import About from '@/app/(route)/landing/_partials/about/page'
// import HeroBanner from '@/app/(route)/landing/_partials/hero-banner/page'
// import Recommendation from '@/app/(route)/landing/_partials/recomendation/page'
// import OurService from '@/app/(route)/landing/_partials/our-services/page'
// import Footer from '@/components/ui/footer/Footer'

// interface Props {}

// export const metadata: Metadata = {
//   title: 'Landing'
// }

// const LandingPage: NextPage<Props> = () => {
//   return (
//     <>
//       {/* navbar start */}
//       <header>
//         <FloatingNav navItems={landingLinks} />
//       </header>
//       {/* navbar end */}

//       {/* Hero Banner section start */}
//       <section>
//         <HeroBanner />
//       </section>
//       {/* Hero Banner section end */}

//       {/* Recommendation section start */}
//       <section id='recommendation'>
//         <Recommendation />
//       </section>
//       {/* Recommendation section end */}

//       {/* about section start */}
//       <section id='about'>
//         <About />
//       </section>
//       {/* about section end */}

//       {/* service section start */}
//       <section id='services'>
//         <OurService />
//       </section>
//       {/* service section end */}

//       {/* footer start */}
//       <section>
//         <Footer />
//       </section>
//       {/* footer end */}
//     </>
//   )
// }

// export default LandingPage
