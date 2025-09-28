// data/landing-link.ts
import {
  IconHome,
  IconInfoCircle,
  IconSparkles,
  IconMapPin,
  IconShoppingBag,
  IconPlant2
} from '@tabler/icons-react'

export const landingLinks = [
  { name: 'Beranda', link: '#hero', icon: <IconHome /> },
  { name: 'Profil', link: '#profil', icon: <IconInfoCircle /> },
  {
    name: 'Potensi',
    link: '#potensi',
    icon: <IconSparkles />,
    sub: [
      { name: 'UMKM', link: '/umkm', icon: <IconShoppingBag /> }, // ← diarahkan ke page UMKM
      { name: 'Pertanian', link: '#potensi-pertanian', icon: <IconPlant2 /> },
      { name: 'Wisata', link: '/wisata', icon: <IconMapPin /> } // ke modul /wisata
    ]
  }
]

// import {
//   IconHeadset,
//   IconHome,
//   IconStars,
//   IconUsersGroup
// } from '@tabler/icons-react'

// export const landingLinks = [
//   { name: 'Home', link: '/', icon: <IconHome /> },
//   { name: 'Recommendation', link: '#recommendation', icon: <IconStars /> },
//   { name: 'About', link: '#about', icon: <IconUsersGroup /> },
//   { name: 'Services', link: '#services', icon: <IconHeadset /> }
// ]
