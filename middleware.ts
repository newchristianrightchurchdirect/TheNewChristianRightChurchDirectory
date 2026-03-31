import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export const config = {
  matcher: ['/admin/:path*'],
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/manage-7x9k', request.url))
  }

  try {
    const secret = process.env.JWT_SECRET
    if (!secret || secret.length < 32) {
      return NextResponse.redirect(new URL('/manage-7x9k', request.url))
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    )

    if (payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/manage-7x9k', request.url))
    }

    return NextResponse.next()
  } catch {
    const response = NextResponse.redirect(new URL('/manage-7x9k', request.url))
    response.cookies.set('auth_token', '', {
      path: '/',
      expires: new Date(0),
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    })
    return response
  }
}
