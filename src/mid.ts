import { NextRequest, NextResponse } from 'next/server'
import { checkIsPublicRoute } from '@/functions'

export async function middleware(request: NextRequest) {
  const next = NextResponse.next()
  const isPublicRoute = checkIsPublicRoute(request.nextUrl.pathname)

  const storagedUser = request.cookies.get('urna-eletronica@user')

  if (storagedUser && isPublicRoute) {
    return NextResponse.redirect(new URL('/voting', request.url))
  }

  if (!storagedUser && !isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return next
}

export const config = { matcher: '/((?!.*\\.).*)' }
