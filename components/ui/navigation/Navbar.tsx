'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { landingLinks } from '@/data/landing-link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [openSub, setOpenSub] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  const normalizeHref = (href: string) => {
    if (!href?.startsWith('#')) {
      return href
    }
    return pathname === '/landing' ? href : `/landing${href}`
  }

  return (
    <nav className='fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur'>
      <div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-3'>
        {/* Brand */}
        <Link
          href='/landing'
          className='text-base font-semibold tracking-wide text-white'
        >
          Portal Desa Manud Jaya
        </Link>

        {/* Toggle (mobile) */}
        <button
          onClick={() => setOpen(v => !v)}
          className='inline-flex h-10 w-10 items-center justify-center rounded-lg text-white md:hidden'
          aria-label='Toggle navigation'
        >
          <svg width='22' height='22' viewBox='0 0 24 24' fill='none'>
            <path
              d='M4 6h16M4 12h16M4 18h16'
              stroke='currentColor'
              strokeWidth='2'
            />
          </svg>
        </button>

        {/* Desktop menu */}
        <ul className='hidden items-center gap-2 md:flex'>
          {landingLinks.map(item => (
            <li key={item.name} className='relative'>
              {!item.sub ? (
                <Link
                  href={normalizeHref(item.link)}
                  className='inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-white/90 hover:bg-white/10'
                >
                  {item.name}
                </Link>
              ) : (
                <div
                  className='group'
                  onMouseEnter={() => setOpenSub(item.name)}
                  onMouseLeave={() => setOpenSub(null)}
                >
                  <Link
                    href={normalizeHref(item.link)}
                    className='inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-white/90 hover:bg-white/10'
                  >
                    {item.name}
                    <svg
                      className='ml-1 h-3.5 w-3.5 opacity-80'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </Link>

                  {/* Dropdown (desktop) */}
                  <div className='invisible absolute left-0 mt-2 w-56 rounded-xl border border-white/10 bg-black/80 p-2 opacity-0 shadow-xl backdrop-blur transition-all duration-150 group-hover:visible group-hover:opacity-100'>
                    {item.sub.map(sub => (
                      <Link
                        key={sub.name}
                        href={normalizeHref(sub.link)}
                        className='block rounded-lg px-3 py-2 text-sm text-white/90 hover:bg-white/10'
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}

          {/* Login / Dashboard (desktop) */}
          <li>
            <Link
              href={token ? '/dashboard' : '/login'}
              className='ml-3 inline-block rounded-lg bg-white/90 px-4 py-2 text-sm font-semibold text-black hover:bg-white'
            >
              {token ? 'Dashboard' : 'Login'}
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className='border-t border-white/10 bg-black/80 px-4 py-3 md:hidden'>
          <ul className='space-y-1'>
            {landingLinks.map(item =>
              !item.sub ? (
                <li key={item.name}>
                  <Link
                    href={normalizeHref(item.link)}
                    className='block rounded-lg px-3 py-2 text-sm text-white hover:bg-white/10'
                    onClick={() => setOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ) : (
                <MobileSubMenu
                  key={item.name}
                  label={item.name}
                  parentLink={normalizeHref(item.link)}
                  items={item.sub.map(s => ({
                    ...s,
                    link: normalizeHref(s.link)
                  }))}
                />
              )
            )}

            {/* Login / Dashboard (mobile) */}
            <li>
              <Link
                href={token ? '/dashboard' : '/login'}
                className='block rounded-lg px-3 py-2 text-sm font-semibold text-white hover:bg-white/10'
                onClick={() => setOpen(false)}
              >
                {token ? 'Dashboard' : 'Login'}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

/* ---------- Helpers ---------- */

function MobileSubMenu({
  label,
  items,
  parentLink
}: {
  label: string
  items: { name: string; link: string }[]
  parentLink: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <li>
      <button
        className='flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-white hover:bg-white/10'
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
      >
        <span>{label}</span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
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
      {open && (
        <ul className='mt-1 space-y-1 pl-3'>
          {/* parent anchor (opsional) */}
          <li>
            <Link
              href={parentLink}
              className='block rounded-lg px-3 py-2 text-sm text-white/90 hover:bg-white/10'
            >
              {label} (Ringkasan)
            </Link>
          </li>
          {items.map(s => (
            <li key={s.name}>
              <Link
                href={s.link}
                className='block rounded-lg px-3 py-2 text-sm text-white/90 hover:bg-white/10'
              >
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

// import { NextPage } from 'next'
// import Image from 'next/image'
// import Link from 'next/link'

// interface Props {}

// const Navbar: NextPage<Props> = () => {
//   return (
//     <>
//       <nav className='fixed w-full border-gray-200 bg-transparent dark:bg-gray-900'>
//         <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4'>
//           <Link
//             href='https://flowbite.com/'
//             className='flex items-center space-x-3 rtl:space-x-reverse'
//           >
//             <Image
//               src='https://flowbite.com/docs/images/logo.svg'
//               className='h-8'
//               alt='Flowbite Logo'
//             />
//             <span className='self-center whitespace-nowrap text-2xl font-semibold text-white dark:text-white'>
//               Flowbite
//             </span>
//           </Link>
//           <button
//             data-collapse-toggle='navbar-default'
//             type='button'
//             className='inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
//             aria-controls='navbar-default'
//             aria-expanded='false'
//           >
//             <span className='sr-only'>Open main menu</span>
//             <svg
//               className='h-5 w-5'
//               aria-hidden='true'
//               xmlns='http://www.w3.org/2000/svg'
//               fill='none'
//               viewBox='0 0 17 14'
//             >
//               <path
//                 stroke='currentColor'
//                 strokeLinecap='round'
//                 strokeLinejoin='round'
//                 strokeWidth='2'
//                 d='M1 1h15M1 7h15M1 13h15'
//               />
//             </svg>
//           </button>
//           <div className='hidden w-full md:block md:w-auto' id='navbar-default'>
//             <ul className='mt-4 flex flex-col rounded-lg border border-gray-100 bg-transparent p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 md:dark:bg-gray-900 rtl:space-x-reverse'>
//               <li>
//                 <a
//                   href='#'
//                   className='block rounded px-3 py-2 text-white hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
//                 >
//                   Explore more
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   )
// }

// export default Navbar
