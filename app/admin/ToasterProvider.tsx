'use client'

import { Toaster } from '@/components/ui/sonner'
import React from 'react'

const ToasterProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}

export default ToasterProvider
