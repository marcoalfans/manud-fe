import type React from 'react'
import type { Metadata } from 'next'
import Sidebar from '@/components/sidebar'

export const metadata: Metadata = {
  title: 'CMS',
  description: 'Manud Jaya CMS'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex min-h-dvh'>
      <Sidebar />
      <main className='flex-1 p-4 md:p-6'>{children}</main>
    </div>
  )
}
