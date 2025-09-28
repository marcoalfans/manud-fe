'use client'

import React from 'react'
import Image from 'next/image'
import { useChatbot } from '@/hooks/chatbot/useChatbot'
import { cn } from '@/lib/utils'

const ChatBotContent = () => {
  const { prompt, setPrompt, messages, typingText, isTyping, handleSubmit } =
    useChatbot()

  const isLoading = messages.some(message => message.type === 'loading')

  // NEW: ref ke area pesan yang bisa discroll
  const scrollRef = React.useRef<HTMLDivElement>(null)

  // NEW: helper scroll ke bawah
  const scrollToBottom = (smooth = true) => {
    const el = scrollRef.current
    // eslint-disable-next-line curly
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: smooth ? 'smooth' : 'auto' })
  }

  // NEW: auto-scroll saat pertama render
  React.useEffect(() => {
    scrollToBottom(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // NEW: auto-scroll saat isTyping / typingText berubah.
  // - Jika isTyping true -> selalu scroll (agar bubble mengetik selalu terlihat)
  // - Jika isTyping false -> scroll hanya jika user sudah dekat bagian bawah
  React.useEffect(() => {
    const el = scrollRef.current
    // eslint-disable-next-line curly
    if (!el) return

    if (isTyping) {
      // selalu scroll saat sedang mengetik
      // pakai rAF agar eksekusi setelah layout update
      requestAnimationFrame(() => scrollToBottom(true))
    } else {
      const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight
      const isNearBottom = distanceToBottom < 120
      if (isNearBottom) {
        requestAnimationFrame(() => scrollToBottom(true))
      }
    }
  }, [isTyping, typingText, messages.length]) // perhatikan dependencies

  // handler submit khusus Enter
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      ;(e.currentTarget.form as HTMLFormElement | null)?.requestSubmit()
    }
  }

  return (
    <div
      className={cn(
        'mx-auto flex h-[min(75vh,640px)] w-full flex-col overflow-hidden rounded-xl bg-white',
        'md:w-9/12 lg:w-11/12'
      )}
    >
      {/* Header */}
      <div className='shrink-0 border-b p-4 text-center'>
        <Image
          src='https://firebasestorage.googleapis.com/v0/b/melanc0ng.appspot.com/o/image%2Fmaskot-melancong.png?alt=media&token=d1a78151-3b0a-473f-9b2f-c499a62c2e0a'
          alt='Chatbot'
          className='mx-auto mb-2'
          width={64}
          height={64}
          priority
          quality={50}
        />
        <p className='text-sm text-gray-600'>
          Hello! My name is ManudJaja. Manud aja sama bang Jaja!
        </p>
      </div>

      {/* Area pesan: hanya bagian ini yang scroll */}
      <div
        ref={scrollRef} // NEW
        className={cn(
          'min-h-0 flex-1 overflow-y-auto p-4',
          isLoading && 'pr-6'
        )}
      >
        <div className='mx-auto flex max-w-[720px] flex-col gap-2 text-clip'>
          {messages.map((message, index) =>
            message.type === 'user' ? (
              <div
                key={index}
                className='text-md ml-auto max-w-[80%] text-ellipsis rounded-2xl bg-indigo-600 px-3 py-2 text-white shadow'
              >
                {message.text}
              </div>
            ) : message.type === 'bot' ? (
              <div
                key={index}
                className='text-md mr-auto max-w-[80%] text-ellipsis rounded-2xl bg-gray-100 px-3 py-2 text-gray-900 ring-1 ring-gray-200'
              >
                {typingText && index === messages.length - 1
                  ? typingText
                  : message.text}
              </div>
            ) : (
              <div
                key={index}
                className='mr-auto flex max-w-[80%] items-center gap-1 rounded-2xl bg-gray-100 px-3 py-2 text-gray-900 ring-1 ring-gray-200'
              >
                <span className='animate-pulse'>•</span>
                <span className='animate-pulse'>•</span>
                <span className='animate-pulse'>•</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Form: sticky di bawah box, tanpa tombol (Enter untuk kirim) */}
      <form
        onSubmit={handleSubmit}
        className={cn(
          'sticky bottom-0 z-10 w-full border-t bg-white/90 backdrop-blur',
          'px-3 py-2 pb-3'
        )}
      >
        <div className='mx-auto flex max-w-[720px] items-center gap-2'>
          <input
            type='text'
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder='Tulis pesan dan tekan Enter…'
            required
            disabled={isLoading || isTyping}
            className={cn(
              'flex-1 rounded-xl border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900',
              'placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200',
              (isLoading || isTyping) && 'cursor-not-allowed opacity-70'
            )}
            aria-label='Ketik pesan'
          />
          <button type='submit' className='sr-only'>
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatBotContent
