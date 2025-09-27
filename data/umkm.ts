// data/umkm.ts
export type Umkm = {
  id: string
  name: string
  image: string
  description: string
  category: 'Kuliner' | 'Kerajinan' | 'Pertanian' | 'Lainnya'
  marketplaceUrl?: string
  whatsapp?: string // format internasional tanpa +
  location?: string
}

export const umkmData: Umkm[] = [
  {
    id: 'u-1',
    name: 'Kopi Manud Jaya',
    image: '/assets/images/umkm/kopi.jpeg',
    description:
      'Biji kopi robusta pilihan, disangrai tradisional. Tersedia bubuk & biji.',
    category: 'Pertanian',
    marketplaceUrl: 'https://tokopedia.com',
    whatsapp: '6281234567890',
    location: 'Dusun A'
  },
  {
    id: 'u-2',
    name: 'Kerajinan Anyaman',
    image: '/assets/images/umkm/kerajinan-anyaman.webp',
    description: 'Tas & wadah anyaman bambu buatan tangan, kuat & estetik.',
    category: 'Kerajinan',
    marketplaceUrl: 'https://shopee.co.id',
    whatsapp: '6281312345678',
    location: 'Dusun B'
  },
  {
    id: 'u-3',
    name: 'Kue Kering Bu Sari',
    image: '/assets/images/umkm/kue-kering.avif',
    description: 'Aneka kue kering rumahan (nastar, kastengel, putri salju).',
    category: 'Kuliner',
    marketplaceUrl: 'https://blibli.com',
    whatsapp: '6285211122233',
    location: 'Dusun C'
  },
  {
    id: 'u-4',
    name: 'Pupuk Organik Kompos',
    image: '/assets/images/umkm/pupuk-organik.jpeg',
    description:
      'Kompos organik dari bank sampah desa, cocok untuk kebun & tanaman hias.',
    category: 'Pertanian',
    marketplaceUrl: undefined,
    whatsapp: '628577889900',
    location: 'Dusun D'
  },
  {
    id: 'u-5',
    name: 'Minyak Kelapa Tradisional',
    image: '/assets/images/umkm/minyak-kelapa.jpg',
    description:
      'Minyak kelapa murni hasil olahan tradisional desa, aromatik & sehat.',
    category: 'Kuliner',
    marketplaceUrl: 'https://tokopedia.com/minyak-kelapa',
    whatsapp: '6281234567894',
    location: 'Dusun E'
  },
  {
    id: 'u-6',
    name: 'Batik Desa Manud',
    image: '/assets/images/umkm/batik-desa.jpeg',
    description: 'Batik tulis motif alam pedesaan dengan pewarna alami.',
    category: 'Kerajinan',
    marketplaceUrl: 'https://tokopedia.com/batik-manud',
    whatsapp: '6281234567895',
    location: 'Dusun F'
  },
  {
    id: 'u-7',
    name: 'Snack Pisang Renyah',
    image: '/assets/images/umkm/snack-pisang.jpg',
    description: 'Keripik pisang aneka rasa: manis, asin, pedas balado.',
    category: 'Kuliner',
    marketplaceUrl: 'https://tokopedia.com/snack-pisang',
    whatsapp: '6281234567896',
    location: 'Dusun G'
  },
  {
    id: 'u-8',
    name: 'Madu Hutan Desa',
    image: '/assets/images/umkm/madu-hutan.jpg',
    description: 'Madu hutan murni hasil panen dari hutan sekitar desa.',
    category: 'Pertanian',
    marketplaceUrl: 'https://tokopedia.com/madu-hutan',
    whatsapp: '6281234567897',
    location: 'Dusun H'
  },
  {
    id: 'u-9',
    name: 'Tenun Lurik Manud',
    image: '/assets/images/umkm/tenun-lurik.jpg',
    description: 'Kain lurik hasil tenunan tangan dengan motif klasik.',
    category: 'Kerajinan',
    marketplaceUrl: 'https://tokopedia.com/tenun-lurik',
    whatsapp: '6281234567898',
    location: 'Dusun I'
  },
  {
    id: 'u-10',
    name: 'Sambal Botolan Bu Tini',
    image: '/assets/images/umkm/sambal-botol.jpeg',
    description: 'Sambal botolan resep turun-temurun, pedas nikmat.',
    category: 'Kuliner',
    marketplaceUrl: 'https://tokopedia.com/sambal-tini',
    whatsapp: '6281234567899',
    location: 'Dusun J'
  },
  {
    id: 'u-11',
    name: 'Sayur Organik Segar',
    image: '/assets/images/umkm/sayur-organik.webp',
    description: 'Sayuran organik langsung dari kebun desa tanpa pestisida.',
    category: 'Pertanian',
    marketplaceUrl: 'https://tokopedia.com/sayur-organik',
    whatsapp: '6281234567800',
    location: 'Dusun K'
  },
  {
    id: 'u-12',
    name: 'Keripik Singkong Gurih',
    image: '/assets/images/umkm/keripik-singkong.jpeg',
    description: 'Keripik singkong gurih & renyah dengan bumbu khas desa.',
    category: 'Kuliner',
    marketplaceUrl: 'https://tokopedia.com/keripik-singkong',
    whatsapp: '6281234567801',
    location: 'Dusun L'
  }
]
