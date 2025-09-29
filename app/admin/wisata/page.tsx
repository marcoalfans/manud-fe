'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Plus, Trash2, ImageIcon, Search } from 'lucide-react'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useRecommend, { Destination } from '@/hooks/useRecommend'
import CreatedAtDisplay from '@/utils/firestoreTimestampToDate'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import usePostDestination from '@/hooks/destinations/usePostDestination'
import { toast } from '@/hooks/use-toast'
import useDeleteDestinationById from '@/hooks/destinations/useDeleteDestinationById'

const categories = [
  'Pantai',
  'Gunung',
  'Budaya',
  'Air Terjun',
  'Danau'
] as const

const idrCurrency = z.string().regex(
  /^Rp\s?\d{1,3}(?:[.,]\d{3})*(?:,\d+)?$/,
  // eslint-disable-next-line quotes
  "Gunakan format Rupiah, mis. 'Rp30.000' atau 'Rp30,000'"
)

// Kalau ingin mengekstrak angka murni dari string "Rp30,000" → 30000
// const parseIDRToNumber = (v: string) =>
//   Number(v.replace(/[^\d]/g, '') || '0')

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  regency: z.string().min(2, 'Regency is required'),
  category: z.enum(categories), // asumsi 'categories' sudah kamu definisikan
  rating: z.coerce.number().min(0, 'Min 0').max(5, 'Max 5'),
  location: z.string(),
  childEntry: idrCurrency,
  adultsEntry: idrCurrency,
  imageLink: z.string(),
  information: z.string().min(10, 'Information is required')
})

type FormValues = z.infer<typeof schema>

type SortKey = 'name' | 'createdAt'
type SortDir = 'asc' | 'desc'

function usePagedSortedFiltered(
  items: Destination[],
  q: string,
  sortKey: SortKey,
  sortDir: SortDir,
  page: number,
  pageSize: number
) {
  const filtered = items.filter(i => {
    const matchesQ = i.name.toLowerCase().includes(q.toLowerCase())
    // const matchesCat = cat === 'All' || i.rating === cat
    return matchesQ
  })
  const sorted = [...filtered].sort((a, b) => {
    let v = 0
    if (sortKey === 'name') {
      v = a.name.localeCompare(b.name)
    }
    // if (sortKey === 'createdAt') {
    //   v = new Date(a.).getTime() - new Date(b.createdAt).getTime()
    // }

    return sortDir === 'asc' ? v : -v
  })
  const start = page * pageSize
  const end = start + pageSize
  const pageItems = sorted.slice(start, end)
  return { pageItems, total: sorted.length }
}

