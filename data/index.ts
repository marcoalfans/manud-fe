// data/index.ts

/**
 * Gambar slider untuk Hero.
 * Pakai aset lokal biar stabil & cepat.
 * Letakkan file di /public/assets/images/landscape/
 */
export const heroImageSliderImages: string[] = [
  '/assets/images/landscape/image-2-landscape.webp',
  '/assets/images/landscape/image-3-landscape.webp',
  '/assets/images/landscape/image-4-landscape.webp',
  '/assets/images/landscape/image-5-landscape.webp'
]

/**
 * POTENSI DESA (sesuai PRD): UMKM, Pertanian, Wisata.
 * Dipakai oleh section "Potensi Desa" (eks-Our Services).
 * Komponen HoverEffect biasanya butuh: title, description, link
 */
export const potensi = [
  {
    title: 'UMKM Lokal',
    description:
      'Produk kuliner & kerajinan khas, tahap berikutnya dihubungkan ke marketplace.',
    link: '#'
  },
  {
    title: 'Pertanian',
    description:
      'Komoditas unggulan desa sebagai penopang ekonomi warga dan komunitas.',
    link: '#'
  },
  {
    title: 'Wisata',
    description:
      'Destinasi alam & budaya; rencana booking via WhatsApp pada modul Wisata.',
    link: '#'
  }
]

/**
 * Backward-compat: beberapa file mungkin masih import { services } dari data/index.
 * Biar nggak error, kita alias-kan ke potensi.
 */
export const services = potensi

/**
 * (Opsional) Rekomendasi statik untuk section Recommendation.
 * Kalau belum dipakai, aman dibiarkan / dihapus.
 */
export const recomendations = [
  {
    title: 'Festival Desa',
    description:
      'Agenda budaya bulanan—kuliner, kerajinan, dan pertunjukan seni.',
    link: '#'
  },
  {
    title: 'Produk Unggulan',
    description:
      'Kurasi produk UMKM dengan kualitas ekspor dari warga Desa Manud Jaya.',
    link: '#'
  }
]

// export const heroImageSliderImages = [
//   'https://ik.imagekit.io/rom/melancong/landscape/image-2-landscape.webp?updatedAt=1721609667633',
//   'https://ik.imagekit.io/rom/melancong/landscape/image-8-landscape.webp?updatedAt=1721609671401',
//   'https://ik.imagekit.io/rom/melancong/landscape/image-12-landscape.webp?updatedAt=1721609668098'
// ]

// export const words = ['discover', 'explore', 'find', 'Enjoy']

// export const services = [
//   {
//     title: 'Destination Highlights',
//     description:
//       'Discover the most popular tourist destinations in Manud Jaya, featuring top attractions and must-see spots.',
//     link: '#'
//   },
//   {
//     title: 'Travel Guides',
//     description:
//       'Comprehensive travel guides to help you navigate Bali’s rich culture, beautiful landscapes, and hidden gems.',
//     link: '#'
//   },
//   {
//     title: 'Activity Recommendations',
//     description:
//       'Get personalized activity recommendations, from adventure sports to cultural experiences, tailored to your interests.',
//     link: '#'
//   },
//   {
//     title: 'Dining Suggestions',
//     description:
//       'Explore the culinary delights of Manud Ajawith our curated list of the best restaurants, cafes, and local eateries.',
//     link: '#'
//   },
//   {
//     title: 'Travel Planning Tools',
//     description:
//       'Utilize our suite of planning tools, including itineraries, maps, and budget calculators, to make your Manud Ajatrip seamless and enjoyable.',
//     link: '#'
//   },
//   {
//     title: 'Accommodation Tips',
//     description:
//       'Find the best places to stay, from luxury resorts to budget-friendly accommodations, all with detailed reviews and ratings.',
//     link: '#'
//   }
// ]

// export const destinationLocations = [
//   'Tabanan',
//   'Badung',
//   'Gianyar',
//   'Denpasar',
//   'Karangasem',
//   'Buleleng',
//   'Klungkung',
//   'Bangli',
//   'Jembrana'
// ]

// export const destinationTypes = [
//   'Historical Landmark',
//   'Beach',
//   'Temple',
//   'Wildlife',
//   'Museum',
//   'Garden',
//   'Lake',
//   'Waterfall',
//   'Mountain',
//   'Hot Spring',
//   'Rice Field',
//   'Culture',
//   'Hill',
//   'Countryside'
// ]

// export const inputSearchPlaceholders = [
//   'Searching for destinations?',
//   'Try to search for tanah lot..',
//   'Not sure where to go?',
//   'Try to search for the beach',
//   'Not solved your issue? then try to ask for our chatbot'
// ]
