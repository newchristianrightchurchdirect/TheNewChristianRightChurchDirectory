import { NextRequest, NextResponse } from 'next/server';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const ALLOWED_ORIGINS = [
  siteUrl,
  siteUrl.includes('://www.') ? siteUrl.replace('://www.', '://') : siteUrl.replace('://', '://www.'),
  'http://localhost:3000',
  'http://localhost:3001',
];

export function validateCsrf(request: NextRequest): NextResponse | null {
  const method = request.method.toUpperCase();

  if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') {
    return null;
  }

  const origin = request.headers.get('origin');

  if (!origin) {
    const referer = request.headers.get('referer');
    if (referer) {
      try {
        const refererOrigin = new URL(referer).origin;
        if (ALLOWED_ORIGINS.some((allowed) => refererOrigin === new URL(allowed).origin)) {
          return null;
        }
      } catch {
        // Invalid referer URL
      }
    }
    return null;
  }

  if (ALLOWED_ORIGINS.some((allowed) => {
    try {
      return origin === new URL(allowed).origin;
    } catch {
      return false;
    }
  })) {
    return null;
  }

  // Vercel preview deployments
  if (origin.endsWith('.vercel.app')) {
    return null;
  }

  return NextResponse.json(
    { error: 'Forbidden: invalid origin' },
    { status: 403 }
  );
}
