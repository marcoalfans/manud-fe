import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  console.log(token)
  const { pathname } = req.nextUrl

  // kalau user sudah login dan buka /login, arahkan ke dashboard
  if (pathname.includes('/login') && token) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url))
  }

  // kalau buka /admin persis dan sudah login, arahkan ke dashboard
  if (pathname.includes('/admin') && !token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/admin', '/login']
}
