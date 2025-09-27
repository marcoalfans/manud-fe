/* eslint-disable no-undef */
'use client'

import React, { useState, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent
} from 'framer-motion'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavLink = {
  name: string
  link: string
  icon?: JSX.Element
  sub?: { name: string; link: string }[]
}

export const FloatingNav = ({
  navItems,
  className
}: {
  navItems: NavLink[]
  className?: string
}) => {
  const { scrollYProgress } = useScroll()
  const [visible, setVisible] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const pathname = usePathname()

  // prefix anchor ke /landing jika sedang di halaman selain /landing
  const normalizeHref = (href: string) => {
    if (!href?.startsWith('#')) return href
    return pathname === '/landing' ? href : `/landing${href}`
  }

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', current => {
    if (typeof current !== 'number') return
    const direction = current - (scrollYProgress.getPrevious() ?? 0)
    if (scrollYProgress.get() < 0.05) setVisible(false)
    else setVisible(direction < 0) // scroll up -> show
  })

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'fixed inset-x-0 top-10 z-[5000] mx-auto flex max-w-fit items-center justify-center space-x-2 rounded-full border border-transparent bg-white/90 py-2 pl-4 pr-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] backdrop-blur dark:border-white/20 dark:bg-black/80',
          className
        )}
      >
        {/* Links */}
        <ul className='flex items-center gap-1'>
          {navItems.map((item, idx) => {
            const hasSub = !!item.sub?.length
            return (
              <li key={item.name} className='relative'>
                {!hasSub ? (
                  <Link
                    href={normalizeHref(item.link)}
                    className='inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-50 dark:hover:bg-white/10'
                  >
                    <span className='hidden sm:inline'>{item.name}</span>
                    <span className='sm:hidden'>{item.icon}</span>
                  </Link>
                ) : (
                  <div
                    className='group relative'
                    onMouseEnter={() => setOpenIdx(idx)}
                    onMouseLeave={() => setOpenIdx(null)}
                  >
                    <button
                      onClick={() => setOpenIdx(p => (p === idx ? null : idx))}
                      className='inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-50 dark:hover:bg-white/10'
                      aria-expanded={openIdx === idx}
                    >
                      <span className='hidden sm:inline'>{item.name}</span>
                      <span className='sm:hidden'>{item.icon}</span>
                      <svg
                        className={cn(
                          'h-3.5 w-3.5 transition-transform',
                          openIdx === idx && 'rotate-180'
                        )}
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </button>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {openIdx === idx && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.15 }}
                          className='absolute left-0 top-full mt-2 w-56 rounded-xl border border-black/10 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-black'
                        >
                          {item.sub!.map(sub => (
                            <Link
                              key={sub.name}
                              href={normalizeHref(sub.link)}
                              className='block rounded-lg px-3 py-2 text-sm text-neutral-800 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-white/10'
                              onClick={() => setOpenIdx(null)}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </li>
            )
          })}
        </ul>

        {/* Right button */}
        <Link href={token ? '/dashboard' : '/login'}>
          <button className='relative rounded-full border border-neutral-200 px-4 py-1.5 text-sm font-medium text-black dark:border-white/20 dark:text-white'>
            <span>{token ? 'Dashboard' : 'Login'}</span>
            <span className='absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent' />
          </button>
        </Link>
      </motion.div>
    </AnimatePresence>
  )
}

// /* eslint-disable no-undef */
// 'use client'
// import React, { useState, useEffect } from 'react'
// import {
//   motion,
//   AnimatePresence,
//   useScroll,
//   useMotionValueEvent
// } from 'framer-motion'
// import { cn } from '@/lib/utils'
// import Link from 'next/link'

// export const FloatingNav = ({
//   navItems,
//   className
// }: {
//   navItems: {
//     name: string
//     link: string
//     icon?: JSX.Element
//   }[]
//   className?: string
// }) => {
//   const { scrollYProgress } = useScroll()

//   const [visible, setVisible] = useState(false)
//   const [token, setToken] = useState<string | null>(null)

//   useEffect(() => {
//     setToken(localStorage.getItem('token'))
//   }, [])

//   useMotionValueEvent(scrollYProgress, 'change', current => {
//     // Check if current is not undefined and is a number
//     if (typeof current === 'number') {
//       const direction = current! - scrollYProgress.getPrevious()!

//       if (scrollYProgress.get() < 0.05) {
//         setVisible(false)
//       } else {
//         if (direction < 0) {
//           setVisible(true)
//         } else {
//           setVisible(false)
//         }
//       }
//     }
//   })

//   return (
//     <AnimatePresence mode='wait'>
//       <motion.div
//         initial={{
//           opacity: 1,
//           y: -100
//         }}
//         animate={{
//           y: visible ? 0 : -100,
//           opacity: visible ? 1 : 0
//         }}
//         transition={{
//           duration: 0.2
//         }}
//         className={cn(
//           'fixed inset-x-0 top-10 z-[5000] mx-auto flex max-w-fit items-center justify-center space-x-4 rounded-full border border-transparent bg-white py-2 pl-8 pr-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-white/[0.2] dark:bg-black',
//           className
//         )}
//       >
//         {navItems.map((navItem: any, idx: number) => (
//           <Link
//             key={`link=${idx}`}
//             href={navItem.link}
//             className={cn(
//               'relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300'
//             )}
//           >
//             <span className='block sm:hidden'>{navItem.icon}</span>
//             <span className='hidden text-sm sm:block'>{navItem.name}</span>
//           </Link>
//         ))}
//         {token ? (
//           <Link href='/dashboard'>
//             <button className='relative rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-black dark:border-white/[0.2] dark:text-white'>
//               <span>Dashboard</span>
//               <span className='absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent' />
//             </button>
//           </Link>
//         ) : (
//           <Link href='/login'>
//             <button className='relative rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-black dark:border-white/[0.2] dark:text-white'>
//               <span>Login</span>
//               <span className='absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent' />
//             </button>
//           </Link>
//         )}
//       </motion.div>
//     </AnimatePresence>
//   )
// }
