import CardsGridSkeleton from '@/components/ui/skeleton/CardsGridSkeleton'

export default function LoadingWisata() {
  // Kalau biasanya list destinasi ada sekitar 8–12 item
  // tinggal sesuaikan jumlah skeleton-nya
  return <CardsGridSkeleton items={12} withHeader />
}
