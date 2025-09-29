// app/(route)/layout.tsx
'use client'

import React, { useState } from 'react'
import Navbar from '@/components/ui/navigation/Navbar'
import { FloatingNav } from '@/components/ui/navigation/FloatingNav'
import { landingLinks } from '@/data/landing-link'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { Toaster } from '@/components/ui/toaster'

export default function RouteLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { scrollYProgress } = useScroll()
  const [atTop, setAtTop] = useState(true)

  useMotionValueEvent(scrollYProgress, 'change', () => {
    setAtTop(scrollYProgress.get() < 0.05)
  })

  return (
    <>
      {atTop && <Navbar />}
      <FloatingNav navItems={landingLinks} />
      {children}
      <Toaster />
    </>
  )
}
