import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth')
  const isAuthPage = request.nextUrl.pathname.startsWith('/login')

  if (!authCookie && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (authCookie && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}