'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Mountain, Store } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useLogout from '@/hooks/useLogout'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/wisata', label: 'Wisata', icon: Mountain },
  { href: '/admin/umkm', label: 'UMKM', icon: Store }
]

export default function Sidebar() {
  const pathname = usePathname()
  const { handleLogout } = useLogout()

  return (
    <aside className='bg-sidebar hidden w-64 shrink-0 border-r md:flex'>
      <div className='flex h-dvh w-full flex-col gap-2 p-4'>
        <div className='px-2 py-1'>
          <Link href='/admin/dashboard' className='block'>
            <span className='text-xl font-semibold tracking-tight'>
              Manud Jaya CMS
            </span>
          </Link>
          <p className='text-muted-foreground text-sm'>Admin Panel</p>
        </div>

        <nav className='mt-4 flex flex-1 flex-col gap-1'>
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href} className='block'>
                <Button
                  variant={active ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-2',
                    active && 'bg-sidebar-accent text-sidebar-accent-foreground'
                  )}
                >
                  <Icon className='size-4' />
                  <span>{label}</span>
                </Button>
              </Link>
            )
          })}
        </nav>

        <div>
          <Button
            variant='destructive'
            className='mb-10 w-full'
            onClick={handleLogout}
          >
            Logout
          </Button>
          <div className='text-muted-foreground mt-auto px-2 text-xs'>
            <p>© {new Date().getFullYear()} Simple CMS</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
