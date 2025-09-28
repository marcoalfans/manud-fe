'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import ChatBot from '@/app/(route)/dashboard/chatbot/components/ChatBot'
import { Button } from '../button'

export default function FloatingChatbot({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  // close on Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // eslint-disable-next-line curly
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // close on click outside
  useEffect(() => {
    // eslint-disable-next-line curly
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  return (
    <>
      {/* FAB: tombol bulat di kanan bawah */}
      <Button
        type='button'
        aria-label={open ? 'Tutup chatbot' : 'Buka chatbot'}
        onClick={() => setOpen(!open)}
        className={cn(
          'fixed bottom-5 right-5 z-[5000] flex h-14 w-14 items-center justify-center rounded-full',
          'bg-primary text-primary-foreground shadow-lg transition-all',
          'hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'md:bottom-6 md:right-6',
          className
        )}
      >
        {open ? (
          <X className='h-6 w-6' />
        ) : (
          <MessageCircle className='h-6 w-6' />
        )}
      </Button>

      {/* Panel chatbot */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            ref={panelRef}
            className={cn(
              'fixed bottom-24 right-4 z-[5000] md:right-6',
              'h-[min(70vh,560px)] w-[min(92vw,420px)]', // default
              'md:h-[min(70vh,672px)] md:w-[min(92vw,504px)]' // gede di layar ≥ md
            )}
          >
            <div
              className={cn(
                'flex h-full w-full flex-col overflow-hidden rounded-2xl border',
                'bg-background shadow-[0px_2px_16px_rgba(0,0,0,0.12)]'
              )}
              role='dialog'
              aria-label='Kotak Chatbot'
            >
              {/* Header sederhana */}
              <div className='flex items-center justify-between border-b px-3 py-2'>
                <div className='flex items-center gap-2 text-sm font-medium'>
                  <span className='inline-flex h-7 w-7 items-center justify-center rounded-full border'>
                    <MessageCircle className='h-4 w-4' />
                  </span>
                  Manud Jaya Assistant
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className='hover:bg-muted rounded-md p-1 focus-visible:outline-none focus-visible:ring-2'
                  aria-label='Tutup'
                >
                  <X className='h-4 w-4' />
                </button>
              </div>

              {/* Body: taruh komponen ChatBot kamu */}
              <ChatBot />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
