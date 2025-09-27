// app/(route)/landing/layout.tsx
'use client'

import React, { useState } from 'react'
import Navbar from '@/components/ui/navigation/Navbar'
import { FloatingNav } from '@/components/ui/navigation/FloatingNav'
import { landingLinks } from '@/data/landing-link'
import { useScroll, useMotionValueEvent } from 'framer-motion'

export default function LandingLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { scrollYProgress } = useScroll()
  const [atTop, setAtTop] = useState(true)

  // Navbar tampil hanya saat di paling atas halaman
  useMotionValueEvent(scrollYProgress, 'change', () => {
    setAtTop(scrollYProgress.get() < 0.05)
  })

  return (
    <>
      {atTop && <Navbar />}

      {/* FloatingNav punya logic muncul saat discroll di dalam komponennya */}
      <FloatingNav navItems={landingLinks} />

      {children}
    </>
  )
}