export default function WisataPage() {
  const { destinations, fetchRecommendation } = useRecommend()
  const { fetchPostDestination } = usePostDestination()
  const { fetchDeleteDestinationById } = useDeleteDestinationById()

  const [searchQ, setSearchQ] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('createdAt')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [page, setPage] = useState(0)
  const pageSize = 5

  const { pageItems, total } = usePagedSortedFiltered(
    destinations,
    searchQ,
    sortKey,
    sortDir,
    page,
    pageSize
  )

  const pages = Math.max(1, Math.ceil(total / pageSize))

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  async function addItem(values: FormValues) {
    try {
      await fetchPostDestination(values)
      await fetchRecommendation()
      toast({
        description: 'Berhasil menambahkan destinasi!'
      })
      setPage(0)
    } catch (error) {
      toast({
        description: 'error Add Destination!'
      })
    }
  }

  async function deleteItem(id: number) {
    try {
      await fetchDeleteDestinationById(id)
      await fetchRecommendation()
      toast({
        description: 'Berhasil menghapus destinasi!'
      })
    } catch (error) {
      toast({
        description: 'error Delete Destination!'
      })
    }
  }

  return (
    <div className='flex flex-col gap-6'>
      <header className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-semibold'>Wisata</h1>
          <p className='text-muted-foreground text-sm'>
            Manage tourism entries
          </p>
        </div>
        <AddDialog onAdd={addItem} />
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Browse</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
            <div className='flex items-center gap-2'>
              <div className='relative w-64'>
                <Search className='text-muted-foreground pointer-events-none absolute left-2 top-2.5 size-4' />
                <Input
                  placeholder='Search by name...'
                  value={searchQ}
                  onChange={e => {
                    setSearchQ(e.target.value)
                    setPage(0)
                  }}
                  className='pl-8'
                />
              </div>
            </div>
            <div className='text-muted-foreground text-sm'>
              {total} total items • Page {page + 1} / {pages}
            </div>
          </div>

          <div className='w-full overflow-x-auto rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Photo</TableHead>
                  <TableHead
                    className='cursor-pointer select-none'
                    onClick={() => toggleSort('name')}
                  >
                    Name{' '}
                    {sortKey === 'name' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                  </TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead
                  // onClick={() => toggleSort('createdAt')}
                  >
                    Created
                    {/* {sortKey === 'createdAt'
                      ? sortDir === 'asc'
                        ? '▲'
                        : '▼'
                      : ''} */}
                  </TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageItems.map(it => (
                  <TableRow key={it.id}>
                    <TableCell>
                      <ImageDialog thumbSrc={it.imageLink} alt={it.name} />
                    </TableCell>
                    <TableCell className='font-medium'>{it.name}</TableCell>
                    <TableCell>
                      <Badge variant='secondary'>{it.rating}</Badge>
                    </TableCell>
                    <TableCell className='text-muted-foreground'>
                      <a href={it.location} target='_blank' rel='noreferrer'>
                        {it.regency}
                      </a>
                    </TableCell>
                    <TableCell className='text-muted-foreground'>
                      {CreatedAtDisplay(it.createdAt)}
                    </TableCell>
                    <TableCell className='text-right'>
                      <DeleteButton onConfirm={() => deleteItem(it.id)} />
                    </TableCell>
                  </TableRow>
                ))}
                {pageItems.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className='text-muted-foreground text-center text-sm'
                    >
                      No items found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className='flex items-center justify-between'>
            <div className='text-muted-foreground text-sm'>
              Showing {pageItems.length} of {total}
            </div>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                disabled={page === 0}
                onClick={() => setPage(p => Math.max(0, p - 1))}
              >
                Previous
              </Button>
              <Button
                variant='outline'
                disabled={page + 1 >= pages}
                onClick={() => setPage(p => Math.min(pages - 1, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AddDialog({ onAdd }: { onAdd: (v: FormValues) => void }) {
  const [open, setOpen] = useState(false)
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      regency: '',
      category: categories[0],
      rating: 0,
      location: '',
      childEntry: 'Rp0',
      adultsEntry: 'Rp0',
      imageLink: '',
      information: ''
    }
  })

  function submit(values: FormValues) {
    onAdd(values)
    setOpen(false)
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='gap-2'>
          <Plus className='size-4' /> Add Wisata
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Add Wisata</DialogTitle>
          <DialogDescription>
            Fill out the form to add a new tourism entry.
          </DialogDescription>
        </DialogHeader>
        <form className='grid gap-4' onSubmit={handleSubmit(submit)}>
          {/* Name */}
          <div className='grid gap-2'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              placeholder='e.g., Tanah Lot'
              {...register('name')}
            />
            {errors.name && (
              <p className='text-destructive text-sm'>{errors.name.message}</p>
            )}
          </div>

          {/* Regency */}
          <div className='grid gap-2'>
            <Label htmlFor='regency'>Regency</Label>
            <Input
              id='regency'
              placeholder='e.g., Tabanan'
              {...register('regency')}
            />
            {errors.regency && (
              <p className='text-destructive text-sm'>
                {errors.regency.message}
              </p>
            )}
          </div>

          {/* Category (Controller karena komponen non-native) */}
          <div className='grid gap-2'>
            <Label htmlFor='category'>Category</Label>
            <Controller
              control={control}
              name='category'
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id='category'>
                    <SelectValue placeholder='Pilih kategori' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(c => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className='text-destructive text-sm'>
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Rating */}
          <div className='grid gap-2'>
            <Label htmlFor='rating'>Rating</Label>
            <Input
              id='rating'
              type='number'
              step='0.1'
              min={0}
              max={5}
              placeholder='e.g., 4.6'
              {...register('rating', { valueAsNumber: true })}
            />
            {errors.rating && (
              <p className='text-destructive text-sm'>
                {errors.rating.message}
              </p>
            )}
          </div>

          {/* Location */}
          <div className='grid gap-2'>
            <Label htmlFor='location'>Location (Maps URL)</Label>
            <Input
              id='location'
              placeholder='https://maps.google.com/...'
              {...register('location')}
            />
            {errors.location && (
              <p className='text-destructive text-sm'>
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Child Entry */}
          <div className='grid gap-2'>
            <Label htmlFor='childEntry'>Child Entry (Rp)</Label>
            <Input
              id='childEntry'
              placeholder='Rp30.000 atau Rp30,000'
              {...register('childEntry')}
            />
            {errors.childEntry && (
              <p className='text-destructive text-sm'>
                {errors.childEntry.message}
              </p>
            )}
          </div>

          {/* Adults Entry */}
          <div className='grid gap-2'>
            <Label htmlFor='adultsEntry'>Adults Entry (Rp)</Label>
            <Input
              id='adultsEntry'
              placeholder='Rp60.000 atau Rp60,000'
              {...register('adultsEntry')}
            />
            {errors.adultsEntry && (
              <p className='text-destructive text-sm'>
                {errors.adultsEntry.message}
              </p>
            )}
          </div>

          {/* Image Link */}
          <div className='grid gap-2'>
            <Label htmlFor='imageLink'>Photo URL</Label>
            <Input
              id='imageLink'
              placeholder='https://example.com/photo.jpg'
              {...register('imageLink')}
            />
            {errors.imageLink && (
              <p className='text-destructive text-sm'>
                {errors.imageLink.message}
              </p>
            )}
          </div>

          {/* Information */}
          <div className='grid gap-2'>
            <Label htmlFor='information'>Information</Label>
            <Textarea
              id='information'
              rows={6}
              placeholder='Deskripsi tempat (min. 10 karakter)…'
              {...register('information')}
            />
            {errors.information && (
              <p className='text-destructive text-sm'>
                {errors.information.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type='submit'>Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function DeleteButton({ onConfirm }: { onConfirm: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='ghost' size='icon' className='text-destructive'>
          <Trash2 className='size-4' />
          <span className='sr-only'>Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this item?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The item will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            onClick={onConfirm}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function ImageDialog({ thumbSrc, alt }: { thumbSrc: string; alt: string }) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className='ring-border group relative block size-12 overflow-hidden rounded-md ring-1'>
          <Image
            src={thumbSrc || '/placeholder.svg'}
            alt={alt}
            width={48}
            height={48}
            className='h-full w-full object-cover transition-transform group-hover:scale-105'
          />
          <span className='pointer-events-none absolute inset-0 grid place-items-center bg-black/0 text-white transition group-hover:bg-black/20'>
            <ImageIcon className='size-4 opacity-0 group-hover:opacity-100' />
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className='max-w-3xl'>
        <DialogHeader>
          <DialogTitle>{alt}</DialogTitle>
        </DialogHeader>
        <div className='relative aspect-video w-full overflow-hidden rounded-md'>
          <Image
            src={thumbSrc || '/placeholder.svg'}
            alt={alt}
            fill
            className='object-contain'
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
